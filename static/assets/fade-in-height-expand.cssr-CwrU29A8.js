import{U as e,W as t}from"./es-CAKLDtcF.js";import{b as n,w as r}from"./runtime-core.esm-bundler-fv2244ep.js";import{a as i,g as a}from"./light-CYMrvRA7.js";var o=n({name:`FadeInExpandTransition`,props:{appear:Boolean,group:Boolean,mode:String,onLeave:Function,onAfterLeave:Function,onAfterEnter:Function,width:Boolean,reverse:Boolean},setup(n,{slots:i}){function a(e){n.width?e.style.maxWidth=`${e.offsetWidth}px`:e.style.maxHeight=`${e.offsetHeight}px`,e.offsetWidth}function o(e){n.width?e.style.maxWidth=`0`:e.style.maxHeight=`0`,e.offsetWidth;let{onLeave:t}=n;t&&t()}function s(e){n.width?e.style.maxWidth=``:e.style.maxHeight=``;let{onAfterLeave:t}=n;t&&t()}function c(e){if(e.style.transition=`none`,n.width){let t=e.offsetWidth;e.style.maxWidth=`0`,e.offsetWidth,e.style.transition=``,e.style.maxWidth=`${t}px`}else if(n.reverse)e.style.maxHeight=`${e.offsetHeight}px`,e.offsetHeight,e.style.transition=``,e.style.maxHeight=`0`;else{let t=e.offsetHeight;e.style.maxHeight=`0`,e.offsetWidth,e.style.transition=``,e.style.maxHeight=`${t}px`}e.offsetWidth}function l(e){var t;n.width?e.style.maxWidth=``:n.reverse||(e.style.maxHeight=``),(t=n.onAfterEnter)==null||t.call(n)}return()=>{let{group:u,width:d,appear:f,mode:p}=n,m=u?t:e,h={name:d?`fade-in-width-expand-transition`:`fade-in-height-expand-transition`,appear:f,onEnter:c,onAfterEnter:l,onBeforeLeave:a,onLeave:o,onAfterLeave:s};return u||(h.mode=p),r(m,h,i)}}}),{cubicBezierEaseInOut:s,cubicBezierEaseOut:c,cubicBezierEaseIn:l}=i;function u({overflow:e=`hidden`,duration:t=`.3s`,originalTransition:n=``,leavingDelay:r=`0s`,foldPadding:i=!1,enterToProps:o=void 0,leaveToProps:u=void 0,reverse:d=!1}={}){let f=d?`leave`:`enter`,p=d?`enter`:`leave`;return[a(`&.fade-in-height-expand-transition-${p}-from,
 &.fade-in-height-expand-transition-${f}-to`,Object.assign(Object.assign({},o),{opacity:1})),a(`&.fade-in-height-expand-transition-${p}-to,
 &.fade-in-height-expand-transition-${f}-from`,Object.assign(Object.assign({},u),{opacity:0,marginTop:`0 !important`,marginBottom:`0 !important`,paddingTop:i?`0 !important`:void 0,paddingBottom:i?`0 !important`:void 0})),a(`&.fade-in-height-expand-transition-${p}-active`,`
 overflow: ${e};
 transition:
 max-height ${t} ${s} ${r},
 opacity ${t} ${c} ${r},
 margin-top ${t} ${s} ${r},
 margin-bottom ${t} ${s} ${r},
 padding-top ${t} ${s} ${r},
 padding-bottom ${t} ${s} ${r}
 ${n?`,${n}`:``}
 `),a(`&.fade-in-height-expand-transition-${f}-active`,`
 overflow: ${e};
 transition:
 max-height ${t} ${s},
 opacity ${t} ${l},
 margin-top ${t} ${s},
 margin-bottom ${t} ${s},
 padding-top ${t} ${s},
 padding-bottom ${t} ${s}
 ${n?`,${n}`:``}
 `)]}export{o as n,u as t};