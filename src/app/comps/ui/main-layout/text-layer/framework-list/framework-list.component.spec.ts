import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameworkListComponent } from './framework-list.component';

describe('FrameworkListComponent', () => {
  let component: FrameworkListComponent;
  let fixture: ComponentFixture<FrameworkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameworkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameworkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
