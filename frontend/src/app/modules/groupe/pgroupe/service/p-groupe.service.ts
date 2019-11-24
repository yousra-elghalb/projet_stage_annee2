import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Groupe} from '../../../offre-voyage/model/groupe';
import {PGroupe} from '../model/p-groupe';
import {environment} from '../../../../../environments/environment';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../../shared_models/paginated-result';
import {Facture} from '../../model/facture';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class PGroupeService {
  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(idOffreVoyage,
                 paginatorInformation: PaginatorInformations = {current_page: 1, per_page: 15},
                 search: {
                   search: string,
                   ville?: string,
                   etat?: string,
                   modalites?: [],
                   type?: string,
                 } = {search: ''}): Observable<PaginatedResult<PGroupe>> {
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
    if (search.modalites) {
      vparams = vparams.append('modalites', search.modalites.toString());
    }
    return this.http.get<PaginatedResult<PGroupe>>(this.url + 'offreVoyage/' + idOffreVoyage + '/voyageurs', {params: vparams});
  }

  public save(data: PGroupe): Observable<any> {
    return this.http.post<any>(this.url + 'offreVoyage/voyageurs', data);
  }


  public update(data: PGroupe): Observable<any> {
    return this.http.put<any>(this.url + 'offreVoyage/voyageurs', data);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'offreVoyage/voyageurs/' + id);
  }

  public findById(id): Observable<PGroupe> {
    return this.http.get<PGroupe>(this.url + 'offreVoyage/voyageurs/' + id);
  }

}
