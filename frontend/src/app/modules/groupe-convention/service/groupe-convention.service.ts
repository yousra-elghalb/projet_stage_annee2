import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GroupeConvention} from '../model/groupe-convention';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Voyageur} from '../../voyageur/model/voyageur';

@Injectable()
export class GroupeConventionService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(
    paginatorInformation: PaginatorInformations
      = {current_page: 0, per_page: 15},
    serach = '', type = ''):
    Observable<PaginatedResult<GroupeConvention>> {
    return this.http.get<PaginatedResult<GroupeConvention>>(this.url + 'groupeConvention'
      + '?perPage=' + paginatorInformation.per_page
      + '&page=' + paginatorInformation.current_page
      + '&type=' + type
      + '&search=' + serach);
  }

  public save(groupeConvention: GroupeConvention): Observable<GroupeConvention> {
    return this.http.post<GroupeConvention>(this.url + 'groupeConvention', groupeConvention);
  }

  public update(groupeConvention: GroupeConvention): Observable<GroupeConvention> {
    return this.http.put<GroupeConvention>(this.url + 'groupeConvention', groupeConvention);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'groupeConvention/' + id);
  }

  public findById(id: number): Observable<GroupeConvention> {
    return this.http.get<GroupeConvention>(this.url + 'groupeConvention/' + id);
  }
}
