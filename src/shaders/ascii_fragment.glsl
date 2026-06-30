uniform sampler2D uTexture;
uniform float uTime;

varying vec2 vUv;
varying float vCharIndex;
varying float vMouseDist;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  // Sprite sheet grid 5x4
  float cols = 5.0;
  float rows = 4.0;
  
  float charIndex = floor(vCharIndex);
  float col = mod(charIndex, cols);
  float row = floor(charIndex / cols);
  
  vec2 spriteUv = vec2(
    (col + vUv.x) / cols,
    (1.0 - (row + 1.0) + vUv.y) / rows
  );
  
  vec4 texColor = texture2D(uTexture, spriteUv);
  
  if (texColor.a < 0.1 && texColor.r < 0.1) discard;
  
  vec3 baseColor = vec3(0.49, 0.07, 0.05); // #7D120E
  vec3 accentColor = vec3(0.815, 0.153, 0.09); // #D02717
  
  vec3 finalColor = mix(baseColor, accentColor, vMouseDist);
  finalColor *= 1.0 + (vMouseDist * 0.2);
  
  float n = random(gl_FragCoord.xy * 0.01 + uTime);
  finalColor += n * 0.04; 
  
  gl_FragColor = vec4(finalColor, texColor.a * (0.3 + vMouseDist * 0.7));
}
