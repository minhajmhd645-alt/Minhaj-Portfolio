const skillItems = [
  { name:'Java', category:'Programming', icon:'coffee', featured:true },
  { name:'Kotlin', category:'Programming', icon:'code-2', featured:true },
  { name:'Python', category:'Programming', icon:'terminal', featured:true },
  { name:'JavaScript', category:'Programming', icon:'braces', featured:true },
  { name:'PHP', category:'Programming', icon:'code-xml', featured:true },
  { name:'SQL', category:'Programming', icon:'database' },
  { name:'HTML5', category:'Frontend', icon:'panel-top' },
  { name:'CSS3', category:'Frontend', icon:'paintbrush' },
  { name:'JavaScript', category:'Frontend', icon:'braces' },
  { name:'Bootstrap 5', category:'Frontend', icon:'layout-grid' },
  { name:'Responsive Web Design', category:'Frontend', icon:'smartphone' },
  { name:'PHP', category:'Backend', icon:'code-xml' },
  { name:'REST API Concepts', category:'Backend', icon:'network' },
  { name:'Database Integration', category:'Backend', icon:'cable' },
  { name:'Java', category:'Android', icon:'coffee' },
  { name:'Kotlin', category:'Android', icon:'code-2' },
  { name:'Android Studio', category:'Android', icon:'smartphone', featured:true },
  { name:'MVVM', category:'Android', icon:'layers-3' },
  { name:'Firebase', category:'Android', icon:'flame' },
  { name:'Room Database', category:'Android', icon:'hard-drive' },
  { name:'MySQL', category:'Databases', icon:'database', featured:true },
  { name:'SQL Server', category:'Databases', icon:'server' },
  { name:'SQLite', category:'Databases', icon:'table-2' },
  { name:'Firebase Firestore', category:'Databases', icon:'cloud' },
  { name:'Git', category:'Tools', icon:'git-branch', featured:true },
  { name:'GitHub', category:'Tools', icon:'git-branch' },
  { name:'VS Code', category:'Tools', icon:'code' },
  { name:'Android Studio', category:'Tools', icon:'smartphone' },
  { name:'XAMPP', category:'Tools', icon:'package' },
  { name:'Object-Oriented Programming', category:'Foundations', icon:'boxes' },
  { name:'Software Development Life Cycle', category:'Foundations', icon:'workflow' },
  { name:'Software Architecture', category:'Foundations', icon:'blocks' },
  { name:'Testing', category:'Foundations', icon:'list-checks' },
  { name:'Debugging', category:'Foundations', icon:'bug' },
  { name:'Computer Networking', category:'Foundations', icon:'router' },
  { name:'Academic AI / ML Concepts', category:'Foundations', icon:'brain-circuit' }
];

const skillsGrid = document.getElementById('skills-grid');
const skillsCount = document.getElementById('skills-count');
function renderSkills(category = 'All') {
  if (!skillsGrid) return;
  const items = category === 'All' ? skillItems.filter(item => item.featured) : skillItems.filter(item => item.category === category);
  skillsGrid.innerHTML = items.map(item => `<article class="skill-card reveal"><div class="skill-icon"><i data-lucide="${item.icon}"></i></div><div class="skill-card-title"><h3>${item.name}</h3><span class="skill-arrow" aria-hidden="true">↗</span></div><div class="skill-divider"></div><p>${item.category}</p></article>`).join('');
  if (skillsCount) skillsCount.textContent = category === 'All' ? `Showing ${items.length} featured skills — select a category to explore all ${skillItems.length} skills.` : `Showing ${items.length} skills in ${category}.`;
  if (window.lucide) lucide.createIcons();
  if (window.refreshReveals) window.refreshReveals();
}
renderSkills();
window.renderSkills = renderSkills;
