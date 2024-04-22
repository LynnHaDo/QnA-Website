import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../common/course';
import { Observable } from 'rxjs';
import { env } from '../environment/env.development';
import { Assignment } from '../common/assignment';
import { Student } from '../common/student';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
    private baseUrl: string = `${env.courseAPI}`;

    getCourse(courseId: number): Observable<Course>{
        const url = `${this.baseUrl}/get-courses/${courseId}/`;
        return this.httpClient.get<Course>(url);
    } 

    getCourses(email: string){
        const url = `${this.baseUrl}/get-courses/${email}/`;
        return this.httpClient.get<GetResponseCourses>(url).pipe()
    }

    getAssignments(courseId: number): Observable<Assignment[]> {
        const url = `${this.baseUrl}/get-assignments/${courseId}/`;
        return this.httpClient.get<Assignment[]>(url).pipe();
    }

    removeStudent(formBody: any){
        const url = `${this.baseUrl}/remove-student`;
        return this.httpClient.post(url, formBody, {withCredentials: true});
    }

    getStudents(courseId: number): Observable<Student[]> {
        const url = `${this.baseUrl}/get-students/${courseId}/`;
        return this.httpClient.get<Student[]>(url).pipe();
    }

    constructor(private httpClient: HttpClient) { }
}

interface GetResponseCourses {
    "student-courses": Course[],
    "ta-courses": Course[],
    "instructor-courses": Course[]
}


