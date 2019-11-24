import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {Observable} from 'rxjs';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {OffreVoyageLimited} from '../model/offre-voyage-limited';
import {Voyageur} from '../../voyageur/model/voyageur';

@Injectable()
export class OffreVoyageLimitedService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(paginatorInformation: PaginatorInformations, serach: string): Observable<PaginatedResult<OffreVoyageLimited>> {
    return this.http.get<PaginatedResult<OffreVoyageLimited>>(this.url + 'offreVoyage/limited'
      + '?perPage=' + paginatorInformation.per_page
      + '&page=' + paginatorInformation.current_page
      + '&search=' + serach);
  }

  public save(vdata: OffreVoyageLimited[]): Observable<OffreVoyageLimited> {
    return this.http.post<OffreVoyageLimited>(this.url + 'offreVoyage/limited', {data: vdata});
  }

  public update(offreVoyageLimited: OffreVoyageLimited): Observable<OffreVoyageLimited> {
    return this.http.put<OffreVoyageLimited>(this.url + 'offreVoyage/limited', offreVoyageLimited);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'offreVoyage/limited/' + id);
  }

  public findById(id: number): Observable<OffreVoyageLimited> {
    return this.http.get<OffreVoyageLimited>(this.url + 'offreVoyage/limited/' + id);
  }

  public findAllByOffreVoyageId(id: any,
                                paginatorInformations: PaginatorInformations,
                                search: string): Observable<PaginatedResult<OffreVoyageLimited>> {
    return this.http.get<PaginatedResult<OffreVoyageLimited>>(this.url + 'offreVoyage/' + id + '/limited'
      + '?perPage=' + paginatorInformations.per_page
      + '&page=' + paginatorInformations.current_page
      + '&search=' + search);
  }
}
