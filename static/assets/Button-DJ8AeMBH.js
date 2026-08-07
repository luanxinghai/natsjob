import{E as e,F as t,M as n,_t as r,b as i,d as a,dt as o,ft as s,k as c,w as l,z as u}from"./runtime-core.esm-bundler-B3s4PMd6.js";import{l as d}from"./use-form-common-props-DmFIHsi9.js";import{S as f,_ as p,a as m,b as h,f as g,h as _,i as v,l as y,m as b,o as x,r as S,s as C,t as w,v as T,x as E,y as D}from"./light-DFdLWobW.js";import{a as O,l as k}from"./merge-BvhfJ689.js";import{t as A}from"./use-memo-BFvYzvMn.js";import{t as j}from"./call-fCmD0dxi.js";import{n as M}from"./fade-in-height-expand.cssr-BkJgvwV-.js";function N(){let e=s(!1);return t(()=>{e.value=!0}),o(e)}var P=typeof document<`u`&&typeof window<`u`;function F(e){return e.replace(/#|\(|\)|,|\s|\./g,`_`)}var I=k(`n-form-item`);function L(t,{defaultSize:r=`medium`,mergedSize:i,mergedDisabled:o}={}){let s=e(I,null);u(I,null);let c=a(i?()=>i(s):()=>{let{size:e}=t;if(e)return e;if(s){let{mergedSize:e}=s;if(e.value!==void 0)return e.value}return r}),l=a(o?()=>o(s):()=>{let{disabled:e}=t;return e===void 0?s?s.disabled.value:!1:e}),d=a(()=>{let{status:e}=t;return e||s?.mergedValidationStatus.value});return n(()=>{s&&s.restoreValidation()}),{mergedSizeRef:c,mergedDisabledRef:l,mergedStatusRef:d,nTriggerFormBlur(){s&&s.handleContentBlur()},nTriggerFormChange(){s&&s.handleContentChange()},nTriggerFormFocus(){s&&s.handleContentFocus()},nTriggerFormInput(){s&&s.handleContentInput()}}}var R=i({name:`BaseIconSwitchTransition`,setup(e,{slots:t}){let n=N();return()=>l(d,{name:`icon-switch-transition`,appear:n.value},t)}}),{cubicBezierEaseInOut:z}=m;function B({originalTransform:e=``,left:t=0,top:n=0,transition:r=`all .3s ${z} !important`}={}){return[p(`&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to`,{transform:`${e} scale(0.75)`,left:t,top:n,opacity:0}),p(`&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from`,{transform:`scale(1) ${e}`,left:t,top:n,opacity:1}),p(`&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active`,{transformOrigin:`center`,position:`absolute`,left:t,top:n,transition:r})]}var V=p([p(`@keyframes rotator`,`
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`),T(`base-loading`,`
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `,[D(`transition-wrapper`,`
 position: absolute;
 width: 100%;
 height: 100%;
 `,[B()]),D(`placeholder`,`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[B({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),D(`container`,`
 animation: rotator 3s linear infinite both;
 `,[D(`icon`,`
 height: 1em;
 width: 1em;
 `)])])]),H=`1.6s`,U=i({name:`BaseLoading`,props:Object.assign({clsPrefix:{type:String,required:!0},show:{type:Boolean,default:!0}},{strokeWidth:{type:Number,default:28},stroke:{type:String,default:void 0},scale:{type:Number,default:1},radius:{type:Number,default:100}}),setup(e){v(`-base-loading`,V,r(e,`clsPrefix`))},render(){let{clsPrefix:e,radius:t,strokeWidth:n,stroke:r,scale:i}=this,a=t/i;return l(`div`,{class:`${e}-base-loading`,role:`img`,"aria-label":`loading`},l(R,null,{default:()=>this.show?l(`div`,{key:`icon`,class:`${e}-base-loading__transition-wrapper`},l(`div`,{class:`${e}-base-loading__container`},l(`svg`,{class:`${e}-base-loading__icon`,viewBox:`0 0 ${2*a} ${2*a}`,xmlns:`http://www.w3.org/2000/svg`,style:{color:r}},l(`g`,null,l(`animateTransform`,{attributeName:`transform`,type:`rotate`,values:`0 ${a} ${a};270 ${a} ${a}`,begin:`0s`,dur:H,fill:`freeze`,repeatCount:`indefinite`}),l(`circle`,{class:`${e}-base-loading__icon`,fill:`none`,stroke:`currentColor`,"stroke-width":n,"stroke-linecap":`round`,cx:a,cy:a,r:t-n/2,"stroke-dasharray":5.67*t,"stroke-dashoffset":18.48*t},l(`animateTransform`,{attributeName:`transform`,type:`rotate`,values:`0 ${a} ${a};135 ${a} ${a};450 ${a} ${a}`,begin:`0s`,dur:H,fill:`freeze`,repeatCount:`indefinite`}),l(`animate`,{attributeName:`stroke-dashoffset`,values:`${5.67*t};${1.42*t};${5.67*t}`,begin:`0s`,dur:H,fill:`freeze`,repeatCount:`indefinite`})))))):l(`div`,{key:`placeholder`,class:`${e}-base-loading__placeholder`},this.$slots)}))}}),{cubicBezierEaseInOut:W}=m;function G({duration:e=`.2s`,delay:t=`.1s`}={}){return[p(`&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to`,{opacity:1}),p(`&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from`,`
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `),p(`&.fade-in-width-expand-transition-leave-active`,`
 overflow: hidden;
 transition:
 opacity ${e} ${W},
 max-width ${e} ${W} ${t},
 margin-left ${e} ${W} ${t},
 margin-right ${e} ${W} ${t};
 `),p(`&.fade-in-width-expand-transition-enter-active`,`
 overflow: hidden;
 transition:
 opacity ${e} ${W} ${t},
 max-width ${e} ${W},
 margin-left ${e} ${W},
 margin-right ${e} ${W};
 `)]}var K=T(`base-wave`,`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`),q=i({name:`BaseWave`,props:{clsPrefix:{type:String,required:!0}},setup(e){v(`-base-wave`,K,r(e,`clsPrefix`));let t=s(null),i=s(!1),a=null;return n(()=>{a!==null&&window.clearTimeout(a)}),{active:i,selfRef:t,play(){a!==null&&(window.clearTimeout(a),i.value=!1,a=null),c(()=>{var e;(e=t.value)==null||e.offsetHeight,i.value=!0,a=window.setTimeout(()=>{i.value=!1,a=null},1e3)})}}},render(){let{clsPrefix:e}=this;return l(`div`,{ref:`selfRef`,"aria-hidden":!0,class:[`${e}-base-wave`,this.active&&`${e}-base-wave--active`]})}}),J=P&&`chrome`in window;P&&navigator.userAgent.includes(`Firefox`);var Y=P&&navigator.userAgent.includes(`Safari`)&&!J;function X(e){return _(e,[255,255,255,.16])}function Z(e){return _(e,[0,0,0,.12])}var Q=k(`n-button-group`),$={paddingTiny:`0 6px`,paddingSmall:`0 10px`,paddingMedium:`0 14px`,paddingLarge:`0 18px`,paddingRoundTiny:`0 10px`,paddingRoundSmall:`0 14px`,paddingRoundMedium:`0 18px`,paddingRoundLarge:`0 22px`,iconMarginTiny:`6px`,iconMarginSmall:`6px`,iconMarginMedium:`6px`,iconMarginLarge:`6px`,iconSizeTiny:`14px`,iconSizeSmall:`18px`,iconSizeMedium:`18px`,iconSizeLarge:`20px`,rippleDuration:`.6s`};function ee(e){let{heightTiny:t,heightSmall:n,heightMedium:r,heightLarge:i,borderRadius:a,fontSizeTiny:o,fontSizeSmall:s,fontSizeMedium:c,fontSizeLarge:l,opacityDisabled:u,textColor2:d,textColor3:f,primaryColorHover:p,primaryColorPressed:m,borderColor:h,primaryColor:g,baseColor:_,infoColor:v,infoColorHover:y,infoColorPressed:b,successColor:x,successColorHover:S,successColorPressed:C,warningColor:w,warningColorHover:T,warningColorPressed:E,errorColor:D,errorColorHover:O,errorColorPressed:k,fontWeight:A,buttonColor2:j,buttonColor2Hover:M,buttonColor2Pressed:N,fontWeightStrong:P}=e;return Object.assign(Object.assign({},$),{heightTiny:t,heightSmall:n,heightMedium:r,heightLarge:i,borderRadiusTiny:a,borderRadiusSmall:a,borderRadiusMedium:a,borderRadiusLarge:a,fontSizeTiny:o,fontSizeSmall:s,fontSizeMedium:c,fontSizeLarge:l,opacityDisabled:u,colorOpacitySecondary:`0.16`,colorOpacitySecondaryHover:`0.22`,colorOpacitySecondaryPressed:`0.28`,colorSecondary:j,colorSecondaryHover:M,colorSecondaryPressed:N,colorTertiary:j,colorTertiaryHover:M,colorTertiaryPressed:N,colorQuaternary:`#0000`,colorQuaternaryHover:M,colorQuaternaryPressed:N,color:`#0000`,colorHover:`#0000`,colorPressed:`#0000`,colorFocus:`#0000`,colorDisabled:`#0000`,textColor:d,textColorTertiary:f,textColorHover:p,textColorPressed:m,textColorFocus:p,textColorDisabled:d,textColorText:d,textColorTextHover:p,textColorTextPressed:m,textColorTextFocus:p,textColorTextDisabled:d,textColorGhost:d,textColorGhostHover:p,textColorGhostPressed:m,textColorGhostFocus:p,textColorGhostDisabled:d,border:`1px solid ${h}`,borderHover:`1px solid ${p}`,borderPressed:`1px solid ${m}`,borderFocus:`1px solid ${p}`,borderDisabled:`1px solid ${h}`,rippleColor:g,colorPrimary:g,colorHoverPrimary:p,colorPressedPrimary:m,colorFocusPrimary:p,colorDisabledPrimary:g,textColorPrimary:_,textColorHoverPrimary:_,textColorPressedPrimary:_,textColorFocusPrimary:_,textColorDisabledPrimary:_,textColorTextPrimary:g,textColorTextHoverPrimary:p,textColorTextPressedPrimary:m,textColorTextFocusPrimary:p,textColorTextDisabledPrimary:d,textColorGhostPrimary:g,textColorGhostHoverPrimary:p,textColorGhostPressedPrimary:m,textColorGhostFocusPrimary:p,textColorGhostDisabledPrimary:g,borderPrimary:`1px solid ${g}`,borderHoverPrimary:`1px solid ${p}`,borderPressedPrimary:`1px solid ${m}`,borderFocusPrimary:`1px solid ${p}`,borderDisabledPrimary:`1px solid ${g}`,rippleColorPrimary:g,colorInfo:v,colorHoverInfo:y,colorPressedInfo:b,colorFocusInfo:y,colorDisabledInfo:v,textColorInfo:_,textColorHoverInfo:_,textColorPressedInfo:_,textColorFocusInfo:_,textColorDisabledInfo:_,textColorTextInfo:v,textColorTextHoverInfo:y,textColorTextPressedInfo:b,textColorTextFocusInfo:y,textColorTextDisabledInfo:d,textColorGhostInfo:v,textColorGhostHoverInfo:y,textColorGhostPressedInfo:b,textColorGhostFocusInfo:y,textColorGhostDisabledInfo:v,borderInfo:`1px solid ${v}`,borderHoverInfo:`1px solid ${y}`,borderPressedInfo:`1px solid ${b}`,borderFocusInfo:`1px solid ${y}`,borderDisabledInfo:`1px solid ${v}`,rippleColorInfo:v,colorSuccess:x,colorHoverSuccess:S,colorPressedSuccess:C,colorFocusSuccess:S,colorDisabledSuccess:x,textColorSuccess:_,textColorHoverSuccess:_,textColorPressedSuccess:_,textColorFocusSuccess:_,textColorDisabledSuccess:_,textColorTextSuccess:x,textColorTextHoverSuccess:S,textColorTextPressedSuccess:C,textColorTextFocusSuccess:S,textColorTextDisabledSuccess:d,textColorGhostSuccess:x,textColorGhostHoverSuccess:S,textColorGhostPressedSuccess:C,textColorGhostFocusSuccess:S,textColorGhostDisabledSuccess:x,borderSuccess:`1px solid ${x}`,borderHoverSuccess:`1px solid ${S}`,borderPressedSuccess:`1px solid ${C}`,borderFocusSuccess:`1px solid ${S}`,borderDisabledSuccess:`1px solid ${x}`,rippleColorSuccess:x,colorWarning:w,colorHoverWarning:T,colorPressedWarning:E,colorFocusWarning:T,colorDisabledWarning:w,textColorWarning:_,textColorHoverWarning:_,textColorPressedWarning:_,textColorFocusWarning:_,textColorDisabledWarning:_,textColorTextWarning:w,textColorTextHoverWarning:T,textColorTextPressedWarning:E,textColorTextFocusWarning:T,textColorTextDisabledWarning:d,textColorGhostWarning:w,textColorGhostHoverWarning:T,textColorGhostPressedWarning:E,textColorGhostFocusWarning:T,textColorGhostDisabledWarning:w,borderWarning:`1px solid ${w}`,borderHoverWarning:`1px solid ${T}`,borderPressedWarning:`1px solid ${E}`,borderFocusWarning:`1px solid ${T}`,borderDisabledWarning:`1px solid ${w}`,rippleColorWarning:w,colorError:D,colorHoverError:O,colorPressedError:k,colorFocusError:O,colorDisabledError:D,textColorError:_,textColorHoverError:_,textColorPressedError:_,textColorFocusError:_,textColorDisabledError:_,textColorTextError:D,textColorTextHoverError:O,textColorTextPressedError:k,textColorTextFocusError:O,textColorTextDisabledError:d,textColorGhostError:D,textColorGhostHoverError:O,textColorGhostPressedError:k,textColorGhostFocusError:O,textColorGhostDisabledError:D,borderError:`1px solid ${D}`,borderHoverError:`1px solid ${O}`,borderPressedError:`1px solid ${k}`,borderFocusError:`1px solid ${O}`,borderDisabledError:`1px solid ${D}`,rippleColorError:D,waveOpacity:`0.6`,fontWeight:A,fontWeightStrong:P})}var te={name:`Button`,common:w,self:ee},ne=p([T(`button`,`
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
 `,[h(`color`,[D(`border`,{borderColor:`var(--n-border-color)`}),h(`disabled`,[D(`border`,{borderColor:`var(--n-border-color-disabled)`})]),E(`disabled`,[p(`&:focus`,[D(`state-border`,{borderColor:`var(--n-border-color-focus)`})]),p(`&:hover`,[D(`state-border`,{borderColor:`var(--n-border-color-hover)`})]),p(`&:active`,[D(`state-border`,{borderColor:`var(--n-border-color-pressed)`})]),h(`pressed`,[D(`state-border`,{borderColor:`var(--n-border-color-pressed)`})])])]),h(`disabled`,{backgroundColor:`var(--n-color-disabled)`,color:`var(--n-text-color-disabled)`},[D(`border`,{border:`var(--n-border-disabled)`})]),E(`disabled`,[p(`&:focus`,{backgroundColor:`var(--n-color-focus)`,color:`var(--n-text-color-focus)`},[D(`state-border`,{border:`var(--n-border-focus)`})]),p(`&:hover`,{backgroundColor:`var(--n-color-hover)`,color:`var(--n-text-color-hover)`},[D(`state-border`,{border:`var(--n-border-hover)`})]),p(`&:active`,{backgroundColor:`var(--n-color-pressed)`,color:`var(--n-text-color-pressed)`},[D(`state-border`,{border:`var(--n-border-pressed)`})]),h(`pressed`,{backgroundColor:`var(--n-color-pressed)`,color:`var(--n-text-color-pressed)`},[D(`state-border`,{border:`var(--n-border-pressed)`})])]),h(`loading`,`cursor: wait;`),T(`base-wave`,`
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `,[h(`active`,{zIndex:1,animationName:`button-wave-spread, button-wave-opacity`})]),P&&`MozBoxSizing`in document.createElement(`div`).style?p(`&::moz-focus-inner`,{border:0}):null,D(`border, state-border`,`
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `),D(`border`,`
 border: var(--n-border);
 `),D(`state-border`,`
 border: var(--n-border);
 border-color: #0000;
 z-index: 1;
 `),D(`icon`,`
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `,[T(`icon-slot`,`
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `,[B({top:`50%`,originalTransform:`translateY(-50%)`})]),G()]),D(`content`,`
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `,[p(`~`,[D(`icon`,{margin:`var(--n-icon-margin)`,marginRight:0})])]),h(`block`,`
 display: flex;
 width: 100%;
 `),h(`dashed`,[D(`border, state-border`,{borderStyle:`dashed !important`})]),h(`disabled`,{cursor:`not-allowed`,opacity:`var(--n-opacity-disabled)`})]),p(`@keyframes button-wave-spread`,{from:{boxShadow:`0 0 0.5px 0 var(--n-ripple-color)`},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`}}),p(`@keyframes button-wave-opacity`,{from:{opacity:`var(--n-wave-opacity)`},to:{opacity:0}})]),re=Object.assign(Object.assign({},S.props),{color:String,textColor:String,text:Boolean,block:Boolean,loading:Boolean,disabled:Boolean,circle:Boolean,size:String,ghost:Boolean,round:Boolean,secondary:Boolean,tertiary:Boolean,quaternary:Boolean,strong:Boolean,focusable:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},tag:{type:String,default:`button`},type:{type:String,default:`default`},dashed:Boolean,renderIcon:Function,iconPlacement:{type:String,default:`left`},attrType:{type:String,default:`button`},bordered:{type:Boolean,default:!0},onClick:[Function,Array],nativeFocusBehavior:{type:Boolean,default:!Y},spinProps:Object}),ie=i({name:`Button`,props:re,slots:Object,setup(t){let n=s(null),r=s(null),i=s(!1),o=A(()=>!t.quaternary&&!t.tertiary&&!t.secondary&&!t.text&&(!t.color||t.ghost||t.dashed)&&t.bordered),c=e(Q,{}),{inlineThemeDisabled:l,mergedClsPrefixRef:u,mergedRtlRef:d,mergedComponentPropsRef:p}=O(t),{mergedSizeRef:m}=L({},{defaultSize:`medium`,mergedSize:e=>{let{size:n}=t;if(n)return n;let{size:r}=c;if(r)return r;let{mergedSize:i}=e||{};return i?i.value:p?.value?.Button?.size||`medium`}}),h=a(()=>t.focusable&&!t.disabled),g=e=>{var r;h.value||e.preventDefault(),!t.nativeFocusBehavior&&(e.preventDefault(),!t.disabled&&h.value&&((r=n.value)==null||r.focus({preventScroll:!0})))},_=e=>{var n;if(!t.disabled&&!t.loading){let{onClick:i}=t;i&&j(i,e),t.text||(n=r.value)==null||n.play()}},v=e=>{if(e.key===`Enter`){if(!t.keyboard)return;i.value=!1}},y=e=>{if(e.key===`Enter`){if(!t.keyboard||t.loading){e.preventDefault();return}i.value=!0}},w=()=>{i.value=!1},T=S(`Button`,`-button`,ne,te,t,u),E=x(`Button`,d,u),D=a(()=>{let{common:{cubicBezierEaseInOut:e,cubicBezierEaseOut:n},self:r}=T.value,{rippleDuration:i,opacityDisabled:a,fontWeight:o,fontWeightStrong:s}=r,c=m.value,{dashed:l,type:u,ghost:d,text:p,color:h,round:g,circle:_,textColor:v,secondary:y,tertiary:x,quaternary:S,strong:C}=t,w={"--n-font-weight":C?s:o},E={"--n-color":`initial`,"--n-color-hover":`initial`,"--n-color-pressed":`initial`,"--n-color-focus":`initial`,"--n-color-disabled":`initial`,"--n-ripple-color":`initial`,"--n-text-color":`initial`,"--n-text-color-hover":`initial`,"--n-text-color-pressed":`initial`,"--n-text-color-focus":`initial`,"--n-text-color-disabled":`initial`},D=u===`tertiary`,O=u==="default",k=D?`default`:u;if(p){let e=v||h;E={"--n-color":`#0000`,"--n-color-hover":`#0000`,"--n-color-pressed":`#0000`,"--n-color-focus":`#0000`,"--n-color-disabled":`#0000`,"--n-ripple-color":`#0000`,"--n-text-color":e||r[f(`textColorText`,k)],"--n-text-color-hover":e?X(e):r[f(`textColorTextHover`,k)],"--n-text-color-pressed":e?Z(e):r[f(`textColorTextPressed`,k)],"--n-text-color-focus":e?X(e):r[f(`textColorTextHover`,k)],"--n-text-color-disabled":e||r[f(`textColorTextDisabled`,k)]}}else if(d||l){let e=v||h;E={"--n-color":`#0000`,"--n-color-hover":`#0000`,"--n-color-pressed":`#0000`,"--n-color-focus":`#0000`,"--n-color-disabled":`#0000`,"--n-ripple-color":h||r[f(`rippleColor`,k)],"--n-text-color":e||r[f(`textColorGhost`,k)],"--n-text-color-hover":e?X(e):r[f(`textColorGhostHover`,k)],"--n-text-color-pressed":e?Z(e):r[f(`textColorGhostPressed`,k)],"--n-text-color-focus":e?X(e):r[f(`textColorGhostHover`,k)],"--n-text-color-disabled":e||r[f(`textColorGhostDisabled`,k)]}}else if(y){let e=O?r.textColor:D?r.textColorTertiary:r[f(`color`,k)],t=h||e,n=u!=="default"&&u!==`tertiary`;E={"--n-color":n?b(t,{alpha:Number(r.colorOpacitySecondary)}):r.colorSecondary,"--n-color-hover":n?b(t,{alpha:Number(r.colorOpacitySecondaryHover)}):r.colorSecondaryHover,"--n-color-pressed":n?b(t,{alpha:Number(r.colorOpacitySecondaryPressed)}):r.colorSecondaryPressed,"--n-color-focus":n?b(t,{alpha:Number(r.colorOpacitySecondaryHover)}):r.colorSecondaryHover,"--n-color-disabled":r.colorSecondary,"--n-ripple-color":`#0000`,"--n-text-color":t,"--n-text-color-hover":t,"--n-text-color-pressed":t,"--n-text-color-focus":t,"--n-text-color-disabled":t}}else if(x||S){let e=O?r.textColor:D?r.textColorTertiary:r[f(`color`,k)],t=h||e;x?(E[`--n-color`]=r.colorTertiary,E[`--n-color-hover`]=r.colorTertiaryHover,E[`--n-color-pressed`]=r.colorTertiaryPressed,E[`--n-color-focus`]=r.colorSecondaryHover,E[`--n-color-disabled`]=r.colorTertiary):(E[`--n-color`]=r.colorQuaternary,E[`--n-color-hover`]=r.colorQuaternaryHover,E[`--n-color-pressed`]=r.colorQuaternaryPressed,E[`--n-color-focus`]=r.colorQuaternaryHover,E[`--n-color-disabled`]=r.colorQuaternary),E[`--n-ripple-color`]=`#0000`,E[`--n-text-color`]=t,E[`--n-text-color-hover`]=t,E[`--n-text-color-pressed`]=t,E[`--n-text-color-focus`]=t,E[`--n-text-color-disabled`]=t}else E={"--n-color":h||r[f(`color`,k)],"--n-color-hover":h?X(h):r[f(`colorHover`,k)],"--n-color-pressed":h?Z(h):r[f(`colorPressed`,k)],"--n-color-focus":h?X(h):r[f(`colorFocus`,k)],"--n-color-disabled":h||r[f(`colorDisabled`,k)],"--n-ripple-color":h||r[f(`rippleColor`,k)],"--n-text-color":v||(h?r.textColorPrimary:D?r.textColorTertiary:r[f(`textColor`,k)]),"--n-text-color-hover":v||(h?r.textColorHoverPrimary:r[f(`textColorHover`,k)]),"--n-text-color-pressed":v||(h?r.textColorPressedPrimary:r[f(`textColorPressed`,k)]),"--n-text-color-focus":v||(h?r.textColorFocusPrimary:r[f(`textColorFocus`,k)]),"--n-text-color-disabled":v||(h?r.textColorDisabledPrimary:r[f(`textColorDisabled`,k)])};let A={"--n-border":`initial`,"--n-border-hover":`initial`,"--n-border-pressed":`initial`,"--n-border-focus":`initial`,"--n-border-disabled":`initial`};A=p?{"--n-border":`none`,"--n-border-hover":`none`,"--n-border-pressed":`none`,"--n-border-focus":`none`,"--n-border-disabled":`none`}:{"--n-border":r[f(`border`,k)],"--n-border-hover":r[f(`borderHover`,k)],"--n-border-pressed":r[f(`borderPressed`,k)],"--n-border-focus":r[f(`borderFocus`,k)],"--n-border-disabled":r[f(`borderDisabled`,k)]};let{[f(`height`,c)]:j,[f(`fontSize`,c)]:M,[f(`padding`,c)]:N,[f(`paddingRound`,c)]:P,[f(`iconSize`,c)]:F,[f(`borderRadius`,c)]:I,[f(`iconMargin`,c)]:L,waveOpacity:R}=r,z={"--n-width":_&&!p?j:`initial`,"--n-height":p?`initial`:j,"--n-font-size":M,"--n-padding":_||p?`initial`:g?P:N,"--n-icon-size":F,"--n-icon-margin":L,"--n-border-radius":p?`initial`:_||g?j:I};return Object.assign(Object.assign(Object.assign(Object.assign({"--n-bezier":e,"--n-bezier-ease-out":n,"--n-ripple-duration":i,"--n-opacity-disabled":a,"--n-wave-opacity":R},w),E),A),z)}),k=l?C(`button`,a(()=>{let e=``,{dashed:n,type:r,ghost:i,text:a,color:o,round:s,circle:c,textColor:l,secondary:u,tertiary:d,quaternary:f,strong:p}=t;n&&(e+=`a`),i&&(e+=`b`),a&&(e+=`c`),s&&(e+=`d`),c&&(e+=`e`),u&&(e+=`f`),d&&(e+=`g`),f&&(e+=`h`),p&&(e+=`i`),o&&(e+=`j${F(o)}`),l&&(e+=`k${F(l)}`);let{value:h}=m;return e+=`l${h[0]}`,e+=`m${r[0]}`,e}),D,t):void 0;return{selfElRef:n,waveElRef:r,mergedClsPrefix:u,mergedFocusable:h,mergedSize:m,showBorder:o,enterPressed:i,rtlEnabled:E,handleMousedown:g,handleKeydown:y,handleBlur:w,handleKeyup:v,handleClick:_,customColorCssVars:a(()=>{let{color:e}=t;if(!e)return null;let n=X(e);return{"--n-border-color":e,"--n-border-color-hover":n,"--n-border-color-pressed":Z(e),"--n-border-color-focus":n,"--n-border-color-disabled":e}}),cssVars:l?void 0:D,themeClass:k?.themeClass,onRender:k?.onRender}},render(){let{mergedClsPrefix:e,tag:t,onRender:n}=this;n?.();let r=g(this.$slots.default,t=>t&&l(`span`,{class:`${e}-button__content`},t));return l(t,{ref:`selfElRef`,class:[this.themeClass,`${e}-button`,`${e}-button--${this.type}-type`,`${e}-button--${this.mergedSize}-type`,this.rtlEnabled&&`${e}-button--rtl`,this.disabled&&`${e}-button--disabled`,this.block&&`${e}-button--block`,this.enterPressed&&`${e}-button--pressed`,!this.text&&this.dashed&&`${e}-button--dashed`,this.color&&`${e}-button--color`,this.secondary&&`${e}-button--secondary`,this.loading&&`${e}-button--loading`,this.ghost&&`${e}-button--ghost`],tabindex:this.mergedFocusable?0:-1,type:this.attrType,style:this.cssVars,disabled:this.disabled,onClick:this.handleClick,onBlur:this.handleBlur,onMousedown:this.handleMousedown,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},this.iconPlacement===`right`&&r,l(M,{width:!0},{default:()=>g(this.$slots.icon,t=>(this.loading||this.renderIcon||t)&&l(`span`,{class:`${e}-button__icon`,style:{margin:y(this.$slots.default)?`0`:``}},l(R,null,{default:()=>this.loading?l(U,Object.assign({clsPrefix:e,key:`loading`,class:`${e}-icon-slot`,strokeWidth:20},this.spinProps)):l(`div`,{key:`icon`,class:`${e}-icon-slot`,role:`none`},this.renderIcon?this.renderIcon():t)})))}),this.iconPlacement===`left`&&r,this.text?null:l(q,{ref:`waveElRef`,clsPrefix:e}),this.showBorder?l(`div`,{"aria-hidden":!0,class:`${e}-button__border`,style:this.customColorCssVars}):null,this.showBorder?l(`div`,{"aria-hidden":!0,class:`${e}-button__state-border`,style:this.customColorCssVars}):null)}});export{ie as t};