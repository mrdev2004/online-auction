// src/redux/commissionSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Retrieve the commission data from localStorage (if it exists)
const storedCommission = localStorage.getItem('commission');
const initialState = storedCommission ? JSON.parse(storedCommission) : []; // Change to an empty array if no data exists

const commissionSlice = createSlice({
  name: 'commission',
  initialState,
  reducers: {
    setCommission: (state, action) => {
      const newState = action.payload;
      // Store the updated commission data in localStorage
      localStorage.setItem('commission', JSON.stringify(newState));
      return newState; // Update state with the new commission array
    },
  },
});

export const { setCommission } = commissionSlice.actions;
export default commissionSlice.reducer;
