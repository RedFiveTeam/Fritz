"use strict";var precacheConfig=[["/index.html","2097e520cd5e4745fabc89b9e848c97f"],["/static/css/main.88bd9f4c.css","2b9fc840a943f5fb2b47c453cb5b9f40"],["/static/js/main.934f0f4b.js","be274c0a00ebfe41fe2d4fd831746b12"],["/static/media/ActionTimesIcon.af993332.svg","af9933325ddeec631b7513fdadd5932f"],["/static/media/Adobe.442c7c0c.svg","442c7c0c2fd769c7959d4f06a09957cc"],["/static/media/ArrowIcon.28464624.svg","28464624e22f1b58b0b75deb524e8c47"],["/static/media/DatePickerArrow.f7adcda3.svg","f7adcda3f9f315b168e02be7f4d15b48"],["/static/media/DeleteIcon.a91efa52.svg","a91efa52da341b45bde8eb9c21642d37"],["/static/media/DropdownIcon.d2b719a2.svg","d2b719a29e2c45086087c7e8559ed628"],["/static/media/ExitHelpMenu.78942e11.svg","78942e119c0c825020be760f73dc2170"],["/static/media/ExpandIcon.4b6372f5.svg","4b6372f5c01261a8e0ea9a1194ff1d34"],["/static/media/ExpandedCloseIcon.79797ca0.svg","79797ca0b2a151ac304ccb1c2ccc6e8c"],["/static/media/FritzLogo.ed74b358.svg","ed74b3582607ca160817686e42f6d6b8"],["/static/media/GreenCheckmark.06163881.svg","061638810ef7826f2def8627bae49bc2"],["/static/media/HelpMenu.b6c78eaa.svg","b6c78eaa893327d88a51290aa7bf6703"],["/static/media/HelpStep1.7d0075b4.svg","7d0075b429a00ed085c465198165b85a"],["/static/media/HelpStep2.fa6b1161.svg","fa6b1161dd8a2ef1915aa779641fe602"],["/static/media/ImageIcon.3dd7b4e1.svg","3dd7b4e125e9a6fe9ca4fbb2ffb87be8"],["/static/media/LoadingLogo.4a8ae324.svg","4a8ae324c62f1bcbe9743549e132361f"],["/static/media/OfflineUnicorn.014d98b2.svg","014d98b2676c41013cea02b251b3ab0c"],["/static/media/PDFIcon.f6cbd823.svg","f6cbd823bc9b0b2cd6bf023529886fb2"],["/static/media/PaperclipIcon.7a827f87.svg","7a827f87ccdf283fa42cae752b565070"],["/static/media/RefreshIcon.c5a3763c.svg","c5a3763ca476aea15384b031f5cdb210"],["/static/media/ResetUploadIcon.b0eb21bc.svg","b0eb21bc5b767715375da86dcc23705d"],["/static/media/RightArrow.666b714c.svg","666b714c833827d7da5786233e386d9b"],["/static/media/SlidesContainerPlaceholder.7fc41007.svg","7fc41007208e0b89a99794fa13bc4de6"],["/static/media/Unicorn.e175faf4.svg","e175faf45027e8cd84bcb89d3ead5752"],["/static/media/UnicornIcon.c24e71b2.svg","c24e71b251041437a5f78593b9966bd5"],["/static/media/UploadFailedIcon.8d914e2d.svg","8d914e2d1777d633e094f63fa5b36324"],["/static/media/UploadingIcon.3fa63f0f.svg","3fa63f0fe357dbabcce290015d7d9dd2"],["/static/media/UserActionsIcon.69826966.svg","6982696682d6d15ace6f762e9df77ea2"],["/static/media/WaitingIcon.39016eb5.svg","39016eb51a8142f24a903ed6360a76c5"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),n=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),e=urlsToCacheKeys.has(t));var n="/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});