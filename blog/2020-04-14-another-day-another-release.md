---
id: another-day-another-release
title: Another Day, Another Release
author: Chris Watson
author_title: Core Maintainer
author_url: https://github.com/watzon
author_image_url: https://avatars3.githubusercontent.com/u/4535422?v=4
tags: [update, release]
---

Well here we are again. It's been 4 days since my [last post](./added-basic-filter-support-pt-2) where I went over `Filter`s and now here we are with a `v0.16.0` release. Mostly small things have changed besides the `Filter` stuff, but let's go over the few things you may care about.

<!--truncate-->

First of all, we now have a [changelog](https://github.com/protoncr/tourmaline/blob/master/CHANGELOG.md) which is exciting. I had been holding off adding one for a couple reasons, number one being they're somewhat of a pain to maintain. However I'm trying to ramp up production on Tourmaline in preparation for a v1.0 release of Crystal and there are a lot of changes happening pretty quickly, so I figured it would be worth it if having a changelog makes things a little easier on early adopters.

I of course added support for `Filter`s as mentioned, if you want to read about them you can see the posts [Added Basic Filter Support](./added-basic-filter-support) and [Added Basic Filter Support pt 2](./added-basic-filter-support-pt-2) where I explain all about them and why I decided to go this route. The `Handler` class was also removed, and the only remaining handler is the newly created `EventHandler`.

I also replaced my usage of [strange](https://github.com/hydecr/strange), a logger I built, with the new [`Log`](https://crystal-lang.org/api/0.34.0/Log.html) class that was added in Crystal 0.34.0. Removing external dependencies (even if I did write them) is always nice, and now log messages include that they're coming from `tourmaline.client`. I will try to continue expanding on this, hopefully making it a little easier to customize things, set custom log levels, etc., but for now this is where we are.

To go along with the logger change, you can now set the environment variable `VERBOSE` to `true` in order to get full debug logging. For now the only thing this changes is logging all updates to the console, which can be useful if something isn't working right. This won't be a forever change, as I do eventually want you to be able to set the log level itself using an environment variable _or_ your bot's configuration itself.

And last, but not least, the `File` model has been renamed to `TFile`. This is just to avoid conflicting with Crystal's built in `File` class. I'm not 100% sure yet if I'm happy with this or if I want to put all models back under a namespace (so they'd be something like `Model::File`). My only hangup with doing this is that it can become annoying to have to type out that namespace every time.

That's it! We're getting closer and closer to having this thing just about perfect. I've added some issues to the backlog in the [github repo](https://github.com/protoncr/tourmaline) if anyone cares to comment. The biggest thing that I want done soon is ORM support.