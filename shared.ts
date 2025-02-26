export const domeConfig = {
  sphereRadius: 14,
  sphereSegments: 128,
  color1: 0xe89c97,
  color2: 0x83c4ae,
  animationSpeed: 0.006,
  blobFrequency: 0.5,
  blobAmplitude: 0.5
};

export const domeVertexShader = `
                uniform float time;
                uniform float blobFrequency;
                uniform float blobAmplitude;
                varying vec3 vPosition;
                void main() {
                    vPosition = position + normal * sin(position.y * blobFrequency + time * 2.0) * blobAmplitude;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
                }
            `;
export const fragmentShader = `
                uniform vec3 color1;
                uniform vec3 color2;
                uniform float time;
                varying vec3 vPosition;
                
                void main() {
                    float blob = sin(vPosition.x * 0.1 + vPosition.y * 0.15 + time) * 0.5 + 0.5;
                    float intensity = smoothstep(0.0, 1.0, blob);
                    vec3 color = mix(color1, color2, intensity);
                    gl_FragColor = vec4(color, 1.0);
                }
            `;

export const debounce = (func: (...args: any[]) => void, delay: number): ((...args: any[]) => void) => {
  let timer: number | undefined;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => func(...args), delay);
  };
};

export function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
