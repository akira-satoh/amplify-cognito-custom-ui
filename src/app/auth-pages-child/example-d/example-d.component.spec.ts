import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleDComponent } from './example-d.component';

describe('ExampleDComponent', () => {
  let component: ExampleDComponent;
  let fixture: ComponentFixture<ExampleDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
