import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {Permission} from '../../permission/model/permission';
import {Role} from '../../role/model/role';
import {map} from 'rxjs/operators';
import {UserPermissions} from '../model/user-permissions';
import {Commercial} from '../../commercial/model/commercial';

@Injectable()
export class UserService {
  url = environment.baseUrlApi;

  constructor(private http: HttpClient) {
  }

  public signUp(user: User): Observable<{
    token: string,
    roles: Role[],
    commercial: Commercial
  }> {
    return this.http.post<{
      token: string,
      roles: Role[],
      commercial: Commercial
    }>(this.url + 'login', user).pipe(map(value => {
      this.setToken(value.token);
      this.setCommercial(value.commercial);
      this.setRoles(value.roles);
      return value;
    }));
  }

  public logout(): Observable<string> {
    return this.http.get<any>(this.url + 'logout')
      .pipe(map(value => {
        this.removeData();
        return value;
      }));
  }

  private removeData() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('commercial');
    sessionStorage.removeItem('roles');
  }

  private setToken(token) {
    sessionStorage.setItem('token', token);
  }

  public setCommercial(commercial: Commercial) {
    sessionStorage.setItem('commercial', JSON.stringify(commercial));
  }

  private setRoles(data: Role[]) {
    sessionStorage.setItem('roles', JSON.stringify({roles: data}));
  }

  public getToken() {
    // return localStorage.getItem('token');
    return sessionStorage.getItem('token');
  }

  private payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  public isValid() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      const date = new Date(0);
      date.setUTCSeconds(payload.exp);
      if ((date.valueOf() > new Date().valueOf())) {
        return true;
      }
    }
    return false;
  }

  private decode(payload) {

    return JSON.parse(atob(payload));
  }

  private getRoles(): Role[] {
    const data = JSON.parse(sessionStorage.getItem('roles')) as { roles: Role[] };
    return data.roles;
  }

  public getCommercial(): Commercial {
    return JSON.parse(sessionStorage.getItem('commercial'));
  }

  public getUserPermissions(): UserPermissions {
    const roles = this.getRoles();
    const userPermissions = new UserPermissions();
    roles.forEach(role => {
      if (role.nom === 'admin') {
        userPermissions.isAdmin = true;
        return userPermissions;
      }
      role.permissions.forEach(permission => {
        switch (permission.nomModule) {
          case 'voyage':
            userPermissions.voyage.edit = userPermissions.voyage.edit || permission.pivot.edit;
            userPermissions.voyage.read = userPermissions.voyage.read || permission.pivot.read;
            userPermissions.voyage.delete = userPermissions.voyage.delete || permission.pivot.delete;
            break;
          case 'agence':
            userPermissions.agence.edit = userPermissions.agence.edit || permission.pivot.edit;
            userPermissions.agence.read = userPermissions.agence.read || permission.pivot.read;
            userPermissions.agence.delete = userPermissions.agence.delete || permission.pivot.delete;
            break;
          case 'offreVoyage':
            userPermissions.offreVoyage.edit = userPermissions.offreVoyage.edit || permission.pivot.edit;
            userPermissions.offreVoyage.read = userPermissions.offreVoyage.read || permission.pivot.read;
            userPermissions.offreVoyage.delete = userPermissions.offreVoyage.delete || permission.pivot.delete;
            break;
          case 'modalite':
            userPermissions.modalite.edit = userPermissions.modalite.edit || permission.pivot.edit;
            userPermissions.modalite.read = userPermissions.modalite.read || permission.pivot.read;
            userPermissions.modalite.delete = userPermissions.modalite.delete || permission.pivot.delete;
            break;
          case 'commercial':
            userPermissions.commercial.edit = userPermissions.commercial.edit || permission.pivot.edit;
            userPermissions.commercial.read = userPermissions.commercial.read || permission.pivot.read;
            userPermissions.commercial.delete = userPermissions.commercial.delete || permission.pivot.delete;
            break;
          case 'accompagnateur':
            userPermissions.accompagnateur.edit = userPermissions.accompagnateur.edit || permission.pivot.edit;
            userPermissions.accompagnateur.read = userPermissions.accompagnateur.read || permission.pivot.read;
            userPermissions.accompagnateur.delete = userPermissions.accompagnateur.delete || permission.pivot.delete;
            break;
          case 'role':
            userPermissions.role.edit = userPermissions.role.edit || permission.pivot.edit;
            userPermissions.role.read = userPermissions.role.read || permission.pivot.read;
            userPermissions.role.delete = userPermissions.role.delete || permission.pivot.delete;
            break;
          case 'sousCategorie':
            userPermissions.sousCategorie.edit = userPermissions.sousCategorie.edit || permission.pivot.edit;
            userPermissions.sousCategorie.read = userPermissions.sousCategorie.read || permission.pivot.read;
            userPermissions.sousCategorie.delete = userPermissions.sousCategorie.delete || permission.pivot.delete;
            break;
          case 'categorie':
            userPermissions.categorie.edit = userPermissions.categorie.edit || permission.pivot.edit;
            userPermissions.categorie.read = userPermissions.categorie.read || permission.pivot.read;
            userPermissions.categorie.delete = userPermissions.categorie.delete || permission.pivot.delete;
            break;
          case 'voyageur':
            userPermissions.voyageur.edit = userPermissions.voyageur.edit || permission.pivot.edit;
            userPermissions.voyageur.read = userPermissions.voyageur.read || permission.pivot.read;
            userPermissions.voyageur.delete = userPermissions.voyageur.delete || permission.pivot.delete;
            break;
          case 'pays':
            userPermissions.pays.edit = userPermissions.pays.edit || permission.pivot.edit;
            userPermissions.pays.read = userPermissions.pays.read || permission.pivot.read;
            userPermissions.pays.delete = userPermissions.pays.delete || permission.pivot.delete;
            break;
          case 'option':
            userPermissions.option.edit = userPermissions.option.edit || permission.pivot.edit;
            userPermissions.option.read = userPermissions.option.read || permission.pivot.read;
            userPermissions.option.delete = userPermissions.option.delete || permission.pivot.delete;
            break;
          case 'depense':
            userPermissions.depense.edit = userPermissions.depense.edit || permission.pivot.edit;
            userPermissions.depense.read = userPermissions.depense.read || permission.pivot.read;
            userPermissions.depense.delete = userPermissions.depense.delete || permission.pivot.delete;
            break;
          case 'permission':
            userPermissions.permission.edit = userPermissions.permission.edit || permission.pivot.edit;
            userPermissions.permission.read = userPermissions.permission.read || permission.pivot.read;
            userPermissions.permission.delete = userPermissions.permission.delete || permission.pivot.delete;
            break;
          case 'ville':
            userPermissions.ville.edit = userPermissions.ville.edit || permission.pivot.edit;
            userPermissions.ville.read = userPermissions.ville.read || permission.pivot.read;
            userPermissions.ville.delete = userPermissions.ville.delete || permission.pivot.delete;
            break;
          case 'offreVoyageLimited':
            userPermissions.offreVoyageLimited.edit = userPermissions.offreVoyageLimited.edit || permission.pivot.edit;
            userPermissions.offreVoyageLimited.read = userPermissions.offreVoyageLimited.read || permission.pivot.read;
            userPermissions.offreVoyageLimited.delete = userPermissions.offreVoyageLimited.delete || permission.pivot.delete;
            break;
          case 'pgroupe':
            userPermissions.pgroupe.edit = userPermissions.pgroupe.edit || permission.pivot.edit;
            userPermissions.pgroupe.read = userPermissions.pgroupe.read || permission.pivot.read;
            userPermissions.pgroupe.delete = userPermissions.pgroupe.delete || permission.pivot.delete;
            break;
          case 'sgroupe':
            userPermissions.sgroupe.edit = userPermissions.sgroupe.edit || permission.pivot.edit;
            userPermissions.sgroupe.read = userPermissions.sgroupe.read || permission.pivot.read;
            userPermissions.sgroupe.delete = userPermissions.sgroupe.delete || permission.pivot.delete;
            break;

          case 'chauffeur':
            userPermissions.chauffeur.edit = userPermissions.chauffeur.edit || permission.pivot.edit;
            userPermissions.chauffeur.read = userPermissions.chauffeur.read || permission.pivot.read;
            userPermissions.chauffeur.delete = userPermissions.chauffeur.delete || permission.pivot.delete;
            break;

          case 'societe':
            userPermissions.societe.edit = userPermissions.societe.edit || permission.pivot.edit;
            userPermissions.societe.read = userPermissions.societe.read || permission.pivot.read;
            userPermissions.societe.delete = userPermissions.societe.delete || permission.pivot.delete;
            break;
          case 'vehicule':
            userPermissions.vehicule.edit = userPermissions.vehicule.edit || permission.pivot.edit;
            userPermissions.vehicule.read = userPermissions.vehicule.read || permission.pivot.read;
            userPermissions.vehicule.delete = userPermissions.vehicule.delete || permission.pivot.delete;
            break;
          case 'typeVehicule':
            userPermissions.typeVehicule.edit = userPermissions.typeVehicule.edit || permission.pivot.edit;
            userPermissions.typeVehicule.read = userPermissions.typeVehicule.read || permission.pivot.read;
            userPermissions.typeVehicule.delete = userPermissions.typeVehicule.delete || permission.pivot.delete;
            break;
          case 'marqueVehicule':
            userPermissions.marqueVehicule.edit = userPermissions.marqueVehicule.edit || permission.pivot.edit;
            userPermissions.marqueVehicule.read = userPermissions.marqueVehicule.read || permission.pivot.read;
            userPermissions.marqueVehicule.delete = userPermissions.marqueVehicule.delete || permission.pivot.delete;
            break;
          case 'facture':
            userPermissions.facture.edit = userPermissions.facture.edit || permission.pivot.edit;
            userPermissions.facture.read = userPermissions.facture.read || permission.pivot.read;
            userPermissions.facture.delete = userPermissions.facture.delete || permission.pivot.delete;
            break;
          case 'groupeConvention':
            userPermissions.groupeConvention.edit = userPermissions.groupeConvention.edit || permission.pivot.edit;
            userPermissions.groupeConvention.read = userPermissions.groupeConvention.read || permission.pivot.read;
            userPermissions.groupeConvention.delete = userPermissions.groupeConvention.delete || permission.pivot.delete;
            break;
          case 'hotel':
            userPermissions.hotel.edit = userPermissions.hotel.edit || permission.pivot.edit;
            userPermissions.hotel.read = userPermissions.hotel.read || permission.pivot.read;
            userPermissions.hotel.delete = userPermissions.hotel.delete || permission.pivot.delete;
            break;

        }
      });
    });

    return userPermissions;
  }

  public getIsAdmin() {

  }

}
