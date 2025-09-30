 // small utilities for carousel and mobile menu
document.addEventListener('DOMContentLoaded', () => {
  // year
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;

  // mobile menu toggle (very small)
  const menuToggle = document.getElementById('menuToggle');
  menuToggle &&
    menuToggle.addEventListener('click', () => {
      const nav = document.querySelector('.nav');
      if (!nav) return;
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });

  // simple carousel next/prev scroll
  const carousel = document.getElementById('carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const prev = carousel.querySelector('.carousel-nav.prev');
    const next = carousel.querySelector('.carousel-nav.next');
    const cardWidth =
      () => track.querySelector('.card').getBoundingClientRect().width + 12;

    [prev, next].forEach(
      (btn) =>
        btn &&
        btn.addEventListener('click', () => {
          const dir = Number(btn.dataset.dir);
          track.scrollBy({ left: dir * cardWidth(), behavior: 'smooth' });
        })
    );

    // touch swipe / drag
    let startX = 0,
      scLeft = 0,
      isDown = false;

    track.addEventListener('pointerdown', (e) => {
      isDown = true;
      startX = e.clientX;
      scLeft = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
    });

    track.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const dx = startX - e.clientX;
      track.scrollLeft = scLeft + dx;
    });

    track.addEventListener('pointerup', (e) => {
      isDown = false;
      try {
        track.releasePointerCapture(e.pointerId);
      } catch (err) {
        // ignore if already released
      }
    });
  }
});
