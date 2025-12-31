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
      'https://wall.alphacoders.com/big.php?i=606667',
      'https://wall.alphacoders.com/big.php?i=1352217',
      'https://wall.alphacoders.com/big.php?i=1338785',
      'https://wall.alphacoders.com/big.php?i=1303127',
      'https://wall.alphacoders.com/big.php?i=1326247',
      'https://wall.alphacoders.com/big.php?i=931616',
      'https://wall.alphacoders.com/big.php?i=932969',
    ],
    robin: [
      'https://wall.alphacoders.com/big.php?i=1360727',
      'https://wall.alphacoders.com/big.php?i=1300608',
      'https://wall.alphacoders.com/big.php?i=1360725',
      'https://wall.alphacoders.com/big.php?i=1355322',
      'https://wall.alphacoders.com/big.php?i=1358562',
      'https://wall.alphacoders.com/big.php?i=788704',
    ],
    whitebeard: [
      'https://wall.alphacoders.com/big.php?i=1173391',
      'https://wall.alphacoders.com/big.php?i=1284982',
      'https://wall.alphacoders.com/big.php?i=817020',
    ],
    roger: [
      'https://wall.alphacoders.com/big.php?i=1323417',
      'https://wall.alphacoders.com/big.php?i=1342768',
      'https://wall.alphacoders.com/big.php?i=1205469',
      'https://wall.alphacoders.com/big.php?i=1280625',
    ],
    adventure: [
      'https://wall.alphacoders.com/big.php?i=911401',
      'https://wall.alphacoders.com/big.php?i=1330380',
      'https://wall.alphacoders.com/big.php?i=1346917',
      'https://wall.alphacoders.com/big.php?i=1383107',
      'https://wall.alphacoders.com/big.php?i=1043306',
      'https://wall.alphacoders.com/big.php?i=860653',
    ],
  };

  constructor(
    private affService: AffirmationService,
    private cdr: ChangeDetectorRef
  ) {}

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

    const proxyUrl = (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`;

    let effectiveUrl = this.backgroundUrl;
    if (!this.isOnePieceMode) {
      effectiveUrl = effectiveUrl.replace(/full|raw/, 'large');
    } else {
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
      alert('Failed to load image for download. Downloading raw background instead.');
      const a = document.createElement('a');
      a.href = this.backgroundUrl;
      a.download = `daily-affirmation-${new Date().toISOString().slice(0, 10)}.jpg`;
      a.click();
    };
  }
}