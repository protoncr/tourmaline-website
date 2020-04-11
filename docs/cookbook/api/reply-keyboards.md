---
id: reply-keyboards
title: Reply Keyboards
---

### Intro

Sometimes it might be nice to get user input via predefined options. This is where a reply keyboard comes in handy. Reply keyboards allow you to show a keyboard with a set of buttons that perform different actions. Let's go into what some of those actions are.

### Reply Keyboards

Tourmaline comes with a built in class called [`Model::ReplyKeyboardMarkup`](https://watzon.github.io/tourmaline/Tourmaline/Model/ReplyKeyboardMarkup.html). Any message can be sent with a `ReplyKeyboardMarkup` instance attached to attach a keyboard to the message. Here's a simple example:

```crystal
REPLY_MARKUP = Tourmaline::Model::ReplyKeyboardMarkup.new([
  [Tourmaline::Model::KeyboardButton.new("/kitty")],
  [Tourmaline::Model::KeyboardButton.new("/kittygif")],
])

@[Command(["start", "help"])]
def help_command(client, update)
  if message = update.message
    message.reply("😺 Use commands: /kitty, /kittygif and /about", reply_markup: REPLY_MARKUP)
  end
end
```

You'll end up with a keyboard that looks like this:

![kitty reply keyboard](https://i.imgur.com/AHfTaBv.png)

### The Markup Module

As you may have noticed, the keyboard creation process is pretty verbose. Luckily there is a module to help you out. The [`Markup`](https://watzon.github.io/tourmaline/Tourmaline/Markup.html) module includes a number of keyboard related convenience methods. Let's modify the previous code block using `Markup` instead.

```crystal
REPLY_MARKUP = Markup.buttons([
  ["/kitty"], ["/kittygif"],
]).keyboard

@[Command(["start", "help"])]
def help_command(client, update)
  if message = update.message
    message.reply("😺 Use commands: /kitty, /kittygif and /about", reply_markup: REPLY_MARKUP)
  end
end
```

You can check out the documentation for the [`Markup`](https://watzon.github.io/tourmaline/Tourmaline/Markup.html) module for more information.

### Inline Keyboards

Telegram also allows the creation of inline keyboards. Inline keyboards, as the name states, are displayed inline right below the message they're attached to, rather than being attached below the message area. Let's try to do the same thing as before, but with an inline keyboard.

```crystal
REPLY_MARKUP = Markup.inline_buttons([
  Markup.callback_button("pic", "pic")
  Markup.callback_button("gif", "gif"),
]).inline_keyboard

@[Command(["start", "help"])]
def help_command(client, update)
  if message = update.message
    message.reply("😺 Use commands: /kitty, /kittygif and /about", reply_markup: REPLY_MARKUP)
  end
end

@[On(:callback_query)]
def kitty_command(client, update)
  if message = update.message
    # The time hack is to get around Telegram's image cache
    api = API_URL + "?time=#{Time.utc}&format=src&type="

    case update.context["command"].as_s
    when "kitty"
      message.chat.send_chat_action(:upload_photo)
      message.chat.send_photo(api + "jpg")
    when "kittygif"
      message.chat.send_chat_action(:upload_photo)
      message.chat.send_animation(api + "gif")
    else
    end
  end
end
```

With that code you should end up with this:

![inline keyboard](https://i.imgur.com/UOTOSUO.png)