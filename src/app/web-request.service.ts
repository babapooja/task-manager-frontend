import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  // GET REQUEST
  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  // POST REQUEST
  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  // PATCH REQUEST
  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  // DELETE REQUEST
  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  login(email: string, password: string) {
    return this.http.post(
      `${this.ROOT_URL}/users/login`,
      { email, password },
      { observe: 'response' }
    );
  }

  signup(email: string, password: string) {
    return this.http.post(
      `${this.ROOT_URL}/users`,
      { email, password },
      { observe: 'response' }
    );
  }
}
