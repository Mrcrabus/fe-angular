import {
  UsersUnion,
  UserActions,
} from './user.actions';
import {User} from "../../models/user";


export const initialState: User = {
  id: "",
  email: "",
  userName: ""
};
// CreateReducer
export function userReducer(
  state: User = initialState,
  action: UsersUnion
) {
  switch (action.type) {
    case UserActions.LoadUser:
      return {
        ...state,
        id: action.payload.user.id,
        email: action.payload.user.email,
        userName: action.payload.user.userName,
      };
    case UserActions.DeleteUser:
      return {
        ...state,
        id: "",
        email: "",
        userName: "",
      }
    default:
      return state;
  }
}
