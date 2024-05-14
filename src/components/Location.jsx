import { useState } from 'react';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Location = () => {
  const [shortenedLink, setShortenedLink] = useState('');
  const [ipInfo, setIpInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`${backendUrl}/shortened-link-info?shortenedLink=${shortenedLink}`);
      setIpInfo(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error fetching data. Please try again.');
      setIpInfo(null);
    }
  };

  return (
    <div className="container">
      <h1>Get IP Address and Location</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={shortenedLink}
          onChange={(e) => setShortenedLink(e.target.value)}
          placeholder="Enter shortened link"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {ipInfo && (
        <div id="result">
          <p>IP Address: {ipInfo.ip}</p>
          {ipInfo.location && (
            <p>Location: {ipInfo.location.city}, {ipInfo.location.region}, {ipInfo.location.country}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Location;