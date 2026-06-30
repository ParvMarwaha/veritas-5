uniform float uTime;
varying vec2 vUv;

void main() {
  // Simple time-based pulsating color gradient
  float r = abs(sin(uTime * 0.5 + vUv.x * 3.14));
  float g = abs(cos(uTime * 0.3 + vUv.y * 3.14));
  float b = abs(sin(uTime * 0.7));
  
  gl_FragColor = vec4(r, g, b, 1.0);
}
