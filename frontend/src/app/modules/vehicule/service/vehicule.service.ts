import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vehicule} from '../model/vehicule';

@Injectable()
export class VehiculeService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(serach: string): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.url + 'vehicule'
      + '?search=' + serach);
  }

  public save(vehicule: Vehicule): Observable<Vehicule> {
    return this.http.post<Vehicule>(this.url + 'vehicule', vehicule);
  }

  public update(vehicule: Vehicule): Observable<Vehicule> {
    return this.http.put<Vehicule>(this.url + 'vehicule', vehicule);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'vehicule/' + id);
  }

  public findById(id: number): Observable<Vehicule> {
    return this.http.get<Vehicule>(this.url + 'vehicule/' + id);
  }
}
