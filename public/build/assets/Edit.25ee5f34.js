import{r as i,R as e,H as f,d as h}from"./app.5f22bf8b.js";import{s as w}from"./sweetalert2.all.ae0f7e81.js";import{I as d}from"./index.c5848c38.js";import{A as v}from"./index.b33e2a81.js";import{L as N}from"./index.4dcbc82d.js";const C=({user:s,roles:o,errors:t})=>{const[l,n]=i.exports.useState(()=>({name:s.name,email:s.email,password:s.password,password_confirmation:s.password_confirmation,roles:s.roles.map(a=>a.name)}));i.exports.useEffect(()=>{for(const a of window.document.querySelectorAll(".role-input"))l.roles.forEach(c=>{a.value===c&&(a.checked=!0)})},[]);const r=a=>{n(()=>({...l,roles:[...l.roles].indexOf(a.target.value)<0?[...l.roles,a.target.value]:[...l.roles.filter(c=>c!=a.target.value)]}))},p=a=>{if(a.target.checked){const c=o.map(m=>m.name);n(()=>{const m=window.document.querySelectorAll(".role-input");for(const E of m)E.checked=!0;return{...l,roles:c}})}else n(()=>{const c=window.document.querySelectorAll(".role-input");for(const m of c)m.checked=!1;return{...l,roles:[]}})},u=a=>{a.preventDefault(),h.Inertia.post(`/apps/users/${s.id}`,{_method:"PUT",name:l.name,email:l.email,password:l.password,password_confirmation:l.password_confirmation,roles:l.roles},{onSuccess:()=>{w.fire({title:"Success!",text:"User updated successfully.",icon:"success",showConfirmButton:!1,timer:1e3})}})};return e.createElement(e.Fragment,null,e.createElement(f,null,e.createElement("title",null,"Edit User - Aplikasi Kasir")),e.createElement(N,null,e.createElement("main",{className:"c-main"},e.createElement("div",{className:"container-fluid"},e.createElement("div",{className:"row"},e.createElement("div",{className:"col-md-12"},e.createElement("div",{className:"card border border-top-purple rounded-3 shadow"},e.createElement(v,{title:"EDIT USER",icon:"fa fa-users"}),e.createElement("div",{className:"card-body"},e.createElement("form",{onSubmit:u},e.createElement("div",{className:"row"},e.createElement("div",{className:"col-md-6"},e.createElement(d,{name:"name",type:"text",placeholder:"Full Name",label:"Full Name",value:l.name,onChange:a=>n({...l,name:a.target.value}),isError:t==null?void 0:t.name})),e.createElement("div",{className:"col-md-6"},e.createElement(d,{name:"email",type:"email",disabled:!0,placeholder:"Email Address",label:"Email Address",value:l.email,onChange:a=>n({...l,email:a.target.value}),isError:t==null?void 0:t.email}))),e.createElement("div",{className:"row"},e.createElement("div",{className:"col-md-6"},e.createElement(d,{name:"password",type:"password",placeholder:"Password",label:"Password",onChange:a=>n({...l,password:a.target.value}),isError:t==null?void 0:t.password})),e.createElement("div",{className:"col-md-6"},e.createElement(d,{name:"password_confirmation",type:"password",placeholder:"Password Confirmation",label:"Password Confirmation",onChange:a=>n({...l,password_confirmation:a.target.value}),isError:t==null?void 0:t.password_confirmation}))),e.createElement("div",{className:"row"},e.createElement("div",{className:"col-md-12"},e.createElement("div",{className:"mb-3"},e.createElement("label",{htmlFor:"",className:"fw-bold"},"Roles"),e.createElement("br",null),e.createElement("div",{className:"form-check form-check-inline"},e.createElement("input",{className:"form-check-input",type:"checkbox",id:"check-all",onChange:a=>p(a)}),e.createElement("label",{htmlFor:"check-all",className:"form-check-label"},"all")),o==null?void 0:o.map((a,c)=>e.createElement("div",{className:"form-check form-check-inline",key:a.id},e.createElement("input",{className:"form-check-input role-input",type:"checkbox",value:a.name,id:`check-${a.id}`,onChange:m=>r(m)}),e.createElement("label",{htmlFor:`check-${a.id}`,className:"form-check-label"},a.name))),(t==null?void 0:t.roles)&&e.createElement("div",{className:"alert alert-danger"},t==null?void 0:t.roles)))),e.createElement("div",{className:"row"},e.createElement("div",{className:"col-12"},e.createElement("button",{className:"btn btn-primary shadow-sm rounded-sm"},"UPDATE"),e.createElement("button",{className:"btn btn-warning shadow-sm rounded-sm ms-3"},"RESET"))))))))))))};export{C as default};