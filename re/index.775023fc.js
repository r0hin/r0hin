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
 */const e=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=63&i|128):55296==(64512&i)&&s+1<t.length&&56320==(64512&t.charCodeAt(s+1))?(i=65536+((1023&i)<<10)+(1023&t.charCodeAt(++s)),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=63&i|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=63&i|128)}return e};
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
class n{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),"function"==typeof t&&(this.promise.catch((()=>{})),1===t.length?t(e):t(e,n))}}}
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
function s(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}class i extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,i.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,r.prototype.create)}}class r{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},s=`${this.service}/${t}`,r=this.errors[t],a=r?function(t,e){return t.replace(o,((t,n)=>{const s=e[n];return null!=s?String(s):`<${n}?>`}))}(r,n):"Error",h=`${this.serviceName}: ${a} (${s}).`;return new i(s,h,n)}}const o=/\{\$([^}]+)}/g;
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
 */function a(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const i of n){if(!s.includes(i))return!1;const n=t[i],r=e[i];if(h(n)&&h(r)){if(!a(n,r))return!1}else if(n!==r)return!1}for(const t of s)if(!n.includes(t))return!1;return!0}function h(t){return null!==t&&"object"==typeof t}
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
function c(t){return t&&t._delegate?t._delegate:t}class u{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}
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
class l{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const t=new n;if(this.instancesDeferred.set(e,t),this.isInitialized(e)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:e});n&&t.resolve(n)}catch(t){}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(null==t?void 0:t.identifier),s=null!==(e=null==t?void 0:t.optional)&&void 0!==e&&e;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(s)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(t){if(s)return null;throw t}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,this.shouldAutoInitialize()){if("EAGER"===t.instantiationMode)try{this.getOrInitializeService({instanceIdentifier:"[DEFAULT]"})}catch(t){}for(const[t,e]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(t);try{const t=this.getOrInitializeService({instanceIdentifier:n});e.resolve(t)}catch(t){}}}}clearInstance(t="[DEFAULT]"){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter((t=>"INTERNAL"in t)).map((t=>t.INTERNAL.delete())),...t.filter((t=>"_delete"in t)).map((t=>t._delete()))])}isComponentSet(){return null!=this.component}isInitialized(t="[DEFAULT]"){return this.instances.has(t)}getOptions(t="[DEFAULT]"){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[t,e]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(t)&&e.resolve(s)}return s}onInit(t,e){var n;const s=this.normalizeInstanceIdentifier(e),i=null!==(n=this.onInitCallbacks.get(s))&&void 0!==n?n:new Set;i.add(t),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&t(r,s),()=>{i.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const s of n)try{s(t,e)}catch(t){}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(s=t,"[DEFAULT]"===s?void 0:s),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch(t){}var s;return n||null}normalizeInstanceIdentifier(t="[DEFAULT]"){return this.component?this.component.multipleInstances?t:"[DEFAULT]":t}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}
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
class d{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new l(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}
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
 */const f=[];var p,g;(g=p||(p={}))[g.DEBUG=0]="DEBUG",g[g.VERBOSE=1]="VERBOSE",g[g.INFO=2]="INFO",g[g.WARN=3]="WARN",g[g.ERROR=4]="ERROR",g[g.SILENT=5]="SILENT";const m={debug:p.DEBUG,verbose:p.VERBOSE,info:p.INFO,warn:p.WARN,error:p.ERROR,silent:p.SILENT},y=p.INFO,v={[p.DEBUG]:"log",[p.VERBOSE]:"log",[p.INFO]:"info",[p.WARN]:"warn",[p.ERROR]:"error"},w=(t,e,...n)=>{if(e<t.logLevel)return;const s=(new Date).toISOString(),i=v[e];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);console[i](`[${s}]  ${t.name}:`,...n)};class E{constructor(t){this.name=t,this._logLevel=y,this._logHandler=w,this._userLogHandler=null,f.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in p))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel="string"==typeof t?m[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,p.DEBUG,...t),this._logHandler(this,p.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,p.VERBOSE,...t),this._logHandler(this,p.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,p.INFO,...t),this._logHandler(this,p.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,p.WARN,...t),this._logHandler(this,p.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,p.ERROR,...t),this._logHandler(this,p.ERROR,...t)}}
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
class T{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map((t=>{if(function(t){const e=t.getComponent();return"VERSION"===(null==e?void 0:e.type)}(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}return null})).filter((t=>t)).join(" ")}}const b=new E("@firebase/app"),I={"@firebase/app":"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},A=new Map,S=new Map;function C(t,e){try{t.container.addComponent(e)}catch(n){b.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function k(t){const e=t.name;if(S.has(e))return b.debug(`There were multiple attempts to register component ${e}.`),!1;S.set(e,t);for(const e of A.values())C(e,t);return!0}function N(t,e){return t.container.getProvider(e)}
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
const D=new r("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function."});
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
class _{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new u("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw D.create("app-deleted",{appName:this._name})}}
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
 */function R(t,e,n){var s;let i=null!==(s=I[t])&&void 0!==s?s:t;n&&(i+=`-${n}`);const r=i.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const t=[`Unable to register library "${i}" with version "${e}":`];return r&&t.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&o&&t.push("and"),o&&t.push(`version name "${e}" contains illegal characters (whitespace or "/")`),void b.warn(t.join(" "))}k(new u(`${i}-version`,(()=>({library:i,version:e})),"VERSION"))}
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
var L;L="",k(new u("platform-logger",(t=>new T(t)),"PRIVATE")),R("@firebase/app","0.7.11",L),R("@firebase/app","0.7.11","esm2017"),R("fire-js","");
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
R("firebase","9.6.1","app");var O,x="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==t?t:"undefined"!=typeof self?self:{},M={},P=P||{},U=x||self;function F(){}function V(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function q(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}var B="closure_uid_"+(1e9*Math.random()>>>0),j=0;function K(t,e,n){return t.call.apply(t.bind,arguments)}function H(t,e,n){if(!t)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,s),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function G(t,e,n){return(G=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?K:H).apply(null,arguments)}function z(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function W(t,e){function n(){}n.prototype=e.prototype,t.Z=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Vb=function(t,n,s){for(var i=Array(arguments.length-2),r=2;r<arguments.length;r++)i[r-2]=arguments[r];return e.prototype[n].apply(t,i)}}function Q(){this.s=this.s,this.o=this.o}var X={};Q.prototype.s=!1,Q.prototype.na=function(){if(!this.s&&(this.s=!0,this.M(),0)){var t=function(t){return Object.prototype.hasOwnProperty.call(t,B)&&t[B]||(t[B]=++j)}(this);delete X[t]}},Q.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const Y=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if("string"==typeof t)return"string"!=typeof e||1!=e.length?-1:t.indexOf(e,0);for(let n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1},J=Array.prototype.forEach?function(t,e,n){Array.prototype.forEach.call(t,e,n)}:function(t,e,n){const s=t.length,i="string"==typeof t?t.split(""):t;for(let r=0;r<s;r++)r in i&&e.call(n,i[r],r,t)};function Z(t){return Array.prototype.concat.apply([],arguments)}function tt(t){const e=t.length;if(0<e){const n=Array(e);for(let s=0;s<e;s++)n[s]=t[s];return n}return[]}function et(t){return/^[\s\xa0]*$/.test(t)}var nt,st=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function it(t,e){return-1!=t.indexOf(e)}function rt(t,e){return t<e?-1:t>e?1:0}t:{var ot=U.navigator;if(ot){var at=ot.userAgent;if(at){nt=at;break t}}nt=""}function ht(t,e,n){for(const s in t)e.call(n,t[s],s,t)}function ct(t){const e={};for(const n in t)e[n]=t[n];return e}var ut="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function lt(t,e){let n,s;for(let e=1;e<arguments.length;e++){for(n in s=arguments[e],s)t[n]=s[n];for(let e=0;e<ut.length;e++)n=ut[e],Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}}function dt(t){return dt[" "](t),t}dt[" "]=F;var ft,pt,gt=it(nt,"Opera"),mt=it(nt,"Trident")||it(nt,"MSIE"),yt=it(nt,"Edge"),vt=yt||mt,wt=it(nt,"Gecko")&&!(it(nt.toLowerCase(),"webkit")&&!it(nt,"Edge"))&&!(it(nt,"Trident")||it(nt,"MSIE"))&&!it(nt,"Edge"),Et=it(nt.toLowerCase(),"webkit")&&!it(nt,"Edge");function Tt(){var t=U.document;return t?t.documentMode:void 0}t:{var bt="",It=(pt=nt,wt?/rv:([^\);]+)(\)|;)/.exec(pt):yt?/Edge\/([\d\.]+)/.exec(pt):mt?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(pt):Et?/WebKit\/(\S+)/.exec(pt):gt?/(?:Version)[ \/]?(\S+)/.exec(pt):void 0);if(It&&(bt=It?It[1]:""),mt){var At=Tt();if(null!=At&&At>parseFloat(bt)){ft=String(At);break t}}ft=bt}var St,Ct={};function kt(){return function(t){var e=Ct;return Object.prototype.hasOwnProperty.call(e,9)?e[9]:e[9]=t(9)}((function(){let t=0;const e=st(String(ft)).split("."),n=st("9").split("."),s=Math.max(e.length,n.length);for(let o=0;0==t&&o<s;o++){var i=e[o]||"",r=n[o]||"";do{if(i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],r=/(\d*)(\D*)(.*)/.exec(r)||["","","",""],0==i[0].length&&0==r[0].length)break;t=rt(0==i[1].length?0:parseInt(i[1],10),0==r[1].length?0:parseInt(r[1],10))||rt(0==i[2].length,0==r[2].length)||rt(i[2],r[2]),i=i[3],r=r[3]}while(0==t)}return 0<=t}))}if(U.document&&mt){var Nt=Tt();St=Nt||(parseInt(ft,10)||void 0)}else St=void 0;var Dt=St,_t=function(){if(!U.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{U.addEventListener("test",F,e),U.removeEventListener("test",F,e)}catch(t){}return t}();function Rt(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}function Lt(t,e){if(Rt.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,s=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(wt){t:{try{dt(e.nodeName);var i=!0;break t}catch(t){}i=!1}i||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,s?(this.clientX=void 0!==s.clientX?s.clientX:s.pageX,this.clientY=void 0!==s.clientY?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:Ot[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&Lt.Z.h.call(this)}}Rt.prototype.h=function(){this.defaultPrevented=!0},W(Lt,Rt);var Ot={2:"touch",3:"pen",4:"mouse"};Lt.prototype.h=function(){Lt.Z.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var xt="closure_listenable_"+(1e6*Math.random()|0),Mt=0;function Pt(t,e,n,s,i){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!s,this.ia=i,this.key=++Mt,this.ca=this.fa=!1}function Ut(t){t.ca=!0,t.listener=null,t.proxy=null,t.src=null,t.ia=null}function Ft(t){this.src=t,this.g={},this.h=0}function Vt(t,e){var n=e.type;if(n in t.g){var s,i=t.g[n],r=Y(i,e);(s=0<=r)&&Array.prototype.splice.call(i,r,1),s&&(Ut(e),0==t.g[n].length&&(delete t.g[n],t.h--))}}function qt(t,e,n,s){for(var i=0;i<t.length;++i){var r=t[i];if(!r.ca&&r.listener==e&&r.capture==!!n&&r.ia==s)return i}return-1}Ft.prototype.add=function(t,e,n,s,i){var r=t.toString();(t=this.g[r])||(t=this.g[r]=[],this.h++);var o=qt(t,e,s,i);return-1<o?(e=t[o],n||(e.fa=!1)):((e=new Pt(e,this.src,r,!!s,i)).fa=n,t.push(e)),e};var Bt="closure_lm_"+(1e6*Math.random()|0),jt={};function $t(t,e,n,s,i){if(s&&s.once)return Ht(t,e,n,s,i);if(Array.isArray(e)){for(var r=0;r<e.length;r++)$t(t,e[r],n,s,i);return null}return n=Jt(n),t&&t[xt]?t.N(e,n,q(s)?!!s.capture:!!s,i):Kt(t,e,n,!1,s,i)}function Kt(t,e,n,s,i,r){if(!e)throw Error("Invalid event type");var o=q(i)?!!i.capture:!!i,a=Xt(t);if(a||(t[Bt]=a=new Ft(t)),(n=a.add(e,n,s,o,r)).proxy)return n;if(s=function(){function t(n){return e.call(t.src,t.listener,n)}var e=Qt;return t}(),n.proxy=s,s.src=t,s.listener=n,t.addEventListener)_t||(i=o),void 0===i&&(i=!1),t.addEventListener(e.toString(),s,i);else if(t.attachEvent)t.attachEvent(Wt(e.toString()),s);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(s)}return n}function Ht(t,e,n,s,i){if(Array.isArray(e)){for(var r=0;r<e.length;r++)Ht(t,e[r],n,s,i);return null}return n=Jt(n),t&&t[xt]?t.O(e,n,q(s)?!!s.capture:!!s,i):Kt(t,e,n,!0,s,i)}function Gt(t,e,n,s,i){if(Array.isArray(e))for(var r=0;r<e.length;r++)Gt(t,e[r],n,s,i);else s=q(s)?!!s.capture:!!s,n=Jt(n),t&&t[xt]?(t=t.i,(e=String(e).toString())in t.g&&(-1<(n=qt(r=t.g[e],n,s,i))&&(Ut(r[n]),Array.prototype.splice.call(r,n,1),0==r.length&&(delete t.g[e],t.h--)))):t&&(t=Xt(t))&&(e=t.g[e.toString()],t=-1,e&&(t=qt(e,n,s,i)),(n=-1<t?e[t]:null)&&zt(n))}function zt(t){if("number"!=typeof t&&t&&!t.ca){var e=t.src;if(e&&e[xt])Vt(e.i,t);else{var n=t.type,s=t.proxy;e.removeEventListener?e.removeEventListener(n,s,t.capture):e.detachEvent?e.detachEvent(Wt(n),s):e.addListener&&e.removeListener&&e.removeListener(s),(n=Xt(e))?(Vt(n,t),0==n.h&&(n.src=null,e[Bt]=null)):Ut(t)}}}function Wt(t){return t in jt?jt[t]:jt[t]="on"+t}function Qt(t,e){if(t.ca)t=!0;else{e=new Lt(e,this);var n=t.listener,s=t.ia||t.src;t.fa&&zt(t),t=n.call(s,e)}return t}function Xt(t){return(t=t[Bt])instanceof Ft?t:null}var Yt="__closure_events_fn_"+(1e9*Math.random()>>>0);function Jt(t){return"function"==typeof t?t:(t[Yt]||(t[Yt]=function(e){return t.handleEvent(e)}),t[Yt])}function Zt(){Q.call(this),this.i=new Ft(this),this.P=this,this.I=null}function te(t,e){var n,s=t.I;if(s)for(n=[];s;s=s.I)n.push(s);if(t=t.P,s=e.type||e,"string"==typeof e)e=new Rt(e,t);else if(e instanceof Rt)e.target=e.target||t;else{var i=e;lt(e=new Rt(s,t),i)}if(i=!0,n)for(var r=n.length-1;0<=r;r--){var o=e.g=n[r];i=ee(o,s,!0,e)&&i}if(i=ee(o=e.g=t,s,!0,e)&&i,i=ee(o,s,!1,e)&&i,n)for(r=0;r<n.length;r++)i=ee(o=e.g=n[r],s,!1,e)&&i}function ee(t,e,n,s){if(!(e=t.i.g[String(e)]))return!0;e=e.concat();for(var i=!0,r=0;r<e.length;++r){var o=e[r];if(o&&!o.ca&&o.capture==n){var a=o.listener,h=o.ia||o.src;o.fa&&Vt(t.i,o),i=!1!==a.call(h,s)&&i}}return i&&!s.defaultPrevented}W(Zt,Q),Zt.prototype[xt]=!0,Zt.prototype.removeEventListener=function(t,e,n,s){Gt(this,t,e,n,s)},Zt.prototype.M=function(){if(Zt.Z.M.call(this),this.i){var t,e=this.i;for(t in e.g){for(var n=e.g[t],s=0;s<n.length;s++)Ut(n[s]);delete e.g[t],e.h--}}this.I=null},Zt.prototype.N=function(t,e,n,s){return this.i.add(String(t),e,!1,n,s)},Zt.prototype.O=function(t,e,n,s){return this.i.add(String(t),e,!0,n,s)};var ne=U.JSON.stringify;function se(){var t=ue;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}var ie,re=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}((()=>new oe),(t=>t.reset()));class oe{constructor(){this.next=this.g=this.h=null}set(t,e){this.h=t,this.g=e,this.next=null}reset(){this.next=this.g=this.h=null}}function ae(t){U.setTimeout((()=>{throw t}),0)}function he(t,e){ie||function(){var t=U.Promise.resolve(void 0);ie=function(){t.then(le)}}(),ce||(ie(),ce=!0),ue.add(t,e)}var ce=!1,ue=new class{constructor(){this.h=this.g=null}add(t,e){const n=re.get();n.set(t,e),this.h?this.h.next=n:this.g=n,this.h=n}};function le(){for(var t;t=se();){try{t.h.call(t.g)}catch(t){ae(t)}var e=re;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}ce=!1}function de(t,e){Zt.call(this),this.h=t||1,this.g=e||U,this.j=G(this.kb,this),this.l=Date.now()}function fe(t){t.da=!1,t.S&&(t.g.clearTimeout(t.S),t.S=null)}function pe(t,e,n){if("function"==typeof t)n&&(t=G(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=G(t.handleEvent,t)}return 2147483647<Number(e)?-1:U.setTimeout(t,e||0)}function ge(t){t.g=pe((()=>{t.g=null,t.i&&(t.i=!1,ge(t))}),t.j);const e=t.h;t.h=null,t.m.apply(null,e)}W(de,Zt),(O=de.prototype).da=!1,O.S=null,O.kb=function(){if(this.da){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.S=this.g.setTimeout(this.j,this.h-t):(this.S&&(this.g.clearTimeout(this.S),this.S=null),te(this,"tick"),this.da&&(fe(this),this.start()))}},O.start=function(){this.da=!0,this.S||(this.S=this.g.setTimeout(this.j,this.h),this.l=Date.now())},O.M=function(){de.Z.M.call(this),fe(this),delete this.g};class me extends Q{constructor(t,e){super(),this.m=t,this.j=e,this.h=null,this.i=!1,this.g=null}l(t){this.h=arguments,this.g?this.i=!0:ge(this)}M(){super.M(),this.g&&(U.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ye(t){Q.call(this),this.h=t,this.g={}}W(ye,Q);var ve=[];function we(t,e,n,s){Array.isArray(n)||(n&&(ve[0]=n.toString()),n=ve);for(var i=0;i<n.length;i++){var r=$t(e,n[i],s||t.handleEvent,!1,t.h||t);if(!r)break;t.g[r.key]=r}}function Ee(t){ht(t.g,(function(t,e){this.g.hasOwnProperty(e)&&zt(t)}),t),t.g={}}function Te(){this.g=!0}function be(t,e,n,s){t.info((function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var s=n[t];if(!(2>s.length)){var i=s[1];if(Array.isArray(i)&&!(1>i.length)){var r=i[0];if("noop"!=r&&"stop"!=r&&"close"!=r)for(var o=1;o<i.length;o++)i[o]=""}}}return ne(n)}catch(t){return e}}(t,n)+(s?" "+s:"")}))}ye.prototype.M=function(){ye.Z.M.call(this),Ee(this)},ye.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},Te.prototype.Aa=function(){this.g=!1},Te.prototype.info=function(){};var Ie={},Ae=null;function Se(){return Ae=Ae||new Zt}function Ce(t){Rt.call(this,Ie.Ma,t)}function ke(t){const e=Se();te(e,new Ce(e,t))}function Ne(t,e){Rt.call(this,Ie.STAT_EVENT,t),this.stat=e}function De(t){const e=Se();te(e,new Ne(e,t))}function _e(t,e){Rt.call(this,Ie.Na,t),this.size=e}function Re(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return U.setTimeout((function(){t()}),e)}Ie.Ma="serverreachability",W(Ce,Rt),Ie.STAT_EVENT="statevent",W(Ne,Rt),Ie.Na="timingevent",W(_e,Rt);var Le={NO_ERROR:0,lb:1,yb:2,xb:3,sb:4,wb:5,zb:6,Ja:7,TIMEOUT:8,Cb:9},Oe={qb:"complete",Mb:"success",Ka:"error",Ja:"abort",Eb:"ready",Fb:"readystatechange",TIMEOUT:"timeout",Ab:"incrementaldata",Db:"progress",tb:"downloadprogress",Ub:"uploadprogress"};function xe(){}function Me(t){return t.h||(t.h=t.i())}function Pe(){}xe.prototype.h=null;var Ue,Fe={OPEN:"a",pb:"b",Ka:"c",Bb:"d"};function Ve(){Rt.call(this,"d")}function qe(){Rt.call(this,"c")}function Be(){}function je(t,e,n,s){this.l=t,this.j=e,this.m=n,this.X=s||1,this.V=new ye(this),this.P=Ke,t=vt?125:void 0,this.W=new de(t),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.Y=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.N=-1,this.I=!1,this.O=0,this.L=null,this.aa=this.J=this.$=this.U=!1,this.h=new $e}function $e(){this.i=null,this.g="",this.h=!1}W(Ve,Rt),W(qe,Rt),W(Be,xe),Be.prototype.g=function(){return new XMLHttpRequest},Be.prototype.i=function(){return{}},Ue=new Be;var Ke=45e3,He={},Ge={};function ze(t,e,n){t.K=1,t.v=yn(ln(e)),t.s=n,t.U=!0,We(t,null)}function We(t,e){t.F=Date.now(),Je(t),t.A=ln(t.v);var n=t.A,s=t.X;Array.isArray(s)||(s=[String(s)]),_n(n.h,"t",s),t.C=0,n=t.l.H,t.h=new $e,t.g=_s(t.l,n?e:null,!t.s),0<t.O&&(t.L=new me(G(t.Ia,t,t.g),t.O)),we(t.V,t.g,"readystatechange",t.gb),e=t.H?ct(t.H):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.s,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),ke(1),function(t,e,n,s,i,r){t.info((function(){if(t.g)if(r)for(var o="",a=r.split("&"),h=0;h<a.length;h++){var c=a[h].split("=");if(1<c.length){var u=c[0];c=c[1];var l=u.split("_");o=2<=l.length&&"type"==l[1]?o+(u+"=")+c+"&":o+(u+"=redacted&")}}else o=null;else o=r;return"XMLHTTP REQ ("+s+") [attempt "+i+"]: "+e+"\n"+n+"\n"+o}))}(t.j,t.u,t.A,t.m,t.X,t.s)}function Qe(t){return!!t.g&&("GET"==t.u&&2!=t.K&&t.l.Ba)}function Xe(t,e,n){let s,i=!0;for(;!t.I&&t.C<n.length;){if(s=Ye(t,n),s==Ge){4==e&&(t.o=4,De(14),i=!1),be(t.j,t.m,null,"[Incomplete Response]");break}if(s==He){t.o=4,De(15),be(t.j,t.m,n,"[Invalid Chunk]"),i=!1;break}be(t.j,t.m,s,null),sn(t,s)}Qe(t)&&s!=Ge&&s!=He&&(t.h.g="",t.C=0),4!=e||0!=n.length||t.h.h||(t.o=1,De(16),i=!1),t.i=t.i&&i,i?0<n.length&&!t.aa&&(t.aa=!0,(e=t.l).g==t&&e.$&&!e.L&&(e.h.info("Great, no buffering proxy detected. Bytes received: "+n.length),bs(e),e.L=!0,De(11))):(be(t.j,t.m,n,"[Invalid Chunked Response]"),nn(t),en(t))}function Ye(t,e){var n=t.C,s=e.indexOf("\n",n);return-1==s?Ge:(n=Number(e.substring(n,s)),isNaN(n)?He:(s+=1)+n>e.length?Ge:(e=e.substr(s,n),t.C=s+n,e))}function Je(t){t.Y=Date.now()+t.P,Ze(t,t.P)}function Ze(t,e){if(null!=t.B)throw Error("WatchDog timer not null");t.B=Re(G(t.eb,t),e)}function tn(t){t.B&&(U.clearTimeout(t.B),t.B=null)}function en(t){0==t.l.G||t.I||Ss(t.l,t)}function nn(t){tn(t);var e=t.L;e&&"function"==typeof e.na&&e.na(),t.L=null,fe(t.W),Ee(t.V),t.g&&(e=t.g,t.g=null,e.abort(),e.na())}function sn(t,e){try{var n=t.l;if(0!=n.G&&(n.g==t||Pn(n.i,t)))if(n.I=t.N,!t.J&&Pn(n.i,t)&&3==n.G){try{var s=n.Ca.g.parse(e)}catch(t){s=null}if(Array.isArray(s)&&3==s.length){var i=s;if(0==i[0]){t:if(!n.u){if(n.g){if(!(n.g.F+3e3<t.F))break t;As(n),fs(n)}Ts(n),De(18)}}else n.ta=i[1],0<n.ta-n.U&&37500>i[2]&&n.N&&0==n.A&&!n.v&&(n.v=Re(G(n.ab,n),6e3));if(1>=Mn(n.i)&&n.ka){try{n.ka()}catch(t){}n.ka=void 0}}else ks(n,11)}else if((t.J||n.g==t)&&As(n),!et(e))for(i=n.Ca.g.parse(e),e=0;e<i.length;e++){let c=i[e];if(n.U=c[0],c=c[1],2==n.G)if("c"==c[0]){n.J=c[1],n.la=c[2];const e=c[3];null!=e&&(n.ma=e,n.h.info("VER="+n.ma));const i=c[4];null!=i&&(n.za=i,n.h.info("SVER="+n.za));const u=c[5];null!=u&&"number"==typeof u&&0<u&&(s=1.5*u,n.K=s,n.h.info("backChannelRequestTimeoutMs_="+s)),s=n;const l=t.g;if(l){const t=l.g?l.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(t){var r=s.i;!r.g&&(it(t,"spdy")||it(t,"quic")||it(t,"h2"))&&(r.j=r.l,r.g=new Set,r.h&&(Un(r,r.h),r.h=null))}if(s.D){const t=l.g?l.g.getResponseHeader("X-HTTP-Session-Id"):null;t&&(s.sa=t,mn(s.F,s.D,t))}}n.G=3,n.j&&n.j.xa(),n.$&&(n.O=Date.now()-t.F,n.h.info("Handshake RTT: "+n.O+"ms"));var o=t;if((s=n).oa=Ds(s,s.H?s.la:null,s.W),o.J){Fn(s.i,o);var a=o,h=s.K;h&&a.setTimeout(h),a.B&&(tn(a),Je(a)),s.g=o}else Es(s);0<n.l.length&&ms(n)}else"stop"!=c[0]&&"close"!=c[0]||ks(n,7);else 3==n.G&&("stop"==c[0]||"close"==c[0]?"stop"==c[0]?ks(n,7):ds(n):"noop"!=c[0]&&n.j&&n.j.wa(c),n.A=0)}ke(4)}catch(t){}}function rn(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(V(t)||"string"==typeof t)J(t,e,void 0);else{if(t.T&&"function"==typeof t.T)var n=t.T();else if(t.R&&"function"==typeof t.R)n=void 0;else if(V(t)||"string"==typeof t){n=[];for(var s=t.length,i=0;i<s;i++)n.push(i)}else for(i in n=[],s=0,t)n[s++]=i;s=function(t){if(t.R&&"function"==typeof t.R)return t.R();if("string"==typeof t)return t.split("");if(V(t)){for(var e=[],n=t.length,s=0;s<n;s++)e.push(t[s]);return e}for(s in e=[],n=0,t)e[n++]=t[s];return e}(t),i=s.length;for(var r=0;r<i;r++)e.call(void 0,s[r],n&&n[r],t)}}function on(t,e){this.h={},this.g=[],this.i=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var s=0;s<n;s+=2)this.set(arguments[s],arguments[s+1])}else if(t)if(t instanceof on)for(n=t.T(),s=0;s<n.length;s++)this.set(n[s],t.get(n[s]));else for(s in t)this.set(s,t[s])}function an(t){if(t.i!=t.g.length){for(var e=0,n=0;e<t.g.length;){var s=t.g[e];hn(t.h,s)&&(t.g[n++]=s),e++}t.g.length=n}if(t.i!=t.g.length){var i={};for(n=e=0;e<t.g.length;)hn(i,s=t.g[e])||(t.g[n++]=s,i[s]=1),e++;t.g.length=n}}function hn(t,e){return Object.prototype.hasOwnProperty.call(t,e)}(O=je.prototype).setTimeout=function(t){this.P=t},O.gb=function(t){t=t.target;const e=this.L;e&&3==as(t)?e.l():this.Ia(t)},O.Ia=function(t){try{if(t==this.g)t:{const u=as(this.g);var e=this.g.Da();const l=this.g.ba();if(!(3>u)&&(3!=u||vt||this.g&&(this.h.h||this.g.ga()||hs(this.g)))){this.I||4!=u||7==e||ke(8==e||0>=l?3:2),tn(this);var n=this.g.ba();this.N=n;e:if(Qe(this)){var s=hs(this.g);t="";var i=s.length,r=4==as(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){nn(this),en(this);var o="";break e}this.h.i=new U.TextDecoder}for(e=0;e<i;e++)this.h.h=!0,t+=this.h.i.decode(s[e],{stream:r&&e==i-1});s.splice(0,i),this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.ga();if(this.i=200==n,function(t,e,n,s,i,r,o){t.info((function(){return"XMLHTTP RESP ("+s+") [ attempt "+i+"]: "+e+"\n"+n+"\n"+r+" "+o}))}(this.j,this.u,this.A,this.m,this.X,u,n),this.i){if(this.$&&!this.J){e:{if(this.g){var a,h=this.g;if((a=h.g?h.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!et(a)){var c=a;break e}}c=null}if(!(n=c)){this.i=!1,this.o=3,De(12),nn(this),en(this);break t}be(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,sn(this,n)}this.U?(Xe(this,u,o),vt&&this.i&&3==u&&(we(this.V,this.W,"tick",this.fb),this.W.start())):(be(this.j,this.m,o,null),sn(this,o)),4==u&&nn(this),this.i&&!this.I&&(4==u?Ss(this.l,this):(this.i=!1,Je(this)))}else 400==n&&0<o.indexOf("Unknown SID")?(this.o=3,De(12)):(this.o=0,De(13)),nn(this),en(this)}}}catch(t){}},O.fb=function(){if(this.g){var t=as(this.g),e=this.g.ga();this.C<e.length&&(tn(this),Xe(this,t,e),this.i&&4!=t&&Je(this))}},O.cancel=function(){this.I=!0,nn(this)},O.eb=function(){this.B=null;const t=Date.now();0<=t-this.Y?(function(t,e){t.info((function(){return"TIMEOUT: "+e}))}(this.j,this.A),2!=this.K&&(ke(3),De(17)),nn(this),this.o=2,en(this)):Ze(this,this.Y-t)},(O=on.prototype).R=function(){an(this);for(var t=[],e=0;e<this.g.length;e++)t.push(this.h[this.g[e]]);return t},O.T=function(){return an(this),this.g.concat()},O.get=function(t,e){return hn(this.h,t)?this.h[t]:e},O.set=function(t,e){hn(this.h,t)||(this.i++,this.g.push(t)),this.h[t]=e},O.forEach=function(t,e){for(var n=this.T(),s=0;s<n.length;s++){var i=n[s],r=this.get(i);t.call(e,r,i,this)}};var cn=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function un(t,e){if(this.i=this.s=this.j="",this.m=null,this.o=this.l="",this.g=!1,t instanceof un){this.g=void 0!==e?e:t.g,dn(this,t.j),this.s=t.s,fn(this,t.i),pn(this,t.m),this.l=t.l,e=t.h;var n=new Cn;n.i=e.i,e.g&&(n.g=new on(e.g),n.h=e.h),gn(this,n),this.o=t.o}else t&&(n=String(t).match(cn))?(this.g=!!e,dn(this,n[1]||"",!0),this.s=vn(n[2]||""),fn(this,n[3]||"",!0),pn(this,n[4]),this.l=vn(n[5]||"",!0),gn(this,n[6]||"",!0),this.o=vn(n[7]||"")):(this.g=!!e,this.h=new Cn(null,this.g))}function ln(t){return new un(t)}function dn(t,e,n){t.j=n?vn(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function fn(t,e,n){t.i=n?vn(e,!0):e}function pn(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function gn(t,e,n){e instanceof Cn?(t.h=e,function(t,e){e&&!t.j&&(kn(t),t.i=null,t.g.forEach((function(t,e){var n=e.toLowerCase();e!=n&&(Nn(this,e),_n(this,n,t))}),t)),t.j=e}(t.h,t.g)):(n||(e=wn(e,An)),t.h=new Cn(e,t.g))}function mn(t,e,n){t.h.set(e,n)}function yn(t){return mn(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function vn(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function wn(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,En),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function En(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}un.prototype.toString=function(){var t=[],e=this.j;e&&t.push(wn(e,Tn,!0),":");var n=this.i;return(n||"file"==e)&&(t.push("//"),(e=this.s)&&t.push(wn(e,Tn,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.m)&&t.push(":",String(n))),(n=this.l)&&(this.i&&"/"!=n.charAt(0)&&t.push("/"),t.push(wn(n,"/"==n.charAt(0)?In:bn,!0))),(n=this.h.toString())&&t.push("?",n),(n=this.o)&&t.push("#",wn(n,Sn)),t.join("")};var Tn=/[#\/\?@]/g,bn=/[#\?:]/g,In=/[#\?]/g,An=/[#\?@]/g,Sn=/#/g;function Cn(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function kn(t){t.g||(t.g=new on,t.h=0,t.i&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var s=t[n].indexOf("="),i=null;if(0<=s){var r=t[n].substring(0,s);i=t[n].substring(s+1)}else r=t[n];e(r,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(t.i,(function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)})))}function Nn(t,e){kn(t),e=Rn(t,e),hn(t.g.h,e)&&(t.i=null,t.h-=t.g.get(e).length,hn((t=t.g).h,e)&&(delete t.h[e],t.i--,t.g.length>2*t.i&&an(t)))}function Dn(t,e){return kn(t),e=Rn(t,e),hn(t.g.h,e)}function _n(t,e,n){Nn(t,e),0<n.length&&(t.i=null,t.g.set(Rn(t,e),tt(n)),t.h+=n.length)}function Rn(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}(O=Cn.prototype).add=function(t,e){kn(this),this.i=null,t=Rn(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this},O.forEach=function(t,e){kn(this),this.g.forEach((function(n,s){J(n,(function(n){t.call(e,n,s,this)}),this)}),this)},O.T=function(){kn(this);for(var t=this.g.R(),e=this.g.T(),n=[],s=0;s<e.length;s++)for(var i=t[s],r=0;r<i.length;r++)n.push(e[s]);return n},O.R=function(t){kn(this);var e=[];if("string"==typeof t)Dn(this,t)&&(e=Z(e,this.g.get(Rn(this,t))));else{t=this.g.R();for(var n=0;n<t.length;n++)e=Z(e,t[n])}return e},O.set=function(t,e){return kn(this),this.i=null,Dn(this,t=Rn(this,t))&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this},O.get=function(t,e){return t&&0<(t=this.R(t)).length?String(t[0]):e},O.toString=function(){if(this.i)return this.i;if(!this.g)return"";for(var t=[],e=this.g.T(),n=0;n<e.length;n++){var s=e[n],i=encodeURIComponent(String(s));s=this.R(s);for(var r=0;r<s.length;r++){var o=i;""!==s[r]&&(o+="="+encodeURIComponent(String(s[r]))),t.push(o)}}return this.i=t.join("&")};function Ln(t){this.l=t||On,U.PerformanceNavigationTiming?t=0<(t=U.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(U.g&&U.g.Ea&&U.g.Ea()&&U.g.Ea().Zb),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var On=10;function xn(t){return!!t.h||!!t.g&&t.g.size>=t.j}function Mn(t){return t.h?1:t.g?t.g.size:0}function Pn(t,e){return t.h?t.h==e:!!t.g&&t.g.has(e)}function Un(t,e){t.g?t.g.add(e):t.h=e}function Fn(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}function Vn(t){if(null!=t.h)return t.i.concat(t.h.D);if(null!=t.g&&0!==t.g.size){let e=t.i;for(const n of t.g.values())e=e.concat(n.D);return e}return tt(t.i)}function qn(){}function Bn(){this.g=new qn}function jn(t,e,n){const s=n||"";try{rn(t,(function(t,n){let i=t;q(t)&&(i=ne(t)),e.push(s+n+"="+encodeURIComponent(i))}))}catch(t){throw e.push(s+"type="+encodeURIComponent("_badmap")),t}}function $n(t,e,n,s,i){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,i(s)}catch(t){}}function Kn(t){this.l=t.$b||null,this.j=t.ib||!1}function Hn(t,e){Zt.call(this),this.D=t,this.u=e,this.m=void 0,this.readyState=Gn,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}Ln.prototype.cancel=function(){if(this.i=Vn(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const t of this.g.values())t.cancel();this.g.clear()}},qn.prototype.stringify=function(t){return U.JSON.stringify(t,void 0)},qn.prototype.parse=function(t){return U.JSON.parse(t,void 0)},W(Kn,xe),Kn.prototype.g=function(){return new Hn(this.l,this.j)},Kn.prototype.i=function(t){return function(){return t}}({}),W(Hn,Zt);var Gn=0;function zn(t){t.j.read().then(t.Sa.bind(t)).catch(t.ha.bind(t))}function Wn(t){t.readyState=4,t.l=null,t.j=null,t.A=null,Qn(t)}function Qn(t){t.onreadystatechange&&t.onreadystatechange.call(t)}(O=Hn.prototype).open=function(t,e){if(this.readyState!=Gn)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,Qn(this)},O.send=function(t){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||U).fetch(new Request(this.B,e)).then(this.Va.bind(this),this.ha.bind(this))},O.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted."),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,Wn(this)),this.readyState=Gn},O.Va=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,Qn(this)),this.g&&(this.readyState=3,Qn(this),this.g)))if("arraybuffer"===this.responseType)t.arrayBuffer().then(this.Ta.bind(this),this.ha.bind(this));else if(void 0!==U.ReadableStream&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;zn(this)}else t.text().then(this.Ua.bind(this),this.ha.bind(this))},O.Sa=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?Wn(this):Qn(this),3==this.readyState&&zn(this)}},O.Ua=function(t){this.g&&(this.response=this.responseText=t,Wn(this))},O.Ta=function(t){this.g&&(this.response=t,Wn(this))},O.ha=function(){this.g&&Wn(this)},O.setRequestHeader=function(t,e){this.v.append(t,e)},O.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},O.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join("\r\n")},Object.defineProperty(Hn.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(t){this.m=t?"include":"same-origin"}});var Xn=U.JSON.parse;function Yn(t){Zt.call(this),this.headers=new on,this.u=t||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=Jn,this.K=this.L=!1}W(Yn,Zt);var Jn="",Zn=/^https?$/i,ts=["POST","PUT"];function es(t){return"content-type"==t.toLowerCase()}function ns(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,ss(t),rs(t)}function ss(t){t.D||(t.D=!0,te(t,"complete"),te(t,"error"))}function is(t){if(t.h&&void 0!==P&&(!t.C[1]||4!=as(t)||2!=t.ba()))if(t.v&&4==as(t))pe(t.Fa,0,t);else if(te(t,"readystatechange"),4==as(t)){t.h=!1;try{const a=t.ba();t:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break t;default:e=!1}var n;if(!(n=e)){var s;if(s=0===a){var i=String(t.H).match(cn)[1]||null;if(!i&&U.self&&U.self.location){var r=U.self.location.protocol;i=r.substr(0,r.length-1)}s=!Zn.test(i?i.toLowerCase():"")}n=s}if(n)te(t,"complete"),te(t,"success");else{t.m=6;try{var o=2<as(t)?t.g.statusText:""}catch(t){o=""}t.j=o+" ["+t.ba()+"]",ss(t)}}finally{rs(t)}}}function rs(t,e){if(t.g){os(t);const n=t.g,s=t.C[0]?F:null;t.g=null,t.C=null,e||te(t,"ready");try{n.onreadystatechange=s}catch(t){}}}function os(t){t.g&&t.K&&(t.g.ontimeout=null),t.A&&(U.clearTimeout(t.A),t.A=null)}function as(t){return t.g?t.g.readyState:0}function hs(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.J){case Jn:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch(t){return null}}function cs(t,e,n){t:{for(s in n){var s=!1;break t}s=!0}s||(n=function(t){let e="";return ht(t,(function(t,n){e+=n,e+=":",e+=t,e+="\r\n"})),e}(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):mn(t,e,n))}function us(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function ls(t){this.za=0,this.l=[],this.h=new Te,this.la=this.oa=this.F=this.W=this.g=this.sa=this.D=this.aa=this.o=this.P=this.s=null,this.Za=this.V=0,this.Xa=us("failFast",!1,t),this.N=this.v=this.u=this.m=this.j=null,this.X=!0,this.I=this.ta=this.U=-1,this.Y=this.A=this.C=0,this.Pa=us("baseRetryDelayMs",5e3,t),this.$a=us("retryDelaySeedMs",1e4,t),this.Ya=us("forwardChannelMaxRetries",2,t),this.ra=us("forwardChannelRequestTimeoutMs",2e4,t),this.qa=t&&t.xmlHttpFactory||void 0,this.Ba=t&&t.Yb||!1,this.K=void 0,this.H=t&&t.supportsCrossDomainXhr||!1,this.J="",this.i=new Ln(t&&t.concurrentRequestLimit),this.Ca=new Bn,this.ja=t&&t.fastHandshake||!1,this.Ra=t&&t.Wb||!1,t&&t.Aa&&this.h.Aa(),t&&t.forceLongPolling&&(this.X=!1),this.$=!this.ja&&this.X&&t&&t.detectBufferingProxy||!1,this.ka=void 0,this.O=0,this.L=!1,this.B=null,this.Wa=!t||!1!==t.Xb}function ds(t){if(ps(t),3==t.G){var e=t.V++,n=ln(t.F);mn(n,"SID",t.J),mn(n,"RID",e),mn(n,"TYPE","terminate"),vs(t,n),(e=new je(t,t.h,e,void 0)).K=2,e.v=yn(ln(n)),n=!1,U.navigator&&U.navigator.sendBeacon&&(n=U.navigator.sendBeacon(e.v.toString(),"")),!n&&U.Image&&((new Image).src=e.v,n=!0),n||(e.g=_s(e.l,null),e.g.ea(e.v)),e.F=Date.now(),Je(e)}Ns(t)}function fs(t){t.g&&(bs(t),t.g.cancel(),t.g=null)}function ps(t){fs(t),t.u&&(U.clearTimeout(t.u),t.u=null),As(t),t.i.cancel(),t.m&&("number"==typeof t.m&&U.clearTimeout(t.m),t.m=null)}function gs(t,e){t.l.push(new class{constructor(t,e){this.h=t,this.g=e}}(t.Za++,e)),3==t.G&&ms(t)}function ms(t){xn(t.i)||t.m||(t.m=!0,he(t.Ha,t),t.C=0)}function ys(t,e){var n;n=e?e.m:t.V++;const s=ln(t.F);mn(s,"SID",t.J),mn(s,"RID",n),mn(s,"AID",t.U),vs(t,s),t.o&&t.s&&cs(s,t.o,t.s),n=new je(t,t.h,n,t.C+1),null===t.o&&(n.H=t.s),e&&(t.l=e.D.concat(t.l)),e=ws(t,n,1e3),n.setTimeout(Math.round(.5*t.ra)+Math.round(.5*t.ra*Math.random())),Un(t.i,n),ze(n,s,e)}function vs(t,e){t.j&&rn({},(function(t,n){mn(e,n,t)}))}function ws(t,e,n){n=Math.min(t.l.length,n);var s=t.j?G(t.j.Oa,t.j,t):null;t:{var i=t.l;let e=-1;for(;;){const t=["count="+n];-1==e?0<n?(e=i[0].h,t.push("ofs="+e)):e=0:t.push("ofs="+e);let r=!0;for(let o=0;o<n;o++){let n=i[o].h;const a=i[o].g;if(n-=e,0>n)e=Math.max(0,i[o].h-100),r=!1;else try{jn(a,t,"req"+n+"_")}catch(t){s&&s(a)}}if(r){s=t.join("&");break t}}}return t=t.l.splice(0,n),e.D=t,s}function Es(t){t.g||t.u||(t.Y=1,he(t.Ga,t),t.A=0)}function Ts(t){return!(t.g||t.u||3<=t.A)&&(t.Y++,t.u=Re(G(t.Ga,t),Cs(t,t.A)),t.A++,!0)}function bs(t){null!=t.B&&(U.clearTimeout(t.B),t.B=null)}function Is(t){t.g=new je(t,t.h,"rpc",t.Y),null===t.o&&(t.g.H=t.s),t.g.O=0;var e=ln(t.oa);mn(e,"RID","rpc"),mn(e,"SID",t.J),mn(e,"CI",t.N?"0":"1"),mn(e,"AID",t.U),vs(t,e),mn(e,"TYPE","xmlhttp"),t.o&&t.s&&cs(e,t.o,t.s),t.K&&t.g.setTimeout(t.K);var n=t.g;t=t.la,n.K=1,n.v=yn(ln(e)),n.s=null,n.U=!0,We(n,t)}function As(t){null!=t.v&&(U.clearTimeout(t.v),t.v=null)}function Ss(t,e){var n=null;if(t.g==e){As(t),bs(t),t.g=null;var s=2}else{if(!Pn(t.i,e))return;n=e.D,Fn(t.i,e),s=1}if(t.I=e.N,0!=t.G)if(e.i)if(1==s){n=e.s?e.s.length:0,e=Date.now()-e.F;var i=t.C;te(s=Se(),new _e(s,n,e,i)),ms(t)}else Es(t);else if(3==(i=e.o)||0==i&&0<t.I||!(1==s&&function(t,e){return!(Mn(t.i)>=t.i.j-(t.m?1:0)||(t.m?(t.l=e.D.concat(t.l),0):1==t.G||2==t.G||t.C>=(t.Xa?0:t.Ya)||(t.m=Re(G(t.Ha,t,e),Cs(t,t.C)),t.C++,0)))}(t,e)||2==s&&Ts(t)))switch(n&&0<n.length&&(e=t.i,e.i=e.i.concat(n)),i){case 1:ks(t,5);break;case 4:ks(t,10);break;case 3:ks(t,6);break;default:ks(t,2)}}function Cs(t,e){let n=t.Pa+Math.floor(Math.random()*t.$a);return t.j||(n*=2),n*e}function ks(t,e){if(t.h.info("Error code "+e),2==e){var n=null;t.j&&(n=null);var s=G(t.jb,t);n||(n=new un("//www.google.com/images/cleardot.gif"),U.location&&"http"==U.location.protocol||dn(n,"https"),yn(n)),function(t,e){const n=new Te;if(U.Image){const s=new Image;s.onload=z($n,n,s,"TestLoadImage: loaded",!0,e),s.onerror=z($n,n,s,"TestLoadImage: error",!1,e),s.onabort=z($n,n,s,"TestLoadImage: abort",!1,e),s.ontimeout=z($n,n,s,"TestLoadImage: timeout",!1,e),U.setTimeout((function(){s.ontimeout&&s.ontimeout()}),1e4),s.src=t}else e(!1)}(n.toString(),s)}else De(2);t.G=0,t.j&&t.j.va(e),Ns(t),ps(t)}function Ns(t){t.G=0,t.I=-1,t.j&&(0==Vn(t.i).length&&0==t.l.length||(t.i.i.length=0,tt(t.l),t.l.length=0),t.j.ua())}function Ds(t,e,n){let s=function(t){return t instanceof un?ln(t):new un(t,void 0)}(n);if(""!=s.i)e&&fn(s,e+"."+s.i),pn(s,s.m);else{const t=U.location;s=function(t,e,n,s){var i=new un(null,void 0);return t&&dn(i,t),e&&fn(i,e),n&&pn(i,n),s&&(i.l=s),i}(t.protocol,e?e+"."+t.hostname:t.hostname,+t.port,n)}return t.aa&&ht(t.aa,(function(t,e){mn(s,e,t)})),e=t.D,n=t.sa,e&&n&&mn(s,e,n),mn(s,"VER",t.ma),vs(t,s),s}function _s(t,e,n){if(e&&!t.H)throw Error("Can't create secondary domain capable XhrIo object.");return(e=n&&t.Ba&&!t.qa?new Yn(new Kn({ib:!0})):new Yn(t.qa)).L=t.H,e}function Rs(){}function Ls(){if(mt&&!(10<=Number(Dt)))throw Error("Environmental error: no available transport.")}function Os(t,e){Zt.call(this),this.g=new ls(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.ya&&(t?t["X-WebChannel-Client-Profile"]=e.ya:t={"X-WebChannel-Client-Profile":e.ya}),this.g.P=t,(t=e&&e.httpHeadersOverwriteParam)&&!et(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!et(e)&&(this.g.D=e,null!==(t=this.h)&&e in t&&(e in(t=this.h)&&delete t[e])),this.j=new Ps(this)}function xs(t){Ve.call(this);var e=t.__sm__;if(e){t:{for(const n in e){t=n;break t}t=void 0}(this.i=t)&&(t=this.i,e=null!==e&&t in e?e[t]:void 0),this.data=e}else this.data=t}function Ms(){qe.call(this),this.status=1}function Ps(t){this.g=t}(O=Yn.prototype).ea=function(t,e,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+t);e=e?e.toUpperCase():"GET",this.H=t,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():Ue.g(),this.C=this.u?Me(this.u):Me(Ue),this.g.onreadystatechange=G(this.Fa,this);try{this.F=!0,this.g.open(e,String(t),!0),this.F=!1}catch(t){return void ns(this,t)}t=n||"";const i=new on(this.headers);s&&rn(s,(function(t,e){i.set(e,t)})),s=function(t){t:{var e=es;const n=t.length,s="string"==typeof t?t.split(""):t;for(let i=0;i<n;i++)if(i in s&&e.call(void 0,s[i],i,t)){e=i;break t}e=-1}return 0>e?null:"string"==typeof t?t.charAt(e):t[e]}(i.T()),n=U.FormData&&t instanceof U.FormData,!(0<=Y(ts,e))||s||n||i.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),i.forEach((function(t,e){this.g.setRequestHeader(e,t)}),this),this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{os(this),0<this.B&&((this.K=function(t){return mt&&kt()&&"number"==typeof t.timeout&&void 0!==t.ontimeout}(this.g))?(this.g.timeout=this.B,this.g.ontimeout=G(this.pa,this)):this.A=pe(this.pa,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(t){ns(this,t)}},O.pa=function(){void 0!==P&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,te(this,"timeout"),this.abort(8))},O.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,te(this,"complete"),te(this,"abort"),rs(this))},O.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),rs(this,!0)),Yn.Z.M.call(this)},O.Fa=function(){this.s||(this.F||this.v||this.l?is(this):this.cb())},O.cb=function(){is(this)},O.ba=function(){try{return 2<as(this)?this.g.status:-1}catch(t){return-1}},O.ga=function(){try{return this.g?this.g.responseText:""}catch(t){return""}},O.Qa=function(t){if(this.g){var e=this.g.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),Xn(e)}},O.Da=function(){return this.m},O.La=function(){return"string"==typeof this.j?this.j:String(this.j)},(O=ls.prototype).ma=8,O.G=1,O.hb=function(t){try{this.h.info("Origin Trials invoked: "+t)}catch(t){}},O.Ha=function(t){if(this.m)if(this.m=null,1==this.G){if(!t){this.V=Math.floor(1e5*Math.random()),t=this.V++;const i=new je(this,this.h,t,void 0);let r=this.s;if(this.P&&(r?(r=ct(r),lt(r,this.P)):r=this.P),null===this.o&&(i.H=r),this.ja)t:{for(var e=0,n=0;n<this.l.length;n++){var s=this.l[n];if(void 0===(s="__data__"in s.g&&"string"==typeof(s=s.g.__data__)?s.length:void 0))break;if(4096<(e+=s)){e=n;break t}if(4096===e||n===this.l.length-1){e=n+1;break t}}e=1e3}else e=1e3;e=ws(this,i,e),mn(n=ln(this.F),"RID",t),mn(n,"CVER",22),this.D&&mn(n,"X-HTTP-Session-Id",this.D),vs(this,n),this.o&&r&&cs(n,this.o,r),Un(this.i,i),this.Ra&&mn(n,"TYPE","init"),this.ja?(mn(n,"$req",e),mn(n,"SID","null"),i.$=!0,ze(i,n,null)):ze(i,n,e),this.G=2}}else 3==this.G&&(t?ys(this,t):0==this.l.length||xn(this.i)||ys(this))},O.Ga=function(){if(this.u=null,Is(this),this.$&&!(this.L||null==this.g||0>=this.O)){var t=2*this.O;this.h.info("BP detection timer enabled: "+t),this.B=Re(G(this.bb,this),t)}},O.bb=function(){this.B&&(this.B=null,this.h.info("BP detection timeout reached."),this.h.info("Buffering proxy detected and switch to long-polling!"),this.N=!1,this.L=!0,De(10),fs(this),Is(this))},O.ab=function(){null!=this.v&&(this.v=null,fs(this),Ts(this),De(19))},O.jb=function(t){t?(this.h.info("Successfully pinged google.com"),De(2)):(this.h.info("Failed to ping google.com"),De(1))},(O=Rs.prototype).xa=function(){},O.wa=function(){},O.va=function(){},O.ua=function(){},O.Oa=function(){},Ls.prototype.g=function(t,e){return new Os(t,e)},W(Os,Zt),Os.prototype.m=function(){this.g.j=this.j,this.A&&(this.g.H=!0);var t=this.g,e=this.l,n=this.h||void 0;t.Wa&&(t.h.info("Origin Trials enabled."),he(G(t.hb,t,e))),De(0),t.W=e,t.aa=n||{},t.N=t.X,t.F=Ds(t,null,t.W),ms(t)},Os.prototype.close=function(){ds(this.g)},Os.prototype.u=function(t){if("string"==typeof t){var e={};e.__data__=t,gs(this.g,e)}else this.v?((e={}).__data__=ne(t),gs(this.g,e)):gs(this.g,t)},Os.prototype.M=function(){this.g.j=null,delete this.j,ds(this.g),delete this.g,Os.Z.M.call(this)},W(xs,Ve),W(Ms,qe),W(Ps,Rs),Ps.prototype.xa=function(){te(this.g,"a")},Ps.prototype.wa=function(t){te(this.g,new xs(t))},Ps.prototype.va=function(t){te(this.g,new Ms(t))},Ps.prototype.ua=function(){te(this.g,"b")},Ls.prototype.createWebChannel=Ls.prototype.g,Os.prototype.send=Os.prototype.u,Os.prototype.open=Os.prototype.m,Os.prototype.close=Os.prototype.close,Le.NO_ERROR=0,Le.TIMEOUT=8,Le.HTTP_ERROR=6,Oe.COMPLETE="complete",Pe.EventType=Fe,Fe.OPEN="a",Fe.CLOSE="b",Fe.ERROR="c",Fe.MESSAGE="d",Zt.prototype.listen=Zt.prototype.N,Yn.prototype.listenOnce=Yn.prototype.O,Yn.prototype.getLastError=Yn.prototype.La,Yn.prototype.getLastErrorCode=Yn.prototype.Da,Yn.prototype.getStatus=Yn.prototype.ba,Yn.prototype.getResponseJson=Yn.prototype.Qa,Yn.prototype.getResponseText=Yn.prototype.ga,Yn.prototype.send=Yn.prototype.ea;var Us,Fs,Vs=M.createWebChannelTransport=function(){return new Ls},qs=M.getStatEventTarget=function(){return Se()},Bs=M.ErrorCode=Le,js=M.EventType=Oe,$s=M.Event=Ie,Ks=M.Stat={rb:0,ub:1,vb:2,Ob:3,Tb:4,Qb:5,Rb:6,Pb:7,Nb:8,Sb:9,PROXY:10,NOPROXY:11,Lb:12,Hb:13,Ib:14,Gb:15,Jb:16,Kb:17,nb:18,mb:19,ob:20},Hs=M.FetchXmlHttpFactory=Kn,Gs=M.WebChannel=Pe,zs=M.XhrIo=Yn,Ws={};function Qs(){throw new Error("setTimeout has not been defined")}function Xs(){throw new Error("clearTimeout has not been defined")}function Ys(t){if(Us===setTimeout)return setTimeout(t,0);if((Us===Qs||!Us)&&setTimeout)return Us=setTimeout,setTimeout(t,0);try{return Us(t,0)}catch(e){try{return Us.call(null,t,0)}catch(e){return Us.call(this,t,0)}}}!function(){try{Us="function"==typeof setTimeout?setTimeout:Qs}catch(t){Us=Qs}try{Fs="function"==typeof clearTimeout?clearTimeout:Xs}catch(t){Fs=Xs}}();var Js,Zs=[],ti=!1,ei=-1;function ni(){ti&&Js&&(ti=!1,Js.length?Zs=Js.concat(Zs):ei=-1,Zs.length&&si())}function si(){if(!ti){var t=Ys(ni);ti=!0;for(var e=Zs.length;e;){for(Js=Zs,Zs=[];++ei<e;)Js&&Js[ei].run();ei=-1,e=Zs.length}Js=null,ti=!1,function(t){if(Fs===clearTimeout)return clearTimeout(t);if((Fs===Xs||!Fs)&&clearTimeout)return Fs=clearTimeout,clearTimeout(t);try{Fs(t)}catch(e){try{return Fs.call(null,t)}catch(e){return Fs.call(this,t)}}}(t)}}function ii(t,e){this.fun=t,this.array=e}function ri(){}Ws.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];Zs.push(new ii(t,e)),1!==Zs.length||ti||Ys(si)},ii.prototype.run=function(){this.fun.apply(null,this.array)},Ws.title="browser",Ws.browser=!0,Ws.env={},Ws.argv=[],Ws.version="",Ws.versions={},Ws.on=ri,Ws.addListener=ri,Ws.once=ri,Ws.off=ri,Ws.removeListener=ri,Ws.removeAllListeners=ri,Ws.emit=ri,Ws.prependListener=ri,Ws.prependOnceListener=ri,Ws.listeners=function(t){return[]},Ws.binding=function(t){throw new Error("process.binding is not supported")},Ws.cwd=function(){return"/"},Ws.chdir=function(t){throw new Error("process.chdir is not supported")},Ws.umask=function(){return 0};
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
class oi{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}oi.UNAUTHENTICATED=new oi(null),oi.GOOGLE_CREDENTIALS=new oi("google-credentials-uid"),oi.FIRST_PARTY=new oi("first-party-uid"),oi.MOCK_USER=new oi("mock-user");
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
let ai="9.6.1";
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
 */const hi=new E("@firebase/firestore");function ci(){return hi.logLevel}function ui(t,...e){if(hi.logLevel<=p.DEBUG){const n=e.map(fi);hi.debug(`Firestore (${ai}): ${t}`,...n)}}function li(t,...e){if(hi.logLevel<=p.ERROR){const n=e.map(fi);hi.error(`Firestore (${ai}): ${t}`,...n)}}function di(t,...e){if(hi.logLevel<=p.WARN){const n=e.map(fi);hi.warn(`Firestore (${ai}): ${t}`,...n)}}function fi(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e)}catch(e){return t}
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
 */function pi(t="Unexpected state"){const e=`FIRESTORE (${ai}) INTERNAL ASSERTION FAILED: `+t;throw li(e),new Error(e)}function gi(t,e){t||pi()}function mi(t,e){return t}
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
 */const yi={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class vi extends Error{constructor(t,e){super(e),this.code=t,this.message=e,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
 */class wi{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}
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
 */class Ei{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Ti{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(oi.UNAUTHENTICATED)))}shutdown(){}}class bi{constructor(t){this.t=t,this.currentUser=oi.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){let n=this.i;const s=t=>this.i!==n?(n=this.i,e(t)):Promise.resolve();let i=new wi;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new wi,t.enqueueRetryable((()=>s(this.currentUser)))};const r=()=>{const e=i;t.enqueueRetryable((async()=>{await e.promise,await s(this.currentUser)}))},o=t=>{ui("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=t,this.auth.addAuthTokenListener(this.o),r()};this.t.onInit((t=>o(t))),setTimeout((()=>{if(!this.auth){const t=this.t.getImmediate({optional:!0});t?o(t):(ui("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new wi)}}),0),r()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((e=>this.i!==t?(ui("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(gi("string"==typeof e.accessToken),new Ei(e.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const t=this.auth&&this.auth.getUid();return gi(null===t||"string"==typeof t),new oi(t)}}class Ii{constructor(t,e,n){this.type="FirstParty",this.user=oi.FIRST_PARTY,this.headers=new Map,this.headers.set("X-Goog-AuthUser",e);const s=t.auth.getAuthHeaderValueForFirstParty([]);s&&this.headers.set("Authorization",s),n&&this.headers.set("X-Goog-Iam-Authorization-Token",n)}}class Ai{constructor(t,e,n){this.h=t,this.l=e,this.m=n}getToken(){return Promise.resolve(new Ii(this.h,this.l,this.m))}start(t,e){t.enqueueRetryable((()=>e(oi.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Si{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ci{constructor(t){this.g=t,this.forceRefresh=!1,this.appCheck=null}start(t,e){this.o=n=>{t.enqueueRetryable((()=>{return null!=(t=n).error&&ui("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${t.error.message}`),e(t.token);var t}))};const n=t=>{ui("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=t,this.appCheck.addTokenListener(this.o)};this.g.onInit((t=>n(t))),setTimeout((()=>{if(!this.appCheck){const t=this.g.getImmediate({optional:!0});t?n(t):ui("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((t=>t?(gi("string"==typeof t.token),new Si(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}
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
class ki{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.p(t),this.T=t=>e.writeSequenceNumber(t))}p(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.T&&this.T(t),t}}
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
 */function Ni(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let e=0;e<t;e++)n[e]=Math.floor(256*Math.random());return n}
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
 */ki.I=-1;class Di{static A(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let n="";for(;n.length<20;){const s=Ni(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<e&&(n+=t.charAt(s[i]%t.length))}return n}}function _i(t,e){return t<e?-1:t>e?1:0}function Ri(t,e,n){return t.length===e.length&&t.every(((t,s)=>n(t,e[s])))}
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
class Li{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new vi(yi.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new vi(yi.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new vi(yi.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new vi(yi.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return Li.fromMillis(Date.now())}static fromDate(t){return Li.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new Li(e,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?_i(this.nanoseconds,t.nanoseconds):_i(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
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
 */class Oi{constructor(t){this.timestamp=t}static fromTimestamp(t){return new Oi(t)}static min(){return new Oi(new Li(0,0))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
 */function xi(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Mi(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Pi(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
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
 */class Ui{constructor(t,e,n){void 0===e?e=0:e>t.length&&pi(),void 0===n?n=t.length-e:n>t.length-e&&pi(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===Ui.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Ui?t.forEach((t=>{e.push(t)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const n=t.get(s),i=e.get(s);if(n<i)return-1;if(n>i)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Fi extends Ui{construct(t,e,n){return new Fi(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new vi(yi.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((t=>t.length>0)))}return new Fi(e)}static emptyPath(){return new Fi([])}}const Vi=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class qi extends Ui{construct(t,e,n){return new qi(t,e,n)}static isValidIdentifier(t){return Vi.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),qi.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new qi(["__name__"])}static fromServerFormat(t){const e=[];let n="",s=0;const i=()=>{if(0===n.length)throw new vi(yi.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let r=!1;for(;s<t.length;){const e=t[s];if("\\"===e){if(s+1===t.length)throw new vi(yi.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[s+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new vi(yi.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,s+=2}else"`"===e?(r=!r,s++):"."!==e||r?(n+=e,s++):(i(),s++)}if(i(),r)throw new vi(yi.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new qi(e)}static emptyPath(){return new qi([])}}
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
 */class Bi{constructor(t){this.fields=t,t.sort(qi.comparator)}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Ri(this.fields,t.fields,((t,e)=>t.isEqual(e)))}}
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
class ji{constructor(t){this.binaryString=t}static fromBase64String(t){const e=atob(t);return new ji(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new ji(e)}toBase64(){var t;return t=this.binaryString,btoa(t)}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return _i(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ji.EMPTY_BYTE_STRING=new ji("");const $i=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ki(t){if(gi(!!t),"string"==typeof t){let e=0;const n=$i.exec(t);if(gi(!!n),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const s=new Date(t);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:Hi(t.seconds),nanos:Hi(t.nanos)}}function Hi(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function Gi(t){return"string"==typeof t?ji.fromBase64String(t):ji.fromUint8Array(t)}
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
 */function zi(t){var e,n;return"server_timestamp"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function Wi(t){const e=t.mapValue.fields.__previous_value__;return zi(e)?Wi(e):e}function Qi(t){const e=Ki(t.mapValue.fields.__local_write_time__.timestampValue);return new Li(e.seconds,e.nanos)}
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
 */function Xi(t){return null==t}function Yi(t){return 0===t&&1/t==-1/0}function Ji(t){return"number"==typeof t&&Number.isInteger(t)&&!Yi(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}
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
 */class Zi{constructor(t){this.path=t}static fromPath(t){return new Zi(Fi.fromString(t))}static fromName(t){return new Zi(Fi.fromString(t).popFirst(5))}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}isEqual(t){return null!==t&&0===Fi.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return Fi.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new Zi(new Fi(t.slice()))}}
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
 */function tr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?zi(t)?4:10:pi()}function er(t,e){const n=tr(t);if(n!==tr(e))return!1;switch(n){case 0:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Qi(t).isEqual(Qi(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=Ki(t.timestampValue),s=Ki(e.timestampValue);return n.seconds===s.seconds&&n.nanos===s.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return s=e,Gi(t.bytesValue).isEqual(Gi(s.bytesValue));case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return Hi(t.geoPointValue.latitude)===Hi(e.geoPointValue.latitude)&&Hi(t.geoPointValue.longitude)===Hi(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return Hi(t.integerValue)===Hi(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=Hi(t.doubleValue),s=Hi(e.doubleValue);return n===s?Yi(n)===Yi(s):isNaN(n)&&isNaN(s)}return!1}(t,e);case 9:return Ri(t.arrayValue.values||[],e.arrayValue.values||[],er);case 10:return function(t,e){const n=t.mapValue.fields||{},s=e.mapValue.fields||{};if(xi(n)!==xi(s))return!1;for(const t in n)if(n.hasOwnProperty(t)&&(void 0===s[t]||!er(n[t],s[t])))return!1;return!0}(t,e);default:return pi()}var s}function nr(t,e){return void 0!==(t.values||[]).find((t=>er(t,e)))}function sr(t,e){const n=tr(t),s=tr(e);if(n!==s)return _i(n,s);switch(n){case 0:return 0;case 1:return _i(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=Hi(t.integerValue||t.doubleValue),s=Hi(e.integerValue||e.doubleValue);return n<s?-1:n>s?1:n===s?0:isNaN(n)?isNaN(s)?0:-1:1}(t,e);case 3:return ir(t.timestampValue,e.timestampValue);case 4:return ir(Qi(t),Qi(e));case 5:return _i(t.stringValue,e.stringValue);case 6:return function(t,e){const n=Gi(t),s=Gi(e);return n.compareTo(s)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),s=e.split("/");for(let t=0;t<n.length&&t<s.length;t++){const e=_i(n[t],s[t]);if(0!==e)return e}return _i(n.length,s.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=_i(Hi(t.latitude),Hi(e.latitude));return 0!==n?n:_i(Hi(t.longitude),Hi(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(t,e){const n=t.values||[],s=e.values||[];for(let t=0;t<n.length&&t<s.length;++t){const e=sr(n[t],s[t]);if(e)return e}return _i(n.length,s.length)}(t.arrayValue,e.arrayValue);case 10:return function(t,e){const n=t.fields||{},s=Object.keys(n),i=e.fields||{},r=Object.keys(i);s.sort(),r.sort();for(let t=0;t<s.length&&t<r.length;++t){const e=_i(s[t],r[t]);if(0!==e)return e;const o=sr(n[s[t]],i[r[t]]);if(0!==o)return o}return _i(s.length,r.length)}(t.mapValue,e.mapValue);default:throw pi()}}function ir(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return _i(t,e);const n=Ki(t),s=Ki(e),i=_i(n.seconds,s.seconds);return 0!==i?i:_i(n.nanos,s.nanos)}function rr(t){return or(t)}function or(t){var e,n;return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=Ki(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?Gi(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,Zi.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(t){let e="[",n=!0;for(const s of t.values||[])n?n=!1:e+=",",e+=or(s);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",s=!0;for(const i of e)s?s=!1:n+=",",n+=`${i}:${or(t.fields[i])}`;return n+"}"}(t.mapValue):pi()}function ar(t){return!!t&&"integerValue"in t}function hr(t){return!!t&&"arrayValue"in t}function cr(t){return!!t&&"nullValue"in t}function ur(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function lr(t){return!!t&&"mapValue"in t}function dr(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&"object"==typeof t.timestampValue)return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Mi(t.mapValue.fields,((t,n)=>e.mapValue.fields[t]=dr(n))),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=dr(t.arrayValue.values[n]);return e}return Object.assign({},t)}
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
 */class fr{constructor(t){this.value=t}static empty(){return new fr({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!lr(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=dr(e)}setAll(t){let e=qi.emptyPath(),n={},s=[];t.forEach(((t,i)=>{if(!e.isImmediateParentOf(i)){const t=this.getFieldsMap(e);this.applyChanges(t,n,s),n={},s=[],e=i.popLast()}t?n[i.lastSegment()]=dr(t):s.push(i.lastSegment())}));const i=this.getFieldsMap(e);this.applyChanges(i,n,s)}delete(t){const e=this.field(t.popLast());lr(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return er(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];lr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){Mi(e,((e,n)=>t[e]=n));for(const e of n)delete t[e]}clone(){return new fr(dr(this.value))}}function pr(t){const e=[];return Mi(t.fields,((t,n)=>{const s=new qi([t]);if(lr(n)){const t=pr(n.mapValue).fields;if(0===t.length)e.push(s);else for(const n of t)e.push(s.child(n))}else e.push(s)})),new Bi(e)
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
 */}class gr{constructor(t,e,n,s,i){this.key=t,this.documentType=e,this.version=n,this.data=s,this.documentState=i}static newInvalidDocument(t){return new gr(t,0,Oi.min(),fr.empty(),0)}static newFoundDocument(t,e,n){return new gr(t,1,e,n,0)}static newNoDocument(t,e){return new gr(t,2,e,fr.empty(),0)}static newUnknownDocument(t,e){return new gr(t,3,e,fr.empty(),2)}convertToFoundDocument(t,e){return this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=fr.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=fr.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof gr&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}clone(){return new gr(this.key,this.documentType,this.version,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
 */class mr{constructor(t,e=null,n=[],s=[],i=null,r=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=r,this.endAt=o,this.R=null}}function yr(t,e=null,n=[],s=[],i=null,r=null,o=null){return new mr(t,e,n,s,i,r,o)}function vr(t){const e=mi(t);if(null===e.R){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((t=>function(t){return t.field.canonicalString()+t.op.toString()+rr(t.value)}(t))).join(","),t+="|ob:",t+=e.orderBy.map((t=>{return(e=t).field.canonicalString()+e.dir;var e})).join(","),Xi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=Rr(e.startAt)),e.endAt&&(t+="|ub:",t+=Rr(e.endAt)),e.R=t}return e.R}function wr(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!Or(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let i=0;i<t.filters.length;i++)if(n=t.filters[i],s=e.filters[i],n.op!==s.op||!n.field.isEqual(s.field)||!er(n.value,s.value))return!1;var n,s;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Mr(t.startAt,e.startAt)&&Mr(t.endAt,e.endAt)}function Er(t){return Zi.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}class Tr extends class{}{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.P(t,e,n):new br(t,e,n):"array-contains"===e?new Cr(t,n):"in"===e?new kr(t,n):"not-in"===e?new Nr(t,n):"array-contains-any"===e?new Dr(t,n):new Tr(t,e,n)}static P(t,e,n){return"in"===e?new Ir(t,n):new Ar(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&this.v(sr(e,this.value)):null!==e&&tr(this.value)===tr(e)&&this.v(sr(e,this.value))}v(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return pi()}}V(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class br extends Tr{constructor(t,e,n){super(t,e,n),this.key=Zi.fromName(n.referenceValue)}matches(t){const e=Zi.comparator(t.key,this.key);return this.v(e)}}class Ir extends Tr{constructor(t,e){super(t,"in",e),this.keys=Sr("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Ar extends Tr{constructor(t,e){super(t,"not-in",e),this.keys=Sr("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Sr(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map((t=>Zi.fromName(t.referenceValue)))}class Cr extends Tr{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return hr(e)&&nr(e.arrayValue,this.value)}}class kr extends Tr{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&nr(this.value.arrayValue,e)}}class Nr extends Tr{constructor(t,e){super(t,"not-in",e)}matches(t){if(nr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&!nr(this.value.arrayValue,e)}}class Dr extends Tr{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!hr(e)||!e.arrayValue.values)&&e.arrayValue.values.some((t=>nr(this.value.arrayValue,t)))}}class _r{constructor(t,e){this.position=t,this.before=e}}function Rr(t){return`${t.before?"b":"a"}:${t.position.map((t=>rr(t))).join(",")}`}class Lr{constructor(t,e="asc"){this.field=t,this.dir=e}}function Or(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}function xr(t,e,n){let s=0;for(let i=0;i<t.position.length;i++){const r=e[i],o=t.position[i];if(s=r.field.isKeyField()?Zi.comparator(Zi.fromName(o.referenceValue),n.key):sr(o,n.data.field(r.field)),"desc"===r.dir&&(s*=-1),0!==s)break}return t.before?s<=0:s<0}function Mr(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.before!==e.before||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!er(t.position[n],e.position[n]))return!1;return!0}
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
 */class Pr{constructor(t,e=null,n=[],s=[],i=null,r="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=r,this.startAt=o,this.endAt=a,this.S=null,this.D=null,this.startAt,this.endAt}}function Ur(t,e,n,s,i,r,o,a){return new Pr(t,e,n,s,i,r,o,a)}function Fr(t){return new Pr(t)}function Vr(t){return!Xi(t.limit)&&"F"===t.limitType}function qr(t){return!Xi(t.limit)&&"L"===t.limitType}function Br(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function jr(t){for(const e of t.filters)if(e.V())return e.field;return null}function $r(t){return null!==t.collectionGroup}function Kr(t){const e=mi(t);if(null===e.S){e.S=[];const t=jr(e),n=Br(e);if(null!==t&&null===n)t.isKeyField()||e.S.push(new Lr(t)),e.S.push(new Lr(qi.keyField(),"asc"));else{let t=!1;for(const n of e.explicitOrderBy)e.S.push(n),n.field.isKeyField()&&(t=!0);if(!t){const t=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.S.push(new Lr(qi.keyField(),t))}}}return e.S}function Hr(t){const e=mi(t);if(!e.D)if("F"===e.limitType)e.D=yr(e.path,e.collectionGroup,Kr(e),e.filters,e.limit,e.startAt,e.endAt);else{const t=[];for(const n of Kr(e)){const e="desc"===n.dir?"asc":"desc";t.push(new Lr(n.field,e))}const n=e.endAt?new _r(e.endAt.position,!e.endAt.before):null,s=e.startAt?new _r(e.startAt.position,!e.startAt.before):null;e.D=yr(e.path,e.collectionGroup,t,e.filters,e.limit,n,s)}return e.D}function Gr(t,e,n){return new Pr(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function zr(t,e){return wr(Hr(t),Hr(e))&&t.limitType===e.limitType}function Wr(t){return`${vr(Hr(t))}|lt:${t.limitType}`}function Qr(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map((t=>{var e;return`${(e=t).field.canonicalString()} ${e.op} ${rr(e.value)}`})).join(", ")}]`),Xi(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map((t=>{return`${(e=t).field.canonicalString()} (${e.dir})`;var e})).join(", ")}]`),t.startAt&&(e+=", startAt: "+Rr(t.startAt)),t.endAt&&(e+=", endAt: "+Rr(t.endAt)),`Target(${e})`}(Hr(t))}; limitType=${t.limitType})`}function Xr(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):Zi.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of t.explicitOrderBy)if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&(s=e,!((n=t).startAt&&!xr(n.startAt,Kr(n),s)||n.endAt&&xr(n.endAt,Kr(n),s)));var n,s}function Yr(t){return(e,n)=>{let s=!1;for(const i of Kr(t)){const t=Jr(i,e,n);if(0!==t)return t;s=s||i.field.isKeyField()}return 0}}function Jr(t,e,n){const s=t.field.isKeyField()?Zi.comparator(e.key,n.key):function(t,e,n){const s=e.data.field(t),i=n.data.field(t);return null!==s&&null!==i?sr(s,i):pi()}(t.field,e,n);switch(t.dir){case"asc":return s;case"desc":return-1*s;default:return pi()}}
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
 */function Zr(t,e){if(t.C){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Yi(e)?"-0":e}}function to(t){return{integerValue:""+t}}function eo(t,e){return Ji(e)?to(e):Zr(t,e)}
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
 */class no{constructor(){this._=void 0}}function so(t,e,n){return t instanceof oo?ao(t,e):t instanceof ho?co(t,e):n}function io(t,e){var n,s;return t instanceof uo?ar(n=e)||(s=n)&&"doubleValue"in s?e:{integerValue:0}:null}class ro extends no{}class oo extends no{constructor(t){super(),this.elements=t}}function ao(t,e){const n=fo(e);for(const e of t.elements)n.some((t=>er(t,e)))||n.push(e);return{arrayValue:{values:n}}}class ho extends no{constructor(t){super(),this.elements=t}}function co(t,e){let n=fo(e);for(const e of t.elements)n=n.filter((t=>!er(t,e)));return{arrayValue:{values:n}}}class uo extends no{constructor(t,e){super(),this.k=t,this.N=e}}function lo(t){return Hi(t.integerValue||t.doubleValue)}function fo(t){return hr(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
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
 */class po{constructor(t,e){this.field=t,this.transform=e}}class go{constructor(t,e){this.version=t,this.transformResults=e}}class mo{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new mo}static exists(t){return new mo(void 0,t)}static updateTime(t){return new mo(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function yo(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class vo{}function wo(t,e,n){var s;t instanceof Ao?function(t,e,n){const s=t.value.clone(),i=ko(t.fieldTransforms,e,n.transformResults);s.setAll(i),e.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(t,e,n):t instanceof So?function(t,e,n){if(!yo(t.precondition,e))return void e.convertToUnknownDocument(n.version);const s=ko(t.fieldTransforms,e,n.transformResults),i=e.data;i.setAll(Co(t)),i.setAll(s),e.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(t,e,n):(s=n,e.convertToNoDocument(s.version).setHasCommittedMutations())}function Eo(t,e,n){var s;t instanceof Ao?function(t,e,n){if(!yo(t.precondition,e))return;const s=t.value.clone(),i=No(t.fieldTransforms,n,e);s.setAll(i),e.convertToFoundDocument(Io(e),s).setHasLocalMutations()}(t,e,n):t instanceof So?function(t,e,n){if(!yo(t.precondition,e))return;const s=No(t.fieldTransforms,n,e),i=e.data;i.setAll(Co(t)),i.setAll(s),e.convertToFoundDocument(Io(e),i).setHasLocalMutations()}(t,e,n):(s=e,yo(t.precondition,s)&&s.convertToNoDocument(Oi.min()))}function To(t,e){let n=null;for(const s of t.fieldTransforms){const t=e.data.field(s.field),i=io(s.transform,t||null);null!=i&&(null==n&&(n=fr.empty()),n.set(s.field,i))}return n||null}function bo(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&(n=t.fieldTransforms,s=e.fieldTransforms,!!(void 0===n&&void 0===s||n&&s&&Ri(n,s,((t,e)=>function(t,e){return t.field.isEqual(e.field)&&(n=t.transform,s=e.transform,n instanceof oo&&s instanceof oo||n instanceof ho&&s instanceof ho?Ri(n.elements,s.elements,er):n instanceof uo&&s instanceof uo?er(n.N,s.N):n instanceof ro&&s instanceof ro);var n,s}(t,e)))))&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask));var n,s}function Io(t){return t.isFoundDocument()?t.version:Oi.min()}class Ao extends vo{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}}class So extends vo{constructor(t,e,n,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}}function Co(t){const e=new Map;return t.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const s=t.data.field(n);e.set(n,s)}})),e}function ko(t,e,n){const s=new Map;gi(t.length===n.length);for(let i=0;i<n.length;i++){const r=t[i],o=r.transform,a=e.data.field(r.field);s.set(r.field,so(o,a,n[i]))}return s}function No(t,e,n){const s=new Map;for(const a of t){const t=a.transform,h=n.data.field(a.field);s.set(a.field,(r=h,o=e,(i=t)instanceof ro?function(t,e){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&(n.fields.__previous_value__=e),{mapValue:n}}(o,r):i instanceof oo?ao(i,r):i instanceof ho?co(i,r):function(t,e){const n=io(t,e),s=lo(n)+lo(t.N);return ar(n)&&ar(t.N)?to(s):Zr(t.k,s)}(i,r)))}var i,r,o;return s}class Do extends vo{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}}class _o extends vo{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}}
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
 */class Ro{constructor(t){this.count=t}}
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
 */var Lo,Oo;function xo(t){switch(t){default:return pi();case yi.CANCELLED:case yi.UNKNOWN:case yi.DEADLINE_EXCEEDED:case yi.RESOURCE_EXHAUSTED:case yi.INTERNAL:case yi.UNAVAILABLE:case yi.UNAUTHENTICATED:return!1;case yi.INVALID_ARGUMENT:case yi.NOT_FOUND:case yi.ALREADY_EXISTS:case yi.PERMISSION_DENIED:case yi.FAILED_PRECONDITION:case yi.ABORTED:case yi.OUT_OF_RANGE:case yi.UNIMPLEMENTED:case yi.DATA_LOSS:return!0}}function Mo(t){if(void 0===t)return li("GRPC error has no .code"),yi.UNKNOWN;switch(t){case Lo.OK:return yi.OK;case Lo.CANCELLED:return yi.CANCELLED;case Lo.UNKNOWN:return yi.UNKNOWN;case Lo.DEADLINE_EXCEEDED:return yi.DEADLINE_EXCEEDED;case Lo.RESOURCE_EXHAUSTED:return yi.RESOURCE_EXHAUSTED;case Lo.INTERNAL:return yi.INTERNAL;case Lo.UNAVAILABLE:return yi.UNAVAILABLE;case Lo.UNAUTHENTICATED:return yi.UNAUTHENTICATED;case Lo.INVALID_ARGUMENT:return yi.INVALID_ARGUMENT;case Lo.NOT_FOUND:return yi.NOT_FOUND;case Lo.ALREADY_EXISTS:return yi.ALREADY_EXISTS;case Lo.PERMISSION_DENIED:return yi.PERMISSION_DENIED;case Lo.FAILED_PRECONDITION:return yi.FAILED_PRECONDITION;case Lo.ABORTED:return yi.ABORTED;case Lo.OUT_OF_RANGE:return yi.OUT_OF_RANGE;case Lo.UNIMPLEMENTED:return yi.UNIMPLEMENTED;case Lo.DATA_LOSS:return yi.DATA_LOSS;default:return pi()}}(Oo=Lo||(Lo={}))[Oo.OK=0]="OK",Oo[Oo.CANCELLED=1]="CANCELLED",Oo[Oo.UNKNOWN=2]="UNKNOWN",Oo[Oo.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Oo[Oo.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Oo[Oo.NOT_FOUND=5]="NOT_FOUND",Oo[Oo.ALREADY_EXISTS=6]="ALREADY_EXISTS",Oo[Oo.PERMISSION_DENIED=7]="PERMISSION_DENIED",Oo[Oo.UNAUTHENTICATED=16]="UNAUTHENTICATED",Oo[Oo.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Oo[Oo.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Oo[Oo.ABORTED=10]="ABORTED",Oo[Oo.OUT_OF_RANGE=11]="OUT_OF_RANGE",Oo[Oo.UNIMPLEMENTED=12]="UNIMPLEMENTED",Oo[Oo.INTERNAL=13]="INTERNAL",Oo[Oo.UNAVAILABLE=14]="UNAVAILABLE",Oo[Oo.DATA_LOSS=15]="DATA_LOSS";
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
class Po{constructor(t,e){this.comparator=t,this.root=e||Fo.EMPTY}insert(t,e){return new Po(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Fo.BLACK,null,null))}remove(t){return new Po(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Fo.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(0===s)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Uo(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Uo(this.root,t,this.comparator,!1)}getReverseIterator(){return new Uo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Uo(this.root,t,this.comparator,!0)}}class Uo{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(0===i){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Fo{constructor(t,e,n,s,i){this.key=t,this.value=e,this.color=null!=n?n:Fo.RED,this.left=null!=s?s:Fo.EMPTY,this.right=null!=i?i:Fo.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,i){return new Fo(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=s?s:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const i=n(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,n),null):0===i?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Fo.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),0===e(t,s.key)){if(s.right.isEmpty())return Fo.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Fo.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Fo.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw pi();if(this.right.isRed())throw pi();const t=this.left.check();if(t!==this.right.check())throw pi();return t+(this.isRed()?0:1)}}Fo.EMPTY=null,Fo.RED=!0,Fo.BLACK=!1,Fo.EMPTY=new class{constructor(){this.size=0}get key(){throw pi()}get value(){throw pi()}get color(){throw pi()}get left(){throw pi()}get right(){throw pi()}copy(t,e,n,s,i){return this}insert(t,e,n){return new Fo(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
class Vo{constructor(t){this.comparator=t,this.data=new Po(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,n)=>(t(e),!1)))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new qo(this.data.getIterator())}getIteratorFrom(t){return new qo(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((t=>{e=e.add(t)})),e}isEqual(t){if(!(t instanceof Vo))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,s=n.getNext().key;if(0!==this.comparator(t,s))return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new Vo(this.comparator);return e.data=t,e}}class qo{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
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
 */const Bo=new Po(Zi.comparator);function jo(){return Bo}const $o=new Po(Zi.comparator);function Ko(){return $o}const Ho=new Po(Zi.comparator);function Go(){return Ho}const zo=new Vo(Zi.comparator);function Wo(...t){let e=zo;for(const n of t)e=e.add(n);return e}const Qo=new Vo(_i);function Xo(){return Qo}
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
 */class Yo{constructor(t,e,n,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e){const n=new Map;return n.set(t,Jo.createSynthesizedTargetChangeForCurrentChange(t,e)),new Yo(Oi.min(),n,Xo(),jo(),Wo())}}class Jo{constructor(t,e,n,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e){return new Jo(ji.EMPTY_BYTE_STRING,e,Wo(),Wo(),Wo())}}
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
 */class Zo{constructor(t,e,n,s){this.$=t,this.removedTargetIds=e,this.key=n,this.F=s}}class ta{constructor(t,e){this.targetId=t,this.O=e}}class ea{constructor(t,e,n=ji.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class na{constructor(){this.M=0,this.L=ra(),this.B=ji.EMPTY_BYTE_STRING,this.U=!1,this.q=!0}get current(){return this.U}get resumeToken(){return this.B}get K(){return 0!==this.M}get j(){return this.q}W(t){t.approximateByteSize()>0&&(this.q=!0,this.B=t)}G(){let t=Wo(),e=Wo(),n=Wo();return this.L.forEach(((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:pi()}})),new Jo(this.B,this.U,t,e,n)}H(){this.q=!1,this.L=ra()}J(t,e){this.q=!0,this.L=this.L.insert(t,e)}Y(t){this.q=!0,this.L=this.L.remove(t)}X(){this.M+=1}Z(){this.M-=1}tt(){this.q=!0,this.U=!0}}class sa{constructor(t){this.et=t,this.nt=new Map,this.st=jo(),this.it=ia(),this.rt=new Vo(_i)}ot(t){for(const e of t.$)t.F&&t.F.isFoundDocument()?this.at(e,t.F):this.ct(e,t.key,t.F);for(const e of t.removedTargetIds)this.ct(e,t.key,t.F)}ut(t){this.forEachTarget(t,(e=>{const n=this.ht(e);switch(t.state){case 0:this.lt(e)&&n.W(t.resumeToken);break;case 1:n.Z(),n.K||n.H(),n.W(t.resumeToken);break;case 2:n.Z(),n.K||this.removeTarget(e);break;case 3:this.lt(e)&&(n.tt(),n.W(t.resumeToken));break;case 4:this.lt(e)&&(this.ft(e),n.W(t.resumeToken));break;default:pi()}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.nt.forEach(((t,n)=>{this.lt(n)&&e(n)}))}dt(t){const e=t.targetId,n=t.O.count,s=this.wt(e);if(s){const t=s.target;if(Er(t))if(0===n){const n=new Zi(t.path);this.ct(e,n,gr.newNoDocument(n,Oi.min()))}else gi(1===n);else this._t(e)!==n&&(this.ft(e),this.rt=this.rt.add(e))}}gt(t){const e=new Map;this.nt.forEach(((n,s)=>{const i=this.wt(s);if(i){if(n.current&&Er(i.target)){const e=new Zi(i.target.path);null!==this.st.get(e)||this.yt(s,e)||this.ct(s,e,gr.newNoDocument(e,t))}n.j&&(e.set(s,n.G()),n.H())}}));let n=Wo();this.it.forEach(((t,e)=>{let s=!0;e.forEachWhile((t=>{const e=this.wt(t);return!e||2===e.purpose||(s=!1,!1)})),s&&(n=n.add(t))}));const s=new Yo(t,e,this.rt,this.st,n);return this.st=jo(),this.it=ia(),this.rt=new Vo(_i),s}at(t,e){if(!this.lt(t))return;const n=this.yt(t,e.key)?2:0;this.ht(t).J(e.key,n),this.st=this.st.insert(e.key,e),this.it=this.it.insert(e.key,this.Tt(e.key).add(t))}ct(t,e,n){if(!this.lt(t))return;const s=this.ht(t);this.yt(t,e)?s.J(e,1):s.Y(e),this.it=this.it.insert(e,this.Tt(e).delete(t)),n&&(this.st=this.st.insert(e,n))}removeTarget(t){this.nt.delete(t)}_t(t){const e=this.ht(t).G();return this.et.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}X(t){this.ht(t).X()}ht(t){let e=this.nt.get(t);return e||(e=new na,this.nt.set(t,e)),e}Tt(t){let e=this.it.get(t);return e||(e=new Vo(_i),this.it=this.it.insert(t,e)),e}lt(t){const e=null!==this.wt(t);return e||ui("WatchChangeAggregator","Detected inactive target",t),e}wt(t){const e=this.nt.get(t);return e&&e.K?null:this.et.Et(t)}ft(t){this.nt.set(t,new na),this.et.getRemoteKeysForTarget(t).forEach((e=>{this.ct(t,e,null)}))}yt(t,e){return this.et.getRemoteKeysForTarget(t).has(e)}}function ia(){return new Po(Zi.comparator)}function ra(){return new Po(Zi.comparator)}
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
 */const oa={asc:"ASCENDING",desc:"DESCENDING"},aa={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};class ha{constructor(t,e){this.databaseId=t,this.C=e}}function ca(t,e){return t.C?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function ua(t,e){return t.C?e.toBase64():e.toUint8Array()}function la(t,e){return ca(t,e.toTimestamp())}function da(t){return gi(!!t),Oi.fromTimestamp(function(t){const e=Ki(t);return new Li(e.seconds,e.nanos)}(t))}function fa(t,e){return(n=t,new Fi(["projects",n.projectId,"databases",n.database])).child("documents").child(e).canonicalString();var n}function pa(t){const e=Fi.fromString(t);return gi(Ma(e)),e}function ga(t,e){return fa(t.databaseId,e.path)}function ma(t,e){const n=pa(e);if(n.get(1)!==t.databaseId.projectId)throw new vi(yi.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new vi(yi.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Zi(Ea(n))}function ya(t,e){return fa(t.databaseId,e)}function va(t){const e=pa(t);return 4===e.length?Fi.emptyPath():Ea(e)}function wa(t){return new Fi(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Ea(t){return gi(t.length>4&&"documents"===t.get(4)),t.popFirst(5)}function Ta(t,e,n){return{name:ga(t,e),fields:n.value.mapValue.fields}}function ba(t,e){let n;if(e instanceof Ao)n={update:Ta(t,e.key,e.value)};else if(e instanceof Do)n={delete:ga(t,e.key)};else if(e instanceof So)n={update:Ta(t,e.key,e.data),updateMask:xa(e.fieldMask)};else{if(!(e instanceof _o))return pi();n={verify:ga(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((t=>function(t,e){const n=e.transform;if(n instanceof ro)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof oo)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof ho)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof uo)return{fieldPath:e.field.canonicalString(),increment:n.N};throw pi()}(0,t)))),e.precondition.isNone||(n.currentDocument=(s=t,void 0!==(i=e.precondition).updateTime?{updateTime:la(s,i.updateTime)}:void 0!==i.exists?{exists:i.exists}:pi())),n;var s,i}function Ia(t,e){return{documents:[ya(t,e.path)]}}function Aa(t,e){const n={structuredQuery:{}},s=e.path;null!==e.collectionGroup?(n.parent=ya(t,s),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=ya(t,s.popLast()),n.structuredQuery.from=[{collectionId:s.lastSegment()}]);const i=function(t){if(0===t.length)return;const e=t.map((t=>function(t){if("=="===t.op){if(ur(t.value))return{unaryFilter:{field:Ra(t.field),op:"IS_NAN"}};if(cr(t.value))return{unaryFilter:{field:Ra(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(ur(t.value))return{unaryFilter:{field:Ra(t.field),op:"IS_NOT_NAN"}};if(cr(t.value))return{unaryFilter:{field:Ra(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ra(t.field),op:_a(t.op),value:t.value}}}(t)));return 1===e.length?e[0]:{compositeFilter:{op:"AND",filters:e}}}(e.filters);i&&(n.structuredQuery.where=i);const r=function(t){if(0!==t.length)return t.map((t=>{return{field:Ra((e=t).field),direction:Da(e.dir)};var e}))}(e.orderBy);r&&(n.structuredQuery.orderBy=r);const o=(a=t,h=e.limit,a.C||Xi(h)?h:{value:h});var a,h;return null!==o&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt=ka(e.startAt)),e.endAt&&(n.structuredQuery.endAt=ka(e.endAt)),n}function Sa(t){let e=va(t.parent);const n=t.structuredQuery,s=n.from?n.from.length:0;let i=null;if(s>0){gi(1===s);const t=n.from[0];t.allDescendants?i=t.collectionId:e=e.child(t.collectionId)}let r=[];n.where&&(r=Ca(n.where));let o=[];n.orderBy&&(o=n.orderBy.map((t=>{return new Lr(La((e=t).field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction));var e})));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,Xi(e)?null:e}(n.limit));let h=null;n.startAt&&(h=Na(n.startAt));let c=null;return n.endAt&&(c=Na(n.endAt)),Ur(e,i,o,r,a,"F",h,c)}function Ca(t){return t?void 0!==t.unaryFilter?[Oa(t)]:void 0!==t.fieldFilter?[(e=t,Tr.create(La(e.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return pi()}}(e.fieldFilter.op),e.fieldFilter.value))]:void 0!==t.compositeFilter?t.compositeFilter.filters.map((t=>Ca(t))).reduce(((t,e)=>t.concat(e))):pi():[];var e}function ka(t){return{before:t.before,values:t.position}}function Na(t){const e=!!t.before,n=t.values||[];return new _r(n,e)}function Da(t){return oa[t]}function _a(t){return aa[t]}function Ra(t){return{fieldPath:t.canonicalString()}}function La(t){return qi.fromServerFormat(t.fieldPath)}function Oa(t){switch(t.unaryFilter.op){case"IS_NAN":const e=La(t.unaryFilter.field);return Tr.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=La(t.unaryFilter.field);return Tr.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=La(t.unaryFilter.field);return Tr.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=La(t.unaryFilter.field);return Tr.create(i,"!=",{nullValue:"NULL_VALUE"});default:return pi()}}function xa(t){const e=[];return t.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Ma(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
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
 */function Pa(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Fa(e)),e=Ua(t.get(n),e);return Fa(e)}function Ua(t,e){let n=e;const s=t.length;for(let e=0;e<s;e++){const s=t.charAt(e);switch(s){case"\0":n+="";break;case"":n+="";break;default:n+=s}}return n}function Fa(t){return t+""}class Va{constructor(t,e,n){this.ownerId=t,this.allowTabSynchronization=e,this.leaseTimestampMs=n}}Va.store="owner",Va.key="owner";class qa{constructor(t,e,n){this.userId=t,this.lastAcknowledgedBatchId=e,this.lastStreamToken=n}}qa.store="mutationQueues",qa.keyPath="userId";class Ba{constructor(t,e,n,s,i){this.userId=t,this.batchId=e,this.localWriteTimeMs=n,this.baseMutations=s,this.mutations=i}}Ba.store="mutations",Ba.keyPath="batchId",Ba.userMutationsIndex="userMutationsIndex",Ba.userMutationsKeyPath=["userId","batchId"];class ja{constructor(){}static prefixForUser(t){return[t]}static prefixForPath(t,e){return[t,Pa(e)]}static key(t,e,n){return[t,Pa(e),n]}}ja.store="documentMutations",ja.PLACEHOLDER=new ja;class $a{constructor(t,e,n,s,i,r){this.unknownDocument=t,this.noDocument=e,this.document=n,this.hasCommittedMutations=s,this.readTime=i,this.parentPath=r}}$a.store="remoteDocuments",$a.readTimeIndex="readTimeIndex",$a.readTimeIndexPath="readTime",$a.collectionReadTimeIndex="collectionReadTimeIndex",$a.collectionReadTimeIndexPath=["parentPath","readTime"];class Ka{constructor(t){this.byteSize=t}}Ka.store="remoteDocumentGlobal",Ka.key="remoteDocumentGlobalKey";class Ha{constructor(t,e,n,s,i,r,o){this.targetId=t,this.canonicalId=e,this.readTime=n,this.resumeToken=s,this.lastListenSequenceNumber=i,this.lastLimboFreeSnapshotVersion=r,this.query=o}}Ha.store="targets",Ha.keyPath="targetId",Ha.queryTargetsIndexName="queryTargetsIndex",Ha.queryTargetsKeyPath=["canonicalId","targetId"];class Ga{constructor(t,e,n){this.targetId=t,this.path=e,this.sequenceNumber=n}}Ga.store="targetDocuments",Ga.keyPath=["targetId","path"],Ga.documentTargetsIndex="documentTargetsIndex",Ga.documentTargetsKeyPath=["path","targetId"];class za{constructor(t,e,n,s){this.highestTargetId=t,this.highestListenSequenceNumber=e,this.lastRemoteSnapshotVersion=n,this.targetCount=s}}za.key="targetGlobalKey",za.store="targetGlobal";class Wa{constructor(t,e){this.collectionId=t,this.parent=e}}Wa.store="collectionParents",Wa.keyPath=["collectionId","parent"];class Qa{constructor(t,e,n,s){this.clientId=t,this.updateTimeMs=e,this.networkEnabled=n,this.inForeground=s}}Qa.store="clientMetadata",Qa.keyPath="clientId";class Xa{constructor(t,e,n){this.bundleId=t,this.createTime=e,this.version=n}}Xa.store="bundles",Xa.keyPath="bundleId";class Ya{constructor(t,e,n){this.name=t,this.readTime=e,this.bundledQuery=n}}Ya.store="namedQueries",Ya.keyPath="name";qa.store,Ba.store,ja.store,$a.store,Ha.store,Va.store,za.store,Ga.store,Qa.store,Ka.store,Wa.store,Xa.store,Ya.store;const Ja="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Za{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}
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
 */class th{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&pi(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new th(((n,s)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,s)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof th?e:th.resolve(e)}catch(t){return th.reject(t)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):th.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):th.reject(e)}static resolve(t){return new th(((e,n)=>{e(t)}))}static reject(t){return new th(((e,n)=>{n(t)}))}static waitFor(t){return new th(((e,n)=>{let s=0,i=0,r=!1;t.forEach((t=>{++s,t.next((()=>{++i,r&&i===s&&e()}),(t=>n(t)))})),r=!0,i===s&&e()}))}static or(t){let e=th.resolve(!1);for(const n of t)e=e.next((t=>t?th.resolve(t):n()));return e}static forEach(t,e){const n=[];return t.forEach(((t,s)=>{n.push(e.call(this,t,s))})),this.waitFor(n)}}
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
 */function eh(t){return"IndexedDbTransactionError"===t.name}
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
class nh{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let e=0;e<this.mutations.length;e++){const s=this.mutations[e];s.key.isEqual(t.key)&&wo(s,t,n[e])}}applyToLocalView(t){for(const e of this.baseMutations)e.key.isEqual(t.key)&&Eo(e,t,this.localWriteTime);for(const e of this.mutations)e.key.isEqual(t.key)&&Eo(e,t,this.localWriteTime)}applyToLocalDocumentSet(t){this.mutations.forEach((e=>{const n=t.get(e.key),s=n;this.applyToLocalView(s),n.isValidDocument()||s.convertToNoDocument(Oi.min())}))}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),Wo())}isEqual(t){return this.batchId===t.batchId&&Ri(this.mutations,t.mutations,((t,e)=>bo(t,e)))&&Ri(this.baseMutations,t.baseMutations,((t,e)=>bo(t,e)))}}class sh{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){gi(t.mutations.length===n.length);let s=Go();const i=t.mutations;for(let t=0;t<i.length;t++)s=s.insert(i[t].key,n[t].version);return new sh(t,e,n,s)}}
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
 */class ih{constructor(t,e,n,s,i=Oi.min(),r=Oi.min(),o=ji.EMPTY_BYTE_STRING){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=r,this.resumeToken=o}withSequenceNumber(t){return new ih(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(t,e){return new ih(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t)}withLastLimboFreeSnapshotVersion(t){return new ih(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken)}}
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
 */class rh{constructor(t){this.Gt=t}}function oh(t){const e=Sa({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?Gr(e,e.limit,"L"):e}
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
class ah{constructor(){this.zt=new hh}addToCollectionParentIndex(t,e){return this.zt.add(e),th.resolve()}getCollectionParents(t,e){return th.resolve(this.zt.getEntries(e))}}class hh{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new Vo(Fi.comparator),i=!s.has(n);return this.index[e]=s.add(n),i}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new Vo(Fi.comparator)).toArray()}}
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
 */class ch{constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}static withCacheSize(t){return new ch(t,ch.DEFAULT_COLLECTION_PERCENTILE,ch.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}
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
 */ch.DEFAULT_COLLECTION_PERCENTILE=10,ch.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ch.DEFAULT=new ch(41943040,ch.DEFAULT_COLLECTION_PERCENTILE,ch.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ch.DISABLED=new ch(-1,0,0);
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
class uh{constructor(t){this.se=t}next(){return this.se+=2,this.se}static ie(){return new uh(0)}static re(){return new uh(-1)}}
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
async function lh(t){if(t.code!==yi.FAILED_PRECONDITION||t.message!==Ja)throw t;ui("LocalStore","Unexpectedly lost primary lease")}
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
class dh{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={}}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[e,s]of n)if(this.equalsFn(e,t))return s}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(void 0!==s){for(let n=0;n<s.length;n++)if(this.equalsFn(s[n][0],t))return void(s[n]=[t,e]);s.push([t,e])}else this.inner[n]=[[t,e]]}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return 1===n.length?delete this.inner[e]:n.splice(s,1),!0;return!1}forEach(t){Mi(this.inner,((e,n)=>{for(const[e,s]of n)t(e,s)}))}isEmpty(){return Pi(this.inner)}}
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
 */class fh{constructor(){this.changes=new dh((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}getReadTime(t){const e=this.changes.get(t);return e?e.readTime:Oi.min()}addEntry(t,e){this.assertNotApplied(),this.changes.set(t.key,{document:t,readTime:e})}removeEntry(t,e=null){this.assertNotApplied(),this.changes.set(t,{document:gr.newInvalidDocument(t),readTime:e})}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?th.resolve(n.document):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
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
class ph{constructor(t,e,n){this.Je=t,this.An=e,this.Jt=n}Rn(t,e){return this.An.getAllMutationBatchesAffectingDocumentKey(t,e).next((n=>this.Pn(t,e,n)))}Pn(t,e,n){return this.Je.getEntry(t,e).next((t=>{for(const e of n)e.applyToLocalView(t);return t}))}bn(t,e){t.forEach(((t,n)=>{for(const t of e)t.applyToLocalView(n)}))}vn(t,e){return this.Je.getEntries(t,e).next((e=>this.Vn(t,e).next((()=>e))))}Vn(t,e){return this.An.getAllMutationBatchesAffectingDocumentKeys(t,e).next((t=>this.bn(e,t)))}getDocumentsMatchingQuery(t,e,n){return s=e,Zi.isDocumentKey(s.path)&&null===s.collectionGroup&&0===s.filters.length?this.Sn(t,e.path):$r(e)?this.Dn(t,e,n):this.Cn(t,e,n);var s}Sn(t,e){return this.Rn(t,new Zi(e)).next((t=>{let e=Ko();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e}))}Dn(t,e,n){const s=e.collectionGroup;let i=Ko();return this.Jt.getCollectionParents(t,s).next((r=>th.forEach(r,(r=>{const o=(a=e,h=r.child(s),new Pr(h,null,a.explicitOrderBy.slice(),a.filters.slice(),a.limit,a.limitType,a.startAt,a.endAt));var a,h;return this.Cn(t,o,n).next((t=>{t.forEach(((t,e)=>{i=i.insert(t,e)}))}))})).next((()=>i))))}Cn(t,e,n){let s,i;return this.Je.getDocumentsMatchingQuery(t,e,n).next((n=>(s=n,this.An.getAllMutationBatchesAffectingQuery(t,e)))).next((e=>(i=e,this.Nn(t,i,s).next((t=>{s=t;for(const t of i)for(const e of t.mutations){const n=e.key;let i=s.get(n);null==i&&(i=gr.newInvalidDocument(n),s=s.insert(n,i)),Eo(e,i,t.localWriteTime),i.isFoundDocument()||(s=s.remove(n))}}))))).next((()=>(s.forEach(((t,n)=>{Xr(e,n)||(s=s.remove(t))})),s)))}Nn(t,e,n){let s=Wo();for(const t of e)for(const e of t.mutations)e instanceof So&&null===n.get(e.key)&&(s=s.add(e.key));let i=n;return this.Je.getEntries(t,s).next((t=>(t.forEach(((t,e)=>{e.isFoundDocument()&&(i=i.insert(t,e))})),i)))}}
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
 */class gh{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.kn=n,this.xn=s}static $n(t,e){let n=Wo(),s=Wo();for(const t of e.docChanges)switch(t.type){case 0:n=n.add(t.doc.key);break;case 1:s=s.add(t.doc.key)}return new gh(t,e.fromCache,n,s)}}
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
 */class mh{Fn(t){this.On=t}getDocumentsMatchingQuery(t,e,n,s){return 0===(i=e).filters.length&&null===i.limit&&null==i.startAt&&null==i.endAt&&(0===i.explicitOrderBy.length||1===i.explicitOrderBy.length&&i.explicitOrderBy[0].field.isKeyField())||n.isEqual(Oi.min())?this.Mn(t,e):this.On.vn(t,s).next((i=>{const r=this.Ln(e,i);return(Vr(e)||qr(e))&&this.Bn(e.limitType,r,s,n)?this.Mn(t,e):(ci()<=p.DEBUG&&ui("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),Qr(e)),this.On.getDocumentsMatchingQuery(t,e,n).next((t=>(r.forEach((e=>{t=t.insert(e.key,e)})),t))))}));var i}Ln(t,e){let n=new Vo(Yr(t));return e.forEach(((e,s)=>{Xr(t,s)&&(n=n.add(s))})),n}Bn(t,e,n,s){if(n.size!==e.size)return!0;const i="F"===t?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Mn(t,e){return ci()<=p.DEBUG&&ui("QueryEngine","Using full collection scan to execute query:",Qr(e)),this.On.getDocumentsMatchingQuery(t,e,Oi.min())}}
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
 */class yh{constructor(t,e,n,s){this.persistence=t,this.Un=e,this.k=s,this.qn=new Po(_i),this.Kn=new dh((t=>vr(t)),wr),this.jn=Oi.min(),this.An=t.getMutationQueue(n),this.Qn=t.getRemoteDocumentCache(),this.He=t.getTargetCache(),this.Wn=new ph(this.Qn,this.An,this.persistence.getIndexManager()),this.Ye=t.getBundleCache(),this.Un.Fn(this.Wn)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.qn)))}}function vh(t,e,n,s){return new yh(t,e,n,s)}async function wh(t,e){const n=mi(t);let s=n.An,i=n.Wn;const r=await n.persistence.runTransaction("Handle user change","readonly",(t=>{let r;return n.An.getAllMutationBatches(t).next((o=>(r=o,s=n.persistence.getMutationQueue(e),i=new ph(n.Qn,s,n.persistence.getIndexManager()),s.getAllMutationBatches(t)))).next((e=>{const n=[],s=[];let o=Wo();for(const t of r){n.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}for(const t of e){s.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}return i.vn(t,o).next((t=>({Gn:t,removedBatchIds:n,addedBatchIds:s})))}))}));return n.An=s,n.Wn=i,n.Un.Fn(n.Wn),r}function Eh(t){const e=mi(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.He.getLastRemoteSnapshotVersion(t)))}function Th(t,e,n,s,i){let r=Wo();return n.forEach((t=>r=r.add(t))),e.getEntries(t,r).next((t=>{let r=jo();return n.forEach(((n,o)=>{const a=t.get(n),h=(null==i?void 0:i.get(n))||s;o.isNoDocument()&&o.version.isEqual(Oi.min())?(e.removeEntry(n,h),r=r.insert(n,o)):!a.isValidDocument()||o.version.compareTo(a.version)>0||0===o.version.compareTo(a.version)&&a.hasPendingWrites?(e.addEntry(o,h),r=r.insert(n,o)):ui("LocalStore","Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",o.version)})),r}))}function bh(t,e){const n=mi(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(t=>(void 0===e&&(e=-1),n.An.getNextMutationBatchAfterBatchId(t,e))))}function Ih(t,e){const n=mi(t);return n.persistence.runTransaction("Allocate target","readwrite",(t=>{let s;return n.He.getTargetData(t,e).next((i=>i?(s=i,th.resolve(s)):n.He.allocateTargetId(t).next((i=>(s=new ih(e,i,0,t.currentSequenceNumber),n.He.addTargetData(t,s).next((()=>s)))))))})).then((t=>{const s=n.qn.get(t.targetId);return(null===s||t.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.qn=n.qn.insert(t.targetId,t),n.Kn.set(e,t.targetId)),t}))}async function Ah(t,e,n){const s=mi(t),i=s.qn.get(e),r=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",r,(t=>s.persistence.referenceDelegate.removeTarget(t,i)))}catch(t){if(!eh(t))throw t;ui("LocalStore",`Failed to update sequence numbers for target ${e}: ${t}`)}s.qn=s.qn.remove(e),s.Kn.delete(i.target)}function Sh(t,e,n){const s=mi(t);let i=Oi.min(),r=Wo();return s.persistence.runTransaction("Execute query","readonly",(t=>function(t,e,n){const s=mi(t),i=s.Kn.get(n);return void 0!==i?th.resolve(s.qn.get(i)):s.He.getTargetData(e,n)}(s,t,Hr(e)).next((e=>{if(e)return i=e.lastLimboFreeSnapshotVersion,s.He.getMatchingKeysForTargetId(t,e.targetId).next((t=>{r=t}))})).next((()=>s.Un.getDocumentsMatchingQuery(t,e,n?i:Oi.min(),n?r:Wo()))).next((t=>({documents:t,zn:r})))))}
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
class Ch{constructor(t){this.k=t,this.Xn=new Map,this.Zn=new Map}getBundleMetadata(t,e){return th.resolve(this.Xn.get(e))}saveBundleMetadata(t,e){var n;return this.Xn.set(e.id,{id:(n=e).id,version:n.version,createTime:da(n.createTime)}),th.resolve()}getNamedQuery(t,e){return th.resolve(this.Zn.get(e))}saveNamedQuery(t,e){return this.Zn.set(e.name,{name:(n=e).name,query:oh(n.bundledQuery),readTime:da(n.readTime)}),th.resolve();var n}}
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
 */class kh{constructor(){this.ts=new Vo(Nh.es),this.ns=new Vo(Nh.ss)}isEmpty(){return this.ts.isEmpty()}addReference(t,e){const n=new Nh(t,e);this.ts=this.ts.add(n),this.ns=this.ns.add(n)}rs(t,e){t.forEach((t=>this.addReference(t,e)))}removeReference(t,e){this.os(new Nh(t,e))}cs(t,e){t.forEach((t=>this.removeReference(t,e)))}us(t){const e=new Zi(new Fi([])),n=new Nh(e,t),s=new Nh(e,t+1),i=[];return this.ns.forEachInRange([n,s],(t=>{this.os(t),i.push(t.key)})),i}hs(){this.ts.forEach((t=>this.os(t)))}os(t){this.ts=this.ts.delete(t),this.ns=this.ns.delete(t)}ls(t){const e=new Zi(new Fi([])),n=new Nh(e,t),s=new Nh(e,t+1);let i=Wo();return this.ns.forEachInRange([n,s],(t=>{i=i.add(t.key)})),i}containsKey(t){const e=new Nh(t,0),n=this.ts.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class Nh{constructor(t,e){this.key=t,this.fs=e}static es(t,e){return Zi.comparator(t.key,e.key)||_i(t.fs,e.fs)}static ss(t,e){return _i(t.fs,e.fs)||Zi.comparator(t.key,e.key)}}
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
 */class Dh{constructor(t,e){this.Jt=t,this.referenceDelegate=e,this.An=[],this.ds=1,this.ws=new Vo(Nh.es)}checkEmpty(t){return th.resolve(0===this.An.length)}addMutationBatch(t,e,n,s){const i=this.ds;this.ds++,this.An.length>0&&this.An[this.An.length-1];const r=new nh(i,e,n,s);this.An.push(r);for(const e of s)this.ws=this.ws.add(new Nh(e.key,i)),this.Jt.addToCollectionParentIndex(t,e.key.path.popLast());return th.resolve(r)}lookupMutationBatch(t,e){return th.resolve(this._s(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.gs(n),i=s<0?0:s;return th.resolve(this.An.length>i?this.An[i]:null)}getHighestUnacknowledgedBatchId(){return th.resolve(0===this.An.length?-1:this.ds-1)}getAllMutationBatches(t){return th.resolve(this.An.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new Nh(e,0),s=new Nh(e,Number.POSITIVE_INFINITY),i=[];return this.ws.forEachInRange([n,s],(t=>{const e=this._s(t.fs);i.push(e)})),th.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new Vo(_i);return e.forEach((t=>{const e=new Nh(t,0),s=new Nh(t,Number.POSITIVE_INFINITY);this.ws.forEachInRange([e,s],(t=>{n=n.add(t.fs)}))})),th.resolve(this.ys(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let i=n;Zi.isDocumentKey(i)||(i=i.child(""));const r=new Nh(new Zi(i),0);let o=new Vo(_i);return this.ws.forEachWhile((t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===s&&(o=o.add(t.fs)),!0)}),r),th.resolve(this.ys(o))}ys(t){const e=[];return t.forEach((t=>{const n=this._s(t);null!==n&&e.push(n)})),e}removeMutationBatch(t,e){gi(0===this.ps(e.batchId,"removed")),this.An.shift();let n=this.ws;return th.forEach(e.mutations,(s=>{const i=new Nh(s.key,e.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.ws=n}))}ee(t){}containsKey(t,e){const n=new Nh(e,0),s=this.ws.firstAfterOrEqual(n);return th.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.An.length,th.resolve()}ps(t,e){return this.gs(t)}gs(t){return 0===this.An.length?0:t-this.An[0].batchId}_s(t){const e=this.gs(t);return e<0||e>=this.An.length?null:this.An[e]}}
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
 */class _h{constructor(t,e){this.Jt=t,this.Ts=e,this.docs=new Po(Zi.comparator),this.size=0}addEntry(t,e,n){const s=e.key,i=this.docs.get(s),r=i?i.size:0,o=this.Ts(e);return this.docs=this.docs.insert(s,{document:e.clone(),size:o,readTime:n}),this.size+=o-r,this.Jt.addToCollectionParentIndex(t,s.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return th.resolve(n?n.document.clone():gr.newInvalidDocument(e))}getEntries(t,e){let n=jo();return e.forEach((t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.clone():gr.newInvalidDocument(t))})),th.resolve(n)}getDocumentsMatchingQuery(t,e,n){let s=jo();const i=new Zi(e.path.child("")),r=this.docs.getIteratorFrom(i);for(;r.hasNext();){const{key:t,value:{document:i,readTime:o}}=r.getNext();if(!e.path.isPrefixOf(t.path))break;o.compareTo(n)<=0||Xr(e,i)&&(s=s.insert(i.key,i.clone()))}return th.resolve(s)}Es(t,e){return th.forEach(this.docs,(t=>e(t)))}newChangeBuffer(t){return new Rh(this)}getSize(t){return th.resolve(this.size)}}class Rh extends fh{constructor(t){super(),this.De=t}applyChanges(t){const e=[];return this.changes.forEach(((n,s)=>{s.document.isValidDocument()?e.push(this.De.addEntry(t,s.document,this.getReadTime(n))):this.De.removeEntry(n)})),th.waitFor(e)}getFromCache(t,e){return this.De.getEntry(t,e)}getAllFromCache(t,e){return this.De.getEntries(t,e)}}
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
 */class Lh{constructor(t){this.persistence=t,this.Is=new dh((t=>vr(t)),wr),this.lastRemoteSnapshotVersion=Oi.min(),this.highestTargetId=0,this.As=0,this.Rs=new kh,this.targetCount=0,this.Ps=uh.ie()}forEachTarget(t,e){return this.Is.forEach(((t,n)=>e(n))),th.resolve()}getLastRemoteSnapshotVersion(t){return th.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return th.resolve(this.As)}allocateTargetId(t){return this.highestTargetId=this.Ps.next(),th.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.As&&(this.As=e),th.resolve()}ce(t){this.Is.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.Ps=new uh(e),this.highestTargetId=e),t.sequenceNumber>this.As&&(this.As=t.sequenceNumber)}addTargetData(t,e){return this.ce(e),this.targetCount+=1,th.resolve()}updateTargetData(t,e){return this.ce(e),th.resolve()}removeTargetData(t,e){return this.Is.delete(e.target),this.Rs.us(e.targetId),this.targetCount-=1,th.resolve()}removeTargets(t,e,n){let s=0;const i=[];return this.Is.forEach(((r,o)=>{o.sequenceNumber<=e&&null===n.get(o.targetId)&&(this.Is.delete(r),i.push(this.removeMatchingKeysForTargetId(t,o.targetId)),s++)})),th.waitFor(i).next((()=>s))}getTargetCount(t){return th.resolve(this.targetCount)}getTargetData(t,e){const n=this.Is.get(e)||null;return th.resolve(n)}addMatchingKeys(t,e,n){return this.Rs.rs(e,n),th.resolve()}removeMatchingKeys(t,e,n){this.Rs.cs(e,n);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach((e=>{i.push(s.markPotentiallyOrphaned(t,e))})),th.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this.Rs.us(e),th.resolve()}getMatchingKeysForTargetId(t,e){const n=this.Rs.ls(e);return th.resolve(n)}containsKey(t,e){return th.resolve(this.Rs.containsKey(e))}}
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
 */class Oh{constructor(t,e){var n,s;this.bs={},this.Be=new ki(0),this.Ue=!1,this.Ue=!0,this.referenceDelegate=t(this),this.He=new Lh(this),this.Jt=new ah,this.Je=(n=this.Jt,s=t=>this.referenceDelegate.vs(t),new _h(n,s)),this.k=new rh(e),this.Ye=new Ch(this.k)}start(){return Promise.resolve()}shutdown(){return this.Ue=!1,Promise.resolve()}get started(){return this.Ue}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(){return this.Jt}getMutationQueue(t){let e=this.bs[t.toKey()];return e||(e=new Dh(this.Jt,this.referenceDelegate),this.bs[t.toKey()]=e),e}getTargetCache(){return this.He}getRemoteDocumentCache(){return this.Je}getBundleCache(){return this.Ye}runTransaction(t,e,n){ui("MemoryPersistence","Starting transaction:",t);const s=new xh(this.Be.next());return this.referenceDelegate.Vs(),n(s).next((t=>this.referenceDelegate.Ss(s).next((()=>t)))).toPromise().then((t=>(s.raiseOnCommittedEvent(),t)))}Ds(t,e){return th.or(Object.values(this.bs).map((n=>()=>n.containsKey(t,e))))}}class xh extends Za{constructor(t){super(),this.currentSequenceNumber=t}}class Mh{constructor(t){this.persistence=t,this.Cs=new kh,this.Ns=null}static ks(t){return new Mh(t)}get xs(){if(this.Ns)return this.Ns;throw pi()}addReference(t,e,n){return this.Cs.addReference(n,e),this.xs.delete(n.toString()),th.resolve()}removeReference(t,e,n){return this.Cs.removeReference(n,e),this.xs.add(n.toString()),th.resolve()}markPotentiallyOrphaned(t,e){return this.xs.add(e.toString()),th.resolve()}removeTarget(t,e){this.Cs.us(e.targetId).forEach((t=>this.xs.add(t.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((t=>{t.forEach((t=>this.xs.add(t.toString())))})).next((()=>n.removeTargetData(t,e)))}Vs(){this.Ns=new Set}Ss(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return th.forEach(this.xs,(n=>{const s=Zi.fromPath(n);return this.$s(t,s).next((t=>{t||e.removeEntry(s)}))})).next((()=>(this.Ns=null,e.apply(t))))}updateLimboDocument(t,e){return this.$s(t,e).next((t=>{t?this.xs.delete(e.toString()):this.xs.add(e.toString())}))}vs(t){return 0}$s(t,e){return th.or([()=>th.resolve(this.Cs.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ds(t,e)])}}
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
 */class Ph{constructor(){this.activeTargetIds=Xo()}Ms(t){this.activeTargetIds=this.activeTargetIds.add(t)}Ls(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Os(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Uh{constructor(){this.pi=new Ph,this.Ti={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t){return this.pi.Ms(t),this.Ti[t]||"not-current"}updateQueryState(t,e,n){this.Ti[t]=e}removeLocalQueryTarget(t){this.pi.Ls(t)}isLocalQueryTarget(t){return this.pi.activeTargetIds.has(t)}clearQueryState(t){delete this.Ti[t]}getAllActiveQueryTargets(){return this.pi.activeTargetIds}isActiveQueryTarget(t){return this.pi.activeTargetIds.has(t)}start(){return this.pi=new Ph,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(){}}
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
 */class Fh{Ei(t){}shutdown(){}}
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
 */class Vh{constructor(){this.Ii=()=>this.Ai(),this.Ri=()=>this.Pi(),this.bi=[],this.vi()}Ei(t){this.bi.push(t)}shutdown(){window.removeEventListener("online",this.Ii),window.removeEventListener("offline",this.Ri)}vi(){window.addEventListener("online",this.Ii),window.addEventListener("offline",this.Ri)}Ai(){ui("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.bi)t(0)}Pi(){ui("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.bi)t(1)}static bt(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
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
 */const qh={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};
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
 */class Bh{constructor(t){this.Vi=t.Vi,this.Si=t.Si}Di(t){this.Ci=t}Ni(t){this.ki=t}onMessage(t){this.xi=t}close(){this.Si()}send(t){this.Vi(t)}$i(){this.Ci()}Fi(t){this.ki(t)}Oi(t){this.xi(t)}}
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
 */class jh extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http";this.Mi=e+"://"+t.host,this.Li="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}Bi(t,e,n,s,i){const r=this.Ui(t,e);ui("RestConnection","Sending: ",r,n);const o={};return this.qi(o,s,i),this.Ki(t,r,o,n).then((t=>(ui("RestConnection","Received: ",t),t)),(e=>{throw di("RestConnection",`${t} failed with error: `,e,"url: ",r,"request:",n),e}))}ji(t,e,n,s,i){return this.Bi(t,e,n,s,i)}qi(t,e,n){t["X-Goog-Api-Client"]="gl-js/ fire/"+ai,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((e,n)=>t[n]=e)),n&&n.headers.forEach(((e,n)=>t[n]=e))}Ui(t,e){const n=qh[t];return`${this.Mi}/v1/${e}:${n}`}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams}Ki(t,e,n,s){return new Promise(((i,r)=>{const o=new zs;o.listenOnce(js.COMPLETE,(()=>{try{switch(o.getLastErrorCode()){case Bs.NO_ERROR:const e=o.getResponseJson();ui("Connection","XHR received:",JSON.stringify(e)),i(e);break;case Bs.TIMEOUT:ui("Connection",'RPC "'+t+'" timed out'),r(new vi(yi.DEADLINE_EXCEEDED,"Request time out"));break;case Bs.HTTP_ERROR:const n=o.getStatus();if(ui("Connection",'RPC "'+t+'" failed with status:',n,"response text:",o.getResponseText()),n>0){const t=o.getResponseJson().error;if(t&&t.status&&t.message){const e=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(yi).indexOf(e)>=0?e:yi.UNKNOWN}(t.status);r(new vi(e,t.message))}else r(new vi(yi.UNKNOWN,"Server responded with status "+o.getStatus()))}else r(new vi(yi.UNAVAILABLE,"Connection failed."));break;default:pi()}}finally{ui("Connection",'RPC "'+t+'" completed.')}}));const a=JSON.stringify(s);o.send(e,"POST",a,n,15)}))}Qi(t,e,n){const i=[this.Mi,"/","google.firestore.v1.Firestore","/",t,"/channel"],r=Vs(),o=qs(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(a.xmlHttpFactory=new Hs({})),this.qi(a.initMessageHeaders,e,n),"undefined"!=typeof window&&(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(s())||"object"==typeof navigator&&"ReactNative"===navigator.product||s().indexOf("Electron/")>=0||function(){const t=s();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}()||s().indexOf("MSAppHost/")>=0||function(){const t="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof t&&void 0!==t.id}()||(a.httpHeadersOverwriteParam="$httpHeaders");const h=i.join("");ui("Connection","Creating WebChannel: "+h,a);const c=r.createWebChannel(h,a);let u=!1,l=!1;const d=new Bh({Vi:t=>{l?ui("Connection","Not sending because WebChannel is closed:",t):(u||(ui("Connection","Opening WebChannel transport."),c.open(),u=!0),ui("Connection","WebChannel sending:",t),c.send(t))},Si:()=>c.close()}),f=(t,e,n)=>{t.listen(e,(t=>{try{n(t)}catch(t){setTimeout((()=>{throw t}),0)}}))};return f(c,Gs.EventType.OPEN,(()=>{l||ui("Connection","WebChannel transport opened.")})),f(c,Gs.EventType.CLOSE,(()=>{l||(l=!0,ui("Connection","WebChannel transport closed"),d.Fi())})),f(c,Gs.EventType.ERROR,(t=>{l||(l=!0,di("Connection","WebChannel transport errored:",t),d.Fi(new vi(yi.UNAVAILABLE,"The operation could not be completed")))})),f(c,Gs.EventType.MESSAGE,(t=>{var e;if(!l){const n=t.data[0];gi(!!n);const s=n,i=s.error||(null===(e=s[0])||void 0===e?void 0:e.error);if(i){ui("Connection","WebChannel received error:",i);const t=i.status;let e=function(t){const e=Lo[t];if(void 0!==e)return Mo(e)}(t),n=i.message;void 0===e&&(e=yi.INTERNAL,n="Unknown error status: "+t+" with message "+i.message),l=!0,d.Fi(new vi(e,n)),c.close()}else ui("Connection","WebChannel received:",n),d.Oi(n)}})),f(o,$s.STAT_EVENT,(t=>{t.stat===Ks.PROXY?ui("Connection","Detected buffering proxy"):t.stat===Ks.NOPROXY&&ui("Connection","Detected no buffering proxy")})),setTimeout((()=>{d.$i()}),0),d}}
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
 */function $h(){return"undefined"!=typeof document?document:null}
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
 */function Kh(t){return new ha(t,!0)}class Hh{constructor(t,e,n=1e3,s=1.5,i=6e4){this.Oe=t,this.timerId=e,this.Wi=n,this.Gi=s,this.zi=i,this.Hi=0,this.Ji=null,this.Yi=Date.now(),this.reset()}reset(){this.Hi=0}Xi(){this.Hi=this.zi}Zi(t){this.cancel();const e=Math.floor(this.Hi+this.tr()),n=Math.max(0,Date.now()-this.Yi),s=Math.max(0,e-n);s>0&&ui("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Hi} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.Ji=this.Oe.enqueueAfterDelay(this.timerId,s,(()=>(this.Yi=Date.now(),t()))),this.Hi*=this.Gi,this.Hi<this.Wi&&(this.Hi=this.Wi),this.Hi>this.zi&&(this.Hi=this.zi)}er(){null!==this.Ji&&(this.Ji.skipDelay(),this.Ji=null)}cancel(){null!==this.Ji&&(this.Ji.cancel(),this.Ji=null)}tr(){return(Math.random()-.5)*this.Hi}}
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
 */class Gh{constructor(t,e,n,s,i,r,o,a){this.Oe=t,this.nr=n,this.sr=s,this.ir=i,this.authCredentialsProvider=r,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.rr=0,this.ar=null,this.cr=null,this.stream=null,this.ur=new Hh(t,e)}hr(){return 1===this.state||5===this.state||this.lr()}lr(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.dr()}async stop(){this.hr()&&await this.close(0)}wr(){this.state=0,this.ur.reset()}_r(){this.lr()&&null===this.ar&&(this.ar=this.Oe.enqueueAfterDelay(this.nr,6e4,(()=>this.mr())))}gr(t){this.yr(),this.stream.send(t)}async mr(){if(this.lr())return this.close(0)}yr(){this.ar&&(this.ar.cancel(),this.ar=null)}pr(){this.cr&&(this.cr.cancel(),this.cr=null)}async close(t,e){this.yr(),this.pr(),this.ur.cancel(),this.rr++,4!==t?this.ur.reset():e&&e.code===yi.RESOURCE_EXHAUSTED?(li(e.toString()),li("Using maximum backoff delay to prevent overloading the backend."),this.ur.Xi()):e&&e.code===yi.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.Tr(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Ni(e)}Tr(){}auth(){this.state=1;const t=this.Er(this.rr),e=this.rr;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([t,n])=>{this.rr===e&&this.Ir(t,n)}),(e=>{t((()=>{const t=new vi(yi.UNKNOWN,"Fetching auth token failed: "+e.message);return this.Ar(t)}))}))}Ir(t,e){const n=this.Er(this.rr);this.stream=this.Rr(t,e),this.stream.Di((()=>{n((()=>(this.state=2,this.cr=this.Oe.enqueueAfterDelay(this.sr,1e4,(()=>(this.lr()&&(this.state=3),Promise.resolve()))),this.listener.Di())))})),this.stream.Ni((t=>{n((()=>this.Ar(t)))})),this.stream.onMessage((t=>{n((()=>this.onMessage(t)))}))}dr(){this.state=5,this.ur.Zi((async()=>{this.state=0,this.start()}))}Ar(t){return ui("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}Er(t){return e=>{this.Oe.enqueueAndForget((()=>this.rr===t?e():(ui("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class zh extends Gh{constructor(t,e,n,s,i,r){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,r),this.k=i}Rr(t,e){return this.ir.Qi("Listen",t,e)}onMessage(t){this.ur.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const i="NO_CHANGE"===(s=e.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===s?1:"REMOVE"===s?2:"CURRENT"===s?3:"RESET"===s?4:pi(),r=e.targetChange.targetIds||[],o=function(t,e){return t.C?(gi(void 0===e||"string"==typeof e),ji.fromBase64String(e||"")):(gi(void 0===e||e instanceof Uint8Array),ji.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),a=e.targetChange.cause,h=a&&function(t){const e=void 0===t.code?yi.UNKNOWN:Mo(t.code);return new vi(e,t.message||"")}(a);n=new ea(i,r,o,h||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const i=ma(t,s.document.name),r=da(s.document.updateTime),o=new fr({mapValue:{fields:s.document.fields}}),a=gr.newFoundDocument(i,r,o),h=s.targetIds||[],c=s.removedTargetIds||[];n=new Zo(h,c,a.key,a)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const i=ma(t,s.document),r=s.readTime?da(s.readTime):Oi.min(),o=gr.newNoDocument(i,r),a=s.removedTargetIds||[];n=new Zo([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const i=ma(t,s.document),r=s.removedTargetIds||[];n=new Zo([],r,i,null)}else{if(!("filter"in e))return pi();{e.filter;const t=e.filter;t.targetId;const s=t.count||0,i=new Ro(s),r=t.targetId;n=new ta(r,i)}}var s;return n}(this.k,t),n=function(t){if(!("targetChange"in t))return Oi.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?Oi.min():e.readTime?da(e.readTime):Oi.min()}(t);return this.listener.Pr(e,n)}br(t){const e={};e.database=wa(this.k),e.addTarget=function(t,e){let n;const s=e.target;return n=Er(s)?{documents:Ia(t,s)}:{query:Aa(t,s)},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0?n.resumeToken=ua(t,e.resumeToken):e.snapshotVersion.compareTo(Oi.min())>0&&(n.readTime=ca(t,e.snapshotVersion.toTimestamp())),n}(this.k,t);const n=function(t,e){const n=function(t,e){switch(e){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return pi()}}(0,e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.k,t);n&&(e.labels=n),this.gr(e)}vr(t){const e={};e.database=wa(this.k),e.removeTarget=t,this.gr(e)}}class Wh extends Gh{constructor(t,e,n,s,i,r){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,r),this.k=i,this.Vr=!1}get Sr(){return this.Vr}start(){this.Vr=!1,this.lastStreamToken=void 0,super.start()}Tr(){this.Vr&&this.Dr([])}Rr(t,e){return this.ir.Qi("Write",t,e)}onMessage(t){if(gi(!!t.streamToken),this.lastStreamToken=t.streamToken,this.Vr){this.ur.reset();const s=(e=t.writeResults,n=t.commitTime,e&&e.length>0?(gi(void 0!==n),e.map((t=>function(t,e){let n=t.updateTime?da(t.updateTime):da(e);return n.isEqual(Oi.min())&&(n=da(e)),new go(n,t.transformResults||[])}(t,n)))):[]),i=da(t.commitTime);return this.listener.Cr(i,s)}var e,n;return gi(!t.writeResults||0===t.writeResults.length),this.Vr=!0,this.listener.Nr()}kr(){const t={};t.database=wa(this.k),this.gr(t)}Dr(t){const e={streamToken:this.lastStreamToken,writes:t.map((t=>ba(this.k,t)))};this.gr(e)}}
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
 */class Qh extends class{}{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.ir=n,this.k=s,this.$r=!1}Fr(){if(this.$r)throw new vi(yi.FAILED_PRECONDITION,"The client has already been terminated.")}Bi(t,e,n){return this.Fr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,i])=>this.ir.Bi(t,e,n,s,i))).catch((t=>{throw"FirebaseError"===t.name?(t.code===yi.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new vi(yi.UNKNOWN,t.toString())}))}ji(t,e,n){return this.Fr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,i])=>this.ir.ji(t,e,n,s,i))).catch((t=>{throw"FirebaseError"===t.name?(t.code===yi.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new vi(yi.UNKNOWN,t.toString())}))}terminate(){this.$r=!0}}class Xh{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.Or=0,this.Mr=null,this.Lr=!0}Br(){0===this.Or&&(this.Ur("Unknown"),this.Mr=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.Mr=null,this.qr("Backend didn't respond within 10 seconds."),this.Ur("Offline"),Promise.resolve()))))}Kr(t){"Online"===this.state?this.Ur("Unknown"):(this.Or++,this.Or>=1&&(this.jr(),this.qr(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.Ur("Offline")))}set(t){this.jr(),this.Or=0,"Online"===t&&(this.Lr=!1),this.Ur(t)}Ur(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}qr(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Lr?(li(e),this.Lr=!1):ui("OnlineStateTracker",e)}jr(){null!==this.Mr&&(this.Mr.cancel(),this.Mr=null)}}
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
 */class Yh{constructor(t,e,n,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Qr=[],this.Wr=new Map,this.Gr=new Set,this.zr=[],this.Hr=i,this.Hr.Ei((t=>{n.enqueueAndForget((async()=>{oc(this)&&(ui("RemoteStore","Restarting streams for network reachability change."),await async function(t){const e=mi(t);e.Gr.add(4),await Zh(e),e.Jr.set("Unknown"),e.Gr.delete(4),await Jh(e)}(this))}))})),this.Jr=new Xh(n,s)}}async function Jh(t){if(oc(t))for(const e of t.zr)await e(!0)}async function Zh(t){for(const e of t.zr)await e(!1)}function tc(t,e){const n=mi(t);n.Wr.has(e.targetId)||(n.Wr.set(e.targetId,e),rc(n)?ic(n):Ic(n).lr()&&nc(n,e))}function ec(t,e){const n=mi(t),s=Ic(n);n.Wr.delete(e),s.lr()&&sc(n,e),0===n.Wr.size&&(s.lr()?s._r():oc(n)&&n.Jr.set("Unknown"))}function nc(t,e){t.Yr.X(e.targetId),Ic(t).br(e)}function sc(t,e){t.Yr.X(e),Ic(t).vr(e)}function ic(t){t.Yr=new sa({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>t.Wr.get(e)||null}),Ic(t).start(),t.Jr.Br()}function rc(t){return oc(t)&&!Ic(t).hr()&&t.Wr.size>0}function oc(t){return 0===mi(t).Gr.size}function ac(t){t.Yr=void 0}async function hc(t){t.Wr.forEach(((e,n)=>{nc(t,e)}))}async function cc(t,e){ac(t),rc(t)?(t.Jr.Kr(e),ic(t)):t.Jr.set("Unknown")}async function uc(t,e,n){if(t.Jr.set("Online"),e instanceof ea&&2===e.state&&e.cause)try{await async function(t,e){const n=e.cause;for(const s of e.targetIds)t.Wr.has(s)&&(await t.remoteSyncer.rejectListen(s,n),t.Wr.delete(s),t.Yr.removeTarget(s))}(t,e)}catch(n){ui("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await lc(t,n)}else if(e instanceof Zo?t.Yr.ot(e):e instanceof ta?t.Yr.dt(e):t.Yr.ut(e),!n.isEqual(Oi.min()))try{const e=await Eh(t.localStore);n.compareTo(e)>=0&&await function(t,e){const n=t.Yr.gt(e);return n.targetChanges.forEach(((n,s)=>{if(n.resumeToken.approximateByteSize()>0){const i=t.Wr.get(s);i&&t.Wr.set(s,i.withResumeToken(n.resumeToken,e))}})),n.targetMismatches.forEach((e=>{const n=t.Wr.get(e);if(!n)return;t.Wr.set(e,n.withResumeToken(ji.EMPTY_BYTE_STRING,n.snapshotVersion)),sc(t,e);const s=new ih(n.target,e,1,n.sequenceNumber);nc(t,s)})),t.remoteSyncer.applyRemoteEvent(n)}(t,n)}catch(e){ui("RemoteStore","Failed to raise snapshot:",e),await lc(t,e)}}async function lc(t,e,n){if(!eh(e))throw e;t.Gr.add(1),await Zh(t),t.Jr.set("Offline"),n||(n=()=>Eh(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{ui("RemoteStore","Retrying IndexedDB access"),await n(),t.Gr.delete(1),await Jh(t)}))}function dc(t,e){return e().catch((n=>lc(t,n,e)))}async function fc(t){const e=mi(t),n=Ac(e);let s=e.Qr.length>0?e.Qr[e.Qr.length-1].batchId:-1;for(;pc(e);)try{const t=await bh(e.localStore,s);if(null===t){0===e.Qr.length&&n._r();break}s=t.batchId,gc(e,t)}catch(t){await lc(e,t)}mc(e)&&yc(e)}function pc(t){return oc(t)&&t.Qr.length<10}function gc(t,e){t.Qr.push(e);const n=Ac(t);n.lr()&&n.Sr&&n.Dr(e.mutations)}function mc(t){return oc(t)&&!Ac(t).hr()&&t.Qr.length>0}function yc(t){Ac(t).start()}async function vc(t){Ac(t).kr()}async function wc(t){const e=Ac(t);for(const n of t.Qr)e.Dr(n.mutations)}async function Ec(t,e,n){const s=t.Qr.shift(),i=sh.from(s,e,n);await dc(t,(()=>t.remoteSyncer.applySuccessfulWrite(i))),await fc(t)}async function Tc(t,e){e&&Ac(t).Sr&&await async function(t,e){if(xo(n=e.code)&&n!==yi.ABORTED){const n=t.Qr.shift();Ac(t).wr(),await dc(t,(()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e))),await fc(t)}var n}(t,e),mc(t)&&yc(t)}async function bc(t,e){const n=mi(t);e?(n.Gr.delete(2),await Jh(n)):e||(n.Gr.add(2),await Zh(n),n.Jr.set("Unknown"))}function Ic(t){return t.Xr||(t.Xr=function(t,e,n){const s=mi(t);return s.Fr(),new zh(e,s.ir,s.authCredentials,s.appCheckCredentials,s.k,n)}(t.datastore,t.asyncQueue,{Di:hc.bind(null,t),Ni:cc.bind(null,t),Pr:uc.bind(null,t)}),t.zr.push((async e=>{e?(t.Xr.wr(),rc(t)?ic(t):t.Jr.set("Unknown")):(await t.Xr.stop(),ac(t))}))),t.Xr}function Ac(t){return t.Zr||(t.Zr=function(t,e,n){const s=mi(t);return s.Fr(),new Wh(e,s.ir,s.authCredentials,s.appCheckCredentials,s.k,n)}(t.datastore,t.asyncQueue,{Di:vc.bind(null,t),Ni:Tc.bind(null,t),Nr:wc.bind(null,t),Cr:Ec.bind(null,t)}),t.zr.push((async e=>{e?(t.Zr.wr(),await fc(t)):(await t.Zr.stop(),t.Qr.length>0&&(ui("RemoteStore",`Stopping write stream with ${t.Qr.length} pending writes`),t.Qr=[]))}))),t.Zr
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
 */}class Sc{constructor(t,e,n,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new wi,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((t=>{}))}static createAndSchedule(t,e,n,s,i){const r=Date.now()+n,o=new Sc(t,e,r,s,i);return o.start(n),o}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new vi(yi.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Cc(t,e){if(li("AsyncQueue",`${e}: ${t}`),eh(t))return new vi(yi.UNAVAILABLE,`${e}: ${t}`);throw t}
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
 */class kc{constructor(t){this.comparator=t?(e,n)=>t(e,n)||Zi.comparator(e.key,n.key):(t,e)=>Zi.comparator(t.key,e.key),this.keyedMap=Ko(),this.sortedSet=new Po(this.comparator)}static emptySet(t){return new kc(t.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,n)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof kc))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,s=n.getNext().key;if(!t.isEqual(s))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new kc;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
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
 */class Nc{constructor(){this.eo=new Po(Zi.comparator)}track(t){const e=t.doc.key,n=this.eo.get(e);n?0!==t.type&&3===n.type?this.eo=this.eo.insert(e,t):3===t.type&&1!==n.type?this.eo=this.eo.insert(e,{type:n.type,doc:t.doc}):2===t.type&&2===n.type?this.eo=this.eo.insert(e,{type:2,doc:t.doc}):2===t.type&&0===n.type?this.eo=this.eo.insert(e,{type:0,doc:t.doc}):1===t.type&&0===n.type?this.eo=this.eo.remove(e):1===t.type&&2===n.type?this.eo=this.eo.insert(e,{type:1,doc:n.doc}):0===t.type&&1===n.type?this.eo=this.eo.insert(e,{type:2,doc:t.doc}):pi():this.eo=this.eo.insert(e,t)}no(){const t=[];return this.eo.inorderTraversal(((e,n)=>{t.push(n)})),t}}class Dc{constructor(t,e,n,s,i,r,o,a){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=r,this.syncStateChanged=o,this.excludesMetadataChanges=a}static fromInitialDocuments(t,e,n,s){const i=[];return e.forEach((t=>{i.push({type:0,doc:t})})),new Dc(t,e,kc.emptySet(e),i,n,s,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&zr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t].type!==n[t].type||!e[t].doc.isEqual(n[t].doc))return!1;return!0}}
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
 */class _c{constructor(){this.so=void 0,this.listeners=[]}}class Rc{constructor(){this.queries=new dh((t=>Wr(t)),zr),this.onlineState="Unknown",this.io=new Set}}async function Lc(t,e){const n=mi(t),s=e.query;let i=!1,r=n.queries.get(s);if(r||(i=!0,r=new _c),i)try{r.so=await n.onListen(s)}catch(t){const n=Cc(t,`Initialization of query '${Qr(e.query)}' failed`);return void e.onError(n)}n.queries.set(s,r),r.listeners.push(e),e.ro(n.onlineState),r.so&&e.oo(r.so)&&Pc(n)}async function Oc(t,e){const n=mi(t),s=e.query;let i=!1;const r=n.queries.get(s);if(r){const t=r.listeners.indexOf(e);t>=0&&(r.listeners.splice(t,1),i=0===r.listeners.length)}if(i)return n.queries.delete(s),n.onUnlisten(s)}function xc(t,e){const n=mi(t);let s=!1;for(const t of e){const e=t.query,i=n.queries.get(e);if(i){for(const e of i.listeners)e.oo(t)&&(s=!0);i.so=t}}s&&Pc(n)}function Mc(t,e,n){const s=mi(t),i=s.queries.get(e);if(i)for(const t of i.listeners)t.onError(n);s.queries.delete(e)}function Pc(t){t.io.forEach((t=>{t.next()}))}class Uc{constructor(t,e,n){this.query=t,this.ao=e,this.co=!1,this.uo=null,this.onlineState="Unknown",this.options=n||{}}oo(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new Dc(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0)}let e=!1;return this.co?this.ho(t)&&(this.ao.next(t),e=!0):this.lo(t,this.onlineState)&&(this.fo(t),e=!0),this.uo=t,e}onError(t){this.ao.error(t)}ro(t){this.onlineState=t;let e=!1;return this.uo&&!this.co&&this.lo(this.uo,t)&&(this.fo(this.uo),e=!0),e}lo(t,e){if(!t.fromCache)return!0;const n="Offline"!==e;return!(this.options.wo&&n||t.docs.isEmpty()&&"Offline"!==e)}ho(t){if(t.docChanges.length>0)return!0;const e=this.uo&&this.uo.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}fo(t){t=Dc.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache),this.co=!0,this.ao.next(t)}}
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
class Fc{constructor(t){this.key=t}}class Vc{constructor(t){this.key=t}}class qc{constructor(t,e){this.query=t,this.To=e,this.Eo=null,this.current=!1,this.Io=Wo(),this.mutatedKeys=Wo(),this.Ao=Yr(t),this.Ro=new kc(this.Ao)}get Po(){return this.To}bo(t,e){const n=e?e.vo:new Nc,s=e?e.Ro:this.Ro;let i=e?e.mutatedKeys:this.mutatedKeys,r=s,o=!1;const a=Vr(this.query)&&s.size===this.query.limit?s.last():null,h=qr(this.query)&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((t,e)=>{const c=s.get(t),u=Xr(this.query,e)?e:null,l=!!c&&this.mutatedKeys.has(c.key),d=!!u&&(u.hasLocalMutations||this.mutatedKeys.has(u.key)&&u.hasCommittedMutations);let f=!1;c&&u?c.data.isEqual(u.data)?l!==d&&(n.track({type:3,doc:u}),f=!0):this.Vo(c,u)||(n.track({type:2,doc:u}),f=!0,(a&&this.Ao(u,a)>0||h&&this.Ao(u,h)<0)&&(o=!0)):!c&&u?(n.track({type:0,doc:u}),f=!0):c&&!u&&(n.track({type:1,doc:c}),f=!0,(a||h)&&(o=!0)),f&&(u?(r=r.add(u),i=d?i.add(t):i.delete(t)):(r=r.delete(t),i=i.delete(t)))})),Vr(this.query)||qr(this.query))for(;r.size>this.query.limit;){const t=Vr(this.query)?r.last():r.first();r=r.delete(t.key),i=i.delete(t.key),n.track({type:1,doc:t})}return{Ro:r,vo:n,Bn:o,mutatedKeys:i}}Vo(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n){const s=this.Ro;this.Ro=t.Ro,this.mutatedKeys=t.mutatedKeys;const i=t.vo.no();i.sort(((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return pi()}};return n(t)-n(e)}(t.type,e.type)||this.Ao(t.doc,e.doc))),this.So(n);const r=e?this.Do():[],o=0===this.Io.size&&this.current?1:0,a=o!==this.Eo;return this.Eo=o,0!==i.length||a?{snapshot:new Dc(this.query,t.Ro,s,i,t.mutatedKeys,0===o,a,!1),Co:r}:{Co:r}}ro(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({Ro:this.Ro,vo:new Nc,mutatedKeys:this.mutatedKeys,Bn:!1},!1)):{Co:[]}}No(t){return!this.To.has(t)&&!!this.Ro.has(t)&&!this.Ro.get(t).hasLocalMutations}So(t){t&&(t.addedDocuments.forEach((t=>this.To=this.To.add(t))),t.modifiedDocuments.forEach((t=>{})),t.removedDocuments.forEach((t=>this.To=this.To.delete(t))),this.current=t.current)}Do(){if(!this.current)return[];const t=this.Io;this.Io=Wo(),this.Ro.forEach((t=>{this.No(t.key)&&(this.Io=this.Io.add(t.key))}));const e=[];return t.forEach((t=>{this.Io.has(t)||e.push(new Vc(t))})),this.Io.forEach((n=>{t.has(n)||e.push(new Fc(n))})),e}ko(t){this.To=t.zn,this.Io=Wo();const e=this.bo(t.documents);return this.applyChanges(e,!0)}xo(){return Dc.fromInitialDocuments(this.query,this.Ro,this.mutatedKeys,0===this.Eo)}}class Bc{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class jc{constructor(t){this.key=t,this.$o=!1}}class $c{constructor(t,e,n,s,i,r){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=r,this.Fo={},this.Oo=new dh((t=>Wr(t)),zr),this.Mo=new Map,this.Lo=new Set,this.Bo=new Po(Zi.comparator),this.Uo=new Map,this.qo=new kh,this.Ko={},this.jo=new Map,this.Qo=uh.re(),this.onlineState="Unknown",this.Wo=void 0}get isPrimaryClient(){return!0===this.Wo}}async function Kc(t,e){const n=hu(t);let s,i;const r=n.Oo.get(e);if(r)s=r.targetId,n.sharedClientState.addLocalQueryTarget(s),i=r.view.xo();else{const t=await Ih(n.localStore,Hr(e)),r=n.sharedClientState.addLocalQueryTarget(t.targetId);s=t.targetId,i=await Hc(n,e,s,"current"===r),n.isPrimaryClient&&tc(n.remoteStore,t)}return i}async function Hc(t,e,n,s){t.Go=(e,n,s)=>async function(t,e,n,s){let i=e.view.bo(n);i.Bn&&(i=await Sh(t.localStore,e.query,!1).then((({documents:t})=>e.view.bo(t,i))));const r=s&&s.targetChanges.get(e.targetId),o=e.view.applyChanges(i,t.isPrimaryClient,r);return nu(t,e.targetId,o.Co),o.snapshot}(t,e,n,s);const i=await Sh(t.localStore,e,!0),r=new qc(e,i.zn),o=r.bo(i.documents),a=Jo.createSynthesizedTargetChangeForCurrentChange(n,s&&"Offline"!==t.onlineState),h=r.applyChanges(o,t.isPrimaryClient,a);nu(t,n,h.Co);const c=new Bc(e,n,r);return t.Oo.set(e,c),t.Mo.has(n)?t.Mo.get(n).push(e):t.Mo.set(n,[e]),h.snapshot}async function Gc(t,e){const n=mi(t),s=n.Oo.get(e),i=n.Mo.get(s.targetId);if(i.length>1)return n.Mo.set(s.targetId,i.filter((t=>!zr(t,e)))),void n.Oo.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Ah(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),ec(n.remoteStore,s.targetId),tu(n,s.targetId)})).catch(lh)):(tu(n,s.targetId),await Ah(n.localStore,s.targetId,!0))}async function zc(t,e){const n=mi(t);try{const t=await function(t,e){const n=mi(t),s=e.snapshotVersion;let i=n.qn;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(t=>{const r=n.Qn.newChangeBuffer({trackRemovals:!0});i=n.qn;const o=[];e.targetChanges.forEach(((e,r)=>{const a=i.get(r);if(!a)return;o.push(n.He.removeMatchingKeys(t,e.removedDocuments,r).next((()=>n.He.addMatchingKeys(t,e.addedDocuments,r))));const h=e.resumeToken;if(h.approximateByteSize()>0){const d=a.withResumeToken(h,s).withSequenceNumber(t.currentSequenceNumber);i=i.insert(r,d),c=a,l=e,gi((u=d).resumeToken.approximateByteSize()>0),(0===c.resumeToken.approximateByteSize()||u.snapshotVersion.toMicroseconds()-c.snapshotVersion.toMicroseconds()>=3e8||l.addedDocuments.size+l.modifiedDocuments.size+l.removedDocuments.size>0)&&o.push(n.He.updateTargetData(t,d))}var c,u,l}));let a=jo();if(e.documentUpdates.forEach(((s,i)=>{e.resolvedLimboDocuments.has(s)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,s))})),o.push(Th(t,r,e.documentUpdates,s,void 0).next((t=>{a=t}))),!s.isEqual(Oi.min())){const e=n.He.getLastRemoteSnapshotVersion(t).next((e=>n.He.setTargetsMetadata(t,t.currentSequenceNumber,s)));o.push(e)}return th.waitFor(o).next((()=>r.apply(t))).next((()=>n.Wn.Vn(t,a))).next((()=>a))})).then((t=>(n.qn=i,t)))}(n.localStore,e);e.targetChanges.forEach(((t,e)=>{const s=n.Uo.get(e);s&&(gi(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1),t.addedDocuments.size>0?s.$o=!0:t.modifiedDocuments.size>0?gi(s.$o):t.removedDocuments.size>0&&(gi(s.$o),s.$o=!1))})),await ru(n,t,e)}catch(t){await lh(t)}}function Wc(t,e,n){const s=mi(t);if(s.isPrimaryClient&&0===n||!s.isPrimaryClient&&1===n){const t=[];s.Oo.forEach(((n,s)=>{const i=s.view.ro(e);i.snapshot&&t.push(i.snapshot)})),function(t,e){const n=mi(t);n.onlineState=e;let s=!1;n.queries.forEach(((t,n)=>{for(const t of n.listeners)t.ro(e)&&(s=!0)})),s&&Pc(n)}(s.eventManager,e),t.length&&s.Fo.Pr(t),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function Qc(t,e,n){const s=mi(t);s.sharedClientState.updateQueryState(e,"rejected",n);const i=s.Uo.get(e),r=i&&i.key;if(r){let t=new Po(Zi.comparator);t=t.insert(r,gr.newNoDocument(r,Oi.min()));const n=Wo().add(r),i=new Yo(Oi.min(),new Map,new Vo(_i),t,n);await zc(s,i),s.Bo=s.Bo.remove(r),s.Uo.delete(e),iu(s)}else await Ah(s.localStore,e,!1).then((()=>tu(s,e,n))).catch(lh)}async function Xc(t,e){const n=mi(t),s=e.batch.batchId;try{const t=await function(t,e){const n=mi(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(t=>{const s=e.batch.keys(),i=n.Qn.newChangeBuffer({trackRemovals:!0});return function(t,e,n,s){const i=n.batch,r=i.keys();let o=th.resolve();return r.forEach((t=>{o=o.next((()=>s.getEntry(e,t))).next((e=>{const r=n.docVersions.get(t);gi(null!==r),e.version.compareTo(r)<0&&(i.applyToRemoteDocument(e,n),e.isValidDocument()&&s.addEntry(e,n.commitVersion))}))})),o.next((()=>t.An.removeMutationBatch(e,i)))}(n,t,e,i).next((()=>i.apply(t))).next((()=>n.An.performConsistencyCheck(t))).next((()=>n.Wn.vn(t,s)))}))}(n.localStore,e);Zc(n,s,null),Jc(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await ru(n,t)}catch(t){await lh(t)}}async function Yc(t,e,n){const s=mi(t);try{const t=await function(t,e){const n=mi(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",(t=>{let s;return n.An.lookupMutationBatch(t,e).next((e=>(gi(null!==e),s=e.keys(),n.An.removeMutationBatch(t,e)))).next((()=>n.An.performConsistencyCheck(t))).next((()=>n.Wn.vn(t,s)))}))}(s.localStore,e);Zc(s,e,n),Jc(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await ru(s,t)}catch(t){await lh(t)}}function Jc(t,e){(t.jo.get(e)||[]).forEach((t=>{t.resolve()})),t.jo.delete(e)}function Zc(t,e,n){const s=mi(t);let i=s.Ko[s.currentUser.toKey()];if(i){const t=i.get(e);t&&(n?t.reject(n):t.resolve(),i=i.remove(e)),s.Ko[s.currentUser.toKey()]=i}}function tu(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const s of t.Mo.get(e))t.Oo.delete(s),n&&t.Fo.zo(s,n);t.Mo.delete(e),t.isPrimaryClient&&t.qo.us(e).forEach((e=>{t.qo.containsKey(e)||eu(t,e)}))}function eu(t,e){t.Lo.delete(e.path.canonicalString());const n=t.Bo.get(e);null!==n&&(ec(t.remoteStore,n),t.Bo=t.Bo.remove(e),t.Uo.delete(n),iu(t))}function nu(t,e,n){for(const s of n)s instanceof Fc?(t.qo.addReference(s.key,e),su(t,s)):s instanceof Vc?(ui("SyncEngine","Document no longer in limbo: "+s.key),t.qo.removeReference(s.key,e),t.qo.containsKey(s.key)||eu(t,s.key)):pi()}function su(t,e){const n=e.key,s=n.path.canonicalString();t.Bo.get(n)||t.Lo.has(s)||(ui("SyncEngine","New document in limbo: "+n),t.Lo.add(s),iu(t))}function iu(t){for(;t.Lo.size>0&&t.Bo.size<t.maxConcurrentLimboResolutions;){const e=t.Lo.values().next().value;t.Lo.delete(e);const n=new Zi(Fi.fromString(e)),s=t.Qo.next();t.Uo.set(s,new jc(n)),t.Bo=t.Bo.insert(n,s),tc(t.remoteStore,new ih(Hr(Fr(n.path)),s,2,ki.I))}}async function ru(t,e,n){const s=mi(t),i=[],r=[],o=[];s.Oo.isEmpty()||(s.Oo.forEach(((t,a)=>{o.push(s.Go(a,e,n).then((t=>{if(t){s.isPrimaryClient&&s.sharedClientState.updateQueryState(a.targetId,t.fromCache?"not-current":"current"),i.push(t);const e=gh.$n(a.targetId,t);r.push(e)}})))})),await Promise.all(o),s.Fo.Pr(i),await async function(t,e){const n=mi(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(t=>th.forEach(e,(e=>th.forEach(e.kn,(s=>n.persistence.referenceDelegate.addReference(t,e.targetId,s))).next((()=>th.forEach(e.xn,(s=>n.persistence.referenceDelegate.removeReference(t,e.targetId,s)))))))))}catch(t){if(!eh(t))throw t;ui("LocalStore","Failed to update sequence numbers: "+t)}for(const t of e){const e=t.targetId;if(!t.fromCache){const t=n.qn.get(e),s=t.snapshotVersion,i=t.withLastLimboFreeSnapshotVersion(s);n.qn=n.qn.insert(e,i)}}}(s.localStore,r))}async function ou(t,e){const n=mi(t);if(!n.currentUser.isEqual(e)){ui("SyncEngine","User change. New user:",e.toKey());const t=await wh(n.localStore,e);n.currentUser=e,(s=n).jo.forEach((t=>{t.forEach((t=>{t.reject(new vi(yi.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))}))})),s.jo.clear(),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await ru(n,t.Gn)}var s}function au(t,e){const n=mi(t),s=n.Uo.get(e);if(s&&s.$o)return Wo().add(s.key);{let t=Wo();const s=n.Mo.get(e);if(!s)return t;for(const e of s){const s=n.Oo.get(e);t=t.unionWith(s.view.Po)}return t}}function hu(t){const e=mi(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=zc.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=au.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Qc.bind(null,e),e.Fo.Pr=xc.bind(null,e.eventManager),e.Fo.zo=Mc.bind(null,e.eventManager),e}function cu(t){const e=mi(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Xc.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Yc.bind(null,e),e}class uu{constructor(){this.synchronizeTabs=!1}async initialize(t){this.k=Kh(t.databaseInfo.databaseId),this.sharedClientState=this.Jo(t),this.persistence=this.Yo(t),await this.persistence.start(),this.gcScheduler=this.Xo(t),this.localStore=this.Zo(t)}Xo(t){return null}Zo(t){return vh(this.persistence,new mh,t.initialUser,this.k)}Yo(t){return new Oh(Mh.ks,this.k)}Jo(t){return new Uh}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class lu{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>Wc(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=ou.bind(null,this.syncEngine),await bc(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new Rc}createDatastore(t){const e=Kh(t.databaseInfo.databaseId),n=(s=t.databaseInfo,new jh(s));var s,i,r;return i=t.authCredentials,r=t.appCheckCredentials,new Qh(i,r,n,e)}createRemoteStore(t){var e,n,s,i,r;return e=this.localStore,n=this.datastore,s=t.asyncQueue,i=t=>Wc(this.syncEngine,t,0),r=Vh.bt()?new Vh:new Fh,new Yh(e,n,s,i,r)}createSyncEngine(t,e){return function(t,e,n,s,i,r,o){const a=new $c(t,e,n,s,i,r);return o&&(a.Wo=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}terminate(){return async function(t){const e=mi(t);ui("RemoteStore","RemoteStore shutting down."),e.Gr.add(5),await Zh(e),e.Hr.shutdown(),e.Jr.set("Unknown")}(this.remoteStore)}}
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
class du{constructor(t){this.observer=t,this.muted=!1}next(t){this.observer.next&&this.ea(this.observer.next,t)}error(t){this.observer.error?this.ea(this.observer.error,t):console.error("Uncaught Error in snapshot listener:",t)}na(){this.muted=!0}ea(t,e){this.muted||setTimeout((()=>{this.muted||t(e)}),0)}}
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
class fu{constructor(t,e,n,s){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=s,this.user=oi.UNAUTHENTICATED,this.clientId=Di.A(),this.authCredentialListener=()=>Promise.resolve(),this.authCredentials.start(n,(async t=>{ui("FirestoreClient","Received user=",t.uid),await this.authCredentialListener(t),this.user=t})),this.appCheckCredentials.start(n,(()=>Promise.resolve()))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new vi(yi.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new wi;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=Cc(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function pu(t,e){t.asyncQueue.verifyOperationInProgress(),ui("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let s=n.initialUser;t.setCredentialChangeListener((async t=>{s.isEqual(t)||(await wh(e.localStore,t),s=t)})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t.offlineComponents=e}async function gu(t,e){t.asyncQueue.verifyOperationInProgress();const n=await mu(t);ui("FirestoreClient","Initializing OnlineComponentProvider");const s=await t.getConfiguration();await e.initialize(n,s),t.setCredentialChangeListener((t=>async function(t,e){const n=mi(t);n.asyncQueue.verifyOperationInProgress(),ui("RemoteStore","RemoteStore received new credentials");const s=oc(n);n.Gr.add(3),await Zh(n),s&&n.Jr.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Gr.delete(3),await Jh(n)}(e.remoteStore,t))),t.onlineComponents=e}async function mu(t){return t.offlineComponents||(ui("FirestoreClient","Using default OfflineComponentProvider"),await pu(t,new uu)),t.offlineComponents}async function yu(t){return t.onlineComponents||(ui("FirestoreClient","Using default OnlineComponentProvider"),await gu(t,new lu)),t.onlineComponents}function vu(t){return yu(t).then((t=>t.syncEngine))}async function wu(t){const e=await yu(t),n=e.eventManager;return n.onListen=Kc.bind(null,e.syncEngine),n.onUnlisten=Gc.bind(null,e.syncEngine),n}function Eu(t,e,n={}){const s=new wi;return t.asyncQueue.enqueueAndForget((async()=>function(t,e,n,s,i){const r=new du({next:r=>{e.enqueueAndForget((()=>Oc(t,o)));const a=r.docs.has(n);!a&&r.fromCache?i.reject(new vi(yi.UNAVAILABLE,"Failed to get document because the client is offline.")):a&&r.fromCache&&s&&"server"===s.source?i.reject(new vi(yi.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(r)},error:t=>i.reject(t)}),o=new Uc(Fr(n.path),r,{includeMetadataChanges:!0,wo:!0});return Lc(t,o)}(await wu(t),t.asyncQueue,e,n,s))),s.promise}class Tu{constructor(t,e,n,s,i,r,o,a){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=r,this.autoDetectLongPolling=o,this.useFetchStreams=a}}class bu{constructor(t,e){this.projectId=t,this.database=e||"(default)"}get isDefaultDatabase(){return"(default)"===this.database}isEqual(t){return t instanceof bu&&t.projectId===this.projectId&&t.database===this.database}}
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
 */const Iu=new Map;
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
 */function Au(t,e,n){if(!n)throw new vi(yi.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function Su(t){if(!Zi.isDocumentKey(t))throw new vi(yi.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Cu(t){if(Zi.isDocumentKey(t))throw new vi(yi.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function ku(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const n=(e=t).constructor?e.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var e;return"function"==typeof t?"a function":pi()}function Nu(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new vi(yi.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=ku(t);throw new vi(yi.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}
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
class Du{constructor(t){var e;if(void 0===t.host){if(void 0!==t.ssl)throw new vi(yi.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=null===(e=t.ssl)||void 0===e||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,void 0===t.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new vi(yi.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.useFetchStreams=!!t.useFetchStreams,function(t,e,n,s){if(!0===e&&!0===s)throw new vi(yi.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling)}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}
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
 */class _u{constructor(t,e,n){this._authCredentials=e,this._appCheckCredentials=n,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Du({}),this._settingsFrozen=!1,t instanceof bu?this._databaseId=t:(this._app=t,this._databaseId=function(t){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new vi(yi.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new bu(t.options.projectId)}(t))}get app(){if(!this._app)throw new vi(yi.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new vi(yi.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Du(t),void 0!==t.credentials&&(this._authCredentials=function(t){if(!t)return new Ti;switch(t.type){case"gapi":const e=t.client;return gi(!("object"!=typeof e||null===e||!e.auth||!e.auth.getAuthHeaderValueForFirstParty)),new Ai(e,t.sessionIndex||"0",t.iamToken||null);case"provider":return t.client;default:throw new vi(yi.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=Iu.get(t);e&&(ui("ComponentProvider","Removing Datastore"),Iu.delete(t),e.terminate())}(this),Promise.resolve()}}
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
class Ru{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ou(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Ru(this.firestore,t,this._key)}}class Lu{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Lu(this.firestore,t,this._query)}}class Ou extends Lu{constructor(t,e,n){super(t,e,Fr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Ru(this.firestore,null,new Zi(t))}withConverter(t){return new Ou(this.firestore,t,this._path)}}function xu(t,e,...n){if(t=c(t),1===arguments.length&&(e=Di.A()),Au("doc","path",e),t instanceof _u){const s=Fi.fromString(e,...n);return Su(s),new Ru(t,null,new Zi(s))}{if(!(t instanceof Ru||t instanceof Ou))throw new vi(yi.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(Fi.fromString(e,...n));return Su(s),new Ru(t.firestore,t instanceof Ou?t.converter:null,new Zi(s))}}
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
class Mu{constructor(){this.ma=Promise.resolve(),this.ga=[],this.ya=!1,this.pa=[],this.Ta=null,this.Ea=!1,this.Ia=!1,this.Aa=[],this.ur=new Hh(this,"async_queue_retry"),this.Ra=()=>{const t=$h();t&&ui("AsyncQueue","Visibility state changed to "+t.visibilityState),this.ur.er()};const t=$h();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.Ra)}get isShuttingDown(){return this.ya}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Pa(),this.ba(t)}enterRestrictedMode(t){if(!this.ya){this.ya=!0,this.Ia=t||!1;const e=$h();e&&"function"==typeof e.removeEventListener&&e.removeEventListener("visibilitychange",this.Ra)}}enqueue(t){if(this.Pa(),this.ya)return new Promise((()=>{}));const e=new wi;return this.ba((()=>this.ya&&this.Ia?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.ga.push(t),this.va())))}async va(){if(0!==this.ga.length){try{await this.ga[0](),this.ga.shift(),this.ur.reset()}catch(t){if(!eh(t))throw t;ui("AsyncQueue","Operation failed with retryable error: "+t)}this.ga.length>0&&this.ur.Zi((()=>this.va()))}}ba(t){const e=this.ma.then((()=>(this.Ea=!0,t().catch((t=>{this.Ta=t,this.Ea=!1;throw li("INTERNAL UNHANDLED ERROR: ",function(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}(t)),t})).then((t=>(this.Ea=!1,t))))));return this.ma=e,e}enqueueAfterDelay(t,e,n){this.Pa(),this.Aa.indexOf(t)>-1&&(e=0);const s=Sc.createAndSchedule(this,t,e,n,(t=>this.Va(t)));return this.pa.push(s),s}Pa(){this.Ta&&pi()}verifyOperationInProgress(){}async Sa(){let t;do{t=this.ma,await t}while(t!==this.ma)}Da(t){for(const e of this.pa)if(e.timerId===t)return!0;return!1}Ca(t){return this.Sa().then((()=>{this.pa.sort(((t,e)=>t.targetTimeMs-e.targetTimeMs));for(const e of this.pa)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.Sa()}))}Na(t){this.Aa.push(t)}Va(t){const e=this.pa.indexOf(t);this.pa.splice(e,1)}}function Pu(t){return function(t,e){if("object"!=typeof t||null===t)return!1;const n=t;for(const t of["next","error","complete"])if(t in n&&"function"==typeof n[t])return!0;return!1}(t)}class Uu extends _u{constructor(t,e,n){super(t,e,n),this.type="firestore",this._queue=new Mu,this._persistenceKey="name"in t?t.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||Vu(this),this._firestoreClient.terminate()}}function Fu(t){return t._firestoreClient||Vu(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function Vu(t){var e;const n=t._freezeSettings(),s=(i=t._databaseId,r=(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",o=t._persistenceKey,new Tu(i,r,o,(a=n).host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams));var i,r,o,a;t._firestoreClient=new fu(t._authCredentials,t._appCheckCredentials,t._queue,s)}
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
class qu{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new vi(yi.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new qi(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
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
class Bu{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Bu(ji.fromBase64String(t))}catch(t){throw new vi(yi.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(t){return new Bu(ji.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
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
 */class ju{constructor(t){this._methodName=t}}
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
 */class $u{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new vi(yi.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new vi(yi.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return _i(this._lat,t._lat)||_i(this._long,t._long)}}
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
 */const Ku=/^__.*__$/;class Hu{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new So(t,this.data,this.fieldMask,e,this.fieldTransforms):new Ao(t,this.data,e,this.fieldTransforms)}}class Gu{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new So(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function zu(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw pi()}}class Wu{constructor(t,e,n,s,i,r){this.settings=t,this.databaseId=e,this.k=n,this.ignoreUndefinedProperties=s,void 0===i&&this.ka(),this.fieldTransforms=i||[],this.fieldMask=r||[]}get path(){return this.settings.path}get xa(){return this.settings.xa}$a(t){return new Wu(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.k,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Fa(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),s=this.$a({path:n,Oa:!1});return s.Ma(t),s}La(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),s=this.$a({path:n,Oa:!1});return s.ka(),s}Ba(t){return this.$a({path:void 0,Oa:!0})}Ua(t){return cl(t,this.settings.methodName,this.settings.qa||!1,this.path,this.settings.Ka)}contains(t){return void 0!==this.fieldMask.find((e=>t.isPrefixOf(e)))||void 0!==this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))}ka(){if(this.path)for(let t=0;t<this.path.length;t++)this.Ma(this.path.get(t))}Ma(t){if(0===t.length)throw this.Ua("Document fields must not be empty");if(zu(this.xa)&&Ku.test(t))throw this.Ua('Document fields cannot begin and end with "__"')}}class Qu{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.k=n||Kh(t)}ja(t,e,n,s=!1){return new Wu({xa:t,methodName:e,Ka:n,path:qi.emptyPath(),Oa:!1,qa:s},this.databaseId,this.k,this.ignoreUndefinedProperties)}}function Xu(t){const e=t._freezeSettings(),n=Kh(t._databaseId);return new Qu(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Yu(t,e,n,s,i,r={}){const o=t.ja(r.merge||r.mergeFields?2:0,e,n,i);rl("Data must be an object, but it was:",o,s);const a=sl(s,o);let h,c;if(r.merge)h=new Bi(o.fieldMask),c=o.fieldTransforms;else if(r.mergeFields){const t=[];for(const s of r.mergeFields){const i=ol(e,s,n);if(!o.contains(i))throw new vi(yi.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);ul(t,i)||t.push(i)}h=new Bi(t),c=o.fieldTransforms.filter((t=>h.covers(t.field)))}else h=null,c=o.fieldTransforms;return new Hu(new fr(a),h,c)}class Ju extends ju{_toFieldTransform(t){if(2!==t.xa)throw 1===t.xa?t.Ua(`${this._methodName}() can only appear at the top level of your update data`):t.Ua(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Ju}}class Zu extends ju{_toFieldTransform(t){return new po(t.path,new ro)}isEqual(t){return t instanceof Zu}}function tl(t,e,n,s){const i=t.ja(1,e,n);rl("Data must be an object, but it was:",i,s);const r=[],o=fr.empty();Mi(s,((t,s)=>{const a=hl(e,t,n);s=c(s);const h=i.La(a);if(s instanceof Ju)r.push(a);else{const t=nl(s,h);null!=t&&(r.push(a),o.set(a,t))}}));const a=new Bi(r);return new Gu(o,a,i.fieldTransforms)}function el(t,e,n,s,i,r){const o=t.ja(1,e,n),a=[ol(e,s,n)],h=[i];if(r.length%2!=0)throw new vi(yi.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let t=0;t<r.length;t+=2)a.push(ol(e,r[t])),h.push(r[t+1]);const u=[],l=fr.empty();for(let t=a.length-1;t>=0;--t)if(!ul(u,a[t])){const e=a[t];let n=h[t];n=c(n);const s=o.La(e);if(n instanceof Ju)u.push(e);else{const t=nl(n,s);null!=t&&(u.push(e),l.set(e,t))}}const d=new Bi(u);return new Gu(l,d,o.fieldTransforms)}function nl(t,e){if(il(t=c(t)))return rl("Unsupported field value:",e,t),sl(t,e);if(t instanceof ju)return function(t,e){if(!zu(e.xa))throw e.Ua(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.Ua(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.Oa&&4!==e.xa)throw e.Ua("Nested arrays are not supported");return function(t,e){const n=[];let s=0;for(const i of t){let t=nl(i,e.Ba(s));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),s++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=c(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return eo(e.k,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=Li.fromDate(t);return{timestampValue:ca(e.k,n)}}if(t instanceof Li){const n=new Li(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:ca(e.k,n)}}if(t instanceof $u)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof Bu)return{bytesValue:ua(e.k,t._byteString)};if(t instanceof Ru){const n=e.databaseId,s=t.firestore._databaseId;if(!s.isEqual(n))throw e.Ua(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:fa(t.firestore._databaseId||e.databaseId,t._key.path)}}throw e.Ua(`Unsupported field value: ${ku(t)}`)}(t,e)}function sl(t,e){const n={};return Pi(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Mi(t,((t,s)=>{const i=nl(s,e.Fa(t));null!=i&&(n[t]=i)})),{mapValue:{fields:n}}}function il(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof Li||t instanceof $u||t instanceof Bu||t instanceof Ru||t instanceof ju)}function rl(t,e,n){if(!il(n)||("object"!=typeof(s=n)||null===s||Object.getPrototypeOf(s)!==Object.prototype&&null!==Object.getPrototypeOf(s))){const s=ku(n);throw"an object"===s?e.Ua(t+" a custom object"):e.Ua(t+" "+s)}var s}function ol(t,e,n){if((e=c(e))instanceof qu)return e._internalPath;if("string"==typeof e)return hl(t,e);throw cl("Field path arguments must be of type string or FieldPath.",t,!1,void 0,n)}const al=new RegExp("[~\\*/\\[\\]]");function hl(t,e,n){if(e.search(al)>=0)throw cl(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new qu(...e.split("."))._internalPath}catch(s){throw cl(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function cl(t,e,n,s,i){const r=s&&!s.isEmpty(),o=void 0!==i;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let h="";return(r||o)&&(h+=" (found",r&&(h+=` in field ${s}`),o&&(h+=` in document ${i}`),h+=")"),new vi(yi.INVALID_ARGUMENT,a+t+h)}function ul(t,e){return t.some((t=>t.isEqual(e)))}
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
 */class ll{constructor(t,e,n,s,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ru(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new dl(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(fl("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class dl extends ll{data(){return super.data()}}function fl(t,e){return"string"==typeof e?hl(t,e):e instanceof qu?e._internalPath:e._delegate._internalPath}
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
 */class pl{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class gl extends ll{constructor(t,e,n,s,i,r){super(t,e,n,s,r),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new ml(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(fl("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class ml extends gl{data(t={}){return super.data(t)}}class yl{constructor(t,e,n,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new pl(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(t,e){this._snapshot.docs.forEach((n=>{t.call(e,new ml(this._firestore,this._userDataWriter,n.key,n,new pl(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new vi(yi.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(t,e){if(t._snapshot.oldDocs.isEmpty()){let e=0;return t._snapshot.docChanges.map((n=>({type:"added",doc:new ml(t._firestore,t._userDataWriter,n.doc.key,n.doc,new pl(t._snapshot.mutatedKeys.has(n.doc.key),t._snapshot.fromCache),t.query.converter),oldIndex:-1,newIndex:e++})))}{let n=t._snapshot.oldDocs;return t._snapshot.docChanges.filter((t=>e||3!==t.type)).map((e=>{const s=new ml(t._firestore,t._userDataWriter,e.doc.key,e.doc,new pl(t._snapshot.mutatedKeys.has(e.doc.key),t._snapshot.fromCache),t.query.converter);let i=-1,r=-1;return 0!==e.type&&(i=n.indexOf(e.doc.key),n=n.delete(e.doc.key)),1!==e.type&&(n=n.add(e.doc),r=n.indexOf(e.doc.key)),{type:vl(e.type),doc:s,oldIndex:i,newIndex:r}}))}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function vl(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return pi()}}
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
function wl(t){if(qr(t)&&0===t.explicitOrderBy.length)throw new vi(yi.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}
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
class El{convertValue(t,e="none"){switch(tr(t)){case 0:return null;case 1:return t.booleanValue;case 2:return Hi(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Gi(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 10:return this.convertObject(t.mapValue,e);default:throw pi()}}convertObject(t,e){const n={};return Mi(t.fields,((t,s)=>{n[t]=this.convertValue(s,e)})),n}convertGeoPoint(t){return new $u(Hi(t.latitude),Hi(t.longitude))}convertArray(t,e){return(t.values||[]).map((t=>this.convertValue(t,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=Wi(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(Qi(t));default:return null}}convertTimestamp(t){const e=Ki(t);return new Li(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Fi.fromString(t);gi(Ma(n));const s=new bu(n.get(1),n.get(3)),i=new Zi(n.popFirst(5));return s.isEqual(e)||li(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}
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
 */function Tl(t,e,n){let s;return s=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,s}class bl extends El{constructor(t){super(),this.firestore=t}convertBytes(t){return new Bu(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Ru(this.firestore,null,e)}}function Il(t,e){return function(t,e){const n=new wi;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){const s=cu(t);try{const t=await function(t,e){const n=mi(t),s=Li.now(),i=e.reduce(((t,e)=>t.add(e.key)),Wo());let r;return n.persistence.runTransaction("Locally write mutations","readwrite",(t=>n.Wn.vn(t,i).next((i=>{r=i;const o=[];for(const t of e){const e=To(t,r.get(t.key));null!=e&&o.push(new So(t.key,e,pr(e.value.mapValue),mo.exists(!0)))}return n.An.addMutationBatch(t,s,o,e)})))).then((t=>(t.applyToLocalDocumentSet(r),{batchId:t.batchId,changes:r})))}(s.localStore,e);s.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let s=t.Ko[t.currentUser.toKey()];s||(s=new Po(_i)),s=s.insert(e,n),t.Ko[t.currentUser.toKey()]=s}(s,t.batchId,n),await ru(s,t.changes),await fc(s.remoteStore)}catch(t){const e=Cc(t,"Failed to persist write");n.reject(e)}}(await vu(t),e,n))),n.promise}(Fu(t),e)}function Al(t,e,n){const s=n.docs.get(e._key),i=new bl(t);return new gl(t,i,e._key,s,new pl(n.hasPendingWrites,n.fromCache),e.converter)}
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
 */function Sl(){return new Zu("serverTimestamp")}!function(t,e=!0){ai="9.6.1",k(new u("firestore",((t,{options:n})=>{const s=t.getProvider("app").getImmediate(),i=new Uu(s,new bi(t.getProvider("auth-internal")),new Ci(t.getProvider("app-check-internal")));return n=Object.assign({useFetchStreams:e},n),i._setSettings(n),i}),"PUBLIC")),R("@firebase/firestore","3.4.1",t),R("@firebase/firestore","3.4.1","esm2017")}();const Cl=function(t=function(t="[DEFAULT]"){const e=A.get(t);if(!e)throw D.create("no-app",{appName:t});return e}()){return N(t,"firestore").getImmediate()}(function(t,e={}){if("object"!=typeof e){e={name:e}}const n=Object.assign({name:"[DEFAULT]",automaticDataCollectionEnabled:!1},e),s=n.name;if("string"!=typeof s||!s)throw D.create("bad-app-name",{appName:String(s)});const i=A.get(s);if(i){if(a(t,i.options)&&a(n,i.config))return i;throw D.create("duplicate-app",{appName:s})}const r=new d(s);for(const t of S.values())r.addComponent(t);const o=new _(t,n,r);return A.set(s,o),o}({apiKey:"AIzaSyD0cjujkVwtSvN8cYwmm_ttEl6fKsmx5mM",authDomain:"r0hin0.firebaseapp.com",projectId:"r0hin0",storageBucket:"r0hin0.appspot.com",messagingSenderId:"55202468987",appId:"1:55202468987:web:042c0c864d1afa672ffede"}));function kl(t){$("#errorPillText").html(t),$("#errorPill").removeClass("hidden"),$("#errorPill").addClass("flex"),$("#errorPill").removeClass("animationOut"),$("#errorPill").addClass("animationIn"),window.clearInterval(timeoutError),timeoutError=window.setTimeout((()=>{$("#errorPill").removeClass("animationIn"),$("#errorPill").addClass("animationOut")}),4e3)}async function Nl(t){let e=t;if(e=e.trim(),e.startsWith("http")||e.startsWith("https")||e.includes(":")||(e="https://"+e),e.endsWith("/")||(e+="/"),!e.includes("."))return void kl("Invalid URL.");if(e.length>999)return void kl("Invalid URL.");$("#urlInput").val(""),$("#urlInput").attr("placeholder","Shortening...");const n=await function(t,e){const n=Nu(t.firestore,Uu),s=xu(t),i=Tl(t.converter,e);return Il(n,[Yu(Xu(t.firestore),"addDoc",s._key,i,null!==t.converter,{}).toMutation(s._key,mo.exists(!1))]).then((()=>s))}(function(t,e,...n){if(t=c(t),Au("collection","path",e),t instanceof _u){const s=Fi.fromString(e,...n);return Cu(s),new Ou(t,null,s)}{if(!(t instanceof Ru||t instanceof Ou))throw new vi(yi.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(Fi.fromString(e,...n));return Cu(s),new Ou(t.firestore,null,s)}}(Cl,"shortenedLinks"),{url:e,numUsed:0,lastUsed:Sl(),createdAt:Sl()});try{await navigator.clipboard.writeText(`https://r0h.in/re?u=${n.id}`),$("#successPill").removeClass("hidden"),$("#successPill").addClass("flex"),$("#successPill").removeClass("animationOut"),$("#successPill").addClass("animationIn"),window.clearInterval(timeout),timeout=window.setTimeout((()=>{$("#successPill").removeClass("animationIn"),$("#successPill").addClass("animationOut")}),4e3)}catch(t){$("#urlInput").attr("placeholder","Paste a URL"),alert(`Failed to copy to clipboard. Your URL is: https://r0h.in/re?u=${n.id}.`)}$("#urlInput").attr("placeholder","Paste a URL")}!async function(){const t=new URLSearchParams(window.location.search).get("u");if(t){const e=await
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
function(t){t=Nu(t,Ru);const e=Nu(t.firestore,Uu);return Eu(Fu(e),t._key).then((n=>Al(e,t,n)))}(xu(Cl,`shortenedLinks/${t}`));if(e.exists)return await function(t,e,n,...s){t=Nu(t,Ru);const i=Nu(t.firestore,Uu),r=Xu(i);let o;return o="string"==typeof(e=c(e))||e instanceof qu?el(r,"updateDoc",t._key,e,n,s):tl(r,"updateDoc",t._key,e),Il(i,[o.toMutation(t._key,mo.exists(!0))])}(xu(Cl,`shortenedLinks/${t}`),{numUsed:e.data().numUsed+1,lastUsed:Sl()}),void window.location.replace(e.data().url)}$("#body").removeClass("hidden"),$("#body").addClass("flex")}(),$("#urlInput").get(0).focus(),window.timeout=null,window.timeoutError=null,window.snapshot=null,$("#generateButton").get(0).onclick=()=>{Nl($("#urlInput").val())},$("#viewAnalyticsButton").get(0).onclick=()=>{!async function(t){let e=t;if(e=e.trim(),e=e.split("r0h.in/re?u=")[1],!e)return void kl("Invalid URL.");$("#urlInput").val(""),$("#urlInput").attr("placeholder","Gathering analytics..."),snapshot=function(t,...e){var n,s,i;t=c(t);let r={includeMetadataChanges:!1},o=0;"object"!=typeof e[o]||Pu(e[o])||(r=e[o],o++);const a={includeMetadataChanges:r.includeMetadataChanges};if(Pu(e[o])){const t=e[o];e[o]=null===(n=t.next)||void 0===n?void 0:n.bind(t),e[o+1]=null===(s=t.error)||void 0===s?void 0:s.bind(t),e[o+2]=null===(i=t.complete)||void 0===i?void 0:i.bind(t)}let h,u,l;if(t instanceof Ru)u=Nu(t.firestore,Uu),l=Fr(t._key.path),h={next:n=>{e[o]&&e[o](Al(u,t,n))},error:e[o+1],complete:e[o+2]};else{const n=Nu(t,Lu);u=Nu(n.firestore,Uu),l=n._query;const s=new bl(u);h={next:t=>{e[o]&&e[o](new yl(u,s,n,t))},error:e[o+1],complete:e[o+2]},wl(t._query)}return function(t,e,n,s){const i=new du(s),r=new Uc(e,i,n);return t.asyncQueue.enqueueAndForget((async()=>Lc(await wu(t),r))),()=>{i.na(),t.asyncQueue.enqueueAndForget((async()=>Oc(await wu(t),r)))}}(Fu(u),l,a,h)}(xu(Cl,`shortenedLinks/${e}`),(t=>{$("#urlInput").attr("placeholder","Paste a URL"),t.exists()?($("#stats").removeClass("hidden"),$("#generate").addClass("hidden"),$("#totalUses").html(t.data().numUsed),$("#lastUsed").html(t.data().lastUsed.toDate().toLocaleString("default",{month:"short",day:"numeric"})),$("#dateCreated").html(t.data().createdAt.toDate().toLocaleString("default",{month:"short",day:"numeric"})),$("#targetURL").html(t.data().url),$("#targetURL").get(0).href=t.data().url):kl("URL register not found.")}))}($("#urlInput").val())},$("#backButton").get(0).onclick=()=>{$("#stats").addClass("hidden"),$("#generate").removeClass("hidden"),snapshot()},window.onload=function(){$("#urlInput").get(0).focus(),$("#urlInput").get(0).addEventListener("keyup",(function(t){13===t.keyCode&&(t.preventDefault(),Nl($("#urlInput").val()))}))};
//# sourceMappingURL=index.775023fc.js.map
