import _ from 'lodash'
import { CREATE_USER, GET_USERS, GET_USER, EDIT_USER, DELETE_USER } from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_USER: 
            return { ...state, [action.payload.id]: action.payload };
        case GET_USERS: 
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case CREATE_USER: 
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_USER: 
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_USER: 
            return _.omit(state, action.payload)
        default:
            return state;
    }
};