export const ADD_USER = 'ADD_USER';

let nextUser = 0;

export function addUser(data) {
    return {
        type: ADD_USER,
        id: nextUser++,
        data
    };
}

