// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import commissionReducer from './Slices/commissionSlice';
import auctionReducer from  './Slices/auctionSlice';

// Configuring the Redux store and adding reducers for commission and auction
const store = configureStore({
  reducer: {
    commission: commissionReducer, // Manages commission data
    auction: auctionReducer,       // Manages auction data
  },
});

export default store;
