(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{123:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),u=t(55),o=t.n(u),c=t(2),l=t(3),i=t(1),m={colors:{primary:"#2286f7",secondary:"#343a40",background:"#eaeaea",secondaryBackground:"white",border:"#d6d6d6"}},s=function(e){var n=e.children;return a.a.createElement(i.a,{theme:m},n)};function f(){var e=Object(c.a)(["\n  body {\n    margin: 0;\n    padding: 0;\n    background-color: ",";\n    font-family: 'Roboto Slab', Open-Sans, serif;\n  }\n\n  .float-right {\n    float: right;\n  }\n  .bold {\n    font-weight: bold;\n  }\n  .italic {\n    font-style: italic;\n  }\n  .underline {\n    text-decoration: underline;\n  }\n"]);return f=function(){return e},e}var d=Object(i.b)(f(),(function(e){return e.theme.colors.background})),b=t(6),p=Object(r.createContext)(),E=function(e){var n=e.children,t=Object(r.useState)(null),u=Object(b.a)(t,2),o=u[0],c=u[1],l=Object(r.useState)([]),i=Object(b.a)(l,2),m=i[0],s=i[1],f=Object(r.useState)(0),d=Object(b.a)(f,2),E=d[0],v=d[1],O=Object(r.useMemo)((function(){return{room:o,queue:m,userCount:E,setRoom:c,setQueue:s,setUserCount:v}}),[m,o,E]);return a.a.createElement(p.Provider,{value:O},n)},v=Object(r.createContext)(),O=function(e){var n=e.children,t=Object(r.useState)({name:null,roomId:null,isAdmin:!1}),u=Object(b.a)(t,2),o=u[0],c=u[1],l=Object(r.useMemo)((function(){return{user:o,setUser:c}}),[o]);return a.a.createElement(v.Provider,{value:l},n)};function j(){var e=Object(c.a)(["\n  font-family: 'Roboto Slab';\n  padding: 0.5em;\n  min-width: 80px;\n"]);return j=function(){return e},e}function h(){var e=Object(c.a)(["\n  padding: 0.5em;\n  font-size: 1em;\n  border: 1px solid #bbbbbb;\n  border-radius: 3px;\n  transition: all 0.15s ease;\n  &:focus {\n    outline: none;\n    box-shadow: 0 0 0 1px ",";\n  }\n"]);return h=function(){return e},e}function g(){var e=Object(c.a)(["\n  margin-bottom: 0.25em;\n"]);return g=function(){return e},e}function x(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 1em;\n"]);return x=function(){return e},e}function y(){var e=Object(c.a)(["\n  padding: 0.4em 0.75em;\n"]);return y=function(){return e},e}function C(){var e=Object(c.a)(["\n  margin: 0.25em 0 0.75em 0;\n"]);return C=function(){return e},e}function w(){var e=Object(c.a)(["\n  margin: 1em;\n  padding: 1em 1.5em;\n  background-color: ",";\n  border: 1px solid ",";\n  border-radius: 3px;\n"]);return w=function(){return e},e}var U=i.c.div(w(),(function(e){return e.theme.colors.secondaryBackground}),(function(e){return e.theme.colors.border})),k=i.c.h2(C()),q=(i.c.button(y()),i.c.div(x())),N=i.c.label(g()),S=i.c.input(h(),(function(e){return e.theme.colors.primary})),R=i.c.button(j()),z=t(59),I=t.n(z),A=Object.freeze({JOIN:"join",LEAVE:"leave",CREATE_ROOM:"create_room",DISCONNECT:"disconnect",ENQUEUE:"enqueue",DEQUEUE:"dequeue",TRY_ADMIN_STATUS:"try_admin_status"}),Q=I()();function D(){var e=Object(c.a)(["\n  height: 100%;\n"]);return D=function(){return e},e}function _(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return _=function(){return e},e}var J=Object(i.c)(U)(_()),M=i.c.form(D()),P=function(){var e=Object(r.useContext)(v).setUser,n=Object(r.useContext)(p),t=n.setRoom,u=n.setUserCount,o=Object(r.useState)(""),c=Object(b.a)(o,2),i=c[0],m=c[1],s=Object(l.f)();return a.a.createElement(J,null,a.a.createElement(k,null,"Create Room"),a.a.createElement(M,{onSubmit:function(n){if(n.preventDefault(),0===i.trim().length)alert("Please type in a room name!");else{var r={name:i,adminPassword:"placeholder"};Q.emit(A.CREATE_ROOM,{newRoom:r,newUser:{name:"admin",isAdmin:!0}},(function(n){var r=n.user,a=n.room,o=n.error;a&&!o?(e(r),t(a),u(0),s.push("/room/".concat(a.id))):alert("Something went wrong with room creation, please try again!")}))}}},a.a.createElement(q,null,a.a.createElement(N,null,"Room Name"),a.a.createElement(S,{type:"text",placeholder:"e.g. CPSC 110 Office Hours",value:i,onChange:function(e){return m(e.target.value)}})),a.a.createElement(R,{className:"float-right",type:"submit"},"Create Room")))};function T(){var e=Object(c.a)(["\n  margin-top: 0;\n"]);return T=function(){return e},e}function Y(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return Y=function(){return e},e}var B=Object(i.c)(U)(Y()),L=i.c.p(T()),V=function(){return a.a.createElement(B,null,a.a.createElement(k,null,"Welcome!"),a.a.createElement(L,null,"queue-tip is a simple web app that allows you to facilitate online queues with ease."),a.a.createElement(L,null,"To get started, just use the form to create a room and send the room link to your participants!"),a.a.createElement(L,null,"As the room creator, you will be able to see everyone in the queue and remove queued users. Participants who enter through the link are only able to join the queue and see their current position."))};function W(){var e=Object(c.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  & > div {\n    width: 50%;\n  }\n"]);return W=function(){return e},e}var H=i.c.div(W()),F=function(){return a.a.createElement("div",null,a.a.createElement(H,null,a.a.createElement(V,null),a.a.createElement(P,null)))},G=t(62),K=function(){var e;(e=console).error.apply(e,arguments)};function X(){var e=Object(c.a)(["\n  margin-top: 0;\n  margin-bottom: 0.75em;\n  font-size: 1.25em;\n  text-align: center;\n"]);return X=function(){return e},e}function Z(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  width: 50%;\n"]);return Z=function(){return e},e}var $=Object(i.c)(U)(Z()),ee=i.c.p(X()),ne=function(e){var n=e.room,t=e.userCount,u=e.setQueue,o=e.setUserCount,c=Object(r.useContext)(v),l=c.user,i=c.setUser,m=Object(r.useState)(""),s=Object(b.a)(m,2),f=s[0],d=s[1];return a.a.createElement($,null,a.a.createElement("div",null,a.a.createElement(k,null,"Enter Room"),a.a.createElement(ee,null,n.name)),a.a.createElement("form",{onSubmit:function(e){e.preventDefault();var r=Object(G.a)({},l,{name:f});Q.emit(A.JOIN,{newUser:r,roomId:n.id},(function(e){var n=e.user,r=e.queue,a=e.error;a?(K(a),alert(a)):(i(n),u(r),o(t+1))}))}},a.a.createElement(q,null,a.a.createElement(N,null,"Your Name"),a.a.createElement(S,{type:"text",value:f,onChange:function(e){return d(e.target.value)}})),a.a.createElement(R,{className:"float-right",type:"submit"},"Join")))};function te(){var e=Object(c.a)(["\n  font-size: 1em;\n  padding: 0.75em 1em;\n"]);return te=function(){return e},e}function re(){var e=Object(c.a)(["\n  font-size: 3em;\n  margin: ","\n"]);return re=function(){return e},e}function ae(){var e=Object(c.a)(["\n  font-size: 3em;\n  margin: 3px 3px 10px 3px;\n"]);return ae=function(){return e},e}function ue(){var e=Object(c.a)(["\n  position: relative;\n\n  & > span {\n    position: absolute;\n    top: -10px;\n    right: 10px;\n  }\n"]);return ue=function(){return e},e}function oe(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return oe=function(){return e},e}function ce(){var e=Object(c.a)(["\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: flex-start;\n  align-items: flex-end;\n  padding-top: 1.5em;\n"]);return ce=function(){return e},e}function le(){var e=Object(c.a)(["\n  display: flex;\n  justify-content: space-around;\n"]);return le=function(){return e},e}var ie=["\ud83d\udc22","\ud83d\udc0d","\ud83e\udd96","\ud83d\udc21","\ud83d\udc20","\ud83d\udc2c","\ud83d\udc33","\ud83d\udc05","\ud83e\udd93","\ud83e\udd8d","\ud83d\udc18","\ud83e\udd8f","\ud83d\udc2b","\ud83e\udd92","\ud83d\udc02","\ud83d\udc04","\ud83d\udc0e","\ud83d\udc16","\ud83d\udc11","\ud83d\udc10","\ud83e\udd8c","\ud83d\udc15","\ud83d\udc08","\ud83d\udc13","\ud83e\udd83","\ud83d\udc07","\ud83d\udc00","\ud83d\udc3f","\ud83e\udd94","\ud83d\udc09","\ud83e\udd86","\ud83e\udd85","\ud83e\udd87","\ud83d\udc1d","\ud83d\udc1b","\ud83d\udc1c","\ud83c\udf1b","\ud83d\uddff","\ud83d\udc12"],me=i.c.div(le()),se=Object(i.c)(U)(ce()),fe=i.c.div(oe()),de=i.c.span(ue()),be=i.c.span(ae()),pe=i.c.span(re(),(function(e){return e.isQueueEmpty?"3px 3px 10px 3px":"3px 30px 10px 3px"})),Ee=Object(i.c)(R)(te()),ve=function(e){var n=e.user,t=e.currentUser,r=n.name.charCodeAt(0),u=isNaN(r)?Math.floor(Math.random()*ie.length):r%ie.length;return a.a.createElement(fe,null,n.id===t.id?a.a.createElement(de,null,a.a.createElement("span",{className:"bold"},"YOU")):null,a.a.createElement(be,{role:"img","aria-label":"user-avatar"},ie[u]))},Oe=function(e){var n=e.user,t=e.room,r=e.queue,u=r.findIndex((function(e){return e.id===n.id}));return a.a.createElement("div",null,a.a.createElement(me,null,a.a.createElement(U,null,a.a.createElement("p",null,"Your position in queue"),a.a.createElement("h2",null,-1!==u?u+1:"N/A")),a.a.createElement(U,null,a.a.createElement("p",null,"Current queue size"),a.a.createElement("h2",null,r.length))),a.a.createElement(Ee,{disabled:-1!==u,onClick:function(){Q.emit(A.ENQUEUE,{user:n,roomId:t.id},(function(e){var n=e.error;n&&K(n)}))}},"Click to join"),a.a.createElement(se,null,a.a.createElement(pe,{role:"img","aria-label":"door",isQueueEmpty:0===r.length},"\ud83d\udeaa"),r.map((function(e){return a.a.createElement(ve,{key:e.id,user:e,currentUser:n})}))))};function je(){var e=Object(c.a)(["\n  font-size: 1em;\n  padding: 0.75em 1em;\n"]);return je=function(){return e},e}function he(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  margin: 1em auto;\n  width: 50%;\n  height: 400px;\n  padding: 1em;\n  overflow: auto;\n\n  & > div {\n    margin-bottom: 0.5em;\n  }\n"]);return he=function(){return e},e}function ge(){var e=Object(c.a)(["\n  display: flex;\n  justify-content: space-around;\n"]);return ge=function(){return e},e}function xe(){var e=Object(c.a)(["\n\n"]);return xe=function(){return e},e}var ye=i.c.div(xe()),Ce=i.c.div(ge()),we=Object(i.c)(U)(he()),Ue=Object(i.c)(R)(je()),ke=function(e){var n=e.room,t=e.queue,r=e.userCount,u=0===t.length;return a.a.createElement(ye,null,a.a.createElement(Ce,null,a.a.createElement(U,null,a.a.createElement("p",null,"Current room size"),a.a.createElement("h2",null,r)),a.a.createElement(U,null,a.a.createElement("p",null,"Current queue size"),a.a.createElement("h2",null,t.length))),a.a.createElement(Ue,{disabled:u,onClick:function(){Q.emit(A.DEQUEUE,{roomId:n.id},(function(e){var n=e.error;n&&K(n)}))}},"Dequeue"),a.a.createElement(we,null,t.map((function(e,n){return a.a.createElement("div",{key:e.id,className:0===n?"underline":null},e.name)}))))};function qe(){var e=Object(c.a)(["\n  margin: 0 0 0.5em 0;\n  font-size: 1.25em;\n"]);return qe=function(){return e},e}function Ne(){var e=Object(c.a)(["\n  padding: 0 0 0 5px;\n  border: none;\n  font-size: 0.75em;\n  background-color: transparent;\n\n  &:hover {\n    text-shadow: 0 0 1px black;\n  }\n\n  &:focus {\n    outline: none;\n    box-shadow: none;\n  }\n\n  &:active {\n    text-shadow: 0 0 3px black;\n  }\n"]);return Ne=function(){return e},e}function Se(){var e=Object(c.a)(["\n  margin: 0 0 0.5em 0;\n"]);return Se=function(){return e},e}function Re(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  text-align: center;\n"]);return Re=function(){return e},e}var ze=i.c.div(Re()),Ie=i.c.h1(Se()),Ae=i.c.button(Ne()),Qe=i.c.p(qe()),De=function(){var e=document.createElement("textarea");document.body.appendChild(e),e.value=window.location.href,e.select(),document.execCommand("copy"),document.body.removeChild(e)},_e=function(e){var n=e.room,t=e.queue,u=e.userCount,o=Object(r.useContext)(v).user;return a.a.createElement(ze,null,a.a.createElement(Ie,null,n.name,a.a.createElement(Ae,{title:"copy room link",onClick:De},a.a.createElement("span",{role:"img","aria-label":"link"},"\ud83d\udd17"))),a.a.createElement(Qe,null,"Welcome ",a.a.createElement("span",{className:"bold"},o.name),"!"),o.isAdmin?a.a.createElement(ke,{room:n,queue:t,userCount:u}):a.a.createElement(Oe,{room:n,user:o,queue:t}))},Je=t(28),Me=t.n(Je),Pe=t(60),Te=t(61),Ye=t.n(Te),Be={getSingle:function(){var e=Object(Pe.a)(Me.a.mark((function e(n){var t;return Me.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Ye.a.get("".concat("/api/rooms","/").concat(n));case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()};function Le(){var e=Object(c.a)(["\n  display: flex;\n  justify-content: center;\n"]);return Le=function(){return e},e}var Ve=i.c.div(Le()),We=function(){var e=Object(r.useContext)(v).user,n=Object(r.useContext)(p),t=n.room,u=n.queue,o=n.userCount,c=n.setRoom,i=n.setQueue,m=n.setUserCount,s=Object(r.useState)(!1),f=Object(b.a)(s,2),d=f[0],E=f[1],O=Object(l.g)("/room/:id");return Object(r.useEffect)((function(){O&&!t&&Be.getSingle(O.params.id).then((function(e){c(e)})).catch((function(e){K(e)})).finally((function(){E(!0)}))}),[t,O,c]),Object(r.useEffect)((function(){return Q.on(A.JOIN,(function(){m(o+1)})),Q.on(A.LEAVE,(function(e){var n=e.disconnectedUserId;i(u.filter((function(e){return e.id!==n}))),m(o-1)})),Q.on(A.ENQUEUE,(function(e){var n=e.enqueuedUser;i(u.concat(n))})),Q.on(A.DEQUEUE,(function(e){var n=e.dequeuedUserId;i(u.filter((function(e){return e.id!==n})))})),function(){Q.off()}}),[u,i,m,o]),a.a.createElement(Ve,null,e&&e.name&&t?a.a.createElement(_e,{room:t,queue:u,userCount:o}):t?a.a.createElement(ne,{room:t,userCount:o,setQueue:i,setUserCount:m}):d?a.a.createElement("p",null,"Room ",a.a.createElement("i",null,O.params.id)," doesn't exist..."):null)};function He(){var e=Object(c.a)(["\n  margin: 0;\n  font-size: 2em;\n"]);return He=function(){return e},e}function Fe(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n"]);return Fe=function(){return e},e}var Ge=i.c.div(Fe()),Ke=i.c.span(He()),Xe=function(){return a.a.createElement(Ge,null,a.a.createElement("h1",null,"Page not found!"),a.a.createElement(Ke,{role:"img","aria-label":"shook-monkey"},"\ud83d\ude49"))};function Ze(){var e=Object(c.a)(["\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  font-size: 0.75em;  \n\n  & > a {\n    color: black;\n    text-decoration: none;\n  }\n"]);return Ze=function(){return e},e}var $e=i.c.div(Ze()),en=function(){return a.a.createElement($e,null,a.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Daniel_(Elton_John_song)"},"Daniel Ryu 2021"))};function nn(){var e=Object(c.a)(["\n  text-align: center;\n  & > a {\n    color: black;\n  }\n"]);return nn=function(){return e},e}function tn(){var e=Object(c.a)(["\n  padding: 2em 7.5em;\n"]);return tn=function(){return e},e}var rn=i.c.div(tn()),an=i.c.h3(nn()),un=function(){return a.a.createElement(s,null,a.a.createElement(d,null),a.a.createElement(O,null,a.a.createElement(E,null,a.a.createElement(rn,null,a.a.createElement(en,null),a.a.createElement(an,null,a.a.createElement("a",{href:"/"},"queue-tip")),a.a.createElement(l.c,null,a.a.createElement(l.a,{path:"/room/:id"},a.a.createElement(We,null)),a.a.createElement(l.a,{exact:!0,path:"/"},a.a.createElement(F,null)),a.a.createElement(l.a,null,a.a.createElement(Xe,null)))))))},on=t(10);o.a.render(a.a.createElement(on.a,null,a.a.createElement(un,null)),document.getElementById("root"))},63:function(e,n,t){e.exports=t(123)},99:function(e,n){}},[[63,1,2]]]);
//# sourceMappingURL=main.e658cf93.chunk.js.map