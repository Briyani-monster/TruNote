// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/NotesView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var NotesView = /*#__PURE__*/function () {
  function NotesView(root) {
    var _this = this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        onNoteSelect = _ref.onNoteSelect,
        onNoteAdd = _ref.onNoteAdd,
        onNoteEdit = _ref.onNoteEdit,
        onNoteDelete = _ref.onNoteDelete;

    _classCallCheck(this, NotesView);

    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteDelete = onNoteDelete;
    this.onNoteEdit = onNoteEdit;
    this.root.innerHTML = "<div class=\"notes__sidebar\">\n                <button class=\"notes__add\" type=\"button\">Add Note</button>\n                <div class=\"notes__list\"></div>\n            </div>\n            <div class=\"notes__preview\">\n                <input class=\"notes__title\" type=\"text\" placeholder=\"Title...\">\n                <textarea class=\"notes__body\" placeholder=\"Take Note\"></textarea>\n            </div>";
    var btnAddNote = this.root.querySelector(".notes__add");
    var inpTitle = this.root.querySelector(".notes__title");
    var inpBody = this.root.querySelector(".notes__body");
    btnAddNote.addEventListener("click", function () {
      _this.onNoteAdd();
    });
    [inpTitle, inpBody].forEach(function (inputField) {
      inputField.addEventListener("blur", function () {
        var updatedTitle = inpTitle.value.trim();
        var updatedBody = inpBody.value.trim();

        _this.onNoteEdit(updatedTitle, updatedBody);
      });
    }); // TODO:hide the note view from todo

    this.updateNotePreviewVisiblity(false);
  }

  _createClass(NotesView, [{
    key: "_createListItemHTML",
    value: function _createListItemHTML(id, title, body, updated) {
      var MAX_BODY_LENGTH = 60;
      return "<div class=\"notes__list-item\" data-note-id=\"".concat(id, "\">\n      <div class=\"notes__small-title\">").concat(title, "</div> \n      <div class=\"notes__small-body\">").concat(body.substring(0, MAX_BODY_LENGTH)).concat(body.length > MAX_BODY_LENGTH ? "..." : "", "</div> \n      <div class=\"notes__small-updated\">").concat(updated.toLocaleString(undefined, {
        dateStyle: "full",
        timeStyle: "short"
      }), "</div> \n      </div>");
    } //   local storage notes

  }, {
    key: "updateNoteList",
    value: function updateNoteList(notes) {
      var _this2 = this;

      var notesListContainer = this.root.querySelector(".notes__list"); // Empty list

      notesListContainer.innerHTML = "";

      var _iterator = _createForOfIteratorHelper(notes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var note = _step.value;

          var html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

          notesListContainer.insertAdjacentHTML("beforeend", html);
        } //Add select/delete events for each list item

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      notesListContainer.querySelectorAll(".notes__list-item").forEach(function (noteListItem) {
        //   selecting by one click
        noteListItem.addEventListener("click", function () {
          _this2.onNoteSelect(noteListItem.dataset.noteId);
        }); // deleting by double click

        noteListItem.addEventListener("dblclick", function () {
          var doDelete = confirm("are you sure You want to delete this note?");

          if (doDelete) {
            _this2.onNoteDelete(noteListItem.dataset.noteId);
          }
        });
      });
    }
  }, {
    key: "updateActiveNote",
    value: function updateActiveNote(note) {
      this.root.querySelector(".notes__title").value = note.title;
      this.root.querySelector(".notes__body").value = note.body;
      this.root.querySelectorAll(".notes__list-item").forEach(function (noteListItem) {
        noteListItem.classList.remove("notes__list-item--selected");
      });
      this.root.querySelector(".notes__list-item[data-note-id=\"".concat(note.id, "\"]")).classList.add("notes__list-item--selected");
    }
  }, {
    key: "updateNotePreviewVisiblity",
    value: function updateNotePreviewVisiblity(visible) {
      this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
  }]);

  return NotesView;
}();

exports.default = NotesView;
},{}],"src/js/NotesAPI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var NotesAPI = /*#__PURE__*/function () {
  function NotesAPI() {
    _classCallCheck(this, NotesAPI);
  }

  _createClass(NotesAPI, null, [{
    key: "getAllNotes",
    value: function getAllNotes() {
      var notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]"); // returning notes and sorting according to dates

      return notes.sort(function (a, b) {
        return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
      });
    }
  }, {
    key: "saveNote",
    value: function saveNote(noteToSave) {
      var notes = NotesAPI.getAllNotes(); // when id is same means existing one

      var existing = notes.find(function (note) {
        return note.id == noteToSave.id;
      }); // editing and update

      if (existing) {
        existing.title = noteToSave.title;
        existing.body = noteToSave.body;
        existing.updated = new Date().toISOString();
      } // creating new note
      else {
        noteToSave.id = Math.floor(Math.random() * 1000000);
        noteToSave.updated = new Date().toISOString();
        notes.push(noteToSave);
      }

      localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    } //   delete note functionality

  }, {
    key: "deleteNote",
    value: function deleteNote(id) {
      var notes = NotesAPI.getAllNotes();
      var newNote = notes.filter(function (note) {
        return note.id != id;
      });
      localStorage.setItem("notesapp-notes", JSON.stringify(newNote));
    }
  }]);

  return NotesAPI;
}();

exports.default = NotesAPI;
},{}],"src/js/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NotesView = _interopRequireDefault(require("./NotesView.js"));

var _NotesAPI = _interopRequireDefault(require("./NotesAPI.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// tieing everything together
var App = /*#__PURE__*/function () {
  function App(root) {
    _classCallCheck(this, App);

    this.notes = [];
    this.activeNote = null;
    this.view = new _NotesView.default(root, this._handlers());

    this._refreshNotes();
  }

  _createClass(App, [{
    key: "_refreshNotes",
    value: function _refreshNotes() {
      var notes = _NotesAPI.default.getAllNotes();

      this._setNotes(notes);

      if (notes.length > 0) {
        this._setActiveNote(notes[0]);
      }
    }
  }, {
    key: "_setNotes",
    value: function _setNotes(notes) {
      this.notes = notes;
      this.view.updateNoteList(notes);
      this.view.updateNotePreviewVisiblity(notes.length > 0);
    }
  }, {
    key: "_setActiveNote",
    value: function _setActiveNote(note) {
      this.activeNote = note;
      this.view.updateActiveNote(note);
    }
  }, {
    key: "_handlers",
    value: function _handlers() {
      var _this = this;

      return {
        onNoteSelect: function onNoteSelect(noteId) {
          var selectedNote = _this.notes.find(function (note) {
            return note.id == noteId;
          });

          _this._setActiveNote(selectedNote);
        },
        onNoteAdd: function onNoteAdd() {
          var newNote = {
            title: "",
            body: ""
          };

          _NotesAPI.default.saveNote(newNote);

          _this._refreshNotes();
        },
        onNoteEdit: function onNoteEdit(title, body) {
          _NotesAPI.default.saveNote({
            id: _this.activeNote.id,
            title: title,
            body: body
          });

          _this._refreshNotes();
        },
        onNoteDelete: function onNoteDelete(noteId) {
          _NotesAPI.default.deleteNote(noteId);

          _this._refreshNotes();
        }
      };
    }
  }]);

  return App;
}();

exports.default = App;
},{"./NotesView.js":"src/js/NotesView.js","./NotesAPI.js":"src/js/NotesAPI.js"}],"src/js/main.js":[function(require,module,exports) {
"use strict";

var _App = _interopRequireDefault(require("./App.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = document.getElementById("app");
var app = new _App.default(root);
},{"./App.js":"src/js/App.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53788" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/main.js"], null)
//# sourceMappingURL=/main.c48f6146.js.map