---
id: listening-for-events
title: Listening for Events
---

### Intro

Tourmaline provides event listeners which are fired every time one of several [`UpdateAction`](https://watzon.github.io/tourmaline/Tourmaline/UpdateAction.html)'s is fired.

### Event Listener Annotation

Like commands, it's possible to annotate a method with an `On` annotation to designate that method as an event listener.`On` accepts any of the `UpdateAction`'s as an argument (although you can use symbols as well) and passes in an `EventContext` every time that update is seen.

As an example, let's listen for text messages and print them to the console:

```crystal
@[On(:text)]
def text_listener(ctx : EventHandler)
  if message = ctx.message
    logger.debug("Text: #{message.text}")
  end
end
```

As with the `Command` annotation, the `On` annotation also has a handler counterpart in the  `EventHandler`, which works in much the same way.