import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Spinner from './Spinner';

import Daemon from 'arduino-create-agent-js-client';

const daemon = new Daemon('https://builder.arduino.cc/v3/boards');

function App() {
  const [agentFound, setAgentFound] = useState(false);
  const [channelStatus, setChannelStatus] = useState(false);
  const [serialDevices, setSerialDevices] = useState([]);
  const [networkDevices, setNetworkDevices] = useState([])
  const [pressedCount, setPressedCount] = useState(0);
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
      serial.forEach(device => {
        console.log('serial device', device.Name);
        if (!device.isOpen) {
          daemon.openSerialMonitor(device.Name, 9600);
        }
      });
      setNetworkDevices(network);
    });

    return () => {
      subscriptionDevices.unsubscribe();
      subscriptionChannel.unsubscribe();
      subscriptionAgent.unsubscribe();
      serialDevices.forEach(device => {
        if (device.isOpen) {
          daemon.closeSerialMonitor(device.Name);
        }
      });
    };
  }, [agentFound, channelStatus, serialDevices, networkDevices]);

  useEffect(() => {
    const subscriptionSerialMonitor = daemon.serialMonitorMessages.subscribe(message => {
      if (!buttonPressed) {
        setPressedCount(n => n + 1);
        setButtonPressed(true);
      }
    });

    return () => {
      subscriptionSerialMonitor.unsubscribe();
    }
  }, []);


  const openSerialMonitor = () => {
    daemon.openSerialMonitor('/dev/ttyACM0', 9600);
  }


  return (
    <div className="App">
      <Spinner pressedCount={pressedCount} />
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
