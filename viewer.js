const projects = [
  {slug:"greenshop", name:"GreenShop", type:"Plant retail / Desktop & mobile", mode:"desktop", wash:"#dce5d4", file:"1p2z97fU9etGvrEJIxnJwO/GreenShop", description:"Follow a plant purchase from the storefront to the shopping cart.", screens:[
    ["Storefront","green-home","2-2","The storefront brings plant categories, prices and featured products into one view. Scroll the preview to explore the full page."],
    ["Product","green-product","10-244","The product page brings the plant image, purchase options and description together."],
    ["Cart","green-cart","11-1278","The cart groups line items and totals before checkout."]]},
  {slug:"ecommerce", name:"Ecommerce app", type:"Shopping / Mobile UI kit", mode:"mobile", wash:"#e9dcd3", file:"AkjQoN1Izge5vDFChitUBW/eCommerce-App-UI-Kit", description:"Three moments in the shopping flow, from the first visit to shipping.", screens:[
    ["Welcome","project-1","1-16994","The welcome screen gives the shopper a single starting action."],
    ["Checkout","shop-checkout","1-17482","Checkout brings the delivery address and order details into the same view."],
    ["Shipping","shop-shipping","1-17703","The shipping screen shows the next step after reviewing the order."]]},
  {slug:"dermatology", name:"Dermatology app", type:"Health services / Mobile UI kit", mode:"mobile",wash:"#dce4ed",file:"zvSJTEeMkjCEP2cqw96wZZ/Medical-Health-Mobile-App-Dermatology",description:"Explore the screens for choosing a doctor, scheduling a visit and finding the appointment again.", screens:[
    ["Doctor profile","project-2","14-224","The profile pairs a doctor’s specialty with the action to book a visit."],
    ["Schedule","health-schedule","13-752","The scheduling view presents the date and time choices."],
    ["Appointments","health-visits","15-791","Upcoming appointments have a separate view from cancelled and completed visits."]]},
  {slug:"starbucks",name:"Starbucks redesign",type:"Coffee retail / Mobile app concept",mode:"pair",wash:"#d6e1da",file:"AxBU10zkY3jAuTu1gUB0gn/REDESIGN-STARBUCKS-MOBILE-APP",description:"A redesign concept for browsing the coffee menu, placing an order and checking rewards.",screens:[
    ["Home","project-3","222-952","Two home views show how the menu fits into the mobile layout."],
    ["Order","coffee-order","212-1387","The order views show the steps for choosing a drink."],
    ["Rewards","coffee-rewards","207-1025","The rewards views sit alongside the ordering flow in the Figma file."]]}
];
const byId = id => document.getElementById(id);
const zoom = byId("zoom");
let active = 0;
let frame = 0;

function choose(projectIndex, screenIndex) {
  const slug = projects[projectIndex].slug;
  history.pushState(null,"","#p/"+slug+"/"+(screenIndex+1));
  render(projectIndex,screenIndex);
}
function button(label, selected, onClick) {
  const el = document.createElement("button");
  el.type = "button";
  el.textContent = label;
  el.setAttribute("aria-pressed",String(selected));
  el.addEventListener("click",onClick);
  return el;
}
projects.forEach((p,i)=>{
  const el = button(p.name,i===0,()=>choose(i,0));
  const arrow = document.createElement("span");
  arrow.textContent="↗"; arrow.setAttribute("aria-hidden","true");
  const name = document.createElement("span"); name.textContent=p.name;
  el.replaceChildren(name,arrow); byId("projects").append(el);
});
function render(i,n) {
  active=i; frame=n;
  const p=projects[i], [label,img,node,note]=p.screens[n];
  const priorScreenFocus=byId("screens").contains(document.activeElement);
  byId("title").textContent=p.name; byId("medium").textContent=p.type;
  byId("description").textContent=p.description;
  byId("fig").href="https://www.figma.com/design/"+p.file+"?node-id="+node;
  byId("fig").setAttribute("aria-label","Open "+p.name+" — "+label+" in Figma (new tab)");
  byId("stage").className="stage "+p.mode; byId("stage").style.setProperty("--wash",p.wash);
  byId("screen").src="screens/"+img+".webp"; byId("screen").alt=p.name+" — "+label+" interface";
  byId("viewport").scrollTop=0; byId("note").textContent=note;
  byId("count").textContent=(n+1)+" / "+p.screens.length;
  [...byId("projects").children].forEach((el,index)=>el.setAttribute("aria-pressed",String(index===i)));
  byId("screens").replaceChildren(...p.screens.map(([name],j)=>button(name,j===n,()=>choose(i,j))));
  if(priorScreenFocus) byId("screens").children[n].focus({preventScroll:true});
}
function fromUrl() {
  const parts=location.hash.slice(1).split("/");
  if(parts[0]!=="p") {render(active,frame);return;}
  const index=projects.findIndex(p=>p.slug===parts[1]);
  if(index<0){render(0,0);return;}
  const n=Number(parts[2])-1;
  render(index,Number.isInteger(n)&&n>=0&&n<projects[index].screens.length?n:0);
}
byId("expand").addEventListener("click",()=>{
  byId("zoom-title").textContent=projects[active].name+" / "+projects[active].screens[frame][0];
  byId("large").src=byId("screen").src; byId("large").alt=byId("screen").alt;
  zoom.showModal(); zoom.scrollTop=0;
});
byId("close").addEventListener("click",()=>zoom.close());
zoom.addEventListener("click",e=>{if(e.target===zoom)zoom.close();});
window.addEventListener("hashchange",fromUrl);
fromUrl();

