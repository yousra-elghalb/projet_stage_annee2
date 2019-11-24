import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Agence} from '../model/agence';

@Injectable()
export class AgenceService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(serach: string): Observable<Agence[]> {
    return this.http.get<Agence[]>(this.url + 'agence'
      + '?search=' + serach);
  }

  public save(agence: Agence): Observable<Agence> {
    return this.http.post<Agence>(this.url + 'agence', agence);
  }

  public update(agence: Agence): Observable<Agence> {
    return this.http.put<Agence>(this.url + 'agence', agence);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'agence/' + id);
  }

  public findById(id: number): Observable<Agence> {
    return this.http.get<Agence>(this.url + 'agence/' + id);
  }
}
