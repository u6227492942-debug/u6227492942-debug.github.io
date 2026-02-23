document.addEventListener('contextmenu', event => event.preventDefault());

const center = document.getElementById('center');
const mainCats = document.querySelectorAll('[data-main]');
const otherCats = document.querySelectorAll('[data-category]');
const galleries = document.querySelectorAll('.category:not(#center)');
const menuToggle = document.getElementById('menu-toggle');
const navList = document.querySelector('.sidebar ul');

// Navigation tree
const navTree = {
  fotky: [
    {name:"Digital", id:"fotky-digital", images:true},
    {name:"Analog", children:[
      {name:"Color", id:"fotky-analog-color", images:true},
      {name:"BW", id:"fotky-analog-bw", images:true}
    ]}
  ],
  video: [
    {name:"KLIP", id:"video-klip", images:true},
    {name:"Performance", id:"video-performance", images:true},
    {name:"Video art", children:[
      {name:"ABC OCD", id:"video-art-abc", images:true},
      {name:"Sex sells", id:"video-art-sex", images:true},
      {name:"Mrvenie", id:"video-art-mrvenie", images:true}
    ]},
    {name:"Vlog", id:"video-vlog", images:true}
  ],
  socha: [
    {name:"Ťah na svoju stranu", id:"socha-tah", images:true},
    {name:"Pery", id:"socha-pery", images:true}
  ]
};

// Hamburger toggle
menuToggle.addEventListener('click', () => {
  navList.classList.toggle('open');
});

// Close menu after picking a category (mobile UX)
function closeMenu() {
  navList.classList.remove('open');
}

function scrollToTop() {
  const content = document.querySelector('.content');
  if (content.scrollHeight > content.clientHeight && content.scrollTop > 0) {
    content.scrollTop = 0;
  } else {
    window.scrollTo(0, 0);
  }
}

// Show a section by ID
function showGallery(id) {
  galleries.forEach(g => g.classList.remove('active'));
  center.classList.remove('active');
  center.innerHTML = '';
  if (id) document.getElementById(id).classList.add('active');
  scrollToTop();
  closeMenu();
}

// Render subcategories in center
function renderSubcats(items) {
  center.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'subcat';
    div.textContent = item.name;
    center.appendChild(div);
    div.addEventListener('click', () => {
      if (item.images) {
        showGallery(item.id);
      } else if (item.children) {
        renderSubcats(item.children);
      }
    });
  });
  center.classList.add('active');
  scrollToTop();
}

// Click main categories (Fotky, Video, Socha)
mainCats.forEach(cat => {
  cat.addEventListener('click', () => {
    galleries.forEach(g => g.classList.remove('active'));
    const tree = navTree[cat.dataset.main];
    if (tree) renderSubcats(tree);
    closeMenu();
  });
});

// Click direct categories (Grafika, Obrazy, Odev)
otherCats.forEach(cat => {
  cat.addEventListener('click', () => {
    showGallery(cat.dataset.category);
  });
});