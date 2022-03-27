import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }

  getCities(filter: string = ''): Observable<any> {
    return this.http.get('http://localhost:3030/cities', { params: { filter } });
  }

}
