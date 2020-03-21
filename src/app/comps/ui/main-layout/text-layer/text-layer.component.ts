import { Component, OnInit } from '@angular/core';

export enum IconIds {
  null,
  github,
  linkedin,
  email
}

@Component({
  selector: 'app-text-layer',
  templateUrl: './text-layer.component.html',
  styleUrls: ['./text-layer.component.scss']
})
export class TextLayerComponent implements OnInit {
  selectedButton: IconIds = IconIds.null;
  constructor() { }

  ngOnInit(): void {
  }

  onBtnHover(target: IconIds) {
    console.log(target)
    this.selectedButton = target;
  } 
}
