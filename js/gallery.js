/* ═══════════════════════════════════════════════════════════
   LN Chary Portfolio — Gallery (Filter, Masonry, Lightbox)
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  /* ── Artwork Data ── */
  const artworks = [
    {
      id: 1,
      title: 'Family Bonds',
      medium: 'Pencil on paper',
      category: 'portrait',
      description: 'A deeply detailed pencil portrait of a family — parents holding their young children with love and pride. Every fold of fabric, every strand of hair rendered in rich graphite tones with a dreamy bokeh background.',
      image: 'assets/family-portrait.jpg',
      recent: true,
    },
    {
      id: 7,
      title: 'Together Forever',
      medium: 'Pencil on paper',
      category: 'portrait',
      description: 'A detailed pencil portrait of a couple in traditional Indian attire — intricate sherwani embroidery and saree draping captured in graphite.',
      image: 'assets/couple-portrait.jpg',
    },
    {
      id: 2,
      title: 'Sleeping Innocence',
      medium: 'Colored pencil on paper',
      category: 'colored',
      description: 'A delicate colored pencil study of a sleeping newborn — soft skin tones, tiny fingers, and peaceful expression captured with tender, minimal strokes.',
      image: 'assets/sleeping-baby.jpg',
    },
    {
      id: 3,
      title: 'Garden Lantern',
      medium: 'Watercolor on paper',
      category: 'sketch',
      description: 'A charming watercolor painting of a vintage street lamp surrounded by lush greenery and blooming flowers — warm golden light against a soft blue sky.',
      image: 'assets/lamp-flowers.jpg',
    },
    {
      id: 4,
      title: 'Tender Coconut',
      medium: 'Watercolor on paper',
      category: 'sketch',
      description: 'A vibrant watercolor still life of a fresh tender coconut with its top sliced open and a straw — capturing the essence of tropical refreshment.',
      image: 'assets/coconut-study.jpg',
    },
    {
      id: 5,
      title: 'The Distinguished Gentleman',
      medium: 'Colored pencil on paper',
      category: 'portrait',
      description: 'A striking colored pencil portrait of a distinguished gentleman in a blue suit — expressive eyes, silver hair, and dignified composure rendered with bold, confident strokes.',
      image: 'assets/gentleman-portrait.jpg',
    },
    {
      id: 6,
      title: 'Kingfisher in Progress',
      medium: 'Colored pencil on paper',
      category: 'colored',
      description: 'A work-in-progress study of a kingfisher, showcasing the layered colored pencil technique — feather by feather, stroke by stroke.',
      image: 'assets/kingfisher-wip.jpg',
    },
    {
      id: 8,
      title: 'Where Art Grows',
      medium: 'Colored pencil on paper',
      category: 'colored',
      description: 'A surreal illustration of a pencil sprouting into a blossoming branch — a tribute to the creative spirit where art and nature intertwine.',
      image: 'assets/pencil-blossom.jpg',
    },
    {
      id: 9,
      title: 'The Kingfisher',
      medium: 'Colored pencil on paper',
      category: 'colored',
      description: 'A fully rendered kingfisher perched on a branch — vivid blues, russet chest, and textured feathers brought to life with meticulous colored pencil layering.',
      image: 'assets/kingfisher-full.jpg',
    },
    {
      id: 10,
      title: 'The Elder',
      medium: 'Colored pencil on paper',
      category: 'portrait',
      description: 'A powerful colored pencil portrait capturing wisdom and quiet strength — every wrinkle and expression line tells a story of a life fully lived.',
      image: 'assets/elder-portrait.jpg',
    },
    {
      id: 11,
      title: 'The Sparrow',
      medium: 'Pencil on paper',
      category: 'pencil',
      description: 'A delicate pencil study of a sparrow perched on a branch — soft feather textures, alert eyes, and careful hatching bring this little bird to life.',
      image: 'assets/sparrow-pencil.jpg',
    },
    {
      id: 12,
      title: 'Quiet Confidence',
      medium: 'Pencil on paper',
      category: 'portrait',
      description: 'A realistic pencil portrait from a sketchbook — strong features, rimmed glasses, and a composed expression rendered in detailed graphite shading.',
      image: 'assets/man-portrait-pencil.jpg',
    },
    {
      id: 13,
      title: 'The Swordsman',
      medium: 'Ink on paper',
      category: 'sketch',
      description: 'A dramatic ink illustration of a swordsman in action — bold black strokes, dynamic composition, and intense contrast creating a cinematic manga-inspired panel.',
      image: 'assets/swordsman-ink.jpg',
    },
    {
      id: 14,
      title: 'The Blind Gentleman',
      medium: 'Ink on paper',
      category: 'sketch',
      description: 'A striking ink drawing of a suited figure with eyes obscured by a feather — meticulous hatching, strong silhouette, and an air of mystery rendered in fine liner.',
      image: 'assets/peaky-blinder-ink.jpg',
    },
    {
      id: 15,
      title: 'The Flamingo',
      medium: 'Colored pencil on paper',
      category: 'colored',
      description: 'A graceful flamingo portrait in vivid pinks, corals, and lavenders — the elegant S-curve of the neck and layered plumage captured with rich colored pencil work.',
      image: 'assets/flamingo-colored.jpg',
    },
    {
      id: 16,
      title: 'Childhood Curiosity',
      medium: 'Pencil on paper',
      category: 'portrait',
      description: 'A detailed graphite pencil portrait of a young boy with expressive, curious eyes and a gentle smile, captured on paper.',
      image: 'assets/boy-portrait.jpg',
    },
    {
      id: 17,
      title: 'Kiwi Study',
      medium: 'Watercolor on paper',
      category: 'sketch',
      description: 'A fresh watercolor study of kiwi fruit, showing one whole kiwi and a sliced half displaying vibrant green flesh and black seeds.',
      image: 'assets/kiwi-watercolor.jpg',
    },
    {
      id: 18,
      title: 'The Rose Bud',
      medium: 'Colored pencil on paper',
      category: 'colored',
      description: 'A delicate study of a pink rose bud in colored pencils, showing soft petals blending from creamy white to rich rose-pink with green stem and leaves.',
      image: 'assets/rose-colored.jpg',
    },
  ];

  const grid = document.getElementById('gallery-grid');
  const filters = document.querySelectorAll('.gallery__filter');
  let currentFilter = 'all';

  /* ── Render Gallery ── */
  function renderGallery(filter = 'all') {
    const filtered =
      filter === 'all'
        ? artworks
        : artworks.filter((a) => a.category === filter);

    grid.innerHTML = '';

    filtered.forEach((art, index) => {
      const item = document.createElement('div');
      item.className = 'gallery__item reveal';
      item.style.transitionDelay = `${(index % 6) * 80}ms`;
      item.setAttribute('data-index', artworks.indexOf(art));

      item.innerHTML = `
        ${art.recent ? '<span class="gallery__badge">Recent Work</span>' : ''}
        <img class="gallery__item-image" src="${art.image}" alt="${art.title} — ${art.medium}" loading="lazy">
        <div class="gallery__overlay">
          <div class="gallery__overlay-title">${art.title}</div>
          <div class="gallery__overlay-medium">${art.medium}</div>
        </div>
      `;

      item.addEventListener('click', () => openLightbox(artworks.indexOf(art)));
      grid.appendChild(item);
    });

    // Re-trigger reveal animations
    requestAnimationFrame(() => {
      grid.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('revealed');
      });
    });
  }

  /* ── Filter Tabs ── */
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((f) => f.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderGallery(currentFilter);
    });
  });

  /* ── Lightbox ── */
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxMedium = document.getElementById('lightbox-medium');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  let currentLightboxIndex = 0;

  function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const art = artworks[currentLightboxIndex];
    lightboxImage.src = art.image;
    lightboxImage.alt = art.title;
    lightboxTitle.textContent = art.title;
    lightboxMedium.textContent = art.medium;
    lightboxDesc.textContent = art.description;
  }

  function navigateLightbox(direction) {
    currentLightboxIndex =
      (currentLightboxIndex + direction + artworks.length) % artworks.length;
    updateLightboxContent();
  }

  // Event listeners
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

  // Close on overlay click
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigateLightbox(-1);
        break;
      case 'ArrowRight':
        navigateLightbox(1);
        break;
    }
  });

  // Initial render
  renderGallery();
});
