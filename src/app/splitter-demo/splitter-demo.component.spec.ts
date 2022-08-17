import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitterDemoComponent } from './splitter-demo.component';

describe('SplitterDemoComponent', () => {
  let component: SplitterDemoComponent;
  let fixture: ComponentFixture<SplitterDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitterDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitterDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
