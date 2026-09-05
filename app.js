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
  /* Pulsen som ikon (14/8). Hjertet sad fem steder i brugerfladen — på
     "Anmeld turen", på "Denne arytme er for mig" og i tre kvitteringer — og
     dér blev det romantisk frem for brandbærende. Hjertet hører til i logoet.
     Pulsen er samme greb, men den er JERES: det er EKG_KURVE, tegnet om til
     24-boksen, så den passer sammen med resten af stregikonerne.
     'hjerte' står stadig i listen — den bruges af tælleren i hero'en. */
  puls:   '<path d="M2 12h5l1.5-3.5L10 15.5 11.5 5 13 16.5 14.5 10 16 12h6"/>',
  pil:    '<path d="M5 12h13m-5.5-5.5L18 12l-5.5 5.5"/>',
  info:   '<circle cx="12" cy="12" r="8.3"/><path d="M12 11.2v5.3" stroke-linecap="round"/><circle cx="12" cy="7.7" r="1" fill="currentColor" stroke="none"/>',
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
/* Her lå en test-indlæsning af logo.png (469 KB), der satte et flag ingen læste
   og udløste en ekstra fuld gentegning efter første paint. Fjernet 13/8 —
   ordmærket kommer fra brand-pakken via ordmærke() nedenfor. */
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
/* Logoet kommer direkte fra den godkendte logopakke.
   800px-udgaven, ikke 1200: ordmærket vises i 31-46px højde, så 1200 var 80 KB
   hentet for at blive skaleret ned med faktor 26. 800 er stadig rigeligt til
   skarphed på en telefon med tredobbelt pixeltæthed. */
function ordmærke(lys, medSlogan){
  const fil = lys
    ? 'brand/arytmi_logopakke_endelig/logo/arytmi_reversed_800.png'
    : 'brand/arytmi_logopakke_endelig/logo/arytmi_transparent_800.png';
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

/* -- Testede destinationer (Køreklar basispakke). t1 er format-eksemplet;
      t2-t19 er fra rekognosceringsturen 31/7-2/8 2026 (kilde:
      recon/arytmi-recon-2026-08-02-19-28.json). klar:false = "måske". -- */
const TESTEDE = [
  /* Ingen x/y her: de udledes af lat/lon længere nede (se geoTilXY-blokken) */
  { id:'t1', navn:'Vesterhavet — Hvide Sande Sydstrand', lat:55.905, lon:8.117, klar:true,
    ønsker:{ lys:'solnedgang', natur:'vand', stemning:'isoleret' },
    ord:'Vandkanten',
    kort:'Klitrækken syd for slusen. P-plads 40 m fra vandkanten.',
    beskrivelse:'Kør helt ud, hvor vejen ender. I parkerer med fronten mod vest, og solen går ned lige dér, hvor I sidder. Klitterne giver læ, og lyden af havet følger jer hele natten. Testet af os i både sommerstille og oktoberblæst — bilen står roligt begge dele.',
    faciliteter:{
      toilet:'Offentligt toilet ved slusen, 600 m (åbent hele døgnet)',
      handel:'SuperBrugsen Hvide Sande, 1,2 km (8–20)',
      aftensmad:'Fiskehuset ved havnen — stjerneskud og fiskefrikadeller (11–19:30)',
      morgen:'Hvide Sande Bageri, 900 m — åbner 6:30, kaffen er klar fra start' } },
  { id:'t2', navn:'Fruering Kirke', lat:56.03310, lon:9.99222, klar:false,
    ønsker:{ lys:'solnedgang', natur:'land', stemning:'livligt' },
    ord:'Udsigtsstop',
    kort:'Kirkeparkering højt i landskabet — flot at holde ind, men ikke at sove.',
    beskrivelse:'Vi kørte herop for udsigtens skyld, og den skuffer ikke: markerne folder sig ud under jer, og kirken står som et fikspunkt i det hele. Men vi vil være ærlige — det er ikke et sted at overnatte. Det er en kirkes parkeringsplads, og den følelse forsvinder ikke, selvom I holder stille. Tag den som et stop på vejen, spis jeres madpakke, og kør videre til et sted, hvor I kan lukke øjnene med god samvittighed.',
    billeder:['billeder/t2-fruering-kirke-1.jpg','billeder/t2-fruering-kirke-2.jpg','billeder/t2-fruering-kirke-3.jpg','billeder/t2-fruering-kirke-4.jpg'],
    faciliteter:{
      toilet:'',
      handel:'',
      aftensmad:'',
      morgen:'' } },
  { id:'t3', navn:'Rasteplads Mossøbrå', lat:56.03144, lon:9.83892, klar:true,
    ønsker:{ lys:'solnedgang', natur:'vand', stemning:'isoleret' },
    ord:'Skjult',
    kort:'Rasteplads med Mossø gemt lige om hjørnet — og ingen skilte, der siger nej.',
    beskrivelse:'Fra bilen ser det ud som en helt almindelig rasteplads, og det er nok grunden til, at der er så roligt. Gå de få meter ned mod vandet, og pludselig ligger Mossø der. Vi kunne ikke finde et eneste skilt mod overnatning, og pladsen er stor nok til, at I ikke ligger oven i nogen. Det her er sådan et sted, man kører forbi hundrede gange uden at opdage.',
    billeder:['billeder/t3-rasteplads-mossbra-1.jpg','billeder/t3-rasteplads-mossbra-2.jpg','billeder/t3-rasteplads-mossbra-3.jpg','billeder/t3-rasteplads-mossbra-4.jpg'],
    faciliteter:{
      toilet:'',
      handel:'',
      aftensmad:'',
      morgen:'' } },
  { id:'t4', navn:'Vædebro', lat:56.04586, lon:9.85238, klar:true,
    ønsker:{ lys:'solnedgang', natur:'vand', stemning:'isoleret' },
    ord:'Legeplads',
    kort:'Ved broen over Mossø — strandstemning, legeplads og plads til at trække vejret.',
    beskrivelse:'Parkeringspladsen ligger lige over for broen, og der er noget strandagtigt over stedet, selvom I er langt fra havet. Der er en legeplads, hvis I har børn med, og borde nok til at man kan spise en madpakke uden at have nogen i nakken. Vi holdt her en aften og blev overraskede over, hvor fredeligt der var, når trafikken over broen døde ud.',
    billeder:['billeder/t4-vdebro-1.jpg','billeder/t4-vdebro-2.jpg','billeder/t4-vdebro-3.jpg','billeder/t4-vdebro-4.jpg','billeder/t4-vdebro-5.jpg','billeder/t4-vdebro-6.jpg'],
    faciliteter:{
      toilet:'',
      handel:'',
      aftensmad:'',
      morgen:'' } },
  { id:'t5', navn:'Parkering Q høfterne', lat:56.47620, lon:8.12473, klar:true,
    ønsker:{ lys:'solnedgang', natur:'vand', stemning:'isoleret' },
    ord:'Bad',
    kort:'Vesterhavet i fuld bredde — og et rigtigt toilet med bad 40 skridt væk.',
    beskrivelse:'Det her er en af de udsigter, der får jer til at blive siddende i bilen lidt for længe, før I går ud. Havet fylder hele forruden. Der holder både autocampere og andre biler, så I er ikke alene — men brændingen er så høj, at I ikke hører dem. Vi havde regnet med, at naboerne ville ødelægge det. Det gjorde de ikke.',
    billeder:['billeder/t5-parkering-q-hfterne-1.jpg','billeder/t5-parkering-q-hfterne-2.jpg','billeder/t5-parkering-q-hfterne-3.jpg'],
    faciliteter:{
      toilet:'Toilet med bad på selve pladsen',
      handel:'Købmand ca. 400 m væk',
      aftensmad:'',
      morgen:'Købmanden 400 m væk har det, I skal bruge til morgenkaffen' } },
  { id:'t6', navn:'Hygum Bakke', lat:56.58306, lon:8.20271, klar:true,
    ønsker:{ lys:'solnedgang', natur:'land', stemning:'isoleret' },
    ord:'Panorama',
    kort:'Panorama til begge sider — vand den ene vej, land den anden.',
    beskrivelse:'Der er et udsigtspunkt, man kan gå op på, og derfra kan I se både vandet og landet i samme drej af hovedet. Det er den slags sted, hvor man bliver stående længere, end man havde tænkt. Til gengæld er der ingenting herude — intet toilet, ingen kiosk, intet. Byerne ligger tæt nok på, at I kan hente det, I mangler, men gør det, inden I kører op.',
    faciliteter:{
      toilet:'Nej — intet toilet på stedet',
      handel:'Byerne tæt på — handl ind, inden I kører op',
      aftensmad:'',
      morgen:'' } },
  { id:'t7', navn:'Aggerstien ved de sorte huse', lat:56.78753, lon:8.23201, klar:true,
    ønsker:{ lys:'solnedgang', natur:'vand', stemning:'isoleret' },
    ord:'Bunkere',
    kort:'Bunkere, klit og Vesterhav — et lille spot, men et af turens smukkeste.',
    beskrivelse:'Bunkerne ligger halvt begravet i sandet, og bag dem tager havet over. Der er en lille parkeringsplads, og det er vigtigt at ramme den rigtigt: I må ikke holde helt nede ved kysten, men I må gerne stille bilen ved det lille p-skilt. Gør det, så har I hele udsigten uden at træde nogen over tæerne. Pladsen er lille, så kommer I sent på en sommerdag, kan den være taget.',
    billeder:['billeder/t7-aggerstien-ved-de-sorte-huse-1.jpg','billeder/t7-aggerstien-ved-de-sorte-huse-2.jpg','billeder/t7-aggerstien-ved-de-sorte-huse-3.jpg'],
    faciliteter:{
      toilet:'Nej',
      handel:'Ca. 500 m væk',
      aftensmad:'Spisesteder ved havnen',
      morgen:'Der ligger caféer rundt omkring, hvis I vil have kaffen ude' } },
  { id:'t8', navn:'Hanstholm Fyr', lat:57.11339, lon:8.58986, klar:true,
    ønsker:{ lys:'solnedgang', natur:'vand', stemning:'livligt' },
    ord:'Fyret',
    kort:'Danmarks nordvestligste hjørne — fyret, klinten og havet hele vejen rundt.',
    beskrivelse:'Af alle de steder, vi så på turen, er det her det, vi kom længst væk fra og alligevel snakkede mest om bagefter. Fyret står som et vartegn, og landskabet falder væk mod havet. Der er højt til himlen på den måde, hvor man automatisk sænker stemmen. Vi noterede ikke meget om praktikken, da vi var her — så tjek selv skiltningen på stedet, inden I bliver natten over.',
    billeder:['billeder/t8-hanstholm-fyr-1.jpg','billeder/t8-hanstholm-fyr-2.jpg','billeder/t8-hanstholm-fyr-3.jpg','billeder/t8-hanstholm-fyr-4.jpg','billeder/t8-hanstholm-fyr-5.jpg','billeder/t8-hanstholm-fyr-6.jpg'],
    faciliteter:{
      toilet:'',
      handel:'',
      aftensmad:'',
      morgen:'' } },
  { id:'t9', navn:'Rødhus strand', lat:57.21650, lon:9.52284, klar:true,
    ønsker:{ lys:'solnedgang', natur:'vand', stemning:'livligt' },
    ord:'På stranden',
    kort:'Kør bilen helt ned på stranden og find jeres eget hjørne af Vesterhavet.',
    beskrivelse:'Her kører I helt ned på sandet, og så handler det bare om at finde et sted, hvor der er langt til den næste bil. Det er der som regel. Stranden er så bred, at selv en travl dag ikke føles trængt. På vej derned passerer I en lille kiosk, der bager brød hver morgen — læg mærke til den, for det er den, der redder jeres morgenmad, når I vågner med sand mellem tæerne.',
    billeder:['billeder/t9-rdhus-strand-1.jpg','billeder/t9-rdhus-strand-2.jpg','billeder/t9-rdhus-strand-3.jpg','billeder/t9-rdhus-strand-4.jpg'],
    faciliteter:{
      toilet:'Ja',
      handel:'Lille kiosk på vejen ned til stranden',
      aftensmad:'',
      morgen:'Kiosken på vejen ned bager friskt brød hver morgen' } },
  { id:'t10', navn:'Sallingsund broen', lat:56.75225, lon:8.83706, klar:true,
    ord:'Broen',
    kort:'Stop ved Sallingsundbroen — vandet på begge sider og broen som kulisse.',
    beskrivelse:'Broen spænder over sundet, og lyset over vandet er noget for sig, når dagen er ved at være slut. Vi holdt kort ind her på vej mod Mors og tog et par billeder. Ærligt: vi nåede ikke at undersøge stedet ordentligt, så se det som et smukt stop mere end som en færdig anbefaling — tjek skiltningen, inden I slår jer ned for natten.',
    billeder:['billeder/t10-sallingsund-broen-1.jpg','billeder/t10-sallingsund-broen-2.jpg'],
    faciliteter:{
      toilet:'',
      handel:'',
      aftensmad:'',
      morgen:'' } },
  { id:'t11', navn:'Dollerup bakker', lat:56.39136, lon:9.32344, klar:true,
    ønsker:{ lys:'', natur:'land', stemning:'isoleret' },
    ord:'Vejstøj',
    kort:'En lille gryde i Dollerup Bakker — smukt, men vejen kan høres.',
    beskrivelse:'Pladsen ligger som en skål i landskabet med bakkerne omkring sig, og stierne herfra er nogle af de flotteste i området. Vi vil ikke pakke det ind: man kan høre vejen. Ikke voldsomt, men den er der. Er I til at falde i søvn med lidt baggrundsstøj, får I til gengæld et af de smukkeste stykker natur i Midtjylland lige uden for bilen.',
    billeder:['billeder/t11-dollerup-bakker-1.jpg','billeder/t11-dollerup-bakker-2.jpg','billeder/t11-dollerup-bakker-3.jpg','billeder/t11-dollerup-bakker-4.jpg'],
    faciliteter:{
      toilet:'Nej',
      handel:'',
      aftensmad:'',
      morgen:'' } },
  { id:'t12', navn:'Parkeringsplads Dollerup Bakker', lat:56.37398, lon:9.32465, klar:true,
    ønsker:{ lys:'', natur:'land', stemning:'livligt' },
    ord:'Rummelig',
    kort:'Rummelig plads ved bakkerne — hold nederst mod skoven, så er I i fred.',
    beskrivelse:'Ved første øjekast ligger pladsen tæt på vejen, og det gør den også. Men kør helt ned i den nederste ende ud mod skoven, så ændrer stedet karakter: træerne lukker om jer, og vejen bliver til en fjern lyd. Der kan holde andre biler, så regn ikke med at have pladsen for jer selv. Til gengæld har I hele Dollerup Bakker med sletter og bakkedrag lige uden for døren.',
    billeder:['billeder/t12-parkeringsplads-dollerup-bakker-1.jpg','billeder/t12-parkeringsplads-dollerup-bakker-2.jpg','billeder/t12-parkeringsplads-dollerup-bakker-3.jpg'],
    faciliteter:{
      toilet:'',
      handel:'Ishus tæt på pladsen',
      aftensmad:'',
      morgen:'' } },
  { id:'t13', navn:'Parkering ved ishuset Dollerup Bakker', lat:56.37103, lon:9.32004, klar:true,
    ord:'To biler',
    kort:'Plads til to biler ved ishuset — og så søen lige der.',
    beskrivelse:'Det er et af de spots, man håber, der er ledigt. Der er plads til højst to biler, søen ligger lige foran, og ishuset er nabo. Netop derfor er det populært, og vi så det være optaget flere gange i løbet af dagen. Kommer I midt på eftermiddagen i højsæsonen, så hav en plan B — men rammer I det tomt, er det svært at gøre bedre.',
    billeder:['billeder/t13-parkering-ved-ishuset-dollerup-bakker-1.jpg','billeder/t13-parkering-ved-ishuset-dollerup-bakker-2.jpg','billeder/t13-parkering-ved-ishuset-dollerup-bakker-3.jpg','billeder/t13-parkering-ved-ishuset-dollerup-bakker-4.jpg'],
    faciliteter:{
      toilet:'',
      handel:'Ishuset ligger lige ved pladsen',
      aftensmad:'',
      morgen:'' } },
  { id:'t14', navn:'P plads dollerup bakker 3', lat:56.36780, lon:9.32971, klar:true,
    ønsker:{ lys:'', natur:'land', stemning:'isoleret' },
    ord:'Hule',
    kort:'En hule mellem træerne, med glimt af søen når løvet er væk.',
    beskrivelse:'Der er noget hemmeligt over den her plads. Man kan nærmest kravle ind i skovkanten, og mellem stammerne dukker søen op i små glimt. Om foråret og efteråret, når der ikke er blade på træerne, er udsigten bedst. Der er stier nok til en ordentlig gåtur og flere steder at sætte sig med maden. Toilet ligger ca. 200 m derfra, hvilket er en luksus herude.',
    billeder:['billeder/t14-p-plads-dollerup-bakker-3-1.jpg','billeder/t14-p-plads-dollerup-bakker-3-2.jpg','billeder/t14-p-plads-dollerup-bakker-3-3.jpg','billeder/t14-p-plads-dollerup-bakker-3-4.jpg','billeder/t14-p-plads-dollerup-bakker-3-5.jpg'],
    faciliteter:{
      toilet:'Toilet ca. 200 m fra pladsen',
      handel:'',
      aftensmad:'',
      morgen:'' } },
  { id:'t15', navn:'Haldsø 2', lat:56.36644, lon:9.33187, klar:true,
    ønsker:{ lys:'', natur:'vand', stemning:'livligt' },
    ord:'Åben udsigt',
    kort:'Åben udsigt over Hald Sø — flere mennesker, men også mere smukt.',
    beskrivelse:'Her får I søen serveret uden forhindringer. Det er lysere og mere åbent end de andre pladser i området, og prisen for det er, at der kommer flere forbi, og at vejen er tættere på. Vi synes, det er værd at betale. Toilettet ligger lige ved, hvilket gør morgenen betydeligt nemmere.',
    billeder:['billeder/t15-halds-2-1.jpg','billeder/t15-halds-2-2.jpg','billeder/t15-halds-2-3.jpg'],
    faciliteter:{
      toilet:'Toilet lige ved pladsen',
      handel:'',
      aftensmad:'',
      morgen:'' } },
  { id:'t16', navn:'Hinge', lat:56.26642, lon:9.52250, klar:true,
    ord:'Stien',
    kort:'En parkeringslomme, der ikke ligner noget — indtil I går ned ad stien.',
    beskrivelse:'Vær forberedt: fra bilen er udsigten ikke meget bevendt. I holder inde i en lille lomme, og det er det. Men går I halvtreds meter ned ad stien, åbner det hele sig op over søen, og så forstår I, hvorfor vi tog stedet med. Der er også mountainbikespor herfra, hvis I har cyklerne med. Roligt sted at sove, beskedent sted at vågne — medmindre I lige tager den gåtur igen.',
    billeder:['billeder/t16-hinge-1.jpg','billeder/t16-hinge-2.jpg'],
    faciliteter:{
      toilet:'Nej',
      handel:'',
      aftensmad:'',
      morgen:'' } },
  { id:'t17', navn:'Parkeringsplads ved Sminge Sø', lat:56.21605, lon:9.66709, klar:true,
    ønsker:{ lys:'', natur:'vand', stemning:'livligt' },
    ord:'Kanoer',
    kort:'Ved Sminge Sø, hvor kanoerne lægger til — smukt, men del pladsen pænt.',
    beskrivelse:'Det her er et friluftssted mere end en parkeringsplads. Der kommer folk med kanoer, og der er shelters med træstubbe omkring. Campér ikke inde på selve shelterområdet — det er ikke jeres. Men I må gerne holde tæt ved kanten ned mod søen, og derfra er det virkelig smukt. Kommer I med respekt for dem, der har booket shelteren, er der plads til jer begge.',
    billeder:['billeder/t17-parkeringsplads-ved-sminge-s-1.jpg','billeder/t17-parkeringsplads-ved-sminge-s-2.jpg','billeder/t17-parkeringsplads-ved-sminge-s-3.jpg'],
    faciliteter:{
      toilet:'',
      handel:'',
      aftensmad:'Svostrup Kro ligger tæt på',
      morgen:'' } },
  { id:'t18', navn:'P-plads, Anebjerg skov, Virringvej', lat:56.03860, lon:10.00922, klar:false,
    ønsker:{ lys:'', natur:'land', stemning:'isoleret' },
    ord:'Skovro',
    kort:'Stille skovplads uden udsigt — men med en rigtig god sti.',
    beskrivelse:'Lad os være ærlige om, hvad det her er: en velfungerende p-plads i skovkanten. Der er ingen udsigt, og vejen ligger tæt på. Til gengæld er der stille, og stien ind i Anebjerg Skov er god. Det er et sted, man vælger, fordi det er praktisk og roligt — ikke fordi man vil vågne til noget storslået. Derfor har vi heller ikke sat vores stempel på det endnu.',
    billeder:['billeder/t18-p-plads-anebjerg-skov-virringvej-1.jpg','billeder/t18-p-plads-anebjerg-skov-virringvej-2.jpg','billeder/t18-p-plads-anebjerg-skov-virringvej-3.jpg','billeder/t18-p-plads-anebjerg-skov-virringvej-4.jpg','billeder/t18-p-plads-anebjerg-skov-virringvej-5.jpg'],
    faciliteter:{
      toilet:'Nej',
      handel:'',
      aftensmad:'',
      morgen:'' } },
  { id:'t19', navn:'Vestermølle', lat:56.02866, lon:9.95814, klar:true,
    ønsker:{ lys:'solnedgang', natur:'vand', stemning:'livligt' },
    ord:'Byen tæt på',
    kort:'Skanderborg Sø for enden af pladsen, museet som nabo og byen inden for rækkevidde.',
    beskrivelse:'Vestermølle er sådan en perle, hvor det hele bare er der: udsigt over Skanderborg Sø, det gamle møllemiljø og museet ved siden af, og byen tæt nok på, at I kan gå efter aftensmad. Det er ikke det mest øde sted på listen — men det er et af de nemmeste at holde af. Godt sted at slutte en tur, hvor I har sovet i vildmarken et par nætter.',
    billeder:['billeder/t19-vestermlle-1.jpg','billeder/t19-vestermlle-2.jpg','billeder/t19-vestermlle-3.jpg','billeder/t19-vestermlle-4.jpg','billeder/t19-vestermlle-5.jpg','billeder/t19-vestermlle-6.jpg'],
    faciliteter:{
      toilet:'Ja',
      handel:'Ja — byen ligger tæt på',
      aftensmad:'Ja — flere muligheder i Skanderborg',
      morgen:'' } }
];

/* -- Bilen: først hvilken bil, så det nødvendige, så det man kan investere i.
   Emnerne folder teksten ud ved tryk, så siden ikke bliver en mur.
   Brødteksterne er UDKAST og mærket som sådan i visningen — OD skriver dem. -- */
const BIL_TYPER = [
  { id:'el',    navn:'Elbil',     under:'Varme fra batteriet og ladestop undervejs.' },
  { id:'andet', navn:'Anden bil', under:'Benzin, diesel eller hybrid — strømmen skal med hjemmefra.' }
];
const BILEN_GRUPPER = [
  /* Tre trin, ikke tre overskrifter på én side (OD 30/8). Rækkefølgen er
     rækkefølgen i flowet: bilen → det lækre → hygge.
     Info-ikonet vises kun på punkter med en brød-tekst — sengetøjet har
     bevidst ingen (OD 30/8: "fjern informations ikonerne ud for madras,
     dyner, puder og lagen"), for der er ikke noget at forklare. */
  { id:'need', navn:'Udstyr til bilen', under:'Det, der skal med, for at natten overhovedet fungerer.', punkter:[
    { id:'strøm', navn:'Strøm', ikon:'lyn', huske:true, tip:'Tilføj opladning til huskeliste',
      brød:'Strøm er det, der afgør, om natten bliver behagelig. Kør hjemmefra med rigeligt på batteriet, og regn med at natten koster lidt. Har I ikke en elbil, skal strømmen med hjemmefra — en powerbank eller en lille station rækker langt til lys og telefoner.' },
    /* Camp Mode er ude (OD 30/8) — det var et Tesla-ord for noget, alle biler
       gør på hver sin måde. Varme/ventilation er den samme oplysning på dansk,
       og den kan pakkes/planlægges som alt andet på listen. */
    { id:'varme', navn:'Varme/ventilation', ikon:'bil', huske:true,
      brød:'Find ud af, hvordan bilen holder varmen og luften kørende, mens den står låst — i en Tesla hedder det Camp Mode. Prøv det hjemme i indkørslen inden turen; det er ærgerligt at stå på en mørk p-plads og lede i menuerne første gang.' },
    /* Sengetøjet flyttet op i need to have (OD 13/8). Det er ikke udstyr, man
       investerer i, hvis man bliver bidt — det er forskellen på at sove og
       at ligge vågen. */
    { id:'madras', navn:'Madras', ikon:'telt', huske:true },
    { id:'dyner',  navn:'Dyner',  ikon:'måne', huske:true },
    { id:'puder',  navn:'Puder',  ikon:'måne', huske:true },
    { id:'lagen',  navn:'Lagen',  ikon:'telt', huske:true }
  ]},
  { id:'nice', navn:'Udstyr der er lækkert men ikke nødvendigt', under:'Udstyr du kan investere i, hvis I bliver bidt af arytmer.', punkter:[
    { id:'afskærmning', navn:'Afskærmning',       ikon:'måne', huske:true,
      brød:'Afskærmning i ruderne giver mørke at sove i og en fornemmelse af at være for sig selv. Det er den ting, folk oftest anskaffer efter første tur.' },
    { id:'nivellering', navn:'Niveleringsblokke', ikon:'bil',  huske:true,
      brød:'De færreste p-pladser er i vater. Et par blokke under hjulene retter bilen op, så I ikke ligger og glider mod fodenden hele natten.' },
    { id:'myggenet',    navn:'Myggenet',          ikon:'blad', huske:true,
      brød:'Myggenet i vinduerne betyder, at I kan have en rude på klem hele natten. Ved vand og skov er det forskellen på frisk luft og en time med en summende gæst.' },
    { id:'oplader',     navn:'Oplader',           ikon:'lyn',  huske:true, tip:'Til mobil, computer o.l.',
      brød:'Ledninger til telefoner og det, I ellers har med. Tjek at de passer til bilens udtag og ikke kun til en stikkontakt.' },
    { id:'bord',        navn:'Bord',              ikon:'kurv', huske:true,
      brød:'Et lille klapbord gør forskellen på at spise i skødet og at spise ved et bord. Det fylder mindre, end man tror.' },
    { id:'stole',       navn:'Stole',             ikon:'kurv', huske:true,
      brød:'To campingstole, så I kan sidde ude og ikke kun i bilen. Særligt værd at have med, hvor der ikke er bord-bænkesæt.' },
    { id:'paraply',     navn:'Paraply',           ikon:'vind', huske:true,
      brød:'Til den slags regn, der kommer skråt. En stor paraply gør, at man kan lave kaffe uden for bilen alligevel.' },
    { id:'køler',       navn:'Køler',             ikon:'sne',  huske:true,
      brød:'Køletaske eller kompressorkøler. Er den med, behøver I ikke handle undervejs — og maden holder til dagen efter.' }
  ]},
  /* "Evt. hygge" er en ÅBEN gruppe (OD 13/8): forslagene er bare forslag, og
     man skriver selv til. Det man skriver, huskes til næste tur —
     se s.egneTing.hygge. */
  { id:'hygge', navn:'Evt. hygge', under:'Det, der gør turen til jeres. Skriv selv til — appen husker det til næste gang.',
    åben:'hygge', punkter:[
    { id:'spil',      navn:'Spil',            ikon:'stjerne', huske:true, brød:'Kort, terninger eller et lille brætspil til aftenen.' },
    { id:'pynt',      navn:'Pynt',            ikon:'gnist',   huske:true, brød:'Det, der gør bilen til et sted og ikke bare en bil.' },
    { id:'belysning', navn:'Belysning',       ikon:'sol',     huske:true, tip:'LED stearinlys, batteri lyskæde, myggelys o.l.',
      brød:'Lyskæde eller en lille lampe. Bilens kabinelys er sjældent hyggeligt.' },
    { id:'aktivitet', navn:'Aktivitet',       ikon:'blad',    huske:true, brød:'Bog, fiskestang, kikkert, badminton — det I havde tænkt jer at lave.' },
    { id:'skærmholder',navn:'Holder til skærm',ikon:'bil',    huske:true, brød:'Så en film kan ses fra sengen uden at nogen skal holde noget.' }
  ]}
];
const BILEN_ALLE = BILEN_GRUPPER.flatMap(g=>g.punkter);

/* Hunden (OD 13/8). Egen foldbar rubrik på Personligt, så den ikke fylder for
   dem, der ikke har hund med. Punkterne tæller først med i pakkelisten, når
   man har slået rubrikken til — se pakkePunkter(). */
const HUND_PUNKTER = [
  { id:'hund-gaasnor',  tekst:'Gåsnor' },
  { id:'hund-langsnor', tekst:'Lang snor' },
  { id:'hund-mad',      tekst:'Hundemad' },
  { id:'hund-vand',     tekst:'Vand og skål' },
  { id:'hund-seng',     tekst:'"Seng" eller tæppe' },
  { id:'hund-poser',    tekst:'Hundeposer' }
];

/* -- Pakke: personlige ting. De tre nederste er OD's tilføjelser 11/8 -- */
const PAKKE_PUNKTER = [
  { id:'nattøj',  tekst:'Nattøj' },
  { id:'badetøj', tekst:'Badetøj eller lign. — afhængigt af destination' },
  { id:'toilettaske', tekst:'Lille toilettaske med det basale!' },
  { id:'varmtøj', tekst:'Varm trøje eller jakke til om aftenen' },
  { id:'ekstratøj', tekst:'Ekstra tøj til dagen efter' },
  { id:'personligt', tekst:'Personlige ting — medicin, yndlingste eller lignende' }
];

/* -- Mad/drikke: madscenarier (erstatter de gamle enkelt-retter 27/8) --
   Flowet er nu: Madscenarier → Snacks og drikkevarer → (Morgenmad, kun
   flerdages-ture) → færdig. Mellemsiden (den gamle "hub" med Tidsplan/Mad/
   Drikke) og de tre udstyrs-trin er slettet 30/8 efter Olivias gennemspilning:
   udstyret bor nu i det enkelte scenaries "Det skal I bruge". */
const MAD_VALG = [
  { id:'tapas',    tekst:'Tapas/deleretter' },
  { id:'takeaway', tekst:'Take Away' },
  { id:'picnic',   tekst:'Kold picnic (hjemmelavet)' },
  { id:'sammen',   tekst:'Lav-det-sammen' },
  { id:'ude',      tekst:'Vi spiser ude/på vejen' }
];
/* Uddybende indhold pr. madscenarie — alle fem har tekst fra Kennet nu (27/8).
   Felterne er alle valgfrie ud over nr/tagline/intro/brug/sådanGørVi/lilleEkstra:
   brugIntro (linje under selve overskriften), brugTitel (erstatter "Det skal I
   bruge", fx på 05), tip (tip-boks lige efter introteksten) og efter ("Efter
   måltidet" — udelades helt, hvis scenariet ikke har en).
   Rækkefølgen på siden er fast (OD 30/8): intro → tip → Sådan gør vi → Det
   lille ekstra → Efter måltidet → "Det skal I bruge" NEDERST. Det gamle
   tipForan-felt er væk — der er kun én tip-placering nu.
   Item-id'erne i brug[] er navngivet med scenarie-præfiks (fx 'tapas-glas' vs
   'picnic-glas'), så to valgte scenarier med samme udstyrsnavn ikke deler
   afkrydsning på pakkelisten. Salt/peber, dyppelse og køle/varmetaske går igen
   i alle fem — de kom ind, da udstyrs-trinnene blev sløjfet (OD 30/8). */
const MAD_SCENARIE_DETALJER = {
  tapas: {
    nr: '01',
    tagline: 'Tapas er næsten skabt til en Arytmi og vores favorit',
    intro: [
      'Små retter, godt med dip, lidt vin og god tid.',
      'Det fungerer klart bedst, når I kan have det hele inden for rækkevidde, så begræns udvalget og sørg for det kan ligge på max 2 fade/tallerkner eller beholdere.'
    ],
    brug: [
      /* De tre første er MAD, ikke grej (OD 31/8) — de er mærket handle:true og
         lander derfor på handlelisten i stedet for i køkkenet. De står øverst,
         fordi maden er det, man beslutter først. */
      { id:'tapas-retter', tekst:'Tapasretter', tip:'Vi anbefaler 4–6 forskellige', handle:true },
      { id:'tapas-dip',    tekst:'Dip',         tip:'til brødet og retterne',        handle:true },
      { id:'tapas-brød',   tekst:'Brød',                                             handle:true },
      { id:'tapas-tallerkener-anret', tekst:'Tallerkener', tip:'eller små skåle til anretning' },
      { id:'tapas-tallerkener-spise', tekst:'Tallerkner',  tip:'til at spise af' },
      { id:'tapas-bestik',            tekst:'Bestik' },
      { id:'tapas-glas',              tekst:'Glas', tip:'måske både vin og vandglas' },
      { id:'tapas-lille-kniv',        tekst:'Lille kniv' },
      { id:'tapas-lille-skærebræt',   tekst:'Lille skærebræt' },
      { id:'tapas-servietter',        tekst:'Servietter' },
      { id:'tapas-affaldspose',       tekst:'Affaldspose' },
      { id:'tapas-vådservietter',     tekst:'Vådservietter' },
      { id:'tapas-salt-peber',        tekst:'Salt/peber' },
      { id:'tapas-dyppelse',          tekst:'Dyppelse', tip:'Skal du bruge ketchup, sennep, mayonnaise eller remoulade?' },
      { id:'tapas-køletaske',         tekst:'Køle/varmetaske' }
    ],
    sådanGørVi: 'Lav én samlet spiseplads i stedet for at have mad og emballage liggende rundt omkring. En bakke eller et skærebræt fungerer godt som fælles "bord". I bilen kan man ligge/halv ligge. Eller sidde på forsæder/bagagerum.',
    /* Tesla-tippet er ude (KN 4/9). Det talte til én bilmodel i stedet for til
       måltidet — og madscenarierne skal kunne læses af alle, uanset bil. */
    tip: 'Sørg for, at I begge kan nå maden, og har alt det praktiske indenfor rækkevide, før I sætter jer til rette.',
    lilleEkstra: [
      'Tag kun det frem, I skal bruge. Resten bliver i bilen.',
      'Og glem ikke en god flaskeåbner (eller køb med skruelåg), hvis der skal vin på bordet.'
    ],
    efter: 'Vi tørrer diverse ting over med vådservietterne og lægger dem tilbage i tasken, så kan de ryge direkte i opvasker når vi kommer hjem.'
  },
  takeaway: {
    nr: '02',
    tagline: 'Køb det, I har lyst til. Vi hjælper med resten.',
    intro: [
      'Pizza, burger, sushi, sandwich eller noget helt femte. Takeaway er nemt — lige indtil emballagen, saucerne og drikkevarerne skal have plads.'
    ],
    brug: [
      { id:'takeaway-tallerkener',   tekst:'Tallerkener', tip:'eller underlag' },
      { id:'takeaway-bestik',        tekst:'Evt. bestik/spisepinde' },
      { id:'takeaway-servietter',    tekst:'Servietter' },
      { id:'takeaway-glas',          tekst:'Glas', tip:'måske både vin- og vandglas' },
      { id:'takeaway-affaldspose',   tekst:'Affaldspose' },
      { id:'takeaway-vådservietter', tekst:'Vådservietter' },
      { id:'takeaway-køletaske',     tekst:'Køle/varmetaske' },
      { id:'takeaway-salt-peber',    tekst:'Salt/peber' },
      { id:'takeaway-dyppelse',      tekst:'Dyppelse', tip:'Skal du bruge ketchup, sennep, mayonnaise eller remoulade?' },
      { id:'takeaway-pizzaskærer',   tekst:'Pizzaskærer', tip:'Bed om at få det skåret ud.' }
    ],
    sådanGørVi: [
      'Find jeres spiseplads, før I åbner maden.',
      'Brug bagagerummet, et bord eller en anden fast flade som fælles spiseplads. Find affaldsposen frem med det samme til emballagen så den er af vejen.'
    ],
    /* Tesla-tippet er ude (KN 4/9) — samme grund som i tapas. Scenariet har
       ingen tip-boks nu; feltet er valgfrit, og siden springer den over. */
    lilleEkstra: [
      'Har I køletasker fungerer de lige så godt til at holde maden varm.',
      'Og tag altid et par ekstra servietter med. Altid.'
    ]
  },
  picnic: {
    nr: '03',
    tagline: 'Når maden bare skal åbnes og nydes',
    intro: [
      'Salater, sandwiches, tærte, frugt, ost, charcuteri eller det, I allerede har i køleskabet.',
      'Det gode ved kold picnic er, at I ikke skal lave mad, når I ankommer men har god tid til at pakke hjemmefra. Derfor kan I bruge tiden på hinanden.'
    ],
    brug: [
      { id:'picnic-tallerkener',   tekst:'Tallerkener' },
      { id:'picnic-bestik',        tekst:'Bestik' },
      { id:'picnic-glas',          tekst:'Glas', tip:'måske både vand- og vinglas' },
      { id:'picnic-servietter',    tekst:'Servietter' },
      { id:'picnic-lille-kniv',    tekst:'Lille kniv' },
      { id:'picnic-skærebræt',     tekst:'Skærebræt' },
      { id:'picnic-underlag',      tekst:'Underlag/tæppe' },
      { id:'picnic-affaldspose',   tekst:'Affaldspose' },
      { id:'picnic-vådservietter', tekst:'Vådservietter' },
      { id:'picnic-salt-peber',    tekst:'Salt/peber' },
      { id:'picnic-dyppelse',      tekst:'Dyppelse', tip:'Skal du bruge ketchup, sennep, mayonnaise eller remoulade?' },
      { id:'picnic-køletaske',     tekst:'Køle/varmetaske' }
    ],
    sådanGørVi: [
      'Pak maden så den kan komme direkte fra køletaske til spiseplads.',
      'Hvis I skal sidde udenfor, så tænk over underlaget, hvis der ikke er bænk i nærheden. Hvis I skal spise i bilen, så lav en fast flade til maden og sørg for en god siddeplads med støtte i ryggen.'
    ],
    lilleEkstra: [
      'Pak maden i få større beholdere frem for mange små.',
      'Det gør både transport, spisningen og oprydningen lettere.'
    ],
    efter: 'Vi tørrer diverse ting over med vådservietterne og lægger dem tilbage i tasken, så kan de ryge direkte i opvasker når vi kommer hjem.'
  },
  sammen: {
    nr: '04',
    tagline: 'Når maden er en del af oplevelsen',
    intro: [
      'Her er det ikke bare maden, der er målet. Det er også det, I laver sammen.',
      'Suppe, gryderetter, bøffer, pasta, hotdogs… listen med muligheder er lang.'
    ],
    tip: 'Mad der skal samles kræver ofte god plads. Sørg for at vælge en destination med borde/bænkesæt. Alternativt medbring bord/stole sammen med grill eller gasblus. Husk at det kategoriseres som camping og man skal derfor vælge en destination der tillader camping.',
    brugIntro: 'Det afhænger af retten, men tænk især på:',
    brug: [
      { id:'sammen-køkkenredskaber', tekst:'Køkkenredskaber' },
      { id:'sammen-grill',           tekst:'Grill/gasblus' },
      { id:'sammen-skærebræt',       tekst:'Skærebræt' },
      { id:'sammen-knive',           tekst:'Knive' },
      { id:'sammen-tallerkener',     tekst:'Tallerkener' },
      { id:'sammen-bestik',          tekst:'Bestik' },
      { id:'sammen-glas',            tekst:'Glas', tip:'vand og/eller vinglas' },
      { id:'sammen-servietter',      tekst:'Servietter' },
      { id:'sammen-affaldspose',     tekst:'Affaldspose' },
      { id:'sammen-vådservietter',   tekst:'Vådservietter' },
      { id:'sammen-salt-peber',      tekst:'Salt/peber' },
      { id:'sammen-dyppelse',        tekst:'Dyppelse', tip:'Skal du bruge ketchup, sennep, mayonnaise eller remoulade?' },
      { id:'sammen-køletaske',       tekst:'Køle/varmetaske' }
    ],
    sådanGørVi: [
      'Vælg noget, der kan tilberedes uden at kræve et helt køkken.',
      'Lav en lille arbejdsplads, hvor én kan gøre klar, mens den anden laver noget andet. Medbring evt parasol eller paraply hvis det regner.'
    ],
    lilleEkstra: [
      'Jo mere kompliceret maden er, jo mere skal I tænke over hvor den skal laves.',
      'Madlavning er hyggeligt. At opdage, at man mangler en ske, når gryden allerede koger, er mindre hyggeligt.',
      'Obs hvis I allerede har gasblusen med er der også gode muligheder for morgenmad på sådan en.'
    ]
  },
  ude: {
    nr: '05',
    tagline: 'Nogle gange er det bedste måltid det, andre har lavet.',
    intro: [
      'I behøver ikke have mad med for at få glæde af Arytmi. Måske finder I en lille restaurant, en café eller noget lækkert på vejen.'
    ],
    brugTitel: 'Det skal I stadig overveje',
    brug: [
      { id:'ude-vand',        tekst:'Vand', tip:'til turen' },
      { id:'ude-snacks',      tekst:'Snacks' },
      { id:'ude-kaffe-te',    tekst:'Kaffe/te' },
      { id:'ude-drikkevarer', tekst:'Evt. drikkevarer til senere' },
      { id:'ude-morgenmad',   tekst:'Morgenmad', tip:'til dagen efter' },
      /* Kun køle/varmetasken går igen her. Salt/peber og dyppelse hører til de
         fire scenarier, hvor man selv anretter maden — på "vi spiser ude" er
         listen "det I stadig skal overveje" (drikkevarer, morgenmad), og dér
         ville en remoulade-linje være støj. Sig til, hvis den skal med alligevel. */
      { id:'ude-køletaske',   tekst:'Køle/varmetaske' }
    ],
    sådanGørVi: [
      'Hvis I spiser ude så husk bordbestilling.',
      'Vi gør indimellem det at vi først finder overnatning i nærheden og bestiller en taxa til spisestedet hvis der er for langt at gå, så slipper i for "hvem kører" samtalen og kan nyde det hele i fulde drag.'
    ],
    lilleEkstra: [
      'Tænk ét måltid frem.',
      'Hvis I spiser ude om aftenen, hvad skal I så have til morgenkaffen?'
    ]
  }
};
/* ÉN liste (OD 30/8). Var to grupper — "Til turen" og "Til aftenen" — men de
   blev slået sammen: det er alligevel én indkøbstur. "Snacks" og "Evt. sødt
   eller salt" er samtidig lagt sammen til ét punkt, og "Evt. drinks/vin/øl"
   hedder nu Drikkevarer. De gamle DRIKKE_VALG-id'er (glas, åbner …) er
   BEVARET uændret her, så afkrydsninger på gemte ture overlever — se
   migrationen i indlæs(), der flytter f.drikkeValg over i f.snackValg. */
const SNACK_VALG = [
  { id:'vand',        tekst:'Vand' },
  { id:'snacks',      tekst:'Snacks', tip:'Sødt eller salt' },
  { id:'kaffe-te',    tekst:'Kaffe/te' },
  { id:'drinks',      tekst:'Drikkevarer', tip:'Vin, øl, sodavand, danskvand o.l.' },
  /* Alt efter drikkevarerne er GREJ, ikke indkøb (OD 31/8). Det står under sin
     egen overskrift, fordi det typisk allerede er dækket af et madscenarie —
     har man ikke valgt et, er det her, man opdager, at glassene mangler. */
  { id:'glas',        tekst:'Glas',                              del:2 },
  { id:'åbner',       tekst:'Åbner',                             del:2 },
  { id:'servietter',  tekst:'Servietter',                        del:2 },
  { id:'skål',        tekst:'Skål/tallerken der står godt',      del:2 },
  { id:'køletaske',   tekst:'Evt. køletaske',                    del:2 }
];
/* Morgenmad-trinnets faste liste (KN 27/8) — kun for flerdages-ture. Man
   vælger selv, hvad der er relevant, og kan skrive egne punkter til (se
   s.egneTing.morgen), som huskes på tværs af ture ligesom pakke/hygge/hund. */
const MORGEN_VALG = [
  { id:'kaffe-te',    tekst:'Kaffe/te', tip:'eller andet morgenritual' },
  { id:'kopper',      tekst:'Kopper' },
  { id:'ske',         tekst:'Ske' },
  { id:'vand',        tekst:'Vand' },
  { id:'morgenmad',   tekst:'Morgenmad' },
  { id:'mælk-sukker', tekst:'Mælk, sukker eller lign.' },
  { id:'bestik',      tekst:'Bestik' },
  { id:'varme',       tekst:'Evt. noget at varme vand/mad i' }
];
/* FORPLEJNING_UDSTYR (Service og spisegrej · Køl og varme · Oprydning) er
   slettet 30/8 efter Olivias gennemspilning. De tre trin lå efter Snacks og
   spurgte om udstyr løsrevet fra det, man rent faktisk skulle spise. Nu står
   udstyret dér, hvor beslutningen træffes: i det enkelte madscenaries
   "Det skal I bruge". Salt/peber, dyppelse og køle/varmetaske er flyttet med
   over i alle scenarier, pizzaskæreren kun til Take Away. Resten (termokande,
   opvaskemiddel, viskestykke …) er bevidst ikke båret over — spørg OD, hvis
   noget af det skal tilbage. Ligger i git-historikken. */

/* =============================================================
   STATE
   ============================================================= */
function friskState(){
  return {
    onboarded:false,
    profil:{ email:'kennet@justsecure.dk', navn:'', fødselsdag:'', kode:'', notifikationer:true },
    /* ---- flere ture ad gangen (31/8, OD) ----
       Før var der ÉN tur: s.forberedelse. Nu ligger de kommende ture i
       s.arytmer, og s.aktivId peger på den, man arbejder på lige nu.
       s.forberedelse findes stadig — som en accessor (se klargørState), der
       slår op i arytmer. Det er med vilje: 131 steder i appen læser
       s.forberedelse, og de skal ikke alle sammen røres for at kunne have to
       ture i kalenderen. Afholdte ture ligger fortsat i s.ture; de har en
       anden form (score, kommentar, minde) og er ikke ture, man planlægger.
       En arytme = et forberedelse-objekt + et id. */
    arytmer:[],          // kommende ture — [{id, ...nyForberedelse()}]
    aktivId:null,        // hvilken af dem s.forberedelse peger på
    /* ---- egne punkter, på tværs af ture (14/8, OD) ----
       "Appen skal huske de punkter man selv tilføjer listerne, så de ligger
       der til næste gang." Derfor bor de HER og ikke i s.forberedelse, som
       nulstilles, når turen er gemt (før: hver gang man kørte af sted). Selve
       afkrydsningen er stadig turens — det er tingene, der huskes, ikke om
       de var pakket sidste gang.
       Faste lister: pakke (Personligt), hygge (Bilens nice-to-have), hund
       og morgen (Morgenmad-trinnets egne punkter, 27/8). Dertil én liste pr.
       madscenarie ('mad-tapas', 'mad-takeaway' …) fra "Jeg vil også
       medbringe…" (OD 30/8) — de er pr. scenarie og ikke fælles, så en
       pizzaskærer skrevet under Take Away ikke dukker op under Tapas. */
    egneTing:tommeEgneTing(),
    ture:[]              // {sted,dato,score:{destination,app,hygge},kommentar,minde,plan}
  };
}
/* Ét sted at bestemme, hvilke egne-lister der findes — brugt både af
   friskState(), migrationen og tilføjEgetPunkt(). */
function egneListeNavne(){
  return ['pakke','hygge','hund','morgen', ...MAD_VALG.map(m=>'mad-'+m.id)];
}
function tommeEgneTing(){
  const ud = {};
  egneListeNavne().forEach(k=>{ ud[k] = []; });
  return ud;
}
let s = klargørState(indlæs());
function indlæs(){
  try{
    const gemt = localStorage.getItem(GEM);
    if(gemt){
      const g = JSON.parse(gemt);
      // beskeder er slået til fra start — gamle gemte tilstande havde intet valg
      if(g.profil && g.profil.notifikationer == null) g.profil.notifikationer = true;
      /* migration 14/8: egne punkter flyttet ud af turen og op i staten, så de
         overlever, at man kører af sted. Dem, der ligger i en igangværende
         forberedelse, tages med op — ellers ville folk miste det, de allerede
         havde skrevet, i selve den opdatering, der skulle bevare det. */
      /* migration 31/8: "God tur"-tilstanden findes ikke længere. En tur, der
         var i gang, ER afholdt — den lægges i loggen som en uanmeldt tur, så
         den ikke forsvinder lydløst sammen med tilstanden. */
      if(g.påTur){
        g.ture = g.ture || [];
        g.ture.unshift({ sted:g.påTur.sted||'Jeres sted', dato:g.påTur.startet,
                         score:null, kommentar:'', minde:'', plan:g.påTur.plan||null });
        delete g.påTur;
      }
      if(!g.egneTing) g.egneTing = tommeEgneTing();
      egneListeNavne().forEach(k=>{ if(!Array.isArray(g.egneTing[k])) g.egneTing[k] = []; });
      if(g.forberedelse && Array.isArray(g.forberedelse.egnePunkter) && g.forberedelse.egnePunkter.length){
        const kendte = new Set(g.egneTing.pakke.map(p=>p.tekst));
        g.forberedelse.egnePunkter.forEach(p=>{ if(!kendte.has(p.tekst)) g.egneTing.pakke.push(p); });
        g.forberedelse.egnePunkter = [];
      }
      // migration: ældre gemte ture kender ikke Forplejningens nye valglister
      if(g.forberedelse){
        const f = g.forberedelse;
        if(!f.snackValg) f.snackValg = [];
        if(!f.morgenValg) f.morgenValg = [];
        /* migration 30/8: Snacks og Drikkevarer er én liste nu. De gamle
           drikke-id'er er bevaret uændret i SNACK_VALG, så det er nok at
           flytte dem over — ellers tabte en gemt tur sine drikkevarer
           lydløst, og forplejningKlar() ville flippe til "ikke klar". */
        if(Array.isArray(f.drikkeValg) && f.drikkeValg.length){
          f.snackValg = [...new Set([...f.snackValg, ...f.drikkeValg])];
        }
        delete f.drikkeValg;
        /* migration 30/8: udstyrs-trinnene er væk, og scenariernes egne
           punkter kan nu vælges enkeltvis (f.brugValg). Havde man allerede
           valgt et scenarie, var HELE dets brug-liste med — så det er den
           tilstand, vi genskaber. Ellers ville pakkelisten tømmes for folk
           midt i en tur. */
        if(!f.brugValg) f.brugValg = [];
        /* migration 31/8: punkterne er nu forvalgt, når man åbner et scenarie.
           Scenarier, der allerede ligger på turen, regnes som forvalgte — ellers
           ville et bevidst fravalg blive fyldt op igen ved næste tegning. */
        if(!f.brugSet) f.brugSet = [...(f.madValg||[])];
        (f.madValg||[]).forEach(id=>{
          const d = MAD_SCENARIE_DETALJER[id]; if(!d) return;
          if(!d.brug.some(p=>f.brugValg.includes(p.id))){
            d.brug.forEach(p=>f.brugValg.push(p.id));
          }
        });
        delete f.udstyrValg;
        // migration 11/8: Bilen fik biltype + huskeliste, og afgangsdagen sin
        // egen tjekliste. (egnePunkter er flyttet op i s.egneTing 14/8 — se
        // migrationen ovenfor; feltet skal ikke genskabes her.)
        if(f.bilType === undefined) f.bilType = null;
        if(!f.bilHuske) f.bilHuske = [];
        if(!f.klarTjek) f.klarTjek = [];
        delete f.egnePunkter; delete f.egetUdkast;
        if(f.hundMed === undefined) f.hundMed = false;
        /* migration 30/8: måltidsplanen (tidsplanen) er slettet — se
           kommentaren over MAD_VALG. Felterne ryddes, så de ikke ligger og
           fylder i gemt state. */
        /* returtid er tilbage 31/8 som et valgfrit klokkeslæt på hjemkomsten —
           den må IKKE slettes her længere, ellers ryger feltet ved hver
           indlæsning. Måltidsplanens egne felter er stadig væk. */
        delete f.måltidFra; delete f.egneMåltider;
        if(f.afgangstid === undefined) f.afgangstid = '16:00';
        if(f.returtid === undefined) f.returtid = '13:00';
        /* Camp Mode udgik 30/8, og bilTjek havde ingen andre punkter. En tur,
           der HAVDE krydset Camp Mode af, har været bilen igennem — den
           regnes derfor som færdig, så punktet ikke pludselig bliver rødt. */
        if(!f.set) f.set = {};
        if(f.set.bilen === undefined) f.set.bilen = !!(f.bilTjek||[]).includes('camp');
        delete f.bilTjek;
      }
      return g;
    }
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

/* =============================================================
   FLERE TURE — s.forberedelse som opslag i s.arytmer
   =============================================================
   Kontrakten er uændret for resten af appen: s.forberedelse er turen, man
   arbejder på, eller null. Det nye er, at den ikke ejer turen længere.

   Tildeling:
     s.forberedelse = nyForberedelse()  → ny tur, lagt i arytmer, gjort aktiv
     s.forberedelse = null              → SLIP den aktive tur (den bliver
                                          liggende som kommende tur)
   Skal en tur væk for altid, er det sletTur(id) — aldrig "= null". Det er
   grunden til, at de to ting har hvert sit navn: før betød "= null" begge
   dele, og med flere ture ville det stille og roligt tømme kalenderen. */
function nytTurId(){
  return 'a' + Date.now().toString(36) + Math.random().toString(36).slice(2,6);
}
function klargørState(g){
  if(!Array.isArray(g.arytmer)) g.arytmer = [];
  if(g.aktivId === undefined) g.aktivId = null;
  /* Migration 31/8: den ene gemte tur bliver til arytme nr. 1. Den skal ind,
     FØR accessoren sættes på — ellers skriver vi ind i vores egen setter
     midt i indlæsningen. */
  const gammel = Object.prototype.hasOwnProperty.call(g,'forberedelse') ? g.forberedelse : null;
  delete g.forberedelse;
  if(gammel && typeof gammel === 'object'){
    if(!gammel.id) gammel.id = nytTurId();
    if(!g.arytmer.some(a=>a.id===gammel.id)) g.arytmer.push(gammel);
    if(!g.aktivId) g.aktivId = gammel.id;
  }
  g.arytmer.forEach(a=>{ if(!a.id) a.id = nytTurId(); });
  if(g.aktivId && !g.arytmer.some(a=>a.id===g.aktivId)) g.aktivId = null;
  Object.defineProperty(g, 'forberedelse', {
    enumerable:false,        // må ikke serialiseres — turen bor i arytmer
    configurable:true,
    get(){ return g.arytmer.find(a=>a.id===g.aktivId) || null; },
    set(v){
      if(v == null){ g.aktivId = null; return; }
      if(!v.id) v.id = nytTurId();
      if(!g.arytmer.some(a=>a.id===v.id)) g.arytmer.push(v);
      g.aktivId = v.id;
    }
  });
  return g;
}
/* Den næstkommende tur: den med den første dato fra i dag og frem. Ture uden
   dato ligger bagest — de er kladder, ikke aftaler. Er alle datoer passeret,
   vises den nyeste alligevel, så forsiden ikke bliver tom, mens man stadig er
   i gang med turen. */
function næsteArytme(){
  if(!s.arytmer.length) return null;
  const iDag = new Date().toISOString().slice(0,10);
  const medDato = s.arytmer.filter(a=>a.dato).sort((a,b)=>a.dato<b.dato?-1:1);
  return medDato.find(a=>a.dato >= iDag) || medDato[medDato.length-1] || s.arytmer[0];
}
/* Peger aktivId ikke på noget, falder appen tilbage på den næstkommende tur.
   Det er dét, der gør, at forsiden viser næste tur, når man har gemt den, man
   sad med (OD 31/8: "Headeren skal stadig vise den næstkommende tur"). */
function sikrAktivTur(){
  if(s.aktivId && s.arytmer.some(a=>a.id===s.aktivId)) return;
  const n = næsteArytme();
  s.aktivId = n ? n.id : null;
}
function vælgTur(id){
  if(!s.arytmer.some(a=>a.id===id)) return;
  s.aktivId = id; gem(); nulstilHistorik();
}
/* Fjerner turen for altid. Bruges både når en kladde smides væk, når man
   annullerer, og når man kører af sted (så er den ikke længere kommende). */
function sletTur(id){
  const i = s.arytmer.findIndex(a=>a.id===id);
  if(i<0) return;
  s.arytmer.splice(i,1);
  if(s.aktivId === id) s.aktivId = null;
  gem();
}
/* Gem turen og planlæg detaljerne senere (OD 31/8). Turen bliver liggende som
   kommende tur — man slipper den bare. */
function gemTilSenere(){
  s.aktivId = null; gem(); nulstilHistorik(); gåTil('log');
  flash('Turen er gemt. Du kan planlægge resten, når du har lyst.', 'tjek');
}

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
/* Informativ pop-up med kun én knap — til beskeder der ikke kræver et valg,
   fx "invitation sendt". Samme visuelle sprog som bekræft(), men uden Fortryd. */
function infoModal(tekst, knapTekst){
  const gammel = document.getElementById('info-modal');
  if(gammel) gammel.remove();
  const div = document.createElement('div');
  div.id = 'info-modal';
  div.className = 'modal-bag';
  div.innerHTML = `
    <div class="modal-kort">
      <p>${tekst}</p>
      <div class="modal-knapper">
        <button class="knap primær bred" id="info-modal-luk">${knapTekst||'Okay'}</button>
      </div>
    </div>`;
  document.body.appendChild(div);
  div.addEventListener('click', e=>{ if(e.target===div) div.remove(); });
  document.getElementById('info-modal-luk').onclick = () => div.remove();
}
/* Modal med to veje videre (OD 31/8). infoModal har én knap og siger "det her
   skete"; den her spørger "hvad vil du så?". Sekundær til venstre, primær til
   højre — samme rækkefølge som bekræft(), så knapperne står, hvor de plejer.
   Bemærk: pop-uppernes "Til overblik" bliver stående, selvom den faste
   Til overblik-knap er fjernet fra siderne (E2). Det er to forskellige ting —
   den ene var en genvej, der fulgte med overalt, den her er et svar på et
   spørgsmål, appen lige har stillet. */
function valgModal(tekst, valg){
  const gammel = document.getElementById('valg-modal');
  if(gammel) gammel.remove();
  const div = document.createElement('div');
  div.id = 'valg-modal';
  div.className = 'modal-bag';
  div.innerHTML = `
    <div class="modal-kort">
      <p>${tekst}</p>
      <div class="modal-knapper">
        ${valg.map((v,i)=>`<button class="knap ${v.primær?'primær':'kontur'} bred" data-i="${i}">${v.tekst}</button>`).join('')}
      </div>
    </div>`;
  document.body.appendChild(div);
  div.addEventListener('click', e=>{
    if(e.target===div){ div.remove(); return; }
    const b = e.target.closest('button[data-i]');
    if(!b) return;
    div.remove();
    const v = valg[+b.dataset.i];
    if(v && v.aktion) v.aktion();
  });
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
/* x/y for et testet sted skrives ALDRIG i hånden — det udledes her af lat/lon,
   så de to felter ikke kan komme ud af sync. Det gjorde de: t1 stod med x:44,
   som er Hvide Sandes plads på det gamle stiliserede kort (se BYER), mens
   geoTilXY giver x≈9. De 35 enheders forskel er langt over grænsen på 16 i
   værtsKort(), så faciliteterne dukkede aldrig op, når man satte sin pin på
   det rigtige Hvide Sande. Alle testede steder har nu lat/lon, så x/y
   udledes for dem alle. */
TESTEDE.forEach(t=>{
  if(t.lat==null || t.lon==null) return;
  const xy = geoTilXY(t.lat, t.lon);
  t.x = xy.x; t.y = xy.y;
});

/* Fugleflugt i km mellem to {lat,lon} — bruges til at måle testede steder
   op mod den radius, brugeren valgte i trin 3. */
function afstandKm(a, b){
  const rad = Math.PI/180, R = 6371;
  const dLat = (b.lat-a.lat)*rad, dLon = (b.lon-a.lon)*rad;
  const h = Math.sin(dLat/2)**2 + Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.sqrt(h));
}
/* Geo for et testet sted — rigtige koordinater hvis vi har dem, ellers
   den omtrentlige omregning fra kortets x/y (gælder t2-t10, se status). */
function testetGeo(t){
  return (t.lat!=null && t.lon!=null) ? { lat:t.lat, lon:t.lon } : xyTilGeo(t.x, t.y);
}
function startGeo(){
  const f = s.forberedelse;
  if(!f || !f.startXY) return null;
  return xyTilGeo(f.startXY.x, f.startXY.y);
}
/* De nærmeste andre testede steder til ET GIVENT sted (ikke fra brugerens
   startpunkt) — en plan B, hvis stedet man kigger på er optaget, eller man
   bare ikke er til det. Ingen afstandsgrænse: selv et isoleret sted som
   Hvide Sande skal vise sin nærmeste nabo, bare ærligt mærket med km. */
function stederINærheden(t, antal=3){
  const geo = testetGeo(t);
  return TESTEDE.filter(x=>x.id!==t.id)
    .map(x=>({ t:x, km: afstandKm(geo, testetGeo(x)) }))
    .sort((a,b)=>a.km-b.km)
    .slice(0,antal);
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
/* ---------- årstiden i landskabet (13/8) ----------
   Landskabet kendte kun tidspunktet på dagen. Nu kender det også årstiden.

   VIGTIGT for vedligehold: det er bygget som en JUSTERING af de fem palletter,
   der allerede findes — ikke som nye palletter. Fire årstider × fem palletter
   ville være tyve håndholdte farvesæt, og så er der ingen, der holder dem ved lige.
   Her er der stadig fem sæt farver og fire tal at skrue på. */
const ÅRSTIDSSKIFT = {
  // mæt = mætning ganges, lys = lysstyrke lægges til, kulør = graders drejning
  vinter:  { mæt:.50, lys:+.035, kulør:+8 },   // kold og udvasket, lidt lysere
  forår:   { mæt:.95, lys:+.020, kulør:+10 },  // en anelse grønnere
  sommer:  { mæt:1.15, lys:0,    kulør:-3 },   // fyldigst — sådan ser appen ud i dag
  efterår: { mæt:1.20, lys:-.010, kulør:-10 }  // mod rav og kobber
};
function hexTilHsl(h){
  const r=parseInt(h.slice(1,3),16)/255, g=parseInt(h.slice(3,5),16)/255, b=parseInt(h.slice(5,7),16)/255;
  const mx=Math.max(r,g,b), mn=Math.min(r,g,b), l=(mx+mn)/2;
  if(mx===mn) return [0,0,l];
  const d=mx-mn, s=l>.5 ? d/(2-mx-mn) : d/(mx+mn);
  const hh = mx===r ? ((g-b)/d+(g<b?6:0)) : mx===g ? ((b-r)/d+2) : ((r-g)/d+4);
  return [hh*60, s, l];
}
function hslTilHex(hu,s,l){
  hu=((hu%360)+360)%360; s=Math.min(1,Math.max(0,s)); l=Math.min(1,Math.max(0,l));
  const c=(1-Math.abs(2*l-1))*s, x=c*(1-Math.abs((hu/60)%2-1)), m=l-c/2;
  const [r,g,b] = hu<60?[c,x,0]:hu<120?[x,c,0]:hu<180?[0,c,x]:hu<240?[0,x,c]:hu<300?[x,0,c]:[c,0,x];
  return '#'+[r,g,b].map(v=>Math.round((v+m)*255).toString(16).padStart(2,'0')).join('');
}
function årstidsFarve(hex, skift){
  const [h,s,l] = hexTilHsl(hex);
  return hslTilHex(h + skift.kulør, s * skift.mæt, l + skift.lys);
}
function årstidsPalet(p, sæson){
  const skift = ÅRSTIDSSKIFT[sæson];
  if(!skift) return p;
  return {
    sky: p.sky.map(f=>årstidsFarve(f, skift)),
    sol: årstidsFarve(p.sol, { ...skift, mæt:Math.min(skift.mæt,1.05) }), // solen må ikke blive skinger
    b1: årstidsFarve(p.b1, skift), b2: årstidsFarve(p.b2, skift), b3: årstidsFarve(p.b3, skift)
  };
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
    // Standard: i dag kl. 15 — de fleste arytmer bliver til samme dag, og
    // eftermiddagen er det tidspunkt, man reelt kommer afsted på.
    /* Klokkeslæt er VALGFRIT, men forudindstillet (OD 31/8): kl. 16 på
       afgangsdagen, kl. 13 på hjemkomsten. Tømmer man feltet, står der
       ingenting på turplanen. */
    dato:new Date().toISOString().slice(0,10), afgangstid:'16:00',
    retur:'samme', returDato:null, returtid:'13:00',
    startNavn:'', startXY:null, radius:2, oplevelser:{lys:null, natur:null, stemning:null},
    destination:null,
    /* brugValg (30/8): de enkelte ting fra et madscenaries "Det skal I bruge".
       Erstatter udstyrValg, som hørte til de slettede udstyrs-trin. */
    /* brugSet: hvilke scenarier der har fået deres punkter forvalgt (31/8).
       Uden den ville et scenarie, hvor man bevidst har fjernet alt, blive
       fyldt op igen, hver gang siden tegnes. */
    madValg:[], snackValg:[], morgenValg:[], brugValg:[], brugSet:[],
    invType:null, invModtager:'', invAfsender:'', invStatus:null,
    invForslag:[], invForslagFra:null, invEnigDato:null,
    /* egnePunkter er væk fra turen (14/8) — egne punkter bor i s.egneTing og
       huskes på tværs af ture. hundMed er turens eget valg: hunden er ikke
       nødvendigvis med hver gang. Udstyr til bilen er forudvalgt (KN 27/8): man
       skal aktivt fjerne et punkt, hvis det ikke skal med — ikke aktivt
       tilføje det. De to andre bil-trin starter tomme (opt-in). */
    bilType:null, bilHuske:BILEN_GRUPPER.find(g=>g.id==='need').punkter.filter(p=>p.huske).map(p=>p.id),
    hundMed:false, klarTjek:[], planlagt:false,
    pakkeTjek:[],
    set:{mad:false, bilen:false},
    startet:new Date().toISOString().slice(0,10)
  }, ekstra||{});
}
/* Fremdrift pr. fase: fase 1 = 2 planlægningspunkter, fase 2 = 12 ting at pakke */
function fremdrift(fase){
  const f = s.forberedelse;
  fase = fase || (f ? f.fase||1 : 1);
  if(fase===1){
    const total = SEKTIONER.filter(x=>x.fase===1).length; // 1 — kun destinationen
    if(!f) return { total, klaret:0, mangler:total, pct:0 };
    const klaret = SEKTIONER.filter(x=>x.fase===1 && sektionKlar(x.id)).length;
    return { total, klaret, mangler:total-klaret, pct:Math.round(klaret/total*100) };
  }
  // Fase 2: bilen tæller to svar (hvilken bil + at man har været listerne
  // igennem), pakkelisten tæller sine egne punkter inkl. dem brugeren selv
  // har skrevet.
  const pakkeTotal = pakkePunkter().length;
  const total = 2 + pakkeTotal;
  if(!f) return { total, klaret:0, mangler:total, pct:0 };
  const klaret = (f.bilType?1:0) + (f.set && f.set.bilen ? 1 : 0) + f.pakkeTjek.length;
  return { total, klaret, mangler:total-klaret, pct:Math.round(klaret/total*100) };
}
/* Bilen er klar, når man har svaret på hvilken bil det er, OG man har været
   de tre udstyrs-trin igennem. Selve punkterne på listerne er huskeliste, ikke
   krav — de må ikke kunne spærre for at komme videre (OD 11/8: punktet blev
   aldrig grønt, fordi det før krævede alle ni ting i Døsige Dølle-tasken).
   Var før bundet til Camp Mode-afkrydsningen; den udgik 30/8, så nu er det
   f.set.bilen, sat når man trykker Færdig på sidste trin — samme mønster som
   f.set.mad. */
function bilenKlar(f){ return !!(f && f.bilType && f.set && f.set.bilen); }
/* Pakkelisten er klar, når alle punkter — inkl. dem man selv har skrevet — er
   krydset af. Forplejningen tæller IKKE med her længere (OD 11/8); den ligger
   på pakkelisten under afgangsdagen. */
/* Egne punkter kommer nu fra s.egneTing (huskes på tværs af ture), ikke fra
   turen. Hunde-punkterne tæller kun med, når man har sagt, at hunden er med. */
function egne(liste){ return (s.egneTing && s.egneTing[liste]) || []; }
function hundMed(){ const f = s.forberedelse; return !!(f && f.hundMed); }
function pakkePunkter(){
  return [...PAKKE_PUNKTER, ...egne('pakke'),
    ...(hundMed() ? [...HUND_PUNKTER, ...egne('hund')] : [])];
}
function sektionKlar(id){
  const f = s.forberedelse; if(!f) return false;
  switch(id){
    case 'destination': return !!f.destination;
    /* 'invitation' er ikke længere en sektion — invErKlar() lever videre,
       men bruges nu kun af turplanen og invitationsskærmen selv. */
    case 'bilen': return bilenKlar(f);
    case 'pakke': return f.pakkeTjek.length >= pakkePunkter().length;
    default: return !!f.set[id];
  }
}
/* Guidet flow: hver fase er en RÆKKE af sider (destination→mad,
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
/* "Til overblik"-knappen er fjernet fra alle sider (OD 31/8). Den stod øverst
   på hvert trin i flowet og gjorde det samme som hus-ikonet i bundnavigationen,
   som ligger der hele tiden. To veje til samme sted, hvoraf den ene flyttede
   sig fra skærm til skærm. Vejen hjem er nu bundnavigationen — ét sted. */
/* Top af hver sektionsside: overskrift som et spørgsmål, og prikker der viser
   hvor i rækken man er. Ingen tilbage-pil her — Tilbage/Næste i bunden
   (sektionFod) er den ene, konsekvente vej at navigere frem og tilbage på. */
function sektionHeader(id){
  const {sek, liste, idx} = sektionPos(id);
  const F = FASER[sek.fase];
  const prikker = liste.map((x,i)=>`<span class="sek-prik ${i===idx?'aktiv':''} ${sektionKlar(x.id)?'klaret':''}"></span>`).join('');
  return `<div class="trin-top">
    <div class="etiket-række"><div class="etiket">${F.navn} · ${idx+1}/${liste.length}</div></div>
    <h1 style="font-size:22px">${sek.spørg}</h1>
  </div>
  <div class="sek-prikker">${prikker}</div>`;
}
/* Bund af hver sektionsside: to ens småknapper — Tilbage og Næste — side om
   side, plus Annullér. Ensartet i hele flowet (ingen store "næste"-kort).
   Tilbage følger den ægte historik, ikke rækkefølgen: kommer man ind i
   Forplejningen fra tjeklisten på forsiden, går Tilbage til forsiden.
   næsteOverstyr bruges af Bilen (30/8), som har tre indre trin: dér skal
   Næste gå til næste TRIN, ikke til næste sektion. */
function sektionFod(id, næsteOverstyr){
  const {sek, liste, idx} = sektionPos(id);
  const fald = idx>0 ? liste[idx-1].id : (sek.fase===1 ? 'onsker' : 'hjem');
  const forrigeKnap = `<button class="knap kontur lille" onclick="tilbage('${fald}')">${ik('tilbage')} Tilbage</button>`;

  // Destinationssiden har kun ét formål: vælg et sted (på kortet eller en køreklar tur).
  // Før et sted er valgt, giver "Næste" ingen mening — kun Forrige vises.
  if(id==='destination' && !sektionKlar('destination')){
    return `<div style="margin-top:18px">
      <div class="fod-nav">${forrigeKnap}</div>
      ${annullérLinje()}
    </div>`;
  }
  const næste = idx<liste.length-1 ? liste[idx+1] : null;

  // "Næste" = næste sektion. Fase 1 slutter ikke i et valg, men på den rolige
  // afrunding ("En sund forstyrrelse") — den er ikke et punkt, man skal klare.
  // Planlægger man sammen, må man ikke snige sig forbi låsen via Næste-knappen —
  // samme spærring som på tjeklisten på forsiden.
  let næsteLabel, næsteAktion, næsteLåst = false;
  if(næsteOverstyr){ næsteLabel = 'Næste'; næsteAktion = næsteOverstyr; }
  else if(næste){
    næsteLåst = ['mad','bilen','pakke'].includes(næste.id) && afventerFællesPlan(s.forberedelse);
    næsteLabel = 'Næste';
    næsteAktion = næsteLåst ? 'venterPåBekræftelse()' : `gåTil('${næste.id}')`;
  }
  else if(sek.fase===1){ næsteLabel = 'Planen er klar';        næsteAktion = "gåTil('hjem')"; }
  // Sidste trin i fase 2. Planlægger man i skjul, er pakkelisten det sidste,
  // der mangler, før overraskelsen kan sendes — så vejen går tilbage til
  // invitationen med mailen klar, ikke ud af turen (OD 11/8).
  else if(gaveKladde(s.forberedelse)){ næsteLabel = 'Videre til invitationen'; næsteAktion = 'tilInvitationMedMail()'; }
  // Sidste trin i hele planlægningen: "Afslut planlægning", ikke "Planen er
  // klar" (OD 31/8). Fase 1's afrunding hedder stadig det sidste — dér er
  // planen faktisk ikke klar, kun stedet.
  else {                 næsteLabel = 'Afslut planlægning';    næsteAktion = 'planenErKlar()'; }

  const næsteKnap = `<button class="knap kontur lille${næsteLåst?' låst':''}" onclick="${næsteAktion}">${næsteLabel} ${ik(næsteLåst?'lås':'pil')}</button>`;

  return `<div style="margin-top:18px">
    <div class="fod-nav">${forrigeKnap}${næsteKnap}</div>
    ${annullérLinje()}
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
  const sæson = årstid();
  const p = årstidsPalet(paletter[nøgle]||paletter.klar, sæson);
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
  const sfx = nøgle+'-'+sæson+'-'+H;   // unikke gradient-id'er pr. palet, årstid og lærredshøjde
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
  {id:'log',    ikon:'bog',    navn:'Dine arytmer'}
];
/* ÉN ægte historik i stedet for gæt. Tilbage fører altid derhen, hvor man
   lige kom fra — kommer man ind i Forplejningen fra tjeklisten, går tilbage
   til tjeklisten, ikke til "punktet før i rækken".

   En VISNING er ikke bare et skærmnavn: det er skærmen PLUS de undertilstande,
   der afgør, hvad skærmen viser. Trykker man "Planlæg sammen" inde på
   invitationssiden, skifter siden jo indhold uden at skifte skærm — det er et
   skridt, brugeren kan se, og derfor et skridt, Tilbage skal kunne tage igen.
   Reglen i hele appen: ét synligt skift = ét skridt i historikken.

   Undertilstande der er FREMDRIFT (invStatus: sendt, bekræftet, afslået) hører
   ikke med — man kan ikke fortryde en afsendt invitation med en tilbage-knap. */
let historik = [];
function visning(){
  const f = s.forberedelse;
  return {
    skærm: aktivSkærm,
    invType:    f ? (f.invType || null) : null,
    invVisMail: f ? !!f.invVisMail : false
  };
}
function sætVisning(v){
  aktivSkærm = v.skærm;
  const f = s.forberedelse;
  if(f){ f.invType = v.invType; f.invVisMail = v.invVisMail; gem(); }
  tegn();
  $('indhold').scrollTop = 0;
}
function læg(v){
  historik.push(v);
  if(historik.length > 40) historik.shift();
}
function gåTil(skærm){
  if(skærm !== aktivSkærm) læg(visning());
  aktivSkærm = skærm;
  tegn();
  $('indhold').scrollTop = 0;
}
/* Kaldes FØR en ændring, der skifter hvad skærmen viser uden at skifte skærm.
   Uden den ville Tilbage springe hele skærmen over og lande et skridt for langt. */
function gemUnderTrin(){ læg(visning()); }
/* Skærme, der er "brugt op" når man går videre (fx et sted man netop har valgt),
   skal ikke ligge i vejen på vej tilbage. */
function gåTilErstat(skærm){
  aktivSkærm = skærm;
  tegn();
  $('indhold').scrollTop = 0;
}
/* Ét skridt tilbage. Er historikken tom (frisk start), bruges fallback. */
function tilbage(fallback){
  if(historik.length){ sætVisning(historik.pop()); return; }
  aktivSkærm = fallback || 'hjem';
  tegn();
  $('indhold').scrollTop = 0;
}
/* Hop ud af et helt forløb (Overblik-genvejen, bundnavigationen, "Færdig" i
   Udstyr): rul historikken tilbage til den skærm i stedet for at lægge endnu
   et skridt oveni. Så peger Tilbage dér ikke ind i det, man lige har forladt.

   Til forskel fra tilbage() gendannes undertilstandene IKKE. Et spring ud til
   overblikket er ikke en fortrydelse — har man valgt "Planlæg sammen", skal
   valget stadig stå, når man kigger forbi forsiden og kommer tilbage. */
function tilbageTil(skærm){
  for(let i = historik.length-1; i >= 0; i--){
    if(historik[i].skærm === skærm){
      historik.length = i;
      aktivSkærm = skærm;
      tegn();
      $('indhold').scrollTop = 0;
      return;
    }
  }
  gåTil(skærm);
}
/* Nulstilles når turen begynder eller slutter — så tilbage aldrig lander på
   en skærm, der ikke findes mere. */
function nulstilHistorik(){ historik = []; }
function tegnNav(){
  if(!s.onboarded){ $('bundnav').style.display='none'; return; }
  $('bundnav').style.display='flex';
  const rod = NAV.some(n=>n.id===aktivSkærm) ? aktivSkærm : (aktivSkærm==='log'||aktivSkærm==='profil') ? aktivSkærm : 'hjem';
  $('bundnav').innerHTML = NAV.map(n=>`
    <button class="navpunkt ${n.id===rod?'aktiv':''}" onclick="tilbageTil('${n.id}')" aria-label="${n.navn}">${ik(n.ikon)}</button>`).join('');
}
function skærmTop(titel, tilbageTil, etiket){
  return `<div class="skærm-top">
    <button class="tilbage" onclick="tilbage('${tilbageTil}')">${ik('tilbage')}</button>
    <div>${etiket?`<div class="etiket">${etiket}</div>`:''}<h1 style="font-size:22px">${titel}</h1></div>
  </div>`;
}

/* =============================================================
   ONBOARDING — velkomst → personlig kode → notifikationer
   ============================================================= */
let obTrin = 1;
/* Dato som tre valg (dag/måned/år) i stedet for et nativt dato-felt — genbrugt
   af fødselsdag (onboarding), afgangsdato og "vælg dato" ved hjemkomst.
   Et kalenderhjul er dårligt til fødselsdage (30-40 klik tilbage i tiden) og
   så forskelligt ud på tværs af Mac/Windows/Android, ligesom skriften gjorde
   det før 13/8. Dag-listen retter sig efter måned/år, så 30. februar ikke kan
   vælges. `retning` styrer årlisten: 'fortid' (fødselsdag, ned til 1920,
   nyeste år først) eller 'fremtid' (rejsedatoer, i år + 2 år frem).
   `gemFn`, hvis angivet, kaldes efter dag-listen er opdateret — bruges til
   rejsedatoer, der skal gemmes og opdatere resten af skærmen med det samme
   (fx om "Videre"-knappen skal låses op). Fødselsdag gemmes først ved klik
   på "Gem min kode", så onboarding sender ikke noget gemFn. */
function datoSelects(id, iso, retning, gemFn){
  const [åY,åM,åD] = (iso||'').split('-').map(Number);
  const maxDage = åM ? new Date(åY||2000, åM, 0).getDate() : 31;
  const opt = (v,valgt,tekst)=>`<option value="${v}" ${v===valgt?'selected':''}>${tekst}</option>`;
  const dage = Array.from({length:maxDage},(_,i)=>opt(i+1, åD, i+1)).join('');
  const måneder = MDR.map((m,i)=>opt(i+1, åM, m[0].toUpperCase()+m.slice(1))).join('');
  const iÅr = new Date().getFullYear();
  const årListe = retning==='fremtid'
    ? [iÅr, iÅr+1, iÅr+2]
    : Array.from({length:iÅr-1920+1},(_,i)=>iÅr-i);
  const år = årListe.map(v=>opt(v, åY, v)).join('');
  const skift = `datoTegnDage('${id}')${gemFn?`;${gemFn}()`:''}`;
  return `<div class="dato-vælger">
    <select id="${id}Dag" aria-label="Dag" onchange="${skift}">${!åD?'<option value="" selected disabled>Dag</option>':''}${dage}</select>
    <select id="${id}Måned" aria-label="Måned" onchange="${skift}">${!åM?'<option value="" selected disabled>Måned</option>':''}${måneder}</select>
    <select id="${id}År" aria-label="År" onchange="${skift}">${!åY?'<option value="" selected disabled>År</option>':''}${år}</select>
  </div>`;
}
/* Genopbygger kun Dag-listen ved skift af måned/år, så man ikke mister
   andre felter, man er i gang med (hele skærmen tegnes ikke om her). */
function datoTegnDage(id){
  const dagFelt = $(id+'Dag'), valgtDag = parseInt(dagFelt.value)||0;
  const måned = parseInt($(id+'Måned').value)||0, år = parseInt($(id+'År').value)||0;
  const maxDage = måned ? new Date(år||2000, måned, 0).getDate() : 31;
  const dag = Math.min(valgtDag, maxDage) || '';
  const opt = (v,valgt,tekst)=>`<option value="${v}" ${v===valgt?'selected':''}>${tekst}</option>`;
  dagFelt.innerHTML = (!dag?'<option value="" selected disabled>Dag</option>':'') +
    Array.from({length:maxDage},(_,i)=>opt(i+1, dag, i+1)).join('');
}
/* Læser de tre valg til ét ISO-datotekst (eller null, hvis ikke alle tre er sat). */
function datoLæs(id){
  const d=$(id+'Dag').value, m=$(id+'Måned').value, å=$(id+'År').value;
  return (d&&m&&å) ? `${å}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}` : null;
}
function skærmOnboarding(){
  if(obTrin===1){
    $('indhold').innerHTML = `
    <div class="hero fuld">
      ${heroScene('klar', skærmHøjde())}
      <div class="overlay">
        <div class="h-top">
          <div class="h-logo">${logoSVG(true)}</div>
          <div class="ht-side"></div>
          <div class="ht-side højre"></div>
        </div>
        <div class="h-bund">
          <h1>Vælg mindre.<br>Oplev mere.</h1>
          <p>Fra idé til afsted — mindst mulig planlægning, mest mulig oplevelse.</p>
          <div class="handling">
            <button class="knap lys ånde kør-knap bred" onclick="obTrin=2;tegn()">Login i appen og start din Arytmi ${ik('pil')}</button>
          </div>
        </div>
      </div>
    </div>`;
    return;
  }
  if(obTrin===2){
    $('indhold').innerHTML = `<div class="side anim" style="padding-top:34px">
      <div style="display:flex;justify-content:center;margin-bottom:22px">${logoSVG(false)}</div>
      <div class="kort">
        <div class="etiket">Første login</div>
        <div style="display:flex;gap:12px;align-items:center;margin-top:6px">
          <span style="color:var(--rav)">${ik('person','stor')}</span>
          <h2>Lidt om dig</h2>
        </div>
        <p class="dæmpet" style="margin-top:6px">Fortæl os, hvem du er, og vælg din egen 4-cifrede kode.</p>
        <label class="felt-etiket">Dit navn</label>
        <input type="text" id="obNavn" placeholder="Fx Kennet" value="${esc(s.profil.navn||'')}">
        <label class="felt-etiket">Fødselsdag</label>
        ${datoSelects('ob', s.profil.fødselsdag, 'fortid')}
        <div style="border-top:1px solid var(--linje);margin:22px 0 4px"></div>
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
        <h2>Beskeder</h2>
      </div>
      <p style="font-size:14.5px">OBS: For at vi kan hjælpe jer med at planlægge turen, sender Arytmi beskeder til din telefon. Vi sender aldrig beskeder, der ikke er med til at gøre din oplevelse bedre.</p>
      <p class="dæmpet" style="font-size:13.5px;margin-top:8px">Beskederne er slået til fra start. Du kan altid slå dem fra under Profil &amp; indstillinger.</p>
      <button class="knap primær bred" onclick="vælgNotif(true)" style="margin-top:16px">Det er forstået</button>
    </div>
  </div>`;
}
function gemKode(){
  const navn = ($('obNavn').value||'').trim();
  const k1 = $('kode1').value.trim(), k2 = $('kode2').value.trim();
  if(!navn){ flash('Skriv dit navn — invitationerne bliver sendt i dit navn.'); return; }
  if(k1.length<4){ flash('Koden skal være 4 cifre.'); return; }
  if(k1!==k2){ flash('De to koder er ikke ens — prøv igen.'); return; }
  s.profil.navn = navn;
  s.profil.fødselsdag = datoLæs('ob') || '';
  s.profil.kode = k1; gem();
  obTrin = 3; tegn();
}
function vælgNotif(til){
  s.profil.notifikationer = til;
  s.onboarded = true; gem();
  nulstilHistorik(); gåTil('hjem');
  flash('Velkommen til Arytmi.', 'klokke');
}

/* =============================================================
   FORSIDE — ét helt billede, én beslutning: forbered turen
   ============================================================= */
/* Arytmi-tæller — kompakt hjerteslag øverst; tæller årets arytmer */
function arytmiTæller(){
  const iÅr = s.ture.filter(t=>t.dato && String(t.dato).startsWith(String(new Date().getFullYear()))).length;
  // rytmestregen bor i ordmærket — tælleren nøjes med hjerteslaget
  return `<button class="aryt-tæller" onclick="gåTil('log')" aria-label="${iÅr} arytmer i år" title="Arytmer i år">
    <span class="at-label">Arytmer i år:</span>
    <svg class="at-hjerte" viewBox="0 0 24 24"><path d="M12 21C12 21 3 14.6 3 8.9 3 5.7 5.4 4 7.8 4 9.7 4 11.2 5.2 12 6.4 12.8 5.2 14.3 4 16.2 4 18.6 4 21 5.7 21 8.9 21 14.6 12 21 12 21Z"/></svg>
    <span class="at-tal">${iÅr}</span>
  </button>`;
}

/* Er der reelt sat noget i gang? En tom kladde (fx man åbnede "Forbered tur"
   men valgte intet) tæller ikke — så forsiden forbliver ren. */
function turIGang(){
  const f = s.forberedelse; if(!f) return false;
  return !!(f.destination || f.dato || f.invType
    || f.set.mad || f.set.bilen
    || (f.pakkeTjek && f.pakkeTjek.length));
}
function skærmHjem(){
  // Tom kladde smides væk, så forsiden ikke husker en planlægning, der aldrig kom i gang
  if(s.forberedelse && !turIGang()){ sletTur(s.aktivId); }
  // Har turen en dato (planlagt via Spontan tur), bliver forsiden en nedtælling + tjekliste
  if(s.forberedelse && s.forberedelse.dato){
    return skærmHjemNedtælling();
  }
  let variant='klar', overskrift, underoverskrift='', under, knap, ekstraForside='';

  /* "Velkommen hjem" og "God tur" er væk (OD 31/8). De var to fuldskærms-
     tilstande, der ventede på et tryk. Turen ligger i stedet i Dine arytmer,
     indtil man selv gemmer den. */
  if(s.forberedelse){
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
        ? { tekst:'Af sted', ikon:'måne', aktion:'tilAfsted()' }
        : { tekst:'Afslut forberedelsen', note:`${f.klaret} af ${f.total} pakket`, ikon:'pil', aktion:"gåTil(nutidigSektion())", ring:f.pct };
    }
    ekstraForside = `<button class="spontan-link" onclick="gåTil('turplan')">${ik('bog')} Se hele turplanen</button>`;
  } else {
    overskrift='Klar til en sund<br>forstyrrelse?';
    underoverskrift='Fra idé til afsted.';
    /* Strammet 13/8, så startknappen kommer inden for skærmen på en lille telefon.
       Kennets egne ord er beholdt — kun gentagelsen og konsulentsproget er væk.
       MIDLERTIDIG: OD og KN laver den rigtige tekstgennemgang, når det
       overordnede er på plads. Rør den ikke før da. */
    under='Vælg mindre, oplev mere. Alt for mange idéer drukner i planlægning — her går du direkte fra idé til afsted.';
    knap={ tekst:'Start her', aria:'Forbered tur', ikon:'bil', aktion:'startForberedelse()' };
    /* Underknappen LOGGER nu turen bagefter i stedet for at starte en hurtig
       forberedelse (KN 4/9). En spontan tur er per definition allerede kørt —
       den skal skrives ind, ikke planlægges. Bemærk: 'hurtig'-skærmen findes
       stadig og er stadig med i navigationstesten, men der er ingen vej ind
       til den fra appen længere. Skal den helt ud, er det en selvstændig
       oprydning (noteret i Arytmi-status.md). */
    ekstraForside = `<button class="spontan-link" onclick="logSpontanModal()">${ik('gnist')} Log spontan tur</button>`;
  }

  // Rund hovedknap til fuldskærms-forsiden — med pulserende hjerteslag-ringe.
  // Ved turens to store greb (start / gør klar) står pulsen fra logoet i cirklen.
  // Bilen stod her før, men den står allerede i landskabet lige ved siden af.
  const visPuls = knap.ikon === 'bil';
  // Startknappen bærer selv sit ord — pulsen ovenover, "Start" nedenunder, inde i
  // cirklen. De øvrige greb har for lange labels til at kunne stå derinde.
  const ordIKnappen = knap.tekst === 'Start her';
  const rundKnap = `
    <div class="rund-start">
      <button class="rund-knap${ordIKnappen?' med-ord':''}" onclick="${knap.aktion}" aria-label="${knap.aria || knap.tekst}">
        <span class="rk-ring"></span>
        ${knap.ring!==undefined?`<svg class="rk-bue" viewBox="0 0 120 120"><circle class="rk-spor" cx="60" cy="60" r="55"/><circle class="rk-fyld" cx="60" cy="60" r="55" pathLength="100" style="stroke-dashoffset:${100-knap.ring}"/></svg>`:''}
        ${visPuls ? pulsIKnap() : ik(knap.ikon)}
        ${ordIKnappen?`<span class="rk-ord">${knap.tekst}</span>`:''}
      </button>
      ${ordIKnappen?'':`<div class="rk-label${knap.forklaring?' sætning':''}">${knap.forklaring || knap.tekst}</div>`}
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
  gem(); nulstilHistorik(); gåTil('turdato');
}
/* =============================================================
   FORBEREDELSEN — fire trin før kortet: hvornår · hvorfra ·
   hvor langt · hvad vil I opleve. Ét flow, uanset om man trykker
   Start eller den spontane knap.
   ============================================================= */
const RADIUS_TEKST = ['Under 30 min','30–60 min','1–2 timer','Mere end 4 timer'];
/* Køretid → fugleflugt. Landevejsfart ca. 65 km/t, og vejen er sjældent lige —
   derfor ca. 80 % af den kørte afstand. Bruges til cirklen på kortet.
   Sidste trin hedder "Mere end 4 timer" (KN 4/9), men radius bliver på 200 km:
   200 km fugleflugt fra et hvilket som helst punkt i Danmark rammer allerede
   hele landet, så et større tal ville ikke give ét sted mere at vælge imellem. */
const RADIUS_KM = [25, 50, 100, 200];
function turTilbage(trin){
  tilbage(['hjem','turdato','hvorfra','hvorlangt'][trin] || 'hjem');
}
/* Fælles trin-top: etiket, prikker, spørgsmål */
function wizardTop(trin, spm, under){
  const prikker = [0,1,2,3].map(i=>`<span class="wiz-prik ${i===trin?'aktiv':''} ${i<trin?'klaret':''}"></span>`).join('');
  return `<div class="wizard-top">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
      <button class="tilbage" onclick="turTilbage(${trin})">${ik('tilbage')}</button>
      <div class="wiz-etiket">Planlæg turen · trin ${trin+1} af 4</div>
    </div>
    <div class="wiz-prik-række">${prikker}</div>
    <h1 class="wiz-spm">${spm}</h1>
    ${under?`<p class="wiz-under">${under}</p>`:''}
  </div>`;
}
function wizardBund(label, aktion, aktiv){
  return `<div style="margin-top:24px">
    <button class="knap primær bred" ${aktiv?`onclick="${aktion}"`:'disabled'}>${label} ${ik('pil')}</button>
  </div>`;
}
/* Den stille række nederst på en side: handlinger, man sjældent bruger, og som
   ikke skal konkurrere med Tilbage/Næste. Ét sted, så de ser ens ud overalt
   (31/8 — før stod den samme knap som "kontur lille" fire forskellige steder
   med tre forskellige bredder). */
function annullérLinje(){
  return `<div class="stille-række" style="margin-top:14px">
    <button class="knap stille fare" onclick="annullerForberedelse()">Annullér turen</button>
  </div>`;
}

/* Trin 1 — hvornår */
function datoFelter(){
  const f = s.forberedelse;
  const seg = (v,tekst)=>`<button class="seg-knap ${f.retur===v?'valgt':''}" style="flex-direction:row;padding:12px 8px" onclick="sætRetur('${v}')"><span>${tekst}</span></button>`;
  return `<div class="kort">
    <label class="felt-etiket" style="margin-top:0">Afgangsdato</label>
    ${datoSelects('afgang', f.dato, 'fremtid', 'sætAfgangDato')}
    <label class="felt-etiket">Ca. hvornår kører I? <span class="dæmpet" style="font-weight:400">(valgfrit)</span></label>
    <input type="time" step="900" style="width:100%" value="${f.afgangstid||''}"
           onchange="sætTid('afgangstid', this.value)">
    <div style="border-top:1px solid var(--linje);margin:20px 0 4px"></div>
    <label class="felt-etiket">Hjem igen? <span class="dæmpet" style="font-weight:400">(valgfrit)</span></label>
    <div class="seg-valg">${seg('samme','Samme dag')}${seg('næste','Dagen efter')}${seg('dato','Vælg dato')}</div>
    ${f.retur==='dato'?`<div style="margin-top:10px">${datoSelects('retur', f.returDato, 'fremtid', 'sætReturDato')}</div>`:''}
    <label class="felt-etiket">Ca. hvornår er I hjemme? <span class="dæmpet" style="font-weight:400">(valgfrit)</span></label>
    <input type="time" step="900" style="width:100%" value="${f.returtid||''}"
           onchange="sætTid('returtid', this.value)">
  </div>`;
  /* Hjemkomst-TIDSPUNKTET står bevidst IKKE her (KN 26/7: "fjern ur funktionen"
     — Dato-trinnet skal kun handle om datoer). Det spørges der om på
     tidsplan-skærmen, hvor det er motiveret: dér kan man se, at svaret er
     forskellen på, om frokosten dagen efter er jeres eller hjemme i køkkenet.
     "Samme dag"/"Dagen efter" (KN 4/9) er relativt til AFGANGSDATOEN, ikke til
     den rigtige kalenderdato. Valgene hed "I dag"/"I morgen" fra 24/8, og de ord
     var kun sande, hvis man kørte i dag — ved en afgang om tre uger løj de.
     sætRetur() og alt der læser f.retur ('samme'/'næste'/'dato') er urørt; det
     er kun ordlyden, der er skiftet. */
}
function sætRetur(v){ s.forberedelse.retur=v; gem(); tegn(); }
/* Ingen tegn() her: feltet er lige blevet forladt, og en gentegning ville
   rykke rundt under fingeren på vej videre. Turplanen henter selv den nye
   værdi, næste gang den tegnes. */
function sætTid(felt, v){ s.forberedelse[felt] = v || null; gem(); }
function sætAfgangDato(){ s.forberedelse.dato = datoLæs('afgang'); gem(); tegn(); }
function sætReturDato(){ s.forberedelse.returDato = datoLæs('retur'); gem(); tegn(); }
function skærmTurDato(){
  const f = s.forberedelse;
  if(!f){ gåTil('hjem'); return; }
  $('indhold').innerHTML = `<div class="side anim">
    ${wizardTop(0,'Hvornår vil I afsted?','Datoen først — så ved vi, hvornår solen går ned det sted, I vælger til sidst.')}
    ${datoFelter()}
    ${wizardBund('Videre',"gåTil('hvorfra')", !!f.dato)}
    ${annullérLinje()}
  </div>`;
}

/* Trin 2 — hvorfra */
function skærmHvorfra(){
  const f = s.forberedelse;
  if(!f){ gåTil('hjem'); return; }
  $('indhold').innerHTML = `<div class="side anim">
    ${wizardTop(1,'Hvor starter I fra?','Vi bruger jeres startpunkt til at måle, hvor langt der er til hvert sted.')}
    <div class="kort">
      <!-- kontur, ikke primær (31/8): skærmens ene rigtige greb er "Videre"
           nederst. Det her er en genvej til at udfylde feltet. -->
      <button class="knap kontur bred" onclick="startGPS()">${ik('gps')} Brug min placering</button>
      <p class="dæmpet" style="text-align:center;font-size:12.5px;margin:12px 0">— eller vælg en anden adresse —</p>
      <div style="display:flex;gap:10px">
        <input type="text" id="spAdr" placeholder="Søg by eller adresse …" value="${esc(f.startSøg||'')}" onkeydown="if(event.key==='Enter')startAdresse()">
        <button class="knap kontur lille" onclick="startAdresse()">Vælg</button>
      </div>
      ${f.startNavn?`<div class="sted-chips" style="margin-top:14px"><span class="sted-chip valgt">${ik('nål')} ${esc(f.startNavn)}</span></div>`:''}
    </div>
    ${wizardBund('Videre',"gåTil('hvorlangt')", !!f.startNavn)}
    ${annullérLinje()}
  </div>`;
}
function startGPS(){
  const sæt = (navn,xy)=>{ s.forberedelse.startNavn=navn; s.forberedelse.startXY=xy; gem(); tegn(); flash(navn+' sat som startpunkt.','gps'); };
  if(!navigator.geolocation){ sæt('Din placering (demo — Aarhus)', {x:92,y:120}); return; }
  flash('Finder din placering …','gps');
  navigator.geolocation.getCurrentPosition(pos=>{
    const xy = geoTilXY(pos.coords.latitude, pos.coords.longitude);
    sæt('Din placering', {x:Math.round(xy.x), y:Math.round(xy.y)});
  }, ()=>sæt('Din placering (demo — Aarhus)', {x:92,y:120}), {timeout:6000});
}
function startAdresse(){
  const q = ($('spAdr').value||'').trim(); s.forberedelse.startSøg=q;
  if(!q){ gem(); return; }
  const hit = BYER.find(b=>b.n.toLowerCase().startsWith(q.toLowerCase())) || BYER.find(b=>b.n.toLowerCase().includes(q.toLowerCase()));
  if(hit){ s.forberedelse.startNavn=hit.n; s.forberedelse.startXY={x:hit.x,y:hit.y}; gem(); tegn(); }
  else flash('Byen er ikke i prototypens liste endnu — brug din placering i stedet.');
}

/* Trin 3 — hvor langt */
function skærmHvorLangt(){
  const f = s.forberedelse;
  if(!f){ gåTil('hjem'); return; }
  $('indhold').innerHTML = `<div class="side anim">
    ${wizardTop(2,'Hvor langt vil I køre?','Hvor langt har I lyst til at køre for at komme væk?')}
    <div class="kort">
      <div class="radius-vis">
        <div class="radius-tal">${RADIUS_TEKST[f.radius]}</div>
        <div class="radius-under">kørsel fra ${esc(f.startNavn||'jeres startpunkt')}</div>
      </div>
      <input type="range" class="radius" min="0" max="3" step="1" value="${f.radius}" oninput="s.forberedelse.radius=+this.value;gem();opdaterRadius(this.value)">
      <div class="radius-mærker"><span>30 min</span><span>1 t</span><span>2 t</span><span>4 t+</span></div>
    </div>
    ${wizardBund('Videre',"gåTil('onsker')", true)}
    ${annullérLinje()}
  </div>`;
}
function opdaterRadius(v){ const el = document.querySelector('.radius-tal'); if(el) el.textContent = RADIUS_TEKST[+v]; }

/* Trin 4 — hvad vil I opleve. Herfra går man videre til kortet. */
function skærmØnsker(){
  const f = s.forberedelse;
  if(!f){ gåTil('hjem'); return; }
  const o = f.oplevelser;
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
    ${seg('natur', {titel:'Vand',v:'vand',ik:'vand'}, {titel:'Land',v:'land',ik:'skov'})}
    ${seg('stemning', {titel:'Isoleret',v:'isoleret',ik:'måne'}, {titel:'Livligt',v:'livligt',ik:'folk'})}
    <button class="knap kontur bred" style="margin-top:8px" onclick="overrasker()">${ik('gnist')} Eller overrask mig</button>
    ${wizardBund('Se tre steder til jer',"gåTil('forslag')", !!alle)}
    ${annullérLinje()}
  </div>`;
}
function sætØnske(gruppe,v){ s.forberedelse.oplevelser[gruppe]=v; gem(); tegn(); }
function overrasker(){
  const r = a => a[Math.floor(Math.random()*a.length)];
  s.forberedelse.oplevelser = { lys:r(['solopgang','solnedgang']), natur:r(['vand','land']), stemning:r(['isoleret','livligt']) };
  gem(); gåTil('forslag');
}

/* =============================================================
   TRE STEDER — resultatet af de fire trin. Ingen opfundne steder:
   vi rangerer vores egne testede destinationer efter radius,
   ønsker og afstand og viser de tre bedste. Man kan trykke ind på
   hver enkelt, læse det praktiske, og først dér vælge.
   ============================================================= */
function forslagSteder(){
  const start = startGeo();
  const kmMax = start ? RADIUS_KM[(s.forberedelse.radius)|0] : null;
  return TESTEDE.map(t=>{
    const km = start ? Math.round(afstandKm(start, testetGeo(t))) : null;
    const m = ønskeMatch(t);
    return { t, km, match:m, indenfor: km==null || km<=kmMax };
  }).sort((a,b)=>{
    /* Steder inden for radius kommer altid først, og dér afgør ønskerne.
       Skal vi ud over radius for at fylde tre pladser op, er det den
       korteste vej der tæller — ellers foreslår vi 126 km, fordi et sted
       på papiret rammer tre ønsker. */
    if(a.indenfor !== b.indenfor) return b.indenfor - a.indenfor;
    if(!a.indenfor) return (a.km||0) - (b.km||0);
    return ((b.match?b.match.træf:0)-(a.match?a.match.træf:0))
        || (b.t.klar-a.t.klar)
        || ((a.km||0)-(b.km||0));
  }).slice(0,3);
}
/* Ét sted som stående fotokort (OD 13/8). Formatet er bevidst 3:4: næsten alle
   vores billeder er taget stående med en telefon, og det er netop det, der viser,
   at nogen har stået der. Kortet er IKKE .res-kort — den bruges også af
   invitationen, biltype-valget og "steder i nærheden", og skulle ikke rives med.

   To steder (t1, t6) har ingen billeder endnu. De får landskabets egen aftenhimmel
   i stedet, så rækken beholder sin rytme og hullet er ærligt i stedet for tomt. */
/* Kort form af toiletfeltet til datastriben (14/8). Feltet er skrevet som en
   hel sætning til destinationssiden ("Offentligt toilet ved slusen, 600 m
   (åbent hele døgnet)") og kan ikke stå på et kort. Her trækkes afstanden ud,
   hvis den står der — ellers bliver det ja/nej. Vi opfinder ingenting: er
   feltet tomt, siger vi ikke "intet toilet", vi siger ingenting. */
function toiletKort(v){
  if(!v) return null;
  if(/^\s*(nej|intet|ingen)/i.test(v)) return 'intet toilet';
  const m = v.match(/(\d[\d.,]*)\s*(km|m)\b/i);
  return m ? `toilet <b>${m[1]}</b> ${m[2].toLowerCase()}` : 'toilet';
}
function stedKort(r, først){
  const t = r.t;
  const foto = (t.billeder && t.billeder.length) ? t.billeder[0] : null;
  /* Datastriben (14/8). Før stod her "ca. 21 km · 3 af 3 ønsker" — og da alle
     tre forslag som regel rammer alle tre ønsker, fortalte den halvdel intet.
     Nu hårde tal, og KUN dem vi faktisk har: et felt, der ikke er udfyldt,
     udelades. En kortere stribe er bedre end en stribe med huller i. */
  const fakta = [];
  if(r.km!=null){
    fakta.push(`<b>${r.km}</b> km`);
    fakta.push(esc(køretid(r.km)));
  }
  if(t.underlag) fakta.push(esc(t.underlag));
  const wc = toiletKort(t.faciliteter && t.faciliteter.toilet);
  if(wc) fakta.push(wc);
  const stribe = fakta.length
    ? `<span class="sk-fakta">${fakta.join(' <i>·</i> ')}</span>` : '';
  /* Ligger stedet uden for den valgte radius, skal det stadig siges — det er
     grunden til, at det ellers billige kort pludselig er en time væk. */
  const udenfor = (r.km!=null && !r.indenfor)
    ? '<span class="sk-meta">Længere væk, end I valgte</span>' : '';
  return `
    <button class="sted-kort${foto?'':' uden-foto'}" onclick="åbnTestet('${t.id}','forslag')">
      ${foto
        ? `<img class="sk-foto" src="${foto}" alt="" width="1050" height="1400"
             ${først?'loading="eager" fetchpriority="high"':'loading="lazy"'} decoding="async">`
        : `<span class="sk-vandmærke">${ik('stjerne')}</span>`}
      <span class="sk-mærke${t.klar?'':' måske'}">${t.klar?'★ Testet af Arytmi':'Måske'}</span>
      <span class="sk-tekst">
        ${t.ord?`<span class="sk-ord">${esc(t.ord)}</span>`:''}
        <span class="sk-navn">${esc(t.navn)}</span>
        ${udenfor}
        ${foto?'':'<span class="sk-meta">Billeder er på vej</span>'}
        ${stribe}
      </span>
    </button>`;
}
function skærmForslag(){
  const f = s.forberedelse;
  if(!f){ gåTil('hjem'); return; }
  const res = forslagSteder();
  const udenfor = res.filter(r=>!r.indenfor).length;
  $('indhold').innerHTML = `<div class="side anim">
    ${skærmTop('Tre steder til jer','onsker','Ud fra jeres svar')}
    ${valgChips()}
    <p class="dæmpet" style="margin:0 0 14px">Træk til siden for at se dem alle. Tryk ind på et sted og læs, hvor I finder toilet, aftensmad og morgenkaffe.</p>
    <div class="sted-række">
      ${res.map((r,i)=>stedKort(r, i===0)).join('')}
    </div>
    ${udenfor?`<p class="dæmpet" style="font-size:12.5px;margin-top:4px">Vi har kun ${res.length-udenfor} testet sted inden for jeres radius lige nu — de øvrige ligger længere væk, men er taget med.</p>`:''}
    <div style="text-align:center;margin-top:18px">
      <button class="knap kontur lille" onclick="gåTil('destination')">${ik('nål')} Ingen af dem? Se hele kortet</button>
    </div>
    ${annullérLinje()}
  </div>`;
}
/* "God tur"- og "Velkommen hjem"-siderne er slettet (OD 31/8) — de var to
   fuldskærms-tilstande, der ikke gjorde andet end at vente. Turen bliver
   liggende i Dine arytmer, indtil man selv gemmer den.

   Af sted er derfor heller ikke en tilstand længere: turen er klar, når den er
   pakket. Knapperne, der før kaldte afSted(), fører nu bare til Dine arytmer. */
function tilAfsted(){ nulstilHistorik(); gåTil('log'); }
/* Turene logges SELV (KN 4/9). Knappen "Vil du gemme din tur" er væk fra de
   kommende ture: den bad om et tryk for noget, appen godt selv kunne se var
   sket. Er turens sidste dag passeret, flytter den herfra og ned under
   Afholdte ture — anmeldelsen kan man så tage bagefter, hvis man vil.

   Tomme kladder med en passeret dato bliver slettet i stedet for logget. En
   kladde, hvor der aldrig blev valgt noget, er ikke en tur, man har været på. */
function turSlutDato(a){
  if(!a.dato) return null;
  if(a.retur === 'dato' && a.returDato) return a.returDato;
  if(a.retur === 'næste'){
    const d = new Date(a.dato + 'T12:00:00');
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0,10);
  }
  return a.dato;
}
function logAfholdteTure(){
  const iDag = new Date().toISOString().slice(0,10);
  let ændret = false;
  s.arytmer.slice().forEach(a => {
    const slut = turSlutDato(a);
    if(!slut || slut >= iDag) return;
    if(!tomKladde(a)){
      s.ture.unshift({
        sted: a.destination ? a.destination.navn : 'Jeres sted',
        dato: a.dato, score: null, kommentar: '', minde: '', plan: turSnapshot(a)
      });
    }
    sletTur(a.id);
    ændret = true;
  });
  if(ændret) gem();
}

/* =============================================================
   SPONTAN ARYTME — den hurtige vej for dem, der har prøvet det før.
   Ingen fire trin, intet kort: dato og tid sættes til i dag kl. 15,
   og man får kun huskelisten, så intet bliver glemt. Turen lander
   i loggen som en hvilken som helst anden arytme.
   ============================================================= */
function startSpontan(){
  s.forberedelse = nyForberedelse({ spontan:true });
  gem(); nulstilHistorik(); gåTil('hurtig');
}
function hurtigListe(){
  const f = s.forberedelse;
  const pakke = f.pakkeTjek.length;
  const pakkeAlle = pakkePunkter().length;
  return [
    { navn:'Bilen',       under: bilenKlar(f) ? 'Klar' : 'Vælg bil og gå udstyret igennem',               klar: bilenKlar(f),          mål:'bilen' },
    { navn:'Pakkeliste',  under:`${pakke} af ${pakkeAlle} klaret — de personlige ting`,                    klar:pakke>=pakkeAlle,       mål:'pakke' },
    { navn:'Mad og drikke', under: forplejningKlar()? 'Planlagt' : 'Så I ikke skal handle på vejen', klar:forplejningKlar(), mål:'mad' }
  ];
}
function skærmHurtig(){
  const f = s.forberedelse;
  if(!f){ gåTil('hjem'); return; }
  const items = hurtigListe();
  const mangler = items.filter(i=>!i.klar).length;
  $('indhold').innerHTML = `<div class="side anim">
    <div class="skærm-top">
      <button class="tilbage" onclick="tilbage('hjem')">${ik('tilbage')}</button>
      <div><div class="etiket">Spontan arytme</div>
        <h1 style="font-size:22px">Kom afsted nu</h1></div>
    </div>
    <p class="dæmpet" style="margin-bottom:14px">Ingen planlægning — bare huskelisten, så I ikke står uden dyner ved vandet.
      ${mangler? `Der er <b style="color:var(--gran)">${mangler}</b> ting tilbage.` : 'Alt er klaret. I kan køre.'}</p>
    <div class="kort" style="padding:14px 16px">
      <div class="etiket">Afgang</div>
      <div style="display:flex;gap:10px;margin-top:8px">
        <input type="date" style="flex:1" value="${f.dato||''}" onchange="s.forberedelse.dato=this.value||null;gem();tegn()">
        <input type="time" step="900" style="flex:1" value="${f.afgangstid||''}" onchange="s.forberedelse.afgangstid=this.value;gem()">
      </div>
      <p class="dæmpet" style="font-size:12.5px;margin-top:8px">Sat til i dag. Skal I et bestemt sted hen, kan I stadig
        <button class="som-link" onclick="gåTil('destination')">vælge en destination</button>.</p>
      ${f.destination?`<div class="sted-chips" style="margin-top:10px"><span class="sted-chip valgt">${ik('nål')} ${esc(f.destination.navn)}</span></div>`:''}
    </div>
    <div class="sektion"><h3>Huskeliste</h3></div>
    ${items.map(i=>`
      <button class="tjek-punkt ${i.klar?'klar':''}" onclick="gåTil('${i.mål}')">
        <span class="tjek-boks">${ik('tjek')}</span>
        <span class="tjek-krop"><span class="tjek-navn">${i.navn}</span><span class="tjek-under">${i.under}</span></span>
        <span class="tjek-pil">${ik('pil')}</span>
      </button>`).join('')}
    <button class="knap primær bred ånde" style="margin-top:20px" onclick="tilAfsted()">${ik('bil')} Af sted nu</button>
    ${annullérLinje()}
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
/* Planlægger man sammen, giver det ikke mening at gøre resten klar, før
   rejsemakkeren har bekræftet datoen — først da er planen fælles. Gave og
   solo-ture skal derimod kunne forberedes fra start, så låsen gælder kun 'sammen'. */
function afventerFællesPlan(f){ return f.invType==='sammen' && f.invStatus!=='bekræftet'; }
/* Turen planlægges som en gave, der endnu ikke er sendt. */
function gaveKladde(f){ return !!(f && f.invType==='gave' && f.invStatus!=='sendt' && f.invModtager); }
/* Fra pakkelisten tilbage til invitationen — med mailen fremme, klar til at
   rette og sende. */
function tilInvitationMedMail(){
  const f = s.forberedelse;
  f.invVisMail = true; gem();
  tilbageTil('invitation');
}
/* Planlægningen er slut for de veje, der ikke sender en overraskelse.
   Forsiden skifter til de tre punkter om at komme afsted. */
function planenErKlar(){
  const f = s.forberedelse;
  f.planlagt = true; gem();
  /* Sidste punkt planlagt → turen lægger sig i Dine arytmer, hvor den kan
     vælges igen (OD 31/8). Før landede man på overblikket for den ene tur. */
  nulstilHistorik(); gåTil('log');
  infoModal('Turen er planlagt. Den ligger nu under Dine arytmer.', 'Godt');
}
function venterPåBekræftelse(){
  const f = s.forberedelse;
  flash('I skal først blive enige om datoen med '+(f.invModtager||'rejsemakkeren')+'.', 'lås');
}
function tjeklisteData(){
  const f = s.forberedelse;
  const låst = afventerFællesPlan(f);
  const låstAktion = "venterPåBekræftelse()";
  return [
    { navn:'Dato',          under: f.dato?pænDato(f.dato):'Vælg afrejsedato',      klar:!!f.dato,        aktion:"gåTil('turdato')" },
    /* Mangler stedet endnu, sender vi tilbage til de tre forslag —
       men kun hvis ønskerne er svaret på, ellers giver listen ingen mening */
    { navn:'Destination',   under: f.destination?esc(f.destination.navn):'Find et sted', klar:!!f.destination,
      aktion: (!f.destination && f.oplevelser && f.oplevelser.lys && f.oplevelser.natur && f.oplevelser.stemning)
        ? "gåTil('forslag')" : "gåTil('destination')" },
    /* Invitation er fjernet herfra (OD 13/8) — den ligger nu som en rund knap
       i bunden af overblikket. Den var et krav, der stod i vejen; nu er den
       et tilbud, man tager, når man har lyst. */
    /* "Planlagt" frem for "3 valgt" (OD 30/8) — tallet fortalte ingenting om,
       hvor langt man var, kun hvor mange gange man havde trykket. */
    { navn:'Forplejning',   under: låst?'Låst indtil invitationen er bekræftet':(forplejningKlar()?'Planlagt':'Snacks, drikkevarer og det, der skal til for at nyde det'), klar: forplejningKlar(), aktion: låst?låstAktion:"gåTil('mad')", låst, plan:true },
    { navn:'Bil',           under: låst?'Låst indtil invitationen er bekræftet':(bilenKlar(f)?'Planlagt':'Strøm, sengetøj og udstyr'), klar: bilenKlar(f), aktion: låst?låstAktion:"gåTil('bilen')", låst, plan:true },
    { navn:'Personligt',    under: låst?'Låst indtil invitationen er bekræftet':'De personlige ting', klar: f.pakkeTjek.length>=pakkePunkter().length, aktion: låst?låstAktion:"gåTil('pakke')", låst, plan:true }
  ];
}
/* De tre planlægningspunkter er klaret — så skal de ikke blive ved med at
   fylde som tre grønne rækker. De erstattes af den liste, de tilsammen har
   produceret (OD 13/8). */
function planTrinKlaret(){
  return tjeklisteData().filter(i=>i.plan).every(i=>i.klar);
}
/* =============================================================
   EFTER PLANLÆGNINGEN — forsiden skifter fra "hvad mangler vi" til
   "sådan kommer vi afsted". Tre punkter i stedet for seks (OD 11/8).
   ============================================================= */
function turPlanlagt(){ const f = s.forberedelse; return !!(f && f.planlagt); }
/* Det der skal PAKKES: de personlige ting (inkl. dem man selv har skrevet),
   udstyret man har lagt på huskelisten under Bilen, og grejet fra
   Forplejningen. Strøm hører ikke til her — den kan først laves på dagen. */
/* Pakkelisten i TO niveauer (OD 30/8). Før var det én lang klump; nu er der
   tre sektioner, man folder ud én ad gangen, med en underliste pr. slags ting:

     Bil          → Til bilen
     Personligt   → Personligt · Hund · Hygge
     Forplejning  → Madudstyr · Handleliste

   Id-præfikserne (p- b- ms- mo- s-) er UÆNDREDE fra før omlægningen, så
   afkrydsninger på igangværende ture overlever. */
function bilPunkt(id){
  for(const g of BILEN_GRUPPER){
    const p = g.punkter.find(x=>x.id===id);
    if(p) return { p, gruppe:g.id };
  }
  /* Hygge-punkter man selv har skrevet står ikke i BILEN_GRUPPER. Uden dette
     opslag forsvandt de lydløst på vej til pakkelisten. */
  const e = egne('hygge').find(p=>p.id===id);
  return e ? { p:e, gruppe:'hygge' } : null;
}
function pakkeSektioner(){
  const f = s.forberedelse; if(!f) return [];
  const huske = (f.bilHuske||[]).map(bilPunkt).filter(Boolean);
  const bilRk = h => ({ id:'b-'+h.p.id, tekst:h.p.navn || h.p.tekst });
  const tilBilen = huske.filter(h=>h.gruppe!=='hygge' && h.p.id!=='strøm').map(bilRk);
  /* "Lad bilen op" hører til bilen, men kan først gøres på dagen — derfor
     står den først i listen og med sin egen tekst. */
  if((f.bilHuske||[]).includes('strøm')) tilBilen.unshift({ id:'s-strøm', tekst:'Lad bilen op' });

  const personligt = [...PAKKE_PUNKTER, ...egne('pakke')].map(p=>({ id:'p-'+p.id, tekst:p.tekst }));
  const hund = hundMed() ? [...HUND_PUNKTER, ...egne('hund')].map(p=>({ id:'p-'+p.id, tekst:p.tekst })) : [];
  const hygge = huske.filter(h=>h.gruppe==='hygge').map(bilRk);

  const madudstyr = [
    ...madScenarieUdstyr().map(p=>({ id:'ms-'+p.id, tekst:p.tekst })),
    ...morgenUdstyr().map(p=>({ id:'mo-'+p.id, tekst:p.tekst }))
  ];
  /* Handlelisten er det, der SKAL KØBES: madscenariet, snacks og drikkevarer —
     plus de punkter i et scenaries "Det skal I bruge", der er mad og ikke grej
     (mærket handle:true, fx tapasretter, dip og brød, OD 31/8). */
  const handleliste = [
    ...valgtForplejning().map(p=>({ id:'s-'+p.id, tekst:p.tekst })),
    ...madScenarieMad().map(p=>({ id:'ms-'+p.id, tekst:p.tekst }))
  ];

  /* SEKS lister i stedet for tre sektioner med underlister (OD 31/8): hund og
     hygge skal ikke ligge under Personligt, og handlelisten ikke under
     madudstyret. Hver liste er nu sin egen foldning med sin egen overskrift.

     Punkternes id-præfikser (b-, p-, ms-, mo-, s-) er UÆNDREDE, så ture, der
     er i gang, beholder deres afkrydsninger. Kun grupperingen er flyttet.
     Nøglerne i åbnePakkeSektioner skifter, men det er ren visningstilstand.

     Navnene: OD har navngivet tre af listerne. "Alt det lækre I skal dele" er
     flyttet fra madudstyret til HANDLELISTEN (KN 31/8) — det er dér maden og
     drikkevarerne ligger; madudstyret er pizzaskærer og termokande. Madudstyret
     hedder nu "Køkkenet I tager med", som holder samme tone som OD's tre.
     Hund og Hygge står med foreløbige navne og venter på hendes. */
  const sektioner = [
    { id:'bil',         navn:'Det praktiske til bilen',      lister:[
      { id:'til-bilen',   navn:'Det praktiske til bilen',      punkter:tilBilen } ]},
    { id:'personligt',  navn:'Det uundværlige til jer selv',  lister:[
      { id:'personligt',  navn:'Det uundværlige til jer selv', punkter:personligt } ]},
    { id:'hund',        navn:'Hund',                          lister:[
      { id:'hund',        navn:'Hund',                         punkter:hund } ]},
    { id:'hygge',       navn:'Hygge',                         lister:[
      { id:'hygge',       navn:'Hygge',                        punkter:hygge } ]},
    { id:'madudstyr',   navn:'Køkkenet I tager med',          lister:[
      { id:'madudstyr',   navn:'Køkkenet I tager med',         punkter:madudstyr } ]},
    { id:'handleliste', navn:'Alt det lækre I skal dele',      lister:[
      { id:'handleliste', navn:'Alt det lækre I skal dele', under:'Købes tæt på afgangsdagen/på dagen', punkter:handleliste } ]}
  ];
  // Tomme lister og tomme sektioner vises ikke — de ville kun være støj.
  return sektioner
    .map(sek=>({ ...sek, lister:sek.lister.filter(l=>l.punkter.length) }))
    .filter(sek=>sek.lister.length);
}
function pakkeListe(){
  return pakkeSektioner().flatMap(sek=>sek.lister.flatMap(l=>l.punkter));
}
function klarKlaret(){
  const f = s.forberedelse; if(!f) return false;
  const l = pakkeListe();
  return l.length>0 && l.every(p=>(f.klarTjek||[]).includes(p.id));
}
function klarTjek(id){
  if(!s.forberedelse) return;
  const t = s.forberedelse.klarTjek || (s.forberedelse.klarTjek = []);
  const i = t.indexOf(id);
  const tilføjer = i<0;
  if(i>=0) t.splice(i,1); else t.push(id);
  gem();
  if(tilføjer) efterAfkrydsning(); else tegn();
}
/* Vælg/fjern hele en underliste på én gang (OD 30/8). */
function vælgAlle(sektionId, listeId){
  const f = s.forberedelse; if(!f) return;
  const sek = pakkeSektioner().find(x=>x.id===sektionId);
  const liste = sek && sek.lister.find(l=>l.id===listeId);
  if(!liste) return;
  const t = f.klarTjek || (f.klarTjek = []);
  const alleValgt = liste.punkter.every(p=>t.includes(p.id));
  if(alleValgt){
    const væk = new Set(liste.punkter.map(p=>p.id));
    f.klarTjek = t.filter(x=>!væk.has(x));
    gem(); tegn();
  } else {
    liste.punkter.forEach(p=>{ if(!t.includes(p.id)) t.push(p.id); });
    gem(); efterAfkrydsning();
  }
}
/* Er ALT pakket, er turen klar — så siger vi det og sender folk tilbage til
   overblikket. Må KUN kaldes fra en afkrydsning, aldrig fra render: ellers
   ryger man ud af skærmen, hver gang man åbner en færdig liste. */
/* Sidste emne på pakkelisten krydset af (OD 31/8): turen er klar, og man
   føres tilbage til Dine arytmer, hvor den nu har knappen "Vil du gemme din
   tur". Før landede man på overblikket for den ene tur — det gav ikke mening,
   når der kan ligge flere. */
function efterAfkrydsning(){
  if(klarKlaret()){
    nulstilHistorik(); gåTil('log');
    infoModal('Du er nu klar til at tage afsted.', 'Godt');
  } else tegn();
}
function klarPunkter(){
  return [
    { id:'klar-pakke',  navn:'Jeg er klar til at pakke', under:'Alt det, I har valgt undervejs', klar:klarKlaret() },
    { id:'turplan',     navn:'Se turplanen',             under:'Afgang, sted og hjemkomst', klar:false }
  ];
}
/* De tre faser en tur går igennem (OD 31/8: "generelt har vi 3 faser
   planlægning, klargøring og afsted" — listen skulle skifte farve, så man kan
   se, man er et nyt sted). Farverne er brandets egne og ligger langt fra
   hinanden i RGB, ikke bare i lyshed: oliven (95,99,83), kobber (176,121,78),
   bark (58,50,39). En forskel, man kan se på en telefon i sol. */
const TUR_FASER = [
  { id:'planlægning', navn:'Planlægning', farve:'#5F6353' },
  { id:'klargøring',  navn:'Klargøring',  farve:'#B0794E' },
  { id:'afsted',      navn:'Afsted',      farve:'#3A3227' }
];
function turFase(){
  if(!s.forberedelse) return TUR_FASER[0];
  if(klarKlaret()) return TUR_FASER[2];
  if(planTrinKlaret()) return TUR_FASER[1];
  return TUR_FASER[0];
}
function faseBånd(){
  const idx = TUR_FASER.indexOf(turFase());
  return `<div class="fase-bånd">
    ${TUR_FASER.map((fa,i)=>`<span class="fase-trin ${i===idx?'nu':i<idx?'klaret':''}" style="--f:${fa.farve}">${fa.navn}</span>`).join('')}
  </div>`;
}
/* Hvilke sektioner der står foldet ud. Ren visningstilstand — som
   åbneBilEmner: hverken gemt eller i historikken. Tom = alt foldet sammen,
   så man ikke mødes af en mur af punkter (OD 30/8). */
let åbnePakkeSektioner = {};
function pakkeFold(id){ åbnePakkeSektioner[id] = !åbnePakkeSektioner[id]; tegn(); }
function skærmKlarListe(){
  const f = s.forberedelse; if(!f){ gåTil('hjem'); return; }
  const sektioner = pakkeSektioner();
  const tjek = f.klarTjek || [];
  const alle = pakkeListe();
  const klaret = alle.filter(p=>tjek.includes(p.id)).length;
  const tælTekst = (punkter)=>{
    const n = punkter.filter(p=>tjek.includes(p.id)).length;
    return n===punkter.length ? 'Udført' : `${n} af ${punkter.length}`;
  };
  const række = p => `
    <div class="liste-punkt ${tjek.includes(p.id)?'strøget':''}" onclick="klarTjek('${p.id}')" style="cursor:pointer">
      <div class="tjekboks ${tjek.includes(p.id)?'markeret':''}"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div>
      <div class="navn">${esc(p.tekst)}</div>
    </div>`;
  /* Underlisterne ligger INDE i sektionens kort — derfor bare rækker, ingen
     ny .liste. Et kort i et kort giver dobbelt kant og skygge (samme grund
     som hunde-rubrikken på Personligt er bygget sådan). */
  const underliste = (sek, l) => {
    const sorteret = [...l.punkter.filter(p=>!tjek.includes(p.id)), ...l.punkter.filter(p=>tjek.includes(p.id))];
    const alleValgt = l.punkter.every(p=>tjek.includes(p.id));
    /* Har sektionen kun én liste, står navnet allerede i foldningens
       overskrift — så ville det stå to gange lige over hinanden. Tælleren
       står der også allerede. */
    const egenOverskrift = sek.lister.length > 1;
    return `
      ${egenOverskrift?`<div class="sektion" style="margin-top:14px"><h3>${esc(l.navn)}</h3><span class="tjek-tæl">${tælTekst(l.punkter)}</span></div>`:''}
      ${l.under?`<p class="dæmpet" style="margin:${egenOverskrift?'-4px':'10px'} 0 6px;font-size:13px">${esc(l.under)}</p>`:''}
      <div style="text-align:right;margin:0 0 2px">
        <button class="som-link" onclick="vælgAlle('${sek.id}','${l.id}')">${alleValgt?'Fjern alle':'Vælg alle'}</button>
      </div>
      ${sorteret.map(række).join('')}`;
  };
  $('indhold').innerHTML = `<div class="side anim">
    ${skærmTop('Jeg er klar til at pakke','hjem', alle.length?`${klaret} af ${alle.length}`:'')}
    ${faseBånd()}
    <div class="kort guide-brød"><p style="margin:0">Alt det, I har valgt undervejs — samlet ét sted. Fold ud, efterhånden som I er klar til at pakke.</p></div>
    ${sektioner.length ? sektioner.map(sek=>{
      const sekPunkter = sek.lister.flatMap(l=>l.punkter);
      const åben = !!åbnePakkeSektioner[sek.id];
      /* div, ikke button: navigationstesten samler kun <button> op, og en
         foldning er ikke en rute. */
      return `
        <div class="liste" style="margin-bottom:12px">
          <div class="liste-punkt bil-emne" onclick="pakkeFold('${sek.id}')" style="cursor:pointer">
            <div class="navn"><span class="pakke-titel">${esc(sek.navn)}</span>
              <div class="dæmpet" style="font-size:12.5px;margin-top:2px">${tælTekst(sekPunkter)}</div>
            </div>
            <span class="bil-pil ${åben?'åben':''}">${ik('pil')}</span>
          </div>
          ${åben?`<div class="bil-krop" style="padding-bottom:0;border-bottom:none">
            ${sek.lister.map(l=>underliste(sek,l)).join('')}
          </div>`:''}
        </div>`;
    }).join('')
    : `<div class="liste"><div class="liste-punkt"><div class="navn dæmpet">Der er ikke valgt noget til denne liste endnu.</div></div></div>`}
  </div>`;
}
/* nyArytmeLinje() er væk 31/8 — "Planlæg endnu en arytme" ligger nu i den
   stille række i side-fod sammen med Annullér turen. Vejen til tur nr. to er
   der stadig (OD: "også ved at gå til forsiden"), den konkurrerer bare ikke
   længere med skærmens rigtige greb. */
function skærmHjemKlar(){
  const f = s.forberedelse;
  const dage = dageTil(f.dato);
  const stort = dage===0 ? 'I dag' : dage===1 ? 'I morgen' : dage>1 ? dage : 'Snart';
  const items = klarPunkter();
  const altKlar = klarKlaret();
  $('indhold').innerHTML = `
  <div class="ned-hero">
    ${heroScene('klar', 420)}
    <div class="ned-lag">
      <div class="ned-top"><div class="h-logo">${logoSVG(true)}</div>${arytmiTæller()}</div>
      <div class="ned-label">${dage>1?'Nedtælling':'Snart afsted'}</div>
      <div class="ned-tal">${stort}</div>
      ${dage>1?`<div class="ned-label" style="margin-top:6px">dage til jeres tur</div>`:''}
      <div class="ned-sted">${ik('nål')}${esc(f.destination?f.destination.navn:'Vælg et sted')}</div>
      <div class="ned-dato">${pænDato(f.dato)}</div>
    </div>
  </div>
  <div class="tjek-blok">
    ${faseBånd()}
    <div class="tjek-overskrift"><h2>Turen er planlagt</h2></div>
    <p class="dæmpet" style="font-size:13px;margin:-6px 0 14px">Nu er der kun det praktiske tilbage.</p>
    ${items.map(it=>`
      <button class="tjek-punkt ${it.klar?'klar':''}" onclick="gåTil('${it.id}')">
        <span class="tjek-boks">${ik('tjek')}</span>
        <span class="tjek-krop"><span class="tjek-navn">${it.navn}</span><span class="tjek-under">${it.under}</span></span>
        <span class="tjek-pil">${ik('pil')}</span>
      </button>`).join('')}
    ${retPlanlægningKnap(true)}
    ${altKlar
      ? `<button class="knap primær bred ånde" style="margin-top:8px" onclick="tilAfsted()">Alt er klar — af sted ${ik('måne')}</button>`
      : `<p class="dæmpet" style="text-align:center;font-size:12.5px;margin-top:12px">Kryds listerne af, så bliver de grønne.</p>`}
    <div class="side-fod">
      <div class="stille-række">
        <button class="knap stille" onclick="nyArytme()">Planlæg endnu en arytme</button>
        <button class="knap stille fare" onclick="annullerForberedelse()">Annullér turen</button>
      </div>
    </div>
  </div>`;
}
function skærmHjemNedtælling(){
  if(turPlanlagt()) return skærmHjemKlar();
  const f = s.forberedelse;
  const dage = dageTil(f.dato);
  const items = tjeklisteData();
  const klaret = items.filter(i=>i.klar).length;
  const pct = Math.round(klaret/items.length*100);
  const stort = dage===0 ? 'I dag' : dage===1 ? 'I morgen' : dage>1 ? dage : 'Snart';
  /* I fase 1 er stedet det eneste, der er valgt. Så er den runde knap
     turplanen, ikke invitationen — og "Se hele turplanen" nedenunder ville
     være den samme knap to gange. */
  const fase1 = (f.fase||1) === 1;
  const punkt = it => `
      <button class="tjek-punkt ${it.klar?'klar':''} ${it.låst?'låst':''}" onclick="${it.aktion}">
        <span class="tjek-boks">${ik(it.låst?'lås':'tjek')}</span>
        <span class="tjek-krop"><span class="tjek-navn">${it.navn}</span><span class="tjek-under">${it.under}</span></span>
        <span class="tjek-pil">${ik(it.låst?'lås':'pil')}</span>
      </button>`;
  const grund = items.filter(i=>!i.plan);   // dato og destination
  const plan  = items.filter(i=>i.plan);    // forplejning, bil, personligt
  /* Er de tre planlægningspunkter klaret, viser vi resultatet i stedet for
     tre grønne rækker, der ikke længere har noget at sige (OD 13/8). */
  const planBlok = planTrinKlaret()
    ? pakkeOpsummering() + retPlanlægningKnap()
    : `<div class="plan-overskrift">
         <h3>${PLANLÆG_OVERSKRIFT}</h3>
         <p class="dæmpet" style="font-size:12.5px;margin-top:2px">Når de tre er på plads, samler appen selv pakkelisten.</p>
       </div>
       ${plan.map(punkt).join('')}`;
  $('indhold').innerHTML = `
  <div class="ned-hero">
    ${heroScene('klar', 420)}
    <div class="ned-lag">
      <div class="ned-top"><div class="h-logo">${logoSVG(true)}</div>${arytmiTæller()}</div>
      <div class="ned-label">${dage>1?'Nedtælling':'Snart afsted'}</div>
      <div class="ned-tal">${stort}</div>
      ${dage>1?`<div class="ned-label" style="margin-top:6px">dage til jeres tur</div>`:''}
      <div class="ned-sted">${ik('nål')}${esc(f.destination?f.destination.navn:'Vælg et sted')}</div>
      <div class="ned-dato">${pænDato(f.dato)}</div>
    </div>
  </div>
  <div class="tjek-blok">
    ${faseBånd()}
    <div class="tjek-overskrift"><h2>Jeres tjekliste</h2><span class="tjek-tæl">${klaret} af ${items.length}</span></div>
    <div class="tjek-bar"><div class="fyld" style="width:${pct}%"></div></div>
    ${grund.map(punkt).join('')}
    ${planBlok}
    <!-- OD's placering: "Gem tur" hører under de tre planlægningssektioner.
         Den er en stille knap, ikke en bred konturknap — den er en udvej, ikke
         skærmens greb. -->
    <div class="stille-række" style="margin-top:4px">
      <button class="knap stille" onclick="gemTilSenere()">Gem tur — planlæg detaljerne senere</button>
    </div>
    ${klaret===items.length
      ? `<button class="knap primær bred" style="margin-top:14px" onclick="tilAfsted()">Alt er klar — af sted ${ik('måne')}</button>`
      : `<p class="dæmpet" style="text-align:center;font-size:12.5px;margin-top:12px">Kryds resten af, så bliver hele listen grøn.</p>`}
    <!-- Invitationen er skjult i hele appen, indtil brugere er afklaret
         (OD 31/8, J1). inviterKnap() og skærmInvitation() står urørt i filen —
         de er bare ikke kaldt fra nogen skærm. -->
    ${fase1 ? foreløbigPlanKnap() : ''}
    <div class="side-fod">
      ${fase1 ? '' : `<button class="knap kontur bred" onclick="gåTil('turplan')">${ik('bog')} Se hele turplanen</button>`}
      <div class="stille-række">
        <button class="knap stille" onclick="nyArytme()">Planlæg endnu en arytme</button>
        <button class="knap stille fare" onclick="annullerForberedelse()">Annullér turen</button>
      </div>
    </div>
  </div>`;
}
/* Vejen tilbage i planlægningen (OD 31/8). Når de tre punkter er klaret, bliver
   rækkerne erstattet af pakkelisten — og så var der ingen vej ind og rette et
   madscenarie eller et stykke biludstyr igen. Den lander på første
   planlægningstrin, så man kan bladre videre derfra. */
function retPlanlægningKnap(bred){
  const mål = sektionListe(2)[0].id;
  return bred
    ? `<button class="knap kontur bred" style="margin-top:14px" onclick="gåTil('${mål}')">${ik('tilbage')} Ret i planlægningen</button>`
    : `<div class="stille-række" style="margin-top:2px"><button class="knap stille" onclick="gåTil('${mål}')">Ret i planlægningen</button></div>`;
}
/* Fase 1: invitationen er skjult, og den runde knap viser i stedet den
   foreløbige turplan (OD 31/8). At spørge om hvem der skal med, før stedet er
   faldet på plads, er præcis det trin, der blev fjernet 13/8, fordi det spærrede
   vejen. Rejsemakkeren hører til, når turen er en tur. */
function foreløbigPlanKnap(){
  return `<div class="inviter-blok">
    <button class="rund-knap inviter-rund" onclick="gåTil('turplan')"
            aria-label="Se den foreløbige turplan">
      ${ik('bog')}
    </button>
    <div class="inviter-tekst">Se den foreløbige turplan</div>
    <div class="inviter-under">Sådan ser turen ud indtil videre</div>
  </div>`;
}
/* Invitationen som rund knap i bunden af overblikket (OD 13/8) — samme form
   som startknappen på forsiden, så det læses som "det store greb her på siden"
   og ikke som endnu en række i en liste. Har man allerede valgt, står
   status under knappen i stedet for opfordringen. */
function inviterKnap(){
  const f = s.forberedelse;
  const valgt = !!f.invType;
  return `<div class="inviter-blok">
    <button class="rund-knap inviter-rund" onclick="gåTil('invitation')"
            aria-label="Inviter til denne arytme">
      ${ik(valgt ? (f.invType==='gave'?'gave':f.invType==='selv'?'puls':'folk') : 'folk')}
    </button>
    <div class="inviter-tekst">${valgt ? esc(invUnderTekst(f)) : 'Inviter til denne arytme'}</div>
    ${valgt?'':'<div class="inviter-under">Sammen, som gave — eller helt for dig selv</div>'}
  </div>`;
}
/* Når de tre planlægningspunkter er klaret, er det listen, de har lavet,
   der skal stå — ikke tre afkrydsede rækker. */
function pakkeOpsummering(){
  const liste = pakkeListe();
  const f = s.forberedelse;
  // klarTjek, ikke pakkeTjek — se kommentaren i turStatus()
  const pakket = liste.filter(p=>(f.klarTjek||[]).includes(p.id)).length;
  return `<div class="plan-overskrift">
      <h3>Jeres pakkeliste</h3>
      <p class="dæmpet" style="font-size:12.5px;margin-top:2px">Samlet af det, I valgte under forplejning, bil og personligt.</p>
    </div>
    <button class="tjek-punkt" onclick="gåTil('klar-pakke')">
      <span class="tjek-boks">${ik('tjek')}</span>
      <span class="tjek-krop">
        <span class="tjek-navn">${liste.length} ting at pakke</span>
        <span class="tjek-under">${pakket} krydset af · tryk for at se listen</span>
      </span>
      <span class="tjek-pil">${ik('pil')}</span>
    </button>`;
}
/* Samlet, rolig oversigt over turen: hvornår, hvorhen, med hvem, hjem igen.
   Forplejningen er væk herfra (OD 30/8) — den stod som en lang liste midt i
   en side, der ellers svarer på fire spørgsmål, og den findes allerede på
   pakkelisten. Til gengæld ligger "stedet er optaget"-udvejen nu her. */
function skærmTurplan(){
  const f = s.forberedelse;
  if(!f){ gåTil('hjem'); return; }
  const dest = f.destination;
  const dage = f.dato ? dageTil(f.dato) : null;
  const etiket = dage!=null ? (dage>1?dage+' dage til afgang':dage===1?'I morgen':dage===0?'I dag':'Turplan') : 'Turplan';
  const rad = (ikon, farve, navn, under, aktion) => `
    <div class="liste-punkt"${aktion?` onclick="${aktion}" style="cursor:pointer"`:''}>
      <span style="color:${farve};flex-shrink:0">${ik(ikon)}</span>
      <div class="navn" style="flex:1;font-size:14.5px">${navn}${under?`<div class="dæmpet" style="font-size:12px;margin-top:2px">${under}</div>`:''}</div>
      ${aktion?`<span style="color:#c9c2b0;flex-shrink:0">${ik('pil')}</span>`:''}
    </div>`;
  /* OD 11/8: turplanen skal kunne læses som ét svar på "hvornår, hvorhen, og
     hvornår er vi hjemme igen". Rejsemakker-rækken er ude 31/8 (J1) sammen med
     resten af invitationen — de to variabler, der beskrev den, er slettet med. */
  $('indhold').innerHTML = `<div class="side anim">
    ${skærmTop('Jeres turplan','hjem',etiket)}
    <div class="liste">
      ${rad('ur','var(--rav)','Afgang', f.dato ? pænDato(f.dato)+(f.afgangstid?' · ca. kl. '+f.afgangstid:'') : 'Dato ikke sat endnu', "gåTil('turdato')")}
      ${dest ? rad('nål','var(--rav)','Destination', esc(dest.navn), "gåTil('destination')")
             : rad('nål','var(--rav)','Destination','Ingen destination endnu',"gåTil('destination')")}
      ${rad('hjem','var(--rav)','Hjemkomst', turHjemkomstTekst(f)||'Ikke sat endnu', "gåTil('turdato')")}
    </div>
    ${planBSteder()}
  </div>`;
}
/* "Stedet er optaget eller ikke helt jer" — de nærmeste andre testede steder
   som en udvej. Lå før på selve destinationssiden, men dér havde man jo netop
   valgt stedet; her, på turplanen, er det først relevant (OD 30/8).
   Vises kun når man HAR valgt et af vores testede steder — ellers er der
   ingen at måle "i nærheden" fra. */
function planBSteder(){
  const f = s.forberedelse;
  const t = f && f.destination && f.destination.testetId
    ? TESTEDE.find(x=>x.id===f.destination.testetId) : null;
  if(!t) return '';
  const nær = stederINærheden(t);
  if(!nær.length) return '';
  return `
    <div class="sektion" style="margin-top:22px"><h3>${ik('nål')} Stedet er optaget eller ikke helt jer?</h3></div>
    <p class="dæmpet" style="margin:0 0 10px">De nærmeste andre testede steder — som en plan B.</p>
    ${nær.map(n=>`
      <button class="res-kort" onclick="åbnTestet('${n.t.id}','turplan')">
        <span class="res-ikon">${ik('stjerne')}</span>
        <span class="res-krop">
          <span class="res-navn">${esc(n.t.navn)}</span>
          <span class="res-meta">Ca. ${Math.round(n.km)} km herfra</span>
          <span class="res-mærke ${n.t.klar?'ægte':''}">${n.t.klar?'★ Testet af Arytmi':'Måske — vi tester igen'}</span>
        </span>
        <span class="tjek-pil">${ik('pil')}</span>
      </button>`).join('')}`;
}

/* =============================================================
   INVITATION — tre veje: planlæg sammen · giv som gave · for mig selv
   Alt det tværgående (gæstelogin, datoforhandling, den flotte
   invitation) er simuleret i prototypen og markeret som sådan.
   ============================================================= */
/* Navn/e-mail-felterne bruger kun gem() (ikke tegn()), så man ikke mister
   fokus midt i indtastningen. Det betyder "Se invitation"-knappen ikke
   automatisk opdaterer sin disabled-status — den sætter vi derfor direkte. */
function opdaterInvKnap(knapId){
  const f = s.forberedelse; if(!f) return;
  const knap = $(knapId); if(!knap) return;
  knap.disabled = !(f.invModtager && f.invEmail);
}
function invErKlar(f){
  if(f.invType==='selv')   return true;
  // sendt tæller som klaret: brugeren har gjort sit — svaret er rejsemakkerens
  if(f.invType==='sammen') return f.invStatus==='bekræftet' || f.invStatus==='sendt';
  if(f.invType==='gave')   return f.invStatus==='sendt' && f.gaveSvar!=='afslået';
  return false;
}
function invUnderTekst(f){
  if(!f.invType)         return 'Inviter til arytmen';
  if(f.invType==='selv') return 'Kun for dig selv';
  if(f.invType==='gave') return f.invStatus!=='sendt' ? 'Overraskelse — i det skjulte'
    : f.gaveSvar==='bekræftet' ? 'Bekræftet af '+(f.invModtager||'modtageren')
    : f.gaveSvar==='afslået'   ? 'Afvist — aftal en ny dato'
    : 'Overraskelse sendt — afventer svar';
  const navn = f.invModtager || 'din rejsemakker';
  if(f.invStatus==='bekræftet') return 'Bekræftet med '+navn;
  if(f.invStatus==='afslået')   return 'Afslået — inviter en anden';
  if(f.invStatus==='forhandler')return f.invForslagFra==='gæst' ? navn+' foreslog nye datoer' : 'Afventer '+navn;
  if(f.invStatus==='sendt')     return 'Afventer bekræftelse fra '+navn;
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

/* ---------- mail-skabelonerne ----------
   Teksterne er Kennets egne, ord for ord. De fyldes med turens data og
   lægges i et redigerbart felt: brugeren retter selv til og trykker send. */
function afsenderNavn(){ return (s.profil && s.profil.navn) || 'En ven'; }
function turDatoTekst(f){ return f.dato ? pænDato(f.dato) : '(dato ikke valgt endnu)'; }
function turStedTekst(f){ return f.destination ? f.destination.navn : '(destination ikke valgt endnu)'; }
/* Hjemkomst er en dato, ikke et klokkeslæt — udledt af trin 1's svar
   (samme dag / næste dag / anden dato). */
function turHjemkomstTekst(f){
  if(f.retur==='næste' && f.dato){
    const d = new Date(f.dato+'T12:00:00'); d.setDate(d.getDate()+1);
    return pænDato(d.toISOString().slice(0,10)) + returKl(f);
  }
  if(f.retur==='dato' && f.returDato) return pænDato(f.returDato) + returKl(f);
  if(f.dato) return pænDato(f.dato) + returKl(f);
  return '(dato ikke valgt endnu)';
}
function returKl(f){ return f.returtid ? ' · ca. kl. ' + f.returtid : ''; }

function mailSammen(f){
  const modt = f.invModtager || 'din rejsemakker';
  const afs  = afsenderNavn();
  return `Hej ${modt}

${afs} har inviteret dig til en arytme.

Dato: ${turDatoTekst(f)}
Hjemkomst: ${turHjemkomstTekst(f)}
Destination: ${turStedTekst(f)}

En arytme er en lille, bevidst forstyrrelse af hverdagens rytme.

Et døgn eller en aften, hvor bilen og naturen bliver jeres frirum. Hvor I kan trække stikket, komme ud i naturen og nyde tiden sammen – uden at det kræver ferie eller uger med planlægning.

${afs} har allerede taget det første skridt og vil gerne dele denne arytme med dig. Sammen gør I turen klar. Hvis du accepterer invitationen, hjælper Arytmi appen jer med at planlægge resten.

Appen hjælper jer med at fordele opgaverne og huske på alt det vigtigste, så I nemt kan få styr på:

• Mad og drikke
• Pakkelisten
• Klargøring af bilen

På den måde bruger I mindre tid på planlægning og mere tid på det, der betyder noget.

Vil du med?

[Bekræft invitation]

Hvis datoen ikke passer, kan du foreslå en ny, som ${afs} kan tage stilling til. Tryk her for at foreslå en ny dato i appen.

Når invitationen er bekræftet, sender vi dig en ny mail med gratis link til Arytmi-appen og dine personlige loginoplysninger, så I sammen kan gøre jeres arytme klar.

Vi glæder os til at sende jer afsted.

Team Arytmi

"Små forstyrrelser. Store øjeblikke."`;
}

function mailGave(f){
  const modt = f.invModtager || 'din rejsemakker';
  const afs  = afsenderNavn();
  const adr  = f.invAfhentning || '(afhentningsadresse)';
  const pak  = (f.invPakkeliste && f.invPakkeliste.length ? f.invPakkeliste : ['Nattøj','Toilettaske','Varmt tøj til aftenen']);
  return `Hej ${modt}

Nogen har planlagt noget særligt til dig.

${afs} har inviteret dig til en arytme.

Dato: ${turDatoTekst(f)}
Hjemkomst: ${turHjemkomstTekst(f)}

En arytme er en lille, bevidst forstyrrelse af hverdagens rytme.

Et lille afbræk, hvor der er plads til ro, nærvær og tid sammen. Ikke fordi hverdagen skal laves om, men fordi den fortjener små øjeblikke, der bryder rytmen og giver nye minder.

Den her arytme er allerede planlagt specielt til dig.

Du skal ikke tænke på destinationen, planlægningen eller alt det praktiske. Det har ${afs} allerede taget sig af.

Det eneste, du skal gøre, er at være klar her: ${adr} og tage disse få ting med:

DIN PAKKELISTE

• ${pak[0]||''}
• ${pak[1]||''}
• ${pak[2]||''}

Resten venter på dig.

ER DU KLAR?

[Jeg glæder mig – bekræft invitationen]

Vi håber, at denne arytme bliver begyndelsen på mange flere.

De bedste hilsner

Team Arytmi

"Livet har godt af en lille arytme."

Tryk her hvis du ikke kan deltage i arytmen`;
}

/* Mail-kladden gemmes, så brugerens rettelser ikke forsvinder ved gentegning.
   Nulstilles kun, når man selv beder om det. */
function mailKladde(f){
  if(f.invMailTekst == null) f.invMailTekst = (f.invType==='gave' ? mailGave(f) : mailSammen(f));
  return f.invMailTekst;
}
function nulstilMail(){
  const f = s.forberedelse;
  f.invMailTekst = (f.invType==='gave' ? mailGave(f) : mailSammen(f));
  gem(); tegn();
  flash('Teksten er sat tilbage til Arytmis egen.', 'mail');
}
function mailFelt(sendLabel, sendAktion){
  const f = s.forberedelse;
  return `
    <div class="kort">
      <div class="etiket">Sådan ser mailen ud</div>
      <p class="dæmpet" style="font-size:13px;margin:6px 0 10px">Ret frit i teksten, før du sender.</p>
      <textarea class="mail-felt" oninput="s.forberedelse.invMailTekst=this.value;gem()">${esc(mailKladde(f))}</textarea>
      <button class="knap primær bred" style="margin-top:14px" onclick="${sendAktion}">${sendLabel} ${ik('mail')}</button>
      <div style="display:flex;gap:10px;margin-top:10px">
        <button class="knap kontur lille" style="flex:1" onclick="gemUnderTrin();s.forberedelse.invVisMail=false;gem();tegn()">Ret oplysninger</button>
        <button class="knap kontur lille" style="flex:1" onclick="nulstilMail()">Nulstil teksten</button>
      </div>
    </div>`;
}

/* Invitationen er ikke længere et trin i rækken, så den kan ikke låne
   sektionHeader/sektionFod — de slår op i SEKTIONER og ville falde over et id,
   der ikke findes. Den har fået sin egen top og bund: almindelig tilbage-pil
   op i hjørnet og én vej hjem i bunden. */
function skærmInvitation(){
  const f = s.forberedelse; if(!f){ gåTil('hjem'); return; }
  let krop;
  if(!f.invType)              krop = invVælgKrop();
  else if(f.invType==='selv') krop = invSelvKrop();
  else if(f.invType==='sammen')krop = invSammenKrop();
  else                        krop = invGaveKrop();
  $('indhold').innerHTML = `<div class="side anim">
    ${skærmTop('Inviter til denne arytme','hjem','Hvem skal med?')}
    ${krop}
    <div style="margin-top:18px;text-align:center">
      <button class="knap kontur lille" onclick="tilbageTil('hjem')">${ik('tilbage')} Tilbage til overblikket</button>
    </div>
  </div>`;
}
function invVælgKrop(){
  const valg = [
    { type:'sammen', ikon:'folk',   navn:'Planlæg sammen',   tekst:'I planlægger arytmen sammen — begge er med fra hver jeres telefon.' },
    { type:'gave',   ikon:'gave',   navn:'Giv som gave',     tekst:'Planlæg alt i det skjulte og send en færdig overraskelse, når du er klar.' },
    { type:'selv',   ikon:'puls', navn:'Denne arytme er for mig', tekst:'Du tager afsted alene.' }
  ];
  return `
    <div class="kort guide-brød"><p>Vælg, hvordan I skal afsted.</p></div>
    ${valg.map(v=>`
      <button class="res-kort" onclick="vælgInvType('${v.type}')">
        <span class="res-ikon">${ik(v.ikon)}</span>
        <span class="res-krop"><span class="res-navn">${v.navn}</span><span class="res-meta">${v.tekst}</span></span>
        <span class="tjek-pil">${ik('pil')}</span>
      </button>`).join('')}`;
}
function vælgInvType(type){
  const f = s.forberedelse;
  gemUnderTrin();
  f.invType = type;
  if(type==='selv')      f.invStatus = 'alene';
  else if(type==='gave') f.invStatus = (f.invStatus==='sendt') ? 'sendt' : 'planlægger';
  else                   f.invStatus = (f.invStatus==='bekræftet') ? 'bekræftet' : 'kladde';
  gem(); tegn();
}
function invSkift(){
  const f = s.forberedelse;
  gemUnderTrin();
  f.invType=null; f.invStatus=null; f.invForslag=[]; f.invForslagFra=null; f.invEnigDato=null;
  gem(); tegn();
}
function invSelvKrop(){
  return `
    <div class="advarsel" style="background:#e2ead2;border-color:#c3d3a8;color:#4d5c3a">${ik('tjek')} Denne arytme er for dig selv. Nyd den — resten af planen er klar til dig alene.</div>
    <div style="text-align:center;margin-top:16px"><button class="knap kontur lille" onclick="invSkift()">${ik('folk')} Vælg en anden måde</button></div>`;
}

/* ---------- Planlæg sammen ---------- */
function gæstePreview(f){
  return `
  <div class="ob-mail">
    <div class="m-top">${ik('mail')} Til: ${esc(f.invEmail||f.invModtager||'din rejsemakker')}</div>
    <div class="m-krop">
      <pre class="mail-vis">${esc(mailKladde(f))}</pre>
      <p class="dæmpet" style="font-size:13px;margin-top:14px">Ved bekræftelse får ${esc(f.invModtager||'rejsemakkeren')} en mail med login:</p>
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
      ${f.invVisMail ? mailFelt('Send invitation','invSend()') : `
      <div class="kort">
        <label class="felt-etiket" style="margin-top:0">Rejsemakkerens navn</label>
        <input type="text" placeholder="Fx Anne" value="${esc(f.invModtager||'')}" oninput="s.forberedelse.invModtager=this.value;s.forberedelse.invMailTekst=null;gem();opdaterInvKnap('invSeKnap')">
        <label class="felt-etiket">Rejsemakkerens e-mail</label>
        <input type="email" placeholder="anne@mail.dk" value="${esc(f.invEmail||'')}" oninput="s.forberedelse.invEmail=this.value;gem();opdaterInvKnap('invSeKnap')">
        <label class="felt-etiket">Foreslået dato</label>
        <div class="sted-chips"><span class="sted-chip valgt">${ik('kort')} ${f.dato?pænDato(f.dato):'Ingen dato valgt endnu'}</span></div>
        <button class="knap primær bred" id="invSeKnap" style="margin-top:16px" ${f.invModtager&&f.invEmail?'':'disabled'} onclick="gemUnderTrin();s.forberedelse.invVisMail=true;gem();tegn()">Se invitation ${ik('pil')}</button>
      </div>`}
      <div style="text-align:center;margin-top:14px"><button class="knap kontur lille" onclick="invSkift()">${ik('folk')} Vælg en anden måde</button></div>`;
  }
  if(status==='bekræftet'){
    return `
      <div class="mørk-kort"><div class="glød"></div>
        <div class="etiket" style="color:rgba(246,243,234,.6)">I er enige</div>
        <h3 style="margin-top:4px">Turen er oprettet</h3>
        <p style="margin-top:6px">Du og ${navn} er enige om <b>${pænDato(f.invEnigDato||f.dato)}</b>. Nu er resten af planen fælles — I fylder tjeklisten ud sammen.</p>
      </div>`;
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
  const navn = esc(f.invModtager);
  f.invStatus='sendt'; f.invVisMail=false; gem();
  // Når mailen er afsted, hører brugeren hjemme på overblikket over resten
  tilbageTil('hjem');
  infoModal(`Invitation sendt til <b>${navn}</b>. Du får besked, når ${navn} bekræfter datoen — så kan I sammen planlægge resten af arytmen.`);
}
function gæstBekræft(){
  const f = s.forberedelse; f.invEnigDato=f.dato; f.invStatus='bekræftet'; gem(); tegn();
  flash('I er enige om datoen. Turen er oprettet.', 'puls');
}
function gæstForeslå(){
  const f = s.forberedelse; f.invForslag=forslagsDatoer(f.dato); f.invForslagFra='gæst'; f.invStatus='forhandler'; gem(); tegn();
}
function gæstAfslå(){
  const f = s.forberedelse; f.invStatus='afslået'; gem(); tegn();
}
function brugerBekræftDato(iso){
  const f = s.forberedelse; f.dato=iso; f.invEnigDato=iso; f.invStatus='bekræftet'; gem(); tegn();
  flash('I er enige om '+pænDato(iso)+'. Turen er oprettet.', 'puls');
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
    const navn = esc(f.invModtager||'Din rejsemakker');
    const svar = f.gaveSvar;
    return `
      <div class="mørk-kort"><div class="glød"></div>
        <div class="etiket" style="color:rgba(246,243,234,.6)">Overraskelsen er sendt</div>
        <h3 style="margin-top:4px">${navn} er inviteret</h3>
        <p style="margin-top:6px">${svar==='bekræftet' ? navn+' har bekræftet. Nu kan I bare glæde jer.'
          : svar==='afslået' ? navn+' kan ikke den dag.'
          : 'Invitationen er på vej. Du får en besked, så snart '+navn+' svarer.'}</p>
      </div>
      ${svar==='afslået' ? `
      <div class="advarsel" style="margin-top:14px">${ik('klokke')} ${navn} kan ikke den dag. Aftal en ny dato direkte med hinanden — en overraskelse kan appen ikke forhandle for jer. Tidspunktet kan du rette her i appen bagefter.</div>
      <div class="kort">
        <button class="knap primær bred" onclick="gåTil('turdato')">${ik('kort')} Ret dato og tid</button>
      </div>` : ''}
      <div class="ob-mail">
        <div class="m-top">${ik('mail')} Til: ${esc(f.invEmail||f.invModtager||'din rejsemakker')}</div>
        <div class="m-krop"><pre class="mail-vis">${esc(mailKladde(f))}</pre></div>
      </div>
      ${!svar ? `
      <div class="kort">
        <div class="etiket">Prøv modtagerens svar (demo)</div>
        <p class="dæmpet" style="font-size:13px;margin:6px 0 12px">Sådan svarer ${navn} på overraskelsen:</p>
        <button class="knap primær bred" onclick="gaveSvar('bekræftet')">${ik('tjek')} Jeg glæder mig — bekræft</button>
        <button class="knap kontur bred" style="margin-top:10px" onclick="gaveSvar('afslået')">${ik('kryds')} Kan ikke deltage</button>
      </div>` : ''}`;
  }
  const mad = forplejningKlar(), bil = bilenKlar(f), pakke = f.pakkeTjek.length>=pakkePunkter().length;
  const rk = (ok,navn,under,mål)=>`<button class="tjek-punkt ${ok?'klar':''}" onclick="gåTil('${mål}')"><span class="tjek-boks">${ik('tjek')}</span><span class="tjek-krop"><span class="tjek-navn">${navn}</span><span class="tjek-under">${under}</span></span><span class="tjek-pil">${ik('pil')}</span></button>`;
  return `
    <div class="kort guide-brød"><p><b>Planlæg turen som en overraskelse.</b> ${esc(f.invModtager||'Din rejsemakker')} ser ingenting endnu. Gør detaljerne klar, og send så den færdige invitation.</p></div>
    ${f.invVisMail ? mailFelt('Send overraskelsen','gaveSend()') : `
    <div class="kort">
      <label class="felt-etiket" style="margin-top:0">Modtagerens navn</label>
      <input type="text" placeholder="Fx Anne" value="${esc(f.invModtager||'')}" oninput="s.forberedelse.invModtager=this.value;s.forberedelse.invMailTekst=null;gem();opdaterInvKnap('invGaveKnap')">
      <label class="felt-etiket">Modtagerens e-mail</label>
      <input type="email" placeholder="anne@mail.dk" value="${esc(f.invEmail||'')}" oninput="s.forberedelse.invEmail=this.value;gem();opdaterInvKnap('invGaveKnap')">
      <label class="felt-etiket">Hvor skal I mødes? <span class="dæmpet" style="font-weight:400">(står i mailen)</span></label>
      <input type="text" placeholder="Fx hjemme kl. 15" value="${esc(f.invAfhentning||'')}" oninput="s.forberedelse.invAfhentning=this.value;s.forberedelse.invMailTekst=null;gem()">
    </div>
    <div class="sektion"><h3>Gør klar i det skjulte</h3></div>
    ${rk(mad,'Mad & drikke','Forplejning til turen','mad')}
    ${rk(bil,'Bilen','Strøm, sengetøj og udstyr','bilen')}
    ${rk(pakke,'Pakkeliste','De personlige ting','pakke')}
    <button class="knap primær bred ånde" id="invGaveKnap" style="margin-top:18px" ${f.invModtager&&f.invEmail?'':'disabled'} onclick="gemUnderTrin();s.forberedelse.invVisMail=true;gem();tegn()">${ik('gave')} Se overraskelsen ${ik('pil')}</button>`}
    <div style="text-align:center;margin-top:14px"><button class="knap kontur lille" onclick="invSkift()">${ik('folk')} Vælg en anden måde</button></div>`;
}
function gaveSend(){
  const f = s.forberedelse; if(!f.invModtager){ flash('Skriv hvem overraskelsen er til.'); return; }
  f.invStatus='sendt'; f.invVisMail=false; f.gaveSvar=null;
  // Overraskelsen er sendt, og dermed er planlægningen slut — forsiden skifter
  // til de tre punkter om at komme afsted (OD 11/8).
  f.planlagt = true; gem();
  nulstilHistorik(); gåTil('hjem');
  infoModal('Gaven er nu sendt, og du har planlagt jeres tur.', 'Til overblikket');
}
/* Svaret på gaven kommer som en besked i appen. Afvises den, skal brugeren
   selv aftale en ny dato — appen kan ikke forhandle på en overraskelse. */
function gaveSvar(svar){
  const f = s.forberedelse; f.gaveSvar = svar; gem(); tegn();
  if(svar==='bekræftet') flash((f.invModtager||'Din rejsemakker')+' glæder sig. I er afsted.', 'puls');
  else flash((f.invModtager||'Din rejsemakker')+' kan ikke den dag — aftal en ny dato direkte med hinanden.', 'klokke');
}

/* =============================================================
   FORBERED TUR — hver sektion er sin egen side, i rækkefølge
   ============================================================= */
/* To faser: 1) planlæg i god tid  2) gør klar på afgangsdagen */
const SEKTIONER = [
  { id:'destination', fase:1, navn:'Destination',      under:'Hvor tager I hen?',        ikon:'nål',    farve:'#eadfcd', ifarve:'#8a5f3e',
    spørg:'Hvor skal turen gå hen?',      forklar:'Sæt en pin på kortet, søg en by — eller vælg et af vores testede steder.' },
  /* Invitation er IKKE længere et trin (OD 13/8). Trinnet "Hvem vil du dele
     denne arytme med?" spærrede vejen: man skulle tage stilling til
     rejsemakkeren, før man måtte planlægge noget som helst. Nu går man fra
     destinationen direkte til overblikket, og invitationen ligger som en rund
     knap i bunden dér. Skærmen findes uændret — den er bare ikke i rækken.
     Låsen består: vælger man aktivt "Planlæg sammen", er forplejning, bil og
     personligt stadig låst indtil rejsemakkeren har bekræftet. Vælger man
     ingenting, låser ingenting — invType er null, og afventerFællesPlan()
     er kun sand for 'sammen'. */
  { id:'mad',         fase:2, navn:'Forplejning',      under:'Tips fra vores egne ture', ikon:'kop',    farve:'#ece8dd', ifarve:'#6b705c',
    spørg:'Uden mad og drikke duer helten ikke', forklar:'Vores egne tips til aftensmad, morgenkaffe og det søde undervejs.' },
  { id:'bilen',       fase:2, navn:'Bil',              under:'Strøm, sengetøj og udstyr', ikon:'bil',   farve:'#e6e6d9', ifarve:'#5f6353',
    spørg:'Er bilen klar?',               forklar:'Strøm, varme, sengetøj og det udstyr I vil have med.' },
  { id:'pakke',       fase:2, navn:'Personligt',       under:'Personlige ting',          ikon:'telt',   farve:'#e8e2d4', ifarve:'#7a6a4f',
    spørg:'Hvad skal I selv have med?',   forklar:'De personlige ting — nattøj, toilettaske og tøj efter destinationen.' }
];
const FASER = {
  1:{ navn:'Find stedet', etiket:'Trin 1 · Destination', intro:'Først stedet. Resten planlægger I bagefter, i det tempo I har lyst til.' },
  2:{ navn:'Planlæg jeres tur', etiket:'Planlæg jeres tur', intro:'Forplejning, bil og det personlige. Når de tre er på plads, samler appen selv pakkelisten.' }
};
/* Overskriften over de tre punkter på overblikket (OD 13/8). Ligger her frem
   for inde i skærmen, så den kan ændres ét sted. */
const PLANLÆG_OVERSKRIFT = 'Planlæg jeres tur her — uden besvær';
function tilFase(n){
  if(!s.forberedelse) return;
  const heltFærdig = n===2 && fremdrift(1).mangler===0;
  s.forberedelse.fase = n;
  gem();
  if(heltFærdig) flash('Planen er klar. Godt gået — nu gør vi klar til afgang.', 'tjek');
  nulstilHistorik(); gåTil(sektionListe(n)[0].id);
}
/* Hvad der skal gemmes af en tur, så den kan gentages senere (OD 30/8).
   Kun de valg, der beskriver turen — ikke afkrydsninger (klarTjek/pakkeTjek):
   en gentaget tur skal pakkes forfra. Invitationen tages heller ikke med;
   den hører til den enkelte gang. */
function turSnapshot(f){
  if(!f) return null;
  return {
    destination: f.destination || null,
    retur: f.retur, returDato: f.returDato || null,
    startNavn: f.startNavn || '', startXY: f.startXY || null,
    radius: f.radius, oplevelser: f.oplevelser || null,
    madValg: [...(f.madValg||[])], snackValg: [...(f.snackValg||[])],
    morgenValg: [...(f.morgenValg||[])], brugValg: [...(f.brugValg||[])],
    brugSet: [...(f.brugSet||[])], morgenSet: !!f.morgenSet,
    bilType: f.bilType || null, bilHuske: [...(f.bilHuske||[])],
    hundMed: !!f.hundMed
  };
}
function annullerForberedelse(){
  bekræft('Annullér turen? Både planen og afkrydsningerne nulstilles.', ()=>{
    sletTur(s.aktivId); nulstilHistorik(); gåTil('hjem');
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

  /* Radius fra trin 3: cirklen viser, hvor langt de valgte at køre.
     Steder udenfor bliver dæmpet — ikke skjult, for man må gerne
     ombestemme sig, og de fleste af dem er OD-pladsholdere endnu. */
  const start = startGeo();
  const kmMax = start ? RADIUS_KM[(s.forberedelse.radius)|0] : null;
  if(start){
    L.circle([start.lat, start.lon], {
      radius: kmMax*1000, className:'lkort-radius',
      color:'#8a5f3e', weight:1.2, opacity:.55, fillColor:'#b0794e', fillOpacity:.07
    }).addTo(map);
    L.marker([start.lat, start.lon], { icon: L.divIcon({
      className:'', iconSize:[16,16], iconAnchor:[8,8],
      html:`<div class="lkort-start"></div>` }) })
      .addTo(map).bindTooltip('Jeres startpunkt', { direction:'top', offset:[0,-10] });
  }

  const ikon = uden => L.divIcon({
    className:'', iconSize:[28,28], iconAnchor:[14,14],
    html:`<div class="lkort-testet${uden?' udenfor':''}">${ik('stjerne')}</div>`
  });
  TESTEDE.forEach(t=>{
    const geo = testetGeo(t);
    const km = start ? Math.round(afstandKm(start, geo)) : null;
    const uden = km!=null && km > kmMax;
    const under = km==null ? '' : uden
      ? `<br><span class="lkort-tip-uden">ca. ${km} km — længere væk, end I valgte</span>`
      : `<br><span class="lkort-tip-km">ca. ${km} km herfra</span>`;
    L.marker([geo.lat, geo.lon], { icon:ikon(uden), title:t.navn, opacity: uden?.55:1 }).addTo(map)
      .bindTooltip(esc(t.navn)+under, { direction:'top', offset:[0,-14] })
      .on('click', e=>{ L.DomEvent.stopPropagation(e); åbnTestet(t.id,'destination'); });
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
  } else if(start){
    /* Ingen destination endnu: vis præcis det område, de har valgt */
    map.fitBounds(L.latLng(start.lat, start.lon).toBounds(kmMax*2200), { padding:[12,12] });
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
/* Hvor godt passer et testet sted til trin 4? Kun steder med rigtigt
   indhold har ønsker på sig — pladsholderne (t2-t10) har ingen, og skal
   derfor ikke lade som om de matcher. */
const ØNSKE_ORD = { solopgang:'Solopgang', solnedgang:'Solnedgang', vand:'Vand', land:'Land', isoleret:'Isoleret', livligt:'Livligt' };
function ønskeMatch(t){
  const o = s.forberedelse && s.forberedelse.oplevelser;
  if(!o || !t.ønsker) return null;
  const nøgler = ['lys','natur','stemning'].filter(k=>o[k]);
  if(!nøgler.length) return null;
  return { træf: nøgler.filter(k=>t.ønsker[k]===o[k]).length, ud_af: nøgler.length };
}
/* Opsummering af trin 3 + 4, så valgene er synlige på kortet */
function valgChips(){
  const f = s.forberedelse;
  if(!f) return '';
  const o = f.oplevelser || {};
  const ønsker = ['lys','natur','stemning'].filter(k=>o[k]).map(k=>ØNSKE_ORD[o[k]].toLowerCase());
  const linje = [RADIUS_TEKST[f.radius|0].toLowerCase()+(f.startNavn?' fra '+esc(f.startNavn):'')]
    .concat(ønsker).join(' · ');
  return `<div class="valg-linje">${ik('gps')}<span>${linje}</span>
    <button onclick="gåTil('hvorlangt')">Ret</button></div>`;
}
function skærmDestination(){
  const f = s.forberedelse;
  const dest = f && f.destination;
  const start = startGeo();
  $('indhold').innerHTML = `<div class="side anim">
    ${sektionHeader('destination')}
    ${valgChips()}
    <p class="dæmpet" style="margin-bottom:14px">${start
      ? `Cirklen er jeres radius. ${ik('stjerne')} = vores testede steder; de dæmpede ligger udenfor. Tryk et sted — eller sæt jeres egen pin.`
      : `Tryk på kortet, søg en by, eller brug jeres position. ${ik('stjerne')} = vores køreklare, testede steder — tryk for at vælge en af dem.`}</p>
    <div class="kort">
      <div class="kort-wrap"><div id="rigtigt-kort"></div></div>
      <div style="display:flex;gap:10px;margin-top:12px">
        <input type="text" id="bySøg" placeholder="Søg efter en by …" value="${esc(søgTekst)}" onkeydown="if(event.key==='Enter')søgBy()">
        <button class="knap primær lille" onclick="søgBy()">Søg</button>
      </div>
      <button class="knap blød bred lille" style="margin-top:10px" onclick="brugGPS()">${ik('gps')} Brug min position</button>
      ${dest?`<div class="sted-chips" style="margin-top:12px"><span class="sted-chip valgt">${ik('nål')} ${esc(dest.navn)}</span></div>`:''}
    </div>
    ${værtsKort()}
    ${sektionFod('destination')}
  </div>`;
  tegnRigtigtKort();
}
/* Hvor "tilbage" fører hen fra et sted: listen med tre forslag
   eller kortet, alt efter hvor man kom fra. */
let testetRetur = 'destination';
function åbnTestet(id, fra){ testetRetur = fra || 'destination'; gåTil('testet-'+id); }
/* Køretid som skøn: vi har ikke rutedata i prototypen, kun fugleflugt.
   70 km/t er et fair gennemsnit på danske landeveje inkl. de sidste
   grusveje. Skønnet er mærket som skøn — ikke som en rutebeskrivelse. */
function køretid(km){
  /* Gulv på 5 min (14/8): under ca. 3 km rundede formlen ned til 0, og
     "2 km · 0 min" stod på kortet som om turen var gratis. Det gjorde ikke
     noget, så længe køretiden kun lå på destinationssiden — den står nu på
     forslagskortet, hvor de nære steder er dem, man ser først. */
  const min = Math.max(5, Math.round(km / 70 * 60 / 5) * 5);
  if(min < 60) return min+' min';
  const t = Math.floor(min/60), r = min%60;
  return r ? `${t} t ${r} min` : `${t} time${t>1?'r':''}`;
}
/* Praktisk på stedet — som gitter, ikke som brødtekst (14/8).
   Felterne har ligget i datamodellen siden rekognosceringsturen og blev vist
   som fire linjer tekst nederst på siden, altså som noget man skulle LÆSE.
   Nu står de som fire felter, man kan scanne på to sekunder.
   Alle fire vises altid: at vi ikke har noteret et toilet, er også en
   oplysning — og det er tydeligere som et tomt felt end som en manglende
   linje, man ikke kan vide manglede. */
function faciliteterKort(t){
  const fa = t.faciliteter || {};
  const felt = (ikon,navn,værdi)=> `
    <div class="fakta">${ik(ikon)}<div class="fakta-krop">
      <span class="fakta-navn">${navn}</span>
      <span class="fakta-værdi${værdi?'':' tom'}">${værdi?esc(værdi):'Ikke noteret'}</span>
    </div></div>`;
  const noget = fa.toilet || fa.handel || fa.aftensmad || fa.morgen;
  return `<div class="sektion" style="margin-bottom:8px"><h3>Praktisk på stedet</h3></div>
  <div class="fakta-net">
    ${felt('toilet','Toilet',fa.toilet)}
    ${felt('kurv','Indkøb',fa.handel)}
    ${felt('gaffel','Aftensmad',fa.aftensmad)}
    ${felt('croissant','Morgenkaffe',fa.morgen)}
  </div>
  ${noget?'':`<p class="dæmpet" style="margin:-8px 0 16px">Vi noterede ikke faciliteterne her — regn med, at I selv skal have det nødvendige med.</p>`}`;
}
/* "Kort fortalt" — dommen over prosaen (14/8).
   Beskrivelserne er det bedste i appen, og der er ikke ændret ét ord i dem.
   Men de gjorde kun det ene af de to, en god tekst skal: de var bløde på
   mennesket uden at være faste på sagen. Linjen her leverer fakta, så
   fortællingen nedenunder får lov at være fortælling.
   Kun udfyldte felter kommer med — står der ingenting, vises linjen ikke. */
function kortFortalt(t, km){
  const d = [];
  if(t.ord) d.push(esc(t.ord));
  if(km!=null) d.push(`${km} km <i>·</i> ${esc(køretid(km))}`);
  if(t.underlag) d.push(esc(t.underlag));
  const wc = toiletKort(t.faciliteter && t.faciliteter.toilet);
  if(wc) d.push(wc.replace(/<\/?b>/g,''));
  if(d.length < 2) return '';
  return `<div class="dom">
    <div class="dom-titel">Kort fortalt</div>
    <div class="dom-linje">${d.join(' <i>·</i> ')}</div>
  </div>`;
}
/* Billederne fra rekognosceringsturen får hele skærmen (OD 13/8). Før lå det
   første som et 210px bånd og resten som frimærker på 132px — seks billeder fra
   en tur, gemt væk. Nu ét stående 3:4-galleri man swiper i, med stedets navn
   liggende fast ovenpå og prikker der viser hvor man er.
   Teksten har pointer-events:none, så et træk hen over den stadig bladrer. */
function stedGalleri(t){
  const b = t.billeder || [];
  const overlay = `
    <div class="sg-tekst">
      ${t.klar?'':'<span class="sg-mærkat">Måske — vi tester igen</span>'}
      <h1 class="sg-navn">${esc(t.navn)}</h1>
      ${t.kort?`<div class="sg-under">${esc(t.kort)}</div>`:''}
    </div>`;
  if(!b.length){
    return `<div class="sted-galleri uden-foto">
      <span class="sg-vandmærke">${ik('stjerne')}</span>
      ${overlay}
      <div class="sg-ingen">Vi nåede ikke at få billeder med hjem herfra — de kommer.</div>
    </div>`;
  }
  return `<div class="sted-galleri">
    <div class="sg-spor" id="sg-${t.id}" onscroll="sgPrik('${t.id}')">
      ${b.map((f,i)=>`<img src="${f}" alt="${esc(t.navn)} — billede ${i+1} af ${b.length}"
        width="1050" height="1400" ${i?'loading="lazy"':'fetchpriority="high"'} decoding="async"
        onclick="visFoto('${t.id}',${i})">`).join('')}
    </div>
    ${overlay}
    ${b.length>1?`<div class="sg-prikker" id="sgp-${t.id}">${b.map((_,i)=>
      `<span class="${i?'':'på'}"></span>`).join('')}</div>`:''}
  </div>
  ${b.length>1?`<div class="foto-tekst">${b.length} billeder fra vores egen tur — træk til siden, tryk for at se stort</div>`:''}`;
}
/* Hvilket billede står man på. Regnes ud fra scroll-positionen, så prikkerne
   følger fingeren i stedet for at skulle klikkes. */
function sgPrik(id){
  const spor = $('sg-'+id), prikker = $('sgp-'+id);
  if(!spor || !prikker) return;
  const i = Math.round(spor.scrollLeft / spor.clientWidth);
  [...prikker.children].forEach((p,n)=>p.classList.toggle('på', n===i));
}
function visFoto(id, i){
  const t = TESTEDE.find(x=>x.id===id); if(!t) return;
  const b = t.billeder || []; if(!b[i]) return;
  const el = document.createElement('div');
  el.className = 'foto-lup';
  el.innerHTML = `<img src="${b[i]}" alt="${esc(t.navn)}">
    <div class="lup-tæl">${i+1} / ${b.length}</div>`;
  el.onclick = () => el.remove();
  document.body.appendChild(el);
}
function skærmTestet(id){
  const t = TESTEDE.find(x=>x.id===id);
  if(!t){ gåTil('destination'); return; }
  const start = startGeo();
  const km = start ? Math.round(afstandKm(start, testetGeo(t))) : null;
  const m = ønskeMatch(t);
  const bill = t.billeder || [];
  const linjer = [];
  if(km!=null){
    const kmMax = RADIUS_KM[(s.forberedelse.radius)|0];
    linjer.push(`<div class="vært-række">${ik('gps')}<div class="v-tekst">Ca. ${km} km fra ${esc(s.forberedelse.startNavn)}${km>kmMax?' — <b>længere væk, end I valgte</b>':''}</div></div>`);
    linjer.push(`<div class="vært-række">${ik('bil')}<div class="v-tekst">Ca. <b>${køretid(km)}</b> i bil <span class="dæmpet" style="font-size:12.5px">(skøn — fugleflugt ved 70 km/t)</span></div></div>`);
  }
  if(m) linjer.push(`<div class="vært-række">${ik('stjerne')}<div class="v-tekst">Passer på ${m.træf} af jeres ${m.ud_af} ønsker${m.træf?': '+['lys','natur','stemning'].filter(k=>t.ønsker[k]===s.forberedelse.oplevelser[k]).map(k=>ØNSKE_ORD[t.ønsker[k]].toLowerCase()).join(' · '):''}</div></div>`);
  $('indhold').innerHTML = `<div class="side anim">
    ${skærmTop(t.navn,testetRetur, t.klar?'Testet af Arytmi ★':'Måske — vi tester igen')}
    ${linjer.length?`<div class="kort"><div class="etiket">For jeres tur</div>${linjer.join('')}</div>`:''}
    ${stedGalleri(t)}
    ${kortFortalt(t, km)}
    <div class="kort guide-brød"><p>${esc(t.beskrivelse||'')}</p></div>
    ${faciliteterKort(t)}
    <button class="knap primær bred" onclick="vælgTestetSted('${t.id}')">Vælg dette sted ${ik('pil')}</button>
    <div style="text-align:center;margin-top:10px"><button class="knap kontur lille" onclick="tilbage('${testetRetur}')">${ik('tilbage')} ${testetRetur==='forslag'?'Se de andre to':'Tilbage'}</button></div>
  </div>`;
}
function vælgTestetSted(id){
  const t = TESTEDE.find(x=>x.id===id);
  if(!t) return;
  sætDestination({ navn:t.navn, x:t.x, y:t.y, testetId:t.id });
  tilOverblik();
}
/* Stedet er valgt — så er trin 1 forbi (OD 13/8). Før gik man videre til
   "hvem vil du dele denne arytme med?"; nu lander man på overblikket, hvor
   man selv vælger, hvad man har lyst til at tage fat på.
   gåTilErstat: destinationssiden er brugt op og skal ikke ligge i vejen,
   når man trykker tilbage fra overblikket. */
function tilOverblik(){
  if(s.forberedelse) s.forberedelse.fase = 2;
  gem();
  nulstilHistorik();
  gåTilErstat('hjem');
}

/* =============================================================
   3 · BILEN — først hvilken bil, så foldbare emner i to grupper
   ============================================================= */
/* Hvilke emner der står foldet ud. Ren visningstilstand: den skal hverken
   gemmes eller ligge i historikken — at folde en tekst ud er en oplysning,
   ikke et skridt man skal kunne gå tilbage fra. */
let åbneBilEmner = {};
function bilFold(id){ åbneBilEmner[id] = !åbneBilEmner[id]; tegn(); }
/* "Tilføj til tur"-knappen er væk (KN 30/8, efter OD's spørgsmål): valgene
   blev allerede gemt ved hvert tryk, så knappen bekræftede kun noget, der var
   sket. Næste/Færdig gør arbejdet nu. */
function vælgBilType(id){
  if(!s.forberedelse) s.forberedelse = nyForberedelse();
  s.forberedelse.bilType = id;
  gem(); tegn();
}
/* Vælg til/fra — punktet følger med over på pakkelisten. Ingen flash pr. tryk
   (OD 30/8): når man sidder og vælger ti ting i træk, bliver en besked hver
   gang til støj, ikke til hjælp. */
function bilHusk(id){
  if(!s.forberedelse) s.forberedelse = nyForberedelse();
  const h = s.forberedelse.bilHuske || (s.forberedelse.bilHuske = []);
  const i = h.indexOf(id);
  if(i>=0) h.splice(i,1); else h.push(id);
  gem(); tegn();
}
/* Bilen er tre trin (OD 30/8), ét pr. gruppe i BILEN_GRUPPER — før lå alle
   tre lister under hinanden på én lang side sammen med instrumentbrættet.
   Ruterne er 'bilen', 'bilen-1' og 'bilen-2'; kun 'bilen' er en SEKTIONER-
   sektion, så header/fod/lås virker uændret. Instrumentbrættet ("Sådan står
   bilen") er væk: de fire felter fortalte enten noget, appen ikke kan vide
   (strøm), eller noget der allerede står på destinationssiden (km, underlag). */
function skærmBilen(nr){
  const f = s.forberedelse || nyForberedelse();
  const huske = f.bilHuske || [];

  // Trin 0: hvilken bil? Resten handler om strøm og plads, og begge dele ser
  // forskellige ud alt efter svaret — så spørgsmålet kommer først.
  if(!f.bilType){
    return void ($('indhold').innerHTML = `<div class="side anim">
      ${sektionHeader('bilen')}
      <div class="kort guide-brød"><p>Først: hvad kører I i? Det afgør, hvordan I får strøm til natten.</p></div>
      ${BIL_TYPER.map(t=>`
        <button class="res-kort" onclick="vælgBilType('${t.id}')">
          <span class="res-ikon">${ik('bil')}</span>
          <span class="res-krop"><span class="res-navn">${t.navn}</span><span class="res-meta">${t.under}</span></span>
          <span class="tjek-pil">${ik('pil')}</span>
        </button>`).join('')}
      ${sektionFod('bilen')}
    </div>`);
  }

  const antal = BILEN_GRUPPER.length;
  const i = Math.min(antal-1, Math.max(0, parseInt(nr,10) || 0));
  const g = BILEN_GRUPPER[i];
  const sidste = i === antal-1;
  const valgtType = BIL_TYPER.find(t=>t.id===f.bilType) || BIL_TYPER[0];
  const prikker = BILEN_GRUPPER.map((x,n)=>`<span class="sek-prik ${n===i?'aktiv':''}"></span>`).join('');
  /* Tryk på rækken vælger til/fra; info-ikonet folder teksten ud. De to er
     adskilt (stopPropagation), så man ikke fravælger et punkt ved et uheld,
     når man bare ville læse mere. Info-ikonet vises kun, hvis punktet HAR en
     tekst — sengetøjet har ingen (OD 30/8). */
  const emne = (p)=>{
    const åben = !!åbneBilEmner[p.id];
    const husket = huske.includes(p.id);
    return `
      <div class="liste-punkt" onclick="bilHusk('${p.id}')" style="cursor:pointer">
        <div class="tjekboks ${husket?'markeret':''}"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div>
        <div class="navn">${p.navn}${p.tip?`<div class="dæmpet" style="font-size:12.5px;margin-top:2px">${esc(p.tip)}</div>`:''}</div>
        ${p.brød?`<button class="bil-info" onclick="event.stopPropagation();bilFold('${p.id}')" aria-label="Mere om ${esc(p.navn)}">${ik('info')}</button>`:''}
      </div>
      ${åben&&p.brød?`<div class="bil-krop">
        <p>${p.brød}</p>
        <p class="bil-udkast">Udkast — OD skriver den endelige tekst.</p>
      </div>`:''}`;
  };

  $('indhold').innerHTML = `<div class="side anim">
    ${i===0 ? sektionHeader('bilen') : madTrinTop(g.navn, '', `Bilen · ${i+1}/${antal}`)}
    <div class="sek-prikker">${prikker}</div>
    ${i===0?`<div class="liste">
      <div class="liste-punkt">
        <span style="color:var(--rav);flex-shrink:0">${ik('bil')}</span>
        <div class="navn">${valgtType.navn}<div class="dæmpet" style="font-size:12.5px;margin-top:2px">${valgtType.under}</div></div>
        <button class="knap kontur lille" onclick="vælgBilType(null)">Skift</button>
      </div>
    </div>
    <div class="sektion"><h3>${esc(g.navn)}</h3></div>`:''}
    ${g.under?`<p class="dæmpet" style="margin:-4px 0 12px;font-size:13px">${g.under}</p>`:''}
    ${vælgAlleLinje('bilHuske', [...g.punkter, ...(g.åben ? egne(g.åben) : [])])}
    <div class="liste">
      ${g.punkter.map(emne).join('')}
      ${g.åben ? egne(g.åben).map(p=>egetBilEmne(g.åben,p,huske)).join('')
                 + egetFeltRække(g.åben,'Hvad hygger I med?') : ''}
    </div>
    ${i===0
      ? sektionFod('bilen', "gåTil('bilen-1')")
      : madTrinFod('bilen'+(i===1?'':'-'+(i-1)), sidste?'Færdig':'Næste',
                   sidste ? 'bilenFærdig()' : `gåTil('bilen-${i+1}')`)}
  </div>`;
}
/* Sidste trin på Bilen. Markerer sektionen som gennemgået (bilenKlar) og
   sender tilbage til overblikket — samme mønster som forplejningFærdig(). */
function bilenFærdig(){
  if(!s.forberedelse) s.forberedelse = nyForberedelse();
  s.forberedelse.set.bilen = true; gem(); tegn();
  valgModal('Alt til bilen er nu tilføjet pakkelisten.', [
    { tekst:'Til overblik',           aktion:()=>tilbageTil('hjem') },
    { tekst:'Fortsæt til personligt', primær:true, aktion:()=>gåTil('pakke') }
  ]);
}
/* Et hygge-punkt, man selv har skrevet. Det har ingen brødtekst at folde ud —
   kun en tjekboks til at tilføje/fjerne det fra turen og et kryds til at
   slette det helt (KN 27/8: samme tjekboks-mønster som de faste punkter, så
   man ikke skal åbne noget for at tilføje det). Modsat appens egne punkter
   overlever det turen, så det står der næste gang. */
function egetBilEmne(liste, p, huske){
  const husket = huske.includes(p.id);
  return `<div class="liste-punkt" onclick="bilHusk('${p.id}')" style="cursor:pointer">
    <div class="tjekboks ${husket?'markeret':''}"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div>
    <div class="navn">${esc(p.tekst)}</div>
    <button class="eget-fjern" onclick="event.stopPropagation();fjernEgetPunkt('${liste}','${p.id}')" aria-label="Fjern punkt">${ik('kryds')}</button>
  </div>`;
}

/* =============================================================
   4 · FORPLEJNING — madscenarier → snacks og drikkevarer → (morgenmad, kun
   flerdages-ture). Det man vælger undervejs lander på pakkelisten: grejet
   under "Madudstyr", maden og drikkevarerne under "Handleliste".
   ============================================================= */
function forplejningKlar(){
  const f = s.forberedelse;
  return !!(f && ((f.madValg&&f.madValg.length) || (f.snackValg&&f.snackValg.length)));
}
/* Alt der skal KØBES — mad, snacks og drikkevarer. Går på turplanen og på
   pakkelistens handleliste. Selve grejet ligger i madScenarieUdstyr(). */
function valgtForplejning(){
  const f = s.forberedelse; if(!f) return [];
  return [
    ...(f.madValg||[]).map(id=>MAD_VALG.find(x=>x.id===id)),
    ...(f.snackValg||[]).map(id=>SNACK_VALG.find(x=>x.id===id))
  ].filter(Boolean);
}
/* De punkter man har valgt under "Det skal I bruge" i sine madscenarier —
   både de faste og dem man selv har skrevet. Alt samles under ÉN gruppe,
   "Madudstyr" (OD 30/8: pakkelisten skal ikke vise scenariets navn, den skal
   vise hvad slags ting det er). */
function madScenarieValgte(){
  const f = s.forberedelse; if(!f) return [];
  const valgte = f.brugValg || [];
  return (f.madValg||[]).flatMap(id => {
    const d = MAD_SCENARIE_DETALJER[id];
    if(!d) return [];
    return [...d.brug, ...egne('mad-'+id)].filter(p=>valgte.includes(p.id));
  });
}
/* Grejet fra scenarierne. Punkter mærket handle:true er mad, ikke grej — de
   hører på handlelisten og filtreres fra her (OD 31/8: tapasretter, dip og
   brød skal købes, ikke pakkes). Egne punkter har aldrig handle, så de
   lander som før i køkkenet. */
function madScenarieUdstyr(){
  return madScenarieValgte().filter(p=>!p.handle).map(p=>({ ...p, gruppe:'Madudstyr' }));
}
function madScenarieMad(){
  return madScenarieValgte().filter(p=>p.handle).map(p=>({ ...p, gruppe:'Handleliste' }));
}
/* Morgenmad-trinnets valgte punkter (faste + selvskrevne) lander på
   pakkelisten under Madudstyr sammen med scenariernes grej (OD 30/8).
   Egne punkter tælles nu med på samme vilkår som de faste — de skal stå i
   morgenValg (KN 4/9). forvælgMorgen() sørger for, at de starter valgt. */
function morgenUdstyr(){
  const f = s.forberedelse; if(!f) return [];
  const valgte = f.morgenValg || [];
  return [...MORGEN_VALG, ...egne('morgen')]
    .filter(p=>valgte.includes(p.id))
    .map(p=>({ ...p, gruppe:'Madudstyr' }));
}
/* Flerdages-tur (Hjem igen ≠ samme dag) får et morgenmads-trin ind i flowet. */
function flerdagsTur(){ const f=s.forberedelse; return !!(f && f.retur && f.retur!=='samme'); }
function madTrinTop(titel, under, etiket){
  return `<div class="trin-top">
    <div class="etiket-række"><div class="etiket">${etiket||'Mad &amp; drikke'}</div></div>
    <h1 style="font-size:22px">${titel}</h1>
  </div>
  ${under?`<p class="dæmpet" style="margin:2px 0 14px">${under}</p>`:''}`;
}
/* Tilbage følger historikken — fallback bruges kun, hvis man er landet
   direkte på siden uden at komme et sted fra. */
/* tilbageLabel bruges af madscenarie-siden, hvor venstre knap ikke hedder
   "Tilbage", men "Se et andet madscenarie" (OD 31/8). Handlingen er den samme —
   ét skridt tilbage — det er kun ordet, der siger, hvad der ligger derinde. */
function madTrinFod(tilbageFald, næsteLabel, næsteAktion, tilbageLabel){
  return `<div style="margin-top:18px">
    <div class="fod-nav">
      <button class="knap kontur lille" onclick="tilbage('${tilbageFald}')">${ik('tilbage')} ${tilbageLabel||'Tilbage'}</button>
      <button class="knap kontur lille" onclick="${næsteAktion}">${næsteLabel} ${ik('pil')}</button>
    </div>
  </div>`;
}
/* Multi-valg-liste, samme visuelle sprog som Bilen/Pakkeliste — man trykker
   en ting for at markere den relevant, ikke for at "krydse den af". */
function valgListe(punkter, valgte, toggleFn){
  return `<div class="liste">
    ${punkter.map(p=>{
      const markeret = valgte.includes(p.id);
      return `<div class="liste-punkt" onclick="${toggleFn}('${p.id}')" style="cursor:pointer">
        <div class="tjekboks ${markeret?'markeret':''}"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div>
        <div class="navn">${p.tekst}${p.tip?`<div class="dæmpet" style="font-size:12.5px;margin-top:2px">${p.tip}</div>`:''}</div>
      </div>`;
    }).join('')}
  </div>`;
}
function toggleValg(arrNavn, id){
  if(!s.forberedelse) s.forberedelse = nyForberedelse();
  const arr = s.forberedelse[arrNavn] || (s.forberedelse[arrNavn]=[]);
  const i = arr.indexOf(id);
  if(i>=0) arr.splice(i,1); else arr.push(id);
  gem(); tegn();
}
function toggleSnackValg(id){ toggleValg('snackValg', id); }
function toggleMorgenValg(id){ toggleValg('morgenValg', id); }
/* Vælg alle / Fravælg alle over en emneliste (KN 4/9). Ét sted, så alle
   listerne opfører sig ens — og ordet følger listens tilstand: er alt valgt,
   er det eneste fornuftige greb at fravælge. Id'erne følger med i onclick som
   én streng adskilt af |, så hver liste kan sende sit eget udsnit uden at
   funktionen skal vide, hvor punkterne kom fra.
   'scenarie' bruges kun af madscenarierne: et punkt kan først nå pakkelisten,
   når selve scenariet ligger på turen — samme regel som i toggleBrugValg(). */
function vælgAlleLinje(arrNavn, punkter, scenarie){
  if(!punkter.length) return '';
  const valgte = (s.forberedelse && s.forberedelse[arrNavn]) || [];
  const alle = punkter.every(p=>valgte.includes(p.id));
  const ids = punkter.map(p=>p.id).join('|');
  return `<div class="vælg-alle">
    <button class="som-link" onclick="skiftAlleValg('${arrNavn}','${ids}'${scenarie?`,'${scenarie}'`:''})">${alle?'Fravælg alle':'Vælg alle'}</button>
  </div>`;
}
function skiftAlleValg(arrNavn, ids, scenarie){
  if(!s.forberedelse) s.forberedelse = nyForberedelse();
  const f = s.forberedelse;
  const liste = String(ids).split('|');
  const arr = f[arrNavn] || (f[arrNavn] = []);
  if(liste.every(id=>arr.includes(id))){
    f[arrNavn] = arr.filter(id=>!liste.includes(id));
  } else {
    liste.forEach(id=>{ if(!arr.includes(id)) arr.push(id); });
    if(scenarie && !(f.madValg||[]).includes(scenarie)) (f.madValg = f.madValg||[]).push(scenarie);
  }
  gem(); tegn();
}
/* Egne morgenpunkter er FORVALGT, første gang morgentrinnet åbnes på en tur
   (KN 4/9) — samme greb som forvælgBrug() i madscenarierne. Markøren
   f.morgenSet sørger for, at et punkt, man bevidst har fravalgt, ikke bliver
   sat på igen, næste gang siden tegnes. De FASTE punkter forvælges ikke; dem
   tager man selv stilling til, som man altid har gjort. */
function forvælgMorgen(){
  const f = s.forberedelse; if(!f || f.morgenSet) return;
  f.morgenSet = true;
  const arr = f.morgenValg || (f.morgenValg = []);
  egne('morgen').forEach(p=>{ if(!arr.includes(p.id)) arr.push(p.id); });
  gem();
}
/* Et enkelt punkt fra et madscenaries "Det skal I bruge" (30/8). Vælger man
   noget under et scenarie, man endnu ikke har tilføjet turen, tilføjes
   scenariet automatisk — ellers ville afkrydsningen ikke kunne nå pakkelisten,
   fordi madScenarieUdstyr() kun kigger på scenarier i f.madValg. */
function toggleBrugValg(scenarieId, punktId){
  if(!s.forberedelse) s.forberedelse = nyForberedelse();
  const f = s.forberedelse;
  const arr = f.brugValg || (f.brugValg = []);
  const i = arr.indexOf(punktId);
  if(i>=0) arr.splice(i,1);
  else {
    arr.push(punktId);
    if(!(f.madValg||[]).includes(scenarieId)) (f.madValg = f.madValg||[]).push(scenarieId);
  }
  gem(); tegn();
}

/* Forplejningens FØRSTE skærm (30/8). Mellemsiden med Tidsplan/Mad/Drikke er
   væk — fra overblikket lander man direkte her. Ruten hedder stadig 'mad', så
   sektionHeader/sektionFod, låsen i sektionFod og de øvrige call sites virker
   uændret; det er kun indholdet, der er skiftet ud. */
function skærmMadValg(){
  if(s.forberedelse && !s.forberedelse.set.mad){ s.forberedelse.set.mad = true; gem(); }
  const f = s.forberedelse || nyForberedelse();
  const valgte = f.madValg || [];
  $('indhold').innerHTML = `<div class="side anim">
    ${sektionHeader('mad')}
    <div class="kort guide-brød">
      <p>Måltidslogistik er en svær disciplin, når det kommer til arytmer. Vi har derfor lavet det, vi kalder et "arytmisk madscenarie", som både sørger for det, du skal bruge, og giver vores bedste erfaringer til at gøre oplevelsen god.</p>
    </div>
    <div class="sektion"><h3>Arytmiske madscenarier</h3></div>
    <div class="liste">
      ${MAD_VALG.map(p=>{
        const d = MAD_SCENARIE_DETALJER[p.id];
        const tilføjet = valgte.includes(p.id);
        /* Ingen tjekboks her (OD 30/8) — man skal ÅBNE scenariet og læse med,
           ikke krydse af på må og få. Mærket er det eneste, der viser, hvad
           man allerede har taget med. */
        return `<div class="liste-punkt" onclick="gåTil('mad-scenarie-${p.id}')" style="cursor:pointer">
          <span class="mad-nr">${d?d.nr:''}</span>
          <div class="navn">${esc(p.tekst)}</div>
          ${tilføjet?`<span class="bil-mærke">${ik('tjek')} Tilføjet</span>`:''}
          <span class="tjek-pil">${ik('pil')}</span>
        </div>`;
      }).join('')}
    </div>
    ${sektionFod('mad')}
  </div>`;
}
/* ---- Madscenarie-detalje. Rækkefølgen er OD's (30/8): teksten først, så
   tippet, og "Det skal I bruge" NEDERST — man skal have læst, hvad scenariet
   går ud på, før man tager stilling til grejet. Punkterne kan nu vælges
   enkeltvis, og man kan skrive sine egne til. ---- */
/* Punkterne er FORVALGT, første gang man åbner et scenarie (OD 31/8) — man
   fravælger det, man ikke skal bruge, i stedet for at samle listen op fra
   ingenting. Markøren f.brugSet husker, hvilke scenarier der er forvalgt, så
   et scenarie, hvor man bevidst har fjernet alt, ikke fyldes op igen næste gang
   siden tegnes. Selve scenariet lægges IKKE på turen her — det sker først, når
   man trykker "Tilføj og fortsæt planlægning". */
function forvælgBrug(id){
  const f = s.forberedelse; if(!f) return;
  const sat = f.brugSet || (f.brugSet = []);
  if(sat.includes(id)) return;
  sat.push(id);
  const d = MAD_SCENARIE_DETALJER[id];
  if(d){
    const arr = f.brugValg || (f.brugValg = []);
    d.brug.forEach(p=>{ if(!arr.includes(p.id)) arr.push(p.id); });
  }
  gem();
}
/* "Tilføj og fortsæt planlægning": nu lægges scenariet på turen, så det
   valgte kan nå pakkelisten, og man går videre til snacks. */
function tilføjScenarieOgVidere(id){
  if(!s.forberedelse) s.forberedelse = nyForberedelse();
  const f = s.forberedelse;
  if(!(f.madValg||[]).includes(id)) (f.madValg = f.madValg||[]).push(id);
  gem();
  gåTil('mad-snacks');
}
function skærmMadScenarie(id){
  const scenarie = MAD_VALG.find(x=>x.id===id);
  const d = MAD_SCENARIE_DETALJER[id];
  if(!scenarie || !d){ gåTil('mad'); return; }
  if(!s.forberedelse) s.forberedelse = nyForberedelse();
  forvælgBrug(id);
  const f = s.forberedelse;
  const valgte = f.brugValg || [];
  const egneListe = 'mad-'+id;
  const afsnit = tekst => (Array.isArray(tekst)?tekst:[tekst]).map(t=>`<p>${esc(t)}</p>`).join('');
  const brugRk = p => `
    <div class="liste-punkt" onclick="toggleBrugValg('${id}','${p.id}')" style="cursor:pointer">
      <div class="tjekboks ${valgte.includes(p.id)?'markeret':''}"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div>
      <div class="navn">${esc(p.tekst)}${p.tip?`<div class="dæmpet" style="font-size:12.5px;margin-top:2px">${esc(p.tip)}</div>`:''}</div>
    </div>`;
  $('indhold').innerHTML = `<div class="side anim">
    ${skærmTop(d.tagline, 'mad', d.nr+' · '+scenarie.tekst.toUpperCase())}
    <div class="kort guide-brød">${afsnit(d.intro)}</div>
    ${d.tip?`<div class="kort"><div class="etiket">Tip</div>${afsnit(d.tip)}</div>`:''}
    <div class="sektion"><h3>Sådan gør vi</h3></div>
    <div class="dæmpet" style="margin-bottom:14px">${afsnit(d.sådanGørVi)}</div>
    <div class="sektion"><h3>Det lille ekstra</h3></div>
    <div class="dæmpet" style="margin-bottom:14px">${afsnit(d.lilleEkstra)}</div>
    ${d.efter?`<div class="sektion"><h3>Efter måltidet</h3></div><div class="dæmpet" style="margin-bottom:14px">${afsnit(d.efter)}</div>`:''}
    <div class="sektion"><h3>${esc(d.brugTitel||'Det skal I bruge')}</h3></div>
    <p class="dæmpet" style="margin:0 0 6px">Fravælg punkter herunder du ikke skal bruge og/eller tilføj punkter i bunden du gerne vil medbringe.</p>
    ${d.brugIntro?`<p class="dæmpet" style="margin:0 0 10px">${esc(d.brugIntro)}</p>`:''}
    ${vælgAlleLinje('brugValg', [...d.brug, ...egne(egneListe)], id)}
    <div class="liste">
      ${d.brug.map(brugRk).join('')}
      ${egne(egneListe).map(p=>egetBrugRække(id, p, valgte)).join('')}
      ${egetFeltRække(egneListe,'Jeg vil også medbringe…')}
    </div>
    ${madTrinFod('mad','Tilføj og fortsæt planlægning',`tilføjScenarieOgVidere('${id}')`,'Se et andet madscenarie')}
  </div>`;
}
/* Et punkt man selv har skrevet under et scenarie. Samme tjekboks som de
   faste, plus et kryds til at slette det helt — det huskes ellers til næste
   tur ligesom de andre egne punkter. */
function egetBrugRække(scenarieId, p, valgte){
  return `<div class="liste-punkt" onclick="toggleBrugValg('${scenarieId}','${p.id}')" style="cursor:pointer">
    <div class="tjekboks ${valgte.includes(p.id)?'markeret':''}"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div>
    <div class="navn">${esc(p.tekst)}</div>
    <button class="eget-fjern" onclick="event.stopPropagation();fjernEgetPunkt('mad-${scenarieId}','${p.id}')" aria-label="Fjern punkt">${ik('kryds')}</button>
  </div>`;
}
/* ---- Trin 2: Snacks og drikkevarer — ÉN liste (OD 30/8). De to grupper
   "Til turen"/"Til aftenen" er væk; det er alligevel én indkøbstur. ---- */
function skærmMadSnacks(){
  const f = s.forberedelse || nyForberedelse();
  const valgte = f.snackValg || [];
  const næsteMål = flerdagsTur() ? 'mad-morgen' : null;
  $('indhold').innerHTML = `<div class="side anim">
    ${madTrinTop('Snacks og drikkevarer')}
    <div class="kort guide-brød">
      <p>Det absolut vigtigste på enhver tur: snacks og hygge.</p>
    </div>
    <div class="sektion"><h3>Det skal I overveje</h3></div>
    ${vælgAlleLinje('snackValg', SNACK_VALG.filter(p=>!p.del))}
    ${valgListe(SNACK_VALG.filter(p=>!p.del), valgte, 'toggleSnackValg')}
    <div class="sektion" style="margin-top:20px"><h3>Hvis ikke du har planlagt mad, mangler du måske:</h3></div>
    ${vælgAlleLinje('snackValg', SNACK_VALG.filter(p=>p.del===2))}
    ${valgListe(SNACK_VALG.filter(p=>p.del===2), valgte, 'toggleSnackValg')}
    ${madTrinFod('mad', næsteMål?'Næste':'Færdig', næsteMål?`gåTil('${næsteMål}')`:'forplejningFærdig()')}
  </div>`;
}
/* ---- Trin 3: Morgenmad (kun flerdages-ture) — rent informativt, ingen valg ---- */
function skærmMadMorgen(){
  const f = s.forberedelse || nyForberedelse();
  forvælgMorgen();
  const valgte = f.morgenValg || [];
  const afsnit = tekst => (Array.isArray(tekst)?tekst:[tekst]).map(t=>`<p>${esc(t)}</p>`).join('');
  const valgRk = p => `<div class="liste-punkt" onclick="toggleMorgenValg('${p.id}')" style="cursor:pointer">
    <div class="tjekboks ${valgte.includes(p.id)?'markeret':''}"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div>
    <div class="navn">${esc(p.tekst)}${p.tip?`<div class="dæmpet" style="font-size:12.5px;margin-top:2px">${esc(p.tip)}</div>`:''}</div>
  </div>`;
  $('indhold').innerHTML = `<div class="side anim">
    ${madTrinTop('Til morgenen')}
    <div class="kort guide-brød">
      <p>Tænk altid et måltid frem. Nogen gange er morgenerne her programmet rigtig starter andre gange kører vi videre eller også kører vi hjem.</p>
      <p>Derfor kan morgene være alt fra ingenting til en kop kaffe eller en banan og en kop vand til vi lander det næste sted.</p>
    </div>
    <div class="sektion"><h3>Sådan gør vi</h3></div>
    <p class="dæmpet" style="margin-bottom:14px">Vi elsker solopgange og at putte under dynen mens bagagerummet er åbent og lukker naturen ind.</p>
    <div class="sektion"><h3>Vores erfaring</h3></div>
    <div class="dæmpet" style="margin-bottom:14px">${afsnit([
      'Morgenen er meget rituelle og forskellig fra person til person. Vi har derfor valgt at man selv kan tilføje, det I har brug for på de åbne punkter herover.',
      'Vi elsker god kaffe og morgenbrød, så vi finder oftest en bager eller cafe i området.'
    ])}</div>
    <div class="sektion"><h3>Det lille ekstra</h3></div>
    <div class="dæmpet" style="margin-bottom:20px">${afsnit([
      'Der er virkelig mange gode brunch steder i Danmark.',
      'Husk det sidste punkt "personligt", så du ikke skal på cafe med strithår og morgenånde.'
    ])}</div>
    <!-- Huskelisten står NEDERST og teksten over (OD 31/8) — samme rækkefølge
         som madscenarierne fik 30/8: læs først, tag stilling bagefter. -->
    <div class="sektion"><h3>Tænk over disse ting</h3></div>
    ${vælgAlleLinje('morgenValg', [...MORGEN_VALG, ...egne('morgen')])}
    <div class="liste">
      ${MORGEN_VALG.map(valgRk).join('')}
      ${egne('morgen').map(p=>egetMorgenRække(p, valgte)).join('')}
      ${egetFeltRække('morgen','Skriv jeres eget punkt')}
    </div>
    ${madTrinFod('mad-snacks','Færdig','forplejningFærdig()')}
  </div>`;
}
/* Sidste trin i forplejningen. Det man har valgt, lander på pakkelisten — det
   skal siges tydeligt, ikke bare ske. Planlægger man i skjul (gave), kom man
   fra invitationens egen liste og skal tilbage dertil; ellers hjem til
   overblikket. */
function forplejningFærdig(){
  const f = s.forberedelse;
  const tilGave = f && f.invType==='gave' && f.invStatus!=='sendt';
  if(tilGave){
    tilbageTil('invitation');
    infoModal('Tingene er nu tilføjet din pakkeliste.', 'Videre');
    return;
  }
  /* Vi bliver stående på forplejningen bag modalen, indtil man har valgt vej —
     før hoppede appen hjem til overblikket og fortalte det bagefter. */
  valgModal('Forplejning på din arytme er nu planlagt. Emnerne er tilføjet pakkelisten. Du kan nu fortsætte planlægningen omkring bilen.', [
    { tekst:'Til overblik',        aktion:()=>tilbageTil('hjem') },
    { tekst:'Fortsæt planlægning', primær:true, aktion:()=>gåTil('bilen') }
  ]);
}

/* =============================================================
   5 · PAKKE — personlige ting
   ============================================================= */
/* Ingen strøget-streg her (KN 27/8): dette er stadig planlægning — punktet
   tilføjes turen, når det vælges. Det krydsede/strøgede hører kun til på
   "Klar til at pakke" (skærmKlarListe), som er en helt anden liste. */
function pakkeRække(p, tjek){
  const markeret = tjek.includes(p.id);
  return `
  <div class="liste-punkt" onclick="pakkeTjek('${p.id}')" style="cursor:pointer">
    <div class="tjekboks ${markeret?'markeret':''}"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div>
    <div class="navn">${p.tekst}${p.tip?`<div class="dæmpet" style="font-size:12.5px;margin-top:2px">${p.tip}</div>`:''}</div>
  </div>`;
}
/* Egne punkter: hver gang man har skrevet ét, dukker et nyt tomt felt op —
   så listen kan vokse uden at man skal trykke "tilføj felt" først.
   14/8: virker nu på tre lister (pakke · hygge · hund) og gemmer i
   s.egneTing, så det skrevne ligger der til næste tur. Udkastet i feltet
   holdes derimod i en almindelig variabel: det er ren visningstilstand,
   der kun skal overleve en gentegning, ikke en genstart. */
let egneUdkast = {};
let egneTæller = Date.now();
/* Hvilken valgliste et selvskrevet punkt hører hjemme i. Bruges til at
   markere det som VALGT med det samme (OD 30/8: "lige nu skal jeg trykke igen
   for at aktivere det") — at skrive noget ind ER at vælge det.
   'morgen' kom til 4/9: egne morgenpunkter følger nu morgenValg som alle de
   andre lister. Før tog morgenUdstyr() dem med ubetinget, og så kunne man
   ikke lade ét punkt blive hjemme på en enkelt tur uden at slette det helt. */
function egenValgliste(liste){
  if(liste.startsWith('mad-')) return 'brugValg';
  if(liste === 'hygge') return 'bilHuske';
  if(liste === 'morgen') return 'morgenValg';
  if(liste === 'pakke' || liste === 'hund') return 'pakkeTjek';
  return null;
}
function tilføjEgetPunkt(liste, værdi){
  const tekst = (værdi||'').trim();
  if(!tekst) return;
  if(!s.egneTing) s.egneTing = tommeEgneTing();
  if(!s.egneTing[liste]) s.egneTing[liste] = [];
  // Samme punkt to gange hjælper ingen — og det sker, når man trykker Enter
  // og "Tilføj" lige efter hinanden.
  let punkt = s.egneTing[liste].find(p=>p.tekst.toLowerCase()===tekst.toLowerCase());
  if(!punkt){
    punkt = { id:'eget-'+liste+'-'+egneTæller++, tekst };
    s.egneTing[liste].push(punkt);
  }
  // ... og markér det som valgt med det samme.
  const mål = egenValgliste(liste);
  const f = s.forberedelse;
  if(mål && f){
    const arr = f[mål] || (f[mål] = []);
    if(!arr.includes(punkt.id)) arr.push(punkt.id);
    // Et scenarie-punkt kan kun nå pakkelisten, hvis scenariet selv er med.
    if(mål==='brugValg'){
      const sid = liste.slice(4);
      if(!(f.madValg||[]).includes(sid)) (f.madValg = f.madValg||[]).push(sid);
    }
  }
  egneUdkast[liste] = '';
  gem(); tegn();
  const felt = $('eget-nyt-'+liste); if(felt) felt.focus();
}
function fjernEgetPunkt(liste, id){
  if(s.egneTing && s.egneTing[liste]) s.egneTing[liste] = s.egneTing[liste].filter(p=>p.id!==id);
  const f = s.forberedelse;
  if(f){
    f.pakkeTjek = (f.pakkeTjek||[]).filter(x=>x!==id);
    f.bilHuske  = (f.bilHuske||[]).filter(x=>x!==id);
    f.brugValg  = (f.brugValg||[]).filter(x=>x!==id);
    f.morgenValg = (f.morgenValg||[]).filter(x=>x!==id);
    /* klarTjek gemmer id'et PRÆFIKSET (p-, b-, ms-, mo-), så et rent
       !==id-filter ramte aldrig — punktet blev slettet, men lå og talte med
       som "pakket" på klar-listen. */
    const præfiks = ['p-','b-','ms-','mo-','s-'].map(x=>x+id);
    f.klarTjek  = (f.klarTjek||[]).filter(x=>!præfiks.includes(x));
  }
  gem(); tegn();
}
/* Rækken med det tomme felt. Ét sted, så pakkelisten, hyggelisten og hunden
   opfører sig ens — det var i forvejen den eneste rigtige måde at tilføje
   noget på i appen. */
function egetFeltRække(liste, pladsholder){
  return `<div class="liste-punkt eget-nyt-række">
    <span style="color:var(--rav);flex-shrink:0">${ik('plus')}</span>
    <input id="eget-nyt-${liste}" class="eget-felt" type="text" placeholder="${pladsholder}"
           value="${esc(egneUdkast[liste]||'')}"
           oninput="egneUdkast['${liste}']=this.value"
           onkeydown="if(event.key==='Enter'){event.preventDefault();tilføjEgetPunkt('${liste}',this.value)}">
    <button class="eget-tilføj" onclick="tilføjEgetPunkt('${liste}',$('eget-nyt-${liste}').value)">Tilføj</button>
  </div>`;
}
/* Én række på pakkelisten — også for dem, man selv har skrevet. Egne punkter
   har et kryds til at fjerne dem igen; appens egne har ikke. */
function egenRække(liste, p, tjek){
  return `<div class="liste-punkt">
    <div class="tjekboks ${tjek.includes(p.id)?'markeret':''}" onclick="pakkeTjek('${p.id}')" style="cursor:pointer"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div>
    <div class="navn" onclick="pakkeTjek('${p.id}')" style="cursor:pointer">${esc(p.tekst)}</div>
    <button class="eget-fjern" onclick="fjernEgetPunkt('${liste}','${p.id}')" aria-label="Fjern punkt">${ik('kryds')}</button>
  </div>`;
}
/* Samme egne-punkter-mekanik som pakke/hygge/hund. Punktet har nu sin egen
   tjekboks (KN 4/9): appen husker det fra tur til tur og sætter det på igen —
   men man skal kunne fravælge det på DENNE tur uden at miste det. Krydset er
   stadig det eneste, der får appen til at glemme punktet helt. */
function egetMorgenRække(p, valgte){
  const markeret = (valgte||[]).includes(p.id);
  return `<div class="liste-punkt" onclick="toggleMorgenValg('${p.id}')" style="cursor:pointer">
    <div class="tjekboks ${markeret?'markeret':''}"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></div>
    <div class="navn">${esc(p.tekst)}</div>
    <button class="eget-fjern" onclick="event.stopPropagation();fjernEgetPunkt('morgen','${p.id}')" aria-label="Fjern punkt">${ik('kryds')}</button>
  </div>`;
}
function sætHundMed(på){
  if(!s.forberedelse) s.forberedelse = nyForberedelse();
  s.forberedelse.hundMed = på;
  /* Slår man hunden fra igen, skal dens afkrydsninger ikke blive hængende og
     tælle med i "6 af 6 pakket". */
  if(!på){
    const hundeId = new Set([...HUND_PUNKTER, ...egne('hund')].map(p=>p.id));
    s.forberedelse.pakkeTjek = (s.forberedelse.pakkeTjek||[]).filter(x=>!hundeId.has(x));
  }
  gem(); tegn();
}
function skærmPakke(){
  const f = s.forberedelse || nyForberedelse();
  const tjek = f.pakkeTjek || [];
  const hund = [...HUND_PUNKTER, ...egne('hund')];
  const hundKlaret = hund.filter(p=>tjek.includes(p.id)).length;
  $('indhold').innerHTML = `<div class="side anim">
    ${sektionHeader('pakke')}
    <div class="kort guide-brød">
      <p>Når man holder arytmer i bilen, er det essentielle at pakke så lidt og let som muligt. Det er dog også vigtigt at have det med, man har brug for.</p>
      <p>Vi har herunder lavet en liste med ting, du kan krydse af, som er vigtige på turen.</p>
      <p class="citat" style="margin-bottom:0">OBS: Giver du denne arytme som gave, bliver de personlige punkter tilføjet din ledsagers liste med ting at huske.</p>
    </div>
    ${vælgAlleLinje('pakkeTjek', [...PAKKE_PUNKTER, ...egne('pakke')])}
    <div class="liste">
      ${PAKKE_PUNKTER.map(p=>pakkeRække(p,tjek)).join('')}
      ${egne('pakke').map(p=>egenRække('pakke',p,tjek)).join('')}
      ${egetFeltRække('pakke','Skriv dit eget punkt')}
    </div>

    <!-- Hunden (OD 13/8): egen foldbar rubrik, så den ikke fylder for dem,
         der ikke har hund med. Punkterne tæller først med, når den er slået til. -->
    <div class="liste">
      <div class="liste-punkt bil-emne" onclick="sætHundMed(${f.hundMed?'false':'true'})" style="cursor:pointer">
        <span style="color:var(--rav);flex-shrink:0">${ik('blad')}</span>
        <div class="navn">Vi har hund med
          <div class="dæmpet" style="font-size:12.5px;margin-top:2px">${f.hundMed
            ? `${hundKlaret} af ${hund.length} valgt`
            : 'Tryk for at føje hundens ting til listen'}</div>
        </div>
        <span class="bil-pil ${f.hundMed?'åben':''}">${ik('pil')}</span>
      </div>
      ${f.hundMed ? `
      <div class="bil-krop" style="padding-bottom:0;border-bottom:none">
        ${vælgAlleLinje('pakkeTjek', [...HUND_PUNKTER, ...egne('hund')])}
        ${HUND_PUNKTER.map(p=>pakkeRække(p,tjek)).join('')}
        ${egne('hund').map(p=>egenRække('hund',p,tjek)).join('')}
        ${egetFeltRække('hund','Andet til hunden')}
      </div>` : ''}
    </div>

    ${f.destination?`<p class="dæmpet" style="font-size:13px">Destination: ${esc(f.destination.navn)} — ${f.destination.testetId==='t1'?'tag badetøjet med, I er ved vandet.':'tjek om der er badevand i nærheden.'}</p>`:''}
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
   LOG SPONTAN TUR / ANMELDELSE — én pop-up, to indgange
   =============================================================
   Fuldskærms-anmeldelsen er væk (KN 4/9). Den lå bag knappen "Vil du gemme
   din tur", og den knap findes ikke længere — turene logges selv. Tilbage er
   ét lille skema med dato, sted og de tre spørgsmål, og det bruges to steder:

     logSpontanModal()   — turen I bare tog, skrevet ind bagefter (forsiden)
     logSpontanModal(n)  — anmeld eller ret s.ture[n] (Dine arytmer)

   Kladden lever i en almindelig variabel og ikke i s: den skal overleve en
   gentegning af selve pop-uppen, ikke en genstart af appen. */
let spontanKladde = null;
function logSpontanModal(n){
  const gammel = document.getElementById('spontan-modal');
  if(gammel) gammel.remove();
  const redigerer = typeof n === 'number';
  const t = redigerer ? s.ture[n] : null;
  if(redigerer && !t) return;
  spontanKladde = t
    ? { n, dato: t.dato || '', sted: t.sted || '',
        destination: (t.score && t.score.destination) || 0,
        app: (t.score && t.score.app) || 0,
        hygge: (t.score && t.score.hygge) || 0,
        kommentar: t.kommentar || '' }
    : { n: null, dato: new Date().toISOString().slice(0,10), sted: '',
        destination: 0, app: 0, hygge: 0, kommentar: '' };
  const div = document.createElement('div');
  div.id = 'spontan-modal';
  div.className = 'modal-bag';
  div.innerHTML = '<div class="modal-kort spontan-kort" id="spontan-kort"></div>';
  document.body.appendChild(div);
  div.addEventListener('click', e => { if(e.target === div) lukSpontanModal(); });
  tegnSpontanModal();
}
function lukSpontanModal(){
  const div = document.getElementById('spontan-modal');
  if(div) div.remove();
  spontanKladde = null;
}
/* Tekstfelterne gemmer UDEN gentegning — ellers mister man markøren midt i en
   sætning (samme grund som gemMinde() i loggen). Prikkerne skal derimod tegnes
   om, for det er dem, der viser svaret. */
function spontanFelt(felt, værdi){ if(spontanKladde) spontanKladde[felt] = værdi; }
function spontanBedøm(felt, tal){ if(spontanKladde){ spontanKladde[felt] = tal; tegnSpontanModal(); } }
function tegnSpontanModal(){
  const kort = document.getElementById('spontan-kort');
  const k = spontanKladde;
  if(!kort || !k) return;
  const bedøm = (felt, tekst) => `
    <div class="bedøm-række"><span style="font-size:14px;flex:1">${tekst}</span>
      <div class="prikker">${[1,2,3,4,5].map(tal =>
        `<button class="prik-valg ${k[felt] >= tal ? 'valgt' : ''}" onclick="spontanBedøm('${felt}',${tal})">${tal}</button>`).join('')}
      </div>
    </div>`;
  kort.innerHTML = `
    <div class="etiket">${k.n === null ? 'Log spontan tur' : 'Anmeld turen'}</div>
    <p style="margin:6px 0 4px">${k.n === null
      ? 'Turen I bare tog. Skriv den ind, så tæller den med i året.'
      : 'Anmeldelsen er kun til eget forbrug, så du kan bruge den til kommende ture.'}</p>
    <label class="felt-etiket">Dato</label>
    <input type="date" value="${k.dato}" onchange="spontanFelt('dato',this.value)">
    <label class="felt-etiket">Destination</label>
    <input type="text" placeholder="Hvor kørte I hen?" value="${esc(k.sted)}" oninput="spontanFelt('sted',this.value)">
    <div style="border-top:1px solid var(--linje);margin:18px 0 0"></div>
    ${bedøm('destination','Hvor god var destinationen?')}
    ${bedøm('app','Hvor nemt var det med Arytmi-appen?')}
    ${bedøm('hygge','Hvor hyggelig var turen for jer?')}
    <label class="felt-etiket">Kommentar (helt frivilligt)</label>
    <textarea placeholder="Skriv løs — eller lad være" oninput="spontanFelt('kommentar',this.value)">${esc(k.kommentar)}</textarea>
    <div class="modal-knapper">
      <button class="knap kontur bred" onclick="lukSpontanModal()">Fortryd</button>
      <button class="knap primær bred" onclick="gemSpontanTur()">Gem</button>
    </div>`;
}
function gemSpontanTur(){
  const k = spontanKladde;
  if(!k) return;
  if(!k.dato){ flash('Vælg en dato for turen.', 'klokke'); return; }
  const harScore = !!(k.destination || k.app || k.hygge);
  const ny = {
    sted: (k.sted || '').trim() || 'Spontan tur',
    dato: k.dato,
    score: harScore ? { destination:k.destination, app:k.app, hygge:k.hygge } : null,
    kommentar: (k.kommentar || '').trim()
  };
  const førstegang = k.n === null;
  if(førstegang){
    s.ture.unshift({ ...ny, minde: '', plan: null });
  } else {
    // minde og plan er turens egne — de må ikke ryge, fordi man retter en score
    const t = s.ture[k.n];
    if(t) Object.assign(t, ny);
  }
  gem(); lukSpontanModal();
  nulstilHistorik(); gåTil('log');
  flash(førstegang ? 'Turen er logget.' : 'Anmeldelsen er gemt.', 'tjek');
}

/* Det man selv skriver om turen bagefter — "bryllupsdag i solen", "alt
   kiksede men fantastisk udsigt" (OD 30/8). Gemmes pr. tur i loggen og kan
   rettes når som helst. */
function gemMinde(n, værdi){
  if(!s.ture[n]) return;
  s.ture[n].minde = værdi;
  gem();   // ingen tegn(): så mister feltet fokus midt i en sætning
}
/* Gentag tur: bygger en ny forberedelse ud fra det, turen bestod af, og
   sender brugeren gennem flowet igen — nu med mulighed for at rette.
   Datoen sættes IKKE, så man selv vælger hvornår. Ture logget før 30/8 har
   intet snapshot og får ingen knap. */
function gentagTur(n){
  const t = s.ture[n];
  if(!t || !t.plan){ flash('Denne tur blev gemt, før appen kunne gentage ture.', 'klokke'); return; }
  if(s.forberedelse){
    bekræft('Du har allerede en tur i gang. Skal den erstattes af denne?', ()=>startGentagelse(t));
    return;
  }
  startGentagelse(t);
}
function startGentagelse(t){
  s.forberedelse = nyForberedelse({ ...t.plan, fase:2 });
  gem(); nulstilHistorik(); gåTil('hjem');
  flash('Turen er hentet frem igen — ret det, I vil have anderledes.', 'tjek');
}

/* =============================================================
   LOG
   ============================================================= */
function bølge(n){ return `<span class="bølger">${'●'.repeat(n||0)}${'○'.repeat(5-(n||0))}</span>`; }
/* Året som et ur: hver afholdt tur er en prik dér, hvor den ligger på årets
   runde. Hjulet bor nu i loggens header oven på hero-scenen (KN 4/9) — før
   fyldte det et helt kort midt i listen. Derfor lyse streger på mørk bund, og
   diameteren gives med som argument i stedet for at være låst til 232 px. */
function årshjulSVG(px){
  const iÅr = new Date().getFullYear();
  const tureIÅr = s.ture.filter(t=>t.dato && String(t.dato).startsWith(String(iÅr)));
  const R = 90, C = 120;
  const vink = f => f*2*Math.PI - Math.PI/2;
  const sæsoner = [
    {fra:11/12, til:14/12, farve:'#8fa8b8'},{fra:2/12, til:5/12, farve:'#93ac8b'},
    {fra:5/12, til:8/12, farve:'#d9b48c'},{fra:8/12, til:11/12, farve:'#c08d5a'}
  ];
  const pkt = (v,r) => `${C+r*Math.cos(v)} ${C+r*Math.sin(v)}`;
  const buer = sæsoner.map(sæ=>`<path d="M ${pkt(vink(sæ.fra),R)} A ${R} ${R} 0 0 1 ${pkt(vink(sæ.til),R)}" fill="none" stroke="${sæ.farve}" stroke-width="4.5" stroke-linecap="round" opacity=".92"/>`).join('');
  let prikker = '';
  tureIÅr.forEach((t,i)=>{
    const d = new Date(t.dato+'T12:00:00');
    const v = vink(((d-new Date(iÅr,0,1))/86400000)/365);
    prikker += `<circle class="års-prik" style="animation-delay:${i*.4}s" cx="${C+R*Math.cos(v)}" cy="${C+R*Math.sin(v)}" r="7" fill="#e8d5ae" stroke="#26201a" stroke-width="2.5"/>`;
  });
  let mdrTegn = '';
  for(let m=0;m<12;m++){
    const v = vink(m/12);
    mdrTegn += `<text x="${C+(R+20)*Math.cos(v)}" y="${C+(R+20)*Math.sin(v)+4}" text-anchor="middle" font-size="11" fill="rgba(246,243,234,.7)">${'JFMAMJJASOND'[m]}</text>`;
  }
  const d = px || 132;
  return `<svg class="års-ur" viewBox="0 0 240 240" width="${d}" height="${d}" aria-hidden="true">
    <circle cx="${C}" cy="${C}" r="${R}" fill="rgba(20,16,11,.3)" stroke="rgba(246,243,234,.3)" stroke-width="1.5"/>
    ${buer}${mdrTegn}${prikker}
    <text x="${C}" y="${C-2}" text-anchor="middle" font-size="46" font-weight="600" fill="#f6f3ea" font-family="Iowan Old Style,Palatino,Georgia,serif">${tureIÅr.length}</text>
    <text x="${C}" y="${C+22}" text-anchor="middle" font-size="13" fill="rgba(246,243,234,.75)">${tureIÅr.length===1?'tur':'ture'} i år</text>
  </svg>`;
}
/* Regnereglerne for "er turen klar" bor i forplejningKlar(), bilenKlar() og
   planTrinKlaret() — og de læser alle sammen s.forberedelse. For at kunne vise
   status på en tur, man IKKE sidder i, peger vi kort aktivId derhen og stiller
   det samme spørgsmål. Det er med vilje frem for at skrive reglerne af én gang
   til: to sæt regler ville drive fra hinanden, første gang OD ændrer en af dem. */
function medTur(a, fn){
  const før = s.aktivId;
  s.aktivId = a.id;
  try { return fn(); } finally { s.aktivId = før; }
}
function turStatus(a){
  return medTur(a, ()=>{
    const items = tjeklisteData();
    return {
      klaret: items.filter(i=>i.klar).length,
      total: items.length,
      færdig: planTrinKlaret(),
      /* Pakkelisten krydses af i klarTjek — ikke i pakkeTjek, som er
         planlægningens Personligt-liste. De to blev forvekslet her og i
         pakkeOpsummering(), så tælleren viste "6 af 19", mens selve
         pakkelisten sagde "0 af 19". */
      pakket: pakkeListe().filter(p=>(a.klarTjek||[]).includes(p.id)).length,
      pakkeTotal: pakkeListe().length,
      // alt pakket → turen er kørt, og kan gemmes i loggen (OD 31/8)
      pakketFærdig: klarKlaret()
    };
  });
}
function åbnTurplan(id){ vælgTur(id); gåTil('turplan'); }
function fortsætPlanlægning(id){ vælgTur(id); gåTil('hjem'); }
function åbnPakkeliste(id){ vælgTur(id); gåTil('klar-pakke'); }
/* En tur, der intet indeholder endnu. Datoen tæller ikke med: den sættes
   automatisk til i dag, når turen oprettes, så den siger intet om, hvorvidt
   nogen har taget stilling til noget. */
function tomKladde(a){
  const set = a.set || {};
  return !a.destination && !set.mad && !set.bilen && !a.invType
    && !(a.pakkeTjek||[]).length && !(a.klarTjek||[]).length;
}
/* Ny tur oprettes både herfra og fra forsiden (OD 31/8). Den forrige bliver
   liggende som kommende tur — det er hele pointen.

   Men: ligger der allerede en tom kladde, fortsætter vi i DEN. Ellers ville
   tre tryk på knappen give tre identiske tomme ture i listen, og der er ingen
   sletteknap på kortene (turen annulleres inde i den selv). Med flere ture
   ville listen stille og roligt fyldes med tomme rækker, man ikke kan komme
   af med. */
function nyArytme(){
  const tom = s.arytmer.find(tomKladde);
  if(tom){ vælgTur(tom.id); gåTil('turdato'); return; }
  s.forberedelse = nyForberedelse();
  gem(); nulstilHistorik(); gåTil('turdato');
}
/* "Næste arytme" hænger på DATOEN, ikke på hvilken tur man sidst åbnede.
   De to er ikke det samme: åbner man den tur, der ligger om tre uger, er den
   stadig ikke den næste — og et mærkat, der flytter sig efter, hvor man sidst
   trykkede, fortæller ingenting. */
function kommendeKort(a){
  const st = turStatus(a);
  const dage = dageTil(a.dato);
  const sted = a.destination ? esc(a.destination.navn) : 'Sted ikke valgt endnu';
  const næste = næsteArytme();
  const nu = !!(næste && næste.id === a.id);
  const naar = a.dato
    ? pænDato(a.dato) + ((dage!==null && dage>=0) ? ' · ' + (dage===0?'i dag':dage===1?'i morgen':'om '+dage+' dage') : '')
    : 'Ingen dato endnu';
  const linje = st.pakketFærdig
    ? 'Klar til at tage afsted'
    : st.færdig
      ? 'Planlagt · ' + st.pakket + ' af ' + st.pakkeTotal + ' pakket'
      : 'Planlægningen er i gang · ' + st.klaret + ' af ' + st.total + ' på plads';
  return `
    <div class="tur-kort${nu?' aryt-nu':''}">
      ${nu?'<div class="etiket" style="margin-bottom:6px">Næste arytme</div>':''}
      <h3>${sted}</h3>
      <div class="dato" style="margin-top:4px">${naar}</div>
      <div class="dæmpet" style="font-size:13px;margin-top:6px">${linje}</div>
      <div class="aryt-knapper">
        <button class="knap kontur bred lille" onclick="åbnTurplan('${a.id}')">${ik('bog')} Se/ret turplan</button>
        ${st.færdig
          ? `<button class="knap primær bred lille" onclick="åbnPakkeliste('${a.id}')">${ik('tjek')} Hent pakkeliste</button>`
          : `<button class="knap primær bred lille" onclick="fortsætPlanlægning('${a.id}')">${ik('pil')} Færdiggør planlægning</button>`}
      </div>
    </div>`;
}
function skærmLog(){
  const tomt = !s.ture.length;
  const kommende = s.arytmer.slice().sort((a,b)=>(a.dato||'9999')<(b.dato||'9999')?-1:1);
  /* Afholdte ture sorteres på TURENS dato, ikke på hvornår den blev skrevet
     ind (KN 4/9). Det oprindelige indeks følger med i n, fordi gemMinde() og
     gentagTur() og anmeldelsen skriver direkte i s.ture[n]. Sorterede man
     selve s.ture, ville de indeks pege på en anden tur næste gang. */
  const afholdte = s.ture.map((t,n)=>({t,n}))
    .sort((a,b)=>String(b.t.dato||'').localeCompare(String(a.t.dato||'')));
  $('indhold').innerHTML = `
  <div class="ned-hero">
    ${heroScene('klar', 340)}
    <div class="ned-lag">
      <div class="ned-top"><div class="h-logo">${logoSVG(true)}</div></div>
      <!-- Årshjulet er flyttet herop (KN 4/9). Det fyldte et helt kort midt i
           listen; her er det halvt så stort og laver samtidig den samme
           signatur som nedtællingsforsiden og "Turen er planlagt". -->
      <div class="log-hoved">
        <div>
          <div class="ned-label">Jeres ture</div>
          <h1 class="log-titel">Dine arytmer</h1>
        </div>
        ${årshjulSVG(132)}
      </div>
      <!-- Samme runde knap som forsidens "Start her" (KN 4/9): at starte en ny
           arytme skal se ens ud, uanset hvor i appen man står. -->
      <div class="rund-start log-start">
        <button class="rund-knap med-ord" onclick="nyArytme()" aria-label="Planlæg en ny arytme">
          <span class="rk-ring"></span>${pulsIKnap()}<span class="rk-ord">Ny arytme</span>
        </button>
      </div>
    </div>
  </div>
  <div class="tjek-blok">
    ${kommende.length ? `
    <h2 class="aryt-sektion" style="margin-top:6px">Kommende ture</h2>
    ${kommende.map(kommendeKort).join('')}` : ''}
    ${(kommende.length && !tomt) ? '<h2 class="aryt-sektion">Afholdte ture</h2>' : ''}
    ${tomt ? `
    <div class="kort tom-tilstand" style="margin-top:18px">
      <div style="color:var(--rav);margin-bottom:12px"><svg class="ik" style="width:44px;height:44px" viewBox="0 0 24 24">${IKONER.måne}</svg></div>
      <h3>${kommende.length ? 'Ingen afholdte ture endnu.' : 'Ingen ture endnu.'}</h3>
      <p class="dæmpet" style="margin-top:8px">Den første bliver den, I husker bedst.</p>
    </div>` : afholdte.map(({t,n})=>`
    <div class="tur-kort">
      <div class="top"><h3>${esc(t.sted)}</h3><span class="dato">${pænDato(t.dato)}</span></div>
      ${t.score ? `
      <div style="display:flex;gap:14px;margin-top:10px;flex-wrap:wrap;font-size:12.5px;color:var(--dæmpet)">
        <span>Destination ${bølge(t.score.destination)}</span>
        <span>Appen ${bølge(t.score.app)}</span>
        <span>Hygge ${bølge(t.score.hygge)}</span>
      </div>` : `<div class="dæmpet" style="font-size:13px;margin-top:6px">Ikke anmeldt</div>`}
      ${t.kommentar?`<p style="font-size:14px;margin-top:10px"><b style="color:var(--gran)">Kommentar:</b> ${esc(t.kommentar)}</p>`:''}
      <!-- Jeres eget minde om turen (OD 30/8). Gemmes ved hvert tastetryk,
           men uden gentegning — ellers mistede feltet fokus midt i en sætning. -->
      <label class="felt-etiket">Hvad skal I huske fra turen?</label>
      <textarea placeholder="Fx bryllupsdag i solen, eller: alt kiksede, men fantastisk udsigt"
                oninput="gemMinde(${n}, this.value)">${esc(t.minde||'')}</textarea>
      <!-- Anmeldelsen bor i samme pop-up som "Log spontan tur" (KN 4/9). Den
           fuldskærms-anmeldelse er væk sammen med "Vil du gemme din tur":
           turene logges nu selv, og anmeldelsen er noget man KAN gøre
           bagefter — ikke en port, man skal igennem for at få turen gemt. -->
      <div class="aryt-knapper">
        <button class="knap kontur bred lille" onclick="logSpontanModal(${n})">${ik('puls')} ${t.score?'Ret anmeldelsen':'Anmeld turen'}</button>
        ${t.plan?`<button class="knap kontur bred lille" onclick="gentagTur(${n})">${ik('puls')} Gentag turen</button>`:''}
      </div>
    </div>`).join('')}
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
        <span style="color:var(--rav)">${ik('klokke')}</span><h3>Beskeder</h3>
        <span style="margin-left:auto" class="serif">${p.notifikationer?'Til':'Fra'}</span>
      </div>
      <p class="dæmpet" style="font-size:13.5px">OBS: For at vi kan hjælpe jer med at planlægge turen, sender Arytmi beskeder til din telefon. Vi sender aldrig beskeder, der ikke er med til at gøre din oplevelse bedre.</p>
      ${p.notifikationer
        ? `<p class="dæmpet" style="font-size:13.5px;margin-top:8px">Fylder beskederne for meget, kan du altid slå dem fra her.</p>`
        : `<div class="advarsel" style="margin-top:12px">Beskederne er slået fra. Det gør oplevelsen med appen dårligere — vi kan ikke minde jer om turen undervejs.</div>`}
      <button class="knap ${p.notifikationer?'kontur':'primær'} bred" style="margin-top:12px" onclick="s.profil.notifikationer=!s.profil.notifikationer;gem();tegn()">
        ${p.notifikationer?'Slå beskeder fra':'Slå beskeder til'}
      </button>
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
  // Passerede ture flytter selv ned i loggen (KN 4/9), FØR skærmen tegnes —
  // ellers ville forsiden nå at vise en tur, der ligger bag os, som "kommende".
  logAfholdteTure();
  sikrAktivTur();
  switch(true){
    case aktivSkærm==='hjem':         skærmHjem(); break;
    case aktivSkærm==='hurtig':       skærmHurtig(); break;
    case aktivSkærm==='turdato':      skærmTurDato(); break;
    case aktivSkærm==='hvorfra':      skærmHvorfra(); break;
    case aktivSkærm==='hvorlangt':    skærmHvorLangt(); break;
    case aktivSkærm==='onsker':       skærmØnsker(); break;
    case aktivSkærm==='forslag':      skærmForslag(); break;
    case aktivSkærm==='destination':  skærmDestination(); break;
    case aktivSkærm==='bilen':        skærmBilen(0); break;
    case aktivSkærm.startsWith('bilen-'): skærmBilen(aktivSkærm.slice(6)); break;
    /* 'mad' er nu selve madscenarie-listen — mellemsiden er væk (OD 30/8).
       Gamle dybe links til de slettede trin lander samme sted. */
    case aktivSkærm==='mad':          skærmMadValg(); break;
    case aktivSkærm==='mad-tidsplan': case aktivSkærm==='mad-valg':
    case aktivSkærm.startsWith('mad-udstyr'): skærmMadValg(); break;
    case aktivSkærm.startsWith('mad-scenarie-'): skærmMadScenarie(aktivSkærm.slice(13)); break;
    case aktivSkærm==='mad-snacks':      skærmMadSnacks(); break;
    case aktivSkærm==='mad-morgen':      skærmMadMorgen(); break;
    case aktivSkærm==='pakke':        skærmPakke(); break;
    // 'klar-sidste' er slettet (OD 30/8) — indholdet ligger nu i pakkelistens
    // egne underlister. Gamle dybe links lander samme sted.
    case aktivSkærm==='klar-pakke': case aktivSkærm==='klar-sidste':
      skærmKlarListe(); break;
    case aktivSkærm==='log':          skærmLog(); break;
    case aktivSkærm==='profil':       skærmProfil(); break;
    case aktivSkærm==='invitation':      skærmInvitation(); break;
    case aktivSkærm==='turplan':         skærmTurplan(); break;
    case aktivSkærm.startsWith('testet-'): skærmTestet(aktivSkærm.slice(7)); break;
    default: skærmHjem();
  }
  // fuldskærms-forsiden skal ikke kunne scrolle på et tomt felt — men
  // nedtællings-forsiden (dato sat) er en almindelig side der skal kunne scrolle
  const nedtælling = s.forberedelse && s.forberedelse.dato;
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
