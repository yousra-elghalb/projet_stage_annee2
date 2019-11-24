import {Action} from '@ngrx/store';
import {PaginatorInformations} from '../../../shared_models/paginator-informations';
import {PaginatedResult} from '../../../shared_models/paginated-result';
import {GroupeConvention} from '../model/groupe-convention';

export enum GroupeConventionActionTypes {
  LoadGroupeConventionsIsNotLoadedRequest = '[GroupeConvention] LoadGroupeConventionsIsNotLoadedRequest GroupeConvention',
  LoadGroupeConventionsRequest = '[GroupeConvention] LoadGroupeConventionsRequest GroupeConvention',
  LoadGroupeConventionsSuccess = '[GroupeConvention] LoadGroupeConventionsSuccess GroupeConvention',
  LoadGroupeConventionsFailed = '[GroupeConvention] LoadGroupeConventionsFailed GroupeConvention',
  GroupeConventionsloading = '[GroupeConvention] GroupeConventionsloading GroupeConvention',

  LoadOneGroupeConventionRequest = '[GroupeConvention] LoadOneGroupeConventionRequest GroupeConvention',
  LoadOneGroupeConventionSuccess = '[GroupeConvention] LoadOneGroupeConventionSuccess GroupeConvention',
  LoadOneGroupeConventionFailed = '[GroupeConvention] LoadOneGroupeConventionFailed GroupeConvention',

  SaveGroupeConventionRequest = '[GroupeConvention] SaveGroupeConventionsRequest GroupeConvention',
  SaveGroupeConventionSuccess = '[GroupeConvention] SaveGroupeConventionsSuccess GroupeConvention',
  SaveGroupeConventionFailed = '[GroupeConvention] SaveGroupeConventionsFailed GroupeConvention',


  UpdateGroupeConventionRequest = '[GroupeConvention] UpdateGroupeConventionsRequest GroupeConvention',
  UpdateGroupeConventionSuccess = '[GroupeConvention] UpdateGroupeConventionsSuccess GroupeConvention',
  UpdateGroupeConventionFailed = '[GroupeConvention] UpdateGroupeConventionsFailed GroupeConvention',

  DeleteGroupeConventionRequest = '[GroupeConvention] DeleteGroupeConventionsRequest GroupeConvention',
  DeleteGroupeConventionSuccess = '[GroupeConvention] DeleteGroupeConventionsSuccess GroupeConvention',
  DeleteGroupeConventionFailed = '[GroupeConvention] DeleteGroupeConventionsFailed GroupeConvention',

}

export class DeleteGroupeConventionRequest implements Action {
  readonly type = GroupeConventionActionTypes.DeleteGroupeConventionRequest;

  constructor(public payload: { id: number }) {
  }
}

export class DeleteGroupeConventionSuccess implements Action {
  readonly type = GroupeConventionActionTypes.DeleteGroupeConventionSuccess;

  constructor() {
  }
}

export class DeleteGroupeConventionFailed implements Action {
  readonly type = GroupeConventionActionTypes.DeleteGroupeConventionFailed;

  constructor() {
  }
}

export class GroupeConventionsloading implements Action {
  readonly type = GroupeConventionActionTypes.GroupeConventionsloading;

  constructor() {
  }
}

export class UpdateGroupeConventionRequest implements Action {
  readonly type = GroupeConventionActionTypes.UpdateGroupeConventionRequest;

  constructor(public payload: { groupeConvention: GroupeConvention }) {
  }
}

export class UpdateGroupeConventionSuccess implements Action {
  readonly type = GroupeConventionActionTypes.UpdateGroupeConventionSuccess;

  constructor(public payload: { groupeConvention: GroupeConvention }) {
  }
}

export class UpdateGroupeConventionFailed implements Action {
  readonly type = GroupeConventionActionTypes.UpdateGroupeConventionFailed;

  constructor() {
  }
}

export class SaveGroupeConventionRequest implements Action {
  readonly type = GroupeConventionActionTypes.SaveGroupeConventionRequest;

  constructor(public payload: { groupeConvention: GroupeConvention }) {
  }
}

export class SaveGroupeConventionSuccess implements Action {
  readonly type = GroupeConventionActionTypes.SaveGroupeConventionSuccess;

  constructor(public payload: { groupeConvention: GroupeConvention }) {
  }
}

export class SaveGroupeConventionFailed implements Action {
  readonly type = GroupeConventionActionTypes.SaveGroupeConventionFailed;

  constructor(error: any) {
    console.warn(error);
  }
}

export class LoadOneGroupeConventionRequest implements Action {
  readonly type = GroupeConventionActionTypes.LoadOneGroupeConventionRequest;

  constructor(public payload: { id: number }) {
  }
}

export class LoadOneGroupeConventionSuccess implements Action {
  readonly type = GroupeConventionActionTypes.LoadOneGroupeConventionSuccess;

  constructor(public payload: { groupeConvention: GroupeConvention }) {
  }
}

export class LoadOneGroupeConventionFailed implements Action {
  readonly type = GroupeConventionActionTypes.LoadOneGroupeConventionFailed;

  constructor() {
  }
}

export class LoadGroupeConventionsRequest implements Action {
  readonly type = GroupeConventionActionTypes.LoadGroupeConventionsRequest;


  constructor(public typeGroupe: any, public search: string, public paginatorInformations: PaginatorInformations) {
  }
}

export class LoadGroupeConventionsIsNotLoadedRequest implements Action {
  readonly type = GroupeConventionActionTypes.LoadGroupeConventionsIsNotLoadedRequest;

  constructor() {
  }
}

export class LoadGroupeConventionsSuccess implements Action {
  readonly type = GroupeConventionActionTypes.LoadGroupeConventionsSuccess;

  constructor(public payload: {
    paginatedResults: PaginatedResult<GroupeConvention>
  }) {
  }
}

export class LoadGroupeConventionsFailed implements Action {
  readonly type = GroupeConventionActionTypes.LoadGroupeConventionsFailed;

  constructor() {
    console.warn('tra errHHHHHHHHHHHHHHHHHHHHHHHHHH');
  }
}


export type GroupeConventionActions = LoadGroupeConventionsRequest |
  LoadGroupeConventionsSuccess |
  LoadGroupeConventionsFailed |
  SaveGroupeConventionRequest |
  SaveGroupeConventionSuccess |
  SaveGroupeConventionFailed |
  GroupeConventionsloading |

  UpdateGroupeConventionRequest |
  UpdateGroupeConventionSuccess |
  UpdateGroupeConventionFailed |
  DeleteGroupeConventionRequest |
  DeleteGroupeConventionSuccess |
  DeleteGroupeConventionFailed |
  LoadOneGroupeConventionRequest |
  LoadOneGroupeConventionSuccess |
  LoadOneGroupeConventionFailed |
  LoadGroupeConventionsIsNotLoadedRequest;
