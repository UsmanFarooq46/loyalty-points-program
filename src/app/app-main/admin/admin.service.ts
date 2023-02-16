import { environment } from './../../../environments/environment.prod';
import { HttpClient,} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiURL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllUser() {
    return this.http.get<any>(this.apiURL + 'auth/getAllUsers');
  }

  sendPoints(payload: any) {
    return this.http.post<any>(this.apiURL + 'currAlli//sendMoney', payload);
  }

  getAllTransaction() {
    return this.http.get<any>(this.apiURL + 'currAlli/all_transactions');
  }
}
