import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {Observable} from 'rxjs';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Modalite} from '../model/modalite';

@Injectable()
export class ModaliteService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(paginatorInformation: PaginatorInformations, serach: string): Observable<PaginatedResult<Modalite>> {
    return this.http.get<PaginatedResult<Modalite>>(this.url + 'modalite'
      + '?perPage=' + paginatorInformation.per_page
      + '&page=' + paginatorInformation.current_page
      + '&search=' + serach);
  }

  public save(modalite: Modalite): Observable<Modalite> {
    return this.http.post<Modalite>(this.url + 'modalite', modalite);
  }

  public update(modalite: Modalite): Observable<Modalite> {
    return this.http.put<Modalite>(this.url + 'modalite', modalite);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'modalite/' + id);
  }

  public findById(id: number): Observable<Modalite> {
    return this.http.get<Modalite>(this.url + 'modalite/' + id);
  }
}
