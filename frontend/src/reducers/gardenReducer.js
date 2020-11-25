import {FETCH_GARDENS} from '../actions/actionTypes';

// '../actions/types';
const INITIAL_STATE = [];
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_GARDENS:
      return action.payload;
    default:
      return state;
  }
};
