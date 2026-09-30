/* Live Agent Watch · working model · simulated data */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const $ = id => document.getElementById(id);
  const rnd = n => Math.floor(Math.random() * n);
  const pick = a => a[rnd(a.length)];

  // ---------- network of sensors ----------
  const S = [
    // Australia + NZ
    ['Camden Council','Government','AU',150.7,-34.05],['Parramatta Council','Government','AU',151.0,-33.8],['NSW Health portal','Health','AU',151.2,-33.87],['Wollongong Council','Government','AU',150.9,-34.42],['Newcastle water','Utilities','AU',151.75,-32.93],['Central Coast Council','Government','AU',151.3,-33.4],['UNSW student portal','Education','AU',151.23,-33.92],['Sydney boutique store','Online shop','AU',151.21,-33.88],['Victorian health service','Health','AU',144.96,-37.81],['Geelong Council','Government','AU',144.35,-38.15],['Ballarat Council','Government','AU',143.85,-37.56],['Monash portal','Education','AU',145.13,-37.91],['Melbourne SaaS product','Software','AU',144.97,-37.8],['Brisbane City Council','Government','AU',153.02,-27.47],['Gold Coast Council','Government','AU',153.4,-28.0],['Sunshine Coast Health','Health','AU',153.1,-26.65],['Toowoomba Council','Government','AU',151.95,-27.56],['Cairns Regional Council','Government','AU',145.77,-16.92],['Townsville Health','Health','AU',146.82,-19.26],['Adelaide Council','Government','AU',138.6,-34.93],['SA Health portal','Health','AU',138.6,-34.9],['City of Perth','Government','AU',115.86,-31.95],['WA Health portal','Health','AU',115.9,-31.9],['Darwin Council','Government','AU',130.84,-12.46],['Hobart Council','Government','AU',147.33,-42.88],['Canberra ACT portal','Government','AU',149.13,-35.28],['Bundaberg Council','Government','AU',152.35,-24.87],['Penrith Council','Government','AU',150.69,-33.75],['Broome Council','Government','AU',122.24,-17.96],['Alice Springs Council','Government','AU',133.88,-23.7],['Orange dental clinic','Small business','AU',149.1,-33.28],['Auckland bookings site','Online shop','NZ',174.76,-36.85],['Wellington ministry portal','Government','NZ',174.78,-41.29],['Christchurch clinic','Health','NZ',172.63,-43.53],
    // Asia
    ['Singapore fintech app','Finance','SG',103.82,1.35],['KL retail store','Online shop','MY',101.69,3.14],['Jakarta ticketing site','Online shop','ID',106.85,-6.21],['Manila membership site','Software','PH',120.98,14.6],['Bangkok hotel site','Online shop','TH',100.5,13.75],['Ho Chi Minh SaaS','Software','VN',106.66,10.76],['Hong Kong brokerage','Finance','HK',114.17,22.32],['Taipei agency portal','Government','TW',121.56,25.03],['Tokyo e-commerce','Online shop','JP',139.69,35.69],['Osaka clinic network','Health','JP',135.5,34.69],['Seoul SaaS','Software','KR',126.98,37.57],['Mumbai booking site','Online shop','IN',72.88,19.08],['Bengaluru SaaS','Software','IN',77.59,12.97],['Delhi education portal','Education','IN',77.21,28.61],
    // Middle East + Africa
    ['Dubai marketplace','Online shop','AE',55.27,25.2],['Riyadh services portal','Government','SA',46.68,24.71],['Tel Aviv SaaS','Software','IL',34.78,32.08],['Cairo university portal','Education','EG',31.24,30.04],['Nairobi payments app','Finance','KE',36.82,-1.29],['Lagos marketplace','Online shop','NG',3.38,6.52],['Johannesburg insurer','Finance','ZA',28.05,-26.2],['Cape Town booking site','Online shop','ZA',18.42,-33.92],
    // Europe
    ['London council portal','Government','GB',-0.12,51.5],['Manchester NHS trust','Health','GB',-2.24,53.48],['Edinburgh university','Education','GB',-3.19,55.95],['Dublin SaaS','Software','IE',-6.26,53.35],['Paris retailer','Online shop','FR',2.35,48.86],['Lyon clinic','Health','FR',4.83,45.76],['Berlin startup','Software','DE',13.4,52.52],['Munich insurer','Finance','DE',11.58,48.14],['Amsterdam marketplace','Online shop','NL',4.9,52.37],['Brussels ministry','Government','BE',4.35,50.85],['Madrid utility','Utilities','ES',-3.7,40.42],['Barcelona bookings','Online shop','ES',2.17,41.39],['Lisbon SaaS','Software','PT',-9.14,38.72],['Rome agency portal','Government','IT',12.5,41.9],['Milan retailer','Online shop','IT',9.19,45.46],['Zurich bank','Finance','CH',8.54,47.38],['Vienna hospital','Health','AT',16.37,48.21],['Stockholm SaaS','Software','SE',18.07,59.33],['Oslo municipality','Government','NO',10.75,59.91],['Copenhagen retailer','Online shop','DK',12.57,55.68],['Helsinki university','Education','FI',24.94,60.17],['Warsaw ministry','Government','PL',21.01,52.23],['Prague SaaS','Software','CZ',14.42,50.08],['Athens tourism site','Online shop','GR',23.73,37.98],['Istanbul marketplace','Online shop','TR',28.98,41.01],
    // Americas
    ['New York fintech','Finance','US',-74.0,40.71],['Boston hospital','Health','US',-71.06,42.36],['Washington agency','Government','US',-77.04,38.9],['Atlanta retailer','Online shop','US',-84.39,33.75],['Miami bookings','Online shop','US',-80.19,25.76],['Chicago SaaS','Software','US',-87.63,41.88],['Dallas utility','Utilities','US',-96.8,32.78],['Denver county portal','Government','US',-104.99,39.74],['Seattle SaaS','Software','US',-122.33,47.61],['San Francisco startup','Software','US',-122.42,37.77],['Los Angeles clinic','Health','US',-118.24,34.05],['Toronto SaaS','Software','CA',-79.38,43.65],['Vancouver city portal','Government','CA',-123.12,49.28],['Mexico City marketplace','Online shop','MX',-99.13,19.43],['Bogota bank','Finance','CO',-74.07,4.71],['Lima ministry','Government','PE',-77.03,-12.05],['Santiago SaaS','Software','CL',-70.67,-33.45],['Sao Paulo retailer','Online shop','BR',-46.63,-23.55],['Rio clinic','Health','BR',-43.17,-22.91],['Buenos Aires utility','Utilities','AR',-58.38,-34.6]
  ].map((s, i) => ({ id: i, name: s[0], sector: s[1], cc: s[2], lon: s[3], lat: s[4] }));

  const FAMILIES = [
    { id: 'A', said: 'Says it is a browser agent from a large AI company', name: 'Named browser agent', route: 'Website-scanning service' },
    { id: 'B', said: 'Possible API agent (does not name itself)', name: 'Possible API agent', route: 'Direct, rotating addresses' },
    { id: 'C', said: 'Possible open-source agent stack', name: 'Possible open-source agent', route: 'Residential proxy' },
    { id: 'D', said: 'Unknown automation', name: 'Unknown automation', route: 'Cloud fetch service' }
  ];
  const LEVELS = ['', 'Read', 'Map', 'Probe', 'Attempt', 'Got in'];
  const COLORS = ['', 'var(--l1)', 'var(--l2)', 'var(--l3)', 'var(--l4)', 'var(--l5)'];
  const DID = { 1: 'read public pages', 2: "listed the site's pages, forms and entry points", 3: 'tested forms, logins or limits', 4: 'tried a known break-in trick', 5: 'got past an access control (owner confirmed)' };
  const SIGNS = ['Came through a scanning service', 'Kept retrying after being refused', 'Read error pages closely', 'Hunted for hidden entry points', 'Moved at machine speed', 'Visited the canary', 'Says it is an agent'];

  let sessions = [], incidents = [], minLvl = 1, sectorF = 'all', vendorF = 'all';
  const now = Date.now();
  function mk(site, fam, lvl, when, canary) {
    const signs = []; const n = Math.min(SIGNS.length, 1 + lvl + rnd(2));
    while (signs.length < n) { const s = pick(SIGNS); if (!signs.includes(s)) signs.push(s); }
    const s = { id: sessions.length + 1, site, fam, lvl, when, canary: canary ?? Math.random() < 0.5, sig: 'sig-' + fam.id.toLowerCase() + Math.random().toString(16).slice(2, 6), signs };
    if (s.canary && !signs.includes('Visited the canary')) signs.push('Visited the canary');
    sessions.push(s); return s;
  }
  for (let i = 0; i < 260; i++) { const r = Math.random(); const lvl = r < 0.72 ? 1 : r < 0.9 ? 2 : r < 0.975 ? 3 : 4; mk(pick(S), pick(FAMILIES), lvl, now - rnd(24 * 3600 * 1000)); }

  incidents.push({ id: 1, title: 'Endpoint mapping across Victorian councils', stage: 'confirmed', lvl: 3, when: now - 19 * 3600 * 1000, fam: FAMILIES[1], sites: ['Geelong Council', 'Ballarat Council', 'Camden Council'], sectors: ['Government'], timeline: [['Sun 21:40', 'First watcher (Geelong) logs endpoint enumeration'], ['Sun 21:58', 'Same agent on Ballarat and Camden'], ['Sun 22:05', 'Matched across 3 sites within 2 hours. Campaign declared'], ['Mon 08:10', 'Geelong IT confirms no data accessed']], fix: ['Rate-limit unauthenticated requests to /api/*', 'Return generic 404s rather than descriptive errors', 'Review any API keys in public repositories'] });
  incidents.push({ id: 2, title: 'Probing of health portal login flows', stage: 'escalated', lvl: 3, when: now - 7 * 3600 * 1000, fam: FAMILIES[0], sites: ['SA Health portal', 'WA Health portal', 'Manchester NHS trust'], sectors: ['Health'], timeline: [['03:12', 'SA Health watcher sees retry loops on login'], ['03:20', 'WA Health and a UK NHS trust report the same agent'], ['03:24', 'Escalated: input testing on password reset']], fix: ['Add a challenge to password reset after 3 attempts', 'Log and alert on rapid variant requests', 'Confirm session tokens are not exposed in URLs'] });
  incidents.push({ id: 3, title: 'Canary-triggered mapping of European retailers', stage: 'confirmed', lvl: 2, when: now - 30 * 3600 * 1000, fam: FAMILIES[2], sites: ['Paris retailer', 'Milan retailer', 'Amsterdam marketplace', 'Copenhagen retailer'], sectors: ['Online shop'], timeline: [['Sat 14:02', 'Four shops report canary visits within 40 minutes'], ['Sat 14:20', 'Same agent enumerates product feeds'], ['Sat 16:00', 'No probing seen. Closed as read and map only']], fix: ['No action needed. Kept on the dashboard for the record'] });

  // ---------- map ----------
  const svg = $('map'); const W = 1000, H = 520; svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const projection = d3.geoNaturalEarth1(); const path = d3.geoPath(projection);
  const gLand = $('land'), gGrat = $('grat'), gS = $('sensors'), gM = $('markers'), gL = $('labels');
  let world = null;
  function box(w, s, e, n) { // smallest-area winding for d3's spherical polygons
    const a = { type: 'Polygon', coordinates: [[[w, n], [e, n], [e, s], [w, s], [w, n]]] };
    const b = { type: 'Polygon', coordinates: [[[w, n], [w, s], [e, s], [e, n], [w, n]]] };
    return d3.geoArea(a) < d3.geoArea(b) ? a : b;
  }
  const REGIONS = { world: null, au: box(110, -48, 180, -8), asia: box(60, -12, 150, 45), eu: box(-12, 34, 42, 62), na: box(-130, 12, -60, 55) };
  function fit(region) {
    if (!world) return;
    if (!region) projection.fitExtent([[10, 10], [W - 10, H - 10]], world);
    else projection.fitExtent([[10, 10], [W - 10, H - 10]], region);
    gLand.innerHTML = ''; world.features.forEach(f => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', path(f)); p.setAttribute('class', 'country'); gLand.appendChild(p); });
    const gr = document.createElementNS(NS, 'path'); gr.setAttribute('d', path(d3.geoGraticule10())); gr.setAttribute('class', 'graticule'); gGrat.innerHTML = ''; gGrat.appendChild(gr);
    gS.innerHTML = ''; S.forEach(s => { const pt = projection([s.lon, s.lat]); if (!pt) return; const c = document.createElementNS(NS, 'circle'); c.setAttribute('cx', pt[0]); c.setAttribute('cy', pt[1]); c.setAttribute('r', 2.6); c.setAttribute('class', 'sensor'); c.id = 'sen' + s.id; const t = document.createElementNS(NS, 'title'); t.textContent = s.name; c.appendChild(t); gS.appendChild(c); });
    renderMarkers();
  }
  fetch('assets/world.json').then(r => r.json()).then(topo => {
    world = topojson.feature(topo, topo.objects.countries);
    world.features = world.features.filter(f => f.properties.name !== 'Antarctica');
    fit(null);
  }).catch(() => { $('mapNote').textContent = 'World geometry could not load. Open this from a web server (or a hosted URL) rather than as a file.'; });

  function visible(s) { return s.lvl >= minLvl && (sectorF === 'all' || s.site.sector === sectorF) && (vendorF === 'all' || s.fam.id === vendorF) && (Date.now() - s.when) < 24 * 3600 * 1000; }
  function renderMarkers() {
    gM.innerHTML = '';
    const bySite = {};
    sessions.filter(visible).forEach(s => { const k = s.site.id; if (!bySite[k] || bySite[k].lvl < s.lvl || (bySite[k].lvl === s.lvl && bySite[k].when < s.when)) bySite[k] = s; });
    Object.values(bySite).forEach(s => {
      const pt = projection([s.site.lon, s.site.lat]); if (!pt) return; const [x, y] = pt;
      const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'marker'); g.setAttribute('tabindex', '0'); g.setAttribute('role', 'button'); g.setAttribute('aria-label', s.site.name + ': ' + LEVELS[s.lvl]);
      if (s.lvl >= 3 && Date.now() - s.when < 3600 * 1000) { const p = document.createElementNS(NS, 'circle'); p.setAttribute('cx', x); p.setAttribute('cy', y); p.setAttribute('r', 8); p.setAttribute('fill', COLORS[s.lvl]); p.setAttribute('class', 'pulse'); g.appendChild(p); }
      const c = document.createElementNS(NS, 'circle'); c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', s.lvl >= 3 ? 5.5 : 4); c.setAttribute('fill', COLORS[s.lvl]); c.setAttribute('stroke', 'var(--paper-2)'); c.setAttribute('stroke-width', '1.5'); c.setAttribute('class', 'core'); g.appendChild(c);
      g.addEventListener('click', () => showDetail(s)); g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showDetail(s); } });
      gM.appendChild(g);
    });
  }
  function fmt(t) { return new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
  function ago(t) { const m = Math.max(1, Math.round((Date.now() - t) / 60000)); return m < 60 ? m + ' min ago' : Math.round(m / 60) + ' h ago'; }
  function alsoSeen(s) { return sessions.filter(o => o.fam.id === s.fam.id && o.site.id !== s.site.id && Math.abs(o.when - s.when) < 2 * 3600 * 1000 && o.lvl >= 3).length; }

  function showDetail(s) {
    const also = alsoSeen(s);
    $('detailBody').innerHTML = `
      <h3>${s.site.name}</h3>
      <span class="lvl" style="background:${COLORS[s.lvl]}">${s.lvl}. ${LEVELS[s.lvl]}</span>
      <dl class="kv">
        <dt>When</dt><dd>${fmt(s.when)} · ${ago(s.when)}</dd>
        <dt>Sector</dt><dd>${s.site.sector} · ${s.site.cc}</dd>
        <dt>Agent</dt><dd>${s.fam.said}</dd>
        <dt>Arrived via</dt><dd>${s.fam.route}</dd>
        <dt>Did</dt><dd>${DID[s.lvl]}</dd>
        <dt>Signs</dt><dd>${s.signs.join(', ')}</dd>
        <dt>Also seen</dt><dd>${also ? also + ' other site' + (also > 1 ? 's' : '') + ' at level 3+ in 2 hours' : 'Only here so far'}</dd>
      </dl>`;
    $('detail').classList.add('open');
  }
  window.closeDetail = () => $('detail').classList.remove('open');

  // ---------- stream + incidents ----------
  const streamEl = $('stream');
  function pushEvent(s, isNew) {
    const d = document.createElement('div'); d.className = 'ev' + (isNew ? ' new' : '');
    d.innerHTML = `<i style="background:${COLORS[s.lvl]}"></i><div><b>${s.site.name}</b> · ${LEVELS[s.lvl]}<div class="m">${s.fam.name} via ${s.fam.route}${s.canary ? ' · canary hit' : ''}</div></div><div class="t">${fmt(s.when)}</div>`;
    d.addEventListener('click', () => showDetail(s)); streamEl.prepend(d);
    while (streamEl.children.length > 80) streamEl.lastChild.remove();
  }
  function pushNote(text, color) { const d = document.createElement('div'); d.className = 'ev new'; d.innerHTML = `<i style="background:${color || 'var(--live)'}"></i><div><b>${text}</b></div><div class="t">${fmt(Date.now())}</div>`; streamEl.prepend(d); }
  sessions.slice().sort((a, b) => a.when - b.when).slice(-40).forEach(s => pushEvent(s, false));

  function renderIncidents() {
    const box = $('incidents'); box.innerHTML = '';
    incidents.slice().sort((a, b) => b.when - a.when).forEach(inc => {
      const d = document.createElement('div'); d.className = 'inc'; d.tabIndex = 0; d.setAttribute('role', 'button');
      d.innerHTML = `<h4>${inc.title}</h4><div class="meta"><span class="stage ${inc.stage}">${inc.stage}</span><span class="lvl" style="background:${COLORS[inc.lvl]};font-size:11px;padding:1px 6px">${LEVELS[inc.lvl]}</span><span>${inc.sites.length} sites</span><span>${inc.sectors.join(', ')}</span><span>${ago(inc.when)}</span></div>`;
      const open = () => openIncident(inc); d.addEventListener('click', open); d.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
      box.appendChild(d);
    });
  }
  function openIncident(inc) {
    $('modalBody').innerHTML = `
      <h2 id="mTitle">${inc.title}</h2>
      <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px;color:var(--ink-2);align-items:center"><span class="stage ${inc.stage}">${inc.stage}</span><span class="lvl" style="background:${COLORS[inc.lvl]};font-size:11px;padding:1px 6px">${LEVELS[inc.lvl]}</span><span>${inc.fam.said}</span><span>via ${inc.fam.route}</span></div>
      <h4>Timeline</h4>
      <ul class="tl">${inc.timeline.map((t, i) => `<li class="${i === inc.timeline.length - 1 && inc.stage !== 'confirmed' ? 'hot' : ''}"><b>${t[0]}</b> ${t[1]}</li>`).join('')}</ul>
      <h4>Sites affected</h4><ul class="plain">${inc.sites.map(s => `<li>${s}</li>`).join('')}</ul>
      <h4>What to check on your own site</h4><ul class="plain">${inc.fix.map(f => `<li>${f}</li>`).join('')}</ul>
      <h4>How it was matched</h4><p style="margin:0;font-size:13px">The same agent reached level 3 on 3 or more unrelated sites within 2 hours. Agent Watch now watches for it everywhere and has warned owners of similar sites.</p>`;
    $('modal').classList.add('open');
  }
  window.closeModal = () => $('modal').classList.remove('open');
  $('modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeDetail(); } });

  function renderCounters() {
    const day = sessions.filter(s => Date.now() - s.when < 24 * 3600 * 1000);
    $('cSensors').textContent = S.length; $('cAgents').textContent = day.length; $('cEsc').textContent = day.filter(s => s.lvl >= 3).length; $('cCamp').textContent = incidents.filter(i => i.stage === 'escalated').length;
  }

  // filters + region
  document.querySelectorAll('[data-min]').forEach(b => b.addEventListener('click', () => { document.querySelectorAll('[data-min]').forEach(o => o.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true'); minLvl = +b.dataset.min; renderMarkers(); }));
  document.querySelectorAll('[data-region]').forEach(b => b.addEventListener('click', () => { document.querySelectorAll('[data-region]').forEach(o => o.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true'); fit(REGIONS[b.dataset.region]); }));
  $('sector').addEventListener('change', e => { sectorF = e.target.value; renderMarkers(); });
  const vSel = $('vendor'); FAMILIES.forEach(f => { const o = document.createElement('option'); o.value = f.id; o.textContent = f.name; vSel.appendChild(o); });
  vSel.addEventListener('change', e => { vendorF = e.target.value; renderMarkers(); });
  document.querySelectorAll('.tabs button').forEach(b => b.addEventListener('click', () => { document.querySelectorAll('.tabs button').forEach(o => o.setAttribute('aria-selected', 'false')); b.setAttribute('aria-selected', 'true'); document.querySelectorAll('.panel').forEach(p => p.classList.toggle('on', p.id === b.dataset.tab)); }));

  // background trickle
  setInterval(() => { if (document.hidden) return; const r = Math.random(); const lvl = r < 0.8 ? 1 : r < 0.95 ? 2 : 3; const s = mk(pick(S), pick(FAMILIES), lvl, Date.now()); pushEvent(s, true); renderMarkers(); renderCounters(); }, 4000);

  // ---------- campaign replay ----------
  const replayBtn = $('replay');
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  replayBtn.addEventListener('click', async () => {
    replayBtn.disabled = true; replayBtn.textContent = 'Replaying…';
    document.querySelector('.tabs button[data-tab="stream"]').click();
    document.querySelector('[data-region="au"]').click();
    const fam = FAMILIES[0];
    const camden = S.find(s => s.name === 'Camden Council');
    const others = ['Victorian health service', 'Toowoomba Council', 'Bundaberg Council', 'Penrith Council'].map(n => S.find(s => s.name === n));
    const step = async (site, lvl, canary, wait = 1300) => { const s = mk(site, fam, lvl, Date.now(), canary); pushEvent(s, true); renderMarkers(); renderCounters(); await sleep(wait); return s; };
    await step(camden, 1, true); await step(camden, 2, true); await step(camden, 3, true);
    pushNote('Camden Council emailed: level 3, tested a search form 40 times in 11 seconds', 'var(--l3)'); await sleep(1300);
    for (const o of others) await step(o, 3, true, 900);
    pushNote('Matched: same agent at level 3 on 5 sites within 2 hours. Campaign declared.', 'var(--l4)'); await sleep(1200);
    const inc = { id: incidents.length + 1, title: 'Agent campaign against Australian councils and health portals', stage: 'escalated', lvl: 3, when: Date.now(), fam, sites: [camden.name, ...others.map(o => o.name)], sectors: ['Government', 'Health'], timeline: [['02:14', 'Camden watcher logs a visit via a website-scanning service, canary hit'], ['02:16', 'Pages, forms and entry points listed'], ['02:19', '40 search-form variants in 11 seconds. Level 3. Owner emailed'], ['02:31', 'Same agent on Victorian health, Toowoomba, Bundaberg, Penrith'], ['02:33', 'Campaign declared. Owners of similar sites warned'], ['02:40', 'Incident opened']], fix: ['Rate-limit unauthenticated search requests', 'Validate search input length and characters', 'Return generic error pages', 'Check your logs for this agent from 02:00 today'] };
    incidents.push(inc); renderIncidents(); renderCounters();
    pushNote('Warning sent to ' + S.filter(s => s.sector === 'Government' || s.sector === 'Health').length + ' similar sites. Watching for this agent everywhere.', 'var(--live)');
    document.querySelectorAll('.sensor').forEach((c, i) => setTimeout(() => { c.classList.add('hit'); setTimeout(() => c.classList.remove('hit'), 1400); }, i * 12));
    await sleep(1500);
    document.querySelector('[data-region="world"]').click();
    openIncident(inc);
    replayBtn.disabled = false; replayBtn.textContent = 'Replay a campaign';
  });

  renderIncidents(); renderCounters();
})();
