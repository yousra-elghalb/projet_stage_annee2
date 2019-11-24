import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Commercial} from '../model/commercial';

@Injectable()
export class CommercialService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(serach: string): Observable<Commercial[]> {
    return this.http.get<Commercial[]>(this.url + 'commercial'
      + '?search=' + serach);
  }

  public findAllCommerciauxExterne(): Observable<Commercial[]> {
    return this.http.get<Commercial[]>(this.url + 'commercial/externe');
  }

  public save(commercial: Commercial): Observable<Commercial> {
    return this.http.post<Commercial>(this.url + 'commercial', commercial);
  }

  public update(commercial: Commercial): Observable<Commercial> {
    return this.http.put<Commercial>(this.url + 'commercial', commercial);
  }

  public updateProfile(commercial: Commercial): Observable<Commercial> {
    return this.http.put<Commercial>(this.url + 'commercial/profile', commercial);
  }

  public changePassword(user): Observable<Commercial> {
    return this.http.put<Commercial>(this.url + 'commercial/changePassword', user);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'commercial/' + id);
  }

  public findById(id: number): Observable<Commercial> {
    return this.http.get<Commercial>(this.url + 'commercial/' + id);
  }
}
