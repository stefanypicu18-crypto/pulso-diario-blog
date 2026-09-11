const stories = [
  { category: 'CITY', city: 'BEIJING', code: 'CN 01 - BEIJING', title: 'History and Tradition', body: 'Beijing is the capital of China and a city full of history. I would love to visit the Great Wall of China and the Forbidden City.', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=900&q=82' },
  { category: 'CITY', city: 'SHANGHAI', code: 'CN 02 — SHANGHAI', title: 'The Modern City', body: 'Shanghai is one of the most modern cities in China. I would like to see its amazing skyscrapers, explore its streets, and enjoy the city at night.', image: 'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?auto=format&fit=crop&w=900&q=82' },
  { category: 'CITY', city: "XI'AN", code: "CN 03 — XI'AN", title: 'A Journey to the Past', body: "Xi'an is a historic city and the home of the famous Terracotta Warriors. I would love to visit this place and learn more about Chinese history.", image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=82' },
  { category: 'CITY', city: 'CHENGDU', code: 'CN 04 — CHENGDU', title: 'The Home of Pandas', body: 'Chengdu is famous for its giant pandas. I would love to visit a panda conservation center and learn more about these beautiful animals.', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG' },
  { category: 'CITY', city: 'GUILIN', code: 'CN 05 — GUILIN', title: 'Nature and Landscapes', body: 'Guilin is famous for its beautiful mountains, rivers, and natural landscapes. I would love to take a boat trip on the Li River.', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=82' }
];

const grid = document.querySelector('#storyGrid');
const emptyState = document.querySelector('#emptyState');
let currentFilter = 'CITY';

function renderStories() {
  const filtered = stories.filter((story) => story.category === currentFilter);
  grid.innerHTML = filtered.map((story) => {
    const index = stories.indexOf(story);
    return `<article class="story-card reveal" data-read="${index}"><div class="story-card-image"><img src="${story.image}" alt="${story.city}" loading="lazy"></div><div class="card-meta"><span>${story.category}</span><span>1 MIN READ</span></div><h3>${story.city}</h3></article>`;
  }).join('');
  emptyState.hidden = filtered.length > 0;
  grid.querySelectorAll('[data-read]').forEach((card) => card.addEventListener('click', () => openArticle(Number(card.dataset.read))));
}

document.querySelectorAll('button.filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelector('.filter.active').classList.remove('active'); button.classList.add('active'); currentFilter = button.dataset.filter; renderStories();
}));
const modal = document.querySelector('#articleModal');
const modalContent = document.querySelector('#modalContent');
function openArticle(index) {
  const story = index === 'hero' ? { code: 'CHINA BEYOND', title: 'China: a country shaped by ancient traditions and modern energy', image: 'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?auto=format&fit=crop&w=1200&q=85', body: 'China is a country where thousands of years of history meet a rapidly changing present.' } : stories[index];
  modalContent.innerHTML = `<div class="modal-hero"><img src="${story.image}" alt="${story.city || story.title}"></div><div class="modal-body"><span class="tag">${story.code}</span><h3>${story.title}</h3><p>${story.body}</p></div>`;
  modal.showModal();
}
document.querySelectorAll('[data-read]').forEach((button) => button.addEventListener('click', () => openArticle(button.dataset.read === 'hero' ? 'hero' : Number(button.dataset.read))));
document.querySelector('#modalClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });

document.querySelector('#menuToggle').addEventListener('click', () => document.querySelector('#mainNav').classList.toggle('open'));
const navigationLinks = [...document.querySelectorAll('.main-nav a')];
const navigationTargets = navigationLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const setActiveNavigation = (targetId) => navigationLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${targetId}`));
navigationLinks.forEach((link) => link.addEventListener('click', () => setActiveNavigation(link.getAttribute('href').slice(1))));
const navigationObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActiveNavigation(entry.target.id); }), { rootMargin: '-30% 0px -60% 0px' });
navigationTargets.forEach((target) => navigationObserver.observe(target));
renderStories();
