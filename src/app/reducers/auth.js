
import { auth } from '../actions/actionTypes';

const defaultProps = {
    session: null,
    isLogged: false
};

export default (state = defaultProps, action) => {
    switch (action.type) {
        case auth.setSession:
            return { ...state, session: action.data, isLogged: true };
        default:
            return state;
    }
};