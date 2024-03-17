import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Spinner from './Spinner';

import Daemon from 'arduino-create-agent-js-client';

const daemon = new Daemon('https://builder.arduino.cc/v3/boards');

function App() {
  const [agentFound, setAgentFound] = useState(false);
  const [channelStatus, setChannelStatus] = useState(false);
  const [serialDevices, setSerialDevices] = useState([]);
  const [networkDevices, setNetworkDevices] = useState([]);
  const [serialMessage, setSerialMessage] = useState('');
  const [buttonPressed, setButtonPressed] = useState(false);


  useEffect(() => {
    const subscriptionAgent = daemon.agentFound.subscribe((status) => {
      setAgentFound(status);
    });

    const subscriptionChannel = daemon.channelOpen.subscribe(status => {
      setChannelStatus(status);
    });

    const subscriptionDevices = daemon.devicesList.subscribe(({ serial, network }) => {
      setSerialDevices(serial);
      const closedSerial = serial.filter(device => !device.isOpen);
      closedSerial.forEach(device => {
        console.log('opening serial monitor', device.Name);
        daemon.openSerialMonitor(device.Name, 9600);
      });
      setNetworkDevices(network);
    });

    const subscriptionSerialMonitor = daemon.serialMonitorMessages.subscribe(message => {
      setSerialMessage(message);
      if (message == '1') {
        console.log('button pressed');
        setButtonPressed(true);
        setTimeout(() => {
          console.log('timeout');
          setButtonPressed(false);
        }, 500);
      }
    });

    return () => {
      subscriptionSerialMonitor.unsubscribe();
      subscriptionDevices.unsubscribe();
      subscriptionChannel.unsubscribe();
      subscriptionAgent.unsubscribe();
    };
  }, []);


  return (
    <div className="App">
      <p>{`${serialMessage}`}</p>
      <Spinner buttonPressed={buttonPressed} />
      <table>
        <tr>
          <th>button Pressed</th>
          <th>{`${buttonPressed}`}</th>
        </tr>
        <tr>
          <th>agent</th>
          <th>{`${agentFound}`}</th>
        </tr>
        <tr>
          <th>Channel</th>
          <th>{`${channelStatus}`}</th>
        </tr>
        <tr>
          <th>Network Devices</th>
          <th>{`${networkDevices.join('; ')}`}</th>
        </tr>
        <tr>
          <th>Serial Devices</th>
        </tr>
        {serialDevices.map(device => 
          Object.entries(device).map(([key, value]) => (
            <tr>
              <td>{`${key}: ${value}`}</td>
            </tr>
          ))
        )}
      </table>

    </div>
  );
}

export default App;
