(()=>{var e={689:e=>{!function(){"use strict";function n(e){return function(n){for(var t=[],r=1;""!==n;){var i=function(e,n){for(var t=!1,r=0;r<e.length;r++)if(t=n(e[r]))return t;return t}(e,(function(e){var t=e.re.exec(n);if(t){var i=t[0];return n=n.slice(i.length),{raw:i,matched:e.f(t,r)}}}));if(!i){var o=new SyntaxError("Unexpected character: "+n[0]+"; input: "+n.substr(0,100));throw o.line=r,o}i.matched.line=r,r+=i.raw.replace(/[^\n]/g,"").length,t.push(i.matched)}return t}}function t(e){var n=e[1].replace(/([^'\\]|\\['bnrtf\\]|\\u[0-9a-fA-F]{4})/g,(function(e){return'"'===e?'\\"':"\\'"===e?"'":e}));return{type:"string",match:'"'+n+'"',value:JSON.parse('"'+n+'"')}}function r(e){return{type:"string",match:e[0],value:JSON.parse(e[0])}}function i(e){return{type:"string",value:e[0],match:'"'+e[0].replace(/./g,(function(e){return"\\"===e?"\\\\":e}))+'"'}}function o(e){return{type:" ",match:e[0].replace(/./g,(function(e){return/\s/.test(e)?e:" "}))}}function a(e){return{type:"number",match:e[0],value:parseFloat(e[0])}}function s(e){var n;switch(e[1]){case"null":n=null;break;case"true":n=!0;break;case"false":n=!1}return{type:"atom",match:e[0],value:n}}function u(e){function n(e){return function(n){return{type:e,match:n[0]}}}var u=[{re:/^\s+/,f:n(" ")},{re:/^\{/,f:n("{")},{re:/^\}/,f:n("}")},{re:/^\[/,f:n("[")},{re:/^\]/,f:n("]")},{re:/^,/,f:n(",")},{re:/^:/,f:n(":")},{re:/^(true|false|null)/,f:s},{re:/^\-?\d+(\.\d+)?([eE][+-]?\d+)?/,f:a},{re:/^"([^"\\]|\\["bnrtf\\\/]|\\u[0-9a-fA-F]{4})*"/,f:r}];return e&&(u=u.concat([{re:/^'(([^'\\]|\\['bnrtf\\\/]|\\u[0-9a-fA-F]{4})*)'/,f:t},{re:/^\/\/.*?(?:\r\n|\r|\n)/,f:o},{re:/^\/\*[\s\S]*?\*\//,f:o},{re:/^[$a-zA-Z0-9_\-+\.\*\?!\|&%\^\/#\\]+/,f:i}])),u}var c=n(u(!0)),l=n(u(!1));function f(e,n){for(;n>=0;n--)if(" "!==e[n].type)return n}function p(e){var n=[];return e.forEach((function(t,r){if("]"===t.type||"}"===t.type){var i=f(n,r-1);if(i&&","===n[i].type){var o=f(n,i-1);o&&"["!==n[o].type&&"{"!==n[o].type&&(n[i]={type:" ",match:" ",line:e[i].line})}}n.push(t)})),n}function d(e){var n=c(e);return(n=p(n)).reduce((function(e,n){return e+n.match}),"")}function v(e,n){var t=e[n.pos];return n.pos+=1,t||{type:"eof",line:0!==e.length?e[e.length-1].line:1}}function y(e){switch(e.type){case"atom":case"string":case"number":return e.type+" "+e.match;case"eof":return"end-of-file";default:return"'"+e.type+"'"}}function h(e,n,t){for(var r=[",",":","]","}"],i=v(e,n);;){if(t&&-1!==t.indexOf(i.type))return i;if("eof"===i.type)return i;if(-1===r.indexOf(i.type))return i;var o="Unexpected token: "+y(i)+", expected '[', '{', number, string or atom";if(!n.tolerant){var a=new SyntaxError(o);throw a.line=i.line,a}n.warnings.push({message:o,line:i.line}),i=v(e,n)}}function m(e,n,t){if(!e.tolerant){var r=new SyntaxError(t);throw r.line=n.line,r}e.warnings.push({message:t,line:n.line})}function g(e,n,t){m(e,n,"Unexpected token: "+y(n)+", expected "+t)}function w(e,n,t,r){void 0!==(r=e.reviver?e.reviver(t,r):r)&&(n[t]=r)}function b(e,n,t){var r,i=h(e,n,[":"]);if("string"!==i.type)switch(g(n,i,"string"),i.type){case":":i={type:"string",value:"null",line:i.line},n.pos-=1;break;case"number":case"atom":i={type:"string",value:""+i.value,line:i.line};break;case"[":case"{":return n.pos-=1,void w(n,t,"null",k(e,n))}!function(e,n,t){var r=t.value;e.duplicate&&Object.prototype.hasOwnProperty.call(n,r)&&m(e,t,"Duplicate key: "+r)}(n,t,i),r=i.value,function(e,n){var t=v(e,n);if(":"!==t.type){var r="Unexpected token: "+y(t)+", expected ':'";if(!n.tolerant){var i=new SyntaxError(r);throw i.line=t.line,i}n.warnings.push({message:r,line:t.line}),n.pos-=1}}(e,n),w(n,t,r,k(e,n))}function x(e,n,t){var r=t.length,i=k(e,n);t[r]=n.reviver?n.reviver(""+r,i):i}function S(e,n,t,r){var i=h(e,n,r.skip);if("eof"===i.type&&(g(n,i,"'"+r.endSymbol+"' or "+r.elementName),i={type:r.endSymbol,line:i.line}),i.type===r.endSymbol)return t;for(n.pos-=1,r.elementParser(e,n,t);;)switch((i=v(e,n)).type!==r.endSymbol&&","!==i.type&&(g(n,i,"',' or '"+r.endSymbol+"'"),i={type:"eof"===i.type?r.endSymbol:",",line:i.line},n.pos-=1),i.type){case r.endSymbol:return t;case",":r.elementParser(e,n,t)}}function k(e,n,t){var r,i=h(e,n);switch("eof"===i.type&&g(n,i,"json object"),i.type){case"{":r=function(e,n){return S(e,n,{},{skip:[":","}"],elementParser:b,elementName:"string",endSymbol:"}"})}(e,n);break;case"[":r=function(e,n){return S(e,n,[],{skip:["]"],elementParser:x,elementName:"json object",endSymbol:"]"})}(e,n);break;case"string":case"number":case"atom":r=i.value}return t&&(r=n.reviver?n.reviver("",r):r,function(e,n,t){if(n.pos<e.length&&m(n,e[n.pos],"Unexpected token: "+y(e[n.pos])+", expected end-of-input"),n.tolerant&&0!==n.warnings.length){var r=1===n.warnings.length?n.warnings[0].message:n.warnings.length+" parse warnings",i=new SyntaxError(r);throw i.line=n.warnings[0].line,i.warnings=n.warnings,i.obj=t,i}}(e,n,r)),r}function O(e,n){return JSON.stringify(n)+":"+j(e[n])}function j(e){switch(typeof e){case"string":case"number":case"boolean":return JSON.stringify(e)}if(Array.isArray(e))return"["+e.map(j).join(",")+"]";if(new Object(e)===e){var n=Object.keys(e);return n.sort(),"{"+n.map(O.bind(null,e))+"}"}return"null"}var P={transform:d,parse:function(e,n){if("function"==typeof n||void 0===n)return JSON.parse(d(e),n);if(new Object(n)!==n)throw new TypeError("opts/reviver should be undefined, a function or an object");if(n.relaxed=void 0===n.relaxed||n.relaxed,n.warnings=n.warnings||n.tolerant||!1,n.tolerant=n.tolerant||!1,n.duplicate=n.duplicate||!1,!n.warnings&&!n.relaxed)return JSON.parse(e,n.reviver);var t=n.relaxed?c(e):l(e);if(n.relaxed&&(t=p(t)),n.warnings)return k(t=t.filter((function(e){return" "!==e.type})),{pos:0,reviver:n.reviver,tolerant:n.tolerant,duplicate:n.duplicate,warnings:[]},!0);var r=t.reduce((function(e,n){return e+n.match}),"");return JSON.parse(r,n.reviver)},stringify:j};e.exports=P}()},112:function(e,n,t){"use strict";var r=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(i,o){function a(e){try{u(r.next(e))}catch(e){o(e)}}function s(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,s)}u((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.activate=void 0;const i=t(496),o=t(497),a=t(689),s=t(17);function u(){return r(this,void 0,void 0,(function*(){const e=yield function(){return r(this,void 0,void 0,(function*(){return yield function(){return r(this,void 0,void 0,(function*(){const[e]=yield Promise.all([(0,o.readFileAsync)((0,s.resolve)(__dirname,"..","settings/defaults.json"),"utf-8")]),n=a.parse(e),t=[];Object.keys(n);for(const e of Object.keys(n))t.push({name:e,value:n[e]});return t}))}()}))}();e&&e.length?yield function(e){return r(this,void 0,void 0,(function*(){return i.window.withProgress({location:i.ProgressLocation.Notification,title:"Importing Settings"},(n=>r(this,void 0,void 0,(function*(){n.report({increment:0});const t=100/e.length,r=i.workspace.getConfiguration();for(const o of e)try{yield r.update(o.name,o.value,i.ConfigurationTarget.Global),n.report({increment:t,message:o.name})}catch(e){return void i.window.showErrorMessage(e.message)}}))))}))}(e):i.window.showInformationMessage("Nothing to import. All settings have already been imported")}))}n.activate=function(e){return r(this,void 0,void 0,(function*(){e.globalState.setKeysForSync(["alreadyPrompted"]),e.subscriptions.push(i.commands.registerCommand("extension.importFromKeyboardDancer",(()=>u()))),e.globalState.get("alreadyPrompted"),yield function(){return r(this,void 0,void 0,(function*(){const e=yield i.window.showInformationMessage("Would you like to customize VS Code to behave more like Keyboard Dancer Text?","Yes","No");e&&"Yes"===e&&u()}))}(),yield e.globalState.update("alreadyPrompted",!0)}))}},497:function(e,n,t){"use strict";var r=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(i,o){function a(e){try{u(r.next(e))}catch(e){o(e)}}function s(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,s)}u((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.readFileAsync=n.promisifier=n.pathExists=void 0;const i=t(147);function o(e,...n){return new Promise(((t,r)=>e(...n,((e,n)=>e?r(e):t(n)))))}n.pathExists=function(e){return r(this,void 0,void 0,(function*(){try{return yield function(e,n){return o(i.access,e,n)}(e,i.constants.F_OK),!0}catch(e){return!1}}))},n.promisifier=o,n.readFileAsync=function(e,n){return r(this,void 0,void 0,(function*(){return yield o(i.readFile,e,n)}))}},496:e=>{"use strict";e.exports=require("vscode")},147:e=>{"use strict";e.exports=require("fs")},17:e=>{"use strict";e.exports=require("path")}},n={},t=function t(r){var i=n[r];if(void 0!==i)return i.exports;var o=n[r]={exports:{}};return e[r].call(o.exports,o,o.exports,t),o.exports}(112);module.exports=t})();
//# sourceMappingURL=extension.js.map