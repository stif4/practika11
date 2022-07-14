import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import $api from "../../axios";
import axios from "axios";

export const fetchAuth = createAsyncThunk(
  "auth/fechAuth",
  async (params, { rejectWithValue }) => {
    try {
      // const response = await $api.post("/login", {
      //   email: params.email,
      //   password: params.password,
      // });
      // localStorage.setItem("token", response.data.accessToken);

      const { response } = await $api.post("/auth/login", params);
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
      return rejectWithValue(e);
    }
  }
);

export const fetchAuthCheck = createAsyncThunk(
  "auth/fechAuthCheck",
  async (_, { rejectWithValue }) => {
    // const response = await axios.get("http://localhost:5000/api/refresh", {withCredentials: true});
    // console.log(response);
    // localStorage.setItem("token", response.data.accessToken);
    try {
      const response = await $api.get("http://localhost:3001/auth/profile", {
        withCredentials: true,
      });
      return response
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/fechRegister",
  async (params, { rejectWithValue }) => {
    try {
      // const response = await $api.post("/registration", {
      //   name: params.fullName,
      //   email: params.email,
      //   password: params.password,
      // });
      // localStorage.setItem("token", response.data.accessToken);
      const response = await $api.post("/auth/register", params);
      // const response = await $api.post("/auth/reg", params);
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
      return rejectWithValue(e);
    }
  }
);

export const fetchLogout = createAsyncThunk("auth/logout", async () => {
  try {
    // const response = await $api.post("/logout");
    const response = await $api.post("/auth/logout");
    console.log(response);
    // localStorage.removeItem("token");
  } catch (e) {
    console.log(e.response?.data?.message);
  }
});

const initialState = {
  data: null,
  status: "loading",
  isLoading: false,
  isAuth: null,
  isRedirect: false,
  itWasAuthorised: false,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleRedirect: (state, action) => {
      state.isRedirect = action.payload;
    },
    toggleItWasAuthorised: (state, action) => {
      state.itWasAuthorised = action.payload;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
      // state.isLoading = true;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
      state.isAuth = true;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = "error";
      state.data = null;
      state.isLoading = false;
      state.isAuth = false;
    },
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
      // state.isAuth = true;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.status = "error";
      state.data = null;
    },
    [fetchLogout.pending]: (state) => {
      state.status = "loading";
      state.data = null;
      state.isLoading = true;
    },
    [fetchLogout.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = null;
      state.isAuth = false;
      state.isLoading = false;
    },
    [fetchLogout.rejected]: (state) => {
      state.status = "error";
      state.data = null;
      state.isLoading = false;
    },
    [fetchAuthCheck.pending]: (state) => {
      state.status = "loading";
      state.data = null;
      state.isLoading = true;
    },
    [fetchAuthCheck.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
      state.isAuth = true;
      state.isLoading = false; 
    },
    [fetchAuthCheck.rejected]: (state) => {
      state.status = "error";
      state.data = null;
      state.isAuth = false;
      state.isLoading = false;
    },
  },
});

export const auth = authSlice.reducer;
export const { logout, toggleRedirect, toggleItWasAuthorised } =
  authSlice.actions;
