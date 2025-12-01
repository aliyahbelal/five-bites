// Location data for tabs (demo). Replace coordinates/embed URLs with real ones when available.
const locations = {
  downtown: {
    title: 'وسط البلد',
    iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.5601893064036!2d31.23571131511537!3d30.044419881889066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458452f0f2f1f3f%3A0x0!2z2YHYp9mG2Kkg2YPZhiDYp9mE2YjYt9ixINmF2LXYqtin2Kog2KfZhSDYqNiv2YfYqQ!5e0!3m2!1sar!2seg!4v1600000000000!5m2!1sar!2seg',
    address: '#1 ميدان التحرير، وسط البلد. بجوار المطاعم الرئيسية.'
  },
  zamalek: {
    title: 'الزمالك',
    iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.5601893064036!2d31.22571131511537!3d30.054419881889066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458452f0f3e1f3f%3A0x0!2z2YHYp9mG2Kkg2YPZhiDYp9mE2YjYt9ix!5e0!3m2!1sar!2seg!4v1600000000001!5m2!1sar!2seg',
    address: '#42 شارع 26 يوليو، الزمالك. بجوار الكافيه الكبير.'
  },
  korba: {
    title: 'الكوربة',
    iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.5601893064036!2d31.24571131511537!3d30.034419881889066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458452f0f4f1f3f%3A0x0!2z2YHYp9mG2Kkg2YPZhiDYp9mE2YjYt9ix!5e0!3m2!1sar!2seg!4v1600000000002!5m2!1sar!2seg',
    address: '#16 شارع بغداد (الدور الأول)، أعلى بنك القاهرة. بجوار مدخل الكوربة.'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab');
  const mapFrame = document.getElementById('mapFrame');
  const branchTitle = document.querySelector('.branch-title');
  const addressP = document.querySelector('.address');

  function activateTab(key, buttonEl) {
    // update active class
    tabButtons.forEach(b => b.classList.remove('active'));
    if (buttonEl) buttonEl.classList.add('active');

    // update content
    const loc = locations[key];
    if (!loc) return;
    mapFrame.src = loc.iframe;
    branchTitle.textContent = loc.title;
    addressP.textContent = loc.address;
  }

  // attach clicks
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = btn.getAttribute('data-key');
      activateTab(key, btn);
    });
  });

  // initial
  activateTab('korba', document.querySelector('.tab[data-key="korba"]'));
});