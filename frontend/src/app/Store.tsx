import { configureStore } from '@reduxjs/toolkit';
import totalItemsReducer from '../features/counter/TotalSlice'

export const store = configureStore({
  reducer: {
    counter: totalItemsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch