import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {Observable} from 'rxjs';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Option} from '../model/option';

@Injectable()
export class OptionService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(serach: string): Observable<Option[]> {
    return this.http.get<Option[]>(this.url + 'option'
      + '?search=' + serach);
  }

  public save(option: Option): Observable<Option> {
    return this.http.post<Option>(this.url + 'option', option);
  }

  public update(option: Option): Observable<Option> {
    return this.http.put<Option>(this.url + 'option', option);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'option/' + id);
  }

  public findById(id: number): Observable<Option> {
    return this.http.get<Option>(this.url + 'option/' + id);
  }
}
