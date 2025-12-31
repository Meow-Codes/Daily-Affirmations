import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AffirmationService, Affirmation } from './services/affirmation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit {
  affirmation: Affirmation | null = null;
  backgroundUrl: string = '';
  cacheBuster: number = 0;
  loading = true;
  isOnePieceMode = false;

  private characterImages: { [key: string]: string[] } = {
    luffy: [
      'https://images2.alphacoders.com/135/thumb-1920-1358580.jpeg',
      'https://images3.alphacoders.com/132/thumb-1920-1323165.png',
      'https://images2.alphacoders.com/136/thumb-1920-1369365.jpeg',
      'https://images3.alphacoders.com/134/thumb-1920-1342304.jpeg',
      'https://images7.alphacoders.com/135/thumb-1920-1350478.jpeg',
      'https://images3.alphacoders.com/164/thumb-1920-164959.jpg',
      'https://images4.alphacoders.com/134/thumb-1920-1345518.jpeg',
      'https://images8.alphacoders.com/133/thumb-1920-1332278.jpeg',
      'https://images7.alphacoders.com/682/thumb-1920-682881.jpg',
      'https://images8.alphacoders.com/788/thumb-1920-788705.jpg',
    ],
    zoro: [
      'https://images8.alphacoders.com/135/thumb-1920-1352217.png',
      'https://images2.alphacoders.com/130/thumb-1920-1303127.jpg',
      'https://images3.alphacoders.com/905/thumb-1920-905276.jpg',
      'https://images7.alphacoders.com/135/thumb-1920-1352213.png',
      'https://images7.alphacoders.com/135/thumb-1920-1359196.jpeg',
      'https://images3.alphacoders.com/134/thumb-1920-1345517.jpeg',
      'https://images3.alphacoders.com/931/thumb-1920-931616.png',
    ],
    robin: [
      'https://images3.alphacoders.com/136/thumb-1920-1360727.png',
      'https://images.alphacoders.com/136/thumb-1920-1360725.png',
      'https://images3.alphacoders.com/135/thumb-1920-1355322.jpeg',
      'https://images3.alphacoders.com/135/thumb-1920-1358562.jpeg',
      'https://fwmedia.fandomwire.com/wp-content/uploads/2025/04/25014655/i_want_to_live.png',
    ],
    whitebeard: [
      'https://images3.alphacoders.com/605/thumb-1920-605200.png',
      'https://images.alphacoders.com/128/thumb-1920-1284982.jpg',
      'https://images7.alphacoders.com/136/thumb-1920-1363893.png',
      'https://images8.alphacoders.com/643/thumb-1920-643469.png',
      'https://images5.alphacoders.com/649/thumb-1920-649986.jpg',
      'https://images7.alphacoders.com/128/thumb-1920-1281115.jpg',
      'https://images.alphacoders.com/127/thumb-1920-1273933.jpg',
      'https://images.alphacoders.com/105/thumb-1920-1057850.jpg',
      'https://images4.alphacoders.com/164/thumb-1920-164928.jpg',
      'https://images.alphacoders.com/123/thumb-1920-1232363.png',
    ],
    roger: [
      'https://images7.alphacoders.com/132/thumb-1920-1323417.jpeg',
      'https://images7.alphacoders.com/120/thumb-1920-1205469.jpg',
      'https://images.alphacoders.com/128/thumb-1920-1280625.jpg',
      'https://images4.alphacoders.com/106/thumb-440-1060187.webp',
      'https://images4.alphacoders.com/117/thumb-440-1171340.webp',
      'https://images4.alphacoders.com/105/thumb-440-1054566.webp',
      'https://images6.alphacoders.com/105/thumb-440-1057901.webp',
    ],
    adventure: [
      'https://images6.alphacoders.com/911/thumb-1920-911401.jpg',
      'https://images7.alphacoders.com/134/thumb-1920-1346917.png',
      'https://images2.alphacoders.com/138/thumb-1920-1383107.png',
      'https://images7.alphacoders.com/104/thumb-1920-1043306.jpg',
    ],
  };

  constructor(private affService: AffirmationService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadNew();
  }

  toggleOnePieceMode(): void {
    this.isOnePieceMode = !this.isOnePieceMode;
    this.loadNew();
  }

  loadNew(): void {
    this.loading = true;
    console.log('🚀 Fetching new affirmation and background...');

    this.affService.getDaily(this.isOnePieceMode).subscribe({
      next: (data: any) => {
        console.log('✅ Success! Received data:', data);

        const affData = this.isOnePieceMode ? data.affirmation : data.affirmation;
        this.affirmation = {
          text: affData.text,
          author: affData.author,
        };

        if (this.isOnePieceMode && affData.character) {
          this.backgroundUrl = this.getCharacterImage(affData.character.toLowerCase());
        } else {
          this.backgroundUrl = data.background.url;
        }

        this.cacheBuster = Date.now();
        this.loading = false;
        this.cdr.detectChanges();
        console.log('View updated with new content');
      },
      error: (err) => {
        console.error('❌ API Error:', err);
        this.loading = false;
        this.cdr.detectChanges();
        alert('Failed to load affirmation. Check console.');
      },
      complete: () => console.log('🏁 Request completed'),
    });
  }

  getCharacterImage(character: string): string {
    const key = character.toLowerCase().trim();
    const options = this.characterImages[key] || this.characterImages['adventure'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  // Fixed wrapText method
  private wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + ' ' + words[i];
      if (ctx.measureText(testLine).width < maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    lines.push(currentLine);
    return lines;
  }

  downloadImage(): void {
    if (!this.backgroundUrl || !this.affirmation) return;

    // Best working proxy for images + canvas in 2025
    const proxyUrl = (url: string) =>
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`;

    let effectiveUrl = this.backgroundUrl;
    if (!this.isOnePieceMode) {
      // Faster for Unsplash
      effectiveUrl = effectiveUrl.replace(/full|raw/, 'large');
    } else {
      // Proxy all One Piece images
      effectiveUrl = proxyUrl(this.backgroundUrl);
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = effectiveUrl + '&t=' + Date.now();

    img.onload = () => {
      const MAX_WIDTH = 1920;
      const MAX_HEIGHT = 1080;
      let { width, height } = img;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width *= ratio;
        height *= ratio;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, width, height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, width, height);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      let fontSize = Math.min(width / 18, 100);
      ctx.font = `bold ${fontSize}px "Playfair Display", Georgia, serif`;
      ctx.fillStyle = 'white';
      ctx.shadowColor = 'black';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;

      const maxTextWidth = width * 0.85;
      const lines = this.wrapText(ctx, this.affirmation!.text, maxTextWidth);
      const lineHeight = fontSize * 1.4;

      let y = height / 2 - (lines.length * lineHeight) / 2;
      lines.forEach((line: string) => {
        ctx.fillText(line, width / 2, y);
        y += lineHeight;
      });

      ctx.font = `italic ${fontSize * 0.6}px "Montserrat", sans-serif`;
      ctx.fillStyle = '#f0f0f0';
      ctx.shadowBlur = 15;
      ctx.fillText(`— ${this.affirmation!.author} —`, width / 2, y + 50);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `daily-affirmation-${new Date().toISOString().slice(0, 10)}.jpg`;
          a.click();
          URL.revokeObjectURL(a.href);
        },
        'image/jpeg',
        0.92
      );
    };

    img.onerror = () => {
      alert('Image load failed. Downloading raw background only.');
      const a = document.createElement('a');
      a.href = this.backgroundUrl;
      a.download = `daily-affirmation-${new Date().toISOString().slice(0, 10)}.jpg`;
      a.click();
    };
  }
}
