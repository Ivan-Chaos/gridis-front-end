import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        id: 0,
        role: '',
        jwt: '',
        name: '',
        email: ''
    },

    reducers: {
        setJWT: (state, action) => {
            return { ...state, jwt: action.payload }
        },
        setRole: (state, action) => {
            return { ...state, role: action.payload }
        },
        setId: (state, action) => {
            return { ...state, id: action.payload }
        },
        setName: (state, action) => {
            return { ...state, name: action.payload }
        },
        setEmail: (state, action) => {
            return { ...state, name: action.payload }
        },
        clearState: (state, action) => {
            return {
                ...state,
                id: 0,
                role: '',
                jwt: '',
                name: '',
                email: ''
            }
        }
    }
});

export const { setJWT, setRole, setId, setName, setEmail, clearState } = accountSlice.actions;

export default accountSlice.reducer;