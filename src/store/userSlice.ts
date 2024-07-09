import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
  email: string;
  password: string;
}
export interface InitialValue {
  user: User | null | undefined;
}

const initialState: InitialValue = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  // extraReducers: (builder) => {

  // },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
