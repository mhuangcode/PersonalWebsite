import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextLayerComponent } from './text-layer.component';

describe('TextLayerComponent', () => {
  let component: TextLayerComponent;
  let fixture: ComponentFixture<TextLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
