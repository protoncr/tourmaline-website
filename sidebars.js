module.exports = {
  docs: {
    About: [
      'about/why-tourmaline',
      'about/the-crystal-language',
    ],
    Cookbook: [
      'cookbook/your-first-bot',
      {
        Basics: [
          'cookbook/basics/handlers',
          'cookbook/basics/commands',
          'cookbook/basics/pattern-matching',
          'cookbook/basics/listening-for-events'
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
