import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mesh-gradient',
  standalone: true,
  imports: [CommonModule],
  template: '<canvas #canvas [style.width.%]="100" [style.height.%]="100"></canvas>',
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    canvas {
      display: block;
    }
  `]
})
export class MeshGradientComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() colors: string[] = ['hsl(216, 90%, 27%)', 'hsl(243, 68%, 36%)', 'hsl(205, 91%, 64%)', 'hsl(211, 61%, 57%)'];
  @Input() speed: number = 1;

  private ctx!: CanvasRenderingContext2D;
  private animationId?: number;
  private time = 0;

  ngOnInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.animate();
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  private hslToRgb(h: number, s: number, l: number): [number, number, number] {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  }

  private parseHsl(hslString: string): [number, number, number] {
    const match = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (match) {
      return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    }
    return [0, 0, 0];
  }

  private animate = () => {
    this.time += 0.005 * this.speed;
    this.draw();
    this.animationId = requestAnimationFrame(this.animate);
  };

  private draw() {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.width;
    const height = canvas.height;

    const imageData = this.ctx.createImageData(width, height);
    const data = imageData.data;

    const colorRgbs = this.colors.map(color => {
      const [h, s, l] = this.parseHsl(color);
      return this.hslToRgb(h, s, l);
    });

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;

        const nx = x / width;
        const ny = y / height;

        const noise1 = Math.sin(nx * 3 + this.time) * Math.cos(ny * 3 + this.time);
        const noise2 = Math.sin(nx * 2 - this.time * 0.7) * Math.cos(ny * 2 - this.time * 0.7);
        const noise3 = Math.sin(nx * 4 + this.time * 0.5) * Math.cos(ny * 4 + this.time * 0.5);

        const factor1 = (noise1 + 1) / 2;
        const factor2 = (noise2 + 1) / 2;
        const factor3 = (noise3 + 1) / 2;
        const factor4 = 1 - factor1 - factor2 - factor3;

        let r = 0, g = 0, b = 0;

        if (colorRgbs.length >= 4) {
          r = colorRgbs[0][0] * factor1 + colorRgbs[1][0] * factor2 +
              colorRgbs[2][0] * factor3 + colorRgbs[3][0] * Math.max(0, factor4);
          g = colorRgbs[0][1] * factor1 + colorRgbs[1][1] * factor2 +
              colorRgbs[2][1] * factor3 + colorRgbs[3][1] * Math.max(0, factor4);
          b = colorRgbs[0][2] * factor1 + colorRgbs[1][2] * factor2 +
              colorRgbs[2][2] * factor3 + colorRgbs[3][2] * Math.max(0, factor4);
        }

        data[i] = Math.min(255, Math.max(0, r));
        data[i + 1] = Math.min(255, Math.max(0, g));
        data[i + 2] = Math.min(255, Math.max(0, b));
        data[i + 3] = 255;
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
  }
}
