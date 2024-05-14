import { useEffect } from "react";
import Analytics from "./components/Analytics"
import Location from "./components/Location"
import UrlShortener from "./components/UrlShortener"

function App() {
  useEffect(() => {
    // Initialize Google Analytics tracking
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-3Y1EMG1P9L'); // Replace with your Google Analytics tracking ID
  }, []);

  return (
    <>
      <div style={{ margin:"15px", }}>
        <UrlShortener />
        <Analytics />
        <Location />
      </div>
    </>
  );
}

export default App
