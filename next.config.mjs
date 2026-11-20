const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/feed", destination: "/api/feed" },
      { source: "/swipe", destination: "/api/swipe" },
      { source: "/matches", destination: "/api/matches" },
      { source: "/reset", destination: "/api/reset" },
      { source: "/favicon.ico", destination: "/icon.svg" },
    ];
  },
};

export default nextConfig;
