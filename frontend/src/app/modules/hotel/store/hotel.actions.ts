import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {Hotel} from '../model/hotel';

export enum HotelActionTypes {
  LoadHotelsIsNotLoadedRequest = '[Hotel] LoadHotelsIsNotLoadedRequest Hotel',
  LoadHotelsRequest = '[Hotel] LoadHotelsRequest Hotel',
  LoadHotelsSuccess = '[Hotel] LoadHotelsSuccess Hotel',
  LoadHotelsFailed = '[Hotel] LoadHotelsFailed Hotel',
  Hotelsloading = '[Hotel] Hotelsloading Hotel',

  LoadOneHotelRequest = '[Hotel] LoadOneHotelRequest Hotel',
  LoadOneHotelSuccess = '[Hotel] LoadOneHotelSuccess Hotel',
  LoadOneHotelFailed = '[Hotel] LoadOneHotelFailed Hotel',

  SaveHotelRequest = '[Hotel] SaveHotelsRequest Hotel',
  SaveHotelSuccess = '[Hotel] SaveHotelsSuccess Hotel',
  SaveHotelFailed = '[Hotel] SaveHotelsFailed Hotel',


  UpdateHotelRequest = '[Hotel] UpdateHotelsRequest Hotel',
  UpdateHotelSuccess = '[Hotel] UpdateHotelsSuccess Hotel',
  UpdateHotelFailed = '[Hotel] UpdateHotelsFailed Hotel',

  DeleteHotelRequest = '[Hotel] DeleteHotelsRequest Hotel',
  DeleteHotelSuccess = '[Hotel] DeleteHotelsSuccess Hotel',
  DeleteHotelFailed = '[Hotel] DeleteHotelsFailed Hotel',

}

export class DeleteHotelRequest implements Action {
  readonly type = HotelActionTypes.DeleteHotelRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteHotelSuccess implements Action {
  readonly type = HotelActionTypes.DeleteHotelSuccess;

  constructor() {
  }
}

export class DeleteHotelFailed implements Action {
  readonly type = HotelActionTypes.DeleteHotelFailed;

  constructor() {
  }
}

export class UpdateHotelRequest implements Action {
  readonly type = HotelActionTypes.UpdateHotelRequest;

  constructor(public payload: { hotel: Hotel }) {
  }
}

export class UpdateHotelSuccess implements Action {
  readonly type = HotelActionTypes.UpdateHotelSuccess;

  constructor(public payload: { hotel: Hotel }) {
  }
}

export class Hotelsloading implements Action {
  readonly type = HotelActionTypes.Hotelsloading;

  constructor() {
  }
}

export class UpdateHotelFailed implements Action {
  readonly type = HotelActionTypes.UpdateHotelFailed;

  constructor() {
  }
}

export class SaveHotelRequest implements Action {
  readonly type = HotelActionTypes.SaveHotelRequest;

  constructor(public payload: { hotel: Hotel }) {
  }
}

export class SaveHotelSuccess implements Action {
  readonly type = HotelActionTypes.SaveHotelSuccess;

  constructor(public payload: { hotel: Hotel }) {
  }
}

export class SaveHotelFailed implements Action {
  readonly type = HotelActionTypes.SaveHotelFailed;

  constructor() {
  }
}

export class LoadOneHotelRequest implements Action {
  readonly type = HotelActionTypes.LoadOneHotelRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneHotelSuccess implements Action {
  readonly type = HotelActionTypes.LoadOneHotelSuccess;

  constructor(public payload: { hotel: Hotel }) {
  }
}

export class LoadOneHotelFailed implements Action {
  readonly type = HotelActionTypes.LoadOneHotelFailed;

  constructor() {
  }
}

export class LoadHotelsRequest implements Action {
  readonly type = HotelActionTypes.LoadHotelsRequest;

  constructor(public search: string) {
  }
}

export class LoadHotelsIsNotLoadedRequest implements Action {
  readonly type = HotelActionTypes.LoadHotelsIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadHotelsSuccess implements Action {
  readonly type = HotelActionTypes.LoadHotelsSuccess;

  constructor(public payload: { hotel: Hotel[] }) {
  }
}

export class LoadHotelsFailed implements Action {
  readonly type = HotelActionTypes.LoadHotelsFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type HotelActions = LoadHotelsRequest |
  LoadHotelsSuccess |
  LoadHotelsFailed |
  SaveHotelRequest |
  SaveHotelSuccess |
  SaveHotelFailed |
  Hotelsloading |

  UpdateHotelRequest |
  UpdateHotelSuccess |
  UpdateHotelFailed |
  DeleteHotelRequest |
  DeleteHotelSuccess |
  DeleteHotelFailed |
  LoadOneHotelRequest |
  LoadOneHotelSuccess |
  LoadOneHotelFailed |
  LoadHotelsIsNotLoadedRequest;
