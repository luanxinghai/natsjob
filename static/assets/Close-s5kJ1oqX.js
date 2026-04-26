import{E as e,b as t,gt as n,w as r}from"./runtime-core.esm-bundler-CpfTRV6w.js";import{_ as i,b as a,i as o,n as s,v as c,x as l}from"./light-CV1MdEo3.js";import{$ as u,X as d,Z as f}from"./main-Bxm-yXxB.js";function p(e){return typeof e==`string`?e.endsWith(`px`)?Number(e.slice(0,e.length-2)):Number(e):e}function m(e){if(e!=null)return typeof e==`number`?`${e}px`:e.endsWith(`px`)?e:`${e}px`}function h(e,t){let n=e.trim().split(/\s+/g),r={top:n[0]};switch(n.length){case 1:r.right=n[0],r.bottom=n[0],r.left=n[0];break;case 2:r.right=n[1],r.left=n[1],r.bottom=n[0];break;case 3:r.right=n[1],r.bottom=n[2],r.left=n[1];break;case 4:r.right=n[1],r.bottom=n[2],r.left=n[3];break;default:throw Error(`[seemly/getMargin]:`+e+` is not a valid value.`)}return t===void 0?r:r[t]}function g(e,t,n){var r=e.length;return n=n===void 0?r:n,!t&&n>=r?e:d(e,t,n)}var _=RegExp(`[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]`);function v(e){return _.test(e)}function y(e){return e.split(``)}var b=`\\ud800-\\udfff`,x=`\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff`,S=`\\ufe0e\\ufe0f`,C=`[`+b+`]`,w=`[`+x+`]`,T=`\\ud83c[\\udffb-\\udfff]`,E=`(?:`+w+`|`+T+`)`,D=`[^`+b+`]`,O=`(?:\\ud83c[\\udde6-\\uddff]){2}`,k=`[\\ud800-\\udbff][\\udc00-\\udfff]`,A=`\\u200d`,j=E+`?`,M=`[`+S+`]?`,N=`(?:`+A+`(?:`+[D,O,k].join(`|`)+`)`+M+j+`)*`,P=M+j+N,F=`(?:`+[D+w+`?`,w,O,k,C].join(`|`)+`)`,I=RegExp(T+`(?=`+T+`)|`+F+P,`g`);function L(e){return e.match(I)||[]}function R(e){return v(e)?L(e):y(e)}function z(e){return function(t){t=f(t);var n=v(t)?R(t):void 0,r=n?n[0]:t.charAt(0),i=n?g(n,1).join(``):t.slice(1);return r[e]()+i}}var B=z(`toUpperCase`);function V(n,i){let a=t({render(){return i()}});return t({name:B(n),setup(){let t=e(u,null)?.mergedIconsRef;return()=>{let e=t?.value?.[n];return e?e():r(a,null)}}})}var H=V(`close`,()=>r(`svg`,{viewBox:`0 0 12 12`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`,"aria-hidden":!0},r(`g`,{stroke:`none`,"stroke-width":`1`,fill:`none`,"fill-rule":`evenodd`},r(`g`,{fill:`currentColor`,"fill-rule":`nonzero`},r(`path`,{d:`M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z`}))))),U=c(`base-close`,`
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
`,[a(`absolute`,`
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),i(`&::before`,`
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `),l(`disabled`,[i(`&:hover`,`
 color: var(--n-close-icon-color-hover);
 `),i(`&:hover::before`,`
 background-color: var(--n-close-color-hover);
 `),i(`&:focus::before`,`
 background-color: var(--n-close-color-hover);
 `),i(`&:active`,`
 color: var(--n-close-icon-color-pressed);
 `),i(`&:active::before`,`
 background-color: var(--n-close-color-pressed);
 `)]),a(`disabled`,`
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),a(`round`,[i(`&::before`,`
 border-radius: 50%;
 `)])]),W=t({name:`BaseClose`,props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(e){return o(`-base-close`,U,n(e,`clsPrefix`)),()=>{let{clsPrefix:t,disabled:n,absolute:i,round:a,isButtonTag:o}=e;return r(o?`button`:`div`,{type:o?`button`:void 0,tabindex:n||!e.focusable?-1:0,"aria-disabled":n,"aria-label":`close`,role:o?void 0:`button`,disabled:n,class:[`${t}-base-close`,i&&`${t}-base-close--absolute`,n&&`${t}-base-close--disabled`,a&&`${t}-base-close--round`],onMousedown:t=>{e.focusable||t.preventDefault()},onClick:e.onClick},r(s,{clsPrefix:t},{default:()=>r(H,null)}))}}});export{m as a,h as i,V as n,p as r,W as t};