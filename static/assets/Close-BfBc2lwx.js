import{H as e,V as t}from"./es-CAKLDtcF.js";import{E as n,b as r,gt as i,w as a}from"./runtime-core.esm-bundler-fv2244ep.js";import{_ as o,b as s,i as c,n as l,v as u,x as d}from"./light-CPrQc-Dl.js";import{n as f}from"./use-config-DoSIpgUv.js";function p(e){return typeof e==`string`?e.endsWith(`px`)?Number(e.slice(0,e.length-2)):Number(e):e}function m(e){if(e!=null)return typeof e==`number`?`${e}px`:e.endsWith(`px`)?e:`${e}px`}function h(e,t){let n=e.trim().split(/\s+/g),r={top:n[0]};switch(n.length){case 1:r.right=n[0],r.bottom=n[0],r.left=n[0];break;case 2:r.right=n[1],r.left=n[1],r.bottom=n[0];break;case 3:r.right=n[1],r.bottom=n[2],r.left=n[1];break;case 4:r.right=n[1],r.bottom=n[2],r.left=n[3];break;default:throw Error(`[seemly/getMargin]:`+e+` is not a valid value.`)}return t===void 0?r:r[t]}function g(e,n,r){var i=e.length;return r=r===void 0?i:r,!n&&r>=i?e:t(e,n,r)}var _=RegExp(`[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]`);function v(e){return _.test(e)}function y(e){return e.split(``)}var b=`\\ud800-\\udfff`,x=`\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff`,S=`\\ufe0e\\ufe0f`,C=`[`+b+`]`,w=`[`+x+`]`,T=`\\ud83c[\\udffb-\\udfff]`,E=`(?:`+w+`|`+T+`)`,D=`[^`+b+`]`,O=`(?:\\ud83c[\\udde6-\\uddff]){2}`,k=`[\\ud800-\\udbff][\\udc00-\\udfff]`,A=`\\u200d`,j=E+`?`,M=`[`+S+`]?`,N=`(?:`+A+`(?:`+[D,O,k].join(`|`)+`)`+M+j+`)*`,P=M+j+N,F=`(?:`+[D+w+`?`,w,O,k,C].join(`|`)+`)`,I=RegExp(T+`(?=`+T+`)|`+F+P,`g`);function L(e){return e.match(I)||[]}function R(e){return v(e)?L(e):y(e)}function z(t){return function(n){n=e(n);var r=v(n)?R(n):void 0,i=r?r[0]:n.charAt(0),a=r?g(r,1).join(``):n.slice(1);return i[t]()+a}}var B=z(`toUpperCase`);function V(e,t){let i=r({render(){return t()}});return r({name:B(e),setup(){let t=n(f,null)?.mergedIconsRef;return()=>{let n=t?.value?.[e];return n?n():a(i,null)}}})}var H=V(`close`,()=>a(`svg`,{viewBox:`0 0 12 12`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`,"aria-hidden":!0},a(`g`,{stroke:`none`,"stroke-width":`1`,fill:`none`,"fill-rule":`evenodd`},a(`g`,{fill:`currentColor`,"fill-rule":`nonzero`},a(`path`,{d:`M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z`}))))),U=u(`base-close`,`
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
`,[s(`absolute`,`
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),o(`&::before`,`
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `),d(`disabled`,[o(`&:hover`,`
 color: var(--n-close-icon-color-hover);
 `),o(`&:hover::before`,`
 background-color: var(--n-close-color-hover);
 `),o(`&:focus::before`,`
 background-color: var(--n-close-color-hover);
 `),o(`&:active`,`
 color: var(--n-close-icon-color-pressed);
 `),o(`&:active::before`,`
 background-color: var(--n-close-color-pressed);
 `)]),s(`disabled`,`
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),s(`round`,[o(`&::before`,`
 border-radius: 50%;
 `)])]),W=r({name:`BaseClose`,props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(e){return c(`-base-close`,U,i(e,`clsPrefix`)),()=>{let{clsPrefix:t,disabled:n,absolute:r,round:i,isButtonTag:o}=e;return a(o?`button`:`div`,{type:o?`button`:void 0,tabindex:n||!e.focusable?-1:0,"aria-disabled":n,"aria-label":`close`,role:o?void 0:`button`,disabled:n,class:[`${t}-base-close`,r&&`${t}-base-close--absolute`,n&&`${t}-base-close--disabled`,i&&`${t}-base-close--round`],onMousedown:t=>{e.focusable||t.preventDefault()},onClick:e.onClick},a(l,{clsPrefix:t},{default:()=>a(H,null)}))}}});export{m as a,h as i,V as n,p as r,W as t};