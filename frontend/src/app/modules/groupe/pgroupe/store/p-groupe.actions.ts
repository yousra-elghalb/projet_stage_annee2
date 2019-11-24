import {Action} from '@ngrx/store';
import {PGroupe} from '../model/p-groupe';
import {PaginatorInformations} from '../../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../../shared_models/paginated-result';
import {Facture} from '../../model/facture';
import {Paiement} from '../../../offre-voyage/model/paiement';

export enum PGroupeActionTypes {
  LoadPGroupesBySameOfOffreVoyageRequest = '[PGroupe] LoadPGroupesBySameOfOffreVoyageRequest PGroupe',
  LoadPGroupesRequest = '[PGroupe] LoadPGroupesRequest PGroupe',
  LoadPGroupesSuccess = '[PGroupe] LoadPGroupesSuccess PGroupe',
  LoadPGroupesFailed = '[PGroupe] LoadPGroupesFailed PGroupe',

  LoadOnePGroupeRequest = '[PGroupe] LoadOnePGroupeRequest PGroupe',
  LoadOnePGroupeSuccess = '[PGroupe] LoadOnePGroupeSuccess PGroupe',
  LoadOnePGroupeFailed = '[PGroupe] LoadOnePGroupeFailed PGroupe',

  SavePGroupeRequest = '[PGroupe] SavePGroupesRequest PGroupe',
  SavePGroupeSuccess = '[PGroupe] SavePGroupesSuccess PGroupe',
  SavePGroupeFailed = '[PGroupe] SavePGroupesFailed PGroupe',

  SavePGroupeFactureRequest = '[PGroupe] SavePGroupesFactureRequest PGroupe',
  SavePGroupeFactureSuccess = '[PGroupe] SavePGroupesFactureSuccess PGroupe',
  SavePGroupeFactureFailed = '[PGroupe] SavePGroupesFactureFailed PGroupe',


  UpdatePGroupeRequest = '[PGroupe] UpdatePGroupesRequest PGroupe',
  UpdatePGroupeSuccess = '[PGroupe] UpdatePGroupesSuccess PGroupe',
  UpdatePGroupeFailed = '[PGroupe] UpdatePGroupesFailed PGroupe',

  DeletePGroupeRequest = '[PGroupe] DeletePGroupesRequest PGroupe',
  DeletePGroupeSuccess = '[PGroupe] DeletePGroupesSuccess PGroupe',
  DeletePGroupeFailed = '[PGroupe] DeletePGroupesFailed PGroupe',

}

export class DeletePGroupeRequest implements Action {
  readonly type = PGroupeActionTypes.DeletePGroupeRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeletePGroupeSuccess implements Action {
  readonly type = PGroupeActionTypes.DeletePGroupeSuccess;

  constructor() {
  }
}

export class DeletePGroupeFailed implements Action {
  readonly type = PGroupeActionTypes.DeletePGroupeFailed;

  constructor() {
  }
}

export class UpdatePGroupeRequest implements Action {
  readonly type = PGroupeActionTypes.UpdatePGroupeRequest;

  constructor(public payload: { pGroupe: PGroupe }) {
  }
}

export class UpdatePGroupeSuccess implements Action {
  readonly type = PGroupeActionTypes.UpdatePGroupeSuccess;

  constructor(public payload: { pGroupe: PGroupe }) {
  }
}

export class UpdatePGroupeFailed implements Action {
  readonly type = PGroupeActionTypes.UpdatePGroupeFailed;

  constructor() {
  }
}

export class SavePGroupeRequest implements Action {
  readonly type = PGroupeActionTypes.SavePGroupeRequest;

  constructor(public payload: { pGroupe: PGroupe }) {
  }
}

export class SavePGroupeSuccess implements Action {
  readonly type = PGroupeActionTypes.SavePGroupeSuccess;

  constructor(public payload: { pGroupe: PGroupe }) {
  }
}

export class SavePGroupeFailed implements Action {
  readonly type = PGroupeActionTypes.SavePGroupeFailed;

  constructor(error: any) {
    console.warn(error);
  }
}

export class SavePGroupeFactureRequest implements Action {
  readonly type = PGroupeActionTypes.SavePGroupeFactureRequest;

  constructor(public payload: { facture: any; pGroupe: PGroupe }) {
  }
}

export class SavePGroupeFactureSuccess implements Action {
  readonly type = PGroupeActionTypes.SavePGroupeFactureSuccess;

  constructor(public payload: { paiement: Paiement; id: number }) {
  }
}

export class SavePGroupeFactureFailed implements Action {
  readonly type = PGroupeActionTypes.SavePGroupeFactureFailed;

  constructor(error: any) {
  }
}

export class LoadOnePGroupeRequest implements Action {
  readonly type = PGroupeActionTypes.LoadOnePGroupeRequest;

  constructor(public payload: { id: string }) {
  }
}

export class LoadOnePGroupeSuccess implements Action {
  readonly type = PGroupeActionTypes.LoadOnePGroupeSuccess;

  constructor(public payload: {
    id: any;
    pGroupe: PGroupe
  }) {
  }
}

export class LoadOnePGroupeFailed implements Action {
  readonly type = PGroupeActionTypes.LoadOnePGroupeFailed;

  constructor() {
  }
}

export class LoadPGroupesBySameOfOffreVoyageRequest implements Action {
  readonly type = PGroupeActionTypes.LoadPGroupesBySameOfOffreVoyageRequest;

  constructor() {
  }
}

export class LoadPGroupesRequest implements Action {
  readonly type = PGroupeActionTypes.LoadPGroupesRequest;

  constructor(public idOffreVoyage,
              public paginatorInformations: PaginatorInformations,
              public search: {
                search: string,
                ville?: string,
                modalites?: any,
                etat?: string,
                type?: string,
              }) {
  }
}

export class LoadPGroupesSuccess implements Action {
  readonly type = PGroupeActionTypes.LoadPGroupesSuccess;

  constructor(public payload: { paginatedResults: PaginatedResult<PGroupe>; idOffreVoyage: any }) {
  }
}

export class LoadPGroupesFailed implements Action {
  readonly type = PGroupeActionTypes.LoadPGroupesFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type PGroupeActions = LoadPGroupesRequest |
  LoadPGroupesSuccess |
  LoadPGroupesFailed |

  SavePGroupeRequest |
  SavePGroupeSuccess |
  SavePGroupeFailed |
  SavePGroupeFactureRequest |
  SavePGroupeFactureSuccess |
  SavePGroupeFactureFailed |

  LoadPGroupesBySameOfOffreVoyageRequest |
  UpdatePGroupeRequest |
  UpdatePGroupeSuccess |
  UpdatePGroupeFailed |
  DeletePGroupeRequest |
  DeletePGroupeSuccess |
  DeletePGroupeFailed |
  LoadOnePGroupeRequest |
  LoadOnePGroupeSuccess |
  LoadOnePGroupeFailed ;
