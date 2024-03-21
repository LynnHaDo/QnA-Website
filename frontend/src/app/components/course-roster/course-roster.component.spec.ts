import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseRosterComponent } from './course-roster.component';

describe('CourseRosterComponent', () => {
  let component: CourseRosterComponent;
  let fixture: ComponentFixture<CourseRosterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseRosterComponent]
    });
    fixture = TestBed.createComponent(CourseRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
