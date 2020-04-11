---
id: handling-events
title: Handling Events
---

### Intro

Tourmaline provides event handlers which are fired every time one of several [`UpdateAction`](https://watzon.github.io/tourmaline/Tourmaline/UpdateAction.html)'s is fired.

### The On Annotation

Tourmaline comes with a special annotation called `On` which accepts two parameters. The first is the event itself, which can be an `UpdateAction`, or a Symbol/String that resolves to an `UpdateAction`. The second, optional parameter is a [`Filter`]() which we'll go over later. Basic usage of the `On` annotation should look something like this:

```crystal
@[On(:message)]
def on_message(client, update)
  # This will be called every time there is a message
end
```

Annotations can also be stacked if you want to handle multiple events with the same method:

```crystal
@[On(:photo)]
@[On(:video)]
def on_photo_video(client, update)
  # This will be called when there's a photo or video
end
```

### Without an Annotation

You can also add event handlers without an annotation. Here's how:

```crystal
class MyBot < Tourmaline::Client
  # ...
end

bot = MyBot.new(ENV["API_KEY"])
bot.add_event_handler(:message) do |client, update|
  # This will be called every time there is a message
end
```

This can be useful if you need to add event handlers somewhat dynamically.