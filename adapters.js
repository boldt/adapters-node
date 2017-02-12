//
// Adapters for node.de
//

var WebCrypto = require("node-webcrypto-ossl");
var textencoding = require('text-encoding');
var webrtc = require('./inc/webrtc');

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
  IceCandidate: webrtc.RTCIceCandidate
}

module.exports = Adapters;
