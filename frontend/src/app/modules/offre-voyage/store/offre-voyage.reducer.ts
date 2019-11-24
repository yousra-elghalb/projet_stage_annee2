import {OffreVoyageActions, OffreVoyageActionTypes} from './offre-voyage.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {OffreVoyage} from '../model/offre-voyage';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {isUndefined} from 'util';
import {CriteresRecherche} from '../model/criteres-recherche';

export interface OffreVoyageState extends EntityState<OffreVoyage> {
  paginatorInformations: PaginatorInformations;
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  selectedCatId?: number;
  search: CriteresRecherche;
  isLoadingSpinner: boolean;
}


export const offreVoyageEntityAdapter: EntityAdapter<OffreVoyage> = createEntityAdapter<OffreVoyage>({selectId: data => data.id});


export const initialOffreVoyageState: OffreVoyageState = offreVoyageEntityAdapter.getInitialState({
  // additional entity state properties
  paginatorInformations: {total: 0, per_page: 15, current_page: 1},
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: {dateDepart: new Date()}
});

export function reducer(state = initialOffreVoyageState, action: OffreVoyageActions): OffreVoyageState {
  switch (action.type) {
    case OffreVoyageActionTypes.ChangeOffreVoyagesIsLoaded:
      return {
        ...state,
        isLoaded: action.payload.isLoaded
      };
    case OffreVoyageActionTypes.LoadOffreVoyagesRequest:
      return {
        ...state,
        search: {...action.search},
        isLoading: true,
        isLoaded: false
      };
    case OffreVoyageActionTypes.LoadOffreVoyagesIsNotLoadedRequest:
      /*  if (state.search.categorie_id !== action.payload.id) {
          state = {
            ...state,
            isLoaded: false,
            selectedCatId: action.payload.id,
            search: {...state.search, categorie_id: action.payload.id}
          };
        }*/
      state = {
        ...state, isLoading: true,
        selectedCatId: action.payload.id,
        search: {...state.search, categorie_id: action.payload.id}
      };
      return {
        ...state
      };
    case OffreVoyageActionTypes.LoadOffreVoyagesLimitedRequest:
      return {
        ...state,
        search: {...action.search},
        isLoading: true,
        isLoaded: false
      };
    case OffreVoyageActionTypes.LoadOffreVoyagesLimitedIsNotLoadedRequest:
      if (state.search.categorie_id !== action.payload.id) {
        state = {
          ...state,
          isLoaded: false,
          selectedCatId: action.payload.id,
          search: {...state.search, categorie_id: action.payload.id}
        };
      }
      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case OffreVoyageActionTypes.LoadOffreVoyagesSuccess:
      let pi: any;
      pi = {...action.payload.paginatedResults};
      pi.data = null;
      state = offreVoyageEntityAdapter.addAll(action.payload.paginatedResults.data, state);
      return {
        ...state,
        paginatorInformations: pi,
        isLoading: false,
        isLoaded: true
      };
    case OffreVoyageActionTypes.LoadOffreVoyagesFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case OffreVoyageActionTypes.UpdateOffreVoyageRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case OffreVoyageActionTypes.UpdateOffreVoyageSuccess:
      state = offreVoyageEntityAdapter.updateOne({
        id: action.payload.offreVoyage.id,
        changes: {...action.payload.offreVoyage}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case OffreVoyageActionTypes.UpdateOffreVoyageFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case OffreVoyageActionTypes.SaveOffreVoyageRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case OffreVoyageActionTypes.SaveOffreVoyageSuccess:
      return {
        ...state,
        isLoaded: false,
        isLoadingSpinner: false
      };
    case OffreVoyageActionTypes.SaveOffreVoyageFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case OffreVoyageActionTypes.DeleteOffreVoyageRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case OffreVoyageActionTypes.DeleteOffreVoyageSuccess:
      state = offreVoyageEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false,
        paginatorInformations: {
          ...state.paginatorInformations,
          total: state.paginatorInformations.total - 1
        }
      };
    case OffreVoyageActionTypes.DeleteOffreVoyageFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case OffreVoyageActionTypes.LoadOneOffreVoyageRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case OffreVoyageActionTypes.LoadOneOffreVoyageSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case OffreVoyageActionTypes.LoadOneOffreVoyageFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case OffreVoyageActionTypes.SetCategorieId:
      return {
        ...state,
        search: {...state.search, categorie_id: action.payload.id}
      };
    default:
      return state;
  }
}
