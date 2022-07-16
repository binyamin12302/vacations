import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { vacationsReducer } from "./VacationsState";


// Single object containing all reducers:
const reducers = combineReducers({
    vacationsState: vacationsReducer,
    authState: authReducer
});

const store = createStore(reducers);

export default store;
