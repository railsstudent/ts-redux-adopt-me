import { createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers, ApplicationState } from './reducers';

const composeEnhancers = composeWithDevTools({});

const store: Store<ApplicationState> = createStore(
    reducers, 
    {
        location: 'Seattle, WA',
        theme: {
            backgroundColor: 'green',
            color: 'black'
        }
    },
    composeEnhancers()
)

export default store;
