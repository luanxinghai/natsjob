import{E as e,bt as t,x as n}from"./runtime-core.esm-bundler-Kvy3DgBB.js";import{S as r,a as i,c as a,s as o}from"./css-B-ZHoKKA.js";var s={prefix:Math.floor(Math.random()*1e4),current:0},c=Symbol(`elIdInjection`),l=()=>n()?e(c,s):s,u=e=>{let n=l();!a&&n===s&&r(`IdInjection`,`Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`);let c=i();return o(()=>t(e)||`${c.value}-id-${n.prefix}-${n.current++}`)};export{l as n,u as t};