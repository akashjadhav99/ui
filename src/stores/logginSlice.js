import { createSlice } from "@reduxjs/toolkit";

export const LoginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    is_Loggin: false,
    userName: null,
  },
  reducers: {
    checkloggin: (state) => {
      const checkToken = localStorage.getItem("User");

      if (checkToken !== null) {
        const user = JSON.parse(checkToken);
        state.is_Loggin = !state.is_Loggin;
        state.userName = user.username;
      } else {
        state.is_Loggin = false;
        state.userName = null;
      }
    },
    logout:(state)=>{
        localStorage.clear()
        state.is_Loggin = false;
        state.userName = null;
    },
  },
});

export const { checkloggin,logout } = LoginSlice.actions;
export default LoginSlice.reducer;
