const headers = [
  { key: 'Access-Control-Allow-Credentials', value: 'true' },
  {
    key: 'Access-Control-Allow-Origin',
    value: 'https://daily-producthunt.dongwook.kim'
  },
  {
    key: 'Access-Control-Allow-Methods',
    value: 'GET,DELETE,PATCH,POST,PUT'
  },
  {
    key: 'Access-Control-Allow-Headers',
    value:
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  }
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ph-files.imgix.net' },
      { protocol: 'https', hostname: 'i.imgur.com' }
    ]
  },
  async headers() {
    return [
      { source: '/api/post', headers },
      { source: '/api/send-message', headers }
    ]
  }
}

module.exports = nextConfig
