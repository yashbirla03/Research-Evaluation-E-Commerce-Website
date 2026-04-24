document.addEventListener('DOMContentLoaded', () => {
  // Add subtle scroll reveal animation if needed
  const revealElements = document.querySelectorAll('.product-card, .promo-box');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  };

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver(revealCallback, observerOptions);

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });

  // Carousel Logic
  const track = document.querySelector('.carousel-track');
  if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-nav.next');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const dotsNav = document.querySelector('.carousel-indicators');
    const dots = Array.from(dotsNav.children);

    let currentSlideIndex = 0;

    const moveToSlide = (index) => {
      track.style.transform = 'translateX(-' + index * 100 + '%)';
      
      // Update active classes for animations
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');

      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');

      currentSlideIndex = index;
    };

    nextButton.addEventListener('click', () => {
      let nextIndex = currentSlideIndex + 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      moveToSlide(nextIndex);
    });

    prevButton.addEventListener('click', () => {
      let prevIndex = currentSlideIndex - 1;
      if (prevIndex < 0) prevIndex = slides.length - 1;
      moveToSlide(prevIndex);
    });

    dotsNav.addEventListener('click', e => {
      const targetDot = e.target.closest('span');
      if (!targetDot) return;
      const targetIndex = dots.findIndex(dot => dot === targetDot);
      moveToSlide(targetIndex);
    });

    // Auto advance
    setInterval(() => {
      let nextIndex = currentSlideIndex + 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      moveToSlide(nextIndex);
    }, 7000);
  }

  // See More Products Logic
  const seeMoreBtn = document.getElementById('see-more-btn');
  const catalogGrid = document.querySelector('.catalog-grid');
  if (seeMoreBtn && catalogGrid) {
    seeMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const cards = Array.from(catalogGrid.querySelectorAll('.catalog-card'));
      if (cards.length > 0) {
        // Append 4 more cards by cloning the first 4
        for (let i = 0; i < 4; i++) {
          const clone = cards[i % cards.length].cloneNode(true);
          // Set to visible explicitly, overriding any previous intersecting hidden state
          clone.style.transition = 'none';
          clone.style.opacity = '1';
          clone.style.transform = 'translateY(0)';
          catalogGrid.appendChild(clone);
        }
      }
    });
  }

  // As Seen In Carousel Logic
  const asSeenTrack = document.getElementById('as-seen-track');
  const asSeenPrev = document.getElementById('as-seen-prev');
  const asSeenNext = document.getElementById('as-seen-next');

  if (asSeenTrack && asSeenPrev && asSeenNext) {
      asSeenNext.addEventListener('click', (e) => {
          e.preventDefault();
          asSeenTrack.scrollLeft += 300;
      });
      asSeenPrev.addEventListener('click', (e) => {
          e.preventDefault();
          asSeenTrack.scrollLeft -= 300;
      });
  }
});

// =========================================================================
// CART DRAWER (SLIDE-OUT) LOGIC
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Append cart drawer dynamically
    const cartHTML = `
    <div class="cart-overlay" id="cartOverlay"></div>
    <div class="cart-drawer" id="cartDrawer">
        <div class="cart-header">
            <h3>My Bag</h3>
            <button class="cart-close-btn" id="cartCloseBtn">&times;</button>
        </div>
        <div class="cart-body">
            <div class="cart-item">
                <img src="assets/images/product1.jpg" class="cart-item-img" alt="Pillowcase" onerror="this.src='https://images.pexels.com/photos/10363290/pexels-photo-10363290.jpeg'">
                <div class="cart-item-details">
                    <div class="cart-item-title">1 x Crisp &amp; Cool 200 TC Egyptian Cotton Percale V Shaped Pillowcase</div>
                    <div class="cart-item-meta">Colour: Black</div>
                    <div class="cart-item-price">£7.99</div>
                    <div class="cart-item-actions">
                        <i class="fa-solid fa-pen"></i>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="cart-footer">
            <div class="cart-subtotal">
                <span>Subtotal:</span>
                <span>£7.99</span>
            </div>
            <button class="btn-checkout">PROCEED TO CHECKOUT</button>
            <button class="btn-view-bag">VIEW MY BAG <span class="arrow-circle"><i class="fa-solid fa-arrow-up" style="transform: rotate(45deg);"></i></span></button>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', cartHTML);

    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    
    // Header cart icons logic
    const cartIconLinks = document.querySelectorAll('a[aria-label="Cart"], .cart-icon-trigger');

    function openCart() {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('show');
    }
    function closeCart() {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('show');
    }

    cartIconLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    });

    cartCloseBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Product Page ADD TO BAG CTA Logic
    const addToBagBtn = document.querySelector('.pdp-add-to-bag');
    if(addToBagBtn) {
        addToBagBtn.addEventListener('click', () => {
            // Find cart count in header and increase it
            cartIconLinks.forEach(link => {
                const countBadge = link.querySelector('.cart-count');
                if(countBadge) {
                    let count = parseInt(countBadge.textContent);
                    countBadge.textContent = count + 1;
                }
            });
            openCart();
        });
    }
});

// =========================================================================
// CATALOG FILTER & SORT LOGIC
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.catalog-grid');
    if (!grid) return;

    const filterSort = document.getElementById('filter-sort');
    const filterColor = document.getElementById('filter-color');
    const filterSize = document.getElementById('filter-size');
    const filterMaterial = document.getElementById('filter-material');

    if (!filterSort || !filterColor || !filterSize || !filterMaterial) return;

    const filters = [filterSort, filterColor, filterSize, filterMaterial];

    // Store the original cards array 
    let cards = Array.from(grid.querySelectorAll('.catalog-card'));

    function applyFilters() {
        const sortVal = filterSort.value;
        const colorVal = filterColor.value;
        const sizeVal = filterSize.value;
        const materialVal = filterMaterial.value;

        // Filter logic
        cards.forEach(card => {
            const cColor = card.getAttribute('data-color') || '';
            const cSize = card.getAttribute('data-size') || '';
            const cMaterial = card.getAttribute('data-material') || '';

            let matchColor = (colorVal === 'All') || cColor === colorVal;
            let matchSize = (sizeVal === 'All') || cSize === sizeVal;
            let matchMaterial = (materialVal === 'All') || cMaterial === materialVal;

            if (matchColor && matchSize && matchMaterial) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Sort logic
        let visibleCards = cards.filter(card => card.style.display !== 'none');
        
        if (sortVal === 'price-low') {
            visibleCards.sort((a, b) => parseFloat(a.getAttribute('data-price') || 0) - parseFloat(b.getAttribute('data-price') || 0));
        } else if (sortVal === 'price-high') {
            visibleCards.sort((a, b) => parseFloat(b.getAttribute('data-price') || 0) - parseFloat(a.getAttribute('data-price') || 0));
        } else if (sortVal === 'top-rated') {
            visibleCards.sort((a, b) => parseFloat(b.getAttribute('data-reviews') || 0) - parseFloat(a.getAttribute('data-reviews') || 0));
        }

        // Reorder DOM by appending in sorted order
        visibleCards.forEach(card => grid.appendChild(card));
    }

    filters.forEach(select => select.addEventListener('change', applyFilters));
});

// =========================================================================
// DYNAMIC PRODUCT PAGE ROUTING
// =========================================================================
function openProduct(targetElement) {
    const card = targetElement.closest('.catalog-card') || targetElement.closest('.product-card') || targetElement.closest('.promo-box') || targetElement.closest('.ctl-card') || targetElement.closest('.ymal-card');
    
    if (!card) {
        window.location.href = 'product.html';
        return;
    }

    const titleEl = card.querySelector('.catalog-title') || card.querySelector('.product-title') || card.querySelector('.ctl-card-title') || card.querySelector('h4');
    const priceEl = card.querySelector('.catalog-price') || card.querySelector('.product-price') || card.querySelector('.ctl-card-price') || card.querySelector('.ymal-price');
    const imgEl = card.querySelector('img');

    let price = card.getAttribute('data-price') ? "£" + card.getAttribute('data-price') + ".00" : (priceEl ? priceEl.textContent.trim().split(' ')[0] : '£20.00');
    let title = titleEl ? titleEl.textContent.trim() : 'Luxury Item';
    let imgSrc = imgEl ? imgEl.getAttribute('src') : 'assets/images/placeholder.jpg';
    let color = card.getAttribute('data-color') || 'Cream';

    const params = new URLSearchParams({
        title: title,
        price: price,
        img: imgSrc,
        color: color
    });
    
    window.location.href = `product.html?${params.toString()}`;
}

document.addEventListener('DOMContentLoaded', () => {
    // Intercept clicks on product.html links
    const inlineElements = document.querySelectorAll('[onclick="window.location.href=\'product.html\'"]');
    inlineElements.forEach(el => {
        el.removeAttribute('onclick');
        el.addEventListener('click', (e) => {
            openProduct(e.target);
        });
    });

    const anchorLinks = document.querySelectorAll('a[href="product.html"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openProduct(e.target);
        });
    });

    // Populate PDP if on product parameter page
    if (window.location.pathname.includes('product.html')) {
        const params = new URLSearchParams(window.location.search);
        const pTitle = params.get('title');
        const pPrice = params.get('price');
        const pImg = params.get('img');
        const pColor = params.get('color');

        if (pTitle) {
            const titleEl = document.querySelector('.pdp-title');
            if (titleEl) titleEl.textContent = pTitle;
            const breadcrumbEl = document.querySelector('.breadcrumbs span');
            if (breadcrumbEl) breadcrumbEl.textContent = pTitle.length > 30 ? pTitle.substring(0, 30) + '...' : pTitle;
        }

        if (pPrice) {
            const currentPrice = document.querySelector('.pdp-current-price');
            const oldPrice = document.querySelector('.pdp-old-price');
            if (currentPrice) currentPrice.textContent = pPrice;
            if (oldPrice) {
                // generate a fake old price by adding 30%
                let num = parseFloat(pPrice.replace('£', ''));
                if(!isNaN(num)) oldPrice.textContent = 'Was £' + (num * 1.3).toFixed(2);
            }
        }

        if (pImg) {
            const mainImg = document.querySelector('.pdp-main-image');
            if (mainImg) mainImg.src = pImg;
            const activeThumb = document.querySelector('.pdp-thumb.active');
            if (activeThumb) activeThumb.src = pImg;
        }

        if (pColor) {
            const colorText = document.querySelector('.pdp-colors-section h4 strong');
            if (colorText) colorText.textContent = pColor;
        }
    }
});


// Handle floating ad dismissal
document.addEventListener('DOMContentLoaded', () => {
    const closeAdBtn = document.getElementById('amz-close-ad');
    const floatingAd = document.getElementById('amz-floating-ad');
    if(closeAdBtn && floatingAd) {
        closeAdBtn.addEventListener('click', () => {
            floatingAd.classList.add('hidden');
            setTimeout(() => {
                floatingAd.style.display = 'none';
            }, 300);
        });
    }
});


// Make all product cards, deals, and promotional items clickable
document.addEventListener('DOMContentLoaded', () => {
    // Select all product-like and category-like containers
    const linkableElements = document.querySelectorAll('.amz-deal-card, .amz-product-card, .amz-category-item, .amz-promo-card');
    
    linkableElements.forEach(element => {
        // Add pointer cursor if it doesn't already have one
        element.style.cursor = 'pointer';
        
        // Add click event to redirect to category.html
        element.addEventListener('click', (e) => {
            // Prevent redirect if they happen to click a button inside a promo card
            if (e.target.tagName.toLowerCase() === 'button') {
                window.location.href = 'category.html'; // In this case, clicking a button should do the same
                return;
            }
            window.location.href = 'category.html';
        });
    });
});


// Make floating ad clickable (except the close button)
document.addEventListener('DOMContentLoaded', () => {
    const floatingAd = document.getElementById('amz-floating-ad');
    if (floatingAd) {
        floatingAd.style.cursor = 'pointer';
        floatingAd.addEventListener('click', (e) => {
            // Prevent redirect if clicking the close button or its child icon
            if (e.target.closest('#amz-close-ad')) {
                return;
            }
            window.location.href = 'category.html';
        });
    }
});
