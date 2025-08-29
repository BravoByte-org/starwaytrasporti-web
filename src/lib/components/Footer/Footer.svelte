<script>
  import * as m from '$paraglide/messages';
  import { Locale } from '$components';
  
  const currentYear = new Date().getFullYear();
  
  const companyLinks = [
    { key: 'nav_about', href: '/about' },
    { key: 'nav_services', href: '/services' },
    { key: 'nav_locations', href: '/locations' },
    { key: 'footer_careers', href: '/careers' }
  ];
  
  const supportLinks = [
    { key: 'nav_contact', href: '/contact' },
    { key: 'footer_help', href: '/help' },
    { key: 'footer_quote', href: '/quote' },
    { key: 'footer_tracking', href: '/tracking' }
  ];
  
  const legalLinks = [
    { key: 'footer_privacy', href: '/privacy' },
    { key: 'footer_terms', href: '/terms' },
    { key: 'footer_cookies', href: '/cookies' }
  ];
</script>

<footer class="bg-gray-900 text-white" data-testid="footer">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Main Footer Content -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      
      <!-- Company Info -->
      <div class="lg:col-span-1">
        <div class="flex items-center mb-4">
          <h2 class="text-2xl font-bold text-white">
            StarwayTrasporti
          </h2>
        </div>
        <p class="text-gray-300 mb-6 max-w-sm">
          {m.footer_description()}
        </p>
        
        <!-- Social Links -->
        <div class="flex space-x-4">
          <a 
            href="#" 
            class="social-link"
            aria-label="Facebook"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
            </svg>
          </a>
          <a 
            href="#" 
            class="social-link"
            aria-label="LinkedIn"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a 
            href="#" 
            class="social-link"
            aria-label="Email"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
      
      <!-- Company Links -->
      <div>
        <h3 class="footer-section-title">
          {m.footer_company_title()}
        </h3>
        <ul class="footer-links">
          {#each companyLinks as link}
            <li>
              <a href={link.href} class="footer-link">
                {m[link.key]()}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      
      <!-- Support Links -->
      <div>
        <h3 class="footer-section-title">
          {m.footer_support_title()}
        </h3>
        <ul class="footer-links">
          {#each supportLinks as link}
            <li>
              <a href={link.href} class="footer-link">
                {m[link.key]()}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      
      <!-- Contact & Language -->
      <div>
        <h3 class="footer-section-title">
          {m.footer_contact_title()}
        </h3>
        
        <!-- Contact Info -->
        <div class="space-y-3 mb-6">
          <div class="flex items-center space-x-3">
            <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span class="text-gray-300 text-sm">+39 02 1234 5678</span>
          </div>
          
          <div class="flex items-center space-x-3">
            <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span class="text-gray-300 text-sm">info@starwaytrasporti.it</span>
          </div>
          
          <div class="flex items-start space-x-3">
            <svg class="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-gray-300 text-sm">
              Via Roma 123<br>
              20121 Milano, Italy
            </span>
          </div>
        </div>
        
        <!-- Language Switcher -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            {m.language_switch()}
          </label>
          <Locale />
        </div>
      </div>
    </div>
    
    <!-- Footer Bottom -->
    <div class="border-t border-gray-700 mt-12 pt-8">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        <!-- Copyright -->
        <div class="text-gray-400 text-sm">
          © {currentYear} StarwayTrasporti. {m.footer_copyright()}
        </div>
        
        <!-- Legal Links -->
        <div class="flex flex-wrap justify-center md:justify-end space-x-6">
          {#each legalLinks as link}
            <a href={link.href} class="footer-legal-link">
              {m[link.key]()}
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
</footer>

<style lang="postcss">
  @reference "tailwindcss";
  
  .footer-section-title {
    @apply text-lg font-semibold text-white mb-4;
  }
  
  .footer-links {
    @apply space-y-2;
  }
  
  .footer-link {
    @apply text-gray-300 hover:text-white transition-colors duration-200 text-sm block;
  }
  
  .footer-legal-link {
    @apply text-gray-400 hover:text-white transition-colors duration-200 text-sm;
  }
  
  .social-link {
    @apply text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-md hover:bg-gray-800;
  }
</style>
