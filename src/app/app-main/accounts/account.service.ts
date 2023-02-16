import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  ApiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  Login(data: any) {
    return this.http.post<any>(this.ApiUrl + 'auth/login', data);
  }

  sendEmailPass(payload: any) {
    return this.http.post<any>(this.ApiUrl + 'auth/forgotPass', payload);
  }

  registerMember(payload: any) {
    return this.http.post<any>(this.ApiUrl + 'auth/addNewUser', payload);
  }

  createMember(payload: any) {
    return this.http.post<any>(this.ApiUrl + 'currAlli/addNewMember', payload);
  }

  singupBonus(payload: any) {
    return this.http.post<any>(this.ApiUrl + 'currAlli/sendMoney', payload);
  }

  diretAccrual(payload: any) {
    return this.http.post<any>(this.ApiUrl + 'currAlli/directAccrual', payload);
  }
}
