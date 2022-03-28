import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  readonly path = 'http://localhost:3030';

  constructor(private http: HttpClient) { }

  getCities(filter: string = '', limit = 50): Observable<any> {
    return this.http.get(this.path + '/cities', { params: { filter } });
  }

  getPreferredCities(): Observable<any> {
    return this.http.get(this.path + '/preferences/cities');
  }

  patchPreferred(id: number, preferred: boolean): Observable<any> {
    return this.http.patch(this.path + '/preferences/cities', { [id]: preferred })
  }

}
