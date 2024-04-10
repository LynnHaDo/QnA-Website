import { Injectable } from '@angular/core';
import { Assignment } from '../common/assignment';
import { env } from '../environment/env.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
    private baseUrl: string = `${env.courseAPI}`;
    

    constructor(private httpClient: HttpClient) { }

    getAssignment(theCourseId: number, theAssignmentId: number){
        
    }

    getAssignments(theCourseId: number){
        
    }
    
}
