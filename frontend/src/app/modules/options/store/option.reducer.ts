import {OptionActions, OptionActionTypes} from './option.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Option} from '../model/option';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {isUndefined} from 'util';

export interface OptionState extends EntityState<Option> {
  isLoading: boolean;
  isLoaded: boolean;
  selectedId?: number;
  search: string;
  isLoadingSpinner: boolean;
}

export const optionEntityAdapter: EntityAdapter<Option> = createEntityAdapter<Option>({selectId: data => data.id});


export const initialOptionState: OptionState = optionEntityAdapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  isLoadingSpinner: false,
  isLoaded: false,
  search: ''
});

export function reducer(state = initialOptionState, action: OptionActions): OptionState {
  switch (action.type) {
    case OptionActionTypes.LoadOptionsRequest:
      return {
        ...state,
        search: action.search,
        isLoading: true,
        isLoaded: false
      };
    case OptionActionTypes.LoadOptionsIsNotLoadedRequest:

      state = {...state, isLoading: !state.isLoaded};
      return {
        ...state
      };
    case OptionActionTypes.LoadOptionsSuccess:
      // state = optionEntityAdapter.removeAll(state);
      state = optionEntityAdapter.addAll(action.payload.option, state);
      return {
        ...state,
        isLoading: false,
        isLoaded: true
      };
    case OptionActionTypes.LoadOptionsFailed:
      return {
        ...state,
        isLoading: false,
        isLoaded: false
      };
    case OptionActionTypes.UpdateOptionRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case OptionActionTypes.UpdateOptionSuccess:
      state = optionEntityAdapter.updateOne({
        id: action.payload.option.id,
        changes: {...action.payload.option}
      }, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case OptionActionTypes.UpdateOptionFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case OptionActionTypes.SaveOptionRequest:
      return {
        ...state,
        isLoadingSpinner: true
      };
    case OptionActionTypes.SaveOptionSuccess:
      state = optionEntityAdapter.addOne(action.payload.option, state);
      return {
        ...state,
        isLoadingSpinner: false
      };
    case OptionActionTypes.SaveOptionFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case OptionActionTypes.DeleteOptionRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoading: true
      };
    case OptionActionTypes.DeleteOptionSuccess:
      state = optionEntityAdapter.removeOne(state.selectedId, state);
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case OptionActionTypes.DeleteOptionFailed:
      return {
        ...state,
        selectedId: 0,
        isLoading: false
      };
    case OptionActionTypes.LoadOneOptionRequest:
      return {
        ...state,
        selectedId: action.payload.id,
        isLoadingSpinner: true
      };
    case OptionActionTypes.LoadOneOptionSuccess:
      return {
        ...state,
        isLoadingSpinner: false
      };
    case OptionActionTypes.LoadOneOptionFailed:
      return {
        ...state,
        isLoadingSpinner: false
      };
    default:
      return state;
  }
}
