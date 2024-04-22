import { Injectable } from '@angular/core';
import { env } from '../environment/env.development';
import { HttpClient } from '@angular/common/http';
import { Question } from '../common/question';

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
}
