var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=63&r|128):55296==(64512&r)&&s+1<t.length&&56320==(64512&t.charCodeAt(s+1))?(r=65536+((1023&r)<<10)+(1023&t.charCodeAt(++s)),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=63&r|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=63&r|128)}return e},n={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let e=0;e<t.length;e+=3){const r=t[e],i=e+1<t.length,o=i?t[e+1]:0,a=e+2<t.length,c=a?t[e+2]:0,u=r>>2,h=(3&r)<<4|o>>4;let l=(15&o)<<2|c>>6,d=63&c;a||(d=64,i||(l=64)),s.push(n[u],n[h],n[l],n[d])}return s.join("")},encodeString(t,n){return this.HAS_NATIVE_SUPPORT&&!n?btoa(t):this.encodeByteArray(e(t),n)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((31&r)<<6|63&i)}else if(r>239&&r<365){const i=((7&r)<<18|(63&t[n++])<<12|(63&t[n++])<<6|63&t[n++])-65536;e[s++]=String.fromCharCode(55296+(i>>10)),e[s++]=String.fromCharCode(56320+(1023&i))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((15&r)<<12|(63&i)<<6|63&o)}}return e.join("")}(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let e=0;e<t.length;){const r=n[t.charAt(e++)],i=e<t.length?n[t.charAt(e)]:0;++e;const o=e<t.length?n[t.charAt(e)]:64;++e;const a=e<t.length?n[t.charAt(e)]:64;if(++e,null==r||null==i||null==o||null==a)throw Error();const c=r<<2|i>>4;if(s.push(c),64!==o){const t=i<<4&240|o>>2;if(s.push(t),64!==a){const t=o<<6&192|a;s.push(t)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},s=function(t){return function(t){const s=e(t);return n.encodeByteArray(s,!0)}(t).replace(/\./g,"")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class r{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),"function"==typeof t&&(this.promise.catch((()=>{})),1===t.length?t(e):t(e,n))}}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function i(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function o(){const t="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof t&&void 0!==t.id}function a(){const t=i();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function c(){return"object"==typeof indexedDB}class u extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,u.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,h.prototype.create)}}class h{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},s=`${this.service}/${t}`,r=this.errors[t],i=r?function(t,e){return t.replace(l,((t,n)=>{const s=e[n];return null!=s?String(s):`<${n}?>`}))}(r,n):"Error",o=`${this.serviceName}: ${i} (${s}).`;return new u(s,o,n)}}const l=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const n=t[r],i=e[r];if(f(n)&&f(i)){if(!d(n,i))return!1}else if(n!==i)return!1}for(const t of s)if(!n.includes(t))return!1;return!0}function f(t){return null!==t&&"object"==typeof t}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function p(t){return t&&t._delegate?t._delegate:t}class g{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class m{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const t=new r;if(this.instancesDeferred.set(e,t),this.isInitialized(e)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:e});n&&t.resolve(n)}catch(t){}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(null==t?void 0:t.identifier),s=null!==(e=null==t?void 0:t.optional)&&void 0!==e&&e;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(s)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(t){if(s)return null;throw t}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,this.shouldAutoInitialize()){if(function(t){return"EAGER"===t.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t))try{this.getOrInitializeService({instanceIdentifier:"[DEFAULT]"})}catch(t){}for(const[t,e]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(t);try{const t=this.getOrInitializeService({instanceIdentifier:n});e.resolve(t)}catch(t){}}}}clearInstance(t="[DEFAULT]"){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter((t=>"INTERNAL"in t)).map((t=>t.INTERNAL.delete())),...t.filter((t=>"_delete"in t)).map((t=>t._delete()))])}isComponentSet(){return null!=this.component}isInitialized(t="[DEFAULT]"){return this.instances.has(t)}getOptions(t="[DEFAULT]"){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[t,e]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(t)&&e.resolve(s)}return s}onInit(t,e){var n;const s=this.normalizeInstanceIdentifier(e),r=null!==(n=this.onInitCallbacks.get(s))&&void 0!==n?n:new Set;r.add(t),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&t(i,s),()=>{r.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const s of n)try{s(t,e)}catch(t){}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(s=t,"[DEFAULT]"===s?void 0:s),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch(t){}var s;return n||null}normalizeInstanceIdentifier(t="[DEFAULT]"){return this.component?this.component.multipleInstances?t:"[DEFAULT]":t}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class y{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new m(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v=[];var w,E;(E=w||(w={}))[E.DEBUG=0]="DEBUG",E[E.VERBOSE=1]="VERBOSE",E[E.INFO=2]="INFO",E[E.WARN=3]="WARN",E[E.ERROR=4]="ERROR",E[E.SILENT=5]="SILENT";const b={debug:w.DEBUG,verbose:w.VERBOSE,info:w.INFO,warn:w.WARN,error:w.ERROR,silent:w.SILENT},T=w.INFO,I={[w.DEBUG]:"log",[w.VERBOSE]:"log",[w.INFO]:"info",[w.WARN]:"warn",[w.ERROR]:"error"},C=(t,e,...n)=>{if(e<t.logLevel)return;const s=(new Date).toISOString(),r=I[e];if(!r)throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);console[r](`[${s}]  ${t.name}:`,...n)};class S{constructor(t){this.name=t,this._logLevel=T,this._logHandler=C,this._userLogHandler=null,v.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in w))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel="string"==typeof t?b[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,w.DEBUG,...t),this._logHandler(this,w.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,w.VERBOSE,...t),this._logHandler(this,w.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,w.INFO,...t),this._logHandler(this,w.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,w.WARN,...t),this._logHandler(this,w.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,w.ERROR,...t),this._logHandler(this,w.ERROR,...t)}}let A,_;const D=new WeakMap,N=new WeakMap,k=new WeakMap,L=new WeakMap,R=new WeakMap;let O={get(t,e,n){if(t instanceof IDBTransaction){if("done"===e)return N.get(t);if("objectStoreNames"===e)return t.objectStoreNames||k.get(t);if("store"===e)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return V(t[e])},set:(t,e,n)=>(t[e]=n,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function x(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(_||(_=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(P(this),e),V(D.get(this))}:function(...e){return V(t.apply(P(this),e))}:function(e,...n){const s=t.call(P(this),e,...n);return k.set(s,e.sort?e.sort():[e]),V(s)}}function M(t){return"function"==typeof t?x(t):(t instanceof IDBTransaction&&function(t){if(N.has(t))return;const e=new Promise(((e,n)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",i),t.removeEventListener("abort",i)},r=()=>{e(),s()},i=()=>{n(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",i),t.addEventListener("abort",i)}));N.set(t,e)}(t),e=t,(A||(A=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((t=>e instanceof t))?new Proxy(t,O):t);var e}function V(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,n)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",i)},r=()=>{e(V(t.result)),s()},i=()=>{n(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",i)}));return e.then((e=>{e instanceof IDBCursor&&D.set(e,t)})).catch((()=>{})),R.set(e,t),e}(t);if(L.has(t))return L.get(t);const e=M(t);return e!==t&&(L.set(t,e),R.set(e,t)),e}const P=t=>R.get(t);function F(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=V(o);return s&&o.addEventListener("upgradeneeded",(t=>{s(V(o.result),t.oldVersion,t.newVersion,V(o.transaction))})),n&&o.addEventListener("blocked",(()=>n())),a.then((t=>{i&&t.addEventListener("close",(()=>i())),r&&t.addEventListener("versionchange",(()=>r()))})).catch((()=>{})),a}const U=["get","getKey","getAll","getAllKeys","count"],B=["put","add","delete","clear"],j=new Map;function q(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(j.get(e))return j.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=B.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!r&&!U.includes(n))return;const i=async function(t,...e){const i=this.transaction(t,r?"readwrite":"readonly");let o=i.store;return s&&(o=o.index(e.shift())),(await Promise.all([o[n](...e),r&&i.done]))[0]};return j.set(e,i),i}O=(t=>({...t,get:(e,n,s)=>q(e,n)||t.get(e,n,s),has:(e,n)=>!!q(e,n)||t.has(e,n)}))(O);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class K{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map((t=>{if(function(t){const e=t.getComponent();return"VERSION"===(null==e?void 0:e.type)}(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}return null})).filter((t=>t)).join(" ")}}const G=new S("@firebase/app"),z={"@firebase/app":"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},H=new Map,Q=new Map;function W(t,e){try{t.container.addComponent(e)}catch(n){G.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function X(t){const e=t.name;if(Q.has(e))return G.debug(`There were multiple attempts to register component ${e}.`),!1;Q.set(e,t);for(const e of H.values())W(e,t);return!0}function Y(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const J=new h("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","storage-delete":"Error thrown when deleting from storage. Original error: {$originalErrorMessage}."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Z{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new g("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw J.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(t="[DEFAULT]"){const e=H.get(t);if(!e)throw J.create("no-app",{appName:t});return e}function et(t,e,n){var s;let r=null!==(s=z[t])&&void 0!==s?s:t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const t=[`Unable to register library "${r}" with version "${e}":`];return i&&t.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&t.push("and"),o&&t.push(`version name "${e}" contains illegal characters (whitespace or "/")`),void G.warn(t.join(" "))}X(new g(`${r}-version`,(()=>({library:r,version:e})),"VERSION"))}let nt=null;function st(){return nt||(nt=F("firebase-heartbeat-database",1,{upgrade:(t,e)=>{if(0===e)t.createObjectStore("firebase-heartbeat-store")}}).catch((t=>{throw J.create("storage-open",{originalErrorMessage:t.message})}))),nt}async function rt(t,e){var n;try{const n=(await st()).transaction("firebase-heartbeat-store","readwrite"),s=n.objectStore("firebase-heartbeat-store");return await s.put(e,it(t)),n.done}catch(t){throw J.create("storage-set",{originalErrorMessage:null===(n=t)||void 0===n?void 0:n.message})}}function it(t){return`${t.name}!${t.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new ct(e),this._heartbeatsCachePromise=this._storage.read().then((t=>(this._heartbeatsCache=t,t)))}async triggerHeartbeat(){const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),e=at();if(null===this._heartbeatsCache&&(this._heartbeatsCache=await this._heartbeatsCachePromise),this._heartbeatsCache.lastSentHeartbeatDate!==e&&!this._heartbeatsCache.heartbeats.some((t=>t.date===e)))return this._heartbeatsCache.heartbeats.push({date:e,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter((t=>{const e=new Date(t.date).valueOf();return Date.now()-e<=2592e6})),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null===this._heartbeatsCache||0===this._heartbeatsCache.heartbeats.length)return"";const t=at(),{heartbeatsToSend:e,unsentEntries:n}=function(t,e=1024){const n=[];let s=t.slice();for(const r of t){const t=n.find((t=>t.agent===r.agent));if(t){if(t.dates.push(r.date),ut(n)>e){t.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),ut(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}(this._heartbeatsCache.heartbeats),r=s(JSON.stringify({version:2,heartbeats:e}));return this._heartbeatsCache.lastSentHeartbeatDate=t,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function at(){return(new Date).toISOString().substring(0,10)}class ct{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!c()&&new Promise(((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var t;e((null===(t=r.error)||void 0===t?void 0:t.message)||"")}}catch(t){e(t)}})).then((()=>!0)).catch((()=>!1))}async read(){if(await this._canUseIndexedDBPromise){return await async function(t){var e;try{return(await st()).transaction("firebase-heartbeat-store").objectStore("firebase-heartbeat-store").get(it(t))}catch(t){throw J.create("storage-get",{originalErrorMessage:null===(e=t)||void 0===e?void 0:e.message})}}(this.app)||{heartbeats:[]}}return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return rt(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:t.heartbeats})}}async add(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return rt(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...t.heartbeats]})}}}function ut(t){return s(JSON.stringify({version:2,heartbeats:t})).length}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ht;ht="",X(new g("platform-logger",(t=>new K(t)),"PRIVATE")),X(new g("heartbeat",(t=>new ot(t)),"PRIVATE")),et("@firebase/app","0.7.28",ht),et("@firebase/app","0.7.28","esm2017"),et("fire-js","");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
et("firebase","9.9.0","app");var lt,dt="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==t?t:"undefined"!=typeof self?self:{},ft={},pt=pt||{},gt=dt||self;function mt(){}function yt(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function vt(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}var wt="closure_uid_"+(1e9*Math.random()>>>0),Et=0;function bt(t,e,n){return t.call.apply(t.bind,arguments)}function Tt(t,e,n){if(!t)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,s),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function It(t,e,n){return(It=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?bt:Tt).apply(null,arguments)}function Ct(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function St(t,e){function n(){}n.prototype=e.prototype,t.Z=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Vb=function(t,n,s){for(var r=Array(arguments.length-2),i=2;i<arguments.length;i++)r[i-2]=arguments[i];return e.prototype[n].apply(t,r)}}function At(){this.s=this.s,this.o=this.o}var _t={};At.prototype.s=!1,At.prototype.na=function(){if(!this.s&&(this.s=!0,this.M(),0)){var t=function(t){return Object.prototype.hasOwnProperty.call(t,wt)&&t[wt]||(t[wt]=++Et)}(this);delete _t[t]}},At.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const Dt=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if("string"==typeof t)return"string"!=typeof e||1!=e.length?-1:t.indexOf(e,0);for(let n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1},Nt=Array.prototype.forEach?function(t,e,n){Array.prototype.forEach.call(t,e,n)}:function(t,e,n){const s=t.length,r="string"==typeof t?t.split(""):t;for(let i=0;i<s;i++)i in r&&e.call(n,r[i],i,t)};function kt(t){return Array.prototype.concat.apply([],arguments)}function Lt(t){const e=t.length;if(0<e){const n=Array(e);for(let s=0;s<e;s++)n[s]=t[s];return n}return[]}function Rt(t){return/^[\s\xa0]*$/.test(t)}var Ot,xt=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function Mt(t,e){return-1!=t.indexOf(e)}function Vt(t,e){return t<e?-1:t>e?1:0}t:{var Pt=gt.navigator;if(Pt){var Ft=Pt.userAgent;if(Ft){Ot=Ft;break t}}Ot=""}function Ut(t,e,n){for(const s in t)e.call(n,t[s],s,t)}function Bt(t){const e={};for(const n in t)e[n]=t[n];return e}var $t="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function jt(t,e){let n,s;for(let e=1;e<arguments.length;e++){for(n in s=arguments[e],s)t[n]=s[n];for(let e=0;e<$t.length;e++)n=$t[e],Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}}function qt(t){return qt[" "](t),t}qt[" "]=mt;var Kt,Gt,zt=Mt(Ot,"Opera"),Ht=Mt(Ot,"Trident")||Mt(Ot,"MSIE"),Qt=Mt(Ot,"Edge"),Wt=Qt||Ht,Xt=Mt(Ot,"Gecko")&&!(Mt(Ot.toLowerCase(),"webkit")&&!Mt(Ot,"Edge"))&&!(Mt(Ot,"Trident")||Mt(Ot,"MSIE"))&&!Mt(Ot,"Edge"),Yt=Mt(Ot.toLowerCase(),"webkit")&&!Mt(Ot,"Edge");function Jt(){var t=gt.document;return t?t.documentMode:void 0}t:{var Zt="",te=(Gt=Ot,Xt?/rv:([^\);]+)(\)|;)/.exec(Gt):Qt?/Edge\/([\d\.]+)/.exec(Gt):Ht?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(Gt):Yt?/WebKit\/(\S+)/.exec(Gt):zt?/(?:Version)[ \/]?(\S+)/.exec(Gt):void 0);if(te&&(Zt=te?te[1]:""),Ht){var ee=Jt();if(null!=ee&&ee>parseFloat(Zt)){Kt=String(ee);break t}}Kt=Zt}var ne,se={};function re(){return function(t){var e=se;return Object.prototype.hasOwnProperty.call(e,9)?e[9]:e[9]=t(9)}((function(){let t=0;const e=xt(String(Kt)).split("."),n=xt("9").split("."),s=Math.max(e.length,n.length);for(let o=0;0==t&&o<s;o++){var r=e[o]||"",i=n[o]||"";do{if(r=/(\d*)(\D*)(.*)/.exec(r)||["","","",""],i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],0==r[0].length&&0==i[0].length)break;t=Vt(0==r[1].length?0:parseInt(r[1],10),0==i[1].length?0:parseInt(i[1],10))||Vt(0==r[2].length,0==i[2].length)||Vt(r[2],i[2]),r=r[3],i=i[3]}while(0==t)}return 0<=t}))}if(gt.document&&Ht){var ie=Jt();ne=ie||(parseInt(Kt,10)||void 0)}else ne=void 0;var oe=ne,ae=function(){if(!gt.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{gt.addEventListener("test",mt,e),gt.removeEventListener("test",mt,e)}catch(t){}return t}();function ce(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}function ue(t,e){if(ce.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,s=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(Xt){t:{try{qt(e.nodeName);var r=!0;break t}catch(t){}r=!1}r||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,s?(this.clientX=void 0!==s.clientX?s.clientX:s.pageX,this.clientY=void 0!==s.clientY?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:he[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&ue.Z.h.call(this)}}ce.prototype.h=function(){this.defaultPrevented=!0},St(ue,ce);var he={2:"touch",3:"pen",4:"mouse"};ue.prototype.h=function(){ue.Z.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var le="closure_listenable_"+(1e6*Math.random()|0),de=0;function fe(t,e,n,s,r){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!s,this.ia=r,this.key=++de,this.ca=this.fa=!1}function pe(t){t.ca=!0,t.listener=null,t.proxy=null,t.src=null,t.ia=null}function ge(t){this.src=t,this.g={},this.h=0}function me(t,e){var n=e.type;if(n in t.g){var s,r=t.g[n],i=Dt(r,e);(s=0<=i)&&Array.prototype.splice.call(r,i,1),s&&(pe(e),0==t.g[n].length&&(delete t.g[n],t.h--))}}function ye(t,e,n,s){for(var r=0;r<t.length;++r){var i=t[r];if(!i.ca&&i.listener==e&&i.capture==!!n&&i.ia==s)return r}return-1}ge.prototype.add=function(t,e,n,s,r){var i=t.toString();(t=this.g[i])||(t=this.g[i]=[],this.h++);var o=ye(t,e,s,r);return-1<o?(e=t[o],n||(e.fa=!1)):((e=new fe(e,this.src,i,!!s,r)).fa=n,t.push(e)),e};var ve="closure_lm_"+(1e6*Math.random()|0),we={};function Ee(t,e,n,s,r){if(s&&s.once)return Te(t,e,n,s,r);if(Array.isArray(e)){for(var i=0;i<e.length;i++)Ee(t,e[i],n,s,r);return null}return n=Ne(n),t&&t[le]?t.N(e,n,vt(s)?!!s.capture:!!s,r):be(t,e,n,!1,s,r)}function be(t,e,n,s,r,i){if(!e)throw Error("Invalid event type");var o=vt(r)?!!r.capture:!!r,a=_e(t);if(a||(t[ve]=a=new ge(t)),(n=a.add(e,n,s,o,i)).proxy)return n;if(s=function(){function t(n){return e.call(t.src,t.listener,n)}var e=Ae;return t}(),n.proxy=s,s.src=t,s.listener=n,t.addEventListener)ae||(r=o),void 0===r&&(r=!1),t.addEventListener(e.toString(),s,r);else if(t.attachEvent)t.attachEvent(Se(e.toString()),s);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(s)}return n}function Te(t,e,n,s,r){if(Array.isArray(e)){for(var i=0;i<e.length;i++)Te(t,e[i],n,s,r);return null}return n=Ne(n),t&&t[le]?t.O(e,n,vt(s)?!!s.capture:!!s,r):be(t,e,n,!0,s,r)}function Ie(t,e,n,s,r){if(Array.isArray(e))for(var i=0;i<e.length;i++)Ie(t,e[i],n,s,r);else s=vt(s)?!!s.capture:!!s,n=Ne(n),t&&t[le]?(t=t.i,(e=String(e).toString())in t.g&&(-1<(n=ye(i=t.g[e],n,s,r))&&(pe(i[n]),Array.prototype.splice.call(i,n,1),0==i.length&&(delete t.g[e],t.h--)))):t&&(t=_e(t))&&(e=t.g[e.toString()],t=-1,e&&(t=ye(e,n,s,r)),(n=-1<t?e[t]:null)&&Ce(n))}function Ce(t){if("number"!=typeof t&&t&&!t.ca){var e=t.src;if(e&&e[le])me(e.i,t);else{var n=t.type,s=t.proxy;e.removeEventListener?e.removeEventListener(n,s,t.capture):e.detachEvent?e.detachEvent(Se(n),s):e.addListener&&e.removeListener&&e.removeListener(s),(n=_e(e))?(me(n,t),0==n.h&&(n.src=null,e[ve]=null)):pe(t)}}}function Se(t){return t in we?we[t]:we[t]="on"+t}function Ae(t,e){if(t.ca)t=!0;else{e=new ue(e,this);var n=t.listener,s=t.ia||t.src;t.fa&&Ce(t),t=n.call(s,e)}return t}function _e(t){return(t=t[ve])instanceof ge?t:null}var De="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ne(t){return"function"==typeof t?t:(t[De]||(t[De]=function(e){return t.handleEvent(e)}),t[De])}function ke(){At.call(this),this.i=new ge(this),this.P=this,this.I=null}function Le(t,e){var n,s=t.I;if(s)for(n=[];s;s=s.I)n.push(s);if(t=t.P,s=e.type||e,"string"==typeof e)e=new ce(e,t);else if(e instanceof ce)e.target=e.target||t;else{var r=e;jt(e=new ce(s,t),r)}if(r=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];r=Re(o,s,!0,e)&&r}if(r=Re(o=e.g=t,s,!0,e)&&r,r=Re(o,s,!1,e)&&r,n)for(i=0;i<n.length;i++)r=Re(o=e.g=n[i],s,!1,e)&&r}function Re(t,e,n,s){if(!(e=t.i.g[String(e)]))return!0;e=e.concat();for(var r=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.ca&&o.capture==n){var a=o.listener,c=o.ia||o.src;o.fa&&me(t.i,o),r=!1!==a.call(c,s)&&r}}return r&&!s.defaultPrevented}St(ke,At),ke.prototype[le]=!0,ke.prototype.removeEventListener=function(t,e,n,s){Ie(this,t,e,n,s)},ke.prototype.M=function(){if(ke.Z.M.call(this),this.i){var t,e=this.i;for(t in e.g){for(var n=e.g[t],s=0;s<n.length;s++)pe(n[s]);delete e.g[t],e.h--}}this.I=null},ke.prototype.N=function(t,e,n,s){return this.i.add(String(t),e,!1,n,s)},ke.prototype.O=function(t,e,n,s){return this.i.add(String(t),e,!0,n,s)};var Oe=gt.JSON.stringify;function xe(){var t=$e;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}var Me,Ve=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}((()=>new Pe),(t=>t.reset()));class Pe{constructor(){this.next=this.g=this.h=null}set(t,e){this.h=t,this.g=e,this.next=null}reset(){this.next=this.g=this.h=null}}function Fe(t){gt.setTimeout((()=>{throw t}),0)}function Ue(t,e){Me||function(){var t=gt.Promise.resolve(void 0);Me=function(){t.then(je)}}(),Be||(Me(),Be=!0),$e.add(t,e)}var Be=!1,$e=new class{constructor(){this.h=this.g=null}add(t,e){const n=Ve.get();n.set(t,e),this.h?this.h.next=n:this.g=n,this.h=n}};function je(){for(var t;t=xe();){try{t.h.call(t.g)}catch(t){Fe(t)}var e=Ve;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}Be=!1}function qe(t,e){ke.call(this),this.h=t||1,this.g=e||gt,this.j=It(this.kb,this),this.l=Date.now()}function Ke(t){t.da=!1,t.S&&(t.g.clearTimeout(t.S),t.S=null)}function Ge(t,e,n){if("function"==typeof t)n&&(t=It(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=It(t.handleEvent,t)}return 2147483647<Number(e)?-1:gt.setTimeout(t,e||0)}function ze(t){t.g=Ge((()=>{t.g=null,t.i&&(t.i=!1,ze(t))}),t.j);const e=t.h;t.h=null,t.m.apply(null,e)}St(qe,ke),(lt=qe.prototype).da=!1,lt.S=null,lt.kb=function(){if(this.da){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.S=this.g.setTimeout(this.j,this.h-t):(this.S&&(this.g.clearTimeout(this.S),this.S=null),Le(this,"tick"),this.da&&(Ke(this),this.start()))}},lt.start=function(){this.da=!0,this.S||(this.S=this.g.setTimeout(this.j,this.h),this.l=Date.now())},lt.M=function(){qe.Z.M.call(this),Ke(this),delete this.g};class He extends At{constructor(t,e){super(),this.m=t,this.j=e,this.h=null,this.i=!1,this.g=null}l(t){this.h=arguments,this.g?this.i=!0:ze(this)}M(){super.M(),this.g&&(gt.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Qe(t){At.call(this),this.h=t,this.g={}}St(Qe,At);var We=[];function Xe(t,e,n,s){Array.isArray(n)||(n&&(We[0]=n.toString()),n=We);for(var r=0;r<n.length;r++){var i=Ee(e,n[r],s||t.handleEvent,!1,t.h||t);if(!i)break;t.g[i.key]=i}}function Ye(t){Ut(t.g,(function(t,e){this.g.hasOwnProperty(e)&&Ce(t)}),t),t.g={}}function Je(){this.g=!0}function Ze(t,e,n,s){t.info((function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var s=n[t];if(!(2>s.length)){var r=s[1];if(Array.isArray(r)&&!(1>r.length)){var i=r[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(var o=1;o<r.length;o++)r[o]=""}}}return Oe(n)}catch(t){return e}}(t,n)+(s?" "+s:"")}))}Qe.prototype.M=function(){Qe.Z.M.call(this),Ye(this)},Qe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},Je.prototype.Aa=function(){this.g=!1},Je.prototype.info=function(){};var tn={},en=null;function nn(){return en=en||new ke}function sn(t){ce.call(this,tn.Ma,t)}function rn(t){const e=nn();Le(e,new sn(e,t))}function on(t,e){ce.call(this,tn.STAT_EVENT,t),this.stat=e}function an(t){const e=nn();Le(e,new on(e,t))}function cn(t,e){ce.call(this,tn.Na,t),this.size=e}function un(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return gt.setTimeout((function(){t()}),e)}tn.Ma="serverreachability",St(sn,ce),tn.STAT_EVENT="statevent",St(on,ce),tn.Na="timingevent",St(cn,ce);var hn={NO_ERROR:0,lb:1,yb:2,xb:3,sb:4,wb:5,zb:6,Ja:7,TIMEOUT:8,Cb:9},ln={qb:"complete",Mb:"success",Ka:"error",Ja:"abort",Eb:"ready",Fb:"readystatechange",TIMEOUT:"timeout",Ab:"incrementaldata",Db:"progress",tb:"downloadprogress",Ub:"uploadprogress"};function dn(){}function fn(t){return t.h||(t.h=t.i())}function pn(){}dn.prototype.h=null;var gn,mn={OPEN:"a",pb:"b",Ka:"c",Bb:"d"};function yn(){ce.call(this,"d")}function vn(){ce.call(this,"c")}function wn(){}function En(t,e,n,s){this.l=t,this.j=e,this.m=n,this.X=s||1,this.V=new Qe(this),this.P=Tn,t=Wt?125:void 0,this.W=new qe(t),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.Y=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.N=-1,this.I=!1,this.O=0,this.L=null,this.aa=this.J=this.$=this.U=!1,this.h=new bn}function bn(){this.i=null,this.g="",this.h=!1}St(yn,ce),St(vn,ce),St(wn,dn),wn.prototype.g=function(){return new XMLHttpRequest},wn.prototype.i=function(){return{}},gn=new wn;var Tn=45e3,In={},Cn={};function Sn(t,e,n){t.K=1,t.v=Qn(jn(e)),t.s=n,t.U=!0,An(t,null)}function An(t,e){t.F=Date.now(),kn(t),t.A=jn(t.v);var n=t.A,s=t.X;Array.isArray(s)||(s=[String(s)]),as(n.h,"t",s),t.C=0,n=t.l.H,t.h=new bn,t.g=ar(t.l,n?e:null,!t.s),0<t.O&&(t.L=new He(It(t.Ia,t,t.g),t.O)),Xe(t.V,t.g,"readystatechange",t.gb),e=t.H?Bt(t.H):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.s,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),rn(1),function(t,e,n,s,r,i){t.info((function(){if(t.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var h=u[0];u=u[1];var l=h.split("_");o=2<=l.length&&"type"==l[1]?o+(h+"=")+u+"&":o+(h+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+s+") [attempt "+r+"]: "+e+"\n"+n+"\n"+o}))}(t.j,t.u,t.A,t.m,t.X,t.s)}function _n(t){return!!t.g&&("GET"==t.u&&2!=t.K&&t.l.Ba)}function Dn(t,e,n){let s,r=!0;for(;!t.I&&t.C<n.length;){if(s=Nn(t,n),s==Cn){4==e&&(t.o=4,an(14),r=!1),Ze(t.j,t.m,null,"[Incomplete Response]");break}if(s==In){t.o=4,an(15),Ze(t.j,t.m,n,"[Invalid Chunk]"),r=!1;break}Ze(t.j,t.m,s,null),Mn(t,s)}_n(t)&&s!=Cn&&s!=In&&(t.h.g="",t.C=0),4!=e||0!=n.length||t.h.h||(t.o=1,an(16),r=!1),t.i=t.i&&r,r?0<n.length&&!t.aa&&(t.aa=!0,(e=t.l).g==t&&e.$&&!e.L&&(e.h.info("Great, no buffering proxy detected. Bytes received: "+n.length),Zs(e),e.L=!0,an(11))):(Ze(t.j,t.m,n,"[Invalid Chunked Response]"),xn(t),On(t))}function Nn(t,e){var n=t.C,s=e.indexOf("\n",n);return-1==s?Cn:(n=Number(e.substring(n,s)),isNaN(n)?In:(s+=1)+n>e.length?Cn:(e=e.substr(s,n),t.C=s+n,e))}function kn(t){t.Y=Date.now()+t.P,Ln(t,t.P)}function Ln(t,e){if(null!=t.B)throw Error("WatchDog timer not null");t.B=un(It(t.eb,t),e)}function Rn(t){t.B&&(gt.clearTimeout(t.B),t.B=null)}function On(t){0==t.l.G||t.I||nr(t.l,t)}function xn(t){Rn(t);var e=t.L;e&&"function"==typeof e.na&&e.na(),t.L=null,Ke(t.W),Ye(t.V),t.g&&(e=t.g,t.g=null,e.abort(),e.na())}function Mn(t,e){try{var n=t.l;if(0!=n.G&&(n.g==t||fs(n.i,t)))if(n.I=t.N,!t.J&&fs(n.i,t)&&3==n.G){try{var s=n.Ca.g.parse(e)}catch(t){s=null}if(Array.isArray(s)&&3==s.length){var r=s;if(0==r[0]){t:if(!n.u){if(n.g){if(!(n.g.F+3e3<t.F))break t;er(n),Ks(n)}Js(n),an(18)}}else n.ta=r[1],0<n.ta-n.U&&37500>r[2]&&n.N&&0==n.A&&!n.v&&(n.v=un(It(n.ab,n),6e3));if(1>=ds(n.i)&&n.ka){try{n.ka()}catch(t){}n.ka=void 0}}else rr(n,11)}else if((t.J||n.g==t)&&er(n),!Rt(e))for(r=n.Ca.g.parse(e),e=0;e<r.length;e++){let u=r[e];if(n.U=u[0],u=u[1],2==n.G)if("c"==u[0]){n.J=u[1],n.la=u[2];const e=u[3];null!=e&&(n.ma=e,n.h.info("VER="+n.ma));const r=u[4];null!=r&&(n.za=r,n.h.info("SVER="+n.za));const h=u[5];null!=h&&"number"==typeof h&&0<h&&(s=1.5*h,n.K=s,n.h.info("backChannelRequestTimeoutMs_="+s)),s=n;const l=t.g;if(l){const t=l.g?l.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(t){var i=s.i;!i.g&&(Mt(t,"spdy")||Mt(t,"quic")||Mt(t,"h2"))&&(i.j=i.l,i.g=new Set,i.h&&(ps(i,i.h),i.h=null))}if(s.D){const t=l.g?l.g.getResponseHeader("X-HTTP-Session-Id"):null;t&&(s.sa=t,Hn(s.F,s.D,t))}}n.G=3,n.j&&n.j.xa(),n.$&&(n.O=Date.now()-t.F,n.h.info("Handshake RTT: "+n.O+"ms"));var o=t;if((s=n).oa=or(s,s.H?s.la:null,s.W),o.J){gs(s.i,o);var a=o,c=s.K;c&&a.setTimeout(c),a.B&&(Rn(a),kn(a)),s.g=o}else Ys(s);0<n.l.length&&Hs(n)}else"stop"!=u[0]&&"close"!=u[0]||rr(n,7);else 3==n.G&&("stop"==u[0]||"close"==u[0]?"stop"==u[0]?rr(n,7):qs(n):"noop"!=u[0]&&n.j&&n.j.wa(u),n.A=0)}rn(4)}catch(t){}}function Vn(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(yt(t)||"string"==typeof t)Nt(t,e,void 0);else{if(t.T&&"function"==typeof t.T)var n=t.T();else if(t.R&&"function"==typeof t.R)n=void 0;else if(yt(t)||"string"==typeof t){n=[];for(var s=t.length,r=0;r<s;r++)n.push(r)}else for(r in n=[],s=0,t)n[s++]=r;s=function(t){if(t.R&&"function"==typeof t.R)return t.R();if("string"==typeof t)return t.split("");if(yt(t)){for(var e=[],n=t.length,s=0;s<n;s++)e.push(t[s]);return e}for(s in e=[],n=0,t)e[n++]=t[s];return e}(t),r=s.length;for(var i=0;i<r;i++)e.call(void 0,s[i],n&&n[i],t)}}function Pn(t,e){this.h={},this.g=[],this.i=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var s=0;s<n;s+=2)this.set(arguments[s],arguments[s+1])}else if(t)if(t instanceof Pn)for(n=t.T(),s=0;s<n.length;s++)this.set(n[s],t.get(n[s]));else for(s in t)this.set(s,t[s])}function Fn(t){if(t.i!=t.g.length){for(var e=0,n=0;e<t.g.length;){var s=t.g[e];Un(t.h,s)&&(t.g[n++]=s),e++}t.g.length=n}if(t.i!=t.g.length){var r={};for(n=e=0;e<t.g.length;)Un(r,s=t.g[e])||(t.g[n++]=s,r[s]=1),e++;t.g.length=n}}function Un(t,e){return Object.prototype.hasOwnProperty.call(t,e)}(lt=En.prototype).setTimeout=function(t){this.P=t},lt.gb=function(t){t=t.target;const e=this.L;e&&3==Fs(t)?e.l():this.Ia(t)},lt.Ia=function(t){try{if(t==this.g)t:{const h=Fs(this.g);var e=this.g.Da();const l=this.g.ba();if(!(3>h)&&(3!=h||Wt||this.g&&(this.h.h||this.g.ga()||Us(this.g)))){this.I||4!=h||7==e||rn(8==e||0>=l?3:2),Rn(this);var n=this.g.ba();this.N=n;e:if(_n(this)){var s=Us(this.g);t="";var r=s.length,i=4==Fs(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){xn(this),On(this);var o="";break e}this.h.i=new gt.TextDecoder}for(e=0;e<r;e++)this.h.h=!0,t+=this.h.i.decode(s[e],{stream:i&&e==r-1});s.splice(0,r),this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.ga();if(this.i=200==n,function(t,e,n,s,r,i,o){t.info((function(){return"XMLHTTP RESP ("+s+") [ attempt "+r+"]: "+e+"\n"+n+"\n"+i+" "+o}))}(this.j,this.u,this.A,this.m,this.X,h,n),this.i){if(this.$&&!this.J){e:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Rt(a)){var u=a;break e}}u=null}if(!(n=u)){this.i=!1,this.o=3,an(12),xn(this),On(this);break t}Ze(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,Mn(this,n)}this.U?(Dn(this,h,o),Wt&&this.i&&3==h&&(Xe(this.V,this.W,"tick",this.fb),this.W.start())):(Ze(this.j,this.m,o,null),Mn(this,o)),4==h&&xn(this),this.i&&!this.I&&(4==h?nr(this.l,this):(this.i=!1,kn(this)))}else 400==n&&0<o.indexOf("Unknown SID")?(this.o=3,an(12)):(this.o=0,an(13)),xn(this),On(this)}}}catch(t){}},lt.fb=function(){if(this.g){var t=Fs(this.g),e=this.g.ga();this.C<e.length&&(Rn(this),Dn(this,t,e),this.i&&4!=t&&kn(this))}},lt.cancel=function(){this.I=!0,xn(this)},lt.eb=function(){this.B=null;const t=Date.now();0<=t-this.Y?(function(t,e){t.info((function(){return"TIMEOUT: "+e}))}(this.j,this.A),2!=this.K&&(rn(3),an(17)),xn(this),this.o=2,On(this)):Ln(this,this.Y-t)},(lt=Pn.prototype).R=function(){Fn(this);for(var t=[],e=0;e<this.g.length;e++)t.push(this.h[this.g[e]]);return t},lt.T=function(){return Fn(this),this.g.concat()},lt.get=function(t,e){return Un(this.h,t)?this.h[t]:e},lt.set=function(t,e){Un(this.h,t)||(this.i++,this.g.push(t)),this.h[t]=e},lt.forEach=function(t,e){for(var n=this.T(),s=0;s<n.length;s++){var r=n[s],i=this.get(r);t.call(e,i,r,this)}};var Bn=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function $n(t,e){if(this.i=this.s=this.j="",this.m=null,this.o=this.l="",this.g=!1,t instanceof $n){this.g=void 0!==e?e:t.g,qn(this,t.j),this.s=t.s,Kn(this,t.i),Gn(this,t.m),this.l=t.l,e=t.h;var n=new ss;n.i=e.i,e.g&&(n.g=new Pn(e.g),n.h=e.h),zn(this,n),this.o=t.o}else t&&(n=String(t).match(Bn))?(this.g=!!e,qn(this,n[1]||"",!0),this.s=Wn(n[2]||""),Kn(this,n[3]||"",!0),Gn(this,n[4]),this.l=Wn(n[5]||"",!0),zn(this,n[6]||"",!0),this.o=Wn(n[7]||"")):(this.g=!!e,this.h=new ss(null,this.g))}function jn(t){return new $n(t)}function qn(t,e,n){t.j=n?Wn(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function Kn(t,e,n){t.i=n?Wn(e,!0):e}function Gn(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function zn(t,e,n){e instanceof ss?(t.h=e,function(t,e){e&&!t.j&&(rs(t),t.i=null,t.g.forEach((function(t,e){var n=e.toLowerCase();e!=n&&(is(this,e),as(this,n,t))}),t)),t.j=e}(t.h,t.g)):(n||(e=Xn(e,es)),t.h=new ss(e,t.g))}function Hn(t,e,n){t.h.set(e,n)}function Qn(t){return Hn(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function Wn(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function Xn(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,Yn),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function Yn(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}$n.prototype.toString=function(){var t=[],e=this.j;e&&t.push(Xn(e,Jn,!0),":");var n=this.i;return(n||"file"==e)&&(t.push("//"),(e=this.s)&&t.push(Xn(e,Jn,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.m)&&t.push(":",String(n))),(n=this.l)&&(this.i&&"/"!=n.charAt(0)&&t.push("/"),t.push(Xn(n,"/"==n.charAt(0)?ts:Zn,!0))),(n=this.h.toString())&&t.push("?",n),(n=this.o)&&t.push("#",Xn(n,ns)),t.join("")};var Jn=/[#\/\?@]/g,Zn=/[#\?:]/g,ts=/[#\?]/g,es=/[#\?@]/g,ns=/#/g;function ss(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function rs(t){t.g||(t.g=new Pn,t.h=0,t.i&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var s=t[n].indexOf("="),r=null;if(0<=s){var i=t[n].substring(0,s);r=t[n].substring(s+1)}else i=t[n];e(i,r?decodeURIComponent(r.replace(/\+/g," ")):"")}}}(t.i,(function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)})))}function is(t,e){rs(t),e=cs(t,e),Un(t.g.h,e)&&(t.i=null,t.h-=t.g.get(e).length,Un((t=t.g).h,e)&&(delete t.h[e],t.i--,t.g.length>2*t.i&&Fn(t)))}function os(t,e){return rs(t),e=cs(t,e),Un(t.g.h,e)}function as(t,e,n){is(t,e),0<n.length&&(t.i=null,t.g.set(cs(t,e),Lt(n)),t.h+=n.length)}function cs(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}(lt=ss.prototype).add=function(t,e){rs(this),this.i=null,t=cs(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this},lt.forEach=function(t,e){rs(this),this.g.forEach((function(n,s){Nt(n,(function(n){t.call(e,n,s,this)}),this)}),this)},lt.T=function(){rs(this);for(var t=this.g.R(),e=this.g.T(),n=[],s=0;s<e.length;s++)for(var r=t[s],i=0;i<r.length;i++)n.push(e[s]);return n},lt.R=function(t){rs(this);var e=[];if("string"==typeof t)os(this,t)&&(e=kt(e,this.g.get(cs(this,t))));else{t=this.g.R();for(var n=0;n<t.length;n++)e=kt(e,t[n])}return e},lt.set=function(t,e){return rs(this),this.i=null,os(this,t=cs(this,t))&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this},lt.get=function(t,e){return t&&0<(t=this.R(t)).length?String(t[0]):e},lt.toString=function(){if(this.i)return this.i;if(!this.g)return"";for(var t=[],e=this.g.T(),n=0;n<e.length;n++){var s=e[n],r=encodeURIComponent(String(s));s=this.R(s);for(var i=0;i<s.length;i++){var o=r;""!==s[i]&&(o+="="+encodeURIComponent(String(s[i]))),t.push(o)}}return this.i=t.join("&")};function us(t){this.l=t||hs,gt.PerformanceNavigationTiming?t=0<(t=gt.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(gt.g&&gt.g.Ea&&gt.g.Ea()&&gt.g.Ea().Zb),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var hs=10;function ls(t){return!!t.h||!!t.g&&t.g.size>=t.j}function ds(t){return t.h?1:t.g?t.g.size:0}function fs(t,e){return t.h?t.h==e:!!t.g&&t.g.has(e)}function ps(t,e){t.g?t.g.add(e):t.h=e}function gs(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}function ms(t){if(null!=t.h)return t.i.concat(t.h.D);if(null!=t.g&&0!==t.g.size){let e=t.i;for(const n of t.g.values())e=e.concat(n.D);return e}return Lt(t.i)}function ys(){}function vs(){this.g=new ys}function ws(t,e,n){const s=n||"";try{Vn(t,(function(t,n){let r=t;vt(t)&&(r=Oe(t)),e.push(s+n+"="+encodeURIComponent(r))}))}catch(t){throw e.push(s+"type="+encodeURIComponent("_badmap")),t}}function Es(t,e,n,s,r){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,r(s)}catch(t){}}function bs(t){this.l=t.$b||null,this.j=t.ib||!1}function Ts(t,e){ke.call(this),this.D=t,this.u=e,this.m=void 0,this.readyState=Is,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}us.prototype.cancel=function(){if(this.i=ms(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const t of this.g.values())t.cancel();this.g.clear()}},ys.prototype.stringify=function(t){return gt.JSON.stringify(t,void 0)},ys.prototype.parse=function(t){return gt.JSON.parse(t,void 0)},St(bs,dn),bs.prototype.g=function(){return new Ts(this.l,this.j)},bs.prototype.i=function(t){return function(){return t}}({}),St(Ts,ke);var Is=0;function Cs(t){t.j.read().then(t.Sa.bind(t)).catch(t.ha.bind(t))}function Ss(t){t.readyState=4,t.l=null,t.j=null,t.A=null,As(t)}function As(t){t.onreadystatechange&&t.onreadystatechange.call(t)}(lt=Ts.prototype).open=function(t,e){if(this.readyState!=Is)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,As(this)},lt.send=function(t){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||gt).fetch(new Request(this.B,e)).then(this.Va.bind(this),this.ha.bind(this))},lt.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted."),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,Ss(this)),this.readyState=Is},lt.Va=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,As(this)),this.g&&(this.readyState=3,As(this),this.g)))if("arraybuffer"===this.responseType)t.arrayBuffer().then(this.Ta.bind(this),this.ha.bind(this));else if(void 0!==gt.ReadableStream&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;Cs(this)}else t.text().then(this.Ua.bind(this),this.ha.bind(this))},lt.Sa=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?Ss(this):As(this),3==this.readyState&&Cs(this)}},lt.Ua=function(t){this.g&&(this.response=this.responseText=t,Ss(this))},lt.Ta=function(t){this.g&&(this.response=t,Ss(this))},lt.ha=function(){this.g&&Ss(this)},lt.setRequestHeader=function(t,e){this.v.append(t,e)},lt.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},lt.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join("\r\n")},Object.defineProperty(Ts.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(t){this.m=t?"include":"same-origin"}});var _s=gt.JSON.parse;function Ds(t){ke.call(this),this.headers=new Pn,this.u=t||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=Ns,this.K=this.L=!1}St(Ds,ke);var Ns="",ks=/^https?$/i,Ls=["POST","PUT"];function Rs(t){return"content-type"==t.toLowerCase()}function Os(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,xs(t),Vs(t)}function xs(t){t.D||(t.D=!0,Le(t,"complete"),Le(t,"error"))}function Ms(t){if(t.h&&void 0!==pt&&(!t.C[1]||4!=Fs(t)||2!=t.ba()))if(t.v&&4==Fs(t))Ge(t.Fa,0,t);else if(Le(t,"readystatechange"),4==Fs(t)){t.h=!1;try{const a=t.ba();t:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break t;default:e=!1}var n;if(!(n=e)){var s;if(s=0===a){var r=String(t.H).match(Bn)[1]||null;if(!r&&gt.self&&gt.self.location){var i=gt.self.location.protocol;r=i.substr(0,i.length-1)}s=!ks.test(r?r.toLowerCase():"")}n=s}if(n)Le(t,"complete"),Le(t,"success");else{t.m=6;try{var o=2<Fs(t)?t.g.statusText:""}catch(t){o=""}t.j=o+" ["+t.ba()+"]",xs(t)}}finally{Vs(t)}}}function Vs(t,e){if(t.g){Ps(t);const n=t.g,s=t.C[0]?mt:null;t.g=null,t.C=null,e||Le(t,"ready");try{n.onreadystatechange=s}catch(t){}}}function Ps(t){t.g&&t.K&&(t.g.ontimeout=null),t.A&&(gt.clearTimeout(t.A),t.A=null)}function Fs(t){return t.g?t.g.readyState:0}function Us(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.J){case Ns:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch(t){return null}}function Bs(t,e,n){t:{for(s in n){var s=!1;break t}s=!0}s||(n=function(t){let e="";return Ut(t,(function(t,n){e+=n,e+=":",e+=t,e+="\r\n"})),e}(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):Hn(t,e,n))}function $s(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function js(t){this.za=0,this.l=[],this.h=new Je,this.la=this.oa=this.F=this.W=this.g=this.sa=this.D=this.aa=this.o=this.P=this.s=null,this.Za=this.V=0,this.Xa=$s("failFast",!1,t),this.N=this.v=this.u=this.m=this.j=null,this.X=!0,this.I=this.ta=this.U=-1,this.Y=this.A=this.C=0,this.Pa=$s("baseRetryDelayMs",5e3,t),this.$a=$s("retryDelaySeedMs",1e4,t),this.Ya=$s("forwardChannelMaxRetries",2,t),this.ra=$s("forwardChannelRequestTimeoutMs",2e4,t),this.qa=t&&t.xmlHttpFactory||void 0,this.Ba=t&&t.Yb||!1,this.K=void 0,this.H=t&&t.supportsCrossDomainXhr||!1,this.J="",this.i=new us(t&&t.concurrentRequestLimit),this.Ca=new vs,this.ja=t&&t.fastHandshake||!1,this.Ra=t&&t.Wb||!1,t&&t.Aa&&this.h.Aa(),t&&t.forceLongPolling&&(this.X=!1),this.$=!this.ja&&this.X&&t&&t.detectBufferingProxy||!1,this.ka=void 0,this.O=0,this.L=!1,this.B=null,this.Wa=!t||!1!==t.Xb}function qs(t){if(Gs(t),3==t.G){var e=t.V++,n=jn(t.F);Hn(n,"SID",t.J),Hn(n,"RID",e),Hn(n,"TYPE","terminate"),Ws(t,n),(e=new En(t,t.h,e,void 0)).K=2,e.v=Qn(jn(n)),n=!1,gt.navigator&&gt.navigator.sendBeacon&&(n=gt.navigator.sendBeacon(e.v.toString(),"")),!n&&gt.Image&&((new Image).src=e.v,n=!0),n||(e.g=ar(e.l,null),e.g.ea(e.v)),e.F=Date.now(),kn(e)}ir(t)}function Ks(t){t.g&&(Zs(t),t.g.cancel(),t.g=null)}function Gs(t){Ks(t),t.u&&(gt.clearTimeout(t.u),t.u=null),er(t),t.i.cancel(),t.m&&("number"==typeof t.m&&gt.clearTimeout(t.m),t.m=null)}function zs(t,e){t.l.push(new class{constructor(t,e){this.h=t,this.g=e}}(t.Za++,e)),3==t.G&&Hs(t)}function Hs(t){ls(t.i)||t.m||(t.m=!0,Ue(t.Ha,t),t.C=0)}function Qs(t,e){var n;n=e?e.m:t.V++;const s=jn(t.F);Hn(s,"SID",t.J),Hn(s,"RID",n),Hn(s,"AID",t.U),Ws(t,s),t.o&&t.s&&Bs(s,t.o,t.s),n=new En(t,t.h,n,t.C+1),null===t.o&&(n.H=t.s),e&&(t.l=e.D.concat(t.l)),e=Xs(t,n,1e3),n.setTimeout(Math.round(.5*t.ra)+Math.round(.5*t.ra*Math.random())),ps(t.i,n),Sn(n,s,e)}function Ws(t,e){t.j&&Vn({},(function(t,n){Hn(e,n,t)}))}function Xs(t,e,n){n=Math.min(t.l.length,n);var s=t.j?It(t.j.Oa,t.j,t):null;t:{var r=t.l;let e=-1;for(;;){const t=["count="+n];-1==e?0<n?(e=r[0].h,t.push("ofs="+e)):e=0:t.push("ofs="+e);let i=!0;for(let o=0;o<n;o++){let n=r[o].h;const a=r[o].g;if(n-=e,0>n)e=Math.max(0,r[o].h-100),i=!1;else try{ws(a,t,"req"+n+"_")}catch(t){s&&s(a)}}if(i){s=t.join("&");break t}}}return t=t.l.splice(0,n),e.D=t,s}function Ys(t){t.g||t.u||(t.Y=1,Ue(t.Ga,t),t.A=0)}function Js(t){return!(t.g||t.u||3<=t.A)&&(t.Y++,t.u=un(It(t.Ga,t),sr(t,t.A)),t.A++,!0)}function Zs(t){null!=t.B&&(gt.clearTimeout(t.B),t.B=null)}function tr(t){t.g=new En(t,t.h,"rpc",t.Y),null===t.o&&(t.g.H=t.s),t.g.O=0;var e=jn(t.oa);Hn(e,"RID","rpc"),Hn(e,"SID",t.J),Hn(e,"CI",t.N?"0":"1"),Hn(e,"AID",t.U),Ws(t,e),Hn(e,"TYPE","xmlhttp"),t.o&&t.s&&Bs(e,t.o,t.s),t.K&&t.g.setTimeout(t.K);var n=t.g;t=t.la,n.K=1,n.v=Qn(jn(e)),n.s=null,n.U=!0,An(n,t)}function er(t){null!=t.v&&(gt.clearTimeout(t.v),t.v=null)}function nr(t,e){var n=null;if(t.g==e){er(t),Zs(t),t.g=null;var s=2}else{if(!fs(t.i,e))return;n=e.D,gs(t.i,e),s=1}if(t.I=e.N,0!=t.G)if(e.i)if(1==s){n=e.s?e.s.length:0,e=Date.now()-e.F;var r=t.C;Le(s=nn(),new cn(s,n,e,r)),Hs(t)}else Ys(t);else if(3==(r=e.o)||0==r&&0<t.I||!(1==s&&function(t,e){return!(ds(t.i)>=t.i.j-(t.m?1:0)||(t.m?(t.l=e.D.concat(t.l),0):1==t.G||2==t.G||t.C>=(t.Xa?0:t.Ya)||(t.m=un(It(t.Ha,t,e),sr(t,t.C)),t.C++,0)))}(t,e)||2==s&&Js(t)))switch(n&&0<n.length&&(e=t.i,e.i=e.i.concat(n)),r){case 1:rr(t,5);break;case 4:rr(t,10);break;case 3:rr(t,6);break;default:rr(t,2)}}function sr(t,e){let n=t.Pa+Math.floor(Math.random()*t.$a);return t.j||(n*=2),n*e}function rr(t,e){if(t.h.info("Error code "+e),2==e){var n=null;t.j&&(n=null);var s=It(t.jb,t);n||(n=new $n("//www.google.com/images/cleardot.gif"),gt.location&&"http"==gt.location.protocol||qn(n,"https"),Qn(n)),function(t,e){const n=new Je;if(gt.Image){const s=new Image;s.onload=Ct(Es,n,s,"TestLoadImage: loaded",!0,e),s.onerror=Ct(Es,n,s,"TestLoadImage: error",!1,e),s.onabort=Ct(Es,n,s,"TestLoadImage: abort",!1,e),s.ontimeout=Ct(Es,n,s,"TestLoadImage: timeout",!1,e),gt.setTimeout((function(){s.ontimeout&&s.ontimeout()}),1e4),s.src=t}else e(!1)}(n.toString(),s)}else an(2);t.G=0,t.j&&t.j.va(e),ir(t),Gs(t)}function ir(t){t.G=0,t.I=-1,t.j&&(0==ms(t.i).length&&0==t.l.length||(t.i.i.length=0,Lt(t.l),t.l.length=0),t.j.ua())}function or(t,e,n){let s=function(t){return t instanceof $n?jn(t):new $n(t,void 0)}(n);if(""!=s.i)e&&Kn(s,e+"."+s.i),Gn(s,s.m);else{const t=gt.location;s=function(t,e,n,s){var r=new $n(null,void 0);return t&&qn(r,t),e&&Kn(r,e),n&&Gn(r,n),s&&(r.l=s),r}(t.protocol,e?e+"."+t.hostname:t.hostname,+t.port,n)}return t.aa&&Ut(t.aa,(function(t,e){Hn(s,e,t)})),e=t.D,n=t.sa,e&&n&&Hn(s,e,n),Hn(s,"VER",t.ma),Ws(t,s),s}function ar(t,e,n){if(e&&!t.H)throw Error("Can't create secondary domain capable XhrIo object.");return(e=n&&t.Ba&&!t.qa?new Ds(new bs({ib:!0})):new Ds(t.qa)).L=t.H,e}function cr(){}function ur(){if(Ht&&!(10<=Number(oe)))throw Error("Environmental error: no available transport.")}function hr(t,e){ke.call(this),this.g=new js(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.ya&&(t?t["X-WebChannel-Client-Profile"]=e.ya:t={"X-WebChannel-Client-Profile":e.ya}),this.g.P=t,(t=e&&e.httpHeadersOverwriteParam)&&!Rt(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!Rt(e)&&(this.g.D=e,null!==(t=this.h)&&e in t&&(e in(t=this.h)&&delete t[e])),this.j=new fr(this)}function lr(t){yn.call(this);var e=t.__sm__;if(e){t:{for(const n in e){t=n;break t}t=void 0}(this.i=t)&&(t=this.i,e=null!==e&&t in e?e[t]:void 0),this.data=e}else this.data=t}function dr(){vn.call(this),this.status=1}function fr(t){this.g=t}(lt=Ds.prototype).ea=function(t,e,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+t);e=e?e.toUpperCase():"GET",this.H=t,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():gn.g(),this.C=this.u?fn(this.u):fn(gn),this.g.onreadystatechange=It(this.Fa,this);try{this.F=!0,this.g.open(e,String(t),!0),this.F=!1}catch(t){return void Os(this,t)}t=n||"";const r=new Pn(this.headers);s&&Vn(s,(function(t,e){r.set(e,t)})),s=function(t){t:{var e=Rs;const n=t.length,s="string"==typeof t?t.split(""):t;for(let r=0;r<n;r++)if(r in s&&e.call(void 0,s[r],r,t)){e=r;break t}e=-1}return 0>e?null:"string"==typeof t?t.charAt(e):t[e]}(r.T()),n=gt.FormData&&t instanceof gt.FormData,!(0<=Dt(Ls,e))||s||n||r.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),r.forEach((function(t,e){this.g.setRequestHeader(e,t)}),this),this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{Ps(this),0<this.B&&((this.K=function(t){return Ht&&re()&&"number"==typeof t.timeout&&void 0!==t.ontimeout}(this.g))?(this.g.timeout=this.B,this.g.ontimeout=It(this.pa,this)):this.A=Ge(this.pa,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(t){Os(this,t)}},lt.pa=function(){void 0!==pt&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,Le(this,"timeout"),this.abort(8))},lt.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,Le(this,"complete"),Le(this,"abort"),Vs(this))},lt.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Vs(this,!0)),Ds.Z.M.call(this)},lt.Fa=function(){this.s||(this.F||this.v||this.l?Ms(this):this.cb())},lt.cb=function(){Ms(this)},lt.ba=function(){try{return 2<Fs(this)?this.g.status:-1}catch(t){return-1}},lt.ga=function(){try{return this.g?this.g.responseText:""}catch(t){return""}},lt.Qa=function(t){if(this.g){var e=this.g.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),_s(e)}},lt.Da=function(){return this.m},lt.La=function(){return"string"==typeof this.j?this.j:String(this.j)},(lt=js.prototype).ma=8,lt.G=1,lt.hb=function(t){try{this.h.info("Origin Trials invoked: "+t)}catch(t){}},lt.Ha=function(t){if(this.m)if(this.m=null,1==this.G){if(!t){this.V=Math.floor(1e5*Math.random()),t=this.V++;const r=new En(this,this.h,t,void 0);let i=this.s;if(this.P&&(i?(i=Bt(i),jt(i,this.P)):i=this.P),null===this.o&&(r.H=i),this.ja)t:{for(var e=0,n=0;n<this.l.length;n++){var s=this.l[n];if(void 0===(s="__data__"in s.g&&"string"==typeof(s=s.g.__data__)?s.length:void 0))break;if(4096<(e+=s)){e=n;break t}if(4096===e||n===this.l.length-1){e=n+1;break t}}e=1e3}else e=1e3;e=Xs(this,r,e),Hn(n=jn(this.F),"RID",t),Hn(n,"CVER",22),this.D&&Hn(n,"X-HTTP-Session-Id",this.D),Ws(this,n),this.o&&i&&Bs(n,this.o,i),ps(this.i,r),this.Ra&&Hn(n,"TYPE","init"),this.ja?(Hn(n,"$req",e),Hn(n,"SID","null"),r.$=!0,Sn(r,n,null)):Sn(r,n,e),this.G=2}}else 3==this.G&&(t?Qs(this,t):0==this.l.length||ls(this.i)||Qs(this))},lt.Ga=function(){if(this.u=null,tr(this),this.$&&!(this.L||null==this.g||0>=this.O)){var t=2*this.O;this.h.info("BP detection timer enabled: "+t),this.B=un(It(this.bb,this),t)}},lt.bb=function(){this.B&&(this.B=null,this.h.info("BP detection timeout reached."),this.h.info("Buffering proxy detected and switch to long-polling!"),this.N=!1,this.L=!0,an(10),Ks(this),tr(this))},lt.ab=function(){null!=this.v&&(this.v=null,Ks(this),Js(this),an(19))},lt.jb=function(t){t?(this.h.info("Successfully pinged google.com"),an(2)):(this.h.info("Failed to ping google.com"),an(1))},(lt=cr.prototype).xa=function(){},lt.wa=function(){},lt.va=function(){},lt.ua=function(){},lt.Oa=function(){},ur.prototype.g=function(t,e){return new hr(t,e)},St(hr,ke),hr.prototype.m=function(){this.g.j=this.j,this.A&&(this.g.H=!0);var t=this.g,e=this.l,n=this.h||void 0;t.Wa&&(t.h.info("Origin Trials enabled."),Ue(It(t.hb,t,e))),an(0),t.W=e,t.aa=n||{},t.N=t.X,t.F=or(t,null,t.W),Hs(t)},hr.prototype.close=function(){qs(this.g)},hr.prototype.u=function(t){if("string"==typeof t){var e={};e.__data__=t,zs(this.g,e)}else this.v?((e={}).__data__=Oe(t),zs(this.g,e)):zs(this.g,t)},hr.prototype.M=function(){this.g.j=null,delete this.j,qs(this.g),delete this.g,hr.Z.M.call(this)},St(lr,yn),St(dr,vn),St(fr,cr),fr.prototype.xa=function(){Le(this.g,"a")},fr.prototype.wa=function(t){Le(this.g,new lr(t))},fr.prototype.va=function(t){Le(this.g,new dr(t))},fr.prototype.ua=function(){Le(this.g,"b")},ur.prototype.createWebChannel=ur.prototype.g,hr.prototype.send=hr.prototype.u,hr.prototype.open=hr.prototype.m,hr.prototype.close=hr.prototype.close,hn.NO_ERROR=0,hn.TIMEOUT=8,hn.HTTP_ERROR=6,ln.COMPLETE="complete",pn.EventType=mn,mn.OPEN="a",mn.CLOSE="b",mn.ERROR="c",mn.MESSAGE="d",ke.prototype.listen=ke.prototype.N,Ds.prototype.listenOnce=Ds.prototype.O,Ds.prototype.getLastError=Ds.prototype.La,Ds.prototype.getLastErrorCode=Ds.prototype.Da,Ds.prototype.getStatus=Ds.prototype.ba,Ds.prototype.getResponseJson=Ds.prototype.Qa,Ds.prototype.getResponseText=Ds.prototype.ga,Ds.prototype.send=Ds.prototype.ea;var pr,gr,mr=ft.createWebChannelTransport=function(){return new ur},yr=ft.getStatEventTarget=function(){return nn()},vr=ft.ErrorCode=hn,wr=ft.EventType=ln,Er=ft.Event=tn,br=ft.Stat={rb:0,ub:1,vb:2,Ob:3,Tb:4,Qb:5,Rb:6,Pb:7,Nb:8,Sb:9,PROXY:10,NOPROXY:11,Lb:12,Hb:13,Ib:14,Gb:15,Jb:16,Kb:17,nb:18,mb:19,ob:20},Tr=ft.FetchXmlHttpFactory=bs,Ir=ft.WebChannel=pn,Cr=ft.XhrIo=Ds,Sr={};function Ar(){throw new Error("setTimeout has not been defined")}function _r(){throw new Error("clearTimeout has not been defined")}function Dr(t){if(pr===setTimeout)return setTimeout(t,0);if((pr===Ar||!pr)&&setTimeout)return pr=setTimeout,setTimeout(t,0);try{return pr(t,0)}catch(e){try{return pr.call(null,t,0)}catch(e){return pr.call(this,t,0)}}}!function(){try{pr="function"==typeof setTimeout?setTimeout:Ar}catch(t){pr=Ar}try{gr="function"==typeof clearTimeout?clearTimeout:_r}catch(t){gr=_r}}();var Nr,kr=[],Lr=!1,Rr=-1;function Or(){Lr&&Nr&&(Lr=!1,Nr.length?kr=Nr.concat(kr):Rr=-1,kr.length&&xr())}function xr(){if(!Lr){var t=Dr(Or);Lr=!0;for(var e=kr.length;e;){for(Nr=kr,kr=[];++Rr<e;)Nr&&Nr[Rr].run();Rr=-1,e=kr.length}Nr=null,Lr=!1,function(t){if(gr===clearTimeout)return clearTimeout(t);if((gr===_r||!gr)&&clearTimeout)return gr=clearTimeout,clearTimeout(t);try{gr(t)}catch(e){try{return gr.call(null,t)}catch(e){return gr.call(this,t)}}}(t)}}function Mr(t,e){this.fun=t,this.array=e}function Vr(){}Sr.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];kr.push(new Mr(t,e)),1!==kr.length||Lr||Dr(xr)},Mr.prototype.run=function(){this.fun.apply(null,this.array)},Sr.title="browser",Sr.browser=!0,Sr.env={},Sr.argv=[],Sr.version="",Sr.versions={},Sr.on=Vr,Sr.addListener=Vr,Sr.once=Vr,Sr.off=Vr,Sr.removeListener=Vr,Sr.removeAllListeners=Vr,Sr.emit=Vr,Sr.prependListener=Vr,Sr.prependOnceListener=Vr,Sr.listeners=function(t){return[]},Sr.binding=function(t){throw new Error("process.binding is not supported")},Sr.cwd=function(){return"/"},Sr.chdir=function(t){throw new Error("process.chdir is not supported")},Sr.umask=function(){return 0};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pr{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Pr.UNAUTHENTICATED=new Pr(null),Pr.GOOGLE_CREDENTIALS=new Pr("google-credentials-uid"),Pr.FIRST_PARTY=new Pr("first-party-uid"),Pr.MOCK_USER=new Pr("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Fr="9.9.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ur=new S("@firebase/firestore");function Br(){return Ur.logLevel}function $r(t,...e){if(Ur.logLevel<=w.DEBUG){const n=e.map(Kr);Ur.debug(`Firestore (${Fr}): ${t}`,...n)}}function jr(t,...e){if(Ur.logLevel<=w.ERROR){const n=e.map(Kr);Ur.error(`Firestore (${Fr}): ${t}`,...n)}}function qr(t,...e){if(Ur.logLevel<=w.WARN){const n=e.map(Kr);Ur.warn(`Firestore (${Fr}): ${t}`,...n)}}function Kr(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e)}catch(e){return t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gr(t="Unexpected state"){const e=`FIRESTORE (${Fr}) INTERNAL ASSERTION FAILED: `+t;throw jr(e),new Error(e)}function zr(t,e){t||Gr()}function Hr(t,e){return t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Wr extends u{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Jr{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(Pr.UNAUTHENTICATED)))}shutdown(){}}class Zr{constructor(t){this.t=t,this.currentUser=Pr.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){let n=this.i;const s=t=>this.i!==n?(n=this.i,e(t)):Promise.resolve();let r=new Xr;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new Xr,t.enqueueRetryable((()=>s(this.currentUser)))};const i=()=>{const e=r;t.enqueueRetryable((async()=>{await e.promise,await s(this.currentUser)}))},o=t=>{$r("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=t,this.auth.addAuthTokenListener(this.o),i()};this.t.onInit((t=>o(t))),setTimeout((()=>{if(!this.auth){const t=this.t.getImmediate({optional:!0});t?o(t):($r("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new Xr)}}),0),i()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((e=>this.i!==t?($r("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(zr("string"==typeof e.accessToken),new Yr(e.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const t=this.auth&&this.auth.getUid();return zr(null===t||"string"==typeof t),new Pr(t)}}class ti{constructor(t,e,n){this.type="FirstParty",this.user=Pr.FIRST_PARTY,this.headers=new Map,this.headers.set("X-Goog-AuthUser",e);const s=t.auth.getAuthHeaderValueForFirstParty([]);s&&this.headers.set("Authorization",s),n&&this.headers.set("X-Goog-Iam-Authorization-Token",n)}}class ei{constructor(t,e,n){this.h=t,this.l=e,this.m=n}getToken(){return Promise.resolve(new ti(this.h,this.l,this.m))}start(t,e){t.enqueueRetryable((()=>e(Pr.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class ni{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class si{constructor(t){this.g=t,this.forceRefresh=!1,this.appCheck=null,this.p=null}start(t,e){const n=t=>{null!=t.error&&$r("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${t.error.message}`);const n=t.token!==this.p;return this.p=t.token,$r("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?e(t.token):Promise.resolve()};this.o=e=>{t.enqueueRetryable((()=>n(e)))};const s=t=>{$r("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=t,this.appCheck.addTokenListener(this.o)};this.g.onInit((t=>s(t))),setTimeout((()=>{if(!this.appCheck){const t=this.g.getImmediate({optional:!0});t?s(t):$r("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((t=>t?(zr("string"==typeof t.token),this.p=t.token,new ni(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ri(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let e=0;e<t;e++)n[e]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{static I(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let n="";for(;n.length<20;){const s=ri(40);for(let r=0;r<s.length;++r)n.length<20&&s[r]<e&&(n+=t.charAt(s[r]%t.length))}return n}}function oi(t,e){return t<e?-1:t>e?1:0}function ai(t,e,n){return t.length===e.length&&t.every(((t,s)=>n(t,e[s])))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ci{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new Wr(Qr.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new Wr(Qr.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new Wr(Qr.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new Wr(Qr.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return ci.fromMillis(Date.now())}static fromDate(t){return ci.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new ci(e,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?oi(this.nanoseconds,t.nanoseconds):oi(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(t){this.timestamp=t}static fromTimestamp(t){return new ui(t)}static min(){return new ui(new ci(0,0))}static max(){return new ui(new ci(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(t,e,n){void 0===e?e=0:e>t.length&&Gr(),void 0===n?n=t.length-e:n>t.length-e&&Gr(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===hi.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof hi?t.forEach((t=>{e.push(t)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const n=t.get(s),r=e.get(s);if(n<r)return-1;if(n>r)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class li extends hi{construct(t,e,n){return new li(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new Wr(Qr.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((t=>t.length>0)))}return new li(e)}static emptyPath(){return new li([])}}const di=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class fi extends hi{construct(t,e,n){return new fi(t,e,n)}static isValidIdentifier(t){return di.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),fi.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new fi(["__name__"])}static fromServerFormat(t){const e=[];let n="",s=0;const r=()=>{if(0===n.length)throw new Wr(Qr.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let i=!1;for(;s<t.length;){const e=t[s];if("\\"===e){if(s+1===t.length)throw new Wr(Qr.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[s+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new Wr(Qr.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,s+=2}else"`"===e?(i=!i,s++):"."!==e||i?(n+=e,s++):(r(),s++)}if(r(),i)throw new Wr(Qr.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new fi(e)}static emptyPath(){return new fi([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(t){this.path=t}static fromPath(t){return new pi(li.fromString(t))}static fromName(t){return new pi(li.fromString(t).popFirst(5))}static empty(){return new pi(li.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return null!==t&&0===li.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return li.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new pi(new li(t.slice()))}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(t,e,n,s){this.indexId=t,this.collectionGroup=e,this.fields=n,this.indexState=s}}gi.UNKNOWN_ID=-1;function mi(t,e){const n=t.toTimestamp().seconds,s=t.toTimestamp().nanoseconds+1,r=ui.fromTimestamp(1e9===s?new ci(n+1,0):new ci(n,s));return new vi(r,pi.empty(),e)}function yi(t){return new vi(t.readTime,t.key,-1)}class vi{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new vi(ui.min(),pi.empty(),-1)}static max(){return new vi(ui.max(),pi.empty(),-1)}}function wi(t,e){let n=t.readTime.compareTo(e.readTime);return 0!==n?n:(n=pi.comparator(t.documentKey,e.documentKey),0!==n?n:oi(t.largestBatchId,e.largestBatchId))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ei="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class bi{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ti(t){if(t.code!==Qr.FAILED_PRECONDITION||t.message!==Ei)throw t;$r("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&Gr(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new Ii(((n,s)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,s)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof Ii?e:Ii.resolve(e)}catch(t){return Ii.reject(t)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):Ii.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):Ii.reject(e)}static resolve(t){return new Ii(((e,n)=>{e(t)}))}static reject(t){return new Ii(((e,n)=>{n(t)}))}static waitFor(t){return new Ii(((e,n)=>{let s=0,r=0,i=!1;t.forEach((t=>{++s,t.next((()=>{++r,i&&r===s&&e()}),(t=>n(t)))})),i=!0,r===s&&e()}))}static or(t){let e=Ii.resolve(!1);for(const n of t)e=e.next((t=>t?Ii.resolve(t):n()));return e}static forEach(t,e){const n=[];return t.forEach(((t,s)=>{n.push(e.call(this,t,s))})),this.waitFor(n)}static mapArray(t,e){return new Ii(((n,s)=>{const r=t.length,i=new Array(r);let o=0;for(let a=0;a<r;a++){const c=a;e(t[c]).next((t=>{i[c]=t,++o,o===r&&n(i)}),(t=>s(t)))}}))}static doWhile(t,e){return new Ii(((n,s)=>{const r=()=>{!0===t()?e().next((()=>{r()}),s):n()};r()}))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ci(t){return"IndexedDbTransactionError"===t.name}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Si{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.it(t),this.rt=t=>e.writeSequenceNumber(t))}it(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.rt&&this.rt(t),t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ai(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function _i(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Di(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Si.ot=-1;class Ni{constructor(t,e){this.comparator=t,this.root=e||Li.EMPTY}insert(t,e){return new Ni(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Li.BLACK,null,null))}remove(t){return new Ni(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Li.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(0===s)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new ki(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new ki(this.root,t,this.comparator,!1)}getReverseIterator(){return new ki(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new ki(this.root,t,this.comparator,!0)}}class ki{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let r=1;for(;!t.isEmpty();)if(r=e?n(t.key,e):1,e&&s&&(r*=-1),r<0)t=this.isReverse?t.left:t.right;else{if(0===r){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Li{constructor(t,e,n,s,r){this.key=t,this.value=e,this.color=null!=n?n:Li.RED,this.left=null!=s?s:Li.EMPTY,this.right=null!=r?r:Li.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,r){return new Li(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=s?s:this.left,null!=r?r:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const r=n(t,s.key);return s=r<0?s.copy(null,null,null,s.left.insert(t,e,n),null):0===r?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Li.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),0===e(t,s.key)){if(s.right.isEmpty())return Li.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Li.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Li.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Gr();if(this.right.isRed())throw Gr();const t=this.left.check();if(t!==this.right.check())throw Gr();return t+(this.isRed()?0:1)}}Li.EMPTY=null,Li.RED=!0,Li.BLACK=!1,Li.EMPTY=new class{constructor(){this.size=0}get key(){throw Gr()}get value(){throw Gr()}get color(){throw Gr()}get left(){throw Gr()}get right(){throw Gr()}copy(t,e,n,s,r){return this}insert(t,e,n){return new Li(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ri{constructor(t){this.comparator=t,this.data=new Ni(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,n)=>(t(e),!1)))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Oi(this.data.getIterator())}getIteratorFrom(t){return new Oi(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((t=>{e=e.add(t)})),e}isEqual(t){if(!(t instanceof Ri))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,s=n.getNext().key;if(0!==this.comparator(t,s))return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new Ri(this.comparator);return e.data=t,e}}class Oi{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class xi{constructor(t){this.fields=t,t.sort(fi.comparator)}static empty(){return new xi([])}unionWith(t){let e=new Ri(fi.comparator);for(const t of this.fields)e=e.add(t);for(const n of t)e=e.add(n);return new xi(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return ai(this.fields,t.fields,((t,e)=>t.isEqual(e)))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Mi{constructor(t){this.binaryString=t}static fromBase64String(t){const e=atob(t);return new Mi(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new Mi(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){var t;return t=this.binaryString,btoa(t)}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return oi(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Mi.EMPTY_BYTE_STRING=new Mi("");const Vi=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Pi(t){if(zr(!!t),"string"==typeof t){let e=0;const n=Vi.exec(t);if(zr(!!n),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const s=new Date(t);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:Fi(t.seconds),nanos:Fi(t.nanos)}}function Fi(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function Ui(t){return"string"==typeof t?Mi.fromBase64String(t):Mi.fromUint8Array(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bi(t){var e,n;return"server_timestamp"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function $i(t){const e=t.mapValue.fields.__previous_value__;return Bi(e)?$i(e):e}function ji(t){const e=Pi(t.mapValue.fields.__local_write_time__.timestampValue);return new ci(e.seconds,e.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{constructor(t,e,n,s,r,i,o,a){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=r,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.useFetchStreams=a}}class Ki{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new Ki("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(t){return t instanceof Ki&&t.projectId===this.projectId&&t.database===this.database}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gi(t){return null==t}function zi(t){return 0===t&&1/t==-1/0}function Hi(t){return"number"==typeof t&&Number.isInteger(t)&&!zi(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qi={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function Wi(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Bi(t)?4:co(t)?9007199254740991:10:Gr()}function Xi(t,e){if(t===e)return!0;const n=Wi(t);if(n!==Wi(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return ji(t).isEqual(ji(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=Pi(t.timestampValue),s=Pi(e.timestampValue);return n.seconds===s.seconds&&n.nanos===s.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return s=e,Ui(t.bytesValue).isEqual(Ui(s.bytesValue));case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return Fi(t.geoPointValue.latitude)===Fi(e.geoPointValue.latitude)&&Fi(t.geoPointValue.longitude)===Fi(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return Fi(t.integerValue)===Fi(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=Fi(t.doubleValue),s=Fi(e.doubleValue);return n===s?zi(n)===zi(s):isNaN(n)&&isNaN(s)}return!1}(t,e);case 9:return ai(t.arrayValue.values||[],e.arrayValue.values||[],Xi);case 10:return function(t,e){const n=t.mapValue.fields||{},s=e.mapValue.fields||{};if(Ai(n)!==Ai(s))return!1;for(const t in n)if(n.hasOwnProperty(t)&&(void 0===s[t]||!Xi(n[t],s[t])))return!1;return!0}(t,e);default:return Gr()}var s}function Yi(t,e){return void 0!==(t.values||[]).find((t=>Xi(t,e)))}function Ji(t,e){if(t===e)return 0;const n=Wi(t),s=Wi(e);if(n!==s)return oi(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return oi(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=Fi(t.integerValue||t.doubleValue),s=Fi(e.integerValue||e.doubleValue);return n<s?-1:n>s?1:n===s?0:isNaN(n)?isNaN(s)?0:-1:1}(t,e);case 3:return Zi(t.timestampValue,e.timestampValue);case 4:return Zi(ji(t),ji(e));case 5:return oi(t.stringValue,e.stringValue);case 6:return function(t,e){const n=Ui(t),s=Ui(e);return n.compareTo(s)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),s=e.split("/");for(let t=0;t<n.length&&t<s.length;t++){const e=oi(n[t],s[t]);if(0!==e)return e}return oi(n.length,s.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=oi(Fi(t.latitude),Fi(e.latitude));return 0!==n?n:oi(Fi(t.longitude),Fi(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(t,e){const n=t.values||[],s=e.values||[];for(let t=0;t<n.length&&t<s.length;++t){const e=Ji(n[t],s[t]);if(e)return e}return oi(n.length,s.length)}(t.arrayValue,e.arrayValue);case 10:return function(t,e){if(t===Qi.mapValue&&e===Qi.mapValue)return 0;if(t===Qi.mapValue)return 1;if(e===Qi.mapValue)return-1;const n=t.fields||{},s=Object.keys(n),r=e.fields||{},i=Object.keys(r);s.sort(),i.sort();for(let t=0;t<s.length&&t<i.length;++t){const e=oi(s[t],i[t]);if(0!==e)return e;const o=Ji(n[s[t]],r[i[t]]);if(0!==o)return o}return oi(s.length,i.length)}(t.mapValue,e.mapValue);default:throw Gr()}}function Zi(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return oi(t,e);const n=Pi(t),s=Pi(e),r=oi(n.seconds,s.seconds);return 0!==r?r:oi(n.nanos,s.nanos)}function to(t){return eo(t)}function eo(t){var e,n;return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=Pi(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?Ui(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,pi.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(t){let e="[",n=!0;for(const s of t.values||[])n?n=!1:e+=",",e+=eo(s);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",s=!0;for(const r of e)s?s=!1:n+=",",n+=`${r}:${eo(t.fields[r])}`;return n+"}"}(t.mapValue):Gr()}function no(t){return!!t&&"integerValue"in t}function so(t){return!!t&&"arrayValue"in t}function ro(t){return!!t&&"nullValue"in t}function io(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function oo(t){return!!t&&"mapValue"in t}function ao(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&"object"==typeof t.timestampValue)return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return _i(t.mapValue.fields,((t,n)=>e.mapValue.fields[t]=ao(n))),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=ao(t.arrayValue.values[n]);return e}return Object.assign({},t)}function co(t){return"__max__"===(((t.mapValue||{}).fields||{}).__type__||{}).stringValue}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class uo{constructor(t){this.value=t}static empty(){return new uo({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!oo(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=ao(e)}setAll(t){let e=fi.emptyPath(),n={},s=[];t.forEach(((t,r)=>{if(!e.isImmediateParentOf(r)){const t=this.getFieldsMap(e);this.applyChanges(t,n,s),n={},s=[],e=r.popLast()}t?n[r.lastSegment()]=ao(t):s.push(r.lastSegment())}));const r=this.getFieldsMap(e);this.applyChanges(r,n,s)}delete(t){const e=this.field(t.popLast());oo(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Xi(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];oo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){_i(e,((e,n)=>t[e]=n));for(const e of n)delete t[e]}clone(){return new uo(ao(this.value))}}function ho(t){const e=[];return _i(t.fields,((t,n)=>{const s=new fi([t]);if(oo(n)){const t=ho(n.mapValue).fields;if(0===t.length)e.push(s);else for(const n of t)e.push(s.child(n))}else e.push(s)})),new xi(e)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class lo{constructor(t,e,n,s,r,i){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.data=r,this.documentState=i}static newInvalidDocument(t){return new lo(t,0,ui.min(),ui.min(),uo.empty(),0)}static newFoundDocument(t,e,n){return new lo(t,1,e,ui.min(),n,0)}static newNoDocument(t,e){return new lo(t,2,e,ui.min(),uo.empty(),0)}static newUnknownDocument(t,e){return new lo(t,3,e,ui.min(),uo.empty(),2)}convertToFoundDocument(t,e){return this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=uo.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=uo.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ui.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof lo&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new lo(this.key,this.documentType,this.version,this.readTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(t,e=null,n=[],s=[],r=null,i=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=r,this.startAt=i,this.endAt=o,this.ut=null}}function po(t,e=null,n=[],s=[],r=null,i=null,o=null){return new fo(t,e,n,s,r,i,o)}function go(t){const e=Hr(t);if(null===e.ut){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((t=>{var e;return(e=t).field.canonicalString()+e.op.toString()+to(e.value)})).join(","),t+="|ob:",t+=e.orderBy.map((t=>{return(e=t).field.canonicalString()+e.dir;var e})).join(","),Gi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((t=>to(t))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((t=>to(t))).join(",")),e.ut=t}return e.ut}function mo(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!No(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let r=0;r<t.filters.length;r++)if(n=t.filters[r],s=e.filters[r],n.op!==s.op||!n.field.isEqual(s.field)||!Xi(n.value,s.value))return!1;var n,s;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Lo(t.startAt,e.startAt)&&Lo(t.endAt,e.endAt)}function yo(t){return pi.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}class vo extends class{}{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.ct(t,e,n):new wo(t,e,n):"array-contains"===e?new Io(t,n):"in"===e?new Co(t,n):"not-in"===e?new So(t,n):"array-contains-any"===e?new Ao(t,n):new vo(t,e,n)}static ct(t,e,n){return"in"===e?new Eo(t,n):new bo(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&this.at(Ji(e,this.value)):null!==e&&Wi(this.value)===Wi(e)&&this.at(Ji(e,this.value))}at(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return Gr()}}ht(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class wo extends vo{constructor(t,e,n){super(t,e,n),this.key=pi.fromName(n.referenceValue)}matches(t){const e=pi.comparator(t.key,this.key);return this.at(e)}}class Eo extends vo{constructor(t,e){super(t,"in",e),this.keys=To("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class bo extends vo{constructor(t,e){super(t,"not-in",e),this.keys=To("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function To(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map((t=>pi.fromName(t.referenceValue)))}class Io extends vo{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return so(e)&&Yi(e.arrayValue,this.value)}}class Co extends vo{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&Yi(this.value.arrayValue,e)}}class So extends vo{constructor(t,e){super(t,"not-in",e)}matches(t){if(Yi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&!Yi(this.value.arrayValue,e)}}class Ao extends vo{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!so(e)||!e.arrayValue.values)&&e.arrayValue.values.some((t=>Yi(this.value.arrayValue,t)))}}class _o{constructor(t,e){this.position=t,this.inclusive=e}}class Do{constructor(t,e="asc"){this.field=t,this.dir=e}}function No(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}function ko(t,e,n){let s=0;for(let r=0;r<t.position.length;r++){const i=e[r],o=t.position[r];if(s=i.field.isKeyField()?pi.comparator(pi.fromName(o.referenceValue),n.key):Ji(o,n.data.field(i.field)),"desc"===i.dir&&(s*=-1),0!==s)break}return s}function Lo(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Xi(t.position[n],e.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(t,e=null,n=[],s=[],r=null,i="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=r,this.limitType=i,this.startAt=o,this.endAt=a,this.lt=null,this.ft=null,this.startAt,this.endAt}}function Oo(t,e,n,s,r,i,o,a){return new Ro(t,e,n,s,r,i,o,a)}function xo(t){return new Ro(t)}function Mo(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function Vo(t){for(const e of t.filters)if(e.ht())return e.field;return null}function Po(t){return null!==t.collectionGroup}function Fo(t){const e=Hr(t);if(null===e.lt){e.lt=[];const t=Vo(e),n=Mo(e);if(null!==t&&null===n)t.isKeyField()||e.lt.push(new Do(t)),e.lt.push(new Do(fi.keyField(),"asc"));else{let t=!1;for(const n of e.explicitOrderBy)e.lt.push(n),n.field.isKeyField()&&(t=!0);if(!t){const t=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.lt.push(new Do(fi.keyField(),t))}}}return e.lt}function Uo(t){const e=Hr(t);if(!e.ft)if("F"===e.limitType)e.ft=po(e.path,e.collectionGroup,Fo(e),e.filters,e.limit,e.startAt,e.endAt);else{const t=[];for(const n of Fo(e)){const e="desc"===n.dir?"asc":"desc";t.push(new Do(n.field,e))}const n=e.endAt?new _o(e.endAt.position,e.endAt.inclusive):null,s=e.startAt?new _o(e.startAt.position,e.startAt.inclusive):null;e.ft=po(e.path,e.collectionGroup,t,e.filters,e.limit,n,s)}return e.ft}function Bo(t,e,n){return new Ro(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function $o(t,e){return mo(Uo(t),Uo(e))&&t.limitType===e.limitType}function jo(t){return`${go(Uo(t))}|lt:${t.limitType}`}function qo(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map((t=>{var e;return`${(e=t).field.canonicalString()} ${e.op} ${to(e.value)}`})).join(", ")}]`),Gi(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map((t=>{return`${(e=t).field.canonicalString()} (${e.dir})`;var e})).join(", ")}]`),t.startAt&&(e+=", startAt: ",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((t=>to(t))).join(",")),t.endAt&&(e+=", endAt: ",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((t=>to(t))).join(",")),`Target(${e})`}(Uo(t))}; limitType=${t.limitType})`}function Ko(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):pi.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of t.explicitOrderBy)if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&(s=e,!((n=t).startAt&&!function(t,e,n){const s=ko(t,e,n);return t.inclusive?s<=0:s<0}(n.startAt,Fo(n),s)||n.endAt&&!function(t,e,n){const s=ko(t,e,n);return t.inclusive?s>=0:s>0}(n.endAt,Fo(n),s)));var n,s}function Go(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function zo(t){return(e,n)=>{let s=!1;for(const r of Fo(t)){const t=Ho(r,e,n);if(0!==t)return t;s=s||r.field.isKeyField()}return 0}}function Ho(t,e,n){const s=t.field.isKeyField()?pi.comparator(e.key,n.key):function(t,e,n){const s=e.data.field(t),r=n.data.field(t);return null!==s&&null!==r?Ji(s,r):Gr()}(t.field,e,n);switch(t.dir){case"asc":return s;case"desc":return-1*s;default:return Gr()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qo(t,e){if(t.dt){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:zi(e)?"-0":e}}function Wo(t){return{integerValue:""+t}}function Xo(t,e){return Hi(e)?Wo(e):Qo(t,e)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo{constructor(){this._=void 0}}function Jo(t,e,n){return t instanceof ea?na(t,e):t instanceof sa?ra(t,e):n}function Zo(t,e){var n,s;return t instanceof ia?no(n=e)||(s=n)&&"doubleValue"in s?e:{integerValue:0}:null}class ta extends Yo{}class ea extends Yo{constructor(t){super(),this.elements=t}}function na(t,e){const n=aa(e);for(const e of t.elements)n.some((t=>Xi(t,e)))||n.push(e);return{arrayValue:{values:n}}}class sa extends Yo{constructor(t){super(),this.elements=t}}function ra(t,e){let n=aa(e);for(const e of t.elements)n=n.filter((t=>!Xi(t,e)));return{arrayValue:{values:n}}}class ia extends Yo{constructor(t,e){super(),this.wt=t,this._t=e}}function oa(t){return Fi(t.integerValue||t.doubleValue)}function aa(t){return so(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca{constructor(t,e){this.field=t,this.transform=e}}class ua{constructor(t,e){this.version=t,this.transformResults=e}}class ha{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new ha}static exists(t){return new ha(void 0,t)}static updateTime(t){return new ha(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function la(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class da{}function fa(t,e){if(!t.hasLocalMutations||e&&0===e.fields.length)return null;if(null===e)return t.isNoDocument()?new Ia(t.key,ha.none()):new va(t.key,t.data,ha.none());{const n=t.data,s=uo.empty();let r=new Ri(fi.comparator);for(let t of e.fields)if(!r.has(t)){let e=n.field(t);null===e&&t.length>1&&(t=t.popLast(),e=n.field(t)),null===e?s.delete(t):s.set(t,e),r=r.add(t)}return new wa(t.key,s,new xi(r.toArray()),ha.none())}}function pa(t,e,n){var s;t instanceof va?function(t,e,n){const s=t.value.clone(),r=ba(t.fieldTransforms,e,n.transformResults);s.setAll(r),e.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(t,e,n):t instanceof wa?function(t,e,n){if(!la(t.precondition,e))return void e.convertToUnknownDocument(n.version);const s=ba(t.fieldTransforms,e,n.transformResults),r=e.data;r.setAll(Ea(t)),r.setAll(s),e.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(t,e,n):(s=n,e.convertToNoDocument(s.version).setHasCommittedMutations())}function ga(t,e,n,s){return t instanceof va?function(t,e,n,s){if(!la(t.precondition,e))return n;const r=t.value.clone(),i=Ta(t.fieldTransforms,s,e);return r.setAll(i),e.convertToFoundDocument(e.version,r).setHasLocalMutations(),null}(t,e,n,s):t instanceof wa?function(t,e,n,s){if(!la(t.precondition,e))return n;const r=Ta(t.fieldTransforms,s,e),i=e.data;return i.setAll(Ea(t)),i.setAll(r),e.convertToFoundDocument(e.version,i).setHasLocalMutations(),null===n?null:n.unionWith(t.fieldMask.fields).unionWith(t.fieldTransforms.map((t=>t.field)))}(t,e,n,s):(r=e,i=n,la(t.precondition,r)?(r.convertToNoDocument(r.version).setHasLocalMutations(),null):i);var r,i}function ma(t,e){let n=null;for(const s of t.fieldTransforms){const t=e.data.field(s.field),r=Zo(s.transform,t||null);null!=r&&(null===n&&(n=uo.empty()),n.set(s.field,r))}return n||null}function ya(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&(n=t.fieldTransforms,s=e.fieldTransforms,!!(void 0===n&&void 0===s||n&&s&&ai(n,s,((t,e)=>function(t,e){return t.field.isEqual(e.field)&&(n=t.transform,s=e.transform,n instanceof ea&&s instanceof ea||n instanceof sa&&s instanceof sa?ai(n.elements,s.elements,Xi):n instanceof ia&&s instanceof ia?Xi(n._t,s._t):n instanceof ta&&s instanceof ta);var n,s}(t,e)))))&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask));var n,s}class va extends da{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class wa extends da{constructor(t,e,n,s,r=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function Ea(t){const e=new Map;return t.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const s=t.data.field(n);e.set(n,s)}})),e}function ba(t,e,n){const s=new Map;zr(t.length===n.length);for(let r=0;r<n.length;r++){const i=t[r],o=i.transform,a=e.data.field(i.field);s.set(i.field,Jo(o,a,n[r]))}return s}function Ta(t,e,n){const s=new Map;for(const a of t){const t=a.transform,c=n.data.field(a.field);s.set(a.field,(i=c,o=e,(r=t)instanceof ta?function(t,e){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&(n.fields.__previous_value__=e),{mapValue:n}}(o,i):r instanceof ea?na(r,i):r instanceof sa?ra(r,i):function(t,e){const n=Zo(t,e),s=oa(n)+oa(t._t);return no(n)&&no(t._t)?Wo(s):Qo(t.wt,s)}(r,i)))}var r,i,o;return s}class Ia extends da{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Ca extends da{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(t){this.count=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Aa,_a;function Da(t){switch(t){default:return Gr();case Qr.CANCELLED:case Qr.UNKNOWN:case Qr.DEADLINE_EXCEEDED:case Qr.RESOURCE_EXHAUSTED:case Qr.INTERNAL:case Qr.UNAVAILABLE:case Qr.UNAUTHENTICATED:return!1;case Qr.INVALID_ARGUMENT:case Qr.NOT_FOUND:case Qr.ALREADY_EXISTS:case Qr.PERMISSION_DENIED:case Qr.FAILED_PRECONDITION:case Qr.ABORTED:case Qr.OUT_OF_RANGE:case Qr.UNIMPLEMENTED:case Qr.DATA_LOSS:return!0}}function Na(t){if(void 0===t)return jr("GRPC error has no .code"),Qr.UNKNOWN;switch(t){case Aa.OK:return Qr.OK;case Aa.CANCELLED:return Qr.CANCELLED;case Aa.UNKNOWN:return Qr.UNKNOWN;case Aa.DEADLINE_EXCEEDED:return Qr.DEADLINE_EXCEEDED;case Aa.RESOURCE_EXHAUSTED:return Qr.RESOURCE_EXHAUSTED;case Aa.INTERNAL:return Qr.INTERNAL;case Aa.UNAVAILABLE:return Qr.UNAVAILABLE;case Aa.UNAUTHENTICATED:return Qr.UNAUTHENTICATED;case Aa.INVALID_ARGUMENT:return Qr.INVALID_ARGUMENT;case Aa.NOT_FOUND:return Qr.NOT_FOUND;case Aa.ALREADY_EXISTS:return Qr.ALREADY_EXISTS;case Aa.PERMISSION_DENIED:return Qr.PERMISSION_DENIED;case Aa.FAILED_PRECONDITION:return Qr.FAILED_PRECONDITION;case Aa.ABORTED:return Qr.ABORTED;case Aa.OUT_OF_RANGE:return Qr.OUT_OF_RANGE;case Aa.UNIMPLEMENTED:return Qr.UNIMPLEMENTED;case Aa.DATA_LOSS:return Qr.DATA_LOSS;default:return Gr()}}(_a=Aa||(Aa={}))[_a.OK=0]="OK",_a[_a.CANCELLED=1]="CANCELLED",_a[_a.UNKNOWN=2]="UNKNOWN",_a[_a.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",_a[_a.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",_a[_a.NOT_FOUND=5]="NOT_FOUND",_a[_a.ALREADY_EXISTS=6]="ALREADY_EXISTS",_a[_a.PERMISSION_DENIED=7]="PERMISSION_DENIED",_a[_a.UNAUTHENTICATED=16]="UNAUTHENTICATED",_a[_a.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",_a[_a.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",_a[_a.ABORTED=10]="ABORTED",_a[_a.OUT_OF_RANGE=11]="OUT_OF_RANGE",_a[_a.UNIMPLEMENTED=12]="UNIMPLEMENTED",_a[_a.INTERNAL=13]="INTERNAL",_a[_a.UNAVAILABLE=14]="UNAVAILABLE",_a[_a.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ka{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[e,s]of n)if(this.equalsFn(e,t))return s}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(void 0===s)return this.inner[n]=[[t,e]],void this.innerSize++;for(let n=0;n<s.length;n++)if(this.equalsFn(s[n][0],t))return void(s[n]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return 1===n.length?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){_i(this.inner,((e,n)=>{for(const[e,s]of n)t(e,s)}))}isEmpty(){return Di(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const La=new Ni(pi.comparator);function Ra(){return La}const Oa=new Ni(pi.comparator);function xa(...t){let e=Oa;for(const n of t)e=e.insert(n.key,n);return e}function Ma(t){let e=Oa;return t.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function Va(){return Fa()}function Pa(){return Fa()}function Fa(){return new ka((t=>t.toString()),((t,e)=>t.isEqual(e)))}const Ua=new Ni(pi.comparator),Ba=new Ri(pi.comparator);function $a(...t){let e=Ba;for(const n of t)e=e.add(n);return e}const ja=new Ri(oi);function qa(){return ja}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(t,e,n,s,r){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(t,e){const n=new Map;return n.set(t,Ga.createSynthesizedTargetChangeForCurrentChange(t,e)),new Ka(ui.min(),n,qa(),Ra(),$a())}}class Ga{constructor(t,e,n,s,r){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(t,e){return new Ga(Mi.EMPTY_BYTE_STRING,e,$a(),$a(),$a())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za{constructor(t,e,n,s){this.gt=t,this.removedTargetIds=e,this.key=n,this.yt=s}}class Ha{constructor(t,e){this.targetId=t,this.It=e}}class Qa{constructor(t,e,n=Mi.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class Wa{constructor(){this.Tt=0,this.Et=Ja(),this.At=Mi.EMPTY_BYTE_STRING,this.Rt=!1,this.bt=!0}get current(){return this.Rt}get resumeToken(){return this.At}get Pt(){return 0!==this.Tt}get vt(){return this.bt}Vt(t){t.approximateByteSize()>0&&(this.bt=!0,this.At=t)}St(){let t=$a(),e=$a(),n=$a();return this.Et.forEach(((s,r)=>{switch(r){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:Gr()}})),new Ga(this.At,this.Rt,t,e,n)}Dt(){this.bt=!1,this.Et=Ja()}Ct(t,e){this.bt=!0,this.Et=this.Et.insert(t,e)}xt(t){this.bt=!0,this.Et=this.Et.remove(t)}Nt(){this.Tt+=1}kt(){this.Tt-=1}Ot(){this.bt=!0,this.Rt=!0}}class Xa{constructor(t){this.Mt=t,this.Ft=new Map,this.$t=Ra(),this.Bt=Ya(),this.Lt=new Ri(oi)}Ut(t){for(const e of t.gt)t.yt&&t.yt.isFoundDocument()?this.qt(e,t.yt):this.Kt(e,t.key,t.yt);for(const e of t.removedTargetIds)this.Kt(e,t.key,t.yt)}Gt(t){this.forEachTarget(t,(e=>{const n=this.Qt(e);switch(t.state){case 0:this.jt(e)&&n.Vt(t.resumeToken);break;case 1:n.kt(),n.Pt||n.Dt(),n.Vt(t.resumeToken);break;case 2:n.kt(),n.Pt||this.removeTarget(e);break;case 3:this.jt(e)&&(n.Ot(),n.Vt(t.resumeToken));break;case 4:this.jt(e)&&(this.Wt(e),n.Vt(t.resumeToken));break;default:Gr()}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Ft.forEach(((t,n)=>{this.jt(n)&&e(n)}))}zt(t){const e=t.targetId,n=t.It.count,s=this.Ht(e);if(s){const t=s.target;if(yo(t))if(0===n){const n=new pi(t.path);this.Kt(e,n,lo.newNoDocument(n,ui.min()))}else zr(1===n);else this.Jt(e)!==n&&(this.Wt(e),this.Lt=this.Lt.add(e))}}Yt(t){const e=new Map;this.Ft.forEach(((n,s)=>{const r=this.Ht(s);if(r){if(n.current&&yo(r.target)){const e=new pi(r.target.path);null!==this.$t.get(e)||this.Xt(s,e)||this.Kt(s,e,lo.newNoDocument(e,t))}n.vt&&(e.set(s,n.St()),n.Dt())}}));let n=$a();this.Bt.forEach(((t,e)=>{let s=!0;e.forEachWhile((t=>{const e=this.Ht(t);return!e||2===e.purpose||(s=!1,!1)})),s&&(n=n.add(t))})),this.$t.forEach(((e,n)=>n.setReadTime(t)));const s=new Ka(t,e,this.Lt,this.$t,n);return this.$t=Ra(),this.Bt=Ya(),this.Lt=new Ri(oi),s}qt(t,e){if(!this.jt(t))return;const n=this.Xt(t,e.key)?2:0;this.Qt(t).Ct(e.key,n),this.$t=this.$t.insert(e.key,e),this.Bt=this.Bt.insert(e.key,this.Zt(e.key).add(t))}Kt(t,e,n){if(!this.jt(t))return;const s=this.Qt(t);this.Xt(t,e)?s.Ct(e,1):s.xt(e),this.Bt=this.Bt.insert(e,this.Zt(e).delete(t)),n&&(this.$t=this.$t.insert(e,n))}removeTarget(t){this.Ft.delete(t)}Jt(t){const e=this.Qt(t).St();return this.Mt.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Nt(t){this.Qt(t).Nt()}Qt(t){let e=this.Ft.get(t);return e||(e=new Wa,this.Ft.set(t,e)),e}Zt(t){let e=this.Bt.get(t);return e||(e=new Ri(oi),this.Bt=this.Bt.insert(t,e)),e}jt(t){const e=null!==this.Ht(t);return e||$r("WatchChangeAggregator","Detected inactive target",t),e}Ht(t){const e=this.Ft.get(t);return e&&e.Pt?null:this.Mt.te(t)}Wt(t){this.Ft.set(t,new Wa),this.Mt.getRemoteKeysForTarget(t).forEach((e=>{this.Kt(t,e,null)}))}Xt(t,e){return this.Mt.getRemoteKeysForTarget(t).has(e)}}function Ya(){return new Ni(pi.comparator)}function Ja(){return new Ni(pi.comparator)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Za={asc:"ASCENDING",desc:"DESCENDING"},tc={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};class ec{constructor(t,e){this.databaseId=t,this.dt=e}}function nc(t,e){return t.dt?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function sc(t,e){return t.dt?e.toBase64():e.toUint8Array()}function rc(t,e){return nc(t,e.toTimestamp())}function ic(t){return zr(!!t),ui.fromTimestamp(function(t){const e=Pi(t);return new ci(e.seconds,e.nanos)}(t))}function oc(t,e){return(n=t,new li(["projects",n.projectId,"databases",n.database])).child("documents").child(e).canonicalString();var n}function ac(t){const e=li.fromString(t);return zr(Ac(e)),e}function cc(t,e){return oc(t.databaseId,e.path)}function uc(t,e){const n=ac(e);if(n.get(1)!==t.databaseId.projectId)throw new Wr(Qr.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new Wr(Qr.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new pi(fc(n))}function hc(t,e){return oc(t.databaseId,e)}function lc(t){const e=ac(t);return 4===e.length?li.emptyPath():fc(e)}function dc(t){return new li(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function fc(t){return zr(t.length>4&&"documents"===t.get(4)),t.popFirst(5)}function pc(t,e,n){return{name:cc(t,e),fields:n.value.mapValue.fields}}function gc(t,e){let n;if(e instanceof va)n={update:pc(t,e.key,e.value)};else if(e instanceof Ia)n={delete:cc(t,e.key)};else if(e instanceof wa)n={update:pc(t,e.key,e.data),updateMask:Sc(e.fieldMask)};else{if(!(e instanceof Ca))return Gr();n={verify:cc(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((t=>function(t,e){const n=e.transform;if(n instanceof ta)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof ea)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof sa)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof ia)return{fieldPath:e.field.canonicalString(),increment:n._t};throw Gr()}(0,t)))),e.precondition.isNone||(n.currentDocument=(s=t,void 0!==(r=e.precondition).updateTime?{updateTime:rc(s,r.updateTime)}:void 0!==r.exists?{exists:r.exists}:Gr())),n;var s,r}function mc(t,e){return{documents:[hc(t,e.path)]}}function yc(t,e){const n={structuredQuery:{}},s=e.path;null!==e.collectionGroup?(n.parent=hc(t,s),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=hc(t,s.popLast()),n.structuredQuery.from=[{collectionId:s.lastSegment()}]);const r=function(t){if(0===t.length)return;const e=t.map((t=>function(t){if("=="===t.op){if(io(t.value))return{unaryFilter:{field:Tc(t.field),op:"IS_NAN"}};if(ro(t.value))return{unaryFilter:{field:Tc(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(io(t.value))return{unaryFilter:{field:Tc(t.field),op:"IS_NOT_NAN"}};if(ro(t.value))return{unaryFilter:{field:Tc(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Tc(t.field),op:bc(t.op),value:t.value}}}(t)));return 1===e.length?e[0]:{compositeFilter:{op:"AND",filters:e}}}(e.filters);r&&(n.structuredQuery.where=r);const i=function(t){if(0!==t.length)return t.map((t=>{return{field:Tc((e=t).field),direction:Ec(e.dir)};var e}))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=(a=t,c=e.limit,a.dt||Gi(c)?c:{value:c});var a,c,u;return null!==o&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt={before:(u=e.startAt).inclusive,values:u.position}),e.endAt&&(n.structuredQuery.endAt=function(t){return{before:!t.inclusive,values:t.position}}(e.endAt)),n}function vc(t){let e=lc(t.parent);const n=t.structuredQuery,s=n.from?n.from.length:0;let r=null;if(s>0){zr(1===s);const t=n.from[0];t.allDescendants?r=t.collectionId:e=e.child(t.collectionId)}let i=[];n.where&&(i=wc(n.where));let o=[];n.orderBy&&(o=n.orderBy.map((t=>{return new Do(Ic((e=t).field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction));var e})));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,Gi(e)?null:e}(n.limit));let c=null;n.startAt&&(c=function(t){const e=!!t.before,n=t.values||[];return new _o(n,e)}(n.startAt));let u=null;return n.endAt&&(u=function(t){const e=!t.before,n=t.values||[];return new _o(n,e)}(n.endAt)),Oo(e,r,o,i,a,"F",c,u)}function wc(t){return t?void 0!==t.unaryFilter?[Cc(t)]:void 0!==t.fieldFilter?[(e=t,vo.create(Ic(e.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return Gr()}}(e.fieldFilter.op),e.fieldFilter.value))]:void 0!==t.compositeFilter?t.compositeFilter.filters.map((t=>wc(t))).reduce(((t,e)=>t.concat(e))):Gr():[];var e}function Ec(t){return Za[t]}function bc(t){return tc[t]}function Tc(t){return{fieldPath:t.canonicalString()}}function Ic(t){return fi.fromServerFormat(t.fieldPath)}function Cc(t){switch(t.unaryFilter.op){case"IS_NAN":const e=Ic(t.unaryFilter.field);return vo.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=Ic(t.unaryFilter.field);return vo.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Ic(t.unaryFilter.field);return vo.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const r=Ic(t.unaryFilter.field);return vo.create(r,"!=",{nullValue:"NULL_VALUE"});default:return Gr()}}function Sc(t){const e=[];return t.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Ac(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _c=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],Dc=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],Nc=Dc;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class kc{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let e=0;e<this.mutations.length;e++){const s=this.mutations[e];s.key.isEqual(t.key)&&pa(s,t,n[e])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=ga(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=ga(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Pa();return this.mutations.forEach((s=>{const r=t.get(s.key),i=r.overlayedDocument;let o=this.applyToLocalView(i,r.mutatedFields);o=e.has(s.key)?null:o;const a=fa(i,o);null!==a&&n.set(s.key,a),i.isValidDocument()||i.convertToNoDocument(ui.min())})),n}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),$a())}isEqual(t){return this.batchId===t.batchId&&ai(this.mutations,t.mutations,((t,e)=>ya(t,e)))&&ai(this.baseMutations,t.baseMutations,((t,e)=>ya(t,e)))}}class Lc{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){zr(t.mutations.length===n.length);let s=Ua;const r=t.mutations;for(let t=0;t<r.length;t++)s=s.insert(r[t].key,n[t].version);return new Lc(t,e,n,s)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rc{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return null!==t&&this.mutation===t.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oc{constructor(t,e,n,s,r=ui.min(),i=ui.min(),o=Mi.EMPTY_BYTE_STRING){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o}withSequenceNumber(t){return new Oc(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(t,e){return new Oc(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t)}withLastLimboFreeSnapshotVersion(t){return new Oc(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc{constructor(t){this.ne=t}}function Mc(t){const e=vc({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?Bo(e,e.limit,"L"):e}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vc{constructor(){}re(t,e){this.oe(t,e),e.ue()}oe(t,e){if("nullValue"in t)this.ce(e,5);else if("booleanValue"in t)this.ce(e,10),e.ae(t.booleanValue?1:0);else if("integerValue"in t)this.ce(e,15),e.ae(Fi(t.integerValue));else if("doubleValue"in t){const n=Fi(t.doubleValue);isNaN(n)?this.ce(e,13):(this.ce(e,15),zi(n)?e.ae(0):e.ae(n))}else if("timestampValue"in t){const n=t.timestampValue;this.ce(e,20),"string"==typeof n?e.he(n):(e.he(`${n.seconds||""}`),e.ae(n.nanos||0))}else if("stringValue"in t)this.le(t.stringValue,e),this.fe(e);else if("bytesValue"in t)this.ce(e,30),e.de(Ui(t.bytesValue)),this.fe(e);else if("referenceValue"in t)this._e(t.referenceValue,e);else if("geoPointValue"in t){const n=t.geoPointValue;this.ce(e,45),e.ae(n.latitude||0),e.ae(n.longitude||0)}else"mapValue"in t?co(t)?this.ce(e,Number.MAX_SAFE_INTEGER):(this.we(t.mapValue,e),this.fe(e)):"arrayValue"in t?(this.me(t.arrayValue,e),this.fe(e)):Gr()}le(t,e){this.ce(e,25),this.ge(t,e)}ge(t,e){e.he(t)}we(t,e){const n=t.fields||{};this.ce(e,55);for(const t of Object.keys(n))this.le(t,e),this.oe(n[t],e)}me(t,e){const n=t.values||[];this.ce(e,50);for(const t of n)this.oe(t,e)}_e(t,e){this.ce(e,37),pi.fromName(t).path.forEach((t=>{this.ce(e,60),this.ge(t,e)}))}ce(t,e){t.ae(e)}fe(t){t.ae(2)}}Vc.ye=new Vc;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pc{constructor(){this.ze=new Fc}addToCollectionParentIndex(t,e){return this.ze.add(e),Ii.resolve()}getCollectionParents(t,e){return Ii.resolve(this.ze.getEntries(e))}addFieldIndex(t,e){return Ii.resolve()}deleteFieldIndex(t,e){return Ii.resolve()}getDocumentsMatchingTarget(t,e){return Ii.resolve(null)}getIndexType(t,e){return Ii.resolve(0)}getFieldIndexes(t,e){return Ii.resolve([])}getNextCollectionGroupToUpdate(t){return Ii.resolve(null)}getMinOffset(t,e){return Ii.resolve(vi.min())}getMinOffsetFromCollectionGroup(t,e){return Ii.resolve(vi.min())}updateCollectionGroup(t,e,n){return Ii.resolve()}updateIndexEntries(t,e){return Ii.resolve()}}class Fc{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new Ri(li.comparator),r=!s.has(n);return this.index[e]=s.add(n),r}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new Ri(li.comparator)).toArray()}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Uint8Array(0);class Uc{constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}static withCacheSize(t){return new Uc(t,Uc.DEFAULT_COLLECTION_PERCENTILE,Uc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Uc.DEFAULT_COLLECTION_PERCENTILE=10,Uc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Uc.DEFAULT=new Uc(41943040,Uc.DEFAULT_COLLECTION_PERCENTILE,Uc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Uc.DISABLED=new Uc(-1,0,0);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Bc{constructor(t){this.En=t}next(){return this.En+=2,this.En}static An(){return new Bc(0)}static Rn(){return new Bc(-1)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class $c{constructor(){this.changes=new ka((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,lo.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?Ii.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class jc{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(n=s,this.getBaseDocument(t,e,n)))).next((t=>(null!==n&&ga(n.mutation,t,xi.empty(),ci.now()),t)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((e=>this.getLocalViewOfDocuments(t,e,$a()).next((()=>e))))}getLocalViewOfDocuments(t,e,n=$a()){const s=Va();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,n).next((t=>{let e=xa();return t.forEach(((t,n)=>{e=e.insert(t,n.overlayedDocument)})),e}))))}getOverlayedDocuments(t,e){const n=Va();return this.populateOverlays(t,n,e).next((()=>this.computeViews(t,e,n,$a())))}populateOverlays(t,e,n){const s=[];return n.forEach((t=>{e.has(t)||s.push(t)})),this.documentOverlayCache.getOverlays(t,s).next((t=>{t.forEach(((t,n)=>{e.set(t,n)}))}))}computeViews(t,e,n,s){let r=Ra();const i=Fa(),o=Fa();return e.forEach(((t,e)=>{const o=n.get(e.key);s.has(e.key)&&(void 0===o||o.mutation instanceof wa)?r=r.insert(e.key,e):void 0!==o&&(i.set(e.key,o.mutation.getFieldMask()),ga(o.mutation,e,o.mutation.getFieldMask(),ci.now()))})),this.recalculateAndSaveOverlays(t,r).next((t=>(t.forEach(((t,e)=>i.set(t,e))),e.forEach(((t,e)=>{var n;return o.set(t,new jc(e,null!==(n=i.get(t))&&void 0!==n?n:null))})),o)))}recalculateAndSaveOverlays(t,e){const n=Fa();let s=new Ni(((t,e)=>t-e)),r=$a();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((t=>{for(const r of t)r.keys().forEach((t=>{const i=e.get(t);if(null===i)return;let o=n.get(t)||xi.empty();o=r.applyToLocalView(i,o),n.set(t,o);const a=(s.get(r.batchId)||$a()).add(t);s=s.insert(r.batchId,a)}))})).next((()=>{const i=[],o=s.getReverseIterator();for(;o.hasNext();){const s=o.getNext(),a=s.key,c=s.value,u=Pa();c.forEach((t=>{if(!r.has(t)){const s=fa(e.get(t),n.get(t));null!==s&&u.set(t,s),r=r.add(t)}})),i.push(this.documentOverlayCache.saveOverlays(t,a,u))}return Ii.waitFor(i)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((e=>this.recalculateAndSaveOverlays(t,e)))}getDocumentsMatchingQuery(t,e,n){return s=e,pi.isDocumentKey(s.path)&&null===s.collectionGroup&&0===s.filters.length?this.getDocumentsMatchingDocumentQuery(t,e.path):Po(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n):this.getDocumentsMatchingCollectionQuery(t,e,n);var s}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next((r=>{const i=s-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-r.size):Ii.resolve(Va());let o=-1,a=r;return i.next((e=>Ii.forEach(e,((e,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),r.get(e)?Ii.resolve():this.getBaseDocument(t,e,n).next((t=>{a=a.insert(e,t)}))))).next((()=>this.populateOverlays(t,e,r))).next((()=>this.computeViews(t,a,e,$a()))).next((t=>({batchId:o,changes:Ma(t)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new pi(e)).next((t=>{let e=xa();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e}))}getDocumentsMatchingCollectionGroupQuery(t,e,n){const s=e.collectionGroup;let r=xa();return this.indexManager.getCollectionParents(t,s).next((i=>Ii.forEach(i,(i=>{const o=(a=e,c=i.child(s),new Ro(c,null,a.explicitOrderBy.slice(),a.filters.slice(),a.limit,a.limitType,a.startAt,a.endAt));var a,c;return this.getDocumentsMatchingCollectionQuery(t,o,n).next((t=>{t.forEach(((t,e)=>{r=r.insert(t,e)}))}))})).next((()=>r))))}getDocumentsMatchingCollectionQuery(t,e,n){let s;return this.remoteDocumentCache.getAllFromCollection(t,e.path,n).next((r=>(s=r,this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId)))).next((t=>{t.forEach(((t,e)=>{const n=e.getKey();null===s.get(n)&&(s=s.insert(n,lo.newInvalidDocument(n)))}));let n=xa();return s.forEach(((s,r)=>{const i=t.get(s);void 0!==i&&ga(i.mutation,r,xi.empty(),ci.now()),Ko(e,r)&&(n=n.insert(s,r))})),n}))}getBaseDocument(t,e,n){return null===n||1===n.mutation.type?this.remoteDocumentCache.getEntry(t,e):Ii.resolve(lo.newInvalidDocument(e))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(t){this.wt=t,this.Jn=new Map,this.Yn=new Map}getBundleMetadata(t,e){return Ii.resolve(this.Jn.get(e))}saveBundleMetadata(t,e){var n;return this.Jn.set(e.id,{id:(n=e).id,version:n.version,createTime:ic(n.createTime)}),Ii.resolve()}getNamedQuery(t,e){return Ii.resolve(this.Yn.get(e))}saveNamedQuery(t,e){return this.Yn.set(e.name,{name:(n=e).name,query:Mc(n.bundledQuery),readTime:ic(n.readTime)}),Ii.resolve();var n}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc{constructor(){this.overlays=new Ni(pi.comparator),this.Xn=new Map}getOverlay(t,e){return Ii.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Va();return Ii.forEach(e,(e=>this.getOverlay(t,e).next((t=>{null!==t&&n.set(e,t)})))).next((()=>n))}saveOverlays(t,e,n){return n.forEach(((n,s)=>{this.ie(t,e,s)})),Ii.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.Xn.get(n);return void 0!==s&&(s.forEach((t=>this.overlays=this.overlays.remove(t))),this.Xn.delete(n)),Ii.resolve()}getOverlaysForCollection(t,e,n){const s=Va(),r=e.length+1,i=new pi(e.child("")),o=this.overlays.getIteratorFrom(i);for(;o.hasNext();){const t=o.getNext().value,i=t.getKey();if(!e.isPrefixOf(i.path))break;i.path.length===r&&t.largestBatchId>n&&s.set(t.getKey(),t)}return Ii.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let r=new Ni(((t,e)=>t-e));const i=this.overlays.getIterator();for(;i.hasNext();){const t=i.getNext().value;if(t.getKey().getCollectionGroup()===e&&t.largestBatchId>n){let e=r.get(t.largestBatchId);null===e&&(e=Va(),r=r.insert(t.largestBatchId,e)),e.set(t.getKey(),t)}}const o=Va(),a=r.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach(((t,e)=>o.set(t,e))),!(o.size()>=s)););return Ii.resolve(o)}ie(t,e,n){const s=this.overlays.get(n.key);if(null!==s){const t=this.Xn.get(s.largestBatchId).delete(n.key);this.Xn.set(s.largestBatchId,t)}this.overlays=this.overlays.insert(n.key,new Rc(e,n));let r=this.Xn.get(e);void 0===r&&(r=$a(),this.Xn.set(e,r)),this.Xn.set(e,r.add(n.key))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc{constructor(){this.Zn=new Ri(Hc.ts),this.es=new Ri(Hc.ns)}isEmpty(){return this.Zn.isEmpty()}addReference(t,e){const n=new Hc(t,e);this.Zn=this.Zn.add(n),this.es=this.es.add(n)}ss(t,e){t.forEach((t=>this.addReference(t,e)))}removeReference(t,e){this.rs(new Hc(t,e))}os(t,e){t.forEach((t=>this.removeReference(t,e)))}us(t){const e=new pi(new li([])),n=new Hc(e,t),s=new Hc(e,t+1),r=[];return this.es.forEachInRange([n,s],(t=>{this.rs(t),r.push(t.key)})),r}cs(){this.Zn.forEach((t=>this.rs(t)))}rs(t){this.Zn=this.Zn.delete(t),this.es=this.es.delete(t)}hs(t){const e=new pi(new li([])),n=new Hc(e,t),s=new Hc(e,t+1);let r=$a();return this.es.forEachInRange([n,s],(t=>{r=r.add(t.key)})),r}containsKey(t){const e=new Hc(t,0),n=this.Zn.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class Hc{constructor(t,e){this.key=t,this.ls=e}static ts(t,e){return pi.comparator(t.key,e.key)||oi(t.ls,e.ls)}static ns(t,e){return oi(t.ls,e.ls)||pi.comparator(t.key,e.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qc{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.fs=1,this.ds=new Ri(Hc.ts)}checkEmpty(t){return Ii.resolve(0===this.mutationQueue.length)}addMutationBatch(t,e,n,s){const r=this.fs;this.fs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new kc(r,e,n,s);this.mutationQueue.push(i);for(const e of s)this.ds=this.ds.add(new Hc(e.key,r)),this.indexManager.addToCollectionParentIndex(t,e.key.path.popLast());return Ii.resolve(i)}lookupMutationBatch(t,e){return Ii.resolve(this._s(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.ws(n),r=s<0?0:s;return Ii.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return Ii.resolve(0===this.mutationQueue.length?-1:this.fs-1)}getAllMutationBatches(t){return Ii.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new Hc(e,0),s=new Hc(e,Number.POSITIVE_INFINITY),r=[];return this.ds.forEachInRange([n,s],(t=>{const e=this._s(t.ls);r.push(e)})),Ii.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new Ri(oi);return e.forEach((t=>{const e=new Hc(t,0),s=new Hc(t,Number.POSITIVE_INFINITY);this.ds.forEachInRange([e,s],(t=>{n=n.add(t.ls)}))})),Ii.resolve(this.gs(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let r=n;pi.isDocumentKey(r)||(r=r.child(""));const i=new Hc(new pi(r),0);let o=new Ri(oi);return this.ds.forEachWhile((t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===s&&(o=o.add(t.ls)),!0)}),i),Ii.resolve(this.gs(o))}gs(t){const e=[];return t.forEach((t=>{const n=this._s(t);null!==n&&e.push(n)})),e}removeMutationBatch(t,e){zr(0===this.ys(e.batchId,"removed")),this.mutationQueue.shift();let n=this.ds;return Ii.forEach(e.mutations,(s=>{const r=new Hc(s.key,e.batchId);return n=n.delete(r),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.ds=n}))}In(t){}containsKey(t,e){const n=new Hc(e,0),s=this.ds.firstAfterOrEqual(n);return Ii.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,Ii.resolve()}ys(t,e){return this.ws(t)}ws(t){return 0===this.mutationQueue.length?0:t-this.mutationQueue[0].batchId}_s(t){const e=this.ws(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wc{constructor(t){this.ps=t,this.docs=new Ni(pi.comparator),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),r=s?s.size:0,i=this.ps(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:i}),this.size+=i-r,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return Ii.resolve(n?n.document.mutableCopy():lo.newInvalidDocument(e))}getEntries(t,e){let n=Ra();return e.forEach((t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.mutableCopy():lo.newInvalidDocument(t))})),Ii.resolve(n)}getAllFromCollection(t,e,n){let s=Ra();const r=new pi(e.child("")),i=this.docs.getIteratorFrom(r);for(;i.hasNext();){const{key:t,value:{document:r}}=i.getNext();if(!e.isPrefixOf(t.path))break;t.path.length>e.length+1||wi(yi(r),n)<=0||(s=s.insert(r.key,r.mutableCopy()))}return Ii.resolve(s)}getAllFromCollectionGroup(t,e,n,s){Gr()}Is(t,e){return Ii.forEach(this.docs,(t=>e(t)))}newChangeBuffer(t){return new Xc(this)}getSize(t){return Ii.resolve(this.size)}}class Xc extends $c{constructor(t){super(),this.zn=t}applyChanges(t){const e=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?e.push(this.zn.addEntry(t,s)):this.zn.removeEntry(n)})),Ii.waitFor(e)}getFromCache(t,e){return this.zn.getEntry(t,e)}getAllFromCache(t,e){return this.zn.getEntries(t,e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yc{constructor(t){this.persistence=t,this.Ts=new ka((t=>go(t)),mo),this.lastRemoteSnapshotVersion=ui.min(),this.highestTargetId=0,this.Es=0,this.As=new zc,this.targetCount=0,this.Rs=Bc.An()}forEachTarget(t,e){return this.Ts.forEach(((t,n)=>e(n))),Ii.resolve()}getLastRemoteSnapshotVersion(t){return Ii.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return Ii.resolve(this.Es)}allocateTargetId(t){return this.highestTargetId=this.Rs.next(),Ii.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.Es&&(this.Es=e),Ii.resolve()}vn(t){this.Ts.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.Rs=new Bc(e),this.highestTargetId=e),t.sequenceNumber>this.Es&&(this.Es=t.sequenceNumber)}addTargetData(t,e){return this.vn(e),this.targetCount+=1,Ii.resolve()}updateTargetData(t,e){return this.vn(e),Ii.resolve()}removeTargetData(t,e){return this.Ts.delete(e.target),this.As.us(e.targetId),this.targetCount-=1,Ii.resolve()}removeTargets(t,e,n){let s=0;const r=[];return this.Ts.forEach(((i,o)=>{o.sequenceNumber<=e&&null===n.get(o.targetId)&&(this.Ts.delete(i),r.push(this.removeMatchingKeysForTargetId(t,o.targetId)),s++)})),Ii.waitFor(r).next((()=>s))}getTargetCount(t){return Ii.resolve(this.targetCount)}getTargetData(t,e){const n=this.Ts.get(e)||null;return Ii.resolve(n)}addMatchingKeys(t,e,n){return this.As.ss(e,n),Ii.resolve()}removeMatchingKeys(t,e,n){this.As.os(e,n);const s=this.persistence.referenceDelegate,r=[];return s&&e.forEach((e=>{r.push(s.markPotentiallyOrphaned(t,e))})),Ii.waitFor(r)}removeMatchingKeysForTargetId(t,e){return this.As.us(e),Ii.resolve()}getMatchingKeysForTargetId(t,e){const n=this.As.hs(e);return Ii.resolve(n)}containsKey(t,e){return Ii.resolve(this.As.containsKey(e))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(t,e){this.bs={},this.overlays={},this.Ps=new Si(0),this.vs=!1,this.vs=!0,this.referenceDelegate=t(this),this.Vs=new Yc(this),this.indexManager=new Pc,this.remoteDocumentCache=new Wc((t=>this.referenceDelegate.Ss(t))),this.wt=new xc(e),this.Ds=new Kc(this.wt)}start(){return Promise.resolve()}shutdown(){return this.vs=!1,Promise.resolve()}get started(){return this.vs}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Gc,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.bs[t.toKey()];return n||(n=new Qc(e,this.referenceDelegate),this.bs[t.toKey()]=n),n}getTargetCache(){return this.Vs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ds}runTransaction(t,e,n){$r("MemoryPersistence","Starting transaction:",t);const s=new Zc(this.Ps.next());return this.referenceDelegate.Cs(),n(s).next((t=>this.referenceDelegate.xs(s).next((()=>t)))).toPromise().then((t=>(s.raiseOnCommittedEvent(),t)))}Ns(t,e){return Ii.or(Object.values(this.bs).map((n=>()=>n.containsKey(t,e))))}}class Zc extends bi{constructor(t){super(),this.currentSequenceNumber=t}}class tu{constructor(t){this.persistence=t,this.ks=new zc,this.Os=null}static Ms(t){return new tu(t)}get Fs(){if(this.Os)return this.Os;throw Gr()}addReference(t,e,n){return this.ks.addReference(n,e),this.Fs.delete(n.toString()),Ii.resolve()}removeReference(t,e,n){return this.ks.removeReference(n,e),this.Fs.add(n.toString()),Ii.resolve()}markPotentiallyOrphaned(t,e){return this.Fs.add(e.toString()),Ii.resolve()}removeTarget(t,e){this.ks.us(e.targetId).forEach((t=>this.Fs.add(t.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((t=>{t.forEach((t=>this.Fs.add(t.toString())))})).next((()=>n.removeTargetData(t,e)))}Cs(){this.Os=new Set}xs(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Ii.forEach(this.Fs,(n=>{const s=pi.fromPath(n);return this.$s(t,s).next((t=>{t||e.removeEntry(s,ui.min())}))})).next((()=>(this.Os=null,e.apply(t))))}updateLimboDocument(t,e){return this.$s(t,e).next((t=>{t?this.Fs.delete(e.toString()):this.Fs.add(e.toString())}))}Ss(t){return 0}$s(t,e){return Ii.or([()=>Ii.resolve(this.ks.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ns(t,e)])}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class eu{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.Pi=n,this.vi=s}static Vi(t,e){let n=$a(),s=$a();for(const t of e.docChanges)switch(t.type){case 0:n=n.add(t.doc.key);break;case 1:s=s.add(t.doc.key)}return new eu(t,e.fromCache,n,s)}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(){this.Si=!1}initialize(t,e){this.Di=t,this.indexManager=e,this.Si=!0}getDocumentsMatchingQuery(t,e,n,s){return this.Ci(t,e).next((r=>r||this.xi(t,e,s,n))).next((n=>n||this.Ni(t,e)))}Ci(t,e){return Ii.resolve(null)}xi(t,e,n,s){return function(t){return 0===t.filters.length&&null===t.limit&&null==t.startAt&&null==t.endAt&&(0===t.explicitOrderBy.length||1===t.explicitOrderBy.length&&t.explicitOrderBy[0].field.isKeyField())}(e)||s.isEqual(ui.min())?this.Ni(t,e):this.Di.getDocuments(t,n).next((r=>{const i=this.ki(e,r);return this.Oi(e,i,n,s)?this.Ni(t,e):(Br()<=w.DEBUG&&$r("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),qo(e)),this.Mi(t,i,e,mi(s,-1)))}))}ki(t,e){let n=new Ri(zo(t));return e.forEach(((e,s)=>{Ko(t,s)&&(n=n.add(s))})),n}Oi(t,e,n,s){if(null===t.limit)return!1;if(n.size!==e.size)return!0;const r="F"===t.limitType?e.last():e.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(s)>0)}Ni(t,e){return Br()<=w.DEBUG&&$r("QueryEngine","Using full collection scan to execute query:",qo(e)),this.Di.getDocumentsMatchingQuery(t,e,vi.min())}Mi(t,e,n,s){return this.Di.getDocumentsMatchingQuery(t,n,s).next((t=>(e.forEach((e=>{t=t.insert(e.key,e)})),t)))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(t,e,n,s){this.persistence=t,this.Fi=e,this.wt=s,this.$i=new Ni(oi),this.Bi=new ka((t=>go(t)),mo),this.Li=new Map,this.Ui=t.getRemoteDocumentCache(),this.Vs=t.getTargetCache(),this.Ds=t.getBundleCache(),this.qi(n)}qi(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new qc(this.Ui,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ui.setIndexManager(this.indexManager),this.Fi.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.$i)))}}function ru(t,e,n,s){return new su(t,e,n,s)}async function iu(t,e){const n=Hr(t);return await n.persistence.runTransaction("Handle user change","readonly",(t=>{let s;return n.mutationQueue.getAllMutationBatches(t).next((r=>(s=r,n.qi(e),n.mutationQueue.getAllMutationBatches(t)))).next((e=>{const r=[],i=[];let o=$a();for(const t of s){r.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}for(const t of e){i.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}return n.localDocuments.getDocuments(t,o).next((t=>({Ki:t,removedBatchIds:r,addedBatchIds:i})))}))}))}function ou(t){const e=Hr(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Vs.getLastRemoteSnapshotVersion(t)))}function au(t,e,n){let s=$a(),r=$a();return n.forEach((t=>s=s.add(t))),e.getEntries(t,s).next((t=>{let s=Ra();return n.forEach(((n,i)=>{const o=t.get(n);i.isFoundDocument()!==o.isFoundDocument()&&(r=r.add(n)),i.isNoDocument()&&i.version.isEqual(ui.min())?(e.removeEntry(n,i.readTime),s=s.insert(n,i)):!o.isValidDocument()||i.version.compareTo(o.version)>0||0===i.version.compareTo(o.version)&&o.hasPendingWrites?(e.addEntry(i),s=s.insert(n,i)):$r("LocalStore","Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",i.version)})),{Gi:s,Qi:r}}))}function cu(t,e){const n=Hr(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(t=>(void 0===e&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(t,e))))}function uu(t,e){const n=Hr(t);return n.persistence.runTransaction("Allocate target","readwrite",(t=>{let s;return n.Vs.getTargetData(t,e).next((r=>r?(s=r,Ii.resolve(s)):n.Vs.allocateTargetId(t).next((r=>(s=new Oc(e,r,0,t.currentSequenceNumber),n.Vs.addTargetData(t,s).next((()=>s)))))))})).then((t=>{const s=n.$i.get(t.targetId);return(null===s||t.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.$i=n.$i.insert(t.targetId,t),n.Bi.set(e,t.targetId)),t}))}async function hu(t,e,n){const s=Hr(t),r=s.$i.get(e),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,(t=>s.persistence.referenceDelegate.removeTarget(t,r)))}catch(t){if(!Ci(t))throw t;$r("LocalStore",`Failed to update sequence numbers for target ${e}: ${t}`)}s.$i=s.$i.remove(e),s.Bi.delete(r.target)}function lu(t,e,n){const s=Hr(t);let r=ui.min(),i=$a();return s.persistence.runTransaction("Execute query","readonly",(t=>function(t,e,n){const s=Hr(t),r=s.Bi.get(n);return void 0!==r?Ii.resolve(s.$i.get(r)):s.Vs.getTargetData(e,n)}(s,t,Uo(e)).next((e=>{if(e)return r=e.lastLimboFreeSnapshotVersion,s.Vs.getMatchingKeysForTargetId(t,e.targetId).next((t=>{i=t}))})).next((()=>s.Fi.getDocumentsMatchingQuery(t,e,n?r:ui.min(),n?i:$a()))).next((t=>(du(s,Go(e),t),{documents:t,ji:i})))))}function du(t,e,n){let s=ui.min();n.forEach(((t,e)=>{e.readTime.compareTo(s)>0&&(s=e.readTime)})),t.Li.set(e,s)}class fu{constructor(){this.activeTargetIds=qa()}Xi(t){this.activeTargetIds=this.activeTargetIds.add(t)}Zi(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Yi(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class pu{constructor(){this.Fr=new fu,this.$r={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t){return this.Fr.Xi(t),this.$r[t]||"not-current"}updateQueryState(t,e,n){this.$r[t]=e}removeLocalQueryTarget(t){this.Fr.Zi(t)}isLocalQueryTarget(t){return this.Fr.activeTargetIds.has(t)}clearQueryState(t){delete this.$r[t]}getAllActiveQueryTargets(){return this.Fr.activeTargetIds}isActiveQueryTarget(t){return this.Fr.activeTargetIds.has(t)}start(){return this.Fr=new fu,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gu{Br(t){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(){this.Lr=()=>this.Ur(),this.qr=()=>this.Kr(),this.Gr=[],this.Qr()}Br(t){this.Gr.push(t)}shutdown(){window.removeEventListener("online",this.Lr),window.removeEventListener("offline",this.qr)}Qr(){window.addEventListener("online",this.Lr),window.addEventListener("offline",this.qr)}Ur(){$r("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.Gr)t(0)}Kr(){$r("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.Gr)t(1)}static V(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yu={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(t){this.jr=t.jr,this.Wr=t.Wr}zr(t){this.Hr=t}Jr(t){this.Yr=t}onMessage(t){this.Xr=t}close(){this.Wr()}send(t){this.jr(t)}Zr(){this.Hr()}eo(t){this.Yr(t)}no(t){this.Xr(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http";this.so=e+"://"+t.host,this.io="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}ro(t,e,n,s,r){const i=this.oo(t,e);$r("RestConnection","Sending: ",i,n);const o={};return this.uo(o,s,r),this.co(t,i,o,n).then((t=>($r("RestConnection","Received: ",t),t)),(e=>{throw qr("RestConnection",`${t} failed with error: `,e,"url: ",i,"request:",n),e}))}ao(t,e,n,s,r,i){return this.ro(t,e,n,s,r)}uo(t,e,n){t["X-Goog-Api-Client"]="gl-js/ fire/"+Fr,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((e,n)=>t[n]=e)),n&&n.headers.forEach(((e,n)=>t[n]=e))}oo(t,e){const n=yu[t];return`${this.so}/v1/${e}:${n}`}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams}co(t,e,n,s){return new Promise(((r,i)=>{const o=new Cr;o.listenOnce(wr.COMPLETE,(()=>{try{switch(o.getLastErrorCode()){case vr.NO_ERROR:const e=o.getResponseJson();$r("Connection","XHR received:",JSON.stringify(e)),r(e);break;case vr.TIMEOUT:$r("Connection",'RPC "'+t+'" timed out'),i(new Wr(Qr.DEADLINE_EXCEEDED,"Request time out"));break;case vr.HTTP_ERROR:const n=o.getStatus();if($r("Connection",'RPC "'+t+'" failed with status:',n,"response text:",o.getResponseText()),n>0){const t=o.getResponseJson().error;if(t&&t.status&&t.message){const e=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(Qr).indexOf(e)>=0?e:Qr.UNKNOWN}(t.status);i(new Wr(e,t.message))}else i(new Wr(Qr.UNKNOWN,"Server responded with status "+o.getStatus()))}else i(new Wr(Qr.UNAVAILABLE,"Connection failed."));break;default:Gr()}}finally{$r("Connection",'RPC "'+t+'" completed.')}}));const a=JSON.stringify(s);o.send(e,"POST",a,n,15)}))}ho(t,e,n){const s=[this.so,"/","google.firestore.v1.Firestore","/",t,"/channel"],r=mr(),c=yr(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(u.xmlHttpFactory=new Tr({})),this.uo(u.initMessageHeaders,e,n),"undefined"!=typeof window&&(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(i())||"object"==typeof navigator&&"ReactNative"===navigator.product||i().indexOf("Electron/")>=0||a()||i().indexOf("MSAppHost/")>=0||o()||(u.httpHeadersOverwriteParam="$httpHeaders");const h=s.join("");$r("Connection","Creating WebChannel: "+h,u);const l=r.createWebChannel(h,u);let d=!1,f=!1;const p=new vu({jr:t=>{f?$r("Connection","Not sending because WebChannel is closed:",t):(d||($r("Connection","Opening WebChannel transport."),l.open(),d=!0),$r("Connection","WebChannel sending:",t),l.send(t))},Wr:()=>l.close()}),g=(t,e,n)=>{t.listen(e,(t=>{try{n(t)}catch(t){setTimeout((()=>{throw t}),0)}}))};return g(l,Ir.EventType.OPEN,(()=>{f||$r("Connection","WebChannel transport opened.")})),g(l,Ir.EventType.CLOSE,(()=>{f||(f=!0,$r("Connection","WebChannel transport closed"),p.eo())})),g(l,Ir.EventType.ERROR,(t=>{f||(f=!0,qr("Connection","WebChannel transport errored:",t),p.eo(new Wr(Qr.UNAVAILABLE,"The operation could not be completed")))})),g(l,Ir.EventType.MESSAGE,(t=>{var e;if(!f){const n=t.data[0];zr(!!n);const s=n,r=s.error||(null===(e=s[0])||void 0===e?void 0:e.error);if(r){$r("Connection","WebChannel received error:",r);const t=r.status;let e=function(t){const e=Aa[t];if(void 0!==e)return Na(e)}(t),n=r.message;void 0===e&&(e=Qr.INTERNAL,n="Unknown error status: "+t+" with message "+r.message),f=!0,p.eo(new Wr(e,n)),l.close()}else $r("Connection","WebChannel received:",n),p.no(n)}})),g(c,Er.STAT_EVENT,(t=>{t.stat===br.PROXY?$r("Connection","Detected buffering proxy"):t.stat===br.NOPROXY&&$r("Connection","Detected no buffering proxy")})),setTimeout((()=>{p.Zr()}),0),p}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eu(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bu(t){return new ec(t,!0)}class Tu{constructor(t,e,n=1e3,s=1.5,r=6e4){this.js=t,this.timerId=e,this.lo=n,this.fo=s,this._o=r,this.wo=0,this.mo=null,this.yo=Date.now(),this.reset()}reset(){this.wo=0}po(){this.wo=this._o}Io(t){this.cancel();const e=Math.floor(this.wo+this.To()),n=Math.max(0,Date.now()-this.yo),s=Math.max(0,e-n);s>0&&$r("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.wo} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.mo=this.js.enqueueAfterDelay(this.timerId,s,(()=>(this.yo=Date.now(),t()))),this.wo*=this.fo,this.wo<this.lo&&(this.wo=this.lo),this.wo>this._o&&(this.wo=this._o)}Eo(){null!==this.mo&&(this.mo.skipDelay(),this.mo=null)}cancel(){null!==this.mo&&(this.mo.cancel(),this.mo=null)}To(){return(Math.random()-.5)*this.wo}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(t,e,n,s,r,i,o,a){this.js=t,this.Ao=n,this.Ro=s,this.bo=r,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.Po=0,this.vo=null,this.Vo=null,this.stream=null,this.So=new Tu(t,e)}Do(){return 1===this.state||5===this.state||this.Co()}Co(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.xo()}async stop(){this.Do()&&await this.close(0)}No(){this.state=0,this.So.reset()}ko(){this.Co()&&null===this.vo&&(this.vo=this.js.enqueueAfterDelay(this.Ao,6e4,(()=>this.Oo())))}Mo(t){this.Fo(),this.stream.send(t)}async Oo(){if(this.Co())return this.close(0)}Fo(){this.vo&&(this.vo.cancel(),this.vo=null)}$o(){this.Vo&&(this.Vo.cancel(),this.Vo=null)}async close(t,e){this.Fo(),this.$o(),this.So.cancel(),this.Po++,4!==t?this.So.reset():e&&e.code===Qr.RESOURCE_EXHAUSTED?(jr(e.toString()),jr("Using maximum backoff delay to prevent overloading the backend."),this.So.po()):e&&e.code===Qr.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.Bo(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Jr(e)}Bo(){}auth(){this.state=1;const t=this.Lo(this.Po),e=this.Po;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([t,n])=>{this.Po===e&&this.Uo(t,n)}),(e=>{t((()=>{const t=new Wr(Qr.UNKNOWN,"Fetching auth token failed: "+e.message);return this.qo(t)}))}))}Uo(t,e){const n=this.Lo(this.Po);this.stream=this.Ko(t,e),this.stream.zr((()=>{n((()=>(this.state=2,this.Vo=this.js.enqueueAfterDelay(this.Ro,1e4,(()=>(this.Co()&&(this.state=3),Promise.resolve()))),this.listener.zr())))})),this.stream.Jr((t=>{n((()=>this.qo(t)))})),this.stream.onMessage((t=>{n((()=>this.onMessage(t)))}))}xo(){this.state=5,this.So.Io((async()=>{this.state=0,this.start()}))}qo(t){return $r("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}Lo(t){return e=>{this.js.enqueueAndForget((()=>this.Po===t?e():($r("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Cu extends Iu{constructor(t,e,n,s,r,i){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,i),this.wt=r}Ko(t,e){return this.bo.ho("Listen",t,e)}onMessage(t){this.So.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const r="NO_CHANGE"===(s=e.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===s?1:"REMOVE"===s?2:"CURRENT"===s?3:"RESET"===s?4:Gr(),i=e.targetChange.targetIds||[],o=function(t,e){return t.dt?(zr(void 0===e||"string"==typeof e),Mi.fromBase64String(e||"")):(zr(void 0===e||e instanceof Uint8Array),Mi.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(t){const e=void 0===t.code?Qr.UNKNOWN:Na(t.code);return new Wr(e,t.message||"")}(a);n=new Qa(r,i,o,c||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=uc(t,s.document.name),i=ic(s.document.updateTime),o=new uo({mapValue:{fields:s.document.fields}}),a=lo.newFoundDocument(r,i,o),c=s.targetIds||[],u=s.removedTargetIds||[];n=new za(c,u,a.key,a)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=uc(t,s.document),i=s.readTime?ic(s.readTime):ui.min(),o=lo.newNoDocument(r,i),a=s.removedTargetIds||[];n=new za([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=uc(t,s.document),i=s.removedTargetIds||[];n=new za([],i,r,null)}else{if(!("filter"in e))return Gr();{e.filter;const t=e.filter;t.targetId;const s=t.count||0,r=new Sa(s),i=t.targetId;n=new Ha(i,r)}}var s;return n}(this.wt,t),n=function(t){if(!("targetChange"in t))return ui.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?ui.min():e.readTime?ic(e.readTime):ui.min()}(t);return this.listener.Go(e,n)}Qo(t){const e={};e.database=dc(this.wt),e.addTarget=function(t,e){let n;const s=e.target;return n=yo(s)?{documents:mc(t,s)}:{query:yc(t,s)},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0?n.resumeToken=sc(t,e.resumeToken):e.snapshotVersion.compareTo(ui.min())>0&&(n.readTime=nc(t,e.snapshotVersion.toTimestamp())),n}(this.wt,t);const n=function(t,e){const n=function(t,e){switch(e){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return Gr()}}(0,e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.wt,t);n&&(e.labels=n),this.Mo(e)}jo(t){const e={};e.database=dc(this.wt),e.removeTarget=t,this.Mo(e)}}class Su extends Iu{constructor(t,e,n,s,r,i){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,i),this.wt=r,this.Wo=!1}get zo(){return this.Wo}start(){this.Wo=!1,this.lastStreamToken=void 0,super.start()}Bo(){this.Wo&&this.Ho([])}Ko(t,e){return this.bo.ho("Write",t,e)}onMessage(t){if(zr(!!t.streamToken),this.lastStreamToken=t.streamToken,this.Wo){this.So.reset();const s=(e=t.writeResults,n=t.commitTime,e&&e.length>0?(zr(void 0!==n),e.map((t=>function(t,e){let n=t.updateTime?ic(t.updateTime):ic(e);return n.isEqual(ui.min())&&(n=ic(e)),new ua(n,t.transformResults||[])}(t,n)))):[]),r=ic(t.commitTime);return this.listener.Jo(r,s)}var e,n;return zr(!t.writeResults||0===t.writeResults.length),this.Wo=!0,this.listener.Yo()}Xo(){const t={};t.database=dc(this.wt),this.Mo(t)}Ho(t){const e={streamToken:this.lastStreamToken,writes:t.map((t=>gc(this.wt,t)))};this.Mo(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au extends class{}{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.bo=n,this.wt=s,this.Zo=!1}tu(){if(this.Zo)throw new Wr(Qr.FAILED_PRECONDITION,"The client has already been terminated.")}ro(t,e,n){return this.tu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,r])=>this.bo.ro(t,e,n,s,r))).catch((t=>{throw"FirebaseError"===t.name?(t.code===Qr.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new Wr(Qr.UNKNOWN,t.toString())}))}ao(t,e,n,s){return this.tu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([r,i])=>this.bo.ao(t,e,n,r,i,s))).catch((t=>{throw"FirebaseError"===t.name?(t.code===Qr.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new Wr(Qr.UNKNOWN,t.toString())}))}terminate(){this.Zo=!0}}class _u{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.eu=0,this.nu=null,this.su=!0}iu(){0===this.eu&&(this.ru("Unknown"),this.nu=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.nu=null,this.ou("Backend didn't respond within 10 seconds."),this.ru("Offline"),Promise.resolve()))))}uu(t){"Online"===this.state?this.ru("Unknown"):(this.eu++,this.eu>=1&&(this.cu(),this.ou(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ru("Offline")))}set(t){this.cu(),this.eu=0,"Online"===t&&(this.su=!1),this.ru(t)}ru(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ou(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.su?(jr(e),this.su=!1):$r("OnlineStateTracker",e)}cu(){null!==this.nu&&(this.nu.cancel(),this.nu=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Du{constructor(t,e,n,s,r){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.au=[],this.hu=new Map,this.lu=new Set,this.fu=[],this.du=r,this.du.Br((t=>{n.enqueueAndForget((async()=>{Pu(this)&&($r("RemoteStore","Restarting streams for network reachability change."),await async function(t){const e=Hr(t);e.lu.add(4),await ku(e),e._u.set("Unknown"),e.lu.delete(4),await Nu(e)}(this))}))})),this._u=new _u(n,s)}}async function Nu(t){if(Pu(t))for(const e of t.fu)await e(!0)}async function ku(t){for(const e of t.fu)await e(!1)}function Lu(t,e){const n=Hr(t);n.hu.has(e.targetId)||(n.hu.set(e.targetId,e),Vu(n)?Mu(n):eh(n).Co()&&Ou(n,e))}function Ru(t,e){const n=Hr(t),s=eh(n);n.hu.delete(e),s.Co()&&xu(n,e),0===n.hu.size&&(s.Co()?s.ko():Pu(n)&&n._u.set("Unknown"))}function Ou(t,e){t.wu.Nt(e.targetId),eh(t).Qo(e)}function xu(t,e){t.wu.Nt(e),eh(t).jo(e)}function Mu(t){t.wu=new Xa({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),te:e=>t.hu.get(e)||null}),eh(t).start(),t._u.iu()}function Vu(t){return Pu(t)&&!eh(t).Do()&&t.hu.size>0}function Pu(t){return 0===Hr(t).lu.size}function Fu(t){t.wu=void 0}async function Uu(t){t.hu.forEach(((e,n)=>{Ou(t,e)}))}async function Bu(t,e){Fu(t),Vu(t)?(t._u.uu(e),Mu(t)):t._u.set("Unknown")}async function $u(t,e,n){if(t._u.set("Online"),e instanceof Qa&&2===e.state&&e.cause)try{await async function(t,e){const n=e.cause;for(const s of e.targetIds)t.hu.has(s)&&(await t.remoteSyncer.rejectListen(s,n),t.hu.delete(s),t.wu.removeTarget(s))}(t,e)}catch(n){$r("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await ju(t,n)}else if(e instanceof za?t.wu.Ut(e):e instanceof Ha?t.wu.zt(e):t.wu.Gt(e),!n.isEqual(ui.min()))try{const e=await ou(t.localStore);n.compareTo(e)>=0&&await function(t,e){const n=t.wu.Yt(e);return n.targetChanges.forEach(((n,s)=>{if(n.resumeToken.approximateByteSize()>0){const r=t.hu.get(s);r&&t.hu.set(s,r.withResumeToken(n.resumeToken,e))}})),n.targetMismatches.forEach((e=>{const n=t.hu.get(e);if(!n)return;t.hu.set(e,n.withResumeToken(Mi.EMPTY_BYTE_STRING,n.snapshotVersion)),xu(t,e);const s=new Oc(n.target,e,1,n.sequenceNumber);Ou(t,s)})),t.remoteSyncer.applyRemoteEvent(n)}(t,n)}catch(e){$r("RemoteStore","Failed to raise snapshot:",e),await ju(t,e)}}async function ju(t,e,n){if(!Ci(e))throw e;t.lu.add(1),await ku(t),t._u.set("Offline"),n||(n=()=>ou(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{$r("RemoteStore","Retrying IndexedDB access"),await n(),t.lu.delete(1),await Nu(t)}))}function qu(t,e){return e().catch((n=>ju(t,n,e)))}async function Ku(t){const e=Hr(t),n=nh(e);let s=e.au.length>0?e.au[e.au.length-1].batchId:-1;for(;Gu(e);)try{const t=await cu(e.localStore,s);if(null===t){0===e.au.length&&n.ko();break}s=t.batchId,zu(e,t)}catch(t){await ju(e,t)}Hu(e)&&Qu(e)}function Gu(t){return Pu(t)&&t.au.length<10}function zu(t,e){t.au.push(e);const n=nh(t);n.Co()&&n.zo&&n.Ho(e.mutations)}function Hu(t){return Pu(t)&&!nh(t).Do()&&t.au.length>0}function Qu(t){nh(t).start()}async function Wu(t){nh(t).Xo()}async function Xu(t){const e=nh(t);for(const n of t.au)e.Ho(n.mutations)}async function Yu(t,e,n){const s=t.au.shift(),r=Lc.from(s,e,n);await qu(t,(()=>t.remoteSyncer.applySuccessfulWrite(r))),await Ku(t)}async function Ju(t,e){e&&nh(t).zo&&await async function(t,e){if(Da(n=e.code)&&n!==Qr.ABORTED){const n=t.au.shift();nh(t).No(),await qu(t,(()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e))),await Ku(t)}var n}(t,e),Hu(t)&&Qu(t)}async function Zu(t,e){const n=Hr(t);n.asyncQueue.verifyOperationInProgress(),$r("RemoteStore","RemoteStore received new credentials");const s=Pu(n);n.lu.add(3),await ku(n),s&&n._u.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.lu.delete(3),await Nu(n)}async function th(t,e){const n=Hr(t);e?(n.lu.delete(2),await Nu(n)):e||(n.lu.add(2),await ku(n),n._u.set("Unknown"))}function eh(t){return t.mu||(t.mu=function(t,e,n){const s=Hr(t);return s.tu(),new Cu(e,s.bo,s.authCredentials,s.appCheckCredentials,s.wt,n)}(t.datastore,t.asyncQueue,{zr:Uu.bind(null,t),Jr:Bu.bind(null,t),Go:$u.bind(null,t)}),t.fu.push((async e=>{e?(t.mu.No(),Vu(t)?Mu(t):t._u.set("Unknown")):(await t.mu.stop(),Fu(t))}))),t.mu}function nh(t){return t.gu||(t.gu=function(t,e,n){const s=Hr(t);return s.tu(),new Su(e,s.bo,s.authCredentials,s.appCheckCredentials,s.wt,n)}(t.datastore,t.asyncQueue,{zr:Wu.bind(null,t),Jr:Ju.bind(null,t),Yo:Xu.bind(null,t),Jo:Yu.bind(null,t)}),t.fu.push((async e=>{e?(t.gu.No(),await Ku(t)):(await t.gu.stop(),t.au.length>0&&($r("RemoteStore",`Stopping write stream with ${t.au.length} pending writes`),t.au=[]))}))),t.gu
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class sh{constructor(t,e,n,s,r){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=r,this.deferred=new Xr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((t=>{}))}static createAndSchedule(t,e,n,s,r){const i=Date.now()+n,o=new sh(t,e,i,s,r);return o.start(n),o}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new Wr(Qr.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function rh(t,e){if(jr("AsyncQueue",`${e}: ${t}`),Ci(t))return new Wr(Qr.UNAVAILABLE,`${e}: ${t}`);throw t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ih{constructor(t){this.comparator=t?(e,n)=>t(e,n)||pi.comparator(e.key,n.key):(t,e)=>pi.comparator(t.key,e.key),this.keyedMap=xa(),this.sortedSet=new Ni(this.comparator)}static emptySet(t){return new ih(t.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,n)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof ih))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,s=n.getNext().key;if(!t.isEqual(s))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new ih;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(){this.yu=new Ni(pi.comparator)}track(t){const e=t.doc.key,n=this.yu.get(e);n?0!==t.type&&3===n.type?this.yu=this.yu.insert(e,t):3===t.type&&1!==n.type?this.yu=this.yu.insert(e,{type:n.type,doc:t.doc}):2===t.type&&2===n.type?this.yu=this.yu.insert(e,{type:2,doc:t.doc}):2===t.type&&0===n.type?this.yu=this.yu.insert(e,{type:0,doc:t.doc}):1===t.type&&0===n.type?this.yu=this.yu.remove(e):1===t.type&&2===n.type?this.yu=this.yu.insert(e,{type:1,doc:n.doc}):0===t.type&&1===n.type?this.yu=this.yu.insert(e,{type:2,doc:t.doc}):Gr():this.yu=this.yu.insert(e,t)}pu(){const t=[];return this.yu.inorderTraversal(((e,n)=>{t.push(n)})),t}}class ah{constructor(t,e,n,s,r,i,o,a){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=r,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a}static fromInitialDocuments(t,e,n,s){const r=[];return e.forEach((t=>{r.push({type:0,doc:t})})),new ah(t,e,ih.emptySet(e),r,n,s,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&$o(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t].type!==n[t].type||!e[t].doc.isEqual(n[t].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ch{constructor(){this.Iu=void 0,this.listeners=[]}}class uh{constructor(){this.queries=new ka((t=>jo(t)),$o),this.onlineState="Unknown",this.Tu=new Set}}async function hh(t,e){const n=Hr(t),s=e.query;let r=!1,i=n.queries.get(s);if(i||(r=!0,i=new ch),r)try{i.Iu=await n.onListen(s)}catch(t){const n=rh(t,`Initialization of query '${qo(e.query)}' failed`);return void e.onError(n)}n.queries.set(s,i),i.listeners.push(e),e.Eu(n.onlineState),i.Iu&&e.Au(i.Iu)&&ph(n)}async function lh(t,e){const n=Hr(t),s=e.query;let r=!1;const i=n.queries.get(s);if(i){const t=i.listeners.indexOf(e);t>=0&&(i.listeners.splice(t,1),r=0===i.listeners.length)}if(r)return n.queries.delete(s),n.onUnlisten(s)}function dh(t,e){const n=Hr(t);let s=!1;for(const t of e){const e=t.query,r=n.queries.get(e);if(r){for(const e of r.listeners)e.Au(t)&&(s=!0);r.Iu=t}}s&&ph(n)}function fh(t,e,n){const s=Hr(t),r=s.queries.get(e);if(r)for(const t of r.listeners)t.onError(n);s.queries.delete(e)}function ph(t){t.Tu.forEach((t=>{t.next()}))}class gh{constructor(t,e,n){this.query=t,this.Ru=e,this.bu=!1,this.Pu=null,this.onlineState="Unknown",this.options=n||{}}Au(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new ah(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0)}let e=!1;return this.bu?this.vu(t)&&(this.Ru.next(t),e=!0):this.Vu(t,this.onlineState)&&(this.Su(t),e=!0),this.Pu=t,e}onError(t){this.Ru.error(t)}Eu(t){this.onlineState=t;let e=!1;return this.Pu&&!this.bu&&this.Vu(this.Pu,t)&&(this.Su(this.Pu),e=!0),e}Vu(t,e){if(!t.fromCache)return!0;const n="Offline"!==e;return!(this.options.Du&&n||t.docs.isEmpty()&&"Offline"!==e)}vu(t){if(t.docChanges.length>0)return!0;const e=this.Pu&&this.Pu.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}Su(t){t=ah.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache),this.bu=!0,this.Ru.next(t)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class mh{constructor(t){this.key=t}}class yh{constructor(t){this.key=t}}class vh{constructor(t,e){this.query=t,this.Fu=e,this.$u=null,this.current=!1,this.Bu=$a(),this.mutatedKeys=$a(),this.Lu=zo(t),this.Uu=new ih(this.Lu)}get qu(){return this.Fu}Ku(t,e){const n=e?e.Gu:new oh,s=e?e.Uu:this.Uu;let r=e?e.mutatedKeys:this.mutatedKeys,i=s,o=!1;const a="F"===this.query.limitType&&s.size===this.query.limit?s.last():null,c="L"===this.query.limitType&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((t,e)=>{const u=s.get(t),h=Ko(this.query,e)?e:null,l=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations);let f=!1;u&&h?u.data.isEqual(h.data)?l!==d&&(n.track({type:3,doc:h}),f=!0):this.Qu(u,h)||(n.track({type:2,doc:h}),f=!0,(a&&this.Lu(h,a)>0||c&&this.Lu(h,c)<0)&&(o=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(h?(i=i.add(h),r=d?r.add(t):r.delete(t)):(i=i.delete(t),r=r.delete(t)))})),null!==this.query.limit)for(;i.size>this.query.limit;){const t="F"===this.query.limitType?i.last():i.first();i=i.delete(t.key),r=r.delete(t.key),n.track({type:1,doc:t})}return{Uu:i,Gu:n,Oi:o,mutatedKeys:r}}Qu(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n){const s=this.Uu;this.Uu=t.Uu,this.mutatedKeys=t.mutatedKeys;const r=t.Gu.pu();r.sort(((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Gr()}};return n(t)-n(e)}(t.type,e.type)||this.Lu(t.doc,e.doc))),this.ju(n);const i=e?this.Wu():[],o=0===this.Bu.size&&this.current?1:0,a=o!==this.$u;return this.$u=o,0!==r.length||a?{snapshot:new ah(this.query,t.Uu,s,r,t.mutatedKeys,0===o,a,!1),zu:i}:{zu:i}}Eu(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({Uu:this.Uu,Gu:new oh,mutatedKeys:this.mutatedKeys,Oi:!1},!1)):{zu:[]}}Hu(t){return!this.Fu.has(t)&&!!this.Uu.has(t)&&!this.Uu.get(t).hasLocalMutations}ju(t){t&&(t.addedDocuments.forEach((t=>this.Fu=this.Fu.add(t))),t.modifiedDocuments.forEach((t=>{})),t.removedDocuments.forEach((t=>this.Fu=this.Fu.delete(t))),this.current=t.current)}Wu(){if(!this.current)return[];const t=this.Bu;this.Bu=$a(),this.Uu.forEach((t=>{this.Hu(t.key)&&(this.Bu=this.Bu.add(t.key))}));const e=[];return t.forEach((t=>{this.Bu.has(t)||e.push(new yh(t))})),this.Bu.forEach((n=>{t.has(n)||e.push(new mh(n))})),e}Ju(t){this.Fu=t.ji,this.Bu=$a();const e=this.Ku(t.documents);return this.applyChanges(e,!0)}Yu(){return ah.fromInitialDocuments(this.query,this.Uu,this.mutatedKeys,0===this.$u)}}class wh{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class Eh{constructor(t){this.key=t,this.Xu=!1}}class bh{constructor(t,e,n,s,r,i){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=r,this.maxConcurrentLimboResolutions=i,this.Zu={},this.tc=new ka((t=>jo(t)),$o),this.ec=new Map,this.nc=new Set,this.sc=new Ni(pi.comparator),this.ic=new Map,this.rc=new zc,this.oc={},this.uc=new Map,this.cc=Bc.Rn(),this.onlineState="Unknown",this.ac=void 0}get isPrimaryClient(){return!0===this.ac}}async function Th(t,e){const n=Bh(t);let s,r;const i=n.tc.get(e);if(i)s=i.targetId,n.sharedClientState.addLocalQueryTarget(s),r=i.view.Yu();else{const t=await uu(n.localStore,Uo(e));n.isPrimaryClient&&Lu(n.remoteStore,t);const i=n.sharedClientState.addLocalQueryTarget(t.targetId);s=t.targetId,r=await Ih(n,e,s,"current"===i)}return r}async function Ih(t,e,n,s){t.hc=(e,n,s)=>async function(t,e,n,s){let r=e.view.Ku(n);r.Oi&&(r=await lu(t.localStore,e.query,!1).then((({documents:t})=>e.view.Ku(t,r))));const i=s&&s.targetChanges.get(e.targetId),o=e.view.applyChanges(r,t.isPrimaryClient,i);return xh(t,e.targetId,o.zu),o.snapshot}(t,e,n,s);const r=await lu(t.localStore,e,!0),i=new vh(e,r.ji),o=i.Ku(r.documents),a=Ga.createSynthesizedTargetChangeForCurrentChange(n,s&&"Offline"!==t.onlineState),c=i.applyChanges(o,t.isPrimaryClient,a);xh(t,n,c.zu);const u=new wh(e,n,i);return t.tc.set(e,u),t.ec.has(n)?t.ec.get(n).push(e):t.ec.set(n,[e]),c.snapshot}async function Ch(t,e){const n=Hr(t),s=n.tc.get(e),r=n.ec.get(s.targetId);if(r.length>1)return n.ec.set(s.targetId,r.filter((t=>!$o(t,e)))),void n.tc.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await hu(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),Ru(n.remoteStore,s.targetId),Rh(n,s.targetId)})).catch(Ti)):(Rh(n,s.targetId),await hu(n.localStore,s.targetId,!0))}async function Sh(t,e){const n=Hr(t);try{const t=await function(t,e){const n=Hr(t),s=e.snapshotVersion;let r=n.$i;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(t=>{const i=n.Ui.newChangeBuffer({trackRemovals:!0});r=n.$i;const o=[];e.targetChanges.forEach(((i,a)=>{const c=r.get(a);if(!c)return;o.push(n.Vs.removeMatchingKeys(t,i.removedDocuments,a).next((()=>n.Vs.addMatchingKeys(t,i.addedDocuments,a))));let u=c.withSequenceNumber(t.currentSequenceNumber);var h,l,d;e.targetMismatches.has(a)?u=u.withResumeToken(Mi.EMPTY_BYTE_STRING,ui.min()).withLastLimboFreeSnapshotVersion(ui.min()):i.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(i.resumeToken,s)),r=r.insert(a,u),l=u,d=i,(0===(h=c).resumeToken.approximateByteSize()||l.snapshotVersion.toMicroseconds()-h.snapshotVersion.toMicroseconds()>=3e8||d.addedDocuments.size+d.modifiedDocuments.size+d.removedDocuments.size>0)&&o.push(n.Vs.updateTargetData(t,u))}));let a=Ra(),c=$a();if(e.documentUpdates.forEach((s=>{e.resolvedLimboDocuments.has(s)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,s))})),o.push(au(t,i,e.documentUpdates).next((t=>{a=t.Gi,c=t.Qi}))),!s.isEqual(ui.min())){const e=n.Vs.getLastRemoteSnapshotVersion(t).next((e=>n.Vs.setTargetsMetadata(t,t.currentSequenceNumber,s)));o.push(e)}return Ii.waitFor(o).next((()=>i.apply(t))).next((()=>n.localDocuments.getLocalViewOfDocuments(t,a,c))).next((()=>a))})).then((t=>(n.$i=r,t)))}(n.localStore,e);e.targetChanges.forEach(((t,e)=>{const s=n.ic.get(e);s&&(zr(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1),t.addedDocuments.size>0?s.Xu=!0:t.modifiedDocuments.size>0?zr(s.Xu):t.removedDocuments.size>0&&(zr(s.Xu),s.Xu=!1))})),await Ph(n,t,e)}catch(t){await Ti(t)}}function Ah(t,e,n){const s=Hr(t);if(s.isPrimaryClient&&0===n||!s.isPrimaryClient&&1===n){const t=[];s.tc.forEach(((n,s)=>{const r=s.view.Eu(e);r.snapshot&&t.push(r.snapshot)})),function(t,e){const n=Hr(t);n.onlineState=e;let s=!1;n.queries.forEach(((t,n)=>{for(const t of n.listeners)t.Eu(e)&&(s=!0)})),s&&ph(n)}(s.eventManager,e),t.length&&s.Zu.Go(t),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function _h(t,e,n){const s=Hr(t);s.sharedClientState.updateQueryState(e,"rejected",n);const r=s.ic.get(e),i=r&&r.key;if(i){let t=new Ni(pi.comparator);t=t.insert(i,lo.newNoDocument(i,ui.min()));const n=$a().add(i),r=new Ka(ui.min(),new Map,new Ri(oi),t,n);await Sh(s,r),s.sc=s.sc.remove(i),s.ic.delete(e),Vh(s)}else await hu(s.localStore,e,!1).then((()=>Rh(s,e,n))).catch(Ti)}async function Dh(t,e){const n=Hr(t),s=e.batch.batchId;try{const t=await function(t,e){const n=Hr(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(t=>{const s=e.batch.keys(),r=n.Ui.newChangeBuffer({trackRemovals:!0});return function(t,e,n,s){const r=n.batch,i=r.keys();let o=Ii.resolve();return i.forEach((t=>{o=o.next((()=>s.getEntry(e,t))).next((e=>{const i=n.docVersions.get(t);zr(null!==i),e.version.compareTo(i)<0&&(r.applyToRemoteDocument(e,n),e.isValidDocument()&&(e.setReadTime(n.commitVersion),s.addEntry(e)))}))})),o.next((()=>t.mutationQueue.removeMutationBatch(e,r)))}(n,t,e,r).next((()=>r.apply(t))).next((()=>n.mutationQueue.performConsistencyCheck(t))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(t,s,e.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,function(t){let e=$a();for(let n=0;n<t.mutationResults.length;++n)t.mutationResults[n].transformResults.length>0&&(e=e.add(t.batch.mutations[n].key));return e}(e)))).next((()=>n.localDocuments.getDocuments(t,s)))}))}(n.localStore,e);Lh(n,s,null),kh(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await Ph(n,t)}catch(t){await Ti(t)}}async function Nh(t,e,n){const s=Hr(t);try{const t=await function(t,e){const n=Hr(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",(t=>{let s;return n.mutationQueue.lookupMutationBatch(t,e).next((e=>(zr(null!==e),s=e.keys(),n.mutationQueue.removeMutationBatch(t,e)))).next((()=>n.mutationQueue.performConsistencyCheck(t))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(t,s,e))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,s))).next((()=>n.localDocuments.getDocuments(t,s)))}))}(s.localStore,e);Lh(s,e,n),kh(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await Ph(s,t)}catch(t){await Ti(t)}}function kh(t,e){(t.uc.get(e)||[]).forEach((t=>{t.resolve()})),t.uc.delete(e)}function Lh(t,e,n){const s=Hr(t);let r=s.oc[s.currentUser.toKey()];if(r){const t=r.get(e);t&&(n?t.reject(n):t.resolve(),r=r.remove(e)),s.oc[s.currentUser.toKey()]=r}}function Rh(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const s of t.ec.get(e))t.tc.delete(s),n&&t.Zu.lc(s,n);t.ec.delete(e),t.isPrimaryClient&&t.rc.us(e).forEach((e=>{t.rc.containsKey(e)||Oh(t,e)}))}function Oh(t,e){t.nc.delete(e.path.canonicalString());const n=t.sc.get(e);null!==n&&(Ru(t.remoteStore,n),t.sc=t.sc.remove(e),t.ic.delete(n),Vh(t))}function xh(t,e,n){for(const s of n)s instanceof mh?(t.rc.addReference(s.key,e),Mh(t,s)):s instanceof yh?($r("SyncEngine","Document no longer in limbo: "+s.key),t.rc.removeReference(s.key,e),t.rc.containsKey(s.key)||Oh(t,s.key)):Gr()}function Mh(t,e){const n=e.key,s=n.path.canonicalString();t.sc.get(n)||t.nc.has(s)||($r("SyncEngine","New document in limbo: "+n),t.nc.add(s),Vh(t))}function Vh(t){for(;t.nc.size>0&&t.sc.size<t.maxConcurrentLimboResolutions;){const e=t.nc.values().next().value;t.nc.delete(e);const n=new pi(li.fromString(e)),s=t.cc.next();t.ic.set(s,new Eh(n)),t.sc=t.sc.insert(n,s),Lu(t.remoteStore,new Oc(Uo(xo(n.path)),s,2,Si.ot))}}async function Ph(t,e,n){const s=Hr(t),r=[],i=[],o=[];s.tc.isEmpty()||(s.tc.forEach(((t,a)=>{o.push(s.hc(a,e,n).then((t=>{if(t){s.isPrimaryClient&&s.sharedClientState.updateQueryState(a.targetId,t.fromCache?"not-current":"current"),r.push(t);const e=eu.Vi(a.targetId,t);i.push(e)}})))})),await Promise.all(o),s.Zu.Go(r),await async function(t,e){const n=Hr(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(t=>Ii.forEach(e,(e=>Ii.forEach(e.Pi,(s=>n.persistence.referenceDelegate.addReference(t,e.targetId,s))).next((()=>Ii.forEach(e.vi,(s=>n.persistence.referenceDelegate.removeReference(t,e.targetId,s)))))))))}catch(t){if(!Ci(t))throw t;$r("LocalStore","Failed to update sequence numbers: "+t)}for(const t of e){const e=t.targetId;if(!t.fromCache){const t=n.$i.get(e),s=t.snapshotVersion,r=t.withLastLimboFreeSnapshotVersion(s);n.$i=n.$i.insert(e,r)}}}(s.localStore,i))}async function Fh(t,e){const n=Hr(t);if(!n.currentUser.isEqual(e)){$r("SyncEngine","User change. New user:",e.toKey());const t=await iu(n.localStore,e);n.currentUser=e,(s=n).uc.forEach((t=>{t.forEach((t=>{t.reject(new Wr(Qr.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))}))})),s.uc.clear(),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await Ph(n,t.Ki)}var s}function Uh(t,e){const n=Hr(t),s=n.ic.get(e);if(s&&s.Xu)return $a().add(s.key);{let t=$a();const s=n.ec.get(e);if(!s)return t;for(const e of s){const s=n.tc.get(e);t=t.unionWith(s.view.qu)}return t}}function Bh(t){const e=Hr(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Sh.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Uh.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=_h.bind(null,e),e.Zu.Go=dh.bind(null,e.eventManager),e.Zu.lc=fh.bind(null,e.eventManager),e}function $h(t){const e=Hr(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Dh.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Nh.bind(null,e),e}class jh{constructor(){this.synchronizeTabs=!1}async initialize(t){this.wt=bu(t.databaseInfo.databaseId),this.sharedClientState=this.dc(t),this.persistence=this._c(t),await this.persistence.start(),this.localStore=this.wc(t),this.gcScheduler=this.mc(t,this.localStore),this.indexBackfillerScheduler=this.gc(t,this.localStore)}mc(t,e){return null}gc(t,e){return null}wc(t){return ru(this.persistence,new nu,t.initialUser,this.wt)}_c(t){return new Jc(tu.Ms,this.wt)}dc(t){return new pu}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class qh{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>Ah(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=Fh.bind(null,this.syncEngine),await th(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new uh}createDatastore(t){const e=bu(t.databaseInfo.databaseId),n=(s=t.databaseInfo,new wu(s));var s,r,i;return r=t.authCredentials,i=t.appCheckCredentials,new Au(r,i,n,e)}createRemoteStore(t){var e,n,s,r,i;return e=this.localStore,n=this.datastore,s=t.asyncQueue,r=t=>Ah(this.syncEngine,t,0),i=mu.V()?new mu:new gu,new Du(e,n,s,r,i)}createSyncEngine(t,e){return function(t,e,n,s,r,i,o){const a=new bh(t,e,n,s,r,i);return o&&(a.ac=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}terminate(){return async function(t){const e=Hr(t);$r("RemoteStore","RemoteStore shutting down."),e.lu.add(5),await ku(e),e.du.shutdown(),e._u.set("Unknown")}(this.remoteStore)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Kh{constructor(t){this.observer=t,this.muted=!1}next(t){this.observer.next&&this.Ic(this.observer.next,t)}error(t){this.observer.error?this.Ic(this.observer.error,t):console.error("Uncaught Error in snapshot listener:",t)}Tc(){this.muted=!0}Ic(t,e){this.muted||setTimeout((()=>{this.muted||t(e)}),0)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Gh{constructor(t,e,n,s){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=s,this.user=Pr.UNAUTHENTICATED,this.clientId=ii.I(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(n,(async t=>{$r("FirestoreClient","Received user=",t.uid),await this.authCredentialListener(t),this.user=t})),this.appCheckCredentials.start(n,(t=>($r("FirestoreClient","Received new app check token=",t),this.appCheckCredentialListener(t,this.user))))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new Wr(Qr.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Xr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=rh(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function zh(t,e){t.asyncQueue.verifyOperationInProgress(),$r("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let s=n.initialUser;t.setCredentialChangeListener((async t=>{s.isEqual(t)||(await iu(e.localStore,t),s=t)})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t.offlineComponents=e}async function Hh(t,e){t.asyncQueue.verifyOperationInProgress();const n=await Qh(t);$r("FirestoreClient","Initializing OnlineComponentProvider");const s=await t.getConfiguration();await e.initialize(n,s),t.setCredentialChangeListener((t=>Zu(e.remoteStore,t))),t.setAppCheckTokenChangeListener(((t,n)=>Zu(e.remoteStore,n))),t.onlineComponents=e}async function Qh(t){return t.offlineComponents||($r("FirestoreClient","Using default OfflineComponentProvider"),await zh(t,new jh)),t.offlineComponents}async function Wh(t){return t.onlineComponents||($r("FirestoreClient","Using default OnlineComponentProvider"),await Hh(t,new qh)),t.onlineComponents}function Xh(t){return Wh(t).then((t=>t.syncEngine))}async function Yh(t){const e=await Wh(t),n=e.eventManager;return n.onListen=Th.bind(null,e.syncEngine),n.onUnlisten=Ch.bind(null,e.syncEngine),n}function Jh(t,e,n={}){const s=new Xr;return t.asyncQueue.enqueueAndForget((async()=>function(t,e,n,s,r){const i=new Kh({next:i=>{e.enqueueAndForget((()=>lh(t,o)));const a=i.docs.has(n);!a&&i.fromCache?r.reject(new Wr(Qr.UNAVAILABLE,"Failed to get document because the client is offline.")):a&&i.fromCache&&s&&"server"===s.source?r.reject(new Wr(Qr.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):r.resolve(i)},error:t=>r.reject(t)}),o=new gh(xo(n.path),i,{includeMetadataChanges:!0,Du:!0});return hh(t,o)}(await Yh(t),t.asyncQueue,e,n,s))),s.promise}const Zh=new Map;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tl(t,e,n){if(!n)throw new Wr(Qr.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function el(t){if(!pi.isDocumentKey(t))throw new Wr(Qr.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function nl(t){if(pi.isDocumentKey(t))throw new Wr(Qr.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function sl(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const n=(e=t).constructor?e.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var e;return"function"==typeof t?"a function":Gr()}function rl(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Wr(Qr.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=sl(t);throw new Wr(Qr.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class il{constructor(t){var e;if(void 0===t.host){if(void 0!==t.ssl)throw new Wr(Qr.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=null===(e=t.ssl)||void 0===e||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,void 0===t.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new Wr(Qr.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.useFetchStreams=!!t.useFetchStreams,function(t,e,n,s){if(!0===e&&!0===s)throw new Wr(Qr.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling)}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ol{constructor(t,e,n){this._authCredentials=e,this._appCheckCredentials=n,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new il({}),this._settingsFrozen=!1,t instanceof Ki?this._databaseId=t:(this._app=t,this._databaseId=function(t){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new Wr(Qr.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ki(t.options.projectId)}(t))}get app(){if(!this._app)throw new Wr(Qr.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new Wr(Qr.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new il(t),void 0!==t.credentials&&(this._authCredentials=function(t){if(!t)return new Jr;switch(t.type){case"gapi":const e=t.client;return zr(!("object"!=typeof e||null===e||!e.auth||!e.auth.getAuthHeaderValueForFirstParty)),new ei(e,t.sessionIndex||"0",t.iamToken||null);case"provider":return t.client;default:throw new Wr(Qr.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=Zh.get(t);e&&($r("ComponentProvider","Removing Datastore"),Zh.delete(t),e.terminate())}(this),Promise.resolve()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class al{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ul(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new al(this.firestore,t,this._key)}}class cl{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new cl(this.firestore,t,this._query)}}class ul extends cl{constructor(t,e,n){super(t,e,xo(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new al(this.firestore,null,new pi(t))}withConverter(t){return new ul(this.firestore,t,this._path)}}function hl(t,e,...n){if(t=p(t),tl("collection","path",e),t instanceof ol){const s=li.fromString(e,...n);return nl(s),new ul(t,null,s)}{if(!(t instanceof al||t instanceof ul))throw new Wr(Qr.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(li.fromString(e,...n));return nl(s),new ul(t.firestore,null,s)}}function ll(t,e,...n){if(t=p(t),1===arguments.length&&(e=ii.I()),tl("doc","path",e),t instanceof ol){const s=li.fromString(e,...n);return el(s),new al(t,null,new pi(s))}{if(!(t instanceof al||t instanceof ul))throw new Wr(Qr.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(li.fromString(e,...n));return el(s),new al(t.firestore,t instanceof ul?t.converter:null,new pi(s))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class dl{constructor(){this.Oc=Promise.resolve(),this.Mc=[],this.Fc=!1,this.$c=[],this.Bc=null,this.Lc=!1,this.Uc=!1,this.qc=[],this.So=new Tu(this,"async_queue_retry"),this.Kc=()=>{const t=Eu();t&&$r("AsyncQueue","Visibility state changed to "+t.visibilityState),this.So.Eo()};const t=Eu();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.Kc)}get isShuttingDown(){return this.Fc}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Gc(),this.Qc(t)}enterRestrictedMode(t){if(!this.Fc){this.Fc=!0,this.Uc=t||!1;const e=Eu();e&&"function"==typeof e.removeEventListener&&e.removeEventListener("visibilitychange",this.Kc)}}enqueue(t){if(this.Gc(),this.Fc)return new Promise((()=>{}));const e=new Xr;return this.Qc((()=>this.Fc&&this.Uc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Mc.push(t),this.jc())))}async jc(){if(0!==this.Mc.length){try{await this.Mc[0](),this.Mc.shift(),this.So.reset()}catch(t){if(!Ci(t))throw t;$r("AsyncQueue","Operation failed with retryable error: "+t)}this.Mc.length>0&&this.So.Io((()=>this.jc()))}}Qc(t){const e=this.Oc.then((()=>(this.Lc=!0,t().catch((t=>{this.Bc=t,this.Lc=!1;throw jr("INTERNAL UNHANDLED ERROR: ",function(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}(t)),t})).then((t=>(this.Lc=!1,t))))));return this.Oc=e,e}enqueueAfterDelay(t,e,n){this.Gc(),this.qc.indexOf(t)>-1&&(e=0);const s=sh.createAndSchedule(this,t,e,n,(t=>this.Wc(t)));return this.$c.push(s),s}Gc(){this.Bc&&Gr()}verifyOperationInProgress(){}async zc(){let t;do{t=this.Oc,await t}while(t!==this.Oc)}Hc(t){for(const e of this.$c)if(e.timerId===t)return!0;return!1}Jc(t){return this.zc().then((()=>{this.$c.sort(((t,e)=>t.targetTimeMs-e.targetTimeMs));for(const e of this.$c)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.zc()}))}Yc(t){this.qc.push(t)}Wc(t){const e=this.$c.indexOf(t);this.$c.splice(e,1)}}function fl(t){return function(t,e){if("object"!=typeof t||null===t)return!1;const n=t;for(const t of["next","error","complete"])if(t in n&&"function"==typeof n[t])return!0;return!1}(t)}class pl extends ol{constructor(t,e,n){super(t,e,n),this.type="firestore",this._queue=new dl,this._persistenceKey="name"in t?t.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||ml(this),this._firestoreClient.terminate()}}function gl(t){return t._firestoreClient||ml(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function ml(t){var e;const n=t._freezeSettings(),s=(r=t._databaseId,i=(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",o=t._persistenceKey,new qi(r,i,o,(a=n).host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams));var r,i,o,a;t._firestoreClient=new Gh(t._authCredentials,t._appCheckCredentials,t._queue,s)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class yl{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new Wr(Qr.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new fi(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class vl{constructor(t){this._byteString=t}static fromBase64String(t){try{return new vl(Mi.fromBase64String(t))}catch(t){throw new Wr(Qr.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(t){return new vl(Mi.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(t){this._methodName=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new Wr(Qr.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new Wr(Qr.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return oi(this._lat,t._lat)||oi(this._long,t._long)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bl=/^__.*__$/;class Tl{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new wa(t,this.data,this.fieldMask,e,this.fieldTransforms):new va(t,this.data,e,this.fieldTransforms)}}class Il{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new wa(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Cl(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Gr()}}class Sl{constructor(t,e,n,s,r,i){this.settings=t,this.databaseId=e,this.wt=n,this.ignoreUndefinedProperties=s,void 0===r&&this.Xc(),this.fieldTransforms=r||[],this.fieldMask=i||[]}get path(){return this.settings.path}get Zc(){return this.settings.Zc}ta(t){return new Sl(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.wt,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ea(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),s=this.ta({path:n,na:!1});return s.sa(t),s}ia(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),s=this.ta({path:n,na:!1});return s.Xc(),s}ra(t){return this.ta({path:void 0,na:!0})}oa(t){return Bl(t,this.settings.methodName,this.settings.ua||!1,this.path,this.settings.ca)}contains(t){return void 0!==this.fieldMask.find((e=>t.isPrefixOf(e)))||void 0!==this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))}Xc(){if(this.path)for(let t=0;t<this.path.length;t++)this.sa(this.path.get(t))}sa(t){if(0===t.length)throw this.oa("Document fields must not be empty");if(Cl(this.Zc)&&bl.test(t))throw this.oa('Document fields cannot begin and end with "__"')}}class Al{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.wt=n||bu(t)}aa(t,e,n,s=!1){return new Sl({Zc:t,methodName:e,ca:n,path:fi.emptyPath(),na:!1,ua:s},this.databaseId,this.wt,this.ignoreUndefinedProperties)}}function _l(t){const e=t._freezeSettings(),n=bu(t._databaseId);return new Al(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Dl(t,e,n,s,r,i={}){const o=t.aa(i.merge||i.mergeFields?2:0,e,n,r);Vl("Data must be an object, but it was:",o,s);const a=xl(s,o);let c,u;if(i.merge)c=new xi(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const t=[];for(const s of i.mergeFields){const r=Pl(e,s,n);if(!o.contains(r))throw new Wr(Qr.INVALID_ARGUMENT,`Field '${r}' is specified in your field mask but missing from your input data.`);$l(t,r)||t.push(r)}c=new xi(t),u=o.fieldTransforms.filter((t=>c.covers(t.field)))}else c=null,u=o.fieldTransforms;return new Tl(new uo(a),c,u)}class Nl extends wl{_toFieldTransform(t){if(2!==t.Zc)throw 1===t.Zc?t.oa(`${this._methodName}() can only appear at the top level of your update data`):t.oa(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Nl}}class kl extends wl{_toFieldTransform(t){return new ca(t.path,new ta)}isEqual(t){return t instanceof kl}}function Ll(t,e,n,s){const r=t.aa(1,e,n);Vl("Data must be an object, but it was:",r,s);const i=[],o=uo.empty();_i(s,((t,s)=>{const a=Ul(e,t,n);s=p(s);const c=r.ia(a);if(s instanceof Nl)i.push(a);else{const t=Ol(s,c);null!=t&&(i.push(a),o.set(a,t))}}));const a=new xi(i);return new Il(o,a,r.fieldTransforms)}function Rl(t,e,n,s,r,i){const o=t.aa(1,e,n),a=[Pl(e,s,n)],c=[r];if(i.length%2!=0)throw new Wr(Qr.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let t=0;t<i.length;t+=2)a.push(Pl(e,i[t])),c.push(i[t+1]);const u=[],h=uo.empty();for(let t=a.length-1;t>=0;--t)if(!$l(u,a[t])){const e=a[t];let n=c[t];n=p(n);const s=o.ia(e);if(n instanceof Nl)u.push(e);else{const t=Ol(n,s);null!=t&&(u.push(e),h.set(e,t))}}const l=new xi(u);return new Il(h,l,o.fieldTransforms)}function Ol(t,e){if(Ml(t=p(t)))return Vl("Unsupported field value:",e,t),xl(t,e);if(t instanceof wl)return function(t,e){if(!Cl(e.Zc))throw e.oa(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.oa(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.na&&4!==e.Zc)throw e.oa("Nested arrays are not supported");return function(t,e){const n=[];let s=0;for(const r of t){let t=Ol(r,e.ra(s));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),s++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=p(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return Xo(e.wt,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=ci.fromDate(t);return{timestampValue:nc(e.wt,n)}}if(t instanceof ci){const n=new ci(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:nc(e.wt,n)}}if(t instanceof El)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof vl)return{bytesValue:sc(e.wt,t._byteString)};if(t instanceof al){const n=e.databaseId,s=t.firestore._databaseId;if(!s.isEqual(n))throw e.oa(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:oc(t.firestore._databaseId||e.databaseId,t._key.path)}}throw e.oa(`Unsupported field value: ${sl(t)}`)}(t,e)}function xl(t,e){const n={};return Di(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):_i(t,((t,s)=>{const r=Ol(s,e.ea(t));null!=r&&(n[t]=r)})),{mapValue:{fields:n}}}function Ml(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof ci||t instanceof El||t instanceof vl||t instanceof al||t instanceof wl)}function Vl(t,e,n){if(!Ml(n)||("object"!=typeof(s=n)||null===s||Object.getPrototypeOf(s)!==Object.prototype&&null!==Object.getPrototypeOf(s))){const s=sl(n);throw"an object"===s?e.oa(t+" a custom object"):e.oa(t+" "+s)}var s}function Pl(t,e,n){if((e=p(e))instanceof yl)return e._internalPath;if("string"==typeof e)return Ul(t,e);throw Bl("Field path arguments must be of type string or ",t,!1,void 0,n)}const Fl=new RegExp("[~\\*/\\[\\]]");function Ul(t,e,n){if(e.search(Fl)>=0)throw Bl(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new yl(...e.split("."))._internalPath}catch(s){throw Bl(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Bl(t,e,n,s,r){const i=s&&!s.isEmpty(),o=void 0!==r;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${s}`),o&&(c+=` in document ${r}`),c+=")"),new Wr(Qr.INVALID_ARGUMENT,a+t+c)}function $l(t,e){return t.some((t=>t.isEqual(e)))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jl{constructor(t,e,n,s,r){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new al(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new ql(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Kl("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class ql extends jl{data(){return super.data()}}function Kl(t,e){return"string"==typeof e?Ul(t,e):e instanceof yl?e._internalPath:e._delegate._internalPath}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class zl extends jl{constructor(t,e,n,s,r,i){super(t,e,n,s,i),this._firestore=t,this._firestoreImpl=t,this.metadata=r}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Hl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Kl("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class Hl extends zl{data(t={}){return super.data(t)}}class Ql{constructor(t,e,n,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Gl(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(t,e){this._snapshot.docs.forEach((n=>{t.call(e,new Hl(this._firestore,this._userDataWriter,n.key,n,new Gl(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new Wr(Qr.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(t,e){if(t._snapshot.oldDocs.isEmpty()){let e=0;return t._snapshot.docChanges.map((n=>({type:"added",doc:new Hl(t._firestore,t._userDataWriter,n.doc.key,n.doc,new Gl(t._snapshot.mutatedKeys.has(n.doc.key),t._snapshot.fromCache),t.query.converter),oldIndex:-1,newIndex:e++})))}{let n=t._snapshot.oldDocs;return t._snapshot.docChanges.filter((t=>e||3!==t.type)).map((e=>{const s=new Hl(t._firestore,t._userDataWriter,e.doc.key,e.doc,new Gl(t._snapshot.mutatedKeys.has(e.doc.key),t._snapshot.fromCache),t.query.converter);let r=-1,i=-1;return 0!==e.type&&(r=n.indexOf(e.doc.key),n=n.delete(e.doc.key)),1!==e.type&&(n=n.add(e.doc),i=n.indexOf(e.doc.key)),{type:Wl(e.type),doc:s,oldIndex:r,newIndex:i}}))}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function Wl(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Gr()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Xl(t){if("L"===t.limitType&&0===t.explicitOrderBy.length)throw new Wr(Qr.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Yl{convertValue(t,e="none"){switch(Wi(t)){case 0:return null;case 1:return t.booleanValue;case 2:return Fi(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Ui(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 10:return this.convertObject(t.mapValue,e);default:throw Gr()}}convertObject(t,e){const n={};return _i(t.fields,((t,s)=>{n[t]=this.convertValue(s,e)})),n}convertGeoPoint(t){return new El(Fi(t.latitude),Fi(t.longitude))}convertArray(t,e){return(t.values||[]).map((t=>this.convertValue(t,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=$i(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(ji(t));default:return null}}convertTimestamp(t){const e=Pi(t);return new ci(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=li.fromString(t);zr(Ac(n));const s=new Ki(n.get(1),n.get(3)),r=new pi(n.popFirst(5));return s.isEqual(e)||jr(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),r}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jl(t,e,n){let s;return s=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,s}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Zl(t){t=rl(t,al);const e=rl(t.firestore,pl);return Jh(gl(e),t._key).then((n=>id(e,t,n)))}class td extends Yl{constructor(t){super(),this.firestore=t}convertBytes(t){return new vl(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new al(this.firestore,null,e)}}function ed(t,e,n,...s){t=rl(t,al);const r=rl(t.firestore,pl),i=_l(r);let o;return o="string"==typeof(e=p(e))||e instanceof yl?Rl(i,"updateDoc",t._key,e,n,s):Ll(i,"updateDoc",t._key,e),rd(r,[o.toMutation(t._key,ha.exists(!0))])}function nd(t,e){const n=rl(t.firestore,pl),s=ll(t),r=Jl(t.converter,e);return rd(n,[Dl(_l(t.firestore),"addDoc",s._key,r,null!==t.converter,{}).toMutation(s._key,ha.exists(!1))]).then((()=>s))}function sd(t,...e){var n,s,r;t=p(t);let i={includeMetadataChanges:!1},o=0;"object"!=typeof e[o]||fl(e[o])||(i=e[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(fl(e[o])){const t=e[o];e[o]=null===(n=t.next)||void 0===n?void 0:n.bind(t),e[o+1]=null===(s=t.error)||void 0===s?void 0:s.bind(t),e[o+2]=null===(r=t.complete)||void 0===r?void 0:r.bind(t)}let c,u,h;if(t instanceof al)u=rl(t.firestore,pl),h=xo(t._key.path),c={next:n=>{e[o]&&e[o](id(u,t,n))},error:e[o+1],complete:e[o+2]};else{const n=rl(t,cl);u=rl(n.firestore,pl),h=n._query;const s=new td(u);c={next:t=>{e[o]&&e[o](new Ql(u,s,n,t))},error:e[o+1],complete:e[o+2]},Xl(t._query)}return function(t,e,n,s){const r=new Kh(s),i=new gh(e,r,n);return t.asyncQueue.enqueueAndForget((async()=>hh(await Yh(t),i))),()=>{r.Tc(),t.asyncQueue.enqueueAndForget((async()=>lh(await Yh(t),i)))}}(gl(u),h,a,c)}function rd(t,e){return function(t,e){const n=new Xr;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){const s=$h(t);try{const t=await function(t,e){const n=Hr(t),s=ci.now(),r=e.reduce(((t,e)=>t.add(e.key)),$a());let i,o;return n.persistence.runTransaction("Locally write mutations","readwrite",(t=>{let a=Ra(),c=$a();return n.Ui.getEntries(t,r).next((t=>{a=t,a.forEach(((t,e)=>{e.isValidDocument()||(c=c.add(t))}))})).next((()=>n.localDocuments.getOverlayedDocuments(t,a))).next((r=>{i=r;const o=[];for(const t of e){const e=ma(t,i.get(t.key).overlayedDocument);null!=e&&o.push(new wa(t.key,e,ho(e.value.mapValue),ha.exists(!0)))}return n.mutationQueue.addMutationBatch(t,s,o,e)})).next((e=>{o=e;const s=e.applyToLocalDocumentSet(i,c);return n.documentOverlayCache.saveOverlays(t,e.batchId,s)}))})).then((()=>({batchId:o.batchId,changes:Ma(i)})))}(s.localStore,e);s.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let s=t.oc[t.currentUser.toKey()];s||(s=new Ni(oi)),s=s.insert(e,n),t.oc[t.currentUser.toKey()]=s}(s,t.batchId,n),await Ph(s,t.changes),await Ku(s.remoteStore)}catch(t){const e=rh(t,"Failed to persist write");n.reject(e)}}(await Xh(t),e,n))),n.promise}(gl(t),e)}function id(t,e,n){const s=n.docs.get(e._key),r=new td(t);return new zl(t,r,e._key,s,new Gl(n.hasPendingWrites,n.fromCache),e.converter)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function od(){return new kl("serverTimestamp")}!function(t,e=!0){Fr="9.9.0",X(new g("firestore",((t,{options:n})=>{const s=t.getProvider("app").getImmediate(),r=new pl(s,new Zr(t.getProvider("auth-internal")),new si(t.getProvider("app-check-internal")));return n=Object.assign({useFetchStreams:e},n),r._setSettings(n),r}),"PUBLIC")),et("@firebase/firestore","3.4.12",t),et("@firebase/firestore","3.4.12","esm2017")}();const ad=function(t=tt()){return Y(t,"firestore").getImmediate()}(function(t,e={}){if("object"!=typeof e){e={name:e}}const n=Object.assign({name:"[DEFAULT]",automaticDataCollectionEnabled:!1},e),s=n.name;if("string"!=typeof s||!s)throw J.create("bad-app-name",{appName:String(s)});const r=H.get(s);if(r){if(d(t,r.options)&&d(n,r.config))return r;throw J.create("duplicate-app",{appName:s})}const i=new y(s);for(const t of Q.values())i.addComponent(t);const o=new Z(t,n,i);return H.set(s,o),o}({apiKey:"AIzaSyCNuiHb0Pp-ccdqrkUrpICvFAM6SiJLBqY",authDomain:"re-app0.firebaseapp.com",projectId:"re-app0",storageBucket:"re-app0.appspot.com",messagingSenderId:"683468001343",appId:"1:683468001343:web:5aabcd6a486ec426cc288a"}));function cd(t){$("#errorPillText").html(t),$("#errorPill").removeClass("hidden"),$("#errorPill").addClass("flex"),$("#errorPill").removeClass("animationOut"),$("#errorPill").addClass("animationIn"),window.clearInterval(timeoutError),timeoutError=window.setTimeout((()=>{$("#errorPill").removeClass("animationIn"),$("#errorPill").addClass("animationOut")}),4e3)}async function ud(t){let e=t;if(e=e.trim(),e.startsWith("http")||e.startsWith("https")||e.includes(":")||(e="https://"+e),e.endsWith("/")||(e+="/"),!e.includes("."))return void cd("Invalid URL.");if(e.length>999)return void cd("Invalid URL.");$("#urlInput").val(""),$("#urlInput").attr("placeholder","Shortening...");const n=await nd(hl(ad,"shortenedLinks"),{url:e,numUsed:0,lastUsed:od(),createdAt:od()});try{await navigator.clipboard.writeText(`https://r0h.in/re?u=${n.id}`),$("#successPill").removeClass("hidden"),$("#successPill").addClass("flex"),$("#successPill").removeClass("animationOut"),$("#successPill").addClass("animationIn"),window.clearInterval(timeout),timeout=window.setTimeout((()=>{$("#successPill").removeClass("animationIn"),$("#successPill").addClass("animationOut")}),4e3)}catch(t){$("#urlInput").attr("placeholder","Paste a URL"),alert(`Failed to copy to clipboard. Your URL is: https://r0h.in/re?u=${n.id}.`)}$("#urlInput").attr("placeholder","Paste a URL")}!async function(){const t=new URLSearchParams(window.location.search).get("u");if(t){const e=await Zl(ll(ad,`shortenedLinks/${t}`));if(e.exists)return await ed(ll(ad,`shortenedLinks/${t}`),{numUsed:e.data().numUsed+1,lastUsed:od()}),void window.location.replace(e.data().url)}$("#body").removeClass("hidden"),$("#body").addClass("flex")}(),$("#urlInput").get(0).focus(),window.timeout=null,window.timeoutError=null,window.snapshot=null,$("#generateButton").get(0).onclick=()=>{ud($("#urlInput").val())},$("#viewAnalyticsButton").get(0).onclick=()=>{!async function(t){let e=t;if(e=e.trim(),e=e.split("r0h.in/re?u=")[1],!e)return void cd("Invalid URL.");$("#urlInput").val(""),$("#urlInput").attr("placeholder","Gathering analytics..."),snapshot=sd(ll(ad,`shortenedLinks/${e}`),(t=>{$("#urlInput").attr("placeholder","Paste a URL"),t.exists()?($("#stats").removeClass("hidden"),$("#generate").addClass("hidden"),$("#totalUses").html(t.data().numUsed),$("#lastUsed").html(t.data().lastUsed.toDate().toLocaleString("default",{month:"short",day:"numeric"})),$("#dateCreated").html(t.data().createdAt.toDate().toLocaleString("default",{month:"short",day:"numeric"})),$("#targetURL").html(t.data().url),$("#targetURL").get(0).href=t.data().url):cd("URL register not found.")}))}($("#urlInput").val())},$("#backButton").get(0).onclick=()=>{$("#stats").addClass("hidden"),$("#generate").removeClass("hidden"),snapshot()},window.onload=function(){$("#urlInput").get(0).focus(),$("#urlInput").get(0).addEventListener("keyup",(function(t){13===t.keyCode&&(t.preventDefault(),ud($("#urlInput").val()))}))};
//# sourceMappingURL=index.17a681b5.js.map
