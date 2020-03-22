import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorModeService {
  darkMode = false;
  constructor() { }

  set mode(darkMode: boolean) {
    this.darkMode = darkMode;
  }
}
