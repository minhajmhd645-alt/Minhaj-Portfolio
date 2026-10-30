const portfolioProjects = [
  { number:'01', slug:'printxpress', title:'PrintXpress', category:'Android Development', filter:'Android', icon:'printer', description:'An Android digital printing service application allowing users to browse printing products, manage shopping carts, and place orders.', features:['User authentication','Product categories','Shopping cart & orders'], stack:['Java','Android Studio','MVVM','Firebase','Firestore','Material Design'] },
  { number:'02', slug:'globetrek', title:'GlobeTrek Adventures', category:'Full-Stack Web Development', filter:'Web Apps', icon:'compass', description:'A travel and tourism web application supporting customers, staff, and administrators.', features:['Role-based access','Travel package management','Database integration'], stack:['HTML5','CSS3','Bootstrap 5','JavaScript','PHP','MySQL','PDO'] },
  { number:'03', slug:'safenation', title:'SafeNation — Disaster Link', category:'Academic · Disaster Management', filter:'Academic', icon:'map-pinned', description:'An AI-assisted disaster management and emergency response system designed to support disaster reporting, severity assessment, mapping, and coordination.', note:'Severity assessment uses explainable rule-based logic. It does not use a deployed trained machine-learning model or make autonomous emergency decisions.', features:['Incident reporting','Rule-based severity assessment','Map-based coordination'], stack:['HTML5','CSS3','Bootstrap','JavaScript','PHP','MySQL','Leaflet','OpenStreetMap'] },
  { number:'04', slug:'nwsdb', title:'NWSDB Water Billing & Payment System', category:'Service-Oriented Architecture', filter:'Systems', icon:'droplets', description:'A service-oriented water billing and payment system featuring separate APIs and simulated payment processing.', features:['Customer & usage records','Bill and payment history','Independent REST APIs'], stack:['C#','ASP.NET Core','SQL Server','Entity Framework Core','REST APIs'] }
];

const projectPreviews = {
  printxpress: `<div class="preview-glow"></div><div class="preview-phone" aria-hidden="true"><div class="phone-screen"><div class="phone-status"><span>9:41</span><span>● ● ●</span></div><div class="phone-title"><span>PrintXpress</span><span>PRINT SHOP</span></div><div class="print-product-row"><div class="print-product"><i></i><span></span></div><div class="print-product"><i></i><span></span></div><div class="print-product"><i></i><span></span></div><div class="print-product"><i></i><span></span></div></div><div class="phone-cart-row"><span>Cart <b class="phone-cart-count" data-cart-count>0 items</b></span><span>Preview flow</span></div><div class="phone-order-line"></div></div></div><span class="preview-phone-caption" aria-hidden="true">PRODUCTS → CART<br>CONCEPTUAL UI STUDY</span><div class="cart-action"><button class="concept-cart-button" type="button" data-cart-add aria-pressed="false" aria-label="Add a sample item to the conceptual PrintXpress cart">ADD SAMPLE</button><span data-cart-status aria-live="polite">Preview only</span></div>`,
  globetrek: `<div class="travel-sky" aria-hidden="true"></div><svg class="travel-landscape" viewBox="0 0 800 360" preserveAspectRatio="none" aria-hidden="true"><path class="mountain-back" d="M0 205 120 90 198 167 330 50 474 189 586 83 800 190V360H0Z"></path><path class="mountain-front" d="m0 224 149-80 111 104 151-133 132 113 98-81 159 77v136H0Z"></path><path class="ridge" d="m0 272 145-70 139 72 161-57 133 75 95-37 127 43v62H0Z"></path><path class="travel-route" d="M190 211 C285 128 370 247 468 160 S600 111 670 187"></path></svg><span class="travel-pin pin-one" aria-hidden="true"></span><span class="travel-pin pin-two" aria-hidden="true"></span><span class="travel-pin pin-three" aria-hidden="true"></span><div class="destination-strip" aria-hidden="true"><span>EXPLORE</span><span>DESTINATIONS</span></div>`,
  safenation: `<div class="safe-map-grid" aria-hidden="true"></div><span class="safenation-notice">CONCEPT VISUAL<br>NO LIVE REPORTS OR ALERTS</span><svg class="sri-lanka-map" viewBox="0 0 120 190" aria-hidden="true"><path class="map-outline" d="M60 8 76 15 83 30 77 45 89 59 82 76 75 89 74 105 65 122 62 141 54 158 47 178 38 169 36 151 28 137 35 122 32 106 39 93 33 78 41 64 34 52 44 40 42 27 51 16Z"></path><path class="map-route" d="M59 23Q49 52 57 73T49 106Q56 131 42 159"></path><circle class="map-node" cx="59" cy="23" r="4"></circle><circle class="map-node" cx="56" cy="73" r="4"></circle><circle class="map-node" cx="49" cy="106" r="4"></circle><circle class="map-node" cx="42" cy="159" r="4"></circle></svg><div class="map-key" aria-hidden="true"><span><i></i>LOCATION NODE</span><span><i></i>RESPONSE ROUTE</span></div>`,
  nwsdb: `<div class="water-rings" aria-hidden="true"></div><div class="api-flow" aria-label="Conceptual service flow: Client to NWSDB API to Bank API to simulated payment gateway"><div class="api-node">CLIENT<small>Billing UI</small></div><span class="api-connector" aria-hidden="true"></span><div class="api-node">NWSDB API<small>Service</small></div><span class="api-connector" aria-hidden="true"></span><div class="api-node">BANK API<small>Payment request</small></div><span class="api-connector" aria-hidden="true"></span><div class="api-node">SIMULATED<br>PAYMENT<small>Demo flow only</small></div></div><span class="payment-sim-label">ILLUSTRATIVE ARCHITECTURE · NO REAL TRANSACTIONS</span>`
};

const projectGrid = document.getElementById('project-grid');
function renderProjects(filter = 'all') {
  if (!projectGrid) return;
  const visibleProjects = filter === 'all' ? portfolioProjects : portfolioProjects.filter(project => project.filter === filter);
  projectGrid.innerHTML = visibleProjects.map(project => `
    <article class="project-card reveal" data-project="${project.filter}">
      <div class="project-preview project-preview--${project.slug}" role="group" aria-label="Conceptual animated visual for ${project.title}; not a screenshot of the application">
        ${projectPreviews[project.slug]}
        <span class="project-preview-number">${project.number} / 04</span>
        <span class="project-preview-label">${project.category}</span>
        <span class="project-concept-label">Concept study · not an app screenshot</span>
      </div>
      <div class="project-body"><div class="project-card-heading"><span class="project-category">${project.category}</span><h3>${project.title}</h3></div><p class="project-description">${project.description}</p>${project.note ? `<p class="project-note"><i data-lucide="info"></i>${project.note}</p>` : ''}<div class="project-features">${project.features.map(item => `<span><i data-lucide="check"></i>${item}</span>`).join('')}</div><div class="project-stack">${project.stack.map(item => `<span>${item}</span>`).join('')}</div><div class="project-actions"><a class="repo-link" href="https://github.com/minhajmhd645-alt" target="_blank" rel="noopener">Explore on GitHub <i data-lucide="arrow-up-right"></i></a><span class="repo-status">SOURCE PROFILE</span></div></div>
    </article>`).join('');
  if (window.lucide) lucide.createIcons();
  if (window.refreshReveals) window.refreshReveals(projectGrid);
}

projectGrid?.addEventListener('click', event => {
  const button = event.target.closest('[data-cart-add]');
  if (!button) return;
  const preview = button.closest('.project-preview');
  const count = Number(preview.querySelector('[data-cart-count]').dataset.count || 0) + 1;
  const countLabel = preview.querySelector('[data-cart-count]');
  countLabel.dataset.count = String(count);
  countLabel.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
  button.setAttribute('aria-pressed', 'true');
  button.textContent = `ADDED · ${count}`;
  preview.querySelector('[data-cart-status]').textContent = 'Concept flow updated';
});

renderProjects();
