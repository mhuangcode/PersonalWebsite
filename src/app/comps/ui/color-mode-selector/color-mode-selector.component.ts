import { Component, OnInit } from '@angular/core';
import { ColorModeService } from 'src/app/services/color-mode.service';

@Component({
  selector: 'app-color-mode-selector',
  templateUrl: './color-mode-selector.component.html',
  styleUrls: ['./color-mode-selector.component.scss']
})
export class ColorModeSelectorComponent implements OnInit {

  constructor(private colorService: ColorModeService) { }

  ngOnInit(): void {
  }

  get toggleModeText(): string {
    return this.darkMode ?  'Light Mode' : 'Dark Mode';
  }

  get currentMode(): string {
    return this.darkMode ? 'Dark Mode' : 'Light Mode';
  }
  private get darkMode(): boolean {
    return this.colorService.darkMode;
  }

  public toggleMode(): void {
    this.colorService.mode = !this.darkMode;
  }

}
