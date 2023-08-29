module.exports = {
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: "http://localhost:3001/:path*",
        },
      ],
    };
  },
};
