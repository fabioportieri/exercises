import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsPaginatorComponent } from './rxjs-paginator.component';

describe('RxjsPaginatorComponent', () => {
  let component: RxjsPaginatorComponent;
  let fixture: ComponentFixture<RxjsPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxjsPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
