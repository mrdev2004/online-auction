import React, { useState } from 'react';

const AdminInsertPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form fields
        if (!name || !email || !password || !createdAt) {
            setError('All fields are required!');
            return;
        }

        // Simulate an API call to insert the admin (replace with actual API request)
        try {
            const response = await fetch('http://localhost/demo/InsertAdmin.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, created_at: createdAt }),
            });

            if (response.ok) {
                setMessage('Admin added successfully!');
                setName('');
                setEmail('');
                setPassword('');
                setCreatedAt('');
                setError('');
            } else {
                setError('Failed to add admin.');
            }
        } catch (error) {
            console.error('Error inserting admin:', error);
            setError('Error occurred while adding admin.');
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Main Content Area */}
            <div style={styles.container}>
                <h2 style={styles.header}>Add New Admin</h2>

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    {error && <div style={styles.error}>{error}</div>}
                    {message && <div style={styles.success}>{message}</div>}

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Name</label>
                        <input
                            type="text"
                            style={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            style={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            style={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Created At</label>
                        <input
                            type="date"
                            style={styles.input}
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                        />
                    </div>

                    <button type="submit" style={styles.submitButton}>Add Admin</button>
                </form>
            </div>
        </div>
    );
};

// Inline CSS Styles
const styles = {
    container: {
        marginLeft: '270px',
        padding: '20px',
        width: 'calc(100% - 270px)',
        backgroundColor: '#f8f9fc',
        minHeight: '100vh',
    },
    header: {
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '30px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '5px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        outline: 'none',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#4e73df',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    submitButtonHover: {
        backgroundColor: '#3e5ab7',
    },
    error: {
        color: '#e74a3b',
        backgroundColor: '#f8d7da',
        padding: '10px',
        borderRadius: '5px',
    },
    success: {
        color: '#28a745',
        backgroundColor: '#d4edda',
        padding: '10px',
        borderRadius: '5px',
    },
};

export default AdminInsertPage;
