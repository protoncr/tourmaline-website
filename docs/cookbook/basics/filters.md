---
id: filters
title: Filters
---

### Intro

Filters are how Tourmaline handles filtering messages. They can be tacked onto `EventHandler`s in order to further filter out events you don't want to handle. Currently there are **2** filters, but in the future there will be quite a few more. The two we have right now are:

- [`RegexFilter`](https://api.tourmaline.dev/Tourmaline/RegexFilter.html)
- [`CommandFilter`](https://api.tourmaline.dev/Tourmaline/Command.html)

If you read [Your First Bot](../your-first-bot) you already used the `CommandFilter` without even knowing it. That's because the `Command` annotation actually adds an `On(:message)` event with a `CommandFilter`. It's just a little bit of syntactic sugar.

Here's an example of using the `CommandFilter` rather than the `Command` annotation:

```crystal
@[On(:message, CommandFilter.new("echo"))]
def echo_command(client, update)
  # ...
end
```

### FilterGroups

Filters are more powerful when used together. To enable you to compose filters each one has two special methods, `&` and `|`, which work more or less as you might expect.

Using the `&` operator between two filters creates a `FilterGroup` which requires that both filters evaluate to `true`.

Using the `|` operator between two filters creates a `FilterGroup` which requires that one of the sides evaluates to true. If the first one evaluates to true, the second one is never called.

As an example, let's create a command that also requires the user to provide a number as input:

```crystal
TestFilter = CommandFilter.new("int") & RegexFilter.new(/(\d+)$/)
```

This example is somewhat contrived, but you get the idea. By the same token, we could use the `|` operator to only require one or the other:

```crystal
TestFilter = CommandFilter.new("int") | RegexFilter.new(/(\d+)$/)
```