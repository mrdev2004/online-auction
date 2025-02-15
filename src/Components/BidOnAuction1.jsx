import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { Card, Button, Form, Table } from 'react-bootstrap';
import { updateBid } from '../redux/Slices/auctionSlice';
// import './BidOnAuction1.css'; // Custom CSS file
import Style from './Style';

const BidOnAuction1 = () => {
  const { title } = useParams();
  const auction = useSelector((state) =>
    state.auction.auctions.find((auction) => auction.title === title)
  );
  const dispatch = useDispatch();
  const [bid, setBid] = useState(auction.price || 0);

  const handleBid = () => {
    if (bid > auction.price) {
      dispatch(updateBid({ title, bid }));
      alert('Bid placed successfully!');
    } else {
      alert('Your bid must be higher than the current price!');
    }
  };

  return (
    <>
       <div>
            <link rel="stylesheet" href="css/linearicons.css" />
      <link rel="stylesheet" href="css/owl.carousel.css" />
      <link rel="stylesheet" href="css/themify-icons.css" />
      <link rel="stylesheet" href="css/font-awesome.min.css" />
      <link rel="stylesheet" href="css/nice-select.css" />
      <link rel="stylesheet" href="css/nouislider.min.css" />
      <link rel="stylesheet" href="css/bootstrap.css" />
      <link rel="stylesheet" href="css/main.css" />
    </div>

    </>
  );
};

export default BidOnAuction1;
