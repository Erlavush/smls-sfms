// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The 'images' configuration block
  images: {
    // Keep your existing SVG settings if needed
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // Configure allowed external image domains here
    remotePatterns: [
      // Keep existing patterns if you still need them (e.g., for ucarecdn)
      {
        protocol: 'https',
        hostname: 'ucarecdn.com', // Google logo source
        port: '',
        pathname: '/**', // Allow any path on this host
      },

      // --- THIS IS THE NEW PATTERN YOU NEED TO ADD ---
      {
        protocol: 'https',                // Protocol used by the site (usually https)
        hostname: 'www.spcdavao.edu.ph',  // The specific domain name
        port: '',                         // Leave empty for default ports (80/443)
        pathname: '/wp-content/uploads/**', // Allow images specifically from the uploads path
                                          // Using '/**' would allow any path, '/wp-content/uploads/**' is slightly more specific/secure
      },
      // --- END OF NEW PATTERN ---

      // Add any other domains you might need here in the future
    ],
  },
  // Add other Next.js configurations here if you have them (e.g., reactStrictMode)
};

// Export the configuration object
export default nextConfig;