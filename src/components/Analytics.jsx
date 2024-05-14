import { useState } from 'react';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Analytics = () => {
  const [shortId, setShortId] = useState('');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${backendUrl}/url/analytics/${shortId}`);
      setAnalyticsData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Error fetching analytics. Please try again.');
      setAnalyticsData(null);
    }
  };

  return (
    <div className="container">
      <h1>URL Analytics</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={shortId}
          onChange={(e) => setShortId(e.target.value)}
          placeholder="Enter shortened link ID"
          required
        />
        <button type="submit">Get Analytics</button>
      </form>
      {error && <p>{error}</p>}
      {analyticsData && (
        <div>
          <p>Total Clicks:🔎 {analyticsData?.totalClicks}</p>
          <h2>Click Timestamps🕓:</h2>
          <ul>
            {analyticsData?.analytics.map((entry) => (
              <li key={entry._id}>
                {new Date(entry.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Analytics;
