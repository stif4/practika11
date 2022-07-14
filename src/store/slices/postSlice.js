import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import $api from "../../axios";

export const allPosts = createAsyncThunk(
  "allPosts/fechAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api.get("product/all");
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
      return rejectWithValue(e);
    }
  }
);

export const allUserPosts = createAsyncThunk(
  "allUserPosts/fechAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api.get("product/allPost");
      console.log(response)
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
      return rejectWithValue(e);
    }
  }
);

export const userPostSubscribe = createAsyncThunk(
  "userPostSubscribe /fechAuth",
  async (id, { rejectWithValue }) => {
    try {
      const response = await $api.post(`product/subscribe/${id}`);
      
      return response;
    } catch (e) {
      console.log(11111)
      console.log(e.response?.data?.message);
      return rejectWithValue(e);
    }
  }
);

export const getPostSubscribers = createAsyncThunk(
  "userPostSubscribe /fechAuth",
  async (id, { rejectWithValue }) => {
    try {
      const response = await $api.get(`product/getSubscribe/${id}`);
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
      return rejectWithValue(e);
    }
  }
);


export const userPost = createAsyncThunk(
  "userPost/fechAuth",
  async (id, { rejectWithValue }) => {
    try {
      const response = await $api.get(`product/${id}`);
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
      return rejectWithValue(e);
    }
  }
);

export const userPostUpdate = createAsyncThunk(
  "userPostUpdate/fechAuth",
  async (params, { rejectWithValue }) => {
    try {
      const response = await $api.put(`product/update/${params.id}`, params.post);
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
      return rejectWithValue(e);
    }
  }
);

export const userPostDelete = createAsyncThunk(
  "userPostDelete/fechAuth",
  async (id, { rejectWithValue }) => {
    try {
      const response = await $api.delete(`product/delete/${id}`);
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
      return rejectWithValue(e);
    }
  }
);

export const getUserSubscribers = createAsyncThunk(
  "userPostSubscribe /fechAuth",
  async (id, { rejectWithValue }) => {
    try {
      const response = await $api.get(`product/getProductS/${id}`);
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
      return rejectWithValue(e);
    }
  }
);

const initialState = {
  data: null,
  userPosts: null,
  status: "loading",
  userPost: null,
  subscribers: null,
  userSubscribes:null,
  onCahnge: false,
  redirect: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePost : (state,action) => {
      state.userPost = action.payload
    },
    updateOnChange: (state,action) => {
      state.onCahnge = action.payload
    },
    redirectF: (state,action)=> {
      console.log(123)
      state.redirect = action.payload
    }
  },
  extraReducers: {
    [allPosts.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [allPosts.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload.data;
    },
    [allPosts.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [allUserPosts.pending]: (state) => {
      state.status = "loading";
      state.data = null;
      // state.isLoading = true;
    },
    [allUserPosts.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.userPosts = action.payload.data;
    },
    [allUserPosts.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [userPost.pending]: (state) => {
      state.status = "loading";
      state.data = null;
      // state.isLoading = true;
    },
    [userPost.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.userPost = action.payload.data;
    },
    [userPost.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [userPostUpdate.pending]: (state) => {
      state.status = "loading";
      state.data = null;
      // state.isLoading = true;
    },
    [userPostUpdate.fulfilled]: (state, action) => {
      state.status = "loaded";
      // state.userPost = action.payload.data;
      state.isAuth = true;
    },
    [userPostUpdate.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [userPostDelete.pending]: (state) => {
      state.status = "loading";
      state.data = null;
      // state.isLoading = true;
    },
    [userPostDelete.fulfilled]: (state, action) => {
      state.status = "loaded";
      // state.userPost = action.payload.data;
      state.isAuth = true;
    },
    [userPostDelete.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [userPostSubscribe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
      // state.isLoading = true;
    },
    [userPostSubscribe.fulfilled]: (state, action) => {
      state.status = "loaded";
      // state.userPost = action.payload.data;
      state.isAuth = true;
    },
    [userPostSubscribe.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [getPostSubscribers.pending]: (state) => {
      state.status = "loading";
      state.data = null;
      // state.isLoading = true;
    },
    [getPostSubscribers.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.subscribers = action.payload.data;
      state.isAuth = true;
    },
    [getPostSubscribers.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [getUserSubscribers.pending]: (state) => {
      state.status = "loading";
      state.data = null;
      // state.isLoading = true;
    },
    [getUserSubscribers.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.userSubscribes = action.payload.data;
      state.isAuth = true;
    },
    [getUserSubscribers.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const post = postSlice.reducer;
export const {updatePost ,updateOnChange, redirectF} = postSlice.actions;
