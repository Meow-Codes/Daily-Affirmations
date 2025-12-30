import { Component, OnInit, ChangeDetectorRef } from '@angular/core';  // ← Add ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { AffirmationService, Affirmation } from './services/affirmation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  affirmation: Affirmation | null = null;
  backgroundUrl: string = '';
  cacheBuster: number = 0;
  loading = true;

  constructor(
    private affService: AffirmationService,
    private cdr: ChangeDetectorRef  // ← Inject it
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
        this.cacheBuster = Date.now();

        this.loading = false;

        // ← THIS FORCES THE VIEW TO UPDATE IMMEDIATELY
        this.cdr.detectChanges();

        console.log('View forced to update');
      },
      error: (err) => {
        console.error('❌ API Error:', err);
        this.loading = false;
        this.cdr.detectChanges();
        alert('Failed to load. Check console for details.');
      },
      complete: () => {
        console.log('🏁 Request completed');
      }
    });
  }

  downloadImage(): void {
    if (!this.backgroundUrl) return;

    fetch(this.backgroundUrl)
      .then(res => res.blob())
      .then(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `daily-affirmation-${new Date().toISOString().slice(0,10)}.jpg`;
        a.click();
      });
  }
}