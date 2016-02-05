import  {REGISTER_FAILED, REGISTER_SUCCESSFULLY} from './../constants/RegisterActionTypes'
import Immutable from 'immutable';

const initialState = new Immutable.Map({
    userData: {},
    isLoggingIn: false,
    isLoggedIn: false,
    error: null
});

export default function user(state = initialState, action) {
    switch (action.type) {
        case REGISTER_FAILED:
            return state.merge({
                error: action.error,
                isLoggingIn: false,
                isLoggedIn: false
            });
        case REGISTER_SUCCESSFULLY:
            return state.merge({
                error: null,
                isLoggingIn: false,
                isLoggedIn: true
            });
            break;
        default:
            return state;
    }
}