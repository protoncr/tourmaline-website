---
id: your-first-bot
title: Your First Bot
---

### Introduction

> In the beginning there was Crystal, and [watzon](https://github.com/watzon) saw the Crystal that it was good...

Creating a telegram bot can be a fun experience, but underdeveloped, poorly documented tools can ruin that experience more than a little. This is why Tourmaline was coded from the ground up to not only conform to the Telegram Bot API completely, but also to stay completely type safe while doing it. Tourmaline strives to do things The Crystal Way™ which means providing a better development experience from development to runtime.

### Creating Your First Bot

> Before getting started here please read up on [Telegram Bots](https://core.telegram.org/bots) and follow the instructions required to make your own bot. You will need a API key from `@botfather` on Telegram before you can make a working bot.

The first thing you need to do is set up a new Crystal project. This can be done by typing `crystal init app [project-name]` into your terminal and hitting enter. For the sake of this project we're going to assume your `project-name` is echo_bot.

Open the project folder `echo_bot` in your favorite text editor and then open the `shards.yml` file. Now anywhere you want (I tend to choose right above the `license`) paste the following code:

```yaml
dependencies:
  tourmaline:
    github: watzon/tourmaline
    branch: master
```

Enter `shards install` into your terminal and wait for the install to finish. Congratulations, you now have a Crystal project set up to work with Tourmaline. If you've done a project in Crystal before you probably skipped this section and I don't blame you.

Now let's open up the file in `src/echo_bot.cr` (remember you can replace `echo_bot` with whatever you named your project) and delete everything in the file. We don't need any of that.

At the top of the file import tourmaline with a `require` statement.

```crystal
require "tourmaline"
```

You should now have access to all the Tourmaline goodness within your project. Now we need to create our `EchoBot` class and extend the `Tourmaline::Client` class with it. Below the require statement enter the following:

```crystal
class EchoBot < Tourmaline::Client

end
```

If you don't understand what's happening here please refer to the [Crystal Book](https://crystal-lang.org/reference/syntax_and_semantics/inheritance.html).

Before we actually add any functionality to our bot let's make things are working. After the class you just created enter the following:

```crystal
API_KEY = "YOUR_BOT_API_KEY"
bot = EchoBot.new(API_KEY)
bot.poll
```

In case it wasn't obvious, replace `YOUR_BOT_API_KEY` with the bot api key given to you by `@botfather`. If you haven't gotten an API key yet please do so. `poll` is one of two methods that bring your bot online. The `poll` method acts by checking for updates constantly, but you can also use webhooks to make things more instantaneous and use less processing power. We'll go over webhooks in a later tutorial.

Now go to your terminal and run `crystal run ./src/echo_bot.cr`. If all goes well you should see the message

```
[INFO   ] - Polling for updates
```

in your console after a few seconds. Since we haven't defined any commands your bot won't be able to do anything, but it's online. If you get some kind of error instead pleas go back through the steps and see if you did anything wrong.

Ok, now it's time to make our bot do something. Inside of the `EchoBot` class enter the following code (I'll explain what it does):

```crystal
@[Tourmaline::Command("echo")]
def echo_command(ctx : Tourmaline::CommandContext)
  ctx.message.respond(ctx.text)
end
```

What's happening here?! It's pretty simple actually.

- First we use the `Tourmaline::Command` annotation to register the command we're going to create. The name of this command is `echo`.
- We create a method called `echo_command` which receives a [`Tourmaline::CommandContext`](https://api.tourmaline.dev/Tourmaline/CommandContext.html) object as a parameter.
- Inside the `echo_command` method we use the `respond` method that exists on `Message` objects to respond with the same text that was sent.

Let's run our bot again and try it out. On the terminal once again run `crystal run ./src/echo_bot.cr`. You should see the same message as before. Now in Telegram open up a private chat with your bot and send the message `/echo this is coming from tourmaline`, or anything else you want.

The bot should send the message right back to you.

If something is going wrong, this is what the completed bot code should look like:

```crystal
require "tourmaline"

class EchoBot < Tourmaline::Client
  @[Tourmaline::Command("echo")]
  def echo_command(ctx : Tourmaline::CommandContext)
    ctx.message.respond(ctx.text)
  end
end

API_KEY = "YOUR_BOT_API_KEY"
bot = EchoBot.new(API_KEY)
bot.poll
```

Congratulations, you have now written your first bot!
