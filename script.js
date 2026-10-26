(function(){
  /* Tema claro / oscuro */
  var root=document.documentElement,tbtn=document.getElementById("theme"),
      dark=window.matchMedia("(prefers-color-scheme:dark)"),TKEY="bear-theme";
  function saved(){try{var v=localStorage.getItem(TKEY);return v==="dark"||v==="light"?v:null}catch(e){return null}}
  function setTheme(t,persist){
    root.setAttribute("data-theme",t);
    tbtn.setAttribute("aria-label",t==="dark"?"Cambiar a modo claro":"Cambiar a modo oscuro");
    if(persist){try{localStorage.setItem(TKEY,t)}catch(e){}}
  }
  setTheme(saved()||(dark.matches?"dark":"light"),false);
  tbtn.addEventListener("click",function(){setTheme(root.getAttribute("data-theme")==="dark"?"light":"dark",true)});
  dark.addEventListener("change",function(e){if(!saved())setTheme(e.matches?"dark":"light",false)});

  /* Horarios */
  var H=[["Domingo",8,14],["Lunes",7,20],["Martes",7,20],["Miércoles",7,20],["Jueves",7,20],["Viernes",7,20],["Sábado",7,20]];
  var now=new Date(),t=H[now.getDay()],hr=now.getHours()+now.getMinutes()/60,st=document.getElementById("status");
  var open=hr>=t[1]&&hr<t[2];
  st.className="status"+(open?" open":"");
  st.querySelector("span").textContent=open?"Abierto ahora, hasta las "+t[2]+":00":"Cerrado ahora. Hoy abrimos de "+t[1]+":00 a "+t[2]+":00";
  document.getElementById("hours").innerHTML=H.slice(1).concat(H.slice(0,1)).map(function(x){
    return '<tr'+(x===t?' class="today"':'')+'><td>'+x[0]+'</td><td>'+x[1]+':00 a '+x[2]+':00</td></tr>';
  }).join("");

  /* Menú */
  var M={
    "Café":[["Espresso","Doble, grano de la casa",12],["Cortado","Con leche texturizada",15],["Flat white","Doble shot, textura sedosa",22],["Capuchino","Con espuma densa",20]],
    "Frío":[["Cold brew","Infusionado 18 horas",24],["Tereré de la casa","Con yuyos y limón",10],["Café tonic","Espresso, tónica y naranja",26]],
    "Para comer":[["Medialuna","De manteca, tibia",8],["Tostado de jamón y queso","Pan de masa madre",28],["Tostón de palta","Con huevo y semillas",32],["Budín del día","Preguntá cuál salió hoy",14]]
  };
  var tabs=document.querySelector(".tabs"),items=document.getElementById("items");
  function gs(n){return "Gs. "+(n*1000).toLocaleString("es-PY")}
  function show(c){
    items.innerHTML=M[c].map(function(x){return '<div class="it"><div><b>'+x[0]+'</b><span>'+x[1]+'</span></div><em>'+gs(x[2])+'</em></div>'}).join("");
    tabs.querySelectorAll("button").forEach(function(b){b.setAttribute("aria-selected",b.textContent===c)});
  }
  Object.keys(M).forEach(function(c){
    var b=document.createElement("button");b.type="button";b.setAttribute("role","tab");b.textContent=c;
    b.onclick=function(){show(c)};tabs.appendChild(b);
  });
  show("Café");

  /* Reseñas */
  var KEY="bear-reviews-v1";
  var seed=[
    {n:"Lucía M.",s:5,t:"El flat white es el mejor que probé en la ciudad. Y las medialunas, todavía tibias."},
    {n:"Carlos R.",s:5,t:"Ideal para trabajar un rato: buen wifi, música tranquila y nadie te apura."},
    {n:"Andrea P.",s:4,t:"El tostón de palta es enorme. Conviene ir temprano porque se llena.",m:"Más mesas para grupos."},
    {n:"Julián B.",s:5,t:"Pedí el cold brew y me volvió la fe en el café frío. Se nota que lo preparan con cariño."},
    {n:"Marta G.",s:5,t:"Vine por el budín y me quedé toda la tarde. La atención es súper amable."},
    {n:"Diego F.",s:4,t:"Muy buen espresso, el grano tiene un dulzor que no encontraba por acá.",m:"Abrir un poco más tarde los domingos."},
    {n:"Sofía A.",s:5,t:"Vengo con mi mamá cada sábado. El lugar es luminoso y las medialunas, un sueño."},
    {n:"Tomás V.",s:3,t:"El café es excelente, pero un sábado a la mañana tuve que esperar bastante por una mesa.",m:"Un sistema de reservas o lista de espera."}
  ];
  var list=document.getElementById("list"),msg=document.getElementById("msg");
  function load(){try{var a=JSON.parse(localStorage.getItem(KEY));if(Array.isArray(a))return a}catch(e){}return []}
  function save(a){try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}}
  function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt)e.textContent=txt;return e}
  function render(){
    var all=load().concat(seed),sum=0,c=[0,0,0,0,0,0];
    list.textContent="";
    all.forEach(function(r){
      sum+=r.s;c[r.s]++;
      var a=el("article"),s=el("div","stars","★".repeat(r.s)+"☆".repeat(5-r.s));
      s.setAttribute("aria-label",r.s+" de 5 estrellas");
      a.append(s,el("p","",r.t));
      if(r.m)a.appendChild(el("p","sug","Sugerencia: "+r.m));
      a.appendChild(el("small","",r.n));
      list.appendChild(a);
    });
    var avg=document.getElementById("avg");avg.textContent="";
    avg.append((sum/all.length).toFixed(1).replace(".",","),el("small","",all.length+" reseñas"));
    document.getElementById("bars").innerHTML=[5,4,3,2,1].map(function(n){
      return '<div class="bar"><span>'+n+'</span><div><i style="width:'+(c[n]/all.length*100)+'%"></i></div></div>';
    }).join("");
  }
  document.getElementById("form").addEventListener("submit",function(e){
    e.preventDefault();
    var n=document.getElementById("name").value.trim(),t=document.getElementById("text").value.trim(),
        c=document.querySelector('input[name="s"]:checked');
    if(!n||!t||!c){msg.textContent="Falta tu nombre, la puntuación o el comentario.";return}
    var m=document.getElementById("sug").value.trim(),a=load();
    a.unshift({n:n,s:+c.value,t:t,m:m});save(a);
    this.reset();render();list.scrollTo({left:0,behavior:"auto"});sync();
    msg.textContent="Gracias, tu reseña ya está publicada. Es la primera del carrusel.";
  });

  /* Carrusel */
  var prev=document.getElementById("prev"),next=document.getElementById("next"),pos=document.getElementById("pos");
  var calm=window.matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth";
  function step(){var s=list.children[0];return s?s.getBoundingClientRect().width+parseFloat(getComputedStyle(list).columnGap||0):0}
  function sync(){
    var n=list.children.length,max=list.scrollWidth-list.clientWidth,i=Math.round(list.scrollLeft/(step()||1))+1;
    prev.disabled=list.scrollLeft<=2;next.disabled=list.scrollLeft>=max-2;
    pos.textContent=n?Math.min(i,n)+" de "+n:"";
  }
  prev.onclick=function(){list.scrollBy({left:-step(),behavior:calm})};
  next.onclick=function(){list.scrollBy({left:step(),behavior:calm})};
  list.addEventListener("scroll",sync,{passive:true});
  window.addEventListener("resize",sync);
  list.addEventListener("keydown",function(e){
    if(e.key==="ArrowRight"){e.preventDefault();next.click()}
    if(e.key==="ArrowLeft"){e.preventDefault();prev.click()}
  });
  /* Avance automático (se detiene con mouse, foco o toque; no corre con movimiento reducido) */
  var region=list.parentNode,timer=null,hold=false;
  var reduce=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  function auto(){
    clearInterval(timer);timer=null;
    if(reduce||hold)return;
    timer=setInterval(function(){
      if(next.disabled)list.scrollTo({left:0,behavior:calm});else list.scrollBy({left:step(),behavior:calm});
    },2800);
  }
  region.addEventListener("mouseenter",function(){hold=true;auto()});
  region.addEventListener("mouseleave",function(){hold=false;auto()});
  region.addEventListener("focusin",function(){hold=true;auto()});
  region.addEventListener("focusout",function(){hold=false;auto()});
  list.addEventListener("touchstart",function(){hold=true;auto()},{passive:true});
  list.addEventListener("touchend",function(){setTimeout(function(){hold=false;auto()},4000)},{passive:true});
  prev.addEventListener("click",auto);next.addEventListener("click",auto);
  render();sync();auto();
})();
