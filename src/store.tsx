import { createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers, ApplicationState } from './reducers';

const composeEnhancers = composeWithDevTools({});

const store: Store<ApplicationState> = createStore(
    reducers, 
    undefined,
    composeEnhancers()
)

export default store;
