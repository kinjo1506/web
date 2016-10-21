(function(window) {
  'use strict';

  // エントリポイント: アプリ起動 ( iframe )
  window.invokeAppByIframe = function(args) {
    var invoker = function(appUrl) {
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = appUrl;
      document.body.appendChild(iframe);
    }
    invokeApp(invoker, args.appUrl, args.fallbackUrl, 300);
  };

  // エントリポイント: アプリ起動 ( location )
  window.invokeAppByLocation = function(args) {
    var invoker = function(appUrl) {
      window.location.replace(appUrl);
    }
    invokeApp(invoker, args.appUrl, args.fallbackUrl, 300);
  }

  function invokeApp(invoker, appUrl, fallbackUrl, timeout) {
    window.addEventListener('DOMContentLoaded', function() {
      invoker(appUrl);
    });

    var start = Date.now();
    var appInvocationTimeout = setTimeout(function() {
      var elapsed = Date.now() - start;
      if (elapsed < (timeout + 200)) {
        var m = 'App invocation may be failed';
        appendMessage(m);
        location.replace(fallbackUrl);
      } else {
        var s = 'App invocation may be successful';
        appendMessage(s);
      }
    }, timeout);
  }

  function appendMessage(msg) {
    var p = document.createElement('p');
    p.textContent = msg;
    document.body.appendChild(p);
  }

})(this);
