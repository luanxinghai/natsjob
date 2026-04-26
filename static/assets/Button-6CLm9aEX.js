import{E as e,F as t,M as n,b as r,d as i,dt as a,ft as o,gt as s,k as c,w as l,z as u}from"./runtime-core.esm-bundler-CpfTRV6w.js";import{S as d,_ as f,a as p,b as m,f as h,h as g,i as _,l as v,m as y,o as b,r as x,s as S,t as C,v as w,x as T,y as E}from"./light-CV1MdEo3.js";import{t as D}from"./call-BkiYwt8M.js";import{n as O}from"./fade-in-height-expand.cssr-DEFS7hh9.js";import{Q as k,it as A,nt as j,tt as M}from"./main-Bxm-yXxB.js";function N(){let e=o(!1);return t(()=>{e.value=!0}),a(e)}var P=typeof document<`u`&&typeof window<`u`;function F(e){return e.replace(/#|\(|\)|,|\s|\./g,`_`)}var I=M(`n-form-item`);function L(t,{defaultSize:r=`medium`,mergedSize:a,mergedDisabled:o}={}){let s=e(I,null);u(I,null);let c=i(a?()=>a(s):()=>{let{size:e}=t;if(e)return e;if(s){let{mergedSize:e}=s;if(e.value!==void 0)return e.value}return r}),l=i(o?()=>o(s):()=>{let{disabled:e}=t;return e===void 0?s?s.disabled.value:!1:e}),d=i(()=>{let{status:e}=t;return e||s?.mergedValidationStatus.value});return n(()=>{s&&s.restoreValidation()}),{mergedSizeRef:c,mergedDisabledRef:l,mergedStatusRef:d,nTriggerFormBlur(){s&&s.handleContentBlur()},nTriggerFormChange(){s&&s.handleContentChange()},nTriggerFormFocus(){s&&s.handleContentFocus()},nTriggerFormInput(){s&&s.handleContentInput()}}}var R=r({name:`BaseIconSwitchTransition`,setup(e,{slots:t}){let n=N();return()=>l(A,{name:`icon-switch-transition`,appear:n.value},t)}}),{cubicBezierEaseInOut:z}=p;function B({originalTransform:e=``,left:t=0,top:n=0,transition:r=`all .3s ${z} !important`}={}){return[f(`&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to`,{transform:`${e} scale(0.75)`,left:t,top:n,opacity:0}),f(`&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from`,{transform:`scale(1) ${e}`,left:t,top:n,opacity:1}),f(`&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active`,{transformOrigin:`center`,position:`absolute`,left:t,top:n,transition:r})]}var V=f([f(`@keyframes rotator`,`
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`),w(`base-loading`,`
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `,[E(`transition-wrapper`,`
 position: absolute;
 width: 100%;
 height: 100%;
 `,[B()]),E(`placeholder`,`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[B({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),E(`container`,`
 animation: rotator 3s linear infinite both;
 `,[E(`icon`,`
 height: 1em;
 width: 1em;
 `)])])]),H=`1.6s`,U=r({name:`BaseLoading`,props:Object.assign({clsPrefix:{type:String,required:!0},show:{type:Boolean,default:!0}},{strokeWidth:{type:Number,default:28},stroke:{type:String,default:void 0},scale:{type:Number,default:1},radius:{type:Number,default:100}}),setup(e){_(`-base-loading`,V,s(e,`clsPrefix`))},render(){let{clsPrefix:e,radius:t,strokeWidth:n,stroke:r,scale:i}=this,a=t/i;return l(`div`,{class:`${e}-base-loading`,role:`img`,"aria-label":`loading`},l(R,null,{default:()=>this.show?l(`div`,{key:`icon`,class:`${e}-base-loading__transition-wrapper`},l(`div`,{class:`${e}-base-loading__container`},l(`svg`,{class:`${e}-base-loading__icon`,viewBox:`0 0 ${2*a} ${2*a}`,xmlns:`http://www.w3.org/2000/svg`,style:{color:r}},l(`g`,null,l(`animateTransform`,{attributeName:`transform`,type:`rotate`,values:`0 ${a} ${a};270 ${a} ${a}`,begin:`0s`,dur:H,fill:`freeze`,repeatCount:`indefinite`}),l(`circle`,{class:`${e}-base-loading__icon`,fill:`none`,stroke:`currentColor`,"stroke-width":n,"stroke-linecap":`round`,cx:a,cy:a,r:t-n/2,"stroke-dasharray":5.67*t,"stroke-dashoffset":18.48*t},l(`animateTransform`,{attributeName:`transform`,type:`rotate`,values:`0 ${a} ${a};135 ${a} ${a};450 ${a} ${a}`,begin:`0s`,dur:H,fill:`freeze`,repeatCount:`indefinite`}),l(`animate`,{attributeName:`stroke-dashoffset`,values:`${5.67*t};${1.42*t};${5.67*t}`,begin:`0s`,dur:H,fill:`freeze`,repeatCount:`indefinite`})))))):l(`div`,{key:`placeholder`,class:`${e}-base-loading__placeholder`},this.$slots)}))}}),{cubicBezierEaseInOut:W}=p;function G({duration:e=`.2s`,delay:t=`.1s`}={}){return[f(`&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to`,{opacity:1}),f(`&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from`,`
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `),f(`&.fade-in-width-expand-transition-leave-active`,`
 overflow: hidden;
 transition:
 opacity ${e} ${W},
 max-width ${e} ${W} ${t},
 margin-left ${e} ${W} ${t},
 margin-right ${e} ${W} ${t};
 `),f(`&.fade-in-width-expand-transition-enter-active`,`
 overflow: hidden;
 transition:
 opacity ${e} ${W} ${t},
 max-width ${e} ${W},
 margin-left ${e} ${W},
 margin-right ${e} ${W};
 `)]}var K=w(`base-wave`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`),q=r({name:`BaseWave`,props:{clsPrefix:{type:String,required:!0}},setup(e){_(`-base-wave`,K,s(e,`clsPrefix`));let t=o(null),r=o(!1),i=null;return n(()=>{i!==null&&window.clearTimeout(i)}),{active:r,selfRef:t,play(){i!==null&&(window.clearTimeout(i),r.value=!1,i=null),c(()=>{var e;(e=t.value)==null||e.offsetHeight,r.value=!0,i=window.setTimeout(()=>{r.value=!1,i=null},1e3)})}}},render(){let{clsPrefix:e}=this;return l(`div`,{ref:`selfRef`,"aria-hidden":!0,class:[`${e}-base-wave`,this.active&&`${e}-base-wave--active`]})}}),J=P&&`chrome`in window;P&&navigator.userAgent.includes(`Firefox`);var Y=P&&navigator.userAgent.includes(`Safari`)&&!J;function X(e){return g(e,[255,255,255,.16])}function Z(e){return g(e,[0,0,0,.12])}var Q=M(`n-button-group`),$={paddingTiny:`0 6px`,paddingSmall:`0 10px`,paddingMedium:`0 14px`,paddingLarge:`0 18px`,paddingRoundTiny:`0 10px`,paddingRoundSmall:`0 14px`,paddingRoundMedium:`0 18px`,paddingRoundLarge:`0 22px`,iconMarginTiny:`6px`,iconMarginSmall:`6px`,iconMarginMedium:`6px`,iconMarginLarge:`6px`,iconSizeTiny:`14px`,iconSizeSmall:`18px`,iconSizeMedium:`18px`,iconSizeLarge:`20px`,rippleDuration:`.6s`};function ee(e){let{heightTiny:t,heightSmall:n,heightMedium:r,heightLarge:i,borderRadius:a,fontSizeTiny:o,fontSizeSmall:s,fontSizeMedium:c,fontSizeLarge:l,opacityDisabled:u,textColor2:d,textColor3:f,primaryColorHover:p,primaryColorPressed:m,borderColor:h,primaryColor:g,baseColor:_,infoColor:v,infoColorHover:y,infoColorPressed:b,successColor:x,successColorHover:S,successColorPressed:C,warningColor:w,warningColorHover:T,warningColorPressed:E,errorColor:D,errorColorHover:O,errorColorPressed:k,fontWeight:A,buttonColor2:j,buttonColor2Hover:M,buttonColor2Pressed:N,fontWeightStrong:P}=e;return Object.assign(Object.assign({},$),{heightTiny:t,heightSmall:n,heightMedium:r,heightLarge:i,borderRadiusTiny:a,borderRadiusSmall:a,borderRadiusMedium:a,borderRadiusLarge:a,fontSizeTiny:o,fontSizeSmall:s,fontSizeMedium:c,fontSizeLarge:l,opacityDisabled:u,colorOpacitySecondary:`0.16`,colorOpacitySecondaryHover:`0.22`,colorOpacitySecondaryPressed:`0.28`,colorSecondary:j,colorSecondaryHover:M,colorSecondaryPressed:N,colorTertiary:j,colorTertiaryHover:M,colorTertiaryPressed:N,colorQuaternary:`#0000`,colorQuaternaryHover:M,colorQuaternaryPressed:N,color:`#0000`,colorHover:`#0000`,colorPressed:`#0000`,colorFocus:`#0000`,colorDisabled:`#0000`,textColor:d,textColorTertiary:f,textColorHover:p,textColorPressed:m,textColorFocus:p,textColorDisabled:d,textColorText:d,textColorTextHover:p,textColorTextPressed:m,textColorTextFocus:p,textColorTextDisabled:d,textColorGhost:d,textColorGhostHover:p,textColorGhostPressed:m,textColorGhostFocus:p,textColorGhostDisabled:d,border:`1px solid ${h}`,borderHover:`1px solid ${p}`,borderPressed:`1px solid ${m}`,borderFocus:`1px solid ${p}`,borderDisabled:`1px solid ${h}`,rippleColor:g,colorPrimary:g,colorHoverPrimary:p,colorPressedPrimary:m,colorFocusPrimary:p,colorDisabledPrimary:g,textColorPrimary:_,textColorHoverPrimary:_,textColorPressedPrimary:_,textColorFocusPrimary:_,textColorDisabledPrimary:_,textColorTextPrimary:g,textColorTextHoverPrimary:p,textColorTextPressedPrimary:m,textColorTextFocusPrimary:p,textColorTextDisabledPrimary:d,textColorGhostPrimary:g,textColorGhostHoverPrimary:p,textColorGhostPressedPrimary:m,textColorGhostFocusPrimary:p,textColorGhostDisabledPrimary:g,borderPrimary:`1px solid ${g}`,borderHoverPrimary:`1px solid ${p}`,borderPressedPrimary:`1px solid ${m}`,borderFocusPrimary:`1px solid ${p}`,borderDisabledPrimary:`1px solid ${g}`,rippleColorPrimary:g,colorInfo:v,colorHoverInfo:y,colorPressedInfo:b,colorFocusInfo:y,colorDisabledInfo:v,textColorInfo:_,textColorHoverInfo:_,textColorPressedInfo:_,textColorFocusInfo:_,textColorDisabledInfo:_,textColorTextInfo:v,textColorTextHoverInfo:y,textColorTextPressedInfo:b,textColorTextFocusInfo:y,textColorTextDisabledInfo:d,textColorGhostInfo:v,textColorGhostHoverInfo:y,textColorGhostPressedInfo:b,textColorGhostFocusInfo:y,textColorGhostDisabledInfo:v,borderInfo:`1px solid ${v}`,borderHoverInfo:`1px solid ${y}`,borderPressedInfo:`1px solid ${b}`,borderFocusInfo:`1px solid ${y}`,borderDisabledInfo:`1px solid ${v}`,rippleColorInfo:v,colorSuccess:x,colorHoverSuccess:S,colorPressedSuccess:C,colorFocusSuccess:S,colorDisabledSuccess:x,textColorSuccess:_,textColorHoverSuccess:_,textColorPressedSuccess:_,textColorFocusSuccess:_,textColorDisabledSuccess:_,textColorTextSuccess:x,textColorTextHoverSuccess:S,textColorTextPressedSuccess:C,textColorTextFocusSuccess:S,textColorTextDisabledSuccess:d,textColorGhostSuccess:x,textColorGhostHoverSuccess:S,textColorGhostPressedSuccess:C,textColorGhostFocusSuccess:S,textColorGhostDisabledSuccess:x,borderSuccess:`1px solid ${x}`,borderHoverSuccess:`1px solid ${S}`,borderPressedSuccess:`1px solid ${C}`,borderFocusSuccess:`1px solid ${S}`,borderDisabledSuccess:`1px solid ${x}`,rippleColorSuccess:x,colorWarning:w,colorHoverWarning:T,colorPressedWarning:E,colorFocusWarning:T,colorDisabledWarning:w,textColorWarning:_,textColorHoverWarning:_,textColorPressedWarning:_,textColorFocusWarning:_,textColorDisabledWarning:_,textColorTextWarning:w,textColorTextHoverWarning:T,textColorTextPressedWarning:E,textColorTextFocusWarning:T,textColorTextDisabledWarning:d,textColorGhostWarning:w,textColorGhostHoverWarning:T,textColorGhostPressedWarning:E,textColorGhostFocusWarning:T,textColorGhostDisabledWarning:w,borderWarning:`1px solid ${w}`,borderHoverWarning:`1px solid ${T}`,borderPressedWarning:`1px solid ${E}`,borderFocusWarning:`1px solid ${T}`,borderDisabledWarning:`1px solid ${w}`,rippleColorWarning:w,colorError:D,colorHoverError:O,colorPressedError:k,colorFocusError:O,colorDisabledError:D,textColorError:_,textColorHoverError:_,textColorPressedError:_,textColorFocusError:_,textColorDisabledError:_,textColorTextError:D,textColorTextHoverError:O,textColorTextPressedError:k,textColorTextFocusError:O,textColorTextDisabledError:d,textColorGhostError:D,textColorGhostHoverError:O,textColorGhostPressedError:k,textColorGhostFocusError:O,textColorGhostDisabledError:D,borderError:`1px solid ${D}`,borderHoverError:`1px solid ${O}`,borderPressedError:`1px solid ${k}`,borderFocusError:`1px solid ${O}`,borderDisabledError:`1px solid ${D}`,rippleColorError:D,waveOpacity:`0.6`,fontWeight:A,fontWeightStrong:P})}var te={name:`Button`,common:C,self:ee},ne=f([w(`button`,`
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[m(`color`,[E(`border`,{borderColor:`var(--n-border-color)`}),m(`disabled`,[E(`border`,{borderColor:`var(--n-border-color-disabled)`})]),T(`disabled`,[f(`&:focus`,[E(`state-border`,{borderColor:`var(--n-border-color-focus)`})]),f(`&:hover`,[E(`state-border`,{borderColor:`var(--n-border-color-hover)`})]),f(`&:active`,[E(`state-border`,{borderColor:`var(--n-border-color-pressed)`})]),m(`pressed`,[E(`state-border`,{borderColor:`var(--n-border-color-pressed)`})])])]),m(`disabled`,{backgroundColor:`var(--n-color-disabled)`,color:`var(--n-text-color-disabled)`},[E(`border`,{border:`var(--n-border-disabled)`})]),T(`disabled`,[f(`&:focus`,{backgroundColor:`var(--n-color-focus)`,color:`var(--n-text-color-focus)`},[E(`state-border`,{border:`var(--n-border-focus)`})]),f(`&:hover`,{backgroundColor:`var(--n-color-hover)`,color:`var(--n-text-color-hover)`},[E(`state-border`,{border:`var(--n-border-hover)`})]),f(`&:active`,{backgroundColor:`var(--n-color-pressed)`,color:`var(--n-text-color-pressed)`},[E(`state-border`,{border:`var(--n-border-pressed)`})]),m(`pressed`,{backgroundColor:`var(--n-color-pressed)`,color:`var(--n-text-color-pressed)`},[E(`state-border`,{border:`var(--n-border-pressed)`})])]),m(`loading`,`cursor: wait;`),w(`base-wave`,`
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `,[m(`active`,{zIndex:1,animationName:`button-wave-spread, button-wave-opacity`})]),P&&`MozBoxSizing`in document.createElement(`div`).style?f(`&::moz-focus-inner`,{border:0}):null,E(`border, state-border`,`
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `),E(`border`,`
 border: var(--n-border);
 `),E(`state-border`,`
 border: var(--n-border);
 border-color: #0000;
 z-index: 1;
 `),E(`icon`,`
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `,[w(`icon-slot`,`
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `,[B({top:`50%`,originalTransform:`translateY(-50%)`})]),G()]),E(`content`,`
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `,[f(`~`,[E(`icon`,{margin:`var(--n-icon-margin)`,marginRight:0})])]),m(`block`,`
 display: flex;
 width: 100%;
 `),m(`dashed`,[E(`border, state-border`,{borderStyle:`dashed !important`})]),m(`disabled`,{cursor:`not-allowed`,opacity:`var(--n-opacity-disabled)`})]),f(`@keyframes button-wave-spread`,{from:{boxShadow:`0 0 0.5px 0 var(--n-ripple-color)`},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`}}),f(`@keyframes button-wave-opacity`,{from:{opacity:`var(--n-wave-opacity)`},to:{opacity:0}})]),re=r({name:`Button`,props:Object.assign(Object.assign({},x.props),{color:String,textColor:String,text:Boolean,block:Boolean,loading:Boolean,disabled:Boolean,circle:Boolean,size:String,ghost:Boolean,round:Boolean,secondary:Boolean,tertiary:Boolean,quaternary:Boolean,strong:Boolean,focusable:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},tag:{type:String,default:`button`},type:{type:String,default:`default`},dashed:Boolean,renderIcon:Function,iconPlacement:{type:String,default:`left`},attrType:{type:String,default:`button`},bordered:{type:Boolean,default:!0},onClick:[Function,Array],nativeFocusBehavior:{type:Boolean,default:!Y},spinProps:Object}),slots:Object,setup(t){let n=o(null),r=o(null),a=o(!1),s=j(()=>!t.quaternary&&!t.tertiary&&!t.secondary&&!t.text&&(!t.color||t.ghost||t.dashed)&&t.bordered),c=e(Q,{}),{inlineThemeDisabled:l,mergedClsPrefixRef:u,mergedRtlRef:f,mergedComponentPropsRef:p}=k(t),{mergedSizeRef:m}=L({},{defaultSize:`medium`,mergedSize:e=>{let{size:n}=t;if(n)return n;let{size:r}=c;if(r)return r;let{mergedSize:i}=e||{};return i?i.value:p?.value?.Button?.size||`medium`}}),h=i(()=>t.focusable&&!t.disabled),g=e=>{var r;h.value||e.preventDefault(),!t.nativeFocusBehavior&&(e.preventDefault(),!t.disabled&&h.value&&((r=n.value)==null||r.focus({preventScroll:!0})))},_=e=>{var n;if(!t.disabled&&!t.loading){let{onClick:i}=t;i&&D(i,e),t.text||(n=r.value)==null||n.play()}},v=e=>{switch(e.key){case`Enter`:if(!t.keyboard)return;a.value=!1}},C=e=>{switch(e.key){case`Enter`:if(!t.keyboard||t.loading){e.preventDefault();return}a.value=!0}},w=()=>{a.value=!1},T=x(`Button`,`-button`,ne,te,t,u),E=b(`Button`,f,u),O=i(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseOut:n},self:r}=T.value,{rippleDuration:i,opacityDisabled:a,fontWeight:o,fontWeightStrong:s}=r,c=m.value,{dashed:l,type:u,ghost:f,text:p,color:h,round:g,circle:_,textColor:v,secondary:b,tertiary:x,quaternary:S,strong:C}=t,w={"--n-font-weight":C?s:o},E={"--n-color":`initial`,"--n-color-hover":`initial`,"--n-color-pressed":`initial`,"--n-color-focus":`initial`,"--n-color-disabled":`initial`,"--n-ripple-color":`initial`,"--n-text-color":`initial`,"--n-text-color-hover":`initial`,"--n-text-color-pressed":`initial`,"--n-text-color-focus":`initial`,"--n-text-color-disabled":`initial`},D=u===`tertiary`,O=u===`default`,k=D?`default`:u;if(p){let e=v||h;E={"--n-color":`#0000`,"--n-color-hover":`#0000`,"--n-color-pressed":`#0000`,"--n-color-focus":`#0000`,"--n-color-disabled":`#0000`,"--n-ripple-color":`#0000`,"--n-text-color":e||r[d(`textColorText`,k)],"--n-text-color-hover":e?X(e):r[d(`textColorTextHover`,k)],"--n-text-color-pressed":e?Z(e):r[d(`textColorTextPressed`,k)],"--n-text-color-focus":e?X(e):r[d(`textColorTextHover`,k)],"--n-text-color-disabled":e||r[d(`textColorTextDisabled`,k)]}}else if(f||l){let e=v||h;E={"--n-color":`#0000`,"--n-color-hover":`#0000`,"--n-color-pressed":`#0000`,"--n-color-focus":`#0000`,"--n-color-disabled":`#0000`,"--n-ripple-color":h||r[d(`rippleColor`,k)],"--n-text-color":e||r[d(`textColorGhost`,k)],"--n-text-color-hover":e?X(e):r[d(`textColorGhostHover`,k)],"--n-text-color-pressed":e?Z(e):r[d(`textColorGhostPressed`,k)],"--n-text-color-focus":e?X(e):r[d(`textColorGhostHover`,k)],"--n-text-color-disabled":e||r[d(`textColorGhostDisabled`,k)]}}else if(b){let e=O?r.textColor:D?r.textColorTertiary:r[d(`color`,k)],t=h||e,n=u!==`default`&&u!==`tertiary`;E={"--n-color":n?y(t,{alpha:Number(r.colorOpacitySecondary)}):r.colorSecondary,"--n-color-hover":n?y(t,{alpha:Number(r.colorOpacitySecondaryHover)}):r.colorSecondaryHover,"--n-color-pressed":n?y(t,{alpha:Number(r.colorOpacitySecondaryPressed)}):r.colorSecondaryPressed,"--n-color-focus":n?y(t,{alpha:Number(r.colorOpacitySecondaryHover)}):r.colorSecondaryHover,"--n-color-disabled":r.colorSecondary,"--n-ripple-color":`#0000`,"--n-text-color":t,"--n-text-color-hover":t,"--n-text-color-pressed":t,"--n-text-color-focus":t,"--n-text-color-disabled":t}}else if(x||S){let e=O?r.textColor:D?r.textColorTertiary:r[d(`color`,k)],t=h||e;x?(E[`--n-color`]=r.colorTertiary,E[`--n-color-hover`]=r.colorTertiaryHover,E[`--n-color-pressed`]=r.colorTertiaryPressed,E[`--n-color-focus`]=r.colorSecondaryHover,E[`--n-color-disabled`]=r.colorTertiary):(E[`--n-color`]=r.colorQuaternary,E[`--n-color-hover`]=r.colorQuaternaryHover,E[`--n-color-pressed`]=r.colorQuaternaryPressed,E[`--n-color-focus`]=r.colorQuaternaryHover,E[`--n-color-disabled`]=r.colorQuaternary),E[`--n-ripple-color`]=`#0000`,E[`--n-text-color`]=t,E[`--n-text-color-hover`]=t,E[`--n-text-color-pressed`]=t,E[`--n-text-color-focus`]=t,E[`--n-text-color-disabled`]=t}else E={"--n-color":h||r[d(`color`,k)],"--n-color-hover":h?X(h):r[d(`colorHover`,k)],"--n-color-pressed":h?Z(h):r[d(`colorPressed`,k)],"--n-color-focus":h?X(h):r[d(`colorFocus`,k)],"--n-color-disabled":h||r[d(`colorDisabled`,k)],"--n-ripple-color":h||r[d(`rippleColor`,k)],"--n-text-color":v||(h?r.textColorPrimary:D?r.textColorTertiary:r[d(`textColor`,k)]),"--n-text-color-hover":v||(h?r.textColorHoverPrimary:r[d(`textColorHover`,k)]),"--n-text-color-pressed":v||(h?r.textColorPressedPrimary:r[d(`textColorPressed`,k)]),"--n-text-color-focus":v||(h?r.textColorFocusPrimary:r[d(`textColorFocus`,k)]),"--n-text-color-disabled":v||(h?r.textColorDisabledPrimary:r[d(`textColorDisabled`,k)])};let A={"--n-border":`initial`,"--n-border-hover":`initial`,"--n-border-pressed":`initial`,"--n-border-focus":`initial`,"--n-border-disabled":`initial`};A=p?{"--n-border":`none`,"--n-border-hover":`none`,"--n-border-pressed":`none`,"--n-border-focus":`none`,"--n-border-disabled":`none`}:{"--n-border":r[d(`border`,k)],"--n-border-hover":r[d(`borderHover`,k)],"--n-border-pressed":r[d(`borderPressed`,k)],"--n-border-focus":r[d(`borderFocus`,k)],"--n-border-disabled":r[d(`borderDisabled`,k)]};let{[d(`height`,c)]:j,[d(`fontSize`,c)]:M,[d(`padding`,c)]:N,[d(`paddingRound`,c)]:P,[d(`iconSize`,c)]:F,[d(`borderRadius`,c)]:I,[d(`iconMargin`,c)]:L,waveOpacity:R}=r,z={"--n-width":_&&!p?j:`initial`,"--n-height":p?`initial`:j,"--n-font-size":M,"--n-padding":_||p?`initial`:g?P:N,"--n-icon-size":F,"--n-icon-margin":L,"--n-border-radius":p?`initial`:_||g?j:I};return Object.assign(Object.assign(Object.assign(Object.assign({"--n-bezier":e,"--n-bezier-ease-out":n,"--n-ripple-duration":i,"--n-opacity-disabled":a,"--n-wave-opacity":R},w),E),A),z)}),A=l?S(`button`,i(()=>{let e=``,{dashed:n,type:r,ghost:i,text:a,color:o,round:s,circle:c,textColor:l,secondary:u,tertiary:d,quaternary:f,strong:p}=t;n&&(e+=`a`),i&&(e+=`b`),a&&(e+=`c`),s&&(e+=`d`),c&&(e+=`e`),u&&(e+=`f`),d&&(e+=`g`),f&&(e+=`h`),p&&(e+=`i`),o&&(e+=`j${F(o)}`),l&&(e+=`k${F(l)}`);let{value:h}=m;return e+=`l${h[0]}`,e+=`m${r[0]}`,e}),O,t):void 0;return{selfElRef:n,waveElRef:r,mergedClsPrefix:u,mergedFocusable:h,mergedSize:m,showBorder:s,enterPressed:a,rtlEnabled:E,handleMousedown:g,handleKeydown:C,handleBlur:w,handleKeyup:v,handleClick:_,customColorCssVars:i(()=>{let{color:e}=t;if(!e)return null;let n=X(e);return{"--n-border-color":e,"--n-border-color-hover":n,"--n-border-color-pressed":Z(e),"--n-border-color-focus":n,"--n-border-color-disabled":e}}),cssVars:l?void 0:O,themeClass:A?.themeClass,onRender:A?.onRender}},render(){let{mergedClsPrefix:e,tag:t,onRender:n}=this;n?.();let r=h(this.$slots.default,t=>t&&l(`span`,{class:`${e}-button__content`},t));return l(t,{ref:`selfElRef`,class:[this.themeClass,`${e}-button`,`${e}-button--${this.type}-type`,`${e}-button--${this.mergedSize}-type`,this.rtlEnabled&&`${e}-button--rtl`,this.disabled&&`${e}-button--disabled`,this.block&&`${e}-button--block`,this.enterPressed&&`${e}-button--pressed`,!this.text&&this.dashed&&`${e}-button--dashed`,this.color&&`${e}-button--color`,this.secondary&&`${e}-button--secondary`,this.loading&&`${e}-button--loading`,this.ghost&&`${e}-button--ghost`],tabindex:this.mergedFocusable?0:-1,type:this.attrType,style:this.cssVars,disabled:this.disabled,onClick:this.handleClick,onBlur:this.handleBlur,onMousedown:this.handleMousedown,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},this.iconPlacement===`right`&&r,l(O,{width:!0},{default:()=>h(this.$slots.icon,t=>(this.loading||this.renderIcon||t)&&l(`span`,{class:`${e}-button__icon`,style:{margin:v(this.$slots.default)?`0`:``}},l(R,null,{default:()=>this.loading?l(U,Object.assign({clsPrefix:e,key:`loading`,class:`${e}-icon-slot`,strokeWidth:20},this.spinProps)):l(`div`,{key:`icon`,class:`${e}-icon-slot`,role:`none`},this.renderIcon?this.renderIcon():t)})))}),this.iconPlacement===`left`&&r,this.text?null:l(q,{ref:`waveElRef`,clsPrefix:e}),this.showBorder?l(`div`,{"aria-hidden":!0,class:`${e}-button__border`,style:this.customColorCssVars}):null,this.showBorder?l(`div`,{"aria-hidden":!0,class:`${e}-button__state-border`,style:this.customColorCssVars}):null)}});export{re as t};