import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeKey = 'theme';

  constructor() {
    this.loadTheme();
  }

  getCurrentTheme(): 'light' | 'dark' {
    return localStorage.getItem(this.themeKey) as 'light' | 'dark';
  }

  setTheme(theme: 'light' | 'dark'): void {
    document.documentElement.setAttribute('data-theme', theme);

    localStorage.setItem(this.themeKey, theme);
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey) as 'light' | 'dark';
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }

  toggleTheme(): void {
    const currentTheme =
      document.documentElement.getAttribute('data-theme') === 'light'
        ? 'dark'
        : 'light';
    this.setTheme(currentTheme);
  }
}
