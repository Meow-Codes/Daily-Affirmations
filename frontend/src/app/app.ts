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
      'https://wall.alphacoders.com/big.php?i=1358580', // Gear 5 epic
      'https://wall.alphacoders.com/big.php?i=1323165', // Gear 5 action
      'https://wall.alphacoders.com/big.php?i=1369365', // Recent stunning
      'https://wall.alphacoders.com/big.php?i=1342304', // Adventure vibe
      'https://wall.alphacoders.com/big.php?i=1404838', // With giants (new 2025)
      'https://wall.alphacoders.com/big.php?i=1352212', // Classic power
      'https://wall.alphacoders.com/big.php?i=1345518', // King of Pirates pose
      'https://wall.alphacoders.com/big.php?i=1332278', // Gear 5 transformation
      'https://wall.alphacoders.com/big.php?i=682881', // Iconic smile
      'https://wall.alphacoders.com/big.php?i=788705', // RoninGFX art
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
    if (!this.backgroundUrl) return;
    fetch(this.backgroundUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `onepiece-affirmation-${new Date().toISOString().slice(0, 10)}.jpg`;
        a.click();
      });
  }
}
