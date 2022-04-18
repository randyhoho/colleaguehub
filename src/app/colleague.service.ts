import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colleague } from './colleague';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ColleagueService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getColleagues(): Observable<Colleague[]> {
    return this.http.get<Colleague[]>(`${this.apiServerUrl}/colleague/all`);
  }

  public addColleague(colleague: Colleague): Observable<Colleague> {
    return this.http.post<Colleague>(`${this.apiServerUrl}/colleague/add`, colleague);
  }

  public updateColleague(colleague: Colleague): Observable<Colleague> {
    return this.http.put<Colleague>(`${this.apiServerUrl}/colleague/update`, colleague);
  }

  public deleteColleague(colleagueId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/colleague/delete/${colleagueId}`);
  }
}
