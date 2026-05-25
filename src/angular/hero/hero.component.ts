import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  // Real-time dynamic clock tracking the time in USA (Eastern Time)
  clockTime: string = '02:16 PM';
  private timer: any;

  // Header Nav Items from design
  navItems = [
    { label: 'Features', hasDropdown: true },
    { label: 'How It Works', hasDropdown: false },
    { label: 'About', hasDropdown: false },
    { label: 'Product', hasDropdown: false },
    { label: 'Blogs', hasDropdown: false }
  ];

  // Stats Card configurations
  stats = [
    {
      value: '150+',
      superscript: '(*)',
      count: '(60)',
      label: 'Projects delivered',
      highlighted: false
    },
    {
      value: '98%',
      superscript: '(*)',
      count: '(102)',
      label: 'Client satisfaction',
      highlighted: true
    }
  ];

  // Client Avatar placeholders mimicking the reference image designs
  avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80'
  ];

  // List of Partners as seen in the reference image
  partners = [
    { name: 'BookStore' },
    { name: 'zantic' },
    { name: 'Crona' },
    { name: 'Mercury' },
    { name: 'Wager' }
  ];

  ngOnInit() {
    this.updateClock();
    // Keep clock ticking in perfect state synchronization
    this.timer = setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  // Calculates the current time in USA (Eastern Time Zone, matching the image "PM (USA)")
  private updateClock() {
    try {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      
      const formatter = new Intl.DateTimeFormat('en-US', options);
      // Remove trailing seconds if needed or keep it active for feedback
      this.clockTime = formatter.format(new Date());
    } catch (e) {
      // Fallback
      const date = new Date();
      this.clockTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
  }

  getStarted() {
    console.log('Redirecting to sign up or get started...');
  }
}
