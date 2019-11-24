import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Societe} from '../model/societe';

@Injectable()
export class SocieteService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(serach: string): Observable<Societe[]> {
    return this.http.get<Societe[]>(this.url + 'societe'
      + '?search=' + serach);
  }

  public save(societe: Societe): Observable<Societe> {
    return this.http.post<Societe>(this.url + 'societe', societe);
  }

  public update(societe: Societe): Observable<Societe> {
    return this.http.put<Societe>(this.url + 'societe', societe);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'societe/' + id);
  }

  public findById(id: number): Observable<Societe> {
    return this.http.get<Societe>(this.url + 'societe/' + id);
  }
}
