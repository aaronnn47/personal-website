"use strict";var precacheConfig=[["/index.html","c10fb426ccc9b0ab52b00fb7adc18c1f"],["/static/css/main.c99d0769.css","59de1094a47e8f16307ef9e61e9d482f"],["/static/js/main.e9f5dfbd.js","b72aeb4510a97ac25252d1ab7f485078"],["/static/media/add.5338dd10.svg","5338dd1095edb8f27ef0e6210c4f7f70"],["/static/media/arroba.621fb1cc.svg","621fb1cc1bf6d37f2d2af1ad17fdec3e"],["/static/media/avatar.625b6e01.svg","625b6e018904b734004cd2e5187f2a41"],["/static/media/banknote.ff5af806.svg","ff5af8062fb28b31ccd1b0303823333e"],["/static/media/calendar.4cb7c3f6.svg","4cb7c3f6fbddf11bd2d5c0f5bc258828"],["/static/media/cart.2f79694d.svg","2f79694de210f873ca01300355f8631f"],["/static/media/cityscape.5f7d34c8.svg","5f7d34c8ef9680bcc42068163058b3f5"],["/static/media/edit.33ae1541.svg","33ae15415ea9f00b0e605241ed6ec7ad"],["/static/media/error.b2138751.svg","b2138751ec3c40bb5c24fcea41aaff9d"],["/static/media/home.d1d22c9a.svg","d1d22c9a0b75e167f47bc53b44094ea5"],["/static/media/remove.7cdc8c47.svg","7cdc8c473ded54fea138f2794f87fa52"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});