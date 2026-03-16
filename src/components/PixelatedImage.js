"use client";
import { useEffect, useRef } from "react";

export default function PixelatedImage({ src, alt, className, width = 488, height = 112, duration = 2000 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // willReadFrequently optimizes performance when reading back from the canvas for scaling
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const img = new window.Image();
    img.src = src;

    let animationFrameId;

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;

      const offscreenCanvas = document.createElement("canvas");
      const offscreenCtx = offscreenCanvas.getContext("2d");

      let start = null;
      // Start resolution: approx 8 pixels wide
      const initialScale = 8 / width;

      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);

        // Ease in-out cubic for a smooth, dramatic reveal
        const easeProgress = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const scale = progress === 1 ? 1 : initialScale + (1 - initialScale) * easeProgress;

        const currentWidth = Math.max(1, Math.floor(width * scale));
        const currentHeight = Math.max(1, Math.floor(height * scale));

        offscreenCanvas.width = currentWidth;
        offscreenCanvas.height = currentHeight;
        offscreenCtx.imageSmoothingEnabled = false;
        offscreenCtx.clearRect(0, 0, currentWidth, currentHeight);
        offscreenCtx.drawImage(img, 0, 0, currentWidth, currentHeight);

        // Disable smoothing to create the blocky effect
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, width, height);

        // Scale it up across the whole canvas from the offscreen canvas
        ctx.drawImage(offscreenCanvas, 0, 0, currentWidth, currentHeight, 0, 0, width, height);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          // Final render with full quality
          ctx.imageSmoothingEnabled = true;
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [src, width, height, duration]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ aspectRatio: `${width}/${height}` }}
      aria-label={alt}
      role="img"
    />
  );
}
