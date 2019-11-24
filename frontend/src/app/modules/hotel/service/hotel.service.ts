import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Hotel} from '../model/hotel';

@Injectable()
export class HotelService {

  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public findAll(serach: string): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.url + 'hotel'
      + '?search=' + serach);
  }

  public save(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.url + 'hotel', hotel);
  }

  public update(hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(this.url + 'hotel', hotel);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'hotel/' + id);
  }

  public findById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(this.url + 'hotel/' + id);
  }
}
