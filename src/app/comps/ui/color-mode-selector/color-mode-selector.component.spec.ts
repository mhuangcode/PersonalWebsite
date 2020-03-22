import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorModeSelectorComponent } from './color-mode-selector.component';

describe('ColorModeSelectorComponent', () => {
  let component: ColorModeSelectorComponent;
  let fixture: ComponentFixture<ColorModeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorModeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorModeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
