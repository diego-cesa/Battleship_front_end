import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer, {initialState} from './rootReducer';

const initStates = {
   rootReducer: initialState
}
const configureStore = () => {
   return createStore(rootReducer, initStates, applyMiddleware(thunk));
}
export default configureStore;