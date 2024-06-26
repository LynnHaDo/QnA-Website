import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { env } from '../environment/env.development';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    
    static authEmitter = new EventEmitter<boolean>();
    static isAuthenticated = new BehaviorSubject<boolean>(false);

    private baseUrl = env.registerAPI;
    accessToken = '';
    userId!: number;

  constructor(private httpClient: HttpClient) { }

  register(formBody: any){
    return this.httpClient.post(`${this.baseUrl}/register`, formBody)
  }

  login(formBody: any){
    return this.httpClient.post(`${this.baseUrl}/login`, formBody, {withCredentials: true})
  }

  googleLogin(formBody: any){
    return this.httpClient.post(`${this.baseUrl}/google-auth`, formBody, {withCredentials: true})
  }

  refresh(){
    return this.httpClient.post(`${this.baseUrl}/refresh`, {}, {withCredentials: true})
  }

  user(){
    return this.httpClient.get(`${this.baseUrl}/user`)
  }

  logout(){
    return this.httpClient.post(`${this.baseUrl}/logout`, {}, {withCredentials: true})
  }


}
