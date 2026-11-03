import React, { useState, useEffect } from "react";

const ViewFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await fetch("http://localhost/demo/viewfeedback.php");
            const data = await response.json();
            console.log("Fetched Data:", data);

            if (Array.isArray(data)) { // Ensure it's an array before setting state
                setFeedbacks(data);
                setFilteredFeedbacks(data);
            } else {
                console.error("Invalid data format received:", data);
            }
        } catch (error) {
            console.error("Error fetching feedback:", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        filterFeedbacks(e.target.value);
    };

    const filterFeedbacks = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = feedbacks.filter(
            (feedback) =>
                feedback.name_feedback_person.toLowerCase().includes(lowercasedQuery) ||
                feedback.message.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredFeedbacks(filtered);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this feedback?")) {
            try {
                const response = await fetch(`http://localhost/demo/delete_feedback.php`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id }),
                });
                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    fetchFeedbacks(); // Refresh feedback list after deletion
                } else {
                    alert("Failed to delete feedback");
                }
            } catch (error) {
                console.error("Error deleting feedback:", error);
            }
        }
    };

    return (
        <div style={styles.container}>

            <input
                type="text"
                placeholder="Search feedbacks by name or message"
                style={styles.searchInput}
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeaderRow}>
                        <th style={styles.tableHeader}>ID</th>
                        <th style={styles.tableHeader}>Name</th>
                        <th style={styles.tableHeader}>Message</th>

                    </tr>
                </thead>
                <tbody>
                    {filteredFeedbacks.length > 0 ? (
                        filteredFeedbacks.map((feedback) => (
                            <tr key={feedback.id} style={styles.tableRow}>
                                <td style={styles.tableCell}>{feedback.f_id}</td>
                                <td style={styles.tableCell}>{feedback.name_feedback_person}</td>
                                <td style={styles.tableCell}>{feedback.message}</td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={styles.noFeedbackCell}>
                                No feedback found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        backgroundColor: "#f8f9fc",
        minHeight: "100vh",
        paddingLeft: "28%"
    },
    header: {
        // textAlign: "center",
        marginBottom: "20px",

    },
    searchInput: {
        width: "80%",
        padding: "10px",
        marginBottom: "20px",
        borderRadius: "5px",
        border: "1px solid #ddd",
        fontSize: "16px",
    },
    table: {
        width: "80%",
        borderCollapse: "collapse",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)",
    },
    tableHeaderRow: {
        backgroundColor: "#4e73df",
        color: "#fff",
    },
    tableHeader: {
        padding: "15px",
        textAlign: "left",
    },
    tableRow: {
        borderBottom: "1px solid #e3e6f0",
    },
    tableCell: {
        padding: "15px",
        color: "#5a5c69",
    },
    noFeedbackCell: {
        textAlign: "center",
        padding: "20px",
        color: "#5a5c69",
    },
    deleteButton: {
        padding: "5px 10px",
        backgroundColor: "#e74a3b",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default ViewFeedback;
