// Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-scale-in');
          observer.unobserve(entry.target); // only animate once
        }
      });
    }, {
      threshold: 0.3
    });

    // Apply to each grid card
    document.querySelectorAll('.grid-card-content').forEach(el => {
      observer.observe(el);
    });