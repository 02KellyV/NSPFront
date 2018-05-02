
import { sources } from '../actions/actionTypes';

const defaultProps = {
    selected: null,
    file: null,
    data: []
};

export default (state = defaultProps, action) => {
    switch (action.type) {
        case sources.set:
            return { ...state, data: action.data };
        case sources.selected:
            return { ...state, selected: action.data };
        case sources.setFile:
            return { ...state, file: action.data };
        default:
            return state;
    }
};