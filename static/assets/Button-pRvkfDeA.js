import{U as e}from"./es-CAKLDtcF.js";import{E as t,F as n,M as r,b as i,d as a,dt as o,ft as s,gt as c,k as l,w as u,z as d}from"./runtime-core.esm-bundler-fv2244ep.js";import{S as f,_ as p,a as m,b as h,f as g,h as _,i as v,l as y,m as b,o as x,r as S,s as C,t as w,v as T,x as E,y as D}from"./light-CPrQc-Dl.js";import{a as O,t as k}from"./use-config-DoSIpgUv.js";import{t as A}from"./use-memo-BOT9lO8n.js";import{t as j}from"./call-ntOWOkaG.js";import{n as M}from"./fade-in-height-expand.cssr-CE383BYD.js";function N(){let e=s(!1);return n(()=>{e.value=!0}),o(e)}var P=typeof document<`u`&&typeof window<`u`;function F(e){return e.replace(/#|\(|\)|,|\s|\./g,`_`)}var I=O(`n-form-item`);function L(e,{defaultSize:n=`medium`,mergedSize:i,mergedDisabled:o}={}){let s=t(I,null);d(I,null);let c=a(i?()=>i(s):()=>{let{size:t}=e;if(t)return t;if(s){let{mergedSize:e}=s;if(e.value!==void 0)return e.value}return n}),l=a(o?()=>o(s):()=>{let{disabled:t}=e;return t===void 0?s?s.disabled.value:!1:t}),u=a(()=>{let{status:t}=e;return t||s?.mergedValidationStatus.value});return r(()=>{s&&s.restoreValidation()}),{mergedSizeRef:c,mergedDisabledRef:l,mergedStatusRef:u,nTriggerFormBlur(){s&&s.handleContentBlur()},nTriggerFormChange(){s&&s.handleContentChange()},nTriggerFormFocus(){s&&s.handleContentFocus()},nTriggerFormInput(){s&&s.handleContentInput()}}}var R=i({name:`BaseIconSwitchTransition`,setup(t,{slots:n}){let r=N();return()=>u(e,{name:`icon-switch-transition`,appear:r.value},n)}}),{cubicBezierEaseInOut:z}=m;function B({originalTransform:e=``,left:t=0,top:n=0,transition:r=`all .3s ${z} !important`}={}){return[p(`&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to`,{transform:`${e} scale(0.75)`,left:t,top:n,opacity:0}),p(`&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from`,{transform:`scale(1) ${e}`,left:t,top:n,opacity:1}),p(`&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active`,{transformOrigin:`center`,position:`absolute`,left:t,top:n,transition:r})]}var V=p([p(`@keyframes rotator`,`
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
 `)])])]),H=`1.6s`,U=i({name:`BaseLoading`,props:Object.assign({clsPrefix:{type:String,required:!0},show:{type:Boolean,default:!0}},{strokeWidth:{type:Number,default:28},stroke:{type:String,default:void 0},scale:{type:Number,default:1},radius:{type:Number,default:100}}),setup(e){v(`-base-loading`,V,c(e,`clsPrefix`))},render(){let{clsPrefix:e,radius:t,strokeWidth:n,stroke:r,scale:i}=this,a=t/i;return u(`div`,{class:`${e}-base-loading`,role:`img`,"aria-label":`loading`},u(R,null,{default:()=>this.show?u(`div`,{key:`icon`,class:`${e}-base-loading__transition-wrapper`},u(`div`,{class:`${e}-base-loading__container`},u(`svg`,{class:`${e}-base-loading__icon`,viewBox:`0 0 ${2*a} ${2*a}`,xmlns:`http://www.w3.org/2000/svg`,style:{color:r}},u(`g`,null,u(`animateTransform`,{attributeName:`transform`,type:`rotate`,values:`0 ${a} ${a};270 ${a} ${a}`,begin:`0s`,dur:H,fill:`freeze`,repeatCount:`indefinite`}),u(`circle`,{class:`${e}-base-loading__icon`,fill:`none`,stroke:`currentColor`,"stroke-width":n,"stroke-linecap":`round`,cx:a,cy:a,r:t-n/2,"stroke-dasharray":5.67*t,"stroke-dashoffset":18.48*t},u(`animateTransform`,{attributeName:`transform`,type:`rotate`,values:`0 ${a} ${a};135 ${a} ${a};450 ${a} ${a}`,begin:`0s`,dur:H,fill:`freeze`,repeatCount:`indefinite`}),u(`animate`,{attributeName:`stroke-dashoffset`,values:`${5.67*t};${1.42*t};${5.67*t}`,begin:`0s`,dur:H,fill:`freeze`,repeatCount:`indefinite`})))))):u(`div`,{key:`placeholder`,class:`${e}-base-loading__placeholder`},this.$slots)}))}}),{cubicBezierEaseInOut:W}=m;function G({duration:e=`.2s`,delay:t=`.1s`}={}){return[p(`&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to`,{opacity:1}),p(`&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from`,`
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
`),q=i({name:`BaseWave`,props:{clsPrefix:{type:String,required:!0}},setup(e){v(`-base-wave`,K,c(e,`clsPrefix`));let t=s(null),n=s(!1),i=null;return r(()=>{i!==null&&window.clearTimeout(i)}),{active:n,selfRef:t,play(){i!==null&&(window.clearTimeout(i),n.value=!1,i=null),l(()=>{var e;(e=t.value)==null||e.offsetHeight,n.value=!0,i=window.setTimeout(()=>{n.value=!1,i=null},1e3)})}}},render(){let{clsPrefix:e}=this;return u(`div`,{ref:`selfRef`,"aria-hidden":!0,class:[`${e}-base-wave`,this.active&&`${e}-base-wave--active`]})}}),J=P&&`chrome`in window;P&&navigator.userAgent.includes(`Firefox`);var Y=P&&navigator.userAgent.includes(`Safari`)&&!J;function X(e){return _(e,[255,255,255,.16])}function Z(e){return _(e,[0,0,0,.12])}var Q=O(`n-button-group`),$={paddingTiny:`0 6px`,paddingSmall:`0 10px`,paddingMedium:`0 14px`,paddingLarge:`0 18px`,paddingRoundTiny:`0 10px`,paddingRoundSmall:`0 14px`,paddingRoundMedium:`0 18px`,paddingRoundLarge:`0 22px`,iconMarginTiny:`6px`,iconMarginSmall:`6px`,iconMarginMedium:`6px`,iconMarginLarge:`6px`,iconSizeTiny:`14px`,iconSizeSmall:`18px`,iconSizeMedium:`18px`,iconSizeLarge:`20px`,rippleDuration:`.6s`};function ee(e){let{heightTiny:t,heightSmall:n,heightMedium:r,heightLarge:i,borderRadius:a,fontSizeTiny:o,fontSizeSmall:s,fontSizeMedium:c,fontSizeLarge:l,opacityDisabled:u,textColor2:d,textColor3:f,primaryColorHover:p,primaryColorPressed:m,borderColor:h,primaryColor:g,baseColor:_,infoColor:v,infoColorHover:y,infoColorPressed:b,successColor:x,successColorHover:S,successColorPressed:C,warningColor:w,warningColorHover:T,warningColorPressed:E,errorColor:D,errorColorHover:O,errorColorPressed:k,fontWeight:A,buttonColor2:j,buttonColor2Hover:M,buttonColor2Pressed:N,fontWeightStrong:P}=e;return Object.assign(Object.assign({},$),{heightTiny:t,heightSmall:n,heightMedium:r,heightLarge:i,borderRadiusTiny:a,borderRadiusSmall:a,borderRadiusMedium:a,borderRadiusLarge:a,fontSizeTiny:o,fontSizeSmall:s,fontSizeMedium:c,fontSizeLarge:l,opacityDisabled:u,colorOpacitySecondary:`0.16`,colorOpacitySecondaryHover:`0.22`,colorOpacitySecondaryPressed:`0.28`,colorSecondary:j,colorSecondaryHover:M,colorSecondaryPressed:N,colorTertiary:j,colorTertiaryHover:M,colorTertiaryPressed:N,colorQuaternary:`#0000`,colorQuaternaryHover:M,colorQuaternaryPressed:N,color:`#0000`,colorHover:`#0000`,colorPressed:`#0000`,colorFocus:`#0000`,colorDisabled:`#0000`,textColor:d,textColorTertiary:f,textColorHover:p,textColorPressed:m,textColorFocus:p,textColorDisabled:d,textColorText:d,textColorTextHover:p,textColorTextPressed:m,textColorTextFocus:p,textColorTextDisabled:d,textColorGhost:d,textColorGhostHover:p,textColorGhostPressed:m,textColorGhostFocus:p,textColorGhostDisabled:d,border:`1px solid ${h}`,borderHover:`1px solid ${p}`,borderPressed:`1px solid ${m}`,borderFocus:`1px solid ${p}`,borderDisabled:`1px solid ${h}`,rippleColor:g,colorPrimary:g,colorHoverPrimary:p,colorPressedPrimary:m,colorFocusPrimary:p,colorDisabledPrimary:g,textColorPrimary:_,textColorHoverPrimary:_,textColorPressedPrimary:_,textColorFocusPrimary:_,textColorDisabledPrimary:_,textColorTextPrimary:g,textColorTextHoverPrimary:p,textColorTextPressedPrimary:m,textColorTextFocusPrimary:p,textColorTextDisabledPrimary:d,textColorGhostPrimary:g,textColorGhostHoverPrimary:p,textColorGhostPressedPrimary:m,textColorGhostFocusPrimary:p,textColorGhostDisabledPrimary:g,borderPrimary:`1px solid ${g}`,borderHoverPrimary:`1px solid ${p}`,borderPressedPrimary:`1px solid ${m}`,borderFocusPrimary:`1px solid ${p}`,borderDisabledPrimary:`1px solid ${g}`,rippleColorPrimary:g,colorInfo:v,colorHoverInfo:y,colorPressedInfo:b,colorFocusInfo:y,colorDisabledInfo:v,textColorInfo:_,textColorHoverInfo:_,textColorPressedInfo:_,textColorFocusInfo:_,textColorDisabledInfo:_,textColorTextInfo:v,textColorTextHoverInfo:y,textColorTextPressedInfo:b,textColorTextFocusInfo:y,textColorTextDisabledInfo:d,textColorGhostInfo:v,textColorGhostHoverInfo:y,textColorGhostPressedInfo:b,textColorGhostFocusInfo:y,textColorGhostDisabledInfo:v,borderInfo:`1px solid ${v}`,borderHoverInfo:`1px solid ${y}`,borderPressedInfo:`1px solid ${b}`,borderFocusInfo:`1px solid ${y}`,borderDisabledInfo:`1px solid ${v}`,rippleColorInfo:v,colorSuccess:x,colorHoverSuccess:S,colorPressedSuccess:C,colorFocusSuccess:S,colorDisabledSuccess:x,textColorSuccess:_,textColorHoverSuccess:_,textColorPressedSuccess:_,textColorFocusSuccess:_,textColorDisabledSuccess:_,textColorTextSuccess:x,textColorTextHoverSuccess:S,textColorTextPressedSuccess:C,textColorTextFocusSuccess:S,textColorTextDisabledSuccess:d,textColorGhostSuccess:x,textColorGhostHoverSuccess:S,textColorGhostPressedSuccess:C,textColorGhostFocusSuccess:S,textColorGhostDisabledSuccess:x,borderSuccess:`1px solid ${x}`,borderHoverSuccess:`1px solid ${S}`,borderPressedSuccess:`1px solid ${C}`,borderFocusSuccess:`1px solid ${S}`,borderDisabledSuccess:`1px solid ${x}`,rippleColorSuccess:x,colorWarning:w,colorHoverWarning:T,colorPressedWarning:E,colorFocusWarning:T,colorDisabledWarning:w,textColorWarning:_,textColorHoverWarning:_,textColorPressedWarning:_,textColorFocusWarning:_,textColorDisabledWarning:_,textColorTextWarning:w,textColorTextHoverWarning:T,textColorTextPressedWarning:E,textColorTextFocusWarning:T,textColorTextDisabledWarning:d,textColorGhostWarning:w,textColorGhostHoverWarning:T,textColorGhostPressedWarning:E,textColorGhostFocusWarning:T,textColorGhostDisabledWarning:w,borderWarning:`1px solid ${w}`,borderHoverWarning:`1px solid ${T}`,borderPressedWarning:`1px solid ${E}`,borderFocusWarning:`1px solid ${T}`,borderDisabledWarning:`1px solid ${w}`,rippleColorWarning:w,colorError:D,colorHoverError:O,colorPressedError:k,colorFocusError:O,colorDisabledError:D,textColorError:_,textColorHoverError:_,textColorPressedError:_,textColorFocusError:_,textColorDisabledError:_,textColorTextError:D,textColorTextHoverError:O,textColorTextPressedError:k,textColorTextFocusError:O,textColorTextDisabledError:d,textColorGhostError:D,textColorGhostHoverError:O,textColorGhostPressedError:k,textColorGhostFocusError:O,textColorGhostDisabledError:D,borderError:`1px solid ${D}`,borderHoverError:`1px solid ${O}`,borderPressedError:`1px solid ${k}`,borderFocusError:`1px solid ${O}`,borderDisabledError:`1px solid ${D}`,rippleColorError:D,waveOpacity:`0.6`,fontWeight:A,fontWeightStrong:P})}var te={name:`Button`,common:w,self:ee},ne=p([T(`button`,`
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
 `),h(`dashed`,[D(`border, state-border`,{borderStyle:`dashed !important`})]),h(`disabled`,{cursor:`not-allowed`,opacity:`var(--n-opacity-disabled)`})]),p(`@keyframes button-wave-spread`,{from:{boxShadow:`0 0 0.5px 0 var(--n-ripple-color)`},to:{boxShadow:`0 0 0.5px 4.5px var(--n-ripple-color)`}}),p(`@keyframes button-wave-opacity`,{from:{opacity:`var(--n-wave-opacity)`},to:{opacity:0}})]),re=i({name:`Button`,props:Object.assign(Object.assign({},S.props),{color:String,textColor:String,text:Boolean,block:Boolean,loading:Boolean,disabled:Boolean,circle:Boolean,size:String,ghost:Boolean,round:Boolean,secondary:Boolean,tertiary:Boolean,quaternary:Boolean,strong:Boolean,focusable:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},tag:{type:String,default:`button`},type:{type:String,default:`default`},dashed:Boolean,renderIcon:Function,iconPlacement:{type:String,default:`left`},attrType:{type:String,default:`button`},bordered:{type:Boolean,default:!0},onClick:[Function,Array],nativeFocusBehavior:{type:Boolean,default:!Y},spinProps:Object}),slots:Object,setup(e){let n=s(null),r=s(null),i=s(!1),o=A(()=>!e.quaternary&&!e.tertiary&&!e.secondary&&!e.text&&(!e.color||e.ghost||e.dashed)&&e.bordered),c=t(Q,{}),{inlineThemeDisabled:l,mergedClsPrefixRef:u,mergedRtlRef:d,mergedComponentPropsRef:p}=k(e),{mergedSizeRef:m}=L({},{defaultSize:`medium`,mergedSize:t=>{let{size:n}=e;if(n)return n;let{size:r}=c;if(r)return r;let{mergedSize:i}=t||{};return i?i.value:p?.value?.Button?.size||`medium`}}),h=a(()=>e.focusable&&!e.disabled),g=t=>{var r;h.value||t.preventDefault(),!e.nativeFocusBehavior&&(t.preventDefault(),!e.disabled&&h.value&&((r=n.value)==null||r.focus({preventScroll:!0})))},_=t=>{var n;if(!e.disabled&&!e.loading){let{onClick:i}=e;i&&j(i,t),e.text||(n=r.value)==null||n.play()}},v=t=>{switch(t.key){case`Enter`:if(!e.keyboard)return;i.value=!1}},y=t=>{switch(t.key){case`Enter`:if(!e.keyboard||e.loading){t.preventDefault();return}i.value=!0}},w=()=>{i.value=!1},T=S(`Button`,`-button`,ne,te,e,u),E=x(`Button`,d,u),D=a(()=>{let{common:{cubicBezierEaseInOut:t,cubicBezierEaseOut:n},self:r}=T.value,{rippleDuration:i,opacityDisabled:a,fontWeight:o,fontWeightStrong:s}=r,c=m.value,{dashed:l,type:u,ghost:d,text:p,color:h,round:g,circle:_,textColor:v,secondary:y,tertiary:x,quaternary:S,strong:C}=e,w={"--n-font-weight":C?s:o},E={"--n-color":`initial`,"--n-color-hover":`initial`,"--n-color-pressed":`initial`,"--n-color-focus":`initial`,"--n-color-disabled":`initial`,"--n-ripple-color":`initial`,"--n-text-color":`initial`,"--n-text-color-hover":`initial`,"--n-text-color-pressed":`initial`,"--n-text-color-focus":`initial`,"--n-text-color-disabled":`initial`},D=u===`tertiary`,O=u===`default`,k=D?`default`:u;if(p){let e=v||h;E={"--n-color":`#0000`,"--n-color-hover":`#0000`,"--n-color-pressed":`#0000`,"--n-color-focus":`#0000`,"--n-color-disabled":`#0000`,"--n-ripple-color":`#0000`,"--n-text-color":e||r[f(`textColorText`,k)],"--n-text-color-hover":e?X(e):r[f(`textColorTextHover`,k)],"--n-text-color-pressed":e?Z(e):r[f(`textColorTextPressed`,k)],"--n-text-color-focus":e?X(e):r[f(`textColorTextHover`,k)],"--n-text-color-disabled":e||r[f(`textColorTextDisabled`,k)]}}else if(d||l){let e=v||h;E={"--n-color":`#0000`,"--n-color-hover":`#0000`,"--n-color-pressed":`#0000`,"--n-color-focus":`#0000`,"--n-color-disabled":`#0000`,"--n-ripple-color":h||r[f(`rippleColor`,k)],"--n-text-color":e||r[f(`textColorGhost`,k)],"--n-text-color-hover":e?X(e):r[f(`textColorGhostHover`,k)],"--n-text-color-pressed":e?Z(e):r[f(`textColorGhostPressed`,k)],"--n-text-color-focus":e?X(e):r[f(`textColorGhostHover`,k)],"--n-text-color-disabled":e||r[f(`textColorGhostDisabled`,k)]}}else if(y){let e=O?r.textColor:D?r.textColorTertiary:r[f(`color`,k)],t=h||e,n=u!==`default`&&u!==`tertiary`;E={"--n-color":n?b(t,{alpha:Number(r.colorOpacitySecondary)}):r.colorSecondary,"--n-color-hover":n?b(t,{alpha:Number(r.colorOpacitySecondaryHover)}):r.colorSecondaryHover,"--n-color-pressed":n?b(t,{alpha:Number(r.colorOpacitySecondaryPressed)}):r.colorSecondaryPressed,"--n-color-focus":n?b(t,{alpha:Number(r.colorOpacitySecondaryHover)}):r.colorSecondaryHover,"--n-color-disabled":r.colorSecondary,"--n-ripple-color":`#0000`,"--n-text-color":t,"--n-text-color-hover":t,"--n-text-color-pressed":t,"--n-text-color-focus":t,"--n-text-color-disabled":t}}else if(x||S){let e=O?r.textColor:D?r.textColorTertiary:r[f(`color`,k)],t=h||e;x?(E[`--n-color`]=r.colorTertiary,E[`--n-color-hover`]=r.colorTertiaryHover,E[`--n-color-pressed`]=r.colorTertiaryPressed,E[`--n-color-focus`]=r.colorSecondaryHover,E[`--n-color-disabled`]=r.colorTertiary):(E[`--n-color`]=r.colorQuaternary,E[`--n-color-hover`]=r.colorQuaternaryHover,E[`--n-color-pressed`]=r.colorQuaternaryPressed,E[`--n-color-focus`]=r.colorQuaternaryHover,E[`--n-color-disabled`]=r.colorQuaternary),E[`--n-ripple-color`]=`#0000`,E[`--n-text-color`]=t,E[`--n-text-color-hover`]=t,E[`--n-text-color-pressed`]=t,E[`--n-text-color-focus`]=t,E[`--n-text-color-disabled`]=t}else E={"--n-color":h||r[f(`color`,k)],"--n-color-hover":h?X(h):r[f(`colorHover`,k)],"--n-color-pressed":h?Z(h):r[f(`colorPressed`,k)],"--n-color-focus":h?X(h):r[f(`colorFocus`,k)],"--n-color-disabled":h||r[f(`colorDisabled`,k)],"--n-ripple-color":h||r[f(`rippleColor`,k)],"--n-text-color":v||(h?r.textColorPrimary:D?r.textColorTertiary:r[f(`textColor`,k)]),"--n-text-color-hover":v||(h?r.textColorHoverPrimary:r[f(`textColorHover`,k)]),"--n-text-color-pressed":v||(h?r.textColorPressedPrimary:r[f(`textColorPressed`,k)]),"--n-text-color-focus":v||(h?r.textColorFocusPrimary:r[f(`textColorFocus`,k)]),"--n-text-color-disabled":v||(h?r.textColorDisabledPrimary:r[f(`textColorDisabled`,k)])};let A={"--n-border":`initial`,"--n-border-hover":`initial`,"--n-border-pressed":`initial`,"--n-border-focus":`initial`,"--n-border-disabled":`initial`};A=p?{"--n-border":`none`,"--n-border-hover":`none`,"--n-border-pressed":`none`,"--n-border-focus":`none`,"--n-border-disabled":`none`}:{"--n-border":r[f(`border`,k)],"--n-border-hover":r[f(`borderHover`,k)],"--n-border-pressed":r[f(`borderPressed`,k)],"--n-border-focus":r[f(`borderFocus`,k)],"--n-border-disabled":r[f(`borderDisabled`,k)]};let{[f(`height`,c)]:j,[f(`fontSize`,c)]:M,[f(`padding`,c)]:N,[f(`paddingRound`,c)]:P,[f(`iconSize`,c)]:F,[f(`borderRadius`,c)]:I,[f(`iconMargin`,c)]:L,waveOpacity:R}=r,z={"--n-width":_&&!p?j:`initial`,"--n-height":p?`initial`:j,"--n-font-size":M,"--n-padding":_||p?`initial`:g?P:N,"--n-icon-size":F,"--n-icon-margin":L,"--n-border-radius":p?`initial`:_||g?j:I};return Object.assign(Object.assign(Object.assign(Object.assign({"--n-bezier":t,"--n-bezier-ease-out":n,"--n-ripple-duration":i,"--n-opacity-disabled":a,"--n-wave-opacity":R},w),E),A),z)}),O=l?C(`button`,a(()=>{let t=``,{dashed:n,type:r,ghost:i,text:a,color:o,round:s,circle:c,textColor:l,secondary:u,tertiary:d,quaternary:f,strong:p}=e;n&&(t+=`a`),i&&(t+=`b`),a&&(t+=`c`),s&&(t+=`d`),c&&(t+=`e`),u&&(t+=`f`),d&&(t+=`g`),f&&(t+=`h`),p&&(t+=`i`),o&&(t+=`j${F(o)}`),l&&(t+=`k${F(l)}`);let{value:h}=m;return t+=`l${h[0]}`,t+=`m${r[0]}`,t}),D,e):void 0;return{selfElRef:n,waveElRef:r,mergedClsPrefix:u,mergedFocusable:h,mergedSize:m,showBorder:o,enterPressed:i,rtlEnabled:E,handleMousedown:g,handleKeydown:y,handleBlur:w,handleKeyup:v,handleClick:_,customColorCssVars:a(()=>{let{color:t}=e;if(!t)return null;let n=X(t);return{"--n-border-color":t,"--n-border-color-hover":n,"--n-border-color-pressed":Z(t),"--n-border-color-focus":n,"--n-border-color-disabled":t}}),cssVars:l?void 0:D,themeClass:O?.themeClass,onRender:O?.onRender}},render(){let{mergedClsPrefix:e,tag:t,onRender:n}=this;n?.();let r=g(this.$slots.default,t=>t&&u(`span`,{class:`${e}-button__content`},t));return u(t,{ref:`selfElRef`,class:[this.themeClass,`${e}-button`,`${e}-button--${this.type}-type`,`${e}-button--${this.mergedSize}-type`,this.rtlEnabled&&`${e}-button--rtl`,this.disabled&&`${e}-button--disabled`,this.block&&`${e}-button--block`,this.enterPressed&&`${e}-button--pressed`,!this.text&&this.dashed&&`${e}-button--dashed`,this.color&&`${e}-button--color`,this.secondary&&`${e}-button--secondary`,this.loading&&`${e}-button--loading`,this.ghost&&`${e}-button--ghost`],tabindex:this.mergedFocusable?0:-1,type:this.attrType,style:this.cssVars,disabled:this.disabled,onClick:this.handleClick,onBlur:this.handleBlur,onMousedown:this.handleMousedown,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},this.iconPlacement===`right`&&r,u(M,{width:!0},{default:()=>g(this.$slots.icon,t=>(this.loading||this.renderIcon||t)&&u(`span`,{class:`${e}-button__icon`,style:{margin:y(this.$slots.default)?`0`:``}},u(R,null,{default:()=>this.loading?u(U,Object.assign({clsPrefix:e,key:`loading`,class:`${e}-icon-slot`,strokeWidth:20},this.spinProps)):u(`div`,{key:`icon`,class:`${e}-icon-slot`,role:`none`},this.renderIcon?this.renderIcon():t)})))}),this.iconPlacement===`left`&&r,this.text?null:u(q,{ref:`waveElRef`,clsPrefix:e}),this.showBorder?u(`div`,{"aria-hidden":!0,class:`${e}-button__border`,style:this.customColorCssVars}):null,this.showBorder?u(`div`,{"aria-hidden":!0,class:`${e}-button__state-border`,style:this.customColorCssVars}):null)}});export{re as t};