(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{114:function(e,t){},123:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(10),u=a.n(c),o=a(75),l=a(8),m=a(129),s=a(132),i=a(68),E=a(136),d=a(135),f=a(6),v=Object.freeze({ADMIN:"admin",BASIC:"basic"}),U=function(){},O=U,b=function(){var e;(e=console).error.apply(e,arguments)},N=a(66),p=a.n(N)()(),j=function(e,t){p.emit(C.DEQUEUE,e,t)},C=Object.freeze({JOIN:"join",CREATE_ROOM:"create_room",DISCONNECT:"disconnect",LEAVE:"leave",NEW_USER_JOIN:"new_user_join",ROOM_CHECK:"room_check",ENQUEUE:"enqueue",DEQUEUE:"dequeue"}),y=p,I=function(e){var t=e.setCurrentUserType,a=e.setRoomCallback,c=Object(n.useState)(""),u=Object(l.a)(c,2),o=u[0],U=u[1],O=Object(f.f)();return r.a.createElement(m.a,{className:"mt-4"},r.a.createElement("h1",{className:"text-center mb-5"},"queue-tip"),r.a.createElement(s.a,null,r.a.createElement(s.a.Row,{className:"justify-content-center mb-3"},r.a.createElement(i.a,{xs:"auto"},r.a.createElement(s.a.Control,{value:o,onChange:function(e){return U(e.target.value)},placeholder:"Room Name"}))),r.a.createElement(s.a.Row,{className:"justify-content-center"},r.a.createElement(i.a,{xs:"auto"},r.a.createElement(E.a,{onClick:function(e){var n,r,c=Object(d.a)();c&&o&&""!==o.trim()?(t(v.ADMIN),n={roomName:o,roomId:c},r=a,p.emit(C.CREATE_ROOM,n,r),O.push("/room/".concat(c))):(e.preventDefault(),b("error creating room"))},variant:"primary",type:"submit"},"Create Room")))))},h=a(130),x=a(74),g=function(e){var t=e.user,a=e.room,c=e.setUser,o=e.addNewUser,d=e.addNewQueueUser,f=Object(n.useState)(""),v=Object(l.a)(f,2),U=v[0],N=v[1],j=Object(n.useState)(""),y=Object(l.a)(j,2),I=y[0],h=y[1],g=r.a.createRef();Object(n.useEffect)((function(){u.a.findDOMNode(g.current).focus()}),[g]);return r.a.createElement(m.a,{className:"mt-4"},r.a.createElement("h1",{className:"text-center mb-5"},"Sign In"),r.a.createElement(s.a,null,r.a.createElement(s.a.Row,{className:"justify-content-center mb-3"},r.a.createElement(i.a,{xs:"auto"},r.a.createElement(s.a.Label,null,"Your Name"),r.a.createElement(s.a.Control,{ref:g,value:U,onChange:function(e){return N(e.target.value)},placeholder:"Gregor Kiczales"})),r.a.createElement(s.a.Text,{className:"text-muted"},I)),r.a.createElement(s.a.Row,{className:"justify-content-center"},r.a.createElement(i.a,{xs:"auto"},r.a.createElement(E.a,{onClick:function(e){var n,r;e.preventDefault(),n={name:U,type:t.type,roomId:a.id},r=function(e){var t=e.user,a=e.usersInRoom,n=e.usersInQueue,r=e.error;O("acknowledged from JOIN event",t),r?(b(r),h("Name is already taken, please try something else.")):(c(t),o([].concat(Object(x.a)(a),[t])),d(n))},p.emit(C.JOIN,n,r)},variant:"primary",type:"submit"},"Enter Room")))))},k=a(134),Q=function(e){var t=e.user,a=e.isCurrentUser,n=t.type===v.ADMIN,c=n?"text-danger":a?"text-primary":"";return r.a.createElement("span",{className:c},t.name," ",n?"(admin)":"")},w=function(e){var t=e.room,a=e.user,n=e.queueUsers,c=e.removeQueueUser,u=e.setInQueue;return r.a.createElement("div",null,r.a.createElement("h4",null,"Queue"),r.a.createElement(k.a,null,n.map((function(e,n){var o=a.name===e.name,l=a.type===v.ADMIN,s={action:!!l,onClick:l?function(n){return r=e.id,void j({userId:r,roomId:t.id},(function(e){O("acknowledged from DEQUEUE event",e.dequeuedUser),c(e.dequeuedUser.id),e.dequeuedUser.id===a.id&&u(!1)}));var r}:null};return r.a.createElement(m.a,{key:e.id},r.a.createElement(h.a,{className:"align-items-center"},r.a.createElement(i.a,{xs:"auto"},r.a.createElement("b",null,n+1)),r.a.createElement(i.a,null,r.a.createElement(k.a.Item,s,r.a.createElement(Q,{user:e,isCurrentUser:o})))))}))))},R=a(133),S=a(131),D=function(e){var t=e.children,a=e.placement,n=e.text;return r.a.createElement(R.a,{placement:a,overlay:r.a.createElement(S.a,null,n)},t)},q=function(e){var t=e.user,a=e.users;return r.a.createElement("div",null,r.a.createElement("h4",null,"Users: ",a.length),r.a.createElement(k.a,null,a.map((function(e){var a=t.name===e.name,n={action:!!a},c=r.a.createElement(k.a.Item,Object.assign({key:e.id},n),r.a.createElement(Q,{user:e,isCurrentUser:a}));return a?r.a.createElement(D,{key:e.id,placement:"left",text:"You!"},c):c}))))},_=function(e){var t=e.room,a=e.user,c=e.setUser,u=Object(n.useState)([]),o=Object(l.a)(u,2),s=o[0],d=o[1],f=Object(n.useState)([]),v=Object(l.a)(f,2),U=v[0],b=v[1],N=Object(n.useState)(!1),I=Object(l.a)(N,2),x=I[0],k=I[1];Object(n.useEffect)((function(){return y.on(C.NEW_USER_JOIN,(function(e){var t=e.newUser;O("received JOIN event",t),Q(t)})),y.on(C.LEAVE,(function(e){var t=e.leftUser;O("received LEAVE event",t),R(t.id),D(t.id)})),y.on(C.ENQUEUE,(function(e){var t=e.enqueuedUser;O("received ENQUEUE event",t),S(t)})),y.on(C.DEQUEUE,(function(e){var t=e.dequeuedUser;O("received DEQUEUE event",t),D(t.id),t.id===a.id&&k(!1)})),function(){y.emit(C.DISCONNECT,"testtesttest"),y.off()}}),[s,U]);var Q=function(e){d(s.concat(e))},R=function(e){d(s.filter((function(t){return t.id!==e})))},S=function(e){b(U.concat(e))},D=function(e){b(U.filter((function(t){return t.id!==e})))},_=a&&a.name&&a.id;return r.a.createElement(m.a,{className:"mt-4"},t&&_?r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,null,r.a.createElement(i.a,null,r.a.createElement("h1",null,t.name)),r.a.createElement(i.a,{xs:"auto"},r.a.createElement(E.a,{onClick:function(e){var t=document.createElement("textarea");document.body.appendChild(t),t.value=window.location.href,t.select(),document.execCommand("copy"),document.body.removeChild(t)},size:"lg",variant:"secondary"},"Copy Link")),r.a.createElement(i.a,{xs:"3"},r.a.createElement(E.a,{onClick:function(e){x?j({userId:a.id,roomId:t.id},(function(e){O("acknowledged from DEQUEUE event",e.dequeuedUser),D(e.dequeuedUser.id),k(!1)})):function(e,t){p.emit(C.ENQUEUE,e,t)}({user:a,roomId:t.id},(function(e){O("acknowledged from ENQUEUE event",e.enqueuedUser),S(e.enqueuedUser),k(!0)}))},size:"lg",block:!0},x?"Leave Queue":"Join Queue"))),r.a.createElement("hr",null),r.a.createElement(h.a,null,r.a.createElement(i.a,null,r.a.createElement(w,{room:t,user:a,queueUsers:U,removeQueueUser:D,setInQueue:k})),r.a.createElement(i.a,{xs:"3"},r.a.createElement(q,{user:a,users:s})))):r.a.createElement(g,{room:t,user:a,setUser:c,addNewUser:Q,addNewQueueUser:S}))},A=function(e){var t=e.text;return r.a.createElement("div",null,t)};var J=function(){var e=Object(n.useState)({type:v.BASIC}),t=Object(l.a)(e,2),a=t[0],c=t[1],u=Object(n.useState)(null),m=Object(l.a)(u,2),s=m[0],i=m[1],E=Object(n.useState)(null),d=Object(l.a)(E,2),U=d[0],b=d[1],N=Object(f.g)("/room/:id");Object(n.useEffect)((function(){var e,t;N&&!s&&(O("emitting room check event"),e=N.params.id,t=j,p.emit(C.ROOM_CHECK,{roomId:e},t))}),[N,s]);var j=function(e){var t=e.room,a=e.error;O("room event acknowledged",t),t&&!a?i(t):(O(a),b("sorry room doesn't exist..."))};return r.a.createElement(f.c,{className:"mt-4"},r.a.createElement(f.a,{path:"/room/:id"},U?r.a.createElement(A,{text:U}):r.a.createElement(_,{room:s,user:a,setUser:c})),r.a.createElement(f.a,{exact:!0,path:"/"},r.a.createElement(I,{setCurrentUserType:function(e){c(Object(o.a)({},a,{type:e}))},setRoomCallback:j})),r.a.createElement(f.a,null,r.a.createElement(A,{text:"404 resource not found"})))},M=a(24);u.a.render(r.a.createElement(M.a,null,r.a.createElement(J,null)),document.getElementById("root"))},79:function(e,t,a){e.exports=a(123)}},[[79,1,2]]]);
//# sourceMappingURL=main.aaf34ecd.chunk.js.map