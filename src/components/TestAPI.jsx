import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const TestAPI = () => {
  const [token, setToken] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/login_view/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'new_user1@example.com', // Replace with valid credentials
            password: 'your-password',
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setToken(data.token); // Assuming token is returned
        } else {
          console.error('Login failed:', data.error);
        }
      } catch (error) {
        console.error('Login request error:', error);
      }
    };

    const testAPIs = async () => {
      const endpoints = [
        { url: '/get_all_courses/', method: 'GET'},
        { url: '/get_current_course_lesson/', method: 'GET' },
        { url: '/register/', method: 'POST', data: { email: 'new2@example.com', password: 'password', username: 'newuser' } },
        { url: '/create_user_profile/', method: 'POST', data: { first_name: 'John', second_name: 'Doe', username: 'johndoe', country: 'US', birth_date: '1990-01-01', wants_to_become_vegetarian: true } },
        { url: '/get_data_for_vegetarian_streak_page/?username=username1', method: 'GET' },
        { url: '/create_test_users/', method: 'POST' },
        { url: '/get_all_users/', 
            method: 'GET' },
        { url: '/get_all_days/', method: 'GET' },
      ];

      const responses = [];

      for (const endpoint of endpoints) {
        try {
          const config = {
            method: endpoint.method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token ? `Token ${token}` : '', // If using token-based auth
            },
          };
          if (endpoint.method === 'POST') {
            config.body = JSON.stringify(endpoint.data || {});
          }

          const response = await fetch(`${API_BASE_URL}${endpoint.url}`, config);
          const data = await response.json();
          if (response.ok) {
            responses.push({ endpoint: endpoint.url, data });
          } else {
            responses.push({ endpoint: endpoint.url, error: data.error || 'Unknown error' });
          }
        } catch (error) {
          responses.push({ endpoint: endpoint.url, error: error.message });
        }
      }

      setResults(responses);
      setLoading(false);
    };

    const executeTests = async () => {
      //await login();
      await testAPIs();
    };

    executeTests();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>API Test Results</h1>
      {results.map((result, index) => (
        <div key={index}>
          <h2>Endpoint: {result.endpoint}</h2>
          {result.error ? (
            <p>Error: {result.error}</p>
          ) : (
            <pre>{JSON.stringify(result.data, null, 2)}</pre>
          )}
        </div>
      ))}
    </div>
  );
};

export default TestAPI;
