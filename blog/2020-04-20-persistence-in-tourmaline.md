---
id: persistence-in-tourmaline
title: Persistence in Tourmaline
author: Chris Watson
author_title: Core Maintainer
author_url: https://github.com/watzon
author_image_url: https://avatars3.githubusercontent.com/u/4535422?v=4
tags: [update, persistence, release]
---

Persistence is a big deal for many bots, but providing an easy to use API for persistence is not a simple task. There are many reasons behind this, but the main one is that users tend to want multiple backends, and all of those backends have to be provided through an API that doesn't change between implementations. <!--truncate--> This is something that ORMs deal with all the time when trying to bridge the gap between databases like MySQL, PostgreSQL, and SQLite, not to mention the whole slew of NoSQL and Graph databases we have available. In the case of Tourmaline I don't have to do near as much work as an ORM, but I do have to make it possible to wrap an ORMs API while also enabling persistence without a database.

My first attempt at persistence wasn't bad. It included a base `Persistence` module which included several abstract definitions. Other types of persistence, such as `JsonPersistence` and `HashPersistence` then just had to include the base `Persistence` module, implement the abstract methods, and then get included in a `Client`. This method worked, but it had a couple downsides.

The biggest downside is that modules can't be instantiated. This meant that different types of persistence couldn't easily provide configuration options. This wasn't a big deal for other persistence types, but for the new `DBPersistence`, which I'll talk about in a second, it was a problem. The obvious solution was to make this a class instead of a module, but that provided me with another problem.

I want to make Tourmaline as easy to use as possible, and because of this I want to avoid `nil` values wherever possible. I don't, however, want to require users to use persistence if they have no need for it. To get around this issue I created a new persistence type to use as a default, `NilPersistence`. It implements the `Persistence` interface completely, however it does nothing. This allowed me to include persistence by default without actually including persistence.

So how does persistence work? I'm glad you asked.

Persistence right now is really simple. First you have to pick which one you want to use, and require it explicitly.

```crystal
require "tourmaline/persistence/json_persistence"
```

Then, when initializing your bot, pass a persistence instance in as the `persistence` argument.

```crystal
persistence = Tourmaline::JsonPersistence("mybot.json")
bot = MyBot.new(ENV["API_KEY"], persistence: persistence)
bot.poll
```

Currently there are 4 different types of persistence to choose from:

- `NilPersistence` - The default persistence type. Doesn't actually persist anything.
- `HashPersistence` - In memory persistence which utilizes hashes to store users and chats.
- `JsonPersistence` - Same as `HashPersistence`, but when the bot shuts down it writes the hashes to a JSON file.
- `DBPersistence` - Database persistence. Requires that you provide it with a `DB::Database` instance.

Each persistence type comes with two main methods for fetching persisted users and chats, `get_user` and `get_chat`, both of which accept either an id or a username. If the user or chat is not found they return `nil`. Let's look at an example of this in use:

```crystal
@[Command("info")]
def info_command(client, update)
  uid = update.context["text"].as_s.lstrip('@')
  if i = uid.to_i64?
    uid = i
  end

  if user = @persistence.get_user(uid)
    message = String.build do |str|
      str.puts user.inline_mention
      str.puts "  id: `#{user.id}`"
      str.puts "  username: `#{user.username}`"
    end
    update.message.try &.reply(message, parse_mode: :markdown)
  else
    update.message.try &.reply("User not found")
  end
end
```

In this example we are getting information about a persisted user and sending it to the chat. A full example is available [here](https://github.com/protoncr/tourmaline/blob/v0.17.0/examples/persistent_bot.cr).