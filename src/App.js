import React, { useState } from "react";
import InputText from "./components/input-text";
import MyRadioGroup from "./components/my-radio-group";
import * as crypt from "./crypto";

function App() {
  const [messageAlice, setMessageAlice] = useState("");
  const [receiveAlice, setReceiveAlice] = useState("");
  const [messageBob, setMessageBob] = useState("");
  const [receiveBob, setReceiveBob] = useState("");
  const [receiveEve, setReceiveEve] = useState("");
  const [cypher, setCypher] = useState("");
  const [sign, setSign] = useState("");
  const [hash, setHash] = useState("");

  const setOption = (type, value) => {
    switch (type) {
      case 'cypher':
        setCypher(value);
        setSign('');
        setHash('');
        break;
      case 'sign':
        setCypher('');
        setSign(value);
        setHash('');
        break;
      case 'hash':
        setCypher('');
        setSign('');
        setHash(value);
        break;
      default:
        break;
    }
  };

  const setReceive = (pox, message) => {
    let transformed = "";
    let reverse = "";
    if (cypher) {
      transformed = crypt.cypher(cypher, message);
      reverse = crypt.decypher(cypher, transformed);
    } else if (sign) {
      transformed = crypt.sign(message);
      const verifier = crypt.verify(message, transformed);
      transformed = transformed.toString('hex');
      reverse = `${message}|${transformed} -> ${verifier}`;
      transformed = `${message}|${transformed}`;
    } else if (hash) {
      transformed = crypt.hash(hash, message);
      reverse = transformed;
    }
    switch (pox) {
      case 'bob':
        setReceiveBob(reverse);
        break;
      case 'alice':
        setReceiveAlice(reverse);
        break;
      default:
        break;
    }
    setReceiveEve(transformed);
  }

  return (
    <div className="flex flex-col justify-center items-center my-4">
      <h1 className="text-4xl mb-5 text-green-900">Cryptographic libraries</h1>
      <div className="bg-gray-50 rounded-md shadow-lg w-5/6 p-5 space-y-4">
        <div className="grid grid-cols-3 gap-5">
          <div className="bg-blue-200 p-2 space-y-2">
            <h1 className="text-blue-800">Alice</h1>
            <InputText
              name="message-alice"
              id="message-alice"
              label="Enviar"
              value={messageAlice}
              onChange={obj => {
                setReceive('bob', obj.target.value);
                setMessageAlice(obj.target.value);
              }}
            />
            <div className="flex flex-col gap-1">
              <span>Recibido</span>
              <p className="font-mono break-all">{receiveAlice}</p>
            </div>
          </div>
          <div className="bg-white p-2 shadow-sm space-y-4">
            <h1 className="text-green-900">Options</h1>
            <div className="space-y-2">
              <h2 className="text-gray-600">Cypher</h2>
              <MyRadioGroup
                selected={cypher}
                setSelected={value => setOption('cypher', value)}
                options={['AES', '3DES']}
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-gray-600">Sign</h2>
              <MyRadioGroup
                selected={sign}
                setSelected={value => setOption('sign', value)}
                options={['RSA']}
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-gray-600">Hash</h2>
              <MyRadioGroup
                selected={hash}
                setSelected={value => setOption('hash', value)}
                options={['MD5', 'SHA-512', 'HMAC/SHA-512']}
              />
            </div>
          </div>
          <div className="bg-green-200 p-2 space-y-2">
            <h1 className="text-green-800">Bob</h1>
            <InputText
              name="message-bob"
              id="message-bob"
              label="Enviar"
              value={messageBob}
              onChange={obj => {
                setReceive('alice', obj.target.value);
                setMessageBob(obj.target.value);
              }}
            />
            <div className="flex flex-col gap-1">
              <span>Recibido</span>
              <p className="font-mono break-all">{receiveBob}</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-200 p-2">
          <h1 className="text-yellow-800">Eve</h1>
          <p className="font-mono break-all">{receiveEve}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
