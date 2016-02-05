import  { REGISTER_ATTEMPT, REGISTER_FAILED, REGISTER_SUCCESSFULLY } from './../constants/RegisterActionTypes'
import Immutable from 'immutable';

//export default function user (state, action) {
//    switch (action.type) {
//        case REGISTER_ATTEMPT:
//            return {
//                data: action.data
//            };
//        default:
//            return state
//    }
//
//}
const initialState = new Immutable.Map({
    userData : {},
    isLoggingIn: false,
    isLoggedIn: false,
    error: null
});

export default function user(state = initialState, action) {
    switch (action.type) {
        case REGISTER_ATTEMPT:
            return state.merge({
                isLoggingIn: true,
                isLoggedIn: false,
                userData: action.data
            });
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