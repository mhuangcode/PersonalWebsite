import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorModeService {
  darkMode = false;
  constructor() { 
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkMode = true;
    }
  }

  set mode(darkMode: boolean) {
    this.darkMode = darkMode;
  }
}
