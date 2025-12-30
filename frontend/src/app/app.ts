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
    const images: { [key: string]: string } = {
      luffy:
        'https://wallpapers.com/images/hd/one-piece-pirate-monkey-d-luffy-1nr4z4s5iid04tdf.jpg',
      zoro: 'https://static0.cbrimages.com/wordpress/wp-content/uploads/2024/06/zoro-one-piece.jpg',
      robin:
        'https://wallpapers.com/images/hd/break-time-with-nico-robin-one-piece-dh68ev2m8h7ydsmd.jpg',
      whitebeard:
        'https://www.specfictionshop.com/cdn/shop/products/21851623408237_.pic_2000x.jpg?v=1623518485',
      roger: 'https://i.ytimg.com/vi/mnc8qacaXyM/maxresdefault.jpg',
      adventure:
        'https://wallpapers.com/images/hd/thousand-sunny-1920-x-1080-wallpaper-eckit9rj78c1wf8r.jpg',
    };
    return images[character] || images['adventure'];
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
