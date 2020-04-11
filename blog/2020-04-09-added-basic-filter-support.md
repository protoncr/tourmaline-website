---
id: added-basic-filter-support
title: Added Basic Filter Support
author: Chris Watson
author_title: Core Maintainer
author_url: https://github.com/watzon
author_image_url: https://avatars3.githubusercontent.com/u/4535422?v=4
tags: [update, feature]
---

Well another day another update. Today I decided to to some work on the event handling, because it wasn't quite up to my standard of quality. It's still not quite there, but I think anyone using the project will appreciate this addition.

<!--truncate-->

Something that I've been wanting for a while, which is a feature that [python-telegram-bot](https://github.com/python-telegram-bot/python-telegram-bot) actually has, is the ability to provide event handlers (think `@[On(:text)]` with filters. Allowing you to make sure the incoming update meets a certain criteria before calling your annotated function. We already have various handlers for doing a small amount of this for specific use cases, like the `CommandHandler` for filtering out messages that aren't commands, but up till now there was no way to easily filter things yourself in a way that was also easy to replicate.

That all changes today, at least for people using the `master` branch of Tourmaline. Keep in mind this feature is still in preview, and doubtless bugs will need to be worked out. Not to mention that there is only one filter right now. Filters could end up replacing some handlers in the future though.

So how do they work? Well I'm glad you asked. Take a look at this example code:

```crystal
require "../src/tourmaline"

class FilterBot < Tourmaline::Client
  HelloFilter = RegexFilter.new(/^hello/) | RegexFilter.new(/^hi/)

  @[On(:text, FilterBot::HelloFilter)]
  def on_hello(ctx)
    if message = ctx.message
      message.reply("https://nohello.com")
    end
  end
end

bot = FilterBot.new(ENV["API_KEY"])
bot.poll
```

In this example we create a contant `HelloFilter` which is made up of two filters. You may notice the pipe between the two filters. This is a special syntax used to form a `FilterGroup` using a number of filters. We'll go into that in a bit.

In the `On` handler we use `:text` to filter out updates that don't include a message with text, and then add our filter afterwards. This will now check every text message that comes in to see if they match our filter. If not the update won't ever make it to the `on_hello` message.

So what is a filter? It's just a simple class that extends `Tourmaline::Filter` and includes an `exec(update : Tourmaline::Update)` method which returns `true` if the update should be allowed through the filter, and `false` if the update should be discarded. Here's the definition of the `RegexFilter` (as it is right now, support still needs to be added for captions and other updates containing text):

```crystal
module Tourmaline
  class RegexFilter < Filter
    @expressions : Array(Regex)

    def initialize(*expressions : Regex)
      @expressions = expressions.to_a
    end

    def exec(update : Update) : Bool
      if message = update.message
        @expressions.each do |re|
          return true if re.match(message.text.to_s)
        end
      end
      false
    end
  end
end
```

As you can see it takes any number of regular expressions as input, then the exec method just checks the update, makes sure it contains a message, and makes sure the message's text matches at least one of the regular expressions. This format makes it very easy for you to add your own filters if needs be.

I mentioned that there were both `Filters` and `FilterGroup`s though, so what's up with that? Well In order to accomodate multiple filters I had a number of options. The first, which I almost went with in the beginning, would be just to have an array of filters. The problem with this was that it would just have to go through each filter from left to right and see if any of them matched, which means there's no way to say I want Filter A **and** Filter B. Every filter would basically be an OR with the next filter.

So I opted for the second choice. Create my own simple data type that overloads the `&` and `|` operators, allowing you to compose filters together. This is the same way that `python-telegram-bot` does things, so I figured it would be a decent enough solution. With this composing filters works just like any other data type (minus the small difference of `&` vs `&&` and `|` vs `||`), and in the end they just become a `FilterGroup`.