//
// Adapters for node.js
//

var WebCrypto = require("node-webcrypto-ossl");
var textencoding = require('text-encoding');
var webrtc = require('./inc/webrtc');
var Bluebird = require('bluebird');
var ws = require('ws');
var Worker = require('webworker-threads').Worker;

var Adapters = {
  // WebCrypto API
  // https://www.w3.org/TR/WebCryptoAPI/
  crypto: new WebCrypto(),

  // Encoding API
  // https://www.w3.org/TR/encoding/
  TextEncoder: textencoding.TextEncoder,
  TextDecoder: textencoding.TextDecoder,

  // WebRTC
  // https://www.w3.org/TR/webrtc/
  RTCPeerConnection: webrtc.RTCPeerConnection,
  SessionDescription: webrtc.RTCSessionDescription,
  IceCandidate: webrtc.RTCIceCandidate,

  // Promise
  Promise: Bluebird,

  // WebSocket
  WebSocket: ws,

  // Worker
  Worker: Worker
}

module.exports = Adapters;
