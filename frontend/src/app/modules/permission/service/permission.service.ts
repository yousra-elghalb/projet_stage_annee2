import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {Observable} from 'rxjs';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Permission} from '../model/permission';

@Injectable()
export class PermissionService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(serach: string): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.url + 'permission'
      + '?search=' + serach);
  }

  public findById(id: number): Observable<Permission> {
    return this.http.get<Permission>(this.url + 'permission/' + id);
  }
}
