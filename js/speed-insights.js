/* ═══════════════════════════════════════════════════════════
   Vercel Speed Insights Integration
   ═══════════════════════════════════════════════════════════ */

// Import from CDN for production deployment
// Using esm.sh CDN which provides ES modules for npm packages
import { injectSpeedInsights } from 'https://esm.sh/@vercel/speed-insights@2.0.0';

// Initialize Vercel Speed Insights
// This will only track in production when deployed to Vercel
injectSpeedInsights({
  debug: false, // Set to true to see debug logs in development
});
