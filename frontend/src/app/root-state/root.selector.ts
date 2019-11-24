import {createSelector} from '@ngrx/store';
import {selectRoleIsLoading} from '../modules/role/store/role.selectors';
import {selectModaliteIsLoading} from '../modules/modalite/store/modalite.selectors';
import {selectCategorieIsLoading} from '../modules/categorie/store/categorie.selectors';
import {selectSousCategorieIsLoading} from '../modules/sous-categorie/store/sous-categorie.selectors';
import {selectPaysIsLoading} from '../modules/pays/store/pays.selectors';
import {selectVilleIsLoading} from '../modules/ville/store/ville.selectors';
import {selectAccompagnateurIsLoading} from '../modules/accompagnateur/store/accompagnateur.selectors';
import {selectPermissionIsLoading} from '../modules/permission/store/permission.selectors';
import {selectCommercialIsLoading} from '../modules/commercial/store/commercial.selectors';
import {selectAgenceIsLoading} from '../modules/agence/store/agence.selectors';
import {selectVoyageIsLoading} from '../modules/voyage/store/voyage.selectors';
import {selectOffreVoyageIsLoading} from '../modules/offre-voyage/store/offre-voyage.selectors';
import {selectVoyageurIsLoading} from '../modules/voyageur/store/voyageur.selectors';
import {selectOffreVoyageLimitedIsLoading} from '../modules/offre-voyage-limited/store/offre-voyage-limited.selectors';
import {selectPGroupeIsLoading} from '../modules/groupe/pgroupe/store/p-groupe.selectors';
import {selectDepenseIsLoading} from '../modules/depense/store/depense.selectors';
import {selectChauffeurIsLoaded, selectChauffeurIsLoading} from '../modules/chauffeur/store/chauffeur.selectors';
import {selectSocieteIsLoading} from '../modules/societe/store/societe.selectors';
import {selectVehiculeIsLoaded, selectVehiculeIsLoading} from '../modules/vehicule/store/vehicule.selectors';
import {selectTypeVehiculeIsLoading} from '../modules/type-vehicule/store/type-vehicule.selectors';
import {selectMarqueVehiculeIsLoading} from '../modules/marque-vehicule/store/marque-vehicule.selectors';
import {selectHotelIsLoading} from '../modules/hotel/store/hotel.selectors';
import {selectGroupeConventionIsLoading} from '../modules/groupe-convention/store/groupe-convention.selectors';


const selectIsLoading1 = createSelector(
  selectRoleIsLoading,
  selectModaliteIsLoading,
  selectCategorieIsLoading,
  selectSousCategorieIsLoading,
  selectPaysIsLoading,
  selectVilleIsLoading,
  selectAccompagnateurIsLoading,
  selectCommercialIsLoading,
  (
    v1: boolean,
    v2: boolean,
    v3: boolean,
    v4: boolean,
    v5: boolean,
    v6: boolean,
    v7: boolean,
    v8: boolean,
  ) => {
    return v1 ||
      v2 ||
      v3 ||
      v4 ||
      v5 ||
      v7 ||
      v8 ||
      v6;
  });
const selectIsLoading2 = createSelector(
  selectAgenceIsLoading,
  selectVoyageurIsLoading,
  selectVoyageIsLoading,
  selectOffreVoyageIsLoading,
  selectOffreVoyageLimitedIsLoading,
  selectPermissionIsLoading,
  selectPGroupeIsLoading,
  selectDepenseIsLoading,
  (
    v1: boolean,
    v2: boolean,
    v4: boolean,
    v5: boolean,
    v7: boolean,
    v6: boolean,
    v8: boolean,
    v3: boolean,
  ) => {
    return v1 ||
      v2 ||
      v4 ||
      v6 ||
      v7 ||
      v8 ||
      v5 ||
      v3;
  });
const selectIsLoading3 = createSelector(
  selectChauffeurIsLoading,
  selectSocieteIsLoading,
  selectVehiculeIsLoading,
  selectTypeVehiculeIsLoading,
  selectMarqueVehiculeIsLoading,
  selectHotelIsLoading,
  selectGroupeConventionIsLoading,
  (
    v1: boolean,
    v2: boolean,
    v3: boolean,
    v4: boolean,
    v6: boolean,
    v7: boolean,
    v5: boolean,
  ) => {
    return v1 || v2 || v3 || v4 || v6 || v7 || v5;
  });

export const selectIsLoading = createSelector(selectIsLoading1, selectIsLoading2, selectIsLoading3,
  (
    v1: boolean,
    v2: boolean,
    v3: boolean,
  ) => {
    return v1 || v2 || v3;
  });

export const selectCategorieAndSousCategorieIsLoading = createSelector(
  selectCategorieIsLoading,
  selectSousCategorieIsLoading,
  (
    sousCategorieIsLoading: boolean,
    categorieIsLoading: boolean) => {
    return sousCategorieIsLoading &&
      categorieIsLoading;
  });
export const selectCategorieAndAgenceAndSousCategoriesAndVilleAndPaysIsLoading = createSelector(
  selectPaysIsLoading,
  selectVilleIsLoading,
  selectCategorieIsLoading,
  selectSousCategorieIsLoading,
  selectAgenceIsLoading,
  (
    v5: boolean,
    v4: boolean,
    v1: boolean,
    v3: boolean,
    v2: boolean) => {
    return v1 &&
      v3 &&
      v5 &&
      v4 &&
      v2;
  });
export const selectVilleAndPaysIsLoading = createSelector(
  selectVilleIsLoading,
  selectPaysIsLoading,
  (
    v1: boolean,
    v2: boolean) => {
    return v1 &&
      v2;
  });
export const selectPermissionAndRoleIsLoading = createSelector(
  selectRoleIsLoading,
  selectPermissionIsLoading,
  (
    v1: boolean,
    v2: boolean) => {
    return v1 &&
      v2;
  });
export const selectPermissionAndRoleAndCommercialIsLoading = createSelector(
  selectRoleIsLoading,
  selectPermissionIsLoading,
  selectCommercialIsLoading,
  (
    v1: boolean,
    v3: boolean,
    v2: boolean) => {
    return v1 &&
      v3 &&
      v2;
  });
