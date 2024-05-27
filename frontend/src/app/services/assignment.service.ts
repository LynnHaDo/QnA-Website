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
    
    getClusters(id: number): Observable<Cluster[]> {
        const url = `${this.baseUrl}/get-clusters/${id}`;
        return this.httpClient.get<Cluster[]>(url).pipe()
    }

    getClustersContent(id: number): Observable<GetResponseClusters> {
        const url = `${this.baseUrl}/get-clusters-content/${id}`;
        return this.httpClient.get<GetResponseClusters>(url).pipe()
    }

    postClaimedQuestions(formBody: any){
        const url = `${this.baseUrl}/post-claimed-questions`;
        return this.httpClient.post(url, formBody, {withCredentials: true});
    }

    unclaimQuestions(formBody: any){
        const url = `${this.baseUrl}/unclaim-questions`;
        return this.httpClient.post(url, formBody, {withCredentials: true});
    }

    getClaimedQuestions(taId: number){
        const url = `${this.baseUrl}/get-questions-by-answerer/${taId}`;
        return this.httpClient.get<Question[]>(url).pipe();
    }
}

interface ClusterContent {
    "id": number,
    "content": string
}

interface GetResponseClusters extends Array<ClusterContent[]>{}
