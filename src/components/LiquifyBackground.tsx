'use client';

import React, { useRef, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────────
// Fragment Shader: Liquify distortion on a texture
// ─────────────────────────────────────────────────
const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  
  varying vec2 v_texCoord;
  
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_mouseInfluence;
  
  // Simplex-style noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
           + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  // Interpolate gradient colors based on original SVG stops
  vec3 getGradientColor(float y) {
    vec3 c1 = vec3(20.0/255.0, 20.0/255.0, 20.0/255.0);   // #141414 at 0.043
    vec3 c2 = vec3(208.0/255.0, 39.0/255.0, 23.0/255.0);  // #D02717 at 0.379
    vec3 c3 = vec3(221.0/255.0, 167.0/255.0, 109.0/255.0);// #DDA76D at 0.788
    vec3 c4 = vec3(1.0, 1.0, 1.0);                        // #FFFFFF at 1.0
    
    if (y < 0.043) return c1;
    if (y < 0.379) return mix(c1, c2, (y - 0.043) / (0.379 - 0.043));
    if (y < 0.788) return mix(c2, c3, (y - 0.379) / (0.788 - 0.379));
    return mix(c3, c4, (y - 0.788) / (1.0 - 0.788));
  }

  void main() {
    vec2 uv = v_texCoord;
    
    // Slow, ambient liquify distortion
    float t = u_time * 0.15;
    
    // Multi-layered noise for organic feel
    float n1 = snoise(uv * 2.0 + vec2(t * 0.3, t * 0.2));
    float n2 = snoise(uv * 4.0 + vec2(-t * 0.2, t * 0.4));
    float n3 = snoise(uv * 1.5 + vec2(t * 0.1, -t * 0.15));
    
    // Combine with decreasing amplitude
    vec2 distortion = vec2(
      n1 * 0.012 + n2 * 0.006 + n3 * 0.008,
      n1 * 0.008 + n2 * 0.006 - n3 * 0.01
    );
    
    // Mouse influence: push/pull effect around cursor
    vec2 mouseUV = u_mouse;
    float mouseDist = distance(uv, mouseUV);
    float mouseRadius = 0.25;
    float mouseStrength = smoothstep(mouseRadius, 0.0, mouseDist) * u_mouseInfluence * 0.03;
    vec2 mouseDir = normalize(uv - mouseUV + 0.001);
    distortion += mouseDir * mouseStrength;
    
    // Apply distortion
    vec2 distortedUV = uv + distortion;
    
    // Clamp to prevent edge artifacts
    distortedUV = clamp(distortedUV, 0.0, 1.0);
    
    vec3 color = getGradientColor(distortedUV.y);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

interface LiquifyBackgroundProps {
  className?: string;
  imageSrc?: string;
}

export const LiquifyBackground: React.FC<LiquifyBackgroundProps> = ({
  className = '',
  imageSrc = '/Rectangle 125.svg',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseInfluenceRef = useRef(0);
  const startTimeRef = useRef(0);

  const createShader = useCallback((gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }, []);

  const createProgram = useCallback((gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) => {
    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;
    glRef.current = gl;

    // Compile shaders
    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = createProgram(gl, vs, fs);
    if (!program) return;
    programRef.current = program;

    // Geometry: full-screen quad
    const positions = new Float32Array([
      -1, -1,  1, -1,  -1, 1,
      -1,  1,  1, -1,   1, 1,
    ]);
    const texCoords = new Float32Array([
      0, 1,  1, 1,  0, 0,
      0, 0,  1, 1,  1, 0,
    ]);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    const texLoc = gl.getAttribLocation(program, 'a_texCoord');
    gl.enableVertexAttribArray(texLoc);
    gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

    // No texture needed, fully procedural!

    startTimeRef.current = performance.now();

    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse handler (scoped to canvas parent)
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
      mouseInfluenceRef.current = 1;
    };
    const onMouseLeave = () => {
      mouseInfluenceRef.current = 0;
    };
    
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', onMouseMove);
      parent.addEventListener('mouseleave', onMouseLeave);
    }

    // Render loop
    const render = () => {
      if (!gl || !program) return;

      const elapsed = (performance.now() - startTimeRef.current) / 1000;

      // Decay mouse influence
      mouseInfluenceRef.current *= 0.96;

      gl.useProgram(program);

      const timeLoc = gl.getUniformLocation(program, 'u_time');
      const resLoc = gl.getUniformLocation(program, 'u_resolution');
      const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
      const mouseInfLoc = gl.getUniformLocation(program, 'u_mouseInfluence');

      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(mouseInfLoc, mouseInfluenceRef.current);


      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      if (parent) {
        parent.removeEventListener('mousemove', onMouseMove);
        parent.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [imageSrc, createShader, createProgram]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  );
};
