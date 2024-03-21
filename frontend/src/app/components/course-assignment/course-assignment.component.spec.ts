import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAssignmentComponent } from './course-assignment.component';

describe('CourseAssignmentComponent', () => {
  let component: CourseAssignmentComponent;
  let fixture: ComponentFixture<CourseAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseAssignmentComponent]
    });
    fixture = TestBed.createComponent(CourseAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
