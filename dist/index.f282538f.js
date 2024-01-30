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
})({"lkfBx":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "d9d1cc61f282538f";
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

},{}],"6OR0a":[function(require,module,exports) {
var _searchJs = require("./js_modules/search.js");
var _utilsJs = require("./js_modules/utils.js");
var _loadingSpinnerJs = require("./js_modules/loading_spinner.js");
var _colorsJs = require("./js_modules/colors.js");
var _customBookmarksJs = require("./js_modules/custom_bookmarks.js");
var _wallpapersJs = require("./js_modules/wallpapers.js");
var _loadPreferencesJs = require("./js_modules/load_preferences.js");
var _preferencesJs = require("./js_modules/preferences.js");
var _validatorsJs = require("./js_modules/validators.js");
var _onboardingJs = require("./js_modules/onboarding.js");
var _savePreferencesJs = require("./js_modules/save_preferences.js");
// eslint-disable-next-line max-len
var _getLastUpdatedJs = require("./js_modules/utils/getLastUpdated.js");
var _blurLevelJs = require("./js_modules/utils/blurLevel.js");
var _letItSnowJs = require("./js_modules/utils/letItSnow.js");
var _inputDialogJs = require("./js_modules/utils/inputDialog.js");
var _isTouchDeviceJs = require("./js_modules/utils/isTouchDevice.js");
var _enableSubmitButtonJs = require("./js_modules/utils/enableSubmitButton.js");
var _alertDialogJs = require("./js_modules/utils/alertDialog.js");
const bottomFilmRollContainer = document.getElementById("wallpapers");
const wrap = document.getElementById("wrap");
const advancedSettingsButton = document.getElementById("toggle-labs-btn");
const modal = document.getElementById("advanced-settings-modal");
const modalBackground = document.getElementById("advanced-settings-modal-background-overlay");
let areAdvancedSettingsOpen = false;
let areWallpapersOpen = false;
let timeout;
const wallpapersPanel = (str)=>{
    (0, _loadingSpinnerJs.hideLoading)();
    switch(str){
        case "close":
            document.title = document.title.replace("Backgrounds", "Search");
            history.pushState({
                loc: "home"
            }, "", "?home");
            bottomFilmRollContainer.classList.remove("animation_slide_up");
            setTimeout(()=>advancedSettingsButton.classList.remove("animation_slide_right"), 350);
            bottomFilmRollContainer.classList.add("animation_slide_down");
            wrap.classList.remove("animation2_slide_up");
            wrap.classList.add("animation2_slide_down");
            clearTimeout(timeout);
            (0, _customBookmarksJs.toggleRemoveButtons)("hide");
            (0, _utilsJs.toggleArrows)("hide");
            (0, _colorsJs.changeGlow)(null, 0);
            setTimeout(()=>(0, _blurLevelJs.blurLevel)(1), 400);
            areWallpapersOpen = false;
            break;
        case "open":
            bottomFilmRollContainer.style.display = "flex";
            (0, _blurLevelJs.blurLevel)(0);
            bottomFilmRollContainer.classList.remove("animation_slide_down");
            bottomFilmRollContainer.classList.add("animation_slide_up");
            wrap.classList.remove("animation2_slide_down", "startup_slide_down");
            wrap.classList.add("animation2_slide_up");
            setTimeout(()=>{
                advancedSettingsButton.classList.add("animation_slide_right");
                (0, _utilsJs.scrollHighlightedWallpaperIntoView)();
            }, 350);
            (0, _colorsJs.changeGlow)(null, 1);
            timeout = setTimeout(()=>(0, _customBookmarksJs.toggleRemoveButtons)("show"), 450);
            (0, _utilsJs.toggleArrows)("show");
            document.title = document.title.replace("Search", "Backgrounds");
            history.pushState({
                loc: "backgrounds"
            }, "", "?backgrounds");
            areWallpapersOpen = true;
            break;
    }
};
window.createNewBookmark = ()=>{
    const inputDialogTitle = "Add new bookmark";
    const inputDialogDescription = `
	You may only use upto four letters as the bookmark name.`;
    const bookmarkLabel = "Bookmark name";
    const bookmarkAddress = "Link to website";
    (0, _inputDialogJs.InputDialog).show(inputDialogTitle, inputDialogDescription, [
        bookmarkLabel,
        bookmarkAddress
    ], "Save", undefined, null, [
        ()=>(0, _enableSubmitButtonJs.enableSubmitButton)(null, true),
        null
    ], ()=>{
        const label = (0, _inputDialogJs.InputDialog).getInputFields()[0];
        label.setAttribute("maxlength", 4);
        label.setAttribute("placeholder", "e.g. YT");
        const address = (0, _inputDialogJs.InputDialog).getInputFields()[1];
        address.setAttribute("placeholder", "e.g. youtube.com");
        address.value = "https://";
        navigator.clipboard.readText().then((res)=>{
            if ((0, _validatorsJs.isUrlValid)(res)) address.value = res.replaceAll(" ", "");
        }).catch((err)=>{
            console.log(err);
        });
    }).then((res)=>{
        const id = Date.now();
        const name = res.inputValues[0];
        let link = res.inputValues[1].replaceAll(" ", "");
        if (!link.startsWith("http")) link = `https://${link}`;
        // console.log(res.inputValues);
        (0, _customBookmarksJs.addBookmarkToHTML)(link, name, id);
        (0, _customBookmarksJs.saveBookmarks)(link, name, id);
    }).catch((e)=>console.log(e));
};
window.changeWallpaper = (event)=>{
    event.stopPropagation();
    let selection = event.target.title;
    if (!selection) selection = event.target.childNodes[1].title;
    const wall = (0, _wallpapersJs.getWallpaperDetails)(selection);
    (0, _wallpapersJs.setWallpaper)(wall[0], wall[1]);
    (0, _wallpapersJs.highlightSetWallpaper)();
};
(0, _utilsJs.addEventListenerOnID)("export-bookmarks-btn", "click", (0, _preferencesJs.exportBookmarks));
(0, _utilsJs.addEventListenerOnID)("import-bookmarks-btn", "change", (0, _preferencesJs.importBookmarks));
(0, _utilsJs.addEventListenerOnID)("export-backup-btn", "click", (0, _preferencesJs.exportBackup));
(0, _utilsJs.addEventListenerOnID)("import-backup-btn", "change", (0, _preferencesJs.importBackup));
(0, _utilsJs.addEventListenerOnID)("download-wallpaper-btn", "click", (0, _preferencesJs.downloadWallpaper));
(0, _utilsJs.addEventListenerOnID)("toggle-favicons-btn", "click", (0, _preferencesJs.toggleFavicons));
(0, _utilsJs.addEventListenerOnID)("update-username-btn", "click", (0, _onboardingJs.askUserName));
(0, _utilsJs.addEventListenerOnID)("update-customtext-btn", "click", (0, _loadPreferencesJs.askCustomText));
(0, _utilsJs.addEventListenerOnID)("deep-search-btn", "click", (event)=>{
    (0, _preferencesJs.showNestedOptions)("deep-search-nested");
    const arrow = document.getElementById("deep-search-btn-arrow");
    arrow.classList.toggle("fa-angle-down");
    arrow.classList.toggle("fa-angle-up");
});
(0, _utilsJs.addEventListenerOnID)("update-customdomain-btn", "click", (0, _loadPreferencesJs.askCustomDomain));
(0, _utilsJs.addEventListenerOnID)("fetch-bookmarks-btn", "click", (0, _utilsJs.fetchBookmarks));
(0, _utilsJs.addEventListenerOnID)("reset-bookmarks-btn", "click", (0, _preferencesJs.resetBookmarks));
(0, _utilsJs.addEventListenerOnID)("reset-all-btn", "click", (0, _preferencesJs.resetAll));
function openAdvancedSettings() {
    wallpapersPanel("close");
    history.pushState({
        loc: "settings"
    }, "", "?settings");
    setTimeout(()=>(0, _blurLevelJs.blurLevel)(0), 420);
    document.title = document.title.replace("Search", "Settings");
    document.body.classList.add("justifySpaceBetween");
    // wrap.style.opacity = 0;
    wrap.style.display = "none";
    modal.style.display = "block";
    modalBackground.style.display = "block";
    areAdvancedSettingsOpen = true;
}
function closeAdvancedSettings() {
    document.title = document.title.replace("Settings", "Search");
    history.pushState({
        loc: "home"
    }, "", "?home");
    document.body.classList.remove("justifySpaceBetween");
    wrap.style.display = "block";
    // wrap.style.opacity = 1;
    modal.style.display = "none";
    modalBackground.style.display = "none";
    setTimeout(()=>(0, _blurLevelJs.blurLevel)(1), 100);
    areAdvancedSettingsOpen = false;
}
(0, _utilsJs.addEventListenerOnClass)("modal-close-btn", "click", closeAdvancedSettings);
(0, _utilsJs.addEventListenerOnID)("toggle-labs-btn", "click", openAdvancedSettings);
(0, _utilsJs.addEventListenerOnID)("search-btn", "click", _searchJs.webSearch);
(0, _utilsJs.addEventListenerOnID)("movies-search", "click", _searchJs.movies);
(0, _utilsJs.addEventListenerOnID)("tv-search", "click", _searchJs.tv);
(0, _utilsJs.addEventListenerOnID)("games-search", "click", _searchJs.games);
(0, _utilsJs.addEventListenerOnID)("ebooks-search", "click", _searchJs.ebooks);
(0, _utilsJs.addEventListenerOnID)("searchTerm", "input", _searchJs.processSearchboxInput);
(0, _utilsJs.addEventListenerOnID)("searchTerm", "click", ()=>{
    const x = new InputEvent("input");
    (0, _utilsJs.getSearchTerm)().dispatchEvent(x);
});
(0, _utilsJs.addEventListenerOnID)("searchBarFocusMode", "click", _searchJs.collapseAutofill);
(0, _utilsJs.addEventListenerOnID)("searchTerm", "keypress", _searchJs.enterToSearch);
(0, _utilsJs.addEventListenerOnID)("fetch-bookmarks-btn", "click", (0, _utilsJs.fetchBookmarks));
(0, _utilsJs.addEventListenerOnID)("left-arrow", "click", (event)=>{
    event.stopPropagation();
    (0, _utilsJs.changeSlide)("widget-slide", -1);
});
(0, _utilsJs.addEventListenerOnID)("right-arrow", "click", (event)=>{
    event.stopPropagation();
    (0, _utilsJs.changeSlide)("widget-slide", 1);
});
window.addEventListener("resize", ()=>{
    (0, _loadPreferencesJs.applyPreferences)();
    (0, _letItSnowJs.isItChristmas)();
});
window.addEventListener("blur", ()=>{
    (0, _loadingSpinnerJs.hideLoading)();
});
window.addEventListener("appinstalled", (event)=>{
    console.log("installed");
});
onload = (event)=>{
    const slider = document.getElementById("main-heading-slider");
    slider.classList.remove("nowrap");
};
(0, _utilsJs.addEventListenerOnID)("settings_button", "click", (event)=>{
    if (areWallpapersOpen) wallpapersPanel("close", event);
    else if (!areWallpapersOpen) wallpapersPanel("open", event);
});
const pressAndHold = ()=>{
    const target = document.body;
    let timerId;
    let timer = 250;
    const clearTimer = ()=>{
        clearInterval(timerId);
        timerId = null;
    };
    const clickEvent = (event)=>{
        const x = event.target.id;
        const validElements = [
            "gradient_overlay",
            "wrap",
            "bookmarks",
            "autofillContainer",
            "flex-main-container-vertical",
            "subtitle",
            "footer"
        ];
        if (validElements.includes(x)) {
            if (areWallpapersOpen) timer = 1;
            else timer = 250;
            timerId = setInterval(()=>{
                if (areWallpapersOpen) wallpapersPanel("close");
                else if (!areWallpapersOpen) wallpapersPanel("open");
                clearTimer();
            }, timer);
        }
    };
    target.addEventListener("mousedown", clickEvent);
    target.addEventListener("mouseup", clearTimer);
    target.addEventListener("mouseout", clearTimer);
    target.addEventListener("touchstart", clickEvent);
    target.addEventListener("touchend", clearTimer);
    target.addEventListener("touchcancel", clearTimer);
    return ()=>{
        target.removeEventListener("mousedown", clickEvent);
        target.removeEventListener("mouseup", clearTimer);
        target.removeEventListener("mouseout", clearTimer);
        target.removeEventListener("touchstart", clickEvent);
        target.removeEventListener("touchend", clearTimer);
        target.removeEventListener("touchcancel", clearTimer);
        console.log("un-focuss", timerId);
    };
};
const switchPage = ()=>{
    window.addEventListener("popstate", (e)=>{
        if (areWallpapersOpen) wallpapersPanel("close");
        else if (areAdvancedSettingsOpen) closeAdvancedSettings();
        else if (!areWallpapersOpen && !areAdvancedSettingsOpen) {
            history.go(-1);
            console.log("cant go back anymore", -history.length - 1);
        }
    });
    let page = window.location.href;
    page = page.split("/?")[1];
    if (!page) history.pushState({
        loc: "home"
    }, "", "?home");
    else if (page == "settings") openAdvancedSettings();
    else if (page == "backgrounds") wallpapersPanel("open");
};
const postOnboarding = ()=>{
    const btnInstall = document.getElementById("btn-install");
    let deferredPrompt;
    (0, _loadPreferencesJs.applyPreferences)();
    (0, _customBookmarksJs.loadBookmarks)();
    (0, _loadPreferencesJs.loadDropdownPositions)();
    wrap.style.opacity = 1;
    (0, _wallpapersJs.fetchWallpapersList)();
    (0, _wallpapersJs.highlightSetWallpaper)();
    pressAndHold();
    (0, _utilsJs.addEventListenerOnClass)("clickable", "keypress", (0, _utilsJs.clickToEnter));
    (0, _utilsJs.addEventListenerOnClass)("custom_bookmark", "click", (0, _loadingSpinnerJs.displayLoading));
    (0, _utilsJs.addEventListenerOnTag)("select", "change", (0, _savePreferencesJs.saveDropdownPositions));
    (0, _utilsJs.addEventListenerOnID)("btn-install", "click", (e)=>{
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult)=>{
            if (choiceResult.outcome === "accepted") console.log("user accepted prompt");
            deferredPrompt = null;
        });
    });
    window.addEventListener("beforeinstallprompt", (event)=>{
        event.preventDefault();
        deferredPrompt = event;
        btnInstall.style.display = "block";
    });
    (0, _loadPreferencesJs.scrollToBottom)();
    if (sessionStorage.getItem("focus") == "on") {
        document.getElementById("searchTerm").focus();
        document.getElementById("searchTerm").click();
    }
    (0, _getLastUpdatedJs.getLastUpdated)("version-preview");
    (0, _letItSnowJs.isItChristmas)();
    (0, _loadPreferencesJs.loadSelectedWidgetStyle)();
    switchPage();
};
// Start ----------------------------------------------------------
document.addEventListener("DOMContentLoaded", ()=>{
    // preOnboarding();
    if (localStorage.getItem("onBoarding") == "1") {
        postOnboarding();
        console.log("Already onboard.");
    } else {
        console.log("Onboarding...");
        (0, _onboardingJs.preOnboarding)().then(()=>{
            if ((0, _isTouchDeviceJs.isTouchDevice)()) setTimeout(()=>{
                (0, _alertDialogJs.genericAlert)("Information", "Press and hold on empty area to open settings.");
            }, 5000);
            postOnboarding();
            console.log("Onboarding complete.");
        });
    }
}, {
    once: true
}); // ---------------------------------------------------------- End

},{"./js_modules/search.js":"iXVBg","./js_modules/utils.js":"54PwB","./js_modules/loading_spinner.js":"f1GmI","./js_modules/colors.js":"9bVGN","./js_modules/custom_bookmarks.js":"8vepF","./js_modules/wallpapers.js":"daUmi","./js_modules/load_preferences.js":"7AOSo","./js_modules/preferences.js":"1jF2k","./js_modules/validators.js":"lYqqo","./js_modules/onboarding.js":"2LPAC","./js_modules/save_preferences.js":"7Eiyg","./js_modules/utils/getLastUpdated.js":"8r7xk","./js_modules/utils/blurLevel.js":"dlwQh","./js_modules/utils/letItSnow.js":"bmV05","./js_modules/utils/inputDialog.js":"2AgXt","./js_modules/utils/isTouchDevice.js":"ickwn","./js_modules/utils/enableSubmitButton.js":"eMR8Q","./js_modules/utils/alertDialog.js":"fZUTj"}],"iXVBg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "webSearch", ()=>webSearch);
parcelHelpers.export(exports, "movies", ()=>movies);
parcelHelpers.export(exports, "tv", ()=>tv);
parcelHelpers.export(exports, "games", ()=>games);
parcelHelpers.export(exports, "ebooks", ()=>ebooks);
parcelHelpers.export(exports, "processSearchboxInput", ()=>processSearchboxInput);
parcelHelpers.export(exports, "collapseAutofill", ()=>collapseAutofill);
parcelHelpers.export(exports, "enterToSearch", ()=>enterToSearch);
var _utilsJs = require("./utils.js");
var _constantsJs = require("./constants.js");
var _cliJs = require("./cli.js");
var _validatorsJs = require("./validators.js");
var _notifyDialogJs = require("./utils/notifyDialog.js");
const MSG = "You must enter a search query to continue.";
const container = document.querySelector(".autofillContainer");
const searchBG = document.querySelector("#searchBarFocusMode");
let myScript = "";
function loadSearchDomain() {
    let domain = localStorage.getItem("default-search-url");
    if (domain == null) {
        localStorage.setItem("default-search-url", (0, _constantsJs.GOOGLE_SEARCH_DOMAIN));
        domain = localStorage.getItem("default-search-url");
    }
    return domain;
}
function webSearch() {
    let input = (0, _utilsJs.getSearchTerm)().value;
    if (input != "") {
        updateAutocompleteDatabase(input);
        if ((0, _validatorsJs.isUrlValid)(input) && !input.includes(" ")) {
            // if (!input.startsWith('http')) input = `http://${input}`;
            window.open(input, "_self");
            return;
        }
        if (!(0, _cliJs.cliCheck)(input)) {
            input = encodeURIComponent(input);
            // input = input.split(" ").join("+");
            const url = loadSearchDomain() + input;
            window.open(url, "_self");
        } else (0, _cliJs.cliParse)(input);
    } else (0, _notifyDialogJs.Notify).show(MSG);
}
function movies() {
    let input = (0, _utilsJs.getSearchTerm)().value;
    if (input != "") {
        input = encodeURIComponent(input);
        // input = input.split(" ").join("%20");
        const url = (0, _constantsJs.EXT_SEARCH_DOMAIN) + input + "/Movies/time/desc/1/";
        window.open(url);
    } else (0, _notifyDialogJs.Notify).show(MSG);
}
function tv() {
    let input = (0, _utilsJs.getSearchTerm)().value;
    if (input != "") {
        input = encodeURIComponent(input);
        const url = (0, _constantsJs.EXT_SEARCH_DOMAIN) + input + "/TV/size/desc/1/";
        window.open(url);
    } else (0, _notifyDialogJs.Notify).show(MSG);
}
function games() {
    let input = (0, _utilsJs.getSearchTerm)().value;
    if (input != "") {
        input = encodeURIComponent(input);
        const url = (0, _constantsJs.EXT_SEARCH_DOMAIN) + input + "/Games/time/desc/1/";
        window.open(url);
    } else (0, _notifyDialogJs.Notify).show(MSG);
}
function ebooks() {
    let input = (0, _utilsJs.getSearchTerm)().value;
    if (input != "") {
        input = encodeURIComponent(input);
        const url = (0, _constantsJs.EXT_SEARCH_DOMAIN) + input + "/Other/seeders/desc/1/";
        window.open(url);
    } else (0, _notifyDialogJs.Notify).show(MSG);
}
let returnedSuggestions = [];
window.googleSuggestions = (data)=>{
    returnedSuggestions = [];
    const inputQuery = (0, _utilsJs.getSearchTerm)().value;
    returnedSuggestions = data[1];
    if (inputQuery) {
        showAutofillBox(inputQuery, returnedSuggestions);
        expandAutofill(inputQuery);
    // console.log(returnedSuggestions);
    }
};
function processSearchboxInput(event) {
    const oldInput = sessionStorage.getItem("input");
    const input = event.target.value;
    sessionStorage.setItem("input", input);
    switchToCLI(input);
    switchToURL(input);
    if (!input) {
        clearSuggestions();
        setTimeout(()=>{
            collapseAutofill();
        }, 1);
        return;
    }
    expandAutofill(input);
    if (input != oldInput) googleAutocomplete(input);
}
const googleAutocomplete = (input)=>{
    if (myScript !== "") document.body.removeChild(myScript);
    const provider = "https://suggestqueries.google.com/complete/search?client=firefox&callback=googleSuggestions&q=";
    myScript = document.createElement("script");
    myScript.src = `${provider}${input}`;
    document.body.appendChild(myScript);
};
const switchToCLI = (input)=>{
    const btnIcon = document.getElementById("search-btn-icon");
    const currentIcon = localStorage.getItem("default-search-icon");
    if ((0, _cliJs.cliCheck)(input)) btnIcon.className = "fa fa-terminal";
    else btnIcon.className = currentIcon;
};
const switchToURL = (input)=>{
    const btnIcon = document.getElementById("search-btn-icon");
    const currentIcon = localStorage.getItem("default-search-icon");
    if ((0, _validatorsJs.isUrlValid)(input)) btnIcon.className = "fa fa-globe";
    else btnIcon.className = currentIcon;
};
const collapseAutofill = ()=>{
    searchBG.style.opacity = "0";
    container.style.paddingBlock = "0em";
    container.style.height = "0px";
    setTimeout(()=>{
        searchBG.style.display = "none";
    }, 200);
};
const expandAutofill = (input)=>{
    const items = document.querySelectorAll(".autofillItem");
    if (input.length) {
        searchBG.style.display = "block";
        setTimeout(()=>{
            if (items.length) {
                const d = items[0].getBoundingClientRect();
                const calc = d.height * items.length + d.height * 1.5;
                container.style.height = `${calc}px`;
                container.style.paddingBlockStart = "0em";
            }
            searchBG.style.opacity = "1";
        }, 1);
    }
};
const clearSuggestions = ()=>{
    const items = document.querySelectorAll(".autofillItem");
    items.forEach((e)=>{
        e.remove();
    });
};
const showAutofillBox = (input, cloudInput)=>{
    input = input.toLowerCase();
    const db = JSON.parse(localStorage.getItem("autocompleteDatabase"));
    if (!db) localStorage.setItem("autocompleteDatabase", (0, _constantsJs.SAMPLE_AUTOFILL));
    const filteredArray = db.filter((e)=>{
        if (e == input) return;
        else return e.toLowerCase().startsWith(input);
    });
    function autofill(event) {
        (0, _utilsJs.getSearchTerm)().value = event.target.innerHTML;
        const e = new InputEvent("input");
        (0, _utilsJs.getSearchTerm)().dispatchEvent(e);
        (0, _utilsJs.getSearchTerm)().focus();
    }
    const generateSuggestions = (filteredArray)=>{
        clearSuggestions();
        if (!input) return;
        const theme = sessionStorage.getItem("searchbar-color-theme-drop");
        const order = sessionStorage.getItem("searchbar-position-drop");
        if (order == "bottom") container.style.flexDirection = "column-reverse";
        else container.style.flexDirection = "column";
        let i = 0;
        for (const e of filteredArray){
            if (i == 6) break;
            container.insertAdjacentHTML("beforeend", `
				<span 
                    class="autofillItem disable-select searchbox-style-${theme}"
                    tabindex="1" title="${e}">${e}</span>
            `);
            i++;
        }
        for (const e of cloudInput){
            if (i == 10) break;
            container.insertAdjacentHTML("beforeend", `
        		<span 
                    class="autofillItem disable-select searchbox-style-${theme}"
                    tabindex="1" title="${e}">${e}</span>
            `);
            i++;
        }
    };
    generateSuggestions(filteredArray);
    const items = document.querySelectorAll(".autofillItem");
    items.forEach((e)=>{
        e.addEventListener("click", autofill);
        // e.addEventListener('focus', autofill);
        e.addEventListener("keydown", (0, _utilsJs.clickToEnter));
    });
};
function enterToSearch(event) {
    if (event.key == "Enter") document.querySelector("#search-btn").click();
}
const updateAutocompleteDatabase = (entry)=>{
    const db = JSON.parse(localStorage.getItem("autocompleteDatabase"));
    const set = new Set(db);
    set.add(entry.toLowerCase());
    const update = Array.from(set);
    localStorage.setItem("autocompleteDatabase", JSON.stringify(update));
};

},{"./utils.js":"54PwB","./constants.js":"3zOJv","./cli.js":"drpmR","./validators.js":"lYqqo","./utils/notifyDialog.js":"5jcSi","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"54PwB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getSearchTerm", ()=>getSearchTerm);
parcelHelpers.export(exports, "addEventListenerOnID", ()=>addEventListenerOnID);
parcelHelpers.export(exports, "addEventListenerOnClass", ()=>addEventListenerOnClass);
parcelHelpers.export(exports, "addEventListenerOnTag", ()=>addEventListenerOnTag);
parcelHelpers.export(exports, "clickToEnter", ()=>clickToEnter);
parcelHelpers.export(exports, "fetchBookmarks", ()=>fetchBookmarks);
parcelHelpers.export(exports, "fixBackgroundBlurOnResize", ()=>fixBackgroundBlurOnResize);
parcelHelpers.export(exports, "scrollHighlightedWallpaperIntoView", ()=>scrollHighlightedWallpaperIntoView);
parcelHelpers.export(exports, "stylizeText", ()=>stylizeText);
parcelHelpers.export(exports, "changeHeadingStyles", ()=>changeHeadingStyles);
parcelHelpers.export(exports, "toggleArrows", ()=>toggleArrows);
parcelHelpers.export(exports, "changeSlide", ()=>changeSlide);
var _constantsJs = require("./constants.js");
var _preferencesJs = require("./preferences.js");
var _stylesJs = require("./styles.js");
function getSearchTerm() {
    return document.getElementsByClassName("searchTerm")[0];
}
function addEventListenerOnID(id, event, func) {
    if (event == null) return;
    return document.getElementById(id).addEventListener(event, func, {
        passive: true
    });
}
function addEventListenerOnClass(className, event, func) {
    const classList = document.getElementsByClassName(className);
    for(let i = 0; i < classList.length; i++)classList[i].addEventListener(event, func);
}
function addEventListenerOnTag(tagName, event, func) {
    const tagList = document.getElementsByTagName(tagName);
    for(let i = 0; i < tagList.length; i++)tagList[i].addEventListener(event, func);
}
function clickToEnter(event) {
    if (event.key === "Enter" || event.key === " ") event.target.click();
}
function fetchBookmarks() {
    fetch((0, _constantsJs.BOOKMARKS_SAMPLE_URL)).then((res)=>(0, _preferencesJs.importBookmarks)(null, res.text()));
}
function fixBackgroundBlurOnResize(id) {
    document.getElementById(id).style.backdropFilter = `blur(0.9em)`;
    setTimeout(()=>{
        document.getElementById(id).style.backdropFilter = `blur(1em)`;
    }, 1);
}
function scrollHighlightedWallpaperIntoView() {
    const wallpaper = document.getElementsByClassName("highlighted")[0];
    setTimeout(()=>{
        if (wallpaper) wallpaper.scrollIntoView({
            inline: "center"
        });
    }, 10);
}
async function stylizeText(id, int = 0) {
    document.getElementById(id).className = (0, _stylesJs.headingStyles)[int];
}
let i = 0;
function changeHeadingStyles(event = null, int) {
    if (event) event.stopPropagation();
    i += int;
    if (i < 0) i = (0, _stylesJs.headingStyles).length - 1;
    if (i >= (0, _stylesJs.headingStyles).length) i = 0;
    stylizeText("main-heading", i);
}
function toggleArrows(str) {
    const arrows = document.getElementsByClassName("arrows");
    switch(str){
        case "show":
            for(let i = 0; i < arrows.length; i++)arrows[i].style.height = "2em";
            break;
        case "hide":
            for(let i = 0; i < arrows.length; i++)arrows[i].style.height = "0em";
            break;
    }
}
function changeSlide(element, int) {
    const w = document.getElementById("main-heading-slider");
    const width = w.scrollWidth;
    const el = document.getElementsByClassName(element);
    const currentPos = w.scrollLeft;
    let newPos;
    const step = w.scrollWidth / el.length;
    // console.log(width, w.clientWidth)
    if (int == 1) {
        newPos = currentPos + step;
        if (newPos > width) newPos = width;
        console.log(newPos);
        w.scrollLeft = newPos;
    } else if (int == -1) {
        newPos = currentPos - step;
        if (newPos < 0) newPos = 0;
        console.log(newPos);
        w.scrollLeft = newPos;
    }
}

},{"./constants.js":"3zOJv","./preferences.js":"1jF2k","./styles.js":"hEGZg","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3zOJv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EXT_SEARCH_DOMAIN", ()=>EXT_SEARCH_DOMAIN);
parcelHelpers.export(exports, "GOOGLE_SEARCH_DOMAIN", ()=>GOOGLE_SEARCH_DOMAIN);
parcelHelpers.export(exports, "BING_SEARCH_DOMAIN", ()=>BING_SEARCH_DOMAIN);
parcelHelpers.export(exports, "DUCKDUCKGO_SEARCH_DOMAIN", ()=>DUCKDUCKGO_SEARCH_DOMAIN);
parcelHelpers.export(exports, "BOOKMARKS_SAMPLE_URL", ()=>BOOKMARKS_SAMPLE_URL);
parcelHelpers.export(exports, "SAMPLE_AUTOFILL", ()=>SAMPLE_AUTOFILL);
parcelHelpers.export(exports, "WALLPAPERS_URL", ()=>WALLPAPERS_URL);
parcelHelpers.export(exports, "DOWNLOAD_WALLPAPERS_URL", ()=>DOWNLOAD_WALLPAPERS_URL);
parcelHelpers.export(exports, "DEF_WALLPAPER", ()=>DEF_WALLPAPER);
parcelHelpers.export(exports, "DEF_CUSTOM_TEXT", ()=>DEF_CUSTOM_TEXT);
parcelHelpers.export(exports, "DEF_PREF", ()=>DEF_PREF);
const EXT_SEARCH_DOMAIN = "https://x1337x.ws/sort-category-search/";
const GOOGLE_SEARCH_DOMAIN = "https://www.google.com/search?q=";
const BING_SEARCH_DOMAIN = "https://www.bing.com/search?q=";
const DUCKDUCKGO_SEARCH_DOMAIN = "https://duckduckgo.com/?q=";
const BOOKMARKS_SAMPLE_URL = "https://raw.githubusercontent.com/lscambo13/casamia/main/custom_bookmarks_sample/home-page-bookmarks-2023-1-23.json";
const SAMPLE_AUTOFILL = '["--help","--dl","--clock","--countdown"]';
const WALLPAPERS_URL = "./wallpapers/";
const DOWNLOAD_WALLPAPERS_URL = "./wallpapers/backups/";
const DEF_WALLPAPER = "085.webp";
const DEF_CUSTOM_TEXT = "Custom Text";
const DEF_PREF = {
    "bg-img-drop": "shown",
    "bg-blur-drop": "off",
    // 'bg-glow-drop': 'auto',
    // 'weather-display-drop': 'off',
    "footer-display-drop": "on",
    "def-widget-drop": "casamia",
    // 'widget-style-drop': 'minimal',
    "greeting-display-drop": "on",
    "def-widget-display-drop": "on",
    // 'show-seconds-drop': 'off',
    // 'clock-style-drop': '12hrs',
    // 'am-pm-style-drop': 'uppercase',
    "def-search-engine-drop": "google",
    "searchbar-position-drop": "middle",
    "searchbar-color-theme-drop": "glass",
    "focus-search-drop": "off",
    "search-display-drop": "on",
    // 'show-titles-drop': 'off',
    "movies-search-display-drop": "shown",
    "tv-search-display-drop": "shown",
    "games-search-display-drop": "shown",
    "ebooks-search-display-drop": "shown",
    "add-bookmark-display-drop": "shown"
}; // 'https://github.com/lscambo13/casamia/raw/main/wallpapers/'
 // 'https://raw.githubusercontent.com/lscambo13/casamia/main/wallpapers/'
 // const X1337X_DOMAIN = 'https://x1337x.ws/home/';

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"1jF2k":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "exportBookmarks", ()=>exportBookmarks);
parcelHelpers.export(exports, "exportBackup", ()=>exportBackup);
parcelHelpers.export(exports, "downloadWallpaper", ()=>downloadWallpaper);
parcelHelpers.export(exports, "toggleFavicons", ()=>toggleFavicons);
parcelHelpers.export(exports, "displayClock", ()=>displayClock);
parcelHelpers.export(exports, "refreshGreeting", ()=>refreshGreeting);
// let greetingLoop = null;
// export function toggleGreeting() {
//     switch (value) {
//         case 'off': {
//             subtitle.classList.toggle('collapsed');
//             clearInterval(greetingLoop);
//             break;
//         };
//         case 'on': {
//             subtitle.classList.toggle('collapsed');
//             greetingLoop = setInterval(refreshGreeting, 1000);
//             break;
//         };
//     }
// }
parcelHelpers.export(exports, "toggleGlow", ()=>toggleGlow);
parcelHelpers.export(exports, "importBookmarks", ()=>importBookmarks);
parcelHelpers.export(exports, "importBackup", ()=>importBackup);
parcelHelpers.export(exports, "resetBookmarks", ()=>resetBookmarks);
parcelHelpers.export(exports, "resetAll", ()=>resetAll);
parcelHelpers.export(exports, "showNestedOptions", ()=>showNestedOptions) // export function toggleDim(event) {
 //     event.stopPropagation();
 //     const checkboxWall = document.getElementById('dim-setting');
 //     const overlay = document.getElementById('overlay');
 //     if (checkboxWall.checked == false) {
 //         overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.375)';
 //         localStorage.setItem('dim_wallpaper', 'rgba(0, 0, 0, 0.375)');
 //     } else {
 //         overlay.style.backgroundColor = 'rgb(0, 0, 0, 0.25)';
 //         localStorage.setItem('dim_wallpaper', 'rgb(0, 0, 0, 0.25)');
 //     }
 // };
 // export function toggleBlur() {
 //     // event.stopPropagation();
 //     const checkboxBlur = document.getElementById('toggle-blur-cb');
 //     // const overlay = document.getElementById('overlay');
 //     if (checkboxBlur.checked == true) {
 //         toggleBackdropBlur('overlay', 1);
 //         localStorage.setItem('blur_wallpaper', 'blur(1em)');
 //     } else {
 //         toggleBackdropBlur('overlay', 0);
 //         localStorage.setItem('blur_wallpaper', 'blur(0em)');
 //     }
 // };
 // export function toggleWallpaper(event) {
 //     event.stopPropagation();
 //     const checkboxWall = document.getElementById('toggle-wallpaper-cb');
 //     const overlay = document.getElementById('overlay');
 //     if (checkboxWall.checked == false) {
 //         overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.375)';
 //         localStorage.setItem('disable_wallpaper', 'rgba(0, 0, 0, 0.375)');
 //     } else {
 //         overlay.style.backgroundColor = 'rgb(0, 0, 0)';
 //         localStorage.setItem('disable_wallpaper', 'rgb(0, 0, 0)');
 //     }
 // };
 // export function toggleLabs(event) {
 //     // event.stopPropagation();
 //     console.log('called labs');
 //     const checkboxLabs = document.getElementById('toggle-labs-cb');
 //     const labsDiv = document.getElementById('labs');
 //     if (checkboxLabs.checked == true) {
 //         labsDiv.style.display = 'block';
 //         localStorage.setItem('labs', 'block');
 //     } else {
 //         labsDiv.style.display = 'none';
 //         localStorage.setItem('labs', 'none');
 //     }
 // };
;
var _constantsJs = require("./constants.js");
var _customBookmarksJs = require("./custom_bookmarks.js");
var _loadPreferencesJs = require("./load_preferences.js");
var _stringsJs = require("./strings.js");
var _addZeroJs = require("./utils/addZero.js");
var _alertDialogJs = require("./utils/alertDialog.js");
var _changeExtensionJs = require("./utils/changeExtension.js");
var _waitJs = require("./utils/wait.js");
var _wallpapersJs = require("./wallpapers.js");
function exportBookmarks(event) {
    event.stopPropagation();
    const bookmarksString = localStorage.saved_bookmarks;
    const d = new Date();
    (0, _customBookmarksJs.downloadBookmarks)(`casamia-bookmarks-only-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}.json`, bookmarksString);
}
function exportBackup(event) {
    event.stopPropagation();
    const data = {
        ...localStorage
    };
    const backupString = JSON.stringify(data);
    const d = new Date();
    (0, _customBookmarksJs.downloadBookmarks)(`casamia-full-backup-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}.json`, backupString);
}
function downloadWallpaper() {
    // console.log(DOWNLOAD_WALLPAPERS_URL + selectedWallpaper);
    const element = document.createElement("a");
    const hiResWall = (0, _changeExtensionJs.changeExtension)((0, _wallpapersJs.selectedWallpaper), "png");
    element.setAttribute("href", (0, _constantsJs.DOWNLOAD_WALLPAPERS_URL) + hiResWall);
    element.setAttribute("download", hiResWall);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
/* alert(
	"If the download doesn't start, disable the pop-up blocker extensions."
  ); */ }
function toggleFavicons(event) {
    // http://www.google.com/s2/favicons?domain=google.com
    const customBookmarks = document.getElementsByClassName("custom_bookmark");
    const spans = document.getElementsByClassName("custom_link_name");
    for(let i = 0; i < customBookmarks.length; i++){
        spans[i].style.display = "none";
        const newFavicon = document.createElement("img");
        newFavicon.className = "ext_favicon";
        const domain = customBookmarks[i].href;
        newFavicon.src = "http://www.google.com/s2/favicons?sz=32&domain=" + domain;
        customBookmarks[i].appendChild(newFavicon);
    }
}
let clockLoop = null;
function displayClock(value) {
    const target = "widget-slide";
    switch(value){
        case "off":
            clearInterval(clockLoop);
            clockLoop = null;
            break;
        case "on":
            if (clockLoop) clearInterval(clockLoop);
            clockLoop = setInterval(()=>refreshClock(target), 1000);
            break;
    }
}
function refreshClock(targetClass) {
    const target = document.getElementsByClassName(targetClass);
    const date = new Date();
    let hours = date.getHours();
    let amPm = (int)=>{
        if (int == 0) {
            hours.toString();
            hours = "12";
            return "AM";
        } else if (int > 0 && int < 12) {
            hours = (0, _addZeroJs.addZero)(hours.toString());
            return "AM";
        } else if (int == 12) {
            hours = "12";
            return "PM";
        } else if (int > 12) {
            hours = hours - 12;
            hours.toString();
            hours = (0, _addZeroJs.addZero)(hours);
            return "PM";
        }
    };
    const minutes = (0, _addZeroJs.addZero)(date.getMinutes().toString());
    const seconds = (0, _addZeroJs.addZero)(date.getSeconds().toString());
    amPm = amPm(hours);
    let separator = ":";
    for(let i = 0; i < target.length; i++){
        if (seconds % 2 === 0) separator = `<span class="separator separator-visible">:</span>`;
        else separator = `<span class="separator">:</span>`;
        target[i].innerHTML = `${hours}${separator}${minutes} ${(0, _loadPreferencesJs.updateAmPmStyle)(amPm.toString())}`;
    }
// subtitle.style.display = 'block';
// console.log(`${hours}:${minutes}:${seconds} ${amPm}`);
}
function refreshGreeting() {
    const subtitle = document.getElementById("subtitle");
    const user = localStorage.getItem("userName");
    const date = new Date();
    const hours = date.getHours();
    let greeting = (int)=>{
        if (int < 12) return `Good Morning, ${user}`;
        else if (int >= 12 && int <= 18) return `Good Afternoon, ${user}`;
        else if (int >= 18) return `Good Evening, ${user}`;
    };
    greeting = greeting(hours);
    subtitle.innerText = greeting;
}
function toggleGlow() {
    const gradientOverlay = document.getElementById("gradient_overlay");
    let glow = localStorage.getItem("glow");
    if (glow == null || glow == "0") {
        glow = "1";
        gradientOverlay.style.opacity = 1;
        localStorage.setItem("glow", "1");
    } else if (glow == "1") {
        glow = "0";
        gradientOverlay.style.opacity = 0;
        localStorage.setItem("glow", "0");
    }
}
function importBookmarks(event, text = "") {
    let file;
    if (event) {
        event.stopPropagation();
        file = event.target.files[0].text();
    } else file = text;
    function result(file) {
        const importedBookmarks = JSON.parse(file);
        if (!importedBookmarks[0]?.id) {
            console.log(importedBookmarks);
            (0, _alertDialogJs.genericAlert)("Failed", "The backup does not seem to be valid.");
            event.target.value = null;
            return;
        }
        const ids = [];
        for (const bookmark of (0, _customBookmarksJs.customBookmarks))ids.push(bookmark.id);
        for (const i of importedBookmarks){
            if (ids.includes(i.id)) {
                (0, _waitJs.wait)(1);
                i.id = Date.now();
            }
            ids.push(i.id);
            (0, _customBookmarksJs.saveBookmarks)(i.link, i.name, i.id);
        }
        window.location.reload();
    }
    file.then(result);
}
function importBackup(event, text = "") {
    let file;
    if (event) {
        event.stopPropagation();
        file = event.target.files[0].text();
    } else file = text;
    function result(file) {
        const importedBackup = JSON.parse(file);
        if (importedBackup.onBoarding) {
            const keys = Object.keys(importedBackup);
            keys.forEach((e, i)=>{
                localStorage.setItem(e, importedBackup[keys[i]]);
            });
            window.location.reload();
        } else {
            console.log(importedBackup);
            (0, _alertDialogJs.genericAlert)("Failed", "The backup does not seem to be valid.");
            event.target.value = null;
        }
    }
    file.then(result);
}
function resetBookmarks(event) {
    if (confirm((0, _stringsJs.resetBookmarksWarningText))) {
        localStorage.removeItem("saved_bookmarks");
        window.location.reload();
    }
}
function resetAll(event) {
    if (confirm((0, _stringsJs.resetAllWarningText))) {
        localStorage.clear();
        window.location.reload();
    }
}
function showNestedOptions(id) {
    const element = document.getElementById(id);
    element.classList.toggle("nested-close");
}

},{"./constants.js":"3zOJv","./custom_bookmarks.js":"8vepF","./load_preferences.js":"7AOSo","./strings.js":"d2N26","./utils/addZero.js":"c1err","./utils/alertDialog.js":"fZUTj","./utils/changeExtension.js":"j4ZwK","./utils/wait.js":"3xNjK","./wallpapers.js":"daUmi","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8vepF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "customBookmarks", ()=>customBookmarks);
parcelHelpers.export(exports, "loadBookmarks", ()=>loadBookmarks);
parcelHelpers.export(exports, "addBookmarkToHTML", ()=>addBookmarkToHTML);
parcelHelpers.export(exports, "saveBookmarks", ()=>saveBookmarks);
parcelHelpers.export(exports, "removeBookmarkFromLocalStorage", ()=>removeBookmarkFromLocalStorage);
parcelHelpers.export(exports, "editBookmarkInLocalStorage", ()=>editBookmarkInLocalStorage);
parcelHelpers.export(exports, "getBookmarkDetailsFromLocalStorage", ()=>getBookmarkDetailsFromLocalStorage);
parcelHelpers.export(exports, "toggleRemoveButtons", ()=>toggleRemoveButtons);
parcelHelpers.export(exports, "downloadBookmarks", ()=>downloadBookmarks);
parcelHelpers.export(exports, "editBookmark", ()=>editBookmark);
var _inputDialogJs = require("./utils/inputDialog.js");
var _enableSubmitButtonJs = require("./utils/enableSubmitButton.js");
var _toggleDisplayJs = require("./utils/toggleDisplay.js");
let customBookmarks = JSON.parse(localStorage.getItem("saved_bookmarks"));
function loadBookmarks() {
    if (customBookmarks == null) {
        customBookmarks = [];
        return;
    }
    for (const n of customBookmarks)addBookmarkToHTML(n.link, n.name, n.id);
}
function addBookmarkToHTML(link, name, id) {
    const bookmarkContainer = document.getElementsByClassName("flex-sub-container-horizontal")[0];
    bookmarkContainer.appendChild(createBookmark(link, name, id));
    const justAdded = document.getElementsByClassName("cross");
    justAdded[justAdded.length - 1].addEventListener("click", editBookmark);
}
function createBookmark(link, name, id) {
    const i = document.createElement("span");
    i.textContent = name;
    i.className = "custom_link_name";
    const d = document.createElement("div");
    d.className = "cross";
    d.title = "Modify bookmark details";
    d.setAttribute("tabindex", "5");
    const newBookmark = document.createElement("a");
    newBookmark.className = "custom_bookmark clickable";
    newBookmark.setAttribute("href", link);
    newBookmark.setAttribute("id", id);
    newBookmark.setAttribute("tabindex", "1");
    newBookmark.appendChild(i);
    newBookmark.appendChild(d);
    return newBookmark;
}
function saveBookmarks(link, name, id) {
    customBookmarks.push({
        link: link,
        name: name,
        id: id
    });
    localStorage.setItem("saved_bookmarks", JSON.stringify(customBookmarks));
}
function removeBookmarkFromLocalStorage(id) {
    customBookmarks = customBookmarks.filter((elem)=>{
        return id != elem.id;
    });
    localStorage.setItem("saved_bookmarks", JSON.stringify(customBookmarks));
}
function editBookmarkInLocalStorage(id, newName, newLink) {
    const edit = customBookmarks.filter((elem)=>{
        return id == elem.id;
    });
    edit[0].name = newName;
    edit[0].link = newLink;
    localStorage.setItem("saved_bookmarks", JSON.stringify(customBookmarks));
}
function getBookmarkDetailsFromLocalStorage(id) {
    const edit = customBookmarks.filter((elem)=>{
        return id == elem.id;
    });
    return [
        edit[0].id,
        edit[0].name,
        edit[0].link
    ];
}
function toggleRemoveButtons(visible) {
    switch(visible){
        case "show":
            (0, _toggleDisplayJs.crossDisplay)(`block`);
            break;
        case "hide":
            (0, _toggleDisplayJs.crossDisplay)(`none`);
            break;
    }
}
function downloadBookmarks(filename, text) {
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
function editBookmark(event) {
    event.preventDefault();
    event.stopPropagation();
    const targetElement = event.target.parentNode;
    const onChange = ()=>{
        const checkbox = (0, _inputDialogJs.InputDialog).getCheckboxField();
        const modalSubmitButton = (0, _inputDialogJs.InputDialog).getSubmitButton();
        const inputFields = (0, _inputDialogJs.InputDialog).getInputFields();
        if (checkbox.checked) {
            modalSubmitButton.textContent = "Delete";
            modalSubmitButton.classList.add("deleteButton");
            for (const i of inputFields)i.disabled = true;
            modalSubmitButton.disabled = false;
        } else if (!checkbox.checked) {
            modalSubmitButton.textContent = "Save";
            modalSubmitButton.classList.remove("deleteButton");
            for (const i of inputFields)i.disabled = false;
        }
    };
    const details = getBookmarkDetailsFromLocalStorage(targetElement.id);
    (0, _inputDialogJs.InputDialog).show("Edit bookmark", null, [
        "Name",
        "Address"
    ], "Save", "Cancel", "Delete this bookmark", [
        ()=>(0, _enableSubmitButtonJs.enableSubmitButton)(event, true),
        onChange
    ], ()=>{
        (0, _inputDialogJs.InputDialog).getInputFields()[0].setAttribute("maxlength", "4");
        (0, _inputDialogJs.InputDialog).getInputFields()[0].value = details[1];
        (0, _inputDialogJs.InputDialog).getInputFields()[1].value = details[2];
    }).then((res)=>{
        if (res.checkboxChecked) {
            removeBookmarkFromLocalStorage(targetElement.id);
            targetElement.style.display = "none";
            return;
        }
        targetElement.href = res.inputValues[1].replaceAll(" ", "");
        targetElement.firstChild.innerHTML = res.inputValues[0];
        editBookmarkInLocalStorage(targetElement.id, res.inputValues[0], res.inputValues[1].replaceAll(" ", ""));
    }).catch((e)=>console.log(e));
    return;
}

},{"./utils/inputDialog.js":"2AgXt","./utils/enableSubmitButton.js":"eMR8Q","./utils/toggleDisplay.js":"2UmOJ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2AgXt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "InputDialog", ()=>InputDialog);
let modalContainer;
let modalSubmitButton;
let modalCancelButton;
let tickBoxField;
let inputFields;
const showInputDialog = (title = null, description = null, inputBoxes = [
    "Input A",
    "Input B"
], submitButtonName = "Submit", cancelButtonName = "Cancel", tickBox = null, listeners = [
    onInput = null,
    onChange = null
], onInit = null)=>{
    modalContainer = document.getElementById("inputDialogContainer");
    if (modalContainer) modalContainer.remove();
    document.activeElement.blur();
    if (title) title = `<h3 id="inputDialogTitle" class="modalTitle">${title}</h3>`;
    else title = "";
    if (description) description = `
		<h4 id="inputDialogDescription" class="modalDescription">${description}</h4>
	`;
    else description = "";
    document.body.insertAdjacentHTML("afterbegin", `
		<div id="inputDialogContainer" class="modalContainer disable-select">
			<form autocomplete="off" action="#" class="modal">
				${title}
				${description}
				<div id="inputDialogButtonsBar" class="modalButtonsBar">
					<button
					 id="inputDialogSubmitButton"
					 class="mainButton button"
					 disabled = "true"
					 onclick=""
					 type="submit">${submitButtonName}</button>
					<button
					 id="inputDialogCancelButton"
					 class="button"
					 onclick=""
					 type="button">${cancelButtonName}</button>
				</div>
				<form>
		</div>
	`);
    inputBoxes.forEach((e)=>{
        let id = e.replaceAll(" ", "-").toLowerCase();
        id = `MODAL-INPUT-${id}`;
        document.getElementById("inputDialogButtonsBar").insertAdjacentHTML("beforebegin", `
					<label
					 class="label"
					 for="${id}">${e}</label>
					<input
					 class="modalInputField"
					 type="text"
					 id="${id}">
		`);
    });
    if (tickBox) {
        document.getElementById("inputDialogButtonsBar").insertAdjacentHTML("beforebegin", `
					<label
					 class="label"
					 for="tickBoxField">
						<input
						class="tickBoxField"
						type="checkbox"
						id="tickBoxField">
						<span>${tickBox}</span>
					 </label>
		`);
        tickBoxField = document.getElementById("tickBoxField");
    }
    modalContainer = document.getElementById("inputDialogContainer");
    modalSubmitButton = document.getElementById("inputDialogSubmitButton");
    modalCancelButton = document.getElementById("inputDialogCancelButton");
    inputFields = document.getElementsByClassName("modalInputField");
    document.body.style.overflow = "hidden";
    inputFields[0].focus();
    if (!cancelButtonName) modalCancelButton.style.display = "none";
    const promise = new Promise((resolve, reject)=>{
        // modalContainer.style.paddingBlockStart = '4em';
        modalContainer.style.opacity = "1";
        const rejectModal = ()=>{
            modalCancelButton.removeEventListener("click", rejectModal);
            modalContainer.remove();
            document.body.style.overflow = "auto";
            reject(Error(null));
        };
        const resolveModal = ()=>{
            modalSubmitButton.removeEventListener("click", resolveModal);
            if (tickBox) {
                tickBoxField.removeEventListener("change", listeners[1]);
                tickBoxField = tickBoxField.checked;
            }
            const inputValues = [];
            for (const e of inputFields){
                inputValues.push(e.value);
                if (listeners) e.removeEventListener("input", listeners);
            }
            const result = {
                "inputValues": inputValues,
                "checkboxChecked": tickBoxField
            };
            modalContainer.remove();
            document.body.style.overflow = "auto";
            console.log(result);
            resolve(result);
        };
        modalCancelButton.addEventListener("click", rejectModal);
        modalSubmitButton.addEventListener("click", resolveModal);
        if (listeners[0]) for (const e of inputFields)e.addEventListener("input", listeners[0]);
        if (listeners[1] && tickBox) tickBoxField.addEventListener("change", listeners[1]);
    });
    if (onInit) onInit();
    return promise;
};
const InputDialog = {
    show: showInputDialog,
    getSubmitButton: ()=>{
        return modalSubmitButton;
    },
    getCancelButton: ()=>{
        return modalCancelButton;
    },
    getInputFields: ()=>{
        return inputFields;
    },
    getCheckboxField: (n)=>{
        return tickBoxField;
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eMR8Q":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "enableSubmitButton", ()=>enableSubmitButton);
var _validatorsJs = require("../validators.js");
var _inputDialogJs = require("./inputDialog.js");
const enableSubmitButton = (event, alt = false)=>{
    const modalSubmitButton = (0, _inputDialogJs.InputDialog).getSubmitButton();
    const inputFields = (0, _inputDialogJs.InputDialog).getInputFields();
    for (const e of inputFields)if (e.value.length) modalSubmitButton.disabled = false;
    else {
        modalSubmitButton.disabled = true;
        return;
    }
    if (!alt) return;
    else if ((0, _validatorsJs.isUrlValid)(inputFields[1].value)) modalSubmitButton.disabled = false;
    else modalSubmitButton.disabled = true;
};

},{"../validators.js":"lYqqo","./inputDialog.js":"2AgXt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lYqqo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isUrlValid", ()=>isUrlValid);
parcelHelpers.export(exports, "isClockStyleCapital", ()=>isClockStyleCapital);
function isUrlValid(userInput) {
    try {
        new URL(userInput);
        return true;
    } catch (err) {
        return false;
    }
}
function isClockStyleCapital() {
    const clockClass = document.getElementById("main-heading-slider");
    if (clockClass.classList.contains("default-text-style")) return true;
    else return false;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2UmOJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "crossDisplay", ()=>crossDisplay);
function crossDisplay(str) {
    document.documentElement.style.setProperty("--cross-display", str);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7AOSo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "focusSearchBar", ()=>focusSearchBar);
parcelHelpers.export(exports, "askCustomText", ()=>askCustomText);
parcelHelpers.export(exports, "askCustomDomain", ()=>askCustomDomain);
parcelHelpers.export(exports, "defaultSearchEngine", ()=>defaultSearchEngine);
parcelHelpers.export(exports, "scrollToBottom", ()=>scrollToBottom);
// function showTitles() { };
parcelHelpers.export(exports, "applyPreferences", ()=>applyPreferences);
parcelHelpers.export(exports, "loadDropdownPositions", ()=>loadDropdownPositions);
parcelHelpers.export(exports, "updateUserNamePreview", ()=>updateUserNamePreview);
parcelHelpers.export(exports, "updateCustomTextPreview", ()=>updateCustomTextPreview);
parcelHelpers.export(exports, "updateCustomDomainPreview", ()=>updateCustomDomainPreview);
parcelHelpers.export(exports, "loadSelectedWidgetStyle", ()=>loadSelectedWidgetStyle);
parcelHelpers.export(exports, "updateAmPmStyle", ()=>updateAmPmStyle);
var _constantsJs = require("./constants.js");
var _preferencesJs = require("./preferences.js");
var _utilsJs = require("./utils.js");
var _inputDialogJs = require("./utils/inputDialog.js");
var _enableSubmitButtonJs = require("./utils/enableSubmitButton.js");
var _intersectionObserverJs = require("./utils/intersectionObserver.js");
const PREF_MAP = {
    "bg-img-drop": backgroundImage,
    "bg-blur-drop": backgroundBlur,
    // 'bg-glow-drop': backgroundGlow,
    // 'weather-display-drop': displayWeather,
    "footer-display-drop": displayFooter,
    "def-widget-drop": defaultWidget,
    // 'widget-style-drop': widgetStyle,
    "greeting-display-drop": displayGreeting,
    "def-widget-display-drop": displayWidget,
    // 'show-seconds-drop': showSeconds,
    // 'clock-style-drop': clockStyle,
    // 'am-pm-style-drop': amPmStyle,
    "def-search-engine-drop": defaultSearchEngine,
    "searchbar-position-drop": defaultSearchbarPosition,
    "searchbar-color-theme-drop": searchbarTheme,
    "focus-search-drop": focusSearchBar,
    "search-display-drop": displaySearch,
    // 'show-titles-drop': showTitles,
    "movies-search-display-drop": moviesSearch,
    "tv-search-display-drop": tvSearch,
    "games-search-display-drop": gamesSearch,
    "ebooks-search-display-drop": ebooksSearch,
    "add-bookmark-display-drop": displayAddBookmark
};
function backgroundImage(value) {
    const overlay = document.getElementById("overlay");
    switch(value){
        case "hidden":
            overlay.style.backgroundColor = "rgba(0, 0, 0, 1)";
            break;
        case "shown":
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.375)";
            break;
    }
}
function backgroundBlur(value) {
    const overlay = document.getElementById("overlay");
    switch(value){
        case "off":
            overlay.style.backdropFilter = "blur(0em)";
            break;
        case "on":
            overlay.style.backdropFilter = "blur(1em)";
            (0, _utilsJs.fixBackgroundBlurOnResize)("overlay");
            break;
    }
}
// function backgroundGlow() { };
// function displayWeather() { };
function displayFooter(value) {
    const footer = document.getElementById("footer");
    switch(value){
        case "off":
            footer.classList.add("hidden");
            break;
        case "on":
            footer.classList.remove("hidden");
            break;
    }
}
function focusSearchBar(value) {
    sessionStorage.setItem("focus", value);
// const searchbar = document.getElementById('searchTerm');
// switch (value) {
// 	case 'off': {
// 		// searchbar.focus();
// 		// sessionStorage.setItem('focus', 'off');
// 		break;
// 	};
// 	case 'on': {
// 		// searchbar.focus();
// 		// searchbar.click();
// 		break;
// 	};
}
function displayWidget(value) {
    const widget = document.getElementById("main-heading-slider");
    const lArrow = document.getElementById("left-arrow");
    const rArrow = document.getElementById("right-arrow");
    function toggleDefaultWidgetButton(value) {
        switch(value){
            case "show":
                document.getElementById("main-widget-children-container").classList.remove("nested-close");
                break;
            case "hide":
                document.getElementById("main-widget-children-container").classList.add("nested-close");
                break;
        }
    }
    switch(value){
        case "off":
            widget.classList.add("hidden");
            lArrow.classList.add("hidden");
            rArrow.classList.add("hidden");
            toggleDefaultWidgetButton("hide");
            break;
        case "on":
            widget.classList.remove("hidden");
            lArrow.classList.remove("hidden");
            rArrow.classList.remove("hidden");
            toggleDefaultWidgetButton("show");
            break;
    }
}
function displaySearch(value) {
    const search = document.getElementById("searchbar");
    const searchChildren = document.getElementById("search-display-children-container");
    const searchEngineDrop = document.getElementById("def-search-engine-drop-container");
    function toggleSearchEngineButton(value) {
        switch(value){
            case "show":
                searchChildren.classList.remove("nested-close");
                searchEngineDrop.classList.remove("nested-close");
                break;
            case "hide":
                searchChildren.classList.add("nested-close");
                searchEngineDrop.classList.add("nested-close");
                break;
        }
    }
    switch(value){
        case "off":
            search.classList.add("hidden");
            toggleSearchEngineButton("hide");
            break;
        case "on":
            search.classList.remove("hidden");
            toggleSearchEngineButton("show");
            break;
    }
}
const widgetSlides = document.getElementsByClassName("widget-slide");
function applyText(input) {
    for (const i of widgetSlides)i.textContent = input;
}
function defaultWidget(value) {
    function loadCustomText() {
        let customText = localStorage.getItem("customWidgetText");
        if (customText == null) {
            localStorage.setItem("customWidgetText", (0, _constantsJs.DEF_CUSTOM_TEXT));
            customText = localStorage.getItem("customWidgetText");
            askCustomText();
        }
        applyText(customText);
    // return customText;
    }
    function toggleCustomTextButton(value) {
        switch(value){
            case "show":
                document.getElementById("update-customtext-btn").classList.remove("nested-close");
                break;
            case "hide":
                document.getElementById("update-customtext-btn").classList.add("nested-close");
                break;
        }
    }
    switch(value){
        case "casamia":
            toggleCustomTextButton("hide");
            (0, _preferencesJs.displayClock)("off");
            applyText("Casa Mia");
            break;
        case "search":
            toggleCustomTextButton("hide");
            (0, _preferencesJs.displayClock)("off");
            applyText("Search");
            break;
        case "clock":
            toggleCustomTextButton("hide");
            (0, _preferencesJs.displayClock)("on");
            break;
        case "custom":
            (0, _preferencesJs.displayClock)("off");
            toggleCustomTextButton("show");
            loadCustomText();
            break;
    }
}
function askCustomText() {
    const savedText = localStorage.getItem("customWidgetText");
    (0, _inputDialogJs.InputDialog).show("Custom widget text", "Enter text you want to set as the main widget.", [
        "Custom text"
    ], "Save", "Cancel", null, [
        (0, _enableSubmitButtonJs.enableSubmitButton),
        null
    ], ()=>{
        (0, _inputDialogJs.InputDialog).getInputFields()[0].value = savedText;
    }).then((res)=>{
        localStorage.setItem("customWidgetText", res.inputValues[0]);
        applyText(res.inputValues[0]);
        updateCustomTextPreview();
    }).catch((e)=>{
        console.error(e);
    });
}
function askCustomDomain() {
    const savedDomain = localStorage.getItem("customDomain");
    (0, _inputDialogJs.InputDialog).show("Custom widget text", "Enter text you want to set as the main widget.", [
        "Custom text"
    ], "Save", "Cancel", null, [
        (0, _enableSubmitButtonJs.enableSubmitButton),
        null
    ], ()=>{
        (0, _inputDialogJs.InputDialog).getInputFields()[0].value = savedDomain;
    }).then((res)=>{
        localStorage.setItem("customDomain", res.inputValues[0]);
        applyDomain(res.inputValues[0]);
        updateCustomDomainPreview();
    }).catch((e)=>{
        console.error(e);
    });
}
// function widgetStyle() { };
let greetingLoop = null;
function displayGreeting(value) {
    const subtitle = document.getElementById("subtitle");
    clearInterval(greetingLoop);
    switch(value){
        case "off":
            subtitle.classList.add("collapsed");
            break;
        case "on":
            subtitle.classList.remove("collapsed");
            (0, _preferencesJs.refreshGreeting)();
            greetingLoop = setInterval((0, _preferencesJs.refreshGreeting), 20000);
            break;
    }
}
// function showSeconds() { };
// function clockStyle() { };
// function amPmStyle() { };
function applyDomain(domain) {
    localStorage.setItem("default-search-url", domain);
}
function defaultSearchEngine(value) {
    function loadCustomDomain() {
        let customDomain = localStorage.getItem("customDomain");
        if (customDomain == null) {
            localStorage.setItem("customDomain", (0, _constantsJs.GOOGLE_SEARCH_DOMAIN));
            customDomain = localStorage.getItem("customDomain");
            askCustomDomain();
        }
        applyDomain(customDomain);
    // return customText;
    }
    function applyIcon(value) {
        document.getElementById("search-btn-icon").className = value;
        localStorage.setItem("default-search-icon", value);
    }
    function toggleCustomDomainButton(value) {
        switch(value){
            case "show":
                document.getElementById("update-customdomain-btn").classList.remove("nested-close");
                break;
            case "hide":
                document.getElementById("update-customdomain-btn").classList.add("nested-close");
                break;
        }
    }
    switch(value){
        case "google":
            toggleCustomDomainButton("hide");
            applyDomain((0, _constantsJs.GOOGLE_SEARCH_DOMAIN));
            applyIcon("fa fa-google");
            break;
        case "bing":
            toggleCustomDomainButton("hide");
            applyDomain((0, _constantsJs.BING_SEARCH_DOMAIN));
            applyIcon("fa fa-search");
            break;
        case "duckduckgo":
            toggleCustomDomainButton("hide");
            applyDomain((0, _constantsJs.DUCKDUCKGO_SEARCH_DOMAIN));
            applyIcon("fa fa-search");
            break;
        case "custom":
            toggleCustomDomainButton("show");
            loadCustomDomain();
            // applyDomain(GOOGLE_SEARCH_DOMAIN);
            applyIcon("fa fa-search");
            break;
    }
}
function searchbarTheme(value) {
    const searchContainer = document.getElementById("searchContainer");
    sessionStorage.setItem("searchbar-color-theme-drop", value);
    switch(value){
        case "glass":
            searchContainer.classList.add("searchbox-style-glass");
            searchContainer.classList.remove("searchbox-style-light");
            searchContainer.classList.remove("searchbox-style-dark");
            break;
        case "light":
            searchContainer.classList.remove("searchbox-style-glass");
            searchContainer.classList.add("searchbox-style-light");
            searchContainer.classList.remove("searchbox-style-dark");
            break;
        case "dark":
            searchContainer.classList.remove("searchbox-style-glass");
            searchContainer.classList.remove("searchbox-style-light");
            searchContainer.classList.add("searchbox-style-dark");
            break;
    }
}
function defaultSearchbarPosition(value) {
    const searchbar = document.getElementById("searchbar");
    const autofillContainer = document.getElementById("autofillContainer");
    const wrap = document.getElementById("wrap");
    sessionStorage.setItem("searchbar-position-drop", value);
    switch(value){
        case "top":
            searchbar.style.order = "0";
            autofillContainer.style.order = "1";
            autofillContainer.style.bottom = "0em";
            autofillContainer.style.top = "3.25em";
            wrap.style.margin = "0 auto auto auto";
            break;
        case "bottom":
            searchbar.style.order = "1";
            autofillContainer.style.order = "0";
            autofillContainer.style.bottom = "3.75em";
            autofillContainer.style.top = "";
            wrap.style.margin = "auto auto 0 auto";
            break;
        case "middle":
            searchbar.style.order = "0";
            autofillContainer.style.order = "1";
            autofillContainer.style.bottom = "0em";
            autofillContainer.style.top = "3.25em";
            wrap.style.margin = "auto auto auto auto";
            break;
    }
}
function scrollToBottom() {
    if (document.getElementById("searchbar").style.order == "1") window.scrollTo(0, document.body.scrollHeight);
}
function applyPreferences() {
    const preferencesObj = JSON.parse(localStorage.getItem("advDropdownValues"));
    const preferencesArray = Object.entries(preferencesObj);
    for (const i of preferencesArray){
        const func = PREF_MAP[i[0]];
        if (func) func(i[1]);
    }
    // apply previews
    updateUserNamePreview();
    updateCustomTextPreview();
    updateCustomDomainPreview();
    const lastSession = sessionStorage.getItem("input");
    if (lastSession) document.getElementById("searchTerm").value = lastSession;
}
function loadDropdownPositions() {
    const loadedFromStorage = Object.entries(JSON.parse(localStorage.getItem("advDropdownValues")));
    // if (!loadButtonPreviews) return;
    for (const i of loadedFromStorage){
        const elem = document.getElementById(i[0]);
        if (elem) elem.value = i[1];
    }
}
function updateUserNamePreview() {
    document.getElementById("update-username-btn-preview").textContent = localStorage.getItem("userName");
}
function updateCustomTextPreview() {
    document.getElementById("update-customtext-btn-preview").textContent = localStorage.getItem("customWidgetText");
}
function updateCustomDomainPreview() {
    document.getElementById("update-customdomain-btn-preview").textContent = localStorage.getItem("customDomain");
}
function loadSelectedWidgetStyle() {
    document.getElementById(localStorage.getItem("selected-widget-style")).scrollIntoView();
    setTimeout(()=>{
        (0, _intersectionObserverJs.intersectionObserver)("main-heading-slider", "widget-slide");
    }, 500);
}
function updateAmPmStyle(amPm) {
    const style = localStorage.getItem("selected-widget-style");
    if (style == "widget-2" || style == "widget-7" || style == "widget-5") return amPm.toLowerCase();
    return amPm;
}
function moviesSearch(value) {
    const button = document.getElementById("movies-search");
    switch(value){
        case "hidden":
            button.style.display = "none";
            break;
        case "shown":
            button.style.display = "flex";
            break;
    }
}
function tvSearch(value) {
    const button = document.getElementById("tv-search");
    switch(value){
        case "hidden":
            button.style.display = "none";
            break;
        case "shown":
            button.style.display = "flex";
            break;
    }
}
function gamesSearch(value) {
    const button = document.getElementById("games-search");
    switch(value){
        case "hidden":
            button.style.display = "none";
            break;
        case "shown":
            button.style.display = "flex";
            break;
    }
}
function ebooksSearch(value) {
    const button = document.getElementById("ebooks-search");
    switch(value){
        case "hidden":
            button.style.display = "none";
            break;
        case "shown":
            button.style.display = "flex";
            break;
    }
}
function displayAddBookmark(value) {
    const button = document.getElementById("add_bookmark_button");
    switch(value){
        case "hidden":
            button.style.display = "none";
            break;
        case "shown":
            button.style.display = "flex";
            break;
    }
}

},{"./constants.js":"3zOJv","./preferences.js":"1jF2k","./utils.js":"54PwB","./utils/inputDialog.js":"2AgXt","./utils/enableSubmitButton.js":"eMR8Q","./utils/intersectionObserver.js":"f0s3Y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f0s3Y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "intersectionObserver", ()=>intersectionObserver);
function intersectionObserver(rootID, targetClass) {
    const targetClasses = document.getElementsByClassName(targetClass);
    const options = {
        root: document.getElementById(rootID),
        rootMargin: "0px",
        threshold: 0.5
    };
    const callback = (entries)=>{
        entries.forEach((entry)=>{
            entry.isIntersecting && localStorage.setItem("selected-widget-style", entry.target.id);
        // console.log(entry.target.id)
        // console.log(entry.intersectionRatio)
        });
    };
    const observer = new IntersectionObserver(callback, options);
    for (const target of targetClasses)observer.observe(target);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d2N26":[function(require,module,exports) {
// eslint-disable-next-line block-spacing
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cliUnexpectedCmdText", ()=>cliUnexpectedCmdText);
parcelHelpers.export(exports, "resetBookmarksWarningText", ()=>resetBookmarksWarningText);
parcelHelpers.export(exports, "resetAllWarningText", ()=>resetAllWarningText);
parcelHelpers.export(exports, "updateUserNameText", ()=>updateUserNameText);
const cliUnexpectedCmdText = `The command you have passed is invalid.\n
Type --help to read the documentation.\n`;
const resetBookmarksWarningText = `This will reset bookmarks.
Make sure you have a backup to import later on.\n\n
Are you sure ?`;
const resetAllWarningText = `This will reset everything.
There is no going back.\n
Are you sure?`;
const updateUserNameText = `Maximum length allowed is 17 characters.`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"c1err":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addZero", ()=>addZero);
function addZero(char) {
    if (char.length == 1) char = "0" + char;
    return char;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fZUTj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AlertDialog", ()=>AlertDialog);
parcelHelpers.export(exports, "genericAlert", ()=>genericAlert);
let alertModalContainer;
let modalCancelButton;
let tickBoxField;
let submitButtons;
const showAlertDialog = (title = null, description = null, submitButtonNames = [
    "Submit A",
    "Submit B"
], cancelButtonName = "Ok", tickBox = [
    null,
    null
], listeners = [], onInit = null)=>{
    alertModalContainer = document.getElementById("alertDialogContainer");
    if (alertModalContainer) alertModalContainer.remove();
    if (title) title = `<h3 id="alertDialogTitle" class="modalTitle">${title}</h3>`;
    else title = "";
    if (description) description = `
		<h4 id="alertDialogDescription" class="modalDescription">${description}</h4>
	`;
    else description = "";
    document.body.insertAdjacentHTML("afterbegin", `
		<div id="alertDialogContainer" class="modalContainer disable-select">
			<div class="modal">
				${title}
				${description}
				<div id="alertDialogButtonsBar" class="modalButtonsBar">
					<button
					 id="alertDialogCancelButton"
					 class="button"
					 onclick=""
					 type="button">${cancelButtonName}</button>
				</div>
			</div>
		</div>
	`);
    if (submitButtonNames) submitButtonNames.forEach((e)=>{
        let id = e.replaceAll(" ", "-").toLowerCase();
        id = `ALERT-BUTTON-${id}`;
        document.getElementById("alertDialogButtonsBar").insertAdjacentHTML("afterbegin", `
			<button
			id="${id}"
			class="alertDialogSubmitButton button">
			${e}</button>
			`);
    });
    if (tickBox[0]) {
        document.getElementById("alertDialogButtonsBar").insertAdjacentHTML("beforebegin", `
					<label
					 class="label"
					 for="tickBoxField">
						<input
						class="tickBoxField"
						type="checkbox"
						id="tickBoxField">
						<span>${tickBox[0]}</span>
					 </label>
		`);
        tickBoxField = document.getElementById("tickBoxField");
    }
    alertModalContainer = document.getElementById("alertDialogContainer");
    modalCancelButton = document.getElementById("alertDialogCancelButton");
    submitButtons = document.getElementsByClassName("alertDialogSubmitButton");
    document.body.style.overflow = "hidden";
    modalCancelButton.focus();
    const promise = new Promise((resolve, reject)=>{
        alertModalContainer.style.alignItems = "center";
        alertModalContainer.style.opacity = "1";
        const resolveModal = ()=>{
            modalCancelButton.removeEventListener("click", resolveModal);
            if (tickBox[0]) {
                tickBoxField.removeEventListener("change", tickBox[1]);
                tickBoxField = tickBoxField.checked;
            }
            if (listeners) listeners.forEach((element, index)=>{
                submitButtons[index].removeEventListener("click", element);
            });
            alertModalContainer.remove();
            document.body.style.overflow = "auto";
            // console.log(result);
            resolve(tickBoxField);
        };
        modalCancelButton.addEventListener("click", resolveModal);
        if (listeners) listeners.forEach((element, index)=>{
            submitButtons[index].addEventListener("click", element);
        });
        if (tickBox[0]) tickBoxField.addEventListener("change", tickBox[1]);
    });
    if (onInit) onInit();
    return promise;
};
const AlertDialog = {
    show: showAlertDialog,
    getCancelButton: ()=>{
        return modalCancelButton;
    },
    getSubmitButtons: ()=>{
        return submitButtons;
    },
    getCheckboxField: ()=>{
        return tickBoxField;
    }
};
const genericAlert = (title, msg)=>{
    AlertDialog.show(title, msg, null, "Ok", [
        null,
        null
    ], null, null).then((res)=>console.log(res)).catch((e)=>console.error(e));
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j4ZwK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "changeExtension", ()=>changeExtension);
function changeExtension(filename, ext) {
    const array = filename.split(".");
    array[array.length - 1] = ext;
    return array.join(".");
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3xNjK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "wait", ()=>wait);
function wait(ms) {
    let now = Date.now();
    const end = now + ms;
    while(now < end)now = Date.now();
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"daUmi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "selectedWallpaper", ()=>selectedWallpaper);
parcelHelpers.export(exports, "color", ()=>color);
parcelHelpers.export(exports, "wallpapersList", ()=>wallpapersList);
parcelHelpers.export(exports, "fetchWallpapersList", ()=>fetchWallpapersList);
parcelHelpers.export(exports, "setWallpaper", ()=>setWallpaper);
parcelHelpers.export(exports, "highlightSetWallpaper", ()=>highlightSetWallpaper);
parcelHelpers.export(exports, "changeWallpaper", ()=>changeWallpaper);
parcelHelpers.export(exports, "getWallpaperDetails", ()=>getWallpaperDetails);
var _colorsJs = require("./colors.js");
var _constantsJs = require("./constants.js");
var _loadPreferencesJs = require("./load_preferences.js");
let selectedWallpaper;
let color;
let wallpapersList = [];
function fetchWallpapersList() {
    // Add wallpapers to HTML
    fetch((0, _constantsJs.WALLPAPERS_URL) + "wallpapers_list.json").then((response)=>{
        response.text().then((text)=>{
            wallpapersList = JSON.parse(text);
            resolveWallpapers();
            populateWallpapersInDOM();
            highlightSetWallpaper();
        });
    }).catch((e)=>{
        console.log(e);
        window.open("./pages/error", "_self");
    });
}
function setWallpaper(fileName, color) {
    selectedWallpaper = fileName;
    const overlay = document.getElementById("overlay");
    // console.log('test ' + overlay.style.backdropFilter);
    overlay.style.backdropFilter = "blur(1em)";
    const temp = new Image();
    temp.src = (0, _constantsJs.WALLPAPERS_URL) + fileName;
    temp.onload = (e)=>{
        applyWallpaper(selectedWallpaper);
        localStorage.setItem("wallpaper", selectedWallpaper);
        (0, _loadPreferencesJs.applyPreferences)();
    };
    (0, _colorsJs.changeGlow)(color);
    (0, _colorsJs.changeTextAccentColor)(color);
    (0, _colorsJs.changeSelectionColor)(color);
    const inputThumb = fileName.split(".").join("-thumb.");
    applyWallpaper(inputThumb);
}
function applyWallpaper(input) {
    document.body.style.backgroundImage = "url(" + (0, _constantsJs.WALLPAPERS_URL) + input + ")";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";
}
function highlightSetWallpaper() {
    const availableWallpapers = document.getElementsByClassName("thumb-group");
    for (const n of availableWallpapers){
        const thumbnail = n.getElementsByClassName("thumbnail")[0];
        const title = n.getElementsByClassName("thumb-title")[0];
        n.classList.add("animate");
        if (thumbnail.src.replace("-thumb", "").includes(selectedWallpaper)) {
            title.style.opacity = "1";
            n.classList.remove("animate");
            n.classList.add("highlighted");
        } else {
            title.style.opacity = "0";
            n.classList.add("animate");
            n.classList.remove("highlighted");
        }
    }
}
function changeWallpaper(event) {
    event.stopPropagation();
    let selection = event.target.title;
    if (!selection) selection = event.target.childNodes[1].title;
    // console.log("clicks " + selection + event.target.childNodes[1].title);
    const wall = getWallpaperDetails(selection);
    setWallpaper(wall[0], wall[1]);
    highlightSetWallpaper();
}
function getWallpaperDetails(title) {
    const wallpaper = wallpapersList.filter((item)=>{
        return item.title == title;
    })[0].file;
    const color = wallpapersList.filter((item)=>{
        return item.title == title;
    })[0].color[1];
    return [
        wallpaper,
        color
    ];
}
function resolveWallpapers() {
    selectedWallpaper = localStorage.getItem("wallpaper");
    color = wallpapersList.filter((item)=>{
        return item.file == selectedWallpaper;
    })[0].color[1];
    setWallpaper(selectedWallpaper, color);
}
function populateWallpapersInDOM() {
    const bar = document.getElementById("wallpapers");
    for (const n of wallpapersList){
        let input = n.file;
        input = input.split(".").join("-thumb.");
        const thumb = document.createElement("div");
        thumb.className = "thumb-group";
        thumb.setAttribute("onclick", "changeWallpaper(event)");
        thumb.setAttribute("onkeypress", "click_to_enter(event)");
        thumb.setAttribute("tabindex", "3");
        const div = document.createElement("div");
        div.innerHTML = n.title;
        div.className = "thumb-title";
        thumb.appendChild(div);
        const img = document.createElement("img");
        img.src = (0, _constantsJs.WALLPAPERS_URL) + input;
        img.className = "thumbnail";
        img.title = n.title;
        img.setAttribute("draggable", "false");
        thumb.appendChild(img);
        bar.appendChild(thumb);
    }
}

},{"./colors.js":"9bVGN","./constants.js":"3zOJv","./load_preferences.js":"7AOSo","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9bVGN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "changeGlow", ()=>changeGlow);
parcelHelpers.export(exports, "changeTextAccentColor", ()=>changeTextAccentColor);
parcelHelpers.export(exports, "changeSelectionColor", ()=>changeSelectionColor);
function changeGlow(color, opacity) {
    const glowOverlay = document.getElementById("gradient_overlay");
    const wallpapersRollOverlay = document.getElementById("wallpapers");
    const glowSetting = localStorage.getItem("glow");
    if (opacity != null) {
        if (glowSetting != "1") glowOverlay.style.opacity = opacity;
    }
    if (color != null) {
        wallpapersRollOverlay.style.background = `linear-gradient(to top, rgb(${color}), 50%, #fbd3e900)`;
        glowOverlay.style.background = `linear-gradient(to top, rgb(${color}), 50%, #fbd3e900)`;
    }
}
function changeTextAccentColor(color) {
    const i = document.getElementsByClassName("has-shadow");
    for(let n = 0; n < i.length; n++)i[n].style.textShadow = `4px 4px 0 rgba(${color},.85), 6px 6px 0px black`;
}
function changeSelectionColor(color) {
    document.documentElement.style.setProperty("--selection-color", `rgba(${color}, .5)`);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hEGZg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "headingStyles", ()=>headingStyles);
const headingStyles = [
    "default-text-style",
    "brush-text-style-1",
    "brush-text-style-2",
    "brush-text-style-3"
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"drpmR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cliCheck", ()=>cliCheck);
parcelHelpers.export(exports, "cliParse", ()=>cliParse);
var _constantsJs = require("./constants.js");
var _preferencesJs = require("./preferences.js");
var _stringsJs = require("./strings.js");
var _utilsJs = require("./utils.js");
var _alertDialogJs = require("./utils/alertDialog.js");
var _downloadFileJs = require("./utils/downloadFile.js");
function cliCheck(input) {
    // var input = getSearchTerm().value;
    if (input.startsWith("--")) return true;
    return false;
}
function parseDL(url) {
    fetch(`https://casamia.cambo.in/api/?url=${url}`).then((results)=>{
        return results.json();
    }).then((res)=>{
        const download = confirm("Download video?");
        if (download) (0, _downloadFileJs.downloadFile)(res.url, "CasaMia_Downloader.mp4");
        console.log(res.url);
    });
}
function searchViaCli(url, searchTerm) {
    let searchQuery = searchTerm.substr(4);
    searchQuery = searchQuery.split(",");
    searchQuery.forEach((value)=>{
        // value = encodeURIComponent(value);
        const o = window.open(`${url}${value}`, "_blank");
        if (o == null) {
            (0, _alertDialogJs.genericAlert)("Information", "Allow pop-ups for this feature to work properly.");
            return;
        }
    });
}
function cliParse(input) {
    const forBatchSearch = input.toLowerCase();
    input = input.split("--").join("");
    input = input.split(" ");
    switch(input[0].toLowerCase()){
        case "help":
            window.open(`/pages/help/index.html`, "_self");
            break;
        case "reset":
            if (input[1] == "bookmarks") (0, _preferencesJs.resetBookmarks)();
            else if (input[1] == "all") (0, _preferencesJs.resetAll)();
            else (0, _alertDialogJs.genericAlert)("Error", (0, _stringsJs.cliUnexpectedCmdText));
            break;
        case "fetch":
            if (input[1] == "default") (0, _utilsJs.fetchBookmarks)();
            else (0, _alertDialogJs.genericAlert)("Error", (0, _stringsJs.cliUnexpectedCmdText));
            break;
        case "dl":
            if (input[1]) parseDL(input[1]);
            else (0, _alertDialogJs.genericAlert)("Failed", `Enter a valid YT address`);
            break;
        case "clock":
            window.open(`./pages/clock`, "_self");
            break;
        case "count":
            window.open(`./pages/countdown`, "_self");
            break;
        case "g":
            searchViaCli((0, _constantsJs.GOOGLE_SEARCH_DOMAIN), forBatchSearch);
            break;
        case "b":
            searchViaCli((0, _constantsJs.BING_SEARCH_DOMAIN), forBatchSearch);
            break;
        case "d":
            searchViaCli((0, _constantsJs.DUCKDUCKGO_SEARCH_DOMAIN), forBatchSearch);
            break;
        default:
            (0, _alertDialogJs.genericAlert)("Error", (0, _stringsJs.cliUnexpectedCmdText));
    }
}

},{"./constants.js":"3zOJv","./preferences.js":"1jF2k","./strings.js":"d2N26","./utils.js":"54PwB","./utils/alertDialog.js":"fZUTj","./utils/downloadFile.js":"cMakn","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cMakn":[function(require,module,exports) {
// export const downloadFile = (path, filename) => {
//     // Create a new link
//     const anchor = document.createElement('a');
//     anchor.href = path;
//     anchor.download = filename;
//     // Append to the DOM
//     document.body.appendChild(anchor);
//     // Trigger `click` event
//     anchor.click();
//     // Remove element from DOM
//     document.body.removeChild(anchor);
// };
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "downloadFile", ()=>downloadFile);
function downloadFile(url) {
    // console.log(WALLPAPERS_URL + selectedWallpaper);
    const element = document.createElement("a");
    element.setAttribute("href", url);
    element.setAttribute("download", "CasaMia-Downloaer");
    element.target = "_blank";
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
/* alert(
  "If the download doesn't start, disable the pop-up blocker extensions."
); */ }

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5jcSi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Notify", ()=>Notify);
const notifyModalContainer = document.getElementById("notifyContainer");
let modalCancelButton;
let notify;
const showNotifyDialog = (description, ms = "5000", onClick = null)=>{
    const id = Date.now();
    notify = document.getElementById(`notifyModal-${id}`);
    if (notify) notify.parentNode.remove();
    notifyModalContainer.insertAdjacentHTML("afterbegin", `
		<div id="notifyModal-${id}" class="notifyModal">
			<div class="notifyDescriptionContainer">
				<h3 id="notifyDescription-${id}" class="notifyDescription">
					${description}
				</h3>
				<hr id="notifyLoader-${id}" class="notifyLoader">
			</div>	
			<button id="notifyDialogCancelButton-${id}" class="button tinyButton">
				x
			</button>
		</div>
	`);
    const notifyLoader = document.getElementById(`notifyLoader-${id}`);
    notify = document.getElementById(`notifyModal-${id}`);
    if (onClick) notify.addEventListner("click", onClick);
    const closeNotification = (event)=>{
        if (onClick) notify.removeEventListner("click", onClick);
        modalCancelButton.removeEventListener("click", closeNotification);
        event.target.parentNode.remove();
    };
    modalCancelButton = document.getElementById(`notifyDialogCancelButton-${id}`);
    modalCancelButton.addEventListener("click", closeNotification);
    setTimeout(()=>{
        const close = modalCancelButton;
        setTimeout(()=>{
            close.click();
        }, ms);
        notifyLoader.style.transition = ms + "ms";
        notify.style.opacity = "1";
        notify.style.marginTop = "2em";
        notifyLoader.style.width = "0%";
    }, 50);
};
const Notify = {
    show: showNotifyDialog
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f1GmI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hideLoading", ()=>hideLoading);
parcelHelpers.export(exports, "displayLoading", ()=>displayLoading);
let previousClick = null;
function hideLoading() {
    if (previousClick) previousClick.classList.toggle("loader");
    previousClick = null;
}
function displayLoading(event) {
    // console.log(event);
    event.stopPropagation();
    // event.preventDefault();
    hideLoading();
    const click = event.target;
    previousClick = click;
    click.classList.toggle("loader");
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2LPAC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "askUserName", ()=>askUserName);
parcelHelpers.export(exports, "preOnboarding", ()=>preOnboarding);
var _constantsJs = require("./constants.js");
var _loadPreferencesJs = require("./load_preferences.js");
var _preferencesJs = require("./preferences.js");
var _stringsJs = require("./strings.js");
var _inputDialogJs = require("./utils/inputDialog.js");
var _enableSubmitButtonJs = require("./utils/enableSubmitButton.js");
function askUserName() {
    let userName = localStorage.getItem("userName");
    if (userName) {
        (0, _inputDialogJs.InputDialog).show("Update your name", (0, _stringsJs.updateUserNameText), [
            "Change name to"
        ], "Update", "Cancel", null, [
            (0, _enableSubmitButtonJs.enableSubmitButton),
            null
        ], ()=>{
            (0, _inputDialogJs.InputDialog).getInputFields()[0].setAttribute("maxlength", 17);
            (0, _inputDialogJs.InputDialog).getInputFields()[0].value = userName;
        }).then((res)=>{
            userName = res.inputValues[0];
            localStorage.setItem("userName", userName);
            (0, _loadPreferencesJs.updateUserNamePreview)();
            (0, _preferencesJs.refreshGreeting)();
            return;
        }).catch((e)=>{
            console.error(e);
            return;
        });
        return;
    }
    if (!userName) {
        const onBoardingInProgress = (0, _inputDialogJs.InputDialog).show("Welcome to Casa Mia", `Hi! We are so excited to see you here.
            Please fill out the following details before moving forward. `, [
            `Your name`
        ], "Proceed", null, null, [
            (0, _enableSubmitButtonJs.enableSubmitButton),
            null
        ], ()=>{
            (0, _inputDialogJs.InputDialog).getInputFields()[0].setAttribute("maxlength", 17);
        });
        onBoardingInProgress.then((res)=>{
            userName = res.inputValues[0];
            localStorage.setItem("userName", userName);
            localStorage.setItem("onBoarding", "1");
            return;
        }).catch((e)=>{
            console.error(e);
            return;
        });
        return onBoardingInProgress;
    }
}
function preOnboarding() {
    const onBoardingInProgress = askUserName();
    localStorage.setItem("onBoarding", "0");
    localStorage.setItem("advDropdownValues", JSON.stringify((0, _constantsJs.DEF_PREF)));
    localStorage.setItem("wallpaper", (0, _constantsJs.DEF_WALLPAPER));
    localStorage.setItem("autocompleteDatabase", (0, _constantsJs.SAMPLE_AUTOFILL));
    localStorage.setItem("selected-widget-style", "widget-1");
    return onBoardingInProgress;
}

},{"./constants.js":"3zOJv","./load_preferences.js":"7AOSo","./preferences.js":"1jF2k","./strings.js":"d2N26","./utils/inputDialog.js":"2AgXt","./utils/enableSubmitButton.js":"eMR8Q","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7Eiyg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "saveDropdownPositions", ()=>saveDropdownPositions);
var _loadPreferencesJs = require("./load_preferences.js");
function saveDropdownPositions() {
    const select = document.getElementsByTagName("select");
    const dropdownPositions = {};
    for (const i of select)dropdownPositions[i.id] = i.value;
    localStorage.setItem("advDropdownValues", JSON.stringify(dropdownPositions));
    (0, _loadPreferencesJs.applyPreferences)();
}
 // export function saveButtonValues() {
 //     const previews = document.getElementsByClassName('custom-button');
 //     const buttonPreviews = {};
 //     for (const i of previews) {
 //         buttonPreviews[i.id] = i.value;
 //     };
 //     localStorage
 //         .setItem('advButtonPreviews', JSON.stringify(buttonPreviews));
 //     loadButtonPreviews();
 // };
 // export function loadButtonPreviews() {
 //     let loadedFromStorage = localStorage.getItem('advButtonPreviews');
 //     if (!loadedFromStorage) return;
 //     loadedFromStorage =
 //         Object.entries(JSON.parse(loadedFromStorage));
 //     for (const i of loadedFromStorage) {
 //         document.getElementById(i[0] + '-preview').textContent = i[1];
 //     }
 // };

},{"./load_preferences.js":"7AOSo","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8r7xk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getLastUpdated", ()=>getLastUpdated);
function getLastUpdated(id) {
    fetch("https://api.github.com/repos/lscambo13/casamia/commits/HEAD").then((response)=>{
        response.json().then((response)=>{
            const date = new Date(response.commit.committer.date);
            let time = date.toISOString();
            time = time.slice(0, time.length - 5);
            time = time.replaceAll("T", "-").replaceAll(":", "").replaceAll("-", ".");
            const element = document.getElementById(id);
            element.innerHTML = `Version ${time}`;
        }).catch((e)=>{
            console.error("getLastUpdated", e);
        });
    }).catch((e)=>{
        console.error("getLastUpdated", e);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dlwQh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "blurLevel", ()=>blurLevel);
function blurLevel(int) {
    document.documentElement.style.setProperty("--blur-one-em", `blur(${int}em)`);
    document.documentElement.style.setProperty("--blur-one-px", `blur(${int}px)`);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bmV05":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "pauseSnaowfall", ()=>pauseSnaowfall);
parcelHelpers.export(exports, "isItChristmas", ()=>isItChristmas);
let pause = false;
function pauseSnaowfall(boolean) {
    pause = boolean;
    isItChristmas();
}
function isItChristmas() {
    let date = new Date();
    if (date.getMonth() == 11 && date.getDate() > 17 && date.getDate() < 32) // console.log(date.getMonth() == 11, date.getDate() > 17, date.getDate() < 32)
    letItSnow();
}
function letItSnow() {
    pause = true;
    //canvas init
    var canvas = document.getElementById("canvasFar");
    var ctx = canvas.getContext("2d");
    //canvas dimensions
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    //snowflake particles
    var mp = 50; //max particles
    var particles = [];
    for(var i = 0; i < mp; i++)particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 4 + 1,
        d: Math.random() * mp //density
    });
    //Lets draw the flakes
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    function draw() {
        // let tStart = Date.now()
        ctx.clearRect(0, 0, W, H);
        ctx.beginPath();
        for(var i = 0; i < mp; i++){
            var p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        update();
        if (!pause) window.requestAnimationFrame(draw);
    // console.log(Date.now() - tStart)
    // console.log('draw')
    }
    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    // var angle = 0;
    function update() {
        // console.log('update main')
        // angle += 0.01;
        for(var i = 0; i < mp; i++){
            // console.log('update loop')
            var p = particles[i];
            //Updating X and Y coordinates
            //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
            //Every particle has its own density which can be used to make the downward movement different for each flake
            //Lets make it more random by adding in the radius
            p.y += Math.cos(p.d) + 1 + p.r / 10;
            // p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
            // p.x += Math.sin(angle) * 2;
            //Sending flakes back from the top when it exits
            //Lets make it a bit more organic and let flakes enter from the left and right also.
            if (p.x > W + 5 || p.x < -5 || p.y > H) {
                if (i % 3 > 0) particles[i] = {
                    x: Math.random() * W,
                    y: -10,
                    r: p.r,
                    d: p.d
                };
            }
        }
    }
    canvas.style.display = "block";
    pause = false;
    window.requestAnimationFrame(draw);
//animation loop
// setInterval(draw, 60);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ickwn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isTouchDevice", ()=>isTouchDevice);
function isTouchDevice() {
    // return (('ontouchstart' in window) ||
    // 	(navigator.maxTouchPoints > 0) ||
    // 	(navigator.msMaxTouchPoints > 0));
    if (window.matchMedia("(hover: none)").matches) return true;
    else return false;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["lkfBx","6OR0a"], "6OR0a", "parcelRequire7e1c")

//# sourceMappingURL=index.f282538f.js.map
