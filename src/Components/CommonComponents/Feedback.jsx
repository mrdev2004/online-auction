import React, { useState } from 'react';
import Style from './Style';
import { toast, ToastContainer } from 'react-toastify';


const Feedback = () => {
  const [formData, setFormData] = useState({
    name_feedback_person: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');


  // Validation: Allow only letters and spaces
  const isValidText = (text) => /^[A-Za-z\s]+$/.test(text);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (!isValidText(value) && value !== "") {
      toast.error(`Invalid input: ${name.replace("_", " ")} should contain only letters`, {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidText(formData.name_feedback_person) || !isValidText(formData.message)) {
      toast.error("Please enter only text (no numbers) in the fields.", {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }

    try {
      const response = await fetch('http://localhost/demo/submit_feedback.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name_feedback_person: '', message: '' });
        toast.success("Feedback submitted successfully!", {
          position: "top-right",
          autoClose: 3000
        });
      } else {
        toast.error(data.message || 'Error submitting feedback', {
          position: "top-right",
          autoClose: 3000
        });
      }
    } catch (err) {
      toast.error("Server error. Please try again later.", {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  const formStyles = {
    container: {
      maxWidth: '500px',
      margin: '0 auto',
      paddingTop: '180px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#555'
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      boxSizing: 'border-box',
      fontSize: '16px'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      boxSizing: 'border-box',
      fontSize: '16px',
      minHeight: '150px',
      resize: 'vertical'
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      width: '100%'
    },
    buttonHover: {
      backgroundColor: '#45a049'
    },
    success: {
      color: '#4CAF50',
      textAlign: 'center',
      padding: '10px',
      marginTop: '15px',
      backgroundColor: '#f8f8f8',
      borderRadius: '4px'
    },
    error: {
      color: '#f44336',
      textAlign: 'center',
      padding: '10px',
      marginTop: '15px',
      backgroundColor: '#f8f8f8',
      borderRadius: '4px'
    }
  };

  return (
    <div style={formStyles.container}>
      <div style={formStyles.header}>
        <h2>Share Your Feedback</h2>
        <Style />
        <ToastContainer />
        <p>We value your opinion. Please let us know your thoughts!</p>
      </div>

      {submitted ? (
        <div style={formStyles.success}>
          <p>Thank you for your feedback! We appreciate your input.</p>
          <button
            style={formStyles.button}
            onClick={() => setSubmitted(false)}
          >
            Submit Another Response
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={formStyles.formGroup}>
            <label style={formStyles.label} htmlFor="name_feedback_person">
              Your Name
            </label>
            <input
              type="text"
              id="name_feedback_person"
              name="name_feedback_person"
              value={formData.name_feedback_person}
              onChange={handleChange}
              style={formStyles.input}
              required
            />
          </div>

          <div style={formStyles.formGroup}>
            <label style={formStyles.label} htmlFor="message">
              Your Feedback
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={formStyles.textarea}
              required
            />
          </div>

          <div style={formStyles.formGroup}>
            <button
              type="submit"
              style={formStyles.button}
              onMouseOver={(e) => e.target.style.backgroundColor = formStyles.buttonHover.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = formStyles.button.backgroundColor}
            >
              Submit Feedback
            </button>
          </div>

          {error && <div style={formStyles.error}>{error}</div>}
        </form>
      )}
    </div>
  );
};

export default Feedback;