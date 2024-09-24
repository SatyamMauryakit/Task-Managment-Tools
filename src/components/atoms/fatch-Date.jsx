import React, { useState, useEffect } from "react";
import "./fatch-Date.css";

function FetchApi() {
  const [currentTime, setCurrentTime] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch(
          "https://www.timeapi.io/api/time/current/zone?timeZone=Asia/Kolkata"
        );
        const data = await response.json();
        setCurrentTime(`${data.date} ${data.time}`);
      } catch (err) {
        setError("Failed to fetch time.");
      }
    };

    fetchTime();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {error && <p>{error}</p>}
        {currentTime ? <p>Date and Time: {currentTime}</p> : <p>Loading...</p>}
      </header>
    </div>
  );
}

export default FetchApi;
