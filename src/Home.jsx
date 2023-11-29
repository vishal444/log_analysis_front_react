import React, { useState } from 'react';

function Home() {
  const [textData, setTextData] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setTextData(e.target.value);
  };

  const handleSubmit = async () => {
    // Process the text data here
    const formData = new FormData();
        formData.append('logData', textData); // Include name in the form data
        if(file) {
          formData.append('file', file);
        }
    try {
      const response = await fetch(
        `http://127.0.0.1:5001/logs`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await response.json();
      console.log("response:", data)
    } catch (error) {
      console.error(error);
    }
    setFile(null);
  };

  return (
    <div style={{paddingTop: '20px'}}> 
    <h1>Log Analyser</h1>
      <textarea
        value={textData}
        onChange={handleTextChange}
        rows={10}
        placeholder='Enter your logs text here'
        style={{
          width: '85%',
          height: '200px',
          padding: '10px',
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          borderRadius: '10px', // Added rounded edges
          marginBottom: '10px', // Added space after the textarea
        }}
      />
         <input
        type="file"
        accept=".pdf, .txt, .odt"
        onChange={handleFileChange}
        style={{ marginBottom: '10px' }}
      />
      <br /> {/* Added line break */}
      <button onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Home;
