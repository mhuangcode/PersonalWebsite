import { Component, OnInit, ViewEncapsulation } from "@angular/core";

export enum IconIds {
  null,
  github,
  linkedin,
  email
}

@Component({
  selector: "app-text-layer",
  templateUrl: "./text-layer.component.html",
  styleUrls: ["./text-layer.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class TextLayerComponent implements OnInit {
  selectedButton: IconIds = IconIds.null;
  constructor() {}

  ngOnInit(): void {}

  onBtnHover(target: IconIds) {
    console.log(target);
    this.selectedButton = target;
  }
}
