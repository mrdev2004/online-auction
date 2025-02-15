// src/redux/auctionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auctions: JSON.parse(localStorage.getItem('auctions')) || [], // Load from localStorage
};

const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    addAuction: (state, action) => {
      state.auctions.push(action.payload);
      localStorage.setItem('auctions', JSON.stringify(state.auctions));
    },
    updateBid: (state, action) => {
      const { title, bid } = action.payload;
      const auction = state.auctions.find((auction) => auction.title === title);
      if (auction) {
        auction.price = bid;
        localStorage.setItem('auctions', JSON.stringify(state.auctions));
      }
    },
  },
});

export const { addAuction, updateBid } = auctionSlice.actions;

export default auctionSlice.reducer;
