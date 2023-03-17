import {configureStore} from '@reduxjs/toolkit';
import {setSocketState} from './reducers'

const store = configureStore({
        reducer:setSocketState
        });
export default store;
