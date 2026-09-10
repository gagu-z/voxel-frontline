function wr(n,t){
let e={

}
,s={
rings:[],spawns:[],snipers:[],pickups:[],animated:[],meshes:[],playerStart:new w.Vector3(0,0,42),bounds:{
minX:-55,maxX:55,minZ:-55,maxZ:55
}
,arenaSpawns:[],grappleMovers:[],breakables:[],props:[],style:null,key:"district"
}
,i=(x,I,q=!1)=>{
let K=I+(q?"f":"");
(e[K]||(e[K]=[])).push(x)
}
,o=(x,I,q=!1)=>new w.Mesh(x,gt({
ink:I,fill:q,side:q?w.DoubleSide:w.FrontSide
}
)),a=(x,I,q,K,N,$,G={

}
)=>t.addBox({
x:x-K/2,y:I,z:q-$/2
}
,{
x:x+K/2,y:I+N,z:q+$/2
}
,{
noNav:!!G.noNav,noShoot:!!G.noShoot,noGrapple:!!G.noGrapple,tag:G.tag
}
);
function l(x,I,q,K,N,$,G={

}
){
let Y=new w.BoxGeometry(K,N,$);
Y.translate(x,I+N/2,q),i(Y,G.ink??k.BLUE,!!G.fill),G.noCollide||a(x,I,q,K,N,$,G)
}
let r=(x,I,q,K,N,$,G={

}
)=>l((x+q)/2,N-$,(I+K)/2,q-x,$,K-I,G);
function c(x,I,q,K){
let N=new Set([x,I]);
for(let X of K)N.add(Math.min(Math.max(X[0],x),I)),N.add(Math.min(Math.max(X[1],x),I));
let $=[...N].sort((X,at)=>X-at),G=new Map,Y=[];
for(let X=0;
X<$.length-1;
X++){
let at=$[X],dt=$[X+1];
if(dt-at<.005)continue;
let R=(at+dt)/2,j=K.filter(et=>et[0]<=R&&et[1]>=R).map(et=>[et[2]??0,et[3]??q]).sort((et,xt)=>et[0]-xt[0]),W=[],U=0;
for(let[et,xt]of j)et>U+.005&&W.push([U,et]),U=Math.max(U,xt);
U<q-.005&&W.push([U,q]);
let kt=new Set;
for(let[et,xt]of W){
let Mt=et.toFixed(3)+","+xt.toFixed(3);
kt.add(Mt);
let jt=G.get(Mt);
jt&&Math.abs(jt[1]-at)<.005?jt[1]=dt:G.set(Mt,[at,dt,et,xt])
}
for(let[et,xt]of[...G])kt.has(et)||(Y.push(xt),G.delete(et))
}
for(let X of G.values())Y.push(X);
return Y
}
function h(x,I,q,K,N,$,G=[],Y={

}
){
for(let[X,at,dt,R]of c(x,I,N,G))l((X+at)/2,K+dt,q,at-X,R-dt,$,Y)
}
function d(x,I,q,K,N,$,G=[],Y={

}
){
for(let[X,at,dt,R]of c(x,I,N,G))l(q,K+dt,(X+at)/2,$,R-dt,at-X,Y)
}
function f(x,I,q,K,N,$,G={

}
){
let Y=G.rise??.2857142857142857,X=G.run??.45,at=K==="+x"?1:K==="-x"?-1:0,dt=K==="+z"?1:K==="-z"?-1:0;
for(let R=0;
R<N;
R++){
let j=(R+.5)*X,W=(R+1)*Y,U=x+at*j,kt=q+dt*j;
l(U,I,kt,at?X+.004:$,W,dt?X+.004:$,G)
}
return{
x:x+at*N*X,z:q+dt*N*X,y:I+N*Y
}

}
function g(x,I,q,K,N,$={

}
){
let G=Math.hypot(q-x,K-I),Y=Math.abs(q-x)>Math.abs(K-I),X=(x+q)/2,at=(I+K)/2;
l(X,N+.9,at,Y?G:.12,.12,Y?.12:G,{
noCollide:!0,ink:$.ink
}
);
let dt=Math.max(1,Math.round(G/2));
for(let R=0;
R<=dt;
R++){
let j=R/dt;
l(x+(q-x)*j,N,I+(K-I)*j,.1,.9,.1,{
noCollide:!0,ink:$.ink
}
)
}
a(X,N,at,Y?G:.12,1,Y?.12:G,{
noNav:!0,noShoot:!0
}
)
}
function v(x,I,q,K,N,$={

}
){
let G=new w.CylinderGeometry(K,K,N,$.seg??12);
G.translate(x,I+N/2,q),i(G,$.ink??k.BLUE),$.noCollide||a(x,I,q,K*1.6,N,K*1.6,$)
}
function T(x,I,q,K,N={

}
){
let $=new w.SphereGeometry(K,N.seg??10,N.seg??8);
$.translate(x,I,q),i($,N.ink??k.BLUE)
}
function M(x,I,q,K="z"){
let N=new w.TorusGeometry(.6,.1,8,20);
K==="x"?N.rotateY(Math.PI/2):K==="y"&&N.rotateX(Math.PI/2),N.translate(x,I,q),i(N,k.ORANGE),s.rings.push(new w.Vector3(x,I,q))
}
let O=(x,I,q)=>s.spawns.push(new w.Vector3(x,I,q)),b=(x,I,q)=>s.snipers.push(new w.Vector3(x,I,q)),S=(x,I,q)=>s.pickups.push(new w.Vector3(x,I,q));
function L(){
for(let x in e){
let I=x.endsWith("f"),q=Dn(e[x],!1),K=new w.Mesh(q,gt({
ink:parseInt(x,10),fill:I,side:I?w.DoubleSide:w.FrontSide
}
));
K.matrixAutoUpdate=!1,n.add(K),s.meshes.push(K)
}
return t.finalize(),s
}
function V(x,I,q,K={

}
){
let N=K.scale||1;
for(let $=0;
$<x;
$++){
let G=new w.ConeGeometry(1.2*N,4*N,3);
G.rotateX(Math.PI/2);
let Y=new w.Mesh(G,gt({
ink:K.ink??k.BLUE
}
));
n.add(Y),s.meshes.push(Y),s.grappleMovers.push({
mesh:Y,radius:2.2*N
}
);
let X=I+$*(K.rStep??12),at=q+$*(K.hStep??6),dt=$*2.1,R=(K.speed??.11)+$*.01;
s.animated.push({
mesh:Y,update:j=>{
let W=j*R+dt;
Y.position.set(Math.cos(W)*X,at+Math.sin(W*2.3)*3,Math.sin(W)*X*.7),Y.lookAt(Math.cos(W+.05)*X,at+Math.sin((W+.05)*2.3)*3,Math.sin(W+.05)*X*.7),Y.rotateZ(Math.sin(W*3)*.6)
}

}
)
}

}
function P(x,I,q,K,N,$,G={

}
){
let Y=new w.Group;
$(Y),Y.position.set(I,q+N.y,K),Y.rotation.y=G.yaw||0,n.add(Y),s.meshes.push(Y),s.props.push({
kind:x,group:Y,half:{
...N
}
,mass:G.mass??1,snap:G.snap||"cube",ink:G.ink??k.BLUE,radius:G.radius,footHalf:G.footHalf,start:{
x:I,y:q,z:K,yaw:G.yaw||0
}

}
)
}
function Z(x,I,q,K,N,$,G,Y,X={

}
){
let at=new w.Group;
Y(at),at.position.set(I,q,K),n.add(at),s.meshes.push(at);
let dt={
id:s.breakables.length,kind:x,group:at,hp:X.hp??1,pos:new w.Vector3(I,q+$/2,K),alive:!0,ink:X.ink??k.ORANGE,box:null
}
;
return dt.box=a(I,q,K,N,$,G,{
noNav:!0
}
),dt.box.data.breakable=dt,s.breakables.push(dt),dt
}
function it(x,I,q,K={

}
){
let N=K.scale||1;
for(let $=0;
$<x;
$++){
let G=new w.Group,Y=K.ink??k.BLACK;
G.add(o(new w.SphereGeometry(.5*N,8,6).scale(1,.8,1.7),Y),o(new w.ConeGeometry(.2*N,.9*N,5).rotateX(Math.PI/2).translate(0,.05*N,1.2*N),k.ORANGE)),G.add(o(new w.BoxGeometry(.5*N,.5*N,1*N).translate(0,.25*N,-1.1*N),$%2?k.PINK:k.GREEN));
let X=o(new w.BoxGeometry(2.3*N,.08*N,.9*N).translate(1.15*N,0,0),Y),at=o(new w.BoxGeometry(2.3*N,.08*N,.9*N).translate(-1.15*N,0,0),Y);
X.position.x=.3*N,at.position.x=-.3*N,G.add(X,at),n.add(G),s.meshes.push(G),s.grappleMovers.push({
mesh:G,radius:1.9*N
}
);
let dt=I+$*(K.rStep??10),R=q+$*(K.hStep??5),j=$*1.9,W=(K.speed??.1)+$*.012,U=$%2?-1:1;
s.animated.push({
mesh:G,update:kt=>{
let et=U*kt*W+j,xt=et+U*.05;
G.position.set(Math.cos(et)*dt,R+Math.sin(et*1.7)*2.5,Math.sin(et)*dt*.8),G.lookAt(Math.cos(xt)*dt,R+Math.sin(xt*1.7)*2.5,Math.sin(xt)*dt*.8);
let Mt=Math.sin(kt*7+j)*.55;
X.rotation.z=Mt,at.rotation.z=-Mt
}

}
)
}

}
return{
L:s,addGeo:i,collider:a,box:l,slab:r,wallX:h,wallZ:d,stairs:f,rail:g,cyl:v,sphere:T,ring:M,spawn:O,sniper:b,pickup:S,finish:L,planes:V,birds:it,prop:P,breakable:Z,mesh:o,scene:n,world:t
}

}
