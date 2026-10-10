import{A as e,F as t,Gt as n,H as r,M as i,O as a,P as o,R as s,b as c,d as l,f as u,ft as d,h as f,i as p,nt as m,p as h,tt as g,w as _,x as v}from"./runtime-core.esm-bundler-Kvy3DgBB.js";import{l as y}from"./use-form-common-props-BiQWPswg.js";import{a as b,i as x,r as S,t as C}from"./Close-BPTyAlTc.js";import{A as w,C as T,E,O as D,S as O,T as k,b as A,d as j,h as M,k as N,l as P,n as F,o as I,t as ee,u as te,v as L,w as R,x as ne}from"./use-rtl-BNXhD2Z7.js";import{t as re}from"./call-fCmD0dxi.js";function ie(e){return Object.keys(e)}function ae(e){return e.composedPath()[0]||null}var oe={railInsetHorizontalBottom:`auto 2px 4px 2px`,railInsetHorizontalTop:`4px 2px auto 2px`,railInsetVerticalRight:`2px 4px 2px auto`,railInsetVerticalLeft:`2px auto 2px 4px`,railColor:`transparent`};function se(e){let{scrollbarColor:t,scrollbarColorHover:n,scrollbarHeight:r,scrollbarWidth:i,scrollbarBorderRadius:a}=e;return{...oe,height:r,width:i,borderRadius:a,color:t,colorHover:n}}var ce={name:`Scrollbar`,common:j,self:se};function z(e){return e.composedPath()[0]}var le={mousemoveoutside:new WeakMap,clickoutside:new WeakMap};function ue(e,t,n){if(e===`mousemoveoutside`){let e=e=>{t.contains(z(e))||n(e)};return{mousemove:e,touchstart:e}}if(e===`clickoutside`){let e=!1,r=n=>{e=!t.contains(z(n))},i=r=>{e&&(t.contains(z(r))||n(r))};return{mousedown:r,mouseup:i,touchstart:r,touchend:i}}return console.error(`[evtd/create-trap-handler]: name \`${e}\` is invalid. This could be a bug of evtd.`),{}}function de(e,t,n){let r=le[e],i=r.get(t);i===void 0&&r.set(t,i=new WeakMap);let a=i.get(n);return a===void 0&&i.set(n,a=ue(e,t,n)),a}function fe(e,t,n,r){if(e===`mousemoveoutside`||e===`clickoutside`){let i=de(e,t,n);return Object.keys(i).forEach(e=>{B(e,document,i[e],r)}),!0}return!1}function pe(e,t,n,r){if(e===`mousemoveoutside`||e===`clickoutside`){let i=de(e,t,n);return Object.keys(i).forEach(e=>{V(e,document,i[e],r)}),!0}return!1}function me(){if(typeof window>`u`)return{on:()=>{},off:()=>{}};let e=new WeakMap,t=new WeakMap;function n(){e.set(this,!0)}function r(){e.set(this,!0),t.set(this,!0)}function i(e,t,n){let r=e[t];return e[t]=function(){return n.apply(e,arguments),r.apply(e,arguments)},e}function a(e,t){e[t]=Event.prototype[t]}let o=new WeakMap,s=Object.getOwnPropertyDescriptor(Event.prototype,`currentTarget`);function c(){return o.get(this)??null}function l(e,t){s!==void 0&&Object.defineProperty(e,"currentTarget",{configurable:!0,enumerable:!0,get:t??s.get})}let u={bubble:{},capture:{}},d={};function f(){let s=function(s){let{type:d,eventPhase:f,bubbles:p}=s,m=z(s);if(f===2)return;let h=f===1?`capture`:`bubble`,g=m,_=[];for(;g===null&&(g=window),_.push(g),g!==window;)g=g.parentNode||null;let v=u.capture[d],y=u.bubble[d];if(i(s,`stopPropagation`,n),i(s,`stopImmediatePropagation`,r),l(s,c),h===`capture`){if(v===void 0)return;for(let n=_.length-1;n>=0&&!e.has(s);--n){let e=_[n],r=v.get(e);if(r!==void 0){o.set(s,e);for(let e of r){if(t.has(s))break;e(s)}}if(n===0&&!p&&y!==void 0){let n=y.get(e);if(n!==void 0)for(let e of n){if(t.has(s))break;e(s)}}}}else if(h===`bubble`){if(y===void 0)return;for(let n=0;n<_.length&&!e.has(s);++n){let e=_[n],r=y.get(e);if(r!==void 0){o.set(s,e);for(let e of r){if(t.has(s))break;e(s)}}}}a(s,`stopPropagation`),a(s,`stopImmediatePropagation`),l(s)};return s.displayName=`evtdUnifiedHandler`,s}function p(){let e=function(e){let{type:t,eventPhase:n}=e;if(n!==2)return;let r=d[t];r!==void 0&&r.forEach(t=>t(e))};return e.displayName=`evtdUnifiedWindowEventHandler`,e}let m=f(),h=p();function g(e,t){let n=u[e];return n[t]===void 0&&(n[t]=new Map,window.addEventListener(t,m,e===`capture`)),n[t]}function _(e){return d[e]===void 0&&(d[e]=new Set,window.addEventListener(e,h)),d[e]}function v(e,t){let n=e.get(t);return n===void 0&&e.set(t,n=new Set),n}function y(e,t,n,r){let i=u[t][n];if(i!==void 0){let t=i.get(e);if(t!==void 0&&t.has(r))return!0}return!1}function b(e,t){let n=d[e];return!!(n!==void 0&&n.has(t))}function x(e,t,n,r){let i;if(i=typeof r==`object`&&r.once===!0?a=>{S(e,t,i,r),n(a)}:n,fe(e,t,i,r))return;let a=v(g(r===!0||typeof r==`object`&&r.capture===!0?`capture`:`bubble`,e),t);if(a.has(i)||a.add(i),t===window){let t=_(e);t.has(i)||t.add(i)}}function S(e,t,n,r){if(pe(e,t,n,r))return;let i=r===!0||typeof r==`object`&&r.capture===!0,a=i?`capture`:`bubble`,o=g(a,e),s=v(o,t);if(t===window&&!y(t,i?`bubble`:`capture`,e,n)&&b(e,n)){let t=d[e];t.delete(n),t.size===0&&(window.removeEventListener(e,h),d[e]=void 0)}s.has(n)&&s.delete(n),s.size===0&&o.delete(t),o.size===0&&(window.removeEventListener(e,m,a===`capture`),u[a][e]=void 0)}return{on:x,off:S}}var{on:B,off:V}=me(),H=(typeof window>`u`?!1:/iPad|iPhone|iPod/.test(navigator.platform)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1)&&!window.MSStream;function he(){return H}function ge(t){let n={isDeactivated:!1},r=!1;return e(()=>{if(n.isDeactivated=!1,!r){r=!0;return}t()}),o(()=>{n.isDeactivated=!0,r||=!0}),n}function _e(e){let{left:t,right:n,top:r,bottom:i}=x(e);return`${r} ${t} ${i} ${n}`}var ve=c({render(){return this.$slots.default?.()}}),{cubicBezierEaseInOut:ye}=A;function be({name:e=`fade-in`,enterDuration:t=`0.2s`,leaveDuration:n=`0.2s`,enterCubicBezier:r=ye,leaveCubicBezier:i=ye}={}){return[T(`&.${e}-transition-enter-active`,{transition:`all ${t} ${r}!important`}),T(`&.${e}-transition-leave-active`,{transition:`all ${n} ${i}!important`}),T(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`,{opacity:0}),T(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`,{opacity:1})]}var xe=R(`scrollbar`,`
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`,[T(`>`,[R(`scrollbar-container`,`
 width: 100%;
 overflow: scroll;
 height: 100%;
 min-height: inherit;
 max-height: inherit;
 scrollbar-width: none;
 `,[T(`&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb`,`
 width: 0;
 height: 0;
 display: none;
 `),T(`>`,[R(`scrollbar-content`,`
 box-sizing: border-box;
 min-width: 100%;
 `)])])]),T(`>, +`,[R(`scrollbar-rail`,`
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `,[E(`horizontal`,`
 height: var(--n-scrollbar-height);
 `,[T(`>`,[k(`scrollbar`,`
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]),E(`horizontal--top`,`
 top: var(--n-scrollbar-rail-top-horizontal-top); 
 right: var(--n-scrollbar-rail-right-horizontal-top); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-top); 
 left: var(--n-scrollbar-rail-left-horizontal-top); 
 `),E(`horizontal--bottom`,`
 top: var(--n-scrollbar-rail-top-horizontal-bottom); 
 right: var(--n-scrollbar-rail-right-horizontal-bottom); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-bottom); 
 left: var(--n-scrollbar-rail-left-horizontal-bottom); 
 `),E(`vertical`,`
 width: var(--n-scrollbar-width);
 `,[T(`>`,[k(`scrollbar`,`
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]),E(`vertical--left`,`
 top: var(--n-scrollbar-rail-top-vertical-left); 
 right: var(--n-scrollbar-rail-right-vertical-left); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-left); 
 left: var(--n-scrollbar-rail-left-vertical-left); 
 `),E(`vertical--right`,`
 top: var(--n-scrollbar-rail-top-vertical-right); 
 right: var(--n-scrollbar-rail-right-vertical-right); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-right); 
 left: var(--n-scrollbar-rail-left-vertical-right); 
 `),E(`disabled`,[T(`>`,[k(`scrollbar`,`pointer-events: none;`)])]),T(`>`,[k(`scrollbar`,`
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `,[be(),T(`&:hover`,`background-color: var(--n-scrollbar-color-hover);`)])])])])]);function Se(e,t){console.error(`[vueuc/${e}]: ${t}`)}var U=[],Ce=function(){return U.some(function(e){return e.activeTargets.length>0})},W=function(){return U.some(function(e){return e.skippedTargets.length>0})},we=`ResizeObserver loop completed with undelivered notifications.`,Te=function(){var e;typeof ErrorEvent==`function`?e=new ErrorEvent(`error`,{message:we}):(e=document.createEvent(`Event`),e.initEvent(`error`,!1,!1),e.message=we),window.dispatchEvent(e)},G;(function(e){e.BORDER_BOX=`border-box`,e.CONTENT_BOX=`content-box`,e.DEVICE_PIXEL_CONTENT_BOX=`device-pixel-content-box`})(G||={});var K=function(e){return Object.freeze(e)},Ee=function(){function e(e,t){this.inlineSize=e,this.blockSize=t,K(this)}return e}(),De=function(){function e(e,t,n,r){return this.x=e,this.y=t,this.width=n,this.height=r,this.top=this.y,this.left=this.x,this.bottom=this.top+this.height,this.right=this.left+this.width,K(this)}return e.prototype.toJSON=function(){var e=this;return{x:e.x,y:e.y,top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.width,height:e.height}},e.fromRect=function(t){return new e(t.x,t.y,t.width,t.height)},e}(),Oe=function(e){return e instanceof SVGElement&&`getBBox`in e},ke=function(e){if(Oe(e)){var t=e.getBBox(),n=t.width,r=t.height;return!n&&!r}var i=e,a=i.offsetWidth,o=i.offsetHeight;return!(a||o||e.getClientRects().length)},Ae=function(e){if(e instanceof Element)return!0;var t=e?.ownerDocument?.defaultView;return!!(t&&e instanceof t.Element)},je=function(e){switch(e.tagName){case`INPUT`:if(e.type!==`image`)break;case`VIDEO`:case`AUDIO`:case`EMBED`:case`OBJECT`:case`CANVAS`:case`IFRAME`:case`IMG`:return!0}return!1},q=typeof window<`u`?window:{},J=new WeakMap,Me=/auto|scroll/,Ne=/^tb|vertical/,Pe=/msie|trident/i.test(q.navigator&&q.navigator.userAgent),Y=function(e){return parseFloat(e||`0`)},X=function(e,t,n){return e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=!1),new Ee((n?t:e)||0,(n?e:t)||0)},Z=K({devicePixelContentBoxSize:X(),borderBoxSize:X(),contentBoxSize:X(),contentRect:new De(0,0,0,0)}),Q=function(e,t){if(t===void 0&&(t=!1),J.has(e)&&!t)return J.get(e);if(ke(e))return J.set(e,Z),Z;var n=getComputedStyle(e),r=Oe(e)&&e.ownerSVGElement&&e.getBBox(),i=!Pe&&n.boxSizing===`border-box`,a=Ne.test(n.writingMode||``),o=!r&&Me.test(n.overflowY||``),s=!r&&Me.test(n.overflowX||``),c=r?0:Y(n.paddingTop),l=r?0:Y(n.paddingRight),u=r?0:Y(n.paddingBottom),d=r?0:Y(n.paddingLeft),f=r?0:Y(n.borderTopWidth),p=r?0:Y(n.borderRightWidth),m=r?0:Y(n.borderBottomWidth),h=r?0:Y(n.borderLeftWidth),g=d+l,_=c+u,v=h+p,y=f+m,b=s?e.offsetHeight-y-e.clientHeight:0,x=o?e.offsetWidth-v-e.clientWidth:0,S=i?g+v:0,C=i?_+y:0,w=r?r.width:Y(n.width)-S-x,T=r?r.height:Y(n.height)-C-b,E=w+g+x+v,D=T+_+b+y,O=K({devicePixelContentBoxSize:X(Math.round(w*devicePixelRatio),Math.round(T*devicePixelRatio),a),borderBoxSize:X(E,D,a),contentBoxSize:X(w,T,a),contentRect:new De(d,c,w,T)});return J.set(e,O),O},Fe=function(e,t,n){var r=Q(e,n),i=r.borderBoxSize,a=r.contentBoxSize,o=r.devicePixelContentBoxSize;switch(t){case G.DEVICE_PIXEL_CONTENT_BOX:return o;case G.BORDER_BOX:return i;default:return a}},Ie=function(){function e(e){var t=Q(e);this.target=e,this.contentRect=t.contentRect,this.borderBoxSize=K([t.borderBoxSize]),this.contentBoxSize=K([t.contentBoxSize]),this.devicePixelContentBoxSize=K([t.devicePixelContentBoxSize])}return e}(),Le=function(e){if(ke(e))return 1/0;for(var t=0,n=e.parentNode;n;)t+=1,n=n.parentNode;return t},Re=function(){var e=1/0,t=[];U.forEach(function(n){if(n.activeTargets.length!==0){var r=[];n.activeTargets.forEach(function(t){var n=new Ie(t.target),i=Le(t.target);r.push(n),t.lastReportedSize=Fe(t.target,t.observedBox),i<e&&(e=i)}),t.push(function(){n.callback.call(n.observer,r,n.observer)}),n.activeTargets.splice(0,n.activeTargets.length)}});for(var n=0,r=t;n<r.length;n++){var i=r[n];i()}return e},ze=function(e){U.forEach(function(t){t.activeTargets.splice(0,t.activeTargets.length),t.skippedTargets.splice(0,t.skippedTargets.length),t.observationTargets.forEach(function(n){n.isActive()&&(Le(n.target)>e?t.activeTargets.push(n):t.skippedTargets.push(n))})})},Be=function(){var e=0;for(ze(e);Ce();)e=Re(),ze(e);return W()&&Te(),e>0},Ve,He=[],Ue=function(){return He.splice(0).forEach(function(e){return e()})},We=function(e){if(!Ve){var t=0,n=document.createTextNode(``);new MutationObserver(function(){return Ue()}).observe(n,{characterData:!0}),Ve=function(){n.textContent=`${t?t--:t++}`}}He.push(e),Ve()},Ge=function(e){We(function(){requestAnimationFrame(e)})},Ke=0,qe=function(){return!!Ke},Je=250,Ye={attributes:!0,characterData:!0,childList:!0,subtree:!0},Xe=[`resize`,`load`,`transitionend`,`animationend`,`animationstart`,`animationiteration`,`keyup`,`keydown`,`mouseup`,`mousedown`,`mouseover`,`mouseout`,`blur`,`focus`],Ze=function(e){return e===void 0&&(e=0),Date.now()+e},Qe=!1,$e=new(function(){function e(){var e=this;this.stopped=!0,this.listener=function(){return e.schedule()}}return e.prototype.run=function(e){var t=this;if(e===void 0&&(e=Je),!Qe){Qe=!0;var n=Ze(e);Ge(function(){var r=!1;try{r=Be()}finally{if(Qe=!1,e=n-Ze(),!qe())return;r?t.run(1e3):e>0?t.run(e):t.start()}})}},e.prototype.schedule=function(){this.stop(),this.run()},e.prototype.observe=function(){var e=this,t=function(){return e.observer&&e.observer.observe(document.body,Ye)};document.body?t():q.addEventListener(`DOMContentLoaded`,t)},e.prototype.start=function(){var e=this;this.stopped&&(this.stopped=!1,this.observer=new MutationObserver(this.listener),this.observe(),Xe.forEach(function(t){return q.addEventListener(t,e.listener,!0)}))},e.prototype.stop=function(){var e=this;this.stopped||=(this.observer&&this.observer.disconnect(),Xe.forEach(function(t){return q.removeEventListener(t,e.listener,!0)}),!0)},e}()),et=function(e){!Ke&&e>0&&$e.start(),Ke+=e,!Ke&&$e.stop()},tt=function(e){return!Oe(e)&&!je(e)&&getComputedStyle(e).display===`inline`},nt=function(){function e(e,t){this.target=e,this.observedBox=t||G.CONTENT_BOX,this.lastReportedSize={inlineSize:0,blockSize:0}}return e.prototype.isActive=function(){var e=Fe(this.target,this.observedBox,!0);return tt(this.target)&&(this.lastReportedSize=e),this.lastReportedSize.inlineSize!==e.inlineSize||this.lastReportedSize.blockSize!==e.blockSize},e}(),rt=function(){function e(e,t){this.activeTargets=[],this.skippedTargets=[],this.observationTargets=[],this.observer=e,this.callback=t}return e}(),it=new WeakMap,at=function(e,t){for(var n=0;n<e.length;n+=1)if(e[n].target===t)return n;return-1},$=function(){function e(){}return e.connect=function(e,t){var n=new rt(e,t);it.set(e,n)},e.observe=function(e,t,n){var r=it.get(e),i=r.observationTargets.length===0;at(r.observationTargets,t)<0&&(i&&U.push(r),r.observationTargets.push(new nt(t,n&&n.box)),et(1),$e.schedule())},e.unobserve=function(e,t){var n=it.get(e),r=at(n.observationTargets,t),i=n.observationTargets.length===1;r>=0&&(i&&U.splice(U.indexOf(n),1),n.observationTargets.splice(r,1),et(-1))},e.disconnect=function(e){var t=this,n=it.get(e);n.observationTargets.slice().forEach(function(n){return t.unobserve(e,n.target)}),n.activeTargets.splice(0,n.activeTargets.length)},e}(),ot=function(){function e(e){if(arguments.length===0)throw TypeError(`Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.`);if(typeof e!=`function`)throw TypeError(`Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.`);$.connect(this,e)}return e.prototype.observe=function(e,t){if(arguments.length===0)throw TypeError(`Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.`);if(!Ae(e))throw TypeError(`Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element`);$.observe(this,e,t)},e.prototype.unobserve=function(e){if(arguments.length===0)throw TypeError(`Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.`);if(!Ae(e))throw TypeError(`Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element`);$.unobserve(this,e)},e.prototype.disconnect=function(){$.disconnect(this)},e.toString=function(){return`function ResizeObserver () { [polyfill code] }`},e}(),st=new class{constructor(){this.handleResize=this.handleResize.bind(this),this.observer=new(typeof window<`u`&&window.ResizeObserver||ot)(this.handleResize),this.elHandlersMap=new Map}handleResize(e){for(let t of e){let e=this.elHandlersMap.get(t.target);e!==void 0&&e(t)}}registerHandler(e,t){this.elHandlersMap.set(e,t),this.observer.observe(e)}unregisterHandler(e){this.elHandlersMap.has(e)&&(this.elHandlersMap.delete(e),this.observer.unobserve(e))}},ct=c({name:`ResizeObserver`,props:{onResize:Function},setup(e){let n=!1,r=v().proxy;function a(t){let{onResize:n}=e;n!==void 0&&n(t)}t(()=>{let e=r.$el;if(e===void 0){Se(`resize-observer`,`$el does not exist.`);return}if(e.nextElementSibling!==e.nextSibling&&e.nodeType===3&&e.nodeValue!==``){Se(`resize-observer`,`$el can not be observed (it may be a text node).`);return}e.nextElementSibling!==null&&(st.registerHandler(e.nextElementSibling,a),n=!0)}),i(()=>{n&&st.unregisterHandler(r.$el.nextElementSibling)})},render(){return r(this.$slots,`default`)}}),lt=[`onMousedown`],ut=[`onScroll`,`onWheel`],dt=[`onMousedown`],ft={...P.props,duration:{type:Number,default:0},scrollable:{type:Boolean,default:!0},xScrollable:Boolean,trigger:{type:String,default:`hover`},useUnifiedContainer:Boolean,triggerDisplayManually:Boolean,container:Function,content:Function,containerClass:String,containerStyle:[String,Object],contentClass:[String,Array],contentStyle:[String,Object],horizontalRailStyle:[String,Object],verticalRailStyle:[String,Object],onScroll:Function,onWheel:Function,onResize:Function,internalOnUpdateScrollLeft:Function,internalHoistYRail:Boolean,internalExposeWidthCssVar:Boolean,yPlacement:{type:String,default:`right`},xPlacement:{type:String,default:`bottom`}},pt=c({name:`Scrollbar`,props:ft,inheritAttrs:!1,setup(e){let{mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedRtlRef:a}=ne(e),o=ee(`Scrollbar`,a,n),s=d(null),c=d(null),u=d(null),f=d(null),p=d(null),m=d(null),h=d(null),_=d(null),v=d(null),y=d(null),b=d(null),C=d(0),w=d(0),T=d(!1),E=d(!1),D=!1,O=!1,k,A,j=0,M=0,N=0,F=0,I=he(),L=P(`Scrollbar`,`-scrollbar`,xe,ce,e,n),R=l(()=>{let{value:e}=_,{value:t}=m,{value:n}=y;return e===null||t===null||n===null?0:Math.min(e,n*e/t+S(L.value.self.width)*1.5)}),re=l(()=>`${R.value}px`),ie=l(()=>{let{value:e}=v,{value:t}=h,{value:n}=b;return e===null||t===null||n===null?0:n*e/t+S(L.value.self.height)*1.5}),oe=l(()=>`${ie.value}px`),se=l(()=>{let{value:e}=_,{value:t}=C,{value:n}=m,{value:r}=y;if(e===null||n===null||r===null)return 0;{let i=n-e;return i?t/i*(r-R.value):0}}),z=l(()=>`${se.value}px`),le=l(()=>{let{value:e}=v,{value:t}=w,{value:n}=h,{value:r}=b;if(e===null||n===null||r===null)return 0;{let i=n-e;return i?t/i*(r-ie.value):0}}),ue=l(()=>`${le.value}px`),de=l(()=>{let{value:e}=_,{value:t}=m;return e!==null&&t!==null&&t>e}),fe=l(()=>{let{value:e}=v,{value:t}=h;return e!==null&&t!==null&&t>e}),pe=l(()=>{let{trigger:t}=e;return t===`none`||T.value}),me=l(()=>{let{trigger:t}=e;return t===`none`||E.value}),H=l(()=>{let{container:t}=e;return t?t():c.value}),ve=l(()=>{let{content:t}=e;return t?t():u.value}),ye=(t,n)=>{if(!e.scrollable)return;if(typeof t==`number`){W(t,n??0,0,!1,`auto`);return}let{left:r,top:i,index:a,elSize:o,position:s,behavior:c,el:l,debounce:u=!0}=t;(r!==void 0||i!==void 0)&&W(r??0,i??0,0,!1,c),l===void 0?a!==void 0&&o!==void 0?W(0,a*o,o,u,c):s===`bottom`?W(0,2**53-1,0,!1,c):s===`top`&&W(0,0,0,!1,c):W(0,l.offsetTop,l.offsetHeight,u,c)},be=ge(()=>{e.container||ye({top:C.value,left:w.value})}),Se=()=>{be.isDeactivated||J()},U=t=>{if(be.isDeactivated)return;let{onResize:n}=e;n&&n(t),J()},Ce=(t,n)=>{if(!e.scrollable)return;let{value:r}=H;r&&(typeof t==`object`?r.scrollBy(t):r.scrollBy(t,n||0))};function W(e,t,n,r,i){let{value:a}=H;if(a){if(r){let{scrollTop:r,offsetHeight:o}=a;if(t>r){t+n<=r+o||a.scrollTo({left:e,top:t+n-o,behavior:i});return}}a.scrollTo({left:e,top:t,behavior:i})}}function we(){De(),Oe(),J()}function Te(){G()}function G(){K(),Ee()}function K(){A!==void 0&&window.clearTimeout(A),A=window.setTimeout(()=>{E.value=!1},e.duration)}function Ee(){k!==void 0&&window.clearTimeout(k),k=window.setTimeout(()=>{T.value=!1},e.duration)}function De(){k!==void 0&&window.clearTimeout(k),T.value=!0}function Oe(){A!==void 0&&window.clearTimeout(A),E.value=!0}function ke(t){let{onScroll:n}=e;n&&n(t),Ae()}function Ae(){let{value:e}=H;e&&(C.value=e.scrollTop,w.value=e.scrollLeft*(o?.value?-1:1))}function je(){let{value:e}=ve;e&&(m.value=e.offsetHeight,h.value=e.offsetWidth);let{value:t}=H;t&&(_.value=t.offsetHeight,v.value=t.offsetWidth);let{value:n}=p,{value:r}=f;n&&(b.value=n.offsetWidth),r&&(y.value=r.offsetHeight)}function q(){let{value:e}=H;e&&(C.value=e.scrollTop,w.value=e.scrollLeft*(o?.value?-1:1),_.value=e.offsetHeight,v.value=e.offsetWidth,m.value=e.scrollHeight,h.value=e.scrollWidth);let{value:t}=p,{value:n}=f;t&&(b.value=t.offsetWidth),n&&(y.value=n.offsetHeight)}function J(){e.scrollable&&(e.useUnifiedContainer?q():(je(),Ae()))}function Me(e){return!s.value?.contains(ae(e))}function Ne(e){e.preventDefault(),e.stopPropagation(),O=!0,B(`mousemove`,window,Pe,!0),B(`mouseup`,window,Y,!0),M=w.value,N=o?.value?window.innerWidth-e.clientX:e.clientX}function Pe(t){if(!O)return;k!==void 0&&window.clearTimeout(k),A!==void 0&&window.clearTimeout(A);let{value:n}=v,{value:r}=h,{value:i}=ie;if(n===null||r===null)return;let a=(o?.value?window.innerWidth-t.clientX-N:t.clientX-N)*(r-n)/(n-i),s=r-n,c=M+a;c=Math.min(s,c),c=Math.max(c,0);let{value:l}=H;if(l){l.scrollLeft=c*(o?.value?-1:1);let{internalOnUpdateScrollLeft:t}=e;t&&t(c)}}function Y(e){e.preventDefault(),e.stopPropagation(),V(`mousemove`,window,Pe,!0),V(`mouseup`,window,Y,!0),O=!1,J(),Me(e)&&G()}function X(e){e.preventDefault(),e.stopPropagation(),D=!0,B(`mousemove`,window,Z,!0),B(`mouseup`,window,Q,!0),j=C.value,F=e.clientY}function Z(e){if(!D)return;k!==void 0&&window.clearTimeout(k),A!==void 0&&window.clearTimeout(A);let{value:t}=_,{value:n}=m,{value:r}=R;if(t===null||n===null)return;let i=(e.clientY-F)*(n-t)/(t-r),a=n-t,o=j+i;o=Math.min(a,o),o=Math.max(o,0);let{value:s}=H;s&&(s.scrollTop=o)}function Q(e){e.preventDefault(),e.stopPropagation(),V(`mousemove`,window,Z,!0),V(`mouseup`,window,Q,!0),D=!1,J(),Me(e)&&G()}g(()=>{let{value:e}=fe,{value:t}=de,{value:r}=n,{value:i}=p,{value:a}=f;i&&(e?i.classList.remove(`${r}-scrollbar-rail--disabled`):i.classList.add(`${r}-scrollbar-rail--disabled`)),a&&(t?a.classList.remove(`${r}-scrollbar-rail--disabled`):a.classList.add(`${r}-scrollbar-rail--disabled`))}),t(()=>{e.container||J()}),i(()=>{k!==void 0&&window.clearTimeout(k),A!==void 0&&window.clearTimeout(A),V(`mousemove`,window,Z,!0),V(`mouseup`,window,Q,!0)});let Fe=l(()=>{let{common:{cubicBezierEaseInOut:e},self:{color:t,colorHover:n,height:r,width:i,borderRadius:a,railInsetHorizontalTop:s,railInsetHorizontalBottom:c,railInsetVerticalRight:l,railInsetVerticalLeft:u,railColor:d}}=L.value,{top:f,right:p,bottom:m,left:h}=x(s),{top:g,right:_,bottom:v,left:y}=x(c),{top:b,right:S,bottom:C,left:w}=x(o?.value?_e(l):l),{top:T,right:E,bottom:D,left:O}=x(o?.value?_e(u):u);return{"--n-scrollbar-bezier":e,"--n-scrollbar-color":t,"--n-scrollbar-color-hover":n,"--n-scrollbar-border-radius":a,"--n-scrollbar-width":i,"--n-scrollbar-height":r,"--n-scrollbar-rail-top-horizontal-top":f,"--n-scrollbar-rail-right-horizontal-top":p,"--n-scrollbar-rail-bottom-horizontal-top":m,"--n-scrollbar-rail-left-horizontal-top":h,"--n-scrollbar-rail-top-horizontal-bottom":g,"--n-scrollbar-rail-right-horizontal-bottom":_,"--n-scrollbar-rail-bottom-horizontal-bottom":v,"--n-scrollbar-rail-left-horizontal-bottom":y,"--n-scrollbar-rail-top-vertical-right":b,"--n-scrollbar-rail-right-vertical-right":S,"--n-scrollbar-rail-bottom-vertical-right":C,"--n-scrollbar-rail-left-vertical-right":w,"--n-scrollbar-rail-top-vertical-left":T,"--n-scrollbar-rail-right-vertical-left":E,"--n-scrollbar-rail-bottom-vertical-left":D,"--n-scrollbar-rail-left-vertical-left":O,"--n-scrollbar-rail-color":d}}),Ie=r?te(`scrollbar`,void 0,Fe,e):void 0;return{scrollTo:ye,scrollBy:Ce,sync:J,syncUnifiedContainer:q,handleMouseEnterWrapper:we,handleMouseLeaveWrapper:Te,mergedClsPrefix:n,rtlEnabled:o,containerScrollTop:C,wrapperRef:s,containerRef:c,contentRef:u,yRailRef:f,xRailRef:p,needYBar:de,needXBar:fe,yBarSizePx:re,xBarSizePx:oe,yBarTopPx:z,xBarLeftPx:ue,isShowXBar:pe,isShowYBar:me,isIos:I,handleScroll:ke,handleContentResize:Se,handleContainerResize:U,handleYScrollMouseDown:X,handleXScrollMouseDown:Ne,containerWidth:v,cssVars:r?void 0:Fe,themeClass:Ie?.themeClass,onRender:Ie?.onRender}},render(){let{$slots:e,mergedClsPrefix:t,triggerDisplayManually:r,rtlEnabled:i,internalHoistYRail:o,yPlacement:c,xPlacement:l,xScrollable:u}=this;if(!this.scrollable)return e.default?.();let d=this.trigger===`none`,m=(e,r)=>(s(),f(`div`,{ref:`yRailRef`,class:M([`${t}-scrollbar-rail`,`${t}-scrollbar-rail--vertical`,`${t}-scrollbar-rail--vertical--${c}`,e]),"data-scrollbar-rail":!0,style:n([r||``,this.verticalRailStyle]),"aria-hidden":!0},[L(()=>_(d?ve:y,d?null:{name:`fade-in-transition`},{default:()=>this.needYBar&&this.isShowYBar&&!this.isIos?(s(),f(`div`,{key:1,class:M(`${t}-scrollbar-rail__scrollbar`),style:n({height:this.yBarSizePx,top:this.yBarTopPx}),onMousedown:this.handleYScrollMouseDown},null,46,lt)):null}))],6)),g=()=>(this.onRender?.(),_(`div`,a(this.$attrs,{role:`none`,ref:`wrapperRef`,class:[`${t}-scrollbar`,this.themeClass,i&&`${t}-scrollbar--rtl`],style:this.cssVars,onMouseenter:r?void 0:this.handleMouseEnterWrapper,onMouseleave:r?void 0:this.handleMouseLeaveWrapper}),[this.container?e.default?.():(s(),f(`div`,{key:2,role:`none`,ref:`containerRef`,class:M([`${t}-scrollbar-container`,this.containerClass]),style:n([this.containerStyle,this.internalExposeWidthCssVar?{"--n-scrollbar-current-width":b(this.containerWidth)}:void 0]),onScroll:this.handleScroll,onWheel:this.onWheel},[(s(),h(ct,{onResize:this.handleContentResize},{default:()=>(s(),f(`div`,{ref:`contentRef`,role:`none`,style:n([{width:this.xScrollable?`fit-content`:null},this.contentStyle]),class:M([`${t}-scrollbar-content`,this.contentClass])},[L(()=>e.default?.())],6))},1032,[`onResize`]))],46,ut)),o?null:m(void 0,void 0),u&&(s(),f(`div`,{ref:`xRailRef`,class:M([`${t}-scrollbar-rail`,`${t}-scrollbar-rail--horizontal`,`${t}-scrollbar-rail--horizontal--${l}`]),style:n(this.horizontalRailStyle),"data-scrollbar-rail":!0,"aria-hidden":!0},[L(()=>_(d?ve:y,d?null:{name:`fade-in-transition`},{default:()=>this.needXBar&&this.isShowXBar&&!this.isIos?(s(),f(`div`,{key:3,class:M(`${t}-scrollbar-rail__scrollbar`),style:n({width:this.xBarSizePx,right:i?this.xBarLeftPx:void 0,left:i?void 0:this.xBarLeftPx}),onMousedown:this.handleXScrollMouseDown},null,46,dt)):null}))],6))])),v=this.container?g():(s(),h(ct,{key:4,onResize:this.handleContainerResize},{default:g},1032,[`onResize`]));return o?(s(),f(p,{key:5},[L(()=>v),L(()=>m(this.themeClass,this.cssVars))],64)):v}}),mt={paddingSmall:`12px 16px 12px`,paddingMedium:`19px 24px 20px`,paddingLarge:`23px 32px 24px`,paddingHuge:`27px 40px 28px`,titleFontSizeSmall:`16px`,titleFontSizeMedium:`18px`,titleFontSizeLarge:`18px`,titleFontSizeHuge:`18px`,closeIconSize:`18px`,closeSize:`22px`};function ht(e){let{primaryColor:t,borderRadius:n,lineHeight:r,fontSize:i,cardColor:a,textColor2:o,textColor1:s,dividerColor:c,fontWeightStrong:l,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,closeColorHover:p,closeColorPressed:m,modalColor:h,boxShadow1:g,popoverColor:_,actionColor:v}=e;return{...mt,lineHeight:r,color:a,colorModal:h,colorPopover:_,colorTarget:t,colorEmbedded:v,colorEmbeddedModal:v,colorEmbeddedPopover:v,textColor:o,titleTextColor:s,borderColor:c,actionColor:v,titleFontWeight:l,closeColorHover:p,closeColorPressed:m,closeBorderRadius:n,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,fontSizeSmall:i,fontSizeMedium:i,fontSizeLarge:i,fontSizeHuge:i,boxShadow:g,borderRadius:n}}var gt={name:`Card`,common:j,self:ht},_t=R(`card-content`,`
 flex: 1;
 min-width: 0;
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
`),vt=T([R(`card`,`
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
 `,[O({background:`var(--n-color-modal)`}),E(`hoverable`,[T(`&:hover`,`box-shadow: var(--n-box-shadow);`)]),E(`content-segmented`,[T(`>`,[R(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `),k(`content-scrollbar`,[T(`>`,[R(`scrollbar-container`,[T(`>`,[R(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])])])]),E(`content-soft-segmented`,[T(`>`,[R(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `),k(`content-scrollbar`,[T(`>`,[R(`scrollbar-container`,[T(`>`,[R(`card-content`,`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])])])])])]),E(`footer-segmented`,[T(`>`,[k(`footer`,`
 padding-top: var(--n-padding-bottom);
 `)])]),E(`footer-soft-segmented`,[T(`>`,[k(`footer`,`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),T(`>`,[R(`card-header`,`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[k(`main`,`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),k(`extra`,`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),k(`close`,`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),k(`action`,`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),_t,R(`card-content`,[T(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),k(`content-scrollbar`,`
 display: flex;
 flex-direction: column;
 `,[T(`>`,[R(`scrollbar-container`,[T(`>`,[_t])])]),T(`&:first-child >`,[R(`scrollbar-container`,[T(`>`,[R(`card-content`,`
 padding-top: var(--n-padding-bottom);
 `)])])])]),k(`footer`,`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[T(`&:first-child`,`
 padding-top: var(--n-padding-bottom);
 `)]),k(`action`,`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),R(`card-cover`,`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[T(`img`,`
 display: block;
 width: 100%;
 `)]),E(`bordered`,`
 border: 1px solid var(--n-border-color);
 `,[T(`&:target`,`border-color: var(--n-color-target);`)]),E(`action-segmented`,[T(`>`,[k(`action`,[T(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),E(`content-segmented, content-soft-segmented`,[T(`>`,[R(`card-content`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[T(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)]),k(`content-scrollbar`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[T(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),E(`footer-segmented, footer-soft-segmented`,[T(`>`,[k(`footer`,`
 transition: border-color 0.3s var(--n-bezier);
 `,[T(`&:not(:first-child)`,`
 border-top: 1px solid var(--n-border-color);
 `)])])]),E(`embedded`,`
 background-color: var(--n-color-embedded);
 `)]),N(R(`card`,`
 background: var(--n-color-modal);
 `,[E(`embedded`,`
 background-color: var(--n-color-embedded-modal);
 `)])),w(R(`card`,`
 background: var(--n-color-popover);
 `,[E(`embedded`,`
 background-color: var(--n-color-embedded-popover);
 `)]))]),yt={title:[String,Function],contentClass:String,contentStyle:[Object,String],contentScrollable:Boolean,headerClass:String,headerStyle:[Object,String],headerExtraClass:String,headerExtraStyle:[Object,String],footerClass:String,footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:String,bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:`div`},cover:Function,content:[String,Function],footer:Function,action:Function,headerExtra:Function,closeFocusable:Boolean};ie(yt);var bt={...P.props,...yt},xt=c({name:`Card`,props:bt,slots:Object,setup(e){let t=()=>{let{onClose:t}=e;t&&re(t)},{inlineThemeDisabled:n,mergedClsPrefixRef:r,mergedRtlRef:i,mergedComponentPropsRef:a}=ne(e),o=P(`Card`,`-card`,vt,gt,e,r),s=ee(`Card`,i,r),c=l(()=>e.size||a?.value?.Card?.size||`medium`),u=l(()=>{let e=c.value,{self:{color:t,colorModal:n,colorTarget:r,textColor:i,titleTextColor:a,titleFontWeight:s,borderColor:l,actionColor:u,borderRadius:d,lineHeight:f,closeIconColor:p,closeIconColorHover:m,closeIconColorPressed:h,closeColorHover:g,closeColorPressed:_,closeBorderRadius:v,closeIconSize:y,closeSize:b,boxShadow:S,colorPopover:C,colorEmbedded:w,colorEmbeddedModal:T,colorEmbeddedPopover:E,[D(`padding`,e)]:O,[D(`fontSize`,e)]:k,[D(`titleFontSize`,e)]:A},common:{cubicBezierEaseInOut:j}}=o.value,{top:M,left:N,bottom:P}=x(O);return{"--n-bezier":j,"--n-border-radius":d,"--n-color":t,"--n-color-modal":n,"--n-color-popover":C,"--n-color-embedded":w,"--n-color-embedded-modal":T,"--n-color-embedded-popover":E,"--n-color-target":r,"--n-text-color":i,"--n-line-height":f,"--n-action-color":u,"--n-title-text-color":a,"--n-title-font-weight":s,"--n-close-icon-color":p,"--n-close-icon-color-hover":m,"--n-close-icon-color-pressed":h,"--n-close-color-hover":g,"--n-close-color-pressed":_,"--n-border-color":l,"--n-box-shadow":S,"--n-padding-top":M,"--n-padding-bottom":P,"--n-padding-left":N,"--n-font-size":k,"--n-title-font-size":A,"--n-close-size":b,"--n-close-icon-size":y,"--n-close-border-radius":v}}),d=n?te(`card`,l(()=>c.value[0]),u,e):void 0;return{rtlEnabled:s,mergedClsPrefix:r,mergedTheme:o,handleCloseClick:t,cssVars:n?void 0:u,themeClass:d?.themeClass,onRender:d?.onRender}},render(){let{segmented:e,bordered:t,hoverable:r,mergedClsPrefix:i,rtlEnabled:a,onRender:o,embedded:c,tag:l,$slots:d}=this;return o?.(),s(),h(l,{class:M([`${i}-card`,this.themeClass,c&&`${i}-card--embedded`,{[`${i}-card--rtl`]:a,[`${i}-card--content-scrollable`]:this.contentScrollable,[`${i}-card--content${typeof e!=`boolean`&&e.content===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.content,[`${i}-card--footer${typeof e!=`boolean`&&e.footer===`soft`?`-soft`:``}-segmented`]:e===!0||e!==!1&&e.footer,[`${i}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${i}-card--bordered`]:t,[`${i}-card--hoverable`]:r}]),style:n(this.cssVars),role:this.role},{default:m(()=>[L(()=>I(d.cover,e=>{let t=this.cover?F([this.cover()]):e;return t&&(s(),f(`div`,{class:M(`${i}-card-cover`),role:`none`},[L(()=>t)],2))})),L(()=>I(d.header,e=>{let{title:t}=this,r=t?F(typeof t==`function`?[t()]:[t]):e;return r||this.closable?(s(),f(`div`,{key:1,class:M([`${i}-card-header`,this.headerClass]),style:n(this.headerStyle),role:`heading`},[u(`div`,{class:M(`${i}-card-header__main`),role:`heading`},[L(()=>r)],2),L(()=>I(d[`header-extra`],e=>{let t=this.headerExtra?F([this.headerExtra()]):e;return t&&(s(),f(`div`,{class:M([`${i}-card-header__extra`,this.headerExtraClass]),style:n(this.headerExtraStyle)},[L(()=>t)],6))})),L(()=>this.closable&&(s(),h(C,{clsPrefix:i,class:M(`${i}-card-header__close`),onClick:this.handleCloseClick,focusable:this.closeFocusable,absolute:!0},null,8,[`clsPrefix`,`class`,`onClick`,`focusable`])))],6)):null})),L(()=>I(d.default,e=>{let{content:t}=this,r=t?F(typeof t==`function`?[t()]:[t]):e;return r?this.contentScrollable?(s(),h(pt,{key:2,class:M(`${i}-card__content-scrollbar`),contentClass:[`${i}-card-content`,this.contentClass],contentStyle:this.contentStyle},{default:()=>r},1032,[`class`,`contentClass`,`contentStyle`])):(s(),f(`div`,{key:3,class:M([`${i}-card-content`,this.contentClass]),style:n(this.contentStyle),role:`none`},[L(()=>r)],6)):null})),L(()=>I(d.footer,e=>{let t=this.footer?F([this.footer()]):e;return t&&(s(),f(`div`,{class:M([`${i}-card__footer`,this.footerClass]),style:n(this.footerStyle),role:`none`},[L(()=>t)],6))})),L(()=>I(d.action,e=>{let t=this.action?F([this.action()]):e;return t&&(s(),f(`div`,{class:M(`${i}-card__action`),role:`none`},[L(()=>t)],2))}))]),_:2},1032,[`class`,`style`,`role`])}});export{xt as t};