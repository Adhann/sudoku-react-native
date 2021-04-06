import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import sugokuReducer from "./reducer/sugokuReducer";

const store = createStore(sugokuReducer, applyMiddleware(thunk));

export default store;