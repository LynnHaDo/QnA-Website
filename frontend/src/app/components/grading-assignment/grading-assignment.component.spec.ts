import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingAssignmentComponent } from './grading-assignment.component';

describe('GradingAssignmentComponent', () => {
  let component: GradingAssignmentComponent;
  let fixture: ComponentFixture<GradingAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GradingAssignmentComponent]
    });
    fixture = TestBed.createComponent(GradingAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
