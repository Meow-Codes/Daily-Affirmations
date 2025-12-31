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

  constructor(private affService: AffirmationService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadNew();
  }

  toggleOnePieceMode(): void {
    this.isOnePieceMode = !this.isOnePieceMode;
    this.loadNew();
  }

  private characterImages: { [key: string]: string[] } = {
    luffy: [
      'https://images2.alphacoders.com/135/thumb-1920-1358580.jpeg', // Gear 5 epic
      'https://images3.alphacoders.com/132/thumb-1920-1323165.png', // Gear 5 action
      'https://images2.alphacoders.com/136/thumb-1920-1369365.jpeg', // Recent stunning
      'https://images3.alphacoders.com/134/thumb-1920-1342304.jpeg', // Adventure vibe
      'https://images7.alphacoders.com/135/thumb-1920-1350478.jpeg', // With giants (new 2025)
      'https://images3.alphacoders.com/164/thumb-1920-164959.jpg', // Classic power
      'https://images4.alphacoders.com/134/thumb-1920-1345518.jpeg', // King of Pirates pose
      'https://images8.alphacoders.com/133/thumb-1920-1332278.jpeg', // Gear 5 transformation
      'https://images7.alphacoders.com/682/thumb-1920-682881.jpg', // Iconic smile
      'https://images8.alphacoders.com/788/thumb-1920-788705.jpg', // RoninGFX art
    ],
    zoro: [
      'https://wall.alphacoders.com/big.php?i=606667', // Classic swordsman
      'https://wall.alphacoders.com/big.php?i=1352217', // Recent intense
      'https://wall.alphacoders.com/big.php?i=1338785', // King of Hell vibe
      'https://wall.alphacoders.com/big.php?i=1303127', // 4K ultra
      'https://wall.alphacoders.com/big.php?i=1326247', // Fierce gaze
      'https://wall.alphacoders.com/big.php?i=931616', // 8K masterpiece
      'https://wall.alphacoders.com/big.php?i=932969', // Bandana focus
    ],
    robin: [
      'https://wall.alphacoders.com/big.php?i=1360727', // Gorgeous recent
      'https://wall.alphacoders.com/big.php?i=1300608', // Elegant ultra HD
      'https://wall.alphacoders.com/big.php?i=1360725', // Calm beauty
      'https://wall.alphacoders.com/big.php?i=1355322', // Fierce gaze
      'https://wall.alphacoders.com/big.php?i=1358562', // Emotional moment
      'https://wall.alphacoders.com/big.php?i=788704', // Classic style
    ],
    whitebeard: [
      'https://wall.alphacoders.com/big.php?i=1173391', // Majestic portrait
      'https://wall.alphacoders.com/big.php?i=1284982', // With crew epic
      'https://wall.alphacoders.com/big.php?i=817020', // Pirate legacy
    ],
    roger: [
      'https://wall.alphacoders.com/big.php?i=1323417', // Legendary king
      'https://wall.alphacoders.com/big.php?i=1342768', // Vs Luffy epic
      'https://wall.alphacoders.com/big.php?i=1205469', // With Whitebeard & Oden
      'https://wall.alphacoders.com/big.php?i=1280625', // Iconic smile
    ],
    // Fallback: varied Thousand Sunny / crew adventure scenes
    adventure: [
      'https://wall.alphacoders.com/big.php?i=911401', // Sunny sailing
      'https://wall.alphacoders.com/big.php?i=1330380', // Crew on deck
      'https://wall.alphacoders.com/big.php?i=1346917', // Full Straw Hat crew
      'https://wall.alphacoders.com/big.php?i=1383107', // Luffy on Sunny
      'https://wall.alphacoders.com/big.php?i=1043306', // Epic voyage
      'https://wall.alphacoders.com/big.php?i=860653', // Crew unite
    ],
  };

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

    // True random selection each time
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  downloadImage(): void {
    if (!this.backgroundUrl || !this.affirmation) return;

    const img = new Image();
    img.crossOrigin = 'anonymous'; // Important for external images
    img.src = this.backgroundUrl + '?t=' + this.cacheBuster; // Ensure fresh load

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw background image
      ctx.drawImage(img, 0, 0);

      // Dark semi-transparent overlay for readability
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Text styling
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Quote
      ctx.font = 'bold 80px "Playfair Display", Georgia, serif';
      ctx.fillStyle = 'white';
      ctx.shadowColor = 'black';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;

      // Wrap long text
      const maxWidth = canvas.width * 0.8;
      const lineHeight = 100;
      const words = this.affirmation?.text.split(' ') || [];
      const lines: string[] = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        ctx.font = 'bold 80px "Playfair Display", Georgia, serif';
        if (ctx.measureText(testLine).width < maxWidth) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = words[i];
        }
      }
      lines.push(currentLine);

      // Draw quote lines
      const totalQuoteHeight = lines.length * lineHeight;
      let y = canvas.height / 2 - totalQuoteHeight / 2;

      lines.forEach((line) => {
        ctx.fillText(line, canvas.width / 2, y);
        y += lineHeight;
      });

      // Author
      ctx.font = 'italic 50px "Montserrat", sans-serif';
      ctx.fillStyle = '#f0f0f0';
      ctx.shadowBlur = 15;
      if (this.affirmation) {
        ctx.fillText(`— ${this.affirmation.author} —`, canvas.width / 2, y + 80);
      }

      // Trigger download
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
        0.95
      );
    };

    img.onerror = () => {
      alert('Failed to load image for download. Try again.');
    };
  }
}
