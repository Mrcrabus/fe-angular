
import {Action} from '@ngrx/store';
import {User} from '../../models/user';

export enum UserActions {
  LoadUser = '[User Page] LoadUser',
  DeleteUser = '[User Page] DeleteUser',
}

//
export class LoadUser implements Action {
  public readonly type = UserActions.LoadUser;

  constructor(public payload: { user: User }) {
  }
}

export class DeleteUser implements Action {
  public readonly type = UserActions.DeleteUser;

}

export type UsersUnion = LoadUser | DeleteUser;
