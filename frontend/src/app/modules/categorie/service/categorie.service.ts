import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Categorie} from '../model/categorie';
import {Store} from '@ngrx/store';
import {CategorieState} from '../store/categorie.reducer';
import {LoadCategoriesSuccess} from '../store/categorie.actions';

@Injectable()
export class CategorieService {

  url = environment.baseUrlApi;
  menu: Categorie[];

  constructor(private http: HttpClient, private store: Store<CategorieState>) {
  }

  public findAll(serach: string): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.url + 'categorie'
      + '?search=' + serach);
  }

  public loadCategories(): any {
    return new Promise((resolve, reject) => {
      this.http.get<Categorie[]>(this.url + 'categorie'
        + '?search=').subscribe(value => {
        this.menu = value;
        this.store.dispatch(new LoadCategoriesSuccess({categories: value}));
        resolve(true);
      });
    });
  }

  public save(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.url + 'categorie', categorie);
  }

  public update(categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(this.url + 'categorie', categorie);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'categorie/' + id);
  }

  public findById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(this.url + 'categorie/' + id);
  }
}
