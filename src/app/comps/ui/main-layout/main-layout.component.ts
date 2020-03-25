import { Component, OnInit } from "@angular/core";
import { ColorModeService } from "src/app/services/color-mode.service";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"]
})
export class MainLayoutComponent implements OnInit {
  constructor(private colorService: ColorModeService) {}

  ngOnInit(): void {}

  get colorModeClass(): string {
    return this.colorService.darkMode ? "dark" : "light";
  }

  get bgClass(): string {
    return this.colorService.darkMode ? "bg-dark" : "bg-light";
  }
}
