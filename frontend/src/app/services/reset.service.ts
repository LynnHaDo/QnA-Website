import { Injectable } from '@angular/core';
import { env } from '../environment/env.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  forgot(body: any){
    return this.httpClient.post(`${env.registerAPI}/forgot`, body);
  }

  reset(body: any){
    return this.httpClient.post(`${env.registerAPI}/reset`, body);
  }
}
