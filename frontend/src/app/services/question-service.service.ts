import { Injectable } from '@angular/core';
import { env } from '../environment/env.development';
import { HttpClient } from '@angular/common/http';
import { Question } from '../common/question';
import { Answer } from '../common/answer';

@Injectable({
  providedIn: 'root',
})
export class QuestionServiceService {
  private baseUrl: string = `${env.courseAPI}`;

  constructor(private httpClient: HttpClient) {}

  getQuestion(id: number) {
    const url = `${this.baseUrl}/get-question/${id}/`;
    return this.httpClient.get<Question>(url).pipe();
  }

  getAnswerToQuestion(qId: number){
    const url = `${this.baseUrl}/get-answer/${qId}`;
    return this.httpClient.get<Answer>(url).pipe();
  }

  postAnswer(formBody: any){
    const url = `${this.baseUrl}/send-answer`;
    return this.httpClient.post(url, formBody, {withCredentials: true});
  }
}
