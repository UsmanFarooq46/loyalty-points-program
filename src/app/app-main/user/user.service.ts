import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  ApiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUserTransactions(payload: any) {
    return this.http.post<any>(
      this.ApiUrl + 'currAlli/memberTransaction',
      payload
    );
  }

  getUserData(payload: any) {
    return this.http.post<any>(this.ApiUrl + 'currAlli/memberData', payload);
  }
}
