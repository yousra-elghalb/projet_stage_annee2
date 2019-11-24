import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import * as fromRole from '../../modules/role/store/role.reducer';
import * as fromModalite from '../../modules/modalite/store/modalite.reducer';
import * as fromPays from '../../modules/pays/store/pays.reducer';
import * as fromVille from '../../modules/ville/store/ville.reducer';
import * as fromAccompagnateur from '../../modules/accompagnateur/store/accompagnateur.reducer';
import * as fromCategorie from '../../modules/categorie/store/categorie.reducer';
import * as fromSousCategorie from '../../modules/sous-categorie/store/sous-categorie.reducer';
import * as fromPermission from '../../modules/permission/store/permission.reducer';
import * as fromCommercial from '../../modules/commercial/store/commercial.reducer';
import * as fromUser from '../../modules/user/store/user.reducer';
import * as fromAgence from '../../modules/agence/store/agence.reducer';
import * as fromOffreVoyage from '../../modules/offre-voyage/store/offre-voyage.reducer';
import * as fromOffreVoyageLimited from '../../modules/offre-voyage-limited/store/offre-voyage-limited.reducer';
import * as fromVoyage from '../../modules/voyage/store/voyage.reducer';
import * as fromVoyageur from '../../modules/voyageur/store/voyageur.reducer';
import * as fromOption from '../../modules/options/store/option.reducer';
import * as fromPGroupe from '../../modules/groupe/pgroupe/store/p-groupe.reducer';
import * as fromDepense from '../../modules/depense/store/depense.reducer';
import * as fromChauffeur from '../../modules/chauffeur/store/chauffeur.reducer';
import * as fromSociete from '../../modules/societe/store/societe.reducer';
import * as fromTypeVehicule from '../../modules/type-vehicule/store/type-vehicule.reducer';
import * as fromMarqueVehicule from '../../modules/marque-vehicule/store/marque-vehicule.reducer';
import * as fromVehicule from '../../modules/vehicule/store/vehicule.reducer';
import * as fromHotel from '../../modules/hotel/store/hotel.reducer';
import * as fromGroupeConvention from '../../modules/groupe-convention/store/groupe-convention.reducer';

export interface RootState {
  role: fromRole.RoleState;
  modalite: fromModalite.ModaliteState;
  pays: fromPays.PaysState;
  ville: fromVille.VilleState;
  accompagnateur: fromAccompagnateur.AccompagnateurState;
  categorie: fromCategorie.CategorieState;
  sousCategorie: fromSousCategorie.SousCategorieState;
  permission: fromPermission.PermissionState;
  commercial: fromCommercial.CommercialState;
  user: fromUser.UserState;
  agence: fromAgence.AgenceState;
  offreVoyage: fromOffreVoyage.OffreVoyageState;
  offreVoyageLimited: fromOffreVoyageLimited.OffreVoyageLimitedState;
  voyage: fromVoyage.VoyageState;
  voyageur: fromVoyageur.VoyageurState;
  option: fromOption.OptionState;
  depense: fromDepense.DepenseState;
  pGroupe: fromPGroupe.PGroupeState;
  chauffeur: fromChauffeur.ChauffeurState;
  societe: fromSociete.SocieteState;
  vehicule: fromVehicule.VehiculeState;
  typeVehicule: fromTypeVehicule.TypeVehiculeState;
  marqueVehicule: fromMarqueVehicule.MarqueVehiculeState;
  hotel: fromHotel.HotelState;
  groupeConvention: fromGroupeConvention.GroupeConventionState;
}

export const reducers: ActionReducerMap<RootState> = {
  role: fromRole.reducer,
  modalite: fromModalite.reducer,
  sousCategorie: fromSousCategorie.reducer,
  categorie: fromCategorie.reducer,
  pays: fromPays.reducer,
  ville: fromVille.reducer,
  accompagnateur: fromAccompagnateur.reducer,
  permission: fromPermission.reducer,
  commercial: fromCommercial.reducer,
  user: fromUser.reducer,
  agence: fromAgence.reducer,
  offreVoyage: fromOffreVoyage.reducer,
  offreVoyageLimited: fromOffreVoyageLimited.reducer,
  voyage: fromVoyage.reducer,
  option: fromOption.reducer,
  depense: fromDepense.reducer,
  voyageur: fromVoyageur.reducer,
  pGroupe: fromPGroupe.reducer,
  chauffeur: fromChauffeur.reducer,
  societe: fromSociete.reducer,
  vehicule: fromVehicule.reducer,
  typeVehicule: fromTypeVehicule.reducer,
  marqueVehicule: fromMarqueVehicule.reducer,
  hotel: fromHotel.reducer,
  groupeConvention: fromGroupeConvention.reducer,
};


export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];
