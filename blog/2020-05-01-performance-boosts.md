---
id: performance-boosts
title: Performance Boosts!
author: Chris Watson
author_title: Core Maintainer
author_url: https://github.com/watzon
author_image_url: https://avatars3.githubusercontent.com/u/4535422?v=4
tags: [update, performance]
---

Sorry it's been a while, anyone out there who might actually be reading this blog. Today I made a few changes that offer some pretty significant performance increases though, and as a bonus don't require any changes to existing code! So I wanted to take a minute and explain those changes, the benefits offered, and how I was able to find the bottleneck in the first place.

<!--truncate-->

So first we have the change itself, and really it just comes down to the removal of a single dependency, that dependency being [Halite](https://github.com/icyleaf/halite). Halite, for those that haven't touched it, is a pretty great HTTP client library for Crystal. It offers a much more convenient interface for making HTTP requests, and is very well documented. I have actually contributed to the project myself and have used it in several of my own projects.

Unfortunately, as I discovered today, it's considerably slower than Crystal's built in `HTTP::Client`. As to why this is, I don't know, but replacing Halite with `HTTP::Client` made requests almost instantaneous (whereas previously it took upwards of 1 second for requests to process). I'll to what I can to investigate bottlenecks in Halite itself at a later date, as I still use it in other projects, but for now I'm happy with the performance benefit I was able to get here by removing it.

So how did I figure out it was Halite causing the bottleneck and not another problem? After all, Tourmaline has gotten pretty big. Right now we're sitting at **6089** lines of Crystal code. And while Crystal is fast, it's certainly possible to write less-than-performant code with it. I'm sure I have plenty of my own bottlenecks that are just waiting to be fixed.

The answer: valgrind! More specifically, valgrind's callgrind tool, which I had no idea existed up until today. Callgrind itself is a profiling tool that records the call history between functions and generates a call graph. It gives us the ability to follow the execution of a running program and see where that program spends the most time. In the case of the echo bot example, which is what I used to test this, I was seeing that most of the time was being spent calling `Halite#request`.

This wasn't 100% unexpected, after all I was polling and polling makes a lot of requests. However I would've expected more time to be spent in the deserializing of requests, or any number of other things. Halite was not only at the top, but it was at the top by quite a bit. So I ripped it out. End of story!

If you happen to be using Tourmaline and notice a performance improvement let me know in the comments. It should be very noticeable.