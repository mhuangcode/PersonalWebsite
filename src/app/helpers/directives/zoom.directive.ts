import { Directive, ElementRef, AfterViewInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IconIds } from 'src/app/comps/ui/main-layout/text-layer/text-layer.component';

@Directive({
  selector: '[appZoom]'
})
export class ZoomDirective implements OnChanges {
  @Input() current: IconIds = 0;
  @Input() target: IconIds = -1;

  private active = false;

  constructor(private elem: ElementRef) { 
    this.elem.nativeElement.style.opacity = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.elem) {
      
      this.handleIdChange();
    }
  }

  private handleIdChange(): void {
    
    if (this.active) {
      if (this.current === IconIds.null || this.current !== this.target) {
        this.elem.nativeElement.style.opacity = 0;
        this.active = false;
      }
    } else if (this.current === this.target) {
      this.active = true;
      this.elem.nativeElement.style.opacity = 1;
    }
  }

}
