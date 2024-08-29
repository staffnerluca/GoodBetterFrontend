import React, { useState } from 'react';

function MoralityChatBot() {
  const [queries, setQueries] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQueryChange = (e) => {
    setCurrentQuery(e.target.value);
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();

    if (currentQuery.trim() === '') return;

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/morality_chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query: currentQuery }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const newEntry = {
        query: currentQuery,
        answer: data.answer,
      };

      setQueries([newEntry, ...queries]);
      setCurrentQuery('');
    } catch (error) {
      console.error('Error fetching the response:', error);
      alert('There was an error with your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="morality-chatbot-query">
      <h1>Discuss further questions with our Morality Chatbot</h1>
      <br></br>
      <form onSubmit={handleQuerySubmit}>
        <input
          type="text"
          value={currentQuery}
          onChange={handleQueryChange}
          placeholder="Enter your query here..."
          disabled={loading}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Loading...' : 'Ask MoralityChatbot'}
        </button>
      </form>
      <div className="query-results" style={{ marginTop: '20px' }}>
        {queries.length > 0 &&
          queries.map((entry, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <strong>Query:</strong> {entry.query}
              <br />
              <strong>Answer:</strong> {entry.answer}
            </div>
          ))}
      </div>
    </div>
  );
}

export default MoralityChatBot;
