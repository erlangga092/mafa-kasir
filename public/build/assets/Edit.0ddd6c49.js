import{r as c,R as e,H as o,d as i}from"./app.b568e1c6.js";import{s as p}from"./sweetalert2.all.3d975aea.js";import{I as s}from"./index.4035e56e.js";import{A as u}from"./index.9a14dc14.js";import{L as r}from"./index.0d4e44b3.js";const h=({customer:n,errors:a})=>{const[t,m]=c.exports.useState(()=>({name:n.name,no_telp:n.no_telp,address:n.address})),d=l=>{l.preventDefault(),i.Inertia.post(`/apps/customers/${n.id}`,{_method:"PUT",name:t.name,no_telp:t.no_telp,address:t.address},{onSuccess:()=>{p.fire({title:"Success!",text:"Customer saved successfully.",icon:"success",showConfirmButton:!1,timer:1e3})}})};return e.createElement(e.Fragment,null,e.createElement(o,null,e.createElement("title",null,"Edit Customer - Aplikasi Kasir")),e.createElement(r,null,e.createElement("main",{className:"c-main"},e.createElement("div",{className:"container-fluid"},e.createElement("div",{className:"row"},e.createElement("div",{className:"col-md-12"},e.createElement("div",{className:"card border border-top-purple rounded-3 shadow"},e.createElement(u,{title:"EDIT CUSTOMER",icon:"fa fa-user-circle"}),e.createElement("div",{className:"card-body"},e.createElement("form",{onSubmit:d},e.createElement(s,{name:"name",type:"text",placeholder:"Full Name",label:"Full Name",value:t.name,onChange:l=>m({...t,name:l.target.value}),isError:a==null?void 0:a.name}),e.createElement(s,{name:"no_telp",type:"number",placeholder:"No. Telp",label:"No. Telp",value:t.no_telp,onChange:l=>m({...t,no_telp:l.target.value}),isError:a==null?void 0:a.no_telp}),e.createElement("div",{className:"mb-3"},e.createElement("label",{htmlFor:"",className:"fw-bold"},"Address"),e.createElement("textarea",{name:"address",rows:"4",className:`form-control ${a!=null&&a.address?"is-invalid":""}`,placeholder:"Address",value:t.address,onChange:l=>m({...t,address:l.target.value})})),(a==null?void 0:a.address)&&e.createElement("div",{className:"alert alert-danger"},a==null?void 0:a.address),e.createElement("div",{className:"row"},e.createElement("div",{className:"col-12"},e.createElement("button",{className:"btn btn-primary shadow-sm rounded-sm"},"UPDATE"),e.createElement("button",{className:"btn btn-warning shadow-sm rounded-sm ms-3"},"RESET"))))))))))))};export{h as default};
