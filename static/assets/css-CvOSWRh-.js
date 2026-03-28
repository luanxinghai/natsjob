import{B as e,H as t,V as n}from"./es-B79LZ8uf.js";import{A as r,E as i,F as a,H as o,M as s,O as c,P as l,b as u,d,ft as f,gt as p,i as m,tt as h,w as g,x as _}from"./runtime-core.esm-bundler-DUlfXqMs.js";import{_ as v,a as y,b,c as x,f as S,g as C,h as w,i as T,m as E,n as D,o as O,p as k,r as A,s as ee,t as j,u as M,v as te,x as ne,y as N}from"./light-BDZbohuo.js";import{c as re,l as P}from"./main-BwwytR1d.js";/* empty css            */function ie(e){return e.composedPath()[0]||null}function ae(e){return typeof e==`string`?e.endsWith(`px`)?Number(e.slice(0,e.length-2)):Number(e):e}function F(e){if(e!=null)return typeof e==`number`?`${e}px`:e.endsWith(`px`)?e:`${e}px`}function I(e,t){let n=e.trim().split(/\s+/g),r={top:n[0]};switch(n.length){case 1:r.right=n[0],r.bottom=n[0],r.left=n[0];break;case 2:r.right=n[1],r.left=n[1],r.bottom=n[0];break;case 3:r.right=n[1],r.bottom=n[2],r.left=n[1];break;case 4:r.right=n[1],r.bottom=n[2],r.left=n[3];break;default:throw Error(`[seemly/getMargin]:`+e+` is not a valid value.`)}return t===void 0?r:r[t]}function L(e){return e.composedPath()[0]}var oe={mousemoveoutside:new WeakMap,clickoutside:new WeakMap};function se(e,t,n){if(e===`mousemoveoutside`){let e=e=>{t.contains(L(e))||n(e)};return{mousemove:e,touchstart:e}}else if(e===`clickoutside`){let e=!1,r=n=>{e=!t.contains(L(n))},i=r=>{e&&(t.contains(L(r))||n(r))};return{mousedown:r,mouseup:i,touchstart:r,touchend:i}}return console.error(`[evtd/create-trap-handler]: name \`${e}\` is invalid. This could be a bug of evtd.`),{}}function ce(e,t,n){let r=oe[e],i=r.get(t);i===void 0&&r.set(t,i=new WeakMap);let a=i.get(n);return a===void 0&&i.set(n,a=se(e,t,n)),a}function le(e,t,n,r){if(e===`mousemoveoutside`||e===`clickoutside`){let i=ce(e,t,n);return Object.keys(i).forEach(e=>{R(e,document,i[e],r)}),!0}return!1}function ue(e,t,n,r){if(e===`mousemoveoutside`||e===`clickoutside`){let i=ce(e,t,n);return Object.keys(i).forEach(e=>{z(e,document,i[e],r)}),!0}return!1}function de(){if(typeof window>`u`)return{on:()=>{},off:()=>{}};let e=new WeakMap,t=new WeakMap;function n(){e.set(this,!0)}function r(){e.set(this,!0),t.set(this,!0)}function i(e,t,n){let r=e[t];return e[t]=function(){return n.apply(e,arguments),r.apply(e,arguments)},e}function a(e,t){e[t]=Event.prototype[t]}let o=new WeakMap,s=Object.getOwnPropertyDescriptor(Event.prototype,`currentTarget`);function c(){return o.get(this)??null}function l(e,t){s!==void 0&&Object.defineProperty(e,`currentTarget`,{configurable:!0,enumerable:!0,get:t??s.get})}let u={bubble:{},capture:{}},d={};function f(){let s=function(s){let{type:d,eventPhase:f,bubbles:p}=s,m=L(s);if(f===2)return;let h=f===1?`capture`:`bubble`,g=m,_=[];for(;g===null&&(g=window),_.push(g),g!==window;)g=g.parentNode||null;let v=u.capture[d],y=u.bubble[d];if(i(s,`stopPropagation`,n),i(s,`stopImmediatePropagation`,r),l(s,c),h===`capture`){if(v===void 0)return;for(let n=_.length-1;n>=0&&!e.has(s);--n){let e=_[n],r=v.get(e);if(r!==void 0){o.set(s,e);for(let e of r){if(t.has(s))break;e(s)}}if(n===0&&!p&&y!==void 0){let n=y.get(e);if(n!==void 0)for(let e of n){if(t.has(s))break;e(s)}}}}else if(h===`bubble`){if(y===void 0)return;for(let n=0;n<_.length&&!e.has(s);++n){let e=_[n],r=y.get(e);if(r!==void 0){o.set(s,e);for(let e of r){if(t.has(s))break;e(s)}}}}a(s,`stopPropagation`),a(s,`stopImmediatePropagation`),l(s)};return s.displayName=`evtdUnifiedHandler`,s}function p(){let e=function(e){let{type:t,eventPhase:n}=e;if(n!==2)return;let r=d[t];r!==void 0&&r.forEach(t=>t(e))};return e.displayName=`evtdUnifiedWindowEventHandler`,e}let m=f(),h=p();function g(e,t){let n=u[e];return n[t]===void 0&&(n[t]=new Map,window.addEventListener(t,m,e===`capture`)),n[t]}function _(e){return d[e]===void 0&&(d[e]=new Set,window.addEventListener(e,h)),d[e]}function v(e,t){let n=e.get(t);return n===void 0&&e.set(t,n=new Set),n}function y(e,t,n,r){let i=u[t][n];if(i!==void 0){let t=i.get(e);if(t!==void 0&&t.has(r))return!0}return!1}function b(e,t){let n=d[e];return!!(n!==void 0&&n.has(t))}function x(e,t,n,r){let i;if(i=typeof r==`object`&&r.once===!0?a=>{S(e,t,i,r),n(a)}:n,le(e,t,i,r))return;let a=v(g(r===!0||typeof r==`object`&&r.capture===!0?`capture`:`bubble`,e),t);if(a.has(i)||a.add(i),t===window){let t=_(e);t.has(i)||t.add(i)}}function S(e,t,n,r){if(ue(e,t,n,r))return;let i=r===!0||typeof r==`object`&&r.capture===!0,a=i?`capture`:`bubble`,o=g(a,e),s=v(o,t);if(t===window&&!y(t,i?`bubble`:`capture`,e,n)&&b(e,n)){let t=d[e];t.delete(n),t.size===0&&(window.removeEventListener(e,h),d[e]=void 0)}s.has(n)&&s.delete(n),s.size===0&&o.delete(t),o.size===0&&(window.removeEventListener(e,m,a===`capture`),u[a][e]=void 0)}return{on:x,off:S}}var{on:R,off:z}=de(),fe=(typeof window>`u`?!1:/iPad|iPhone|iPod/.test(navigator.platform)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1)&&!window.MSStream;function pe(){return fe}function me(e){let t={isDeactivated:!1},n=!1;return r(()=>{if(t.isDeactivated=!1,!n){n=!0;return}e()}),l(()=>{t.isDeactivated=!0,n||=!0}),t}function B(e,t){console.error(`[vueuc/${e}]: ${t}`)}var V=[],he=function(){return V.some(function(e){return e.activeTargets.length>0})},H=function(){return V.some(function(e){return e.skippedTargets.length>0})},ge=`ResizeObserver loop completed with undelivered notifications.`,_e=function(){var e;typeof ErrorEvent==`function`?e=new ErrorEvent(`error`,{message:ge}):(e=document.createEvent(`Event`),e.initEvent(`error`,!1,!1),e.message=ge),window.dispatchEvent(e)},U;(function(e){e.BORDER_BOX=`border-box`,e.CONTENT_BOX=`content-box`,e.DEVICE_PIXEL_CONTENT_BOX=`device-pixel-content-box`})(U||={});var W=function(e){return Object.freeze(e)},ve=function(){function e(e,t){this.inlineSize=e,this.blockSize=t,W(this)}return e}(),ye=function(){function e(e,t,n,r){return this.x=e,this.y=t,this.width=n,this.height=r,this.top=this.y,this.left=this.x,this.bottom=this.top+this.height,this.right=this.left+this.width,W(this)}return e.prototype.toJSON=function(){var e=this;return{x:e.x,y:e.y,top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.width,height:e.height}},e.fromRect=function(t){return new e(t.x,t.y,t.width,t.height)},e}(),G=function(e){return e instanceof SVGElement&&`getBBox`in e},be=function(e){if(G(e)){var t=e.getBBox(),n=t.width,r=t.height;return!n&&!r}var i=e,a=i.offsetWidth,o=i.offsetHeight;return!(a||o||e.getClientRects().length)},xe=function(e){if(e instanceof Element)return!0;var t=e?.ownerDocument?.defaultView;return!!(t&&e instanceof t.Element)},K=function(e){switch(e.tagName){case`INPUT`:if(e.type!==`image`)break;case`VIDEO`:case`AUDIO`:case`EMBED`:case`OBJECT`:case`CANVAS`:case`IFRAME`:case`IMG`:return!0}return!1},q=typeof window<`u`?window:{},J=new WeakMap,Se=/auto|scroll/,Ce=/^tb|vertical/,we=/msie|trident/i.test(q.navigator&&q.navigator.userAgent),Y=function(e){return parseFloat(e||`0`)},X=function(e,t,n){return e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=!1),new ve((n?t:e)||0,(n?e:t)||0)},Z=W({devicePixelContentBoxSize:X(),borderBoxSize:X(),contentBoxSize:X(),contentRect:new ye(0,0,0,0)}),Q=function(e,t){if(t===void 0&&(t=!1),J.has(e)&&!t)return J.get(e);if(be(e))return J.set(e,Z),Z;var n=getComputedStyle(e),r=G(e)&&e.ownerSVGElement&&e.getBBox(),i=!we&&n.boxSizing===`border-box`,a=Ce.test(n.writingMode||``),o=!r&&Se.test(n.overflowY||``),s=!r&&Se.test(n.overflowX||``),c=r?0:Y(n.paddingTop),l=r?0:Y(n.paddingRight),u=r?0:Y(n.paddingBottom),d=r?0:Y(n.paddingLeft),f=r?0:Y(n.borderTopWidth),p=r?0:Y(n.borderRightWidth),m=r?0:Y(n.borderBottomWidth),h=r?0:Y(n.borderLeftWidth),g=d+l,_=c+u,v=h+p,y=f+m,b=s?e.offsetHeight-y-e.clientHeight:0,x=o?e.offsetWidth-v-e.clientWidth:0,S=i?g+v:0,C=i?_+y:0,w=r?r.width:Y(n.width)-S-x,T=r?r.height:Y(n.height)-C-b,E=w+g+x+v,D=T+_+b+y,O=W({devicePixelContentBoxSize:X(Math.round(w*devicePixelRatio),Math.round(T*devicePixelRatio),a),borderBoxSize:X(E,D,a),contentBoxSize:X(w,T,a),contentRect:new ye(d,c,w,T)});return J.set(e,O),O},Te=function(e,t,n){var r=Q(e,n),i=r.borderBoxSize,a=r.contentBoxSize,o=r.devicePixelContentBoxSize;switch(t){case U.DEVICE_PIXEL_CONTENT_BOX:return o;case U.BORDER_BOX:return i;default:return a}},Ee=function(){function e(e){var t=Q(e);this.target=e,this.contentRect=t.contentRect,this.borderBoxSize=W([t.borderBoxSize]),this.contentBoxSize=W([t.contentBoxSize]),this.devicePixelContentBoxSize=W([t.devicePixelContentBoxSize])}return e}(),De=function(e){if(be(e))return 1/0;for(var t=0,n=e.parentNode;n;)t+=1,n=n.parentNode;return t},Oe=function(){var e=1/0,t=[];V.forEach(function(n){if(n.activeTargets.length!==0){var r=[];n.activeTargets.forEach(function(t){var n=new Ee(t.target),i=De(t.target);r.push(n),t.lastReportedSize=Te(t.target,t.observedBox),i<e&&(e=i)}),t.push(function(){n.callback.call(n.observer,r,n.observer)}),n.activeTargets.splice(0,n.activeTargets.length)}});for(var n=0,r=t;n<r.length;n++){var i=r[n];i()}return e},ke=function(e){V.forEach(function(t){t.activeTargets.splice(0,t.activeTargets.length),t.skippedTargets.splice(0,t.skippedTargets.length),t.observationTargets.forEach(function(n){n.isActive()&&(De(n.target)>e?t.activeTargets.push(n):t.skippedTargets.push(n))})})},Ae=function(){var e=0;for(ke(e);he();)e=Oe(),ke(e);return H()&&_e(),e>0},$,je=[],Me=function(){return je.splice(0).forEach(function(e){return e()})},Ne=function(e){if(!$){var t=0,n=document.createTextNode(``);new MutationObserver(function(){return Me()}).observe(n,{characterData:!0}),$=function(){n.textContent=`${t?t--:t++}`}}je.push(e),$()},Pe=function(e){Ne(function(){requestAnimationFrame(e)})},Fe=0,Ie=function(){return!!Fe},Le=250,Re={attributes:!0,characterData:!0,childList:!0,subtree:!0},ze=[`resize`,`load`,`transitionend`,`animationend`,`animationstart`,`animationiteration`,`keyup`,`keydown`,`mouseup`,`mousedown`,`mouseover`,`mouseout`,`blur`,`focus`],Be=function(e){return e===void 0&&(e=0),Date.now()+e},Ve=!1,He=new(function(){function e(){var e=this;this.stopped=!0,this.listener=function(){return e.schedule()}}return e.prototype.run=function(e){var t=this;if(e===void 0&&(e=Le),!Ve){Ve=!0;var n=Be(e);Pe(function(){var r=!1;try{r=Ae()}finally{if(Ve=!1,e=n-Be(),!Ie())return;r?t.run(1e3):e>0?t.run(e):t.start()}})}},e.prototype.schedule=function(){this.stop(),this.run()},e.prototype.observe=function(){var e=this,t=function(){return e.observer&&e.observer.observe(document.body,Re)};document.body?t():q.addEventListener(`DOMContentLoaded`,t)},e.prototype.start=function(){var e=this;this.stopped&&(this.stopped=!1,this.observer=new MutationObserver(this.listener),this.observe(),ze.forEach(function(t){return q.addEventListener(t,e.listener,!0)}))},e.prototype.stop=function(){var e=this;this.stopped||=(this.observer&&this.observer.disconnect(),ze.forEach(function(t){return q.removeEventListener(t,e.listener,!0)}),!0)},e}()),Ue=function(e){!Fe&&e>0&&He.start(),Fe+=e,!Fe&&He.stop()},We=function(e){return!G(e)&&!K(e)&&getComputedStyle(e).display===`inline`},Ge=function(){function e(e,t){this.target=e,this.observedBox=t||U.CONTENT_BOX,this.lastReportedSize={inlineSize:0,blockSize:0}}return e.prototype.isActive=function(){var e=Te(this.target,this.observedBox,!0);return We(this.target)&&(this.lastReportedSize=e),this.lastReportedSize.inlineSize!==e.inlineSize||this.lastReportedSize.blockSize!==e.blockSize},e}(),Ke=function(){function e(e,t){this.activeTargets=[],this.skippedTargets=[],this.observationTargets=[],this.observer=e,this.callback=t}return e}(),qe=new WeakMap,Je=function(e,t){for(var n=0;n<e.length;n+=1)if(e[n].target===t)return n;return-1},Ye=function(){function e(){}return e.connect=function(e,t){var n=new Ke(e,t);qe.set(e,n)},e.observe=function(e,t,n){var r=qe.get(e),i=r.observationTargets.length===0;Je(r.observationTargets,t)<0&&(i&&V.push(r),r.observationTargets.push(new Ge(t,n&&n.box)),Ue(1),He.schedule())},e.unobserve=function(e,t){var n=qe.get(e),r=Je(n.observationTargets,t),i=n.observationTargets.length===1;r>=0&&(i&&V.splice(V.indexOf(n),1),n.observationTargets.splice(r,1),Ue(-1))},e.disconnect=function(e){var t=this,n=qe.get(e);n.observationTargets.slice().forEach(function(n){return t.unobserve(e,n.target)}),n.activeTargets.splice(0,n.activeTargets.length)},e}(),Xe=function(){function e(e){if(arguments.length===0)throw TypeError(`Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.`);if(typeof e!=`function`)throw TypeError(`Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.`);Ye.connect(this,e)}return e.prototype.observe=function(e,t){if(arguments.length===0)throw TypeError(`Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.`);if(!xe(e))throw TypeError(`Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element`);Ye.observe(this,e,t)},e.prototype.unobserve=function(e){if(arguments.length===0)throw TypeError(`Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.`);if(!xe(e))throw TypeError(`Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element`);Ye.unobserve(this,e)},e.prototype.disconnect=function(){Ye.disconnect(this)},e.toString=function(){return`function ResizeObserver () { [polyfill code] }`},e}(),Ze=new class{constructor(){this.handleResize=this.handleResize.bind(this),this.observer=new(typeof window<`u`&&window.ResizeObserver||Xe)(this.handleResize),this.elHandlersMap=new Map}handleResize(e){for(let t of e){let e=this.elHandlersMap.get(t.target);e!==void 0&&e(t)}}registerHandler(e,t){this.elHandlersMap.set(e,t),this.observer.observe(e)}unregisterHandler(e){this.elHandlersMap.has(e)&&(this.elHandlersMap.delete(e),this.observer.unobserve(e))}},Qe=u({name:`ResizeObserver`,props:{onResize:Function},setup(e){let t=!1,n=_().proxy;function r(t){let{onResize:n}=e;n!==void 0&&n(t)}a(()=>{let e=n.$el;if(e===void 0){B(`resize-observer`,`$el does not exist.`);return}if(e.nextElementSibling!==e.nextSibling&&e.nodeType===3&&e.nodeValue!==``){B(`resize-observer`,`$el can not be observed (it may be a text node).`);return}e.nextElementSibling!==null&&(Ze.registerHandler(e.nextElementSibling,r),t=!0)}),s(()=>{t&&Ze.unregisterHandler(n.$el.nextElementSibling)})},render(){return o(this.$slots,`default`)}});function $e(e){let{left:t,right:n,top:r,bottom:i}=I(e);return`${r} ${t} ${i} ${n}`}var et=u({render(){var e;return(e=this.$slots).default?.call(e)}});function tt(t,n,r){var i=t.length;return r=r===void 0?i:r,!n&&r>=i?t:e(t,n,r)}var nt=RegExp(`[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]`);function rt(e){return nt.test(e)}function it(e){return e.split(``)}var at=`\\ud800-\\udfff`,ot=`\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff`,st=`\\ufe0e\\ufe0f`,ct=`[`+at+`]`,lt=`[`+ot+`]`,ut=`\\ud83c[\\udffb-\\udfff]`,dt=`(?:`+lt+`|`+ut+`)`,ft=`[^`+at+`]`,pt=`(?:\\ud83c[\\udde6-\\uddff]){2}`,mt=`[\\ud800-\\udbff][\\udc00-\\udfff]`,ht=`\\u200d`,gt=dt+`?`,_t=`[`+st+`]?`,vt=`(?:`+ht+`(?:`+[ft,pt,mt].join(`|`)+`)`+_t+gt+`)*`,yt=_t+gt+vt,bt=`(?:`+[ft+lt+`?`,lt,pt,mt,ct].join(`|`)+`)`,xt=RegExp(ut+`(?=`+ut+`)|`+bt+yt,`g`);function St(e){return e.match(xt)||[]}function Ct(e){return rt(e)?St(e):it(e)}function wt(e){return function(t){t=n(t);var r=rt(t)?Ct(t):void 0,i=r?r[0]:t.charAt(0),a=r?tt(r,1).join(``):t.slice(1);return i[e]()+a}}var Tt=wt(`toUpperCase`);function Et(e,t){let n=u({render(){return t()}});return u({name:Tt(e),setup(){let t=i(P,null)?.mergedIconsRef;return()=>{let r=t?.value?.[e];return r?r():g(n,null)}}})}var Dt=Et(`close`,()=>g(`svg`,{viewBox:`0 0 12 12`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`,"aria-hidden":!0},g(`g`,{stroke:`none`,"stroke-width":`1`,fill:`none`,"fill-rule":`evenodd`},g(`g`,{fill:`currentColor`,"fill-rule":`nonzero`},g(`path`,{d:`M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z`}))))),Ot=w(`base-close`,`
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: transparent;
 color: var(--n-close-icon-color);
 border-radius: var(--n-close-border-radius);
 height: var(--n-close-size);
 width: var(--n-close-size);
 font-size: var(--n-close-icon-size);
 outline: none;
 border: none;
 position: relative;
 padding: 0;
`,[v(`absolute`,`
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),E(`&::before`,`
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `),te(`disabled`,[E(`&:hover`,`
 color: var(--n-close-icon-color-hover);
 `),E(`&:hover::before`,`
 background-color: var(--n-close-color-hover);
 `),E(`&:focus::before`,`
 background-color: var(--n-close-color-hover);
 `),E(`&:active`,`
 color: var(--n-close-icon-color-pressed);
 `),E(`&:active::before`,`
 background-color: var(--n-close-color-pressed);
 `)]),v(`disabled`,`
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),v(`round`,[E(`&::before`,`
 border-radius: 50%;
 `)])]),kt=u({name:`BaseClose`,props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(e){return T(`-base-close`,Ot,p(e,`clsPrefix`)),()=>{let{clsPrefix:t,disabled:n,absolute:r,round:i,isButtonTag:a}=e;return g(a?`button`:`div`,{type:a?`button`:void 0,tabindex:n||!e.focusable?-1:0,"aria-disabled":n,"aria-label":`close`,role:a?void 0:`button`,disabled:n,class:[`${t}-base-close`,r&&`${t}-base-close--absolute`,n&&`${t}-base-close--disabled`,i&&`${t}-base-close--round`],onMousedown:t=>{e.focusable||t.preventDefault()},onClick:e.onClick},g(D,{clsPrefix:t},{default:()=>g(Dt,null)}))}}}),{cubicBezierEaseInOut:At}=y;function jt({name:e=`fade-in`,enterDuration:t=`0.2s`,leaveDuration:n=`0.2s`,enterCubicBezier:r=At,leaveCubicBezier:i=At}={}){return[E(`&.${e}-transition-enter-active`,{transition:`all ${t} ${r}!important`}),E(`&.${e}-transition-leave-active`,{transition:`all ${n} ${i}!important`}),E(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`,{opacity:0}),E(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`,{opacity:1})]}var Mt={railInsetHorizontalBottom:`auto 2px 4px 2px`,railInsetHorizontalTop:`4px 2px auto 2px`,railInsetVerticalRight:`2px 4px 2px auto`,railInsetVerticalLeft:`2px auto 2px 4px`,railColor:`transparent`};function Nt(e){let{scrollbarColor:t,scrollbarColorHover:n,scrollbarHeight:r,scrollbarWidth:i,scrollbarBorderRadius:a}=e;return Object.assign(Object.assign({},Mt),{height:r,width:i,borderRadius:a,color:t,colorHover:n})}var Pt={name:`Scrollbar`,common:j,self:Nt},Ft=w(`scrollbar`,`
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`,[E(`>`,[w(`scrollbar-container`,`
 width: 100%;
 overflow: scroll;
 height: 100%;
 min-height: inherit;
 max-height: inherit;
 scrollbar-width: none;
 `,[E(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `),E(`>`,[w(`scrollbar-content`,`
 box-sizing: border-box;
 min-width: 100%;
 `)])])]),E(`>, +`,[w(`scrollbar-rail`,`
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `,[v(`horizontal`,`
 height: var(--n-scrollbar-height);
 `,[E(`>`,[C(`scrollbar`,`
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]),v(`horizontal--top`,`
 top: var(--n-scrollbar-rail-top-horizontal-top); 
 right: var(--n-scrollbar-rail-right-horizontal-top); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-top); 
 left: var(--n-scrollbar-rail-left-horizontal-top); 
 `),v(`horizontal--bottom`,`
 top: var(--n-scrollbar-rail-top-horizontal-bottom); 
 right: var(--n-scrollbar-rail-right-horizontal-bottom); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-bottom); 
 left: var(--n-scrollbar-rail-left-horizontal-bottom); 
 `),v(`vertical`,`
 width: var(--n-scrollbar-width);
 `,[E(`>`,[C(`scrollbar`,`
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]),v(`vertical--left`,`
 top: var(--n-scrollbar-rail-top-vertical-left); 
 right: var(--n-scrollbar-rail-right-vertical-left); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-left); 
 left: var(--n-scrollbar-rail-left-vertical-left); 
 `),v(`vertical--right`,`
 top: var(--n-scrollbar-rail-top-vertical-right); 
 right: var(--n-scrollbar-rail-right-vertical-right); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-right); 
 left: var(--n-scrollbar-rail-left-vertical-right); 
 `),v(`disabled`,[E(`>`,[C(`scrollbar`,`pointer-events: none;`)])]),E(`>`,[C(`scrollbar`,`
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `,[jt(),E(`&:hover`,`background-color: var(--n-scrollbar-color-hover);`)])])])])]),It=u({name:`Scrollbar`,props:Object.assign(Object.assign({},A.props),{duration:{type:Number,default:0},scrollable:{type:Boolean,default:!0},xScrollable:Boolean,trigger:{type:String,default:`hover`},useUnifiedContainer:Boolean,triggerDisplayManually:Boolean,container:Function,content:Function,containerClass:String,containerStyle:[String,Object],contentClass:[String,Array],contentStyle:[String,Object],horizontalRailStyle:[String,Object],verticalRailStyle:[String,Object],onScroll:Function,onWheel:Function,onResize:Function,internalOnUpdateScrollLeft:Function,internalHoistYRail:Boolean,internalExposeWidthCssVar:Boolean,yPlacement:{type:String,default:`right`},xPlacement:{type:String,default:`bottom`}}),inheritAttrs:!1,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedRtlRef:r}=re(e),i=O(`Scrollbar`,r,t),o=f(null),c=f(null),l=f(null),u=f(null),p=f(null),m=f(null),g=f(null),_=f(null),v=f(null),y=f(null),b=f(null),x=f(0),S=f(0),C=f(!1),w=f(!1),T=!1,E=!1,D,k,j=0,M=0,te=0,ne=0,N=pe(),P=A(`Scrollbar`,`-scrollbar`,Ft,Pt,e,t),F=d(()=>{let{value:e}=_,{value:t}=m,{value:n}=y;return e===null||t===null||n===null?0:Math.min(e,n*e/t+ae(P.value.self.width)*1.5)}),L=d(()=>`${F.value}px`),oe=d(()=>{let{value:e}=v,{value:t}=g,{value:n}=b;return e===null||t===null||n===null?0:n*e/t+ae(P.value.self.height)*1.5}),se=d(()=>`${oe.value}px`),ce=d(()=>{let{value:e}=_,{value:t}=x,{value:n}=m,{value:r}=y;if(e===null||n===null||r===null)return 0;{let i=n-e;return i?t/i*(r-F.value):0}}),le=d(()=>`${ce.value}px`),ue=d(()=>{let{value:e}=v,{value:t}=S,{value:n}=g,{value:r}=b;if(e===null||n===null||r===null)return 0;{let i=n-e;return i?t/i*(r-oe.value):0}}),de=d(()=>`${ue.value}px`),fe=d(()=>{let{value:e}=_,{value:t}=m;return e!==null&&t!==null&&t>e}),B=d(()=>{let{value:e}=v,{value:t}=g;return e!==null&&t!==null&&t>e}),V=d(()=>{let{trigger:t}=e;return t===`none`||C.value}),he=d(()=>{let{trigger:t}=e;return t===`none`||w.value}),H=d(()=>{let{container:t}=e;return t?t():c.value}),ge=d(()=>{let{content:t}=e;return t?t():l.value}),_e=(t,n)=>{if(!e.scrollable)return;if(typeof t==`number`){G(t,n??0,0,!1,`auto`);return}let{left:r,top:i,index:a,elSize:o,position:s,behavior:c,el:l,debounce:u=!0}=t;(r!==void 0||i!==void 0)&&G(r??0,i??0,0,!1,c),l===void 0?a!==void 0&&o!==void 0?G(0,a*o,o,u,c):s===`bottom`?G(0,2**53-1,0,!1,c):s===`top`&&G(0,0,0,!1,c):G(0,l.offsetTop,l.offsetHeight,u,c)},U=me(()=>{e.container||_e({top:x.value,left:S.value})}),W=()=>{U.isDeactivated||Q()},ve=t=>{if(U.isDeactivated)return;let{onResize:n}=e;n&&n(t),Q()},ye=(t,n)=>{if(!e.scrollable)return;let{value:r}=H;r&&(typeof t==`object`?r.scrollBy(t):r.scrollBy(t,n||0))};function G(e,t,n,r,i){let{value:a}=H;if(a){if(r){let{scrollTop:r,offsetHeight:o}=a;if(t>r){t+n<=r+o||a.scrollTo({left:e,top:t+n-o,behavior:i});return}}a.scrollTo({left:e,top:t,behavior:i})}}function be(){Se(),Ce(),Q()}function xe(){K()}function K(){q(),J()}function q(){k!==void 0&&window.clearTimeout(k),k=window.setTimeout(()=>{w.value=!1},e.duration)}function J(){D!==void 0&&window.clearTimeout(D),D=window.setTimeout(()=>{C.value=!1},e.duration)}function Se(){D!==void 0&&window.clearTimeout(D),C.value=!0}function Ce(){k!==void 0&&window.clearTimeout(k),w.value=!0}function we(t){let{onScroll:n}=e;n&&n(t),Y()}function Y(){let{value:e}=H;e&&(x.value=e.scrollTop,S.value=e.scrollLeft*(i?.value?-1:1))}function X(){let{value:e}=ge;e&&(m.value=e.offsetHeight,g.value=e.offsetWidth);let{value:t}=H;t&&(_.value=t.offsetHeight,v.value=t.offsetWidth);let{value:n}=p,{value:r}=u;n&&(b.value=n.offsetWidth),r&&(y.value=r.offsetHeight)}function Z(){let{value:e}=H;e&&(x.value=e.scrollTop,S.value=e.scrollLeft*(i?.value?-1:1),_.value=e.offsetHeight,v.value=e.offsetWidth,m.value=e.scrollHeight,g.value=e.scrollWidth);let{value:t}=p,{value:n}=u;t&&(b.value=t.offsetWidth),n&&(y.value=n.offsetHeight)}function Q(){e.scrollable&&(e.useUnifiedContainer?Z():(X(),Y()))}function Te(e){return!o.value?.contains(ie(e))}function Ee(e){e.preventDefault(),e.stopPropagation(),E=!0,R(`mousemove`,window,De,!0),R(`mouseup`,window,Oe,!0),M=S.value,te=i?.value?window.innerWidth-e.clientX:e.clientX}function De(t){if(!E)return;D!==void 0&&window.clearTimeout(D),k!==void 0&&window.clearTimeout(k);let{value:n}=v,{value:r}=g,{value:a}=oe;if(n===null||r===null)return;let o=(i?.value?window.innerWidth-t.clientX-te:t.clientX-te)*(r-n)/(n-a),s=r-n,c=M+o;c=Math.min(s,c),c=Math.max(c,0);let{value:l}=H;if(l){l.scrollLeft=c*(i?.value?-1:1);let{internalOnUpdateScrollLeft:t}=e;t&&t(c)}}function Oe(e){e.preventDefault(),e.stopPropagation(),z(`mousemove`,window,De,!0),z(`mouseup`,window,Oe,!0),E=!1,Q(),Te(e)&&K()}function ke(e){e.preventDefault(),e.stopPropagation(),T=!0,R(`mousemove`,window,Ae,!0),R(`mouseup`,window,$,!0),j=x.value,ne=e.clientY}function Ae(e){if(!T)return;D!==void 0&&window.clearTimeout(D),k!==void 0&&window.clearTimeout(k);let{value:t}=_,{value:n}=m,{value:r}=F;if(t===null||n===null)return;let i=(e.clientY-ne)*(n-t)/(t-r),a=n-t,o=j+i;o=Math.min(a,o),o=Math.max(o,0);let{value:s}=H;s&&(s.scrollTop=o)}function $(e){e.preventDefault(),e.stopPropagation(),z(`mousemove`,window,Ae,!0),z(`mouseup`,window,$,!0),T=!1,Q(),Te(e)&&K()}h(()=>{let{value:e}=B,{value:n}=fe,{value:r}=t,{value:i}=p,{value:a}=u;i&&(e?i.classList.remove(`${r}-scrollbar-rail--disabled`):i.classList.add(`${r}-scrollbar-rail--disabled`)),a&&(n?a.classList.remove(`${r}-scrollbar-rail--disabled`):a.classList.add(`${r}-scrollbar-rail--disabled`))}),a(()=>{e.container||Q()}),s(()=>{D!==void 0&&window.clearTimeout(D),k!==void 0&&window.clearTimeout(k),z(`mousemove`,window,Ae,!0),z(`mouseup`,window,$,!0)});let je=d(()=>{let{common:{cubicBezierEaseInOut:e},self:{color:t,colorHover:n,height:r,width:a,borderRadius:o,railInsetHorizontalTop:s,railInsetHorizontalBottom:c,railInsetVerticalRight:l,railInsetVerticalLeft:u,railColor:d}}=P.value,{top:f,right:p,bottom:m,left:h}=I(s),{top:g,right:_,bottom:v,left:y}=I(c),{top:b,right:x,bottom:S,left:C}=I(i?.value?$e(l):l),{top:w,right:T,bottom:E,left:D}=I(i?.value?$e(u):u);return{"--n-scrollbar-bezier":e,"--n-scrollbar-color":t,"--n-scrollbar-color-hover":n,"--n-scrollbar-border-radius":o,"--n-scrollbar-width":a,"--n-scrollbar-height":r,"--n-scrollbar-rail-top-horizontal-top":f,"--n-scrollbar-rail-right-horizontal-top":p,"--n-scrollbar-rail-bottom-horizontal-top":m,"--n-scrollbar-rail-left-horizontal-top":h,"--n-scrollbar-rail-top-horizontal-bottom":g,"--n-scrollbar-rail-right-horizontal-bottom":_,"--n-scrollbar-rail-bottom-horizontal-bottom":v,"--n-scrollbar-rail-left-horizontal-bottom":y,"--n-scrollbar-rail-top-vertical-right":b,"--n-scrollbar-rail-right-vertical-right":x,"--n-scrollbar-rail-bottom-vertical-right":S,"--n-scrollbar-rail-left-vertical-right":C,"--n-scrollbar-rail-top-vertical-left":w,"--n-scrollbar-rail-right-vertical-left":T,"--n-scrollbar-rail-bottom-vertical-left":E,"--n-scrollbar-rail-left-vertical-left":D,"--n-scrollbar-rail-color":d}}),Me=n?ee(`scrollbar`,void 0,je,e):void 0;return Object.assign(Object.assign({},{scrollTo:_e,scrollBy:ye,sync:Q,syncUnifiedContainer:Z,handleMouseEnterWrapper:be,handleMouseLeaveWrapper:xe}),{mergedClsPrefix:t,rtlEnabled:i,containerScrollTop:x,wrapperRef:o,containerRef:c,contentRef:l,yRailRef:u,xRailRef:p,needYBar:fe,needXBar:B,yBarSizePx:L,xBarSizePx:se,yBarTopPx:le,xBarLeftPx:de,isShowXBar:V,isShowYBar:he,isIos:N,handleScroll:we,handleContentResize:W,handleContainerResize:ve,handleYScrollMouseDown:ke,handleXScrollMouseDown:Ee,containerWidth:v,cssVars:n?void 0:je,themeClass:Me?.themeClass,onRender:Me?.onRender})},render(){let{$slots:e,mergedClsPrefix:n,triggerDisplayManually:r,rtlEnabled:i,internalHoistYRail:a,yPlacement:o,xPlacement:s,xScrollable:l}=this;if(!this.scrollable)return e.default?.call(e);let u=this.trigger===`none`,d=(e,r)=>g(`div`,{ref:`yRailRef`,class:[`${n}-scrollbar-rail`,`${n}-scrollbar-rail--vertical`,`${n}-scrollbar-rail--vertical--${o}`,e],"data-scrollbar-rail":!0,style:[r||``,this.verticalRailStyle],"aria-hidden":!0},g(u?et:t,u?null:{name:`fade-in-transition`},{default:()=>this.needYBar&&this.isShowYBar&&!this.isIos?g(`div`,{class:`${n}-scrollbar-rail__scrollbar`,style:{height:this.yBarSizePx,top:this.yBarTopPx},onMousedown:this.handleYScrollMouseDown}):null})),f=()=>{var o;return(o=this.onRender)==null||o.call(this),g(`div`,c(this.$attrs,{role:`none`,ref:`wrapperRef`,class:[`${n}-scrollbar`,this.themeClass,i&&`${n}-scrollbar--rtl`],style:this.cssVars,onMouseenter:r?void 0:this.handleMouseEnterWrapper,onMouseleave:r?void 0:this.handleMouseLeaveWrapper}),[this.container?e.default?.call(e):g(`div`,{role:`none`,ref:`containerRef`,class:[`${n}-scrollbar-container`,this.containerClass],style:[this.containerStyle,this.internalExposeWidthCssVar?{"--n-scrollbar-current-width":F(this.containerWidth)}:void 0],onScroll:this.handleScroll,onWheel:this.onWheel},g(Qe,{onResize:this.handleContentResize},{default:()=>g(`div`,{ref:`contentRef`,role:`none`,style:[{width:this.xScrollable?`fit-content`:null},this.contentStyle],class:[`${n}-scrollbar-content`,this.contentClass]},e)})),a?null:d(void 0,void 0),l&&g(`div`,{ref:`xRailRef`,class:[`${n}-scrollbar-rail`,`${n}-scrollbar-rail--horizontal`,`${n}-scrollbar-rail--horizontal--${s}`],style:this.horizontalRailStyle,"data-scrollbar-rail":!0,"aria-hidden":!0},g(u?et:t,u?null:{name:`fade-in-transition`},{default:()=>this.needXBar&&this.isShowXBar&&!this.isIos?g(`div`,{class:`${n}-scrollbar-rail__scrollbar`,style:{width:this.xBarSizePx,right:i?this.xBarLeftPx:void 0,left:i?void 0:this.xBarLeftPx},onMousedown:this.handleXScrollMouseDown}):null}))])},p=this.container?f():g(Qe,{onResize:this.handleContainerResize},{default:f});return a?g(m,null,p,d(this.themeClass,this.cssVars)):p}}),Lt={paddingSmall:`12px 16px 12px`,paddingMedium:`19px 24px 20px`,paddingLarge:`23px 32px 24px`,paddingHuge:`27px 40px 28px`,titleFontSizeSmall:`16px`,titleFontSizeMedium:`18px`,titleFontSizeLarge:`18px`,titleFontSizeHuge:`18px`,closeIconSize:`18px`,closeSize:`22px`};function Rt(e){let{primaryColor:t,borderRadius:n,lineHeight:r,fontSize:i,cardColor:a,textColor2:o,textColor1:s,dividerColor:c,fontWeightStrong:l,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,closeColorHover:p,closeColorPressed:m,modalColor:h,boxShadow1:g,popoverColor:_,actionColor:v}=e;return Object.assign(Object.assign({},Lt),{lineHeight:r,color:a,colorModal:h,colorPopover:_,colorTarget:t,colorEmbedded:v,colorEmbeddedModal:v,colorEmbeddedPopover:v,textColor:o,titleTextColor:s,borderColor:c,actionColor:v,titleFontWeight:l,closeColorHover:p,closeColorPressed:m,closeBorderRadius:n,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,fontSizeSmall:i,fontSizeMedium:i,fontSizeLarge:i,fontSizeHuge:i,boxShadow:g,borderRadius:n})}var zt={name:`Card`,common:j,self:Rt},Bt=w(`card-content`,`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),Vt=E([w(`card`,`
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 display: flex;
 flex-direction: column;
 width: 100%;
 box-sizing: border-box;
 position: relative;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 color: var(--n-text-color);
 word-break: break-word;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[k({background:`var(--n-color-modal)`}),v(`hoverable`,[E(`&:hover`,`box-shadow: var(--n-box-shadow);`)]),v(`content-segmented`,[E(`>`,[w(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `),C(`content-scrollbar`,[E(`>`,[w(`scrollbar-container`,[E(`>`,[w(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),v(`content-soft-segmented`,[E(`>`,[w(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),C(`content-scrollbar`,[E(`>`,[w(`scrollbar-container`,[E(`>`,[w(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),v(`footer-segmented`,[E(`>`,[C(`footer`,`
 padding-top: var(--n-padding-bottom);
 `)])]),v(`footer-soft-segmented`,[E(`>`,[C(`footer`,`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),E(`>`,[w(`card-header`,`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[C(`main`,`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),C(`extra`,`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),C(`close`,`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),C(`action`,`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),Bt,w(`card-content`,[E(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),C(`content-scrollbar`,`
 display: flex;
 flex-direction: column;
 `,[E(`>`,[w(`scrollbar-container`,[E(`>`,[Bt])])]),E(`&:first-child >`,[w(`scrollbar-container`,[E(`>`,[w(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])]),C(`footer`,`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[E(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),C(`action`,`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),w(`card-cover`,`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[E(`img`,`
 display: block;
 width: 100%;
 `)]),v(`bordered`,`
 border: 1px solid var(--n-border-color);
 `,[E(`&:target`,`border-color: var(--n-color-target);`)]),v(`action-segmented`,[E(`>`,[C(`action`,[E(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),v(`content-segmented, content-soft-segmented`,[E(`>`,[w(`card-content`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[E(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)]),C(`content-scrollbar`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[E(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),v(`footer-segmented, footer-soft-segmented`,[E(`>`,[C(`footer`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[E(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),v(`embedded`,`
 background-color: var(--n-color-embedded);
 `)]),b(w(`card`,`
 background: var(--n-color-modal);
 `,[v(`embedded`,`
 background-color: var(--n-color-embedded-modal);
 `)])),ne(w(`card`,`
 background: var(--n-color-popover);
 `,[v(`embedded`,`
 background-color: var(--n-color-embedded-popover);
 `)]))]),Ht={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:`div`},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean},Ut=u({name:`Card`,props:Object.assign(Object.assign({},A.props),Ht),slots:Object,setup(e){let t=()=>{let{onClose:t}=e;t&&S(t)},{inlineThemeDisabled:n,mergedClsPrefixRef:r,mergedRtlRef:i,mergedComponentPropsRef:a}=re(e),o=A(`Card`,`-card`,Vt,zt,e,r),s=O(`Card`,i,r),c=d(()=>e.size||a?.value?.Card?.size||`medium`),l=d(()=>{let e=c.value,{self:{color:t,colorModal:n,colorTarget:r,textColor:i,titleTextColor:a,titleFontWeight:s,borderColor:l,actionColor:u,borderRadius:d,lineHeight:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:g,closeColorPressed:_,closeBorderRadius:v,closeIconSize:y,closeSize:b,boxShadow:x,colorPopover:S,colorEmbedded:C,colorEmbeddedModal:w,colorEmbeddedPopover:T,[N(`padding`,e)]:E,[N(`fontSize`,e)]:D,[N(`titleFontSize`,e)]:O},common:{cubicBezierEaseInOut:k}}=o.value,{top:A,left:ee,bottom:j}=I(E);return{"--n-bezier":k,"--n-border-radius":d,"--n-color":t,"--n-color-modal":n,"--n-color-popover":S,"--n-color-embedded":C,"--n-color-embedded-modal":w,"--n-color-embedded-popover":T,"--n-color-target":r,"--n-text-color":i,"--n-line-height":f,"--n-action-color":u,"--n-title-text-color":a,"--n-title-font-weight":s,"--n-close-icon-color":p,"--n-close-icon-color-hover":m,"--n-close-icon-color-pressed":h,"--n-close-color-hover":g,"--n-close-color-pressed":_,"--n-border-color":l,"--n-box-shadow":x,"--n-padding-top":A,"--n-padding-bottom":j,"--n-padding-left":ee,"--n-font-size":D,"--n-title-font-size":O,"--n-close-size":b,"--n-close-icon-size":y,"--n-close-border-radius":v}}),u=n?ee(`card`,d(()=>c.value[0]),l,e):void 0;return{rtlEnabled:s,mergedClsPrefix:r,mergedTheme:o,handleCloseClick:t,cssVars:n?void 0:l,themeClass:u?.themeClass,onRender:u?.onRender}},render(){let{segmented:e,bordered:t,hoverable:n,mergedClsPrefix:r,rtlEnabled:i,onRender:a,embedded:o,tag:s,$slots:c}=this;return a?.(),g(s,{class:[`${r}-card`,this.themeClass,o&&`${r}-card--embedded`,{[`${r}-card--rtl`]:i,[`${r}-card--content-scrollable`]:this.contentScrollable,[`${r}-card--content${typeof e!=`boolean`&&e.content===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.content,[`${r}-card--footer${typeof e!=`boolean`&&e.footer===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.footer,[`${r}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${r}-card--bordered`]:t,[`${r}-card--hoverable`]:n}],style:this.cssVars,role:this.role},M(c.cover,e=>{let t=this.cover?x([this.cover()]):e;return t&&g(`div`,{class:`${r}-card-cover`,role:`none`},t)}),M(c.header,e=>{let{title:t}=this,n=t?x(typeof t==`function`?[t()]:[t]):e;return n||this.closable?g(`div`,{class:[`${r}-card-header`,this.headerClass],style:this.headerStyle,role:`heading`},g(`div`,{class:`${r}-card-header__main`,role:`heading`},n),M(c[`header-extra`],e=>{let t=this.headerExtra?x([this.headerExtra()]):e;return t&&g(`div`,{class:[`${r}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},t)}),this.closable&&g(kt,{clsPrefix:r,class:`${r}-card-header__close`,onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0})):null}),M(c.default,e=>{let{content:t}=this,n=t?x(typeof t==`function`?[t()]:[t]):e;return n?this.contentScrollable?g(It,{class:`${r}-card__content-scrollbar`,contentClass:[`${r}-card-content`,this.contentClass],contentStyle:this.contentStyle},n):g(`div`,{class:[`${r}-card-content`,this.contentClass],style:this.contentStyle,role:`none`},n):null}),M(c.footer,e=>{let t=this.footer?x([this.footer()]):e;return t&&g(`div`,{class:[`${r}-card__footer`,this.footerClass],style:this.footerStyle,role:`none`},t)}),M(c.action,e=>{let t=this.action?x([this.action()]):e;return t&&g(`div`,{class:`${r}-card__action`,role:`none`},t)}))}});export{Ut as t};