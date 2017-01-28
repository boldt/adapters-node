//
// Adapters for node.de
//

// Crypto
var WebCrypto = require("node-webcrypto-ossl");

// TextEncoding
var textencoding = require('text-encoding');

var Adapters = {
  crypto: new WebCrypto(),
  TextEncoder: textencoding.TextEncoder,
  TextDecoder: textencoding.TextDecoder
}

module.exports = Adapters;
