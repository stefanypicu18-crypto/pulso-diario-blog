const stories = [
  { category: 'Ideas', title: 'La ciudad también se diseña con los pies', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=82', time: '4 min de lectura', body: 'Caminar no es solamente una forma de llegar. Es una manera de entender el ritmo de un barrio, sus encuentros y sus pequeños descubrimientos. Hablamos con quienes están imaginando ciudades más humanas, una esquina a la vez.' },
  { category: 'Ciudad', title: 'Un mapa secreto de los lugares que nos hacen bien', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=82', time: '7 min de lectura', body: 'Hay espacios que no aparecen en las guías, pero se quedan en la memoria. Una biblioteca silenciosa, una banca con sombra, el café donde una conversación se alarga. Este es nuestro mapa de los refugios cotidianos.' },
  { category: 'Cultura', title: 'El placer de hacer una cosa a la vez', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=82', time: '5 min de lectura', body: 'En una época que celebra la velocidad, elegir la atención es casi un gesto político. Tres creadoras comparten cómo recuperaron el tiempo lento y qué encontraron en ese espacio.' },
  { category: 'Ideas', title: 'Pequeñas revoluciones para una vida más ligera', image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=82', time: '6 min de lectura', body: 'Cambiar el mundo también puede comenzar por una decisión pequeña: comprar menos, reparar más, compartir lo que sabemos y dejar sitio para lo inesperado.' },
  { category: 'Cultura', title: 'La música que vive entre dos generaciones', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=82', time: '8 min de lectura', body: 'Una playlist puede ser una conversación. Reunimos canciones, recuerdos y voces distintas para explorar aquello que nos une cuando las palabras no alcanzan.' },
  { category: 'Ciudad', title: 'La mesa como lugar para volver', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=82', time: '3 min de lectura', body: 'Cocinar para otros es una forma de decir aquí estamos. En esta crónica, cuatro mesas cuentan la historia de familias que encontraron una nueva manera de reunirse.' }
];

const grid = document.querySelector('#storyGrid');
const emptyState = document.querySelector('#emptyState');
let currentFilter = 'Ciudad';

function renderStories() {
  const filtered = stories.filter((story) => story.category === currentFilter);
  grid.innerHTML = filtered.map((story) => {
    const index = stories.indexOf(story);
    return `<article class="story-card reveal" data-read="${index}"><div class="story-card-image"><img src="${story.image}" alt="${story.title}" loading="lazy"></div><div class="card-meta"><span>${story.category}</span><span>${story.time}</span></div><h3>${story.title}</h3></article>`;
  }).join('');
  emptyState.hidden = filtered.length > 0;
  grid.querySelectorAll('[data-read]').forEach((card) => card.addEventListener('click', () => openArticle(Number(card.dataset.read))));
}

document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelector('.filter.active').classList.remove('active'); button.classList.add('active'); currentFilter = button.dataset.filter; renderStories();
}));
const modal = document.querySelector('#articleModal');
const modalContent = document.querySelector('#modalContent');
function openArticle(index) {
  const story = index === 0 ? { category: 'CHINA', title: 'China: a country shaped by ancient traditions and modern energy', image: 'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?auto=format&fit=crop&w=1200&q=85', time: '1 MIN READ', body: 'China is a country where thousands of years of history meet a rapidly changing present. From the Great Wall and ancient temples to vibrant cities and quiet mountain villages, every region reveals a different part of its identity.' } : stories[index];
  modalContent.innerHTML = `<div class="modal-hero"><img src="${story.image}" alt="${story.title}"><h2>${story.title}</h2></div><div class="modal-body"><span class="tag">${story.category} · ${story.time}</span><p>${story.body}</p><p>Its traditions, food, art, and landscapes continue to connect generations. China is a place of contrasts, where the past remains present while new ideas shape the future.</p></div>`;
  modal.showModal();
}
document.querySelectorAll('[data-read]').forEach((button) => button.addEventListener('click', () => openArticle(Number(button.dataset.read))));
document.querySelector('#modalClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });

document.querySelector('#newsletterForm').addEventListener('submit', (event) => { event.preventDefault(); document.querySelector('#formMessage').textContent = 'Listo. Revisa tu correo para confirmar la suscripción.'; event.target.reset(); });
renderStories();
