import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Chauffeur} from '../model/chauffeur';

@Injectable()
export class ChauffeurService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(serach: string): Observable<Chauffeur[]> {
    return this.http.get<Chauffeur[]>(this.url + 'chauffeur'
      + '?search=' + serach);
  }

  public save(chauffeur: Chauffeur): Observable<Chauffeur> {
    return this.http.post<Chauffeur>(this.url + 'chauffeur', chauffeur);
  }

  public update(chauffeur: Chauffeur): Observable<Chauffeur> {
    return this.http.put<Chauffeur>(this.url + 'chauffeur', chauffeur);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'chauffeur/' + id);
  }

  public findById(id: number): Observable<Chauffeur> {
    return this.http.get<Chauffeur>(this.url + 'chauffeur/' + id);
  }
}
