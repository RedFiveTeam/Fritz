"use strict";var precacheConfig=[["/index.html","f7e33502b75ace01690f57525a9209b7"],["/static/css/main.88bd9f4c.css","2b9fc840a943f5fb2b47c453cb5b9f40"],["/static/js/main.199b1684.js","0fe6ee758e4ab2b0704ee120565c2d50"],["/static/media/ActionTimesIcon.af993332.svg","af9933325ddeec631b7513fdadd5932f"],["/static/media/DeleteIcon.a91efa52.svg","a91efa52da341b45bde8eb9c21642d37"],["/static/media/DropdownIcon.d2b719a2.svg","d2b719a29e2c45086087c7e8559ed628"],["/static/media/ExpandedCloseIcon.79797ca0.svg","79797ca0b2a151ac304ccb1c2ccc6e8c"],["/static/media/FritzLogo.ed74b358.svg","ed74b3582607ca160817686e42f6d6b8"],["/static/media/PDFIcon.f6cbd823.svg","f6cbd823bc9b0b2cd6bf023529886fb2"],["/static/media/PaperclipIcon.7a827f87.svg","7a827f87ccdf283fa42cae752b565070"],["/static/media/ResetUploadIcon.b0eb21bc.svg","b0eb21bc5b767715375da86dcc23705d"],["/static/media/UploadIcon.e4b73563.svg","e4b7356302c15b87c86760c83c3f3fce"],["/static/media/UploadingIcon.3fa63f0f.svg","3fa63f0fe357dbabcce290015d7d9dd2"],["/static/media/expandIcon.4b6372f5.svg","4b6372f5c01261a8e0ea9a1194ff1d34"],["/static/media/slidesContainerPlaceholder.7fc41007.svg","7fc41007208e0b89a99794fa13bc4de6"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var c=new URL(e);return a&&c.pathname.match(a)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),c=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var c="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});