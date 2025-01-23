import React, { useEffect, useState } from 'react';
import "./App.css";
import { useWebSocket } from './hooks/useWebSocket'

const App: React.FC = () => {

  const { socket, message, isConnected } = useWebSocket('ws://localhost:8080')
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
  });

  useEffect(() => {
    if (message) {
      const data = JSON.parse(message);
      setMetrics(data)
    }
  }, [message])

  return (
    <div className="App">
      <h1>System Monitoring Dashboard</h1>
        <div className="metrics">
          <div><strong>CPU Usage: </strong>{metrics.cpu}%</div>
          <div><strong>Memory Usage: </strong>{metrics.memory}%</div>
          <div><strong>Disk Usage: </strong>{metrics.disk}%</div>
          <div><strong>Network Sent:</strong>{metrics.network} bytes</div>
        </div>
    </div>
  );
}

export default App;