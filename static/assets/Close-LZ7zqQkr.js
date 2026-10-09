import{E as e,R as t,_t as n,b as r,f as i,nt as a,p as o}from"./runtime-core.esm-bundler-Kvy3DgBB.js";import{R as s}from"./css-B-ZHoKKA.js";import{t as c}from"./_baseSlice-DSr_lfFX.js";import{C as l,D as u,E as d,c as f,h as p,m,w as h,y as g}from"./use-rtl-CebpmNC6.js";import{m as _}from"./main-D68Mcjdm.js";function v(e,t,n){var r=e.length;return n=n===void 0?r:n,!t&&n>=r?e:c(e,t,n)}var y=RegExp(`[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]`);function b(e){return y.test(e)}function x(e){return e.split(``)}var S=`\\ud800-\\udfff`,C=`\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff`,w=`\\ufe0e\\ufe0f`,T=`[`+S+`]`,E=`[`+C+`]`,D=`\\ud83c[\\udffb-\\udfff]`,O=`(?:`+E+`|`+D+`)`,k=`[^`+S+`]`,A=`(?:\\ud83c[\\udde6-\\uddff]){2}`,j=`[\\ud800-\\udbff][\\udc00-\\udfff]`,M=`\\u200d`,N=O+`?`,P=`[`+w+`]?`,F=`(?:`+M+`(?:`+[k,A,j].join(`|`)+`)`+P+N+`)*`,I=P+N+F,L=`(?:`+[k+E+`?`,E,A,j,T].join(`|`)+`)`,R=RegExp(D+`(?=`+D+`)|`+L+I,`g`);function z(e){return e.match(R)||[]}function B(e){return b(e)?z(e):x(e)}function V(e){return function(t){t=s(t);var n=b(t)?B(t):void 0,r=n?n[0]:t.charAt(0),i=n?v(n,1).join(``):t.slice(1);return r[e]()+i}}var H=V(`toUpperCase`);function U(e){return typeof e==`string`?e.endsWith(`px`)?Number(e.slice(0,e.length-2)):Number(e):e}function W(e){if(e!=null)return typeof e==`number`?`${e}px`:e.endsWith(`px`)?e:`${e}px`}function G(e,t){let n=e.trim().split(/\s+/g),r={top:n[0]};switch(n.length){case 1:r.right=n[0],r.bottom=n[0],r.left=n[0];break;case 2:r.right=n[1],r.left=n[1],r.bottom=n[0];break;case 3:r.right=n[1],r.bottom=n[2],r.left=n[1];break;case 4:r.right=n[1],r.bottom=n[2],r.left=n[3];break;default:throw Error(`[seemly/getMargin]:`+e+` is not a valid value.`)}return t===void 0?r:r[t]}function K(n,i){let a=r({render(){return i()}});return r({name:H(n),setup(){let r=e(_,null)?.mergedIconsRef;return()=>{let e=r?.value?.[n];return e?e():(t(),o(a,{key:1}))}}})}var q=K(`close`,()=>(()=>{let e=m(`6b30a2290cd08d4`);return e[0]||=i(`svg`,{viewBox:`0 0 12 12`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`,"aria-hidden":!0},[i(`g`,{stroke:`none`,"stroke-width":`1`,fill:`none`,"fill-rule":`evenodd`},[i(`g`,{fill:`currentColor`,"fill-rule":`nonzero`},[i(`path`,{d:`M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z`})])])],-1)})()),J=h(`base-close`,`
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
`,[d(`absolute`,`
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),l(`&::before`,`
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `),u(`disabled`,[l(`&:hover`,`
 color: var(--n-close-icon-color-hover);
 `),l(`&:hover::before`,`
 background-color: var(--n-close-color-hover);
 `),l(`&:focus::before`,`
 background-color: var(--n-close-color-hover);
 `),l(`&:active`,`
 color: var(--n-close-icon-color-pressed);
 `),l(`&:active::before`,`
 background-color: var(--n-close-color-pressed);
 `)]),d(`disabled`,`
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),d(`round`,[l(`&::before`,`
 border-radius: 50%;
 `)])]),Y=r({name:`BaseClose`,props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(e){return g(`-base-close`,J,n(e,`clsPrefix`)),()=>{let{clsPrefix:n,disabled:r,absolute:i,round:s,isButtonTag:c}=e,l=c?`button`:`div`;return(()=>{let u=m(`b5bdc9fe09f5ae00`);return t(),o(l,{type:c?`button`:void 0,tabindex:r||!e.focusable?-1:0,"aria-disabled":r,"aria-label":`close`,role:c?void 0:`button`,disabled:r,class:p([`${n}-base-close`,i&&`${n}-base-close--absolute`,r&&`${n}-base-close--disabled`,s&&`${n}-base-close--round`]),onMousedown:u[0]||=t=>{e.focusable||t.preventDefault()},onClick:e.onClick},{default:a(()=>[(t(),o(f,{clsPrefix:n},{default:()=>(t(),o(q))},1032,[`clsPrefix`]))]),_:2},1032,[`type`,`tabindex`,`aria-disabled`,`role`,`disabled`,`class`,`onClick`])})()}}});export{W as a,G as i,K as n,U as r,Y as t};