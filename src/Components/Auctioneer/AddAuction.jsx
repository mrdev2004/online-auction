import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { addAuction } from '../redux/Slices/auctionSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Style from "../CommonComponents/Style";

const AddAuction = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const validateForm = () => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (!title.trim()) return 'Title is required.';
    if (!description.trim()) return 'Description is required.';
    if (!price || price <= 0) return 'Price must be a positive number.';
    if (!startTime) return 'Start time is required.';
    if (!endTime) return 'End time is required.';


    if (start.getTime() === end.getTime()) {
      return 'Start time and End time cannot be the same.';
    }

    if (end <= start) {
      return 'End time must be at least 1 minute after Start time.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const error = validateForm();
    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost/demo/shopdata', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Auction added successfully!');
        setTitle('');
        setDescription('');
        setPrice('');
        setImage(null);
        setStartTime('');
        setEndTime('');
      } else {
        toast.error(result.error || 'Something went wrong');
      }
    } catch (error) {
      toast.error('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Style />
      <ToastContainer />
      <div className="container mt-5">
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
          <div className="form-group" style={{ paddingTop: '10px' }}>
            <h2 htmlFor="title" style={{ marginBottom: "20px" }}>Add Auction</h2>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter auction title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              placeholder="Enter a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="price">Starting Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Enter starting price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Product Image</label>
            <input
              type="file"
              className="form-control-file"
              id="image"
              onChange={handleImageChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="startTime">Auction Start Time</label>
            <input
              type="datetime-local"
              className="form-control"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              min={new Date().toISOString().slice(0, 16)} // Prevent past dates
            />
          </div>

          <div className="form-group">
            <label htmlFor="endTime">Auction End Time</label>
            <input
              type="datetime-local"
              className="form-control"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              min={startTime || new Date().toISOString().slice(0, 16)} // Prevent past dates
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block mt-3"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Auction'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddAuction;
