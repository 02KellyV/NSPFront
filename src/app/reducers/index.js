

import { combineReducers } from 'redux';
import auth from './auth';
import sources from './sources';

export default combineReducers({
    auth, sources
});