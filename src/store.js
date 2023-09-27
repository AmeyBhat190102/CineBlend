import { configureStore } from "@reduxjs/toolkit";
import { customReducer } from "./Reducers";
const store = configureStore({
    reducer : {
        customReducer : customReducer
    }
})

export default store