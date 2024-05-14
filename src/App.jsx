import Analytics from "./components/Analytics"
import Location from "./components/Location"
import UrlShortener from "./components/UrlShortener"

function App() {
  

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
