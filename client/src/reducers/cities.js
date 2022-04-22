import { FETCH_CITY } from '../constants/actionTypes';

export default (cities = [], action) => {
  switch (action.type) {
    case FETCH_CITY:
      return action.payload;
    default:
      return cities;
  }
};

