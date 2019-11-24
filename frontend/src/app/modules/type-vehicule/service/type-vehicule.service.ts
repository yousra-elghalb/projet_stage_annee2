import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TypeVehicule} from '../model/type-vehicule';

@Injectable()
export class TypeVehiculeService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(serach: string): Observable<TypeVehicule[]> {
    return this.http.get<TypeVehicule[]>(this.url + 'typeVehicule'
      + '?search=' + serach);
  }

  public save(typeVehicule: TypeVehicule): Observable<TypeVehicule> {
    return this.http.post<TypeVehicule>(this.url + 'typeVehicule', typeVehicule);
  }

  public update(typeVehicule: TypeVehicule): Observable<TypeVehicule> {
    return this.http.put<TypeVehicule>(this.url + 'typeVehicule', typeVehicule);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'typeVehicule/' + id);
  }

  public findById(id: number): Observable<TypeVehicule> {
    return this.http.get<TypeVehicule>(this.url + 'typeVehicule/' + id);
  }
}
