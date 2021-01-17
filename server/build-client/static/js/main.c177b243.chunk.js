(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{121:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),u=t(56),o=t.n(u),c=t(2),i=t(3),l=t(1),m={colors:{primary:"#2286f7",secondary:"#343a40",background:"#eaeaea",secondaryBackground:"white",border:"#d6d6d6"}},s=function(e){var n=e.children;return a.a.createElement(l.a,{theme:m},n)};function f(){var e=Object(c.a)(["\n  body {\n    margin: 0;\n    padding: 0;\n    background-color: ",";\n    font-family: 'Roboto Slab', Open-Sans, serif;\n  }\n\n  .float-right {\n    float: right;\n  }\n  .bold {\n    font-weight: bold;\n  }\n  .italic {\n    font-style: italic;\n  }\n  .underline {\n    text-decoration: underline;\n  }\n"]);return f=function(){return e},e}var d=Object(l.b)(f(),(function(e){return e.theme.colors.background})),b=t(8),p=Object(r.createContext)(),E=function(e){var n=e.children,t=Object(r.useState)(null),u=Object(b.a)(t,2),o=u[0],c=u[1],i=Object(r.useState)([]),l=Object(b.a)(i,2),m=l[0],s=l[1],f=Object(r.useState)(0),d=Object(b.a)(f,2),E=d[0],v=d[1],g=Object(r.useMemo)((function(){return{room:o,queue:m,userCount:E,setRoom:c,setQueue:s,setUserCount:v}}),[m,o,E]);return a.a.createElement(p.Provider,{value:g},n)},v=Object(r.createContext)(),g=function(e){var n=e.children,t=Object(r.useState)({name:null,roomId:null,isAdmin:!1}),u=Object(b.a)(t,2),o=u[0],c=u[1],i=Object(r.useMemo)((function(){return{user:o,setUser:c}}),[o]);return a.a.createElement(v.Provider,{value:i},n)};function O(){var e=Object(c.a)(["\n  font-family: 'Roboto Slab';\n  padding: 0.5em;\n  min-width: 80px;\n"]);return O=function(){return e},e}function j(){var e=Object(c.a)(["\n  padding: 0.5em;\n  font-size: 1em;\n  border: 1px solid #bbbbbb;\n  border-radius: 3px;\n  transition: all 0.15s ease;\n  &:focus {\n    outline: none;\n    box-shadow: 0 0 0 1px ",";\n  }\n"]);return j=function(){return e},e}function h(){var e=Object(c.a)(["\n  margin-bottom: 0.25em;\n"]);return h=function(){return e},e}function A(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 1em;\n"]);return A=function(){return e},e}function x(){var e=Object(c.a)(["\n  padding: 0.4em 0.75em;\n"]);return x=function(){return e},e}function y(){var e=Object(c.a)(["\n  margin: 0.25em 0 0.75em 0;\n"]);return y=function(){return e},e}function w(){var e=Object(c.a)(["\n  margin: 1em;\n  padding: 1em 1.5em;\n  background-color: ",";\n  border: 1px solid ",";\n  border-radius: 3px;\n"]);return w=function(){return e},e}var U=l.c.div(w(),(function(e){return e.theme.colors.secondaryBackground}),(function(e){return e.theme.colors.border})),C=l.c.h2(y()),k=(l.c.button(x()),l.c.div(A())),I=l.c.label(h()),D=l.c.input(j(),(function(e){return e.theme.colors.primary})),S=l.c.button(O()),N=t(60),R=t.n(N),B=Object.freeze({JOIN:"join",LEAVE:"leave",CREATE_ROOM:"create_room",DISCONNECT:"disconnect",ENQUEUE:"enqueue",DEQUEUE:"dequeue",TRY_ADMIN_STATUS:"try_admin_status"}),J=R()();function Q(){var e=Object(c.a)(["\n  height: 100%;\n"]);return Q=function(){return e},e}function M(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return M=function(){return e},e}var T="queuetip_create_room_data",q=Object(l.c)(U)(M()),Y=l.c.form(Q()),L=function(){var e=Object(r.useContext)(v).setUser,n=Object(r.useContext)(p),t=n.setRoom,u=n.setUserCount,o=Object(r.useState)(""),c=Object(b.a)(o,2),l=c[0],m=c[1],s=Object(i.f)();Object(r.useEffect)((function(){var e=localStorage.getItem(T);if(e){var n=JSON.parse(e);m(n.roomName)}}),[m]);return a.a.createElement(q,null,a.a.createElement(C,null,"Create Room"),a.a.createElement(Y,{onSubmit:function(n){if(n.preventDefault(),0===l.trim().length)alert("Please type in a room name!");else{var r={name:l,adminPassword:"placeholder"};J.emit(B.CREATE_ROOM,{newRoom:r,newUser:{name:"admin",isAdmin:!0}},(function(n){var r=n.user,a=n.room,o=n.error;if(a&&!o){e(r),t(a),u(1);var c=JSON.stringify({roomName:a.name});localStorage.setItem(T,c),s.push("/room/".concat(a.id))}else alert("Something went wrong with room creation, please try again!")}))}}},a.a.createElement(k,null,a.a.createElement(I,null,"Room Name"),a.a.createElement(D,{type:"text",placeholder:"e.g. CPSC 110 Office Hours",value:l,onChange:function(e){return m(e.target.value)}})),a.a.createElement(S,{className:"float-right",type:"submit"},"Create Room")))};function P(){var e=Object(c.a)(["\n  margin-top: 0;\n"]);return P=function(){return e},e}function W(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return W=function(){return e},e}var z=Object(l.c)(U)(W()),Z=l.c.p(P()),G=function(){return a.a.createElement(z,null,a.a.createElement(C,null,"Welcome!"),a.a.createElement(Z,null,"queue-tip is a simple web app that allows you to facilitate online queues with ease."),a.a.createElement(Z,null,"To get started, just use the form to create a room and send the room link to your participants!"),a.a.createElement(Z,null,"As the room creator, you will be able to see everyone in the queue and remove queued users. Participants who enter through the link are only able to join the queue and see their current position."))};function V(){var e=Object(c.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  & > div {\n    width: 50%;\n  }\n"]);return V=function(){return e},e}var H=l.c.div(V()),X=function(){return a.a.createElement("div",null,a.a.createElement(H,null,a.a.createElement(G,null),a.a.createElement(L,null)))},F=t(14),K=function(){var e;(e=console).error.apply(e,arguments)};function _(){var e=Object(c.a)(["\n  margin-top: 0;\n  margin-bottom: 0.75em;\n  font-size: 1.25em;\n  text-align: center;\n"]);return _=function(){return e},e}function $(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  width: 50%;\n"]);return $=function(){return e},e}var ee="queuetip_sign_in_data",ne=Object(l.c)(U)($()),te=l.c.p(_()),re=function(e){var n=e.room,t=e.userCount,u=e.setQueue,o=e.setUserCount,c=Object(r.useContext)(v),i=c.user,l=c.setUser,m=Object(r.useState)(""),s=Object(b.a)(m,2),f=s[0],d=s[1];Object(r.useEffect)((function(){var e=localStorage.getItem(ee);if(e){var n=JSON.parse(e);d(n.username)}}),[d]);return a.a.createElement(ne,null,a.a.createElement("div",null,a.a.createElement(C,null,"Enter Room"),a.a.createElement(te,null,n.name)),a.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),0===f.length)alert("Please type in your name!");else{var r=Object(F.a)(Object(F.a)({},i),{},{name:f});J.emit(B.JOIN,{newUser:r,roomId:n.id},(function(e){var n=e.user,r=e.queue,a=e.error;if(a)K(a),alert(a);else{l(n),u(r),o(t+1);var c=JSON.stringify({username:n.name});localStorage.setItem(ee,c)}}))}}},a.a.createElement(k,null,a.a.createElement(I,null,"Your Name"),a.a.createElement(D,{type:"text",value:f,onChange:function(e){return d(e.target.value)}})),a.a.createElement(S,{className:"float-right",type:"submit"},"Join")))},ae=["\ud83d\udc22","\ud83d\udc0d","\ud83e\udd96","\ud83d\udc21","\ud83d\udc20","\ud83d\udc2c","\ud83d\udc33","\ud83d\udc05","\ud83e\udd93","\ud83e\udd8d","\ud83d\udc18","\ud83e\udd8f","\ud83d\udc2b","\ud83e\udd92","\ud83d\udc02","\ud83d\udc04","\ud83d\udc0e","\ud83d\udc16","\ud83d\udc11","\ud83d\udc10","\ud83e\udd8c","\ud83d\udc15","\ud83d\udc08","\ud83d\udc13","\ud83e\udd83","\ud83d\udc07","\ud83d\udc3f","\ud83e\udd94","\ud83d\udc09","\ud83e\udd86","\ud83e\udd85","\ud83e\udd87","\ud83d\udc1d","\ud83d\udc1b","\ud83d\udc1c","\ud83c\udf1b","\ud83d\uddff","\ud83d\udc12"],ue=function(e){var n=e.name.charCodeAt(0),t=isNaN(n)?Math.floor(Math.random()*ae.length):n%ae.length;return ae[t]};function oe(){var e=Object(c.a)(["\n  margin: auto;\n  padding-right: 2.5em;\n  text-align: center;\n"]);return oe=function(){return e},e}function ce(){var e=Object(c.a)(["\n  font-size: 1em;\n  padding: 0.75em 1em;\n"]);return ce=function(){return e},e}function ie(){var e=Object(c.a)(["\n  font-size: 3em;\n  margin: ","\n"]);return ie=function(){return e},e}function le(){var e=Object(c.a)(["\n  font-size: 3em;\n  margin: 3px 3px 10px 3px;\n"]);return le=function(){return e},e}function me(){var e=Object(c.a)(["\n  position: relative;\n\n  & > span {\n    position: absolute;\n    top: -10px;\n    right: 10px;\n  }\n"]);return me=function(){return e},e}function se(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return se=function(){return e},e}function fe(){var e=Object(c.a)(["\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: flex-start;\n  align-items: flex-end;\n  padding-top: 1.5em;\n"]);return fe=function(){return e},e}function de(){var e=Object(c.a)(["\n  display: flex;\n  justify-content: space-around;\n"]);return de=function(){return e},e}var be=l.c.div(de()),pe=Object(l.c)(U)(fe()),Ee=l.c.div(se()),ve=l.c.span(me()),ge=l.c.span(le()),Oe=l.c.span(ie(),(function(e){return e.isQueueEmpty?"3px 3px 10px 3px":"3px 30px 10px 3px"})),je=Object(l.c)(S)(ce()),he=l.c.p(oe()),Ae=function(e){var n=e.user,t=e.currentUser,r=ue(n);return a.a.createElement(Ee,null,n.id===t.id?a.a.createElement(ve,null,a.a.createElement("span",{className:"bold"},"YOU")):null,a.a.createElement(ge,{role:"img","aria-label":"user-avatar"},r))},xe=function(e){var n=e.user,t=e.room,r=e.queue,u=r.findIndex((function(e){return e.id===n.id}));return a.a.createElement("div",null,a.a.createElement(be,null,a.a.createElement(U,null,a.a.createElement("p",null,"Your position in queue"),a.a.createElement("h2",null,-1!==u?u+1:"N/A")),a.a.createElement(U,null,a.a.createElement("p",null,"Current queue size"),a.a.createElement("h2",null,r.length))),a.a.createElement(je,{disabled:-1!==u,onClick:function(){J.emit(B.ENQUEUE,{user:n,roomId:t.id},(function(e){var n=e.error;n&&K(n)}))}},"Click to join"),a.a.createElement(pe,null,a.a.createElement(Oe,{role:"img","aria-label":"door",isQueueEmpty:0===r.length},"\ud83d\udeaa"),r.length>0?r.map((function(e){return a.a.createElement(Ae,{key:e.id,user:e,currentUser:n})})):a.a.createElement(he,null,"It's quiet in here...")))};function ye(){var e=Object(c.a)([" \n  & > p {\n    margin-top: 0;\n  }\n"]);return ye=function(){return e},e}function we(){var e=Object(c.a)(["\n  padding-left: 3px;\n"]);return we=function(){return e},e}function Ue(){var e=Object(c.a)(["\n  font-size: 1em;\n  padding: 0.75em 1em;\n"]);return Ue=function(){return e},e}function Ce(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  margin: 1em auto;\n  width: 240px;\n  height: 400px;\n  padding: 1em;\n  overflow: auto;\n\n  & > div {\n    margin-bottom: 0.5em;\n  }\n"]);return Ce=function(){return e},e}function ke(){var e=Object(c.a)(["\n  display: flex;\n  justify-content: space-between;\n\n  & > div {\n    // width: 50%;\n    width: 150px;\n  }\n"]);return ke=function(){return e},e}var Ie=l.c.div(ke()),De=Object(l.c)(U)(Ce()),Se=Object(l.c)(S)(Ue()),Ne=l.c.span(we()),Re=l.c.div(ye()),Be=function(e){var n=e.room,t=e.queue,r=e.userCount,u=0===t.length;return a.a.createElement("div",null,a.a.createElement(Ie,null,a.a.createElement(U,null,a.a.createElement("p",null,"Current room size"),a.a.createElement("h2",null,r)),a.a.createElement(U,null,a.a.createElement("p",null,"Current queue size"),a.a.createElement("h2",null,t.length))),a.a.createElement(Se,{disabled:u,onClick:function(){J.emit(B.DEQUEUE,{roomId:n.id},(function(e){var n=e.error;n&&K(n)}))}},"Dequeue"),a.a.createElement(De,null,t.length>0?t.map((function(e,n){return a.a.createElement("div",{key:e.id},a.a.createElement("span",{className:0===n?"underline":null},e.name),a.a.createElement(Ne,{role:"img","aria-label":"user-avatar"},ue(e)))})):a.a.createElement(Re,null,a.a.createElement("p",null,"It's quiet in here..."),a.a.createElement("p",null,"Click the \ud83d\udd17 icon above to copy the room link and share it!"))))};function Je(){var e=Object(c.a)(["\n  opacity: ",";\n  padding-left: 5px;\n  font-size: 0.7em;\n  border: none;\n  background-color: transparent;\n\n  &:focus {\n    outline: none;\n    box-shadow: none;\n  }\n\n  ","\n"]);return Je=function(){return e},e}function Qe(){var e=Object(c.a)(["\n  margin: 0 0 0.5em 0;\n  font-size: 1.25em;\n  position: relative;\n\n  & > button {\n    position: absolute;\n  }\n"]);return Qe=function(){return e},e}function Me(){var e=Object(c.a)(["\n  padding-left: 5px;\n  padding-top: 10px;\n  font-size: 0.5em;\n  border: none;\n  background-color: transparent;\n\n  &:focus {\n    outline: none;\n    box-shadow: none;\n  }\n\n  &:hover {\n    text-shadow: 0 0 1px black;\n  }\n\n  &:active {\n    text-shadow: 0 0 3px black;\n  }\n"]);return Me=function(){return e},e}function Te(){var e=Object(c.a)(["\n  margin: 0 0 0.5em 0;\n  position: relative;\n\n  & > button {\n    position: absolute;\n  }\n"]);return Te=function(){return e},e}function qe(){var e=Object(c.a)(["\n  margin: 0 0 0.5em 0;\n"]);return qe=function(){return e},e}function Ye(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  text-align: center;\n"]);return Ye=function(){return e},e}var Le=l.c.div(Ye()),Pe=l.c.div(qe()),We=l.c.h1(Te()),ze=l.c.button(Me()),Ze=l.c.p(Qe()),Ge=(l.c.button(Je(),(function(e){return e.isAdmin?"1":"0.5"}),(function(e){return!e.isAdmin&&"\n    &:hover {\n      opacity: 1;\n    }\n\n    &:active {\n      opacity: 0.75;\n    }\n  "})),function(){var e=document.createElement("textarea");document.body.appendChild(e),e.value=window.location.href,e.select(),document.execCommand("copy"),document.body.removeChild(e)}),Ve=function(e){var n=e.room,t=e.queue,u=e.userCount,o=Object(r.useContext)(v),c=o.user;o.setUser;return a.a.createElement(Le,null,a.a.createElement(Pe,null,a.a.createElement(We,null,n.name,a.a.createElement(ze,{title:"Copy room link",onClick:Ge},a.a.createElement("span",{role:"img","aria-label":"link"},"\ud83d\udd17")))),a.a.createElement(Ze,null,"Welcome ",a.a.createElement("span",{className:"bold"},c.name),"!"),c.isAdmin?a.a.createElement(Be,{room:n,queue:t,userCount:u}):a.a.createElement(xe,{room:n,user:c,queue:t}))},He=t(30),Xe=t.n(He),Fe=t(61),Ke=t(62),_e=t.n(Ke),$e={getSingle:function(){var e=Object(Fe.a)(Xe.a.mark((function e(n){var t;return Xe.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_e.a.get("".concat("/api/rooms","/").concat(n));case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()};function en(){var e=Object(c.a)(["\n  display: flex;\n  justify-content: center;\n"]);return en=function(){return e},e}var nn=l.c.div(en()),tn=function(){var e=Object(r.useContext)(v).user,n=Object(r.useContext)(p),t=n.room,u=n.queue,o=n.userCount,c=n.setRoom,l=n.setQueue,m=n.setUserCount,s=Object(r.useState)(!1),f=Object(b.a)(s,2),d=f[0],E=f[1],g=Object(i.g)("/room/:id");return Object(r.useEffect)((function(){g&&!t&&$e.getSingle(g.params.id).then((function(e){c(e)})).catch((function(e){K(e)})).finally((function(){E(!0)}))}),[t,g,c]),Object(r.useEffect)((function(){return J.on(B.JOIN,(function(){m(o+1)})),J.on(B.LEAVE,(function(e){var n=e.disconnectedUserId;l(u.filter((function(e){return e.id!==n}))),m(o-1)})),J.on(B.ENQUEUE,(function(e){var n=e.enqueuedUser;l(u.concat(n))})),J.on(B.DEQUEUE,(function(e){var n=e.dequeuedUserId;l(u.filter((function(e){return e.id!==n})))})),function(){J.off()}}),[u,l,m,o]),a.a.createElement(nn,null,e&&e.name&&t?a.a.createElement(Ve,{room:t,queue:u,userCount:o}):t?a.a.createElement(re,{room:t,userCount:o,setQueue:l,setUserCount:m}):d?a.a.createElement("p",null,"Room ",a.a.createElement("i",null,g.params.id)," doesn't exist..."):null)};function rn(){var e=Object(c.a)(["\n  margin: 0;\n  font-size: 2em;\n"]);return rn=function(){return e},e}function an(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n"]);return an=function(){return e},e}var un=l.c.div(an()),on=l.c.span(rn()),cn=function(){return a.a.createElement(un,null,a.a.createElement("h1",null,"Page not found!"),a.a.createElement(on,{role:"img","aria-label":"shook-monkey"},"\ud83d\ude49"))};function ln(){var e=Object(c.a)(["\n  margin-left: 0.5em;\n  width: 1.25em;\n\n  &:hover {\n    opacity: 0.5;\n  }\n"]);return ln=function(){return e},e}function mn(){var e=Object(c.a)(["  \n  &:hover {\n    opacity: 0.5;\n  }\n"]);return mn=function(){return e},e}function sn(){var e=Object(c.a)(["\n  display: flex;\n  align-items: center;\n  position: absolute;\n  top: 7.5px;\n  right: 10px;\n  font-size: 0.75em;  \n\n  & > a {\n    color: black;\n    text-decoration: none;\n  }\n"]);return sn=function(){return e},e}var fn=l.c.div(sn()),dn=l.c.a(mn()),bn=l.c.img(ln()),pn=function(){return a.a.createElement(fn,null,a.a.createElement(dn,{href:"https://en.wikipedia.org/wiki/Daniel_(Elton_John_song)"},"Daniel Ryu 2021"),a.a.createElement("a",{href:"https://github.com/dryu99/queue-tip"},a.a.createElement(bn,{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE3OEEyRTk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNTE3OEEyRjk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTJDOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTJEOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FYrpWAAABrNJREFUeNrkW2ls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",alt:"github-icon"})))};function En(){var e=Object(c.a)(["\n  text-align: center;\n  & > a {\n    color: black;\n  }\n"]);return En=function(){return e},e}function vn(){var e=Object(c.a)(["\n  padding: 2em 7.5em;\n"]);return vn=function(){return e},e}var gn=l.c.div(vn()),On=l.c.h3(En()),jn=function(){return a.a.createElement(s,null,a.a.createElement(d,null),a.a.createElement(g,null,a.a.createElement(E,null,a.a.createElement(gn,null,a.a.createElement(pn,null),a.a.createElement(On,null,a.a.createElement("a",{href:"/"},"queue-tip")),a.a.createElement(i.c,null,a.a.createElement(i.a,{path:"/room/:id"},a.a.createElement(tn,null)),a.a.createElement(i.a,{exact:!0,path:"/"},a.a.createElement(X,null)),a.a.createElement(i.a,null,a.a.createElement(cn,null)))))))},hn=t(13);o.a.render(a.a.createElement(hn.a,null,a.a.createElement(jn,null)),document.getElementById("root"))},97:function(e,n){}},[[121,1,2]]]);
//# sourceMappingURL=main.c177b243.chunk.js.map