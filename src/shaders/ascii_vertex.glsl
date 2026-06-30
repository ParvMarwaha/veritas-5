uniform float uTime;
uniform vec3 uMouse;

attribute float aCharIndex;
attribute float aScale;
attribute float aSpeed;
attribute float aPhase;

varying vec2 vUv;
varying float vCharIndex;
varying float vMouseDist;

void main() {
  vUv = uv;
  vCharIndex = aCharIndex;
  
  // Extract base instance position
  mat4 im = instanceMatrix;
  vec3 iPos = vec3(im[3][0], im[3][1], im[3][2]);
  
  // Drifting motion
  iPos.y += sin(uTime * aSpeed + aPhase) * 2.0;
  iPos.x += cos(uTime * aSpeed * 0.7 + aPhase) * 1.5;
  iPos.z += sin(uTime * aSpeed * 0.5) * 1.0;
  
  // Distance to mouse
  float dist = distance(iPos.xy, uMouse.xy);
  
  // Soft influence radius
  float influence = 1.0 - smoothstep(0.0, 5.0, dist);
  vMouseDist = influence;
  
  // Gently rise forward in Z-space
  iPos.z += influence * 2.5;
  
  // Apply scale
  vec3 localPos = position * aScale;
  
  // Local density subtly increases (scaling up instances makes them overlap more)
  localPos *= 1.0 + (influence * 0.3);
  
  vec4 worldPosition = modelMatrix * vec4(iPos + localPos, 1.0);
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
