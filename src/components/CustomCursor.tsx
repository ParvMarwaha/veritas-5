'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

// ─────────────────────────────────────────────
// Spring Physics Utility
// ─────────────────────────────────────────────
class Spring {
  value: number;
  target: number;
  velocity: number;
  stiffness: number;
  damping: number;
  mass: number;

  constructor(initial: number, stiffness = 300, damping = 30, mass = 0.5) {
    this.value = initial;
    this.target = initial;
    this.velocity = 0;
    this.stiffness = stiffness;
    this.damping = damping;
    this.mass = mass;
  }

  update(dt: number) {
    const force = -this.stiffness * (this.value - this.target);
    const dampingForce = -this.damping * this.velocity;
    const acceleration = (force + dampingForce) / this.mass;
    this.velocity += acceleration * dt;
    this.value += this.velocity * dt;
    return this.value;
  }

  setTarget(t: number) {
    this.target = t;
  }

  snap(v: number) {
    this.value = v;
    this.target = v;
    this.velocity = 0;
  }
}

// ─────────────────────────────────────────────
// Utility: lerp
// ─────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ─────────────────────────────────────────────
// Utility: clamp
// ─────────────────────────────────────────────
function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export const CustomCursor = () => {
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trailPos = useRef(Array(8).fill(0).map(() => ({ x: -100, y: -100 })));
  const rafRef = useRef<number>(0);
  const isTouch = useRef(false);

  // Mouse state
  const mouse = useRef({ x: -100, y: -100 });
  const prevMouse = useRef({ x: -100, y: -100 });

  // Springs for core (fast, snappy)
  const coreX = useRef(new Spring(-100, 600, 40, 0.4));
  const coreY = useRef(new Spring(-100, 600, 40, 0.4));

  // Springs for ring (laggy, inertial)
  const ringX = useRef(new Spring(-100, 200, 28, 0.8));
  const ringY = useRef(new Spring(-100, 200, 28, 0.8));

  // Springs for visual properties
  const scaleCore = useRef(new Spring(1, 300, 30, 0.5));
  const scaleRing = useRef(new Spring(1, 200, 25, 0.6));
  const ringOpacity = useRef(new Spring(0.35, 200, 25, 0.5));
  const glowOpacity = useRef(new Spring(0.1, 150, 20, 0.5));
  const stretchX = useRef(new Spring(1, 250, 28, 0.5));
  const stretchY = useRef(new Spring(1, 250, 28, 0.5));
  const rotation = useRef(new Spring(0, 150, 20, 0.6));

  // Interaction state
  const hoverType = useRef<'none' | 'button' | 'link' | 'card' | 'image'>('none');
  const isPressed = useRef(false);
  const isIdle = useRef(false);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const breathPhase = useRef(0);
  const isScrolling = useRef(false);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);
  const velocity = useRef({ x: 0, y: 0 });
  const magnetTarget = useRef<{ x: number; y: number; el: Element | null }>({ x: 0, y: 0, el: null });

  // ─────────────────────────────────────────
  // Detect element type under cursor
  // ─────────────────────────────────────────
  const getHoverType = useCallback((el: Element | null): 'none' | 'button' | 'link' | 'card' | 'image' => {
    if (!el) return 'none';
    const tag = el.tagName.toLowerCase();
    
    // Check for image
    if (tag === 'img' || el.classList.contains('cursor-image')) return 'image';
    
    // Check for card
    if (el.classList.contains('cursor-card') || el.closest('.cursor-card')) return 'card';
    
    // Check for button
    if (
      tag === 'button' ||
      el.getAttribute('role') === 'button' ||
      el.classList.contains('hover-target') ||
      el.classList.contains('custom-btn') ||
      el.closest('button') ||
      el.closest('.custom-btn') ||
      el.closest('.hover-target')
    ) return 'button';
    
    // Check for link
    if (tag === 'a' || el.closest('a')) return 'link';
    
    return 'none';
  }, []);

  // ─────────────────────────────────────────
  // Get bounding center of magnetic target
  // ─────────────────────────────────────────
  const getMagneticCenter = useCallback((el: Element) => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      width: rect.width,
      height: rect.height,
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) {
      isTouch.current = true;
      return;
    }

    // Hide default cursor
    document.documentElement.style.cursor = 'none';

    let lastTime = performance.now();

    // ─────────────────────────────────────
    // Mouse handlers
    // ─────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      prevMouse.current = { ...mouse.current };
      mouse.current = { x: e.clientX, y: e.clientY };

      // Reset idle
      isIdle.current = false;
      breathPhase.current = 0;
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        isIdle.current = true;
      }, 2000);

      // Detect hover type
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const newHoverType = getHoverType(target);
      hoverType.current = newHoverType;

      // Magnetic target
      if (newHoverType === 'button' || newHoverType === 'card') {
        const interactiveEl = target?.closest('button, .custom-btn, .hover-target, .cursor-card, [role="button"]');
        if (interactiveEl) {
          const center = getMagneticCenter(interactiveEl);
          magnetTarget.current = { x: center.x, y: center.y, el: interactiveEl };
        }
      } else {
        magnetTarget.current = { x: 0, y: 0, el: null };
      }
    };

    const onMouseDown = () => {
      isPressed.current = true;
    };

    const onMouseUp = () => {
      isPressed.current = false;
    };

    const onScroll = () => {
      isScrolling.current = true;
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        isScrolling.current = false;
      }, 150);
    };

    const onMouseLeave = () => {
      mouse.current = { x: -100, y: -100 };
      coreX.current.snap(-100);
      coreY.current.snap(-100);
      ringX.current.snap(-100);
      ringY.current.snap(-100);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    // ─────────────────────────────────────
    // Animation Loop
    // ─────────────────────────────────────
    const tick = (now: number) => {
      const dt = clamp((now - lastTime) / 1000, 0.001, 0.064);
      lastTime = now;

      const core = coreRef.current;
      const glow = glowRef.current;
      if (!core || !glow) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // ─── Velocity ───
      const vx = mouse.current.x - prevMouse.current.x;
      const vy = mouse.current.y - prevMouse.current.y;
      velocity.current = { x: vx, y: vy };
      const speed = Math.sqrt(vx * vx + vy * vy);

      // ─── Target positions ───
      let targetX = mouse.current.x;
      let targetY = mouse.current.y;

      // Magnetic attraction for buttons/cards
      if (magnetTarget.current.el && (hoverType.current === 'button' || hoverType.current === 'card')) {
        const mx = magnetTarget.current.x;
        const my = magnetTarget.current.y;
        const magnetStrength = hoverType.current === 'card' ? 0.3 : 0.15;
        targetX = lerp(mouse.current.x, mx, magnetStrength);
        targetY = lerp(mouse.current.y, my, magnetStrength);
      }

      // Update spring targets
      coreX.current.setTarget(targetX);
      coreY.current.setTarget(targetY);
      ringX.current.setTarget(targetX);
      ringY.current.setTarget(targetY);

      // ─── Scale targets based on hover type ───
      let coreScaleTarget = 1;
      let ringScaleTarget = 1;
      let ringOpacityTarget = 0.35;
      let glowOpacityTarget = 0.1;

      switch (hoverType.current) {
        case 'button':
          coreScaleTarget = 0.6;
          ringScaleTarget = 1.8;
          ringOpacityTarget = 0.55;
          glowOpacityTarget = 0.2;
          break;
        case 'link':
          coreScaleTarget = 0.8;
          ringScaleTarget = 1.3;
          ringOpacityTarget = 0.45;
          glowOpacityTarget = 0.15;
          break;
        case 'card':
          coreScaleTarget = 0.7;
          ringScaleTarget = 1.6;
          ringOpacityTarget = 0.5;
          glowOpacityTarget = 0.18;
          break;
        case 'image':
          coreScaleTarget = 0.5;
          ringScaleTarget = 2.2;
          ringOpacityTarget = 0.2;
          glowOpacityTarget = 0.12;
          break;
      }

      // Click
      if (isPressed.current) {
        coreScaleTarget *= 0.7;
        ringScaleTarget *= 0.85;
        glowOpacityTarget = 0.3;
      }

      // ─── Velocity-based distortion ───
      const normalizedSpeed = clamp(speed / 30, 0, 1);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);

      // Stretch along movement axis, compress perpendicular
      const stretchAmount = 1 + normalizedSpeed * 0.2;
      const compressAmount = 1 - normalizedSpeed * 0.1;

      stretchX.current.setTarget(speed > 2 ? stretchAmount : 1);
      stretchY.current.setTarget(speed > 2 ? compressAmount : 1);
      rotation.current.setTarget(speed > 2 ? angle : rotation.current.value);

      // Scroll stretch
      if (isScrolling.current) {
        stretchY.current.setTarget(1.15);
        stretchX.current.setTarget(0.92);
      }

      // ─── Idle breathing ───
      if (isIdle.current) {
        breathPhase.current += dt * (2 * Math.PI / 4.5); // 4.5 second cycle
        const breathScale = 1 + 0.04 * Math.sin(breathPhase.current);
        coreScaleTarget *= breathScale;
        ringScaleTarget *= breathScale;
      }

      // Update scale/opacity springs
      scaleCore.current.setTarget(coreScaleTarget);
      scaleRing.current.setTarget(ringScaleTarget);
      ringOpacity.current.setTarget(ringOpacityTarget);
      glowOpacity.current.setTarget(glowOpacityTarget);

      // ─── Physics Sub-stepping (Fixes explosions on lag spikes) ───
      const steps = Math.ceil(dt / 0.008); // Max 8ms per step for guaranteed stability
      const subDt = dt / steps;
      
      for (let s = 0; s < steps; s++) {
        coreX.current.update(subDt);
        coreY.current.update(subDt);
        ringX.current.update(subDt);
        ringY.current.update(subDt);
        
        stretchX.current.update(subDt);
        stretchY.current.update(subDt);
        rotation.current.update(subDt);
        
        scaleCore.current.update(subDt);
        scaleRing.current.update(subDt);
        ringOpacity.current.update(subDt);
        glowOpacity.current.update(subDt);
      }

      // ─── Render ───
      const cx = coreX.current.value;
      const cy = coreY.current.value;
      const rx = ringX.current.value;
      const ry = ringY.current.value;
      const cs = scaleCore.current.value;
      const rs = scaleRing.current.value;
      const ro = ringOpacity.current.value;
      const go = glowOpacity.current.value;
      const sx = stretchX.current.value;
      const sy = stretchY.current.value;
      const rot = rotation.current.value;

      // Core
      core.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) rotate(${rot}deg) scale(${cs * sx}, ${cs * sy})`;


      // Glow
      glow.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${rs * 1.5})`;
      glow.style.opacity = `${go}`;

      // ─── Trail ───
      let tx = cx;
      let ty = cy;
      // Time-scaled smooth factor to prevent stuttering on fluctuating frame rates
      const baseSmooth = 0.28;
      const timeScaledSmooth = 1 - Math.pow(1 - baseSmooth, dt * 60);
      
      for (let i = 0; i < trailRefs.current.length; i++) {
        const el = trailRefs.current[i];
        if (!el) continue;
        const pt = trailPos.current[i];
        
        pt.x += (tx - pt.x) * timeScaledSmooth;
        pt.y += (ty - pt.y) * timeScaledSmooth;
        
        // Shift target for the next dot to the current dot's position
        tx = pt.x;
        ty = pt.y;
        
        const scale = 1 - (i / trailRefs.current.length) * 0.85;
        const opacity = (1 - (i / trailRefs.current.length)) * 0.65 * ro;
        el.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0) translate(-50%, -50%) scale(${scale * cs})`;
        el.style.opacity = `${opacity}`;
      }

      // Prev mouse for next frame velocity
      prevMouse.current = { ...mouse.current };

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    // ─────────────────────────────────────
    // Hide cursor on interactive elements (add cursor:none to all)
    // ─────────────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      document.documentElement.style.cursor = '';
      style.remove();
    };
  }, [getHoverType, getMagneticCenter]);

  return (
    <>
      {/* Inner Core */}
      <div
        ref={coreRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 9,
          height: 9,
          borderRadius: '50%',
          backgroundColor: '#D02717',
          pointerEvents: 'none',
          zIndex: 999999,
          mixBlendMode: 'difference',
          willChange: 'transform',
          filter: 'blur(0.3px)',
        }}
      />

      {/* Glow */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(208, 39, 23, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 999997,
          willChange: 'transform, opacity',
          filter: 'blur(8px)',
        }}
      />

      {/* Trail */}
      {trailPos.current.map((_, i) => (
        <div
          key={i}
          ref={el => {
            if (trailRefs.current) trailRefs.current[i] = el;
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#D02717',
            pointerEvents: 'none',
            zIndex: 999990 - i,
            mixBlendMode: 'difference',
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </>
  );
};
