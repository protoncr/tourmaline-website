---
id: handlers
title: Handlers
---

### Intro

Every update sent by Telegram runs through a number of handlers, classes that are attached to your bot to handle updates. There are several built in handlers, such as:

- CallbackQueryHandler
- ChosenInlineResultHandler
- CommandHandler
- EventHandler
- HearsHandler
- InlineQueryHandler

and more. Each has a specific task, and can be attached to your bot one of two ways.

### Attaching Handlers

Handlers can be attached to your bot using the built in `#add_handler` client method. Each handler is different, but most all of them take a proc which runs when the handler is called. Let's use the `CommandHandler` as an example, since this will likely be one of the most used handlers.

```crystal
class EchoBot < Tourmaline::Client
  include Tourmaline

  def initialize
    add_handler(CommandHandler.new("echo", ->echo_command(CommandHandlerContext))
  end

  def echo_command(ctx)
    ctx.reply(ctx.text)
  end
end
```

The `add_handler` call also could've been made outside of the class, but you get it. Now this is nice and all, but I think we can do better. Enter: annotations.

```crystal
class EchoBot < Tourmaline::Client
  include Tourmaline

  @[Command("echo")]
  def echo_command(ctx)
    ctx.reply(ctx.text)
  end
end
```

Now isn't that nice? And all built in handlers come with an annotation attached. Better yet, you can make your own handlers as well.