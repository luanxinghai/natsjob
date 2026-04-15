import{U as e}from"./es-CAKLDtcF.js";import{A as t,F as n,H as r,M as i,O as a,P as o,b as s,d as c,ft as l,i as u,tt as d,w as f,x as p}from"./runtime-core.esm-bundler-fv2244ep.js";import{C as m,S as h,_ as g,a as _,b as v,c as y,f as b,g as x,o as S,r as C,s as w,t as T,v as E,w as D,y as O}from"./light-CPrQc-Dl.js";import{t as ee}from"./use-config-DoSIpgUv.js";import{a as k,i as A,r as te,t as j}from"./Close-BfBc2lwx.js";import{t as M}from"./call-ntOWOkaG.js";function ne(e){return e.composedPath()[0]||null}function N(e){return e.composedPath()[0]}var re={mousemoveoutside:new WeakMap,clickoutside:new WeakMap};function P(e,t,n){if(e===`mousemoveoutside`){let e=e=>{t.contains(N(e))||n(e)};return{mousemove:e,touchstart:e}}else if(e===`clickoutside`){let e=!1,r=n=>{e=!t.contains(N(n))},i=r=>{e&&(t.contains(N(r))||n(r))};return{mousedown:r,mouseup:i,touchstart:r,touchend:i}}return console.error(`[evtd/create-trap-handler]: name \`${e}\` is invalid. This could be a bug of evtd.`),{}}function F(e,t,n){let r=re[e],i=r.get(t);i===void 0&&r.set(t,i=new WeakMap);let a=i.get(n);return a===void 0&&i.set(n,a=P(e,t,n)),a}function ie(e,t,n,r){if(e===`mousemoveoutside`||e===`clickoutside`){let i=F(e,t,n);return Object.keys(i).forEach(e=>{R(e,document,i[e],r)}),!0}return!1}function I(e,t,n,r){if(e===`mousemoveoutside`||e===`clickoutside`){let i=F(e,t,n);return Object.keys(i).forEach(e=>{z(e,document,i[e],r)}),!0}return!1}function L(){if(typeof window>`u`)return{on:()=>{},off:()=>{}};let e=new WeakMap,t=new WeakMap;function n(){e.set(this,!0)}function r(){e.set(this,!0),t.set(this,!0)}function i(e,t,n){let r=e[t];return e[t]=function(){return n.apply(e,arguments),r.apply(e,arguments)},e}function a(e,t){e[t]=Event.prototype[t]}let o=new WeakMap,s=Object.getOwnPropertyDescriptor(Event.prototype,`currentTarget`);function c(){return o.get(this)??null}function l(e,t){s!==void 0&&Object.defineProperty(e,`currentTarget`,{configurable:!0,enumerable:!0,get:t??s.get})}let u={bubble:{},capture:{}},d={};function f(){let s=function(s){let{type:d,eventPhase:f,bubbles:p}=s,m=N(s);if(f===2)return;let h=f===1?`capture`:`bubble`,g=m,_=[];for(;g===null&&(g=window),_.push(g),g!==window;)g=g.parentNode||null;let v=u.capture[d],y=u.bubble[d];if(i(s,`stopPropagation`,n),i(s,`stopImmediatePropagation`,r),l(s,c),h===`capture`){if(v===void 0)return;for(let n=_.length-1;n>=0&&!e.has(s);--n){let e=_[n],r=v.get(e);if(r!==void 0){o.set(s,e);for(let e of r){if(t.has(s))break;e(s)}}if(n===0&&!p&&y!==void 0){let n=y.get(e);if(n!==void 0)for(let e of n){if(t.has(s))break;e(s)}}}}else if(h===`bubble`){if(y===void 0)return;for(let n=0;n<_.length&&!e.has(s);++n){let e=_[n],r=y.get(e);if(r!==void 0){o.set(s,e);for(let e of r){if(t.has(s))break;e(s)}}}}a(s,`stopPropagation`),a(s,`stopImmediatePropagation`),l(s)};return s.displayName=`evtdUnifiedHandler`,s}function p(){let e=function(e){let{type:t,eventPhase:n}=e;if(n!==2)return;let r=d[t];r!==void 0&&r.forEach(t=>t(e))};return e.displayName=`evtdUnifiedWindowEventHandler`,e}let m=f(),h=p();function g(e,t){let n=u[e];return n[t]===void 0&&(n[t]=new Map,window.addEventListener(t,m,e===`capture`)),n[t]}function _(e){return d[e]===void 0&&(d[e]=new Set,window.addEventListener(e,h)),d[e]}function v(e,t){let n=e.get(t);return n===void 0&&e.set(t,n=new Set),n}function y(e,t,n,r){let i=u[t][n];if(i!==void 0){let t=i.get(e);if(t!==void 0&&t.has(r))return!0}return!1}function b(e,t){let n=d[e];return!!(n!==void 0&&n.has(t))}function x(e,t,n,r){let i;if(i=typeof r==`object`&&r.once===!0?a=>{S(e,t,i,r),n(a)}:n,ie(e,t,i,r))return;let a=v(g(r===!0||typeof r==`object`&&r.capture===!0?`capture`:`bubble`,e),t);if(a.has(i)||a.add(i),t===window){let t=_(e);t.has(i)||t.add(i)}}function S(e,t,n,r){if(I(e,t,n,r))return;let i=r===!0||typeof r==`object`&&r.capture===!0,a=i?`capture`:`bubble`,o=g(a,e),s=v(o,t);if(t===window&&!y(t,i?`bubble`:`capture`,e,n)&&b(e,n)){let t=d[e];t.delete(n),t.size===0&&(window.removeEventListener(e,h),d[e]=void 0)}s.has(n)&&s.delete(n),s.size===0&&o.delete(t),o.size===0&&(window.removeEventListener(e,m,a===`capture`),u[a][e]=void 0)}return{on:x,off:S}}var{on:R,off:z}=L(),ae=(typeof window>`u`?!1:/iPad|iPhone|iPod/.test(navigator.platform)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1)&&!window.MSStream;function oe(){return ae}function se(e){let n={isDeactivated:!1},r=!1;return t(()=>{if(n.isDeactivated=!1,!r){r=!0;return}e()}),o(()=>{n.isDeactivated=!0,r||=!0}),n}function B(e,t){console.error(`[vueuc/${e}]: ${t}`)}var V=[],ce=function(){return V.some(function(e){return e.activeTargets.length>0})},le=function(){return V.some(function(e){return e.skippedTargets.length>0})},ue=`ResizeObserver loop completed with undelivered notifications.`,de=function(){var e;typeof ErrorEvent==`function`?e=new ErrorEvent(`error`,{message:ue}):(e=document.createEvent(`Event`),e.initEvent(`error`,!1,!1),e.message=ue),window.dispatchEvent(e)},H;(function(e){e.BORDER_BOX=`border-box`,e.CONTENT_BOX=`content-box`,e.DEVICE_PIXEL_CONTENT_BOX=`device-pixel-content-box`})(H||={});var U=function(e){return Object.freeze(e)},fe=function(){function e(e,t){this.inlineSize=e,this.blockSize=t,U(this)}return e}(),pe=function(){function e(e,t,n,r){return this.x=e,this.y=t,this.width=n,this.height=r,this.top=this.y,this.left=this.x,this.bottom=this.top+this.height,this.right=this.left+this.width,U(this)}return e.prototype.toJSON=function(){var e=this;return{x:e.x,y:e.y,top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.width,height:e.height}},e.fromRect=function(t){return new e(t.x,t.y,t.width,t.height)},e}(),W=function(e){return e instanceof SVGElement&&`getBBox`in e},me=function(e){if(W(e)){var t=e.getBBox(),n=t.width,r=t.height;return!n&&!r}var i=e,a=i.offsetWidth,o=i.offsetHeight;return!(a||o||e.getClientRects().length)},G=function(e){if(e instanceof Element)return!0;var t=e?.ownerDocument?.defaultView;return!!(t&&e instanceof t.Element)},he=function(e){switch(e.tagName){case`INPUT`:if(e.type!==`image`)break;case`VIDEO`:case`AUDIO`:case`EMBED`:case`OBJECT`:case`CANVAS`:case`IFRAME`:case`IMG`:return!0}return!1},K=typeof window<`u`?window:{},q=new WeakMap,ge=/auto|scroll/,J=/^tb|vertical/,_e=/msie|trident/i.test(K.navigator&&K.navigator.userAgent),Y=function(e){return parseFloat(e||`0`)},X=function(e,t,n){return e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=!1),new fe((n?t:e)||0,(n?e:t)||0)},ve=U({devicePixelContentBoxSize:X(),borderBoxSize:X(),contentBoxSize:X(),contentRect:new pe(0,0,0,0)}),ye=function(e,t){if(t===void 0&&(t=!1),q.has(e)&&!t)return q.get(e);if(me(e))return q.set(e,ve),ve;var n=getComputedStyle(e),r=W(e)&&e.ownerSVGElement&&e.getBBox(),i=!_e&&n.boxSizing===`border-box`,a=J.test(n.writingMode||``),o=!r&&ge.test(n.overflowY||``),s=!r&&ge.test(n.overflowX||``),c=r?0:Y(n.paddingTop),l=r?0:Y(n.paddingRight),u=r?0:Y(n.paddingBottom),d=r?0:Y(n.paddingLeft),f=r?0:Y(n.borderTopWidth),p=r?0:Y(n.borderRightWidth),m=r?0:Y(n.borderBottomWidth),h=r?0:Y(n.borderLeftWidth),g=d+l,_=c+u,v=h+p,y=f+m,b=s?e.offsetHeight-y-e.clientHeight:0,x=o?e.offsetWidth-v-e.clientWidth:0,S=i?g+v:0,C=i?_+y:0,w=r?r.width:Y(n.width)-S-x,T=r?r.height:Y(n.height)-C-b,E=w+g+x+v,D=T+_+b+y,O=U({devicePixelContentBoxSize:X(Math.round(w*devicePixelRatio),Math.round(T*devicePixelRatio),a),borderBoxSize:X(E,D,a),contentBoxSize:X(w,T,a),contentRect:new pe(d,c,w,T)});return q.set(e,O),O},be=function(e,t,n){var r=ye(e,n),i=r.borderBoxSize,a=r.contentBoxSize,o=r.devicePixelContentBoxSize;switch(t){case H.DEVICE_PIXEL_CONTENT_BOX:return o;case H.BORDER_BOX:return i;default:return a}},xe=function(){function e(e){var t=ye(e);this.target=e,this.contentRect=t.contentRect,this.borderBoxSize=U([t.borderBoxSize]),this.contentBoxSize=U([t.contentBoxSize]),this.devicePixelContentBoxSize=U([t.devicePixelContentBoxSize])}return e}(),Se=function(e){if(me(e))return 1/0;for(var t=0,n=e.parentNode;n;)t+=1,n=n.parentNode;return t},Ce=function(){var e=1/0,t=[];V.forEach(function(n){if(n.activeTargets.length!==0){var r=[];n.activeTargets.forEach(function(t){var n=new xe(t.target),i=Se(t.target);r.push(n),t.lastReportedSize=be(t.target,t.observedBox),i<e&&(e=i)}),t.push(function(){n.callback.call(n.observer,r,n.observer)}),n.activeTargets.splice(0,n.activeTargets.length)}});for(var n=0,r=t;n<r.length;n++){var i=r[n];i()}return e},we=function(e){V.forEach(function(t){t.activeTargets.splice(0,t.activeTargets.length),t.skippedTargets.splice(0,t.skippedTargets.length),t.observationTargets.forEach(function(n){n.isActive()&&(Se(n.target)>e?t.activeTargets.push(n):t.skippedTargets.push(n))})})},Te=function(){var e=0;for(we(e);ce();)e=Ce(),we(e);return le()&&de(),e>0},Z,Ee=[],De=function(){return Ee.splice(0).forEach(function(e){return e()})},Oe=function(e){if(!Z){var t=0,n=document.createTextNode(``);new MutationObserver(function(){return De()}).observe(n,{characterData:!0}),Z=function(){n.textContent=`${t?t--:t++}`}}Ee.push(e),Z()},ke=function(e){Oe(function(){requestAnimationFrame(e)})},Q=0,Ae=function(){return!!Q},je=250,Me={attributes:!0,characterData:!0,childList:!0,subtree:!0},Ne=[`resize`,`load`,`transitionend`,`animationend`,`animationstart`,`animationiteration`,`keyup`,`keydown`,`mouseup`,`mousedown`,`mouseover`,`mouseout`,`blur`,`focus`],Pe=function(e){return e===void 0&&(e=0),Date.now()+e},Fe=!1,Ie=new(function(){function e(){var e=this;this.stopped=!0,this.listener=function(){return e.schedule()}}return e.prototype.run=function(e){var t=this;if(e===void 0&&(e=je),!Fe){Fe=!0;var n=Pe(e);ke(function(){var r=!1;try{r=Te()}finally{if(Fe=!1,e=n-Pe(),!Ae())return;r?t.run(1e3):e>0?t.run(e):t.start()}})}},e.prototype.schedule=function(){this.stop(),this.run()},e.prototype.observe=function(){var e=this,t=function(){return e.observer&&e.observer.observe(document.body,Me)};document.body?t():K.addEventListener(`DOMContentLoaded`,t)},e.prototype.start=function(){var e=this;this.stopped&&(this.stopped=!1,this.observer=new MutationObserver(this.listener),this.observe(),Ne.forEach(function(t){return K.addEventListener(t,e.listener,!0)}))},e.prototype.stop=function(){var e=this;this.stopped||=(this.observer&&this.observer.disconnect(),Ne.forEach(function(t){return K.removeEventListener(t,e.listener,!0)}),!0)},e}()),Le=function(e){!Q&&e>0&&Ie.start(),Q+=e,!Q&&Ie.stop()},Re=function(e){return!W(e)&&!he(e)&&getComputedStyle(e).display===`inline`},ze=function(){function e(e,t){this.target=e,this.observedBox=t||H.CONTENT_BOX,this.lastReportedSize={inlineSize:0,blockSize:0}}return e.prototype.isActive=function(){var e=be(this.target,this.observedBox,!0);return Re(this.target)&&(this.lastReportedSize=e),this.lastReportedSize.inlineSize!==e.inlineSize||this.lastReportedSize.blockSize!==e.blockSize},e}(),Be=function(){function e(e,t){this.activeTargets=[],this.skippedTargets=[],this.observationTargets=[],this.observer=e,this.callback=t}return e}(),Ve=new WeakMap,He=function(e,t){for(var n=0;n<e.length;n+=1)if(e[n].target===t)return n;return-1},$=function(){function e(){}return e.connect=function(e,t){var n=new Be(e,t);Ve.set(e,n)},e.observe=function(e,t,n){var r=Ve.get(e),i=r.observationTargets.length===0;He(r.observationTargets,t)<0&&(i&&V.push(r),r.observationTargets.push(new ze(t,n&&n.box)),Le(1),Ie.schedule())},e.unobserve=function(e,t){var n=Ve.get(e),r=He(n.observationTargets,t),i=n.observationTargets.length===1;r>=0&&(i&&V.splice(V.indexOf(n),1),n.observationTargets.splice(r,1),Le(-1))},e.disconnect=function(e){var t=this,n=Ve.get(e);n.observationTargets.slice().forEach(function(n){return t.unobserve(e,n.target)}),n.activeTargets.splice(0,n.activeTargets.length)},e}(),Ue=function(){function e(e){if(arguments.length===0)throw TypeError(`Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.`);if(typeof e!=`function`)throw TypeError(`Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.`);$.connect(this,e)}return e.prototype.observe=function(e,t){if(arguments.length===0)throw TypeError(`Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.`);if(!G(e))throw TypeError(`Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element`);$.observe(this,e,t)},e.prototype.unobserve=function(e){if(arguments.length===0)throw TypeError(`Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.`);if(!G(e))throw TypeError(`Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element`);$.unobserve(this,e)},e.prototype.disconnect=function(){$.disconnect(this)},e.toString=function(){return`function ResizeObserver () { [polyfill code] }`},e}(),We=new class{constructor(){this.handleResize=this.handleResize.bind(this),this.observer=new(typeof window<`u`&&window.ResizeObserver||Ue)(this.handleResize),this.elHandlersMap=new Map}handleResize(e){for(let t of e){let e=this.elHandlersMap.get(t.target);e!==void 0&&e(t)}}registerHandler(e,t){this.elHandlersMap.set(e,t),this.observer.observe(e)}unregisterHandler(e){this.elHandlersMap.has(e)&&(this.elHandlersMap.delete(e),this.observer.unobserve(e))}},Ge=s({name:`ResizeObserver`,props:{onResize:Function},setup(e){let t=!1,r=p().proxy;function a(t){let{onResize:n}=e;n!==void 0&&n(t)}n(()=>{let e=r.$el;if(e===void 0){B(`resize-observer`,`$el does not exist.`);return}if(e.nextElementSibling!==e.nextSibling&&e.nodeType===3&&e.nodeValue!==``){B(`resize-observer`,`$el can not be observed (it may be a text node).`);return}e.nextElementSibling!==null&&(We.registerHandler(e.nextElementSibling,a),t=!0)}),i(()=>{t&&We.unregisterHandler(r.$el.nextElementSibling)})},render(){return r(this.$slots,`default`)}});function Ke(e){let{left:t,right:n,top:r,bottom:i}=A(e);return`${r} ${t} ${i} ${n}`}var qe=s({render(){var e;return(e=this.$slots).default?.call(e)}}),{cubicBezierEaseInOut:Je}=_;function Ye({name:e=`fade-in`,enterDuration:t=`0.2s`,leaveDuration:n=`0.2s`,enterCubicBezier:r=Je,leaveCubicBezier:i=Je}={}){return[g(`&.${e}-transition-enter-active`,{transition:`all ${t} ${r}!important`}),g(`&.${e}-transition-leave-active`,{transition:`all ${n} ${i}!important`}),g(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`,{opacity:0}),g(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`,{opacity:1})]}var Xe={railInsetHorizontalBottom:`auto 2px 4px 2px`,railInsetHorizontalTop:`4px 2px auto 2px`,railInsetVerticalRight:`2px 4px 2px auto`,railInsetVerticalLeft:`2px auto 2px 4px`,railColor:`transparent`};function Ze(e){let{scrollbarColor:t,scrollbarColorHover:n,scrollbarHeight:r,scrollbarWidth:i,scrollbarBorderRadius:a}=e;return Object.assign(Object.assign({},Xe),{height:r,width:i,borderRadius:a,color:t,colorHover:n})}var Qe={name:`Scrollbar`,common:T,self:Ze},$e=E(`scrollbar`,`
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`,[g(`>`,[E(`scrollbar-container`,`
 width: 100%;
 overflow: scroll;
 height: 100%;
 min-height: inherit;
 max-height: inherit;
 scrollbar-width: none;
 `,[g(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `),g(`>`,[E(`scrollbar-content`,`
 box-sizing: border-box;
 min-width: 100%;
 `)])])]),g(`>, +`,[E(`scrollbar-rail`,`
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `,[v(`horizontal`,`
 height: var(--n-scrollbar-height);
 `,[g(`>`,[O(`scrollbar`,`
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
 `,[g(`>`,[O(`scrollbar`,`
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
 `),v(`disabled`,[g(`>`,[O(`scrollbar`,`pointer-events: none;`)])]),g(`>`,[O(`scrollbar`,`
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `,[Ye(),g(`&:hover`,`background-color: var(--n-scrollbar-color-hover);`)])])])])]),et=s({name:`Scrollbar`,props:Object.assign(Object.assign({},C.props),{duration:{type:Number,default:0},scrollable:{type:Boolean,default:!0},xScrollable:Boolean,trigger:{type:String,default:`hover`},useUnifiedContainer:Boolean,triggerDisplayManually:Boolean,container:Function,content:Function,containerClass:String,containerStyle:[String,Object],contentClass:[String,Array],contentStyle:[String,Object],horizontalRailStyle:[String,Object],verticalRailStyle:[String,Object],onScroll:Function,onWheel:Function,onResize:Function,internalOnUpdateScrollLeft:Function,internalHoistYRail:Boolean,internalExposeWidthCssVar:Boolean,yPlacement:{type:String,default:`right`},xPlacement:{type:String,default:`bottom`}}),inheritAttrs:!1,setup(e){let{mergedClsPrefixRef:t,inlineThemeDisabled:r,mergedRtlRef:a}=ee(e),o=S(`Scrollbar`,a,t),s=l(null),u=l(null),f=l(null),p=l(null),m=l(null),h=l(null),g=l(null),_=l(null),v=l(null),y=l(null),b=l(null),x=l(0),T=l(0),E=l(!1),D=l(!1),O=!1,k=!1,j,M,N=0,re=0,P=0,F=0,ie=oe(),I=C(`Scrollbar`,`-scrollbar`,$e,Qe,e,t),L=c(()=>{let{value:e}=_,{value:t}=h,{value:n}=y;return e===null||t===null||n===null?0:Math.min(e,n*e/t+te(I.value.self.width)*1.5)}),ae=c(()=>`${L.value}px`),B=c(()=>{let{value:e}=v,{value:t}=g,{value:n}=b;return e===null||t===null||n===null?0:n*e/t+te(I.value.self.height)*1.5}),V=c(()=>`${B.value}px`),ce=c(()=>{let{value:e}=_,{value:t}=x,{value:n}=h,{value:r}=y;if(e===null||n===null||r===null)return 0;{let i=n-e;return i?t/i*(r-L.value):0}}),le=c(()=>`${ce.value}px`),ue=c(()=>{let{value:e}=v,{value:t}=T,{value:n}=g,{value:r}=b;if(e===null||n===null||r===null)return 0;{let i=n-e;return i?t/i*(r-B.value):0}}),de=c(()=>`${ue.value}px`),H=c(()=>{let{value:e}=_,{value:t}=h;return e!==null&&t!==null&&t>e}),U=c(()=>{let{value:e}=v,{value:t}=g;return e!==null&&t!==null&&t>e}),fe=c(()=>{let{trigger:t}=e;return t===`none`||E.value}),pe=c(()=>{let{trigger:t}=e;return t===`none`||D.value}),W=c(()=>{let{container:t}=e;return t?t():u.value}),me=c(()=>{let{content:t}=e;return t?t():f.value}),G=(t,n)=>{if(!e.scrollable)return;if(typeof t==`number`){J(t,n??0,0,!1,`auto`);return}let{left:r,top:i,index:a,elSize:o,position:s,behavior:c,el:l,debounce:u=!0}=t;(r!==void 0||i!==void 0)&&J(r??0,i??0,0,!1,c),l===void 0?a!==void 0&&o!==void 0?J(0,a*o,o,u,c):s===`bottom`?J(0,2**53-1,0,!1,c):s===`top`&&J(0,0,0,!1,c):J(0,l.offsetTop,l.offsetHeight,u,c)},he=se(()=>{e.container||G({top:x.value,left:T.value})}),K=()=>{he.isDeactivated||Z()},q=t=>{if(he.isDeactivated)return;let{onResize:n}=e;n&&n(t),Z()},ge=(t,n)=>{if(!e.scrollable)return;let{value:r}=W;r&&(typeof t==`object`?r.scrollBy(t):r.scrollBy(t,n||0))};function J(e,t,n,r,i){let{value:a}=W;if(a){if(r){let{scrollTop:r,offsetHeight:o}=a;if(t>r){t+n<=r+o||a.scrollTo({left:e,top:t+n-o,behavior:i});return}}a.scrollTo({left:e,top:t,behavior:i})}}function _e(){be(),xe(),Z()}function Y(){X()}function X(){ve(),ye()}function ve(){M!==void 0&&window.clearTimeout(M),M=window.setTimeout(()=>{D.value=!1},e.duration)}function ye(){j!==void 0&&window.clearTimeout(j),j=window.setTimeout(()=>{E.value=!1},e.duration)}function be(){j!==void 0&&window.clearTimeout(j),E.value=!0}function xe(){M!==void 0&&window.clearTimeout(M),D.value=!0}function Se(t){let{onScroll:n}=e;n&&n(t),Ce()}function Ce(){let{value:e}=W;e&&(x.value=e.scrollTop,T.value=e.scrollLeft*(o?.value?-1:1))}function we(){let{value:e}=me;e&&(h.value=e.offsetHeight,g.value=e.offsetWidth);let{value:t}=W;t&&(_.value=t.offsetHeight,v.value=t.offsetWidth);let{value:n}=m,{value:r}=p;n&&(b.value=n.offsetWidth),r&&(y.value=r.offsetHeight)}function Te(){let{value:e}=W;e&&(x.value=e.scrollTop,T.value=e.scrollLeft*(o?.value?-1:1),_.value=e.offsetHeight,v.value=e.offsetWidth,h.value=e.scrollHeight,g.value=e.scrollWidth);let{value:t}=m,{value:n}=p;t&&(b.value=t.offsetWidth),n&&(y.value=n.offsetHeight)}function Z(){e.scrollable&&(e.useUnifiedContainer?Te():(we(),Ce()))}function Ee(e){return!s.value?.contains(ne(e))}function De(e){e.preventDefault(),e.stopPropagation(),k=!0,R(`mousemove`,window,Oe,!0),R(`mouseup`,window,ke,!0),re=T.value,P=o?.value?window.innerWidth-e.clientX:e.clientX}function Oe(t){if(!k)return;j!==void 0&&window.clearTimeout(j),M!==void 0&&window.clearTimeout(M);let{value:n}=v,{value:r}=g,{value:i}=B;if(n===null||r===null)return;let a=(o?.value?window.innerWidth-t.clientX-P:t.clientX-P)*(r-n)/(n-i),s=r-n,c=re+a;c=Math.min(s,c),c=Math.max(c,0);let{value:l}=W;if(l){l.scrollLeft=c*(o?.value?-1:1);let{internalOnUpdateScrollLeft:t}=e;t&&t(c)}}function ke(e){e.preventDefault(),e.stopPropagation(),z(`mousemove`,window,Oe,!0),z(`mouseup`,window,ke,!0),k=!1,Z(),Ee(e)&&X()}function Q(e){e.preventDefault(),e.stopPropagation(),O=!0,R(`mousemove`,window,Ae,!0),R(`mouseup`,window,je,!0),N=x.value,F=e.clientY}function Ae(e){if(!O)return;j!==void 0&&window.clearTimeout(j),M!==void 0&&window.clearTimeout(M);let{value:t}=_,{value:n}=h,{value:r}=L;if(t===null||n===null)return;let i=(e.clientY-F)*(n-t)/(t-r),a=n-t,o=N+i;o=Math.min(a,o),o=Math.max(o,0);let{value:s}=W;s&&(s.scrollTop=o)}function je(e){e.preventDefault(),e.stopPropagation(),z(`mousemove`,window,Ae,!0),z(`mouseup`,window,je,!0),O=!1,Z(),Ee(e)&&X()}d(()=>{let{value:e}=U,{value:n}=H,{value:r}=t,{value:i}=m,{value:a}=p;i&&(e?i.classList.remove(`${r}-scrollbar-rail--disabled`):i.classList.add(`${r}-scrollbar-rail--disabled`)),a&&(n?a.classList.remove(`${r}-scrollbar-rail--disabled`):a.classList.add(`${r}-scrollbar-rail--disabled`))}),n(()=>{e.container||Z()}),i(()=>{j!==void 0&&window.clearTimeout(j),M!==void 0&&window.clearTimeout(M),z(`mousemove`,window,Ae,!0),z(`mouseup`,window,je,!0)});let Me=c(()=>{let{common:{cubicBezierEaseInOut:e},self:{color:t,colorHover:n,height:r,width:i,borderRadius:a,railInsetHorizontalTop:s,railInsetHorizontalBottom:c,railInsetVerticalRight:l,railInsetVerticalLeft:u,railColor:d}}=I.value,{top:f,right:p,bottom:m,left:h}=A(s),{top:g,right:_,bottom:v,left:y}=A(c),{top:b,right:x,bottom:S,left:C}=A(o?.value?Ke(l):l),{top:w,right:T,bottom:E,left:D}=A(o?.value?Ke(u):u);return{"--n-scrollbar-bezier":e,"--n-scrollbar-color":t,"--n-scrollbar-color-hover":n,"--n-scrollbar-border-radius":a,"--n-scrollbar-width":i,"--n-scrollbar-height":r,"--n-scrollbar-rail-top-horizontal-top":f,"--n-scrollbar-rail-right-horizontal-top":p,"--n-scrollbar-rail-bottom-horizontal-top":m,"--n-scrollbar-rail-left-horizontal-top":h,"--n-scrollbar-rail-top-horizontal-bottom":g,"--n-scrollbar-rail-right-horizontal-bottom":_,"--n-scrollbar-rail-bottom-horizontal-bottom":v,"--n-scrollbar-rail-left-horizontal-bottom":y,"--n-scrollbar-rail-top-vertical-right":b,"--n-scrollbar-rail-right-vertical-right":x,"--n-scrollbar-rail-bottom-vertical-right":S,"--n-scrollbar-rail-left-vertical-right":C,"--n-scrollbar-rail-top-vertical-left":w,"--n-scrollbar-rail-right-vertical-left":T,"--n-scrollbar-rail-bottom-vertical-left":E,"--n-scrollbar-rail-left-vertical-left":D,"--n-scrollbar-rail-color":d}}),Ne=r?w(`scrollbar`,void 0,Me,e):void 0;return Object.assign(Object.assign({},{scrollTo:G,scrollBy:ge,sync:Z,syncUnifiedContainer:Te,handleMouseEnterWrapper:_e,handleMouseLeaveWrapper:Y}),{mergedClsPrefix:t,rtlEnabled:o,containerScrollTop:x,wrapperRef:s,containerRef:u,contentRef:f,yRailRef:p,xRailRef:m,needYBar:H,needXBar:U,yBarSizePx:ae,xBarSizePx:V,yBarTopPx:le,xBarLeftPx:de,isShowXBar:fe,isShowYBar:pe,isIos:ie,handleScroll:Se,handleContentResize:K,handleContainerResize:q,handleYScrollMouseDown:Q,handleXScrollMouseDown:De,containerWidth:v,cssVars:r?void 0:Me,themeClass:Ne?.themeClass,onRender:Ne?.onRender})},render(){let{$slots:t,mergedClsPrefix:n,triggerDisplayManually:r,rtlEnabled:i,internalHoistYRail:o,yPlacement:s,xPlacement:c,xScrollable:l}=this;if(!this.scrollable)return t.default?.call(t);let d=this.trigger===`none`,p=(t,r)=>f(`div`,{ref:`yRailRef`,class:[`${n}-scrollbar-rail`,`${n}-scrollbar-rail--vertical`,`${n}-scrollbar-rail--vertical--${s}`,t],"data-scrollbar-rail":!0,style:[r||``,this.verticalRailStyle],"aria-hidden":!0},f(d?qe:e,d?null:{name:`fade-in-transition`},{default:()=>this.needYBar&&this.isShowYBar&&!this.isIos?f(`div`,{class:`${n}-scrollbar-rail__scrollbar`,style:{height:this.yBarSizePx,top:this.yBarTopPx},onMousedown:this.handleYScrollMouseDown}):null})),m=()=>{var s;return(s=this.onRender)==null||s.call(this),f(`div`,a(this.$attrs,{role:`none`,ref:`wrapperRef`,class:[`${n}-scrollbar`,this.themeClass,i&&`${n}-scrollbar--rtl`],style:this.cssVars,onMouseenter:r?void 0:this.handleMouseEnterWrapper,onMouseleave:r?void 0:this.handleMouseLeaveWrapper}),[this.container?t.default?.call(t):f(`div`,{role:`none`,ref:`containerRef`,class:[`${n}-scrollbar-container`,this.containerClass],style:[this.containerStyle,this.internalExposeWidthCssVar?{"--n-scrollbar-current-width":k(this.containerWidth)}:void 0],onScroll:this.handleScroll,onWheel:this.onWheel},f(Ge,{onResize:this.handleContentResize},{default:()=>f(`div`,{ref:`contentRef`,role:`none`,style:[{width:this.xScrollable?`fit-content`:null},this.contentStyle],class:[`${n}-scrollbar-content`,this.contentClass]},t)})),o?null:p(void 0,void 0),l&&f(`div`,{ref:`xRailRef`,class:[`${n}-scrollbar-rail`,`${n}-scrollbar-rail--horizontal`,`${n}-scrollbar-rail--horizontal--${c}`],style:this.horizontalRailStyle,"data-scrollbar-rail":!0,"aria-hidden":!0},f(d?qe:e,d?null:{name:`fade-in-transition`},{default:()=>this.needXBar&&this.isShowXBar&&!this.isIos?f(`div`,{class:`${n}-scrollbar-rail__scrollbar`,style:{width:this.xBarSizePx,right:i?this.xBarLeftPx:void 0,left:i?void 0:this.xBarLeftPx},onMousedown:this.handleXScrollMouseDown}):null}))])},h=this.container?m():f(Ge,{onResize:this.handleContainerResize},{default:m});return o?f(u,null,h,p(this.themeClass,this.cssVars)):h}}),tt={paddingSmall:`12px 16px 12px`,paddingMedium:`19px 24px 20px`,paddingLarge:`23px 32px 24px`,paddingHuge:`27px 40px 28px`,titleFontSizeSmall:`16px`,titleFontSizeMedium:`18px`,titleFontSizeLarge:`18px`,titleFontSizeHuge:`18px`,closeIconSize:`18px`,closeSize:`22px`};function nt(e){let{primaryColor:t,borderRadius:n,lineHeight:r,fontSize:i,cardColor:a,textColor2:o,textColor1:s,dividerColor:c,fontWeightStrong:l,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,closeColorHover:p,closeColorPressed:m,modalColor:h,boxShadow1:g,popoverColor:_,actionColor:v}=e;return Object.assign(Object.assign({},tt),{lineHeight:r,color:a,colorModal:h,colorPopover:_,colorTarget:t,colorEmbedded:v,colorEmbeddedModal:v,colorEmbeddedPopover:v,textColor:o,titleTextColor:s,borderColor:c,actionColor:v,titleFontWeight:l,closeColorHover:p,closeColorPressed:m,closeBorderRadius:n,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,fontSizeSmall:i,fontSizeMedium:i,fontSizeLarge:i,fontSizeHuge:i,boxShadow:g,borderRadius:n})}var rt={name:`Card`,common:T,self:nt},it=E(`card-content`,`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),at=g([E(`card`,`
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
 `,[x({background:`var(--n-color-modal)`}),v(`hoverable`,[g(`&:hover`,`box-shadow: var(--n-box-shadow);`)]),v(`content-segmented`,[g(`>`,[E(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `),O(`content-scrollbar`,[g(`>`,[E(`scrollbar-container`,[g(`>`,[E(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),v(`content-soft-segmented`,[g(`>`,[E(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),O(`content-scrollbar`,[g(`>`,[E(`scrollbar-container`,[g(`>`,[E(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),v(`footer-segmented`,[g(`>`,[O(`footer`,`
 padding-top: var(--n-padding-bottom);
 `)])]),v(`footer-soft-segmented`,[g(`>`,[O(`footer`,`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),g(`>`,[E(`card-header`,`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[O(`main`,`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),O(`extra`,`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),O(`close`,`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),O(`action`,`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),it,E(`card-content`,[g(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),O(`content-scrollbar`,`
 display: flex;
 flex-direction: column;
 `,[g(`>`,[E(`scrollbar-container`,[g(`>`,[it])])]),g(`&:first-child >`,[E(`scrollbar-container`,[g(`>`,[E(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])]),O(`footer`,`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[g(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),O(`action`,`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),E(`card-cover`,`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[g(`img`,`
 display: block;
 width: 100%;
 `)]),v(`bordered`,`
 border: 1px solid var(--n-border-color);
 `,[g(`&:target`,`border-color: var(--n-color-target);`)]),v(`action-segmented`,[g(`>`,[O(`action`,[g(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),v(`content-segmented, content-soft-segmented`,[g(`>`,[E(`card-content`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[g(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)]),O(`content-scrollbar`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[g(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),v(`footer-segmented, footer-soft-segmented`,[g(`>`,[O(`footer`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[g(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),v(`embedded`,`
 background-color: var(--n-color-embedded);
 `)]),m(E(`card`,`
 background: var(--n-color-modal);
 `,[v(`embedded`,`
 background-color: var(--n-color-embedded-modal);
 `)])),D(E(`card`,`
 background: var(--n-color-popover);
 `,[v(`embedded`,`
 background-color: var(--n-color-embedded-popover);
 `)]))]),ot={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:`div`},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean},st=s({name:`Card`,props:Object.assign(Object.assign({},C.props),ot),slots:Object,setup(e){let t=()=>{let{onClose:t}=e;t&&M(t)},{inlineThemeDisabled:n,mergedClsPrefixRef:r,mergedRtlRef:i,mergedComponentPropsRef:a}=ee(e),o=C(`Card`,`-card`,at,rt,e,r),s=S(`Card`,i,r),l=c(()=>e.size||a?.value?.Card?.size||`medium`),u=c(()=>{let e=l.value,{self:{color:t,colorModal:n,colorTarget:r,textColor:i,titleTextColor:a,titleFontWeight:s,borderColor:c,actionColor:u,borderRadius:d,lineHeight:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:g,closeColorHover:_,closeColorPressed:v,closeBorderRadius:y,closeIconSize:b,closeSize:x,boxShadow:S,colorPopover:C,colorEmbedded:w,colorEmbeddedModal:T,colorEmbeddedPopover:E,[h(`padding`,e)]:D,[h(`fontSize`,e)]:O,[h(`titleFontSize`,e)]:ee},common:{cubicBezierEaseInOut:k}}=o.value,{top:te,left:j,bottom:M}=A(D);return{"--n-bezier":k,"--n-border-radius":d,"--n-color":t,"--n-color-modal":n,"--n-color-popover":C,"--n-color-embedded":w,"--n-color-embedded-modal":T,"--n-color-embedded-popover":E,"--n-color-target":r,"--n-text-color":i,"--n-line-height":f,"--n-action-color":u,"--n-title-text-color":a,"--n-title-font-weight":s,"--n-close-icon-color":p,"--n-close-icon-color-hover":m,"--n-close-icon-color-pressed":g,"--n-close-color-hover":_,"--n-close-color-pressed":v,"--n-border-color":c,"--n-box-shadow":S,"--n-padding-top":te,"--n-padding-bottom":M,"--n-padding-left":j,"--n-font-size":O,"--n-title-font-size":ee,"--n-close-size":x,"--n-close-icon-size":b,"--n-close-border-radius":y}}),d=n?w(`card`,c(()=>l.value[0]),u,e):void 0;return{rtlEnabled:s,mergedClsPrefix:r,mergedTheme:o,handleCloseClick:t,cssVars:n?void 0:u,themeClass:d?.themeClass,onRender:d?.onRender}},render(){let{segmented:e,bordered:t,hoverable:n,mergedClsPrefix:r,rtlEnabled:i,onRender:a,embedded:o,tag:s,$slots:c}=this;return a?.(),f(s,{class:[`${r}-card`,this.themeClass,o&&`${r}-card--embedded`,{[`${r}-card--rtl`]:i,[`${r}-card--content-scrollable`]:this.contentScrollable,[`${r}-card--content${typeof e!=`boolean`&&e.content===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.content,[`${r}-card--footer${typeof e!=`boolean`&&e.footer===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.footer,[`${r}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${r}-card--bordered`]:t,[`${r}-card--hoverable`]:n}],style:this.cssVars,role:this.role},b(c.cover,e=>{let t=this.cover?y([this.cover()]):e;return t&&f(`div`,{class:`${r}-card-cover`,role:`none`},t)}),b(c.header,e=>{let{title:t}=this,n=t?y(typeof t==`function`?[t()]:[t]):e;return n||this.closable?f(`div`,{class:[`${r}-card-header`,this.headerClass],style:this.headerStyle,role:`heading`},f(`div`,{class:`${r}-card-header__main`,role:`heading`},n),b(c[`header-extra`],e=>{let t=this.headerExtra?y([this.headerExtra()]):e;return t&&f(`div`,{class:[`${r}-card-header__extra`,this.headerExtraClass],style:this.headerExtraStyle},t)}),this.closable&&f(j,{clsPrefix:r,class:`${r}-card-header__close`,onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0})):null}),b(c.default,e=>{let{content:t}=this,n=t?y(typeof t==`function`?[t()]:[t]):e;return n?this.contentScrollable?f(et,{class:`${r}-card__content-scrollbar`,contentClass:[`${r}-card-content`,this.contentClass],contentStyle:this.contentStyle},n):f(`div`,{class:[`${r}-card-content`,this.contentClass],style:this.contentStyle,role:`none`},n):null}),b(c.footer,e=>{let t=this.footer?y([this.footer()]):e;return t&&f(`div`,{class:[`${r}-card__footer`,this.footerClass],style:this.footerStyle,role:`none`},t)}),b(c.action,e=>{let t=this.action?y([this.action()]):e;return t&&f(`div`,{class:`${r}-card__action`,role:`none`},t)}))}});export{st as t};