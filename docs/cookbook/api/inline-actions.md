---
id: inline-actions
title: Inline Actions
---

### Intro

In Telegram there are some bots capable of performing what are known as "inline actions". An example of some built-in inline bots are `@gif` and `@pic`, but sending gifs is just one of many potential ways to use an inline bot. For instance, `@VorpalRobot` rolls dice for DnD, Pathfinder, and other tabletop games.

### Answering Inline Queries

Inline queries are like any other event and can be listened for using the `EventHandler` and it's `On` annotation, or using the `InlineQueryHandler` and the `OnInlineQuery` annotation. The benefit to the latter is that it's specifically tuned to inline queries.

```crystal
@[OnInlineQuery]
def on_inline_query(ctx : InlineQueryContext)
  results = Tourmaline::QueryResultBuilder.new do |builder|
    builder.article(
      id: "query",
      title: "Inline title",
      input_message_content: Tourmaline::Model::InputTextMessageContent.new("Click!"),
      description: "Your query: #{query.query}"
    )
  end

  ctx.answer(results)
end
```

The result set can contain any [`InlineQueryResult`](https://watzon.github.io/tourmaline/Tourmaline/InlineQueryResult.html)s. The `input_message_content` is what gets sent upon one of the items being clicked.

The `OnInlineQuery` annotation, and subsequently the `InlineQueryHandler`, can also be tuned to filter inline queries out by their `id` or `query` field, just by providing a parameter with the same name. For instance:

```crystal
# This will filter out all inline queries that don't have an id of "test"
@[OnInlineQuery(id: "test")]

# This will filter out all inline queries that don't have a query field with "test"
@[OnInlineQuery(query: "test")]
```