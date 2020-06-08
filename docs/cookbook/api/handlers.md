---
id: handlers
title: Handlers
---

### Intro

Tourmaline uses handlers to handle incoming requests. All handlers are subclasses of the [`EventHandler`](https://api.tourmaline.dev/Tourmaline/EventHandler.html) abstract class and can be attached to a client using the `add_event_handler` method. By default all handlers are async, so your bot should continue to be fast even with hundreds of handlers (especially if you're using the `-Dpreview_mt` flag to get multithreading support).

### Creating Your Own

Handlers require a single method to be included, the `call` method which takes an `Update` object. Most handlers should also have an initializer which takes a block, saves that block as an instance variable, and calls it with the result of the `call` method. For example:

```crystal
class MyHandler < Tourmaline::EventHandler
  def initialize(&block : Update)
    @proc = block
  end

  def call(update : Update)
    # Do something
    @block.call(update)
  end
end
```

Handlers are also responsible for their own annotation handling. If a handler has a `self.annotate` method it will be called automatically at startup. For an example see [`CommandHandler.annotate`](https://github.com/protoncr/tourmaline/blob/6453c4498298a0ef77e5c28b028e4c8eb824da22/src/tourmaline/handlers/command_handler.cr#L88).