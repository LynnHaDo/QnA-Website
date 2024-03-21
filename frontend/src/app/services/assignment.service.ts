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
    
    sampleAssignment1: Assignment = new Assignment(1, "PLQ #1", true, 100, 1);
    sampleAssignment2: Assignment = new Assignment(2, "PLQ #2", false, 180, 1);
    sampleAssignment3: Assignment = new Assignment(3, "PLQ #3", false, 190, 1);
    sampleAssignment4: Assignment = new Assignment(4, "PLQ #4", false, 240, 1);

    constructor(private httpClient: HttpClient) { }

    getAssignment(theCourseId: number, theAssignmentId: number): Observable<Assignment>{
        const url = `${this.baseUrl}/${theCourseId}/${theAssignmentId}`;

        if (!env.production){
            const sampleAssignment: BehaviorSubject<Assignment> = new BehaviorSubject(this.sampleAssignment1);
            return sampleAssignment.asObservable();
        }

        return this.httpClient.get<Assignment>(url);
    }

    getAssignments(theCourseId: number): Observable<Assignment[]>{
        const url = `${this.baseUrl}/${theCourseId}`;

        if (!env.production){
            const listAssignments: BehaviorSubject<Assignment[]> = new BehaviorSubject([this.sampleAssignment1, this.sampleAssignment2, this.sampleAssignment3, this.sampleAssignment4]);
            return listAssignments.asObservable();
        }

        return this.httpClient.get<Assignment[]>(url);
    }

    getActiveAssignments(theCourseId: number): Observable<Assignment[]>{
        const activeAssignments: BehaviorSubject<Assignment[]> = new BehaviorSubject<Assignment[]>([]);
        const lsActiveAssignments: Assignment[] = [];

        this.getAssignments(theCourseId).subscribe(data => {
            for (let asm of data){
                if (!asm.status){
                    lsActiveAssignments.push(asm);
                }
            }
            activeAssignments.next(lsActiveAssignments);
        })

        return activeAssignments.asObservable()
    }
    
}
