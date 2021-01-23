(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{121:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(58),u=t.n(o),c=t(2),i=t(3),l=t(1),m={colors:{primary:"#2286f7",secondary:"#343a40",background:"#eaeaea",secondaryBackground:"white",border:"#d6d6d6"}},s=function(e){var n=e.children;return a.a.createElement(l.a,{theme:m},n)};function d(){var e=Object(c.a)(["\n  body {\n    margin: 0;\n    padding: 0;\n    background-color: ",";\n    font-family: 'Roboto Slab', Open-Sans, serif;\n  }\n\n  .float-right {\n    float: right;\n  }\n  .float-left {\n    float: left;\n  }\n  .bold {\n    font-weight: bold;\n  }\n  .italic {\n    font-style: italic;\n  }\n  .underline {\n    text-decoration: underline;\n  }\n"]);return d=function(){return e},e}var f=Object(l.b)(d(),(function(e){return e.theme.colors.background})),p=t(6),b=Object(r.createContext)(),E=function(e){var n=e.children,t=Object(r.useState)(null),o=Object(p.a)(t,2),u=o[0],c=o[1],i=Object(r.useState)([]),l=Object(p.a)(i,2),m=l[0],s=l[1],d=Object(r.useState)(0),f=Object(p.a)(d,2),E=f[0],v=f[1],g=Object(r.useMemo)((function(){return{room:u,queue:m,userCount:E,setRoom:c,setQueue:s,setUserCount:v}}),[m,u,E]);return a.a.createElement(b.Provider,{value:g},n)},v=Object(r.createContext)(),g=function(e){var n=e.children,t=Object(r.useState)({name:null,roomId:null,isAdmin:!1}),o=Object(p.a)(t,2),u=o[0],c=o[1],i=Object(r.useMemo)((function(){return{user:u,setUser:c}}),[u]);return a.a.createElement(v.Provider,{value:i},n)};function h(){var e=Object(c.a)(["\n  font-family: 'Roboto Slab';\n  padding: 0.5em;\n  min-width: 80px;\n"]);return h=function(){return e},e}function O(){var e=Object(c.a)(["\n  padding: 0.5em;\n  font-size: 1em;\n  border: 1px solid #bbbbbb;\n  border-radius: 3px;\n  transition: all 0.15s ease;\n  &:focus {\n    outline: none;\n    box-shadow: 0 0 0 1px ",";\n  }\n"]);return O=function(){return e},e}function j(){var e=Object(c.a)(["\n  margin-bottom: 0.25em;\n"]);return j=function(){return e},e}function w(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 1em;\n"]);return w=function(){return e},e}function A(){var e=Object(c.a)(["\n  padding: 0.4em 0.75em;\n"]);return A=function(){return e},e}function x(){var e=Object(c.a)(["\n  margin: 0.25em 0 0.75em 0;\n"]);return x=function(){return e},e}function y(){var e=Object(c.a)(["\n  margin: 1em;\n  padding: 1em 1.5em;\n  background-color: ",";\n  border: 1px solid ",";\n  border-radius: 3px;\n"]);return y=function(){return e},e}var k=l.c.div(y(),(function(e){return e.theme.colors.secondaryBackground}),(function(e){return e.theme.colors.border})),U=l.c.h2(x()),C=(l.c.button(A()),l.c.div(w())),I=l.c.label(j()),S=l.c.input(O(),(function(e){return e.theme.colors.primary})),D=l.c.button(h()),N=t(62),R=t.n(N),B=Object.freeze({JOIN:"join",LEAVE:"leave",CREATE_ROOM:"create_room",DISCONNECT:"disconnect",ENQUEUE:"enqueue",DEQUEUE:"dequeue",TRY_ADMIN_STATUS:"try_admin_status"}),J=R()();function M(){var e=Object(c.a)(["\n  height: 100%;\n"]);return M=function(){return e},e}function Q(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return Q=function(){return e},e}var q="queuetip_create_room_data",P=Object(l.c)(k)(Q()),T=l.c.form(M()),Y=function(){var e=Object(r.useContext)(v).setUser,n=Object(r.useContext)(b),t=n.setRoom,o=n.setUserCount,u=Object(r.useState)(""),c=Object(p.a)(u,2),l=c[0],m=c[1],s=Object(r.useState)(""),d=Object(p.a)(s,2),f=d[0],E=d[1],g=Object(i.f)();Object(r.useEffect)((function(){var e=localStorage.getItem(q);if(e){var n=JSON.parse(e);m(n.roomName?n.roomName:""),E(n.adminPassword?n.adminPassword:"")}}),[m,E]);return a.a.createElement(P,null,a.a.createElement(U,null,"Create Room"),a.a.createElement(T,{onSubmit:function(n){if(n.preventDefault(),0===l.trim().length)alert("Please type in a room name!");else if(0===f.trim().length)alert("Please type in an admin password!");else{var r={name:l,adminPassword:f};J.emit(B.CREATE_ROOM,{newRoom:r,newUser:{name:"admin",isAdmin:!0}},(function(n){var r=n.user,a=n.room,u=n.error;if(a&&!u){e(r),t(a),o(1);var c=JSON.stringify({roomName:l,adminPassword:f});localStorage.setItem(q,c),g.push("/room/".concat(a.id))}else alert("Something went wrong with room creation, please try again!")}))}}},a.a.createElement(C,null,a.a.createElement(I,null,"Room Name"),a.a.createElement(S,{type:"text",placeholder:"e.g. CPSC 110 Office Hours",value:l,onChange:function(e){return m(e.target.value)}})),a.a.createElement(C,null,a.a.createElement(I,null,"Admin Password"),a.a.createElement(S,{type:"text",value:f,onChange:function(e){return E(e.target.value)}})),a.a.createElement(D,{className:"float-right",type:"submit"},"Create Room")))};function L(){var e=Object(c.a)(["\n  margin-top: 0;\n"]);return L=function(){return e},e}function W(){var e=Object(c.a)(["\n  font-size: 1.1em;\n  margin: 10px 0;\n"]);return W=function(){return e},e}function z(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return z=function(){return e},e}var Z=Object(l.c)(k)(z()),G=l.c.h4(W()),V=l.c.p(L()),H=function(){return a.a.createElement(Z,null,a.a.createElement(U,null,"Welcome!"),a.a.createElement(V,null,"queue-tip is a simple web app that allows you to manage queues with ease. No sign-up required!"),a.a.createElement(V,null,"To get started, use the form to create a room and send the room link to your participants!"),a.a.createElement(G,null,"How does it work?"),a.a.createElement(V,null,"As the room creator, you will be able to see everyone in queue and remove queued users. Participants who enter with the link are able to join the queue and see their current position."),a.a.createElement(G,null,"What's the admin password used for?"),a.a.createElement(V,null,"By clicking on the \ud83d\udc51 icon, the admin password can be used by participants to gain the same permissions as the room creator. This is useful if you want multiple admins managing a single queue, or if you accidentally disconnect and want to join the room again as an admin. Make sure to only share the password with participants you trust!"))};function X(){var e=Object(c.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  & > div {\n    width: 50%;\n  }\n"]);return X=function(){return e},e}var F=l.c.div(X()),K=function(){return a.a.createElement("div",null,a.a.createElement(F,null,a.a.createElement(H,null),a.a.createElement(Y,null)))},_=t(13),$=function(){var e;(e=console).error.apply(e,arguments)};function ee(){var e=Object(c.a)(["\n  margin-top: 0;\n  margin-bottom: 0.75em;\n  font-size: 1.25em;\n  text-align: center;\n"]);return ee=function(){return e},e}function ne(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  width: 50%;\n"]);return ne=function(){return e},e}var te="queuetip_sign_in_data",re=Object(l.c)(k)(ne()),ae=l.c.p(ee()),oe=function(e){var n=e.room,t=e.setQueue,o=e.setUserCount,u=Object(r.useContext)(v),c=u.user,i=u.setUser,l=Object(r.useState)(""),m=Object(p.a)(l,2),s=m[0],d=m[1];Object(r.useEffect)((function(){var e=localStorage.getItem(te);if(e){var n=JSON.parse(e);d(n.username)}}),[d]);return a.a.createElement(re,null,a.a.createElement("div",null,a.a.createElement(U,null,"Enter Room"),a.a.createElement(ae,null,n.name)),a.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),0===s.length)alert("Please type in your name!");else{var r=Object(_.a)(Object(_.a)({},c),{},{name:s});J.emit(B.JOIN,{newUser:r,roomId:n.id},(function(e){var n=e.user,r=e.queue,a=e.userCount,u=e.error;if(u)$(u),alert(u);else{i(n),t(r),o(a);var c=JSON.stringify({username:n.name});localStorage.setItem(te,c)}}))}}},a.a.createElement(C,null,a.a.createElement(I,null,"Your Name"),a.a.createElement(S,{type:"text",value:s,onChange:function(e){return d(e.target.value)}})),a.a.createElement(D,{className:"float-right",type:"submit"},"Join")))},ue=["\ud83d\udc22","\ud83d\udc0d","\ud83e\udd96","\ud83d\udc21","\ud83d\udc2c","\ud83d\udc33","\ud83e\udd94","\ud83d\udc18","\ud83e\udd92","\ud83d\udc04","\ud83d\udc0e","\ud83d\udc08","\ud83e\udd8c","\ud83d\udc15","\ud83d\udc16","\ud83d\udc13","\ud83d\udc07","\ud83d\udc3f","\ud83d\udc05","\ud83d\udc09","\ud83e\udd86","\ud83d\udc1d","\ud83d\uddff","\ud83c\udf1b","\ud83d\udc12","\ud83d\udc11"],ce=function(e){var n=e.name.toLowerCase().charCodeAt(0),t=isNaN(n)?Math.floor(Math.random()*ue.length):n%ue.length;return ue[t]};function ie(){var e=Object(c.a)(["\n  margin: auto;\n  padding-right: 2.5em;\n  text-align: center;\n"]);return ie=function(){return e},e}function le(){var e=Object(c.a)(["\n  font-size: 1em;\n  padding: 0.75em 1em;\n"]);return le=function(){return e},e}function me(){var e=Object(c.a)(["\n  font-size: 3em;\n  margin: ","\n"]);return me=function(){return e},e}function se(){var e=Object(c.a)(["\n  font-size: 3em;\n  margin: 3px 3px 10px 3px;\n"]);return se=function(){return e},e}function de(){var e=Object(c.a)(["\n  position: relative;\n\n  & > span {\n    position: absolute;\n    top: -10px;\n    right: 10px;\n  }\n"]);return de=function(){return e},e}function fe(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return fe=function(){return e},e}function pe(){var e=Object(c.a)(["\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: flex-start;\n  align-items: flex-end;\n  padding-top: 1.5em;\n"]);return pe=function(){return e},e}function be(){var e=Object(c.a)(["\n  display: flex;\n  justify-content: center;\n\n  & > div {\n    width: 50%;\n  }\n"]);return be=function(){return e},e}var Ee=l.c.div(be()),ve=Object(l.c)(k)(pe()),ge=l.c.div(fe()),he=l.c.span(de()),Oe=l.c.span(se()),je=l.c.span(me(),(function(e){return e.isQueueEmpty?"3px 3px 10px 3px":"3px 30px 10px 3px"})),we=Object(l.c)(D)(le()),Ae=l.c.p(ie()),xe=function(e){var n=e.user,t=e.currentUser,r=ce(n);return a.a.createElement(ge,null,n.id===t.id?a.a.createElement(he,null,a.a.createElement("span",{className:"bold"},"YOU")):null,a.a.createElement(Oe,{role:"img","aria-label":"user-avatar"},r))},ye=function(e){var n=e.user,t=e.room,r=e.queue,o=r.findIndex((function(e){return e.id===n.id}));return a.a.createElement("div",null,a.a.createElement(Ee,null,a.a.createElement(k,null,a.a.createElement("p",null,"Your position in queue"),a.a.createElement("h2",null,-1!==o?o+1:"N/A")),a.a.createElement(k,null,a.a.createElement("p",null,"Current queue size"),a.a.createElement("h2",null,r.length))),a.a.createElement(we,{disabled:-1!==o,onClick:function(){J.emit(B.ENQUEUE,{user:n,roomId:t.id},(function(e){var n=e.error;n&&$(n),alert("Something went wrong on server!")}))}},"Join queue"),a.a.createElement(ve,null,a.a.createElement(je,{role:"img","aria-label":"door",isQueueEmpty:0===r.length},"\ud83d\udeaa"),r.length>0?r.map((function(e){return a.a.createElement(xe,{key:e.id,user:e,currentUser:n})})):a.a.createElement(Ae,null,"It's quiet in here...")))};function ke(){var e=Object(c.a)([" \n  & > p {\n    margin-top: 10px;\n  }\n"]);return ke=function(){return e},e}function Ue(){var e=Object(c.a)(["\n  margin-bottom: 0;\n"]);return Ue=function(){return e},e}function Ce(){var e=Object(c.a)(["\n  padding-left: 3px;\n"]);return Ce=function(){return e},e}function Ie(){var e=Object(c.a)(["\n  display: flex;\n  align-items: center;\n\n  & > :nth-child(1), & > :nth-child(2) {\n    margin-right: auto;\n  }\n"]);return Ie=function(){return e},e}function Se(){var e=Object(c.a)(["\n  font-size: 1em;\n  padding: 0.75em 1em;\n"]);return Se=function(){return e},e}function De(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  margin: 1em auto;\n  width: 50%;\n  height: 400px;\n  overflow: auto;\n\n  & > div {\n    margin-bottom: 0.5em;\n  }\n"]);return De=function(){return e},e}function Ne(){var e=Object(c.a)(["\n  display: flex;\n  justify-content: center;\n\n  & > div {\n    width: 30%;\n  }\n"]);return Ne=function(){return e},e}var Re=l.c.div(Ne()),Be=Object(l.c)(k)(De()),Je=Object(l.c)(D)(Se()),Me=l.c.div(Ie()),Qe=l.c.span(Ce()),qe=l.c.hr(Ue()),Pe=l.c.div(ke()),Te=function(e){var n=e.user,t=e.i;return a.a.createElement("div",{key:n.id},a.a.createElement(Me,null,a.a.createElement("span",null,t+1,"."),a.a.createElement("div",null,a.a.createElement("span",null,n.name),a.a.createElement(Qe,{role:"img","aria-label":"user-avatar"},ce(n))),a.a.createElement("span",null)),a.a.createElement(qe,null))},Ye=function(e){var n=e.room,t=e.queue,r=e.userCount,o=0===t.length;return a.a.createElement("div",null,a.a.createElement(Re,null,a.a.createElement(k,null,a.a.createElement("p",null,"# of users in room"),a.a.createElement("h2",null,r)),a.a.createElement(k,null,a.a.createElement("p",null,"Current queue size"),a.a.createElement("h2",null,t.length))),a.a.createElement(Je,{disabled:o,onClick:function(){J.emit(B.DEQUEUE,{roomId:n.id},(function(e){var n=e.error;n&&$(n),alert("Something went wrong on server!")}))}},"Dequeue"),a.a.createElement(Be,null,t.length>0?t.map((function(e,n){return a.a.createElement(Te,{key:e.id,user:e,i:n})})):a.a.createElement(Pe,null,a.a.createElement("p",null,"It's quiet in here..."),a.a.createElement("p",null,"Click the \ud83d\udd17 icon above to copy the room link and share it!"))))},Le=t(18),We=t.n(Le),ze=t(31),Ze=t(32),Ge=t.n(Ze),Ve="/api/rooms",He={getSingle:function(){var e=Object(ze.a)(We.a.mark((function e(n){var t;return We.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Ge.a.get("".concat(Ve,"/").concat(n));case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),checkAdminPassword:function(){var e=Object(ze.a)(We.a.mark((function e(n,t){var r;return We.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Ge.a.post("".concat(Ve,"/check-admin-password"),{adminPassword:n,roomId:t});case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}()};function Xe(){var e=Object(c.a)(["\n  opacity: ",";\n  padding-left: 5px;\n  font-size: 0.7em;\n  border: none;\n  background-color: transparent;\n\n  &:focus {\n    outline: none;\n    box-shadow: none;\n  }\n\n  ","\n"]);return Xe=function(){return e},e}function Fe(){var e=Object(c.a)(["\n  margin: 0 0 0.5em 0;\n  font-size: 1.25em;\n  position: relative;\n\n  & > button {\n    position: absolute;\n  }\n"]);return Fe=function(){return e},e}function Ke(){var e=Object(c.a)(["\n  padding-left: 5px;\n  padding-top: 10px;\n  font-size: 0.5em;\n  border: none;\n  background-color: transparent;\n\n  &:focus {\n    outline: none;\n    box-shadow: none;\n  }\n\n  &:hover {\n    text-shadow: 0 0 1px black;\n  }\n\n  &:active {\n    text-shadow: 0 0 3px black;\n  }\n"]);return Ke=function(){return e},e}function _e(){var e=Object(c.a)(["\n  margin: 0 0 0.5em 0;\n  position: relative;\n\n  & > button {\n    position: absolute;\n  }\n"]);return _e=function(){return e},e}function $e(){var e=Object(c.a)(["\n  margin: 0 0 0.5em 0;\n"]);return $e=function(){return e},e}function en(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  text-align: center;\n  width: 550px;\n"]);return en=function(){return e},e}var nn=l.c.div(en()),tn=l.c.div($e()),rn=l.c.h1(_e()),an=l.c.button(Ke()),on=l.c.p(Fe()),un=l.c.button(Xe(),(function(e){return e.isAdmin?"1":"0.5"}),(function(e){return!e.isAdmin&&"\n    &:hover {\n      opacity: 1;\n    }\n\n    &:active {\n      opacity: 0.75;\n    }\n  "})),cn=function(){var e=document.createElement("textarea");document.body.appendChild(e),e.value=window.location.href,e.select(),document.execCommand("copy"),document.body.removeChild(e)},ln=function(e){var n=e.room,t=e.queue,o=e.userCount,u=Object(r.useContext)(v),c=u.user,i=u.setUser;return a.a.createElement(nn,null,a.a.createElement(tn,null,a.a.createElement(rn,null,n.name,a.a.createElement(an,{title:"Copy room link",onClick:cn},a.a.createElement("span",{role:"img","aria-label":"link"},"\ud83d\udd17")))),a.a.createElement(on,null,"Welcome ",a.a.createElement("span",{className:"bold"},c.name),"!",a.a.createElement(un,{title:c.isAdmin?"You're an admin!":"Become admin",onClick:function(){if(!c.isAdmin){var e=prompt("Please enter admin password to gain admin access");if(null===e)return;e.length>0?He.checkAdminPassword(e,n.id).then((function(){i(Object(_.a)(Object(_.a)({},c),{},{isAdmin:!0}))})).catch((function(){alert("Password is incorrect!")})):alert("Password can't be empty!")}},isAdmin:c.isAdmin},a.a.createElement("span",{role:"img","aria-label":"crown"},"\ud83d\udc51"))),c.isAdmin?a.a.createElement(Ye,{room:n,queue:t,userCount:o}):a.a.createElement(ye,{room:n,user:c,queue:t}))};function mn(){var e=Object(c.a)(["\n  display: flex;\n  justify-content: center;\n"]);return mn=function(){return e},e}var sn=l.c.div(mn()),dn=function(){var e=Object(r.useContext)(v).user,n=Object(r.useContext)(b),t=n.room,o=n.queue,u=n.userCount,c=n.setRoom,l=n.setQueue,m=n.setUserCount,s=Object(r.useState)(!1),d=Object(p.a)(s,2),f=d[0],E=d[1],g=Object(i.g)("/room/:id");return Object(r.useEffect)((function(){g&&!t&&He.getSingle(g.params.id).then((function(e){c(e)})).catch((function(e){$(e)})).finally((function(){E(!0)}))}),[t,g,c]),Object(r.useEffect)((function(){return J.on(B.JOIN,(function(){m(u+1)})),J.on(B.LEAVE,(function(e){e.disconnectedUserId;m(u-1)})),J.on(B.ENQUEUE,(function(e){var n=e.enqueuedUser;l(o.concat(n))})),J.on(B.DEQUEUE,(function(e){var n=e.dequeuedUserId;l(o.filter((function(e){return e.id!==n})))})),function(){J.off()}}),[o,l,m,u]),a.a.createElement(sn,null,e&&e.name&&t?a.a.createElement(ln,{room:t,queue:o,userCount:u}):t?a.a.createElement(oe,{room:t,setQueue:l,setUserCount:m}):f?a.a.createElement("p",null,"Room ",a.a.createElement("i",null,g.params.id)," doesn't exist..."):null)};function fn(){var e=Object(c.a)(["\n  margin: 0;\n  font-size: 2em;\n"]);return fn=function(){return e},e}function pn(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n"]);return pn=function(){return e},e}var bn=l.c.div(pn()),En=l.c.span(fn()),vn=function(){return a.a.createElement(bn,null,a.a.createElement("h1",null,"Page not found!"),a.a.createElement(En,{role:"img","aria-label":"shook-monkey"},"\ud83d\ude49"))};function gn(){var e=Object(c.a)(["\n  margin-left: 0.5em;\n  width: 1.25em;\n\n  &:hover {\n    opacity: 0.5;\n  }\n"]);return gn=function(){return e},e}function hn(){var e=Object(c.a)(["  \n  &:hover {\n    opacity: 0.5;\n  }\n"]);return hn=function(){return e},e}function On(){var e=Object(c.a)(["\n  display: flex;\n  align-items: center;\n  position: absolute;\n  top: 7.5px;\n  right: 10px;\n  font-size: 0.75em;  \n\n  & > a {\n    color: black;\n    text-decoration: none;\n  }\n"]);return On=function(){return e},e}var jn=l.c.div(On()),wn=l.c.a(hn()),An=l.c.img(gn()),xn=function(){return a.a.createElement(jn,null,a.a.createElement(wn,{href:"https://en.wikipedia.org/wiki/Daniel_(Elton_John_song)"},"Daniel Ryu 2021"),a.a.createElement("a",{href:"https://github.com/dryu99/queue-tip"},a.a.createElement(An,{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE3OEEyRTk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNTE3OEEyRjk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTJDOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTJEOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FYrpWAAABrNJREFUeNrkW2ls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",alt:"github-icon"})))};function yn(){var e=Object(c.a)(["\n  text-align: center;\n  & > a {\n    color: black;\n  }\n"]);return yn=function(){return e},e}function kn(){var e=Object(c.a)(["\n  padding: 2em 3vw;\n  min-width: 500px;\n"]);return kn=function(){return e},e}var Un=l.c.div(kn()),Cn=l.c.h3(yn()),In=function(){return a.a.createElement(s,null,a.a.createElement(f,null),a.a.createElement(xn,null),a.a.createElement(g,null,a.a.createElement(E,null,a.a.createElement(Un,null,a.a.createElement(Cn,null,a.a.createElement("a",{href:"/"},"queue-tip")),a.a.createElement(i.c,null,a.a.createElement(i.a,{path:"/room/:id"},a.a.createElement(dn,null)),a.a.createElement(i.a,{exact:!0,path:"/"},a.a.createElement(K,null)),a.a.createElement(i.a,null,a.a.createElement(vn,null)))))))},Sn=t(14);u.a.render(a.a.createElement(Sn.a,null,a.a.createElement(In,null)),document.getElementById("root"))},97:function(e,n){}},[[121,1,2]]]);
//# sourceMappingURL=main.aa34b8de.chunk.js.map