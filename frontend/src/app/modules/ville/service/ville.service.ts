import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ville} from '../model/ville';

@Injectable()
export class VilleService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(serach: string): Observable<Ville[]> {
    return this.http.get<Ville[]>(this.url + 'ville'
      + '?search=' + serach);
  }

  public save(ville: Ville): Observable<Ville> {
    return this.http.post<Ville>(this.url + 'ville', ville);
  }

  public update(ville: Ville): Observable<Ville> {
    return this.http.put<Ville>(this.url + 'ville', ville);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'ville/' + id);
  }

  public findById(id: number): Observable<Ville> {
    return this.http.get<Ville>(this.url + 'ville/' + id);
  }
}
