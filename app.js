/* =============================================================
   ARYTMI v4 — Fra idé til afsted
   Forbered tur → 6 sektioner → af sted → anmeld.
   Prototype: mail/notifikationer/vejr simuleres, solnedgang er ægte.
   ============================================================= */

const GEM = 'arytmi-v4';

/* ---------- ikoner ---------- */
const IKONER = {
  hjem:   '<path d="M4.5 11.5 12 4.5l7.5 7v7.3a1.2 1.2 0 0 1-1.2 1.2H14v-5.5h-4V20H5.7a1.2 1.2 0 0 1-1.2-1.2Z"/>',
  bog:    '<path d="M12 6.5C10 5 7.2 4.8 5 5.6V18c2.2-.8 5-.6 7 .9 2-1.5 4.8-1.7 7-.9V5.6c-2.2-.8-5-.6-7 .9Z"/><path d="M12 6.5V19" opacity=".55"/>',
  person: '<circle cx="12" cy="8.2" r="3.7"/><path d="M4.8 19.5c.8-3.9 3.8-6 7.2-6s6.4 2.1 7.2 6"/>',
  bil:    '<path d="M4 15.5v-2.2c0-.8.4-1.5 1.1-1.9l1.4-2.9A2 2 0 0 1 8.3 7.4h5.9c.7 0 1.4.4 1.8 1l2 2.9 1.5.6c.5.3.9.9.9 1.5v2.1a1 1 0 0 1-1 1h-1"/><circle cx="8" cy="16.4" r="1.8"/><circle cx="16.4" cy="16.4" r="1.8"/><path d="M9.8 16.4h4.8"/>',
  måne:   '<path d="M19 13.5A7.5 7.5 0 0 1 10.5 5 7.5 7.5 0 1 0 19 13.5Z"/>',
  sol:    '<circle cx="12" cy="12" r="4"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18"/>',
  blad:   '<path d="M6 18C6 10 10.5 5.5 19 5c.5 8.5-4 13-12 13"/><path d="M6 18c2.5-5 6-8.5 10-10.5" opacity=".55"/>',
  nål:    '<path d="M12 20.5s6.5-5.7 6.5-10.5a6.5 6.5 0 1 0-13 0c0 4.8 6.5 10.5 6.5 10.5Z"/><circle cx="12" cy="9.8" r="2.3"/>',
  kop:    '<path d="M5.5 9h11v6a4.5 4.5 0 0 1-4.5 4.5H10A4.5 4.5 0 0 1 5.5 15Z"/><path d="M16.5 10.5h1.3a2.2 2.2 0 0 1 0 4.4h-1.5"/><path d="M8.5 5.5c0 1-1 1.2-1 2.2M12 5.5c0 1-1 1.2-1 2.2" opacity=".6"/>',
  gnist:  '<path d="M12 4c.6 3.8 2.5 5.9 6.5 6.5-4 .6-5.9 2.7-6.5 6.5-.6-3.8-2.5-5.9-6.5-6.5C9.5 9.9 11.4 7.8 12 4Z"/>',
  hjerte: '<path d="M12 19.5S4.5 14.8 4.5 9.6A4 4 0 0 1 12 7.5a4 4 0 0 1 7.5 2.1c0 5.2-7.5 9.9-7.5 9.9Z"/>',
  pil:    '<path d="M5 12h13m-5.5-5.5L18 12l-5.5 5.5"/>',
  tilbage:'<path d="M19 12H6m5.5 5.5L6 12l5.5-5.5"/>',
  plus:   '<path d="M12 5.5v13M5.5 12h13"/>',
  tjek:   '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  kryds:  '<path d="m7 7 10 10M17 7 7 17"/>',
  lås:    '<rect x="6" y="10.5" width="12" height="9" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  gave:   '<rect x="4.5" y="10" width="15" height="10" rx="1.5"/><path d="M12 10v10M4.5 13.5h15" opacity=".5"/><path d="M12 10V7.8M12 7.8c-1.2-3.6-6-3.3-5 .2h5Zm0 0c1.2-3.6 6-3.3 5 .2h-5Z"/>',
  klokke: '<path d="M12 4.5a5.5 5.5 0 0 1 5.5 5.5c0 4 1.5 5.2 2 5.8H4.5c.5-.6 2-1.8 2-5.8A5.5 5.5 0 0 1 12 4.5Z"/><path d="M10 18.8a2 2 0 0 0 4 0"/>',
  mail:   '<rect x="4" y="6" width="16" height="12.5" rx="2.5"/><path d="m5 8 7 5.5L19 8"/>',
  kort:   '<path d="m9 5-4.5 2v12L9 17l6 2 4.5-2V5L15 7Z"/><path d="M9 5v12M15 7v12" opacity=".5"/>',
  vind:   '<path d="M4 9.5h9.5a2.5 2.5 0 1 0-2.4-3.2M4 14h13a2.6 2.6 0 1 1-2.5 3.3" opacity=".9"/>',
  sne:    '<path d="M12 4v16M5.1 8l13.8 8M18.9 8 5.1 16" stroke-width="1.4"/>',
  telt:   '<path d="M12 5 3.5 19h17Z"/><path d="M12 11.5 8.5 19h7Z" opacity=".55"/>',
  stjerne:'<path d="m12 4 2.1 4.9 5.3.5-4 3.6 1.2 5.2L12 15.4 7.4 18.2l1.2-5.2-4-3.6 5.3-.5Z"/>',
  toilet: '<path d="M8 4.5h8v6a4 4 0 0 1-4 4 4 4 0 0 1-4-4Z"/><path d="M12 14.5v5M9.5 19.5h5"/>',
  kurv:   '<path d="m5 9 2-4.5h10L19 9M5 9h14l-1.3 9.4a1.5 1.5 0 0 1-1.5 1.3H7.8a1.5 1.5 0 0 1-1.5-1.3Z"/><path d="M10 12.5v3.5M14 12.5v3.5" opacity=".6"/>',
  gaffel: '<path d="M7.5 4.5v5.2a2 2 0 0 0 2 2v7.8M9.5 4.5v5M11.5 4.5v5.2M16.5 4.5c-1.7.8-2.5 2.4-2.5 4.5v3h2.5v7.5"/>',
  croissant:'<path d="M5 14c1.5-4.5 5-8 9.5-8 2.6 0 4.5 1.6 4.5 4 0 4.5-4 8.5-9 9.5-2.8.5-5-.8-5-3 0-1 .4-1.9 1.3-2.7"/><path d="M9.5 17.5 7 20M15.5 14.5 18 17" opacity=".6"/>',
  gps:    '<circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="2"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21"/>',
  lyn:    '<path d="M13 3.5 5.5 13.5H11L10 20.5 18.5 10H13Z"/>',
  vand:   '<path d="M3 8.5c2-2 3.5-2 5.5 0s3.5 2 5.5 0 3.5-2 5.5 0M3 13.5c2-2 3.5-2 5.5 0s3.5 2 5.5 0 3.5-2 5.5 0M3 18.5c2-2 3.5-2 5.5 0s3.5 2 5.5 0 3.5-2 5.5 0"/>',
  skov:   '<path d="M8 4 3.5 12h9ZM8 8.5 4.5 14h7ZM8 14v6"/><path d="M16.5 5.5 13 12h7ZM16.5 14v6" opacity=".85"/>',
  folk:   '<circle cx="9" cy="8" r="3"/><path d="M3.5 19c.6-3.3 2.9-5 5.5-5s4.9 1.7 5.5 5"/><circle cx="17" cy="8.5" r="2.4" opacity=".7"/><path d="M15 13.6c2 .2 3.6 1.7 4.1 4.4" opacity=".7"/>',
  solop:  '<circle cx="12" cy="15" r="3.4"/><path d="M12 6v3M6.5 15H4M20 15h-2.5M7.4 10.4 6 9M18 9l-1.4 1.4M3 19.5h18M8.5 5.5 12 2l3.5 3.5" opacity=".9"/>',
  ur:     '<circle cx="12" cy="12" r="8"/><path d="M12 8v4.5l3 2"/>'
};
function ik(navn, kls){ return `<svg class="ik ${kls||''}" viewBox="0 0 24 24">${IKONER[navn]||''}</svg>`; }

/* ---------- brand ---------- */
let harLogo = false;
(function(){
  const test = new Image();
  test.onload = ()=>{ harLogo = true; tegn(); };
  test.src = 'logo.png';
})();
const EKG_KURVE = 'M0 14 H34 L40 7 L46 19 L52 2 L58 21 L63 10 L67 14 H140';
function ekgSVG(farve){
  return `<svg class="ekg" viewBox="0 0 140 22" preserveAspectRatio="none">
    <path d="${EKG_KURVE}"
      fill="none" stroke="${farve||'var(--rav-lys)'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}
/* Samme kurve som i logoet, men beskåret om selve udslaget (x 18→84), så den
   fylder cirklen på hovedknappen. Ingen nye streger — kun et andet udsnit. */
function pulsIKnap(){
  return `<svg class="rk-puls" viewBox="18 0 66 22">
    <path d="${EKG_KURVE}" fill="none" stroke="var(--gran)" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}
/* Logoet kommer direkte fra den godkendte logopakke. */
function ordmærke(lys, medSlogan){
  const fil = lys
    ? 'brand/arytmi_logopakke_endelig/logo/arytmi_reversed_1200.png'
    : 'brand/arytmi_logopakke_endelig/logo/arytmi_transparent_1200.png';
  return `<span class="brand-lockup"><img class="logo-svg" src="${fil}" alt="ARYTMI">${medSlogan?'<span class="brand-tag">vælg mindre, oplev mere</span>':''}</span>`;
}
function logoSVG(lys){ return ordmærke(lys, false); }

/* =============================================================
   DATA
   ============================================================= */

/* -- byer til søgning (kort-koordinater i 210×244-viewBox) -- */
const BYER = [
  {n:'København',x:178,y:158},{n:'Aarhus',x:92,y:120},{n:'Odense',x:126,y:172},
  {n:'Aalborg',x:74,y:52},{n:'Esbjerg',x:48,y:152},{n:'Vejle',x:74,y:146},
  {n:'Randers',x:84,y:96},{n:'Kolding',x:72,y:158},{n:'Horsens',x:80,y:132},
  {n:'Silkeborg',x:70,y:120},{n:'Herning',x:56,y:112},{n:'Viborg',x:68,y:96},
  {n:'Skagen',x:80,y:14},{n:'Hvide Sande',x:44,y:118},{n:'Blåvand',x:40,y:150},
  {n:'Sønderborg',x:80,y:200},{n:'Thisted',x:48,y:58},{n:'Holstebro',x:50,y:98},
  {n:'Helsingør',x:182,y:140},{n:'Roskilde',x:168,y:160},{n:'Ebeltoft',x:102,y:112},
  {n:'Grenaa',x:104,y:100},{n:'Nykøbing F',x:168,y:205},{n:'Rønne',x:197,y:120},
  {n:'Frederikshavn',x:84,y:32}
];

/* -- 10 testede destinationer (Køreklar basispakke). Nr. 1 er
      format-eksemplet — resten udfyldes af OD -- */
const TESTEDE = [
  { id:'t1', navn:'Vesterhavet — Hvide Sande Sydstrand', x:44, y:122, lat:55.905, lon:8.117, klar:true,
    kort:'Klitrækken syd for slusen. P-plads 40 m fra vandkanten.',
    beskrivelse:'Kør helt ud, hvor vejen ender. I parkerer med fronten mod vest, og solen går ned lige dér, hvor I sidder. Klitterne giver læ, og lyden af havet følger jer hele natten. Testet af os i både sommerstille og oktoberblæst — bilen står roligt begge dele.',
    faciliteter:{
      toilet:'Offentligt toilet ved slusen, 600 m (åbent hele døgnet)',
      handel:'SuperBrugsen Hvide Sande, 1,2 km (8–20)',
      aftensmad:'Fiskehuset ved havnen — stjerneskud og fiskefrikadeller (11–19:30)',
      morgen:'Hvide Sande Bageri, 900 m — åbner 6:30, kaffen er klar fra start' } },
  { id:'t2', navn:'Destination 2', x:98, y:118, klar:false },
  { id:'t3', navn:'Destination 3', x:70, y:80, klar:false },
  { id:'t4', navn:'Destination 4', x:150, y:150, klar:false },
  { id:'t5', navn:'Destination 5', x:80, y:20, klar:false },
  { id:'t6', navn:'Destination 6', x:120, y:180, klar:false },
  { id:'t7', navn:'Destination 7', x:180, y:145, klar:false },
  { id:'t8', navn:'Destination 8', x:56, y:140, klar:false },
  { id:'t9', navn:'Destination 9', x:100, y:60, klar:false },
  { id:'t10', navn:'Destination 10', x:165, y:195, klar:false }
];

/* -- 50 aktiviteter (Køreklar basispakke). 5 eksempler — resten OD -- */
const AKTIVITET_GRUPPER = [
  { navn:'Ved ankomst', under:'Når I lige er kommet frem', ikon:'sol', eksempler:[
    { id:'solnedgang', navn:'Se solen gå ned — telefoner i handskerummet', type:'solnedgang' },
    { id:'kaffebar',   navn:'Byg jeres kaffebar på bagklappen',            type:'guide' }
  ], antalOD:8 },
  { navn:'Om aftenen', under:'Når mørket falder på', ikon:'måne', eksempler:[
    { id:'hoejtlaesning', navn:'Læs højt for hinanden — ét kapitel hver',        type:'guide' },
    { id:'spoergsmaal',   navn:'20 spørgsmål: ting, I aldrig har fået spurgt om', type:'guide' }
  ], antalOD:14 },
  { navn:'Om morgenen', under:'Den langsomme morgen', ikon:'kop', eksempler:[
    { id:'morgenbad', navn:'Morgenbad — uanset temperatur. I fortryder det aldrig', type:'guide' }
  ], antalOD:11 },
  { navn:'Undervejs', under:'På køreturen derhen', ikon:'bil', eksempler:[], antalOD:12 }
];

/* -- Bilen: forberedelsesliste -- */
const BILEN_PUNKTER = [
  { id:'lade',   tekst:'Du skal lade', tip:'Planlæg så I ankommer med mindst 40 % — natten koster typisk 5–10 %.' },
  { id:'camp',   tekst:'Tjek at du kan indstille Camp Mode', tip:'Tip: bilen låses, så telefonen kan ligge i bilen, uden folk kan komme ind.' },
  { id:'madras', tekst:'Madras', taske:true },
  { id:'forlænger', tekst:'Madras-forlænger', taske:true },
  { id:'lagen',  tekst:'Lagen', tip:'Husk at vaske før brug.', taske:true },
  { id:'dyner',  tekst:'Dyner', taske:true },
  { id:'afskærm',tekst:'Afskærmning front', taske:true },
  { id:'vanddunk',tekst:'Lille vanddunk med taphane', tip:'Til tandbørstning og lign. (KN: kan den tilpasses bilen?)', taske:true },
  { id:'puder',  tekst:'Egne hovedpuder' }
];

/* -- Pakke: personlige ting -- */
const PAKKE_PUNKTER = [
  { id:'nattøj',  tekst:'Nattøj' },
  { id:'badetøj', tekst:'Badetøj eller lign. — afhængigt af destination' },
  { id:'toilettaske', tekst:'Lille toilettaske med det basale!' }
];

/* -- Mad/drikke: indlæg (ét eksempel, resten OD) -- */
const MAD_INDLÆG = {
  drikke: { titel:'Drikkevarer', ikon:'kop', klar:false },
  morgen: { titel:'Morgenmad og kaffe', ikon:'croissant', klar:true,
    brød:`
    <p class="citat">Morgenkaffen med udsigt er grunden til, at man tager af sted igen.</p>
    <h3>Kaffen</h3>
    <p>Kværn bønnerne hjemmefra, og brug en stempelkande eller pour-over — det eneste, I skal bruge, er varmt vand fra det lille blus. Termokanden fyldes, inden den første kop er drukket, så nummer to er lige så varm.</p>
    <h3>Opbevaring og køl</h3>
    <p>Mælk, smør og pålæg ligger i køleren natten over — den holder temperaturen til ud på formiddagen. Læg det, I skal bruge først, øverst, så låget kun er åbent få sekunder.</p>
    <div class="od-plads"><span class="od-mærke">Rabatkode-plads</span><br>Mulig rabatkode til køleren indsættes her (afventer aftale).</div>
    <h3>Brødet</h3>
    <p>Den bedste morgen starter ved den lokale bager — se "nærmeste bager" under jeres destination. Alternativt: rundstykker fra fryseren, pakket i sølvpapir aftenen før.</p>
    <div class="od-plads"><span class="od-mærke">Rabatkode-plads</span><br>Mulig national bager-aftale (rabatkode/tilbud) indsættes her.</div>` },
  aften: { titel:'Aftensmad', ikon:'gaffel', klar:false, ekstra:`
    <div class="od-plads"><span class="od-mærke">Rabatkode-plads</span><br>Muligt nationalt pizzeria-samarbejde (rabatkode) indsættes her.</div>` }
};

/* =============================================================
   STATE
   ============================================================= */
function friskState(){
  return {
    onboarded:false,
    profil:{ email:'kennet@justsecure.dk', kode:'', notifikationer:null },
    forberedelse:null,   // {destination:{navn,x,y,testetId?}, bilTjek:[], pakkeTjek:[], set:{aktivitet,mad,øjeblikke}, startet}
    påTur:null,          // {sted, startet}
    anmeldAfventer:null, // {sted, dato}
    ture:[]              // {sted,dato,score:{destination,app,hygge},kommentar}
  };
}
let s = indlæs();
function indlæs(){
  try{
    const gemt = localStorage.getItem(GEM);
    if(gemt) return JSON.parse(gemt);
    // migration: tag gamle ture med over fra v2/v3
    const v2 = localStorage.getItem('klar-app-v2');
    if(v2){
      const g = JSON.parse(v2);
      const ny = friskState();
      ny.ture = (g.ture||[]).map(t=>({
        sted:t.sted, dato:t.dato,
        score:{ destination:t.placering||0, app:0, hygge:t.komfort||0 },
        kommentar:t.huske||t.virkede||''
      }));
      return ny;
    }
  }catch(e){}
  return friskState();
}
function gem(){ localStorage.setItem(GEM, JSON.stringify(s)); }

/* ---------- hjælpere ---------- */
const $ = id => document.getElementById(id);
function esc(t){ const d=document.createElement('div'); d.textContent=t||''; return d.innerHTML; }
function flash(tekst, ikon){
  const f = $('flash');
  f.innerHTML = ik(ikon||'gnist') + `<span>${tekst}</span>`;
  f.classList.add('vis');
  clearTimeout(f._t); f._t = setTimeout(()=>f.classList.remove('vis'), 3000);
}
/* Egen bekræftelsesboks — window.confirm() kan blive blokeret i indlejrede
   previews (fx iframes/webviews), og ser under alle omstændigheder ikke ud
   som resten af appen. */
function bekræft(spørgsmål, handling){
  const gammel = document.getElementById('bekræft-modal');
  if(gammel) gammel.remove();
  const div = document.createElement('div');
  div.id = 'bekræft-modal';
  div.className = 'modal-bag';
  div.innerHTML = `
    <div class="modal-kort">
      <p>${spørgsmål}</p>
      <div class="modal-knapper">
        <button class="knap kontur bred" id="bekræft-nej">Fortryd</button>
        <button class="knap primær bred" id="bekræft-ja">Ja, gør det</button>
      </div>
    </div>`;
  document.body.appendChild(div);
  div.addEventListener('click', e=>{ if(e.target===div) div.remove(); });
  document.getElementById('bekræft-nej').onclick = () => div.remove();
  document.getElementById('bekræft-ja').onclick = () => { div.remove(); handling(); };
}
/* Køb-knapperne linker senere til den rigtige salgsfunnel — i prototypen er det et stub. */
function gåTilKøb(){
  flash('Kommer snart — her lander I i købsflowet.', 'kurv');
}
const MDR = ['januar','februar','marts','april','maj','juni','juli','august','september','oktober','november','december'];
const DAGE = ['søndag','mandag','tirsdag','onsdag','torsdag','fredag','lørdag'];
function pænDato(iso){
  if(!iso) return '';
  const d = new Date(iso+'T12:00:00');
  return `${DAGE[d.getDay()]} d. ${d.getDate()}. ${MDR[d.getMonth()]}`;
}

/* ---------- geometri: kort ↔ geografi ---------- */
const GEO = { latTop:57.9, latBund:54.4, lonV:7.9, lonØ:12.9, b:210, h:244 };
function xyTilGeo(x,y){
  return { lat: GEO.latTop-(y/GEO.h)*(GEO.latTop-GEO.latBund),
           lon: GEO.lonV+(x/GEO.b)*(GEO.lonØ-GEO.lonV) };
}
function geoTilXY(lat,lon){
  const x = (lon-GEO.lonV)/(GEO.lonØ-GEO.lonV)*GEO.b;
  const y = (GEO.latTop-lat)/(GEO.latTop-GEO.latBund)*GEO.h;
  return { x: Math.max(8,Math.min(202,x)), y: Math.max(10,Math.min(236,y)) };
}

/* ---------- ægte solnedgangsberegning (NOAA-forenklet) ---------- */
function solnedgang(lat, lon, dato){
  const rad = Math.PI/180;
  const start = new Date(Date.UTC(dato.getFullYear(),0,0));
  const dag = Math.floor((Date.UTC(dato.getFullYear(),dato.getMonth(),dato.getDate()) - start.getTime())/86400000);
  const lngHour = lon/15;
  const t = dag + ((18-lngHour)/24);
  const M = (0.9856*t) - 3.289;
  let L = M + (1.916*Math.sin(M*rad)) + (0.020*Math.sin(2*M*rad)) + 282.634;
  L = (L%360+360)%360;
  let RA = Math.atan(0.91764*Math.tan(L*rad))/rad;
  RA = (RA%360+360)%360;
  RA = (RA + (Math.floor(L/90)*90 - Math.floor(RA/90)*90))/15;
  const sinDec = 0.39782*Math.sin(L*rad);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH = (Math.cos(90.833*rad)-(sinDec*Math.sin(lat*rad)))/(cosDec*Math.cos(lat*rad));
  if(cosH>1 || cosH<-1) return null;   // midnatssol/polarnat — ikke i DK
  const H = (Math.acos(cosH)/rad)/15;
  const T = H + RA - (0.06571*t) - 6.622;
  let UT = (T - lngHour)%24; if(UT<0) UT += 24;
  const res = new Date(Date.UTC(dato.getFullYear(),dato.getMonth(),dato.getDate()));
  res.setUTCMinutes(Math.round(UT*60));
  return res;
}
function årstid(){
  const m = new Date().getMonth();
  return m>=2&&m<=4 ? 'forår' : m>=5&&m<=7 ? 'sommer' : m>=8&&m<=10 ? 'efterår' : 'vinter';
}
/* demo-vejr — deterministisk ud fra sted+dag, så det føles stabilt */
function demoVejr(x,y){
  const d = new Date();
  const seed = Math.abs(Math.round(x*7+y*13+d.getDate()*3)) % 10;
  const basis = [3,3,6,10,14,17,19,19,15,11,7,4][d.getMonth()];
  const temp = basis + (seed%5) - 1;
  const himmel = ['Skyfrit','Delvist skyfrit','Let skyet','Klart'][seed%4];
  const stjerneTime = 22 + (seed%2);
  return { temp, himmel, stjerneTime };
}

/* =============================================================
   FREMDRIFT — "5 ud af 16 mangler"
   ============================================================= */
function nyForberedelse(ekstra){
  return Object.assign({
    fase:1, spontan:false,
    dato:null, afgangstid:'', retur:'samme', returDato:null,
    startNavn:'', startXY:null, radius:2, oplevelser:{lys:null, natur:null, stemning:null},
    destination:null,
    aktiviteter:[], madValg:[],
    invType:null, invModtager:'', invAfsender:'', invStatus:null,
    invForslag:[], invForslagFra:null, invEnigDato:null,
    bilTjek:[], pakkeTjek:[],
    set:{aktivitet:false, mad:false, øjeblikke:false},
    startet:new Date().toISOString().slice(0,10)
  }, ekstra||{});
}
/* Fremdrift pr. fase: fase 1 = 4 planlægningspunkter, fase 2 = 12 ting at pakke */
function fremdrift(fase){
  const f = s.forberedelse;
  fase = fase || (f ? f.fase||1 : 1);
  if(fase===1){
    const total = SEKTIONER.filter(x=>x.fase===1).length; // 3
    if(!f) return { total, klaret:0, mangler:total, pct:0 };
    let klaret = f.destination ? 1 : 0;
    klaret += ['aktivitet','mad'].filter(k=>f.set[k]).length;
    return { total, klaret, mangler:total-klaret, pct:Math.round(klaret/total*100) };
  }
  const total = BILEN_PUNKTER.length + PAKKE_PUNKTER.length; // 12
  if(!f) return { total, klaret:0, mangler:total, pct:0 };
  const klaret = f.bilTjek.length + f.pakkeTjek.length;
  return { total, klaret, mangler:total-klaret, pct:Math.round(klaret/total*100) };
}
function sektionKlar(id){
  const f = s.forberedelse; if(!f) return false;
  switch(id){
    case 'destination': return !!f.destination;
    case 'bilen': return f.bilTjek.length >= BILEN_PUNKTER.length;
    case 'pakke': return f.pakkeTjek.length >= PAKKE_PUNKTER.length;
    default: return !!f.set[id];
  }
}
/* Guidet flow: hver fase er en RÆKKE af sider (destination→aktivitet→mad→øjeblikke,
   siden bilen→pakke) i stedet for en oversigt med bokse — man bladrer ligesom i en bog. */
function sektionListe(fase){ return SEKTIONER.filter(x=>x.fase===fase); }
function sektionPos(id){
  const sek = SEKTIONER.find(x=>x.id===id);
  const liste = sektionListe(sek.fase);
  return { sek, liste, idx: liste.findIndex(x=>x.id===id) };
}
/* Hvor brugeren skal lande, når "Fortsæt planen"/"Afslut forberedelsen" trykkes hjemmefra */
function nutidigSektion(){
  if(!s.forberedelse) return sektionListe(1)[0].id;
  const liste = sektionListe(s.forberedelse.fase||1);
  const uafsluttet = liste.find(x=>!sektionKlar(x.id));
  return (uafsluttet || liste[liste.length-1]).id;
}
/* Top af hver sektionsside: tilbage-pil til forrige side (eller forsiden, hvis første),
   overskrift som et spørgsmål, og prikker der viser hvor i rækken man er. */
function sektionHeader(id){
  const {sek, liste, idx} = sektionPos(id);
  const forrige = idx>0 ? liste[idx-1].id : 'hjem';
  const F = FASER[sek.fase];
  const prikker = liste.map((x,i)=>`<span class="sek-prik ${i===idx?'aktiv':''} ${sektionKlar(x.id)?'klaret':''}"></span>`).join('');
  return `<div class="skærm-top">
    <button class="tilbage" onclick="gåTil('${forrige}')">${ik('tilbage')}</button>
    <div><div class="etiket">${F.navn} · punkt ${idx+1} af ${liste.length}</div><h1 style="font-size:22px">${sek.spørg}</h1></div>
  </div>
  <div class="sek-prikker">${prikker}</div>`;
}
/* Kortet der fortæller, hvad der venter i næste trin */
/* Bund af hver sektionsside: to ens småknapper — Forrige og Næste — side om
   side, plus Annullér. Ensartet i hele flowet (ingen store "næste"-kort). */
function sektionFod(id){
  const {sek, liste, idx} = sektionPos(id);
  // Destinationssiden har kun ét formål: vælg et sted (på kortet eller en køreklar tur).
  // Før et sted er valgt, vises ingen bund-sektion — man kommer tilbage til forsiden via
  // tilbage-pilen, og en tom kladde huskes ikke (se turIGang / skærmHjem).
  if(id==='destination' && !sektionKlar('destination')) return '';
  const forrige = idx>0 ? liste[idx-1] : null;
  const næste = idx<liste.length-1 ? liste[idx+1] : null;

  // "Næste" = næste sektion. Fase 1 slutter ikke i et valg, men på den rolige
  // afrunding ("En sund forstyrrelse") — den er ikke et punkt, man skal klare.
  let næsteLabel, næsteAktion;
  if(næste){            næsteLabel = `Næste: ${næste.navn}`;   næsteAktion = `gåTil('${næste.id}')`; }
  else if(sek.fase===1){ næsteLabel = 'Planen er klar';        næsteAktion = "gåTil('øjeblikke')"; }
  else {                 næsteLabel = 'Af sted';               næsteAktion = 'afSted()'; }

  const forrigeKnap = forrige
    ? `<button class="knap kontur lille" onclick="gåTil('${forrige.id}')">${ik('tilbage')} Forrige: ${forrige.navn}</button>`
    : '';
  const næsteKnap = `<button class="knap kontur lille" onclick="${næsteAktion}">${næsteLabel} ${ik('pil')}</button>`;

  return `<div style="margin-top:18px">
    <div class="fod-nav">${forrigeKnap}${næsteKnap}</div>
    <div style="text-align:center;margin-top:16px"><button class="knap kontur lille" onclick="annullerForberedelse()">Annullér turen</button></div>
  </div>`;
}

/* =============================================================
   HERO-SCENEN (genbrugt fra v3)
   ============================================================= */
/* Scenen fra logoet, flyttet ned i landskabet: bilen set bagfra med
   åben bagklap, madras og de to der ligger og kigger ud. */
/* Bilen er ikke tegnet — det er den ægte illustration, klippet ud af
   logofilen (brand/klip-bilen-ud.py) og lagt ind i landskabet. */
function bilenMedParret(p, nat){
  const b = 201, h = Math.round(b*368/448);   // 50% større, originalens forhold bevares
  const x = -6, y = 400 - h;                  // står i forgrunden, fri af "FORBERED TUR"-labelen
  return `
  <g>
    <ellipse cx="${x+b/2}" cy="${y+h-3}" rx="${b*0.40}" ry="5.5" fill="#000" opacity=".3"/>
    <image href="bil.png" x="${x}" y="${y}" width="${b}" height="${h}"
      style="filter:brightness(${nat?.7:.86}) saturate(.92) contrast(1.04)"/>
    ${nat?`<circle cx="${x+b+6}" cy="${y+h-14}" r="2.8" fill="${p.sol}" opacity=".95"
      style="animation:blink 5s ease-in-out .6s infinite"/>`:''}
  </g>`;
}
function skærmHøjde(){
  return Math.max(600, Math.min(1200, Math.round(window.innerHeight||800)));
}
function heroScene(variant, H){
  // H = lærredets højde. 368 = båndet på undersider, høj værdi = fuldskærms-forside.
  H = H || 368;
  const off = H - 368;
  const lo = Math.round(off*.72);     // landskabet ned — men horisonten skal stadig ses
  const skyOff = Math.round(off*.16); // sol/måne holdes højt oppe på himlen, fri af overskriften
  const paletter = {
    klar:       { sky:['#4a4238','#7d7261','#cdb591'], sol:'#e8cfa3', b1:'#3e382c', b2:'#322d23', b3:'#26221a' },
    klarMorgen: { sky:['#5b584e','#98917d','#ddc9a4'], sol:'#f0dcb0', b1:'#4a4537', b2:'#3a362b', b3:'#2b2820' },
    klarDag:    { sky:['#a7ac8c','#d4d1ac','#f9f2d9'], sol:'#fff7dd', b1:'#6d7350', b2:'#585e3d', b3:'#42472e' },
    klarNat:    { sky:['#2b2a24','#454138','#77705d'], sol:'#e8d5ae', b1:'#2a2620', b2:'#1f1c17', b3:'#151310' },
    tur:        { sky:['#191a20','#2b2c33','#4d4a48'], sol:'#e9ddc2', b1:'#1c1c20', b2:'#141417', b3:'#0d0d0f' }
  };
  let nøgle = variant;
  if(variant==='klar'){
    const t = new Date().getHours();
    nøgle = (t>=5&&t<10) ? 'klarMorgen' : (t>=10&&t<17) ? 'klarDag' : (t>=17&&t<22) ? 'klar' : 'klarNat';
  }
  const p = paletter[nøgle]||paletter.klar;
  const nat = variant==='tur';
  const skumring = nøgle==='klar' || nøgle==='klarNat';
  const måne = nat || skumring;        // aften og nat: månen. morgen og dag: solen.
  const dybNat = nat || nøgle==='klarNat';
  const himmelX = 95;                  // flyttet væk fra midten, fri af både logo og tæller
  const blinkStjerner = dybNat ? `
    <g fill="#e9e3cf">
      ${[[60,38,1.5,0],[150,22,1.1,1.3],[240,45,1.4,.6],[330,20,1,2.1],[390,55,1.5,.9],[105,62,1,1.7],[290,70,1.1,.3],[200,52,1,2.5],[45,90,1.2,1.1],[370,110,1,.5]]
        .map(([x,y,r,d])=>`<circle cx="${x}" cy="${y}" r="${r}" style="animation:blink ${(3+d)}s ease-in-out ${d}s infinite"/>`).join('')}
    </g>` : `
    <g fill="#f2efe6" opacity=".35">
      <circle cx="70" cy="40" r="1" style="animation:blink 5s ease-in-out infinite"/>
      <circle cx="180" cy="26" r=".9" style="animation:blink 6s ease-in-out 1.4s infinite"/>
      <circle cx="255" cy="52" r="1" style="animation:blink 5.5s ease-in-out .8s infinite"/>
    </g>`;
  const aurora = nat ? `
    <g style="animation:aurora 11s ease-in-out infinite" opacity=".3">
      <path d="M30 20 C80 55 120 30 170 68 C150 20 90 35 55 8 Z" fill="#b98a5e" filter="url(#blød)"/>
      <path d="M120 10 C180 60 240 32 300 74 C270 18 200 40 150 4 Z" fill="#8a7a66" filter="url(#blød)" opacity=".7"/>
    </g>` : '';
  const fugle = !nat ? `
    <g stroke="${p.b3}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".55" style="animation:fugle 38s linear infinite">
      <path d="M0 0 q4 -4 8 0 q4 -4 8 0"/><path d="M22 10 q3.4 -3.4 6.8 0 q3.4 -3.4 6.8 0"/><path d="M-14 20 q3 -3 6 0 q3 -3 6 0"/>
    </g>` : '';
  const stjerneskud = (nat || nøgle==='klarNat') ? `
    <line class="stjerneskud" x1="150" y1="34" x2="178" y2="22" stroke="#e9e3cf" stroke-width="1.4" stroke-linecap="round" opacity="0"/>` : '';
  const ildfluer = skumring ? `
    <g fill="#e8c874">
      <circle class="ildflue" cx="72" cy="294" r="1.8"/>
      <circle class="ildflue" cx="120" cy="306" r="1.4" style="animation-delay:1.8s"/>
      <circle class="ildflue" cx="184" cy="298" r="1.6" style="animation-delay:3.4s"/>
    </g>` : '';
  // himlens farveskift følger horisonten, uanset lærredets højde
  const hf = (252+off)/H;
  const g1 = (hf*0.64).toFixed(3), g2 = hf.toFixed(3);
  const vigStop = (110/H).toFixed(3);
  const sfx = nøgle+'-'+H;   // unikke gradient-id'er pr. lærredshøjde
  return `
  <svg class="scene" viewBox="0 0 430 ${H}" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="sky-${sfx}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${p.sky[0]}"/><stop offset="${g1}" stop-color="${p.sky[1]}"/><stop offset="${g2}" stop-color="${p.sky[2]}"/>
      </linearGradient>
      <radialGradient id="glød-${sfx}" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="${p.sol}" stop-opacity=".6"/><stop offset="1" stop-color="${p.sol}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="dis-${sfx}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f2efe6" stop-opacity="0"/><stop offset=".5" stop-color="#f2efe6" stop-opacity=".14"/><stop offset="1" stop-color="#f2efe6" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="vig-${sfx}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset="${vigStop}" stop-color="#000" stop-opacity="0"/>
      </linearGradient>
      <filter id="blød"><feGaussianBlur stdDeviation="7"/></filter>
      <filter id="korn"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .5 0"/></filter>
    </defs>
    <rect width="430" height="${H}" fill="url(#sky-${sfx})"/>
    <g transform="translate(0 ${skyOff})">
      ${aurora}${blinkStjerner}${stjerneskud}
      <circle cx="${himmelX}" cy="88" r="${måne?66:78}" fill="url(#glød-${sfx})"/>
      ${måne ? `
      <g style="animation:svæv 7s ease-in-out infinite">
        <circle cx="${himmelX}" cy="88" r="21" fill="${p.sol}"/>
        <circle cx="${himmelX-8}" cy="82" r="4" fill="${p.sky[0]}" opacity=".3"/>
        <circle cx="${himmelX+6}" cy="94" r="2.6" fill="${p.sky[0]}" opacity=".26"/>
        <circle cx="${himmelX+1}" cy="79" r="2" fill="${p.sky[0]}" opacity=".22"/>
      </g>` : `
      <g style="animation:svæv 7s ease-in-out infinite">
        <circle cx="${himmelX}" cy="88" r="24" fill="${p.sol}"/>
        <circle cx="${himmelX}" cy="88" r="31" fill="none" stroke="${p.sol}" stroke-width="1.2" opacity=".28"/>
      </g>`}
      <g transform="translate(70 58)">${fugle}</g>
      <g opacity=".5" style="animation:drift 30s linear infinite alternate">
        <ellipse cx="120" cy="64" rx="46" ry="7" fill="#f2efe6" opacity=".13"/>
        <ellipse cx="300" cy="42" rx="34" ry="5.5" fill="#f2efe6" opacity=".09"/>
      </g>
    </g>
    <g transform="translate(0 ${lo})">
      <path d="M0 252 C60 228 120 242 180 234 C250 225 300 248 350 238 C390 231 415 238 430 234 V368 H0 Z" fill="${p.b1}"/>
      <rect x="0" y="244" width="430" height="30" fill="url(#dis-${sfx})" style="animation:drift 26s ease-in-out infinite alternate"/>
      <path d="M0 284 C70 264 130 280 200 270 C280 259 330 282 430 266 V368 H0 Z" fill="${p.b2}"/>
      <g fill="${p.b3}">
        <path d="m300 284 9-18 9 18zM302 270l7-14 7 14z" opacity=".9"/>
        <path d="m386 280 8-16 8 16zM388 268l6-12 6 12z" opacity=".85"/>
        <path d="m352 288 7-14 7 14z" opacity=".7"/>
      </g>
      <path d="M0 298 C90 291 200 301 430 293 V320 H0 Z" fill="${p.sky[2]}" opacity=".14"/>
      <ellipse class="vandspejl" cx="330" cy="303" rx="28" ry="3.5" fill="${p.sol}"/>
      ${ildfluer}
      <path d="M0 316 C90 300 180 316 270 308 C340 302 400 312 430 306 V368 H0 Z" fill="${p.b3}"/>
      <path d="M0 330 H430 V${H-lo+20} H0 Z" fill="${p.b3}"/>
      ${bilenMedParret(p, nat)}
    </g>
    <rect width="430" height="${H}" fill="url(#vig-${sfx})"/>
    <rect width="430" height="${H}" filter="url(#korn)" opacity=".045"/>
  </svg>`;
}

/* =============================================================
   NAVIGATION — Forside · Log · Profil
   ============================================================= */
let aktivSkærm = 'hjem';
const NAV = [
  {id:'profil', ikon:'person', navn:'Profil'},
  {id:'hjem',   ikon:'hjem',   navn:'Forside'},
  {id:'log',    ikon:'bog',    navn:'Log'}
];
let sidsteSkærm = 'hjem';
function gåTil(skærm){
  if(skærm !== aktivSkærm) sidsteSkærm = aktivSkærm;
  aktivSkærm = skærm;
  tegn();
  $('indhold').scrollTop = 0;
}
function tegnNav(){
  if(!s.onboarded){ $('bundnav').style.display='none'; return; }
  $('bundnav').style.display='flex';
  const rod = NAV.some(n=>n.id===aktivSkærm) ? aktivSkærm : (aktivSkærm==='log'||aktivSkærm==='profil') ? aktivSkærm : 'hjem';
  $('bundnav').innerHTML = NAV.map(n=>`
    <button class="navpunkt ${n.id===rod?'aktiv':''}" onclick="gåTil('${n.id}')" aria-label="${n.navn}">${ik(n.ikon)}</button>`).join('');
}
function skærmTop(titel, tilbageTil, etiket){
  return `<div class="skærm-top">
    <button class="tilbage" onclick="gåTil('${tilbageTil}')">${ik('tilbage')}</button>
    <div>${etiket?`<div class="etiket">${etiket}</div>`:''}<h1 style="font-size:22px">${titel}</h1></div>
  </div>`;
}

/* =============================================================
   ONBOARDING — mail → personlig kode → notifikationer
   ============================================================= */
let obTrin = 1;
function skærmOnboarding(){
  if(obTrin===1){
    $('indhold').innerHTML = `<div class="side anim" style="padding-top:34px">
      <div style="display:flex;justify-content:center;margin-bottom:18px">${logoSVG(false)}</div>
      <p class="dæmpet" style="text-align:center;margin-bottom:18px">Sådan ser bekræftelsesmailen ud, når kunden har købt madrassen:</p>
      <div class="ob-mail">
        <div class="m-top">${ik('mail')} <b>Arytmi</b> &lt;velkommen@arytmi.dk&gt;<br>Til: ${esc(s.profil.email)}</div>
        <div class="m-krop">
          <h3>Velkommen til Arytmi.</h3>
          <p class="dæmpet" style="margin-top:8px">Din bruger er oprettet. Log ind med din e-mail og engangskoden herunder — så vælger du din egen kode første gang.</p>
          <div class="ob-kode">ARYTMI-2496</div>
          <p class="dæmpet" style="font-size:13px">Hent appen, og kom i gang:</p>
          <div class="store-badges">
            <div class="store-badge">${ik('måne')}<span>Hent i<br><b>App Store</b></span></div>
            <div class="store-badge">${ik('gnist')}<span>Hent på<br><b>Google Play</b></span></div>
          </div>
        </div>
      </div>
      <button class="knap primær bred" onclick="obTrin=2;tegn()">Åbn appen og log ind ${ik('pil')}</button>
      <p class="dæmpet" style="text-align:center;font-size:12px;margin-top:12px">Prototype — mailen er simuleret.</p>
    </div>`;
    return;
  }
  if(obTrin===2){
    $('indhold').innerHTML = `<div class="side anim" style="padding-top:34px">
      <div style="display:flex;justify-content:center;margin-bottom:22px">${logoSVG(false)}</div>
      <div class="kort">
        <div class="etiket">Første login</div>
        <h2 style="margin-top:6px">Lav din personlige kode</h2>
        <p class="dæmpet" style="margin-top:6px">Engangskoden fra mailen er brugt. Vælg nu din egen 4-cifrede kode.</p>
        <label class="felt-etiket">Din kode</label>
        <input type="password" id="kode1" class="kode-cifre" maxlength="4" inputmode="numeric" placeholder="····">
        <label class="felt-etiket">Gentag koden</label>
        <input type="password" id="kode2" class="kode-cifre" maxlength="4" inputmode="numeric" placeholder="····">
        <div style="margin-top:18px"><button class="knap primær bred" onclick="gemKode()">Gem min kode</button></div>
      </div>
    </div>`;
    return;
  }
  // trin 3: notifikationer
  $('indhold').innerHTML = `<div class="side anim" style="padding-top:34px">
    <div style="display:flex;justify-content:center;margin-bottom:22px">${logoSVG(false)}</div>
    <div class="kort">
      <div style="display:flex;gap:12px;align-items:center;margin-bottom:8px">
        <span style="color:var(--rav)">${ik('klokke','stor')}</span>
        <h2>Notifikationer</h2>
      </div>
      <p style="font-size:14.5px">Vi sender kun notifikationer, der forbedrer oplevelsen med appen og madrassen — aldrig støj, aldrig salg.</p>
      <div class="advarsel">${ik('klokke')} Slår du notifikationer fra, virker appen ikke optimalt, og oplevelsen kan blive kompromitteret.</div>
      <button class="knap primær bred" onclick="vælgNotif(true)" style="margin-bottom:10px">Slå notifikationer til</button>
      <button class="knap kontur bred" onclick="vælgNotif(false)">Nej tak — jeg forstår risikoen</button>
    </div>
  </div>`;
}
function gemKode(){
  const k1 = $('kode1').value.trim(), k2 = $('kode2').value.trim();
  if(k1.length<4){ flash('Koden skal være 4 cifre.'); return; }
  if(k1!==k2){ flash('De to koder er ikke ens — prøv igen.'); return; }
  s.profil.kode = k1; gem();
  obTrin = 3; tegn();
}
function vælgNotif(til){
  s.profil.notifikationer = til;
  s.onboarded = true; gem();
  gåTil('hjem');
  flash(til ? 'Notifikationer er slået til. Velkommen til Arytmi.' : 'Okay — du kan altid slå dem til under Profil.', 'klokke');
}

/* =============================================================
   FORSIDE — ét helt billede, én beslutning: forbered turen
   ============================================================= */
/* Arytmi-tæller — kompakt hjerteslag øverst; tæller årets forstyrrelser */
function arytmiTæller(){
  const iÅr = s.ture.filter(t=>t.dato && String(t.dato).startsWith(String(new Date().getFullYear()))).length;
  // rytmestregen bor i ordmærket — tælleren nøjes med hjerteslaget
  return `<button class="aryt-tæller" onclick="gåTil('log')" aria-label="${iÅr} forstyrrelser i år" title="Forstyrrelser i år">
    <span class="at-label">Forstyrrelser i år:</span>
    <svg class="at-hjerte" viewBox="0 0 24 24"><path d="M12 21C12 21 3 14.6 3 8.9 3 5.7 5.4 4 7.8 4 9.7 4 11.2 5.2 12 6.4 12.8 5.2 14.3 4 16.2 4 18.6 4 21 5.7 21 8.9 21 14.6 12 21 12 21Z"/></svg>
    <span class="at-tal">${iÅr}</span>
  </button>`;
}

/* Er der reelt sat noget i gang? En tom kladde (fx man åbnede "Forbered tur"
   men valgte intet) tæller ikke — så forsiden forbliver ren. */
function turIGang(){
  const f = s.forberedelse; if(!f) return false;
  return !!(f.destination || f.dato || f.invType
    || f.set.aktivitet || f.set.mad || f.set.øjeblikke
    || (f.bilTjek && f.bilTjek.length) || (f.pakkeTjek && f.pakkeTjek.length));
}
function skærmHjem(){
  // Tom kladde smides væk, så forsiden ikke husker en planlægning, der aldrig kom i gang
  if(s.forberedelse && !turIGang()){ s.forberedelse = null; gem(); }
  // Har turen en dato (planlagt via Spontan tur), bliver forsiden en nedtælling + tjekliste
  if(s.forberedelse && s.forberedelse.dato && !s.påTur && !s.anmeldAfventer){
    return skærmHjemNedtælling();
  }
  let variant='klar', overskrift, underoverskrift='', under, knap, ekstraForside='';

  if(s.anmeldAfventer){
    overskrift='Velkommen hjem.';
    under=`Hvordan var turen til ${esc(s.anmeldAfventer.sted||'jeres sted')}? Tre spørgsmål — under 30 sekunder.`;
    knap={ tekst:'Anmeld turen', ikon:'hjerte', aktion:"gåTil('anmeld')" };
  } else if(s.påTur){
    variant='tur';
    overskrift=`God tur${s.påTur.sted?'<br>til '+esc(s.påTur.sted):''}.`;
    under='Resten af verden kan vente til i morgen.';
    knap={ tekst:'Vi er hjemme igen', ikon:'hjem', aktion:'hjemmeIgen()' };
  } else if(s.forberedelse){
    const fase = s.forberedelse.fase || 1;
    const f = fremdrift(fase);
    if(fase===1){
      overskrift = f.mangler===0 ? 'Planen er klar.' : 'Planen er i gang.';
      under = f.mangler===0
        ? 'Resten venter til dagen, hvor I skal af sted.'
        : `${f.mangler} af ${f.total} i planen mangler — I er tættere på, end I tror.`;
      knap = f.mangler===0
        ? { tekst:'Gør klar til afgang', note:'Trin 2 · på dagen', ikon:'bil', aktion:'tilFase(2)' }
        : { tekst:'Fortsæt planen', note:`${f.klaret} af ${f.total} klaret`, ikon:'pil', aktion:"gåTil(nutidigSektion())", ring:f.pct };
    } else {
      overskrift = f.mangler===0 ? 'I er klar.' : 'Klar til afgang?';
      under = f.mangler===0
        ? 'Alt er pakket. I skal bare sætte jer ind og køre.'
        : `${f.mangler} af ${f.total} ting mangler at blive pakket.`;
      knap = f.mangler===0
        ? { tekst:'Af sted', ikon:'måne', aktion:'afSted()' }
        : { tekst:'Afslut forberedelsen', note:`${f.klaret} af ${f.total} pakket`, ikon:'pil', aktion:"gåTil(nutidigSektion())", ring:f.pct };
    }
    ekstraForside = `<button class="spontan-link" onclick="gåTil('turplan')">${ik('bog')} Se hele turplanen</button>`;
  } else {
    overskrift='Klar til en sund<br>forstyrrelse?';
    underoverskrift='Fra idé til afsted.';
    under='Jeg hjælper dig med at komme ud – vælg mindre, oplev mere. Appen er designet til at eliminere friktion, så du skal bruge mindst mulig kapacitet til planlægning og mest muligt på at nyde og opleve. Den hjælper dig direkte fra idé til afsted, da alt for mange idéer drukner i et ocean af planlægning.';
    knap={ tekst:'Start', aria:'Forbered tur', ikon:'bil', aktion:'startForberedelse()' };
    ekstraForside = `<button class="spontan-link" onclick="startSpontan()">${ik('gnist')} Eller lad os finde et sted — spontan tur</button>`;
  }

  // Rund hovedknap til fuldskærms-forsiden — med pulserende hjerteslag-ringe.
  // Ved turens to store greb (start / gør klar) står pulsen fra logoet i cirklen.
  // Bilen stod her før, men den står allerede i landskabet lige ved siden af.
  const visPuls = knap.ikon === 'bil';
  const rundKnap = `
    <div class="rund-start">
      <button class="rund-knap" onclick="${knap.aktion}" aria-label="${knap.aria || knap.tekst}">
        <span class="rk-ring"></span><span class="rk-ring r2"></span>
        ${knap.ring!==undefined?`<svg class="rk-bue" viewBox="0 0 120 120"><circle class="rk-spor" cx="60" cy="60" r="55"/><circle class="rk-fyld" cx="60" cy="60" r="55" pathLength="100" style="stroke-dashoffset:${100-knap.ring}"/></svg>`:''}
        ${visPuls ? pulsIKnap() : ik(knap.ikon)}
      </button>
      <div class="rk-label${knap.forklaring?' sætning':''}">${knap.forklaring || knap.tekst}</div>
      ${knap.note?`<div class="rk-note">${knap.note}</div>`:''}
      ${ekstraForside}
    </div>`;
  // Kompakt knap, når hero'en er lille (anmeldelse venter)
  const handling = `<button class="knap lys ånde kør-knap" onclick="${knap.aktion}">${ik(knap.ikon)} <span>${knap.tekst}</span> ${ik('pil')}</button>`;

  // forsiden er altid ét helt skærmbillede
  const fuldHero = true;
  $('indhold').innerHTML = `
  <div class="hero${fuldHero?' fuld':''}">
    ${heroScene(variant, fuldHero ? skærmHøjde() : undefined)}
    <div class="overlay">
      <div class="h-top">
        <div class="h-logo">${logoSVG(true)}</div>
        <div class="ht-side"></div>
        <div class="ht-side højre">${arytmiTæller()}</div>
      </div>
      <div class="h-bund">
        <h1>${overskrift}</h1>
        ${underoverskrift?`<p class="h-under">${underoverskrift}</p>`:''}
        <p>${under}</p>
        ${fuldHero ? rundKnap : `<div class="handling">${handling}</div>`}
      </div>
    </div>
  </div>`;
}
function startForberedelse(){
  s.forberedelse = nyForberedelse();
  gem(); gåTil(sektionListe(1)[0].id);
}
function hjemmeIgen(){
  s.anmeldAfventer = { sted: s.påTur.sted, dato: s.påTur.startet };
  s.påTur = null; gem();
  gåTil('hjem');
  flash('Velkommen hjem. Vi har lagt en lille anmeldelse klar til jer.', 'klokke');
}

/* =============================================================
   SPONTAN TUR — den guidede matcher: hvornår → hvorfra →
   hvor langt → hvad → tre steder. Ender i en planlagt tur med
   dato, så forsiden bliver til en nedtælling + tjekliste.
   ============================================================= */
const RADIUS_TEKST = ['Under 30 min','30–60 min','1–2 timer','2–4 timer'];
function startSpontan(){
  s.forberedelse = nyForberedelse({ spontan:true });
  gem(); gåTil('spontan-tid');
}
function spontanFærdig(){ return !!(s.forberedelse && s.forberedelse.destination); }
function spontanTilbage(trin){
  gåTil(['hjem','spontan-tid','spontan-start','spontan-radius'][trin] || 'hjem');
}
/* Fælles wizard-top: etiket, prikker, spørgsmål */
function wizardTop(trin, spm, under){
  const prikker = [0,1,2,3].map(i=>`<span class="wiz-prik ${i===trin?'aktiv':''} ${i<trin?'klaret':''}"></span>`).join('');
  return `<div class="wizard-top">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
      <button class="tilbage" onclick="spontanTilbage(${trin})">${ik('tilbage')}</button>
      <div class="wiz-etiket">Spontan tur · trin ${trin+1} af 4</div>
    </div>
    <div class="wiz-prik-række">${prikker}</div>
    <h1 class="wiz-spm">${spm}</h1>
    ${under?`<p class="wiz-under">${under}</p>`:''}
  </div>`;
}
function spontanBund(label, aktion, aktiv){
  return `<div style="margin-top:24px">
    <button class="knap primær bred" ${aktiv?`onclick="${aktion}"`:'disabled'}>${label} ${ik('pil')}</button>
  </div>`;
}

/* Trin 1 — hvornår */
function skærmSpontanTid(){
  const f = s.forberedelse;
  const færdig = spontanFærdig();
  const seg = (v,tekst)=>`<button class="seg-knap ${f.retur===v?'valgt':''}" style="flex-direction:row;padding:12px 8px" onclick="sætRetur('${v}')"><span>${tekst}</span></button>`;
  $('indhold').innerHTML = `<div class="side anim">
    ${wizardTop(0,'Hvornår vil I afsted?','Vælg en dato og cirka-tidspunkt — så finder vi et sted, der passer til jeres tur.')}
    <div class="kort">
      <label class="felt-etiket" style="margin-top:0">Dato</label>
      <input type="date" id="spDato" value="${f.dato||''}" onchange="s.forberedelse.dato=this.value;gem();tegn()">
      <label class="felt-etiket">Ca. afgangstid</label>
      <input type="time" id="spTid" value="${f.afgangstid||''}" onchange="s.forberedelse.afgangstid=this.value;gem()">
      <label class="felt-etiket">Hjem igen? <span class="dæmpet" style="font-weight:400">(valgfrit)</span></label>
      <div class="seg-valg">${seg('samme','Samme dag')}${seg('næste','Næste dag')}${seg('dato','Vælg dato')}</div>
      ${f.retur==='dato'?`<input type="date" style="margin-top:10px" value="${f.returDato||''}" onchange="s.forberedelse.returDato=this.value;gem()">`:''}
    </div>
    ${spontanBund(færdig?'Gem ændringer':'Videre', færdig?"gåTil('hjem')":"gåTil('spontan-start')", !!f.dato)}
  </div>`;
}
function sætRetur(v){ s.forberedelse.retur=v; gem(); tegn(); }

/* Trin 2 — hvorfra */
function skærmSpontanStart(){
  const f = s.forberedelse;
  $('indhold').innerHTML = `<div class="side anim">
    ${wizardTop(1,'Hvor starter I fra?','Vi bruger jeres startpunkt til at måle, hvor langt der er til hvert sted.')}
    <div class="kort">
      <button class="knap primær bred" onclick="spontanGPS()">${ik('gps')} Brug min placering</button>
      <p class="dæmpet" style="text-align:center;font-size:12.5px;margin:12px 0">— eller vælg en anden adresse —</p>
      <div style="display:flex;gap:10px">
        <input type="text" id="spAdr" placeholder="Søg by eller adresse …" value="${esc(f.startSøg||'')}" onkeydown="if(event.key==='Enter')spontanAdresse()">
        <button class="knap kontur lille" onclick="spontanAdresse()">Vælg</button>
      </div>
      ${f.startNavn?`<div class="sted-chips" style="margin-top:14px"><span class="sted-chip valgt">${ik('nål')} ${esc(f.startNavn)}</span></div>`:''}
    </div>
    ${spontanBund('Videre',"gåTil('spontan-radius')", !!f.startNavn)}
  </div>`;
}
function spontanGPS(){
  const sæt = (navn,xy)=>{ s.forberedelse.startNavn=navn; s.forberedelse.startXY=xy; gem(); tegn(); flash(navn+' sat som startpunkt.','gps'); };
  if(!navigator.geolocation){ sæt('Din placering (demo — Aarhus)', {x:92,y:120}); return; }
  flash('Finder din placering …','gps');
  navigator.geolocation.getCurrentPosition(pos=>{
    const xy = geoTilXY(pos.coords.latitude, pos.coords.longitude);
    sæt('Din placering', {x:Math.round(xy.x), y:Math.round(xy.y)});
  }, ()=>sæt('Din placering (demo — Aarhus)', {x:92,y:120}), {timeout:6000});
}
function spontanAdresse(){
  const q = ($('spAdr').value||'').trim(); s.forberedelse.startSøg=q;
  if(!q){ gem(); return; }
  const hit = BYER.find(b=>b.n.toLowerCase().startsWith(q.toLowerCase())) || BYER.find(b=>b.n.toLowerCase().includes(q.toLowerCase()));
  if(hit){ s.forberedelse.startNavn=hit.n; s.forberedelse.startXY={x:hit.x,y:hit.y}; gem(); tegn(); }
  else flash('Byen er ikke i prototypens liste endnu — brug din placering i stedet.');
}

/* Trin 3 — hvor langt */
function skærmSpontanRadius(){
  const f = s.forberedelse;
  $('indhold').innerHTML = `<div class="side anim">
    ${wizardTop(2,'Hvor langt vil I køre?','Hvor langt har I lyst til at køre for at komme væk?')}
    <div class="kort">
      <div class="radius-vis">
        <div class="radius-tal">${RADIUS_TEKST[f.radius]}</div>
        <div class="radius-under">kørsel fra ${esc(f.startNavn||'jeres startpunkt')}</div>
      </div>
      <input type="range" class="radius" min="0" max="3" step="1" value="${f.radius}" oninput="s.forberedelse.radius=+this.value;gem();opdaterRadius(this.value)">
      <div class="radius-mærker"><span>30 min</span><span>1 t</span><span>2 t</span><span>4 t</span></div>
    </div>
    ${spontanBund('Videre',"gåTil('spontan-onske')", true)}
  </div>`;
}
function opdaterRadius(v){ const el = document.querySelector('.radius-tal'); if(el) el.textContent = RADIUS_TEKST[+v]; }

/* Trin 4 — hvad vil I opleve */
function skærmSpontanOnske(){
  const o = s.forberedelse.oplevelser;
  const seg = (gruppe, a, b) => `
    <div class="seg-række">
      <div class="seg-titel">${a.titel} eller ${b.titel.toLowerCase()}?</div>
      <div class="seg-valg">
        <button class="seg-knap ${o[gruppe]===a.v?'valgt':''}" onclick="sætØnske('${gruppe}','${a.v}')">${ik(a.ik)}<span>${a.titel}</span></button>
        <button class="seg-knap ${o[gruppe]===b.v?'valgt':''}" onclick="sætØnske('${gruppe}','${b.v}')">${ik(b.ik)}<span>${b.titel}</span></button>
      </div>
    </div>`;
  const alle = o.lys && o.natur && o.stemning;
  $('indhold').innerHTML = `<div class="side anim">
    ${wizardTop(3,'Hvad vil I opleve?','Vælg det, der frister — eller lad os overraske jer.')}
    ${seg('lys', {titel:'Solopgang',v:'solopgang',ik:'solop'}, {titel:'Solnedgang',v:'solnedgang',ik:'sol'})}
    ${seg('natur', {titel:'Vand',v:'vand',ik:'vand'}, {titel:'Skov',v:'skov',ik:'skov'})}
    ${seg('stemning', {titel:'Isoleret',v:'isoleret',ik:'måne'}, {titel:'Livligt',v:'livligt',ik:'folk'})}
    <button class="knap kontur bred" style="margin-top:8px" onclick="overrasker()">${ik('gnist')} Eller overrask mig</button>
    ${spontanBund('Find tre steder',"visResultater()", !!alle)}
  </div>`;
}
function sætØnske(gruppe,v){ s.forberedelse.oplevelser[gruppe]=v; gem(); tegn(); }
function overrasker(){
  const r = a => a[Math.floor(Math.random()*a.length)];
  s.forberedelse.oplevelser = { lys:r(['solopgang','solnedgang']), natur:r(['vand','skov']), stemning:r(['isoleret','livligt']) };
  gem(); visResultater();
}
function visResultater(){ gåTil('spontan-resultat'); }

/* Matcher — tre steder. Det testede sted vises som ægte, når det
   passer; resten er tydeligt markerede pladsholdere (OD kuraterer). */
function spontanMatch(){
  const f = s.forberedelse, o = f.oplevelser;
  const radiusTekst = RADIUS_TEKST[f.radius];
  const startNavn = f.startNavn || 'jeres startpunkt';
  const naturOrd = o.natur==='skov' ? 'skov' : 'kyst';
  const lysOrd = o.lys==='solopgang' ? 'morgenlys' : 'aftenlys';
  const stemningOrd = o.stemning==='livligt' ? 'med liv omkring' : 'helt for jer selv';
  const res = [];
  const t1 = TESTEDE[0];
  if(o.natur!=='skov'){
    res.push({ ægte:true, navn:t1.navn, testetId:t1.id, x:t1.x, y:t1.y, ikon:'stjerne',
      meta:`${t1.kort} · ${radiusTekst} herfra` });
  }
  const forslag = [
    { navn:`${naturOrd[0].toUpperCase()+naturOrd.slice(1)}plads mod nord`, ikon:o.natur==='skov'?'skov':'vand' },
    { navn:`Stille sted — ${stemningOrd}`, ikon:o.stemning==='livligt'?'folk':'telt' },
    { navn:`Udsigt til ${lysOrd}`, ikon:o.lys==='solopgang'?'solop':'sol' }
  ];
  for(const g of forslag){
    if(res.length>=3) break;
    res.push({ ægte:false, navn:g.navn, x:null, y:null, ikon:g.ikon,
      meta:`${radiusTekst} fra ${startNavn}` });
  }
  return res.slice(0,3);
}
function vælgSpontanSted(i){
  const f = s.forberedelse, r = spontanMatch()[i];
  const fx = f.startXY ? f.startXY.x : 100, fy = f.startXY ? f.startXY.y : 120;
  f.destination = { navn:r.navn, x: r.x!=null?r.x:fx, y: r.y!=null?r.y:fy };
  if(r.testetId) f.destination.testetId = r.testetId;
  gem(); gåTil('hjem');
  flash(`${r.navn} er valgt. Nu tæller vi ned.`, 'tjek');
}
function skærmSpontanResultat(){
  const f = s.forberedelse, res = spontanMatch();
  $('indhold').innerHTML = `<div class="side anim">
    ${skærmTop('Tre steder til jer','spontan-onske','Vi fandt et match')}
    <p class="dæmpet" style="margin:-4px 0 16px">Ud fra jeres ønsker og ${RADIUS_TEKST[f.radius].toLowerCase()} fra ${esc(f.startNavn||'jeres startpunkt')}. Vælg det, der kalder — så tæller vi ned til turen.</p>
    ${res.map((r,i)=>`
      <button class="res-kort" onclick="vælgSpontanSted(${i})">
        <span class="res-ikon">${ik(r.ikon)}</span>
        <span class="res-krop">
          <span class="res-navn">${esc(r.navn)}</span>
          <span class="res-meta">${esc(r.meta)}</span>
          <span class="res-mærke ${r.ægte?'ægte':''}">${r.ægte?'★ Testet af Arytmi':'Foreslået · OD kuraterer'}</span>
        </span>
        <span class="tjek-pil">${ik('pil')}</span>
      </button>`).join('')}
  </div>`;
}

/* =============================================================
   NEDTÆLLING + TJEKLISTE — forsiden når turen har en dato
   ============================================================= */
function dageTil(iso){
  if(!iso) return null;
  const nu = new Date(); nu.setHours(0,0,0,0);
  return Math.round((new Date(iso+'T00:00:00') - nu) / 86400000);
}
function tjeklisteData(){
  const f = s.forberedelse;
  return [
    { navn:'Dato',          under: f.dato?pænDato(f.dato):'Vælg afrejsedato',      klar:!!f.dato,        aktion:"gåTil('spontan-tid')" },
    { navn:'Destination',   under: f.destination?esc(f.destination.navn):'Find et sted', klar:!!f.destination, aktion:"gåTil('destination')" },
    { navn:'Invitation',    under: invUnderTekst(f),                               klar: invErKlar(f),   aktion:"gåTil('invitation')" },
    { navn:'Forplejning',   under: forplejningKlar()?valgtMad().length+' valgt':'Mad og drikke til turen', klar: forplejningKlar(), aktion:"gåTil('mad')" },
    { navn:'Bil klargjort', under:'Ladning, Camp Mode, tasken',                    klar: f.bilTjek.length>=BILEN_PUNKTER.length, aktion:"gåTil('bilen')" },
    { navn:'Pakkeliste',    under:'De personlige ting',                            klar: f.pakkeTjek.length>=PAKKE_PUNKTER.length, aktion:"gåTil('pakke')" }
  ];
}
function skærmHjemNedtælling(){
  const f = s.forberedelse;
  const dage = dageTil(f.dato);
  const items = tjeklisteData();
  const klaret = items.filter(i=>i.klar).length;
  const pct = Math.round(klaret/items.length*100);
  const stort = dage===0 ? 'I dag' : dage===1 ? 'I morgen' : dage>1 ? dage : 'Snart';
  $('indhold').innerHTML = `
  <div class="ned-hero">
    ${heroScene('klar', 420)}
    <div class="ned-lag">
      <div class="ned-top"><div class="h-logo">${logoSVG(true)}</div>${arytmiTæller()}</div>
      <div class="ned-label">${dage>1?'Nedtælling':'Snart afsted'}</div>
      <div class="ned-tal">${stort}</div>
      ${dage>1?`<div class="ned-label" style="margin-top:6px">dage til jeres tur</div>`:''}
      <div class="ned-sted">${ik('nål')}${esc(f.destination?f.destination.navn:'Vælg et sted')}</div>
      <div class="ned-dato">${pænDato(f.dato)}${f.afgangstid?` · afgang ca. ${f.afgangstid}`:''}</div>
    </div>
  </div>
  <div class="tjek-blok">
    <div class="tjek-overskrift"><h2>Jeres tjekliste</h2><span class="tjek-tæl">${klaret} af ${items.length}</span></div>
    <div class="tjek-bar"><div class="fyld" style="width:${pct}%"></div></div>
    ${items.map(it=>`
      <button class="tjek-punkt ${it.klar?'klar':''}" onclick="${it.aktion}">
        <span class="tjek-boks">${ik('tjek')}</span>
        <span class="tjek-krop"><span class="tjek-navn">${it.navn}</span><span class="tjek-under">${it.under}</span></span>
        <span class="tjek-pil">${ik('pil')}</span>
      </button>`).join('')}
    ${klaret===items.length
      ? `<button class="knap primær bred ånde" style="margin-top:8px" onclick="afSted()">Alt er klar — af sted ${ik('måne')}</button>`
      : `<p class="dæmpet" style="text-align:center;font-size:12.5px;margin-top:10px">Kryds resten af, så bliver hele listen grøn.</p>`}
    <div style="text-align:center;margin-top:16px"><button class="knap kontur bred" onclick="gåTil('turplan')">${ik('bog')} Se hele turplanen</button></div>
    <div style="text-align:center;margin:14px 0 4px"><button class="knap kontur lille" onclick="annullerForberedelse()">Annullér turen</button></div>
  </div>`;
}
/* Samlet, rolig oversigt over turen: destination, aktiviteter, forplejning, øjeblikke. */
function skærmTurplan(){
  const f = s.forberedelse;
  if(!f){ gåTil('hjem'); return; }
  const akt = valgteAktiviteter();
  const mad = valgtMad();
  const dest = f.destination;
  const dage = f.dato ? dageTil(f.dato) : null;
  const etiket = dage!=null ? (dage>1?dage+' dage til afgang':dage===1?'I morgen':dage===0?'I dag':'Turplan') : 'Turplan';
  const rad = (ikon, farve, navn, under, aktion) => `
    <div class="liste-punkt"${aktion?` onclick="${aktion}" style="cursor:pointer"`:''}>
      <span style="color:${farve};flex-shrink:0">${ik(ikon)}</span>
      <div class="navn" style="flex:1;font-size:14.5px">${navn}${under?`<div class="dæmpet" style="font-size:12px;margin-top:2px">${under}</div>`:''}</div>
      ${aktion?`<span style="color:#c9c2b0;flex-shrink:0">${ik('pil')}</span>`:''}
    </div>`;
  $('indhold').innerHTML = `<div class="side anim">
    ${skærmTop('Jeres turplan','hjem',etiket)}
    <div class="kort">
      <div class="etiket">Turen</div>
      ${dest ? rad('nål','var(--rav)', esc(dest.navn), f.dato?pænDato(f.dato)+(f.afgangstid?' · afgang ca. '+f.afgangstid:''):'Dato ikke sat endnu', "gåTil('destination')")
             : rad('nål','var(--rav)','Vælg et sted','Ingen destination endnu',"gåTil('destination')")}
    </div>
    <div class="sektion"><h3>${ik('gnist')} Aktiviteter</h3></div>
    <div class="liste">
      ${akt.length ? akt.map(({gruppe,akt:a})=>rad('tjek','#6d7d5e', a.navn, gruppe.navn, `gåTil('aktivitet-${a.id}')`)).join('')
                   : rad('plus','var(--rav)','Ingen valgt endnu','Vælg nogle idéer til turen',"gåTil('aktivitet')")}
    </div>
    <div class="sektion"><h3>${ik('kop')} Forplejning</h3></div>
    <div class="liste">
      ${mad.length ? mad.map(({id,m})=>rad('tjek','#6d7d5e', m.titel, null, `gåTil('mad-${id}')`)).join('')
                   : rad('plus','var(--rav)','Ingen valgt endnu','Vælg mad og drikke',"gåTil('mad')")}
    </div>
  </div>`;
}

/* =============================================================
   INVITATION — tre veje: planlæg sammen · giv som gave · for mig selv
   Alt det tværgående (gæstelogin, datoforhandling, den flotte
   invitation) er simuleret i prototypen og markeret som sådan.
   ============================================================= */
function invErKlar(f){
  if(f.invType==='selv')   return true;
  if(f.invType==='sammen') return f.invStatus==='bekræftet';
  if(f.invType==='gave')   return f.invStatus==='sendt';
  return false;
}
function invUnderTekst(f){
  if(!f.invType)         return 'Inviter til arytmen';
  if(f.invType==='selv') return 'Kun for dig selv';
  if(f.invType==='gave') return f.invStatus==='sendt' ? 'Overraskelse sendt' : 'Overraskelse — i det skjulte';
  const navn = f.invModtager || 'din rejsemakker';
  if(f.invStatus==='bekræftet') return 'Bekræftet med '+navn;
  if(f.invStatus==='afslået')   return 'Afslået — inviter en anden';
  if(f.invStatus==='forhandler')return f.invForslagFra==='gæst' ? navn+' foreslog nye datoer' : 'Afventer '+navn;
  if(f.invStatus==='sendt')     return 'Afventer svar fra '+navn;
  return 'Planlægger sammen';
}
function forslagsDatoer(basisISO){
  const b = new Date((basisISO || new Date().toISOString().slice(0,10)) + 'T12:00:00');
  return [4,9,15].map(dg=>{ const d=new Date(b); d.setDate(d.getDate()+dg); return d.toISOString().slice(0,10); });
}
function gæsteKode(f){
  let h=0; const str = f.invModtager || 'gæst';
  for(let i=0;i<str.length;i++) h=(h*31 + str.charCodeAt(i))>>>0;
  return 'GÆST-'+(1000 + h%9000);
}

function skærmInvitation(){
  const f = s.forberedelse; if(!f){ gåTil('hjem'); return; }
  let krop;
  if(!f.invType)              krop = invVælgKrop();
  else if(f.invType==='selv') krop = invSelvKrop();
  else if(f.invType==='sammen')krop = invSammenKrop();
  else                        krop = invGaveKrop();
  $('indhold').innerHTML = `<div class="side anim">
    ${skærmTop('Inviter til arytmen','hjem','Invitation')}
    ${krop}
  </div>`;
}
function invVælgKrop(){
  const valg = [
    { type:'sammen', ikon:'folk',   navn:'Planlæg sammen',   tekst:'I planlægger arytmen sammen — begge er med fra hver jeres telefon.' },
    { type:'gave',   ikon:'gave',   navn:'Giv som gave',     tekst:'Planlæg alt i det skjulte og send en færdig overraskelse, når du er klar.' },
    { type:'selv',   ikon:'hjerte', navn:'Kun for mig selv', tekst:'Denne arytme er for dig alene. Ingen invitation.' }
  ];
  return `
    <div class="kort guide-brød"><p>Hvem er denne arytme for? Vælg, hvordan I skal afsted.</p></div>
    ${valg.map(v=>`
      <button class="res-kort" onclick="vælgInvType('${v.type}')">
        <span class="res-ikon">${ik(v.ikon)}</span>
        <span class="res-krop"><span class="res-navn">${v.navn}</span><span class="res-meta">${v.tekst}</span></span>
        <span class="tjek-pil">${ik('pil')}</span>
      </button>`).join('')}`;
}
function vælgInvType(type){
  const f = s.forberedelse;
  f.invType = type;
  if(type==='selv')      f.invStatus = 'alene';
  else if(type==='gave') f.invStatus = (f.invStatus==='sendt') ? 'sendt' : 'planlægger';
  else                   f.invStatus = (f.invStatus==='bekræftet') ? 'bekræftet' : 'kladde';
  gem(); tegn();
}
function invSkift(){
  const f = s.forberedelse;
  f.invType=null; f.invStatus=null; f.invForslag=[]; f.invForslagFra=null; f.invEnigDato=null;
  gem(); tegn();
}
function invSelvKrop(){
  return `
    <div class="advarsel" style="background:#e2ead2;border-color:#c3d3a8;color:#4d5c3a">${ik('tjek')} Denne arytme er for dig selv. Nyd den — resten af planen er klar til dig alene.</div>
    <div style="text-align:center;margin-top:16px"><button class="knap kontur lille" onclick="invSkift()">${ik('tilbage')} Vælg noget andet</button></div>`;
}

/* ---------- Planlæg sammen ---------- */
function gæstePreview(f){
  return `
  <div class="ob-mail">
    <div class="m-top">${ik('mail')} Til: ${esc(f.invModtager||'din rejsemakker')}</div>
    <div class="m-krop">
      <h3 style="margin-bottom:8px">${esc(f.invAfsender||'En ven')} vil planlægge en arytme sammen med dig.</h3>
      <div class="od-plads"><span class="od-mærke">OD skriver</span><br>Den forklarende mail om, hvad en arytme er, skrives af OD og indsættes her.</div>
      <p class="dæmpet" style="font-size:13px;margin-top:14px">Hent Arytmi-appen og log ind som gæst:</p>
      <div class="ob-kode">${gæsteKode(f)}</div>
      <p class="dæmpet" style="font-size:12px;text-align:center">Prototype — gæstelogin er simuleret.</p>
    </div>
  </div>`;
}
function invSammenKrop(){
  const f = s.forberedelse;
  const status = f.invStatus || 'kladde';
  const navn = esc(f.invModtager || 'din rejsemakker');
  if(status==='kladde'){
    return `
      <div class="kort guide-brød"><p>I planlægger arytmen sammen. Send en invitation, bliv enige om datoen — så bliver resten af planen fælles.</p></div>
      <div class="kort">
        <label class="felt-etiket" style="margin-top:0">Dit navn</label>
        <input type="text" placeholder="Fx Kennet" value="${esc(f.invAfsender||'')}" oninput="s.forberedelse.invAfsender=this.value;gem()">
        <label class="felt-etiket">Rejsemakkerens navn eller e-mail</label>
        <input type="text" placeholder="Fx Anne eller anne@mail.dk" value="${esc(f.invModtager||'')}" oninput="s.forberedelse.invModtager=this.value;gem()">
        <label class="felt-etiket">Foreslået dato</label>
        <div class="sted-chips"><span class="sted-chip valgt">${ik('kort')} ${f.dato?pænDato(f.dato):'Ingen dato valgt endnu'}</span></div>
        <button class="knap primær bred" style="margin-top:16px" ${f.invModtager?'':'disabled'} onclick="invSend()">Send invitation ${ik('mail')}</button>
      </div>
      <div style="text-align:center;margin-top:14px"><button class="knap kontur lille" onclick="invSkift()">${ik('tilbage')} Vælg noget andet</button></div>`;
  }
  if(status==='bekræftet'){
    return `
      <div class="mørk-kort"><div class="glød"></div>
        <div class="etiket" style="color:rgba(246,243,234,.6)">I er enige</div>
        <h3 style="margin-top:4px">Turen er oprettet</h3>
        <p style="margin-top:6px">Du og ${navn} er enige om <b>${pænDato(f.invEnigDato||f.dato)}</b>. Nu er resten af planen fælles — I fylder tjeklisten ud sammen.</p>
      </div>
      <div style="text-align:center;margin-top:14px"><button class="knap kontur lille" onclick="gåTil('hjem')">Til overblikket ${ik('pil')}</button></div>`;
  }
  if(status==='afslået'){
    return `
      <div class="advarsel">${navn} kan desværre ikke denne gang. Det er helt okay — måske en anden.</div>
      <div class="kort">
        <button class="knap primær bred" onclick="invNulstilSammen()">${ik('mail')} Inviter en anden</button>
        <button class="knap kontur bred" style="margin-top:10px" onclick="vælgInvType('selv')">Tag afsted selv</button>
      </div>`;
  }
  if(status==='forhandler' && f.invForslagFra==='gæst'){
    return `
      <div class="kort guide-brød"><p><b>${navn}</b> kan ikke den ${f.dato?pænDato(f.dato):'foreslåede dato'} og foreslår i stedet:</p></div>
      <div class="kort">
        <div class="etiket">Vælg en af ${navn}s datoer</div>
        ${f.invForslag.map(d=>`<button class="forslag-knap" style="margin-top:10px" onclick="brugerBekræftDato('${d}')"><span class="f-ikon">${ik('kort')}</span><span style="flex:1"><b>${pænDato(d)}</b></span><span class="pil">${ik('tjek')}</span></button>`).join('')}
        <button class="knap kontur bred" style="margin-top:14px" onclick="brugerForeslåNye()">${ik('kort')} Ingen passer — foreslå 3 nye</button>
      </div>`;
  }
  if(status==='forhandler'){ // bruger har lige foreslået — afventer gæst
    return `
      <div class="advarsel">Du foreslog 3 nye datoer. Nu venter I på ${navn}.</div>
      <div class="kort">
        <div class="etiket">Dine forslag</div>
        ${f.invForslag.map(d=>`<div class="vært-række">${ik('kort')}<div class="v-tekst">${pænDato(d)}</div></div>`).join('')}
      </div>
      <div class="kort">
        <div class="etiket">Prøv gæstens svar (demo)</div>
        <p class="dæmpet" style="font-size:13px;margin:6px 0 12px">Hvordan svarer ${navn}?</p>
        ${f.invForslag.map(d=>`<button class="knap primær bred" style="margin-top:8px" onclick="brugerBekræftDato('${d}')">${ik('tjek')} ${navn} bekræfter ${pænDato(d)}</button>`).join('')}
        <button class="knap kontur bred" style="margin-top:10px" onclick="gæstAfslå()">${ik('kryds')} Afslå arytmen</button>
      </div>`;
  }
  // status === 'sendt'
  return `
    <div class="advarsel">Invitation sendt til ${navn}. Nu venter I på svar.</div>
    ${gæstePreview(f)}
    <div class="kort">
      <div class="etiket">Prøv gæstens svar (demo)</div>
      <p class="dæmpet" style="font-size:13px;margin:6px 0 12px">Sådan svarer ${navn} fra sin egen telefon:</p>
      <button class="knap primær bred" onclick="gæstBekræft()">${ik('tjek')} Bekræft ${f.dato?pænDato(f.dato):'datoen'}</button>
      <button class="knap blød bred" style="margin-top:10px" onclick="gæstForeslå()">${ik('kort')} Foreslå 3 andre datoer</button>
      <button class="knap kontur bred" style="margin-top:10px" onclick="gæstAfslå()">${ik('kryds')} Afslå arytmen</button>
    </div>`;
}
function invSend(){
  const f = s.forberedelse; if(!f.invModtager){ flash('Skriv hvem invitationen er til.'); return; }
  f.invStatus='sendt'; gem(); tegn();
  flash('Invitation sendt (demo) til '+f.invModtager+'.', 'mail');
}
function gæstBekræft(){
  const f = s.forberedelse; f.invEnigDato=f.dato; f.invStatus='bekræftet'; gem(); tegn();
  flash('I er enige om datoen. Turen er oprettet.', 'hjerte');
}
function gæstForeslå(){
  const f = s.forberedelse; f.invForslag=forslagsDatoer(f.dato); f.invForslagFra='gæst'; f.invStatus='forhandler'; gem(); tegn();
}
function gæstAfslå(){
  const f = s.forberedelse; f.invStatus='afslået'; gem(); tegn();
}
function brugerBekræftDato(iso){
  const f = s.forberedelse; f.dato=iso; f.invEnigDato=iso; f.invStatus='bekræftet'; gem(); tegn();
  flash('I er enige om '+pænDato(iso)+'. Turen er oprettet.', 'hjerte');
}
function brugerForeslåNye(){
  const f = s.forberedelse; f.invForslag=forslagsDatoer(f.invForslag[0]||f.dato); f.invForslagFra='bruger'; f.invStatus='forhandler'; gem(); tegn();
}
function invNulstilSammen(){
  const f = s.forberedelse;
  f.invStatus='kladde'; f.invModtager=''; f.invForslag=[]; f.invForslagFra=null; f.invEnigDato=null;
  gem(); tegn();
}

/* ---------- Giv som gave ---------- */
function invGaveKrop(){
  const f = s.forberedelse;
  if(f.invStatus==='sendt'){
    return `
      <div class="mørk-kort"><div class="glød"></div>
        <div class="etiket" style="color:rgba(246,243,234,.6)">Overraskelsen er sendt</div>
        <h3 style="margin-top:4px">${esc(f.invModtager||'Din rejsemakker')} er inviteret</h3>
        <p style="margin-top:6px">Den færdige, flotte invitation er på vej. Nu kan I bare glæde jer.</p>
      </div>
      <div class="ob-mail">
        <div class="m-top">${ik('mail')} Til: ${esc(f.invModtager||'din rejsemakker')}</div>
        <div class="m-krop"><div class="od-plads"><span class="od-mærke">OD laver</span><br>Den flotte overraskelses-invitation designes af OD og indsættes her — med dato, sted og en varm hilsen.</div></div>
      </div>
      <div style="text-align:center;margin-top:14px"><button class="knap kontur lille" onclick="gåTil('hjem')">Til overblikket ${ik('pil')}</button></div>`;
  }
  const mad = forplejningKlar(), bil = f.bilTjek.length>=BILEN_PUNKTER.length, pakke = f.pakkeTjek.length>=PAKKE_PUNKTER.length;
  const rk = (ok,navn,under,mål)=>`<button class="tjek-punkt ${ok?'klar':''}" onclick="gåTil('${mål}')"><span class="tjek-boks">${ik('tjek')}</span><span class="tjek-krop"><span class="tjek-navn">${navn}</span><span class="tjek-under">${under}</span></span><span class="tjek-pil">${ik('pil')}</span></button>`;
  return `
    <div class="kort guide-brød"><p><b>Planlæg turen som en overraskelse.</b> ${esc(f.invModtager||'Din rejsemakker')} ser ingenting endnu. Gør detaljerne klar, og send så den færdige invitation.</p></div>
    <div class="kort">
      <label class="felt-etiket" style="margin-top:0">Hvem er overraskelsen til?</label>
      <input type="text" placeholder="Fx Anne eller anne@mail.dk" value="${esc(f.invModtager||'')}" oninput="s.forberedelse.invModtager=this.value;gem()">
    </div>
    <div class="sektion"><h3>Gør klar i det skjulte</h3></div>
    ${rk(mad,'Mad & drikke','Forplejning til turen','mad')}
    ${rk(bil,'Bilen','Ladning, Camp Mode, tasken','bilen')}
    ${rk(pakke,'Pakkeliste','De personlige ting','pakke')}
    <button class="knap primær bred ånde" style="margin-top:18px" ${f.invModtager?'':'disabled'} onclick="gaveSend()">${ik('gave')} Send overraskelsen</button>
    <div style="text-align:center;margin-top:14px"><button class="knap kontur lille" onclick="invSkift()">${ik('tilbage')} Vælg noget andet</button></div>`;
}
function gaveSend(){
  const f = s.forberedelse; if(!f.invModtager){ flash('Skriv hvem overraskelsen er til.'); return; }
  f.invStatus='sendt'; gem(); tegn();
  flash('Overraskelsen er sendt (demo) til '+f.invModtager+'.', 'gave');
}

/* =============================================================
   FORBERED TUR — hver sektion er sin egen side, i rækkefølge
   ============================================================= */
/* To faser: 1) planlæg i god tid  2) gør klar på afgangsdagen */
const SEKTIONER = [
  { id:'destination', fase:1, navn:'Destination',      under:'Hvor tager I hen?',        ikon:'nål',    farve:'#eadfcd', ifarve:'#8a5f3e',
    spørg:'Hvor skal turen gå hen?',      forklar:'Sæt en pin på kortet, søg en by — eller vælg et af vores testede steder.' },
  { id:'aktivitet',   fase:1, navn:'Aktivitet',        under:'Oplevelser på turen',      ikon:'gnist',  farve:'#efe6d8', ifarve:'#996f3d',
    spørg:'Hvad vil I lave på turen?',    forklar:'50 idéer til jer to i og omkring bilen.' },
  { id:'mad',         fase:1, navn:'Mad/drikke',       under:'Tips fra vores egne ture', ikon:'kop',    farve:'#ece8dd', ifarve:'#6b705c',
    spørg:'Hvad skal I spise og drikke?', forklar:'Vores egne tips til aftensmad, morgenkaffe og det søde undervejs.' },
  { id:'bilen',       fase:2, navn:'Bilen',            under:'Lade, Camp Mode, tasken',  ikon:'bil',    farve:'#e6e6d9', ifarve:'#5f6353',
    spørg:'Er bilen klar?',               forklar:'Ladning, Camp Mode og alt indholdet i Døsige Dølle-tasken.' },
  { id:'pakke',       fase:2, navn:'Pakke',            under:'Personlige ting',          ikon:'telt',   farve:'#e8e2d4', ifarve:'#7a6a4f',
    spørg:'Hvad skal I selv have med?',   forklar:'De personlige ting — nattøj, toilettaske og tøj efter destinationen.' }
];
const FASER = {
  1:{ navn:'Planlæg turen', etiket:'Trin 1 · Planlæg', intro:'Det I gerne vil kigge på i god tid — hvor, hvad og hvordan turen skal føles.' },
  2:{ navn:'Gør klar til afgang', etiket:'Trin 2 · På dagen', intro:'De sidste ting, der pakkes på selve dagen. Så er I af sted.' }
};
function tilFase(n){
  if(!s.forberedelse) return;
  const heltFærdig = n===2 && fremdrift(1).mangler===0;
  s.forberedelse.fase = n;
  gem();
  if(heltFærdig) flash('Planen er klar. Godt gået — nu gør vi klar til afgang.', 'tjek');
  gåTil(sektionListe(n)[0].id);
}
function afSted(){
  const dest = s.forberedelse.destination;
  s.påTur = { sted: dest ? dest.navn : '', startet: new Date().toISOString().slice(0,10) };
  s.forberedelse = null;
  gem(); gåTil('hjem');
  flash('Af sted. God tur — og godt gået.');
}
function annullerForberedelse(){
  bekræft('Annullér turen? Både planen og afkrydsningerne nulstilles.', ()=>{
    s.forberedelse = null; gem(); gåTil('hjem');
  });
}

/* =============================================================
   1 · DESTINATION
   ============================================================= */
let søgTekst = '';
/* Ægte, interaktivt kort (Leaflet + OpenStreetMap). Genbruger den geografiske
   kalibrering fra xyTilGeo/geoTilXY, så resten af appen (solnedgang, vejr,
   nærmeste-testet-sted) stadig kan regne i det samme x/y-system som før. */
let rigtigtKortInstans = null;
function tegnRigtigtKort(){
  const el = document.getElementById('rigtigt-kort');
  if(!el || typeof L==='undefined') return;
  if(rigtigtKortInstans){ rigtigtKortInstans.remove(); rigtigtKortInstans = null; }
  const map = L.map(el, { attributionControl:true }).setView([56.1,10.5], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:18, attribution:'© OpenStreetMap'
  }).addTo(map);

  const testetIkon = L.divIcon({
    className:'', iconSize:[28,28], iconAnchor:[14,14],
    html:`<div class="lkort-testet">${ik('stjerne')}</div>`
  });
  TESTEDE.forEach(t=>{
    const geo = (t.lat!=null && t.lon!=null) ? { lat:t.lat, lon:t.lon } : xyTilGeo(t.x, t.y);
    L.marker([geo.lat, geo.lon], { icon:testetIkon, title:t.navn }).addTo(map)
      .bindTooltip(t.navn, { direction:'top', offset:[0,-14] })
      .on('click', e=>{ L.DomEvent.stopPropagation(e); åbnTestet(t.id); });
  });

  const f = s.forberedelse;
  if(f && f.destination){
    const testet = f.destination.testetId && TESTEDE.find(t=>t.id===f.destination.testetId);
    const geo = (testet && testet.lat!=null && testet.lon!=null)
      ? { lat:testet.lat, lon:testet.lon }
      : xyTilGeo(f.destination.x, f.destination.y);
    const brugerIkon = L.divIcon({
      className:'', iconSize:[16,16], iconAnchor:[8,8],
      html:`<div class="lkort-bruger"><span class="puls"></span><span class="prik"></span></div>`
    });
    L.marker([geo.lat, geo.lon], { icon:brugerIkon }).addTo(map);
    map.setView([geo.lat, geo.lon], 10);
  }

  map.on('click', e=>{
    const xy = geoTilXY(e.latlng.lat, e.latlng.lng);
    sætDestination({ navn:'Jeres eget sted', x:Math.round(xy.x), y:Math.round(xy.y) });
  });

  rigtigtKortInstans = map;
}
function sætDestination(dest){
  if(!s.forberedelse) s.forberedelse = nyForberedelse();
  s.forberedelse.destination = dest;
  gem(); tegn();
  flash(`${dest.navn} er sat som destination.`, 'nål');
}
function søgBy(){
  const q = ($('bySøg').value||'').trim().toLowerCase();
  if(!q) return;
  const hit = BYER.find(b=>b.n.toLowerCase().startsWith(q)) || BYER.find(b=>b.n.toLowerCase().includes(q));
  if(hit) sætDestination({ navn:hit.n, x:hit.x, y:hit.y });
  else flash('Byen er ikke i prototypens liste endnu — sæt en pin på kortet i stedet.');
}
function brugGPS(){
  if(!navigator.geolocation){ gpsFallback(); return; }
  flash('Finder jeres position …','gps');
  navigator.geolocation.getCurrentPosition(pos=>{
    const {lat,lon} = { lat:pos.coords.latitude, lon:pos.coords.longitude };
    const xy = geoTilXY(lat,lon);
    sætDestination({ navn:'Jeres position', x:Math.round(xy.x), y:Math.round(xy.y) });
  }, gpsFallback, {timeout:6000});
}
function gpsFallback(){
  sætDestination({ navn:'Jeres position (demo — Aarhus)', x:92, y:120 });
}
function sætTurDato(v){
  if(!s.forberedelse) return;
  s.forberedelse.dato = v || null;
  gem();
  // opdater kun værtskortet (solnedgang) — undgå at genindlæse hele kortet
  const vk = document.getElementById('vaert-kort');
  if(vk) vk.outerHTML = værtsKort();
}
function værtsKort(){
  const f = s.forberedelse;
  const dest = f && f.destination;
  if(!dest) return '';
  const geo = xyTilGeo(dest.x, dest.y);
  const nu = new Date();
  const idag = !f.dato || f.dato === nu.toISOString().slice(0,10);
  const beregnDato = f.dato ? new Date(f.dato+'T18:00:00') : nu;
  const ned = solnedgang(geo.lat, geo.lon, beregnDato);
  const vejr = demoVejr(dest.x, dest.y);
  let solLinje;
  if(ned){
    const tid = ned.toLocaleTimeString('da-DK',{hour:'2-digit',minute:'2-digit'});
    if(idag){
      const min = Math.round((ned - nu)/60000);
      solLinje = min>0 && min<600 ? `Solen går ned mod vest om ${min} minutter (kl. ${tid})`
               : min<=0 ? `Solen gik ned kl. ${tid} — i morgen står den op igen`
               : `Solen går ned kl. ${tid} — planlæg at være fremme en time før`;
    } else {
      solLinje = `Solen går ned kl. ${tid} på jeres dato — vær fremme en halv time før`;
    }
  } else solLinje = 'Solnedgang beregnes, når destinationen er sat';
  const nærTestet = TESTEDE.find(t=>t.klar && Math.hypot(t.x-dest.x,t.y-dest.y)<16);
  const fac = nærTestet ? nærTestet.faciliteter : null;
  return `
  <div class="kort" id="vaert-kort">
    <div class="etiket">Den gode vært siger</div>
    <div class="vært-række">${ik('sol')}<div class="v-tekst">${solLinje}</div></div>
    <div class="vært-række">${ik('kop')}<div class="v-tekst">Find et sted med udsigt, og bryg kaffen bagefter</div></div>
    <div class="vært-række">${ik('måne')}<div class="v-tekst">${vejr.temp<15?'Husk et ekstra tæppe — der bliver '+vejr.temp+' grader i nat':'Mild nat — omkring '+vejr.temp+' grader'} <span class="dæmpet" style="font-size:11.5px">(demo-vejr)</span></div></div>
    <div class="vært-række">${ik('stjerne')}<div class="v-tekst">${vejr.himmel} efter kl. ${vejr.stjerneTime} — godt til stjernekiggeri (${årstid()}shimlen)</div></div>
    <div class="vært-række">${ik('toilet')}<div class="v-tekst"><b>Nærmeste toilet:</b> ${fac?esc(fac.toilet):'<span class="dæmpet">Vises her i den færdige app (kortdata)</span>'}</div></div>
    <div class="vært-række">${ik('kurv')}<div class="v-tekst"><b>Indkøb:</b> ${fac?esc(fac.handel):'<span class="dæmpet">Vises her i den færdige app (kortdata)</span>'}</div></div>
    <div class="vært-række">${ik('gaffel')}<div class="v-tekst"><b>Aftensmad:</b> ${fac?esc(fac.aftensmad):'<span class="dæmpet">Restauranter med åbningstider vises her</span>'}</div></div>
    <div class="vært-række">${ik('croissant')}<div class="v-tekst"><b>Morgenkaffe:</b> ${fac?esc(fac.morgen):'<span class="dæmpet">Nærmeste bager med åbningstid vises her</span>'}</div></div>
  </div>`;
}
function skærmDestination(){
  const dest = s.forberedelse && s.forberedelse.destination;
  $('indhold').innerHTML = `<div class="side anim">
    ${sektionHeader('destination')}
    <p class="dæmpet" style="margin-bottom:14px">Tryk på kortet, søg en by, eller brug jeres position. ${ik('stjerne')} = vores køreklare, testede steder — tryk for at vælge en af dem.</p>
    <div class="kort">
      <div class="kort-wrap"><div id="rigtigt-kort"></div></div>
      <div style="display:flex;gap:10px;margin-top:12px">
        <input type="text" id="bySøg" placeholder="Søg efter en by …" value="${esc(søgTekst)}" onkeydown="if(event.key==='Enter')søgBy()">
        <button class="knap primær lille" onclick="søgBy()">Søg</button>
      </div>
      <button class="knap blød bred lille" style="margin-top:10px" onclick="brugGPS()">${ik('gps')} Brug min position</button>
      ${dest?`<div class="sted-chips" style="margin-top:12px"><span class="sted-chip valgt">${ik('nål')} ${esc(dest.navn)}</span></div>`:''}
    </div>
    ${dest?`
    <div class="kort">
      <div class="etiket">Hvornår vil I afsted?</div>
      <label class="felt-etiket" style="margin-top:10px">Dato</label>
      <input type="date" value="${s.forberedelse.dato||''}" onchange="sætTurDato(this.value)">
      <label class="felt-etiket">Ca. afgangstid <span class="dæmpet" style="font-weight:400">(valgfrit)</span></label>
      <input type="time" value="${s.forberedelse.afgangstid||''}" onchange="s.forberedelse.afgangstid=this.value;gem()">
    </div>`:''}
    ${værtsKort()}
    ${sektionFod('destination')}
    <div class="sektion"><h2>Køreklar — testede steder</h2></div>
    <p class="dæmpet" style="margin:-4px 0 14px;font-size:13px">10 destinationer, vi selv har sovet på.</p>
    ${TESTEDE.map(t=>`
    <div class="forslag-knap" onclick="åbnTestet('${t.id}')" style="margin-bottom:11px;${t.klar?'':'opacity:.75'}">
      <span class="f-ikon">${ik(t.klar?'stjerne':'nål')}</span>
      <span style="flex:1"><b>${esc(t.navn)}</b><br><span class="dæmpet" style="font-size:12.5px">${t.klar?esc(t.kort):'OD udfylder beskrivelse, billede og faciliteter'}</span></span>
      <span class="pil">${ik('pil')}</span>
    </div>`).join('')}
  </div>`;
  tegnRigtigtKort();
}
function åbnTestet(id){ gåTil('testet-'+id); }
function skærmTestet(id){
  const t = TESTEDE.find(x=>x.id===id);
  if(!t){ gåTil('destination'); return; }
  $('indhold').innerHTML = `<div class="side anim">
    ${skærmTop(t.navn,'destination','Testet af Arytmi ★')}
    ${t.klar ? `
    <div class="guide-hero" style="background:linear-gradient(150deg,#4a4238,#1c1813)">
      <div class="vandmærke">${ik('stjerne')}</div>
      <h1 style="font-size:20px">${esc(t.navn)}</h1>
      <div class="g-under">${esc(t.kort)}</div>
    </div>
    <div class="kort guide-brød"><p>${esc(t.beskrivelse)}</p>
      <div class="od-plads" style="margin-top:14px"><span class="od-mærke">Billede-plads</span><br>Foto fra stedet indsættes her (OD).</div>
    </div>
    <div class="kort">
      <div class="etiket">Praktisk på stedet</div>
      <div class="vært-række">${ik('toilet')}<div class="v-tekst"><b>Toilet:</b> ${esc(t.faciliteter.toilet)}</div></div>
      <div class="vært-række">${ik('kurv')}<div class="v-tekst"><b>Indkøb:</b> ${esc(t.faciliteter.handel)}</div></div>
      <div class="vært-række">${ik('gaffel')}<div class="v-tekst"><b>Aftensmad:</b> ${esc(t.faciliteter.aftensmad)}</div></div>
      <div class="vært-række">${ik('croissant')}<div class="v-tekst"><b>Morgenkaffe:</b> ${esc(t.faciliteter.morgen)}</div></div>
    </div>` : `
    <div class="kort">
      <div class="od-plads"><span class="od-mærke">OD skriver her</span><br>
      Beskrivelse af stedet, billede og de fire facilitetsfelter (toilet · indkøb · aftensmad · morgenkaffe) udfyldes efter test-turen. Formatet ses på "${esc(TESTEDE[0].navn)}".</div>
    </div>`}
    <button class="knap primær bred" onclick="vælgTestetSted('${t.id}')">Planlæg turen ${ik('pil')}</button>
    <div style="text-align:center;margin-top:10px"><button class="knap kontur lille" onclick="gåTil('destination')">${ik('tilbage')} Gå tilbage</button></div>
  </div>`;
}
function vælgTestetSted(id){
  const t = TESTEDE.find(x=>x.id===id);
  if(!t) return;
  sætDestination({ navn:t.navn, x:t.x, y:t.y, testetId:t.id });
  const { liste, idx } = sektionPos('destination');
  gåTil(liste[idx+1].id);
}

/* =============================================================
   2 · AKTIVITET
   ============================================================= */
/* ---------- valg af aktiviteter til turen ---------- */
function findAktivitet(id){
  for(const g of AKTIVITET_GRUPPER){
    const akt = g.eksempler.find(e=>e.id===id);
    if(akt) return { gruppe:g, akt };
  }
  return null;
}
function aktivitetValgt(id){ const f=s.forberedelse; return !!(f && f.aktiviteter && f.aktiviteter.includes(id)); }
function valgteAktiviteter(){
  const f=s.forberedelse; if(!f || !f.aktiviteter) return [];
  return f.aktiviteter.map(findAktivitet).filter(Boolean);
}
function kortNavn(akt){ return akt.navn.split(' — ')[0]; }
function toggleAktivitetValg(id){
  if(!s.forberedelse) s.forberedelse = nyForberedelse();
  const arr = s.forberedelse.aktiviteter || (s.forberedelse.aktiviteter=[]);
  const i = arr.indexOf(id);
  if(i>=0){ arr.splice(i,1); flash('Fjernet fra turen.'); }
  else { arr.push(id); const fund=findAktivitet(id); flash((fund?kortNavn(fund.akt):'Aktivitet')+' er tilføjet turen.','tjek'); }
  gem(); tegn();
}

/* Rolig harmonika: kun én kategori åben ad gangen, alt foldet sammen til at begynde med. */
let aktivAktivitetGruppe = null;
function toggleAktivitetGruppe(i){
  aktivAktivitetGruppe = (aktivAktivitetGruppe===i) ? null : i;
  tegn();
}
function skærmAktivitet(){
  if(s.forberedelse && !s.forberedelse.set.aktivitet){ s.forberedelse.set.aktivitet = true; gem(); }
  const valgte = valgteAktiviteter();
  const tilTuren = valgte.length ? `
    <div class="sektion" style="margin-top:2px"><h3>${ik('hjerte')} Til turen · ${valgte.length}</h3></div>
    <div class="liste" style="margin-bottom:22px">
      ${valgte.map(({gruppe,akt})=>`
        <div class="idé-punkt">
          <button class="idé-åbn" onclick="gåTil('aktivitet-${akt.id}')">
            <span style="flex:1;min-width:0">${akt.navn}<span class="idé-gruppe">${gruppe.navn}</span></span>
            ${ik('pil')}
          </button>
          <button class="idé-tilføj valgt" onclick="toggleAktivitetValg('${akt.id}')"
            aria-pressed="true" aria-label="Fjern fra turen" title="Fjern fra turen">${ik('tjek')}</button>
        </div>`).join('')}
    </div>` : '';
  $('indhold').innerHTML = `<div class="side anim">
    ${sektionHeader('aktivitet')}
    <p class="dæmpet" style="margin-bottom:16px">Idéer til jer to — i og omkring bilen. Tryk på <b style="color:var(--gran)">+</b> for at lægge en idé til turen, eller på selve idéen for at læse mere først.</p>
    ${tilTuren}
    <div class="forslag">
      ${AKTIVITET_GRUPPER.map((g,i)=>{
        const åben = aktivAktivitetGruppe===i;
        return `
        <button class="forslag-knap" onclick="toggleAktivitetGruppe(${i})"${åben?' style="border-color:var(--rav)"':''}>
          <span class="f-ikon">${ik(g.ikon)}</span>
          <span style="flex:1"><b>${g.navn}</b><br><span class="dæmpet" style="font-size:12.5px">${g.under}</span></span>
          <span class="pil" style="transform:rotate(${åben?90:0}deg);transition:transform .25s">${ik('pil')}</span>
        </button>
        ${åben ? `
        <div class="liste" style="margin:2px 0 4px">
          ${g.eksempler.map(a=>{
            const v = aktivitetValgt(a.id);
            return `<div class="idé-punkt">
              <button class="idé-åbn" onclick="gåTil('aktivitet-${a.id}')">
                <span style="flex:1;min-width:0">${a.navn}</span>${ik('pil')}
              </button>
              <button class="idé-tilføj${v?' valgt':''}" onclick="toggleAktivitetValg('${a.id}')"
                aria-pressed="${v}" aria-label="${v?'Fjern fra turen':'Læg til turen'}"
                title="${v?'Fjern fra turen':'Læg til turen'}">${ik(v?'tjek':'plus')}</button>
            </div>`;
          }).join('')}
          ${g.antalOD>0?`<div class="liste-punkt"><div class="navn dæmpet" style="font-size:13px">+ ${g.antalOD} flere idéer på vej</div></div>`:''}
        </div>` : ''}`;
      }).join('')}
    </div>
    ${sektionFod('aktivitet')}
  </div>`;
}
/* Detaljeside for en aktivitet: guide/video (OD) eller ægte solnedgangstid,
   plus en knap til at lægge den til / fjerne den fra turen. */
function aktivitetSolnedgangKort(){
  const f = s.forberedelse, dest = f && f.destination;
  const dato = (f && f.dato) ? new Date(f.dato+'T18:00:00') : new Date();
  let linje;
  if(dest){
    const geo = xyTilGeo(dest.x, dest.y);
    const ned = solnedgang(geo.lat, geo.lon, dato);
    if(ned){
      const tid = ned.toLocaleTimeString('da-DK',{hour:'2-digit',minute:'2-digit'});
      linje = `Ved <b>${esc(dest.navn)}</b> går solen ned kl. <b>${tid}</b>${f.dato?' d. '+pænDato(f.dato).replace(/^\S+ d\. /,''):''}. Vær fremme en halv time før — så når I en god plads.`;
    } else linje = 'Solnedgangstidspunktet kan ikke beregnes for stedet.';
  } else linje = 'Vælg først en destination, så viser vi det præcise tidspunkt.';
  return `
    <div class="guide-hero" style="background:linear-gradient(150deg,#6b5433,#241f18)">
      <div class="vandmærke">${ik('sol')}</div>
      <h1 style="font-size:20px">Solen ned</h1>
      <div class="g-under">Læg telefonerne i handskerummet</div>
    </div>
    <div class="kort">
      <div class="vært-række">${ik('sol')}<div class="v-tekst">${linje}</div></div>
      <div class="vært-række">${ik('kop')}<div class="v-tekst">Bryg kaffen bagefter, mens farverne forsvinder.</div></div>
    </div>`;
}
function skærmAktivitetDetalje(id){
  const fund = findAktivitet(id);
  if(!fund){ gåTil('aktivitet'); return; }
  const { gruppe, akt } = fund;
  const valgt = aktivitetValgt(id);
  const indhold = akt.type==='solnedgang' ? aktivitetSolnedgangKort() : `
    <div class="kort guide-brød">
      <p>En lille guide til <b>${esc(kortNavn(akt).toLowerCase())}</b> — så I ved præcis, hvad I gør.</p>
      <div class="od-plads" style="margin-top:12px"><span class="od-mærke">OD skriver</span><br>Trin-for-trin-guiden skrives af OD og indsættes her.</div>
    </div>
    <div class="mørk-kort klik" onclick="flash('Video på vej — OD optager.','gnist')" style="cursor:pointer">
      <div class="glød"></div>
      <div style="display:flex;align-items:center;gap:14px">
        <span style="color:var(--rav-lys)">${ik('gnist','stor')}</span>
        <div style="flex:1"><div class="etiket" style="color:rgba(246,243,234,.6)">Video</div>
        <h3 style="margin-top:3px">Se hvordan</h3>
        <p style="margin-top:4px;font-size:13px">En kort video kommer her — OD optager.</p></div>
        ${ik('pil')}
      </div>
    </div>`;
  $('indhold').innerHTML = `<div class="side anim">
    ${skærmTop(akt.navn, 'aktivitet', gruppe.navn)}
    ${indhold}
    <button class="knap ${valgt?'kontur':'primær'} bred" style="margin-top:6px" onclick="toggleAktivitetValg('${id}')">
      ${valgt ? `${ik('tjek')} Tilføjet — fjern fra turen` : `${ik('plus')} Tilføj til turen`}
    </button>
  </div>`;
}
/* =============================================================
   3 · BILEN — liste, der kan blive tjekliste
   ============================================================= */
let bilenTjekliste = false;
function skærmBilen(){
  const f = s.forberedelse || nyForberedelse();
  const tjek = f.bilTjek || [];
  const taske = BILEN_PUNKTER.filter(p=>p.taske);
  const løse = BILEN_PUNKTER.filter(p=>!p.taske);
  const række = (p)=>{
    const markeret = tjek.includes(p.id);
    if(!bilenTjekliste) return `
      <div class="liste-punkt">
        <span style="color:var(--rav)">${ik(p.taske?'telt':p.id==='lade'?'lyn':p.id==='camp'?'bil':'måne')}</span>
        <div class="navn">${p.tekst}${p.tip?`<div class="dæmpet" style="font-size:12.5px;margin-top:2px">${p.tip}</div>`:''}</div>
      </div>`;
    return `
      <div class="liste-punkt ${markeret?'strøget':''}" onclick="bilTjek('${p.id}')" style="cursor:pointer">
        <div class="tjekboks ${markeret?'markeret':''}"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div>
        <div class="navn">${p.tekst}${p.tip?`<div class="dæmpet" style="font-size:12.5px;margin-top:2px">${p.tip}</div>`:''}</div>
      </div>`;
  };
  const sortér = liste => bilenTjekliste
    ? [...liste.filter(p=>!tjek.includes(p.id)), ...liste.filter(p=>tjek.includes(p.id))]
    : liste;
  $('indhold').innerHTML = `<div class="side anim">
    ${sektionHeader('bilen')}
    <div class="liste">
      ${sortér(løse.slice(0,2)).map(række).join('')}
    </div>
    <div class="sektion"><h3>${ik('telt')} Medbring "Døsige Dølle"-tasken</h3></div>
    <p class="dæmpet" style="margin:-4px 0 12px;font-size:13px">Tasken indeholder:</p>
    <div class="liste">
      ${sortér(taske).map(række).join('')}
    </div>
    <div class="liste">
      ${sortér(løse.slice(2)).map(række).join('')}
    </div>
    <div class="mørk-kort">
      <div class="glød"></div>
      <div class="etiket" style="color:rgba(246,243,234,.6)">Bonus i tasken</div>
      <h3 style="margin-top:4px">${ik('gnist')} Fysisk hyggebelysning</h3>
      <p style="margin-top:6px">Følger med — varmt lys uden at trække på bilens strøm.</p>
    </div>
    <div class="sælg-kort">
      <div class="sælg-etiket">Døsige Dølle-tasken</div>
      <h3>Mangler I noget af det her?</h3>
      <p>Madras, forlænger, lagen, dyner og afskærmning — samlet i tasken, så I ikke skal ud og finde det hele hver for sig.</p>
      <button class="knap primær bred" onclick="gåTilKøb()">Køb Døsige Dølle-tasken ${ik('pil')}</button>
      <button class="knap ${bilenTjekliste?'blød':'kontur'} bred" style="margin-top:10px" onclick="bilenTjekliste=!bilenTjekliste;tegn()">
        ${bilenTjekliste ? 'Tilbage til listen' : 'Gør listen til en tjekliste'} ${ik(bilenTjekliste?'bog':'tjek')}
      </button>
    </div>
    ${bilenTjekliste?`<p class="dæmpet" style="text-align:center;font-size:12.5px;margin-top:-10px">Tryk på et punkt for at strege det over — det flytter selv ned i bunden. Tryk igen for at fortryde.</p>`:''}
    ${sektionFod('bilen')}
  </div>`;
}
function bilTjek(id){
  if(!s.forberedelse) s.forberedelse = nyForberedelse();
  const t = s.forberedelse.bilTjek;
  const i = t.indexOf(id);
  if(i>=0) t.splice(i,1); else t.push(id);
  gem(); tegn();
}

/* =============================================================
   4 · MAD/DRIKKE
   ============================================================= */
/* ---------- valg af mad/forplejning til turen ---------- */
function madValgt(id){ const f=s.forberedelse; return !!(f && f.madValg && f.madValg.includes(id)); }
function valgtMad(){ const f=s.forberedelse; if(!f||!f.madValg) return []; return f.madValg.filter(id=>MAD_INDLÆG[id]).map(id=>({id, m:MAD_INDLÆG[id]})); }
function forplejningKlar(){ const f=s.forberedelse; return !!(f && f.madValg && f.madValg.length); }
function toggleMadValg(id){
  if(!s.forberedelse) s.forberedelse = nyForberedelse();
  const arr = s.forberedelse.madValg || (s.forberedelse.madValg=[]);
  const i = arr.indexOf(id);
  if(i>=0){ arr.splice(i,1); flash('Fjernet fra turen.'); }
  else { arr.push(id); flash(MAD_INDLÆG[id].titel+' er tilføjet turen.','tjek'); }
  gem(); tegn();
}
function skærmMad(){
  if(s.forberedelse && !s.forberedelse.set.mad){ s.forberedelse.set.mad = true; gem(); }
  const valgt = valgtMad();
  const tilTuren = valgt.length ? `
    <div class="sektion" style="margin-top:2px"><h3>${ik('hjerte')} Til turen · ${valgt.length}</h3></div>
    <div class="liste" style="margin-bottom:22px">
      ${valgt.map(({id,m})=>`
        <div class="liste-punkt" onclick="gåTil('mad-${id}')" style="cursor:pointer">
          <span style="color:#6d7d5e;flex-shrink:0">${ik('tjek')}</span>
          <div class="navn" style="flex:1;font-size:14.5px">${m.titel}</div>
          <span style="color:#c9c2b0;flex-shrink:0">${ik('pil')}</span>
        </div>`).join('')}
    </div>` : '';
  $('indhold').innerHTML = `<div class="side anim">
    ${sektionHeader('mad')}
    <div class="kort guide-brød">
      <p>Mad og drikke er en stor del af oplevelsen — og af vores liv. Tryk på et indlæg for at læse det og lægge det til turen.</p>
      <p class="citat" style="margin-bottom:0">TIP: Husk kopper, glas, tallerkner og bestik, hvis det skal bruges.</p>
    </div>
    ${tilTuren}
    ${Object.entries(MAD_INDLÆG).map(([id,m])=>`
    <div class="forslag-knap" onclick="gåTil('mad-${id}')" style="margin-bottom:11px">
      <span class="f-ikon">${ik(m.ikon)}</span>
      <span style="flex:1"><b>${m.titel}</b><br><span class="dæmpet" style="font-size:12.5px">${m.klar?'Læs indlægget':'Indlæg på vej — OD skriver'}</span></span>
      <span class="pil"${madValgt(id)?' style="color:#6d7d5e"':''}>${ik(madValgt(id)?'tjek':'pil')}</span>
    </div>`).join('')}
    <div class="sektion"><h3>${ik('gnist')} Bonus</h3></div>
    <div class="kort">
      <h3>Den bedste varme kakao over blus</h3>
      <div class="od-plads"><span class="od-mærke">OD skriver her</span><br>Bonusopskrift på den bedste varme kakao over blus.</div>
      <h3 style="margin-top:16px">Den hyggeligste havregrød dagen derpå</h3>
      <div class="od-plads"><span class="od-mærke">OD skriver her</span><br>Bonusopskrift på den hyggeligste havregrød dagen derpå.</div>
    </div>
    ${sektionFod('mad')}
  </div>`;
}
function skærmMadIndlæg(id){
  const m = MAD_INDLÆG[id];
  if(!m){ gåTil('mad'); return; }
  const valgt = madValgt(id);
  $('indhold').innerHTML = `<div class="side anim">
    ${skærmTop(m.titel,'mad','Mad & drikke')}
    <div class="guide-hero" style="background:linear-gradient(150deg,#6b5433,#241f18)">
      <div class="vandmærke">${ik(m.ikon)}</div>
      <h1>${m.titel}</h1>
      <div class="g-under">${m.klar?'Skrevet efter egne ture':'Indlæg på vej'}</div>
    </div>
    <div class="kort guide-brød">
      ${m.klar ? m.brød : `
      <div class="od-plads"><span class="od-mærke">OD skriver her</span><br>
      Indlægget om ${m.titel.toLowerCase()} — tips, erfaringer og anbefalinger fra egne ture.
      Formatet kan ses under "Morgenmad og kaffe".</div>${m.ekstra||''}`}
    </div>
    <button class="knap ${valgt?'kontur':'primær'} bred" onclick="toggleMadValg('${id}')">
      ${valgt ? `${ik('tjek')} Tilføjet — fjern fra turen` : `${ik('plus')} Tilføj til turen`}
    </button>
  </div>`;
}

/* =============================================================
   5 · PAKKE — personlige ting
   ============================================================= */
function skærmPakke(){
  const f = s.forberedelse || nyForberedelse();
  const tjek = f.pakkeTjek || [];
  $('indhold').innerHTML = `<div class="side anim">
    ${sektionHeader('pakke')}
    <p class="dæmpet" style="margin-bottom:14px">Det eneste, I selv skal pakke — resten ligger i tasken og bilen.</p>
    <div class="liste">
      ${PAKKE_PUNKTER.map(p=>{
        const markeret = tjek.includes(p.id);
        return `
        <div class="liste-punkt ${markeret?'strøget':''}" onclick="pakkeTjek('${p.id}')" style="cursor:pointer">
          <div class="tjekboks ${markeret?'markeret':''}"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div>
          <div class="navn">${p.tekst}</div>
        </div>`;}).join('')}
    </div>
    ${s.forberedelse&&s.forberedelse.destination?`<p class="dæmpet" style="font-size:13px">Destination: ${esc(s.forberedelse.destination.navn)} — ${['t1'].includes(s.forberedelse.destination.testetId)?'tag badetøjet med, I er ved vandet.':'tjek om der er badevand i nærheden.'}</p>`:''}
    ${sektionFod('pakke')}
  </div>`;
}
function pakkeTjek(id){
  if(!s.forberedelse) s.forberedelse = nyForberedelse();
  const t = s.forberedelse.pakkeTjek;
  const i = t.indexOf(id);
  if(i>=0) t.splice(i,1); else t.push(id);
  gem(); tegn();
}

/* =============================================================
   6 · ARYTMI ØJEBLIKKE
   ============================================================= */
function skærmØjeblikke(){
  if(s.forberedelse && !s.forberedelse.set.øjeblikke){ s.forberedelse.set.øjeblikke = true; gem(); }
  // Siden er både afrundingen på planlægningen og "Om Arytmi" under Profil.
  // Kom man fra Mad/drikke, er man i flowet og skal videre til fase 2.
  const iFlowet = !!(s.forberedelse && (s.forberedelse.fase||1)===1 && sidsteSkærm==='mad');
  $('indhold').innerHTML = `<div class="side anim">
    ${skærmTop('Hvordan bliver turen mindeværdig?', iFlowet?'mad':'profil', iFlowet?'Planen er klar':'Om Arytmi')}
    <div class="guide-hero" style="background:linear-gradient(150deg,#5c4348,#1c1813)">
      <div class="vandmærke">${ik('hjerte')}</div>
      ${ekgSVG('rgba(246,243,234,.5)')}
      <h1>En sund forstyrrelse</h1>
      <div class="g-under">af en vant rytme</div>
    </div>
    <div class="kort guide-brød">
      <p>Arytmi er en forstyrrelse af en vant rytme. Det er vigtigt at tage tid ud til sig selv og hinanden i en travl hverdag — og når man så tager den tid, er det også vigtigt, at tiden bliver god.</p>
      <p style="margin-top:10px">Vi arbejder med to ting:</p>
      <ul>
        <li><b>At fjerne så meget friktion som muligt</b> — det er appen.</li>
        <li><b>Så I kan gøre øjeblikkene så mindeværdige som muligt</b> — det er jer.</li>
      </ul>
    </div>
    ${iFlowet ? `
    <div style="margin-top:18px">
      <div class="fod-nav">
        <button class="knap kontur lille" onclick="gåTil('mad')">${ik('tilbage')} Forrige: Mad/drikke</button>
        <button class="knap kontur lille" onclick="tilFase(2)">Gør klar til afgang ${ik('pil')}</button>
      </div>
      <div style="text-align:center;margin-top:16px"><button class="knap kontur lille" onclick="annullerForberedelse()">Annullér turen</button></div>
    </div>` : ''}
  </div>`;
}

/* =============================================================
   ANMELD TUR — 3 spørgsmål + kommentar
   ============================================================= */
let anmeldKladde = null;
function skærmAnmeld(){
  if(!s.anmeldAfventer){ gåTil('hjem'); return; }
  if(!anmeldKladde) anmeldKladde = { destination:0, app:0, hygge:0, kommentar:'' };
  const bedøm = (felt,tekst)=>`
    <div class="bedøm-række"><span style="font-size:14px;flex:1">${tekst}</span>
      <div class="prikker">${[1,2,3,4,5].map(n=>
        `<button class="prik-valg ${anmeldKladde[felt]>=n?'valgt':''}" onclick="anmeldKladde.${felt}=${n};tegn()">${n}</button>`).join('')}
      </div>
    </div>`;
  $('indhold').innerHTML = `<div class="side anim">
    ${skærmTop('Anmeld turen','hjem','30 sekunder — så er I færdige')}
    <div class="kort">
      <div class="etiket">${esc(s.anmeldAfventer.sted||'Jeres tur')} · ${pænDato(s.anmeldAfventer.dato)}</div>
      ${bedøm('destination','Hvor god var destinationen?')}
      ${bedøm('app','Hvor nemt var det med Arytmi-appen?')}
      ${bedøm('hygge','Hvor hyggelig var turen for jer?')}
      <label class="felt-etiket">Kommentar (helt frivilligt)</label>
      <textarea placeholder="Skriv løs — eller lad være" oninput="anmeldKladde.kommentar=this.value">${esc(anmeldKladde.kommentar)}</textarea>
    </div>
    <button class="knap primær bred" onclick="sendAnmeldelse()" style="margin-bottom:10px">Send anmeldelse</button>
    <button class="knap kontur bred" onclick="skipAnmeldelse()">Spring over</button>
  </div>`;
}
function sendAnmeldelse(){
  s.ture.unshift({
    sted:s.anmeldAfventer.sted||'Jeres sted', dato:s.anmeldAfventer.dato,
    score:{destination:anmeldKladde.destination, app:anmeldKladde.app, hygge:anmeldKladde.hygge},
    kommentar:anmeldKladde.kommentar.trim()
  });
  s.anmeldAfventer = null; anmeldKladde = null;
  gem(); gåTil('log');
  flash('Tak! Turen er gemt i loggen, og feedback er sendt til OD (simuleret).', 'mail');
}
function skipAnmeldelse(){
  s.ture.unshift({ sted:s.anmeldAfventer.sted||'Jeres sted', dato:s.anmeldAfventer.dato, score:null, kommentar:'' });
  s.anmeldAfventer = null; anmeldKladde = null;
  gem(); gåTil('hjem');
  flash('Helt fint — turen er gemt i loggen uden anmeldelse.');
}

/* =============================================================
   LOG
   ============================================================= */
function bølge(n){ return `<span class="bølger">${'●'.repeat(n||0)}${'○'.repeat(5-(n||0))}</span>`; }
function årshjulSVG(){
  const iÅr = new Date().getFullYear();
  const tureIÅr = s.ture.filter(t=>t.dato && String(t.dato).startsWith(String(iÅr)));
  const R = 90, C = 120;
  const vink = f => f*2*Math.PI - Math.PI/2;
  const sæsoner = [
    {fra:11/12, til:14/12, farve:'#8fa8b8'},{fra:2/12, til:5/12, farve:'#93ac8b'},
    {fra:5/12, til:8/12, farve:'#d9b48c'},{fra:8/12, til:11/12, farve:'#c08d5a'}
  ];
  const pkt = (v,r) => `${C+r*Math.cos(v)} ${C+r*Math.sin(v)}`;
  const buer = sæsoner.map(sæ=>`<path d="M ${pkt(vink(sæ.fra),R)} A ${R} ${R} 0 0 1 ${pkt(vink(sæ.til),R)}" fill="none" stroke="${sæ.farve}" stroke-width="3.5" stroke-linecap="round" opacity=".55"/>`).join('');
  let prikker = '';
  tureIÅr.forEach((t,i)=>{
    const d = new Date(t.dato+'T12:00:00');
    const v = vink(((d-new Date(iÅr,0,1))/86400000)/365);
    prikker += `<circle class="års-prik" style="animation-delay:${i*.4}s" cx="${C+R*Math.cos(v)}" cy="${C+R*Math.sin(v)}" r="6.5" fill="#b0794e" stroke="#faf9f5" stroke-width="2.5"/>`;
  });
  let mdrTegn = '';
  for(let m=0;m<12;m++){
    const v = vink(m/12);
    mdrTegn += `<text x="${C+(R+20)*Math.cos(v)}" y="${C+(R+20)*Math.sin(v)+4}" text-anchor="middle" font-size="10" fill="#8e8a7f">${'JFMAMJJASOND'[m]}</text>`;
  }
  return `<svg viewBox="0 0 240 240" width="232" height="232">
    <circle cx="${C}" cy="${C}" r="${R}" fill="none" stroke="#ddd8cb" stroke-width="1.5"/>
    ${buer}${mdrTegn}${prikker}
    <text x="${C}" y="${C-2}" text-anchor="middle" font-size="40" font-weight="600" fill="#3a3227" font-family="Iowan Old Style,Palatino,Georgia,serif">${tureIÅr.length}</text>
    <text x="${C}" y="${C+20}" text-anchor="middle" font-size="12" fill="#8e8a7f">${tureIÅr.length===1?'tur':'ture'} i år</text>
  </svg>`;
}
function skærmLog(){
  const tomt = !s.ture.length;
  $('indhold').innerHTML = `<div class="side anim">
    <div style="padding-top:26px">
      <div class="etiket">Jeres ture</div>
      <h1 style="margin-top:6px">Loggen</h1>
    </div>
    ${tomt ? `
    <div class="kort tom-tilstand" style="margin-top:18px">
      <div style="color:var(--rav);margin-bottom:12px"><svg class="ik" style="width:44px;height:44px" viewBox="0 0 24 24">${IKONER.måne}</svg></div>
      <h3>Ingen ture endnu.</h3>
      <p class="dæmpet" style="margin-top:8px">Den første bliver den, I husker bedst.</p>
      <div style="margin-top:20px"><button class="knap primær" onclick="gåTil('hjem')">Forbered en tur</button></div>
    </div>` : `
    <div class="kort" style="margin-top:18px;display:flex;justify-content:center;padding:26px 0 18px">${årshjulSVG()}</div>
    ${s.ture.map(t=>`
    <div class="tur-kort">
      <div class="top"><h3>${esc(t.sted)}</h3><span class="dato">${pænDato(t.dato)}</span></div>
      ${t.score ? `
      <div style="display:flex;gap:14px;margin-top:10px;flex-wrap:wrap;font-size:12.5px;color:var(--dæmpet)">
        <span>Destination ${bølge(t.score.destination)}</span>
        <span>Appen ${bølge(t.score.app)}</span>
        <span>Hygge ${bølge(t.score.hygge)}</span>
      </div>` : `<div class="dæmpet" style="font-size:13px;margin-top:6px">Ikke anmeldt</div>`}
      ${t.kommentar?`<p style="font-size:14px;margin-top:10px"><b style="color:var(--gran)">Kommentar:</b> ${esc(t.kommentar)}</p>`:''}
    </div>`).join('')}`}
  </div>`;
}

/* =============================================================
   PROFIL
   ============================================================= */
function skærmProfil(){
  const p = s.profil;
  $('indhold').innerHTML = `<div class="side anim">
    ${skærmTop('Profil & indstillinger','hjem')}
    <div class="kort">
      <label class="felt-etiket" style="margin-top:0">E-mail</label>
      <input type="email" value="${esc(p.email)}" oninput="s.profil.kodeEmail=this.value;s.profil.email=this.value;gem()">
      <label class="felt-etiket">Personlig kode</label>
      <input type="password" value="${esc(p.kode)}" maxlength="4" oninput="s.profil.kode=this.value;gem()">
    </div>
    <div class="kort">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px">
        <span style="color:var(--rav)">${ik('klokke')}</span><h3>Notifikationer</h3>
        <span style="margin-left:auto" class="serif" style="color:var(--gran)">${p.notifikationer?'Til':'Fra'}</span>
      </div>
      <p class="dæmpet" style="font-size:13.5px">Vi sender kun notifikationer, der forbedrer oplevelsen med appen og madrassen.</p>
      ${!p.notifikationer?`<div class="advarsel" style="margin-top:12px">Uden notifikationer virker appen ikke optimalt, og oplevelsen kan blive kompromitteret.</div>`:''}
      <button class="knap ${p.notifikationer?'kontur':'primær'} bred" style="margin-top:12px" onclick="s.profil.notifikationer=!s.profil.notifikationer;gem();tegn()">
        ${p.notifikationer?'Slå notifikationer fra':'Slå notifikationer til'}
      </button>
    </div>
    <div class="liste" style="margin-top:4px">
      <div class="liste-punkt" onclick="gåTil('øjeblikke')" style="cursor:pointer">
        <span style="color:var(--rav);flex-shrink:0">${ik('hjerte')}</span>
        <div class="navn" style="font-size:14.5px">Om Arytmi<div class="dæmpet" style="font-size:12px;margin-top:2px">En sund forstyrrelse af en vant rytme</div></div>
        <span style="color:#c9c2b0;flex-shrink:0">${ik('pil')}</span>
      </div>
    </div>
    <p class="dæmpet" style="text-align:center;margin-top:12px">ARYTMI · prototype v4 · vælg mindre, oplev mere<br>Feedback fra anmeldelser sendes til OD.</p>
    <div style="text-align:center;margin:16px 0">
      <button class="knap kontur lille" onclick="bekræft('Nulstil hele prototypen og slet alle data?', ()=>{localStorage.removeItem(GEM);localStorage.removeItem('klar-app-v2');location.reload()})">Nulstil prototypen</button>
    </div>
  </div>`;
}

/* =============================================================
   TEGN
   ============================================================= */
function tegn(){
  if(!s.onboarded){ skærmOnboarding(); tegnNav(); return; }
  switch(true){
    case aktivSkærm==='hjem':         skærmHjem(); break;
    case aktivSkærm==='destination':  skærmDestination(); break;
    case aktivSkærm==='aktivitet':    skærmAktivitet(); break;
    case aktivSkærm==='bilen':        skærmBilen(); break;
    case aktivSkærm==='mad':          skærmMad(); break;
    case aktivSkærm==='pakke':        skærmPakke(); break;
    case aktivSkærm==='øjeblikke':    skærmØjeblikke(); break;
    case aktivSkærm==='anmeld':       skærmAnmeld(); break;
    case aktivSkærm==='log':          skærmLog(); break;
    case aktivSkærm==='profil':       skærmProfil(); break;
    case aktivSkærm==='spontan-tid':     skærmSpontanTid(); break;
    case aktivSkærm==='spontan-start':   skærmSpontanStart(); break;
    case aktivSkærm==='spontan-radius':  skærmSpontanRadius(); break;
    case aktivSkærm==='spontan-onske':   skærmSpontanOnske(); break;
    case aktivSkærm==='spontan-resultat':skærmSpontanResultat(); break;
    case aktivSkærm==='invitation':      skærmInvitation(); break;
    case aktivSkærm==='turplan':         skærmTurplan(); break;
    case aktivSkærm.startsWith('aktivitet-'): skærmAktivitetDetalje(aktivSkærm.slice(10)); break;
    case aktivSkærm.startsWith('testet-'): skærmTestet(aktivSkærm.slice(7)); break;
    case aktivSkærm.startsWith('mad-'):    skærmMadIndlæg(aktivSkærm.slice(4)); break;
    default: skærmHjem();
  }
  // fuldskærms-forsiden skal ikke kunne scrolle på et tomt felt — men
  // nedtællings-forsiden (dato sat) er en almindelig side der skal kunne scrolle
  const nedtælling = s.forberedelse && s.forberedelse.dato && !s.påTur && !s.anmeldAfventer;
  $('indhold').style.paddingBottom = (aktivSkærm==='hjem' && !nedtælling) ? '0' : '';
  tegnNav();
}
tegn();

/* ---------- splash ---------- */
(function visSplash(){
  const t = new Date().getHours();
  const variant = (t>=22||t<5) ? 'tur' : 'klar';
  const d = document.createElement('div');
  d.id = 'splash';
  d.innerHTML = heroScene(variant, skærmHøjde()) + `
    <div class="s-mid">
      <div class="s-logo-wrap">${ordmærke(true, true)}</div>
    </div>`;
  document.querySelector('.telefon').appendChild(d);
  setTimeout(()=>d.remove(), 3300);
})();

/* ---------- ripple ---------- */
document.addEventListener('pointerdown', e=>{
  const k = e.target.closest('.knap'); if(!k) return;
  const r = k.getBoundingClientRect();
  const str = Math.max(r.width, r.height) * 2.2;
  const spot = document.createElement('span');
  spot.className = 'ripple';
  spot.style.cssText = `width:${str}px;height:${str}px;left:${e.clientX-r.left-str/2}px;top:${e.clientY-r.top-str/2}px`;
  k.appendChild(spot);
  setTimeout(()=>spot.remove(), 700);
}, {passive:true});

/* ---------- lys følger musen ---------- */
let lysRAF = null;
document.addEventListener('pointermove', e=>{
  if(lysRAF) return;
  lysRAF = requestAnimationFrame(()=>{
    lysRAF = null;
    document.querySelectorAll('.kort,.liste,.forslag-knap').forEach(k=>{
      const r = k.getBoundingClientRect();
      if(e.clientX>r.left-80 && e.clientX<r.right+80 && e.clientY>r.top-80 && e.clientY<r.bottom+80){
        k.style.setProperty('--lx', (e.clientX-r.left)+'px');
        k.style.setProperty('--ly', (e.clientY-r.top)+'px');
      }
    });
  });
}, {passive:true});

/* ---------- parallax på hero ---------- */
$('indhold').addEventListener('scroll', ()=>{
  const hero = document.querySelector('.hero'); if(!hero) return;
  const y = $('indhold').scrollTop;
  if(y > 500) return;
  const scene = hero.querySelector('.scene');
  const overlay = hero.querySelector('.overlay');
  if(scene) scene.style.transform = `translateY(${y*.35}px)`;
  if(overlay){ overlay.style.transform = `translateY(${y*.55}px)`; overlay.style.opacity = Math.max(0, 1 - y/260); }
}, {passive:true});
