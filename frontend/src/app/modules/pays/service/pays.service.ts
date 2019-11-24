import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {Observable} from 'rxjs';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Pays} from '../model/pays';

@Injectable()
export class PaysService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(serach: string): Observable<Pays[]> {
    return this.http.get<Pays[]>(this.url + 'pays'
      + '?search=' + serach);
  }

  public save(pays: Pays): Observable<Pays> {
    return this.http.post<Pays>(this.url + 'pays', pays);
  }

  public update(pays: Pays): Observable<Pays> {
    return this.http.put<Pays>(this.url + 'pays', pays);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'pays/' + id);
  }

  public findById(id: number): Observable<Pays> {
    return this.http.get<Pays>(this.url + 'pays/' + id);
  }
}
