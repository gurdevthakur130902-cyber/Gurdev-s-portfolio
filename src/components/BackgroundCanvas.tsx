import { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    class Blob {
      x: number;
      y: number;
      r: number;
      color: string;
      vx: number;
      vy: number;

      constructor(x: number, y: number, r: number, color: string) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
      }

      update(mx: number, my: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - this.r < 0 || this.x + this.r > width) this.vx *= -1;
        if (this.y - this.r < 0 || this.y + this.r > height) this.vy *= -1;

        if (mx && my) {
          const dx = mx - this.x;
          const dy = my - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 400) {
            this.x -= (dx / dist) * 0.35;
            this.y -= (dy / dist) * 0.35;
          }
        }
      }

      draw() {
        if (!ctx) return;
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, 'rgba(248, 249, 250, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const blobs = [
      new Blob(width * 0.15, height * 0.3, width < 768 ? 200 : 350, 'rgba(59, 130, 246, 0.05)'), // Blue
      new Blob(width * 0.8, height * 0.2, width < 768 ? 250 : 400, 'rgba(99, 102, 241, 0.05)'), // Indigo
      new Blob(width * 0.45, height * 0.75, width < 768 ? 220 : 420, 'rgba(16, 185, 129, 0.04)'), // Emerald
      new Blob(width * 0.7, height * 0.8, width < 768 ? 180 : 300, 'rgba(236, 72, 153, 0.03)') // Pink
    ];

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#F8F9FA';
      ctx.fillRect(0, 0, width, height);

      blobs.forEach(b => {
        b.update(mouseX, mouseY);
        b.draw();
      });

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 pointer-events-none" />;
}
