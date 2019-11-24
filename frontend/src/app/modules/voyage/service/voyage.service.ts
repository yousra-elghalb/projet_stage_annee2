import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Voyage} from '../model/voyage';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Role} from '../../role/model/role';

@Injectable()
export class VoyageService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(paginatorInformation: PaginatorInformations, serach: string): Observable<PaginatedResult<Voyage>> {
    return this.http.get<PaginatedResult<Voyage>>(this.url + 'voyage'
      + '?perPage=' + paginatorInformation.per_page
      + '&page=' + paginatorInformation.current_page
      + '&search=' + serach);
  }

  public save(voyage: Voyage): Observable<Voyage> {
    return this.http.post<Voyage>(this.url + 'voyage', voyage);
  }

  public update(voyage: Voyage): Observable<Voyage> {
    return this.http.put<Voyage>(this.url + 'voyage', voyage);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'voyage/' + id);
  }

  public findById(id: number): Observable<Voyage> {
    return this.http.get<Voyage>(this.url + 'voyage/' + id);
  }
}
