---
id: added-basic-filter-support-pt-2
title: Added Basic Filter Support (pt. 2)
author: Chris Watson
author_title: Core Maintainer
author_url: https://github.com/watzon
author_image_url: https://avatars3.githubusercontent.com/u/4535422?v=4
tags: [update, feature]
---

In [yesterday's post](./added-basic-filter-support) I explained some changes to the Tourmaline API, and my rationale for making those changes. After writing that post I had a somewhat better idea of where exactly I wanted to take those changes, so in this post I'll go over the conclusions I made.

<!--truncate-->

First of all, I had mentioned thinking about replacing `Handler`s with `Filter`s. After a little bit of deliberation I decided this was the route I wanted to go, so I did so. The handler code was a [massive mess](https://github.com/protoncr/tourmaline/blob/3912eff3a10a39d3e3f5129553e998a5bc6aaa40/src/tourmaline/handler.cr), and was never my ideal way of doing things. `Filter`s make things much simpler and cleaner, at the expense of a tiny bit more work for the end user.

This does not mean the `Command` annotation is going away. On the contrary, using the `EventHandler` and `Filter`s made it even easier to implement additional annotations like `Command`, but without a massive, messy, bug-prone macro. But wait, that's not all!

Something that annoyed me about the previous system was the lack of a clear context. Every handler was forced to have it's own `_Context` object, such as `CommandContext` and `EventContext`. This was a simple struct that wrapped the `Client`, `Update`, and potentially `Message`, `InlineQuery`, etc etc. It conveniently, though potentially buggily, forwarded missing arguments to each item in the struct, allowing you to do things like `ctx.reply` rather than `ctx.message.reply`. This was nice, but had a couple of issues.

The first issue was predictability. Ideally code should be as predictable as possible, and with each `Handler` having their own context this was not the case. Additionally each additional handler increased the maintenance burden twofold. First I had to worry about the handler itself, then I also had to worry about the `Context` object. I'm happy to announce that this complexity has been reduced enormously!

Having a modifiable context is something that many web frameworks have, but usually those frameworks are from dynamic languages like JavaScript and Python. This is because most dynamic languages, being untyped, allow you to create objects of different types on the fly at runtime. Even Typescript has the `any` escape hatch. Crystal on the other hand, being statically typed, doesn't allow these kinds of runtime modifications. If an object says it has certain properties, it has those properties. No more and no less.

This is obviously great for safety and preventing runtime errors, but it's not so great for cases like this where you'd like to be able to have certain methods modify a context and pass it around. Luckily, I found a workable solution by looking at the code for Crystal's new `Log` module. In specific, the [`Log::Context`](https://crystal-lang.org/api/0.34.0/Log/Context.html) seemed to have exactly what I needed. Feel free to take a look at [it's code](https://github.com/crystal-lang/crystal/blob/4401e90f001c975838b6708cc70868f18824d1e5/src/log/context.cr#L4) and the code for [`Tourmaline::UpdateContext](https://github.com/protoncr/tourmaline/blob/master/src/tourmaline/update_context.cr) and you'll be sure to see the similarities.

So what does this all mean for you? Well a couple things. First of all, `Filter`s now add relevant information to `update.context` as you can see in this example:

```crystal
@[Command("echo")]
def echo_command(client, update)
  text = update.context["text"].as_s
  update.message.try &.reply(text)
end
```

`UpdateContext` or `update.context` is very similar to objects like `JSON::Any` and `YAML::Any`. It is a container object that holds other container objects. Since it doesn't know what any of these objects are for sure, you have to coerce the internal object to the right type (hence the `as_s` for "as string"). To see what items individual filters add to the context, you can just look at the filter's entry in the [API documentation](https://api.tourmaline.dev/). For instance, in the the [`CommandFilter`](https://api.tourmaline.dev/Tourmaline/CommandFilter.html) entry, under "Context additions" you can see that it adds `command` and `text` items.

Anyway, that's all for now. Big changes, and a new release will be out soon.