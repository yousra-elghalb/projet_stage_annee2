import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {Observable} from 'rxjs';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {SousCategorie} from '../model/sous-categorie';

@Injectable()
export class SousCategorieService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(serach: string): Observable<SousCategorie[]> {
    return this.http.get<SousCategorie[]>(this.url + 'sousCategorie'
      + '?search=' + serach);
  }

  public save(sousCategorie: SousCategorie): Observable<SousCategorie> {
    return this.http.post<SousCategorie>(this.url + 'sousCategorie', sousCategorie);
  }

  public update(sousCategorie: SousCategorie): Observable<SousCategorie> {
    return this.http.put<SousCategorie>(this.url + 'sousCategorie', sousCategorie);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'sousCategorie/' + id);
  }

  public findById(id: number): Observable<SousCategorie> {
    return this.http.get<SousCategorie>(this.url + 'sousCategorie/' + id);
  }
}
