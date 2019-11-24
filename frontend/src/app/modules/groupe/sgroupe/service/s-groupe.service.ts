import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SGroupe} from '../model/s-groupe';
import {environment} from '../../../../../environments/environment';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../../shared_models/paginated-result';
import {Groupe} from '../../../offre-voyage/model/groupe';
import {Facture} from '../../model/facture';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class SGroupeService {
  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findGroupeByOffreVoyageId(id): Observable<SGroupe> {
    return this.http.get<SGroupe>(this.url + 'offreVoyage/' + id + '/groupe');
  }

  public findAll(idOffreVoyage,
                 paginatorInformation: PaginatorInformations = {current_page: 1, per_page: 15},
                 search: {
                   search: string,
                   ville?: string,
                   etat?: string,
                   type?: string,
                 } = {search: ''}): Observable<PaginatedResult<SGroupe>> {
    let vparams = new HttpParams();
    vparams = vparams.append('perPage', String(paginatorInformation.per_page));
    vparams = vparams.append('page', String(paginatorInformation.current_page));
    if (search.search) {
      vparams = vparams.append('search', search.search);
    }
    if (search.etat) {
      vparams = vparams.append('etat', search.etat);
    }
    if (search.ville) {
      vparams = vparams.append('ville', search.ville);
    }
    if (search.type) {
      vparams = vparams.append('type', search.type);
    }
    return this.http.get<PaginatedResult<SGroupe>>(this.url + 'offreVoyage/' + idOffreVoyage + '/voyageurs', {params: vparams});
  }

  public save(data: SGroupe): Observable<any> {
    return this.http.post<any>(this.url + 'offreVoyage/groupe', data);
  }

  public update(data: SGroupe): Observable<any> {
    return this.http.put<any>(this.url + 'offreVoyage/groupe', data);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'offreVoyage/groupe/' + id);
  }

  public findById(id): Observable<SGroupe> {
    return this.http.get<SGroupe>(this.url + 'offreVoyage/groupe/' + id);
  }

}
