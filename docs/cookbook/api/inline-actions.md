---
id: inline-actions
title: Inline Actions
---

### Intro

In Telegram there are some bots capable of performing what are known as "inline actions". An example of some built-in inline bots are `@gif` and `@pic`, but sending gifs is just one of many potential ways to use an inline bot. For instance, [`@VorpalRobot`](https://t.me/VorpalRobot) rolls dice for DnD, Pathfinder, and other tabletop games.

### Answering Inline Queries

Inline queries are like any other event and can be listened for using the `EventHandler` and it's `On` annotation, or eventually, using the `OnInlineQuery` annotation.

```crystal
@[On(:inline_query)]
def on_inline_query(client, update)
  results = QueryResultBuilder.build do |builder|
    builder.article(
      id: "query",
      title: "Inline title",
      input_message_content: InputTextMessageContent.new("Click!"),
      description: "Your query: #{update.inline_query.try &.query}"
    )
  end

  update.inline_query.try &.answer(results)
end
```

The result set can contain any [`InlineQueryResult`](https://watzon.github.io/tourmaline/Tourmaline/InlineQueryResult.html)s. The `input_message_content` is what gets sent upon one of the items being clicked.

Soon there will be filters specific to inline queries as well, so keep posted.