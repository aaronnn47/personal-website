"use strict";var precacheConfig=[["/index.html","caaddbecb4390751e978c4a5e97158d4"],["/static/css/main.c99d0769.css","59de1094a47e8f16307ef9e61e9d482f"],["/static/js/main.f96cf6c2.js","3c11ba07b3fdc9b22b873919d79e4c81"],["/static/media/add.5338dd10.svg","5338dd1095edb8f27ef0e6210c4f7f70"],["/static/media/arroba.621fb1cc.svg","621fb1cc1bf6d37f2d2af1ad17fdec3e"],["/static/media/avatar.625b6e01.svg","625b6e018904b734004cd2e5187f2a41"],["/static/media/banknote.ff5af806.svg","ff5af8062fb28b31ccd1b0303823333e"],["/static/media/calendar.4cb7c3f6.svg","4cb7c3f6fbddf11bd2d5c0f5bc258828"],["/static/media/cart.2f79694d.svg","2f79694de210f873ca01300355f8631f"],["/static/media/cityscape.5f7d34c8.svg","5f7d34c8ef9680bcc42068163058b3f5"],["/static/media/edit.33ae1541.svg","33ae15415ea9f00b0e605241ed6ec7ad"],["/static/media/error.b2138751.svg","b2138751ec3c40bb5c24fcea41aaff9d"],["/static/media/home.d1d22c9a.svg","d1d22c9a0b75e167f47bc53b44094ea5"],["/static/media/remove.7cdc8c47.svg","7cdc8c473ded54fea138f2794f87fa52"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});