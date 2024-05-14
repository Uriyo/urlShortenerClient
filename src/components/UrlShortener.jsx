import { useState } from 'react';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState(null);
  const [isValidUrl, setIsValidUrl] = useState(true);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateUrl(originalUrl)) {
      setIsValidUrl(false);
      setError('Invalid URL. Please enter a valid URL.');
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/url/`, { url: originalUrl });
      const shortenedId = response.data.id;
      const shortUrl = `${backendUrl}/${shortenedId}`;
      setShortenedUrl(shortUrl);
      setError(null);
      setIsValidUrl(true);
    } catch (error) {
      console.error('Error:', error);
      setError('Error shortening URL. Please try again.');
      setShortenedUrl('');

      if (window.gtag) {
        window.gtag('event', 'url_shortened', {
          event_category: 'URL Shortener',
          event_label: shortUrl,
          value: originalUrl,
        });



    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          required
        />
        <button type="submit">Shorten</button>
      </form>
      {!isValidUrl && <p style={{ color: 'red' }}>Invalid URL. Please enter a valid URL.</p>}
      {error && <p>{error}</p>}
      {shortenedUrl && (
        <div id="result">
          <p>Shortened URL: <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">🚀 {shortenedUrl}</a></p>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
