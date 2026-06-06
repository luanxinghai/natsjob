import{E as e,_t as t,b as n,w as r}from"./runtime-core.esm-bundler-BA8Ga4iZ.js";import{_ as i,b as a,i as o,n as s,v as c,x as l}from"./light-Du4BMXg5.js";import{_ as u,g as d,v as f,x as p,y as m}from"./main-CFsLCQ2C.js";function ee(e){return typeof e==`string`?e.endsWith(`px`)?Number(e.slice(0,e.length-2)):Number(e):e}function h(e){if(e!=null)return typeof e==`number`?`${e}px`:e.endsWith(`px`)?e:`${e}px`}function g(e,t){let n=e.trim().split(/\s+/g),r={top:n[0]};switch(n.length){case 1:r.right=n[0],r.bottom=n[0],r.left=n[0];break;case 2:r.right=n[1],r.left=n[1],r.bottom=n[0];break;case 3:r.right=n[1],r.bottom=n[2],r.left=n[1];break;case 4:r.right=n[1],r.bottom=n[2],r.left=n[3];break;default:throw Error(`[seemly/getMargin]:`+e+` is not a valid value.`)}return t===void 0?r:r[t]}var _=`[object Symbol]`;function v(e){return typeof e==`symbol`||u(e)&&f(e)==_}function y(e,t){for(var n=-1,r=e==null?0:e.length,i=Array(r);++n<r;)i[n]=t(e[n],n,e);return i}var b=1/0,x=m?m.prototype:void 0,S=x?x.toString:void 0;function C(e){if(typeof e==`string`)return e;if(d(e))return y(e,C)+``;if(v(e))return S?S.call(e):``;var t=e+``;return t==`0`&&1/e==-b?`-0`:t}function w(e){return e==null?``:C(e)}function T(e,t,n){var r=-1,i=e.length;t<0&&(t=-t>i?0:i+t),n=n>i?i:n,n<0&&(n+=i),i=t>n?0:n-t>>>0,t>>>=0;for(var a=Array(i);++r<i;)a[r]=e[r+t];return a}function E(e,t,n){var r=e.length;return n=n===void 0?r:n,!t&&n>=r?e:T(e,t,n)}var D=RegExp(`[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]`);function O(e){return D.test(e)}function k(e){return e.split(``)}var A=`\\ud800-\\udfff`,j=`\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff`,M=`\\ufe0e\\ufe0f`,N=`[`+A+`]`,P=`[`+j+`]`,F=`\\ud83c[\\udffb-\\udfff]`,I=`(?:`+P+`|`+F+`)`,L=`[^`+A+`]`,R=`(?:\\ud83c[\\udde6-\\uddff]){2}`,z=`[\\ud800-\\udbff][\\udc00-\\udfff]`,B=`\\u200d`,V=I+`?`,H=`[`+M+`]?`,U=`(?:`+B+`(?:`+[L,R,z].join(`|`)+`)`+H+V+`)*`,W=H+V+U,G=`(?:`+[L+P+`?`,P,R,z,N].join(`|`)+`)`,K=RegExp(F+`(?=`+F+`)|`+G+W,`g`);function q(e){return e.match(K)||[]}function J(e){return O(e)?q(e):k(e)}function Y(e){return function(t){t=w(t);var n=O(t)?J(t):void 0,r=n?n[0]:t.charAt(0),i=n?E(n,1).join(``):t.slice(1);return r[e]()+i}}var X=Y(`toUpperCase`);function Z(t,i){let a=n({render(){return i()}});return n({name:X(t),setup(){let n=e(p,null)?.mergedIconsRef;return()=>{let e=n?.value?.[t];return e?e():r(a,null)}}})}var Q=Z(`close`,()=>r(`svg`,{viewBox:`0 0 12 12`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`,"aria-hidden":!0},r(`g`,{stroke:`none`,"stroke-width":`1`,fill:`none`,"fill-rule":`evenodd`},r(`g`,{fill:`currentColor`,"fill-rule":`nonzero`},r(`path`,{d:`M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z`}))))),$=c(`base-close`,`
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
 `)])]),te=n({name:`BaseClose`,props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(e){return o(`-base-close`,$,t(e,`clsPrefix`)),()=>{let{clsPrefix:t,disabled:n,absolute:i,round:a,isButtonTag:o}=e;return r(o?`button`:`div`,{type:o?`button`:void 0,tabindex:n||!e.focusable?-1:0,"aria-disabled":n,"aria-label":`close`,role:o?void 0:`button`,disabled:n,class:[`${t}-base-close`,i&&`${t}-base-close--absolute`,n&&`${t}-base-close--disabled`,a&&`${t}-base-close--round`],onMousedown:t=>{e.focusable||t.preventDefault()},onClick:e.onClick},r(s,{clsPrefix:t},{default:()=>r(Q,null)}))}}});export{h as a,g as i,Z as n,ee as r,te as t};