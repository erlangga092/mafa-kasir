import{a as E,R as e,H as u,L as f,d as l}from"./app.ba9af926.js";import{s}from"./sweetalert2.all.305e775e.js";import{A as h}from"./index.54b52c3c.js";import{P as b}from"./index.e163b21b.js";import{F as N}from"./index.2bdfb9ae.js";import{L as g}from"./index.cfa3e07b.js";const x=({categories:a})=>{var n;const{data:c,setData:m}=E({search:new URL(document.location).searchParams.get("q")}),o=t=>{t.preventDefault(),l.Inertia.get("/apps/categories",{q:c.search})},i=t=>{t.preventDefault(),l.Inertia.get("/apps/categories",{q:""})},d=(t,r)=>{t.preventDefault(),s.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(p=>{p.isConfirmed&&(l.Inertia.delete(`/apps/categories/${r}`),s.fire({title:"Deleted",text:"Category deleted successfully",icon:"success",timer:1e3,showConfirmButton:!1}))})};return e.createElement(e.Fragment,null,e.createElement(u,null,e.createElement("title",null,"Categories - Aplikasi Kasir")),e.createElement(g,null,e.createElement("main",{className:"c-main"},e.createElement("div",{className:"container-fluid"},e.createElement("div",{className:"row"},e.createElement("div",{className:"col-md-12"},e.createElement("div",{className:"card border-0 rounded-3 shadow border-top-purple"},e.createElement(h,{title:"CATEGORIES",icon:"fa fa-folder"}),e.createElement("div",{className:"card-body"},e.createElement(N,{placeholder:"search by category name...",onChange:t=>m("search",t.target.value),onSearch:o,onReset:i,addLink:"/apps/categories/create"}),e.createElement("div",{className:"table-responsive"},e.createElement("table",{className:"table table-bordered table-hover"},e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",{scope:"col"},"Name"),e.createElement("th",{scope:"col"},"Image"),e.createElement("th",{scope:"col",style:{width:"20%"}},"Actions"))),e.createElement("tbody",null,(n=a==null?void 0:a.data)==null?void 0:n.map(t=>e.createElement("tr",{key:t.id},e.createElement("td",null,t.name),e.createElement("td",{className:"text-center"},e.createElement("img",{src:t.image,style:{height:"40px"},alt:""})),e.createElement("td",{className:"text-center"},e.createElement(f,{href:`/apps/categories/${t.id}/edit`,className:"btn btn-success btn-sm me-2"},e.createElement("i",{className:"fa fa-pencil-alt me-1"})," EDIT"),e.createElement("button",{className:"btn btn-danger btn-sm",onClick:r=>d(r,t.id)},e.createElement("i",{className:"fa fa-trash"})," DELETE"))))))),e.createElement(b,{links:a.links})))))))))};export{x as default};
