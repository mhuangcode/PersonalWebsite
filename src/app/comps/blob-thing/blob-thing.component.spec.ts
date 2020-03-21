import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlobThingComponent } from './blob-thing.component';

describe('BlobThingComponent', () => {
  let component: BlobThingComponent;
  let fixture: ComponentFixture<BlobThingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlobThingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlobThingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
