---
id: your-first-bot
title: Your First Bot
---

### Introduction

> In the beginning there was Crystal, and [watzon](https://github.com/watzon) saw the Crystal that it was good...

Creating a telegram bot can be a fun experience, but underdeveloped, poorly documented tools can ruin that experience more than a little. This is why Tourmaline was coded from the ground up to not only conform to the Telegram Bot API completely, but also to stay completely type safe while doing it. Tourmaline strives to do things The Crystal Way™ which means providing a better development experience from development to runtime.

### Creating Your First Bot

> Before getting started here please read up on [Telegram Bots](https://core.telegram.org/bots) and follow the instructions required to make your own bot. You will need a API key from [@BotFather](https://t.me/botfather) on Telegram before you can make a working bot.

The first thing you need to do is set up a new Crystal project. This can be done by typing `crystal init app [project-name]` into your terminal and hitting enter. For the sake of this project we're going to assume your `project-name` is echo_bot.

Open the project folder `echo_bot` in your favorite text editor and then open the `shards.yml` file. Now anywhere you want (I tend to choose right above the `license`) paste the following code:

```yaml
dependencies:
  tourmaline:
    github: protoncr/tourmaline
    version: 0.16.0
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
@[Command("echo")]
def echo_command(client, update)
  if message = update.message
    text = update.context["text"].as_s
    message.respond(text)
  end
end
```

What's happening here?! It's pretty simple actually.

- First we use the `Command` annotation to register the command we're going to create. The name of this command is `echo`.
- We create a method called `echo_command` which accepts a [`Client`](https://api.tourmaline.dev/Tourmaline/Client.html) and an [`Update`](https://api.tourmaline.dev/Tourmaline/Update.html) object.
- Inside the `echo_command` method we first have to use a _guard clause_ to make sure `update.message` exists. This is a limitation of Crystal and something I hope to fix in the future.
- Inside of the guard clause we first get the `"text"` item from the `UpdateContext`. We'll talk more about the `UpdateContext later.
- Lastly we use `message.respond` to echo the text back at the user. Since `"text"` is the raw text without the command, all we echo back is the text that came after the command.

Let's run our bot again and try it out. On the terminal once again run `crystal run ./src/echo_bot.cr`. You should see the same message as before. Now in Telegram open up a private chat with your bot and send the message `/echo this is coming from tourmaline`, or anything else you want.

The bot should send the message right back to you.

Just in case, this is what your final code should look like:

```crystal
require "tourmaline"

class EchoBot < Tourmaline::Client
  @[Command("echo")]
  def echo_command(client, update)
    if message = update.message
      text = update.context["text"].as_s
      message.respond(text)
    end
  end
end

API_KEY = "YOUR_BOT_API_KEY"
bot = EchoBot.new(API_KEY)
bot.poll
```

Congratulations, you have now written your first bot!
