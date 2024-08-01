import { createSlice } from '@reduxjs/toolkit'

export interface totalItemsState {
   totalItems: number
}

const initialState: totalItemsState = {
  totalItems: 0,
}

export const totalItemsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.totalItems += 1
    },
    reset: (state) => {
      state.totalItems = 0;
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, reset } = totalItemsSlice.actions

export default totalItemsSlice.reducer