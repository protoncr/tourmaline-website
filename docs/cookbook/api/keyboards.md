---
id: keyboards
title: Keyboards
---

### Intro

Sometimes it might be nice to get user input via predefined options. This is where a reply keyboard comes in handy. Reply keyboards allow you to show a "keyboard" of sorts directly below the message field. Inline keyboards are keyboards which are directly attached to a message. Both are useful in different scenarios, and both come with a conventint `Builder` class.

### Reply Keyboards

Reply keyboards are created using the [`ReplyKeyboardMarkup`](https://api.tourmaline.dev/Tourmaline/ReplyKeyboardMarkup.html) class. They are great for when you ask a question and want a response from a small predefined set of options. The buttons will be large and appear right below the user's message input field.

They are also capable of a few things that inline keyboards are not. For example: requesting contact information, requesting a user's location, and prompting the user to create a poll. For a standard `KeyboardButton` without one of those options, the text that's on the button will be sent by the user on click.

Thanks to the [`ReplyKeyboardMarkup::Builder`](https://api.tourmaline.dev/Tourmaline/ReplyKeyboardMarkup/Builder.html) class, creating reply keyboards is a sinch:

```crystal
class KittyBot < Tourmaline::Client
  REPLY_MARKUP = ReplyKeyboardMarkup.build do
    text_button "/kitty"
    text_button "/kittygif"
  end

  API_URL = "https://thecatapi.com/api/images/get"

  @[Command(["start", "help"])]
  def help_command(ctx)
    ctx.message.reply("😺 Use commands: /kitty, /kittygif and /about", reply_markup: REPLY_MARKUP)
  end

  @[Command("about")]
  def about_command(ctx)
    text = "😽 This bot is powered by Tourmaline, a Telegram bot library for Crystal. Visit https://github.com/watzon/tourmaline to check out the source code."
    ctx.message.reply(text)
  end

  @[Command(["kitty", "kittygif"])]
  def kitty_command(ctx)
    # The time hack is to get around Telegram's image cache
    api = API_URL + "?time=#{Time.utc}&format=src&type="

    case ctx.text
    when "kitty"
      ctx.message.chat.send_chat_action(:upload_photo)
      ctx.message.chat.send_photo(api + "jpg")
    when "kittygif"
      ctx.message.chat.send_chat_action(:upload_photo)
      ctx.message.chat.send_animation(api + "gif")
    else
    end
  end
end
```

### Inline Keyboards

Telegram also allows the creation of inline keyboards. Inline keyboards, as the name states, are displayed inline right below the message they're attached to, rather than being attached below the message area. When creating an inline keyboard you have to listen for a button press and then act on it. This can be done with the `CallbackQueryHandler` and the `OnCallbackQuery` annotation. Let's take a look:

```crystal
REPLY_MARKUP = InlineKeyboadMarkup.build do |kb|
  kb.callback_button("pic", "pic")
  kb.callback_button("gif", "gif")
end

API_URL = "https://thecatapi.com/api/images/get"

@[Command(["start", "help"])]
def help_command(ctx)
  ctx.message.reply("😺 Use commands: /kitty, /kittygif and /about", reply_markup: REPLY_MARKUP)
end

@[OnCallbackQuery]
def kitty_command(ctx)
  # The time hack is to get around Telegram's image cache
  api = API_URL + "?time=#{Time.utc}&format=src&type="

  case context.query.data
  when "kitty"
    message.chat.send_chat_action(:upload_photo)
    message.chat.send_photo(api + "jpg")
  when "kittygif"
    message.chat.send_chat_action(:upload_photo)
    message.chat.send_animation(api + "gif")
  else
  end
end
```

And you'll end up with this:

![inline keyboard](https://i.imgur.com/UOTOSUO.png)