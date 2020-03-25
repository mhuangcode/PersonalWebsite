import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ColorModeService {
  darkMode = false;
  constructor() {
    this.mode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  set mode(darkMode: boolean) {
    this.darkMode = darkMode;
  }
}
