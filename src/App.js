import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+{}:"<>?|[];\',./`~';

    let characters = lowerCase;
    if (includeUppercase) characters += upperCase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }
    setPassword(generatedPassword);

    // 🎉 Show a nice toast message
    toast.success('Password generated successfully!', {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const copyToClipboard = () => {
    if (password === '') {
      toast.error('No password generated yet!', {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    navigator.clipboard.writeText(password).then(() => {
      toast.success('Password copied to clipboard!', {
        position: "top-center",
        autoClose: 2000,
      });
    }).catch(err => {
      toast.error('Failed to copy password', {
        position: "top-center",
        autoClose: 2000,
      });
    });
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔒 Password Generator</h1>
        
        <input
          style={styles.input}
          type="text"
          value={password}
          placeholder="Your password will appear here"
          readOnly
        />
        <button style={styles.copyButton} onClick={copyToClipboard}>
          Copy
        </button>

        <div style={styles.options}>
          <label style={styles.label}>
            Length: 
            <input
              style={styles.slider}
              type="number"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </label>

          <label style={styles.label}>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            Include Uppercase
          </label>

          <label style={styles.label}>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            Include Numbers
          </label>

          <label style={styles.label}>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            Include Symbols
          </label>
        </div>

        <button style={styles.button} onClick={generatePassword}>
          Generate Password
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

const styles = {
  pageContainer: {
    height: '100vh',
    width: '100vw',
    backgroundImage: 'url("/images/pwImg.png")', // Updated background image URL
    backgroundSize: 'cover', // Ensure the image covers the entire page
    backgroundPosition: 'center', // Center the image
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: 'brightness(0.7)', // Optional darken filter to improve readability
    position: 'relative',
  },
  card: {
    background: '#ffffff',
    backdropFilter: 'blur(10px)',
    padding: '2.5rem',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    minWidth: '320px',
    maxWidth: '400px',
    textAlign: 'center',
    zIndex: 1,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  title: {
    marginBottom: '1.5rem',
    fontSize: '2rem',
    color: '#2c3e50',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    marginBottom: '1.2rem',
    color: '#2c3e50',
    background: 'rgba(255, 255, 255, 0.8)',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
  },
  copyButton: {
    marginTop: '0.5rem',
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  options: {
    textAlign: 'left',
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    color: '#2c3e50',
    fontWeight: '500',
  },
  slider: {
    marginLeft: '10px',
    width: '60px',
  },
  button: {
    padding: '12px 25px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
};

export default PasswordGenerator;
