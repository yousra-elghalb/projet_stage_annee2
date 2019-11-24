import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Role} from '../model/role';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class RoleService {
  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(paginatorInformation: PaginatorInformations, serach: string): Observable<PaginatedResult<Role>> {
    return this.http.get<PaginatedResult<Role>>(this.url + 'role'
      + '?perPage=' + paginatorInformation.per_page
      + '&page=' + paginatorInformation.current_page
      + '&search=' + serach);
  }

  public save(role: Role): Observable<Role> {
    return this.http.post<Role>(this.url + 'role', role);
  }

  public update(role: Role): Observable<Role> {
    return this.http.put<Role>(this.url + 'role', role);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'role/' + id);
  }

  public findById(id: number): Observable<Role> {
    return this.http.get<Role>(this.url + 'role/' + id);
  }

}
