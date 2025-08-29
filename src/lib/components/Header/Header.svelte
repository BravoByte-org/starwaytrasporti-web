<script>
  import './header.css';
  import * as m from '$paraglide/messages';
  import { Locale } from '$components';
  import { onMount } from 'svelte';
  
  let mobileMenuOpen = $state(false);
  let mobileMenuButton = $state(null);
  let firstMobileLink = $state(null);
  let lastMobileLink = $state(null);
  let mobileMenuContainer = $state(null);
  
  // Focus trap variables
  let focusableElements = $state([]);
  
  // Handle keyboard events
  function handleKeydown(event) {
    if (event.key === 'Escape' && mobileMenuOpen) {
      closeMobileMenu();
      return;
    }
    
    // Focus trap when mobile menu is open
    if (mobileMenuOpen && event.key === 'Tab') {
      handleFocusTrap(event);
    }
  }
  
  // Focus trap logic
  function handleFocusTrap(event) {
    if (!mobileMenuContainer) return;
    
    // Get all focusable elements within the mobile menu
    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"]):not([disabled])'
    ];
    
    focusableElements = Array.from(
      mobileMenuContainer.querySelectorAll(focusableSelectors.join(', '))
    ).filter(el => !el.hasAttribute('disabled'));
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey) {
      // Shift + Tab: going backwards
      if (document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      // Tab: going forwards
      if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable?.focus();
      }
    }
  }
  
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    
    // Focus management
    if (mobileMenuOpen) {
      // Focus first mobile link when menu opens
      setTimeout(() => {
        firstMobileLink?.focus();
      }, 100);
    }
  }
  
  function closeMobileMenu() {
    mobileMenuOpen = false;
    // Return focus to menu button
    mobileMenuButton?.focus();
  }
  
  onMount(() => {
    // Add global keyboard listener
    document.addEventListener('keydown', handleKeydown);
    
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<header class="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            StarwayTrasporti
          </h1>
        </div>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:block">
        <div class="ml-10 flex items-baseline space-x-8">
          <a href="/" class="nav-link">
            {m.nav_home()}
          </a>
          <a href="/services" class="nav-link">
            {m.nav_services()}
          </a>
          <a href="/locations" class="nav-link">
            {m.nav_locations()}
          </a>
          <a href="/about" class="nav-link">
            {m.nav_about()}
          </a>
          <a href="/contact" class="nav-link">
            {m.nav_contact()}
          </a>
        </div>
      </nav>

      <!-- Language Switcher & Mobile Menu Button -->
      <div class="flex items-center space-x-4">
        <Locale />
        
        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            bind:this={mobileMenuButton}
            type="button"
            class="hamburger-button"
            class:hamburger-open={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            onclick={toggleMobileMenu}
          >
            <span class="sr-only">{mobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
            
            <!-- Animated hamburger icon -->
            <div class="hamburger-icon">
              <span class="hamburger-line hamburger-line-1"></span>
              <span class="hamburger-line hamburger-line-2"></span>
              <span class="hamburger-line hamburger-line-3"></span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  {#if mobileMenuOpen}
    <div 
      bind:this={mobileMenuContainer}
      class="md:hidden mobile-menu-container" 
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-button"
      aria-label="Main navigation menu"
    >
      <div class="mobile-menu-backdrop" onclick={closeMobileMenu}></div>
      <nav class="mobile-menu-content">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <a 
            bind:this={firstMobileLink}
            href="/" 
            class="mobile-nav-link"
            role="menuitem"
            onclick={closeMobileMenu}
          >
            {m.nav_home()}
          </a>
          <a 
            href="/services" 
            class="mobile-nav-link"
            role="menuitem"
            onclick={closeMobileMenu}
          >
            {m.nav_services()}
          </a>
          <a 
            href="/locations" 
            class="mobile-nav-link"
            role="menuitem"
            onclick={closeMobileMenu}
          >
            {m.nav_locations()}
          </a>
          <a 
            href="/about" 
            class="mobile-nav-link"
            role="menuitem"
            onclick={closeMobileMenu}
          >
            {m.nav_about()}
          </a>
          <a 
            bind:this={lastMobileLink}
            href="/contact" 
            class="mobile-nav-link"
            role="menuitem"
            onclick={closeMobileMenu}
          >
            {m.nav_contact()}
          </a>
        </div>
      </nav>
    </div>
  {/if}
</header>

<style lang="postcss">
  @reference "tailwindcss";
  
  .nav-link {
    @apply text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200;
  }
  
  .mobile-nav-link {
    @apply text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200;
  }
  
  /* Hamburger Button */
  .hamburger-button {
    @apply relative inline-flex items-center justify-center p-2 rounded-md;
    @apply text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white;
    @apply hover:bg-gray-100 dark:hover:bg-gray-800;
    @apply focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500;
    @apply transition-colors duration-200;
    width: 40px;
    height: 40px;
  }
  
  .hamburger-icon {
    position: relative;
    width: 20px;
    height: 16px;
  }
  
  .hamburger-line {
    @apply bg-current;
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 1px;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  .hamburger-line-1 {
    top: 0;
  }
  
  .hamburger-line-2 {
    top: 50%;
    transform: translateY(-50%);
  }
  
  .hamburger-line-3 {
    bottom: 0;
  }
  
  /* Hamburger Animation */
  .hamburger-open .hamburger-line-1 {
    transform: translateY(7px) rotate(45deg);
  }
  
  .hamburger-open .hamburger-line-2 {
    opacity: 0;
    transform: translateY(-50%) scaleX(0);
  }
  
  .hamburger-open .hamburger-line-3 {
    transform: translateY(-7px) rotate(-45deg);
  }
  
  /* Mobile Menu */
  .mobile-menu-container {
    position: fixed;
    top: 64px; /* Header height */
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
  }
  
  .mobile-menu-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(4px);
  }
  
  .mobile-menu-content {
    position: relative;
    z-index: 41;
    animation: slideDown 0.3s ease-out;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .hamburger-line,
    .mobile-menu-content {
      transition: none;
      animation: none;
    }
  }
</style>
