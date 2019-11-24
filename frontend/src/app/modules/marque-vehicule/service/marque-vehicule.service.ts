import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MarqueVehicule} from '../model/marque-vehicule';

@Injectable()
export class MarqueVehiculeService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(serach: string): Observable<MarqueVehicule[]> {
    return this.http.get<MarqueVehicule[]>(this.url + 'marqueVehicule'
      + '?search=' + serach);
  }

  public save(marqueVehicule: MarqueVehicule): Observable<MarqueVehicule> {
    return this.http.post<MarqueVehicule>(this.url + 'marqueVehicule', marqueVehicule);
  }

  public update(marqueVehicule: MarqueVehicule): Observable<MarqueVehicule> {
    return this.http.put<MarqueVehicule>(this.url + 'marqueVehicule', marqueVehicule);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'marqueVehicule/' + id);
  }

  public findById(id: number): Observable<MarqueVehicule> {
    return this.http.get<MarqueVehicule>(this.url + 'marqueVehicule/' + id);
  }
}
