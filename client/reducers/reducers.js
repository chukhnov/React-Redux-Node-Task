import { ADD_USER } from './../actions/actions'


export default function user (state, action) {
    switch (action.type) {
        case ADD_USER:
            return {
                id: action.id,
                data: action.data
            };
        default:
            return state
    }
}
