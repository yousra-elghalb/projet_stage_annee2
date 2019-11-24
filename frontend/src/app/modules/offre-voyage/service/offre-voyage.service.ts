import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Observable} from 'rxjs';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {OffreVoyage} from '../model/offre-voyage';
import {CriteresRecherche} from '../model/criteres-recherche';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Voyageur} from '../../voyageur/model/voyageur';
import {UserService} from '../../user/service/user.service';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class OffreVoyageService {
  url = environment.baseUrlApi;

  constructor(private http: HttpClient, private userService: UserService) {
  }

  public findAll(paginatorInformation: PaginatorInformations, serach: CriteresRecherche): Observable<PaginatedResult<OffreVoyage>> {
    let vparams = new HttpParams();
    vparams = vparams.append('perPage', String(paginatorInformation.per_page));
    vparams = vparams.append('page', String(paginatorInformation.current_page));
    if (serach.search) {
      vparams = vparams.append('search', serach.search);
    }
    if (serach.categorie_id) {
      vparams = vparams.append('categorie_id', String(serach.categorie_id));
    }
    if (serach.sous_categorie_id) {
      vparams = vparams.append('sous_categorie_id', String(serach.sous_categorie_id));
    }
    if (serach.statut) {
      vparams = vparams.append('statut', serach.statut);
    }
    if (serach.dateDarrive) {
      vparams = vparams.append('dateDarrive', serach.dateDarrive.toDateString());
    }
    if (serach.dateDepart) {
      vparams = vparams.append('dateDepart', serach.dateDepart.toDateString());
    }
    return this.http.get<PaginatedResult<OffreVoyage>>(this.url + 'offreVoyage', {params: vparams});
  }

  public findAllByCommercialId(paginatorInformation: PaginatorInformations,
                               serach: CriteresRecherche): Observable<PaginatedResult<OffreVoyage>> {
    let vparams = new HttpParams();
    vparams = vparams.append('perPage', String(paginatorInformation.per_page));
    vparams = vparams.append('page', String(paginatorInformation.current_page));
    if (serach.search) {
      vparams = vparams.append('search', serach.search);
    }
    if (serach.categorie_id) {
      vparams = vparams.append('categorie_id', String(serach.categorie_id));
    }
    if (serach.sous_categorie_id) {
      vparams = vparams.append('sous_categorie_id', String(serach.sous_categorie_id));
    }
    if (serach.statut) {
      vparams = vparams.append('statut', serach.statut);
    }
    if (serach.dateDarrive) {
      vparams = vparams.append('dateDarrive', serach.dateDarrive.toDateString());
    }
    if (serach.dateDepart) {
      vparams = vparams.append('dateDepart', serach.dateDepart.toDateString());
    }
    const c = this.userService.getCommercial();
    const id = c != null ? c.id : 0;
    return this.http.get<PaginatedResult<OffreVoyage>>(this.url + 'commercial/' + id + '/offreVoyage/', {params: vparams});
  }

  public save(data: OffreVoyage[]): Observable<any> {
    return this.http.post<OffreVoyage>(this.url + 'offreVoyage', {offreVoyages: data});
  }

  public update(offreVoyage: OffreVoyage): Observable<OffreVoyage> {
    return this.http.put<OffreVoyage>(this.url + 'offreVoyage', offreVoyage);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + 'offreVoyage/' + id);
  }

  public findById(id: number): Observable<OffreVoyage> {
    const c = this.userService.getCommercial();
    const idc = c != null ? c.id : 0;
    if (c.limitedAccess) {
      return this.http.get<OffreVoyage>(this.url + 'commercial/' + idc + '/offreVoyage/' + id);
    } else {
      return this.http.get<OffreVoyage>(this.url + 'offreVoyage/' + id);
    }
  }

  /* public findAllVoyageur(id,
                          perpage = 15,
                          currentpage = 1,
                          search: {
                            search: string,
                            ville?: string,
                            etat?: string,
                            type?: string,
                          } = {search: ''}): Observable<PaginatedResult<Groupe>> {
     let vparams = new HttpParams();
     vparams = vparams.append('perPage', String(perpage));
     vparams = vparams.append('page', String(currentpage));
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
     return this.http.get<PaginatedResult<Groupe>>(this.url + 'offreVoyage/' + id + '/voyageurs', {params: vparams});
   }
 */


  public calculeTotale(elementForm: FormGroup,
                       offreVoyage: OffreVoyage) {
    let vtotale = 0;
    let vreste = 0;
    const data = elementForm.getRawValue();
    data.voyageurs.forEach(value1 => {
      if (value1.stadeVie === 'enfant') {
        vtotale += offreVoyage.voyage.prixEnfant;
        vreste += offreVoyage.voyage.prixEnfant;
      } else if (value1.stadeVie === 'bébé') {
        vtotale += offreVoyage.voyage.prixBebe;
        vreste += offreVoyage.voyage.prixBebe;
      } else {
        vtotale += offreVoyage.voyage.prixAdulte;
        vreste += offreVoyage.voyage.prixAdulte;
      }
    });
    data.options.forEach(value2 => {
      const prixOption = (value2.prix + '' !== '') ? parseFloat(value2.prix + '') : 0;
      vtotale += prixOption;
      vreste += prixOption;
    });
    vtotale -= data.reduction;
    vreste -= data.reduction;
    data.traites.forEach(value2 => {
      vreste -= (value2.montant) ? value2.montant : 0;
    });

    elementForm.patchValue({totale: vtotale, reste: vreste});
    console.log(elementForm.value);
  }


  public changeValueVoyageur(abstractControl: AbstractControl, value: Voyageur) {
    abstractControl.patchValue(value);
    abstractControl.get('nom').disable();
    abstractControl.get('prenom').disable();
    abstractControl.get('tel').disable();
    abstractControl.get('email').disable();
    abstractControl.get('sexe').disable();
    abstractControl.get('stadeVie').disable();
    abstractControl.get('dateExpiration').disable();
    abstractControl.get('numPasseport').disable();
  }

  initValueVoyageur(abstractControl: AbstractControl) {
    abstractControl.patchValue({
      id: '',
      nom: '',
      prenom: '',
      tel: '',
      email: '',
      dateExpiration: '',
      numPasseport: '',
    });
    abstractControl.get('nom').enable();
    abstractControl.get('prenom').enable();
    abstractControl.get('tel').enable();
    abstractControl.get('email').enable();
    abstractControl.get('sexe').enable();
    abstractControl.get('stadeVie').enable();
    abstractControl.get('dateExpiration').enable();
    abstractControl.get('numPasseport').enable();
  }
}
