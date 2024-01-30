// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"2hIAm":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "2b3ad46e4a6ab8e1";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"3JAR4":[function(require,module,exports) {
module.exports = JSON.parse('[{"file":"001.webp","title":"Wallpaper 1","color":[[20,20,20],[162,162,162],[132,140,138]],"theme":"light"},{"file":"002.webp","title":"Wallpaper 2","color":[[60,53,44],[163,143,115],[146,159,140]],"theme":"light"},{"file":"003.webp","title":"Wallpaper 3","color":[[67,102,73],[197,181,142],[146,185,182]],"theme":"light"},{"file":"004.webp","title":"Wallpaper 4","color":[[23,27,27],[184,197,189],[74,164,164]],"theme":"light"},{"file":"005.webp","title":"Wallpaper 5","color":[[94,86,57],[220,173,135],[175,182,158]],"theme":"light"},{"file":"006.webp","title":"Wallpaper 6","color":[[66,75,128],[203,98,139],[39,208,184]],"theme":"light"},{"file":"007.webp","title":"Wallpaper 7","color":[[9,4,12],[171,4,59],[35,4,175]],"theme":"light"},{"file":"008.webp","title":"Wallpaper 8","color":[[210,198,196],[82,97,75],[163,76,60]],"theme":"light"},{"file":"009.webp","title":"Wallpaper 9","color":[[72,63,60],[213,202,205],[154,156,159]],"theme":"light"},{"file":"010.webp","title":"Wallpaper 10","color":[[11,11,15],[164,177,202],[111,142,171]],"theme":"light"},{"file":"011.webp","title":"Wallpaper 11","color":[[23,64,105],[177,187,207],[120,165,207]],"theme":"light"},{"file":"012.webp","title":"Wallpaper 12","color":[[63,152,203],[50,35,16],[224,210,182]],"theme":"light"},{"file":"013.webp","title":"Wallpaper 13","color":[[182,193,183],[54,53,49],[85,81,79]],"theme":"light"},{"file":"014.webp","title":"Wallpaper 14","color":[[30,30,47],[161,161,167],[140,132,140]],"theme":"light"},{"file":"015.webp","title":"Wallpaper 15","color":[[149,88,70],[242,187,148],[214,172,164]],"theme":"light"},{"file":"016.webp","title":"Wallpaper 16","color":[[114,80,170],[232,103,205],[116,209,231]],"theme":"light"},{"file":"017.webp","title":"Wallpaper 17","color":[[175,109,146],[184,199,216],[58,43,56]],"theme":"light"},{"file":"018.webp","title":"Wallpaper 18","color":[[47,47,56],[196,128,104],[140,161,174]],"theme":"light"},{"file":"019.webp","title":"Wallpaper 19","color":[[44,17,73],[68,118,203],[163,52,64]],"theme":"light"},{"file":"020.webp","title":"Wallpaper 20","color":[[5,16,19],[7,170,176],[11,106,139]],"theme":"light"},{"file":"021.webp","title":"Wallpaper 21","color":[[43,32,60],[176,65,124],[35,181,197]],"theme":"light"},{"file":"022.webp","title":"Wallpaper 22","color":[[192,69,15],[56,13,5],[247,227,209]],"theme":"light"},{"file":"023.webp","title":"Wallpaper 23","color":[[56,79,112],[201,89,105],[144,174,192]],"theme":"light"},{"file":"024.webp","title":"Wallpaper 24","color":[[32,73,123],[230,196,122],[110,171,228]],"theme":"light"},{"file":"025.webp","title":"Wallpaper 25","color":[[205,172,153],[180,58,25],[213,86,44]],"theme":"light"},{"file":"026.webp","title":"Wallpaper 26","color":[[218,187,163],[146,77,43],[175,102,61]],"theme":"light"},{"file":"027.webp","title":"Wallpaper 27","color":[[7,6,9],[216,68,72],[21,174,226]],"theme":"light"},{"file":"028.webp","title":"Wallpaper 28","color":[[217,80,172],[70,16,52],[247,213,236]],"theme":"light"},{"file":"029.webp","title":"Wallpaper 29","color":[[8,55,81],[48,153,183],[28,116,140]],"theme":"light"},{"file":"030.webp","title":"Wallpaper 30","color":[[190,207,224],[30,173,233],[110,199,238]],"theme":"light"},{"file":"031.webp","title":"Wallpaper 31","color":[[229,223,220],[4,72,121],[127,118,143]],"theme":"light"},{"file":"032.webp","title":"Wallpaper 32","color":[[206,200,199],[64,75,74],[108,91,63]],"theme":"light"},{"file":"033.webp","title":"Wallpaper 33","color":[[20,32,89],[182,80,62],[24,76,166]],"theme":"light"},{"file":"034.webp","title":"Wallpaper 34","color":[[206,160,116],[74,148,158],[136,65,17]],"theme":"light"},{"file":"035.webp","title":"Wallpaper 35","color":[[67,79,188],[205,95,56],[189,133,175]],"theme":"light"},{"file":"036.webp","title":"Wallpaper 36","color":[[24,35,67],[40,134,191],[50,116,155]],"theme":"light"},{"file":"037.webp","title":"Wallpaper 37","color":[[9,16,23],[129,181,217],[47,107,154]],"theme":"light"},{"file":"038.webp","title":"Wallpaper 38","color":[[238,175,174],[220,121,118],[223,132,124]],"theme":"light"},{"file":"039.webp","title":"Wallpaper 39","color":[[78,87,194],[188,119,123],[134,58,83]],"theme":"light"},{"file":"040.webp","title":"Wallpaper 40","color":[[160,160,169],[59,59,67],[75,75,85]],"theme":"light"},{"file":"041.webp","title":"Wallpaper 41","color":[[160,178,251],[4,37,244],[45,110,251]],"theme":"light"},{"file":"042.webp","title":"Wallpaper 42","color":[[172,88,39],[50,30,24],[241,197,141]],"theme":"light"},{"file":"043.webp","title":"Wallpaper 43","color":[[12,9,19],[196,114,116],[23,165,167]],"theme":"light"},{"file":"044.webp","title":"Wallpaper 44","color":[[31,32,29],[182,172,159],[117,136,135]],"theme":"light"},{"file":"045.webp","title":"Wallpaper 45","color":[[91,112,130],[214,113,129],[104,52,34]],"theme":"light"},{"file":"046.webp","title":"Wallpaper 46","color":[[7,52,69],[7,156,187],[148,156,156]],"theme":"light"},{"file":"047.webp","title":"Wallpaper 47","color":[[174,154,179],[51,47,106],[73,62,125]],"theme":"light"},{"file":"048.webp","title":"Wallpaper 48","color":[[7,10,12],[216,208,185],[71,161,175]],"theme":"light"},{"file":"049.webp","title":"Wallpaper 49","color":[[131,161,188],[213,224,232],[22,41,87]],"theme":"light"},{"file":"050.webp","title":"Wallpaper 50","color":[[168,166,174],[17,29,38],[102,70,74]],"theme":"light"},{"file":"051.webp","title":"Wallpaper 51","color":[[61,22,54],[211,53,79],[150,125,158]],"theme":"light"},{"file":"052.webp","title":"Wallpaper 52","color":[[166,179,193],[36,131,207],[84,106,131]],"theme":"light"},{"file":"053.webp","title":"Wallpaper 53","color":[[206,164,67],[196,187,191],[72,63,58]],"theme":"light"},{"file":"054.webp","title":"Wallpaper 54","color":[[197,195,218],[197,72,112],[45,46,56]],"theme":"light"},{"file":"055.webp","title":"Wallpaper 55","color":[[88,131,185],[182,183,189],[167,197,228]],"theme":"light"},{"file":"056.webp","title":"Wallpaper 56","color":[[138,166,136],[51,75,48],[77,103,67]],"theme":"light"},{"file":"057.webp","title":"Wallpaper 57","color":[[8,7,10],[204,132,111],[72,31,167]],"theme":"light"},{"file":"058.webp","title":"Wallpaper 58","color":[[9,6,10],[10,99,144],[187,104,90]],"theme":"light"},{"file":"059.webp","title":"Wallpaper 59","color":[[116,107,212],[200,199,207],[191,184,217]],"theme":"light"},{"file":"060.webp","title":"Wallpaper 60","color":[[52,135,196],[177,184,198],[139,196,223]],"theme":"light"},{"file":"061.webp","title":"Wallpaper 61","color":[[16,24,25],[179,175,122],[111,143,94]],"theme":"light"},{"file":"062.webp","title":"Wallpaper 62","color":[[4,7,16],[17,93,159],[28,92,108]],"theme":"light"},{"file":"063.webp","title":"Wallpaper 63","color":[[201,233,249],[55,124,163],[191,91,80]],"theme":"light"},{"file":"064.webp","title":"Wallpaper 64","color":[[230,181,192],[12,14,25],[118,84,104]],"theme":"light"},{"file":"065.webp","title":"Wallpaper 65","color":[[221,216,205],[53,44,58],[169,80,48]],"theme":"light"},{"file":"066.webp","title":"Wallpaper 66","color":[[202,196,228],[57,39,75],[132,63,92]],"theme":"light"},{"file":"067.webp","title":"Wallpaper 67","color":[[89,101,197],[181,183,198],[155,172,223]],"theme":"light"},{"file":"068.webp","title":"Wallpaper 68","color":[[224,226,217],[58,97,62],[136,159,100]],"theme":"light"},{"file":"069.webp","title":"Wallpaper 69","color":[[206,214,245],[57,60,100],[163,77,140]],"theme":"light"},{"file":"070.webp","title":"Wallpaper 70","color":[[239,219,224],[188,215,224],[249,178,189]],"theme":"light"},{"file":"071.webp","title":"Wallpaper 71","color":[[36,34,37],[126,149,157],[171,168,172]],"theme":"light"},{"file":"072.webp","title":"Wallpaper 72","color":[[39,45,43],[97,184,152],[200,185,134]],"theme":"light"},{"file":"073.webp","title":"Wallpaper 73","color":[[171,193,251],[72,63,183],[104,121,235]],"theme":"light"},{"file":"074.webp","title":"Wallpaper 74","color":[[7,5,5],[194,53,18],[105,144,187]],"theme":"light"},{"file":"075.webp","title":"Wallpaper 75","color":[[202,147,188],[146,6,52],[116,11,109]],"theme":"light"},{"file":"076.webp","title":"Wallpaper 76","color":[[234,178,185],[157,77,113],[109,130,170]],"theme":"light"},{"file":"077.webp","title":"Wallpaper 77","color":[[26,26,23],[200,133,93],[114,187,167]],"theme":"light"},{"file":"078.webp","title":"Wallpaper 78","color":[[55,25,80],[235,118,161],[31,104,231]],"theme":"light"},{"file":"079.webp","title":"Wallpaper 79","color":[[5,5,5],[193,125,116],[121,135,159]],"theme":"light"},{"file":"080.webp","title":"Wallpaper 80","color":[[233,233,233],[63,82,44],[117,107,102]],"theme":"light"},{"file":"081.webp","title":"Wallpaper 81","color":[[169,174,235],[81,150,182],[108,88,164]],"theme":"light"},{"file":"082.webp","title":"Wallpaper 82","color":[[4,5,8],[43,79,138],[36,68,100]],"theme":"light"},{"file":"083.webp","title":"Wallpaper 83","color":[[24,5,91],[4,4,24],[75,24,181]],"theme":"light"},{"file":"084.webp","title":"Wallpaper 84","color":[[144,148,216],[36,26,42],[84,61,89]],"theme":"light"},{"file":"085.webp","title":"Wallpaper 85","color":[[9,9,8],[154,148,131],[124,124,107]],"theme":"light"},{"file":"086.webp","title":"Wallpaper 86","color":[[251,210,226],[248,28,134],[251,201,26]],"theme":"light"},{"file":"087.webp","title":"Wallpaper 87","color":[[14,14,14],[206,92,31],[19,209,46]],"theme":"light"}]');

},{}]},["2hIAm","3JAR4"], "3JAR4", "parcelRequire7e1c")

//# sourceMappingURL=wallpapers_list.4a6ab8e1.js.map
