module.exports = {
  title: 'Tourmaline Telegram Bot API Framework',
  tagline: 'Telegram Bot Framework',
  url: 'https://tourmaline.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'watzon', // Usually your GitHub org/user name.
  projectName: 'protoncr', // Usually your repo name.
  plugins: ['@docusaurus/plugin-google-analytics'],
  themeConfig: {
    sidebarCollapsible: false,
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/palenight'),
      // additionalLanguages: ['crystal']
    },
    googleAnalytics: {
      trackingID: 'UA-163181710-1',
    },
    navbar: {
      title: 'Tourmaline',
      hideOnScroll: true,
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/about/why-tourmaline',
          activeBasePath: 'about',
          label: 'About',
          position: 'left',
        },
        {
          to: 'docs/cookbook/your-first-bot',
          activeBasePath: 'cookbook',
          label: 'Cookbook',
          position: 'left',
        },
        {
          href: 'https://api.tourmaline.dev',
          label: 'API',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/protoncr/tourmaline',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Cookbook',
              to: 'docs/cookbook/your-first-bot',
            },
            {
              label: 'API',
              to: 'docs/api/introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/protoncr/tourmaline',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/_watzon',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Chris Watson. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/protoncr/tourmaline-website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
