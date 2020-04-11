module.exports = {
  docs: {
    About: [
      'about/why-tourmaline',
    ],
    Cookbook: [
      'cookbook/your-first-bot',
      {
        Basics: [
          'cookbook/basics/handling-events',
          'cookbook/basics/filters',
        ],
        API: [
          'cookbook/api/webhooks',
          'cookbook/api/inline-actions',
          'cookbook/api/reply-keyboards',
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
          'cookbook/extras/kemal-middleware',
          'cookbook/extras/emoji-support'
        ]
      }
    ]
  },
};
