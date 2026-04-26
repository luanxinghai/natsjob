import{b as e,w as t}from"./runtime-core.esm-bundler-CpfTRV6w.js";import{_ as n,a as r}from"./light-CV1MdEo3.js";import{at as i,it as a}from"./main-Bxm-yXxB.js";var o=e({name:`FadeInExpandTransition`,props:{appear:Boolean,group:Boolean,mode:String,onLeave:Function,onAfterLeave:Function,onAfterEnter:Function,width:Boolean,reverse:Boolean},setup(e,{slots:n}){function r(t){e.width?t.style.maxWidth=`${t.offsetWidth}px`:t.style.maxHeight=`${t.offsetHeight}px`,t.offsetWidth}function o(t){e.width?t.style.maxWidth=`0`:t.style.maxHeight=`0`,t.offsetWidth;let{onLeave:n}=e;n&&n()}function s(t){e.width?t.style.maxWidth=``:t.style.maxHeight=``;let{onAfterLeave:n}=e;n&&n()}function c(t){if(t.style.transition=`none`,e.width){let e=t.offsetWidth;t.style.maxWidth=`0`,t.offsetWidth,t.style.transition=``,t.style.maxWidth=`${e}px`}else if(e.reverse)t.style.maxHeight=`${t.offsetHeight}px`,t.offsetHeight,t.style.transition=``,t.style.maxHeight=`0`;else{let e=t.offsetHeight;t.style.maxHeight=`0`,t.offsetWidth,t.style.transition=``,t.style.maxHeight=`${e}px`}t.offsetWidth}function l(t){var n;e.width?t.style.maxWidth=``:e.reverse||(t.style.maxHeight=``),(n=e.onAfterEnter)==null||n.call(e)}return()=>{let{group:u,width:d,appear:f,mode:p}=e,m=u?i:a,h={name:d?`fade-in-width-expand-transition`:`fade-in-height-expand-transition`,appear:f,onEnter:c,onAfterEnter:l,onBeforeLeave:r,onLeave:o,onAfterLeave:s};return u||(h.mode=p),t(m,h,n)}}}),{cubicBezierEaseInOut:s,cubicBezierEaseOut:c,cubicBezierEaseIn:l}=r;function u({overflow:e=`hidden`,duration:t=`.3s`,originalTransition:r=``,leavingDelay:i=`0s`,foldPadding:a=!1,enterToProps:o=void 0,leaveToProps:u=void 0,reverse:d=!1}={}){let f=d?`leave`:`enter`,p=d?`enter`:`leave`;return[n(`&.fade-in-height-expand-transition-${p}-from,
 &.fade-in-height-expand-transition-${f}-to`,Object.assign(Object.assign({},o),{opacity:1})),n(`&.fade-in-height-expand-transition-${p}-to,
 &.fade-in-height-expand-transition-${f}-from`,Object.assign(Object.assign({},u),{opacity:0,marginTop:`0 !important`,marginBottom:`0 !important`,paddingTop:a?`0 !important`:void 0,paddingBottom:a?`0 !important`:void 0})),n(`&.fade-in-height-expand-transition-${p}-active`,`
 overflow: ${e};
 transition:
 max-height ${t} ${s} ${i},
 opacity ${t} ${c} ${i},
 margin-top ${t} ${s} ${i},
 margin-bottom ${t} ${s} ${i},
 padding-top ${t} ${s} ${i},
 padding-bottom ${t} ${s} ${i}
 ${r?`,${r}`:``}
 `),n(`&.fade-in-height-expand-transition-${f}-active`,`
 overflow: ${e};
 transition:
 max-height ${t} ${s},
 opacity ${t} ${l},
 margin-top ${t} ${s},
 margin-bottom ${t} ${s},
 padding-top ${t} ${s},
 padding-bottom ${t} ${s}
 ${r?`,${r}`:``}
 `)]}export{o as n,u as t};