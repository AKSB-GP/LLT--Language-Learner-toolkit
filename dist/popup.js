"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x2)(function(x2) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x2 + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/sql.js/dist/sql-wasm-browser.js
  var require_sql_wasm_browser = __commonJS({
    "node_modules/sql.js/dist/sql-wasm-browser.js"(exports, module) {
      var initSqlJsPromise = void 0;
      var initSqlJs2 = function(moduleConfig) {
        if (initSqlJsPromise) {
          return initSqlJsPromise;
        }
        initSqlJsPromise = new Promise(function(resolveModule, reject) {
          var Module = typeof moduleConfig !== "undefined" ? moduleConfig : {};
          var originalOnAbortFunction = Module["onAbort"];
          Module["onAbort"] = function(errorThatCausedAbort) {
            reject(new Error(errorThatCausedAbort));
            if (originalOnAbortFunction) {
              originalOnAbortFunction(errorThatCausedAbort);
            }
          };
          Module["postRun"] = Module["postRun"] || [];
          Module["postRun"].push(function() {
            resolveModule(Module);
          });
          module = void 0;
          var k;
          k ||= typeof Module != "undefined" ? Module : {};
          var aa = !!globalThis.window, ba = !!globalThis.WorkerGlobalScope;
          k.onRuntimeInitialized = function() {
            function a(f, l) {
              switch (typeof l) {
                case "boolean":
                  bc(f, l ? 1 : 0);
                  break;
                case "number":
                  cc(f, l);
                  break;
                case "string":
                  dc(f, l, -1, -1);
                  break;
                case "object":
                  if (null === l) eb(f);
                  else if (null != l.length) {
                    var n = ca(l.length);
                    m.set(l, n);
                    ec2(f, n, l.length, -1);
                    da(n);
                  } else ua(f, "Wrong API use : tried to return a value of an unknown type (" + l + ").", -1);
                  break;
                default:
                  eb(f);
              }
            }
            function b(f, l) {
              for (var n = [], p = 0; p < f; p += 1) {
                var r = t(l + 4 * p, "i32"), v = fc(r);
                if (1 === v || 2 === v) r = gc(r);
                else if (3 === v) r = hc(r);
                else if (4 === v) {
                  v = r;
                  r = ic(v);
                  v = jc(v);
                  for (var J = new Uint8Array(r), I = 0; I < r; I += 1) J[I] = m[v + I];
                  r = J;
                } else r = null;
                n.push(r);
              }
              return n;
            }
            function c(f, l) {
              this.Qa = f;
              this.db = l;
              this.Oa = 1;
              this.yb = [];
            }
            function d(f, l) {
              this.db = l;
              this.ob = ea(f);
              if (null === this.ob) throw Error("Unable to allocate memory for the SQL string");
              this.ub = this.ob;
              this.gb = this.Fb = null;
            }
            function e(f) {
              this.filename = "dbfile_" + (4294967295 * Math.random() >>> 0);
              if (null != f) {
                var l = this.filename, n = "/", p = l;
                n && (n = "string" == typeof n ? n : fa(n), p = l ? ha(n + "/" + l) : n);
                l = ia(true, true);
                p = ja(
                  p,
                  l
                );
                if (f) {
                  if ("string" == typeof f) {
                    n = Array(f.length);
                    for (var r = 0, v = f.length; r < v; ++r) n[r] = f.charCodeAt(r);
                    f = n;
                  }
                  ka(p, l | 146);
                  n = ma(p, 577);
                  na(n, f, 0, f.length, 0);
                  oa(n);
                  ka(p, l);
                }
              }
              this.handleError(q(this.filename, g));
              this.db = t(g, "i32");
              hb(this.db);
              this.pb = {};
              this.Sa = {};
            }
            var g = y(4), h = k.cwrap, q = h("sqlite3_open", "number", ["string", "number"]), w = h("sqlite3_close_v2", "number", ["number"]), u = h("sqlite3_exec", "number", ["number", "string", "number", "number", "number"]), x2 = h("sqlite3_changes", "number", ["number"]), D = h(
              "sqlite3_prepare_v2",
              "number",
              ["number", "string", "number", "number", "number"]
            ), ib = h("sqlite3_sql", "string", ["number"]), lc2 = h("sqlite3_normalized_sql", "string", ["number"]), jb = h("sqlite3_prepare_v2", "number", ["number", "number", "number", "number", "number"]), mc = h("sqlite3_bind_text", "number", ["number", "number", "number", "number", "number"]), kb = h("sqlite3_bind_blob", "number", ["number", "number", "number", "number", "number"]), nc = h("sqlite3_bind_double", "number", ["number", "number", "number"]), oc = h("sqlite3_bind_int", "number", [
              "number",
              "number",
              "number"
            ]), pc = h("sqlite3_bind_parameter_index", "number", ["number", "string"]), qc = h("sqlite3_step", "number", ["number"]), rc = h("sqlite3_errmsg", "string", ["number"]), sc = h("sqlite3_column_count", "number", ["number"]), tc = h("sqlite3_data_count", "number", ["number"]), uc = h("sqlite3_column_double", "number", ["number", "number"]), lb = h("sqlite3_column_text", "string", ["number", "number"]), vc = h("sqlite3_column_blob", "number", ["number", "number"]), wc = h("sqlite3_column_bytes", "number", ["number", "number"]), xc = h(
              "sqlite3_column_type",
              "number",
              ["number", "number"]
            ), yc = h("sqlite3_column_name", "string", ["number", "number"]), zc = h("sqlite3_reset", "number", ["number"]), Ac = h("sqlite3_clear_bindings", "number", ["number"]), Bc = h("sqlite3_finalize", "number", ["number"]), mb = h("sqlite3_create_function_v2", "number", "number string number number number number number number number".split(" ")), fc = h("sqlite3_value_type", "number", ["number"]), ic = h("sqlite3_value_bytes", "number", ["number"]), hc = h("sqlite3_value_text", "string", ["number"]), jc = h(
              "sqlite3_value_blob",
              "number",
              ["number"]
            ), gc = h("sqlite3_value_double", "number", ["number"]), cc = h("sqlite3_result_double", "", ["number", "number"]), eb = h("sqlite3_result_null", "", ["number"]), dc = h("sqlite3_result_text", "", ["number", "string", "number", "number"]), ec2 = h("sqlite3_result_blob", "", ["number", "number", "number", "number"]), bc = h("sqlite3_result_int", "", ["number", "number"]), ua = h("sqlite3_result_error", "", ["number", "string", "number"]), nb = h("sqlite3_aggregate_context", "number", ["number", "number"]), hb = h(
              "RegisterExtensionFunctions",
              "number",
              ["number"]
            ), ob = h("sqlite3_update_hook", "number", ["number", "number", "number"]);
            c.prototype.bind = function(f) {
              if (!this.Qa) throw "Statement closed";
              this.reset();
              return Array.isArray(f) ? this.Wb(f) : null != f && "object" === typeof f ? this.Xb(f) : true;
            };
            c.prototype.step = function() {
              if (!this.Qa) throw "Statement closed";
              this.Oa = 1;
              var f = qc(this.Qa);
              switch (f) {
                case 100:
                  return true;
                case 101:
                  return false;
                default:
                  throw this.db.handleError(f);
              }
            };
            c.prototype.Pb = function(f) {
              null == f && (f = this.Oa, this.Oa += 1);
              return uc(this.Qa, f);
            };
            c.prototype.hc = function(f) {
              null == f && (f = this.Oa, this.Oa += 1);
              f = lb(this.Qa, f);
              if ("function" !== typeof BigInt) throw Error("BigInt is not supported");
              return BigInt(f);
            };
            c.prototype.mc = function(f) {
              null == f && (f = this.Oa, this.Oa += 1);
              return lb(this.Qa, f);
            };
            c.prototype.getBlob = function(f) {
              null == f && (f = this.Oa, this.Oa += 1);
              var l = wc(this.Qa, f);
              f = vc(this.Qa, f);
              for (var n = new Uint8Array(l), p = 0; p < l; p += 1) n[p] = m[f + p];
              return n;
            };
            c.prototype.get = function(f, l) {
              l = l || {};
              null != f && this.bind(f) && this.step();
              f = [];
              for (var n = tc(this.Qa), p = 0; p < n; p += 1) switch (xc(this.Qa, p)) {
                case 1:
                  var r = l.useBigInt ? this.hc(p) : this.Pb(p);
                  f.push(r);
                  break;
                case 2:
                  f.push(this.Pb(p));
                  break;
                case 3:
                  f.push(this.mc(p));
                  break;
                case 4:
                  f.push(this.getBlob(p));
                  break;
                default:
                  f.push(null);
              }
              return f;
            };
            c.prototype.Db = function() {
              for (var f = [], l = sc(this.Qa), n = 0; n < l; n += 1) f.push(yc(this.Qa, n));
              return f;
            };
            c.prototype.Ob = function(f, l) {
              f = this.get(f, l);
              l = this.Db();
              for (var n = {}, p = 0; p < l.length; p += 1) n[l[p]] = f[p];
              return n;
            };
            c.prototype.lc = function() {
              return ib(this.Qa);
            };
            c.prototype.ic = function() {
              return lc2(this.Qa);
            };
            c.prototype.Jb = function(f) {
              null != f && this.bind(f);
              this.step();
              return this.reset();
            };
            c.prototype.Lb = function(f, l) {
              null == l && (l = this.Oa, this.Oa += 1);
              f = ea(f);
              this.yb.push(f);
              this.db.handleError(mc(this.Qa, l, f, -1, 0));
            };
            c.prototype.Vb = function(f, l) {
              null == l && (l = this.Oa, this.Oa += 1);
              var n = ca(f.length);
              m.set(f, n);
              this.yb.push(n);
              this.db.handleError(kb(this.Qa, l, n, f.length, 0));
            };
            c.prototype.Kb = function(f, l) {
              null == l && (l = this.Oa, this.Oa += 1);
              this.db.handleError((f === (f | 0) ? oc : nc)(
                this.Qa,
                l,
                f
              ));
            };
            c.prototype.Yb = function(f) {
              null == f && (f = this.Oa, this.Oa += 1);
              kb(this.Qa, f, 0, 0, 0);
            };
            c.prototype.Mb = function(f, l) {
              null == l && (l = this.Oa, this.Oa += 1);
              switch (typeof f) {
                case "string":
                  this.Lb(f, l);
                  return;
                case "number":
                  this.Kb(f, l);
                  return;
                case "bigint":
                  this.Lb(f.toString(), l);
                  return;
                case "boolean":
                  this.Kb(f + 0, l);
                  return;
                case "object":
                  if (null === f) {
                    this.Yb(l);
                    return;
                  }
                  if (null != f.length) {
                    this.Vb(f, l);
                    return;
                  }
              }
              throw "Wrong API use : tried to bind a value of an unknown type (" + f + ").";
            };
            c.prototype.Xb = function(f) {
              var l = this;
              Object.keys(f).forEach(function(n) {
                var p = pc(l.Qa, n);
                0 !== p && l.Mb(f[n], p);
              });
              return true;
            };
            c.prototype.Wb = function(f) {
              for (var l = 0; l < f.length; l += 1) this.Mb(f[l], l + 1);
              return true;
            };
            c.prototype.reset = function() {
              this.Cb();
              return 0 === Ac(this.Qa) && 0 === zc(this.Qa);
            };
            c.prototype.Cb = function() {
              for (var f; void 0 !== (f = this.yb.pop()); ) da(f);
            };
            c.prototype.cb = function() {
              this.Cb();
              var f = 0 === Bc(this.Qa);
              delete this.db.pb[this.Qa];
              this.Qa = 0;
              return f;
            };
            d.prototype.next = function() {
              if (null === this.ob) return { done: true };
              null !== this.gb && (this.gb.cb(), this.gb = null);
              if (!this.db.db) throw this.Ab(), Error("Database closed");
              var f = pa(), l = y(4);
              qa(g);
              qa(l);
              try {
                this.db.handleError(jb(this.db.db, this.ub, -1, g, l));
                this.ub = t(l, "i32");
                var n = t(g, "i32");
                if (0 === n) return this.Ab(), { done: true };
                this.gb = new c(n, this.db);
                this.db.pb[n] = this.gb;
                return { value: this.gb, done: false };
              } catch (p) {
                throw this.Fb = z(this.ub), this.Ab(), p;
              } finally {
                ra(f);
              }
            };
            d.prototype.Ab = function() {
              da(this.ob);
              this.ob = null;
            };
            d.prototype.jc = function() {
              return null !== this.Fb ? this.Fb : z(this.ub);
            };
            "function" === typeof Symbol && "symbol" === typeof Symbol.iterator && (d.prototype[Symbol.iterator] = function() {
              return this;
            });
            e.prototype.Jb = function(f, l) {
              if (!this.db) throw "Database closed";
              if (l) {
                f = this.Gb(f, l);
                try {
                  f.step();
                } finally {
                  f.cb();
                }
              } else this.handleError(u(this.db, f, 0, 0, g));
              return this;
            };
            e.prototype.exec = function(f, l, n) {
              if (!this.db) throw "Database closed";
              var p = pa(), r = null, v = null, J = null;
              try {
                J = v = ea(f);
                var I = y(4);
                for (f = []; 0 !== t(J, "i8"); ) {
                  qa(g);
                  qa(I);
                  this.handleError(jb(this.db, J, -1, g, I));
                  var L = t(g, "i32");
                  J = t(I, "i32");
                  if (0 !== L) {
                    var G = null;
                    r = new c(L, this);
                    for (null != l && r.bind(l); r.step(); ) null === G && (G = { columns: r.Db(), values: [] }, f.push(G)), G.values.push(r.get(null, n));
                    r.cb();
                  }
                }
                return f;
              } catch (la) {
                throw r && r.cb(), la;
              } finally {
                v && da(v), ra(p);
              }
            };
            e.prototype.ec = function(f, l, n, p, r) {
              "function" === typeof l && (p = n, n = l, l = void 0);
              f = this.Gb(f, l);
              try {
                for (; f.step(); ) n(f.Ob(null, r));
              } finally {
                f.cb();
              }
              if ("function" === typeof p) return p();
            };
            e.prototype.Gb = function(f, l) {
              qa(g);
              this.handleError(D(this.db, f, -1, g, 0));
              f = t(g, "i32");
              if (0 === f) throw "Nothing to prepare";
              var n = new c(f, this);
              null != l && n.bind(l);
              return this.pb[f] = n;
            };
            e.prototype.pc = function(f) {
              return new d(f, this);
            };
            e.prototype.fc = function() {
              Object.values(this.pb).forEach(function(l) {
                l.cb();
              });
              Object.values(this.Sa).forEach(A);
              this.Sa = {};
              this.handleError(w(this.db));
              var f = sa(this.filename);
              this.handleError(q(this.filename, g));
              this.db = t(g, "i32");
              hb(this.db);
              return f;
            };
            e.prototype.close = function() {
              null !== this.db && (Object.values(this.pb).forEach(function(f) {
                f.cb();
              }), Object.values(this.Sa).forEach(A), this.Sa = {}, this.fb && (A(this.fb), this.fb = void 0), this.handleError(w(this.db)), ta("/" + this.filename), this.db = null);
            };
            e.prototype.handleError = function(f) {
              if (0 === f) return null;
              f = rc(this.db);
              throw Error(f);
            };
            e.prototype.kc = function() {
              return x2(this.db);
            };
            e.prototype.bc = function(f, l) {
              Object.prototype.hasOwnProperty.call(this.Sa, f) && (A(this.Sa[f]), delete this.Sa[f]);
              var n = va(function(p, r, v) {
                r = b(r, v);
                try {
                  var J = l.apply(null, r);
                } catch (I) {
                  ua(p, I, -1);
                  return;
                }
                a(p, J);
              }, "viii");
              this.Sa[f] = n;
              this.handleError(mb(
                this.db,
                f,
                l.length,
                1,
                0,
                n,
                0,
                0,
                0
              ));
              return this;
            };
            e.prototype.ac = function(f, l) {
              var n = l.init || function() {
                return null;
              }, p = l.finalize || function(L) {
                return L;
              }, r = l.step;
              if (!r) throw "An aggregate function must have a step function in " + f;
              var v = {};
              Object.hasOwnProperty.call(this.Sa, f) && (A(this.Sa[f]), delete this.Sa[f]);
              l = f + "__finalize";
              Object.hasOwnProperty.call(this.Sa, l) && (A(this.Sa[l]), delete this.Sa[l]);
              var J = va(function(L, G, la) {
                var V = nb(L, 1);
                Object.hasOwnProperty.call(v, V) || (v[V] = n());
                G = b(G, la);
                G = [v[V]].concat(G);
                try {
                  v[V] = r.apply(null, G);
                } catch (Dc) {
                  delete v[V], ua(L, Dc, -1);
                }
              }, "viii"), I = va(function(L) {
                var G = nb(L, 1);
                try {
                  var la = p(v[G]);
                } catch (V) {
                  delete v[G];
                  ua(L, V, -1);
                  return;
                }
                a(L, la);
                delete v[G];
              }, "vi");
              this.Sa[f] = J;
              this.Sa[l] = I;
              this.handleError(mb(this.db, f, r.length - 1, 1, 0, 0, J, I, 0));
              return this;
            };
            e.prototype.vc = function(f) {
              this.fb && (ob(this.db, 0, 0), A(this.fb), this.fb = void 0);
              if (!f) return this;
              this.fb = va(function(l, n, p, r, v) {
                switch (n) {
                  case 18:
                    l = "insert";
                    break;
                  case 23:
                    l = "update";
                    break;
                  case 9:
                    l = "delete";
                    break;
                  default:
                    throw "unknown operationCode in updateHook callback: " + n;
                }
                p = z(p);
                r = z(r);
                if (v > Number.MAX_SAFE_INTEGER) throw "rowId too big to fit inside a Number";
                f(l, p, r, Number(v));
              }, "viiiij");
              ob(this.db, this.fb, 0);
              return this;
            };
            c.prototype.bind = c.prototype.bind;
            c.prototype.step = c.prototype.step;
            c.prototype.get = c.prototype.get;
            c.prototype.getColumnNames = c.prototype.Db;
            c.prototype.getAsObject = c.prototype.Ob;
            c.prototype.getSQL = c.prototype.lc;
            c.prototype.getNormalizedSQL = c.prototype.ic;
            c.prototype.run = c.prototype.Jb;
            c.prototype.reset = c.prototype.reset;
            c.prototype.freemem = c.prototype.Cb;
            c.prototype.free = c.prototype.cb;
            d.prototype.next = d.prototype.next;
            d.prototype.getRemainingSQL = d.prototype.jc;
            e.prototype.run = e.prototype.Jb;
            e.prototype.exec = e.prototype.exec;
            e.prototype.each = e.prototype.ec;
            e.prototype.prepare = e.prototype.Gb;
            e.prototype.iterateStatements = e.prototype.pc;
            e.prototype["export"] = e.prototype.fc;
            e.prototype.close = e.prototype.close;
            e.prototype.handleError = e.prototype.handleError;
            e.prototype.getRowsModified = e.prototype.kc;
            e.prototype.create_function = e.prototype.bc;
            e.prototype.create_aggregate = e.prototype.ac;
            e.prototype.updateHook = e.prototype.vc;
            k.Database = e;
          };
          var wa = "./this.program", xa = globalThis.document?.currentScript?.src;
          ba && (xa = self.location.href);
          var ya = "", za, Aa;
          if (aa || ba) {
            try {
              ya = new URL(".", xa).href;
            } catch {
            }
            ba && (Aa = (a) => {
              var b = new XMLHttpRequest();
              b.open("GET", a, false);
              b.responseType = "arraybuffer";
              b.send(null);
              return new Uint8Array(b.response);
            });
            za = async (a) => {
              a = await fetch(a, { credentials: "same-origin" });
              if (a.ok) return a.arrayBuffer();
              throw Error(a.status + " : " + a.url);
            };
          }
          var Ba = console.log.bind(console), B = console.error.bind(console), Ca, Da = false, Ea, m, C, Fa, E, F, Ga, Ha, H;
          function Ia() {
            var a = Ja.buffer;
            m = new Int8Array(a);
            Fa = new Int16Array(a);
            C = new Uint8Array(a);
            new Uint16Array(a);
            E = new Int32Array(a);
            F = new Uint32Array(a);
            Ga = new Float32Array(a);
            Ha = new Float64Array(a);
            H = new BigInt64Array(a);
            new BigUint64Array(a);
          }
          function Ka(a) {
            k.onAbort?.(a);
            a = "Aborted(" + a + ")";
            B(a);
            Da = true;
            throw new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
          }
          var La;
          async function Ma(a) {
            if (!Ca) try {
              var b = await za(a);
              return new Uint8Array(b);
            } catch {
            }
            if (a == La && Ca) a = new Uint8Array(Ca);
            else if (Aa) a = Aa(a);
            else throw "both async and sync fetching of the wasm failed";
            return a;
          }
          async function Na(a, b) {
            try {
              var c = await Ma(a);
              return await WebAssembly.instantiate(c, b);
            } catch (d) {
              B(`failed to asynchronously prepare wasm: ${d}`), Ka(d);
            }
          }
          async function Oa(a) {
            var b = La;
            if (!Ca) try {
              var c = fetch(b, { credentials: "same-origin" });
              return await WebAssembly.instantiateStreaming(c, a);
            } catch (d) {
              B(`wasm streaming compile failed: ${d}`), B("falling back to ArrayBuffer instantiation");
            }
            return Na(b, a);
          }
          class Pa {
            name = "ExitStatus";
            constructor(a) {
              this.message = `Program terminated with exit(${a})`;
              this.status = a;
            }
          }
          var Qa = (a) => {
            for (; 0 < a.length; ) a.shift()(k);
          }, Ra = [], Sa = [], Ta = () => {
            var a = k.preRun.shift();
            Sa.push(a);
          }, K = 0, Ua = null;
          function t(a, b = "i8") {
            b.endsWith("*") && (b = "*");
            switch (b) {
              case "i1":
                return m[a];
              case "i8":
                return m[a];
              case "i16":
                return Fa[a >> 1];
              case "i32":
                return E[a >> 2];
              case "i64":
                return H[a >> 3];
              case "float":
                return Ga[a >> 2];
              case "double":
                return Ha[a >> 3];
              case "*":
                return F[a >> 2];
              default:
                Ka(`invalid type for getValue: ${b}`);
            }
          }
          var Va = true;
          function qa(a) {
            var b = "i32";
            b.endsWith("*") && (b = "*");
            switch (b) {
              case "i1":
                m[a] = 0;
                break;
              case "i8":
                m[a] = 0;
                break;
              case "i16":
                Fa[a >> 1] = 0;
                break;
              case "i32":
                E[a >> 2] = 0;
                break;
              case "i64":
                H[a >> 3] = BigInt(0);
                break;
              case "float":
                Ga[a >> 2] = 0;
                break;
              case "double":
                Ha[a >> 3] = 0;
                break;
              case "*":
                F[a >> 2] = 0;
                break;
              default:
                Ka(`invalid type for setValue: ${b}`);
            }
          }
          var Wa = new TextDecoder(), Xa = (a, b, c, d) => {
            c = b + c;
            if (d) return c;
            for (; a[b] && !(b >= c); ) ++b;
            return b;
          }, z = (a, b, c) => a ? Wa.decode(C.subarray(a, Xa(C, a, b, c))) : "", Ya = (a, b) => {
            for (var c = 0, d = a.length - 1; 0 <= d; d--) {
              var e = a[d];
              "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
            }
            if (b) for (; c; c--) a.unshift("..");
            return a;
          }, ha = (a) => {
            var b = "/" === a.charAt(0), c = "/" === a.slice(-1);
            (a = Ya(a.split("/").filter((d) => !!d), !b).join("/")) || b || (a = ".");
            a && c && (a += "/");
            return (b ? "/" : "") + a;
          }, Za = (a) => {
            var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
            a = b[0];
            b = b[1];
            if (!a && !b) return ".";
            b &&= b.slice(0, -1);
            return a + b;
          }, $a = (a) => a && a.match(/([^\/]+|\/)\/*$/)[1], ab = () => (a) => crypto.getRandomValues(a), bb = (a) => {
            (bb = ab())(a);
          }, cb = (...a) => {
            for (var b = "", c = false, d = a.length - 1; -1 <= d && !c; d--) {
              c = 0 <= d ? a[d] : "/";
              if ("string" != typeof c) throw new TypeError("Arguments to path.resolve must be strings");
              if (!c) return "";
              b = c + "/" + b;
              c = "/" === c.charAt(0);
            }
            b = Ya(b.split("/").filter((e) => !!e), !c).join("/");
            return (c ? "/" : "") + b || ".";
          }, db = (a) => {
            var b = Xa(a, 0);
            return Wa.decode(a.buffer ? a.subarray(0, b) : new Uint8Array(a.slice(0, b)));
          }, fb = [], gb = (a) => {
            for (var b = 0, c = 0; c < a.length; ++c) {
              var d = a.charCodeAt(c);
              127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
            }
            return b;
          }, M = (a, b, c, d) => {
            if (!(0 < d)) return 0;
            var e = c;
            d = c + d - 1;
            for (var g = 0; g < a.length; ++g) {
              var h = a.codePointAt(g);
              if (127 >= h) {
                if (c >= d) break;
                b[c++] = h;
              } else if (2047 >= h) {
                if (c + 1 >= d) break;
                b[c++] = 192 | h >> 6;
                b[c++] = 128 | h & 63;
              } else if (65535 >= h) {
                if (c + 2 >= d) break;
                b[c++] = 224 | h >> 12;
                b[c++] = 128 | h >> 6 & 63;
                b[c++] = 128 | h & 63;
              } else {
                if (c + 3 >= d) break;
                b[c++] = 240 | h >> 18;
                b[c++] = 128 | h >> 12 & 63;
                b[c++] = 128 | h >> 6 & 63;
                b[c++] = 128 | h & 63;
                g++;
              }
            }
            b[c] = 0;
            return c - e;
          }, pb = [];
          function qb(a, b) {
            pb[a] = { input: [], output: [], kb: b };
            rb(a, sb);
          }
          var sb = { open(a) {
            var b = pb[a.node.nb];
            if (!b) throw new N(43);
            a.Va = b;
            a.seekable = false;
          }, close(a) {
            a.Va.kb.lb(a.Va);
          }, lb(a) {
            a.Va.kb.lb(a.Va);
          }, read(a, b, c, d) {
            if (!a.Va || !a.Va.kb.Qb) throw new N(60);
            for (var e = 0, g = 0; g < d; g++) {
              try {
                var h = a.Va.kb.Qb(a.Va);
              } catch (q) {
                throw new N(29);
              }
              if (void 0 === h && 0 === e) throw new N(6);
              if (null === h || void 0 === h) break;
              e++;
              b[c + g] = h;
            }
            e && (a.node.$a = Date.now());
            return e;
          }, write(a, b, c, d) {
            if (!a.Va || !a.Va.kb.Hb) throw new N(60);
            try {
              for (var e = 0; e < d; e++) a.Va.kb.Hb(a.Va, b[c + e]);
            } catch (g) {
              throw new N(29);
            }
            d && (a.node.Ua = a.node.Ta = Date.now());
            return e;
          } }, tb = { Qb() {
            a: {
              if (!fb.length) {
                var a = null;
                globalThis.window?.prompt && (a = window.prompt("Input: "), null !== a && (a += "\n"));
                if (!a) {
                  var b = null;
                  break a;
                }
                b = Array(gb(a) + 1);
                a = M(a, b, 0, b.length);
                b.length = a;
                fb = b;
              }
              b = fb.shift();
            }
            return b;
          }, Hb(a, b) {
            null === b || 10 === b ? (Ba(db(a.output)), a.output = []) : 0 != b && a.output.push(b);
          }, lb(a) {
            0 < a.output?.length && (Ba(db(a.output)), a.output = []);
          }, Dc() {
            return { yc: 25856, Ac: 5, xc: 191, zc: 35387, wc: [
              3,
              28,
              127,
              21,
              4,
              0,
              1,
              0,
              17,
              19,
              26,
              0,
              18,
              15,
              23,
              22,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ] };
          }, Ec() {
            return 0;
          }, Fc() {
            return [24, 80];
          } }, ub = { Hb(a, b) {
            null === b || 10 === b ? (B(db(a.output)), a.output = []) : 0 != b && a.output.push(b);
          }, lb(a) {
            0 < a.output?.length && (B(db(a.output)), a.output = []);
          } }, O = { Za: null, ab() {
            return O.createNode(null, "/", 16895, 0);
          }, createNode(a, b, c, d) {
            if (24576 === (c & 61440) || 4096 === (c & 61440)) throw new N(63);
            O.Za || (O.Za = { dir: { node: { Wa: O.La.Wa, Xa: O.La.Xa, mb: O.La.mb, rb: O.La.rb, Tb: O.La.Tb, xb: O.La.xb, vb: O.La.vb, Ib: O.La.Ib, wb: O.La.wb }, stream: { Ya: O.Ma.Ya } }, file: {
              node: { Wa: O.La.Wa, Xa: O.La.Xa },
              stream: { Ya: O.Ma.Ya, read: O.Ma.read, write: O.Ma.write, sb: O.Ma.sb, tb: O.Ma.tb }
            }, link: { node: { Wa: O.La.Wa, Xa: O.La.Xa, eb: O.La.eb }, stream: {} }, Nb: { node: { Wa: O.La.Wa, Xa: O.La.Xa }, stream: vb } });
            c = wb(a, b, c, d);
            P(c.mode) ? (c.La = O.Za.dir.node, c.Ma = O.Za.dir.stream, c.Na = {}) : 32768 === (c.mode & 61440) ? (c.La = O.Za.file.node, c.Ma = O.Za.file.stream, c.Ra = 0, c.Na = null) : 40960 === (c.mode & 61440) ? (c.La = O.Za.link.node, c.Ma = O.Za.link.stream) : 8192 === (c.mode & 61440) && (c.La = O.Za.Nb.node, c.Ma = O.Za.Nb.stream);
            c.$a = c.Ua = c.Ta = Date.now();
            a && (a.Na[b] = c, a.$a = a.Ua = a.Ta = c.$a);
            return c;
          }, Cc(a) {
            return a.Na ? a.Na.subarray ? a.Na.subarray(0, a.Ra) : new Uint8Array(a.Na) : new Uint8Array(0);
          }, La: { Wa(a) {
            var b = {};
            b.cc = 8192 === (a.mode & 61440) ? a.id : 1;
            b.oc = a.id;
            b.mode = a.mode;
            b.rc = 1;
            b.uid = 0;
            b.nc = 0;
            b.nb = a.nb;
            P(a.mode) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.Ra : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
            b.$a = new Date(a.$a);
            b.Ua = new Date(a.Ua);
            b.Ta = new Date(a.Ta);
            b.Zb = 4096;
            b.$b = Math.ceil(b.size / b.Zb);
            return b;
          }, Xa(a, b) {
            for (var c of ["mode", "atime", "mtime", "ctime"]) null != b[c] && (a[c] = b[c]);
            void 0 !== b.size && (b = b.size, a.Ra != b && (0 == b ? (a.Na = null, a.Ra = 0) : (c = a.Na, a.Na = new Uint8Array(b), c && a.Na.set(c.subarray(0, Math.min(b, a.Ra))), a.Ra = b)));
          }, mb() {
            O.zb || (O.zb = new N(44), O.zb.stack = "<generic error, no stack>");
            throw O.zb;
          }, rb(a, b, c, d) {
            return O.createNode(a, b, c, d);
          }, Tb(a, b, c) {
            try {
              var d = Q(b, c);
            } catch (g) {
            }
            if (d) {
              if (P(a.mode)) for (var e in d.Na) throw new N(55);
              xb(d);
            }
            delete a.parent.Na[a.name];
            b.Na[c] = a;
            a.name = c;
            b.Ta = b.Ua = a.parent.Ta = a.parent.Ua = Date.now();
          }, xb(a, b) {
            delete a.Na[b];
            a.Ta = a.Ua = Date.now();
          }, vb(a, b) {
            var c = Q(a, b), d;
            for (d in c.Na) throw new N(55);
            delete a.Na[b];
            a.Ta = a.Ua = Date.now();
          }, Ib(a) {
            return [".", "..", ...Object.keys(a.Na)];
          }, wb(a, b, c) {
            a = O.createNode(a, b, 41471, 0);
            a.link = c;
            return a;
          }, eb(a) {
            if (40960 !== (a.mode & 61440)) throw new N(28);
            return a.link;
          } }, Ma: { read(a, b, c, d, e) {
            var g = a.node.Na;
            if (e >= a.node.Ra) return 0;
            a = Math.min(a.node.Ra - e, d);
            if (8 < a && g.subarray) b.set(g.subarray(e, e + a), c);
            else for (d = 0; d < a; d++) b[c + d] = g[e + d];
            return a;
          }, write(a, b, c, d, e, g) {
            b.buffer === m.buffer && (g = false);
            if (!d) return 0;
            a = a.node;
            a.Ua = a.Ta = Date.now();
            if (b.subarray && (!a.Na || a.Na.subarray)) {
              if (g) return a.Na = b.subarray(c, c + d), a.Ra = d;
              if (0 === a.Ra && 0 === e) return a.Na = b.slice(c, c + d), a.Ra = d;
              if (e + d <= a.Ra) return a.Na.set(b.subarray(c, c + d), e), d;
            }
            g = e + d;
            var h = a.Na ? a.Na.length : 0;
            h >= g || (g = Math.max(g, h * (1048576 > h ? 2 : 1.125) >>> 0), 0 != h && (g = Math.max(g, 256)), h = a.Na, a.Na = new Uint8Array(g), 0 < a.Ra && a.Na.set(h.subarray(0, a.Ra), 0));
            if (a.Na.subarray && b.subarray) a.Na.set(b.subarray(c, c + d), e);
            else for (g = 0; g < d; g++) a.Na[e + g] = b[c + g];
            a.Ra = Math.max(
              a.Ra,
              e + d
            );
            return d;
          }, Ya(a, b, c) {
            1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.Ra);
            if (0 > b) throw new N(28);
            return b;
          }, sb(a, b, c, d, e) {
            if (32768 !== (a.node.mode & 61440)) throw new N(43);
            a = a.node.Na;
            if (e & 2 || !a || a.buffer !== m.buffer) {
              e = true;
              d = 65536 * Math.ceil(b / 65536);
              var g = yb(65536, d);
              g && C.fill(0, g, g + d);
              d = g;
              if (!d) throw new N(48);
              if (a) {
                if (0 < c || c + b < a.length) a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
                m.set(a, d);
              }
            } else e = false, d = a.byteOffset;
            return { tc: d, Ub: e };
          }, tb(a, b, c, d) {
            O.Ma.write(
              a,
              b,
              0,
              d,
              c,
              false
            );
            return 0;
          } } }, ia = (a, b) => {
            var c = 0;
            a && (c |= 365);
            b && (c |= 146);
            return c;
          }, zb = null, Ab = {}, Bb = [], Cb = 1, R = null, Db = false, Eb = true, Fb = {}, N = class {
            name = "ErrnoError";
            constructor(a) {
              this.Pa = a;
            }
          }, Gb = class {
            qb = {};
            node = null;
            get flags() {
              return this.qb.flags;
            }
            set flags(a) {
              this.qb.flags = a;
            }
            get position() {
              return this.qb.position;
            }
            set position(a) {
              this.qb.position = a;
            }
          }, Hb = class {
            La = {};
            Ma = {};
            ib = null;
            constructor(a, b, c, d) {
              a ||= this;
              this.parent = a;
              this.ab = a.ab;
              this.id = Cb++;
              this.name = b;
              this.mode = c;
              this.nb = d;
              this.$a = this.Ua = this.Ta = Date.now();
            }
            get read() {
              return 365 === (this.mode & 365);
            }
            set read(a) {
              a ? this.mode |= 365 : this.mode &= -366;
            }
            get write() {
              return 146 === (this.mode & 146);
            }
            set write(a) {
              a ? this.mode |= 146 : this.mode &= -147;
            }
          };
          function S(a, b = {}) {
            if (!a) throw new N(44);
            b.Bb ?? (b.Bb = true);
            "/" === a.charAt(0) || (a = "//" + a);
            var c = 0;
            a: for (; 40 > c; c++) {
              a = a.split("/").filter((q) => !!q);
              for (var d = zb, e = "/", g = 0; g < a.length; g++) {
                var h = g === a.length - 1;
                if (h && b.parent) break;
                if ("." !== a[g]) if (".." === a[g]) if (e = Za(e), d === d.parent) {
                  a = e + "/" + a.slice(g + 1).join("/");
                  c--;
                  continue a;
                } else d = d.parent;
                else {
                  e = ha(e + "/" + a[g]);
                  try {
                    d = Q(d, a[g]);
                  } catch (q) {
                    if (44 === q?.Pa && h && b.sc) return { path: e };
                    throw q;
                  }
                  !d.ib || h && !b.Bb || (d = d.ib.root);
                  if (40960 === (d.mode & 61440) && (!h || b.hb)) {
                    if (!d.La.eb) throw new N(52);
                    d = d.La.eb(d);
                    "/" === d.charAt(0) || (d = Za(e) + "/" + d);
                    a = d + "/" + a.slice(g + 1).join("/");
                    continue a;
                  }
                }
              }
              return { path: e, node: d };
            }
            throw new N(32);
          }
          function fa(a) {
            for (var b; ; ) {
              if (a === a.parent) return a = a.ab.Sb, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
              b = b ? `${a.name}/${b}` : a.name;
              a = a.parent;
            }
          }
          function Ib(a, b) {
            for (var c = 0, d = 0; d < b.length; d++) c = (c << 5) - c + b.charCodeAt(d) | 0;
            return (a + c >>> 0) % R.length;
          }
          function xb(a) {
            var b = Ib(a.parent.id, a.name);
            if (R[b] === a) R[b] = a.jb;
            else for (b = R[b]; b; ) {
              if (b.jb === a) {
                b.jb = a.jb;
                break;
              }
              b = b.jb;
            }
          }
          function Q(a, b) {
            var c = P(a.mode) ? (c = Jb(a, "x")) ? c : a.La.mb ? 0 : 2 : 54;
            if (c) throw new N(c);
            for (c = R[Ib(a.id, b)]; c; c = c.jb) {
              var d = c.name;
              if (c.parent.id === a.id && d === b) return c;
            }
            return a.La.mb(a, b);
          }
          function wb(a, b, c, d) {
            a = new Hb(a, b, c, d);
            b = Ib(a.parent.id, a.name);
            a.jb = R[b];
            return R[b] = a;
          }
          function P(a) {
            return 16384 === (a & 61440);
          }
          function Kb(a) {
            var b = ["r", "w", "rw"][a & 3];
            a & 512 && (b += "w");
            return b;
          }
          function Jb(a, b) {
            if (Eb) return 0;
            if (!b.includes("r") || a.mode & 292) {
              if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) return 2;
            } else return 2;
            return 0;
          }
          function Lb(a, b) {
            if (!P(a.mode)) return 54;
            try {
              return Q(a, b), 20;
            } catch (c) {
            }
            return Jb(a, "wx");
          }
          function Mb(a, b, c) {
            try {
              var d = Q(a, b);
            } catch (e) {
              return e.Pa;
            }
            if (a = Jb(a, "wx")) return a;
            if (c) {
              if (!P(d.mode)) return 54;
              if (d === d.parent || "/" === fa(d)) return 10;
            } else if (P(d.mode)) return 31;
            return 0;
          }
          function Nb(a) {
            if (!a) throw new N(63);
            return a;
          }
          function T(a) {
            a = Bb[a];
            if (!a) throw new N(8);
            return a;
          }
          function Ob(a, b = -1) {
            a = Object.assign(new Gb(), a);
            if (-1 == b) a: {
              for (b = 0; 4096 >= b; b++) if (!Bb[b]) break a;
              throw new N(33);
            }
            a.bb = b;
            return Bb[b] = a;
          }
          function Pb(a, b = -1) {
            a = Ob(a, b);
            a.Ma?.Bc?.(a);
            return a;
          }
          function Qb(a, b, c) {
            var d = a?.Ma.Xa;
            a = d ? a : b;
            d ??= b.La.Xa;
            Nb(d);
            d(a, c);
          }
          var vb = { open(a) {
            a.Ma = Ab[a.node.nb].Ma;
            a.Ma.open?.(a);
          }, Ya() {
            throw new N(70);
          } };
          function rb(a, b) {
            Ab[a] = { Ma: b };
          }
          function Rb(a, b) {
            var c = "/" === b;
            if (c && zb) throw new N(10);
            if (!c && b) {
              var d = S(b, { Bb: false });
              b = d.path;
              d = d.node;
              if (d.ib) throw new N(10);
              if (!P(d.mode)) throw new N(54);
            }
            b = { type: a, Gc: {}, Sb: b, qc: [] };
            a = a.ab(b);
            a.ab = b;
            b.root = a;
            c ? zb = a : d && (d.ib = b, d.ab && d.ab.qc.push(b));
          }
          function Sb(a, b, c) {
            var d = S(a, { parent: true }).node;
            a = $a(a);
            if (!a) throw new N(28);
            if ("." === a || ".." === a) throw new N(20);
            var e = Lb(d, a);
            if (e) throw new N(e);
            if (!d.La.rb) throw new N(63);
            return d.La.rb(d, a, b, c);
          }
          function ja(a, b = 438) {
            return Sb(a, b & 4095 | 32768, 0);
          }
          function U(a, b = 511) {
            return Sb(a, b & 1023 | 16384, 0);
          }
          function Tb(a, b, c) {
            "undefined" == typeof c && (c = b, b = 438);
            Sb(a, b | 8192, c);
          }
          function Ub(a, b) {
            if (!cb(a)) throw new N(44);
            var c = S(b, { parent: true }).node;
            if (!c) throw new N(44);
            b = $a(b);
            var d = Lb(c, b);
            if (d) throw new N(d);
            if (!c.La.wb) throw new N(63);
            c.La.wb(c, b, a);
          }
          function Vb(a) {
            var b = S(a, { parent: true }).node;
            a = $a(a);
            var c = Q(b, a), d = Mb(b, a, true);
            if (d) throw new N(d);
            if (!b.La.vb) throw new N(63);
            if (c.ib) throw new N(10);
            b.La.vb(b, a);
            xb(c);
          }
          function ta(a) {
            var b = S(a, { parent: true }).node;
            if (!b) throw new N(44);
            a = $a(a);
            var c = Q(b, a), d = Mb(b, a, false);
            if (d) throw new N(d);
            if (!b.La.xb) throw new N(63);
            if (c.ib) throw new N(10);
            b.La.xb(b, a);
            xb(c);
          }
          function Wb(a, b) {
            a = S(a, { hb: !b }).node;
            return Nb(a.La.Wa)(a);
          }
          function Xb(a, b, c, d) {
            Qb(a, b, { mode: c & 4095 | b.mode & -4096, Ta: Date.now(), dc: d });
          }
          function ka(a, b) {
            a = "string" == typeof a ? S(a, { hb: true }).node : a;
            Xb(null, a, b);
          }
          function Yb(a, b, c) {
            if (P(b.mode)) throw new N(31);
            if (32768 !== (b.mode & 61440)) throw new N(28);
            var d = Jb(b, "w");
            if (d) throw new N(d);
            Qb(a, b, { size: c, timestamp: Date.now() });
          }
          function ma(a, b, c = 438) {
            if ("" === a) throw new N(44);
            if ("string" == typeof b) {
              var d = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }[b];
              if ("undefined" == typeof d) throw Error(`Unknown file open mode: ${b}`);
              b = d;
            }
            c = b & 64 ? c & 4095 | 32768 : 0;
            if ("object" == typeof a) d = a;
            else {
              var e = a.endsWith("/");
              a = S(a, { hb: !(b & 131072), sc: true });
              d = a.node;
              a = a.path;
            }
            var g = false;
            if (b & 64) if (d) {
              if (b & 128) throw new N(20);
            } else {
              if (e) throw new N(31);
              d = Sb(a, c | 511, 0);
              g = true;
            }
            if (!d) throw new N(44);
            8192 === (d.mode & 61440) && (b &= -513);
            if (b & 65536 && !P(d.mode)) throw new N(54);
            if (!g && (e = d ? 40960 === (d.mode & 61440) ? 32 : P(d.mode) && ("r" !== Kb(b) || b & 576) ? 31 : Jb(d, Kb(b)) : 44)) throw new N(e);
            b & 512 && !g && (e = d, e = "string" == typeof e ? S(e, { hb: true }).node : e, Yb(null, e, 0));
            b &= -131713;
            e = Ob({ node: d, path: fa(d), flags: b, seekable: true, position: 0, Ma: d.Ma, uc: [], error: false });
            e.Ma.open && e.Ma.open(e);
            g && ka(d, c & 511);
            !k.logReadFiles || b & 1 || a in Fb || (Fb[a] = 1);
            return e;
          }
          function oa(a) {
            if (null === a.bb) throw new N(8);
            a.Eb && (a.Eb = null);
            try {
              a.Ma.close && a.Ma.close(a);
            } catch (b) {
              throw b;
            } finally {
              Bb[a.bb] = null;
            }
            a.bb = null;
          }
          function Zb(a, b, c) {
            if (null === a.bb) throw new N(8);
            if (!a.seekable || !a.Ma.Ya) throw new N(70);
            if (0 != c && 1 != c && 2 != c) throw new N(28);
            a.position = a.Ma.Ya(a, b, c);
            a.uc = [];
          }
          function $b(a, b, c, d, e) {
            if (0 > d || 0 > e) throw new N(28);
            if (null === a.bb) throw new N(8);
            if (1 === (a.flags & 2097155)) throw new N(8);
            if (P(a.node.mode)) throw new N(31);
            if (!a.Ma.read) throw new N(28);
            var g = "undefined" != typeof e;
            if (!g) e = a.position;
            else if (!a.seekable) throw new N(70);
            b = a.Ma.read(a, b, c, d, e);
            g || (a.position += b);
            return b;
          }
          function na(a, b, c, d, e) {
            if (0 > d || 0 > e) throw new N(28);
            if (null === a.bb) throw new N(8);
            if (0 === (a.flags & 2097155)) throw new N(8);
            if (P(a.node.mode)) throw new N(31);
            if (!a.Ma.write) throw new N(28);
            a.seekable && a.flags & 1024 && Zb(a, 0, 2);
            var g = "undefined" != typeof e;
            if (!g) e = a.position;
            else if (!a.seekable) throw new N(70);
            b = a.Ma.write(a, b, c, d, e, void 0);
            g || (a.position += b);
            return b;
          }
          function sa(a) {
            var b = b || 0;
            var c = "binary";
            "utf8" !== c && "binary" !== c && Ka(`Invalid encoding type "${c}"`);
            b = ma(a, b);
            a = Wb(a).size;
            var d = new Uint8Array(a);
            $b(b, d, 0, a, 0);
            "utf8" === c && (d = db(d));
            oa(b);
            return d;
          }
          function W(a, b, c) {
            a = ha("/dev/" + a);
            var d = ia(!!b, !!c);
            W.Rb ?? (W.Rb = 64);
            var e = W.Rb++ << 8 | 0;
            rb(e, { open(g) {
              g.seekable = false;
            }, close() {
              c?.buffer?.length && c(10);
            }, read(g, h, q, w) {
              for (var u = 0, x2 = 0; x2 < w; x2++) {
                try {
                  var D = b();
                } catch (ib) {
                  throw new N(29);
                }
                if (void 0 === D && 0 === u) throw new N(6);
                if (null === D || void 0 === D) break;
                u++;
                h[q + x2] = D;
              }
              u && (g.node.$a = Date.now());
              return u;
            }, write(g, h, q, w) {
              for (var u = 0; u < w; u++) try {
                c(h[q + u]);
              } catch (x2) {
                throw new N(29);
              }
              w && (g.node.Ua = g.node.Ta = Date.now());
              return u;
            } });
            Tb(a, d, e);
          }
          var X = {};
          function Y(a, b, c) {
            if ("/" === b.charAt(0)) return b;
            a = -100 === a ? "/" : T(a).path;
            if (0 == b.length) {
              if (!c) throw new N(44);
              return a;
            }
            return a + "/" + b;
          }
          function ac(a, b) {
            F[a >> 2] = b.cc;
            F[a + 4 >> 2] = b.mode;
            F[a + 8 >> 2] = b.rc;
            F[a + 12 >> 2] = b.uid;
            F[a + 16 >> 2] = b.nc;
            F[a + 20 >> 2] = b.nb;
            H[a + 24 >> 3] = BigInt(b.size);
            E[a + 32 >> 2] = 4096;
            E[a + 36 >> 2] = b.$b;
            var c = b.$a.getTime(), d = b.Ua.getTime(), e = b.Ta.getTime();
            H[a + 40 >> 3] = BigInt(Math.floor(c / 1e3));
            F[a + 48 >> 2] = c % 1e3 * 1e6;
            H[a + 56 >> 3] = BigInt(Math.floor(d / 1e3));
            F[a + 64 >> 2] = d % 1e3 * 1e6;
            H[a + 72 >> 3] = BigInt(Math.floor(e / 1e3));
            F[a + 80 >> 2] = e % 1e3 * 1e6;
            H[a + 88 >> 3] = BigInt(b.oc);
            return 0;
          }
          var kc = void 0, Cc = () => {
            var a = E[+kc >> 2];
            kc += 4;
            return a;
          }, Ec = 0, Fc = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Gc = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Hc = {}, Ic = (a) => {
            if (!(a instanceof Pa || "unwind" == a)) throw a;
          }, Jc = (a) => {
            Ea = a;
            Va || 0 < Ec || (k.onExit?.(a), Da = true);
            throw new Pa(a);
          }, Kc = (a) => {
            if (!Da) try {
              a();
            } catch (b) {
              Ic(b);
            } finally {
              if (!(Va || 0 < Ec)) try {
                Ea = a = Ea, Jc(a);
              } catch (b) {
                Ic(b);
              }
            }
          }, Lc = {}, Nc = () => {
            if (!Mc) {
              var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8", _: wa || "./this.program" }, b;
              for (b in Lc) void 0 === Lc[b] ? delete a[b] : a[b] = Lc[b];
              var c = [];
              for (b in a) c.push(`${b}=${a[b]}`);
              Mc = c;
            }
            return Mc;
          }, Mc, Oc = (a, b, c, d) => {
            var e = { string: (u) => {
              var x2 = 0;
              if (null !== u && void 0 !== u && 0 !== u) {
                x2 = gb(u) + 1;
                var D = y(x2);
                M(u, C, D, x2);
                x2 = D;
              }
              return x2;
            }, array: (u) => {
              var x2 = y(u.length);
              m.set(u, x2);
              return x2;
            } };
            a = k["_" + a];
            var g = [], h = 0;
            if (d) for (var q = 0; q < d.length; q++) {
              var w = e[c[q]];
              w ? (0 === h && (h = pa()), g[q] = w(d[q])) : g[q] = d[q];
            }
            c = a(...g);
            return c = (function(u) {
              0 !== h && ra(h);
              return "string" === b ? z(u) : "boolean" === b ? !!u : u;
            })(c);
          }, ea = (a) => {
            var b = gb(a) + 1, c = ca(b);
            c && M(a, C, c, b);
            return c;
          }, Pc, Qc = [], A = (a) => {
            Pc.delete(Z.get(a));
            Z.set(a, null);
            Qc.push(a);
          }, Rc = (a) => {
            const b = a.length;
            return [b % 128 | 128, b >> 7, ...a];
          }, Sc = { i: 127, p: 127, j: 126, f: 125, d: 124, e: 111 }, Tc = (a) => Rc(Array.from(a, (b) => Sc[b])), va = (a, b) => {
            if (!Pc) {
              Pc = /* @__PURE__ */ new WeakMap();
              var c = Z.length;
              if (Pc) for (var d = 0; d < 0 + c; d++) {
                var e = Z.get(d);
                e && Pc.set(e, d);
              }
            }
            if (c = Pc.get(a) || 0) return c;
            c = Qc.length ? Qc.pop() : Z.grow(1);
            try {
              Z.set(c, a);
            } catch (g) {
              if (!(g instanceof TypeError)) throw g;
              b = Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0, 1, ...Rc([1, 96, ...Tc(b.slice(1)), ...Tc("v" === b[0] ? "" : b[0])]), 2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
              b = new WebAssembly.Module(b);
              b = new WebAssembly.Instance(b, { e: { f: a } }).exports.f;
              Z.set(c, b);
            }
            Pc.set(a, c);
            return c;
          };
          R = Array(4096);
          Rb(O, "/");
          U("/tmp");
          U("/home");
          U("/home/web_user");
          (function() {
            U("/dev");
            rb(259, { read: () => 0, write: (d, e, g, h) => h, Ya: () => 0 });
            Tb("/dev/null", 259);
            qb(1280, tb);
            qb(1536, ub);
            Tb("/dev/tty", 1280);
            Tb("/dev/tty1", 1536);
            var a = new Uint8Array(1024), b = 0, c = () => {
              0 === b && (bb(a), b = a.byteLength);
              return a[--b];
            };
            W("random", c);
            W("urandom", c);
            U("/dev/shm");
            U("/dev/shm/tmp");
          })();
          (function() {
            U("/proc");
            var a = U("/proc/self");
            U("/proc/self/fd");
            Rb({ ab() {
              var b = wb(a, "fd", 16895, 73);
              b.Ma = { Ya: O.Ma.Ya };
              b.La = { mb(c, d) {
                c = +d;
                var e = T(c);
                c = { parent: null, ab: { Sb: "fake" }, La: { eb: () => e.path }, id: c + 1 };
                return c.parent = c;
              }, Ib() {
                return Array.from(Bb.entries()).filter(([, c]) => c).map(([c]) => c.toString());
              } };
              return b;
            } }, "/proc/self/fd");
          })();
          k.noExitRuntime && (Va = k.noExitRuntime);
          k.print && (Ba = k.print);
          k.printErr && (B = k.printErr);
          k.wasmBinary && (Ca = k.wasmBinary);
          k.thisProgram && (wa = k.thisProgram);
          if (k.preInit) for ("function" == typeof k.preInit && (k.preInit = [k.preInit]); 0 < k.preInit.length; ) k.preInit.shift()();
          k.stackSave = () => pa();
          k.stackRestore = (a) => ra(a);
          k.stackAlloc = (a) => y(a);
          k.cwrap = (a, b, c, d) => {
            var e = !c || c.every((g) => "number" === g || "boolean" === g);
            return "string" !== b && e && !d ? k["_" + a] : (...g) => Oc(a, b, c, g);
          };
          k.addFunction = va;
          k.removeFunction = A;
          k.UTF8ToString = z;
          k.stringToNewUTF8 = ea;
          k.writeArrayToMemory = (a, b) => {
            m.set(a, b);
          };
          var ca, da, yb, Uc, ra, y, pa, Ja, Z, Vc = {
            a: (a, b, c, d) => Ka(`Assertion failed: ${z(a)}, at: ` + [b ? z(b) : "unknown filename", c, d ? z(d) : "unknown function"]),
            i: function(a, b) {
              try {
                return a = z(a), ka(a, b), 0;
              } catch (c) {
                if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
                return -c.Pa;
              }
            },
            L: function(a, b, c) {
              try {
                b = z(b);
                b = Y(a, b);
                if (c & -8) return -28;
                var d = S(b, { hb: true }).node;
                if (!d) return -44;
                a = "";
                c & 4 && (a += "r");
                c & 2 && (a += "w");
                c & 1 && (a += "x");
                return a && Jb(d, a) ? -2 : 0;
              } catch (e) {
                if ("undefined" == typeof X || "ErrnoError" !== e.name) throw e;
                return -e.Pa;
              }
            },
            j: function(a, b) {
              try {
                var c = T(a);
                Xb(c, c.node, b, false);
                return 0;
              } catch (d) {
                if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
                return -d.Pa;
              }
            },
            h: function(a) {
              try {
                var b = T(a);
                Qb(b, b.node, { timestamp: Date.now(), dc: false });
                return 0;
              } catch (c) {
                if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
                return -c.Pa;
              }
            },
            b: function(a, b, c) {
              kc = c;
              try {
                var d = T(a);
                switch (b) {
                  case 0:
                    var e = Cc();
                    if (0 > e) break;
                    for (; Bb[e]; ) e++;
                    return Pb(d, e).bb;
                  case 1:
                  case 2:
                    return 0;
                  case 3:
                    return d.flags;
                  case 4:
                    return e = Cc(), d.flags |= e, 0;
                  case 12:
                    return e = Cc(), Fa[e + 0 >> 1] = 2, 0;
                  case 13:
                  case 14:
                    return 0;
                }
                return -28;
              } catch (g) {
                if ("undefined" == typeof X || "ErrnoError" !== g.name) throw g;
                return -g.Pa;
              }
            },
            g: function(a, b) {
              try {
                var c = T(a), d = c.node, e = c.Ma.Wa;
                a = e ? c : d;
                e ??= d.La.Wa;
                Nb(e);
                var g = e(a);
                return ac(b, g);
              } catch (h) {
                if ("undefined" == typeof X || "ErrnoError" !== h.name) throw h;
                return -h.Pa;
              }
            },
            H: function(a, b) {
              b = -9007199254740992 > b || 9007199254740992 < b ? NaN : Number(b);
              try {
                if (isNaN(b)) return -61;
                var c = T(a);
                if (0 > b || 0 === (c.flags & 2097155)) throw new N(28);
                Yb(c, c.node, b);
                return 0;
              } catch (d) {
                if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
                return -d.Pa;
              }
            },
            G: function(a, b) {
              try {
                if (0 === b) return -28;
                var c = gb("/") + 1;
                if (b < c) return -68;
                M("/", C, a, b);
                return c;
              } catch (d) {
                if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
                return -d.Pa;
              }
            },
            K: function(a, b) {
              try {
                return a = z(a), ac(b, Wb(a, true));
              } catch (c) {
                if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
                return -c.Pa;
              }
            },
            C: function(a, b, c) {
              try {
                return b = z(b), b = Y(a, b), U(b, c), 0;
              } catch (d) {
                if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
                return -d.Pa;
              }
            },
            J: function(a, b, c, d) {
              try {
                b = z(b);
                var e = d & 256;
                b = Y(a, b, d & 4096);
                return ac(c, e ? Wb(b, true) : Wb(b));
              } catch (g) {
                if ("undefined" == typeof X || "ErrnoError" !== g.name) throw g;
                return -g.Pa;
              }
            },
            x: function(a, b, c, d) {
              kc = d;
              try {
                b = z(b);
                b = Y(a, b);
                var e = d ? Cc() : 0;
                return ma(b, c, e).bb;
              } catch (g) {
                if ("undefined" == typeof X || "ErrnoError" !== g.name) throw g;
                return -g.Pa;
              }
            },
            v: function(a, b, c, d) {
              try {
                b = z(b);
                b = Y(a, b);
                if (0 >= d) return -28;
                var e = S(b).node;
                if (!e) throw new N(44);
                if (!e.La.eb) throw new N(28);
                var g = e.La.eb(e);
                var h = Math.min(d, gb(g)), q = m[c + h];
                M(g, C, c, d + 1);
                m[c + h] = q;
                return h;
              } catch (w) {
                if ("undefined" == typeof X || "ErrnoError" !== w.name) throw w;
                return -w.Pa;
              }
            },
            u: function(a) {
              try {
                return a = z(a), Vb(a), 0;
              } catch (b) {
                if ("undefined" == typeof X || "ErrnoError" !== b.name) throw b;
                return -b.Pa;
              }
            },
            f: function(a, b) {
              try {
                return a = z(a), ac(b, Wb(a));
              } catch (c) {
                if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
                return -c.Pa;
              }
            },
            r: function(a, b, c) {
              try {
                b = z(b);
                b = Y(a, b);
                if (c) if (512 === c) Vb(b);
                else return -28;
                else ta(b);
                return 0;
              } catch (d) {
                if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
                return -d.Pa;
              }
            },
            q: function(a, b, c) {
              try {
                b = z(b);
                b = Y(a, b, true);
                var d = Date.now(), e, g;
                if (c) {
                  var h = F[c >> 2] + 4294967296 * E[c + 4 >> 2], q = E[c + 8 >> 2];
                  1073741823 == q ? e = d : 1073741822 == q ? e = null : e = 1e3 * h + q / 1e6;
                  c += 16;
                  h = F[c >> 2] + 4294967296 * E[c + 4 >> 2];
                  q = E[c + 8 >> 2];
                  1073741823 == q ? g = d : 1073741822 == q ? g = null : g = 1e3 * h + q / 1e6;
                } else g = e = d;
                if (null !== (g ?? e)) {
                  a = e;
                  var w = S(b, { hb: true }).node;
                  Nb(w.La.Xa)(w, { $a: a, Ua: g });
                }
                return 0;
              } catch (u) {
                if ("undefined" == typeof X || "ErrnoError" !== u.name) throw u;
                return -u.Pa;
              }
            },
            m: () => Ka(""),
            l: () => {
              Va = false;
              Ec = 0;
            },
            A: function(a, b) {
              a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
              a = new Date(1e3 * a);
              E[b >> 2] = a.getSeconds();
              E[b + 4 >> 2] = a.getMinutes();
              E[b + 8 >> 2] = a.getHours();
              E[b + 12 >> 2] = a.getDate();
              E[b + 16 >> 2] = a.getMonth();
              E[b + 20 >> 2] = a.getFullYear() - 1900;
              E[b + 24 >> 2] = a.getDay();
              var c = a.getFullYear();
              E[b + 28 >> 2] = (0 !== c % 4 || 0 === c % 100 && 0 !== c % 400 ? Gc : Fc)[a.getMonth()] + a.getDate() - 1 | 0;
              E[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
              c = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
              var d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
              E[b + 32 >> 2] = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;
            },
            y: function(a, b, c, d, e, g, h) {
              e = -9007199254740992 > e || 9007199254740992 < e ? NaN : Number(e);
              try {
                var q = T(d);
                if (0 !== (b & 2) && 0 === (c & 2) && 2 !== (q.flags & 2097155)) throw new N(2);
                if (1 === (q.flags & 2097155)) throw new N(2);
                if (!q.Ma.sb) throw new N(43);
                if (!a) throw new N(28);
                var w = q.Ma.sb(q, a, e, b, c);
                var u = w.tc;
                E[g >> 2] = w.Ub;
                F[h >> 2] = u;
                return 0;
              } catch (x2) {
                if ("undefined" == typeof X || "ErrnoError" !== x2.name) throw x2;
                return -x2.Pa;
              }
            },
            z: function(a, b, c, d, e, g) {
              g = -9007199254740992 > g || 9007199254740992 < g ? NaN : Number(g);
              try {
                var h = T(e);
                if (c & 2) {
                  if (32768 !== (h.node.mode & 61440)) throw new N(43);
                  d & 2 || h.Ma.tb && h.Ma.tb(h, C.slice(a, a + b), g, b, d);
                }
              } catch (q) {
                if ("undefined" == typeof X || "ErrnoError" !== q.name) throw q;
                return -q.Pa;
              }
            },
            n: (a, b) => {
              Hc[a] && (clearTimeout(Hc[a].id), delete Hc[a]);
              if (!b) return 0;
              var c = setTimeout(() => {
                delete Hc[a];
                Kc(() => Uc(a, performance.now()));
              }, b);
              Hc[a] = { id: c, Hc: b };
              return 0;
            },
            B: (a, b, c, d) => {
              var e = (/* @__PURE__ */ new Date()).getFullYear(), g = new Date(e, 0, 1).getTimezoneOffset();
              e = new Date(e, 6, 1).getTimezoneOffset();
              F[a >> 2] = 60 * Math.max(g, e);
              E[b >> 2] = Number(g != e);
              b = (h) => {
                var q = Math.abs(h);
                return `UTC${0 <= h ? "-" : "+"}${String(Math.floor(q / 60)).padStart(2, "0")}${String(q % 60).padStart(2, "0")}`;
              };
              a = b(g);
              b = b(e);
              e < g ? (M(a, C, c, 17), M(b, C, d, 17)) : (M(a, C, d, 17), M(b, C, c, 17));
            },
            d: () => Date.now(),
            s: () => 2147483648,
            c: () => performance.now(),
            o: (a) => {
              var b = C.length;
              a >>>= 0;
              if (2147483648 < a) return false;
              for (var c = 1; 4 >= c; c *= 2) {
                var d = b * (1 + 0.2 / c);
                d = Math.min(d, a + 100663296);
                a: {
                  d = (Math.min(2147483648, 65536 * Math.ceil(Math.max(a, d) / 65536)) - Ja.buffer.byteLength + 65535) / 65536 | 0;
                  try {
                    Ja.grow(d);
                    Ia();
                    var e = 1;
                    break a;
                  } catch (g) {
                  }
                  e = void 0;
                }
                if (e) return true;
              }
              return false;
            },
            E: (a, b) => {
              var c = 0, d = 0, e;
              for (e of Nc()) {
                var g = b + c;
                F[a + d >> 2] = g;
                c += M(e, C, g, Infinity) + 1;
                d += 4;
              }
              return 0;
            },
            F: (a, b) => {
              var c = Nc();
              F[a >> 2] = c.length;
              a = 0;
              for (var d of c) a += gb(d) + 1;
              F[b >> 2] = a;
              return 0;
            },
            e: function(a) {
              try {
                var b = T(a);
                oa(b);
                return 0;
              } catch (c) {
                if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
                return c.Pa;
              }
            },
            p: function(a, b) {
              try {
                var c = T(a);
                m[b] = c.Va ? 2 : P(c.mode) ? 3 : 40960 === (c.mode & 61440) ? 7 : 4;
                Fa[b + 2 >> 1] = 0;
                H[b + 8 >> 3] = BigInt(0);
                H[b + 16 >> 3] = BigInt(0);
                return 0;
              } catch (d) {
                if ("undefined" == typeof X || "ErrnoError" !== d.name) throw d;
                return d.Pa;
              }
            },
            w: function(a, b, c, d) {
              try {
                a: {
                  var e = T(a);
                  a = b;
                  for (var g, h = b = 0; h < c; h++) {
                    var q = F[a >> 2], w = F[a + 4 >> 2];
                    a += 8;
                    var u = $b(e, m, q, w, g);
                    if (0 > u) {
                      var x2 = -1;
                      break a;
                    }
                    b += u;
                    if (u < w) break;
                    "undefined" != typeof g && (g += u);
                  }
                  x2 = b;
                }
                F[d >> 2] = x2;
                return 0;
              } catch (D) {
                if ("undefined" == typeof X || "ErrnoError" !== D.name) throw D;
                return D.Pa;
              }
            },
            D: function(a, b, c, d) {
              b = -9007199254740992 > b || 9007199254740992 < b ? NaN : Number(b);
              try {
                if (isNaN(b)) return 61;
                var e = T(a);
                Zb(e, b, c);
                H[d >> 3] = BigInt(e.position);
                e.Eb && 0 === b && 0 === c && (e.Eb = null);
                return 0;
              } catch (g) {
                if ("undefined" == typeof X || "ErrnoError" !== g.name) throw g;
                return g.Pa;
              }
            },
            I: function(a) {
              try {
                var b = T(a);
                return b.Ma?.lb?.(b);
              } catch (c) {
                if ("undefined" == typeof X || "ErrnoError" !== c.name) throw c;
                return c.Pa;
              }
            },
            t: function(a, b, c, d) {
              try {
                a: {
                  var e = T(a);
                  a = b;
                  for (var g, h = b = 0; h < c; h++) {
                    var q = F[a >> 2], w = F[a + 4 >> 2];
                    a += 8;
                    var u = na(e, m, q, w, g);
                    if (0 > u) {
                      var x2 = -1;
                      break a;
                    }
                    b += u;
                    if (u < w) break;
                    "undefined" != typeof g && (g += u);
                  }
                  x2 = b;
                }
                F[d >> 2] = x2;
                return 0;
              } catch (D) {
                if ("undefined" == typeof X || "ErrnoError" !== D.name) throw D;
                return D.Pa;
              }
            },
            k: Jc
          };
          function Wc() {
            function a() {
              k.calledRun = true;
              if (!Da) {
                if (!k.noFSInit && !Db) {
                  var b, c;
                  Db = true;
                  b ??= k.stdin;
                  c ??= k.stdout;
                  d ??= k.stderr;
                  b ? W("stdin", b) : Ub("/dev/tty", "/dev/stdin");
                  c ? W("stdout", null, c) : Ub("/dev/tty", "/dev/stdout");
                  d ? W("stderr", null, d) : Ub("/dev/tty1", "/dev/stderr");
                  ma("/dev/stdin", 0);
                  ma("/dev/stdout", 1);
                  ma("/dev/stderr", 1);
                }
                Xc.N();
                Eb = false;
                k.onRuntimeInitialized?.();
                if (k.postRun) for ("function" == typeof k.postRun && (k.postRun = [k.postRun]); k.postRun.length; ) {
                  var d = k.postRun.shift();
                  Ra.push(d);
                }
                Qa(Ra);
              }
            }
            if (0 < K) Ua = Wc;
            else {
              if (k.preRun) for ("function" == typeof k.preRun && (k.preRun = [k.preRun]); k.preRun.length; ) Ta();
              Qa(Sa);
              0 < K ? Ua = Wc : k.setStatus ? (k.setStatus("Running..."), setTimeout(() => {
                setTimeout(() => k.setStatus(""), 1);
                a();
              }, 1)) : a();
            }
          }
          var Xc;
          (async function() {
            function a(c) {
              c = Xc = c.exports;
              k._sqlite3_free = c.P;
              k._sqlite3_value_text = c.Q;
              k._sqlite3_prepare_v2 = c.R;
              k._sqlite3_step = c.S;
              k._sqlite3_reset = c.T;
              k._sqlite3_exec = c.U;
              k._sqlite3_finalize = c.V;
              k._sqlite3_column_name = c.W;
              k._sqlite3_column_text = c.X;
              k._sqlite3_column_type = c.Y;
              k._sqlite3_errmsg = c.Z;
              k._sqlite3_clear_bindings = c._;
              k._sqlite3_value_blob = c.$;
              k._sqlite3_value_bytes = c.aa;
              k._sqlite3_value_double = c.ba;
              k._sqlite3_value_int = c.ca;
              k._sqlite3_value_type = c.da;
              k._sqlite3_result_blob = c.ea;
              k._sqlite3_result_double = c.fa;
              k._sqlite3_result_error = c.ga;
              k._sqlite3_result_int = c.ha;
              k._sqlite3_result_int64 = c.ia;
              k._sqlite3_result_null = c.ja;
              k._sqlite3_result_text = c.ka;
              k._sqlite3_aggregate_context = c.la;
              k._sqlite3_column_count = c.ma;
              k._sqlite3_data_count = c.na;
              k._sqlite3_column_blob = c.oa;
              k._sqlite3_column_bytes = c.pa;
              k._sqlite3_column_double = c.qa;
              k._sqlite3_bind_blob = c.ra;
              k._sqlite3_bind_double = c.sa;
              k._sqlite3_bind_int = c.ta;
              k._sqlite3_bind_text = c.ua;
              k._sqlite3_bind_parameter_index = c.va;
              k._sqlite3_sql = c.wa;
              k._sqlite3_normalized_sql = c.xa;
              k._sqlite3_changes = c.ya;
              k._sqlite3_close_v2 = c.za;
              k._sqlite3_create_function_v2 = c.Aa;
              k._sqlite3_update_hook = c.Ba;
              k._sqlite3_open = c.Ca;
              ca = k._malloc = c.Da;
              da = k._free = c.Ea;
              k._RegisterExtensionFunctions = c.Fa;
              yb = c.Ga;
              Uc = c.Ha;
              ra = c.Ia;
              y = c.Ja;
              pa = c.Ka;
              Ja = c.M;
              Z = c.O;
              Ia();
              K--;
              k.monitorRunDependencies?.(K);
              0 == K && Ua && (c = Ua, Ua = null, c());
              return Xc;
            }
            K++;
            k.monitorRunDependencies?.(K);
            var b = { a: Vc };
            if (k.instantiateWasm) return new Promise((c) => {
              k.instantiateWasm(b, (d, e) => {
                c(a(d, e));
              });
            });
            La ??= k.locateFile ? k.locateFile("sql-wasm-browser.wasm", ya) : ya + "sql-wasm-browser.wasm";
            return a((await Oa(b)).instance);
          })();
          Wc();
          return Module;
        });
        return initSqlJsPromise;
      };
      if (typeof exports === "object" && typeof module === "object") {
        module.exports = initSqlJs2;
        module.exports.default = initSqlJs2;
      } else if (typeof define === "function" && define["amd"]) {
        define([], function() {
          return initSqlJs2;
        });
      } else if (typeof exports === "object") {
        exports["Module"] = initSqlJs2;
      }
    }
  });

  // src/const.ts
  var VOICES_MAP = {
    russian: [
      { id: "irina", name: "Irina (Medium, Smooth)", file: "ru_RU-irina-medium" },
      {
        id: "denis",
        name: "Denis (Medium, Energetic)",
        file: "ru_RU-denis-medium"
      },
      {
        id: "dmitri",
        name: "Dmitri (Medium, Natural)",
        file: "ru_RU-dmitri-medium"
      },
      {
        id: "ruslan",
        name: "Ruslan (Medium, Warm)",
        file: "ru_RU-ruslan-medium"
      }
    ],
    english: [
      { id: "alan", name: "Alan (Medium, GB)", file: "en_GB-alan-medium" },
      { id: "alba", name: "Alba (Medium, GB)", file: "en_GB-alba-medium" },
      { id: "bryce", name: "Bryce (Medium, US)", file: "en_US-bryce-medium" },
      {
        id: "hfc_female",
        name: "HFC Female (Medium, US)",
        file: "en_US-hfc_female-medium"
      },
      {
        id: "hfc_male",
        name: "HFC Male (Medium, US)",
        file: "en_US-hfc_male-medium"
      }
    ],
    swedish: [
      { id: "alma", name: "Alma (Medium, Soft)", file: "sv_SE-alma-medium" },
      { id: "lisa", name: "Lisa (Medium, Standard)", file: "sv_SE-lisa-medium" },
      { id: "nst", name: "NST (Medium, Standard)", file: "sv_SE-nst-medium" }
    ]
  };
  var LANGUAGE_CODES = {
    russian: "ru",
    english: "en",
    swedish: "sv"
  };
  var DEFAULT_SETTINGS = {
    piperLanguageCategory: "russian",
    piperVoice: "irina",
    piperVoiceFile: "ru_RU-irina-medium",
    piperSpeed: 1,
    piperNoiseScale: 0.667,
    piperNoiseW: 0.8,
    googleLanguage: "ru-RU",
    googleRate: 1,
    lookupMethod: "manual",
    googleTranslateTargetLanguage: "en"
  };

  // src/model/DatabaseModel.ts
  var DatabaseModel = class {
    dbName = "LLT_Database";
    version = 2;
    db = null;
    /**
     * Opens connection to IndexedDB database with schema versioning and lifecycle handlers.
     */
    async open() {
      if (this.db) return this.db;
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.version);
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          const transaction = event.target.transaction;
          let audioStore;
          if (!db.objectStoreNames.contains("audio_cache")) {
            audioStore = db.createObjectStore("audio_cache", { keyPath: "cacheKey" });
          } else {
            audioStore = transaction.objectStore("audio_cache");
          }
          if (!audioStore.indexNames.contains("lastAccessed")) {
            audioStore.createIndex("lastAccessed", "lastAccessed", { unique: false });
          }
          let vocabStore;
          if (!db.objectStoreNames.contains("vocabulary")) {
            vocabStore = db.createObjectStore("vocabulary", {
              keyPath: "id",
              autoIncrement: true
            });
          } else {
            vocabStore = transaction.objectStore("vocabulary");
          }
          if (!vocabStore.indexNames.contains("word")) {
            vocabStore.createIndex("word", "word", { unique: false });
          }
          if (!vocabStore.indexNames.contains("language")) {
            vocabStore.createIndex("language", "language", { unique: false });
          }
          if (!vocabStore.indexNames.contains("createdAt")) {
            vocabStore.createIndex("createdAt", "createdAt", { unique: false });
          }
          if (!vocabStore.indexNames.contains("word_language")) {
            vocabStore.createIndex("word_language", ["word", "language"], { unique: false });
          }
        };
        request.onsuccess = () => {
          const db = request.result;
          this.db = db;
          db.onversionchange = () => {
            db.close();
            this.db = null;
          };
          resolve(db);
        };
        request.onblocked = () => {
          console.warn("IndexedDB open request blocked. Please close other open tabs using LLT.");
        };
        request.onerror = () => reject(request.error);
      });
    }
    /**
     * Closes active database connection.
     */
    close() {
      if (this.db) {
        this.db.close();
        this.db = null;
      }
    }
    // ─── Audio Cache ──────────────────────────────────────────────────────────
    /**
     * Retrieves cached audio buffer by cacheKey and asynchronously updates its lastAccessed timestamp.
     */
    async getCachedAudio(cacheKey) {
      try {
        const db = await this.open();
        return new Promise((resolve) => {
          const tx = db.transaction("audio_cache", "readwrite");
          const store = tx.objectStore("audio_cache");
          const req = store.get(cacheKey);
          req.onsuccess = () => {
            const record = req.result;
            if (record && record.audioBuffer) {
              record.lastAccessed = Date.now();
              store.put(record);
              resolve(record.audioBuffer);
            } else {
              resolve(null);
            }
          };
          req.onerror = () => resolve(null);
        });
      } catch {
        return null;
      }
    }
    /**
     * Stores TTS audio buffer in cache with QuotaExceeded auto-pruning fallback.
     */
    async setCachedAudio(cacheKey, audioBuffer) {
      try {
        const db = await this.open();
        const now = Date.now();
        const record = {
          cacheKey,
          audioBuffer,
          createdAt: now,
          lastAccessed: now
        };
        return new Promise((resolve, reject) => {
          const tx = db.transaction("audio_cache", "readwrite");
          const store = tx.objectStore("audio_cache");
          store.put(record);
          tx.oncomplete = () => resolve();
          tx.onerror = async (e) => {
            const error = tx.error || e.target?.error;
            if (error && error.name === "QuotaExceededError") {
              console.warn("QuotaExceededError encountered. Pruning audio cache...");
              await this.pruneAudioCache(50, 7 * 24 * 60 * 60 * 1e3);
              try {
                await this.setCachedAudio(cacheKey, audioBuffer);
                resolve();
                return;
              } catch (retryErr) {
                reject(retryErr);
                return;
              }
            }
            reject(error);
          };
        });
      } catch (err2) {
        console.warn("Failed to cache audio in IndexedDB:", err2);
      }
    }
    /**
     * Prunes old or excessive audio cache entries.
     */
    async pruneAudioCache(maxEntries = 200, maxAgeMs = 30 * 24 * 60 * 60 * 1e3) {
      try {
        const db = await this.open();
        const now = Date.now();
        return new Promise((resolve) => {
          const tx = db.transaction("audio_cache", "readwrite");
          const store = tx.objectStore("audio_cache");
          const req = store.getAll();
          req.onsuccess = () => {
            const records = req.result || [];
            let deletedCount = 0;
            const remaining = [];
            for (const rec of records) {
              const age = now - (rec.lastAccessed || rec.createdAt);
              if (age > maxAgeMs) {
                store.delete(rec.cacheKey);
                deletedCount++;
              } else {
                remaining.push(rec);
              }
            }
            if (remaining.length > maxEntries) {
              remaining.sort(
                (a, b) => (a.lastAccessed || a.createdAt) - (b.lastAccessed || b.createdAt)
              );
              const toRemove = remaining.slice(0, remaining.length - maxEntries);
              for (const rec of toRemove) {
                store.delete(rec.cacheKey);
                deletedCount++;
              }
            }
            resolve(deletedCount);
          };
          req.onerror = () => resolve(0);
        });
      } catch {
        return 0;
      }
    }
    /**
     * Clears all items in the audio_cache store.
     */
    async clearAudioCache() {
      try {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("audio_cache", "readwrite");
          const req = tx.objectStore("audio_cache").clear();
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
        });
      } catch (err2) {
        console.warn("Failed to clear audio cache:", err2);
      }
    }
    // ─── Vocabulary History & Management ─────────────────────────────────────
    /**
     * Looks up a vocabulary record by word and language to prevent duplicates.
     */
    async getVocabularyByWord(word, language) {
      try {
        const db = await this.open();
        return new Promise((resolve) => {
          const tx = db.transaction("vocabulary", "readonly");
          const store = tx.objectStore("vocabulary");
          const targetWord = word.toLowerCase().trim();
          if (store.indexNames.contains("word_language")) {
            const index = store.index("word_language");
            const req = index.get([targetWord, language]);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => resolve(null);
          } else {
            const req = store.getAll();
            req.onsuccess = () => {
              const list = req.result || [];
              const match = list.find(
                (r) => r.word.toLowerCase().trim() === targetWord && r.language === language
              );
              resolve(match || null);
            };
            req.onerror = () => resolve(null);
          }
        });
      } catch {
        return null;
      }
    }
    /**
     * Saves a vocabulary record with deduplication. Updates existing record if word+language exists.
     */
    async saveVocabulary(record) {
      try {
        const existing = await this.getVocabularyByWord(record.word, record.language);
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("vocabulary", "readwrite");
          const store = tx.objectStore("vocabulary");
          const now = Date.now();
          let fullRecord;
          if (existing && existing.id !== void 0) {
            fullRecord = {
              ...existing,
              ...record,
              updatedAt: now
            };
            const req = store.put(fullRecord);
            req.onsuccess = () => resolve(fullRecord);
            req.onerror = () => reject(req.error);
          } else {
            fullRecord = {
              ...record,
              createdAt: now
            };
            const req = store.add(fullRecord);
            req.onsuccess = (e) => {
              fullRecord.id = e.target.result;
              resolve(fullRecord);
            };
            req.onerror = () => reject(req.error);
          }
        });
      } catch (err2) {
        console.warn("Failed to save vocabulary in IndexedDB:", err2);
      }
    }
    /**
     * Batch inserts multiple vocabulary records efficiently in a single transaction.
     */
    async saveVocabularyBatch(records) {
      try {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("vocabulary", "readwrite");
          const store = tx.objectStore("vocabulary");
          const now = Date.now();
          let inserted = 0;
          for (const record of records) {
            const fullRecord = {
              ...record,
              createdAt: now
            };
            store.add(fullRecord);
            inserted++;
          }
          tx.oncomplete = () => resolve(inserted);
          tx.onerror = () => reject(tx.error);
        });
      } catch (err2) {
        console.warn("Batch save vocabulary failed:", err2);
        return 0;
      }
    }
    /**
     * Updates fields of an existing vocabulary record by ID.
     */
    async updateVocabulary(id, updates) {
      try {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("vocabulary", "readwrite");
          const store = tx.objectStore("vocabulary");
          const getReq = store.get(id);
          getReq.onsuccess = () => {
            if (!getReq.result) {
              resolve(false);
              return;
            }
            const updatedRecord = {
              ...getReq.result,
              ...updates,
              updatedAt: Date.now()
            };
            const putReq = store.put(updatedRecord);
            putReq.onsuccess = () => resolve(true);
            putReq.onerror = () => reject(putReq.error);
          };
          getReq.onerror = () => reject(getReq.error);
        });
      } catch {
        return false;
      }
    }
    /**
     * Deletes a single vocabulary record by ID.
     */
    async deleteVocabulary(id) {
      try {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("vocabulary", "readwrite");
          const req = tx.objectStore("vocabulary").delete(id);
          req.onsuccess = () => resolve(true);
          req.onerror = () => reject(req.error);
        });
      } catch {
        return false;
      }
    }
    /**
     * Deletes multiple vocabulary records by IDs in a single transaction.
     */
    async deleteVocabularyBatch(ids) {
      try {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("vocabulary", "readwrite");
          const store = tx.objectStore("vocabulary");
          let deleted = 0;
          for (const id of ids) {
            store.delete(id);
            deleted++;
          }
          tx.oncomplete = () => resolve(deleted);
          tx.onerror = () => reject(tx.error);
        });
      } catch {
        return 0;
      }
    }
    /**
     * Retrieves all vocabulary records sorted by createdAt descending.
     */
    async getAllVocabulary() {
      try {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("vocabulary", "readonly");
          const store = tx.objectStore("vocabulary");
          const req = store.getAll();
          req.onsuccess = () => {
            const list = req.result || [];
            list.sort((a, b) => b.createdAt - a.createdAt);
            resolve(list);
          };
          req.onerror = () => reject(req.error);
        });
      } catch {
        return [];
      }
    }
    /**
     * Fetches vocabulary records with cursor-based pagination and optional language filter.
     */
    async getVocabularyPaginated(offset = 0, limit = 50, language) {
      try {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("vocabulary", "readonly");
          const store = tx.objectStore("vocabulary");
          const items = [];
          let total = 0;
          let skipped = 0;
          const req = store.openCursor(null, "prev");
          req.onsuccess = (e) => {
            const cursor = e.target.result;
            if (!cursor) {
              resolve({ items, total });
              return;
            }
            const record = cursor.value;
            const matchesLang = !language || record.language === language;
            if (matchesLang) {
              total++;
              if (skipped < offset) {
                skipped++;
              } else if (items.length < limit) {
                items.push(record);
              }
            }
            cursor.continue();
          };
          req.onerror = () => reject(req.error);
        });
      } catch {
        return { items: [], total: 0 };
      }
    }
    /**
     * Clears all items in the vocabulary store.
     */
    async clearAllVocabulary() {
      try {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("vocabulary", "readwrite");
          const req = tx.objectStore("vocabulary").clear();
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
        });
      } catch (err2) {
        console.warn("Failed to clear vocabulary:", err2);
      }
    }
    /**
     * Deletes the entire IndexedDB database safely, closing active connections first.
     */
    async deleteDatabase() {
      this.close();
      return new Promise((resolve) => {
        const req = indexedDB.deleteDatabase(this.dbName);
        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
        req.onblocked = () => {
          console.warn("Database deletion blocked by open connection.");
          resolve(false);
        };
      });
    }
  };

  // src/utils/chrome.ts
  function SendChromeMessage(tabId, message, catchError, errorMessage) {
    if (catchError) {
      return chrome.tabs.sendMessage(tabId, message).catch((err2) => {
        console.warn(
          errorMessage || "",
          err2
        );
      });
    }
    return chrome.tabs.sendMessage(tabId, message);
  }

  // src/popup.ts
  var import_sql = __toESM(require_sql_wasm_browser());

  // node_modules/ankipack/dist/error.js
  var AnkipackError = class extends Error {
    code;
    constructor(code, message) {
      super(message);
      this.name = "AnkipackError";
      this.code = code;
    }
  };
  function fail(code, message) {
    throw new AnkipackError(code, message);
  }

  // node_modules/@bufbuild/protobuf/dist/esm/is-message.js
  function isMessage(arg, schema) {
    const isMessage2 = arg !== null && typeof arg == "object" && "$typeName" in arg && typeof arg.$typeName == "string";
    if (!isMessage2) {
      return false;
    }
    if (schema === void 0) {
      return true;
    }
    return schema.typeName === arg.$typeName;
  }

  // node_modules/@bufbuild/protobuf/dist/esm/descriptors.js
  var ScalarType;
  (function(ScalarType2) {
    ScalarType2[ScalarType2["DOUBLE"] = 1] = "DOUBLE";
    ScalarType2[ScalarType2["FLOAT"] = 2] = "FLOAT";
    ScalarType2[ScalarType2["INT64"] = 3] = "INT64";
    ScalarType2[ScalarType2["UINT64"] = 4] = "UINT64";
    ScalarType2[ScalarType2["INT32"] = 5] = "INT32";
    ScalarType2[ScalarType2["FIXED64"] = 6] = "FIXED64";
    ScalarType2[ScalarType2["FIXED32"] = 7] = "FIXED32";
    ScalarType2[ScalarType2["BOOL"] = 8] = "BOOL";
    ScalarType2[ScalarType2["STRING"] = 9] = "STRING";
    ScalarType2[ScalarType2["BYTES"] = 12] = "BYTES";
    ScalarType2[ScalarType2["UINT32"] = 13] = "UINT32";
    ScalarType2[ScalarType2["SFIXED32"] = 15] = "SFIXED32";
    ScalarType2[ScalarType2["SFIXED64"] = 16] = "SFIXED64";
    ScalarType2[ScalarType2["SINT32"] = 17] = "SINT32";
    ScalarType2[ScalarType2["SINT64"] = 18] = "SINT64";
  })(ScalarType || (ScalarType = {}));

  // node_modules/@bufbuild/protobuf/dist/esm/wire/varint.js
  function varint64read() {
    const buf = this.buf;
    let pos = this.pos;
    let lo = 0;
    let hi = 0;
    for (let shift = 0; shift < 28; shift += 7) {
      const b = buf[pos++];
      lo |= (b & 127) << shift;
      if ((b & 128) == 0) {
        this.pos = pos;
        this.assertBounds();
        this.varint64Lo = lo;
        this.varint64Hi = hi;
        return;
      }
    }
    const middleByte = buf[pos++];
    lo |= (middleByte & 15) << 28;
    hi = (middleByte & 112) >> 4;
    if ((middleByte & 128) == 0) {
      this.pos = pos;
      this.assertBounds();
      this.varint64Lo = lo;
      this.varint64Hi = hi;
      return;
    }
    for (let shift = 3; shift <= 31; shift += 7) {
      const b = buf[pos++];
      hi |= (b & 127) << shift;
      if ((b & 128) == 0) {
        this.pos = pos;
        this.assertBounds();
        this.varint64Lo = lo;
        this.varint64Hi = hi;
        return;
      }
    }
    throw new Error("invalid varint");
  }
  var TWO_PWR_32_DBL = 4294967296;
  function int64FromString(dec) {
    const minus = dec[0] === "-";
    if (minus) {
      dec = dec.slice(1);
    }
    const base = 1e6;
    let lowBits = 0;
    let highBits = 0;
    function add1e6digit(begin, end) {
      const digit1e6 = Number(dec.slice(begin, end));
      highBits *= base;
      lowBits = lowBits * base + digit1e6;
      if (lowBits >= TWO_PWR_32_DBL) {
        highBits = highBits + (lowBits / TWO_PWR_32_DBL | 0);
        lowBits = lowBits % TWO_PWR_32_DBL;
      }
    }
    add1e6digit(-24, -18);
    add1e6digit(-18, -12);
    add1e6digit(-12, -6);
    add1e6digit(-6);
    return minus ? negate(lowBits, highBits) : newBits(lowBits, highBits);
  }
  function int64ToString(lo, hi) {
    let bits = newBits(lo, hi);
    const negative = bits.hi & 2147483648;
    if (negative) {
      bits = negate(bits.lo, bits.hi);
    }
    const result = uInt64ToString(bits.lo, bits.hi);
    return negative ? "-" + result : result;
  }
  function uInt64ToString(lo, hi) {
    ({ lo, hi } = toUnsigned(lo, hi));
    if (hi <= 2097151) {
      return String(TWO_PWR_32_DBL * hi + lo);
    }
    const low = lo & 16777215;
    const mid = (lo >>> 24 | hi << 8) & 16777215;
    const high = hi >> 16 & 65535;
    let digitA = low + mid * 6777216 + high * 6710656;
    let digitB = mid + high * 8147497;
    let digitC = high * 2;
    const base = 1e7;
    if (digitA >= base) {
      digitB += Math.floor(digitA / base);
      digitA %= base;
    }
    if (digitB >= base) {
      digitC += Math.floor(digitB / base);
      digitB %= base;
    }
    return digitC.toString() + decimalFrom1e7WithLeadingZeros(digitB) + decimalFrom1e7WithLeadingZeros(digitA);
  }
  function toUnsigned(lo, hi) {
    return { lo: lo >>> 0, hi: hi >>> 0 };
  }
  function newBits(lo, hi) {
    return { lo: lo | 0, hi: hi | 0 };
  }
  function negate(lowBits, highBits) {
    highBits = ~highBits;
    if (lowBits) {
      lowBits = ~lowBits + 1;
    } else {
      highBits += 1;
    }
    return newBits(lowBits, highBits);
  }
  var decimalFrom1e7WithLeadingZeros = (digit1e7) => {
    const partial = String(digit1e7);
    return "0000000".slice(partial.length) + partial;
  };
  function varint32write(value, bytes) {
    if (value >>> 0 < 128) {
      bytes.push(value);
      return;
    }
    if (value >= 0) {
      while (value > 127) {
        bytes.push(value & 127 | 128);
        value = value >>> 7;
      }
      bytes.push(value);
    } else {
      for (let i2 = 0; i2 < 9; i2++) {
        bytes.push(value & 127 | 128);
        value = value >> 7;
      }
      bytes.push(1);
    }
  }
  function varint32read() {
    let b = this.buf[this.pos++];
    if ((b & 128) === 0) {
      this.assertBounds();
      return b;
    }
    let result = b & 127;
    b = this.buf[this.pos++];
    result |= (b & 127) << 7;
    if ((b & 128) === 0) {
      this.assertBounds();
      return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 127) << 14;
    if ((b & 128) === 0) {
      this.assertBounds();
      return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 127) << 21;
    if ((b & 128) === 0) {
      this.assertBounds();
      return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 15) << 28;
    for (let readBytes = 5; (b & 128) !== 0 && readBytes < 10; readBytes++)
      b = this.buf[this.pos++];
    if ((b & 128) !== 0)
      throw new Error("invalid varint");
    this.assertBounds();
    return result >>> 0;
  }

  // node_modules/@bufbuild/protobuf/dist/esm/proto-int64.js
  var protoInt64 = /* @__PURE__ */ makeInt64Support();
  function makeInt64Support() {
    const dv = new DataView(new ArrayBuffer(8));
    const ok = typeof BigInt === "function" && typeof dv.getBigInt64 === "function" && typeof dv.getBigUint64 === "function" && typeof dv.setBigInt64 === "function" && typeof dv.setBigUint64 === "function" && (!!globalThis.Deno || !!globalThis.Bun || typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1");
    if (ok) {
      const MIN = BigInt("-9223372036854775808");
      const MAX = BigInt("9223372036854775807");
      const UMIN = BigInt("0");
      const UMAX = BigInt("18446744073709551615");
      return {
        zero: BigInt(0),
        supported: true,
        parse(value) {
          const bi = typeof value == "bigint" ? value : BigInt(value);
          if (bi > MAX || bi < MIN) {
            throw new Error(`invalid int64: ${value}`);
          }
          return bi;
        },
        uParse(value) {
          const bi = typeof value == "bigint" ? value : BigInt(value);
          if (bi > UMAX || bi < UMIN) {
            throw new Error(`invalid uint64: ${value}`);
          }
          return bi;
        },
        enc(value) {
          dv.setBigInt64(0, this.parse(value), true);
          return {
            lo: dv.getInt32(0, true),
            hi: dv.getInt32(4, true)
          };
        },
        uEnc(value) {
          dv.setBigInt64(0, this.uParse(value), true);
          return {
            lo: dv.getInt32(0, true),
            hi: dv.getInt32(4, true)
          };
        },
        dec(lo, hi) {
          dv.setInt32(0, lo, true);
          dv.setInt32(4, hi, true);
          return dv.getBigInt64(0, true);
        },
        uDec(lo, hi) {
          dv.setInt32(0, lo, true);
          dv.setInt32(4, hi, true);
          return dv.getBigUint64(0, true);
        }
      };
    }
    return {
      zero: "0",
      supported: false,
      parse(value) {
        if (typeof value != "string") {
          value = value.toString();
        }
        assertInt64String(value);
        return value;
      },
      uParse(value) {
        if (typeof value != "string") {
          value = value.toString();
        }
        assertUInt64String(value);
        return value;
      },
      enc(value) {
        if (typeof value != "string") {
          value = value.toString();
        }
        assertInt64String(value);
        return int64FromString(value);
      },
      uEnc(value) {
        if (typeof value != "string") {
          value = value.toString();
        }
        assertUInt64String(value);
        return int64FromString(value);
      },
      dec(lo, hi) {
        return int64ToString(lo, hi);
      },
      uDec(lo, hi) {
        return uInt64ToString(lo, hi);
      }
    };
  }
  function assertInt64String(value) {
    if (!/^-?[0-9]+$/.test(value)) {
      throw new Error("invalid int64: " + value);
    }
  }
  function assertUInt64String(value) {
    if (!/^[0-9]+$/.test(value)) {
      throw new Error("invalid uint64: " + value);
    }
  }

  // node_modules/@bufbuild/protobuf/dist/esm/reflect/scalar.js
  function scalarZeroValue(type, longAsString) {
    switch (type) {
      case ScalarType.STRING:
        return "";
      case ScalarType.BOOL:
        return false;
      case ScalarType.DOUBLE:
      case ScalarType.FLOAT:
        return 0;
      case ScalarType.INT64:
      case ScalarType.UINT64:
      case ScalarType.SFIXED64:
      case ScalarType.FIXED64:
      case ScalarType.SINT64:
        return longAsString ? "0" : protoInt64.zero;
      case ScalarType.BYTES:
        return new Uint8Array(0);
      default:
        return 0;
    }
  }

  // node_modules/@bufbuild/protobuf/dist/esm/reflect/unsafe.js
  function unsafeIsSetExplicit(target, localName) {
    return Object.prototype.hasOwnProperty.call(target, localName) && target[localName] !== void 0;
  }
  function setOwn(obj, key, value) {
    if (key === "__proto__") {
      Object.defineProperty(obj, "__proto__", {
        value,
        writable: true,
        enumerable: true,
        configurable: true
      });
    } else {
      obj[key] = value;
    }
  }

  // node_modules/@bufbuild/protobuf/dist/esm/reflect/guard.js
  function isObject(arg) {
    return arg !== null && typeof arg == "object" && !Array.isArray(arg);
  }

  // node_modules/@bufbuild/protobuf/dist/esm/wkt/wrappers.js
  function isWrapperDesc(messageDesc2) {
    const f = messageDesc2.fields[0];
    return isWrapperTypeName(messageDesc2.typeName) && f !== void 0 && f.fieldKind == "scalar" && f.name == "value" && f.number == 1;
  }
  var wrapperTypeNames = /* @__PURE__ */ new Set([
    "google.protobuf.DoubleValue",
    "google.protobuf.FloatValue",
    "google.protobuf.Int64Value",
    "google.protobuf.UInt64Value",
    "google.protobuf.Int32Value",
    "google.protobuf.UInt32Value",
    "google.protobuf.BoolValue",
    "google.protobuf.StringValue",
    "google.protobuf.BytesValue"
  ]);
  function isWrapperTypeName(name) {
    return wrapperTypeNames.has(name);
  }

  // node_modules/@bufbuild/protobuf/dist/esm/create.js
  var EDITION_PROTO3 = 999;
  var EDITION_PROTO2 = 998;
  var IMPLICIT = 2;
  function create(schema, init) {
    if (isMessage(init, schema)) {
      return init;
    }
    return compiledCreate(schema)(init);
  }
  var compiledCreates = /* @__PURE__ */ new WeakMap();
  function compiledCreate(desc) {
    let compiled = compiledCreates.get(desc);
    if (compiled === void 0) {
      compiled = compileCreate(desc);
      compiledCreates.set(desc, compiled);
    }
    return compiled;
  }
  var INIT_SINGULAR = 0;
  var INIT_LIST = 1;
  var INIT_MAP = 2;
  var INIT_ONEOF = 3;
  function compileCreate(desc) {
    const typeName = desc.typeName;
    const { properties, prototype } = compileInitMessage(desc);
    return (init) => {
      let message;
      if (prototype !== void 0) {
        message = Object.create(prototype);
        message.$typeName = typeName;
      } else {
        message = { $typeName: typeName };
      }
      for (let i2 = 0; i2 < properties.length; i2++) {
        const property = properties[i2];
        const name = property.name;
        const initValue = init === null || init === void 0 ? void 0 : init[name];
        switch (property.kind) {
          case INIT_SINGULAR:
            if (initValue != null) {
              message[name] = property.convert !== void 0 ? property.convert(initValue) : initValue;
            } else if (property.constant !== void 0) {
              message[name] = property.constant;
            }
            break;
          case INIT_LIST:
            message[name] = property.convert !== void 0 && Array.isArray(initValue) ? initValue.map(property.convert) : initValue !== null && initValue !== void 0 ? initValue : [];
            break;
          case INIT_MAP:
            if (property.convert === void 0 || !isObject(initValue)) {
              message[name] = initValue !== null && initValue !== void 0 ? initValue : {};
            } else {
              const converted = {};
              const keys = Object.keys(initValue);
              for (let k = 0; k < keys.length; k++) {
                setOwn(converted, keys[k], property.convert(initValue[keys[k]]));
              }
              message[name] = converted;
            }
            break;
          case INIT_ONEOF: {
            const oneofValue = initValue;
            if ((oneofValue === null || oneofValue === void 0 ? void 0 : oneofValue.case) != null) {
              const convert = property.convert.get(oneofValue.case);
              if (convert !== void 0) {
                message[name] = {
                  case: oneofValue.case,
                  value: convert(oneofValue.value)
                };
                break;
              }
            }
            message[name] = { case: void 0 };
            break;
          }
        }
      }
      return message;
    };
  }
  function compileInitMessage(desc) {
    var _a2, _b2;
    const properties = [];
    const prototype = {};
    const usePrototype = needsPrototypeChain(desc);
    for (const member of desc.members) {
      const name = member.localName;
      if (member.kind == "oneof") {
        properties.push({
          name,
          kind: INIT_ONEOF,
          constant: void 0,
          convert: compileConvertOneof(member)
        });
        continue;
      }
      switch (member.fieldKind) {
        case "message": {
          properties.push({
            name,
            kind: INIT_SINGULAR,
            constant: void 0,
            convert: compileConvertMessage(member)
          });
          break;
        }
        case "list": {
          properties.push({
            name,
            kind: INIT_LIST,
            constant: void 0,
            convert: member.listKind == "message" ? (_a2 = compileConvertMessage(member)) !== null && _a2 !== void 0 ? _a2 : ((value) => value) : member.scalar == ScalarType.BYTES ? toU8Arr : void 0
          });
          break;
        }
        case "map": {
          properties.push({
            name,
            kind: INIT_MAP,
            constant: void 0,
            convert: member.mapKind == "message" ? (_b2 = compileConvertMessage(member)) !== null && _b2 !== void 0 ? _b2 : ((value) => value) : member.scalar == ScalarType.BYTES ? toU8Arr : void 0
          });
          break;
        }
        default: {
          const zeroValue = createZeroValue(member);
          properties.push({
            name,
            kind: INIT_SINGULAR,
            constant: member.presence == IMPLICIT ? zeroValue : void 0,
            convert: member.fieldKind == "scalar" && member.scalar == ScalarType.BYTES ? toU8Arr : void 0
          });
          if (usePrototype) {
            prototype[name] = zeroValue;
          }
          break;
        }
      }
    }
    return {
      properties,
      prototype: usePrototype ? prototype : void 0
    };
  }
  function compileConvertOneof(oneof) {
    const converters = /* @__PURE__ */ new Map();
    for (const field of oneof.fields) {
      let convert;
      if (field.fieldKind == "message") {
        convert = compileConvertMessage(field);
      } else if (field.fieldKind == "scalar" && field.scalar == ScalarType.BYTES) {
        convert = toU8Arr;
      }
      converters.set(field.localName, convert !== null && convert !== void 0 ? convert : ((value) => value));
    }
    return converters;
  }
  function compileConvertMessage(field) {
    if (field.fieldKind == "message" && !field.oneof && isWrapperDesc(field.message)) {
      return field.message.fields[0].scalar == ScalarType.BYTES ? toU8Arr : void 0;
    }
    if (field.message.typeName == "google.protobuf.Struct" && field.parent.typeName !== "google.protobuf.Value") {
      return void 0;
    }
    const messageDesc2 = field.message;
    let compiled;
    return (value) => {
      if (!isObject(value) || isMessage(value, messageDesc2)) {
        return value;
      }
      compiled !== null && compiled !== void 0 ? compiled : compiled = compiledCreate(messageDesc2);
      return compiled(value);
    };
  }
  function toU8Arr(value) {
    return Array.isArray(value) ? new Uint8Array(value) : value;
  }
  function needsPrototypeChain(desc) {
    switch (desc.file.edition) {
      case EDITION_PROTO3:
        return false;
      case EDITION_PROTO2:
        return true;
      default:
        return desc.fields.some((f) => f.presence != IMPLICIT && f.fieldKind != "message" && !f.oneof);
    }
  }
  function createZeroValue(field) {
    const defaultValue = field.getDefaultValue();
    if (defaultValue !== void 0) {
      return field.fieldKind == "scalar" && field.longAsString ? defaultValue.toString() : defaultValue;
    }
    return field.fieldKind == "scalar" ? scalarZeroValue(field.scalar, field.longAsString) : field.enum.values[0].number;
  }

  // node_modules/@bufbuild/protobuf/dist/esm/reflect/error.js
  var FieldError = class extends Error {
    constructor(fieldOrOneof, message, name = "FieldValueInvalidError") {
      super(message);
      this.name = name;
      this.field = () => fieldOrOneof;
    }
  };

  // node_modules/@bufbuild/protobuf/dist/esm/wire/text-encoding.js
  var te;
  function configureTextEncoding(textEncoding) {
    var _a2;
    te = Object.assign(Object.assign({}, textEncoding), { encodeUtf8Into: (_a2 = textEncoding.encodeUtf8Into) !== null && _a2 !== void 0 ? _a2 : emulateEncodeInto(textEncoding.encodeUtf8.bind(textEncoding)) });
  }
  function getTextEncoding() {
    if (!te) {
      const globals = globalThis;
      if (!globals.TextEncoder || !globals.TextDecoder) {
        throw new Error("encoding API missing: install TextEncoder and TextDecoder on globalThis");
      }
      const textEncoder = new globals.TextEncoder();
      const textDecoder = new globals.TextDecoder();
      let textDecoderStrict;
      const config = {
        encodeUtf8(text) {
          return textEncoder.encode(text);
        },
        decodeUtf8(bytes, strict) {
          if (strict) {
            if (!textDecoderStrict) {
              textDecoderStrict = new globals.TextDecoder("utf-8", {
                fatal: true
              });
            }
            return textDecoderStrict.decode(bytes);
          }
          return textDecoder.decode(bytes);
        },
        checkUtf8(text) {
          try {
            encodeURIComponent(text);
            return true;
          } catch (_) {
            return false;
          }
        }
      };
      if (textEncoder.encodeInto) {
        config.encodeUtf8Into = textEncoder.encodeInto.bind(textEncoder);
      }
      const nativeStringIsWellFormed = String.prototype.isWellFormed;
      if (nativeStringIsWellFormed) {
        config.checkUtf8 = (text) => {
          return nativeStringIsWellFormed.call(text);
        };
      }
      configureTextEncoding(config);
    }
    return te;
  }
  function emulateEncodeInto(encodeUtf8) {
    return (text, dest) => {
      const bytes = encodeUtf8(text);
      dest.set(bytes);
      return { written: bytes.byteLength };
    };
  }

  // node_modules/@bufbuild/protobuf/dist/esm/wire/binary-encoding.js
  var WireType;
  (function(WireType2) {
    WireType2[WireType2["Varint"] = 0] = "Varint";
    WireType2[WireType2["Bit64"] = 1] = "Bit64";
    WireType2[WireType2["LengthDelimited"] = 2] = "LengthDelimited";
    WireType2[WireType2["StartGroup"] = 3] = "StartGroup";
    WireType2[WireType2["EndGroup"] = 4] = "EndGroup";
    WireType2[WireType2["Bit32"] = 5] = "Bit32";
  })(WireType || (WireType = {}));
  var UINT32_MAX = 4294967295;
  var INT32_MAX = 2147483647;
  var INT32_MIN = -2147483648;
  var BinaryWriter = class {
    constructor(encodeUtf8) {
      this.stackPos = [];
      this.encodeUtf8Into = encodeUtf8 ? emulateEncodeInto(encodeUtf8) : getTextEncoding().encodeUtf8Into;
      this.buffer = EMPTY_BUFFER;
      this.viewCache = EMPTY_VIEW;
      this.pos = 0;
    }
    ensureCapacity(size) {
      const required = this.pos + size;
      if (required > this.buffer.length) {
        let newLen = this.buffer.length || INITIAL_SIZE;
        while (newLen < required)
          newLen *= 2;
        const newBuf = new Uint8Array(newLen);
        if (this.pos > 0)
          newBuf.set(this.buffer);
        this.buffer = newBuf;
      }
    }
    /**
     * The DataView over `buffer`, rebuilt only if the buffer has grown since it
     * was last used.
     */
    view() {
      const bytes = this.buffer;
      const view = this.viewCache;
      if (view.byteLength === bytes.byteLength)
        return view;
      const newView = new DataView(bytes.buffer);
      this.viewCache = newView;
      return newView;
    }
    /**
     * Return all bytes written and reset this writer.
     */
    finish() {
      const result = this.buffer.slice(0, this.pos);
      this.pos = 0;
      this.stackPos = [];
      return result;
    }
    /**
     * Start a new fork for length-delimited data like a message
     * or a packed repeated field.
     *
     * Must be joined later with `join()`.
     */
    fork() {
      this.stackPos.push(this.pos);
      this.ensureCapacity(DEFAULT_LEN_PREFIX_SIZE);
      this.buffer[this.pos++] = 0;
      return this;
    }
    /**
     * Join the last fork. Write its length and bytes, then
     * return to the previous state.
     */
    join() {
      const forkPos = this.stackPos.pop();
      if (forkPos === void 0)
        throw new Error("invalid state, fork stack empty");
      const len = this.pos - forkPos - DEFAULT_LEN_PREFIX_SIZE;
      const lenPrefixSize = varint32Size(len);
      if (lenPrefixSize > DEFAULT_LEN_PREFIX_SIZE) {
        this.ensureCapacity(lenPrefixSize - DEFAULT_LEN_PREFIX_SIZE);
        this.buffer.copyWithin(forkPos + lenPrefixSize, forkPos + DEFAULT_LEN_PREFIX_SIZE, this.pos);
      }
      this.pos = forkPos;
      this.uint32(len);
      this.pos += len;
      return this;
    }
    /**
     * Writes a tag (field number and wire type).
     *
     * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
     *
     * Generated code should compute the tag ahead of time and call `uint32()`.
     */
    tag(fieldNo, type) {
      return this.uint32((fieldNo << 3 | type) >>> 0);
    }
    /**
     * Write a chunk of raw bytes.
     */
    raw(chunk) {
      this.ensureCapacity(chunk.length);
      this.buffer.set(chunk, this.pos);
      this.pos += chunk.length;
      return this;
    }
    /**
     * Write a `uint32` value, an unsigned 32 bit varint.
     */
    uint32(value) {
      assertUInt32(value);
      this.ensureCapacity(5);
      if (value < 128) {
        this.buffer[this.pos++] = value;
        return this;
      }
      while (value > 127) {
        this.buffer[this.pos++] = value & 127 | 128;
        value >>>= 7;
      }
      this.buffer[this.pos++] = value;
      return this;
    }
    /**
     * Write a `int32` value, a signed 32 bit varint.
     */
    int32(value) {
      assertInt32(value);
      if (value >= 0) {
        return this.uint32(value);
      }
      this.ensureCapacity(10);
      for (let i2 = 0; i2 < 9; i2++) {
        this.buffer[this.pos++] = value & 127 | 128;
        value >>= 7;
      }
      this.buffer[this.pos++] = 1;
      return this;
    }
    /**
     * Write a `bool` value, a varint.
     */
    bool(value) {
      this.ensureCapacity(1);
      this.buffer[this.pos++] = value ? 1 : 0;
      return this;
    }
    /**
     * Write a `bytes` value, length-delimited arbitrary data.
     */
    bytes(value) {
      this.uint32(value.byteLength);
      return this.raw(value);
    }
    /**
     * Write a `string` value, length-delimited data converted to UTF-8 text.
     */
    string(value) {
      if (typeof value !== "string") {
        value = String(value);
      }
      const len = value.length;
      if (len <= ASCII_MAX_LENGTH) {
        this.ensureCapacity(len + 1);
        const ascii = this.buffer;
        let pos = this.pos;
        ascii[pos++] = len;
        let i2 = 0;
        for (; i2 < len; i2++) {
          const code = value.charCodeAt(i2);
          if (code > 127)
            break;
          ascii[pos++] = code;
        }
        if (i2 == len) {
          this.pos = pos;
          return this;
        }
      }
      this.ensureCapacity(len * 3 + 5);
      const lenPrefixSizeGuess = varint32Size(len);
      const buf = this.buffer;
      const start = this.pos;
      const { written } = this.encodeUtf8Into(value, buf.subarray(start + lenPrefixSizeGuess));
      const lenPrefixSize = varint32Size(written);
      if (lenPrefixSize != lenPrefixSizeGuess) {
        buf.copyWithin(start + lenPrefixSize, start + lenPrefixSizeGuess, start + lenPrefixSizeGuess + written);
      }
      this.uint32(written);
      this.pos += written;
      return this;
    }
    /**
     * Write a `float` value, 32-bit floating point number.
     */
    float(value) {
      assertFloat32(value);
      this.ensureCapacity(4);
      this.view().setFloat32(this.pos, value, true);
      this.pos += 4;
      return this;
    }
    /**
     * Write a `double` value, a 64-bit floating point number.
     */
    double(value) {
      this.ensureCapacity(8);
      this.view().setFloat64(this.pos, value, true);
      this.pos += 8;
      return this;
    }
    /**
     * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
     */
    fixed32(value) {
      assertUInt32(value);
      this.ensureCapacity(4);
      this.view().setUint32(this.pos, value, true);
      this.pos += 4;
      return this;
    }
    /**
     * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
     */
    sfixed32(value) {
      assertInt32(value);
      this.ensureCapacity(4);
      this.view().setInt32(this.pos, value, true);
      this.pos += 4;
      return this;
    }
    /**
     * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
     */
    sint32(value) {
      assertInt32(value);
      return this.uint32((value << 1 ^ value >> 31) >>> 0);
    }
    /**
     * Write a `sfixed64` value, a signed, fixed-length 64-bit integer.
     */
    sfixed64(value) {
      const tc = protoInt64.enc(value);
      this.ensureCapacity(8);
      const view = this.view();
      view.setInt32(this.pos, tc.lo, true);
      view.setInt32(this.pos + 4, tc.hi, true);
      this.pos += 8;
      return this;
    }
    /**
     * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
     */
    fixed64(value) {
      const tc = protoInt64.uEnc(value);
      this.ensureCapacity(8);
      const view = this.view();
      view.setInt32(this.pos, tc.lo, true);
      view.setInt32(this.pos + 4, tc.hi, true);
      this.pos += 8;
      return this;
    }
    /**
     * Write a `int64` value, a signed 64-bit varint.
     */
    int64(value) {
      const tc = protoInt64.enc(value);
      return this.writeVarint64(tc.lo, tc.hi);
    }
    /**
     * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
     */
    sint64(value) {
      const tc = protoInt64.enc(value), sign = tc.hi >> 31, lo = tc.lo << 1 ^ sign, hi = (tc.hi << 1 | tc.lo >>> 31) ^ sign;
      return this.writeVarint64(lo, hi);
    }
    /**
     * Write a `uint64` value, an unsigned 64-bit varint.
     */
    uint64(value) {
      const tc = protoInt64.uEnc(value);
      return this.writeVarint64(tc.lo, tc.hi);
    }
    /**
     * Write a 64-bit varint directly into the buffer. Accepts the value as
     * split low/high 32-bit words.
     *
     * Ported from varint64write() to avoid the intermediate number[] buffer.
     * See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/writer.js#L344
     */
    writeVarint64(lo, hi) {
      this.ensureCapacity(10);
      const buf = this.buffer;
      let pos = this.pos;
      for (let i2 = 0; i2 < 28; i2 = i2 + 7) {
        const shift = lo >>> i2;
        const hasNext = !(shift >>> 7 == 0 && hi == 0);
        buf[pos++] = (hasNext ? shift | 128 : shift) & 255;
        if (!hasNext) {
          this.pos = pos;
          return this;
        }
      }
      const splitBits = lo >>> 28 & 15 | (hi & 7) << 4;
      const hasMoreBits = !(hi >> 3 == 0);
      buf[pos++] = (hasMoreBits ? splitBits | 128 : splitBits) & 255;
      if (!hasMoreBits) {
        this.pos = pos;
        return this;
      }
      for (let i2 = 3; i2 < 31; i2 = i2 + 7) {
        const shift = hi >>> i2;
        const hasNext = !(shift >>> 7 == 0);
        buf[pos++] = (hasNext ? shift | 128 : shift) & 255;
        if (!hasNext) {
          this.pos = pos;
          return this;
        }
      }
      buf[pos++] = hi >>> 31 & 1;
      this.pos = pos;
      return this;
    }
  };
  var INITIAL_SIZE = 128;
  var DEFAULT_LEN_PREFIX_SIZE = 1;
  var EMPTY_BUFFER = new Uint8Array(0);
  var EMPTY_VIEW = new DataView(EMPTY_BUFFER.buffer);
  var ASCII_MAX_LENGTH = 32;
  function varint32Size(value) {
    if (value < 128)
      return 1;
    if (value < 16384)
      return 2;
    if (value < 2097152)
      return 3;
    if (value < 268435456)
      return 4;
    return 5;
  }
  var BinaryReader = class {
    constructor(buf, decodeUtf8 = getTextEncoding().decodeUtf8) {
      this.decodeUtf8 = decodeUtf8;
      this.varint64Lo = 0;
      this.varint64Hi = 0;
      this.varint64 = varint64read;
      this.uint32 = varint32read;
      this.buf = buf;
      this.len = buf.length;
      this.pos = 0;
      this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    /**
     * Reads a tag - field number and wire type. Tags are uint32 varints; values
     * that do not fit in uint32 are rejected.
     */
    tag() {
      const start = this.pos;
      const tag = this.uint32();
      const bytesRead = this.pos - start;
      if (bytesRead > 5 || bytesRead == 5 && this.buf[this.pos - 1] > 15) {
        throw new Error("illegal tag: varint overflows uint32");
      }
      const fieldNo = tag >>> 3;
      const wireType = tag & 7;
      if (fieldNo <= 0 || wireType > 5) {
        throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
      }
      return [fieldNo, wireType];
    }
    /**
     * Skip one element and return the skipped data.
     *
     * When skipping StartGroup, provide the tags field number to check for
     * matching field number in the EndGroup tag. Recursion into nested groups
     * is guarded by the `recursionLimit` argument: When the limit is reached,
     * this method throws.
     */
    skip(wireType, fieldNo, recursionLimit = 100) {
      let start = this.pos;
      switch (wireType) {
        case WireType.Varint:
          while (this.buf[this.pos++] & 128) {
          }
          break;
        // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
        case WireType.Bit64:
          this.pos += 4;
        case WireType.Bit32:
          this.pos += 4;
          break;
        case WireType.LengthDelimited:
          let len = this.uint32();
          this.pos += len;
          break;
        case WireType.StartGroup:
          if (recursionLimit <= 0) {
            throw new Error("maximum recursion depth reached");
          }
          for (; ; ) {
            const [fn, wt] = this.tag();
            if (wt === WireType.EndGroup) {
              if (fieldNo !== void 0 && fn !== fieldNo) {
                throw new Error("invalid end group tag");
              }
              break;
            }
            this.skip(wt, fn, recursionLimit - 1);
          }
          break;
        default:
          throw new Error("cant skip wire type " + wireType);
      }
      this.assertBounds();
      return this.buf.subarray(start, this.pos);
    }
    /**
     * Throws error if position in byte array is out of range.
     */
    assertBounds() {
      if (this.pos > this.len)
        throw new RangeError("premature EOF");
    }
    /**
     * Read a `int32` field, a signed 32 bit varint.
     */
    int32() {
      return this.uint32() | 0;
    }
    /**
     * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
     */
    sint32() {
      let zze = this.uint32();
      return zze >>> 1 ^ -(zze & 1);
    }
    /**
     * Read a `int64` field, a signed 64-bit varint.
     */
    int64() {
      this.varint64();
      return protoInt64.dec(this.varint64Lo, this.varint64Hi);
    }
    /**
     * Read a `uint64` field, an unsigned 64-bit varint.
     */
    uint64() {
      this.varint64();
      return protoInt64.uDec(this.varint64Lo, this.varint64Hi);
    }
    /**
     * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
     */
    sint64() {
      this.varint64();
      let lo = this.varint64Lo;
      let hi = this.varint64Hi;
      let s = -(lo & 1);
      lo = (lo >>> 1 | (hi & 1) << 31) ^ s;
      hi = hi >>> 1 ^ s;
      return protoInt64.dec(lo, hi);
    }
    /**
     * Read a `bool` field, a variant.
     */
    bool() {
      const b = this.buf[this.pos];
      if (b < 128) {
        this.pos++;
        return b !== 0;
      }
      this.varint64();
      return this.varint64Lo !== 0 || this.varint64Hi !== 0;
    }
    /**
     * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
     */
    fixed32() {
      return this.view.getUint32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
     */
    sfixed32() {
      return this.view.getInt32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
     */
    fixed64() {
      return protoInt64.uDec(this.sfixed32(), this.sfixed32());
    }
    /**
     * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
     */
    sfixed64() {
      return protoInt64.dec(this.sfixed32(), this.sfixed32());
    }
    /**
     * Read a `float` field, 32-bit floating point number.
     */
    float() {
      return this.view.getFloat32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `double` field, a 64-bit floating point number.
     */
    double() {
      return this.view.getFloat64((this.pos += 8) - 8, true);
    }
    /**
     * Read a `bytes` field, length-delimited arbitrary data.
     */
    bytes() {
      let len = this.uint32(), start = this.pos;
      this.pos += len;
      this.assertBounds();
      return this.buf.subarray(start, start + len);
    }
    /**
     * Read a `string` field, length-delimited data converted to UTF-8 text. If
     * `strict` is true, throw on invalid UTF-8 instead of substituting U+FFFD.
     */
    string(strict) {
      const bytes = this.bytes();
      const len = bytes.length;
      if (len <= ASCII_MAX_LENGTH) {
        const codes = new Array(len);
        for (let i2 = 0; i2 < len; i2++) {
          const byte = bytes[i2];
          if (byte > 127) {
            return this.decodeUtf8(bytes, strict);
          }
          codes[i2] = byte;
        }
        return String.fromCharCode.apply(String, codes);
      }
      return this.decodeUtf8(bytes, strict);
    }
  };
  function assertInt32(arg) {
    if (typeof arg == "string") {
      arg = Number(arg);
    } else if (typeof arg != "number") {
      throw new Error("invalid int32: " + typeof arg);
    }
    if (!Number.isInteger(arg) || arg > INT32_MAX || arg < INT32_MIN)
      throw new Error("invalid int32: " + arg);
  }
  function assertUInt32(arg) {
    if (typeof arg == "string") {
      arg = Number(arg);
    } else if (typeof arg != "number") {
      throw new Error("invalid uint32: " + typeof arg);
    }
    if (!Number.isInteger(arg) || arg > UINT32_MAX || arg < 0)
      throw new Error("invalid uint32: " + arg);
  }
  function assertFloat32(arg) {
    if (typeof arg == "string") {
      const o = arg;
      arg = Number(arg);
      if (Number.isNaN(arg) && o !== "NaN") {
        throw new Error("invalid float32: " + o);
      }
    } else if (typeof arg != "number") {
      throw new Error("invalid float32: " + typeof arg);
    }
    if (!Number.isFinite(Math.fround(arg)) && Number.isFinite(arg)) {
      throw new Error("invalid float32: " + arg);
    }
  }

  // node_modules/@bufbuild/protobuf/dist/esm/reflect/message.js
  var NULL_VALUE = 0;
  function localMessageMapper(field) {
    if (usesJsonRepresentation(field)) {
      return {
        toMessage: (local) => wktStructToReflect(local),
        toLocal: (message) => wktStructToLocal(message)
      };
    }
    if (field.fieldKind == "message" && !field.oneof && isWrapperDesc(field.message)) {
      const wrapperDesc = field.message;
      const valueLocalName = wrapperDesc.fields[0].localName;
      return {
        toMessage: (local) => {
          const message = create(wrapperDesc);
          if (local !== void 0) {
            message[valueLocalName] = local;
          }
          return message;
        },
        toLocal: (message) => message[valueLocalName]
      };
    }
    const childDesc = field.message;
    return {
      toMessage: (local) => local === void 0 ? create(childDesc) : local,
      toLocal: (message) => message
    };
  }
  function usesJsonRepresentation(field) {
    return field.message.typeName == "google.protobuf.Struct" && field.parent.typeName != "google.protobuf.Value";
  }
  function wktStructToReflect(json) {
    const struct = {
      $typeName: "google.protobuf.Struct",
      fields: {}
    };
    if (isObject(json)) {
      for (const k of Object.keys(json)) {
        setOwn(struct.fields, k, wktValueToReflect(json[k]));
      }
    }
    return struct;
  }
  function wktStructToLocal(val) {
    const json = {};
    for (const k of Object.keys(val.fields)) {
      setOwn(json, k, wktValueToLocal(val.fields[k]));
    }
    return json;
  }
  function wktValueToLocal(val) {
    switch (val.kind.case) {
      case "structValue":
        return wktStructToLocal(val.kind.value);
      case "listValue":
        return val.kind.value.values.map(wktValueToLocal);
      case "nullValue":
      case void 0:
        return null;
      default:
        return val.kind.value;
    }
  }
  function wktValueToReflect(json) {
    const value = {
      $typeName: "google.protobuf.Value",
      kind: { case: void 0 }
    };
    switch (typeof json) {
      case "number":
        value.kind = { case: "numberValue", value: json };
        break;
      case "string":
        value.kind = { case: "stringValue", value: json };
        break;
      case "boolean":
        value.kind = { case: "boolValue", value: json };
        break;
      case "object":
        if (json === null) {
          value.kind = { case: "nullValue", value: NULL_VALUE };
        } else if (Array.isArray(json)) {
          const listValue = {
            $typeName: "google.protobuf.ListValue",
            values: []
          };
          if (Array.isArray(json)) {
            for (const e of json) {
              listValue.values.push(wktValueToReflect(e));
            }
          }
          value.kind = {
            case: "listValue",
            value: listValue
          };
        } else {
          value.kind = {
            case: "structValue",
            value: wktStructToReflect(json)
          };
        }
        break;
    }
    return value;
  }

  // node_modules/@bufbuild/protobuf/dist/esm/wire/base64-encoding.js
  var nativeSetFromBase64 = Uint8Array.prototype.setFromBase64;
  function base64Decode(base64Str) {
    const len = base64Str.length;
    let size = len - (len + 3 >> 2);
    if ((len & 3) == 0 && base64Str[len - 1] == "=") {
      size -= base64Str[len - 2] == "=" ? 2 : 1;
    }
    const bytes = new Uint8Array(size);
    let written = -1;
    if (nativeSetFromBase64) {
      try {
        const result = nativeSetFromBase64.call(bytes, base64Str);
        if (result.read == len) {
          written = result.written;
        }
      } catch (_a2) {
      }
    }
    if (written < 0) {
      written = setFromBase64(bytes, base64Str);
    }
    return written == size ? bytes : bytes.subarray(0, written);
  }
  function setFromBase64(bytes, base64Str) {
    const table = getDecodeTable();
    let bytePos = 0, groupPos = 0, b, p = 0;
    for (let i2 = 0; i2 < base64Str.length; i2++) {
      b = table[base64Str.charCodeAt(i2)];
      if (b === void 0) {
        switch (base64Str[i2]) {
          // @ts-ignore TS7029: Fallthrough case in switch -- ignore instead of expect-error for compiler settings without noFallthroughCasesInSwitch: true
          case "=":
            groupPos = 0;
          // reset state when padding found
          case "\n":
          case "\r":
          case "	":
          case " ":
            continue;
          // skip white-space, and padding
          default:
            throw Error("invalid base64 string");
        }
      }
      switch (groupPos) {
        case 0:
          p = b;
          groupPos = 1;
          break;
        case 1:
          bytes[bytePos++] = p << 2 | (b & 48) >> 4;
          p = b;
          groupPos = 2;
          break;
        case 2:
          bytes[bytePos++] = (p & 15) << 4 | (b & 60) >> 2;
          p = b;
          groupPos = 3;
          break;
        case 3:
          bytes[bytePos++] = (p & 3) << 6 | b;
          groupPos = 0;
          break;
      }
    }
    if (groupPos == 1)
      throw Error("invalid base64 string");
    return bytePos;
  }
  var nativeToBase64 = Uint8Array.prototype.toBase64;
  var encodeTableStd;
  var encodeTableUrl;
  var decodeTable;
  function getEncodeTable(encoding) {
    if (!encodeTableStd) {
      encodeTableStd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
      encodeTableUrl = encodeTableStd.slice(0, -2).concat("-", "_");
    }
    return encoding == "url" ? (
      // biome-ignore lint/style/noNonNullAssertion: TS fails to narrow down
      encodeTableUrl
    ) : encodeTableStd;
  }
  function getDecodeTable() {
    if (!decodeTable) {
      decodeTable = [];
      const encodeTable = getEncodeTable("std");
      for (let i2 = 0; i2 < encodeTable.length; i2++)
        decodeTable[encodeTable[i2].charCodeAt(0)] = i2;
      decodeTable["-".charCodeAt(0)] = encodeTable.indexOf("+");
      decodeTable["_".charCodeAt(0)] = encodeTable.indexOf("/");
    }
    return decodeTable;
  }

  // node_modules/@bufbuild/protobuf/dist/esm/reflect/names.js
  function protoCamelCase(snakeCase) {
    let capNext = false;
    const b = [];
    for (let i2 = 0; i2 < snakeCase.length; i2++) {
      let c = snakeCase.charAt(i2);
      switch (c) {
        case "_":
          capNext = true;
          break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          b.push(c);
          capNext = false;
          break;
        default:
          if (capNext) {
            capNext = false;
            c = c.toUpperCase();
          }
          b.push(c);
          break;
      }
    }
    return b.join("");
  }
  var reservedObjectProperties = /* @__PURE__ */ new Set([
    // names reserved by JavaScript
    "constructor",
    "toString",
    "toJSON",
    "valueOf"
  ]);
  function safeObjectProperty(name) {
    return reservedObjectProperties.has(name) ? name + "$" : name;
  }

  // node_modules/@bufbuild/protobuf/dist/esm/codegenv2/restore-json-names.js
  function restoreJsonNames(message) {
    for (const f of message.field) {
      if (!unsafeIsSetExplicit(f, "jsonName")) {
        f.jsonName = protoCamelCase(f.name);
      }
    }
    message.nestedType.forEach(restoreJsonNames);
  }

  // node_modules/@bufbuild/protobuf/dist/esm/wire/text-format.js
  function parseTextFormatEnumValue(descEnum, value) {
    const enumValue = descEnum.values.find((v) => v.name === value);
    if (!enumValue) {
      throw new Error(`cannot parse ${descEnum} default value: ${value}`);
    }
    return enumValue.number;
  }
  function parseTextFormatScalarValue(type, value) {
    switch (type) {
      case ScalarType.STRING:
        return value;
      case ScalarType.BYTES: {
        const u = unescapeBytesDefaultValue(value);
        if (u === false) {
          throw new Error(`cannot parse ${ScalarType[type]} default value: ${value}`);
        }
        return u;
      }
      case ScalarType.INT64:
      case ScalarType.SFIXED64:
      case ScalarType.SINT64:
        return protoInt64.parse(value);
      case ScalarType.UINT64:
      case ScalarType.FIXED64:
        return protoInt64.uParse(value);
      case ScalarType.DOUBLE:
      case ScalarType.FLOAT:
        switch (value) {
          case "inf":
            return Number.POSITIVE_INFINITY;
          case "-inf":
            return Number.NEGATIVE_INFINITY;
          case "nan":
            return Number.NaN;
          default:
            return parseFloat(value);
        }
      case ScalarType.BOOL:
        return value === "true";
      case ScalarType.INT32:
      case ScalarType.UINT32:
      case ScalarType.SINT32:
      case ScalarType.FIXED32:
      case ScalarType.SFIXED32:
        return parseInt(value, 10);
    }
  }
  function unescapeBytesDefaultValue(str) {
    const b = [];
    const input = {
      tail: str,
      c: "",
      next() {
        if (this.tail.length == 0) {
          return false;
        }
        this.c = this.tail[0];
        this.tail = this.tail.substring(1);
        return true;
      },
      take(n) {
        if (this.tail.length >= n) {
          const r = this.tail.substring(0, n);
          this.tail = this.tail.substring(n);
          return r;
        }
        return false;
      }
    };
    while (input.next()) {
      switch (input.c) {
        case "\\":
          if (input.next()) {
            switch (input.c) {
              case "\\":
                b.push(input.c.charCodeAt(0));
                break;
              case "b":
                b.push(8);
                break;
              case "f":
                b.push(12);
                break;
              case "n":
                b.push(10);
                break;
              case "r":
                b.push(13);
                break;
              case "t":
                b.push(9);
                break;
              case "v":
                b.push(11);
                break;
              case "0":
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7": {
                const s = input.c;
                const t = input.take(2);
                if (t === false) {
                  return false;
                }
                const n = parseInt(s + t, 8);
                if (Number.isNaN(n)) {
                  return false;
                }
                b.push(n);
                break;
              }
              case "x": {
                const s = input.c;
                const t = input.take(2);
                if (t === false) {
                  return false;
                }
                const n = parseInt(s + t, 16);
                if (Number.isNaN(n)) {
                  return false;
                }
                b.push(n);
                break;
              }
              case "u": {
                const s = input.c;
                const t = input.take(4);
                if (t === false) {
                  return false;
                }
                const n = parseInt(s + t, 16);
                if (Number.isNaN(n)) {
                  return false;
                }
                const chunk = new Uint8Array(4);
                const view = new DataView(chunk.buffer);
                view.setInt32(0, n, true);
                b.push(chunk[0], chunk[1], chunk[2], chunk[3]);
                break;
              }
              case "U": {
                const s = input.c;
                const t = input.take(8);
                if (t === false) {
                  return false;
                }
                const tc = protoInt64.uEnc(s + t);
                const chunk = new Uint8Array(8);
                const view = new DataView(chunk.buffer);
                view.setInt32(0, tc.lo, true);
                view.setInt32(4, tc.hi, true);
                b.push(chunk[0], chunk[1], chunk[2], chunk[3], chunk[4], chunk[5], chunk[6], chunk[7]);
                break;
              }
            }
          }
          break;
        default:
          b.push(input.c.charCodeAt(0));
      }
    }
    return new Uint8Array(b);
  }

  // node_modules/@bufbuild/protobuf/dist/esm/reflect/nested-types.js
  function* nestedTypes(desc) {
    switch (desc.kind) {
      case "file":
        for (const message of desc.messages) {
          yield message;
          yield* nestedTypes(message);
        }
        yield* desc.enums;
        yield* desc.services;
        yield* desc.extensions;
        break;
      case "message":
        for (const message of desc.nestedMessages) {
          yield message;
          yield* nestedTypes(message);
        }
        yield* desc.nestedEnums;
        yield* desc.nestedExtensions;
        break;
    }
  }

  // node_modules/@bufbuild/protobuf/dist/esm/registry.js
  function createFileRegistry(...args) {
    const registry = createBaseRegistry();
    if (!args.length) {
      return registry;
    }
    if ("$typeName" in args[0] && args[0].$typeName == "google.protobuf.FileDescriptorSet") {
      for (const file of args[0].file) {
        addFile(file, registry);
      }
      return registry;
    }
    if ("$typeName" in args[0]) {
      let recurseDeps = function(file) {
        const deps = [];
        for (const protoFileName of file.dependency) {
          if (registry.getFile(protoFileName) != void 0) {
            continue;
          }
          if (seen.has(protoFileName)) {
            continue;
          }
          const dep = resolve(protoFileName);
          if (!dep) {
            throw new Error(`Unable to resolve ${protoFileName}, imported by ${file.name}`);
          }
          if ("kind" in dep) {
            registry.addFile(dep, false, true);
          } else {
            seen.add(dep.name);
            deps.push(dep);
          }
        }
        return deps.concat(...deps.map(recurseDeps));
      };
      const input = args[0];
      const resolve = args[1];
      const seen = /* @__PURE__ */ new Set();
      for (const file of [input, ...recurseDeps(input)].reverse()) {
        addFile(file, registry);
      }
    } else {
      for (const fileReg of args) {
        for (const file of fileReg.files) {
          registry.addFile(file);
        }
      }
    }
    return registry;
  }
  function createBaseRegistry() {
    const types = /* @__PURE__ */ new Map();
    const extendees = /* @__PURE__ */ new Map();
    const files = /* @__PURE__ */ new Map();
    return {
      kind: "registry",
      types,
      extendees,
      [Symbol.iterator]() {
        return types.values();
      },
      get files() {
        return files.values();
      },
      addFile(file, skipTypes, withDeps) {
        files.set(file.proto.name, file);
        if (!skipTypes) {
          for (const type of nestedTypes(file)) {
            this.add(type);
          }
        }
        if (withDeps) {
          for (const f of file.dependencies) {
            this.addFile(f, skipTypes, withDeps);
          }
        }
      },
      add(desc) {
        if (desc.kind == "extension") {
          let numberToExt = extendees.get(desc.extendee.typeName);
          if (!numberToExt) {
            extendees.set(
              desc.extendee.typeName,
              // biome-ignore lint/suspicious/noAssignInExpressions: no
              numberToExt = /* @__PURE__ */ new Map()
            );
          }
          numberToExt.set(desc.number, desc);
        }
        types.set(desc.typeName, desc);
      },
      get(typeName) {
        return types.get(typeName);
      },
      getFile(fileName) {
        return files.get(fileName);
      },
      getMessage(typeName) {
        const t = types.get(typeName);
        return (t === null || t === void 0 ? void 0 : t.kind) == "message" ? t : void 0;
      },
      getEnum(typeName) {
        const t = types.get(typeName);
        return (t === null || t === void 0 ? void 0 : t.kind) == "enum" ? t : void 0;
      },
      getExtension(typeName) {
        const t = types.get(typeName);
        return (t === null || t === void 0 ? void 0 : t.kind) == "extension" ? t : void 0;
      },
      getExtensionFor(extendee, no) {
        var _a2;
        return (_a2 = extendees.get(extendee.typeName)) === null || _a2 === void 0 ? void 0 : _a2.get(no);
      },
      getService(typeName) {
        const t = types.get(typeName);
        return (t === null || t === void 0 ? void 0 : t.kind) == "service" ? t : void 0;
      }
    };
  }
  var EDITION_PROTO22 = 998;
  var EDITION_PROTO32 = 999;
  var EDITION_UNSTABLE = 9999;
  var TYPE_STRING = 9;
  var TYPE_GROUP = 10;
  var TYPE_MESSAGE = 11;
  var TYPE_BYTES = 12;
  var TYPE_ENUM = 14;
  var LABEL_REPEATED = 3;
  var LABEL_REQUIRED = 2;
  var JS_STRING = 1;
  var IDEMPOTENCY_UNKNOWN = 0;
  var EXPLICIT = 1;
  var IMPLICIT2 = 2;
  var LEGACY_REQUIRED = 3;
  var PACKED = 1;
  var DELIMITED = 2;
  var OPEN = 1;
  var VERIFY = 2;
  var maximumEdition = 1002;
  var featureDefaults = {
    // EDITION_PROTO2
    998: {
      fieldPresence: 1,
      // EXPLICIT,
      enumType: 2,
      // CLOSED,
      repeatedFieldEncoding: 2,
      // EXPANDED,
      utf8Validation: 3,
      // NONE,
      messageEncoding: 1,
      // LENGTH_PREFIXED,
      jsonFormat: 2,
      // LEGACY_BEST_EFFORT,
      enforceNamingStyle: 2,
      // STYLE_LEGACY,
      defaultSymbolVisibility: 1,
      // EXPORT_ALL,
      enforceProtoLimits: 1
      // LEGACY_NO_EXPLICIT_LIMITS,
    },
    // EDITION_PROTO3
    999: {
      fieldPresence: 2,
      // IMPLICIT,
      enumType: 1,
      // OPEN,
      repeatedFieldEncoding: 1,
      // PACKED,
      utf8Validation: 2,
      // VERIFY,
      messageEncoding: 1,
      // LENGTH_PREFIXED,
      jsonFormat: 1,
      // ALLOW,
      enforceNamingStyle: 2,
      // STYLE_LEGACY,
      defaultSymbolVisibility: 1,
      // EXPORT_ALL,
      enforceProtoLimits: 1
      // LEGACY_NO_EXPLICIT_LIMITS,
    },
    // EDITION_2023
    1e3: {
      fieldPresence: 1,
      // EXPLICIT,
      enumType: 1,
      // OPEN,
      repeatedFieldEncoding: 1,
      // PACKED,
      utf8Validation: 2,
      // VERIFY,
      messageEncoding: 1,
      // LENGTH_PREFIXED,
      jsonFormat: 1,
      // ALLOW,
      enforceNamingStyle: 2,
      // STYLE_LEGACY,
      defaultSymbolVisibility: 1,
      // EXPORT_ALL,
      enforceProtoLimits: 1
      // LEGACY_NO_EXPLICIT_LIMITS,
    },
    // EDITION_2024
    1001: {
      fieldPresence: 1,
      // EXPLICIT,
      enumType: 1,
      // OPEN,
      repeatedFieldEncoding: 1,
      // PACKED,
      utf8Validation: 2,
      // VERIFY,
      messageEncoding: 1,
      // LENGTH_PREFIXED,
      jsonFormat: 1,
      // ALLOW,
      enforceNamingStyle: 1,
      // STYLE2024,
      defaultSymbolVisibility: 2,
      // EXPORT_TOP_LEVEL,
      enforceProtoLimits: 1
      // LEGACY_NO_EXPLICIT_LIMITS,
    },
    // EDITION_2026
    1002: {
      fieldPresence: 1,
      // EXPLICIT,
      enumType: 1,
      // OPEN,
      repeatedFieldEncoding: 1,
      // PACKED,
      utf8Validation: 2,
      // VERIFY,
      messageEncoding: 1,
      // LENGTH_PREFIXED,
      jsonFormat: 1,
      // ALLOW,
      enforceNamingStyle: 3,
      // STYLE2026,
      defaultSymbolVisibility: 4,
      // STRICT,
      enforceProtoLimits: 2
      // PROTO_LIMITS2026,
    }
  };
  function addFile(proto, reg) {
    var _a2, _b2;
    const file = {
      kind: "file",
      proto,
      deprecated: (_b2 = (_a2 = proto.options) === null || _a2 === void 0 ? void 0 : _a2.deprecated) !== null && _b2 !== void 0 ? _b2 : false,
      edition: getFileEdition(proto),
      name: proto.name.replace(/\.proto$/, ""),
      dependencies: findFileDependencies(proto, reg),
      enums: [],
      messages: [],
      extensions: [],
      services: [],
      toString() {
        return `file ${proto.name}`;
      }
    };
    const mapEntriesStore = /* @__PURE__ */ new Map();
    const mapEntries = {
      get(typeName) {
        return mapEntriesStore.get(typeName);
      },
      add(desc) {
        var _a3;
        assert(((_a3 = desc.proto.options) === null || _a3 === void 0 ? void 0 : _a3.mapEntry) === true);
        mapEntriesStore.set(desc.typeName, desc);
      }
    };
    for (const enumProto of proto.enumType) {
      addEnum(enumProto, file, void 0, reg);
    }
    for (const messageProto of proto.messageType) {
      addMessage(messageProto, file, void 0, reg, mapEntries);
    }
    for (const serviceProto of proto.service) {
      addService(serviceProto, file, reg);
    }
    addExtensions(file, reg);
    for (const mapEntry of mapEntriesStore.values()) {
      addFields(mapEntry, reg, mapEntries);
    }
    for (const message of file.messages) {
      addFields(message, reg, mapEntries);
      addExtensions(message, reg);
    }
    reg.addFile(file, true);
  }
  function addExtensions(desc, reg) {
    switch (desc.kind) {
      case "file":
        for (const proto of desc.proto.extension) {
          const ext = newField(proto, desc, reg);
          desc.extensions.push(ext);
          reg.add(ext);
        }
        break;
      case "message":
        for (const proto of desc.proto.extension) {
          const ext = newField(proto, desc, reg);
          desc.nestedExtensions.push(ext);
          reg.add(ext);
        }
        for (const message of desc.nestedMessages) {
          addExtensions(message, reg);
        }
        break;
    }
  }
  function addFields(message, reg, mapEntries) {
    const allOneofs = message.proto.oneofDecl.map((proto) => newOneof(proto, message));
    const oneofsSeen = /* @__PURE__ */ new Set();
    for (const proto of message.proto.field) {
      const oneof = findOneof(proto, allOneofs);
      const field = newField(proto, message, reg, oneof, mapEntries);
      message.fields.push(field);
      message.field[field.localName] = field;
      if (oneof === void 0) {
        message.members.push(field);
      } else {
        oneof.fields.push(field);
        if (!oneofsSeen.has(oneof)) {
          oneofsSeen.add(oneof);
          message.members.push(oneof);
        }
      }
    }
    for (const oneof of allOneofs.filter((o) => oneofsSeen.has(o))) {
      message.oneofs.push(oneof);
    }
    for (const child of message.nestedMessages) {
      addFields(child, reg, mapEntries);
    }
  }
  function addEnum(proto, file, parent, reg) {
    var _a2, _b2, _c, _d, _e, _f;
    const sharedPrefix = findEnumSharedPrefix(proto.name, proto.value);
    const desc = {
      kind: "enum",
      proto,
      deprecated: (_b2 = (_a2 = proto.options) === null || _a2 === void 0 ? void 0 : _a2.deprecated) !== null && _b2 !== void 0 ? _b2 : false,
      file,
      parent,
      open: true,
      name: proto.name,
      typeName: makeTypeName(proto, parent, file),
      value: {},
      values: [],
      sharedPrefix,
      toString() {
        return `enum ${this.typeName}`;
      }
    };
    desc.open = isEnumOpen(desc);
    reg.add(desc);
    for (const p of proto.value) {
      const name = p.name;
      desc.values.push(
        // biome-ignore lint/suspicious/noAssignInExpressions: no
        desc.value[p.number] = {
          kind: "enum_value",
          proto: p,
          deprecated: (_d = (_c = p.options) === null || _c === void 0 ? void 0 : _c.deprecated) !== null && _d !== void 0 ? _d : false,
          parent: desc,
          name,
          localName: safeObjectProperty(sharedPrefix == void 0 ? name : name.substring(sharedPrefix.length)),
          number: p.number,
          jsonName: (_e = findEnumValueJsonName(p)) !== null && _e !== void 0 ? _e : name,
          toString() {
            return `enum value ${desc.typeName}.${name}`;
          }
        }
      );
    }
    ((_f = parent === null || parent === void 0 ? void 0 : parent.nestedEnums) !== null && _f !== void 0 ? _f : file.enums).push(desc);
  }
  function addMessage(proto, file, parent, reg, mapEntries) {
    var _a2, _b2, _c, _d;
    const desc = {
      kind: "message",
      proto,
      deprecated: (_b2 = (_a2 = proto.options) === null || _a2 === void 0 ? void 0 : _a2.deprecated) !== null && _b2 !== void 0 ? _b2 : false,
      file,
      parent,
      name: proto.name,
      typeName: makeTypeName(proto, parent, file),
      fields: [],
      field: {},
      oneofs: [],
      members: [],
      nestedEnums: [],
      nestedMessages: [],
      nestedExtensions: [],
      toString() {
        return `message ${this.typeName}`;
      }
    };
    if (((_c = proto.options) === null || _c === void 0 ? void 0 : _c.mapEntry) === true) {
      mapEntries.add(desc);
    } else {
      ((_d = parent === null || parent === void 0 ? void 0 : parent.nestedMessages) !== null && _d !== void 0 ? _d : file.messages).push(desc);
      reg.add(desc);
    }
    for (const enumProto of proto.enumType) {
      addEnum(enumProto, file, desc, reg);
    }
    for (const messageProto of proto.nestedType) {
      addMessage(messageProto, file, desc, reg, mapEntries);
    }
  }
  function addService(proto, file, reg) {
    var _a2, _b2;
    const desc = {
      kind: "service",
      proto,
      deprecated: (_b2 = (_a2 = proto.options) === null || _a2 === void 0 ? void 0 : _a2.deprecated) !== null && _b2 !== void 0 ? _b2 : false,
      file,
      name: proto.name,
      typeName: makeTypeName(proto, void 0, file),
      methods: [],
      method: {},
      toString() {
        return `service ${this.typeName}`;
      }
    };
    file.services.push(desc);
    reg.add(desc);
    for (const methodProto of proto.method) {
      const method = newMethod(methodProto, desc, reg);
      desc.methods.push(method);
      desc.method[method.localName] = method;
    }
  }
  function newMethod(proto, parent, reg) {
    var _a2, _b2, _c, _d;
    let methodKind;
    if (proto.clientStreaming && proto.serverStreaming) {
      methodKind = "bidi_streaming";
    } else if (proto.clientStreaming) {
      methodKind = "client_streaming";
    } else if (proto.serverStreaming) {
      methodKind = "server_streaming";
    } else {
      methodKind = "unary";
    }
    const input = reg.getMessage(trimLeadingDot(proto.inputType));
    const output = reg.getMessage(trimLeadingDot(proto.outputType));
    assert(input, `invalid MethodDescriptorProto: input_type ${proto.inputType} not found`);
    assert(output, `invalid MethodDescriptorProto: output_type ${proto.inputType} not found`);
    const name = proto.name;
    return {
      kind: "rpc",
      proto,
      deprecated: (_b2 = (_a2 = proto.options) === null || _a2 === void 0 ? void 0 : _a2.deprecated) !== null && _b2 !== void 0 ? _b2 : false,
      parent,
      name,
      localName: safeObjectProperty(name.length ? safeObjectProperty(name[0].toLowerCase() + name.substring(1)) : name),
      methodKind,
      input,
      output,
      idempotency: (_d = (_c = proto.options) === null || _c === void 0 ? void 0 : _c.idempotencyLevel) !== null && _d !== void 0 ? _d : IDEMPOTENCY_UNKNOWN,
      toString() {
        return `rpc ${parent.typeName}.${name}`;
      }
    };
  }
  function newOneof(proto, parent) {
    return {
      kind: "oneof",
      proto,
      deprecated: false,
      parent,
      fields: [],
      name: proto.name,
      localName: safeObjectProperty(protoCamelCase(proto.name)),
      toString() {
        return `oneof ${parent.typeName}.${this.name}`;
      }
    };
  }
  function newField(proto, parentOrFile, reg, oneof, mapEntries) {
    var _a2, _b2, _c;
    const isExtension = mapEntries === void 0;
    const field = {
      kind: "field",
      proto,
      deprecated: (_b2 = (_a2 = proto.options) === null || _a2 === void 0 ? void 0 : _a2.deprecated) !== null && _b2 !== void 0 ? _b2 : false,
      name: proto.name,
      number: proto.number,
      scalar: void 0,
      message: void 0,
      enum: void 0,
      presence: getFieldPresence(proto, oneof, isExtension, parentOrFile),
      utf8Validation: isUtf8Validated(proto, parentOrFile),
      listKind: void 0,
      mapKind: void 0,
      mapKey: void 0,
      delimitedEncoding: void 0,
      packed: void 0,
      longAsString: false,
      getDefaultValue: void 0
    };
    let toStr;
    if (isExtension) {
      const file = parentOrFile.kind == "file" ? parentOrFile : parentOrFile.file;
      const parent = parentOrFile.kind == "file" ? void 0 : parentOrFile;
      const typeName = makeTypeName(proto, parent, file);
      field.kind = "extension";
      field.file = file;
      field.parent = parent;
      field.oneof = void 0;
      field.typeName = typeName;
      field.jsonName = `[${typeName}]`;
      toStr = () => `extension ${typeName}`;
      const extendee = reg.getMessage(trimLeadingDot(proto.extendee));
      assert(extendee, `invalid FieldDescriptorProto: extendee ${proto.extendee} not found`);
      field.extendee = extendee;
    } else {
      const parent = parentOrFile;
      assert(parent.kind == "message");
      field.parent = parent;
      field.oneof = oneof;
      field.localName = oneof ? protoCamelCase(proto.name) : safeObjectProperty(protoCamelCase(proto.name));
      field.jsonName = proto.jsonName;
      toStr = () => `field ${parent.typeName}.${proto.name}`;
    }
    Object.defineProperty(field, "toString", {
      value: toStr,
      writable: true,
      enumerable: true,
      configurable: true
    });
    const label = proto.label;
    const type = proto.type;
    const jstype = (_c = proto.options) === null || _c === void 0 ? void 0 : _c.jstype;
    if (label === LABEL_REPEATED) {
      const mapEntry = type == TYPE_MESSAGE ? mapEntries === null || mapEntries === void 0 ? void 0 : mapEntries.get(trimLeadingDot(proto.typeName)) : void 0;
      if (mapEntry) {
        field.fieldKind = "map";
        const { key, value } = findMapEntryFields(mapEntry);
        field.mapKey = key.scalar;
        field.mapKind = value.fieldKind;
        field.message = value.message;
        field.delimitedEncoding = false;
        field.enum = value.enum;
        field.scalar = value.scalar;
        return field;
      }
      field.fieldKind = "list";
      switch (type) {
        case TYPE_MESSAGE:
        case TYPE_GROUP:
          field.listKind = "message";
          field.message = reg.getMessage(trimLeadingDot(proto.typeName));
          assert(field.message);
          field.delimitedEncoding = isDelimitedEncoding(proto, parentOrFile);
          break;
        case TYPE_ENUM:
          field.listKind = "enum";
          field.enum = reg.getEnum(trimLeadingDot(proto.typeName));
          assert(field.enum);
          break;
        default:
          field.listKind = "scalar";
          field.scalar = type;
          field.longAsString = jstype == JS_STRING;
          break;
      }
      field.packed = isPackedField(proto, parentOrFile);
      return field;
    }
    switch (type) {
      case TYPE_MESSAGE:
      case TYPE_GROUP:
        field.fieldKind = "message";
        field.message = reg.getMessage(trimLeadingDot(proto.typeName));
        assert(field.message, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
        field.delimitedEncoding = isDelimitedEncoding(proto, parentOrFile);
        field.getDefaultValue = () => void 0;
        break;
      case TYPE_ENUM: {
        const enumeration = reg.getEnum(trimLeadingDot(proto.typeName));
        assert(enumeration !== void 0, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
        field.fieldKind = "enum";
        field.enum = reg.getEnum(trimLeadingDot(proto.typeName));
        field.getDefaultValue = () => {
          return unsafeIsSetExplicit(proto, "defaultValue") ? parseTextFormatEnumValue(enumeration, proto.defaultValue) : void 0;
        };
        break;
      }
      default: {
        field.fieldKind = "scalar";
        field.scalar = type;
        field.longAsString = jstype == JS_STRING;
        field.getDefaultValue = () => {
          return unsafeIsSetExplicit(proto, "defaultValue") ? parseTextFormatScalarValue(type, proto.defaultValue) : void 0;
        };
        break;
      }
    }
    return field;
  }
  function getFileEdition(proto) {
    switch (proto.syntax) {
      case "":
      case "proto2":
        return EDITION_PROTO22;
      case "proto3":
        return EDITION_PROTO32;
      case "editions":
        if (proto.edition === EDITION_UNSTABLE) {
          return maximumEdition;
        }
        if (proto.edition in featureDefaults) {
          return proto.edition;
        }
        throw new Error(`${proto.name}: unsupported edition`);
      default:
        throw new Error(`${proto.name}: unsupported syntax "${proto.syntax}"`);
    }
  }
  function findFileDependencies(proto, reg) {
    return proto.dependency.map((wantName) => {
      const dep = reg.getFile(wantName);
      if (!dep) {
        throw new Error(`Cannot find ${wantName}, imported by ${proto.name}`);
      }
      return dep;
    });
  }
  function findEnumSharedPrefix(enumName, values) {
    const prefix = camelToSnakeCase(enumName) + "_";
    for (const value of values) {
      if (!value.name.toLowerCase().startsWith(prefix)) {
        return void 0;
      }
      const shortName = value.name.substring(prefix.length);
      if (shortName.length == 0) {
        return void 0;
      }
      if (/^\d/.test(shortName)) {
        return void 0;
      }
    }
    return prefix;
  }
  function findEnumValueJsonName(proto) {
    var _a2, _b2;
    const extensionNumber = 998;
    const fieldNumber = 1;
    let jsonName;
    for (const uf of (_b2 = (_a2 = proto.options) === null || _a2 === void 0 ? void 0 : _a2.$unknown) !== null && _b2 !== void 0 ? _b2 : []) {
      if (uf.no !== extensionNumber || uf.wireType !== WireType.LengthDelimited) {
        continue;
      }
      const reader = new BinaryReader(new BinaryReader(uf.data).bytes());
      while (reader.pos < reader.len) {
        const [no, wireType] = reader.tag();
        if (no === fieldNumber && wireType === WireType.LengthDelimited) {
          jsonName = reader.string();
        } else {
          reader.skip(wireType, no);
        }
      }
    }
    return jsonName;
  }
  function camelToSnakeCase(camel) {
    return (camel.substring(0, 1) + camel.substring(1).replace(/[A-Z]/g, (c) => "_" + c)).toLowerCase();
  }
  function makeTypeName(proto, parent, file) {
    let typeName;
    if (parent) {
      typeName = `${parent.typeName}.${proto.name}`;
    } else if (file.proto.package.length > 0) {
      typeName = `${file.proto.package}.${proto.name}`;
    } else {
      typeName = `${proto.name}`;
    }
    return typeName;
  }
  function trimLeadingDot(typeName) {
    return typeName.startsWith(".") ? typeName.substring(1) : typeName;
  }
  function findOneof(proto, allOneofs) {
    if (!unsafeIsSetExplicit(proto, "oneofIndex")) {
      return void 0;
    }
    if (proto.proto3Optional) {
      return void 0;
    }
    const oneof = allOneofs[proto.oneofIndex];
    assert(oneof, `invalid FieldDescriptorProto: oneof #${proto.oneofIndex} for field #${proto.number} not found`);
    return oneof;
  }
  function getFieldPresence(proto, oneof, isExtension, parent) {
    if (proto.label == LABEL_REQUIRED) {
      return LEGACY_REQUIRED;
    }
    if (proto.label == LABEL_REPEATED) {
      return IMPLICIT2;
    }
    if (!!oneof || proto.proto3Optional) {
      return EXPLICIT;
    }
    if (isExtension) {
      return EXPLICIT;
    }
    const resolved = resolveFeature("fieldPresence", { proto, parent });
    if (resolved == IMPLICIT2 && (proto.type == TYPE_MESSAGE || proto.type == TYPE_GROUP)) {
      return EXPLICIT;
    }
    return resolved;
  }
  function isPackedField(proto, parent) {
    if (proto.label != LABEL_REPEATED) {
      return false;
    }
    switch (proto.type) {
      case TYPE_STRING:
      case TYPE_BYTES:
      case TYPE_GROUP:
      case TYPE_MESSAGE:
        return false;
    }
    const o = proto.options;
    if (o && unsafeIsSetExplicit(o, "packed")) {
      return o.packed;
    }
    return PACKED == resolveFeature("repeatedFieldEncoding", {
      proto,
      parent
    });
  }
  function findMapEntryFields(mapEntry) {
    const key = mapEntry.fields.find((f) => f.number === 1);
    const value = mapEntry.fields.find((f) => f.number === 2);
    assert(key && key.fieldKind == "scalar" && key.scalar != ScalarType.BYTES && key.scalar != ScalarType.FLOAT && key.scalar != ScalarType.DOUBLE && value && value.fieldKind != "list" && value.fieldKind != "map");
    return { key, value };
  }
  function isEnumOpen(desc) {
    var _a2;
    return OPEN == resolveFeature("enumType", {
      proto: desc.proto,
      parent: (_a2 = desc.parent) !== null && _a2 !== void 0 ? _a2 : desc.file
    });
  }
  function isDelimitedEncoding(proto, parent) {
    if (proto.type == TYPE_GROUP) {
      return true;
    }
    return DELIMITED == resolveFeature("messageEncoding", {
      proto,
      parent
    });
  }
  function isUtf8Validated(proto, parent) {
    return VERIFY == resolveFeature("utf8Validation", {
      proto,
      parent
    });
  }
  function resolveFeature(name, ref) {
    var _a2, _b2;
    const featureSet = (_a2 = ref.proto.options) === null || _a2 === void 0 ? void 0 : _a2.features;
    if (featureSet) {
      const val = featureSet[name];
      if (val != 0) {
        return val;
      }
    }
    if ("kind" in ref) {
      if (ref.kind == "message") {
        return resolveFeature(name, (_b2 = ref.parent) !== null && _b2 !== void 0 ? _b2 : ref.file);
      }
      const editionDefaults = featureDefaults[ref.edition];
      if (!editionDefaults) {
        throw new Error(`feature default for edition ${ref.edition} not found`);
      }
      return editionDefaults[name];
    }
    return resolveFeature(name, ref.parent);
  }
  function assert(condition, msg) {
    if (!condition) {
      throw new Error(msg);
    }
  }

  // node_modules/@bufbuild/protobuf/dist/esm/codegenv2/boot.js
  function boot(boot2) {
    const root = bootFileDescriptorProto(boot2);
    root.messageType.forEach(restoreJsonNames);
    const reg = createFileRegistry(root, () => void 0);
    return reg.getFile(root.name);
  }
  function bootFileDescriptorProto(init) {
    const proto = /* @__PURE__ */ Object.create({
      syntax: "",
      edition: 0
    });
    return Object.assign(proto, Object.assign(Object.assign({ $typeName: "google.protobuf.FileDescriptorProto", dependency: [], publicDependency: [], weakDependency: [], optionDependency: [], service: [], extension: [] }, init), { messageType: init.messageType.map(bootDescriptorProto), enumType: init.enumType.map(bootEnumDescriptorProto) }));
  }
  function bootDescriptorProto(init) {
    var _a2, _b2, _c, _d, _e, _f, _g, _h;
    const proto = /* @__PURE__ */ Object.create({
      visibility: 0
    });
    return Object.assign(proto, {
      $typeName: "google.protobuf.DescriptorProto",
      name: init.name,
      field: (_b2 = (_a2 = init.field) === null || _a2 === void 0 ? void 0 : _a2.map(bootFieldDescriptorProto)) !== null && _b2 !== void 0 ? _b2 : [],
      extension: [],
      nestedType: (_d = (_c = init.nestedType) === null || _c === void 0 ? void 0 : _c.map(bootDescriptorProto)) !== null && _d !== void 0 ? _d : [],
      enumType: (_f = (_e = init.enumType) === null || _e === void 0 ? void 0 : _e.map(bootEnumDescriptorProto)) !== null && _f !== void 0 ? _f : [],
      extensionRange: (_h = (_g = init.extensionRange) === null || _g === void 0 ? void 0 : _g.map((e) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, e))) !== null && _h !== void 0 ? _h : [],
      oneofDecl: [],
      reservedRange: [],
      reservedName: []
    });
  }
  function bootFieldDescriptorProto(init) {
    const proto = /* @__PURE__ */ Object.create({
      label: 1,
      typeName: "",
      extendee: "",
      defaultValue: "",
      oneofIndex: 0,
      jsonName: "",
      proto3Optional: false
    });
    return Object.assign(proto, Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, init), { options: init.options ? bootFieldOptions(init.options) : void 0 }));
  }
  function bootFieldOptions(init) {
    var _a2, _b2, _c;
    const proto = /* @__PURE__ */ Object.create({
      ctype: 0,
      packed: false,
      jstype: 0,
      lazy: false,
      unverifiedLazy: false,
      deprecated: false,
      weak: false,
      debugRedact: false,
      retention: 0
    });
    return Object.assign(proto, Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, init), { targets: (_a2 = init.targets) !== null && _a2 !== void 0 ? _a2 : [], editionDefaults: (_c = (_b2 = init.editionDefaults) === null || _b2 === void 0 ? void 0 : _b2.map((e) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, e))) !== null && _c !== void 0 ? _c : [], uninterpretedOption: [] }));
  }
  function bootEnumDescriptorProto(init) {
    const proto = /* @__PURE__ */ Object.create({
      visibility: 0
    });
    return Object.assign(proto, {
      $typeName: "google.protobuf.EnumDescriptorProto",
      name: init.name,
      reservedName: [],
      reservedRange: [],
      value: init.value.map((e) => Object.assign({ $typeName: "google.protobuf.EnumValueDescriptorProto" }, e))
    });
  }

  // node_modules/@bufbuild/protobuf/dist/esm/codegenv2/message.js
  function messageDesc(file, path, ...paths) {
    return paths.reduce((acc, cur) => acc.nestedMessages[cur], file.messages[path]);
  }

  // node_modules/@bufbuild/protobuf/dist/esm/wkt/google/protobuf/descriptor_pb.js
  var file_google_protobuf_descriptor = /* @__PURE__ */ boot({ "name": "google/protobuf/descriptor.proto", "package": "google.protobuf", "messageType": [{ "name": "FileDescriptorSet", "field": [{ "name": "file", "number": 1, "type": 11, "label": 3, "typeName": ".google.protobuf.FileDescriptorProto" }], "extensionRange": [{ "start": 536e6, "end": 536000001 }] }, { "name": "FileDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "package", "number": 2, "type": 9, "label": 1 }, { "name": "dependency", "number": 3, "type": 9, "label": 3 }, { "name": "public_dependency", "number": 10, "type": 5, "label": 3 }, { "name": "weak_dependency", "number": 11, "type": 5, "label": 3 }, { "name": "option_dependency", "number": 15, "type": 9, "label": 3 }, { "name": "message_type", "number": 4, "type": 11, "label": 3, "typeName": ".google.protobuf.DescriptorProto" }, { "name": "enum_type", "number": 5, "type": 11, "label": 3, "typeName": ".google.protobuf.EnumDescriptorProto" }, { "name": "service", "number": 6, "type": 11, "label": 3, "typeName": ".google.protobuf.ServiceDescriptorProto" }, { "name": "extension", "number": 7, "type": 11, "label": 3, "typeName": ".google.protobuf.FieldDescriptorProto" }, { "name": "options", "number": 8, "type": 11, "label": 1, "typeName": ".google.protobuf.FileOptions" }, { "name": "source_code_info", "number": 9, "type": 11, "label": 1, "typeName": ".google.protobuf.SourceCodeInfo" }, { "name": "syntax", "number": 12, "type": 9, "label": 1 }, { "name": "edition", "number": 14, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }] }, { "name": "DescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "field", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.FieldDescriptorProto" }, { "name": "extension", "number": 6, "type": 11, "label": 3, "typeName": ".google.protobuf.FieldDescriptorProto" }, { "name": "nested_type", "number": 3, "type": 11, "label": 3, "typeName": ".google.protobuf.DescriptorProto" }, { "name": "enum_type", "number": 4, "type": 11, "label": 3, "typeName": ".google.protobuf.EnumDescriptorProto" }, { "name": "extension_range", "number": 5, "type": 11, "label": 3, "typeName": ".google.protobuf.DescriptorProto.ExtensionRange" }, { "name": "oneof_decl", "number": 8, "type": 11, "label": 3, "typeName": ".google.protobuf.OneofDescriptorProto" }, { "name": "options", "number": 7, "type": 11, "label": 1, "typeName": ".google.protobuf.MessageOptions" }, { "name": "reserved_range", "number": 9, "type": 11, "label": 3, "typeName": ".google.protobuf.DescriptorProto.ReservedRange" }, { "name": "reserved_name", "number": 10, "type": 9, "label": 3 }, { "name": "visibility", "number": 11, "type": 14, "label": 1, "typeName": ".google.protobuf.SymbolVisibility" }], "nestedType": [{ "name": "ExtensionRange", "field": [{ "name": "start", "number": 1, "type": 5, "label": 1 }, { "name": "end", "number": 2, "type": 5, "label": 1 }, { "name": "options", "number": 3, "type": 11, "label": 1, "typeName": ".google.protobuf.ExtensionRangeOptions" }] }, { "name": "ReservedRange", "field": [{ "name": "start", "number": 1, "type": 5, "label": 1 }, { "name": "end", "number": 2, "type": 5, "label": 1 }] }] }, { "name": "ExtensionRangeOptions", "field": [{ "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }, { "name": "declaration", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.ExtensionRangeOptions.Declaration", "options": { "retention": 2 } }, { "name": "features", "number": 50, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "verification", "number": 3, "type": 14, "label": 1, "typeName": ".google.protobuf.ExtensionRangeOptions.VerificationState", "defaultValue": "UNVERIFIED", "options": { "retention": 2 } }], "nestedType": [{ "name": "Declaration", "field": [{ "name": "number", "number": 1, "type": 5, "label": 1 }, { "name": "full_name", "number": 2, "type": 9, "label": 1 }, { "name": "type", "number": 3, "type": 9, "label": 1 }, { "name": "reserved", "number": 5, "type": 8, "label": 1 }, { "name": "repeated", "number": 6, "type": 8, "label": 1 }] }], "enumType": [{ "name": "VerificationState", "value": [{ "name": "DECLARATION", "number": 0 }, { "name": "UNVERIFIED", "number": 1 }] }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "FieldDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "number", "number": 3, "type": 5, "label": 1 }, { "name": "label", "number": 4, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldDescriptorProto.Label" }, { "name": "type", "number": 5, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldDescriptorProto.Type" }, { "name": "type_name", "number": 6, "type": 9, "label": 1 }, { "name": "extendee", "number": 2, "type": 9, "label": 1 }, { "name": "default_value", "number": 7, "type": 9, "label": 1 }, { "name": "oneof_index", "number": 9, "type": 5, "label": 1 }, { "name": "json_name", "number": 10, "type": 9, "label": 1 }, { "name": "options", "number": 8, "type": 11, "label": 1, "typeName": ".google.protobuf.FieldOptions" }, { "name": "proto3_optional", "number": 17, "type": 8, "label": 1 }], "enumType": [{ "name": "Type", "value": [{ "name": "TYPE_DOUBLE", "number": 1 }, { "name": "TYPE_FLOAT", "number": 2 }, { "name": "TYPE_INT64", "number": 3 }, { "name": "TYPE_UINT64", "number": 4 }, { "name": "TYPE_INT32", "number": 5 }, { "name": "TYPE_FIXED64", "number": 6 }, { "name": "TYPE_FIXED32", "number": 7 }, { "name": "TYPE_BOOL", "number": 8 }, { "name": "TYPE_STRING", "number": 9 }, { "name": "TYPE_GROUP", "number": 10 }, { "name": "TYPE_MESSAGE", "number": 11 }, { "name": "TYPE_BYTES", "number": 12 }, { "name": "TYPE_UINT32", "number": 13 }, { "name": "TYPE_ENUM", "number": 14 }, { "name": "TYPE_SFIXED32", "number": 15 }, { "name": "TYPE_SFIXED64", "number": 16 }, { "name": "TYPE_SINT32", "number": 17 }, { "name": "TYPE_SINT64", "number": 18 }] }, { "name": "Label", "value": [{ "name": "LABEL_OPTIONAL", "number": 1 }, { "name": "LABEL_REPEATED", "number": 3 }, { "name": "LABEL_REQUIRED", "number": 2 }] }] }, { "name": "OneofDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "options", "number": 2, "type": 11, "label": 1, "typeName": ".google.protobuf.OneofOptions" }] }, { "name": "EnumDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "value", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.EnumValueDescriptorProto" }, { "name": "options", "number": 3, "type": 11, "label": 1, "typeName": ".google.protobuf.EnumOptions" }, { "name": "reserved_range", "number": 4, "type": 11, "label": 3, "typeName": ".google.protobuf.EnumDescriptorProto.EnumReservedRange" }, { "name": "reserved_name", "number": 5, "type": 9, "label": 3 }, { "name": "visibility", "number": 6, "type": 14, "label": 1, "typeName": ".google.protobuf.SymbolVisibility" }], "nestedType": [{ "name": "EnumReservedRange", "field": [{ "name": "start", "number": 1, "type": 5, "label": 1 }, { "name": "end", "number": 2, "type": 5, "label": 1 }] }] }, { "name": "EnumValueDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "number", "number": 2, "type": 5, "label": 1 }, { "name": "options", "number": 3, "type": 11, "label": 1, "typeName": ".google.protobuf.EnumValueOptions" }] }, { "name": "ServiceDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "method", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.MethodDescriptorProto" }, { "name": "options", "number": 3, "type": 11, "label": 1, "typeName": ".google.protobuf.ServiceOptions" }] }, { "name": "MethodDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "input_type", "number": 2, "type": 9, "label": 1 }, { "name": "output_type", "number": 3, "type": 9, "label": 1 }, { "name": "options", "number": 4, "type": 11, "label": 1, "typeName": ".google.protobuf.MethodOptions" }, { "name": "client_streaming", "number": 5, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "server_streaming", "number": 6, "type": 8, "label": 1, "defaultValue": "false" }] }, { "name": "FileOptions", "field": [{ "name": "java_package", "number": 1, "type": 9, "label": 1 }, { "name": "java_outer_classname", "number": 8, "type": 9, "label": 1 }, { "name": "java_multiple_files", "number": 10, "type": 8, "label": 1, "defaultValue": "false", "options": {} }, { "name": "java_generate_equals_and_hash", "number": 20, "type": 8, "label": 1, "options": { "deprecated": true } }, { "name": "java_string_check_utf8", "number": 27, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "optimize_for", "number": 9, "type": 14, "label": 1, "typeName": ".google.protobuf.FileOptions.OptimizeMode", "defaultValue": "SPEED" }, { "name": "go_package", "number": 11, "type": 9, "label": 1 }, { "name": "cc_generic_services", "number": 16, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "java_generic_services", "number": 17, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "py_generic_services", "number": 18, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "deprecated", "number": 23, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "cc_enable_arenas", "number": 31, "type": 8, "label": 1, "defaultValue": "true", "options": {} }, { "name": "objc_class_prefix", "number": 36, "type": 9, "label": 1 }, { "name": "csharp_namespace", "number": 37, "type": 9, "label": 1 }, { "name": "swift_prefix", "number": 39, "type": 9, "label": 1 }, { "name": "php_class_prefix", "number": 40, "type": 9, "label": 1 }, { "name": "php_namespace", "number": 41, "type": 9, "label": 1 }, { "name": "php_metadata_namespace", "number": 44, "type": 9, "label": 1 }, { "name": "ruby_package", "number": 45, "type": 9, "label": 1 }, { "name": "features", "number": 50, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "enumType": [{ "name": "OptimizeMode", "value": [{ "name": "SPEED", "number": 1 }, { "name": "CODE_SIZE", "number": 2 }, { "name": "LITE_RUNTIME", "number": 3 }] }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "MessageOptions", "field": [{ "name": "message_set_wire_format", "number": 1, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "no_standard_descriptor_accessor", "number": 2, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "deprecated", "number": 3, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "map_entry", "number": 7, "type": 8, "label": 1 }, { "name": "deprecated_legacy_json_field_conflicts", "number": 11, "type": 8, "label": 1, "options": { "deprecated": true } }, { "name": "features", "number": 12, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "FieldOptions", "field": [{ "name": "ctype", "number": 1, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldOptions.CType", "defaultValue": "STRING" }, { "name": "packed", "number": 2, "type": 8, "label": 1 }, { "name": "jstype", "number": 6, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldOptions.JSType", "defaultValue": "JS_NORMAL" }, { "name": "lazy", "number": 5, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "unverified_lazy", "number": 15, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "deprecated", "number": 3, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "weak", "number": 10, "type": 8, "label": 1, "defaultValue": "false", "options": { "deprecated": true } }, { "name": "debug_redact", "number": 16, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "retention", "number": 17, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldOptions.OptionRetention" }, { "name": "targets", "number": 19, "type": 14, "label": 3, "typeName": ".google.protobuf.FieldOptions.OptionTargetType" }, { "name": "edition_defaults", "number": 20, "type": 11, "label": 3, "typeName": ".google.protobuf.FieldOptions.EditionDefault" }, { "name": "features", "number": 21, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "feature_support", "number": 22, "type": 11, "label": 1, "typeName": ".google.protobuf.FieldOptions.FeatureSupport" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "nestedType": [{ "name": "EditionDefault", "field": [{ "name": "edition", "number": 3, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "value", "number": 2, "type": 9, "label": 1 }] }, { "name": "FeatureSupport", "field": [{ "name": "edition_introduced", "number": 1, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "edition_deprecated", "number": 2, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "deprecation_warning", "number": 3, "type": 9, "label": 1 }, { "name": "edition_removed", "number": 4, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "removal_error", "number": 5, "type": 9, "label": 1 }] }], "enumType": [{ "name": "CType", "value": [{ "name": "STRING", "number": 0 }, { "name": "CORD", "number": 1 }, { "name": "STRING_PIECE", "number": 2 }] }, { "name": "JSType", "value": [{ "name": "JS_NORMAL", "number": 0 }, { "name": "JS_STRING", "number": 1 }, { "name": "JS_NUMBER", "number": 2 }] }, { "name": "OptionRetention", "value": [{ "name": "RETENTION_UNKNOWN", "number": 0 }, { "name": "RETENTION_RUNTIME", "number": 1 }, { "name": "RETENTION_SOURCE", "number": 2 }] }, { "name": "OptionTargetType", "value": [{ "name": "TARGET_TYPE_UNKNOWN", "number": 0 }, { "name": "TARGET_TYPE_FILE", "number": 1 }, { "name": "TARGET_TYPE_EXTENSION_RANGE", "number": 2 }, { "name": "TARGET_TYPE_MESSAGE", "number": 3 }, { "name": "TARGET_TYPE_FIELD", "number": 4 }, { "name": "TARGET_TYPE_ONEOF", "number": 5 }, { "name": "TARGET_TYPE_ENUM", "number": 6 }, { "name": "TARGET_TYPE_ENUM_ENTRY", "number": 7 }, { "name": "TARGET_TYPE_SERVICE", "number": 8 }, { "name": "TARGET_TYPE_METHOD", "number": 9 }] }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "OneofOptions", "field": [{ "name": "features", "number": 1, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "EnumOptions", "field": [{ "name": "allow_alias", "number": 2, "type": 8, "label": 1 }, { "name": "deprecated", "number": 3, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "deprecated_legacy_json_field_conflicts", "number": 6, "type": 8, "label": 1, "options": { "deprecated": true } }, { "name": "features", "number": 7, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "EnumValueOptions", "field": [{ "name": "deprecated", "number": 1, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "features", "number": 2, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "debug_redact", "number": 3, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "feature_support", "number": 4, "type": 11, "label": 1, "typeName": ".google.protobuf.FieldOptions.FeatureSupport" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "ServiceOptions", "field": [{ "name": "features", "number": 34, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "deprecated", "number": 33, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "MethodOptions", "field": [{ "name": "deprecated", "number": 33, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "idempotency_level", "number": 34, "type": 14, "label": 1, "typeName": ".google.protobuf.MethodOptions.IdempotencyLevel", "defaultValue": "IDEMPOTENCY_UNKNOWN" }, { "name": "features", "number": 35, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "enumType": [{ "name": "IdempotencyLevel", "value": [{ "name": "IDEMPOTENCY_UNKNOWN", "number": 0 }, { "name": "NO_SIDE_EFFECTS", "number": 1 }, { "name": "IDEMPOTENT", "number": 2 }] }], "extensionRange": [{ "start": 990, "end": 999 }, { "start": 1e3, "end": 536870912 }] }, { "name": "UninterpretedOption", "field": [{ "name": "name", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption.NamePart" }, { "name": "identifier_value", "number": 3, "type": 9, "label": 1 }, { "name": "positive_int_value", "number": 4, "type": 4, "label": 1 }, { "name": "negative_int_value", "number": 5, "type": 3, "label": 1 }, { "name": "double_value", "number": 6, "type": 1, "label": 1 }, { "name": "string_value", "number": 7, "type": 12, "label": 1 }, { "name": "aggregate_value", "number": 8, "type": 9, "label": 1 }], "nestedType": [{ "name": "NamePart", "field": [{ "name": "name_part", "number": 1, "type": 9, "label": 2 }, { "name": "is_extension", "number": 2, "type": 8, "label": 2 }] }] }, { "name": "FeatureSet", "field": [{ "name": "field_presence", "number": 1, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.FieldPresence", "options": { "retention": 1, "targets": [4, 1], "editionDefaults": [{ "value": "EXPLICIT", "edition": 900 }, { "value": "IMPLICIT", "edition": 999 }, { "value": "EXPLICIT", "edition": 1e3 }] } }, { "name": "enum_type", "number": 2, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.EnumType", "options": { "retention": 1, "targets": [6, 1], "editionDefaults": [{ "value": "CLOSED", "edition": 900 }, { "value": "OPEN", "edition": 999 }] } }, { "name": "repeated_field_encoding", "number": 3, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.RepeatedFieldEncoding", "options": { "retention": 1, "targets": [4, 1], "editionDefaults": [{ "value": "EXPANDED", "edition": 900 }, { "value": "PACKED", "edition": 999 }] } }, { "name": "utf8_validation", "number": 4, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.Utf8Validation", "options": { "retention": 1, "targets": [4, 1], "editionDefaults": [{ "value": "NONE", "edition": 900 }, { "value": "VERIFY", "edition": 999 }] } }, { "name": "message_encoding", "number": 5, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.MessageEncoding", "options": { "retention": 1, "targets": [4, 1], "editionDefaults": [{ "value": "LENGTH_PREFIXED", "edition": 900 }] } }, { "name": "json_format", "number": 6, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.JsonFormat", "options": { "retention": 1, "targets": [3, 6, 1], "editionDefaults": [{ "value": "LEGACY_BEST_EFFORT", "edition": 900 }, { "value": "ALLOW", "edition": 999 }] } }, { "name": "enforce_naming_style", "number": 7, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.EnforceNamingStyle", "options": { "retention": 2, "targets": [1, 2, 3, 4, 5, 6, 7, 8, 9], "editionDefaults": [{ "value": "STYLE_LEGACY", "edition": 900 }, { "value": "STYLE2024", "edition": 1001 }, { "value": "STYLE2026", "edition": 1002 }] } }, { "name": "default_symbol_visibility", "number": 8, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility", "options": { "retention": 2, "targets": [1], "editionDefaults": [{ "value": "EXPORT_ALL", "edition": 900 }, { "value": "EXPORT_TOP_LEVEL", "edition": 1001 }, { "value": "STRICT", "edition": 1002 }] } }, { "name": "enforce_proto_limits", "number": 9, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.ProtoLimitsFeature.EnforceProtoLimits", "options": { "retention": 2, "targets": [6, 3, 4, 5], "editionDefaults": [{ "value": "LEGACY_NO_EXPLICIT_LIMITS", "edition": 900 }, { "value": "PROTO_LIMITS2026", "edition": 1002 }] } }], "nestedType": [{ "name": "VisibilityFeature", "enumType": [{ "name": "DefaultSymbolVisibility", "value": [{ "name": "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", "number": 0 }, { "name": "EXPORT_ALL", "number": 1 }, { "name": "EXPORT_TOP_LEVEL", "number": 2 }, { "name": "LOCAL_ALL", "number": 3 }, { "name": "STRICT", "number": 4 }] }] }, { "name": "ProtoLimitsFeature", "enumType": [{ "name": "EnforceProtoLimits", "value": [{ "name": "PROTO_LIMITS_UNKNOWN", "number": 0 }, { "name": "LEGACY_NO_EXPLICIT_LIMITS", "number": 1 }, { "name": "PROTO_LIMITS2026", "number": 2 }] }] }], "enumType": [{ "name": "FieldPresence", "value": [{ "name": "FIELD_PRESENCE_UNKNOWN", "number": 0 }, { "name": "EXPLICIT", "number": 1 }, { "name": "IMPLICIT", "number": 2 }, { "name": "LEGACY_REQUIRED", "number": 3 }] }, { "name": "EnumType", "value": [{ "name": "ENUM_TYPE_UNKNOWN", "number": 0 }, { "name": "OPEN", "number": 1 }, { "name": "CLOSED", "number": 2 }] }, { "name": "RepeatedFieldEncoding", "value": [{ "name": "REPEATED_FIELD_ENCODING_UNKNOWN", "number": 0 }, { "name": "PACKED", "number": 1 }, { "name": "EXPANDED", "number": 2 }] }, { "name": "Utf8Validation", "value": [{ "name": "UTF8_VALIDATION_UNKNOWN", "number": 0 }, { "name": "VERIFY", "number": 2 }, { "name": "NONE", "number": 3 }] }, { "name": "MessageEncoding", "value": [{ "name": "MESSAGE_ENCODING_UNKNOWN", "number": 0 }, { "name": "LENGTH_PREFIXED", "number": 1 }, { "name": "DELIMITED", "number": 2 }] }, { "name": "JsonFormat", "value": [{ "name": "JSON_FORMAT_UNKNOWN", "number": 0 }, { "name": "ALLOW", "number": 1 }, { "name": "LEGACY_BEST_EFFORT", "number": 2 }] }, { "name": "EnforceNamingStyle", "value": [{ "name": "ENFORCE_NAMING_STYLE_UNKNOWN", "number": 0 }, { "name": "STYLE2024", "number": 1 }, { "name": "STYLE_LEGACY", "number": 2 }, { "name": "STYLE2026", "number": 3 }] }], "extensionRange": [{ "start": 1e3, "end": 9995 }, { "start": 9995, "end": 1e4 }, { "start": 1e4, "end": 10001 }] }, { "name": "FeatureSetDefaults", "field": [{ "name": "defaults", "number": 1, "type": 11, "label": 3, "typeName": ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault" }, { "name": "minimum_edition", "number": 4, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "maximum_edition", "number": 5, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }], "nestedType": [{ "name": "FeatureSetEditionDefault", "field": [{ "name": "edition", "number": 3, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "overridable_features", "number": 4, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "fixed_features", "number": 5, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }] }] }, { "name": "SourceCodeInfo", "field": [{ "name": "location", "number": 1, "type": 11, "label": 3, "typeName": ".google.protobuf.SourceCodeInfo.Location" }], "nestedType": [{ "name": "Location", "field": [{ "name": "path", "number": 1, "type": 5, "label": 3, "options": { "packed": true } }, { "name": "span", "number": 2, "type": 5, "label": 3, "options": { "packed": true } }, { "name": "leading_comments", "number": 3, "type": 9, "label": 1 }, { "name": "trailing_comments", "number": 4, "type": 9, "label": 1 }, { "name": "leading_detached_comments", "number": 6, "type": 9, "label": 3 }] }], "extensionRange": [{ "start": 536e6, "end": 536000001 }] }, { "name": "GeneratedCodeInfo", "field": [{ "name": "annotation", "number": 1, "type": 11, "label": 3, "typeName": ".google.protobuf.GeneratedCodeInfo.Annotation" }], "nestedType": [{ "name": "Annotation", "field": [{ "name": "path", "number": 1, "type": 5, "label": 3, "options": { "packed": true } }, { "name": "source_file", "number": 2, "type": 9, "label": 1 }, { "name": "begin", "number": 3, "type": 5, "label": 1 }, { "name": "end", "number": 4, "type": 5, "label": 1 }, { "name": "semantic", "number": 5, "type": 14, "label": 1, "typeName": ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic" }], "enumType": [{ "name": "Semantic", "value": [{ "name": "NONE", "number": 0 }, { "name": "SET", "number": 1 }, { "name": "ALIAS", "number": 2 }] }] }] }], "enumType": [{ "name": "Edition", "value": [{ "name": "EDITION_UNKNOWN", "number": 0 }, { "name": "EDITION_LEGACY", "number": 900 }, { "name": "EDITION_PROTO2", "number": 998 }, { "name": "EDITION_PROTO3", "number": 999 }, { "name": "EDITION_2023", "number": 1e3 }, { "name": "EDITION_2024", "number": 1001 }, { "name": "EDITION_2026", "number": 1002 }, { "name": "EDITION_UNSTABLE", "number": 9999 }, { "name": "EDITION_1_TEST_ONLY", "number": 1 }, { "name": "EDITION_2_TEST_ONLY", "number": 2 }, { "name": "EDITION_99997_TEST_ONLY", "number": 99997 }, { "name": "EDITION_99998_TEST_ONLY", "number": 99998 }, { "name": "EDITION_99999_TEST_ONLY", "number": 99999 }, { "name": "EDITION_MAX", "number": 2147483647 }] }, { "name": "SymbolVisibility", "value": [{ "name": "VISIBILITY_UNSET", "number": 0 }, { "name": "VISIBILITY_LOCAL", "number": 1 }, { "name": "VISIBILITY_EXPORT", "number": 2 }] }] });
  var FileDescriptorProtoSchema = /* @__PURE__ */ messageDesc(file_google_protobuf_descriptor, 1);
  var ExtensionRangeOptions_VerificationState;
  (function(ExtensionRangeOptions_VerificationState2) {
    ExtensionRangeOptions_VerificationState2[ExtensionRangeOptions_VerificationState2["DECLARATION"] = 0] = "DECLARATION";
    ExtensionRangeOptions_VerificationState2[ExtensionRangeOptions_VerificationState2["UNVERIFIED"] = 1] = "UNVERIFIED";
  })(ExtensionRangeOptions_VerificationState || (ExtensionRangeOptions_VerificationState = {}));
  var FieldDescriptorProto_Type;
  (function(FieldDescriptorProto_Type2) {
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["DOUBLE"] = 1] = "DOUBLE";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["FLOAT"] = 2] = "FLOAT";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["INT64"] = 3] = "INT64";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["UINT64"] = 4] = "UINT64";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["INT32"] = 5] = "INT32";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["FIXED64"] = 6] = "FIXED64";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["FIXED32"] = 7] = "FIXED32";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["BOOL"] = 8] = "BOOL";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["STRING"] = 9] = "STRING";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["GROUP"] = 10] = "GROUP";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["MESSAGE"] = 11] = "MESSAGE";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["BYTES"] = 12] = "BYTES";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["UINT32"] = 13] = "UINT32";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["ENUM"] = 14] = "ENUM";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SFIXED32"] = 15] = "SFIXED32";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SFIXED64"] = 16] = "SFIXED64";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SINT32"] = 17] = "SINT32";
    FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SINT64"] = 18] = "SINT64";
  })(FieldDescriptorProto_Type || (FieldDescriptorProto_Type = {}));
  var FieldDescriptorProto_Label;
  (function(FieldDescriptorProto_Label2) {
    FieldDescriptorProto_Label2[FieldDescriptorProto_Label2["OPTIONAL"] = 1] = "OPTIONAL";
    FieldDescriptorProto_Label2[FieldDescriptorProto_Label2["REPEATED"] = 3] = "REPEATED";
    FieldDescriptorProto_Label2[FieldDescriptorProto_Label2["REQUIRED"] = 2] = "REQUIRED";
  })(FieldDescriptorProto_Label || (FieldDescriptorProto_Label = {}));
  var FileOptions_OptimizeMode;
  (function(FileOptions_OptimizeMode2) {
    FileOptions_OptimizeMode2[FileOptions_OptimizeMode2["SPEED"] = 1] = "SPEED";
    FileOptions_OptimizeMode2[FileOptions_OptimizeMode2["CODE_SIZE"] = 2] = "CODE_SIZE";
    FileOptions_OptimizeMode2[FileOptions_OptimizeMode2["LITE_RUNTIME"] = 3] = "LITE_RUNTIME";
  })(FileOptions_OptimizeMode || (FileOptions_OptimizeMode = {}));
  var FieldOptions_CType;
  (function(FieldOptions_CType2) {
    FieldOptions_CType2[FieldOptions_CType2["STRING"] = 0] = "STRING";
    FieldOptions_CType2[FieldOptions_CType2["CORD"] = 1] = "CORD";
    FieldOptions_CType2[FieldOptions_CType2["STRING_PIECE"] = 2] = "STRING_PIECE";
  })(FieldOptions_CType || (FieldOptions_CType = {}));
  var FieldOptions_JSType;
  (function(FieldOptions_JSType2) {
    FieldOptions_JSType2[FieldOptions_JSType2["JS_NORMAL"] = 0] = "JS_NORMAL";
    FieldOptions_JSType2[FieldOptions_JSType2["JS_STRING"] = 1] = "JS_STRING";
    FieldOptions_JSType2[FieldOptions_JSType2["JS_NUMBER"] = 2] = "JS_NUMBER";
  })(FieldOptions_JSType || (FieldOptions_JSType = {}));
  var FieldOptions_OptionRetention;
  (function(FieldOptions_OptionRetention2) {
    FieldOptions_OptionRetention2[FieldOptions_OptionRetention2["RETENTION_UNKNOWN"] = 0] = "RETENTION_UNKNOWN";
    FieldOptions_OptionRetention2[FieldOptions_OptionRetention2["RETENTION_RUNTIME"] = 1] = "RETENTION_RUNTIME";
    FieldOptions_OptionRetention2[FieldOptions_OptionRetention2["RETENTION_SOURCE"] = 2] = "RETENTION_SOURCE";
  })(FieldOptions_OptionRetention || (FieldOptions_OptionRetention = {}));
  var FieldOptions_OptionTargetType;
  (function(FieldOptions_OptionTargetType2) {
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_UNKNOWN"] = 0] = "TARGET_TYPE_UNKNOWN";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_FILE"] = 1] = "TARGET_TYPE_FILE";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_EXTENSION_RANGE"] = 2] = "TARGET_TYPE_EXTENSION_RANGE";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_MESSAGE"] = 3] = "TARGET_TYPE_MESSAGE";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_FIELD"] = 4] = "TARGET_TYPE_FIELD";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_ONEOF"] = 5] = "TARGET_TYPE_ONEOF";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_ENUM"] = 6] = "TARGET_TYPE_ENUM";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_ENUM_ENTRY"] = 7] = "TARGET_TYPE_ENUM_ENTRY";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_SERVICE"] = 8] = "TARGET_TYPE_SERVICE";
    FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_METHOD"] = 9] = "TARGET_TYPE_METHOD";
  })(FieldOptions_OptionTargetType || (FieldOptions_OptionTargetType = {}));
  var MethodOptions_IdempotencyLevel;
  (function(MethodOptions_IdempotencyLevel2) {
    MethodOptions_IdempotencyLevel2[MethodOptions_IdempotencyLevel2["IDEMPOTENCY_UNKNOWN"] = 0] = "IDEMPOTENCY_UNKNOWN";
    MethodOptions_IdempotencyLevel2[MethodOptions_IdempotencyLevel2["NO_SIDE_EFFECTS"] = 1] = "NO_SIDE_EFFECTS";
    MethodOptions_IdempotencyLevel2[MethodOptions_IdempotencyLevel2["IDEMPOTENT"] = 2] = "IDEMPOTENT";
  })(MethodOptions_IdempotencyLevel || (MethodOptions_IdempotencyLevel = {}));
  var FeatureSet_VisibilityFeature_DefaultSymbolVisibility;
  (function(FeatureSet_VisibilityFeature_DefaultSymbolVisibility2) {
    FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["DEFAULT_SYMBOL_VISIBILITY_UNKNOWN"] = 0] = "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN";
    FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["EXPORT_ALL"] = 1] = "EXPORT_ALL";
    FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["EXPORT_TOP_LEVEL"] = 2] = "EXPORT_TOP_LEVEL";
    FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["LOCAL_ALL"] = 3] = "LOCAL_ALL";
    FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["STRICT"] = 4] = "STRICT";
  })(FeatureSet_VisibilityFeature_DefaultSymbolVisibility || (FeatureSet_VisibilityFeature_DefaultSymbolVisibility = {}));
  var FeatureSet_ProtoLimitsFeature_EnforceProtoLimits;
  (function(FeatureSet_ProtoLimitsFeature_EnforceProtoLimits2) {
    FeatureSet_ProtoLimitsFeature_EnforceProtoLimits2[FeatureSet_ProtoLimitsFeature_EnforceProtoLimits2["PROTO_LIMITS_UNKNOWN"] = 0] = "PROTO_LIMITS_UNKNOWN";
    FeatureSet_ProtoLimitsFeature_EnforceProtoLimits2[FeatureSet_ProtoLimitsFeature_EnforceProtoLimits2["LEGACY_NO_EXPLICIT_LIMITS"] = 1] = "LEGACY_NO_EXPLICIT_LIMITS";
    FeatureSet_ProtoLimitsFeature_EnforceProtoLimits2[FeatureSet_ProtoLimitsFeature_EnforceProtoLimits2["PROTO_LIMITS2026"] = 2] = "PROTO_LIMITS2026";
  })(FeatureSet_ProtoLimitsFeature_EnforceProtoLimits || (FeatureSet_ProtoLimitsFeature_EnforceProtoLimits = {}));
  var FeatureSet_FieldPresence;
  (function(FeatureSet_FieldPresence2) {
    FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["FIELD_PRESENCE_UNKNOWN"] = 0] = "FIELD_PRESENCE_UNKNOWN";
    FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["EXPLICIT"] = 1] = "EXPLICIT";
    FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["IMPLICIT"] = 2] = "IMPLICIT";
    FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["LEGACY_REQUIRED"] = 3] = "LEGACY_REQUIRED";
  })(FeatureSet_FieldPresence || (FeatureSet_FieldPresence = {}));
  var FeatureSet_EnumType;
  (function(FeatureSet_EnumType2) {
    FeatureSet_EnumType2[FeatureSet_EnumType2["ENUM_TYPE_UNKNOWN"] = 0] = "ENUM_TYPE_UNKNOWN";
    FeatureSet_EnumType2[FeatureSet_EnumType2["OPEN"] = 1] = "OPEN";
    FeatureSet_EnumType2[FeatureSet_EnumType2["CLOSED"] = 2] = "CLOSED";
  })(FeatureSet_EnumType || (FeatureSet_EnumType = {}));
  var FeatureSet_RepeatedFieldEncoding;
  (function(FeatureSet_RepeatedFieldEncoding2) {
    FeatureSet_RepeatedFieldEncoding2[FeatureSet_RepeatedFieldEncoding2["REPEATED_FIELD_ENCODING_UNKNOWN"] = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN";
    FeatureSet_RepeatedFieldEncoding2[FeatureSet_RepeatedFieldEncoding2["PACKED"] = 1] = "PACKED";
    FeatureSet_RepeatedFieldEncoding2[FeatureSet_RepeatedFieldEncoding2["EXPANDED"] = 2] = "EXPANDED";
  })(FeatureSet_RepeatedFieldEncoding || (FeatureSet_RepeatedFieldEncoding = {}));
  var FeatureSet_Utf8Validation;
  (function(FeatureSet_Utf8Validation2) {
    FeatureSet_Utf8Validation2[FeatureSet_Utf8Validation2["UTF8_VALIDATION_UNKNOWN"] = 0] = "UTF8_VALIDATION_UNKNOWN";
    FeatureSet_Utf8Validation2[FeatureSet_Utf8Validation2["VERIFY"] = 2] = "VERIFY";
    FeatureSet_Utf8Validation2[FeatureSet_Utf8Validation2["NONE"] = 3] = "NONE";
  })(FeatureSet_Utf8Validation || (FeatureSet_Utf8Validation = {}));
  var FeatureSet_MessageEncoding;
  (function(FeatureSet_MessageEncoding2) {
    FeatureSet_MessageEncoding2[FeatureSet_MessageEncoding2["MESSAGE_ENCODING_UNKNOWN"] = 0] = "MESSAGE_ENCODING_UNKNOWN";
    FeatureSet_MessageEncoding2[FeatureSet_MessageEncoding2["LENGTH_PREFIXED"] = 1] = "LENGTH_PREFIXED";
    FeatureSet_MessageEncoding2[FeatureSet_MessageEncoding2["DELIMITED"] = 2] = "DELIMITED";
  })(FeatureSet_MessageEncoding || (FeatureSet_MessageEncoding = {}));
  var FeatureSet_JsonFormat;
  (function(FeatureSet_JsonFormat2) {
    FeatureSet_JsonFormat2[FeatureSet_JsonFormat2["JSON_FORMAT_UNKNOWN"] = 0] = "JSON_FORMAT_UNKNOWN";
    FeatureSet_JsonFormat2[FeatureSet_JsonFormat2["ALLOW"] = 1] = "ALLOW";
    FeatureSet_JsonFormat2[FeatureSet_JsonFormat2["LEGACY_BEST_EFFORT"] = 2] = "LEGACY_BEST_EFFORT";
  })(FeatureSet_JsonFormat || (FeatureSet_JsonFormat = {}));
  var FeatureSet_EnforceNamingStyle;
  (function(FeatureSet_EnforceNamingStyle2) {
    FeatureSet_EnforceNamingStyle2[FeatureSet_EnforceNamingStyle2["ENFORCE_NAMING_STYLE_UNKNOWN"] = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN";
    FeatureSet_EnforceNamingStyle2[FeatureSet_EnforceNamingStyle2["STYLE2024"] = 1] = "STYLE2024";
    FeatureSet_EnforceNamingStyle2[FeatureSet_EnforceNamingStyle2["STYLE_LEGACY"] = 2] = "STYLE_LEGACY";
    FeatureSet_EnforceNamingStyle2[FeatureSet_EnforceNamingStyle2["STYLE2026"] = 3] = "STYLE2026";
  })(FeatureSet_EnforceNamingStyle || (FeatureSet_EnforceNamingStyle = {}));
  var GeneratedCodeInfo_Annotation_Semantic;
  (function(GeneratedCodeInfo_Annotation_Semantic2) {
    GeneratedCodeInfo_Annotation_Semantic2[GeneratedCodeInfo_Annotation_Semantic2["NONE"] = 0] = "NONE";
    GeneratedCodeInfo_Annotation_Semantic2[GeneratedCodeInfo_Annotation_Semantic2["SET"] = 1] = "SET";
    GeneratedCodeInfo_Annotation_Semantic2[GeneratedCodeInfo_Annotation_Semantic2["ALIAS"] = 2] = "ALIAS";
  })(GeneratedCodeInfo_Annotation_Semantic || (GeneratedCodeInfo_Annotation_Semantic = {}));
  var Edition;
  (function(Edition2) {
    Edition2[Edition2["EDITION_UNKNOWN"] = 0] = "EDITION_UNKNOWN";
    Edition2[Edition2["EDITION_LEGACY"] = 900] = "EDITION_LEGACY";
    Edition2[Edition2["EDITION_PROTO2"] = 998] = "EDITION_PROTO2";
    Edition2[Edition2["EDITION_PROTO3"] = 999] = "EDITION_PROTO3";
    Edition2[Edition2["EDITION_2023"] = 1e3] = "EDITION_2023";
    Edition2[Edition2["EDITION_2024"] = 1001] = "EDITION_2024";
    Edition2[Edition2["EDITION_2026"] = 1002] = "EDITION_2026";
    Edition2[Edition2["EDITION_UNSTABLE"] = 9999] = "EDITION_UNSTABLE";
    Edition2[Edition2["EDITION_1_TEST_ONLY"] = 1] = "EDITION_1_TEST_ONLY";
    Edition2[Edition2["EDITION_2_TEST_ONLY"] = 2] = "EDITION_2_TEST_ONLY";
    Edition2[Edition2["EDITION_99997_TEST_ONLY"] = 99997] = "EDITION_99997_TEST_ONLY";
    Edition2[Edition2["EDITION_99998_TEST_ONLY"] = 99998] = "EDITION_99998_TEST_ONLY";
    Edition2[Edition2["EDITION_99999_TEST_ONLY"] = 99999] = "EDITION_99999_TEST_ONLY";
    Edition2[Edition2["EDITION_MAX"] = 2147483647] = "EDITION_MAX";
  })(Edition || (Edition = {}));
  var SymbolVisibility;
  (function(SymbolVisibility2) {
    SymbolVisibility2[SymbolVisibility2["VISIBILITY_UNSET"] = 0] = "VISIBILITY_UNSET";
    SymbolVisibility2[SymbolVisibility2["VISIBILITY_LOCAL"] = 1] = "VISIBILITY_LOCAL";
    SymbolVisibility2[SymbolVisibility2["VISIBILITY_EXPORT"] = 2] = "VISIBILITY_EXPORT";
  })(SymbolVisibility || (SymbolVisibility = {}));

  // node_modules/@bufbuild/protobuf/dist/esm/from-binary.js
  function makeReadContext(options) {
    return Object.assign(Object.assign({ readUnknownFields: true, recursionLimit: 100 }, options), { depth: 0 });
  }
  function fromBinary(schema, bytes, options) {
    const message = create(schema);
    compiledReader(schema).read(message, new BinaryReader(bytes), makeReadContext(options), bytes.byteLength);
    return message;
  }
  var compiledReaders = /* @__PURE__ */ new WeakMap();
  function compiledReader(desc) {
    let compiled = compiledReaders.get(desc);
    if (compiled === void 0) {
      compiled = compileMessage(desc);
    }
    return compiled;
  }
  function compileMessage(desc) {
    const descString = String(desc);
    const fieldReaders = /* @__PURE__ */ new Map();
    const compiled = {
      read: compileMessageReader(descString, fieldReaders),
      readGroup: compileGroupReader(descString, fieldReaders)
    };
    compiledReaders.set(desc, compiled);
    for (const field of desc.fields) {
      fieldReaders.set(field.number, compileFieldReader(field));
    }
    return compiled;
  }
  function compileMessageReader(descString, fieldReaders) {
    return (message, reader, ctx, length) => {
      var _a2;
      if (++ctx.depth > ctx.recursionLimit) {
        throw new Error(`cannot decode ${descString} from binary: maximum recursion depth of ${ctx.recursionLimit} reached`);
      }
      const end = reader.pos + length;
      const unknownFields = (_a2 = message.$unknown) !== null && _a2 !== void 0 ? _a2 : [];
      while (reader.pos < end) {
        const [fieldNo, wireType] = reader.tag();
        const fieldReader = fieldReaders.get(fieldNo);
        if (fieldReader === void 0) {
          const data = reader.skip(wireType, fieldNo, ctx.recursionLimit - ctx.depth);
          if (ctx.readUnknownFields) {
            unknownFields.push({ no: fieldNo, wireType, data });
          }
          continue;
        }
        fieldReader(message, reader, ctx, wireType);
      }
      if (unknownFields.length > 0) {
        message.$unknown = unknownFields;
      }
      ctx.depth--;
    };
  }
  function compileGroupReader(descString, fieldReaders) {
    return (message, reader, ctx, fieldNo) => {
      var _a2;
      if (++ctx.depth > ctx.recursionLimit) {
        throw new Error(`cannot decode ${descString} from binary: maximum recursion depth of ${ctx.recursionLimit} reached`);
      }
      let recordFieldNo;
      let wireType;
      const unknownFields = (_a2 = message.$unknown) !== null && _a2 !== void 0 ? _a2 : [];
      while (reader.pos < reader.len) {
        [recordFieldNo, wireType] = reader.tag();
        if (wireType == WireType.EndGroup) {
          break;
        }
        const fieldReader = fieldReaders.get(recordFieldNo);
        if (fieldReader === void 0) {
          const data = reader.skip(wireType, recordFieldNo, ctx.recursionLimit - ctx.depth);
          if (ctx.readUnknownFields) {
            unknownFields.push({ no: recordFieldNo, wireType, data });
          }
          continue;
        }
        fieldReader(message, reader, ctx, wireType);
      }
      if (wireType != WireType.EndGroup || recordFieldNo !== fieldNo) {
        throw new Error("invalid end group tag");
      }
      if (unknownFields.length > 0) {
        message.$unknown = unknownFields;
      }
      ctx.depth--;
    };
  }
  function compileFieldReader(field) {
    switch (field.fieldKind) {
      case "scalar":
        return compileScalarFieldReader(field);
      case "enum":
        return compileEnumFieldReader(field);
      case "message":
        return compileMessageFieldReader(field);
      case "list":
        return compileListFieldReader(field);
      case "map":
        return compileMapFieldReader(field);
    }
  }
  function compileScalarFieldReader(field) {
    const readScalar = compileScalarReader(field.scalar, field.utf8Validation, field.longAsString);
    const localName = field.localName;
    if (field.oneof) {
      const oneofLocalName = field.oneof.localName;
      return (message, reader) => {
        message[oneofLocalName] = {
          case: localName,
          value: readScalar(reader)
        };
      };
    }
    return (message, reader) => {
      message[localName] = readScalar(reader);
    };
  }
  function compileEnumFieldReader(field) {
    var _a2;
    const localName = field.localName;
    const oneofLocalName = (_a2 = field.oneof) === null || _a2 === void 0 ? void 0 : _a2.localName;
    if (field.enum.open) {
      if (oneofLocalName !== void 0) {
        return (message, reader) => {
          message[oneofLocalName] = { case: localName, value: reader.int32() };
        };
      }
      return (message, reader) => {
        message[localName] = reader.int32();
      };
    }
    const values = field.enum.values;
    const fieldNo = field.number;
    return (message, reader, ctx, wireType) => {
      var _a3;
      const val = reader.int32();
      if (values.some((v) => v.number === val)) {
        if (oneofLocalName !== void 0) {
          message[oneofLocalName] = { case: localName, value: val };
        } else {
          message[localName] = val;
        }
      } else if (ctx.readUnknownFields) {
        const bytes = [];
        varint32write(val, bytes);
        const unknownFields = (_a3 = message.$unknown) !== null && _a3 !== void 0 ? _a3 : [];
        unknownFields.push({
          no: fieldNo,
          wireType,
          data: new Uint8Array(bytes)
        });
        message.$unknown = unknownFields;
      }
    };
  }
  function compileMessageFieldReader(field) {
    const localName = field.localName;
    const { toMessage, toLocal } = localMessageMapper(field);
    const readChild = compileChildReader(field);
    if (field.oneof) {
      const oneofLocalName = field.oneof.localName;
      return (message, reader, ctx) => {
        const oneof = message[oneofLocalName];
        const child = toMessage(oneof.case === localName ? oneof.value : void 0);
        readChild(child, reader, ctx);
        message[oneofLocalName] = { case: localName, value: toLocal(child) };
      };
    }
    return (message, reader, ctx) => {
      const child = toMessage(message[localName]);
      readChild(child, reader, ctx);
      message[localName] = toLocal(child);
    };
  }
  function compileChildReader(field) {
    const compiledChild = compiledReader(field.message);
    if (field.delimitedEncoding) {
      const fieldNo = field.number;
      return (child, reader, ctx) => compiledChild.readGroup(child, reader, ctx, fieldNo);
    }
    return (child, reader, ctx) => compiledChild.read(child, reader, ctx, reader.uint32());
  }
  function compileListFieldReader(field) {
    const localName = field.localName;
    if (field.listKind == "message") {
      const { toMessage, toLocal } = localMessageMapper(field);
      const readChild = compileChildReader(field);
      return (message, reader, ctx) => {
        const child = toMessage(void 0);
        readChild(child, reader, ctx);
        message[localName].push(toLocal(child));
      };
    }
    const scalarType = field.listKind == "enum" ? ScalarType.INT32 : field.scalar;
    const longAsString = field.listKind == "scalar" ? field.longAsString : false;
    const readScalar = compileScalarReader(scalarType, field.utf8Validation, longAsString);
    const packedPossible = scalarType != ScalarType.STRING && scalarType != ScalarType.BYTES;
    return (message, reader, ctx, wireType) => {
      const items = message[localName];
      if (wireType == WireType.LengthDelimited && packedPossible) {
        const end = reader.uint32() + reader.pos;
        while (reader.pos < end) {
          items.push(readScalar(reader));
        }
      } else {
        items.push(readScalar(reader));
      }
    };
  }
  function compileMapFieldReader(field) {
    const localName = field.localName;
    const readKey = compileScalarReader(field.mapKey, field.utf8Validation, false);
    const keyZero = scalarZeroValue(field.mapKey, false);
    let readValue;
    let valueDefault;
    switch (field.mapKind) {
      case "scalar": {
        const scalar = field.scalar;
        const readScalar = compileScalarReader(scalar, field.utf8Validation, false);
        readValue = (reader) => readScalar(reader);
        if (scalar == ScalarType.BYTES) {
          valueDefault = () => new Uint8Array(0);
        } else {
          const zero = scalarZeroValue(scalar, false);
          valueDefault = () => zero;
        }
        break;
      }
      case "enum": {
        const zero = field.enum.values[0].number;
        readValue = (reader) => reader.int32();
        valueDefault = () => zero;
        break;
      }
      case "message": {
        const { toMessage, toLocal } = localMessageMapper(field);
        const readChild = compiledReader(field.message).read;
        readValue = (reader, ctx, existing) => {
          const child = toMessage(existing);
          readChild(child, reader, ctx, reader.uint32());
          return toLocal(child);
        };
        valueDefault = () => toLocal(toMessage(void 0));
        break;
      }
    }
    return (message, reader, ctx) => {
      const record = message[localName];
      let key;
      let val;
      const len = reader.uint32();
      const end = reader.pos + len;
      while (reader.pos < end) {
        const [fieldNo] = reader.tag();
        switch (fieldNo) {
          case 1:
            key = readKey(reader);
            break;
          case 2:
            val = readValue(reader, ctx, val);
            break;
        }
      }
      if (key === void 0) {
        key = keyZero;
      }
      if (val === void 0) {
        val = valueDefault();
      }
      setOwn(record, key, val);
    };
  }
  function compileScalarReader(type, utf8Validation, longAsString) {
    switch (type) {
      case ScalarType.STRING:
        return (reader) => reader.string(utf8Validation);
      case ScalarType.BOOL:
        return (reader) => reader.bool();
      case ScalarType.DOUBLE:
        return (reader) => reader.double();
      case ScalarType.FLOAT:
        return (reader) => reader.float();
      case ScalarType.INT32:
        return (reader) => reader.int32();
      case ScalarType.INT64:
        if (longAsString) {
          return (reader) => String(reader.int64());
        }
        return (reader) => reader.int64();
      case ScalarType.UINT64:
        if (longAsString) {
          return (reader) => String(reader.uint64());
        }
        return (reader) => reader.uint64();
      case ScalarType.FIXED64:
        if (longAsString) {
          return (reader) => String(reader.fixed64());
        }
        return (reader) => reader.fixed64();
      case ScalarType.BYTES:
        return (reader) => reader.bytes();
      case ScalarType.FIXED32:
        return (reader) => reader.fixed32();
      case ScalarType.SFIXED32:
        return (reader) => reader.sfixed32();
      case ScalarType.SFIXED64:
        if (longAsString) {
          return (reader) => String(reader.sfixed64());
        }
        return (reader) => reader.sfixed64();
      case ScalarType.SINT64:
        if (longAsString) {
          return (reader) => String(reader.sint64());
        }
        return (reader) => reader.sint64();
      case ScalarType.UINT32:
        return (reader) => reader.uint32();
      case ScalarType.SINT32:
        return (reader) => reader.sint32();
    }
  }

  // node_modules/@bufbuild/protobuf/dist/esm/codegenv2/file.js
  function fileDesc(b64, imports) {
    var _a2;
    const root = fromBinary(FileDescriptorProtoSchema, base64Decode(b64));
    root.messageType.forEach(restoreJsonNames);
    root.dependency = (_a2 = imports === null || imports === void 0 ? void 0 : imports.map((f) => f.proto.name)) !== null && _a2 !== void 0 ? _a2 : [];
    const reg = createFileRegistry(root, (protoFileName) => imports === null || imports === void 0 ? void 0 : imports.find((f) => f.proto.name === protoFileName));
    return reg.getFile(root.name);
  }

  // node_modules/@bufbuild/protobuf/dist/esm/to-binary.js
  var IMPLICIT3 = 2;
  var LEGACY_REQUIRED2 = 3;
  var writeDefaults = {
    writeUnknownFields: true
  };
  function makeWriteOptions(options) {
    return options ? Object.assign(Object.assign({}, writeDefaults), options) : writeDefaults;
  }
  function toBinary(schema, message, options) {
    const writer = new BinaryWriter();
    compiledWriter(schema)(writer, makeWriteOptions(options), message);
    return writer.finish();
  }
  var compiledWriters = /* @__PURE__ */ new WeakMap();
  function compiledWriter(desc) {
    let compiled = compiledWriters.get(desc);
    if (compiled === void 0) {
      compiled = compileMessage2(desc);
    }
    return compiled;
  }
  function compileMessage2(desc) {
    const typeName = desc.typeName;
    const sortedFields = desc.fields.concat().sort((a, b) => a.number - b.number);
    const foreignField = sortedFields[0];
    const fieldWriters = [];
    const compiled = (writer, opts, message) => {
      if (message.$typeName !== typeName && foreignField !== void 0) {
        throw new FieldError(foreignField, `cannot use ${foreignField} with message ${message.$typeName}`, "ForeignFieldError");
      }
      for (let i2 = 0; i2 < fieldWriters.length; i2++) {
        fieldWriters[i2](writer, opts, message);
      }
      const unknown = message.$unknown;
      if (unknown !== void 0 && opts.writeUnknownFields) {
        for (let i2 = 0; i2 < unknown.length; i2++) {
          const { no, wireType, data } = unknown[i2];
          writer.tag(no, wireType).raw(data);
        }
      }
    };
    compiledWriters.set(desc, compiled);
    for (const field of sortedFields) {
      fieldWriters.push(compileField(field));
    }
    return compiled;
  }
  function compileField(field) {
    switch (field.fieldKind) {
      case "message":
      case "scalar":
      case "enum":
        return compileSingularField(field);
      case "list":
        return compileListField(field);
      case "map":
        return compileMapField(field);
    }
  }
  function compileSingularField(field) {
    const writeValue = compileSingularValue(field);
    const localName = field.localName;
    if (field.oneof) {
      const oneofLocalName = field.oneof.localName;
      return (writer, opts, message) => {
        const oneof = message[oneofLocalName];
        if (oneof.case === localName) {
          writeValue(writer, opts, oneof.value);
        }
      };
    }
    if (field.presence != IMPLICIT3) {
      const requiredError = field.presence == LEGACY_REQUIRED2 ? `cannot encode ${field} to binary: required field not set` : void 0;
      return (writer, opts, message) => {
        const value = message[localName];
        if (value !== void 0 && Object.prototype.hasOwnProperty.call(message, localName)) {
          writeValue(writer, opts, value);
        } else if (requiredError !== void 0) {
          throw new Error(requiredError);
        }
      };
    }
    if (field.fieldKind == "enum") {
      const zero = field.enum.values[0].number;
      return (writer, opts, message) => {
        const value = message[localName];
        if (value !== zero) {
          writeValue(writer, opts, value);
        }
      };
    }
    switch (field.scalar) {
      case ScalarType.BOOL:
        return (writer, opts, message) => {
          const value = message[localName];
          if (value !== false) {
            writeValue(writer, opts, value);
          }
        };
      case ScalarType.STRING:
        return (writer, opts, message) => {
          const value = message[localName];
          if (value !== "") {
            writeValue(writer, opts, value);
          }
        };
      case ScalarType.BYTES:
        return (writer, opts, message) => {
          const value = message[localName];
          if (!(value instanceof Uint8Array) || value.byteLength > 0) {
            writeValue(writer, opts, value);
          }
        };
      case ScalarType.DOUBLE:
      case ScalarType.FLOAT:
        return (writer, opts, message) => {
          const value = message[localName];
          if (!Object.is(value, 0)) {
            writeValue(writer, opts, value);
          }
        };
      default:
        return (writer, opts, message) => {
          const value = message[localName];
          if (value != 0) {
            writeValue(writer, opts, value);
          }
        };
    }
  }
  function compileSingularValue(field) {
    switch (field.fieldKind) {
      case "message": {
        const { toMessage } = localMessageMapper(field);
        const writeChild = compileChildWriter(field);
        return (writer, opts, value) => {
          writeChild(writer, opts, toMessage(value));
        };
      }
      case "scalar":
      case "enum": {
        const scalarType = field.fieldKind == "enum" ? ScalarType.INT32 : field.scalar;
        const fieldNo = field.number;
        const wireType = writeTypeOfScalar(scalarType);
        const writeScalar = compileScalarValue(scalarType, field.parent.typeName, field.name);
        return (writer, opts, value) => {
          writer.tag(fieldNo, wireType);
          writeScalar(writer, value);
        };
      }
    }
  }
  function compileListField(field) {
    const localName = field.localName;
    const fieldNo = field.number;
    switch (field.listKind) {
      case "message": {
        const { toMessage } = localMessageMapper(field);
        const writeChild = compileChildWriter(field);
        return (writer, opts, message) => {
          const items = message[localName];
          for (let i2 = 0; i2 < items.length; i2++) {
            writeChild(writer, opts, toMessage(items[i2]));
          }
        };
      }
      case "scalar":
      case "enum": {
        const scalarType = field.listKind == "enum" ? ScalarType.INT32 : field.scalar;
        const writeScalar = compileScalarValue(scalarType, field.parent.typeName, field.name);
        if (field.packed) {
          return (writer, opts, message) => {
            const items = message[localName];
            if (items.length == 0) {
              return;
            }
            writer.tag(fieldNo, WireType.LengthDelimited).fork();
            for (let i2 = 0; i2 < items.length; i2++) {
              writeScalar(writer, items[i2]);
            }
            writer.join();
          };
        }
        const wireType = writeTypeOfScalar(scalarType);
        return (writer, opts, message) => {
          const items = message[localName];
          for (let i2 = 0; i2 < items.length; i2++) {
            writer.tag(fieldNo, wireType);
            writeScalar(writer, items[i2]);
          }
        };
      }
    }
  }
  function compileMapField(field) {
    const localName = field.localName;
    const fieldNo = field.number;
    const writeKey = compileMapKey(field);
    if (field.mapKind == "message") {
      const { toMessage } = localMessageMapper(field);
      const writeMessage = compiledWriter(field.message);
      return (writer, opts, message) => {
        const record = message[localName];
        const keys = Object.keys(record);
        for (let i2 = 0; i2 < keys.length; i2++) {
          const key = keys[i2];
          writer.tag(fieldNo, WireType.LengthDelimited).fork();
          writeKey(writer, key);
          writer.tag(2, WireType.LengthDelimited).fork();
          writeMessage(writer, opts, toMessage(record[key]));
          writer.join();
          writer.join();
        }
      };
    }
    const scalarType = field.mapKind == "enum" ? ScalarType.INT32 : field.scalar;
    const valueWireType = writeTypeOfScalar(scalarType);
    const writeScalar = compileScalarValue(scalarType, field.parent.typeName, field.name);
    return (writer, opts, message) => {
      const record = message[localName];
      const keys = Object.keys(record);
      for (let i2 = 0; i2 < keys.length; i2++) {
        const key = keys[i2];
        writer.tag(fieldNo, WireType.LengthDelimited).fork();
        writeKey(writer, key);
        writer.tag(2, valueWireType);
        writeScalar(writer, record[key]);
        writer.join();
      }
    };
  }
  function compileMapKey(field) {
    const wireType = writeTypeOfScalar(field.mapKey);
    const writeScalar = compileScalarValue(field.mapKey, field.parent.typeName, field.name);
    const convertKey = compileMapKeyConverter(field.mapKey);
    return (writer, key) => {
      writer.tag(1, wireType);
      writeScalar(writer, convertKey(key));
    };
  }
  function compileMapKeyConverter(type) {
    switch (type) {
      case ScalarType.STRING:
        return (key) => key;
      case ScalarType.BOOL:
        return (key) => key === "true" ? true : key === "false" ? false : key;
      case ScalarType.UINT64:
      case ScalarType.FIXED64:
        return (key) => {
          try {
            return protoInt64.uParse(key);
          } catch (_a2) {
            return key;
          }
        };
      case ScalarType.INT64:
      case ScalarType.SFIXED64:
      case ScalarType.SINT64:
        return (key) => {
          try {
            return protoInt64.parse(key);
          } catch (_a2) {
            return key;
          }
        };
      default:
        return (key) => {
          const n = Number.parseInt(key);
          return Number.isFinite(n) ? n : key;
        };
    }
  }
  function compileScalarValue(type, messageName, fieldName) {
    const writeScalar = compileScalarWrite(type);
    return (writer, value) => {
      try {
        writeScalar(writer, value);
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(`cannot encode field ${messageName}.${fieldName} to binary: ${e.message}`);
        }
        throw e;
      }
    };
  }
  function compileScalarWrite(type) {
    switch (type) {
      case ScalarType.STRING:
        return (writer, value) => writer.string(value);
      case ScalarType.BOOL:
        return (writer, value) => writer.bool(value);
      case ScalarType.DOUBLE:
        return (writer, value) => writer.double(value);
      case ScalarType.FLOAT:
        return (writer, value) => writer.float(value);
      case ScalarType.INT32:
        return (writer, value) => writer.int32(value);
      case ScalarType.INT64:
        return (writer, value) => writer.int64(value);
      case ScalarType.UINT64:
        return (writer, value) => writer.uint64(value);
      case ScalarType.FIXED64:
        return (writer, value) => writer.fixed64(value);
      case ScalarType.BYTES:
        return (writer, value) => writer.bytes(value);
      case ScalarType.FIXED32:
        return (writer, value) => writer.fixed32(value);
      case ScalarType.SFIXED32:
        return (writer, value) => writer.sfixed32(value);
      case ScalarType.SFIXED64:
        return (writer, value) => writer.sfixed64(value);
      case ScalarType.SINT64:
        return (writer, value) => writer.sint64(value);
      case ScalarType.UINT32:
        return (writer, value) => writer.uint32(value);
      case ScalarType.SINT32:
        return (writer, value) => writer.sint32(value);
    }
  }
  function compileChildWriter(field) {
    const fieldNo = field.number;
    const writeMessage = compiledWriter(field.message);
    if (field.delimitedEncoding) {
      return (writer, opts, child) => {
        writer.tag(fieldNo, WireType.StartGroup);
        writeMessage(writer, opts, child);
        writer.tag(fieldNo, WireType.EndGroup);
      };
    }
    return (writer, opts, child) => {
      writer.tag(fieldNo, WireType.LengthDelimited).fork();
      writeMessage(writer, opts, child);
      writer.join();
    };
  }
  function writeTypeOfScalar(type) {
    switch (type) {
      case ScalarType.BYTES:
      case ScalarType.STRING:
        return WireType.LengthDelimited;
      case ScalarType.DOUBLE:
      case ScalarType.FIXED64:
      case ScalarType.SFIXED64:
        return WireType.Bit64;
      case ScalarType.FIXED32:
      case ScalarType.SFIXED32:
      case ScalarType.FLOAT:
        return WireType.Bit32;
      default:
        return WireType.Varint;
    }
  }

  // node_modules/ankipack/dist/generated/anki/generic_pb.js
  var file_anki_generic = /* @__PURE__ */ fileDesc("ChJhbmtpL2dlbmVyaWMucHJvdG8SDGFua2kuZ2VuZXJpYyIHCgVFbXB0eSIUCgVJbnQzMhILCgN2YWwYASABKBEiFQoGVUludDMyEgsKA3ZhbBgBIAEoDSIUCgVJbnQ2NBILCgN2YWwYASABKAMiFQoGU3RyaW5nEgsKA3ZhbBgBIAEoCSIUCgRKc29uEgwKBGpzb24YASABKAwiEwoEQm9vbBILCgN2YWwYASABKAgiGgoKU3RyaW5nTGlzdBIMCgR2YWxzGAEgAygJQgJQAWIGcHJvdG8z");

  // node_modules/ankipack/dist/generated/anki/sync_pb.js
  var file_anki_sync = /* @__PURE__ */ fileDesc("Cg9hbmtpL3N5bmMucHJvdG8SCWFua2kuc3luYyJuCghTeW5jQXV0aBIMCgRoa2V5GAEgASgJEhUKCGVuZHBvaW50GAIgASgJSACIAQESHAoPaW9fdGltZW91dF9zZWNzGAMgASgNSAGIAQFCCwoJX2VuZHBvaW50QhIKEF9pb190aW1lb3V0X3NlY3MiWgoQU3luY0xvZ2luUmVxdWVzdBIQCgh1c2VybmFtZRgBIAEoCRIQCghwYXNzd29yZBgCIAEoCRIVCghlbmRwb2ludBgDIAEoCUgAiAEBQgsKCV9lbmRwb2ludCK2AQoSU3luY1N0YXR1c1Jlc3BvbnNlEjgKCHJlcXVpcmVkGAEgASgOMiYuYW5raS5zeW5jLlN5bmNTdGF0dXNSZXNwb25zZS5SZXF1aXJlZBIZCgxuZXdfZW5kcG9pbnQYBCABKAlIAIgBASI6CghSZXF1aXJlZBIOCgpOT19DSEFOR0VTEAASDwoLTk9STUFMX1NZTkMQARINCglGVUxMX1NZTkMQAkIPCg1fbmV3X2VuZHBvaW50Ik4KFVN5bmNDb2xsZWN0aW9uUmVxdWVzdBIhCgRhdXRoGAEgASgLMhMuYW5raS5zeW5jLlN5bmNBdXRoEhIKCnN5bmNfbWVkaWEYAiABKAgitwIKFlN5bmNDb2xsZWN0aW9uUmVzcG9uc2USEwoLaG9zdF9udW1iZXIYASABKA0SFgoOc2VydmVyX21lc3NhZ2UYAiABKAkSQwoIcmVxdWlyZWQYAyABKA4yMS5hbmtpLnN5bmMuU3luY0NvbGxlY3Rpb25SZXNwb25zZS5DaGFuZ2VzUmVxdWlyZWQSGQoMbmV3X2VuZHBvaW50GAQgASgJSACIAQESGAoQc2VydmVyX21lZGlhX3VzbhgFIAEoBSJlCg9DaGFuZ2VzUmVxdWlyZWQSDgoKTk9fQ0hBTkdFUxAAEg8KC05PUk1BTF9TWU5DEAESDQoJRlVMTF9TWU5DEAISEQoNRlVMTF9ET1dOTE9BRBADEg8KC0ZVTExfVVBMT0FEEARCDwoNX25ld19lbmRwb2ludCJZChdNZWRpYVN5bmNTdGF0dXNSZXNwb25zZRIOCgZhY3RpdmUYASABKAgSLgoIcHJvZ3Jlc3MYAiABKAsyHC5hbmtpLnN5bmMuTWVkaWFTeW5jUHJvZ3Jlc3MiRAoRTWVkaWFTeW5jUHJvZ3Jlc3MSDwoHY2hlY2tlZBgBIAEoCRINCgVhZGRlZBgCIAEoCRIPCgdyZW1vdmVkGAMgASgJIngKG0Z1bGxVcGxvYWRPckRvd25sb2FkUmVxdWVzdBIhCgRhdXRoGAEgASgLMhMuYW5raS5zeW5jLlN5bmNBdXRoEg4KBnVwbG9hZBgCIAEoCBIXCgpzZXJ2ZXJfdXNuGAMgASgFSACIAQFCDQoLX3NlcnZlcl91c25CAlABYgZwcm90bzM", [file_anki_generic]);
  var SyncStatusResponse_Required;
  (function(SyncStatusResponse_Required2) {
    SyncStatusResponse_Required2[SyncStatusResponse_Required2["NO_CHANGES"] = 0] = "NO_CHANGES";
    SyncStatusResponse_Required2[SyncStatusResponse_Required2["NORMAL_SYNC"] = 1] = "NORMAL_SYNC";
    SyncStatusResponse_Required2[SyncStatusResponse_Required2["FULL_SYNC"] = 2] = "FULL_SYNC";
  })(SyncStatusResponse_Required || (SyncStatusResponse_Required = {}));
  var SyncCollectionResponse_ChangesRequired;
  (function(SyncCollectionResponse_ChangesRequired2) {
    SyncCollectionResponse_ChangesRequired2[SyncCollectionResponse_ChangesRequired2["NO_CHANGES"] = 0] = "NO_CHANGES";
    SyncCollectionResponse_ChangesRequired2[SyncCollectionResponse_ChangesRequired2["NORMAL_SYNC"] = 1] = "NORMAL_SYNC";
    SyncCollectionResponse_ChangesRequired2[SyncCollectionResponse_ChangesRequired2["FULL_SYNC"] = 2] = "FULL_SYNC";
    SyncCollectionResponse_ChangesRequired2[SyncCollectionResponse_ChangesRequired2["FULL_DOWNLOAD"] = 3] = "FULL_DOWNLOAD";
    SyncCollectionResponse_ChangesRequired2[SyncCollectionResponse_ChangesRequired2["FULL_UPLOAD"] = 4] = "FULL_UPLOAD";
  })(SyncCollectionResponse_ChangesRequired || (SyncCollectionResponse_ChangesRequired = {}));

  // node_modules/ankipack/dist/generated/anki/collection_pb.js
  var file_anki_collection = /* @__PURE__ */ fileDesc("ChVhbmtpL2NvbGxlY3Rpb24ucHJvdG8SD2Fua2kuY29sbGVjdGlvbiJiChVPcGVuQ29sbGVjdGlvblJlcXVlc3QSFwoPY29sbGVjdGlvbl9wYXRoGAEgASgJEhkKEW1lZGlhX2ZvbGRlcl9wYXRoGAIgASgJEhUKDW1lZGlhX2RiX3BhdGgYAyABKAkiNwoWQ2xvc2VDb2xsZWN0aW9uUmVxdWVzdBIdChVkb3duZ3JhZGVfdG9fc2NoZW1hMTEYASABKAgiKQoVQ2hlY2tEYXRhYmFzZVJlc3BvbnNlEhAKCHByb2JsZW1zGAEgAygJIuEBCglPcENoYW5nZXMSDAoEY2FyZBgBIAEoCBIMCgRub3RlGAIgASgIEgwKBGRlY2sYAyABKAgSCwoDdGFnGAQgASgIEhAKCG5vdGV0eXBlGAUgASgIEg4KBmNvbmZpZxgGIAEoCBITCgtkZWNrX2NvbmZpZxgLIAEoCBINCgVtdGltZRgMIAEoCBIVCg1icm93c2VyX3RhYmxlGAcgASgIEhcKD2Jyb3dzZXJfc2lkZWJhchgIIAEoCBIRCglub3RlX3RleHQYCSABKAgSFAoMc3R1ZHlfcXVldWVzGAogASgIIjwKDU9wQ2hhbmdlc09ubHkSKwoHY2hhbmdlcxgBIAEoCzIaLmFua2kuY29sbGVjdGlvbi5PcENoYW5nZXMiUAoST3BDaGFuZ2VzV2l0aENvdW50EisKB2NoYW5nZXMYASABKAsyGi5hbmtpLmNvbGxlY3Rpb24uT3BDaGFuZ2VzEg0KBWNvdW50GAIgASgNIkoKD09wQ2hhbmdlc1dpdGhJZBIrCgdjaGFuZ2VzGAEgASgLMhouYW5raS5jb2xsZWN0aW9uLk9wQ2hhbmdlcxIKCgJpZBgCIAEoAyI7CgpVbmRvU3RhdHVzEgwKBHVuZG8YASABKAkSDAoEcmVkbxgCIAEoCRIRCglsYXN0X3N0ZXAYAyABKA0itQEKEk9wQ2hhbmdlc0FmdGVyVW5kbxIrCgdjaGFuZ2VzGAEgASgLMhouYW5raS5jb2xsZWN0aW9uLk9wQ2hhbmdlcxIRCglvcGVyYXRpb24YAiABKAkSHQoVcmV2ZXJ0ZWRfdG9fdGltZXN0YW1wGAMgASgDEi8KCm5ld19zdGF0dXMYBCABKAsyGy5hbmtpLmNvbGxlY3Rpb24uVW5kb1N0YXR1cxIPCgdjb3VudGVyGAUgASgNIusFCghQcm9ncmVzcxIjCgRub25lGAEgASgLMhMuYW5raS5nZW5lcmljLkVtcHR5SAASMgoKbWVkaWFfc3luYxgCIAEoCzIcLmFua2kuc3luYy5NZWRpYVN5bmNQcm9ncmVzc0gAEhUKC21lZGlhX2NoZWNrGAMgASgJSAASNwoJZnVsbF9zeW5jGAQgASgLMiIuYW5raS5jb2xsZWN0aW9uLlByb2dyZXNzLkZ1bGxTeW5jSAASOwoLbm9ybWFsX3N5bmMYBSABKAsyJC5hbmtpLmNvbGxlY3Rpb24uUHJvZ3Jlc3MuTm9ybWFsU3luY0gAEkEKDmRhdGFiYXNlX2NoZWNrGAYgASgLMicuYW5raS5jb2xsZWN0aW9uLlByb2dyZXNzLkRhdGFiYXNlQ2hlY2tIABITCglpbXBvcnRpbmcYByABKAlIABITCglleHBvcnRpbmcYCCABKAlIABJACg5jb21wdXRlX3BhcmFtcxgJIAEoCzImLmFua2kuY29sbGVjdGlvbi5Db21wdXRlUGFyYW1zUHJvZ3Jlc3NIABJGChFjb21wdXRlX3JldGVudGlvbhgKIAEoCzIpLmFua2kuY29sbGVjdGlvbi5Db21wdXRlUmV0ZW50aW9uUHJvZ3Jlc3NIABJACg5jb21wdXRlX21lbW9yeRgLIAEoCzImLmFua2kuY29sbGVjdGlvbi5Db21wdXRlTWVtb3J5UHJvZ3Jlc3NIABouCghGdWxsU3luYxITCgt0cmFuc2ZlcnJlZBgBIAEoDRINCgV0b3RhbBgCIAEoDRo7CgpOb3JtYWxTeW5jEg0KBXN0YWdlGAEgASgJEg0KBWFkZGVkGAIgASgJEg8KB3JlbW92ZWQYAyABKAkaSgoNRGF0YWJhc2VDaGVjaxINCgVzdGFnZRgBIAEoCRITCgtzdGFnZV90b3RhbBgCIAEoDRIVCg1zdGFnZV9jdXJyZW50GAMgASgNQgcKBXZhbHVlIncKFUNvbXB1dGVQYXJhbXNQcm9ncmVzcxIPCgdjdXJyZW50GAEgASgNEg0KBXRvdGFsGAIgASgNEg8KB3Jldmlld3MYAyABKA0SFgoOY3VycmVudF9wcmVzZXQYBCABKA0SFQoNdG90YWxfcHJlc2V0cxgFIAEoDSI6ChhDb21wdXRlUmV0ZW50aW9uUHJvZ3Jlc3MSDwoHY3VycmVudBgBIAEoDRINCgV0b3RhbBgCIAEoDSJSChVDb21wdXRlTWVtb3J5UHJvZ3Jlc3MSFQoNY3VycmVudF9jYXJkcxgBIAEoDRITCgt0b3RhbF9jYXJkcxgCIAEoDRINCgVsYWJlbBgDIAEoCSJYChNDcmVhdGVCYWNrdXBSZXF1ZXN0EhUKDWJhY2t1cF9mb2xkZXIYASABKAkSDQoFZm9yY2UYAiABKAgSGwoTd2FpdF9mb3JfY29tcGxldGlvbhgDIAEoCCIrChhHZXRDdXN0b21Db2xvdXJzUmVzcG9uc2USDwoHY29sb3VycxgBIAMoCUICUAFiBnByb3RvMw", [file_anki_generic, file_anki_sync]);

  // node_modules/ankipack/dist/generated/anki/decks_pb.js
  var file_anki_decks = /* @__PURE__ */ fileDesc("ChBhbmtpL2RlY2tzLnByb3RvEgphbmtpLmRlY2tzIhUKBkRlY2tJZBILCgNkaWQYASABKAMiFwoHRGVja0lkcxIMCgRkaWRzGAEgAygDIu0LCgREZWNrEgoKAmlkGAEgASgDEgwKBG5hbWUYAiABKAkSEgoKbXRpbWVfc2VjcxgDIAEoAxILCgN1c24YBCABKAUSJwoGY29tbW9uGAUgASgLMhcuYW5raS5kZWNrcy5EZWNrLkNvbW1vbhIpCgZub3JtYWwYBiABKAsyFy5hbmtpLmRlY2tzLkRlY2suTm9ybWFsSAASLQoIZmlsdGVyZWQYByABKAsyGS5hbmtpLmRlY2tzLkRlY2suRmlsdGVyZWRIABrRAQoGQ29tbW9uEhcKD3N0dWR5X2NvbGxhcHNlZBgBIAEoCBIZChFicm93c2VyX2NvbGxhcHNlZBgCIAEoCBIYChBsYXN0X2RheV9zdHVkaWVkGAMgASgNEhMKC25ld19zdHVkaWVkGAQgASgFEhYKDnJldmlld19zdHVkaWVkGAUgASgFEhwKFG1pbGxpc2Vjb25kc19zdHVkaWVkGAcgASgFEhgKEGxlYXJuaW5nX3N0dWRpZWQYBiABKAUSDgoFb3RoZXIY/wEgASgMSgQICBAOGqoDCgZOb3JtYWwSEQoJY29uZmlnX2lkGAEgASgDEhIKCmV4dGVuZF9uZXcYAiABKA0SFQoNZXh0ZW5kX3JldmlldxgDIAEoDRITCgtkZXNjcmlwdGlvbhgEIAEoCRIcChRtYXJrZG93bl9kZXNjcmlwdGlvbhgFIAEoCBIZCgxyZXZpZXdfbGltaXQYBiABKA1IAIgBARIWCgluZXdfbGltaXQYByABKA1IAYgBARI8ChJyZXZpZXdfbGltaXRfdG9kYXkYCCABKAsyIC5hbmtpLmRlY2tzLkRlY2suTm9ybWFsLkRheUxpbWl0EjkKD25ld19saW1pdF90b2RheRgJIAEoCzIgLmFua2kuZGVja3MuRGVjay5Ob3JtYWwuRGF5TGltaXQSHgoRZGVzaXJlZF9yZXRlbnRpb24YCiABKAJIAogBARooCghEYXlMaW1pdBINCgVsaW1pdBgBIAEoDRINCgV0b2RheRgCIAEoDUIPCg1fcmV2aWV3X2xpbWl0QgwKCl9uZXdfbGltaXRCFAoSX2Rlc2lyZWRfcmV0ZW50aW9uSgQIDBAQGqoECghGaWx0ZXJlZBISCgpyZXNjaGVkdWxlGAEgASgIEjoKDHNlYXJjaF90ZXJtcxgCIAMoCzIkLmFua2kuZGVja3MuRGVjay5GaWx0ZXJlZC5TZWFyY2hUZXJtEg4KBmRlbGF5cxgDIAMoAhIVCg1wcmV2aWV3X2RlbGF5GAQgASgNEhoKEnByZXZpZXdfYWdhaW5fc2VjcxgHIAEoDRIZChFwcmV2aWV3X2hhcmRfc2VjcxgFIAEoDRIZChFwcmV2aWV3X2dvb2Rfc2VjcxgGIAEoDRrUAgoKU2VhcmNoVGVybRIOCgZzZWFyY2gYASABKAkSDQoFbGltaXQYAiABKA0SOQoFb3JkZXIYAyABKA4yKi5hbmtpLmRlY2tzLkRlY2suRmlsdGVyZWQuU2VhcmNoVGVybS5PcmRlciLrAQoFT3JkZXISGQoVT0xERVNUX1JFVklFV0VEX0ZJUlNUEAASCgoGUkFORE9NEAESFwoTSU5URVJWQUxTX0FTQ0VORElORxACEhgKFElOVEVSVkFMU19ERVNDRU5ESU5HEAMSCgoGTEFQU0VTEAQSCQoFQURERUQQBRIHCgNEVUUQBhIRCg1SRVZFUlNFX0FEREVEEAcSHAoYUkVUUklFVkFCSUxJVFlfQVNDRU5ESU5HEAgSHQoZUkVUUklFVkFCSUxJVFlfREVTQ0VORElORxAJEhgKFFJFTEFUSVZFX09WRVJEVUVORVNTEAoacQoNS2luZENvbnRhaW5lchIpCgZub3JtYWwYASABKAsyFy5hbmtpLmRlY2tzLkRlY2suTm9ybWFsSAASLQoIZmlsdGVyZWQYAiABKAsyGS5hbmtpLmRlY2tzLkRlY2suRmlsdGVyZWRIAEIGCgRraW5kQgYKBGtpbmQiTAocQWRkT3JVcGRhdGVEZWNrTGVnYWN5UmVxdWVzdBIMCgRkZWNrGAEgASgMEh4KFnByZXNlcnZlX3Vzbl9hbmRfbXRpbWUYAiABKAgiHgoPRGVja1RyZWVSZXF1ZXN0EgsKA25vdxgBIAEoAyLyAgoMRGVja1RyZWVOb2RlEg8KB2RlY2tfaWQYASABKAMSDAoEbmFtZRgCIAEoCRINCgVsZXZlbBgEIAEoDRIRCgljb2xsYXBzZWQYBSABKAgSFAoMcmV2aWV3X2NvdW50GAYgASgNEhMKC2xlYXJuX2NvdW50GAcgASgNEhEKCW5ld19jb3VudBgIIAEoDRIZChFpbnRyYWRheV9sZWFybmluZxgJIAEoDRIiChppbnRlcmRheV9sZWFybmluZ191bmNhcHBlZBgKIAEoDRIUCgxuZXdfdW5jYXBwZWQYCyABKA0SFwoPcmV2aWV3X3VuY2FwcGVkGAwgASgNEhUKDXRvdGFsX2luX2RlY2sYDSABKA0SIAoYdG90YWxfaW5jbHVkaW5nX2NoaWxkcmVuGA4gASgNEhAKCGZpbHRlcmVkGBAgASgIEioKCGNoaWxkcmVuGAMgAygLMhguYW5raS5kZWNrcy5EZWNrVHJlZU5vZGUimwEKF1NldERlY2tDb2xsYXBzZWRSZXF1ZXN0Eg8KB2RlY2tfaWQYASABKAMSEQoJY29sbGFwc2VkGAIgASgIEjgKBXNjb3BlGAMgASgOMikuYW5raS5kZWNrcy5TZXREZWNrQ29sbGFwc2VkUmVxdWVzdC5TY29wZSIiCgVTY29wZRIMCghSRVZJRVdFUhAAEgsKB0JST1dTRVIQASJLChNHZXREZWNrTmFtZXNSZXF1ZXN0EhoKEnNraXBfZW1wdHlfZGVmYXVsdBgBIAEoCBIYChBpbmNsdWRlX2ZpbHRlcmVkGAIgASgIIjQKCURlY2tOYW1lcxInCgdlbnRyaWVzGAEgAygLMhYuYW5raS5kZWNrcy5EZWNrTmFtZUlkIiYKCkRlY2tOYW1lSWQSCgoCaWQYASABKAMSDAoEbmFtZRgCIAEoCSI8ChRSZXBhcmVudERlY2tzUmVxdWVzdBIQCghkZWNrX2lkcxgBIAMoAxISCgpuZXdfcGFyZW50GAIgASgDIjYKEVJlbmFtZURlY2tSZXF1ZXN0Eg8KB2RlY2tfaWQYASABKAMSEAoIbmV3X25hbWUYAiABKAkicQoVRmlsdGVyZWREZWNrRm9yVXBkYXRlEgoKAmlkGAEgASgDEgwKBG5hbWUYAiABKAkSKQoGY29uZmlnGAMgASgLMhkuYW5raS5kZWNrcy5EZWNrLkZpbHRlcmVkEhMKC2FsbG93X2VtcHR5GAQgASgIQgJQAWIGcHJvdG8z", [file_anki_generic, file_anki_collection]);
  var Deck_CommonSchema = /* @__PURE__ */ messageDesc(file_anki_decks, 2, 0);
  var Deck_NormalSchema = /* @__PURE__ */ messageDesc(file_anki_decks, 2, 1);
  var Deck_Filtered_SearchTerm_Order;
  (function(Deck_Filtered_SearchTerm_Order2) {
    Deck_Filtered_SearchTerm_Order2[Deck_Filtered_SearchTerm_Order2["OLDEST_REVIEWED_FIRST"] = 0] = "OLDEST_REVIEWED_FIRST";
    Deck_Filtered_SearchTerm_Order2[Deck_Filtered_SearchTerm_Order2["RANDOM"] = 1] = "RANDOM";
    Deck_Filtered_SearchTerm_Order2[Deck_Filtered_SearchTerm_Order2["INTERVALS_ASCENDING"] = 2] = "INTERVALS_ASCENDING";
    Deck_Filtered_SearchTerm_Order2[Deck_Filtered_SearchTerm_Order2["INTERVALS_DESCENDING"] = 3] = "INTERVALS_DESCENDING";
    Deck_Filtered_SearchTerm_Order2[Deck_Filtered_SearchTerm_Order2["LAPSES"] = 4] = "LAPSES";
    Deck_Filtered_SearchTerm_Order2[Deck_Filtered_SearchTerm_Order2["ADDED"] = 5] = "ADDED";
    Deck_Filtered_SearchTerm_Order2[Deck_Filtered_SearchTerm_Order2["DUE"] = 6] = "DUE";
    Deck_Filtered_SearchTerm_Order2[Deck_Filtered_SearchTerm_Order2["REVERSE_ADDED"] = 7] = "REVERSE_ADDED";
    Deck_Filtered_SearchTerm_Order2[Deck_Filtered_SearchTerm_Order2["RETRIEVABILITY_ASCENDING"] = 8] = "RETRIEVABILITY_ASCENDING";
    Deck_Filtered_SearchTerm_Order2[Deck_Filtered_SearchTerm_Order2["RETRIEVABILITY_DESCENDING"] = 9] = "RETRIEVABILITY_DESCENDING";
    Deck_Filtered_SearchTerm_Order2[Deck_Filtered_SearchTerm_Order2["RELATIVE_OVERDUENESS"] = 10] = "RELATIVE_OVERDUENESS";
  })(Deck_Filtered_SearchTerm_Order || (Deck_Filtered_SearchTerm_Order = {}));
  var Deck_KindContainerSchema = /* @__PURE__ */ messageDesc(file_anki_decks, 2, 3);
  var SetDeckCollapsedRequest_Scope;
  (function(SetDeckCollapsedRequest_Scope2) {
    SetDeckCollapsedRequest_Scope2[SetDeckCollapsedRequest_Scope2["REVIEWER"] = 0] = "REVIEWER";
    SetDeckCollapsedRequest_Scope2[SetDeckCollapsedRequest_Scope2["BROWSER"] = 1] = "BROWSER";
  })(SetDeckCollapsedRequest_Scope || (SetDeckCollapsedRequest_Scope = {}));

  // node_modules/ankipack/dist/generated/anki/deck_config_pb.js
  var file_anki_deck_config = /* @__PURE__ */ fileDesc("ChZhbmtpL2RlY2tfY29uZmlnLnByb3RvEhBhbmtpLmRlY2tfY29uZmlnIhwKDERlY2tDb25maWdJZBIMCgRkY2lkGAEgASgDIjgKG0dldFJldGVudGlvbldvcmtsb2FkUmVxdWVzdBIJCgF3GAEgAygCEg4KBnNlYXJjaBgCIAEoCSKWAQocR2V0UmV0ZW50aW9uV29ya2xvYWRSZXNwb25zZRJICgVjb3N0cxgBIAMoCzI5LmFua2kuZGVja19jb25maWcuR2V0UmV0ZW50aW9uV29ya2xvYWRSZXNwb25zZS5Db3N0c0VudHJ5GiwKCkNvc3RzRW50cnkSCwoDa2V5GAEgASgNEg0KBXZhbHVlGAIgASgCOgI4ASJSChxHZXRJZ25vcmVkQmVmb3JlQ291bnRSZXF1ZXN0EiIKGmlnbm9yZV9yZXZsb2dzX2JlZm9yZV9kYXRlGAEgASgJEg4KBnNlYXJjaBgCIAEoCSJACh1HZXRJZ25vcmVkQmVmb3JlQ291bnRSZXNwb25zZRIQCghpbmNsdWRlZBgBIAEoBBINCgV0b3RhbBgCIAEoBCKdGgoKRGVja0NvbmZpZxIKCgJpZBgBIAEoAxIMCgRuYW1lGAIgASgJEhIKCm10aW1lX3NlY3MYAyABKAMSCwoDdXNuGAQgASgFEjMKBmNvbmZpZxgFIAEoCzIjLmFua2kuZGVja19jb25maWcuRGVja0NvbmZpZy5Db25maWcanhkKBkNvbmZpZxITCgtsZWFybl9zdGVwcxgBIAMoAhIVCg1yZWxlYXJuX3N0ZXBzGAIgAygCEhUKDWZzcnNfcGFyYW1zXzQYAyADKAISFQoNZnNyc19wYXJhbXNfNRgFIAMoAhIVCg1mc3JzX3BhcmFtc182GAYgAygCEhMKC25ld19wZXJfZGF5GAkgASgNEhcKD3Jldmlld3NfcGVyX2RheRgKIAEoDRIbChNuZXdfcGVyX2RheV9taW5pbXVtGCMgASgNEhQKDGluaXRpYWxfZWFzZRgLIAEoAhIXCg9lYXN5X211bHRpcGxpZXIYDCABKAISFwoPaGFyZF9tdWx0aXBsaWVyGA0gASgCEhgKEGxhcHNlX211bHRpcGxpZXIYDiABKAISGwoTaW50ZXJ2YWxfbXVsdGlwbGllchgPIAEoAhIfChdtYXhpbXVtX3Jldmlld19pbnRlcnZhbBgQIAEoDRIeChZtaW5pbXVtX2xhcHNlX2ludGVydmFsGBEgASgNEiAKGGdyYWR1YXRpbmdfaW50ZXJ2YWxfZ29vZBgSIAEoDRIgChhncmFkdWF0aW5nX2ludGVydmFsX2Vhc3kYEyABKA0SVQoVbmV3X2NhcmRfaW5zZXJ0X29yZGVyGBQgASgOMjYuYW5raS5kZWNrX2NvbmZpZy5EZWNrQ29uZmlnLkNvbmZpZy5OZXdDYXJkSW5zZXJ0T3JkZXISWwoYbmV3X2NhcmRfZ2F0aGVyX3ByaW9yaXR5GCIgASgOMjkuYW5raS5kZWNrX2NvbmZpZy5EZWNrQ29uZmlnLkNvbmZpZy5OZXdDYXJkR2F0aGVyUHJpb3JpdHkSUQoTbmV3X2NhcmRfc29ydF9vcmRlchggIAEoDjI0LmFua2kuZGVja19jb25maWcuRGVja0NvbmZpZy5Db25maWcuTmV3Q2FyZFNvcnRPcmRlchI+CgduZXdfbWl4GB4gASgOMi0uYW5raS5kZWNrX2NvbmZpZy5EZWNrQ29uZmlnLkNvbmZpZy5SZXZpZXdNaXgSSQoMcmV2aWV3X29yZGVyGCEgASgOMjMuYW5raS5kZWNrX2NvbmZpZy5EZWNrQ29uZmlnLkNvbmZpZy5SZXZpZXdDYXJkT3JkZXISTAoVaW50ZXJkYXlfbGVhcm5pbmdfbWl4GB8gASgOMi0uYW5raS5kZWNrX2NvbmZpZy5EZWNrQ29uZmlnLkNvbmZpZy5SZXZpZXdNaXgSRQoMbGVlY2hfYWN0aW9uGBUgASgOMi8uYW5raS5kZWNrX2NvbmZpZy5EZWNrQ29uZmlnLkNvbmZpZy5MZWVjaEFjdGlvbhIXCg9sZWVjaF90aHJlc2hvbGQYFiABKA0SGAoQZGlzYWJsZV9hdXRvcGxheRgXIAEoCBIfChdjYXBfYW5zd2VyX3RpbWVfdG9fc2VjcxgYIAEoDRISCgpzaG93X3RpbWVyGBkgASgIEhwKFHN0b3BfdGltZXJfb25fYW5zd2VyGCYgASgIEiAKGHNlY29uZHNfdG9fc2hvd19xdWVzdGlvbhgpIAEoAhIeChZzZWNvbmRzX3RvX3Nob3dfYW5zd2VyGCogASgCEksKD3F1ZXN0aW9uX2FjdGlvbhgkIAEoDjIyLmFua2kuZGVja19jb25maWcuRGVja0NvbmZpZy5Db25maWcuUXVlc3Rpb25BY3Rpb24SRwoNYW5zd2VyX2FjdGlvbhgrIAEoDjIwLmFua2kuZGVja19jb25maWcuRGVja0NvbmZpZy5Db25maWcuQW5zd2VyQWN0aW9uEhYKDndhaXRfZm9yX2F1ZGlvGCwgASgIEisKI3NraXBfcXVlc3Rpb25fd2hlbl9yZXBsYXlpbmdfYW5zd2VyGBogASgIEhAKCGJ1cnlfbmV3GBsgASgIEhQKDGJ1cnlfcmV2aWV3cxgcIAEoCBIeChZidXJ5X2ludGVyZGF5X2xlYXJuaW5nGB0gASgIEhkKEWRlc2lyZWRfcmV0ZW50aW9uGCUgASgCEiIKGmlnbm9yZV9yZXZsb2dzX2JlZm9yZV9kYXRlGC4gASgJEh0KFWVhc3lfZGF5c19wZXJjZW50YWdlcxgEIAMoAhIcChRoaXN0b3JpY2FsX3JldGVudGlvbhgoIAEoAhIUCgxwYXJhbV9zZWFyY2gYLSABKAkSDgoFb3RoZXIY/wEgASgMIlUKEk5ld0NhcmRJbnNlcnRPcmRlchIdChlORVdfQ0FSRF9JTlNFUlRfT1JERVJfRFVFEAASIAocTkVXX0NBUkRfSU5TRVJUX09SREVSX1JBTkRPTRABIqICChVOZXdDYXJkR2F0aGVyUHJpb3JpdHkSIQodTkVXX0NBUkRfR0FUSEVSX1BSSU9SSVRZX0RFQ0sQABIzCi9ORVdfQ0FSRF9HQVRIRVJfUFJJT1JJVFlfREVDS19USEVOX1JBTkRPTV9OT1RFUxAFEiwKKE5FV19DQVJEX0dBVEhFUl9QUklPUklUWV9MT1dFU1RfUE9TSVRJT04QARItCilORVdfQ0FSRF9HQVRIRVJfUFJJT1JJVFlfSElHSEVTVF9QT1NJVElPThACEikKJU5FV19DQVJEX0dBVEhFUl9QUklPUklUWV9SQU5ET01fTk9URVMQAxIpCiVORVdfQ0FSRF9HQVRIRVJfUFJJT1JJVFlfUkFORE9NX0NBUkRTEAQi2wEKEE5ld0NhcmRTb3J0T3JkZXISIAocTkVXX0NBUkRfU09SVF9PUkRFUl9URU1QTEFURRAAEh8KG05FV19DQVJEX1NPUlRfT1JERVJfTk9fU09SVBABEiwKKE5FV19DQVJEX1NPUlRfT1JERVJfVEVNUExBVEVfVEhFTl9SQU5ET00QAhIxCi1ORVdfQ0FSRF9TT1JUX09SREVSX1JBTkRPTV9OT1RFX1RIRU5fVEVNUExBVEUQAxIjCh9ORVdfQ0FSRF9TT1JUX09SREVSX1JBTkRPTV9DQVJEEAQihwQKD1Jldmlld0NhcmRPcmRlchIZChVSRVZJRVdfQ0FSRF9PUkRFUl9EQVkQABIjCh9SRVZJRVdfQ0FSRF9PUkRFUl9EQVlfVEhFTl9ERUNLEAESIwofUkVWSUVXX0NBUkRfT1JERVJfREVDS19USEVOX0RBWRACEikKJVJFVklFV19DQVJEX09SREVSX0lOVEVSVkFMU19BU0NFTkRJTkcQAxIqCiZSRVZJRVdfQ0FSRF9PUkRFUl9JTlRFUlZBTFNfREVTQ0VORElORxAEEiQKIFJFVklFV19DQVJEX09SREVSX0VBU0VfQVNDRU5ESU5HEAUSJQohUkVWSUVXX0NBUkRfT1JERVJfRUFTRV9ERVNDRU5ESU5HEAYSLgoqUkVWSUVXX0NBUkRfT1JERVJfUkVUUklFVkFCSUxJVFlfQVNDRU5ESU5HEAcSLworUkVWSUVXX0NBUkRfT1JERVJfUkVUUklFVkFCSUxJVFlfREVTQ0VORElORxALEioKJlJFVklFV19DQVJEX09SREVSX1JFTEFUSVZFX09WRVJEVUVORVNTEAwSHAoYUkVWSUVXX0NBUkRfT1JERVJfUkFORE9NEAgSGwoXUkVWSUVXX0NBUkRfT1JERVJfQURERUQQCRIjCh9SRVZJRVdfQ0FSRF9PUkRFUl9SRVZFUlNFX0FEREVEEAoiaQoJUmV2aWV3TWl4Eh8KG1JFVklFV19NSVhfTUlYX1dJVEhfUkVWSUVXUxAAEhwKGFJFVklFV19NSVhfQUZURVJfUkVWSUVXUxABEh0KGVJFVklFV19NSVhfQkVGT1JFX1JFVklFV1MQAiJCCgtMZWVjaEFjdGlvbhIYChRMRUVDSF9BQ1RJT05fU1VTUEVORBAAEhkKFUxFRUNIX0FDVElPTl9UQUdfT05MWRABIqoBCgxBbnN3ZXJBY3Rpb24SGwoXQU5TV0VSX0FDVElPTl9CVVJZX0NBUkQQABIeChpBTlNXRVJfQUNUSU9OX0FOU1dFUl9BR0FJThABEh0KGUFOU1dFUl9BQ1RJT05fQU5TV0VSX0dPT0QQAhIdChlBTlNXRVJfQUNUSU9OX0FOU1dFUl9IQVJEEAMSHwobQU5TV0VSX0FDVElPTl9TSE9XX1JFTUlOREVSEAQiVAoOUXVlc3Rpb25BY3Rpb24SHwobUVVFU1RJT05fQUNUSU9OX1NIT1dfQU5TV0VSEAASIQodUVVFU1RJT05fQUNUSU9OX1NIT1dfUkVNSU5ERVIQAUoECAcQCUoECCcQKCK5BwoURGVja0NvbmZpZ3NGb3JVcGRhdGUSSgoKYWxsX2NvbmZpZxgBIAMoCzI2LmFua2kuZGVja19jb25maWcuRGVja0NvbmZpZ3NGb3JVcGRhdGUuQ29uZmlnV2l0aEV4dHJhEkgKDGN1cnJlbnRfZGVjaxgCIAEoCzIyLmFua2kuZGVja19jb25maWcuRGVja0NvbmZpZ3NGb3JVcGRhdGUuQ3VycmVudERlY2sSLgoIZGVmYXVsdHMYAyABKAsyHC5hbmtpLmRlY2tfY29uZmlnLkRlY2tDb25maWcSFwoPc2NoZW1hX21vZGlmaWVkGAQgASgIEh0KFWNhcmRfc3RhdGVfY3VzdG9taXplchgGIAEoCRIlCh1uZXdfY2FyZHNfaWdub3JlX3Jldmlld19saW1pdBgHIAEoCBIMCgRmc3JzGAggASgIEhkKEWZzcnNfaGVhbHRoX2NoZWNrGAsgASgIEhwKFGZzcnNfbGVnYWN5X2V2YWx1YXRlGAwgASgIEh8KF2FwcGx5X2FsbF9wYXJlbnRfbGltaXRzGAkgASgIEiUKHWRheXNfc2luY2VfbGFzdF9mc3JzX29wdGltaXplGAogASgNGlIKD0NvbmZpZ1dpdGhFeHRyYRIsCgZjb25maWcYASABKAsyHC5hbmtpLmRlY2tfY29uZmlnLkRlY2tDb25maWcSEQoJdXNlX2NvdW50GAIgASgNGpgDCgtDdXJyZW50RGVjaxIMCgRuYW1lGAEgASgJEhEKCWNvbmZpZ19pZBgCIAEoAxIZChFwYXJlbnRfY29uZmlnX2lkcxgDIAMoAxJJCgZsaW1pdHMYBCABKAsyOS5hbmtpLmRlY2tfY29uZmlnLkRlY2tDb25maWdzRm9yVXBkYXRlLkN1cnJlbnREZWNrLkxpbWl0cxqBAgoGTGltaXRzEhMKBnJldmlldxgBIAEoDUgAiAEBEhAKA25ldxgCIAEoDUgBiAEBEhkKDHJldmlld190b2RheRgDIAEoDUgCiAEBEhYKCW5ld190b2RheRgEIAEoDUgDiAEBEhsKE3Jldmlld190b2RheV9hY3RpdmUYBSABKAgSGAoQbmV3X3RvZGF5X2FjdGl2ZRgGIAEoCBIeChFkZXNpcmVkX3JldGVudGlvbhgHIAEoAkgEiAEBQgkKB19yZXZpZXdCBgoEX25ld0IPCg1fcmV2aWV3X3RvZGF5QgwKCl9uZXdfdG9kYXlCFAoSX2Rlc2lyZWRfcmV0ZW50aW9uIqgDChhVcGRhdGVEZWNrQ29uZmlnc1JlcXVlc3QSFgoOdGFyZ2V0X2RlY2tfaWQYASABKAMSLQoHY29uZmlncxgCIAMoCzIcLmFua2kuZGVja19jb25maWcuRGVja0NvbmZpZxIaChJyZW1vdmVkX2NvbmZpZ19pZHMYAyADKAMSNQoEbW9kZRgEIAEoDjInLmFua2kuZGVja19jb25maWcuVXBkYXRlRGVja0NvbmZpZ3NNb2RlEh0KFWNhcmRfc3RhdGVfY3VzdG9taXplchgFIAEoCRJJCgZsaW1pdHMYBiABKAsyOS5hbmtpLmRlY2tfY29uZmlnLkRlY2tDb25maWdzRm9yVXBkYXRlLkN1cnJlbnREZWNrLkxpbWl0cxIlCh1uZXdfY2FyZHNfaWdub3JlX3Jldmlld19saW1pdBgHIAEoCBIMCgRmc3JzGAggASgIEh8KF2FwcGx5X2FsbF9wYXJlbnRfbGltaXRzGAkgASgIEhcKD2ZzcnNfcmVzY2hlZHVsZRgKIAEoCBIZChFmc3JzX2hlYWx0aF9jaGVjaxgLIAEoCCqdAQoVVXBkYXRlRGVja0NvbmZpZ3NNb2RlEiMKH1VQREFURV9ERUNLX0NPTkZJR1NfTU9ERV9OT1JNQUwQABIuCipVUERBVEVfREVDS19DT05GSUdTX01PREVfQVBQTFlfVE9fQ0hJTERSRU4QARIvCitVUERBVEVfREVDS19DT05GSUdTX01PREVfQ09NUFVURV9BTExfUEFSQU1TEAJCDEIIRGVja0NvbmZQAWIGcHJvdG8z", [file_anki_generic, file_anki_collection, file_anki_decks]);
  var DeckConfig_ConfigSchema = /* @__PURE__ */ messageDesc(file_anki_deck_config, 5, 0);
  var DeckConfig_Config_NewCardInsertOrder;
  (function(DeckConfig_Config_NewCardInsertOrder2) {
    DeckConfig_Config_NewCardInsertOrder2[DeckConfig_Config_NewCardInsertOrder2["DUE"] = 0] = "DUE";
    DeckConfig_Config_NewCardInsertOrder2[DeckConfig_Config_NewCardInsertOrder2["RANDOM"] = 1] = "RANDOM";
  })(DeckConfig_Config_NewCardInsertOrder || (DeckConfig_Config_NewCardInsertOrder = {}));
  var DeckConfig_Config_NewCardGatherPriority;
  (function(DeckConfig_Config_NewCardGatherPriority2) {
    DeckConfig_Config_NewCardGatherPriority2[DeckConfig_Config_NewCardGatherPriority2["DECK"] = 0] = "DECK";
    DeckConfig_Config_NewCardGatherPriority2[DeckConfig_Config_NewCardGatherPriority2["DECK_THEN_RANDOM_NOTES"] = 5] = "DECK_THEN_RANDOM_NOTES";
    DeckConfig_Config_NewCardGatherPriority2[DeckConfig_Config_NewCardGatherPriority2["LOWEST_POSITION"] = 1] = "LOWEST_POSITION";
    DeckConfig_Config_NewCardGatherPriority2[DeckConfig_Config_NewCardGatherPriority2["HIGHEST_POSITION"] = 2] = "HIGHEST_POSITION";
    DeckConfig_Config_NewCardGatherPriority2[DeckConfig_Config_NewCardGatherPriority2["RANDOM_NOTES"] = 3] = "RANDOM_NOTES";
    DeckConfig_Config_NewCardGatherPriority2[DeckConfig_Config_NewCardGatherPriority2["RANDOM_CARDS"] = 4] = "RANDOM_CARDS";
  })(DeckConfig_Config_NewCardGatherPriority || (DeckConfig_Config_NewCardGatherPriority = {}));
  var DeckConfig_Config_NewCardSortOrder;
  (function(DeckConfig_Config_NewCardSortOrder2) {
    DeckConfig_Config_NewCardSortOrder2[DeckConfig_Config_NewCardSortOrder2["TEMPLATE"] = 0] = "TEMPLATE";
    DeckConfig_Config_NewCardSortOrder2[DeckConfig_Config_NewCardSortOrder2["NO_SORT"] = 1] = "NO_SORT";
    DeckConfig_Config_NewCardSortOrder2[DeckConfig_Config_NewCardSortOrder2["TEMPLATE_THEN_RANDOM"] = 2] = "TEMPLATE_THEN_RANDOM";
    DeckConfig_Config_NewCardSortOrder2[DeckConfig_Config_NewCardSortOrder2["RANDOM_NOTE_THEN_TEMPLATE"] = 3] = "RANDOM_NOTE_THEN_TEMPLATE";
    DeckConfig_Config_NewCardSortOrder2[DeckConfig_Config_NewCardSortOrder2["RANDOM_CARD"] = 4] = "RANDOM_CARD";
  })(DeckConfig_Config_NewCardSortOrder || (DeckConfig_Config_NewCardSortOrder = {}));
  var DeckConfig_Config_ReviewCardOrder;
  (function(DeckConfig_Config_ReviewCardOrder2) {
    DeckConfig_Config_ReviewCardOrder2[DeckConfig_Config_ReviewCardOrder2["DAY"] = 0] = "DAY";
    DeckConfig_Config_ReviewCardOrder2[DeckConfig_Config_ReviewCardOrder2["DAY_THEN_DECK"] = 1] = "DAY_THEN_DECK";
    DeckConfig_Config_ReviewCardOrder2[DeckConfig_Config_ReviewCardOrder2["DECK_THEN_DAY"] = 2] = "DECK_THEN_DAY";
    DeckConfig_Config_ReviewCardOrder2[DeckConfig_Config_ReviewCardOrder2["INTERVALS_ASCENDING"] = 3] = "INTERVALS_ASCENDING";
    DeckConfig_Config_ReviewCardOrder2[DeckConfig_Config_ReviewCardOrder2["INTERVALS_DESCENDING"] = 4] = "INTERVALS_DESCENDING";
    DeckConfig_Config_ReviewCardOrder2[DeckConfig_Config_ReviewCardOrder2["EASE_ASCENDING"] = 5] = "EASE_ASCENDING";
    DeckConfig_Config_ReviewCardOrder2[DeckConfig_Config_ReviewCardOrder2["EASE_DESCENDING"] = 6] = "EASE_DESCENDING";
    DeckConfig_Config_ReviewCardOrder2[DeckConfig_Config_ReviewCardOrder2["RETRIEVABILITY_ASCENDING"] = 7] = "RETRIEVABILITY_ASCENDING";
    DeckConfig_Config_ReviewCardOrder2[DeckConfig_Config_ReviewCardOrder2["RETRIEVABILITY_DESCENDING"] = 11] = "RETRIEVABILITY_DESCENDING";
    DeckConfig_Config_ReviewCardOrder2[DeckConfig_Config_ReviewCardOrder2["RELATIVE_OVERDUENESS"] = 12] = "RELATIVE_OVERDUENESS";
    DeckConfig_Config_ReviewCardOrder2[DeckConfig_Config_ReviewCardOrder2["RANDOM"] = 8] = "RANDOM";
    DeckConfig_Config_ReviewCardOrder2[DeckConfig_Config_ReviewCardOrder2["ADDED"] = 9] = "ADDED";
    DeckConfig_Config_ReviewCardOrder2[DeckConfig_Config_ReviewCardOrder2["REVERSE_ADDED"] = 10] = "REVERSE_ADDED";
  })(DeckConfig_Config_ReviewCardOrder || (DeckConfig_Config_ReviewCardOrder = {}));
  var DeckConfig_Config_ReviewMix;
  (function(DeckConfig_Config_ReviewMix2) {
    DeckConfig_Config_ReviewMix2[DeckConfig_Config_ReviewMix2["MIX_WITH_REVIEWS"] = 0] = "MIX_WITH_REVIEWS";
    DeckConfig_Config_ReviewMix2[DeckConfig_Config_ReviewMix2["AFTER_REVIEWS"] = 1] = "AFTER_REVIEWS";
    DeckConfig_Config_ReviewMix2[DeckConfig_Config_ReviewMix2["BEFORE_REVIEWS"] = 2] = "BEFORE_REVIEWS";
  })(DeckConfig_Config_ReviewMix || (DeckConfig_Config_ReviewMix = {}));
  var DeckConfig_Config_LeechAction;
  (function(DeckConfig_Config_LeechAction2) {
    DeckConfig_Config_LeechAction2[DeckConfig_Config_LeechAction2["SUSPEND"] = 0] = "SUSPEND";
    DeckConfig_Config_LeechAction2[DeckConfig_Config_LeechAction2["TAG_ONLY"] = 1] = "TAG_ONLY";
  })(DeckConfig_Config_LeechAction || (DeckConfig_Config_LeechAction = {}));
  var DeckConfig_Config_AnswerAction;
  (function(DeckConfig_Config_AnswerAction2) {
    DeckConfig_Config_AnswerAction2[DeckConfig_Config_AnswerAction2["BURY_CARD"] = 0] = "BURY_CARD";
    DeckConfig_Config_AnswerAction2[DeckConfig_Config_AnswerAction2["ANSWER_AGAIN"] = 1] = "ANSWER_AGAIN";
    DeckConfig_Config_AnswerAction2[DeckConfig_Config_AnswerAction2["ANSWER_GOOD"] = 2] = "ANSWER_GOOD";
    DeckConfig_Config_AnswerAction2[DeckConfig_Config_AnswerAction2["ANSWER_HARD"] = 3] = "ANSWER_HARD";
    DeckConfig_Config_AnswerAction2[DeckConfig_Config_AnswerAction2["SHOW_REMINDER"] = 4] = "SHOW_REMINDER";
  })(DeckConfig_Config_AnswerAction || (DeckConfig_Config_AnswerAction = {}));
  var DeckConfig_Config_QuestionAction;
  (function(DeckConfig_Config_QuestionAction2) {
    DeckConfig_Config_QuestionAction2[DeckConfig_Config_QuestionAction2["SHOW_ANSWER"] = 0] = "SHOW_ANSWER";
    DeckConfig_Config_QuestionAction2[DeckConfig_Config_QuestionAction2["SHOW_REMINDER"] = 1] = "SHOW_REMINDER";
  })(DeckConfig_Config_QuestionAction || (DeckConfig_Config_QuestionAction = {}));
  var UpdateDeckConfigsMode;
  (function(UpdateDeckConfigsMode2) {
    UpdateDeckConfigsMode2[UpdateDeckConfigsMode2["NORMAL"] = 0] = "NORMAL";
    UpdateDeckConfigsMode2[UpdateDeckConfigsMode2["APPLY_TO_CHILDREN"] = 1] = "APPLY_TO_CHILDREN";
    UpdateDeckConfigsMode2[UpdateDeckConfigsMode2["COMPUTE_ALL_PARAMS"] = 2] = "COMPUTE_ALL_PARAMS";
  })(UpdateDeckConfigsMode || (UpdateDeckConfigsMode = {}));

  // node_modules/ankipack/dist/util/id.js
  var IdGenerator = class {
    counter;
    constructor(startFrom) {
      this.counter = startFrom ?? Date.now();
    }
    next() {
      return this.counter++;
    }
  };
  var PART_SEPARATOR = String.fromCharCode(0);
  function stableId(...parts) {
    const input = new TextEncoder().encode(parts.join(PART_SEPARATOR));
    let hash = 0xcbf29ce484222325n;
    for (const byte of input) {
      hash = BigInt.asUintN(64, (hash ^ BigInt(byte)) * 0x100000001b3n);
    }
    return BigInt.asUintN(63, hash) || 1n;
  }

  // node_modules/ankipack/dist/util/constants.js
  var FIELD_SEPARATOR = "";
  var BASE91_ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&()*+,-./:;<=>?@[]^_`{|}~";
  var DEFAULT_CSS = `.card {
    font-family: arial;
    font-size: 20px;
    line-height: 1.5;
    text-align: center;
    color: black;
    background-color: white;
}
`;
  var DEFAULT_CLOZE_CSS = `.cloze {
    font-weight: bold;
    color: blue;
}
.nightMode .cloze {
    color: lightblue;
}
`;
  var DEFAULT_LATEX_PRE = `\\documentclass[12pt]{article}
\\special{papersize=3in,5in}
\\usepackage[utf8]{inputenc}
\\usepackage{amssymb,amsmath}
\\pagestyle{empty}
\\setlength{\\parindent}{0in}
\\begin{document}
`;
  var DEFAULT_LATEX_POST = "\\end{document}";

  // node_modules/ankipack/dist/util/html-entities.js
  var NAMED_ENTITIES = {
    AElig: "\xC6",
    Aacute: "\xC1",
    Acirc: "\xC2",
    Agrave: "\xC0",
    Alpha: "\u0391",
    Aring: "\xC5",
    Atilde: "\xC3",
    Auml: "\xC4",
    Beta: "\u0392",
    Ccedil: "\xC7",
    Chi: "\u03A7",
    Dagger: "\u2021",
    Delta: "\u0394",
    ETH: "\xD0",
    Eacute: "\xC9",
    Ecirc: "\xCA",
    Egrave: "\xC8",
    Epsilon: "\u0395",
    Eta: "\u0397",
    Euml: "\xCB",
    Gamma: "\u0393",
    Iacute: "\xCD",
    Icirc: "\xCE",
    Igrave: "\xCC",
    Iota: "\u0399",
    Iuml: "\xCF",
    Kappa: "\u039A",
    Lambda: "\u039B",
    Mu: "\u039C",
    Ntilde: "\xD1",
    Nu: "\u039D",
    OElig: "\u0152",
    Oacute: "\xD3",
    Ocirc: "\xD4",
    Ograve: "\xD2",
    Omega: "\u03A9",
    Omicron: "\u039F",
    Oslash: "\xD8",
    Otilde: "\xD5",
    Ouml: "\xD6",
    Phi: "\u03A6",
    Pi: "\u03A0",
    Prime: "\u2033",
    Psi: "\u03A8",
    Rho: "\u03A1",
    Scaron: "\u0160",
    Sigma: "\u03A3",
    THORN: "\xDE",
    Tau: "\u03A4",
    Theta: "\u0398",
    Uacute: "\xDA",
    Ucirc: "\xDB",
    Ugrave: "\xD9",
    Upsilon: "\u03A5",
    Uuml: "\xDC",
    Xi: "\u039E",
    Yacute: "\xDD",
    Yuml: "\u0178",
    Zeta: "\u0396",
    aacute: "\xE1",
    acirc: "\xE2",
    acute: "\xB4",
    aelig: "\xE6",
    agrave: "\xE0",
    alefsym: "\u2135",
    alpha: "\u03B1",
    amp: "&",
    and: "\u2227",
    ang: "\u2220",
    aring: "\xE5",
    asymp: "\u2248",
    atilde: "\xE3",
    auml: "\xE4",
    bdquo: "\u201E",
    beta: "\u03B2",
    brvbar: "\xA6",
    bull: "\u2022",
    cap: "\u2229",
    ccedil: "\xE7",
    cedil: "\xB8",
    cent: "\xA2",
    chi: "\u03C7",
    circ: "\u02C6",
    clubs: "\u2663",
    cong: "\u2245",
    copy: "\xA9",
    crarr: "\u21B5",
    cup: "\u222A",
    curren: "\xA4",
    dArr: "\u21D3",
    dagger: "\u2020",
    darr: "\u2193",
    deg: "\xB0",
    delta: "\u03B4",
    diams: "\u2666",
    divide: "\xF7",
    eacute: "\xE9",
    ecirc: "\xEA",
    egrave: "\xE8",
    empty: "\u2205",
    emsp: "\u2003",
    ensp: "\u2002",
    epsilon: "\u03B5",
    equiv: "\u2261",
    eta: "\u03B7",
    eth: "\xF0",
    euml: "\xEB",
    euro: "\u20AC",
    exist: "\u2203",
    fnof: "\u0192",
    forall: "\u2200",
    frac12: "\xBD",
    frac14: "\xBC",
    frac34: "\xBE",
    frasl: "\u2044",
    gamma: "\u03B3",
    ge: "\u2265",
    gt: ">",
    hArr: "\u21D4",
    harr: "\u2194",
    hearts: "\u2665",
    hellip: "\u2026",
    iacute: "\xED",
    icirc: "\xEE",
    iexcl: "\xA1",
    igrave: "\xEC",
    image: "\u2111",
    infin: "\u221E",
    int: "\u222B",
    iota: "\u03B9",
    iquest: "\xBF",
    isin: "\u2208",
    iuml: "\xEF",
    kappa: "\u03BA",
    lArr: "\u21D0",
    lambda: "\u03BB",
    lang: "\u2329",
    laquo: "\xAB",
    larr: "\u2190",
    lceil: "\u2308",
    ldquo: "\u201C",
    le: "\u2264",
    lfloor: "\u230A",
    lowast: "\u2217",
    loz: "\u25CA",
    lrm: "\u200E",
    lsaquo: "\u2039",
    lsquo: "\u2018",
    lt: "<",
    macr: "\xAF",
    mdash: "\u2014",
    micro: "\xB5",
    middot: "\xB7",
    minus: "\u2212",
    mu: "\u03BC",
    nabla: "\u2207",
    nbsp: "\xA0",
    ndash: "\u2013",
    ne: "\u2260",
    ni: "\u220B",
    not: "\xAC",
    notin: "\u2209",
    nsub: "\u2284",
    ntilde: "\xF1",
    nu: "\u03BD",
    oacute: "\xF3",
    ocirc: "\xF4",
    oelig: "\u0153",
    ograve: "\xF2",
    oline: "\u203E",
    omega: "\u03C9",
    omicron: "\u03BF",
    oplus: "\u2295",
    or: "\u2228",
    ordf: "\xAA",
    ordm: "\xBA",
    oslash: "\xF8",
    otilde: "\xF5",
    otimes: "\u2297",
    ouml: "\xF6",
    para: "\xB6",
    part: "\u2202",
    permil: "\u2030",
    perp: "\u22A5",
    phi: "\u03C6",
    pi: "\u03C0",
    piv: "\u03D6",
    plusmn: "\xB1",
    pound: "\xA3",
    prime: "\u2032",
    prod: "\u220F",
    prop: "\u221D",
    psi: "\u03C8",
    quot: '"',
    rArr: "\u21D2",
    radic: "\u221A",
    rang: "\u232A",
    raquo: "\xBB",
    rarr: "\u2192",
    rceil: "\u2309",
    rdquo: "\u201D",
    real: "\u211C",
    reg: "\xAE",
    rfloor: "\u230B",
    rho: "\u03C1",
    rlm: "\u200F",
    rsaquo: "\u203A",
    rsquo: "\u2019",
    sbquo: "\u201A",
    scaron: "\u0161",
    sdot: "\u22C5",
    sect: "\xA7",
    shy: "\xAD",
    sigma: "\u03C3",
    sigmaf: "\u03C2",
    sim: "\u223C",
    spades: "\u2660",
    sub: "\u2282",
    sube: "\u2286",
    sum: "\u2211",
    sup: "\u2283",
    sup1: "\xB9",
    sup2: "\xB2",
    sup3: "\xB3",
    supe: "\u2287",
    szlig: "\xDF",
    tau: "\u03C4",
    there4: "\u2234",
    theta: "\u03B8",
    thetasym: "\u03D1",
    thinsp: "\u2009",
    thorn: "\xFE",
    tilde: "\u02DC",
    times: "\xD7",
    trade: "\u2122",
    uArr: "\u21D1",
    uacute: "\xFA",
    uarr: "\u2191",
    ucirc: "\xFB",
    ugrave: "\xF9",
    uml: "\xA8",
    upsih: "\u03D2",
    upsilon: "\u03C5",
    uuml: "\xFC",
    weierp: "\u2118",
    xi: "\u03BE",
    yacute: "\xFD",
    yen: "\xA5",
    yuml: "\xFF",
    zeta: "\u03B6",
    zwj: "\u200D",
    zwnj: "\u200C"
  };

  // node_modules/ankipack/dist/util/text.js
  var RUST_SPACE = "\\t\\n\\v\\f\\r \\u0085\\u00a0\\u1680\\u2000-\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000";
  var TRIM_START = new RegExp(`^[${RUST_SPACE}]+`);
  var TRIM_END = new RegExp(`[${RUST_SPACE}]+$`);
  function trimStartRust(text) {
    return text.replace(TRIM_START, "");
  }
  function trimRust(text) {
    return text.replace(TRIM_START, "").replace(TRIM_END, "");
  }
  function rejectNul(value, label) {
    if (value.includes("\0")) {
      fail("invalid-input", `${label} contains a NUL character, which cannot be stored in the collection`);
    }
  }
  var IS_ASCII_CONTROL = /[\u0000-\u001f\u007f]/;
  function isLoneSurrogate(char) {
    const code = char.codePointAt(0) ?? 0;
    return code >= 55296 && code <= 57343;
  }
  function rejectLoneSurrogates(value, label) {
    for (const char of value) {
      if (isLoneSurrogate(char)) {
        const point = (char.codePointAt(0) ?? 0).toString(16).toUpperCase();
        fail("invalid-input", `${label} contains the lone surrogate U+${point}, which cannot be encoded as UTF-8. Anki refuses the entire collection rather than the one value.`);
      }
    }
  }
  function stripInvalidFieldChars(text) {
    let out = "";
    for (const ch of text) {
      const code = ch.codePointAt(0) ?? 0;
      const isControl = code < 32 && ch !== "\n" && ch !== "	" || code === 127;
      if (!isControl)
        out += ch;
    }
    return out;
  }
  var RUST_WORD = "\\p{Alphabetic}\\p{M}\\p{Nd}\\p{Pc}\\p{Join_Control}";
  var MEDIA_TAG = new RegExp(`<(?:img|audio|video|object|source)(?![${RUST_WORD}])(?:[^>]|"[^">]*>[^"]*"|'[^'>]*>[^']*')+?(?<![${RUST_WORD}])(?:src|data)(?![${RUST_WORD}])=(?:"([^"]+?)"[^>]*>|'([^']+?)'[^>]*>|([^>]+?)(?: [^>]*>|>))`, "gisu");
  function stripHtmlTags(text) {
    let out = "";
    let at = 0;
    let noComment = false;
    let noStyle = false;
    let noScript = false;
    for (; ; ) {
      const open = text.indexOf("<", at);
      if (open < 0)
        break;
      let end = -1;
      if (!noComment && text.startsWith("<!--", open)) {
        end = text.indexOf("-->", open + 4);
        if (end < 0)
          noComment = true;
        else
          end += 3;
      } else if (!noStyle && matchesAt(text, open, "<style")) {
        end = closingBlock(text, open, "</style>");
        if (end < 0)
          noStyle = true;
      } else if (!noScript && matchesAt(text, open, "<script")) {
        end = closingBlock(text, open, "<\/script>");
        if (end < 0)
          noScript = true;
      }
      if (end < 0) {
        const gt = text.indexOf(">", open + 1);
        if (gt < 0)
          break;
        end = gt + 1;
      }
      out += text.slice(at, open);
      at = end;
    }
    return out + text.slice(at);
  }
  function closingBlock(text, open, closer) {
    const gt = text.indexOf(">", open + 1);
    if (gt < 0)
      return -1;
    const close = indexOfCaseless(text, closer, gt + 1);
    return close < 0 ? -1 : close + closer.length;
  }
  function matchesAt(text, at, lower) {
    if (at + lower.length > text.length)
      return false;
    for (let i2 = 0; i2 < lower.length; i2++) {
      if (!foldsTo(text[at + i2], lower[i2]))
        return false;
    }
    return true;
  }
  function indexOfCaseless(text, lower, from) {
    for (let at = text.indexOf("<", from); at >= 0; at = text.indexOf("<", at + 1)) {
      if (matchesAt(text, at, lower))
        return at;
    }
    return -1;
  }
  function foldsTo(char, lowerAscii) {
    return char === lowerAscii || char.toLowerCase() === lowerAscii || LONG_S_FOLD[lowerAscii] === char;
  }
  var LONG_S_FOLD = { s: "\u017F" };
  var NON_BREAKING_SPACE = new RegExp(String.fromCharCode(160), "g");
  function stripHtmlPreservingMediaFilenames(text) {
    const withFilenames = text.replace(MEDIA_TAG, (_match, dq, sq, bare) => ` ${dq ?? sq ?? bare} `);
    return decodeEntities(stripHtmlTags(withFilenames));
  }
  var isDigit = (ch) => ch >= "0" && ch <= "9";
  var isHexDigit = (ch) => isDigit(ch) || ch >= "a" && ch <= "f" || ch >= "A" && ch <= "F";
  function decodeEntities(text) {
    if (!text.includes("&"))
      return text;
    let state = "normal";
    let out = "";
    let buf = "";
    for (const ch of text) {
      switch (state) {
        case "normal":
          if (ch === "&")
            state = "entity";
          else
            out += ch;
          break;
        case "entity":
          if (ch === "#")
            state = "numeric";
          else if (ch === ";")
            return text;
          else {
            state = "named";
            buf += ch;
          }
          break;
        case "named":
          if (ch !== ";") {
            buf += ch;
            break;
          }
          if (!Object.hasOwn(NAMED_ENTITIES, buf))
            return text;
          out += NAMED_ENTITIES[buf];
          buf = "";
          state = "normal";
          break;
        case "numeric":
          if (isDigit(ch)) {
            state = "dec";
            buf += ch;
          } else if (ch === "x")
            state = "hex";
          else
            return text;
          break;
        case "dec":
        case "hex": {
          const radix = state === "hex" ? 16 : 10;
          if (ch === ";") {
            const decoded = decodeCodePoint(buf, radix);
            if (decoded === void 0)
              return text;
            out += decoded;
            buf = "";
            state = "normal";
          } else if (radix === 16 ? isHexDigit(ch) : isDigit(ch))
            buf += ch;
          else
            return text;
          break;
        }
      }
    }
    if (state !== "normal")
      return text;
    return out.replace(NON_BREAKING_SPACE, " ");
  }
  function decodeCodePoint(digits, radix) {
    if (digits.length === 0)
      return void 0;
    const code = Number.parseInt(digits, radix);
    if (code > 1114111 || code >= 55296 && code <= 57343)
      return void 0;
    return String.fromCodePoint(code);
  }
  function toNativeDeckName(humanName) {
    return humanName.split("::").map(normalizeDeckNameComponent).join(FIELD_SEPARATOR);
  }
  function toHumanDeckName(nativeName) {
    return nativeName.split(FIELD_SEPARATOR).join("::");
  }
  function toNormalizedDeckName(humanName) {
    return toHumanDeckName(toNativeDeckName(humanName));
  }
  var TRIM_COMPONENT_START = new RegExp(`^[${RUST_SPACE}:]+`);
  var TRIM_COMPONENT_END = new RegExp(`[${RUST_SPACE}:]+$`);
  function normalizeDeckNameComponent(component) {
    let out = "";
    for (const ch of component.normalize("NFC")) {
      const code = ch.codePointAt(0) ?? 0;
      if (code >= 32 && code !== 127)
        out += ch;
    }
    const trimmed = out.replace(TRIM_COMPONENT_START, "").replace(TRIM_COMPONENT_END, "");
    return trimmed.length > 0 ? trimmed : "blank";
  }

  // node_modules/ankipack/dist/deck-config.js
  var idGen = new IdGenerator();
  var INSERT_ORDER_MAP = {
    due: DeckConfig_Config_NewCardInsertOrder.DUE,
    random: DeckConfig_Config_NewCardInsertOrder.RANDOM
  };
  var GATHER_PRIORITY_MAP = {
    deck: DeckConfig_Config_NewCardGatherPriority.DECK,
    deckThenRandom: DeckConfig_Config_NewCardGatherPriority.DECK_THEN_RANDOM_NOTES,
    lowestPosition: DeckConfig_Config_NewCardGatherPriority.LOWEST_POSITION,
    highestPosition: DeckConfig_Config_NewCardGatherPriority.HIGHEST_POSITION,
    randomNotes: DeckConfig_Config_NewCardGatherPriority.RANDOM_NOTES,
    randomCards: DeckConfig_Config_NewCardGatherPriority.RANDOM_CARDS
  };
  var SORT_ORDER_MAP = {
    template: DeckConfig_Config_NewCardSortOrder.TEMPLATE,
    noSort: DeckConfig_Config_NewCardSortOrder.NO_SORT,
    templateThenRandom: DeckConfig_Config_NewCardSortOrder.TEMPLATE_THEN_RANDOM,
    randomNoteThenTemplate: DeckConfig_Config_NewCardSortOrder.RANDOM_NOTE_THEN_TEMPLATE,
    randomCard: DeckConfig_Config_NewCardSortOrder.RANDOM_CARD
  };
  var REVIEW_ORDER_MAP = {
    day: DeckConfig_Config_ReviewCardOrder.DAY,
    dayThenDeck: DeckConfig_Config_ReviewCardOrder.DAY_THEN_DECK,
    deckThenDay: DeckConfig_Config_ReviewCardOrder.DECK_THEN_DAY,
    intervalsAscending: DeckConfig_Config_ReviewCardOrder.INTERVALS_ASCENDING,
    intervalsDescending: DeckConfig_Config_ReviewCardOrder.INTERVALS_DESCENDING,
    easeAscending: DeckConfig_Config_ReviewCardOrder.EASE_ASCENDING,
    easeDescending: DeckConfig_Config_ReviewCardOrder.EASE_DESCENDING,
    retrievabilityAscending: DeckConfig_Config_ReviewCardOrder.RETRIEVABILITY_ASCENDING,
    retrievabilityDescending: DeckConfig_Config_ReviewCardOrder.RETRIEVABILITY_DESCENDING,
    relativeOverdueness: DeckConfig_Config_ReviewCardOrder.RELATIVE_OVERDUENESS,
    random: DeckConfig_Config_ReviewCardOrder.RANDOM,
    added: DeckConfig_Config_ReviewCardOrder.ADDED,
    reverseAdded: DeckConfig_Config_ReviewCardOrder.REVERSE_ADDED
  };
  var REVIEW_MIX_MAP = {
    mixWithReviews: DeckConfig_Config_ReviewMix.MIX_WITH_REVIEWS,
    afterReviews: DeckConfig_Config_ReviewMix.AFTER_REVIEWS,
    beforeReviews: DeckConfig_Config_ReviewMix.BEFORE_REVIEWS
  };
  var LEECH_ACTION_MAP = {
    suspend: DeckConfig_Config_LeechAction.SUSPEND,
    tagOnly: DeckConfig_Config_LeechAction.TAG_ONLY
  };
  var DeckConfig = class {
    id;
    name;
    options;
    constructor(options = {}) {
      validateDeckConfigOptions(options);
      this.id = options.id ?? idGen.next();
      this.name = options.name ?? `Preset ${this.id}`;
      this.options = { ...options };
      for (const key of ARRAY_OPTIONS) {
        const value = options[key];
        if (value !== void 0)
          this.options[key] = [...value];
      }
    }
    toProtobuf() {
      const o = this.options;
      return create(DeckConfig_ConfigSchema, {
        learnSteps: o.learnSteps ?? [1, 10],
        relearnSteps: o.relearnSteps ?? [10],
        fsrsParams6: o.fsrsParams ?? [],
        newPerDay: o.newPerDay ?? 20,
        reviewsPerDay: o.reviewsPerDay ?? 200,
        initialEase: o.initialEase ?? 2.5,
        easyMultiplier: o.easyMultiplier ?? 1.3,
        hardMultiplier: o.hardMultiplier ?? 1.2,
        lapseMultiplier: o.lapseMultiplier ?? 0,
        intervalMultiplier: o.intervalMultiplier ?? 1,
        maximumReviewInterval: o.maximumReviewInterval ?? 36500,
        minimumLapseInterval: o.minimumLapseInterval ?? 1,
        graduatingIntervalGood: o.graduatingIntervalGood ?? 1,
        graduatingIntervalEasy: o.graduatingIntervalEasy ?? 4,
        newCardInsertOrder: INSERT_ORDER_MAP[o.newCardInsertOrder ?? "due"],
        newCardGatherPriority: GATHER_PRIORITY_MAP[o.newCardGatherPriority ?? "deck"],
        newCardSortOrder: SORT_ORDER_MAP[o.newCardSortOrder ?? "template"],
        reviewOrder: REVIEW_ORDER_MAP[o.reviewOrder ?? "day"],
        newMix: REVIEW_MIX_MAP[o.newMix ?? "mixWithReviews"],
        interdayLearningMix: REVIEW_MIX_MAP[o.interdayLearningMix ?? "mixWithReviews"],
        leechAction: LEECH_ACTION_MAP[o.leechAction ?? "tagOnly"],
        leechThreshold: o.leechThreshold ?? 8,
        buryNew: o.buryNew ?? false,
        buryReviews: o.buryReviews ?? false,
        buryInterdayLearning: o.buryInterdayLearning ?? false,
        desiredRetention: o.desiredRetention ?? 0.9,
        historicalRetention: o.historicalRetention ?? 0.9,
        ignoreRevlogsBeforeDate: o.ignoreRevlogsBeforeDate ?? "",
        easyDaysPercentages: o.easyDaysPercentages ?? [],
        disableAutoplay: o.disableAutoplay ?? false,
        capAnswerTimeToSecs: o.capAnswerTimeToSecs ?? 60,
        showTimer: o.showTimer ?? false,
        stopTimerOnAnswer: o.stopTimerOnAnswer ?? false,
        secondsToShowQuestion: o.secondsToShowQuestion ?? 0,
        secondsToShowAnswer: o.secondsToShowAnswer ?? 0,
        waitForAudio: o.waitForAudio ?? true,
        skipQuestionWhenReplayingAnswer: o.skipQuestionWhenReplayingAnswer ?? false,
        paramSearch: ""
      });
    }
  };
  var VALID_RANGES = [
    ["newPerDay", 0, 9999],
    ["reviewsPerDay", 0, 9999],
    ["initialEase", 1.31, 5],
    ["easyMultiplier", 1, 5],
    ["hardMultiplier", 0.5, 1.3],
    ["lapseMultiplier", 0, 1],
    ["intervalMultiplier", 0.5, 2],
    ["maximumReviewInterval", 1, 36500],
    ["minimumLapseInterval", 1, 36500],
    ["graduatingIntervalGood", 1, 36500],
    ["graduatingIntervalEasy", 1, 36500],
    ["leechThreshold", 1, 9999],
    ["capAnswerTimeToSecs", 1, 9999],
    ["desiredRetention", 0.7, 0.99],
    ["historicalRetention", 0.7, 0.97]
  ];
  var ARRAY_OPTIONS = [
    "learnSteps",
    "relearnSteps",
    "fsrsParams",
    "easyDaysPercentages"
  ];
  var INTEGER_OPTIONS = [
    "newPerDay",
    "reviewsPerDay",
    "maximumReviewInterval",
    "minimumLapseInterval",
    "graduatingIntervalGood",
    "graduatingIntervalEasy",
    "leechThreshold",
    "capAnswerTimeToSecs"
  ];
  function validateDeckConfigOptions(options) {
    if (options.id !== void 0 && !Number.isSafeInteger(options.id)) {
      fail("invalid-input", `DeckConfig id must be a safe integer, got ${options.id}`);
    }
    if (options.name !== void 0) {
      rejectNul(options.name, "DeckConfig name");
      rejectLoneSurrogates(options.name, "DeckConfig name");
    }
    for (const key of INTEGER_OPTIONS) {
      const value = options[key];
      if (typeof value === "number" && !Number.isInteger(value)) {
        fail("invalid-input", `${key} must be a whole number, got ${value}`);
      }
    }
    for (const [key, min, max] of VALID_RANGES) {
      const value = options[key];
      if (typeof value === "number" && (!Number.isFinite(value) || value < min || value > max)) {
        fail("invalid-input", `${key} must be between ${min} and ${max}, got ${value}`);
      }
    }
    const easyDays = options.easyDaysPercentages;
    if (easyDays !== void 0 && easyDays.length !== 0 && easyDays.length !== 7) {
      fail("invalid-input", `easyDaysPercentages must have 0 or 7 entries, got ${easyDays.length}`);
    }
    const fsrs = options.fsrsParams;
    if (fsrs !== void 0 && fsrs.length !== 0 && fsrs.length < 21) {
      fail("invalid-input", `fsrsParams must be empty or hold at least 21 FSRS-6 values, got ${fsrs.length}`);
    }
    for (const key of ARRAY_OPTIONS) {
      for (const value of options[key] ?? []) {
        if (!Number.isFinite(value)) {
          fail("invalid-input", `${key} must hold finite numbers, got ${value}`);
        }
      }
    }
    for (const key of ["learnSteps", "relearnSteps"]) {
      for (const value of options[key] ?? []) {
        if (value < 0) {
          fail("invalid-input", `${key} must not hold negative delays, got ${value}`);
        }
      }
    }
  }

  // node_modules/ankipack/dist/deck.js
  var idGen2 = new IdGenerator();
  var NO_PRESET = "no-preset";
  var Deck = class {
    id;
    name;
    description;
    config;
    notes = [];
    _effectiveConfig;
    constructor(options) {
      if (options.id !== void 0 && !Number.isSafeInteger(options.id)) {
        fail("invalid-input", `Deck id must be a safe integer, got ${options.id}`);
      }
      this.id = options.id ?? idGen2.next();
      rejectLoneSurrogates(options.name, `Deck name ${JSON.stringify(options.name)}`);
      this.name = options.name;
      this.description = options.description;
      this.config = options.config;
    }
    /** Add a note. It generates one card per template its note type renders. */
    addNote(note) {
      this.notes.push(note);
    }
    /**
     * Returns the deck's config, the {@link NO_PRESET} sentinel when the deck
     * was created with `config: null`, or a unique auto-generated config when
     * `config` was omitted.
     */
    getEffectiveConfig() {
      if (this.config === null)
        return NO_PRESET;
      if (this.config)
        return this.config;
      if (!this._effectiveConfig) {
        this._effectiveConfig = new DeckConfig({
          name: `${toNormalizedDeckName(this.name)} Config`
        });
      }
      return this._effectiveConfig;
    }
  };

  // node_modules/ankipack/dist/generated/anki/notetypes_pb.js
  var file_anki_notetypes = /* @__PURE__ */ fileDesc("ChRhbmtpL25vdGV0eXBlcy5wcm90bxIOYW5raS5ub3RldHlwZXMiGgoKTm90ZXR5cGVJZBIMCgRudGlkGAEgASgDIqEMCghOb3RldHlwZRIKCgJpZBgBIAEoAxIMCgRuYW1lGAIgASgJEhIKCm10aW1lX3NlY3MYAyABKAMSCwoDdXNuGAQgASgREi8KBmNvbmZpZxgHIAEoCzIfLmFua2kubm90ZXR5cGVzLk5vdGV0eXBlLkNvbmZpZxIuCgZmaWVsZHMYCCADKAsyHi5hbmtpLm5vdGV0eXBlcy5Ob3RldHlwZS5GaWVsZBI0Cgl0ZW1wbGF0ZXMYCSADKAsyIS5hbmtpLm5vdGV0eXBlcy5Ob3RldHlwZS5UZW1wbGF0ZRrbBAoGQ29uZmlnEjIKBGtpbmQYASABKA4yJC5hbmtpLm5vdGV0eXBlcy5Ob3RldHlwZS5Db25maWcuS2luZBIWCg5zb3J0X2ZpZWxkX2lkeBgCIAEoDRILCgNjc3MYAyABKAkSHQoVdGFyZ2V0X2RlY2tfaWRfdW51c2VkGAQgASgDEhEKCWxhdGV4X3ByZRgFIAEoCRISCgpsYXRleF9wb3N0GAYgASgJEhEKCWxhdGV4X3N2ZxgHIAEoCBI9CgRyZXFzGAggAygLMi8uYW5raS5ub3RldHlwZXMuTm90ZXR5cGUuQ29uZmlnLkNhcmRSZXF1aXJlbWVudBJMChNvcmlnaW5hbF9zdG9ja19raW5kGAkgASgOMi8uYW5raS5ub3RldHlwZXMuU3RvY2tOb3RldHlwZS5PcmlnaW5hbFN0b2NrS2luZBIYCgtvcmlnaW5hbF9pZBgKIAEoA0gAiAEBEg4KBW90aGVyGP8BIAEoDBquAQoPQ2FyZFJlcXVpcmVtZW50EhAKCGNhcmRfb3JkGAEgASgNEkIKBGtpbmQYAiABKA4yNC5hbmtpLm5vdGV0eXBlcy5Ob3RldHlwZS5Db25maWcuQ2FyZFJlcXVpcmVtZW50LktpbmQSEgoKZmllbGRfb3JkcxgDIAMoDSIxCgRLaW5kEg0KCUtJTkRfTk9ORRAAEgwKCEtJTkRfQU5ZEAESDAoIS0lORF9BTEwQAiInCgRLaW5kEg8KC0tJTkRfTk9STUFMEAASDgoKS0lORF9DTE9aRRABQg4KDF9vcmlnaW5hbF9pZBryAgoFRmllbGQSIQoDb3JkGAEgASgLMhQuYW5raS5nZW5lcmljLlVJbnQzMhIMCgRuYW1lGAIgASgJEjUKBmNvbmZpZxgFIAEoCzIlLmFua2kubm90ZXR5cGVzLk5vdGV0eXBlLkZpZWxkLkNvbmZpZxqAAgoGQ29uZmlnEg4KBnN0aWNreRgBIAEoCBILCgNydGwYAiABKAgSEQoJZm9udF9uYW1lGAMgASgJEhEKCWZvbnRfc2l6ZRgEIAEoDRITCgtkZXNjcmlwdGlvbhgFIAEoCRISCgpwbGFpbl90ZXh0GAYgASgIEhEKCWNvbGxhcHNlZBgHIAEoCBIbChNleGNsdWRlX2Zyb21fc2VhcmNoGAggASgIEg8KAmlkGAkgASgDSACIAQESEAoDdGFnGAogASgNSAGIAQESGAoQcHJldmVudF9kZWxldGlvbhgLIAEoCBIOCgVvdGhlchj/ASABKAxCBQoDX2lkQgYKBF90YWca7wIKCFRlbXBsYXRlEiEKA29yZBgBIAEoCzIULmFua2kuZ2VuZXJpYy5VSW50MzISDAoEbmFtZRgCIAEoCRISCgptdGltZV9zZWNzGAMgASgDEgsKA3VzbhgEIAEoERI4CgZjb25maWcYBSABKAsyKC5hbmtpLm5vdGV0eXBlcy5Ob3RldHlwZS5UZW1wbGF0ZS5Db25maWca1gEKBkNvbmZpZxIQCghxX2Zvcm1hdBgBIAEoCRIQCghhX2Zvcm1hdBgCIAEoCRIYChBxX2Zvcm1hdF9icm93c2VyGAMgASgJEhgKEGFfZm9ybWF0X2Jyb3dzZXIYBCABKAkSFgoOdGFyZ2V0X2RlY2tfaWQYBSABKAMSGQoRYnJvd3Nlcl9mb250X25hbWUYBiABKAkSGQoRYnJvd3Nlcl9mb250X3NpemUYByABKA0SDwoCaWQYCCABKANIAIgBARIOCgVvdGhlchj/ASABKAxCBQoDX2lkIl8KGkFkZE9yVXBkYXRlTm90ZXR5cGVSZXF1ZXN0EgwKBGpzb24YASABKAwSHgoWcHJlc2VydmVfdXNuX2FuZF9tdGltZRgCIAEoCBITCgtza2lwX2NoZWNrcxgDIAEoCCJAChtVcGRhdGVOb3RldHlwZUxlZ2FjeVJlcXVlc3QSDAoEanNvbhgBIAEoDBITCgtza2lwX2NoZWNrcxgCIAEoCCL7AwoNU3RvY2tOb3RldHlwZRIwCgRraW5kGAEgASgOMiIuYW5raS5ub3RldHlwZXMuU3RvY2tOb3RldHlwZS5LaW5kIpYBCgRLaW5kEg4KCktJTkRfQkFTSUMQABIbChdLSU5EX0JBU0lDX0FORF9SRVZFUlNFRBABEiAKHEtJTkRfQkFTSUNfT1BUSU9OQUxfUkVWRVJTRUQQAhIVChFLSU5EX0JBU0lDX1RZUElORxADEg4KCktJTkRfQ0xPWkUQBBIYChRLSU5EX0lNQUdFX09DQ0xVU0lPThAFIp4CChFPcmlnaW5hbFN0b2NrS2luZBIfChtPUklHSU5BTF9TVE9DS19LSU5EX1VOS05PV04QABIdChlPUklHSU5BTF9TVE9DS19LSU5EX0JBU0lDEAESKgomT1JJR0lOQUxfU1RPQ0tfS0lORF9CQVNJQ19BTkRfUkVWRVJTRUQQAhIvCitPUklHSU5BTF9TVE9DS19LSU5EX0JBU0lDX09QVElPTkFMX1JFVkVSU0VEEAMSJAogT1JJR0lOQUxfU1RPQ0tfS0lORF9CQVNJQ19UWVBJTkcQBBIdChlPUklHSU5BTF9TVE9DS19LSU5EX0NMT1pFEAUSJwojT1JJR0lOQUxfU1RPQ0tfS0lORF9JTUFHRV9PQ0NMVVNJT04QBiJACg1Ob3RldHlwZU5hbWVzEi8KB2VudHJpZXMYASADKAsyHi5hbmtpLm5vdGV0eXBlcy5Ob3RldHlwZU5hbWVJZCJMChFOb3RldHlwZVVzZUNvdW50cxI3CgdlbnRyaWVzGAEgAygLMiYuYW5raS5ub3RldHlwZXMuTm90ZXR5cGVOYW1lSWRVc2VDb3VudCIqCg5Ob3RldHlwZU5hbWVJZBIKCgJpZBgBIAEoAxIMCgRuYW1lGAIgASgJIkUKFk5vdGV0eXBlTmFtZUlkVXNlQ291bnQSCgoCaWQYASABKAMSDAoEbmFtZRgCIAEoCRIRCgl1c2VfY291bnQYAyABKA0iMQoWR2V0QXV4Q29uZmlnS2V5UmVxdWVzdBIKCgJpZBgBIAEoAxILCgNrZXkYAiABKAkiWAoeR2V0QXV4VGVtcGxhdGVDb25maWdLZXlSZXF1ZXN0EhMKC25vdGV0eXBlX2lkGAEgASgDEhQKDGNhcmRfb3JkaW5hbBgCIAEoDRILCgNrZXkYAyABKAkiUAocR2V0Q2hhbmdlTm90ZXR5cGVJbmZvUmVxdWVzdBIXCg9vbGRfbm90ZXR5cGVfaWQYASABKAMSFwoPbmV3X25vdGV0eXBlX2lkGAIgASgDIssBChVDaGFuZ2VOb3RldHlwZVJlcXVlc3QSEAoIbm90ZV9pZHMYASADKAMSEgoKbmV3X2ZpZWxkcxgCIAMoBRIVCg1uZXdfdGVtcGxhdGVzGAMgAygFEhcKD29sZF9ub3RldHlwZV9pZBgEIAEoAxIXCg9uZXdfbm90ZXR5cGVfaWQYBSABKAMSFgoOY3VycmVudF9zY2hlbWEYBiABKAMSGQoRb2xkX25vdGV0eXBlX25hbWUYByABKAkSEAoIaXNfY2xvemUYCCABKAgizwEKEkNoYW5nZU5vdGV0eXBlSW5mbxIXCg9vbGRfZmllbGRfbmFtZXMYASADKAkSGgoSb2xkX3RlbXBsYXRlX25hbWVzGAIgAygJEhcKD25ld19maWVsZF9uYW1lcxgDIAMoCRIaChJuZXdfdGVtcGxhdGVfbmFtZXMYBCADKAkSNAoFaW5wdXQYBSABKAsyJS5hbmtpLm5vdGV0eXBlcy5DaGFuZ2VOb3RldHlwZVJlcXVlc3QSGQoRb2xkX25vdGV0eXBlX25hbWUYBiABKAkinAEKHVJlc3RvcmVOb3RldHlwZVRvU3RvY2tSZXF1ZXN0Ei8KC25vdGV0eXBlX2lkGAEgASgLMhouYW5raS5ub3RldHlwZXMuTm90ZXR5cGVJZBI7Cgpmb3JjZV9raW5kGAIgASgOMiIuYW5raS5ub3RldHlwZXMuU3RvY2tOb3RldHlwZS5LaW5kSACIAQFCDQoLX2ZvcmNlX2tpbmQiKQoZR2V0Q2xvemVGaWVsZE9yZHNSZXNwb25zZRIMCgRvcmRzGAEgAygNKsgBChNJbWFnZU9jY2x1c2lvbkZpZWxkEiQKIElNQUdFX09DQ0xVU0lPTl9GSUVMRF9PQ0NMVVNJT05TEAASHwobSU1BR0VfT0NDTFVTSU9OX0ZJRUxEX0lNQUdFEAESIAocSU1BR0VfT0NDTFVTSU9OX0ZJRUxEX0hFQURFUhACEiQKIElNQUdFX09DQ0xVU0lPTl9GSUVMRF9CQUNLX0VYVFJBEAMSIgoeSU1BR0VfT0NDTFVTSU9OX0ZJRUxEX0NPTU1FTlRTEAQqPgoKQ2xvemVGaWVsZBIUChBDTE9aRV9GSUVMRF9URVhUEAASGgoWQ0xPWkVfRklFTERfQkFDS19FWFRSQRABQgJQAWIGcHJvdG8z", [file_anki_generic, file_anki_collection]);
  var Notetype_ConfigSchema = /* @__PURE__ */ messageDesc(file_anki_notetypes, 1, 0);
  var Notetype_Config_CardRequirementSchema = /* @__PURE__ */ messageDesc(file_anki_notetypes, 1, 0, 0);
  var Notetype_Config_CardRequirement_Kind;
  (function(Notetype_Config_CardRequirement_Kind2) {
    Notetype_Config_CardRequirement_Kind2[Notetype_Config_CardRequirement_Kind2["NONE"] = 0] = "NONE";
    Notetype_Config_CardRequirement_Kind2[Notetype_Config_CardRequirement_Kind2["ANY"] = 1] = "ANY";
    Notetype_Config_CardRequirement_Kind2[Notetype_Config_CardRequirement_Kind2["ALL"] = 2] = "ALL";
  })(Notetype_Config_CardRequirement_Kind || (Notetype_Config_CardRequirement_Kind = {}));
  var Notetype_Config_Kind;
  (function(Notetype_Config_Kind2) {
    Notetype_Config_Kind2[Notetype_Config_Kind2["NORMAL"] = 0] = "NORMAL";
    Notetype_Config_Kind2[Notetype_Config_Kind2["CLOZE"] = 1] = "CLOZE";
  })(Notetype_Config_Kind || (Notetype_Config_Kind = {}));
  var Notetype_Field_ConfigSchema = /* @__PURE__ */ messageDesc(file_anki_notetypes, 1, 1, 0);
  var Notetype_Template_ConfigSchema = /* @__PURE__ */ messageDesc(file_anki_notetypes, 1, 2, 0);
  var StockNotetype_Kind;
  (function(StockNotetype_Kind2) {
    StockNotetype_Kind2[StockNotetype_Kind2["BASIC"] = 0] = "BASIC";
    StockNotetype_Kind2[StockNotetype_Kind2["BASIC_AND_REVERSED"] = 1] = "BASIC_AND_REVERSED";
    StockNotetype_Kind2[StockNotetype_Kind2["BASIC_OPTIONAL_REVERSED"] = 2] = "BASIC_OPTIONAL_REVERSED";
    StockNotetype_Kind2[StockNotetype_Kind2["BASIC_TYPING"] = 3] = "BASIC_TYPING";
    StockNotetype_Kind2[StockNotetype_Kind2["CLOZE"] = 4] = "CLOZE";
    StockNotetype_Kind2[StockNotetype_Kind2["IMAGE_OCCLUSION"] = 5] = "IMAGE_OCCLUSION";
  })(StockNotetype_Kind || (StockNotetype_Kind = {}));
  var StockNotetype_OriginalStockKind;
  (function(StockNotetype_OriginalStockKind2) {
    StockNotetype_OriginalStockKind2[StockNotetype_OriginalStockKind2["UNKNOWN"] = 0] = "UNKNOWN";
    StockNotetype_OriginalStockKind2[StockNotetype_OriginalStockKind2["BASIC"] = 1] = "BASIC";
    StockNotetype_OriginalStockKind2[StockNotetype_OriginalStockKind2["BASIC_AND_REVERSED"] = 2] = "BASIC_AND_REVERSED";
    StockNotetype_OriginalStockKind2[StockNotetype_OriginalStockKind2["BASIC_OPTIONAL_REVERSED"] = 3] = "BASIC_OPTIONAL_REVERSED";
    StockNotetype_OriginalStockKind2[StockNotetype_OriginalStockKind2["BASIC_TYPING"] = 4] = "BASIC_TYPING";
    StockNotetype_OriginalStockKind2[StockNotetype_OriginalStockKind2["CLOZE"] = 5] = "CLOZE";
    StockNotetype_OriginalStockKind2[StockNotetype_OriginalStockKind2["IMAGE_OCCLUSION"] = 6] = "IMAGE_OCCLUSION";
  })(StockNotetype_OriginalStockKind || (StockNotetype_OriginalStockKind = {}));
  var ImageOcclusionField;
  (function(ImageOcclusionField2) {
    ImageOcclusionField2[ImageOcclusionField2["OCCLUSIONS"] = 0] = "OCCLUSIONS";
    ImageOcclusionField2[ImageOcclusionField2["IMAGE"] = 1] = "IMAGE";
    ImageOcclusionField2[ImageOcclusionField2["HEADER"] = 2] = "HEADER";
    ImageOcclusionField2[ImageOcclusionField2["BACK_EXTRA"] = 3] = "BACK_EXTRA";
    ImageOcclusionField2[ImageOcclusionField2["COMMENTS"] = 4] = "COMMENTS";
  })(ImageOcclusionField || (ImageOcclusionField = {}));
  var ClozeField;
  (function(ClozeField2) {
    ClozeField2[ClozeField2["TEXT"] = 0] = "TEXT";
    ClozeField2[ClozeField2["BACK_EXTRA"] = 1] = "BACK_EXTRA";
  })(ClozeField || (ClozeField = {}));

  // node_modules/ankipack/dist/util/guid.js
  function generateGuid() {
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    let num = 0n;
    for (const byte of bytes) {
      num = num << 8n | BigInt(byte);
    }
    const chars = [];
    while (num > 0n) {
      chars.push(BASE91_ALPHABET[Number(num % 91n)]);
      num = num / 91n;
    }
    return chars.reverse().join("");
  }

  // node_modules/ankipack/dist/util/checksum.js
  async function sha1(data) {
    return new Uint8Array(await crypto.subtle.digest("SHA-1", Uint8Array.from(data)));
  }
  async function fieldChecksum(firstField) {
    const digest = await sha1(new TextEncoder().encode(firstField));
    return new DataView(digest.buffer).getUint32(0, false);
  }

  // node_modules/ankipack/dist/util/casefold.js
  var FOLD_DELTA = [
    "b5:3bc,df:73.73,149:2bc.6e,17f:73,1f0:6a.30c,345:3b9,390:301.3b9.308,3b0:301.3c5.308,3c2:3c3,",
    "3d0:3b2,3d1:3b8,3d5:3c6,3d6:3c0,3f0:3ba,3f1:3c1,3f5:3b5,587:565.582,13a0:13a0,13a1:13a1,",
    "13a2:13a2,13a3:13a3,13a4:13a4,13a5:13a5,13a6:13a6,13a7:13a7,13a8:13a8,13a9:13a9,13aa:13aa,",
    "13ab:13ab,13ac:13ac,13ad:13ad,13ae:13ae,13af:13af,13b0:13b0,13b1:13b1,13b2:13b2,13b3:13b3,",
    "13b4:13b4,13b5:13b5,13b6:13b6,13b7:13b7,13b8:13b8,13b9:13b9,13ba:13ba,13bb:13bb,13bc:13bc,",
    "13bd:13bd,13be:13be,13bf:13bf,13c0:13c0,13c1:13c1,13c2:13c2,13c3:13c3,13c4:13c4,13c5:13c5,",
    "13c6:13c6,13c7:13c7,13c8:13c8,13c9:13c9,13ca:13ca,13cb:13cb,13cc:13cc,13cd:13cd,13ce:13ce,",
    "13cf:13cf,13d0:13d0,13d1:13d1,13d2:13d2,13d3:13d3,13d4:13d4,13d5:13d5,13d6:13d6,13d7:13d7,",
    "13d8:13d8,13d9:13d9,13da:13da,13db:13db,13dc:13dc,13dd:13dd,13de:13de,13df:13df,13e0:13e0,",
    "13e1:13e1,13e2:13e2,13e3:13e3,13e4:13e4,13e5:13e5,13e6:13e6,13e7:13e7,13e8:13e8,13e9:13e9,",
    "13ea:13ea,13eb:13eb,13ec:13ec,13ed:13ed,13ee:13ee,13ef:13ef,13f0:13f0,13f1:13f1,13f2:13f2,",
    "13f3:13f3,13f4:13f4,13f5:13f5,13f8:13f0,13f9:13f1,13fa:13f2,13fb:13f3,13fc:13f4,13fd:13f5,",
    "1c80:432,1c81:434,1c82:43e,1c83:441,1c84:442,1c85:442,1c86:44a,1c87:463,1c88:a64b,1c89:1c89,",
    "1e96:68.331,1e97:74.308,1e98:77.30a,1e99:79.30a,1e9a:61.2be,1e9b:1e61,1e9e:73.73,",
    "1f50:3c5.313,1f52:300.3c5.313,1f54:301.3c5.313,1f56:342.3c5.313,1f80:1f00.3b9,1f81:1f01.3b9,",
    "1f82:1f02.3b9,1f83:1f03.3b9,1f84:1f04.3b9,1f85:1f05.3b9,1f86:1f06.3b9,1f87:1f07.3b9,",
    "1f88:1f00.3b9,1f89:1f01.3b9,1f8a:1f02.3b9,1f8b:1f03.3b9,1f8c:1f04.3b9,1f8d:1f05.3b9,",
    "1f8e:1f06.3b9,1f8f:1f07.3b9,1f90:1f20.3b9,1f91:1f21.3b9,1f92:1f22.3b9,1f93:1f23.3b9,",
    "1f94:1f24.3b9,1f95:1f25.3b9,1f96:1f26.3b9,1f97:1f27.3b9,1f98:1f20.3b9,1f99:1f21.3b9,",
    "1f9a:1f22.3b9,1f9b:1f23.3b9,1f9c:1f24.3b9,1f9d:1f25.3b9,1f9e:1f26.3b9,1f9f:1f27.3b9,",
    "1fa0:1f60.3b9,1fa1:1f61.3b9,1fa2:1f62.3b9,1fa3:1f63.3b9,1fa4:1f64.3b9,1fa5:1f65.3b9,",
    "1fa6:1f66.3b9,1fa7:1f67.3b9,1fa8:1f60.3b9,1fa9:1f61.3b9,1faa:1f62.3b9,1fab:1f63.3b9,",
    "1fac:1f64.3b9,1fad:1f65.3b9,1fae:1f66.3b9,1faf:1f67.3b9,1fb2:1f70.3b9,1fb3:3b1.3b9,",
    "1fb4:3ac.3b9,1fb6:3b1.342,1fb7:3b9.3b1.342,1fbc:3b1.3b9,1fbe:3b9,1fc2:1f74.3b9,1fc3:3b7.3b9,",
    "1fc4:3ae.3b9,1fc6:3b7.342,1fc7:3b9.3b7.342,1fcc:3b7.3b9,1fd2:300.3b9.308,1fd3:301.3b9.308,",
    "1fd6:3b9.342,1fd7:342.3b9.308,1fe2:300.3c5.308,1fe3:301.3c5.308,1fe4:3c1.313,1fe6:3c5.342,",
    "1fe7:342.3c5.308,1ff2:1f7c.3b9,1ff3:3c9.3b9,1ff4:3ce.3b9,1ff6:3c9.342,1ff7:3b9.3c9.342,",
    "1ffc:3c9.3b9,2c2f:2c2f,a7c0:a7c0,a7c7:a7c7,a7c9:a7c9,a7cb:a7cb,a7cc:a7cc,a7d0:a7d0,a7d6:a7d6,",
    "a7d8:a7d8,a7da:a7da,a7dc:a7dc,a7f5:a7f5,ab70:13a0,ab71:13a1,ab72:13a2,ab73:13a3,ab74:13a4,",
    "ab75:13a5,ab76:13a6,ab77:13a7,ab78:13a8,ab79:13a9,ab7a:13aa,ab7b:13ab,ab7c:13ac,ab7d:13ad,",
    "ab7e:13ae,ab7f:13af,ab80:13b0,ab81:13b1,ab82:13b2,ab83:13b3,ab84:13b4,ab85:13b5,ab86:13b6,",
    "ab87:13b7,ab88:13b8,ab89:13b9,ab8a:13ba,ab8b:13bb,ab8c:13bc,ab8d:13bd,ab8e:13be,ab8f:13bf,",
    "ab90:13c0,ab91:13c1,ab92:13c2,ab93:13c3,ab94:13c4,ab95:13c5,ab96:13c6,ab97:13c7,ab98:13c8,",
    "ab99:13c9,ab9a:13ca,ab9b:13cb,ab9c:13cc,ab9d:13cd,ab9e:13ce,ab9f:13cf,aba0:13d0,aba1:13d1,",
    "aba2:13d2,aba3:13d3,aba4:13d4,aba5:13d5,aba6:13d6,aba7:13d7,aba8:13d8,aba9:13d9,abaa:13da,",
    "abab:13db,abac:13dc,abad:13dd,abae:13de,abaf:13df,abb0:13e0,abb1:13e1,abb2:13e2,abb3:13e3,",
    "abb4:13e4,abb5:13e5,abb6:13e6,abb7:13e7,abb8:13e8,abb9:13e9,abba:13ea,abbb:13eb,abbc:13ec,",
    "abbd:13ed,abbe:13ee,abbf:13ef,fb00:66.66,fb01:66.69,fb02:66.6c,fb03:69.66.66,fb04:6c.66.66,",
    "fb05:73.74,fb06:73.74,fb13:574.576,fb14:574.565,fb15:574.56b,fb16:57e.576,fb17:574.56d,",
    "10570:10570,10571:10571,10572:10572,10573:10573,10574:10574,10575:10575,10576:10576,",
    "10577:10577,10578:10578,10579:10579,1057a:1057a,1057c:1057c,1057d:1057d,1057e:1057e,",
    "1057f:1057f,10580:10580,10581:10581,10582:10582,10583:10583,10584:10584,10585:10585,",
    "10586:10586,10587:10587,10588:10588,10589:10589,1058a:1058a,1058c:1058c,1058d:1058d,",
    "1058e:1058e,1058f:1058f,10590:10590,10591:10591,10592:10592,10594:10594,10595:10595,",
    "10d50:10d50,10d51:10d51,10d52:10d52,10d53:10d53,10d54:10d54,10d55:10d55,10d56:10d56,",
    "10d57:10d57,10d58:10d58,10d59:10d59,10d5a:10d5a,10d5b:10d5b,10d5c:10d5c,10d5d:10d5d,",
    "10d5e:10d5e,10d5f:10d5f,10d60:10d60,10d61:10d61,10d62:10d62,10d63:10d63,10d64:10d64,",
    "10d65:10d65"
  ].join("");
  var FOLD = new Map(FOLD_DELTA.split(",").map((pair) => {
    const [from, to] = pair.split(":");
    return [
      String.fromCodePoint(Number.parseInt(from, 16)),
      to.split(".").map((point) => String.fromCodePoint(Number.parseInt(point, 16))).join("")
    ];
  }));
  function unicaseKey(name) {
    let out = "";
    for (const char of name) {
      out += FOLD.get(char) ?? char.toLowerCase();
    }
    return out;
  }

  // node_modules/ankipack/dist/util/template.js
  var SPECIAL_FIELD_NAMES = [
    "FrontSide",
    "Card",
    "CardFlag",
    "Deck",
    "Subdeck",
    "Tags",
    "Type",
    "CardID"
  ];
  function templateRenders(src, nonempty) {
    return renders(src, nonempty, true);
  }
  function templateRendersForRequirements(src, nonempty) {
    return renders(src, nonempty, false);
  }
  function renders(src, nonempty, checkNegated) {
    const parsed = parseTemplate(src);
    return parsed === null ? false : nodesRender(parsed, nonempty, checkNegated);
  }
  function nodesRender(nodes, nonempty, checkNegated) {
    for (const node of nodes) {
      if (node.kind === "replacement") {
        if (nonempty.has(node.key))
          return true;
        continue;
      }
      const satisfied = node.negated ? !checkNegated || !nonempty.has(node.key) : nonempty.has(node.key);
      if (satisfied && nodesRender(node.children, nonempty, checkNegated))
        return true;
    }
    return false;
  }
  function parseTemplate(source) {
    const root = [];
    const stack = [];
    const currentList = () => stack.length > 0 ? stack[stack.length - 1].children : root;
    const { src, open, close: closeTag } = altSyntax(source);
    let index = 0;
    while (index < src.length) {
      if (src.startsWith(open, index)) {
        const close = src.indexOf(closeTag, index + 2);
        if (close >= 0) {
          const handle = classifyHandle(src.slice(index + 2, close));
          index = close + 2;
          if (handle.kind === "open") {
            stack.push({ key: handle.key, negated: handle.negated, children: [] });
          } else if (handle.kind === "close") {
            const section = stack.pop();
            if (!section || section.key !== handle.key)
              return null;
            currentList().push({
              kind: "section",
              key: section.key,
              negated: section.negated,
              children: section.children
            });
          } else {
            currentList().push({ kind: "replacement", key: handle.key });
          }
          continue;
        }
      }
      if (src.startsWith("<!--", index)) {
        const close = src.indexOf("-->", index + 4);
        if (close >= 0) {
          index = close + 3;
          continue;
        }
      }
      index++;
    }
    return stack.length > 0 ? null : root;
  }
  var ALT_HANDLEBAR_DIRECTIVE = "{{=<% %>=}}";
  function altSyntax(source) {
    let src = trimStartRust(source);
    if (!src.startsWith(ALT_HANDLEBAR_DIRECTIVE)) {
      return { src: source, open: "{{", close: "}}" };
    }
    while (src.startsWith(ALT_HANDLEBAR_DIRECTIVE)) {
      src = src.slice(ALT_HANDLEBAR_DIRECTIVE.length);
    }
    return { src, open: "<%", close: "%>" };
  }
  function classifyHandle(raw) {
    const start = trimRust(raw.replace(/^\{+/, ""));
    if (start.length < 2)
      return { kind: "replacement", key: start };
    if (start.startsWith("#"))
      return { kind: "open", key: trimStartRust(start.slice(1)), negated: false };
    if (start.startsWith("/"))
      return { kind: "close", key: trimStartRust(start.slice(1)) };
    if (start.startsWith("^"))
      return { kind: "open", key: trimStartRust(start.slice(1)), negated: true };
    const colon = start.lastIndexOf(":");
    return { kind: "replacement", key: colon >= 0 ? start.slice(colon + 1) : start };
  }

  // node_modules/ankipack/dist/collection/schema.js
  var SCHEMA_VERSION = 18;
  var SCHEMA_SQL = `
-- Legacy V11 tables
CREATE TABLE col (
  id integer PRIMARY KEY,
  crt integer NOT NULL,
  mod integer NOT NULL,
  scm integer NOT NULL,
  ver integer NOT NULL,
  dty integer NOT NULL,
  usn integer NOT NULL,
  ls integer NOT NULL,
  conf text NOT NULL,
  models text NOT NULL,
  decks text NOT NULL,
  dconf text NOT NULL,
  tags text NOT NULL
);

CREATE TABLE notes (
  id integer PRIMARY KEY,
  guid text NOT NULL,
  mid integer NOT NULL,
  mod integer NOT NULL,
  usn integer NOT NULL,
  tags text NOT NULL,
  flds text NOT NULL,
  sfld integer NOT NULL,
  csum integer NOT NULL,
  flags integer NOT NULL,
  data text NOT NULL
);

CREATE TABLE cards (
  id integer PRIMARY KEY,
  nid integer NOT NULL,
  did integer NOT NULL,
  ord integer NOT NULL,
  mod integer NOT NULL,
  usn integer NOT NULL,
  type integer NOT NULL,
  queue integer NOT NULL,
  due integer NOT NULL,
  ivl integer NOT NULL,
  factor integer NOT NULL,
  reps integer NOT NULL,
  lapses integer NOT NULL,
  left integer NOT NULL,
  odue integer NOT NULL,
  odid integer NOT NULL,
  flags integer NOT NULL,
  data text NOT NULL
);

CREATE TABLE revlog (
  id integer PRIMARY KEY,
  cid integer NOT NULL,
  usn integer NOT NULL,
  ease integer NOT NULL,
  ivl integer NOT NULL,
  lastIvl integer NOT NULL,
  factor integer NOT NULL,
  time integer NOT NULL,
  type integer NOT NULL
);

CREATE TABLE graves (
  oid integer NOT NULL,
  type integer NOT NULL,
  usn integer NOT NULL,
  PRIMARY KEY (oid, type)
) WITHOUT ROWID;

-- V11 indexes
CREATE INDEX ix_notes_usn ON notes (usn);
CREATE INDEX ix_cards_usn ON cards (usn);
CREATE INDEX ix_revlog_usn ON revlog (usn);
CREATE INDEX ix_cards_nid ON cards (nid);
CREATE INDEX ix_cards_sched ON cards (did, queue, due);
CREATE INDEX ix_revlog_cid ON revlog (cid);
CREATE INDEX ix_notes_csum ON notes (csum);
CREATE INDEX idx_notes_mid ON notes (mid);
CREATE INDEX idx_cards_odid ON cards (odid) WHERE odid != 0;
CREATE INDEX idx_graves_pending ON graves (usn);

-- V14 tables
CREATE TABLE deck_config (
  id integer PRIMARY KEY NOT NULL,
  name text NOT NULL,
  mtime_secs integer NOT NULL,
  usn integer NOT NULL,
  config blob NOT NULL
);

CREATE TABLE config (
  KEY text NOT NULL PRIMARY KEY,
  usn integer NOT NULL,
  mtime_secs integer NOT NULL,
  val blob NOT NULL
) WITHOUT ROWID;

CREATE TABLE tags (
  tag text NOT NULL PRIMARY KEY,
  usn integer NOT NULL,
  collapsed boolean NOT NULL,
  config blob NULL
) WITHOUT ROWID;

-- V15 tables
CREATE TABLE notetypes (
  id integer NOT NULL PRIMARY KEY,
  name text NOT NULL,
  mtime_secs integer NOT NULL,
  usn integer NOT NULL,
  config blob NOT NULL
);
CREATE UNIQUE INDEX idx_notetypes_name ON notetypes (name);
CREATE INDEX idx_notetypes_usn ON notetypes (usn);

CREATE TABLE fields (
  ntid integer NOT NULL,
  ord integer NOT NULL,
  name text NOT NULL,
  config blob NOT NULL,
  PRIMARY KEY (ntid, ord)
) WITHOUT ROWID;
CREATE UNIQUE INDEX idx_fields_name_ntid ON fields (name, ntid);

CREATE TABLE templates (
  ntid integer NOT NULL,
  ord integer NOT NULL,
  name text NOT NULL,
  mtime_secs integer NOT NULL,
  usn integer NOT NULL,
  config blob NOT NULL,
  PRIMARY KEY (ntid, ord)
) WITHOUT ROWID;
CREATE UNIQUE INDEX idx_templates_name_ntid ON templates (name, ntid);
CREATE INDEX idx_templates_usn ON templates (usn);

CREATE TABLE decks (
  id integer PRIMARY KEY NOT NULL,
  name text NOT NULL,
  mtime_secs integer NOT NULL,
  usn integer NOT NULL,
  common blob NOT NULL,
  kind blob NOT NULL
);
CREATE UNIQUE INDEX idx_decks_name ON decks (name);
`;

  // node_modules/ankipack/dist/collection/data.js
  function newCardRow(card) {
    return {
      ...card,
      usn: -1,
      type: 0,
      queue: 0,
      ivl: 0,
      factor: 0,
      reps: 0,
      lapses: 0,
      left: 0,
      odue: 0,
      odid: 0,
      flags: 0,
      data: ""
    };
  }
  function joinTags(tags) {
    return tags.length > 0 ? ` ${tags.join(" ")} ` : "";
  }
  var TAG_SEPARATOR = new RegExp(`[ ${String.fromCharCode(12288)}]`);
  function emptyCol(nowSecs, nowMs) {
    return {
      id: 1,
      crt: nowSecs,
      mod: nowMs,
      scm: nowMs,
      ver: SCHEMA_VERSION,
      dty: 0,
      usn: -1,
      ls: 0,
      conf: "{}",
      models: "{}",
      decks: "{}",
      dconf: "{}",
      tags: "{}"
    };
  }
  function emptyCollection(nowSecs, nowMs) {
    return {
      col: emptyCol(nowSecs, nowMs),
      notes: [],
      cards: [],
      revlog: [],
      graves: [],
      deckConfig: [],
      config: [],
      tags: [],
      notetypes: [],
      fields: [],
      templates: [],
      decks: [],
      media: []
    };
  }

  // node_modules/ankipack/dist/collection/build.js
  async function buildCollection(decks, media) {
    const idGen4 = new IdGenerator();
    const now = Math.floor(Date.now() / 1e3);
    const nowMs = Date.now();
    const data = emptyCollection(now, nowMs);
    data.media = media;
    const addedNotetypes = /* @__PURE__ */ new Map();
    const notetypeNames = /* @__PURE__ */ new Map();
    const addedConfigs = /* @__PURE__ */ new Map();
    const allNotes = [];
    let cardPosition = 0;
    let needPlaceholderConfig = false;
    const deckNames = /* @__PURE__ */ new Map();
    const deckIds = /* @__PURE__ */ new Map();
    for (const deck of decks) {
      const nativeName = unicaseKey(toNativeDeckName(deck.name));
      const clash = deckNames.get(nativeName);
      if (clash !== void 0) {
        fail("name-conflict", `Decks ${JSON.stringify(clash)} and ${JSON.stringify(deck.name)} resolve to the same Anki deck name, which Anki compares case-insensitively`);
      }
      deckNames.set(nativeName, deck.name);
      const idClash = deckIds.get(deck.id);
      if (idClash !== void 0) {
        fail("id-conflict", `Decks ${JSON.stringify(idClash)} and ${JSON.stringify(deck.name)} share id ${deck.id}`);
      }
      deckIds.set(deck.id, deck.name);
      const config = deck.getEffectiveConfig();
      if (config === NO_PRESET) {
        needPlaceholderConfig = true;
      } else if (addedConfigs.has(config.id)) {
        const existing = addedConfigs.get(config.id);
        if (existing !== config) {
          fail("id-conflict", `Two different presets share id ${config.id}: ${JSON.stringify(existing?.name)} and ${JSON.stringify(config.name)}`);
        }
      } else {
        addDeckConfig(data, config, now);
        addedConfigs.set(config.id, config);
      }
      addDeck(data, deck, now);
      for (const note of deck.notes) {
        allNotes.push({ note, deckId: deck.id });
        const notetype = note.notetype;
        const sameId = addedNotetypes.get(notetype.id);
        if (sameId !== void 0) {
          if (sameId !== notetype) {
            fail("id-conflict", `Two different note types share id ${notetype.id}: ${JSON.stringify(sameId.name)} and ${JSON.stringify(notetype.name)}`);
          }
        } else {
          const sameName = notetypeNames.get(unicaseKey(notetype.name));
          if (sameName !== void 0) {
            fail("name-conflict", sameName.name === notetype.name ? `Two different note types are both named ${JSON.stringify(notetype.name)}, which Anki requires to be unique` : `Note types ${JSON.stringify(sameName.name)} and ${JSON.stringify(notetype.name)} resolve to the same Anki note type name, which Anki compares case-insensitively and requires to be unique`);
          }
          addNotetype(data, notetype, now);
          addedNotetypes.set(notetype.id, notetype);
          notetypeNames.set(unicaseKey(notetype.name), notetype);
        }
      }
    }
    if (needPlaceholderConfig && !addedConfigs.has(1)) {
      const placeholder = new DeckConfig({ id: 1, name: "Default" });
      addDeckConfig(data, placeholder, now);
      addedConfigs.set(1, placeholder);
    }
    for (const { note, deckId } of allNotes) {
      cardPosition = await addNote(data, idGen4, note, deckId, now, cardPosition);
    }
    return data;
  }
  function addDeckConfig(data, config, now) {
    data.deckConfig.push({
      id: config.id,
      name: config.name,
      mtimeSecs: now,
      usn: -1,
      config: toBinary(DeckConfig_ConfigSchema, config.toProtobuf())
    });
  }
  function addDeck(data, deck, now) {
    const config = deck.getEffectiveConfig();
    const configId = config === NO_PRESET ? 1n : BigInt(config.id);
    const kindContainer = create(Deck_KindContainerSchema, {
      kind: {
        case: "normal",
        value: create(Deck_NormalSchema, { configId, description: deck.description ?? "" })
      }
    });
    data.decks.push({
      id: deck.id,
      name: toNativeDeckName(deck.name),
      mtimeSecs: now,
      usn: -1,
      common: toBinary(Deck_CommonSchema, create(Deck_CommonSchema, {})),
      kind: toBinary(Deck_KindContainerSchema, kindContainer)
    });
  }
  function addNotetype(data, notetype, now) {
    data.notetypes.push({
      id: notetype.id,
      name: notetype.name,
      mtimeSecs: now,
      usn: -1,
      config: toBinary(Notetype_ConfigSchema, notetype.toNotetypeConfigProtobuf())
    });
    notetype.fields.forEach((field, ord) => {
      data.fields.push({
        ntid: notetype.id,
        ord,
        name: field.name,
        config: toBinary(Notetype_Field_ConfigSchema, notetype.toFieldConfigProtobuf(ord))
      });
    });
    notetype.templates.forEach((tmpl, ord) => {
      data.templates.push({
        ntid: notetype.id,
        ord,
        name: tmpl.name,
        mtimeSecs: now,
        usn: -1,
        config: toBinary(Notetype_Template_ConfigSchema, notetype.toTemplateConfigProtobuf(ord))
      });
    });
  }
  async function addNote(data, idGen4, note, deckId, now, cardPosition) {
    const noteId = idGen4.next();
    const storedFields = note.fields.map(stripInvalidFieldChars);
    const guid = note.guid ?? generateGuid();
    if (data.notes.some((row) => row.guid === guid)) {
      fail("invalid-input", `Two notes in this package share the guid ${JSON.stringify(guid)}. Both would be imported, and a later release could only ever update one of them.`);
    }
    data.notes.push({
      id: noteId,
      guid,
      mid: note.notetype.id,
      mod: now,
      usn: -1,
      tags: joinTags(note.tags),
      flds: storedFields.join(FIELD_SEPARATOR),
      sfld: stripHtmlPreservingMediaFilenames(storedFields[note.notetype.sortFieldIndex ?? 0] ?? ""),
      csum: await fieldChecksum(stripHtmlPreservingMediaFilenames(storedFields[0] ?? "")),
      flags: 0,
      data: ""
    });
    return addCards(data, idGen4, note, storedFields, noteId, deckId, now, cardPosition);
  }
  function addCards(data, idGen4, note, fields, noteId, deckId, now, startPosition) {
    const ords = wantedCardOrds(
      {
        isCloze: note.notetype.type === "cloze",
        fieldNames: note.notetype.fields.map((field) => field.name),
        questionFormats: note.notetype.templates.map((tmpl) => tmpl.questionFormat)
      },
      fields,
      note.tags.length > 0,
      // A note being built has no cards yet, so the fallback always applies.
      true
    );
    for (const ord of ords) {
      data.cards.push(newCardRow({ id: idGen4.next(), nid: noteId, did: deckId, ord, due: startPosition, mod: now }));
    }
    return ords.length > 0 ? startPosition + 1 : startPosition;
  }
  function extractClozeOrds(fields, forceFirst = true) {
    const ords = /* @__PURE__ */ new Set();
    for (const field of fields) {
      for (const marker of parseClozeMarkers(field)) {
        collectClozeOrds(marker, ords);
      }
    }
    if (ords.size > 0)
      return [...ords].sort((a, b) => a - b);
    return forceFirst ? [0] : [];
  }
  function parseClozeMarkers(field) {
    const closed = [];
    const open = [];
    let index = 0;
    while (index < field.length) {
      if (field.startsWith("{{c", index)) {
        const numbers = parseClozeNumbers(field, index + 3);
        if (numbers) {
          if (open.length < 10)
            open.push({ values: numbers.values, children: [] });
          index = numbers.end;
          continue;
        }
      }
      if (field.startsWith("}}", index)) {
        const marker = open.pop();
        if (marker) {
          (open[open.length - 1]?.children ?? closed).push(marker);
          index += 2;
          continue;
        }
      }
      index++;
    }
    return closed;
  }
  function collectClozeOrds(marker, ords) {
    for (const value of marker.values) {
      if (value !== 0)
        ords.add(Math.min(value - 1, 499));
    }
    for (const child of marker.children) {
      collectClozeOrds(child, ords);
    }
  }
  function parseClozeNumbers(field, start) {
    let cursor = start;
    let digits = "";
    while (cursor < field.length && (isAsciiDigit(field[cursor]) || field[cursor] === ",")) {
      digits += field[cursor];
      cursor++;
    }
    if (digits.length === 0 || !field.startsWith("::", cursor))
      return void 0;
    const values = digits.split(",").filter((part) => part.length > 0).map(Number).filter((value) => Number.isInteger(value) && value >= 0 && value <= 65535);
    return values.length > 0 ? { values, end: cursor + 2 } : void 0;
  }
  function isAsciiDigit(char) {
    return char >= "0" && char <= "9";
  }
  function fieldIsEmpty(text) {
    return /^(?:[\t\n\v\f\r ]|<\/?(?:br|div) ?\/?>)*$/i.test(text);
  }
  function wantedCardOrds(notetype, values, hasTags, forceFirst) {
    if (notetype.isCloze)
      return extractClozeOrds(values, forceFirst);
    const nonempty = nonemptyFieldNames(notetype.fieldNames, values, hasTags);
    const ords = notetype.questionFormats.map((qfmt, ord) => templateRenders(qfmt, nonempty) ? ord : -1).filter((ord) => ord >= 0);
    return ords.length === 0 && forceFirst ? [0] : ords;
  }
  function nonemptyFieldNames(fieldNames, values, hasTags) {
    const declared = new Set(fieldNames);
    const nonempty = /* @__PURE__ */ new Set();
    fieldNames.forEach((name, index) => {
      if (!fieldIsEmpty(values[index] ?? ""))
        nonempty.add(name);
    });
    for (const special of SPECIAL_FIELD_NAMES) {
      if (special === "FrontSide" || declared.has(special))
        continue;
      if (special === "Tags" && !hasTags)
        continue;
      nonempty.add(special);
    }
    return nonempty;
  }

  // node_modules/fflate/esm/browser.js
  var u8 = Uint8Array;
  var u16 = Uint16Array;
  var i32 = Int32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */
    0,
    0,
    /* impossible */
    0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */
    0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = function(eb, start) {
    var b = new u16(31);
    for (var i2 = 0; i2 < 31; ++i2) {
      b[i2] = start += 1 << eb[i2 - 1];
    }
    var r = new i32(b[30]);
    for (var i2 = 1; i2 < 30; ++i2) {
      for (var j = b[i2]; j < b[i2 + 1]; ++j) {
        r[j] = j - b[i2] << 5 | i2;
      }
    }
    return { b, r };
  };
  var _a = freb(fleb, 2);
  var fl = _a.b;
  var revfl = _a.r;
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0);
  var fd = _b.b;
  var revfd = _b.r;
  var rev = new u16(32768);
  for (i = 0; i < 32768; ++i) {
    x = (i & 43690) >> 1 | (i & 21845) << 1;
    x = (x & 52428) >> 2 | (x & 13107) << 2;
    x = (x & 61680) >> 4 | (x & 3855) << 4;
    rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
  }
  var x;
  var i;
  var hMap = (function(cd, mb, r) {
    var s = cd.length;
    var i2 = 0;
    var l = new u16(mb);
    for (; i2 < s; ++i2) {
      if (cd[i2])
        ++l[cd[i2] - 1];
    }
    var le = new u16(mb);
    for (i2 = 1; i2 < mb; ++i2) {
      le[i2] = le[i2 - 1] + l[i2 - 1] << 1;
    }
    var co;
    if (r) {
      co = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          var sv = i2 << 4 | cd[i2];
          var r_1 = mb - cd[i2];
          var v = le[cd[i2] - 1]++ << r_1;
          for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
            co[rev[v] >> rvb] = sv;
          }
        }
      }
    } else {
      co = new u16(s);
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          co[i2] = rev[le[cd[i2] - 1]++] >> 15 - cd[i2];
        }
      }
    }
    return co;
  });
  var flt = new u8(288);
  for (i = 0; i < 144; ++i)
    flt[i] = 8;
  var i;
  for (i = 144; i < 256; ++i)
    flt[i] = 9;
  var i;
  for (i = 256; i < 280; ++i)
    flt[i] = 7;
  var i;
  for (i = 280; i < 288; ++i)
    flt[i] = 8;
  var i;
  var fdt = new u8(32);
  for (i = 0; i < 32; ++i)
    fdt[i] = 5;
  var i;
  var flm = /* @__PURE__ */ hMap(flt, 9, 0);
  var fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
  var shft = function(p) {
    return (p + 7) / 8 | 0;
  };
  var slc = function(v, s, e) {
    if (s == null || s < 0)
      s = 0;
    if (e == null || e > v.length)
      e = v.length;
    return new u8(v.subarray(s, e));
  };
  var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    // determined by compression function
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
    // determined by unknown compression method
  ];
  var err = function(ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e, err);
    if (!nt)
      throw e;
    return e;
  };
  var wbits = function(d, p, v) {
    v <<= p & 7;
    var o = p / 8 | 0;
    d[o] |= v;
    d[o + 1] |= v >> 8;
  };
  var wbits16 = function(d, p, v) {
    v <<= p & 7;
    var o = p / 8 | 0;
    d[o] |= v;
    d[o + 1] |= v >> 8;
    d[o + 2] |= v >> 16;
  };
  var hTree = function(d, mb) {
    var t = [];
    for (var i2 = 0; i2 < d.length; ++i2) {
      if (d[i2])
        t.push({ s: i2, f: d[i2] });
    }
    var s = t.length;
    var t2 = t.slice();
    if (!s)
      return { t: et, l: 0 };
    if (s == 1) {
      var v = new u8(t[0].s + 1);
      v[t[0].s] = 1;
      return { t: v, l: 1 };
    }
    t.sort(function(a, b) {
      return a.f - b.f;
    });
    t.push({ s: -1, f: 25001 });
    var l = t[0], r = t[1], i0 = 0, i1 = 1, i22 = 2;
    t[0] = { s: -1, f: l.f + r.f, l, r };
    while (i1 != s - 1) {
      l = t[t[i0].f < t[i22].f ? i0++ : i22++];
      r = t[i0 != i1 && t[i0].f < t[i22].f ? i0++ : i22++];
      t[i1++] = { s: -1, f: l.f + r.f, l, r };
    }
    var maxSym = t2[0].s;
    for (var i2 = 1; i2 < s; ++i2) {
      if (t2[i2].s > maxSym)
        maxSym = t2[i2].s;
    }
    var tr = new u16(maxSym + 1);
    var mbt = ln(t[i1 - 1], tr, 0);
    if (mbt > mb) {
      var i2 = 0, dt = 0;
      var lft = mbt - mb, cst = 1 << lft;
      t2.sort(function(a, b) {
        return tr[b.s] - tr[a.s] || a.f - b.f;
      });
      for (; i2 < s; ++i2) {
        var i2_1 = t2[i2].s;
        if (tr[i2_1] > mb) {
          dt += cst - (1 << mbt - tr[i2_1]);
          tr[i2_1] = mb;
        } else
          break;
      }
      dt >>= lft;
      while (dt > 0) {
        var i2_2 = t2[i2].s;
        if (tr[i2_2] < mb)
          dt -= 1 << mb - tr[i2_2]++ - 1;
        else
          ++i2;
      }
      for (; i2 >= 0 && dt; --i2) {
        var i2_3 = t2[i2].s;
        if (tr[i2_3] == mb) {
          --tr[i2_3];
          ++dt;
        }
      }
      mbt = mb;
    }
    return { t: new u8(tr), l: mbt };
  };
  var ln = function(n, l, d) {
    return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
  };
  var lc = function(c) {
    var s = c.length;
    while (s && !c[--s])
      ;
    var cl = new u16(++s);
    var cli = 0, cln = c[0], cls = 1;
    var w = function(v) {
      cl[cli++] = v;
    };
    for (var i2 = 1; i2 <= s; ++i2) {
      if (c[i2] == cln && i2 != s)
        ++cls;
      else {
        if (!cln && cls > 2) {
          for (; cls > 138; cls -= 138)
            w(32754);
          if (cls > 2) {
            w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
            cls = 0;
          }
        } else if (cls > 3) {
          w(cln), --cls;
          for (; cls > 6; cls -= 6)
            w(8304);
          if (cls > 2)
            w(cls - 3 << 5 | 8208), cls = 0;
        }
        while (cls--)
          w(cln);
        cls = 1;
        cln = c[i2];
      }
    }
    return { c: cl.subarray(0, cli), n: s };
  };
  var clen = function(cf, cl) {
    var l = 0;
    for (var i2 = 0; i2 < cl.length; ++i2)
      l += cf[i2] * cl[i2];
    return l;
  };
  var wfblk = function(out, pos, dat) {
    var s = dat.length;
    var o = shft(pos + 2);
    out[o] = s & 255;
    out[o + 1] = s >> 8;
    out[o + 2] = out[o] ^ 255;
    out[o + 3] = out[o + 1] ^ 255;
    for (var i2 = 0; i2 < s; ++i2)
      out[o + i2 + 4] = dat[i2];
    return (o + 4 + s) * 8;
  };
  var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
    wbits(out, p++, final);
    ++lf[256];
    var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
    var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
    var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
    var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
    var lcfreq = new u16(19);
    for (var i2 = 0; i2 < lclt.length; ++i2)
      ++lcfreq[lclt[i2] & 31];
    for (var i2 = 0; i2 < lcdt.length; ++i2)
      ++lcfreq[lcdt[i2] & 31];
    var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
    var nlcc = 19;
    for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
      ;
    var flen = bl + 5 << 3;
    var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
    var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
    if (bs >= 0 && flen <= ftlen && flen <= dtlen)
      return wfblk(out, p, dat.subarray(bs, bs + bl));
    var lm, ll, dm, dl;
    wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
    if (dtlen < ftlen) {
      lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
      var llm = hMap(lct, mlcb, 0);
      wbits(out, p, nlc - 257);
      wbits(out, p + 5, ndc - 1);
      wbits(out, p + 10, nlcc - 4);
      p += 14;
      for (var i2 = 0; i2 < nlcc; ++i2)
        wbits(out, p + 3 * i2, lct[clim[i2]]);
      p += 3 * nlcc;
      var lcts = [lclt, lcdt];
      for (var it = 0; it < 2; ++it) {
        var clct = lcts[it];
        for (var i2 = 0; i2 < clct.length; ++i2) {
          var len = clct[i2] & 31;
          wbits(out, p, llm[len]), p += lct[len];
          if (len > 15)
            wbits(out, p, clct[i2] >> 5 & 127), p += clct[i2] >> 12;
        }
      }
    } else {
      lm = flm, ll = flt, dm = fdm, dl = fdt;
    }
    for (var i2 = 0; i2 < li; ++i2) {
      var sym = syms[i2];
      if (sym > 255) {
        var len = sym >> 18 & 31;
        wbits16(out, p, lm[len + 257]), p += ll[len + 257];
        if (len > 7)
          wbits(out, p, sym >> 23 & 31), p += fleb[len];
        var dst = sym & 31;
        wbits16(out, p, dm[dst]), p += dl[dst];
        if (dst > 3)
          wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
      } else {
        wbits16(out, p, lm[sym]), p += ll[sym];
      }
    }
    wbits16(out, p, lm[256]);
    return p + ll[256];
  };
  var deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
  var et = /* @__PURE__ */ new u8(0);
  var dflt = function(dat, lvl, plvl, pre, post, st) {
    var s = st.z || dat.length;
    var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
    var w = o.subarray(pre, o.length - post);
    var lst = st.l;
    var pos = (st.r || 0) & 7;
    if (lvl) {
      if (pos)
        w[0] = st.r >> 3;
      var opt = deo[lvl - 1];
      var n = opt >> 13, c = opt & 8191;
      var msk_1 = (1 << plvl) - 1;
      var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
      var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
      var hsh = function(i3) {
        return (dat[i3] ^ dat[i3 + 1] << bs1_1 ^ dat[i3 + 2] << bs2_1) & msk_1;
      };
      var syms = new i32(25e3);
      var lf = new u16(288), df = new u16(32);
      var lc_1 = 0, eb = 0, i2 = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
      for (; i2 + 2 < s; ++i2) {
        var hv = hsh(i2);
        var imod = i2 & 32767, pimod = head[hv];
        prev[imod] = pimod;
        head[hv] = imod;
        if (wi <= i2) {
          var rem = s - i2;
          if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
            pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i2 - bs, pos);
            li = lc_1 = eb = 0, bs = i2;
            for (var j = 0; j < 286; ++j)
              lf[j] = 0;
            for (var j = 0; j < 30; ++j)
              df[j] = 0;
          }
          var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
          if (rem > 2 && hv == hsh(i2 - dif)) {
            var maxn = Math.min(n, rem) - 1;
            var maxd = Math.min(32767, i2);
            var ml = Math.min(258, rem);
            while (dif <= maxd && --ch_1 && imod != pimod) {
              if (dat[i2 + l] == dat[i2 + l - dif]) {
                var nl = 0;
                for (; nl < ml && dat[i2 + nl] == dat[i2 + nl - dif]; ++nl)
                  ;
                if (nl > l) {
                  l = nl, d = dif;
                  if (nl > maxn)
                    break;
                  var mmd = Math.min(dif, nl - 2);
                  var md = 0;
                  for (var j = 0; j < mmd; ++j) {
                    var ti = i2 - dif + j & 32767;
                    var pti = prev[ti];
                    var cd = ti - pti & 32767;
                    if (cd > md)
                      md = cd, pimod = ti;
                  }
                }
              }
              imod = pimod, pimod = prev[imod];
              dif += imod - pimod & 32767;
            }
          }
          if (d) {
            syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
            var lin = revfl[l] & 31, din = revfd[d] & 31;
            eb += fleb[lin] + fdeb[din];
            ++lf[257 + lin];
            ++df[din];
            wi = i2 + l;
            ++lc_1;
          } else {
            syms[li++] = dat[i2];
            ++lf[dat[i2]];
          }
        }
      }
      for (i2 = Math.max(i2, wi); i2 < s; ++i2) {
        syms[li++] = dat[i2];
        ++lf[dat[i2]];
      }
      pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i2 - bs, pos);
      if (!lst) {
        st.r = pos & 7 | w[pos / 8 | 0] << 3;
        pos -= 7;
        st.h = head, st.p = prev, st.i = i2, st.w = wi;
      }
    } else {
      for (var i2 = st.w || 0; i2 < s + lst; i2 += 65535) {
        var e = i2 + 65535;
        if (e >= s) {
          w[pos / 8 | 0] = lst;
          e = s;
        }
        pos = wfblk(w, pos + 1, dat.subarray(i2, e));
      }
      st.i = s;
    }
    return slc(o, 0, pre + shft(pos) + post);
  };
  var crct = /* @__PURE__ */ (function() {
    var t = new Int32Array(256);
    for (var i2 = 0; i2 < 256; ++i2) {
      var c = i2, k = 9;
      while (--k)
        c = (c & 1 && -306674912) ^ c >>> 1;
      t[i2] = c;
    }
    return t;
  })();
  var crc = function() {
    var c = -1;
    return {
      p: function(d) {
        var cr = c;
        for (var i2 = 0; i2 < d.length; ++i2)
          cr = crct[cr & 255 ^ d[i2]] ^ cr >>> 8;
        c = cr;
      },
      d: function() {
        return ~c;
      }
    };
  };
  var dopt = function(dat, opt, pre, post, st) {
    if (!st) {
      st = { l: 1 };
      if (opt.dictionary) {
        var dict = opt.dictionary.subarray(-32768);
        var newDat = new u8(dict.length + dat.length);
        newDat.set(dict);
        newDat.set(dat, dict.length);
        dat = newDat;
        st.w = dict.length;
      }
    }
    return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
  };
  var mrg = function(a, b) {
    var o = {};
    for (var k in a)
      o[k] = a[k];
    for (var k in b)
      o[k] = b[k];
    return o;
  };
  var wbytes = function(d, b, v) {
    for (; v; ++b)
      d[b] = v, v >>>= 8;
  };
  function deflateSync(data, opts) {
    return dopt(data, opts || {}, 0, 0);
  }
  var fltn = function(d, p, t, o) {
    for (var k in d) {
      var val = d[k], n = p + k, op = o;
      if (Array.isArray(val))
        op = mrg(o, val[1]), val = val[0];
      if (ArrayBuffer.isView(val))
        t[n] = [val, op];
      else {
        t[n += "/"] = [new u8(0), op];
        fltn(val, n, t, o);
      }
    }
  };
  var te2 = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  var tds = 0;
  try {
    td.decode(et, { stream: true });
    tds = 1;
  } catch (e) {
  }
  function strToU8(str, latin1) {
    if (latin1) {
      var ar_1 = new u8(str.length);
      for (var i2 = 0; i2 < str.length; ++i2)
        ar_1[i2] = str.charCodeAt(i2);
      return ar_1;
    }
    if (te2)
      return te2.encode(str);
    var l = str.length;
    var ar = new u8(str.length + (str.length >> 1));
    var ai = 0;
    var w = function(v) {
      ar[ai++] = v;
    };
    for (var i2 = 0; i2 < l; ++i2) {
      if (ai + 5 > ar.length) {
        var n = new u8(ai + 8 + (l - i2 << 1));
        n.set(ar);
        ar = n;
      }
      var c = str.charCodeAt(i2);
      if (c < 128 || latin1)
        w(c);
      else if (c < 2048)
        w(192 | c >> 6), w(128 | c & 63);
      else if (c > 55295 && c < 57344)
        c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i2) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
      else
        w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
    }
    return slc(ar, 0, ai);
  }
  var exfl = function(ex) {
    var le = 0;
    if (ex) {
      for (var k in ex) {
        var l = ex[k].length;
        if (l > 65535)
          err(9);
        le += l + 4;
      }
    }
    return le;
  };
  var wzh = function(d, b, f, fn, u, c, ce, co) {
    var fl2 = fn.length, ex = f.extra, col = co && co.length;
    var exl = exfl(ex);
    wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
    if (ce != null)
      d[b++] = 20, d[b++] = f.os;
    d[b] = 20, b += 2;
    d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
    d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
    var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
    if (y < 0 || y > 119)
      err(10);
    wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b += 4;
    if (c != -1) {
      wbytes(d, b, f.crc);
      wbytes(d, b + 4, c < 0 ? -c - 2 : c);
      wbytes(d, b + 8, f.size);
    }
    wbytes(d, b + 12, fl2);
    wbytes(d, b + 14, exl), b += 16;
    if (ce != null) {
      wbytes(d, b, col);
      wbytes(d, b + 6, f.attrs);
      wbytes(d, b + 10, ce), b += 14;
    }
    d.set(fn, b);
    b += fl2;
    if (exl) {
      for (var k in ex) {
        var exf = ex[k], l = exf.length;
        wbytes(d, b, +k);
        wbytes(d, b + 2, l);
        d.set(exf, b + 4), b += 4 + l;
      }
    }
    if (col)
      d.set(co, b), b += col;
    return b;
  };
  var wzf = function(o, b, c, d, e) {
    wbytes(o, b, 101010256);
    wbytes(o, b + 8, c);
    wbytes(o, b + 10, c);
    wbytes(o, b + 12, d);
    wbytes(o, b + 16, e);
  };
  function zipSync(data, opts) {
    if (!opts)
      opts = {};
    var r = {};
    var files = [];
    fltn(data, "", r, opts);
    var o = 0;
    var tot = 0;
    for (var fn in r) {
      var _a2 = r[fn], file = _a2[0], p = _a2[1];
      var compression = p.level == 0 ? 0 : 8;
      var f = strToU8(fn), s = f.length;
      var com = p.comment, m = com && strToU8(com), ms = m && m.length;
      var exl = exfl(p.extra);
      if (s > 65535)
        err(11);
      var d = compression ? deflateSync(file, p) : file, l = d.length;
      var c = crc();
      c.p(file);
      files.push(mrg(p, {
        size: file.length,
        crc: c.d(),
        c: d,
        f,
        m,
        u: s != fn.length || m && com.length != ms,
        o,
        compression
      }));
      o += 30 + s + exl + l;
      tot += 76 + 2 * (s + exl) + (ms || 0) + l;
    }
    var out = new u8(tot + 22), oe = o, cdl = tot - o;
    for (var i2 = 0; i2 < files.length; ++i2) {
      var f = files[i2];
      wzh(out, f.o, f, f.f, f.u, f.c.length);
      var badd = 30 + f.f.length + exfl(f.extra);
      out.set(f.c, f.o + badd);
      wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
    }
    wzf(out, o, files.length, cdl, oe);
    return out;
  }

  // node_modules/ankipack/dist/generated/anki/cards_pb.js
  var file_anki_cards = /* @__PURE__ */ fileDesc("ChBhbmtpL2NhcmRzLnByb3RvEgphbmtpLmNhcmRzIhUKBkNhcmRJZBILCgNjaWQYASABKAMiFwoHQ2FyZElkcxIMCgRjaWRzGAEgAygDItkECgRDYXJkEgoKAmlkGAEgASgDEg8KB25vdGVfaWQYAiABKAMSDwoHZGVja19pZBgDIAEoAxIUCgx0ZW1wbGF0ZV9pZHgYBCABKA0SEgoKbXRpbWVfc2VjcxgFIAEoAxILCgN1c24YBiABKBESDQoFY3R5cGUYByABKA0SDQoFcXVldWUYCCABKBESCwoDZHVlGAkgASgREhAKCGludGVydmFsGAogASgNEhMKC2Vhc2VfZmFjdG9yGAsgASgNEgwKBHJlcHMYDCABKA0SDgoGbGFwc2VzGA0gASgNEhcKD3JlbWFpbmluZ19zdGVwcxgOIAEoDRIUCgxvcmlnaW5hbF9kdWUYDyABKBESGAoQb3JpZ2luYWxfZGVja19pZBgQIAEoAxINCgVmbGFncxgRIAEoDRIeChFvcmlnaW5hbF9wb3NpdGlvbhgSIAEoDUgAiAEBEjYKDG1lbW9yeV9zdGF0ZRgUIAEoCzIbLmFua2kuY2FyZHMuRnNyc01lbW9yeVN0YXRlSAGIAQESHgoRZGVzaXJlZF9yZXRlbnRpb24YFSABKAJIAogBARISCgVkZWNheRgWIAEoAkgDiAEBEiIKFWxhc3RfcmV2aWV3X3RpbWVfc2VjcxgXIAEoA0gEiAEBEhMKC2N1c3RvbV9kYXRhGBMgASgJQhQKEl9vcmlnaW5hbF9wb3NpdGlvbkIPCg1fbWVtb3J5X3N0YXRlQhQKEl9kZXNpcmVkX3JldGVudGlvbkIICgZfZGVjYXlCGAoWX2xhc3RfcmV2aWV3X3RpbWVfc2VjcyI4Cg9Gc3JzTWVtb3J5U3RhdGUSEQoJc3RhYmlsaXR5GAEgASgCEhIKCmRpZmZpY3VsdHkYAiABKAIiTgoSVXBkYXRlQ2FyZHNSZXF1ZXN0Eh8KBWNhcmRzGAEgAygLMhAuYW5raS5jYXJkcy5DYXJkEhcKD3NraXBfdW5kb19lbnRyeRgCIAEoCCImChJSZW1vdmVDYXJkc1JlcXVlc3QSEAoIY2FyZF9pZHMYASADKAMiMwoOU2V0RGVja1JlcXVlc3QSEAoIY2FyZF9pZHMYASADKAMSDwoHZGVja19pZBgCIAEoAyIwCg5TZXRGbGFnUmVxdWVzdBIQCghjYXJkX2lkcxgBIAMoAxIMCgRmbGFnGAIgASgNQgJQAWIGcHJvdG8z", [file_anki_collection]);

  // node_modules/ankipack/dist/generated/anki/notes_pb.js
  var file_anki_notes = /* @__PURE__ */ fileDesc("ChBhbmtpL25vdGVzLnByb3RvEgphbmtpLm5vdGVzIhUKBk5vdGVJZBILCgNuaWQYASABKAMiGwoHTm90ZUlkcxIQCghub3RlX2lkcxgBIAMoAyJ0CgROb3RlEgoKAmlkGAEgASgDEgwKBGd1aWQYAiABKAkSEwoLbm90ZXR5cGVfaWQYAyABKAMSEgoKbXRpbWVfc2VjcxgEIAEoDRILCgN1c24YBSABKAUSDAoEdGFncxgGIAMoCRIOCgZmaWVsZHMYByADKAkiQQoOQWRkTm90ZVJlcXVlc3QSHgoEbm90ZRgBIAEoCzIQLmFua2kubm90ZXMuTm90ZRIPCgdkZWNrX2lkGAIgASgDIlgKD0FkZE5vdGVSZXNwb25zZRI0CgdjaGFuZ2VzGAEgASgLMiMuYW5raS5jb2xsZWN0aW9uLk9wQ2hhbmdlc1dpdGhDb3VudBIPCgdub3RlX2lkGAIgASgDIj8KD0FkZE5vdGVzUmVxdWVzdBIsCghyZXF1ZXN0cxgBIAMoCzIaLmFua2kubm90ZXMuQWRkTm90ZVJlcXVlc3QiTQoQQWRkTm90ZXNSZXNwb25zZRIrCgdjaGFuZ2VzGAEgASgLMhouYW5raS5jb2xsZWN0aW9uLk9wQ2hhbmdlcxIMCgRuaWRzGAIgAygDIk4KElVwZGF0ZU5vdGVzUmVxdWVzdBIfCgVub3RlcxgBIAMoCzIQLmFua2kubm90ZXMuTm90ZRIXCg9za2lwX3VuZG9fZW50cnkYAiABKAgiRAoYRGVmYXVsdHNGb3JBZGRpbmdSZXF1ZXN0EigKIGhvbWVfZGVja19vZl9jdXJyZW50X3Jldmlld19jYXJkGAEgASgDIjcKD0RlY2tBbmROb3RldHlwZRIPCgdkZWNrX2lkGAEgASgDEhMKC25vdGV0eXBlX2lkGAIgASgDIjgKElJlbW92ZU5vdGVzUmVxdWVzdBIQCghub3RlX2lkcxgBIAMoAxIQCghjYXJkX2lkcxgCIAMoAyItChpDbG96ZU51bWJlcnNJbk5vdGVSZXNwb25zZRIPCgdudW1iZXJzGAEgAygNIlwKF0FmdGVyTm90ZVVwZGF0ZXNSZXF1ZXN0EgwKBG5pZHMYASADKAMSGwoTbWFya19ub3Rlc19tb2RpZmllZBgCIAEoCBIWCg5nZW5lcmF0ZV9jYXJkcxgDIAEoCCIpChlGaWVsZE5hbWVzRm9yTm90ZXNSZXF1ZXN0EgwKBG5pZHMYASADKAMiLAoaRmllbGROYW1lc0Zvck5vdGVzUmVzcG9uc2USDgoGZmllbGRzGAEgAygJIsIBChdOb3RlRmllbGRzQ2hlY2tSZXNwb25zZRI4CgVzdGF0ZRgBIAEoDjIpLmFua2kubm90ZXMuTm90ZUZpZWxkc0NoZWNrUmVzcG9uc2UuU3RhdGUibQoFU3RhdGUSCgoGTk9STUFMEAASCQoFRU1QVFkQARINCglEVVBMSUNBVEUQAhIRCg1NSVNTSU5HX0NMT1pFEAMSFgoSTk9URVRZUEVfTk9UX0NMT1pFEAQSEwoPRklFTERfTk9UX0NMT1pFEAVCAlABYgZwcm90bzM", [file_anki_notetypes, file_anki_collection, file_anki_decks, file_anki_cards]);
  var NoteFieldsCheckResponse_State;
  (function(NoteFieldsCheckResponse_State2) {
    NoteFieldsCheckResponse_State2[NoteFieldsCheckResponse_State2["NORMAL"] = 0] = "NORMAL";
    NoteFieldsCheckResponse_State2[NoteFieldsCheckResponse_State2["EMPTY"] = 1] = "EMPTY";
    NoteFieldsCheckResponse_State2[NoteFieldsCheckResponse_State2["DUPLICATE"] = 2] = "DUPLICATE";
    NoteFieldsCheckResponse_State2[NoteFieldsCheckResponse_State2["MISSING_CLOZE"] = 3] = "MISSING_CLOZE";
    NoteFieldsCheckResponse_State2[NoteFieldsCheckResponse_State2["NOTETYPE_NOT_CLOZE"] = 4] = "NOTETYPE_NOT_CLOZE";
    NoteFieldsCheckResponse_State2[NoteFieldsCheckResponse_State2["FIELD_NOT_CLOZE"] = 5] = "FIELD_NOT_CLOZE";
  })(NoteFieldsCheckResponse_State || (NoteFieldsCheckResponse_State = {}));

  // node_modules/ankipack/dist/generated/anki/import_export_pb.js
  var file_anki_import_export = /* @__PURE__ */ fileDesc("ChhhbmtpL2ltcG9ydF9leHBvcnQucHJvdG8SEmFua2kuaW1wb3J0X2V4cG9ydCJvCh5JbXBvcnRDb2xsZWN0aW9uUGFja2FnZVJlcXVlc3QSEAoIY29sX3BhdGgYASABKAkSEwoLYmFja3VwX3BhdGgYAiABKAkSFAoMbWVkaWFfZm9sZGVyGAMgASgJEhAKCG1lZGlhX2RiGAQgASgJIlkKHkV4cG9ydENvbGxlY3Rpb25QYWNrYWdlUmVxdWVzdBIQCghvdXRfcGF0aBgBIAEoCRIVCg1pbmNsdWRlX21lZGlhGAIgASgIEg4KBmxlZ2FjeRgDIAEoCCKDAgoYSW1wb3J0QW5raVBhY2thZ2VPcHRpb25zEhcKD21lcmdlX25vdGV0eXBlcxgBIAEoCBJKCgx1cGRhdGVfbm90ZXMYAiABKA4yNC5hbmtpLmltcG9ydF9leHBvcnQuSW1wb3J0QW5raVBhY2thZ2VVcGRhdGVDb25kaXRpb24STgoQdXBkYXRlX25vdGV0eXBlcxgDIAEoDjI0LmFua2kuaW1wb3J0X2V4cG9ydC5JbXBvcnRBbmtpUGFja2FnZVVwZGF0ZUNvbmRpdGlvbhIXCg93aXRoX3NjaGVkdWxpbmcYBCABKAgSGQoRd2l0aF9kZWNrX2NvbmZpZ3MYBSABKAgibwoYSW1wb3J0QW5raVBhY2thZ2VSZXF1ZXN0EhQKDHBhY2thZ2VfcGF0aBgBIAEoCRI9CgdvcHRpb25zGAIgASgLMiwuYW5raS5pbXBvcnRfZXhwb3J0LkltcG9ydEFua2lQYWNrYWdlT3B0aW9ucyKEBgoOSW1wb3J0UmVzcG9uc2USKwoHY2hhbmdlcxgBIAEoCzIaLmFua2kuY29sbGVjdGlvbi5PcENoYW5nZXMSMwoDbG9nGAIgASgLMiYuYW5raS5pbXBvcnRfZXhwb3J0LkltcG9ydFJlc3BvbnNlLkxvZxo2CgROb3RlEh4KAmlkGAEgASgLMhIuYW5raS5ub3Rlcy5Ob3RlSWQSDgoGZmllbGRzGAIgAygJGtcECgNMb2cSNAoDbmV3GAEgAygLMicuYW5raS5pbXBvcnRfZXhwb3J0LkltcG9ydFJlc3BvbnNlLk5vdGUSOAoHdXBkYXRlZBgCIAMoCzInLmFua2kuaW1wb3J0X2V4cG9ydC5JbXBvcnRSZXNwb25zZS5Ob3RlEjoKCWR1cGxpY2F0ZRgDIAMoCzInLmFua2kuaW1wb3J0X2V4cG9ydC5JbXBvcnRSZXNwb25zZS5Ob3RlEjwKC2NvbmZsaWN0aW5nGAQgAygLMicuYW5raS5pbXBvcnRfZXhwb3J0LkltcG9ydFJlc3BvbnNlLk5vdGUSQgoRZmlyc3RfZmllbGRfbWF0Y2gYBSADKAsyJy5hbmtpLmltcG9ydF9leHBvcnQuSW1wb3J0UmVzcG9uc2UuTm90ZRJBChBtaXNzaW5nX25vdGV0eXBlGAYgAygLMicuYW5raS5pbXBvcnRfZXhwb3J0LkltcG9ydFJlc3BvbnNlLk5vdGUSPQoMbWlzc2luZ19kZWNrGAcgAygLMicuYW5raS5pbXBvcnRfZXhwb3J0LkltcG9ydFJlc3BvbnNlLk5vdGUSQgoRZW1wdHlfZmlyc3RfZmllbGQYCCADKAsyJy5hbmtpLmltcG9ydF9leHBvcnQuSW1wb3J0UmVzcG9uc2UuTm90ZRJHCg9kdXBlX3Jlc29sdXRpb24YCSABKA4yLi5hbmtpLmltcG9ydF9leHBvcnQuQ3N2TWV0YWRhdGEuRHVwZVJlc29sdXRpb24SEwoLZm91bmRfbm90ZXMYCiABKA0imwEKGEV4cG9ydEFua2lQYWNrYWdlUmVxdWVzdBIQCghvdXRfcGF0aBgBIAEoCRI9CgdvcHRpb25zGAIgASgLMiwuYW5raS5pbXBvcnRfZXhwb3J0LkV4cG9ydEFua2lQYWNrYWdlT3B0aW9ucxIuCgVsaW1pdBgDIAEoCzIfLmFua2kuaW1wb3J0X2V4cG9ydC5FeHBvcnRMaW1pdCJyChhFeHBvcnRBbmtpUGFja2FnZU9wdGlvbnMSFwoPd2l0aF9zY2hlZHVsaW5nGAEgASgIEhkKEXdpdGhfZGVja19jb25maWdzGAIgASgIEhIKCndpdGhfbWVkaWEYAyABKAgSDgoGbGVnYWN5GAQgASgIIq8BCg9QYWNrYWdlTWV0YWRhdGESPAoHdmVyc2lvbhgBIAEoDjIrLmFua2kuaW1wb3J0X2V4cG9ydC5QYWNrYWdlTWV0YWRhdGEuVmVyc2lvbiJeCgdWZXJzaW9uEhMKD1ZFUlNJT05fVU5LTk9XThAAEhQKEFZFUlNJT05fTEVHQUNZXzEQARIUChBWRVJTSU9OX0xFR0FDWV8yEAISEgoOVkVSU0lPTl9MQVRFU1QQAyK/AQoMTWVkaWFFbnRyaWVzEjwKB2VudHJpZXMYASADKAsyKy5hbmtpLmltcG9ydF9leHBvcnQuTWVkaWFFbnRyaWVzLk1lZGlhRW50cnkacQoKTWVkaWFFbnRyeRIMCgRuYW1lGAEgASgJEgwKBHNpemUYAiABKA0SDAoEc2hhMRgDIAEoDBIhChNsZWdhY3lfemlwX2ZpbGVuYW1lGP8BIAEoDUgAiAEBQhYKFF9sZWdhY3lfemlwX2ZpbGVuYW1lIlMKEEltcG9ydENzdlJlcXVlc3QSDAoEcGF0aBgBIAEoCRIxCghtZXRhZGF0YRgCIAEoCzIfLmFua2kuaW1wb3J0X2V4cG9ydC5Dc3ZNZXRhZGF0YSLhAQoSQ3N2TWV0YWRhdGFSZXF1ZXN0EgwKBHBhdGgYASABKAkSQQoJZGVsaW1pdGVyGAIgASgOMikuYW5raS5pbXBvcnRfZXhwb3J0LkNzdk1ldGFkYXRhLkRlbGltaXRlckgAiAEBEhgKC25vdGV0eXBlX2lkGAMgASgDSAGIAQESFAoHZGVja19pZBgEIAEoA0gCiAEBEhQKB2lzX2h0bWwYBSABKAhIA4gBAUIMCgpfZGVsaW1pdGVyQg4KDF9ub3RldHlwZV9pZEIKCghfZGVja19pZEIKCghfaXNfaHRtbCLZBgoLQ3N2TWV0YWRhdGESPAoJZGVsaW1pdGVyGAEgASgOMikuYW5raS5pbXBvcnRfZXhwb3J0LkNzdk1ldGFkYXRhLkRlbGltaXRlchIPCgdpc19odG1sGAIgASgIEhMKC2dsb2JhbF90YWdzGAMgAygJEhQKDHVwZGF0ZWRfdGFncxgEIAMoCRIVCg1jb2x1bW5fbGFiZWxzGAUgAygJEhEKB2RlY2tfaWQYBiABKANIABIVCgtkZWNrX2NvbHVtbhgHIAEoDUgAEhMKCWRlY2tfbmFtZRgRIAEoCUgAEkkKD2dsb2JhbF9ub3RldHlwZRgIIAEoCzIuLmFua2kuaW1wb3J0X2V4cG9ydC5Dc3ZNZXRhZGF0YS5NYXBwZWROb3RldHlwZUgBEhkKD25vdGV0eXBlX2NvbHVtbhgJIAEoDUgBEhMKC3RhZ3NfY29sdW1uGAogASgNEhcKD2ZvcmNlX2RlbGltaXRlchgLIAEoCBIVCg1mb3JjZV9pc19odG1sGAwgASgIEikKB3ByZXZpZXcYDSADKAsyGC5hbmtpLmdlbmVyaWMuU3RyaW5nTGlzdBITCgtndWlkX2NvbHVtbhgOIAEoDRJHCg9kdXBlX3Jlc29sdXRpb24YDyABKA4yLi5hbmtpLmltcG9ydF9leHBvcnQuQ3N2TWV0YWRhdGEuRHVwZVJlc29sdXRpb24SPwoLbWF0Y2hfc2NvcGUYECABKA4yKi5hbmtpLmltcG9ydF9leHBvcnQuQ3N2TWV0YWRhdGEuTWF0Y2hTY29wZRozCg5NYXBwZWROb3RldHlwZRIKCgJpZBgBIAEoAxIVCg1maWVsZF9jb2x1bW5zGAIgAygNIjkKDkR1cGVSZXNvbHV0aW9uEgoKBlVQREFURRAAEgwKCFBSRVNFUlZFEAESDQoJRFVQTElDQVRFEAIiTgoJRGVsaW1pdGVyEgcKA1RBQhAAEggKBFBJUEUQARINCglTRU1JQ09MT04QAhIJCgVDT0xPThADEgkKBUNPTU1BEAQSCQoFU1BBQ0UQBSIxCgpNYXRjaFNjb3BlEgwKCE5PVEVUWVBFEAASFQoRTk9URVRZUEVfQU5EX0RFQ0sQAUIGCgRkZWNrQgoKCG5vdGV0eXBlImsKFEV4cG9ydENhcmRDc3ZSZXF1ZXN0EhAKCG91dF9wYXRoGAEgASgJEhEKCXdpdGhfaHRtbBgCIAEoCBIuCgVsaW1pdBgDIAEoCzIfLmFua2kuaW1wb3J0X2V4cG9ydC5FeHBvcnRMaW1pdCK7AQoURXhwb3J0Tm90ZUNzdlJlcXVlc3QSEAoIb3V0X3BhdGgYASABKAkSEQoJd2l0aF9odG1sGAIgASgIEhEKCXdpdGhfdGFncxgDIAEoCBIRCgl3aXRoX2RlY2sYBCABKAgSFQoNd2l0aF9ub3RldHlwZRgFIAEoCBIRCgl3aXRoX2d1aWQYBiABKAgSLgoFbGltaXQYByABKAsyHy5hbmtpLmltcG9ydF9leHBvcnQuRXhwb3J0TGltaXQirAEKC0V4cG9ydExpbWl0Ei8KEHdob2xlX2NvbGxlY3Rpb24YASABKAsyEy5hbmtpLmdlbmVyaWMuRW1wdHlIABIRCgdkZWNrX2lkGAIgASgDSAASJwoIbm90ZV9pZHMYAyABKAsyEy5hbmtpLm5vdGVzLk5vdGVJZHNIABInCghjYXJkX2lkcxgEIAEoCzITLmFua2kuY2FyZHMuQ2FyZElkc0gAQgcKBWxpbWl0KrYBCiBJbXBvcnRBbmtpUGFja2FnZVVwZGF0ZUNvbmRpdGlvbhIxCi1JTVBPUlRfQU5LSV9QQUNLQUdFX1VQREFURV9DT05ESVRJT05fSUZfTkVXRVIQABIvCitJTVBPUlRfQU5LSV9QQUNLQUdFX1VQREFURV9DT05ESVRJT05fQUxXQVlTEAESLgoqSU1QT1JUX0FOS0lfUEFDS0FHRV9VUERBVEVfQ09ORElUSU9OX05FVkVSEAJCAlABYgZwcm90bzM", [file_anki_cards, file_anki_collection, file_anki_notes, file_anki_generic]);
  var PackageMetadataSchema = /* @__PURE__ */ messageDesc(file_anki_import_export, 7);
  var PackageMetadata_Version;
  (function(PackageMetadata_Version2) {
    PackageMetadata_Version2[PackageMetadata_Version2["UNKNOWN"] = 0] = "UNKNOWN";
    PackageMetadata_Version2[PackageMetadata_Version2["LEGACY_1"] = 1] = "LEGACY_1";
    PackageMetadata_Version2[PackageMetadata_Version2["LEGACY_2"] = 2] = "LEGACY_2";
    PackageMetadata_Version2[PackageMetadata_Version2["LATEST"] = 3] = "LATEST";
  })(PackageMetadata_Version || (PackageMetadata_Version = {}));
  var MediaEntriesSchema = /* @__PURE__ */ messageDesc(file_anki_import_export, 8);
  var CsvMetadata_DupeResolution;
  (function(CsvMetadata_DupeResolution2) {
    CsvMetadata_DupeResolution2[CsvMetadata_DupeResolution2["UPDATE"] = 0] = "UPDATE";
    CsvMetadata_DupeResolution2[CsvMetadata_DupeResolution2["PRESERVE"] = 1] = "PRESERVE";
    CsvMetadata_DupeResolution2[CsvMetadata_DupeResolution2["DUPLICATE"] = 2] = "DUPLICATE";
  })(CsvMetadata_DupeResolution || (CsvMetadata_DupeResolution = {}));
  var CsvMetadata_Delimiter;
  (function(CsvMetadata_Delimiter2) {
    CsvMetadata_Delimiter2[CsvMetadata_Delimiter2["TAB"] = 0] = "TAB";
    CsvMetadata_Delimiter2[CsvMetadata_Delimiter2["PIPE"] = 1] = "PIPE";
    CsvMetadata_Delimiter2[CsvMetadata_Delimiter2["SEMICOLON"] = 2] = "SEMICOLON";
    CsvMetadata_Delimiter2[CsvMetadata_Delimiter2["COLON"] = 3] = "COLON";
    CsvMetadata_Delimiter2[CsvMetadata_Delimiter2["COMMA"] = 4] = "COMMA";
    CsvMetadata_Delimiter2[CsvMetadata_Delimiter2["SPACE"] = 5] = "SPACE";
  })(CsvMetadata_Delimiter || (CsvMetadata_Delimiter = {}));
  var CsvMetadata_MatchScope;
  (function(CsvMetadata_MatchScope2) {
    CsvMetadata_MatchScope2[CsvMetadata_MatchScope2["NOTETYPE"] = 0] = "NOTETYPE";
    CsvMetadata_MatchScope2[CsvMetadata_MatchScope2["NOTETYPE_AND_DECK"] = 1] = "NOTETYPE_AND_DECK";
  })(CsvMetadata_MatchScope || (CsvMetadata_MatchScope = {}));
  var ImportAnkiPackageUpdateCondition;
  (function(ImportAnkiPackageUpdateCondition2) {
    ImportAnkiPackageUpdateCondition2[ImportAnkiPackageUpdateCondition2["IF_NEWER"] = 0] = "IF_NEWER";
    ImportAnkiPackageUpdateCondition2[ImportAnkiPackageUpdateCondition2["ALWAYS"] = 1] = "ALWAYS";
    ImportAnkiPackageUpdateCondition2[ImportAnkiPackageUpdateCondition2["NEVER"] = 2] = "NEVER";
  })(ImportAnkiPackageUpdateCondition || (ImportAnkiPackageUpdateCondition = {}));

  // node_modules/ankipack/dist/util/zstd.js
  var MAGIC = 4247762216;
  var BLOCK_SIZE = 64 * 1024;
  var BLOCK_TYPE_RAW = 0;
  function zstdRawFrame(data) {
    if (data.length > 4294967295) {
      throw new Error(`Cannot write a zstd frame for ${data.length} bytes`);
    }
    const blockCount = Math.max(1, Math.ceil(data.length / BLOCK_SIZE));
    const out = new Uint8Array(4 + 1 + 1 + 4 + blockCount * 3 + data.length);
    const view = new DataView(out.buffer);
    let at = 0;
    view.setUint32(at, MAGIC, true);
    at += 4;
    out[at++] = 128;
    out[at++] = 56;
    view.setUint32(at, data.length, true);
    at += 4;
    for (let i2 = 0; i2 < blockCount; i2++) {
      const start = i2 * BLOCK_SIZE;
      const size = Math.min(BLOCK_SIZE, data.length - start);
      const last = i2 === blockCount - 1 ? 1 : 0;
      const header = size << 3 | BLOCK_TYPE_RAW << 1 | last;
      out[at++] = header & 255;
      out[at++] = header >>> 8 & 255;
      out[at++] = header >>> 16 & 255;
      out.set(data.subarray(start, start + size), at);
      at += size;
    }
    return out.subarray(0, at);
  }

  // node_modules/ankipack/dist/util/unassigned.js
  var UNASSIGNED_RANGES_UNICODE_10 = [
    "378.1,6.3,7.0,1.0,14.0,18d.0,26.1,7.0,27.0,2.1,3.0,37.7,1b.4,5.a,1d.0,f0.0,3c.1,65.d,3b.4,",
    "2e.1,f.0,1c.1,1.0,b.34,15.0,8.15,b0.0,8.1,2.1,16.0,7.0,1.2,4.1,9.1,2.1,4.7,1.3,2.0,5.1,18.2,",
    "3.0,6.3,2.1,16.0,7.0,2.0,2.0,2.1,1.0,5.3,2.1,3.2,1.6,4.0,1.6,10.a,3.0,9.0,3.0,16.0,7.0,2.0,",
    "5.1,a.0,3.0,3.1,1.e,4.1,c.6,7.0,3.0,8.1,2.1,16.0,7.0,2.0,5.1,9.1,2.1,3.7,2.3,2.0,5.1,12.9,",
    "2.0,6.2,3.0,4.2,2.0,1.0,2.2,2.2,3.2,c.3,5.2,3.0,4.1,1.5,1.d,15.4,4.0,8.0,3.0,17.0,10.2,8.0,",
    "3.0,4.6,2.0,3.4,4.1,a.7,c.0,8.0,3.0,17.0,a.0,5.1,9.0,3.0,4.6,2.6,1.0,4.1,a.0,2.c,4.0,8.0,3.0,",
    "33.0,3.0,6.3,10.1,1a.1,2.0,12.2,18.0,9.0,1.1,7.2,1.3,6.0,1.0,8.5,a.1,3.b,3a.3,1d.24,2.0,1.1,",
    "2.0,1.1,1.5,4.0,7.0,3.0,1.0,1.1,2.0,d.0,3.1,5.0,1.0,6.1,a.1,4.1f,48.0,24.3,27.0,24.0,f.0,",
    "d.24,c6.0,1.4,1.1,179.0,4.1,7.0,1.0,4.1,29.0,4.1,21.0,4.1,7.0,1.0,4.1,f.0,39.0,4.1,43.1,20.2,",
    "1a.5,56.1,6.1,29d.2,59.6,d.0,7.a,17.8,14.b,d.0,3.0,2.b,5e.1,a.5,a.5,f.0,a.5,58.7,2b.4,46.9,",
    "1f.0,c.3,c.3,1.2,2a.1,5.a,2c.3,1a.5,b.2,3e.1,41.0,1d.1,b.5,a.5,e.1,f.40,4c.3,2d.2,74.7,3c.2,",
    "f.2,3c.36,8.7,2a.5,fa.0,11b.1,6.1,26.1,6.1,8.0,1.0,1.0,1.0,1f.1,35.0,f.0,e.1,6.0,13.1,3.0,",
    "9.0,65.0,c.1,1b.0,d.2,20.f,21.e,8c.3,297.18,b.14,714.1,20.1,22.2,c.0,9.18,4.f,2f.0,2f.0,94.4,",
    "2d.0,1.4,1.1,38.6,2.d,18.8,7.0,7.0,7.0,7.0,7.0,7.0,7.0,7.0,6a.35,1a.0,59.b,d6.19,c.3,40.0,",
    "56.1,67.4,2a.1,5e.0,2b.4,24.b,2f.0,df.0,1ab6.9,522b.14,48d.2,37.8,15c.13,b8.7,af.0,8.3e,35.3,",
    "a.5,38.7,46.7,c.5,1e.1,54.a,1e.2,4e.0,b.3,21.0,37.8,e.1,a.1,67.17,1c.9,6.1,6.1,6.8,7.0,7.0,",
    "36.9,7e.1,a.5,2ba4.b,17.3,31.3,226e.1,6a.25,7.b,5.4,1a.0,5.0,1.0,2.0,2.0,7c.10,16d.f,40.1,",
    "36.27,e.1,1a.5,33.0,13.0,4.3,5.0,87.1,1.0,be.2,6.1,6.1,6.1,3.2,7.0,7.9,5.1,c.0,1a.0,13.0,2.0,",
    "f.1,e.21,7b.4,3.3,2d.2,58.0,c.3,1.2e,2e.81,1d.2,31.e,1c.3,24.8,1e.4,2b.4,1e.0,25.3,e.29,9e.1,",
    "a.5,24.3,24.3,28.7,34.a,1.8f,137.8,16.9,8.97,6.1,1.0,2c.0,2.2,1.1,17.0,48.7,9.2f,13.0,2.4,",
    "21.2,1b.4,1.3f,38.3,14.1,32.0,2.4,8.0,3.0,1b.3,3.3,9.7,9.6,40.1f,27.3,c.8,36.2,1d.1,1b.4,",
    "1a.6,4.b,7.4f,49.36,33.c,33.6,6.15f,1f.180,4e.3,1e.e,43.d,19.6,a.5,35.0,e.b,27.8,4e.1,10.0,",
    "14.a,12.0,2c.40,7.0,1.0,4.0,f.0,b.5,3b.4,a.5,4.0,8.1,2.1,16.0,7.0,2.0,5.1,9.1,2.1,3.1,1.5,",
    "1.4,7.1,7.2,5.8a,5a.0,1.0,1.21,48.7,a.a5,36.1,26.21,45.a,a.5,d.12,38.7,a.35,1a.2,f.3,10.15f,",
    "53.b,1.ff,48.7,34.1,17.0,5.1c,39.106,9.0,2d.0,e.9,1d.2,20.1,16.0,e.48,7.0,2.0,2c.2,1.0,2.0,",
    "9.7,a.2a5,39a.65,6f.0,5.a,c4.abb,42f.fd0,247.21b8,239.6,1f.0,a.3,2.5f,1e.1,6.9,46.9,a.0,7.0,",
    "15.4,13.36f,45.a,2f.f,11.3f,2.1d,17ed.12,2f3.250c,11f.50,18c.903,6b.4,d.2,9.6,a.1,8.135b,",
    "f6.9,27.1,c0.16,46.b9,57.8,12.8d,55.0,47.0,2.1,1.1,2.1,4.0,c.0,1.0,7.0,41.0,4.1,8.0,7.0,1c.0,",
    "4.0,5.0,1.2,7.0,154.1,124.1,2be.e,5.0,f.54f,7.0,11.1,7.0,2.0,5.7d4,c5.1,10.28,4b.4,a.3,2.49f,",
    "4.0,1b.0,2.0,1.1,1.0,a.0,4.0,1.0,1.5,1.3,1.0,1.0,1.0,3.0,2.0,1.1,1.0,1.0,1.0,1.0,1.0,2.0,1.1,",
    "4.0,7.0,4.0,4.0,1.0,a.0,11.4,3.0,5.0,11.33,2.10d,2c.3,64.b,f.1,f.0,f.0,25.9,d.2,1f.0,3c.3,",
    "3d.38,1d.c,2c.3,9.6,2.d,6.99,3d5.a,d.2,9.6,74.b,55.2a,c.3,38.7,a.5,28.7,1e.51,c.3,2f.0,d.2,",
    "1c.13,18.27,1.e,17.618,a6d7.28,1035.a,de.1,1682.d,1d31.c1e,21e.b05e2,1.1d,60.7f,f0.fe0f,",
    "fffe.1,fffe.1"
  ].join("");
  var RANGES = decodeRanges(UNASSIGNED_RANGES_UNICODE_10);
  function decodeRanges(encoded) {
    const ranges = [];
    let end = -1;
    for (const pair of encoded.split(",")) {
      const [gap, length] = pair.split(".");
      const start = end + 1 + Number.parseInt(gap, 16);
      end = start + Number.parseInt(length, 16);
      ranges.push([start, end]);
    }
    return ranges;
  }
  function isUnassignedForAnki(codePoint2) {
    let low = 0;
    let high = RANGES.length - 1;
    while (low <= high) {
      const mid = low + high >> 1;
      const [start, end] = RANGES[mid];
      if (codePoint2 < start)
        high = mid - 1;
      else if (codePoint2 > end)
        low = mid + 1;
      else
        return true;
    }
    return false;
  }

  // node_modules/ankipack/dist/util/media-name.js
  var MAX_LENGTH = 120;
  var DISALLOWED = `[]<>:"/?*^\\|`;
  var NON_BREAKING_SPACE2 = String.fromCharCode(160);
  var WINDOWS_DEVICE = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\.|$)/i;
  function mediaFilenameProblem(name) {
    if (name.length === 0)
      return "is empty";
    if (name === "." || name === "..")
      return "is a directory reference";
    if (name.normalize("NFC") !== name) {
      return "is not NFC-normalised, which is what a macOS filesystem returns";
    }
    for (const char of name) {
      const problem = disallowedCharProblem(char);
      if (problem !== void 0)
        return problem;
    }
    if (name.includes(NON_BREAKING_SPACE2))
      return "contains a non-breaking space";
    if (WINDOWS_DEVICE.test(name))
      return "is a reserved Windows device name";
    if (name.endsWith(" ") || name.endsWith("."))
      return "ends with a space or a period";
    if (new TextEncoder().encode(name).length > MAX_LENGTH) {
      return `is longer than ${MAX_LENGTH} bytes`;
    }
    return void 0;
  }
  function disallowedCharProblem(char) {
    if (DISALLOWED.includes(char))
      return `contains ${JSON.stringify(char)}`;
    if (IS_ASCII_CONTROL.test(char))
      return "contains a control character";
    if (isLoneSurrogate(char))
      return `contains the lone surrogate ${codePoint(char)}`;
    if (isUnassignedForAnki(char.codePointAt(0) ?? 0)) {
      return `contains ${codePoint(char)}, which Anki reads as unassigned because its character tables are Unicode 10`;
    }
    return void 0;
  }
  var utf8 = new TextEncoder();
  function assertMediaFilename(name) {
    const problem = mediaFilenameProblem(name);
    if (problem !== void 0) {
      fail("media-name", `Media filename ${JSON.stringify(name)} ${problem}. Anki rejects the entire package when a media name is not already normalised, so rename the file first.`);
    }
  }
  function codePoint(char) {
    return `U+${(char.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0")}`;
  }

  // node_modules/ankipack/dist/collection/validate.js
  function assertWritable(data) {
    uniqueIds("notes", data.notes);
    uniqueIds("cards", data.cards);
    uniqueIds("decks", data.decks);
    uniqueIds("notetypes", data.notetypes);
    uniqueIds("deck_config", data.deckConfig);
    uniqueNames("decks", data.decks, (row) => toHumanDeckName(row.name));
    uniqueNames("notetypes", data.notetypes, (row) => row.name);
    uniqueNames("deck_config", data.deckConfig, (row) => row.name);
    uniqueCardOrdinals(data.cards);
    mediaFilenames(data.media);
    const notetypeIds = new Set(data.notetypes.map((row) => row.id));
    const noteIds = new Set(data.notes.map((row) => row.id));
    const deckIds = new Set(data.decks.map((row) => row.id));
    const presetIds = new Set(data.deckConfig.map((row) => row.id));
    for (const deck of data.decks) {
      const kind = fromBinary(Deck_KindContainerSchema, deck.kind);
      if (kind.kind.case !== "normal")
        continue;
      const configId = Number(kind.kind.value.configId);
      if (!presetIds.has(configId)) {
        fail("invalid-document", `decks.kind: deck ${JSON.stringify(toHumanDeckName(deck.name))} refers to deck preset ${configId}, which this package does not carry. Anki refuses the whole import for it.`);
      }
    }
    const fieldCounts = /* @__PURE__ */ new Map();
    for (const field of data.fields) {
      fieldCounts.set(field.ntid, (fieldCounts.get(field.ntid) ?? 0) + 1);
    }
    for (const note of data.notes) {
      if (!notetypeIds.has(note.mid)) {
        fail("invalid-document", `notes.mid: note ${note.id} refers to note type ${note.mid}, which this collection does not contain. Anki refuses the whole package for it.`);
      }
      const expected = fieldCounts.get(note.mid) ?? 0;
      const actual = note.flds.split(FIELD_SEPARATOR).length;
      if (actual !== expected) {
        fail("invalid-document", `notes.flds: note ${note.id} has ${actual} fields but its note type ${note.mid} defines ${expected}, which Anki's importer refuses.`);
      }
    }
    for (const card of data.cards) {
      if (!noteIds.has(card.nid)) {
        fail("invalid-document", `cards.nid: card ${card.id} refers to note ${card.nid}, which this collection does not contain.`);
      }
      if (!deckIds.has(card.did)) {
        fail("invalid-document", `cards.did: card ${card.id} refers to deck ${card.did}, which this collection does not contain.`);
      }
    }
  }
  function uniqueCardOrdinals(cards) {
    const seen = /* @__PURE__ */ new Set();
    for (const card of cards) {
      const key = `${card.nid}:${card.ord}`;
      if (seen.has(key)) {
        fail("invalid-document", `cards: note ${card.nid} has more than one card at template ordinal ${card.ord}. Anki imports both and only Check Database removes one.`);
      }
      seen.add(key);
    }
  }
  function mediaFilenames(media) {
    for (const file of media) {
      const problem = mediaFilenameProblem(file.name);
      if (problem !== void 0) {
        fail("invalid-document", `media: filename ${JSON.stringify(file.name)} ${problem}. Anki refuses the whole import over one bad name.`);
      }
    }
  }
  function uniqueNames(table, rows, name) {
    const seen = /* @__PURE__ */ new Map();
    for (const row of rows) {
      const value = name(row);
      const key = unicaseKey(value);
      const clash = seen.get(key);
      if (clash !== void 0) {
        fail("invalid-document", `${table}.name: ${JSON.stringify(clash)} and ${JSON.stringify(value)} are one name to Anki, which compares them case-insensitively.`);
      }
      seen.set(key, value);
    }
  }
  function uniqueIds(table, rows) {
    const seen = /* @__PURE__ */ new Set();
    for (const row of rows) {
      if (seen.has(row.id)) {
        fail("invalid-document", `${table}: duplicate id ${row.id}, which the schema does not allow.`);
      }
      seen.add(row.id);
    }
  }

  // node_modules/ankipack/dist/collection/write.js
  async function writePackage(data, SQL) {
    assertWritable(data);
    const db = new SQL.Database();
    let collectionBytes;
    try {
      db.run(SCHEMA_SQL);
      writeCollection(db, data);
      collectionBytes = db.export();
    } finally {
      db.close();
    }
    const files = {
      meta: toBinary(PackageMetadataSchema, create(PackageMetadataSchema, { version: PackageMetadata_Version.LATEST })),
      "collection.anki21b": zstdRawFrame(collectionBytes)
    };
    const MAX_MEDIA_FILES = 65535 - Object.keys(files).length - 1;
    if (data.media.length > MAX_MEDIA_FILES) {
      fail("invalid-document", `A package can hold at most ${MAX_MEDIA_FILES} media files, and this one has ${data.media.length}. Past that the zip entry count overflows.`);
    }
    const entries = [];
    for (const [index, file] of data.media.entries()) {
      files[String(index)] = zstdRawFrame(file.data);
      entries.push({
        name: file.name,
        size: file.data.length,
        sha1: await sha1(file.data)
      });
    }
    files["media"] = zstdRawFrame(toBinary(MediaEntriesSchema, create(MediaEntriesSchema, { entries })));
    return zipSync(files, { level: 6 });
  }
  function writeCollection(db, data) {
    db.run("BEGIN");
    try {
      writeRows(db, data);
      db.run("COMMIT");
    } catch (error) {
      db.run("ROLLBACK");
      throw error;
    }
  }
  function writeRows(db, data) {
    const c = data.col;
    db.run(`INSERT INTO col (id, crt, mod, scm, ver, dty, usn, ls, conf, models, decks, dconf, tags)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      c.id,
      c.crt,
      c.mod,
      c.scm,
      c.ver,
      c.dty,
      c.usn,
      c.ls,
      c.conf,
      c.models,
      c.decks,
      c.dconf,
      c.tags
    ]);
    for (const n of data.notes) {
      db.run(`INSERT INTO notes (id, guid, mid, mod, usn, tags, flds, sfld, csum, flags, data)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [n.id, n.guid, n.mid, n.mod, n.usn, n.tags, n.flds, n.sfld, n.csum, n.flags, n.data]);
    }
    for (const c2 of data.cards) {
      db.run(`INSERT INTO cards (id, nid, did, ord, mod, usn, type, queue, due, ivl, factor,
                          reps, lapses, left, odue, odid, flags, data)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
        c2.id,
        c2.nid,
        c2.did,
        c2.ord,
        c2.mod,
        c2.usn,
        c2.type,
        c2.queue,
        c2.due,
        c2.ivl,
        c2.factor,
        c2.reps,
        c2.lapses,
        c2.left,
        c2.odue,
        c2.odid,
        c2.flags,
        c2.data
      ]);
    }
    for (const r of data.revlog) {
      db.run(`INSERT INTO revlog (id, cid, usn, ease, ivl, lastIvl, factor, time, type)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [r.id, r.cid, r.usn, r.ease, r.ivl, r.lastIvl, r.factor, r.time, r.type]);
    }
    for (const g of data.graves) {
      db.run("INSERT INTO graves (oid, type, usn) VALUES (?, ?, ?)", [g.oid, g.type, g.usn]);
    }
    for (const d of data.deckConfig) {
      db.run("INSERT INTO deck_config (id, name, mtime_secs, usn, config) VALUES (?, ?, ?, ?, ?)", [
        d.id,
        d.name,
        d.mtimeSecs,
        d.usn,
        d.config
      ]);
    }
    for (const cfg of data.config) {
      db.run("INSERT INTO config (KEY, usn, mtime_secs, val) VALUES (?, ?, ?, ?)", [
        cfg.key,
        cfg.usn,
        cfg.mtimeSecs,
        cfg.val
      ]);
    }
    for (const t of data.tags) {
      db.run("INSERT INTO tags (tag, usn, collapsed, config) VALUES (?, ?, ?, ?)", [
        t.tag,
        t.usn,
        t.collapsed ? 1 : 0,
        t.config
      ]);
    }
    for (const nt of data.notetypes) {
      db.run("INSERT INTO notetypes (id, name, mtime_secs, usn, config) VALUES (?, ?, ?, ?, ?)", [
        nt.id,
        nt.name,
        nt.mtimeSecs,
        nt.usn,
        nt.config
      ]);
    }
    for (const f of data.fields) {
      db.run("INSERT INTO fields (ntid, ord, name, config) VALUES (?, ?, ?, ?)", [
        f.ntid,
        f.ord,
        f.name,
        f.config
      ]);
    }
    for (const t of data.templates) {
      db.run("INSERT INTO templates (ntid, ord, name, mtime_secs, usn, config) VALUES (?, ?, ?, ?, ?, ?)", [t.ntid, t.ord, t.name, t.mtimeSecs, t.usn, t.config]);
    }
    for (const d of data.decks) {
      db.run("INSERT INTO decks (id, name, mtime_secs, usn, common, kind) VALUES (?, ?, ?, ?, ?, ?)", [d.id, d.name, d.mtimeSecs, d.usn, d.common, d.kind]);
    }
  }

  // node_modules/ankipack/dist/package.js
  var Package = class {
    decks = [];
    media = /* @__PURE__ */ new Map();
    /** Add a deck to this package. Multiple decks are supported. */
    addDeck(deck) {
      this.decks.push(deck);
    }
    /**
     * Attach a media file (image, audio, etc.) to the package.
     * Reference it in card templates via its filename (e.g. `<img src="photo.jpg">`).
     */
    addMedia(filename, data) {
      assertMediaFilename(filename);
      if (this.media.has(filename)) {
        fail("invalid-input", `Media filename ${JSON.stringify(filename)} was already added`);
      }
      this.media.set(filename, data);
    }
    /**
     * Build the `.apkg` as an in-memory ZIP archive.
     * Use this in browser environments where file system access is unavailable.
     *
     * @param SQL - An initialized sql.js instance (from `initSqlJs()`)
     * @returns The `.apkg` file contents as a `Uint8Array`
     */
    async toUint8Array(SQL) {
      if (this.decks.length === 0) {
        fail("invalid-input", "Package must contain at least one deck");
      }
      return writePackage(await this.toCollection(), SQL);
    }
    /**
     * The document this package describes, before serialisation. Building and
     * reading produce the same shape, so both go out through one writer.
     */
    async toCollection() {
      const media = [...this.media].map(([name, data]) => ({ name, data }));
      return buildCollection(this.decks, media);
    }
    /**
     * Build the `.apkg` and write it to a file.
     * Only available in Node.js and Bun (not in browsers).
     *
     * @param path - Output file path
     * @param SQL - An initialized sql.js instance (from `initSqlJs()`)
     */
    async writeToFile(path, SQL) {
      const data = await this.toUint8Array(SQL);
      const { writeFile } = await import(
        /* webpackIgnore: true */
        /* @vite-ignore */
        "node:fs/promises"
      );
      await writeFile(path, data);
    }
  };

  // node_modules/ankipack/dist/notetype.js
  var idGen3 = new IdGenerator();
  var STOCK_KIND = /* @__PURE__ */ new WeakMap();
  function asStock(notetype, kind) {
    STOCK_KIND.set(notetype, kind);
    return notetype;
  }
  var Notetype = class _Notetype {
    id;
    name;
    type;
    css;
    sortFieldIndex;
    fields;
    templates;
    latexPre;
    latexPost;
    latexSvg;
    constructor(options) {
      validateNotetypeOptions(options);
      this.id = options.id ?? idGen3.next();
      this.name = options.name;
      this.type = options.type ?? "normal";
      this.css = options.css ?? DEFAULT_CSS;
      this.sortFieldIndex = options.sortFieldIndex ?? 0;
      this.fields = options.fields.map((field) => ({ ...field }));
      this.templates = options.templates.map((template) => ({ ...template }));
      this.latexPre = options.latexPre ?? DEFAULT_LATEX_PRE;
      this.latexPost = options.latexPost ?? DEFAULT_LATEX_POST;
      this.latexSvg = options.latexSvg ?? false;
    }
    /** Front/Back card type. One card per note. */
    static basic(options) {
      return asStock(new _Notetype({
        name: options?.name ?? "Basic",
        css: options?.css,
        fields: [{ name: "Front" }, { name: "Back" }],
        templates: [
          {
            name: "Card 1",
            questionFormat: "{{Front}}",
            answerFormat: "{{FrontSide}}\n\n<hr id=answer>\n\n{{Back}}"
          }
        ]
      }), StockNotetype_OriginalStockKind.BASIC);
    }
    /** Front/Back with an additional reversed card. Two cards per note. */
    static basicAndReversed(options) {
      return asStock(new _Notetype({
        name: options?.name ?? "Basic (and reversed card)",
        css: options?.css,
        fields: [{ name: "Front" }, { name: "Back" }],
        templates: [
          {
            name: "Card 1",
            questionFormat: "{{Front}}",
            answerFormat: "{{FrontSide}}\n\n<hr id=answer>\n\n{{Back}}"
          },
          {
            name: "Card 2",
            questionFormat: "{{Back}}",
            answerFormat: "{{FrontSide}}\n\n<hr id=answer>\n\n{{Front}}"
          }
        ]
      }), StockNotetype_OriginalStockKind.BASIC_AND_REVERSED);
    }
    /** Front/Back where the answer must be typed. Uses Anki's `{{type:Field}}` syntax. */
    static basicTyping(options) {
      return asStock(new _Notetype({
        name: options?.name ?? "Basic (type in the answer)",
        css: options?.css,
        fields: [{ name: "Front" }, { name: "Back" }],
        templates: [
          {
            name: "Card 1",
            questionFormat: "{{Front}}\n\n{{type:Back}}",
            answerFormat: "{{Front}}\n\n<hr id=answer>\n\n{{type:Back}}"
          }
        ]
      }), StockNotetype_OriginalStockKind.BASIC_TYPING);
    }
    /** Cloze deletion card type. Use `{{c1::text}}` syntax in the Text field. */
    static cloze(options) {
      return asStock(new _Notetype({
        name: options?.name ?? "Cloze",
        type: "cloze",
        css: options?.css ?? DEFAULT_CSS + DEFAULT_CLOZE_CSS,
        fields: [{ name: "Text" }, { name: "Back Extra" }],
        templates: [
          {
            name: "Cloze",
            questionFormat: "{{cloze:Text}}",
            answerFormat: "{{cloze:Text}}<br>\n{{Back Extra}}"
          }
        ]
      }), StockNotetype_OriginalStockKind.CLOZE);
    }
    toNotetypeConfigProtobuf() {
      const reqs = this.type === "cloze" ? [] : this.computeRequirements();
      return create(Notetype_ConfigSchema, {
        kind: this.type === "cloze" ? Notetype_Config_Kind.CLOZE : Notetype_Config_Kind.NORMAL,
        // Anki needs this to offer "Restore to Default" on the notetype.
        originalStockKind: STOCK_KIND.get(this) ?? StockNotetype_OriginalStockKind.UNKNOWN,
        sortFieldIdx: this.sortFieldIndex,
        css: this.css,
        latexPre: this.latexPre,
        latexPost: this.latexPost,
        latexSvg: this.latexSvg,
        reqs: reqs.map((req) => create(Notetype_Config_CardRequirementSchema, {
          cardOrd: req.ord,
          kind: req.kind === "all" ? Notetype_Config_CardRequirement_Kind.ALL : req.kind === "none" ? Notetype_Config_CardRequirement_Kind.NONE : Notetype_Config_CardRequirement_Kind.ANY,
          fieldOrds: req.fieldOrds
        }))
      });
    }
    toFieldConfigProtobuf(fieldIndex) {
      const field = this.fields[fieldIndex];
      const stockCloze = STOCK_KIND.get(this) === StockNotetype_OriginalStockKind.CLOZE && fieldIndex < 2;
      return create(Notetype_Field_ConfigSchema, {
        sticky: field.sticky ?? false,
        rtl: field.rtl ?? false,
        fontName: field.fontName ?? "Arial",
        fontSize: field.fontSize ?? 20,
        description: field.description ?? "",
        plainText: field.plainText ?? false,
        tag: stockCloze ? fieldIndex : void 0,
        preventDeletion: stockCloze && fieldIndex === 0,
        id: stableId(this.name, "field", field.name, String(fieldIndex))
      });
    }
    toTemplateConfigProtobuf(templateIndex) {
      const tmpl = this.templates[templateIndex];
      return create(Notetype_Template_ConfigSchema, {
        qFormat: tmpl.questionFormat,
        aFormat: tmpl.answerFormat,
        qFormatBrowser: tmpl.questionFormatBrowser ?? "",
        aFormatBrowser: tmpl.answerFormatBrowser ?? "",
        browserFontName: tmpl.browserFontName ?? "",
        browserFontSize: tmpl.browserFontSize ?? 0,
        id: stableId(this.name, "template", tmpl.name, String(templateIndex))
      });
    }
    /**
     * Anki's `requirements()` (rslib/src/notetype/mod.rs), cached in the notetype
     * config. Anki recomputes it on import, so it matters only to another tool
     * reading the apkg directly.
     */
    computeRequirements() {
      const names = this.fields.map((field) => field.name);
      return this.templates.map((tmpl, ord) => {
        const renders2 = (nonempty) => templateRendersForRequirements(tmpl.questionFormat, nonempty);
        const anyOrds = names.flatMap((name, index) => renders2(/* @__PURE__ */ new Set([name])) ? [index] : []);
        if (anyOrds.length > 0)
          return { ord, kind: "any", fieldOrds: anyOrds };
        const required = new Set(names.map((_, index) => index));
        names.forEach((name, index) => {
          const without = new Set(names);
          without.delete(name);
          if (renders2(without))
            required.delete(index);
        });
        if (required.size > 0 && renders2(new Set(names))) {
          return { ord, kind: "all", fieldOrds: [...required].sort((a, b) => a - b) };
        }
        return { ord, kind: "none", fieldOrds: [] };
      });
    }
  };
  function rejectNonNfc(value, what) {
    if (value.normalize("NFC") !== value) {
      fail("invalid-input", `${what} ${JSON.stringify(value)} is not NFC-normalised. Anki normalises it on import, so the name in the collection would not be the one you shipped.`);
    }
  }
  function validateNotetypeOptions(options) {
    if (options.name.length === 0) {
      fail("invalid-input", "Notetype name must not be empty");
    }
    if (options.name.includes('"')) {
      fail("invalid-input", `Notetype name ${JSON.stringify(options.name)} must not contain a quote, which Anki strips on import`);
    }
    rejectNonNfc(options.name, "Notetype name");
    rejectNul(options.name, `Notetype name ${JSON.stringify(options.name)}`);
    rejectLoneSurrogates(options.name, `Notetype name ${JSON.stringify(options.name)}`);
    if (options.fields.length === 0) {
      fail("invalid-input", `Notetype "${options.name}" must have at least 1 field`);
    }
    if (options.templates.length === 0) {
      fail("invalid-input", `Notetype "${options.name}" must have at least 1 template`);
    }
    const seen = /* @__PURE__ */ new Map();
    for (const field of options.fields) {
      if (field.name.length === 0) {
        fail("invalid-input", `Notetype "${options.name}" has a field with an empty name`);
      }
      if (/[:{}"]/.test(field.name) || /^[#/^]/.test(field.name) || trimRust(field.name) !== field.name) {
        fail("invalid-input", `Field name ${JSON.stringify(field.name)} is rewritten by Anki on import. It must not contain any of :{}", must not start with #, / or ^, and must not have leading or trailing whitespace.`);
      }
      rejectNonNfc(field.name, "Field name");
      rejectNul(field.name, `Field name ${JSON.stringify(field.name)}`);
      rejectLoneSurrogates(field.name, `Field name ${JSON.stringify(field.name)}`);
      const folded = unicaseKey(field.name);
      const clash = seen.get(folded);
      if (clash !== void 0) {
        fail("invalid-input", `Notetype "${options.name}" has fields ${JSON.stringify(clash)} and ${JSON.stringify(field.name)}, which Anki compares case-insensitively`);
      }
      seen.set(folded, field.name);
    }
    const sortIndex = options.sortFieldIndex;
    if (sortIndex !== void 0) {
      if (!Number.isInteger(sortIndex) || sortIndex < 0 || sortIndex >= options.fields.length) {
        fail("invalid-input", `sortFieldIndex must be an integer between 0 and ${options.fields.length - 1}, got ${sortIndex}`);
      }
    }
    if (options.id !== void 0 && !Number.isSafeInteger(options.id)) {
      fail("invalid-input", `Notetype id must be a safe integer, got ${options.id}`);
    }
    const seenTemplates = /* @__PURE__ */ new Map();
    for (const tmpl of options.templates) {
      if (tmpl.name.length === 0) {
        fail("invalid-input", `Notetype "${options.name}" has a template with an empty name`);
      }
      if (tmpl.name.includes('"')) {
        fail("invalid-input", `Template name ${JSON.stringify(tmpl.name)} must not contain a quote, which Anki strips on import`);
      }
      rejectNonNfc(tmpl.name, "Template name");
      rejectNul(tmpl.name, `Template name ${JSON.stringify(tmpl.name)}`);
      rejectLoneSurrogates(tmpl.name, `Template name ${JSON.stringify(tmpl.name)}`);
      const folded = unicaseKey(tmpl.name);
      const clash = seenTemplates.get(folded);
      if (clash !== void 0) {
        fail("invalid-input", `Notetype "${options.name}" has templates ${JSON.stringify(clash)} and ${JSON.stringify(tmpl.name)}, which Anki compares case-insensitively`);
      }
      seenTemplates.set(folded, tmpl.name);
    }
  }

  // node_modules/ankipack/dist/util/tags.js
  var IDEOGRAPHIC_SPACE = String.fromCharCode(12288);
  function assertTag(tag) {
    if (tag.length === 0)
      fail("invalid-input", "Tags must not be empty");
    if (tag.includes(" ") || tag.includes(IDEOGRAPHIC_SPACE)) {
      fail("invalid-input", `Tag ${JSON.stringify(tag)} must not contain a space`);
    }
    if (IS_ASCII_CONTROL.test(tag)) {
      fail("invalid-input", `Tag ${JSON.stringify(tag)} must not contain a control character`);
    }
    rejectLoneSurrogates(tag, `Tag ${JSON.stringify(tag)}`);
  }

  // node_modules/ankipack/dist/note.js
  var Note = class {
    notetype;
    fields;
    tags;
    guid;
    constructor(options) {
      if (options.fields.length !== options.notetype.fields.length) {
        fail("invalid-input", `Note has ${options.fields.length} fields but note type "${options.notetype.name}" expects ${options.notetype.fields.length}`);
      }
      for (const tag of options.tags ?? [])
        assertTag(tag);
      options.fields.forEach((value, index) => {
        const name = options.notetype.fields[index]?.name;
        rejectLoneSurrogates(value, `Field ${JSON.stringify(name ?? String(index + 1))}`);
      });
      if (options.guid !== void 0) {
        rejectNul(options.guid, "Note guid");
        rejectLoneSurrogates(options.guid, "Note guid");
      }
      this.notetype = options.notetype;
      this.fields = [...options.fields];
      this.tags = [...options.tags ?? []];
      this.guid = options.guid;
    }
  };

  // node_modules/ankipack/dist/collection/read.js
  var COLLECTION_FILENAME = {
    [PackageMetadata_Version.LEGACY_1]: "collection.anki2",
    [PackageMetadata_Version.LEGACY_2]: "collection.anki21",
    [PackageMetadata_Version.LATEST]: "collection.anki21b"
  };

  // src/popup.ts
  document.addEventListener("DOMContentLoaded", () => {
    const languageCategory = document.getElementById(
      "language-category"
    );
    const piperVoice = document.getElementById(
      "piper-voice"
    );
    const piperSpeed = document.getElementById("piper-speed");
    const piperNoiseScale = document.getElementById(
      "piper-noise-scale"
    );
    const piperNoiseW = document.getElementById(
      "piper-noise-w"
    );
    const googleLanguage = document.getElementById(
      "google-language"
    );
    const googleTranslateTargetLanguage = document.getElementById(
      "google-translate-target-language"
    );
    const googleRate = document.getElementById("google-rate");
    const lookupMethod = document.getElementById(
      "lookup-method"
    );
    const toastStatus = document.getElementById("status");
    const piperSpeedVal = document.getElementById(
      "piper-speed-val"
    );
    const piperNoiseScaleVal = document.getElementById(
      "piper-noise-scale-val"
    );
    const piperNoiseWVal = document.getElementById(
      "piper-noise-w-val"
    );
    const googleRateVal = document.getElementById(
      "google-rate-val"
    );
    let toastTimeout = null;
    const triggerSaveToast = () => {
      toastStatus.classList.add("show");
      if (toastTimeout !== null) {
        clearTimeout(toastTimeout);
      }
      toastTimeout = window.setTimeout(() => {
        toastStatus.classList.remove("show");
      }, 1e3);
    };
    const notifyContentScript = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          SendChromeMessage(tabs[0].id, { action: "settingsChanged" }).catch(() => {
          });
        }
      });
    };
    const populateVoices = (category, selectedVoiceId = "") => {
      piperVoice.innerHTML = "";
      const voices = VOICES_MAP[category] || [];
      voices.forEach((voice) => {
        const opt = document.createElement("option");
        opt.value = voice.id;
        opt.textContent = voice.name;
        piperVoice.appendChild(opt);
      });
      if (selectedVoiceId) {
        piperVoice.value = selectedVoiceId;
      }
    };
    const saveVoicePreference = () => {
      const category = languageCategory.value;
      const voiceId = piperVoice.value;
      const voices = VOICES_MAP[category] || [];
      const matchedVoice = voices.find((v) => v.id === voiceId) || voices[0];
      if (matchedVoice) {
        chrome.storage.sync.set(
          {
            piperLanguageCategory: category,
            piperVoice: matchedVoice.id,
            piperVoiceFile: matchedVoice.file
          },
          () => {
            triggerSaveToast();
            notifyContentScript();
          }
        );
      }
    };
    chrome.storage.sync.get(
      {
        piperLanguageCategory: DEFAULT_SETTINGS.piperLanguageCategory,
        piperVoice: DEFAULT_SETTINGS.piperVoice,
        piperSpeed: DEFAULT_SETTINGS.piperSpeed,
        piperNoiseScale: DEFAULT_SETTINGS.piperNoiseScale,
        piperNoiseW: DEFAULT_SETTINGS.piperNoiseW,
        googleLanguage: DEFAULT_SETTINGS.googleLanguage,
        googleTranslateTargetLanguage: DEFAULT_SETTINGS.googleTranslateTargetLanguage,
        googleRate: DEFAULT_SETTINGS.googleRate,
        lookupMethod: DEFAULT_SETTINGS.lookupMethod
      },
      (items) => {
        languageCategory.value = items.piperLanguageCategory;
        populateVoices(items.piperLanguageCategory, items.piperVoice);
        lookupMethod.value = items.lookupMethod || DEFAULT_SETTINGS.lookupMethod;
        piperSpeed.value = items.piperSpeed.toString();
        piperNoiseScale.value = items.piperNoiseScale.toString();
        piperNoiseW.value = items.piperNoiseW.toString();
        googleLanguage.value = items.googleLanguage;
        if (googleTranslateTargetLanguage) {
          googleTranslateTargetLanguage.value = items.googleTranslateTargetLanguage || DEFAULT_SETTINGS.googleTranslateTargetLanguage;
        }
        googleRate.value = items.googleRate.toString();
        piperSpeedVal.textContent = `${parseFloat(items.piperSpeed).toFixed(1)}x`;
        piperNoiseScaleVal.textContent = parseFloat(
          items.piperNoiseScale
        ).toFixed(2);
        piperNoiseWVal.textContent = parseFloat(items.piperNoiseW).toFixed(2);
        googleRateVal.textContent = `${parseFloat(items.googleRate).toFixed(1)}x`;
      }
    );
    languageCategory.addEventListener("change", () => {
      populateVoices(languageCategory.value);
      saveVoicePreference();
    });
    piperVoice.addEventListener("change", () => {
      saveVoicePreference();
    });
    piperSpeed.addEventListener("input", (e) => {
      const target = e.target;
      const val = parseFloat(target.value);
      piperSpeedVal.textContent = `${val.toFixed(1)}x`;
      chrome.storage.sync.set({ piperSpeed: val }, triggerSaveToast);
    });
    piperNoiseScale.addEventListener("input", (e) => {
      const target = e.target;
      const val = parseFloat(target.value);
      piperNoiseScaleVal.textContent = val.toFixed(2);
      chrome.storage.sync.set({ piperNoiseScale: val }, triggerSaveToast);
    });
    piperNoiseW.addEventListener("input", (e) => {
      const target = e.target;
      const val = parseFloat(target.value);
      piperNoiseWVal.textContent = val.toFixed(2);
      chrome.storage.sync.set({ piperNoiseW: val }, triggerSaveToast);
    });
    googleLanguage.addEventListener("change", () => {
      chrome.storage.sync.set(
        { googleLanguage: googleLanguage.value },
        triggerSaveToast
      );
    });
    if (googleTranslateTargetLanguage) {
      googleTranslateTargetLanguage.addEventListener("change", () => {
        chrome.storage.sync.set(
          { googleTranslateTargetLanguage: googleTranslateTargetLanguage.value },
          triggerSaveToast
        );
      });
    }
    googleRate.addEventListener("input", (e) => {
      const target = e.target;
      const val = parseFloat(target.value);
      googleRateVal.textContent = `${val.toFixed(1)}x`;
      chrome.storage.sync.set({ googleRate: val }, triggerSaveToast);
    });
    lookupMethod.addEventListener("change", () => {
      chrome.storage.sync.set({ lookupMethod: lookupMethod.value }, () => {
        triggerSaveToast();
        notifyContentScript();
      });
    });
    const exportCsvBtn = document.getElementById(
      "export-csv-btn"
    );
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener("click", async () => {
        const dbModel = new DatabaseModel();
        const records = await dbModel.getAllVocabulary();
        if (!records || records.length === 0) {
          alert("No vocabulary words saved yet.");
          return;
        }
        const seen = /* @__PURE__ */ new Set();
        const uniqueRecords = [];
        for (const r of records) {
          const key = `${r.word.trim().toLowerCase()}_${r.language.trim().toLowerCase()}`;
          if (!seen.has(key)) {
            seen.add(key);
            uniqueRecords.push(r);
          }
        }
        if (uniqueRecords.length === 0) {
          alert("No vocabulary words saved yet.");
          return;
        }
        const ankiHeaderDirectives = [
          "#separator:tab",
          "#html:true",
          "#tags column:5",
          "Word	Definition	Audio	Wiktionary URL	Tags"
        ];
        const rows = uniqueRecords.map((r) => {
          const cleanWord = r.word.trim();
          const langCategory = (r.language || "english").toLowerCase();
          const langCode = LANGUAGE_CODES[langCategory] || "en";
          const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanWord)}&tl=${langCode}&client=tw-ob`;
          const audioTag = `[sound:${audioUrl}]`;
          const tag = `LLT_Vocabulary LLT_${langCategory}`;
          const definition = (r.definition || "").replace(/\t/g, " ").replace(/\n/g, "<br>");
          const pageUrl = r.pageUrl || "";
          return `${cleanWord}	${definition}	${audioTag}	${pageUrl}	${tag}`;
        });
        const csvContent = [...ankiHeaderDirectives, ...rows].join("\n");
        const blob = new Blob([csvContent], { type: "text/tab-separated-values;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `LLT_Anki_Vocabulary_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }
    const exportApkgBtn = document.getElementById(
      "export-apkg-btn"
    );
    if (exportApkgBtn) {
      exportApkgBtn.addEventListener("click", async () => {
        const dbModel = new DatabaseModel();
        const records = await dbModel.getAllVocabulary();
        if (!records || records.length === 0) {
          alert("No vocabulary words saved yet.");
          return;
        }
        const seen = /* @__PURE__ */ new Set();
        const uniqueRecords = [];
        for (const r of records) {
          const key = `${r.word.trim().toLowerCase()}_${r.language.trim().toLowerCase()}`;
          if (!seen.has(key)) {
            seen.add(key);
            uniqueRecords.push(r);
          }
        }
        if (uniqueRecords.length === 0) {
          alert("No vocabulary words saved yet.");
          return;
        }
        try {
          if (toastStatus) {
            toastStatus.textContent = "GENERATING DECK...";
            toastStatus.classList.add("show");
          }
          const wasmUrl = chrome.runtime.getURL("dist/sql-wasm.wasm");
          const SQL = await (0, import_sql.default)({
            locateFile: () => wasmUrl
          });
          const notetype = Notetype.basic({
            name: "LLT Vocabulary Note"
          });
          const deck = new Deck({
            name: "LLT_exported_deck_" + Date.now().toString(),
            id: Date.now(),
            description: "Saved vocabulary deck exported from LLT extension"
          });
          for (const r of uniqueRecords) {
            const cleanWord = r.word.trim();
            const langCategory = (r.language || "english").toLowerCase();
            const langCode = LANGUAGE_CODES[langCategory] || "en";
            const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanWord)}&tl=${langCode}&client=tw-ob`;
            const definition = (r.definition || "").replace(/\n/g, "<br>");
            const pageUrl = r.pageUrl || "";
            const frontHtml = `<div style="font-size: 1.4em; font-weight: bold; text-align: center;">${cleanWord}</div>`;
            const backHtml = `
            <div style="font-size: 1.1em; margin-bottom: 8px;">${definition}</div>
            <div style="margin-top: 10px;">[sound:${audioUrl}]</div>
            ${pageUrl ? `<div style="margin-top: 10px; font-size: 0.85em;"><a href="${pageUrl}">View Wiktionary</a></div>` : ""}
          `;
            const itemKey = `llt_${cleanWord.toLowerCase()}_${langCategory}`;
            const safeGuid = itemKey.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 255);
            deck.addNote(
              new Note({
                guid: safeGuid,
                notetype,
                fields: [frontHtml, backHtml],
                tags: ["LLT", `LLT_${langCategory}`]
              })
            );
          }
          const pkg = new Package();
          pkg.addDeck(deck);
          const bytes = await pkg.toUint8Array(SQL);
          const blob = new Blob([bytes.buffer], { type: "application/apkg" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `LLT_Vocabulary_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.apkg`;
          a.click();
          URL.revokeObjectURL(url);
          if (toastStatus) {
            toastStatus.textContent = "SAVED";
            triggerSaveToast();
          }
        } catch (err2) {
          console.error("Failed to generate Anki .apkg deck:", err2);
          alert(`Could not generate .apkg deck: ${err2?.message || err2}`);
          if (toastStatus) {
            toastStatus.classList.remove("show");
          }
        }
      });
    }
    const clearAudioCacheBtn = document.getElementById(
      "clear-audio-cache-btn"
    );
    if (clearAudioCacheBtn) {
      clearAudioCacheBtn.addEventListener("click", async () => {
        if (confirm("Are you sure you want to clear the cached audio recordings?")) {
          const dbModel = new DatabaseModel();
          await dbModel.clearAudioCache();
          triggerSaveToast();
        }
      });
    }
    const clearVocabBtn = document.getElementById(
      "clear-vocab-btn"
    );
    if (clearVocabBtn) {
      clearVocabBtn.addEventListener("click", async () => {
        if (confirm("Are you sure you want to delete all saved vocabulary records? This cannot be undone.")) {
          const dbModel = new DatabaseModel();
          await dbModel.clearAllVocabulary();
          triggerSaveToast();
        }
      });
    }
  });
})();
//# sourceMappingURL=popup.js.map
