import { configureStore } from "@reduxjs/toolkit";
import logginSlice from "./logginSlice";
import permissionSlice from "./permissionSlice";

export default configureStore({
    reducer:{
        login:logginSlice,
        permisson:permissionSlice,
    }
})