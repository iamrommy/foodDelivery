import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem('token'),
    user: localStorage.getItem("user")
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setToken (state, value) {
            state.token = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setUser (state, value) {
            state.user = value.payload;
        }, 
    }
});

export const {setToken, setLoading, setSignupData, setUser} = authSlice.actions;
export default authSlice.reducer;