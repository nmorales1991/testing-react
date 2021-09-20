import {AppState, AppAction} from "../interfaces/AppInteface";
export default function(state: AppState, action: AppAction){
  switch (action.type) {
    case 'fetchSuccess':
      return {
        ...state,
        error: false,
        title: action.payload,
      }
    case 'fetchError':
      return {
        ...state,
        error: true,
        title: '',
      }
    default:
      return state;
  }
}

