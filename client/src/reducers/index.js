import { combineReducers } from 'redux';

import posts from './posts';
import cities from './cities';

export const reducers = combineReducers({ posts, cities });
