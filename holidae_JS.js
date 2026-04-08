/* ============================================================
   HOLIDAE — JAVASCRIPT  (holidae_JS.js)
   ============================================================
   This file handles all the interactive behaviour on the page.
   It runs after the HTML has loaded (script tag is at the
   bottom of the body in holidae_HTML.html).

   Contents:
   1.  Animated Star Field
   2.  Mobile Hamburger Menu
   3.  Booking Calculator
   4.  Scroll-Triggered Animations (Intersection Observer)
   ============================================================ */


/* ────────────────────────────────────────────────────────────
   1. ANIMATED STAR FIELD
   Creates 60 small div elements with random sizes, positions,
   and animation delays and appends them to the .stars container.
   This is done in JS rather than HTML so the positions are
   genuinely random each time the page loads.
──────────────────────────────────────────────────────────── */

const starsContainer = document.getElementById('stars');

for (let i = 0; i < 60; i++) {

  // Create a new <div> element for each star
  const star = document.createElement('div');
  star.className = 'star';

  // Random size between 1px and 3px
  const size = Math.random() * 2 + 1;

  // Random position within the top 55% of the page
  // (stars only appear in the hero/sky area)
  const topPos  = Math.random() * 55;
  const leftPos = Math.random() * 100;

  // Random animation timing so stars don't all twinkle together
  const delay    = Math.random() * 3;
  const duration = 2 + Math.random() * 2;

  // Apply all values as inline styles
  star.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    top: ${topPos}%;
    left: ${leftPos}%;
    animation-delay: ${delay}s;
    animation-duration: ${duration}s;
  `;

  starsContainer.appendChild(star);
}


/* ────────────────────────────────────────────────────────────
   2. MOBILE HAMBURGER MENU
   This is the simplest JavaScript on the page.
   When the hamburger icon is clicked, we add the class "open"
   to the mobile menu, which triggers its CSS to show it.
   When the close button or any menu link is clicked,
   we remove the class to hide it again.
──────────────────────────────────────────────────────────── */

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose  = document.getElementById('menuClose');

// Show the menu when hamburger is tapped
hamburger.addEventListener('click', function() {
  mobileMenu.classList.add('open');
});

// Hide the menu when the × button is tapped
menuClose.addEventListener('click', function() {
  mobileMenu.classList.remove('open');
});

// Hide the menu when any link inside it is tapped
// (so the menu closes when the user navigates to a section)
const menuLinks = document.querySelectorAll('.menu-link');
menuLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    mobileMenu.classList.remove('open');
  });
});


/* ────────────────────────────────────────────────────────────
   3. BOOKING CALCULATOR
   Keeps track of the current number of guests and nights
   in a state object, then recalculates the full price
   breakdown every time either value changes.

   Pricing rules:
   - Base rate: £150 per night
   - Extra guests (beyond 1): £25 per guest per night
   - Tax: 10% of the subtotal
──────────────────────────────────────────────────────────── */

// --- Constants ---
const BASE_RATE        = 150;  // £ per night
const EXTRA_GUEST_FEE  = 25;   // £ per extra guest per night
const TAX_RATE         = 0.1;  // 10%

// --- State object ---
// This holds the current values. All calculations read from here.
let bookingState = {
  guests: 2,
  nights: 1
};

/**
 * adj(field, delta)
 * Called by the + and − buttons in the HTML via onclick.
 * Updates the state and re-renders the price display.
 *
 * @param {string} field  - Either 'guests' or 'nights'
 * @param {number} delta  - Either +1 or -1
 */
function adj(field, delta) {
  // Math.max(1, ...) prevents the value going below 1
  bookingState[field] = Math.max(1, bookingState[field] + delta);
  renderCalculator();
}

/**
 * renderCalculator()
 * Reads the current state, calculates the price, and
 * updates every text node in the calculator UI.
 */
function renderCalculator() {
  const guests = bookingState.guests;
  const nights = bookingState.nights;

  // Update the stepper display values
  document.getElementById('guests-val').textContent = guests;
  document.getElementById('nights-val').textContent = nights;

  // --- Price calculations ---
  const basePrice  = BASE_RATE * nights;
  const extraGuests = Math.max(0, guests - 1); // Guests beyond the first
  const extrasTotal = extraGuests * EXTRA_GUEST_FEE * nights;
  const subtotal   = basePrice + extrasTotal;
  const tax        = Math.round(subtotal * TAX_RATE); // Round to avoid £15.0000001
  const grandTotal = subtotal + tax;

  // --- Update the breakdown display ---

  // Base rate row (e.g. "£150 × 2 nights")
  document.getElementById('rate-label').textContent =
    `\u00A3${BASE_RATE} \u00D7 ${nights} night${nights > 1 ? 's' : ''}`;
  document.getElementById('base-amt').textContent = `\u00A3${basePrice}`;

  // Tax row
  document.getElementById('tax-amt').textContent = `\u00A3${tax}`;

  // Grand total
  document.getElementById('total').textContent = `\u00A3${grandTotal}`;

  // Extra guests row — only show when there are extra guests
  const extraRow = document.getElementById('extra-row');

  if (guests > 1) {
    // Show the row and update the label
    extraRow.style.display = 'flex';
    document.getElementById('extra-label').textContent =
      `Extra guest${guests > 2 ? 's' : ''} \u00D7${extraGuests}`;
    document.getElementById('extra-amt').textContent = `\u00A3${extrasTotal}`;
  } else {
    // Hide the row — no extra guests
    extraRow.style.display = 'none';
  }
}

// Run once on page load to set the initial display
renderCalculator();


/* ────────────────────────────────────────────────────────────
   4. SCROLL-TRIGGERED ANIMATIONS (Intersection Observer API)

   The Intersection Observer watches for when elements enter
   the visible part of the screen (the viewport).
   When an element becomes visible, it adds the CSS class
   "visible", which triggers the fade-up transition defined
   in the CSS.

   This is more performance-friendly than using a scroll
   event listener, which fires constantly and can slow the
   page down.
──────────────────────────────────────────────────────────── */

/**
 * Create the observer.
 * threshold: 0.12 means the callback fires when 12% of the
 * element is visible — just enough to trigger the animation
 * before the user reaches it.
 */
const scrollObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {

      // Staggered delay: read from the data-delay attribute set below
      const delay = entry.target.dataset.delay || 0;

      setTimeout(function() {
        entry.target.classList.add('visible');
      }, delay);

      // Stop watching this element once it's been revealed
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });


// --- Destination cards ---
// Each card gets a staggered delay (0ms, 100ms, 200ms, ...)
// so they cascade in rather than all appearing at once.
const destCards = document.querySelectorAll('.dest-card');
destCards.forEach(function(card, index) {
  card.dataset.delay = index * 100;
  scrollObserver.observe(card);
});


// --- How it works steps ---
const steps = document.querySelectorAll('.step');
steps.forEach(function(step, index) {
  step.dataset.delay = index * 100;
  scrollObserver.observe(step);
});


// --- Tech cards ---
const techCards = document.querySelectorAll('.tech-card');
techCards.forEach(function(card, index) {
  card.dataset.delay = index * 100;
  scrollObserver.observe(card);
});
