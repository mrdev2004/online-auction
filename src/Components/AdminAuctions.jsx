import React, { useState, useEffect } from 'react';
import { Button, Table, Form, InputGroup, FormControl, Modal, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from './Style';
import { toast, ToastContainer } from 'react-toastify';

const AdminAuctions = () => {
    const [auctions, setAuctions] = useState([]);
    const [auctionToEdit, setAuctionToEdit] = useState(null);
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');
    const [updatePrice, setUpdatePrice] = useState('');
    const [updateStartTime, setUpdateStartTime] = useState('');
    const [updateEndTime, setUpdateEndTime] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // You can change the number of items per page

    useEffect(() => {
        fetchAuctions();
    }, []);

    const fetchAuctions = async () => {
        try {
            const response = await fetch('http://localhost/demo/tmp1.php');
            const data = await response.json();
            setAuctions(data);
        } catch (error) {
            console.error('Error fetching auctions:', error);
        }
    };

    const handleEdit = (auction) => {
        setAuctionToEdit(auction);
        setUpdateTitle(auction.title);
        setUpdateDescription(auction.description);
        setUpdatePrice(auction.price);
        setUpdateStartTime(auction.start_time);
        setUpdateEndTime(auction.end_time);
        setShowModal(true); // Show modal on Edit click
    };

    const handleUpdateAuction = async () => {
        const formData = new FormData();
        formData.append('update_id', auctionToEdit.id);
        formData.append('title', updateTitle);
        formData.append('description', updateDescription);
        formData.append('price', updatePrice);
        formData.append('start_time', updateStartTime);
        formData.append('end_time', updateEndTime);

        try {
            const response = await fetch('http://localhost/demo/tmp1.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.status === 'success') {
                toast.success("Updated Successfully");
                fetchAuctions();
                setShowModal(false); // Close modal after successful update
            } else {
                alert('Error updating auction');
            }
        } catch (error) {
            console.error('Error updating auction:', error);
        }
    };

    const handleDelete = async (auctionId) => {
        const response = await fetch('http://localhost/demo/tmp1.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: auctionId }),
        });

        const result = await response.json();
        if (result.status === 'success') {
            toast.success("Deleted Successfully");
            fetchAuctions();
        } else {
            alert('Error deleting auction');
        }
    };

    // Pagination logic
    const filteredAuctions = auctions.filter((auction) =>
        auction.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate total pages
    const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);

    // Get current auctions for the current page
    const currentAuctions = filteredAuctions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the total price and total number of products (auctions)
    const totalPrice = auctions.reduce((total, auction) => total + parseFloat(auction.price), 0);
    const totalAuctions = auctions.length;

    return (
        <div className="container my-4" style={{ scrollBehavior: "smooth" }}>
            <Style />
            <ToastContainer />
            <h2 className="mb-4">Admin Auctions</h2>

            {/* Colorful div displaying total price and total auctions */}
            <div style={{ backgroundColor: '#f8d7da', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
                <h4 style={{ color: '#721c24' }}>
                    Total Price of All Shoes : <strong>Rs.{totalPrice.toFixed(2)}</strong> | Total Auctions: <strong>{totalAuctions}</strong>
                </h4>
            </div>

            <InputGroup className="mb-4">
                <FormControl
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </InputGroup>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAuctions.map((auction) => (
                        <tr key={auction.id}>
                            <td>{auction.id}</td>
                            <td>{auction.title}</td>
                            <td>{auction.description}</td>
                            <td>{auction.price}</td>
                            <td>{auction.start_time}</td>
                            <td>{auction.end_time}</td>
                            <td>
                                {auction.image_path ? (
                                    <img src={`http://localhost/demo/${auction.image_path}`} alt="Auction" width="100" />
                                ) : (
                                    'No Image'
                                )}
                            </td>
                            <td style={{ width: "200px" }}>
                                <Button variant="warning" onClick={() => handleEdit(auction)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(auction.id)} className="ms-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Pagination */}
            { }
            <Pagination>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            {/* Modal for Edit */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Auction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={updateTitle}
                                onChange={(e) => setUpdateTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={updateDescription}
                                onChange={(e) => setUpdateDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={updatePrice}
                                onChange={(e) => setUpdatePrice(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={updateStartTime}
                                onChange={(e) => setUpdateStartTime(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={updateEndTime}
                                onChange={(e) => setUpdateEndTime(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateAuction}>
                        Update Auction
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminAuctions;
