import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser'; // ← Added
import { AffirmationService, Affirmation } from './services/affirmation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit {
[x: string]: any;
  affirmation: Affirmation | null = null;
  backgroundUrl: string = '';
  safeBackgroundStyle: SafeStyle | null = null; // ← New property for safe style
  loading = true;
  cacheBuster: number = Date.now();  // At class level

  constructor(
    private affService: AffirmationService,
    private sanitizer: DomSanitizer // ← Inject DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadNew();
  }

  loadNew(): void {
    this.loading = true;
    console.log('🚀 Fetching new affirmation and background...');

    this.affService.getDaily().subscribe({
      next: (data) => {
        console.log('✅ Success! Received data:', data);
        this.affirmation = data.affirmation;
        this.backgroundUrl = data.background.url;
        this.cacheBuster = Date.now();  // Forces fresh load every time

        // ADD THIS: cache-buster to force fresh image load every time
        const uniqueUrl = `${this.backgroundUrl}&t=${Date.now()}`;

        this.safeBackgroundStyle = this.sanitizer.bypassSecurityTrustStyle(`url(${uniqueUrl})`);

        console.log('🖼 Background URL (with cache-buster):', uniqueUrl);

        this.loading = false;
      },
      error: (err) => {
        console.error('❌ API Error:', err);
        console.error('Status:', err.status);
        console.error('Message:', err.message);
        console.error('Full error object:', err);
        this.loading = false;
        alert('Failed to load affirmation. Check console (F12) for details.');
      },
      complete: () => {
        console.log('🏁 Request completed');
      },
    });
  }

  downloadImage(): void {
    if (!this.backgroundUrl) return;

    fetch(this.backgroundUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `daily-affirmation-${new Date().toISOString().slice(0, 10)}.jpg`;
        a.click();
      })
      .catch((err) => console.error('Download failed:', err));
  }
}
