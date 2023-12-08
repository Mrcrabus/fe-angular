import {createSelector, createFeatureSelector} from '@ngrx/store';
import {User} from '../../models/user';

const selectUserState = createFeatureSelector<User>('user');

export const selectUserName = createSelector(selectUserState,
    state => state.userName);
export const selectUserId = createSelector(selectUserState,
  state => state.id);
