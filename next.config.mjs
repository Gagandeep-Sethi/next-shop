/** @type {import('next').NextConfig} */
const nextConfig = {
  // images:{
  //   domains: "res.cloudinary.com"
  // }

  images: {
    remotePatterns: [
      {
        // Define a regular expression to match the Cloudinary hostname
        hostname: "res.cloudinary.com",
        // Include any additional regex options as needed
        // For example, to match both HTTP and HTTPS URLs, you can use the 'i' option
        // flags: 'i',
      },
    ],
  },
};

export default nextConfig;
