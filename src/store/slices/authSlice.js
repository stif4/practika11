import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchAuth = createAsyncThunk('auth/fechAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
})

export const fetchRegister = createAsyncThunk('auth/fechRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
})

const initialState = {
    data: null,
    status: 'loading',
    isAuth: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            state.isAuth = false
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
            state.isAuth = true
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchRegister.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
            state.isAuth = true
        },
        [fetchRegister.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },
    },
});

export const auth = authSlice.reducer
export const { logout } = authSlice.actions