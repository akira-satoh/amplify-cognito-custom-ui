import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleCComponent } from './example-c.component';

describe('ExampleCComponent', () => {
  let component: ExampleCComponent;
  let fixture: ComponentFixture<ExampleCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
