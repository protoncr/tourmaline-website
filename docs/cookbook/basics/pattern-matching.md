---
id: pattern-matching
title: Pattern Matching
---

### Intro

Sometimes you want your bot to be able to respond, not to commands, but to certain patterns. This could be for a number of reasons. Maybe you want it to be able to say "Hello" back whenever it hears someone say hello to the group, maybe you want to automatically mute someone that sends a link/email right after joining a group. Whatever the reason, Tourmaline's got your back.

### Using the `Hears` annotation

Tourmaline comes with an annotation called `Hears` which accepts a pattern and will call the annotated method any time that pattern is matched. Let's see an example:

```crystal
@[Hears(/^Hello/)
def on_hello(message)
  message.reply("Hello to you")
end
```

Now any time your bot sees a message that starts with "Hello" it will respond with "Hello to you". As with the `Command` annotation, the `Hears` annotation has a handler counterpart in the `HearsHandler` which can be used instead.