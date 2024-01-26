/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "imagedelivery.net",
      "customer-5cl8o9i7l8w678o9.cloudflarestream.com",
      // CLOUDFLARE_CUSTOMER_SUBDOMAIN
    ],
  },
  // plugins: ["prettier-plugin-tailwindcss"],
  async rewrites() {
    return [
      {
        source: "/api/community/posts/secret",
        destination: `/api/community/posts?secret=${process.env.NEXT_PUBLIC_REVALIDATION_SECRET_TOKEN}`,
      },
    ];
  },
};

module.exports = nextConfig;
