import { Injectable } from '@angular/core';
import { Assignment } from '../common/assignment';
import { env } from '../environment/env.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Question } from '../common/question';
import { Student } from '../common/student';
import { User } from '../common/user';
import { Cluster } from '../common/cluster';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
    private baseUrl: string = `${env.courseAPI}`;
    
    constructor(private httpClient: HttpClient) { }

    getAssignment(id: number): Observable<Assignment>{
        const url = `${this.baseUrl}/get-assignment/${id}/`;
        return this.httpClient.get<Assignment>(url).pipe();
    }

    getQuestions(assignmentId: number): Observable<Question[]> {
        const url = `${this.baseUrl}/get-questions/${assignmentId}/`;
        return this.httpClient.get<Question[]>(url).pipe();
    }

    removeQuestion(formBody: any){
        const url = `${this.baseUrl}/remove-question`;
        return this.httpClient.post(url, formBody, {withCredentials: true});
    }

    getStudentById(id: number): Observable<Student> {
        const url = `${this.baseUrl}/get-student/${id}`;
        return this.httpClient.get<Student>(url).pipe();
    }

    generateCluster(formBody: any) {

    }
    
    getClusters(id: number): Observable<GetResponseCluster> {
        const url = `${this.baseUrl}/get-clusters/${id}`;
        return this.httpClient.get<GetResponseCluster>(url).pipe()
    }
}

interface GetResponseCluster {
    any: [
        {
            "id": number,
            "content": string
        }
    ]
}
