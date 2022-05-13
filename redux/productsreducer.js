import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    count: 0,
    name:'maher'
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        increment: (state, action) => {
            state.count = state.count + 1;
            state.name = 'maherchange'
        }
    }
})

export const { increment } = productSlice.actions

export default productSlice.reducer