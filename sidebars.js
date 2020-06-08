module.exports = {
  docs: {
    About: [
      'about/why-tourmaline',
    ],
    Cookbook: [
      'cookbook/your-first-bot',
      {
        API: [
          'cookbook/api/handlers',
          'cookbook/api/webhooks',
          'cookbook/api/inline-actions',
          'cookbook/api/keyboards',
          'cookbook/api/games',
          'cookbook/api/stickers',
          'cookbook/api/payments'
        ],
        Extras: [
          {
            type: 'link',
            label: 'Video Tutorials',
            href: 'https://www.youtube.com/channel/UCq9HhcH4BQ960b-fo3TdIAw'
          },
          'cookbook/extras/multilevel-menus',
          'cookbook/extras/paginated-keyboards',
          'cookbook/extras/background-jobs',
          'cookbook/extras/stage',
          'cookbook/extras/kemal-middleware',
          'cookbook/extras/emoji-support'
        ]
      }
    ]
  },
};
