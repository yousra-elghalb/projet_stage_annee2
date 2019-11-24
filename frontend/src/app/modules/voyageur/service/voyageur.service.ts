import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Voyageur} from '../model/voyageur';
import {Observable} from 'rxjs';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class VoyageurService {
  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(paginatorInformation: PaginatorInformations, serach: string, vfidele: any, black: any):
    Observable<PaginatedResult<Voyageur>> {

    let vparams = new HttpParams();
    vparams = vparams.append('perPage', String(paginatorInformation.per_page));
    vparams = vparams.append('page', String(paginatorInformation.current_page));
    vparams = vparams.append('search', serach);
    if (serach === '' && black === '0') {
      vparams = vparams.append('fidele', vfidele);
    }
    if (serach === '') {
      vparams = vparams.append('black', black + '');
    }

    return this.http.get<PaginatedResult<Voyageur>>(this.url + 'voyageur', {params: vparams});
  }

  public save(voyageur: Voyageur): Observable<Voyageur> {
    return this.http.post<Voyageur>(this.url + 'voyageur', voyageur);
  }

  public update(voyageur: Voyageur): Observable<Voyageur> {
    return this.http.put<Voyageur>(this.url + 'voyageur', voyageur);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'voyageur/' + id);
  }

  public findById(id: number): Observable<Voyageur> {
    return this.http.get<Voyageur>(this.url + 'voyageur/' + id);
  }

  public findByCin(cin: string): Observable<Voyageur> {
    return this.http.get<Voyageur>(this.url + 'voyageur/cin/' + cin);
  }

}
