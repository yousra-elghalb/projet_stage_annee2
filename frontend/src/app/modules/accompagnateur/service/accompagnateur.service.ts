import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Accompagnateur} from '../model/accompagnateur';

@Injectable()
export class AccompagnateurService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(serach: string): Observable<Accompagnateur[]> {
    return this.http.get<Accompagnateur[]>(this.url + 'accompagnateur'
      + '?search=' + serach);
  }

  public save(accompagnateur: Accompagnateur): Observable<Accompagnateur> {
    return this.http.post<Accompagnateur>(this.url + 'accompagnateur', accompagnateur);
  }

  public update(accompagnateur: Accompagnateur): Observable<Accompagnateur> {
    return this.http.put<Accompagnateur>(this.url + 'accompagnateur', accompagnateur);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'accompagnateur/' + id);
  }

  public findById(id: number): Observable<Accompagnateur> {
    return this.http.get<Accompagnateur>(this.url + 'accompagnateur/' + id);
  }
}
