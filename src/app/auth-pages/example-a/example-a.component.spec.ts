import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleAComponent } from './example-a.component';

describe('ExampleAComponent', () => {
  let component: ExampleAComponent;
  let fixture: ComponentFixture<ExampleAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
