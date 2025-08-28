<script>
  import './header.css';
  import * as m from '$paraglide/messages';
  import { Locale } from '$components';
  
  let mobileMenuOpen = $state(false);
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
            type="button"
            class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onclick={() => mobileMenuOpen = !mobileMenuOpen}
          >
            <span class="sr-only">Open main menu</span>
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  {#if mobileMenuOpen}
    <div class="md:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <a href="/" class="mobile-nav-link">
          {m.nav_home()}
        </a>
        <a href="/services" class="mobile-nav-link">
          {m.nav_services()}
        </a>
        <a href="/locations" class="mobile-nav-link">
          {m.nav_locations()}
        </a>
        <a href="/about" class="mobile-nav-link">
          {m.nav_about()}
        </a>
        <a href="/contact" class="mobile-nav-link">
          {m.nav_contact()}
        </a>
      </div>
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
</style>
