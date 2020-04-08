---
id: commands
title: Commands
---

### Intro

Commands allow users to interact with your bot by prefixing their input with a specific command that your bot recognizes. Most commands come in the form `/` + `command_name`, but commands can also be prefixed with any number of characters.

### The Command annotation

Adding a command to your bot is super easy in Tourmaline using the command annotation provided by the `CommandHandler`. With it, any method in your bot can be turned into a command, provided that method accepts a single `CommandContext` parameter.

```crystal
@[Tourmaline::Command("echo")]
def echo_command(ctx : CommandContext)
  text = ctx.text.split(/\s+/, 1)[1]
  ctx.message.respond(text)
end
```

As you can see, the method `echo_command` takes a single parameter, `ctx`, which is a `CommandContext` object. This object contains a reference to the client, the update, the message, the name of the command, and the message text.

The `Command` annotation also takes the same parameters as the `CommandHandler`(besides the `proc`, which wrapps the annotated method). This means you can use it to set a custom `prefix`, only allow its use in private with `private_only`, and allow the command's use `anywhere` in the message (by default commands are only recognized if they're at the beginning.

```crystal
# This is the default configuration, besides the "echo"
@[Command("echo", prefix: "/", private_only: false, anywhere: false)]
```

The `Command` annotation can also be used to alias multiple commands to the same method. You can do that by making the command name an array instead of a string.

```crystal
@[Command(["echo", "repeat"])]
```

### Adding Commands Dynamically

The annotation is nice, but it doesn't help for adding commands dynamically. To do that, use the `CommandHandler` directly as shown in the [Handlers](https://github.com/watzon/tourmaline/wiki/Handlers) section. For example:

```crystal
# ... build EchoBot

bot = EchoBot.new(ENV["API_KEY"])
echo_handler = Tourmaline::CommandHandler.new("echo", ->bot.echo_command(Tourmaline::CommandContext))

bot.add_handler(echo_handler)

bot.poll
```

Unfortunately adding a command this way is a little more verbose, but doing this you can easily generate commands from a database, configuration file, etc.