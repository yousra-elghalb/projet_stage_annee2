import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Depense} from '../model/depense';

@Injectable()
export class DepenseService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(serach: string): Observable<Depense[]> {
    return this.http.get<Depense[]>(this.url + 'depense'
      + '?search=' + serach);
  }

  public save(depense: Depense): Observable<Depense> {
    return this.http.post<Depense>(this.url + 'depense', depense);
  }

  public update(depense: Depense): Observable<Depense> {
    return this.http.put<Depense>(this.url + 'depense', depense);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'depense/' + id);
  }

  public findById(id: number): Observable<Depense> {
    return this.http.get<Depense>(this.url + 'depense/' + id);
  }
}
