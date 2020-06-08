---
id: inline-actions
title: Inline Actions
---

### Intro

In Telegram there are some bots capable of performing what are known as "inline actions". An example of some built-in inline bots are `@gif` and `@pic`, but sending gifs is just one of many potential ways to use an inline bot. For instance, [`@VorpalRobot`](https://t.me/VorpalRobot) rolls dice for DnD, Pathfinder, and other tabletop games.

### Answering Inline Queries

Inline queries are like any other event and can be listened for using the `UpdateHandler` and it's `On` annotation, or the `OnInlineQuery` annotation.

```crystal
@[OnInlineQuery]
def on_inline_query(ctx)
  results = InlineQueryResult.build do |builder|
    builder.article(
      id: "query",
      title: "Inline title",
      input_message_content: InputTextMessageContent.new("Click!"),
      description: "Your query: #{update.inline_query.try &.query}"
    )
  end

  ctx.query.answer(results)
end
```

As you can see here, the `OnInlineQuery` annotation can be used directly to handle inline queries. It's preferred over just using the `On` annotation for a couple reasons:

- Methods annotated with `OnInlineQuery` receive an [`InlineQueryHandler::Context`](https://api.tourmaline.dev/Tourmaline/InlineQueryHandler/Context.html) rather than a plain `Update`. This includes direct access to the query and more.
- `OnInlineQuery` accepts a `String` or `Regex` as an optional parameter. If included this will be used to match the received query and the generated `Regex::MatchData` will be passed to the context.