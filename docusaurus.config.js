module.exports = {
  title: 'Tourmaline Telegram Bot API Framework',
  tagline: 'Telegram Bot Framework',
  url: 'https://tourmaline.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'watzon', // Usually your GitHub org/user name.
  projectName: 'protoncr', // Usually your repo name.
  plugins: [
    '@docusaurus/plugin-google-analytics',
    '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
      },
  ],
  themeConfig: {
    sidebarCollapsible: false,
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/palenight'),
      additionalLanguages: ['ruby', 'crystal']
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
        {to: 'showcase', label: 'Showcase', position: 'left'}
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
          editUrl: 'https://github.com/protoncr/tourmaline-website/tree/master',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        blog: {
          feedOptions: {
            type: 'all',
            title: 'Tourmaline',
            decription: 'Blog for the Tourmaline Telegram bot API library',
            copyright: `Copyright © ${new Date().getFullYear()} Watzon Development`
          },
        }
      },
    ],
  ],
};
