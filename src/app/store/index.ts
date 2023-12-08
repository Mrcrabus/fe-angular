import {userReducer} from './user/user.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {User} from '../models/user';

export interface State {
  user: User;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
};
