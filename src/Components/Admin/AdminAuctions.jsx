import React, { useState, useEffect } from 'react';
import { Button, Table, Form, InputGroup, FormControl, Modal, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from "../CommonComponents/Style";
import { toast, ToastContainer } from 'react-toastify';

// Admin Auctions Component
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
    const [itemsPerPage] = useState(5);

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
        setShowModal(true);
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
                body: formData,
            });
            const result = await response.json();
            if (result.status === 'success') {
                toast.success('Updated Successfully');
                fetchAuctions();
                setShowModal(false);
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
            toast.success('Deleted Successfully');
            fetchAuctions();
        } else {
            alert('Error deleting auction');
        }
    };

    const filteredAuctions = auctions.filter((auction) =>
        auction.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);

    const currentAuctions = filteredAuctions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPrice = auctions.reduce(
        (total, auction) => total + parseFloat(auction.price),
        0
    );
    const totalAuctions = auctions.length;

    return (
        <div className="container mt-5" style={{ scrollBehavior: 'smooth' }}>
            <Style />
            <ToastContainer />
            <h2 className="mb-4" >Auctions</h2>

            {/* Stats Card */}
            <div style={styles.statsContainer}>
                <div style={{ ...styles.statsCard, backgroundColor: '#4e73df' }}>
                    <h5 style={styles.statsTitle}>Total Price</h5>
                    <p style={styles.statsValue}>Rs. {totalPrice.toFixed(2)}</p>
                </div>
                <div style={{ ...styles.statsCard, backgroundColor: '#1cc88a' }}>
                    <h5 style={styles.statsTitle}>Total Auctions</h5>
                    <p style={styles.statsValue}>{totalAuctions}</p>
                </div>
            </div>

            {/* Search Bar */}
            <InputGroup className="mb-4" style={styles.searchBar}>
                <FormControl
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                />
            </InputGroup>

            {/* Auctions Table */}
            <Table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>ID</th>
                        <th style={styles.tableHeader}>Title</th>
                        <th style={styles.tableHeader}>Description</th>
                        <th style={styles.tableHeader}>Price</th>
                        <th style={styles.tableHeader}>Start Time</th>
                        <th style={styles.tableHeader}>End Time</th>
                        <th style={styles.tableHeader}>Image</th>
                        <th style={styles.tableHeader}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAuctions.map((auction) => (
                        <tr key={auction.id} style={styles.tableRow}>
                            <td style={styles.tableCell}>{auction.id}</td>
                            <td style={styles.tableCell}>{auction.title}</td>
                            <td style={styles.tableCell}>{auction.description}</td>
                            <td style={styles.tableCell}>{auction.price}</td>
                            <td style={styles.tableCell}>{auction.start_time}</td>
                            <td style={styles.tableCell}>{auction.end_time}</td>
                            <td style={styles.tableCell}>
                                {auction.image_path ? (
                                    <img
                                        src={`http://localhost/demo/${auction.image_path}`}
                                        alt="Auction"
                                        width="100"
                                    />
                                ) : (
                                    'No Image'
                                )}
                            </td>
                            <td style={{ display: "flex" }}>
                                <Button
                                    variant="warning"
                                    onClick={() => handleEdit(auction)}
                                    style={styles.editButton}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(auction.id)}
                                    style={styles.deleteButton}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Pagination */}
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

// Inline CSS Styles
const styles = {
    statsContainer: {
        display: 'flex',
        gap: '20px',
        marginBottom: '30px',
    },
    statsCard: {
        flex: '1',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
        textAlign: 'center',
        color: '#fff',
    },
    statsTitle: {
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '10px',
    },
    statsValue: {
        fontSize: '24px',
        fontWeight: '700',
    },
    searchBar: {
        marginBottom: '30px',
    },
    searchInput: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    table: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
    },
    tableHeader: {
        padding: '15px',
        textAlign: 'left',
        color: '#fff',
        backgroundColor: '#4e73df',
        fontWeight: '600',
        width: "300px"
    },
    tableRow: {
        borderBottom: '1px solid #e3e6f0',
    },
    tableCell: {
        padding: '15px',
        color: '#5a5c69',

    },
    editButton: {
        marginRight: '10px',
    },
    deleteButton: {
        marginLeft: '10px',
    },
};

export default AdminAuctions;
