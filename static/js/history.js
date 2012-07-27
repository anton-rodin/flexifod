/*
 * history API JavaScript Library v3.1.0 beta
 *
 * Support: IE6+, FF3+, Opera 9+, Safari, Chrome
 *
 * Copyright 2011-2012, Dmitriy Pakhtinov ( spb.piksel@gmail.com )
 *
 * http://spb-piksel.ru/
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Update: 20-05-2012
 */
(function(e,z,s,j,T){function G(a,c,g){var d=2===a?e.onhashchange:e.onpopstate,b=2===a?"hashchange":"popstate",f=w[b];m.createEvent?(a=m.createEvent("Events"),a.initEvent(b,s,s)):(a=m.createEventObject(),a.type=b);a.state=n.state;a.oldURL=c;a.newURL=g;d&&d.call(e,a);c=0;for(g=f.length;c<g;c++)f[c].call(e,a)}function N(a){return H?a?H.setItem("__hitoryapi__",I(a)):O(H.getItem("__hitoryapi__"))||{}:{}}function P(a,c,g){var d=a,b,f=s;if(A||B)for(b in c){if(C.call(c,b))if(B)c[b].get&&B.call(a,b,c[b].get),
c[b].set&&Z.call(a,b,c[b].set);else if(A)try{A(a,b,c[b])}catch(h){if(g)return s;f=z;break}}else f=z;if(f&&x){g="StaticClass"+$+x++;d=["Class "+g];"execVB"in e||execScript("Function execVB(c) ExecuteGlobal(c) End Function","VBScript");"VBCVal"in e||execScript("Function VBCVal(o,r) If IsObject(o) Then Set r=o Else r=o End If End Function","VBScript");for(b in a)d[d.length]="Public ["+b+"]";C.call(a,"toString")&&(a.propertyIsEnumerable("toString")||(d[d.length]="Public [toString]"),c["(toString)"]={get:function(){return this.toString.call(this)}});
for(b in c)if(C.call(c,b)&&(c[b].get&&(a["get "+b]=c[b].get,d.push("Public [get "+b+"]","Public "+("(toString)"===b?"Default ":"")+"Property Get ["+b+"]","Call VBCVal(me.[get "+b+"].call(me),["+b+"])","End Property")),c[b].set))a["set "+b]=c[b].set,d.push("Public [set "+b+"]","Public Property Let ["+b+"](v)","Call me.[set "+b+"].call(me,v)","End Property","Public Property Set ["+b+"](v)","Call me.[set "+b+"].call(me,v)","End Property");d.push("End Class","Function "+g+"Factory()","Set "+g+"Factory=New "+
g,"End Function");execVB(d.join("\n"));d=e[g+"Factory"]();for(b in a)d[b]=a[b];C.call(a,"toString")&&(d.toString=a.toString)}return d}var m=e.document,r=e.history||{},f=e.location,p=!!r.pushState,aa=p&&r.state===T,u=f.href,v=e.JSON||{},A=Object.defineProperty,B=Object.prototype.__defineGetter__,Z=Object.prototype.__defineSetter__,U=r.pushState,V=r.replaceState,H=e.sessionStorage,C=Object.prototype.hasOwnProperty,ba=Object.prototype.toString,y=eval("/*@cc_on (@_jscript_version+'').replace(/\\d\\./, '');@*/"),
$=(new Date).getTime(),x=(A||B)&&(!y||8<y)?0:1,i=8>y?m.createElement("iframe"):s,D,E,F,J="",K=(D="addEventListener",e[D])||(D="attachEvent",J="on",e[D]),ca=(E="removeEventListener",e[E])||(E="detachEvent",e[E]),da=(F="dispatchEvent",e[F])||(F="fireEvent",e[F]),L=[],y=[],Q=0,w={onpopstate:L,popstate:L,onhashchange:y,hashchange:y},t=function(){var a,c,g,d={basepath:"/",redirect:0,type:"/"};g=m.getElementsByTagName("SCRIPT");for(a=0;g[a];a++)if(c=/(.*)\/(?:history|spike)(?:-\d\.\d(?:\.\d)?\w?)?(?:\.min)?.js\?(.*)$/i.exec(g[a].src)||
a===g.length-1&&2===(c=g[a].src.split("?")).length&&(c[2]=c[1])&&c){a=0;for(g=c[2].split("&");g[a];)c=g[a++].split("="),d[c[0]]="true"==c[1]?z:"false"==c[1]?s:c[1]||"";d.basepath=d.basepath||"/";break}return d}(),l=function(a){var c,g,d,b,e,h,q,i=RegExp("^"+t.basepath,"i");return function(k,j){if(k){if(!p)var o=l(),R=o.f,X=o.i,k=/^(?:[a-z]+\:)?\/\//.test(k)?0===k.indexOf("/")?X+k:k:X+"//"+o.h+(0===k.indexOf("/")?k:0===k.indexOf("?")?R+k:0===k.indexOf("#")?R+o.g+k:R.replace(/[^\/]+$/g,"")+k)}else if(k=
f.href,!p||j)k=f.protocol+"//"+f.host+t.basepath+(k.replace(/^[^#]*/,"")||"#").replace(RegExp("^#[/]?(?:"+t.type+")?"),"");if(c!==k){a.href=c=k;h=a.port;e=a.host;q=a.pathname;if("http:"===a.protocol&&80==h||"https:"===a.protocol&&443==h)e=a.hostname,h="";q=0===q.indexOf("/")?q:"/"+q;g=q+a.search+a.hash;b=q.replace(i,t.type)+a.search;d=b+a.hash}return{a:a.protocol+"//"+e+g,i:a.protocol,h:e,j:a.hostname||f.hostname,k:h||f.port,f:q,g:a.search,e:a.hash,b:g,c:b,d:d}}}(m.createElement("a")),n=!x?r:{back:r.back,
forward:r.forward,go:r.go,pushState:j,replaceState:j,emulate:!p,toString:function(){return"[object History]"}},M={state:{get:function(){return i&&i.storage||N()[n.location.href]||j}},length:{get:function(){return r.length}},location:{set:function(a){e.location=a},get:function(){return p?f:S}}},S={assign:function(a){f.assign(p||0!==a.indexOf("#")?a:"#"+l().c+a)},reload:f.reload,replace:function(a){f.replace(p||0!==a.indexOf("#")?a:"#"+l().c+a)},toString:function(){return this.href}},ea={href:{set:function(a){f.href=
a},get:function(){return l().a}},protocol:{set:function(a){f.protocol=a},get:function(){return f.protocol}},host:{set:function(a){f.host=a},get:function(){return f.host}},hostname:{set:function(a){f.hostname=a},get:function(){return f.hostname}},port:{set:function(a){f.port=a},get:function(){return f.port}},pathname:{set:function(a){f.pathname=a},get:function(){return l().f}},search:{set:function(a){f.search=a},get:function(){return l().g}},hash:{set:function(a){var a=0===a.indexOf("#")?a:"#"+a,c=
l();i?a!=c.e&&(n.pushState(j,j,c.c+a),Y({oldURL:c.a})):f.hash="#"+c.c+a},get:function(){return l().e}}},I=v.stringify||function(a){function c(d){var b,e,h;b=(typeof d).charCodeAt(2);if(114===b)d=g(d);else if(109===b)d=isFinite(d)?""+d:"null";else if(111===b||108===b)d=""+d;else if(106===b)if(d){e=(b="[object Array]"===ba.apply(d))?"[":"{";if(b)for(h=0;h<d.length;h++)e+=(0==h?"":",")+c(d[h]);else for(h in d)C.call(d,h)&&d[h]!==a&&(e+=(1==e.length?"":",")+g(h)+":"+c(d[h]));d=e+(b?"]":"}")}else d="null";
else d=a;return d}function g(a){var b=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,c={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};b.lastIndex=0;return b.test(a)?'"'+a.replace(b,function(a){var b=c[a];return"string"===typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}return c}(),O=function(){var a=v.parse;return function(c){return c?a?a(c):(new Function("return "+
c))():j}}(),Y=function(){function a(a){var c=l();if(Q)return q=c.a,Q=0;var d=a.oldURL||q,a=q=a.newURL||c.a,c=d.replace(/^.*?(#|$)/,""),e=a.replace(/^.*?(#|$)/,"");d!=a&&!b&&G();u=b=0;c!=e&&G(2,d,a)}function c(){if(u&&!(u=0)&&h.b!==t.basepath)clearInterval(i),setTimeout(G,10)}var g=e.onpopstate||j,d=e.onhashchange||j,b=0,i=j,h=l(),q=h.a;h.e.replace(/^#/,"");K(J+"hashchange",a,s);K(J+"popstate",function(){if(u===f.href)return u=0;u=0;G(b=1)},s);n.fixURL=function(a){return l(a).b};n=P(n,x?M:r.state===
T?{state:M.state,location:M.location}:{location:M.location});S=P(S,ea);e[D]=function(a,b,d,e){w[a]?(w[a].push(b),!p&&L===w[a]&&c()):K(a,b,d,e)};e[E]=function(a,b,c){var d=w[a];if(d)for(a=d.length;--a;){if(d[a]===b){d.splice(a,1);break}}else ca(a,b,c)};e[F]=function(a,b){var c=w[a],d=c===L?e.onpopstate:e.onhashchange;if(c){b=b||("string"==typeof a?e.event:a);try{b&&(b.target=e)}catch(g){try{b.srcElement=e}catch(h){}}d&&d.call(e,b);for(var d=0,f=c.length;d<f;d++)c[d].call(e,b);return z}return da(a,
b)};x&&execScript("Public history, onhashchange","VBScript");if((!A&&!B||!P(e,{onhashchange:{get:function(){return d},set:function(a){d=a||j}},onpopstate:{get:function(){return g},set:function(a){(g=a||j)&&!p&&c()}}},1))&&!p)i=setInterval(function(){e.onpopstate&&c()},100);if(t.redirect&&0===e.parent.frames.length){var W=l(j,z).b,k=f.search,m=f.pathname,o=t.basepath;if(p){if(W!=o&&RegExp("^"+o+"$","i").test(m)&&(f.href=W),!RegExp("^"+o,"i").test(m))f.href=m.replace(/^\//,o)+k}else m!=o&&(f.href=o+
"#"+m.replace(RegExp("^"+o,"i"),t.type)+k+f.hash)}return a}();n.pushState=function(a,c,e,d){var b=N(),i=l().a,h=e&&l(e);u=0;e=h?h.a:i;d&&b[i]&&delete b[i];if((!p||aa)&&H&&a)b[e]=a,N(b),a=j;U&&V?d?V.call(n,a,c,e):U.call(n,a,c,e):h&&h.b!=l().b&&(Q=1,d?f.replace("#"+h.d):f.hash=h.d)};n.replaceState=function(a,c,e){n.pushState(a,c,e,1)};x?(e.history=n,function(a,c){if(i){var g,d,b=function(){var a=l().a;c!=a&&Y({oldURL:c,newURL:c=a})};d=setInterval(b,100);i.src="javascript:true;";i=m.documentElement.firstChild.appendChild(i).contentWindow;
n.pushState=g=function(a,e,j,k,m){var o=i.document,n=["<script>","lfirst=1;",,"storage="+I(a)+";","<\/script>"];if(j=j&&l(j)){m||clearInterval(d);if(k)i.lfirst?(history.back(),g(a,e,j.a,0,1)):(i.storage=a,f.replace("#"+j.d));else if(j.a!=c||m)i.lfirst||(i.lfirst=1,g(i.storage,e,c,0,1)),n[2]='parent.location.hash="'+j.d.replace(/"/g,'\\"')+'";',o.open(),o.write(n.join("")),o.close();m||(c=l().a,d=setInterval(b,100))}else i.storage=a};K(J+"unload",function(){if(i.storage){var a={};a[l().a]=i.storage;
m.cookie="_historyAPI="+escape(I(a))}clearInterval(d)},s);if(1<a.length){a=unescape(a.pop().split(";").shift());try{i.storage=O(a)[l().a]}catch(j){}}!v.parse&&!v.stringify&&(v.parse=O,v.stringify=I,e.JSON=v)}}(m.cookie.split("_historyAPI="),l().a)):e.history.emulate=!p})(window,!0,!1,null);