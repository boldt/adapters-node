var webrtc = require('webrtc-native');
var Bluebird = require('bluebird');

// adapter.js doesnt detect webrtc-native, this codepiece is directly borrowed from adapter.js
['createOffer', 'createAnswer'].forEach(function(method) {
  var nativeMethod = webrtc.RTCPeerConnection.prototype[method];
  webrtc.RTCPeerConnection.prototype[method] = function() {
    var self = this;
    if (arguments.length < 1 || (arguments.length === 1 &&
        typeof(arguments[0]) === 'object')) {
      var opts = arguments.length === 1 ? arguments[0] : undefined;
      return new Bluebird(function(resolve, reject) {
        nativeMethod.apply(self, [resolve, reject, opts]);
      });
    }
    return nativeMethod.apply(this, arguments);
  };
});

['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function(method) {
  var nativeMethod = webrtc.RTCPeerConnection.prototype[method];
  webrtc.RTCPeerConnection.prototype[method] = function() {
    var args = arguments;
    var self = this;
    args[0] = new ((method === 'addIceCandidate')?
        webrtc.RTCIceCandidate : webrtc.RTCSessionDescription)(args[0]);
    return new Bluebird(function(resolve, reject) {
      nativeMethod.apply(self, [args[0],
          function() {
            resolve();
            if (args.length >= 2) {
              args[1].apply(null, []);
            }
          },
          function(err) {
            reject(err);
            if (args.length >= 3) {
              args[2].apply(null, [err]);
            }
          }]
        );
    });
  };
});

module.exports = webrtc;
