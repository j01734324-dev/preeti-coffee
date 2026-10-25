import * as THREE from 'three';

/**
 * Generates an authentic crema / latte art procedural CanvasTexture.
 * Features a golden-brown roasted crema background with delicate milk swirl.
 */
export function createLatteArtTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    return fallback;
  }

  // Base espresso dark roast gradient
  const centerX = 256;
  const centerY = 256;
  const radius = 250;

  const bgGradient = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, radius);
  bgGradient.addColorStop(0, '#532e18');
  bgGradient.addColorStop(0.5, '#3b1f11');
  bgGradient.addColorStop(0.85, '#261309');
  bgGradient.addColorStop(1.0, '#1a0b05');

  ctx.fillStyle = bgGradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  // Subtle crema bubble texture noise
  for (let i = 0; i < 400; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 220;
    const x = centerX + Math.cos(angle) * dist;
    const y = centerY + Math.sin(angle) * dist;
    const size = Math.random() * 2.5 + 0.5;
    ctx.fillStyle = Math.random() > 0.4 ? 'rgba(184, 121, 67, 0.15)' : 'rgba(235, 196, 148, 0.2)';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Golden crema ring near cup edge
  ctx.lineWidth = 14;
  const ringGrad = ctx.createRadialGradient(centerX, centerY, 210, centerX, centerY, 240);
  ringGrad.addColorStop(0, 'rgba(184, 121, 67, 0.6)');
  ringGrad.addColorStop(0.5, 'rgba(199, 146, 88, 0.8)');
  ringGrad.addColorStop(1, 'rgba(74, 38, 18, 0.3)');
  ctx.strokeStyle = ringGrad;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 226, 0, Math.PI * 2);
  ctx.stroke();

  // Draw artistic Rosetta / Heart latte art in warm cream
  ctx.save();
  ctx.translate(centerX, centerY);

  // Soft warm milk glow
  const milkGradient = ctx.createRadialGradient(0, 10, 10, 0, 0, 140);
  milkGradient.addColorStop(0, 'rgba(246, 240, 230, 0.95)');
  milkGradient.addColorStop(0.6, 'rgba(235, 218, 195, 0.85)');
  milkGradient.addColorStop(0.9, 'rgba(184, 121, 67, 0.4)');
  milkGradient.addColorStop(1, 'rgba(184, 121, 67, 0)');

  // Main latte art heart lobes
  ctx.fillStyle = milkGradient;
  ctx.beginPath();
  ctx.moveTo(0, 60);
  ctx.bezierCurveTo(-70, 0, -90, -70, -35, -95);
  ctx.bezierCurveTo(0, -90, 0, -40, 0, -40);
  ctx.bezierCurveTo(0, -40, 0, -90, 35, -95);
  ctx.bezierCurveTo(90, -70, 70, 0, 0, 60);
  ctx.fill();

  // Inner layered heart
  ctx.fillStyle = 'rgba(255, 252, 245, 0.92)';
  ctx.beginPath();
  ctx.moveTo(0, 35);
  ctx.bezierCurveTo(-45, -5, -55, -55, -20, -70);
  ctx.bezierCurveTo(0, -65, 0, -30, 0, -30);
  ctx.bezierCurveTo(0, -30, 0, -65, 20, -70);
  ctx.bezierCurveTo(55, -55, 45, -5, 0, 35);
  ctx.fill();

  // Subtle barista pull line
  ctx.strokeStyle = '#613317';
  ctx.lineWidth = 3.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, -98);
  ctx.lineTo(0, 75);
  ctx.stroke();

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  return texture;
}

/**
 * Creates soft procedural steam puff texture
 */
export function createSteamTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 60);
  grad.addColorStop(0, 'rgba(246, 240, 230, 0.35)');
  grad.addColorStop(0.35, 'rgba(246, 240, 230, 0.18)');
  grad.addColorStop(0.7, 'rgba(246, 240, 230, 0.05)');
  grad.addColorStop(1, 'rgba(246, 240, 230, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates procedural soft contact shadow texture
 */
export function createShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
  grad.addColorStop(0.3, 'rgba(19, 13, 10, 0.6)');
  grad.addColorStop(0.65, 'rgba(19, 13, 10, 0.25)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Creates a procedural 3D Coffee Bean geometry with the iconic curved crease
 */
export function createCoffeeBeanGeometry(): THREE.BufferGeometry {
  const geom = new THREE.SphereGeometry(0.24, 24, 20);
  const pos = geom.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    // Scale into elongated bean shape
    let newX = x * 0.75;
    let newY = y * 1.35;
    let newZ = z * 0.65;

    // Indent the characteristic coffee bean center cleft
    if (newZ > 0.02) {
      const distFromCenterLine = Math.abs(newX);
      if (distFromCenterLine < 0.09) {
        // Deep cleft groove
        const depth = Math.cos((distFromCenterLine / 0.09) * (Math.PI / 2)) * 0.08;
        newZ -= depth;
      }
    }

    pos.setXYZ(i, newX, newY, newZ);
  }

  geom.computeVertexNormals();
  return geom;
}
