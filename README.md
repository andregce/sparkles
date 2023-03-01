# Sparkles

✨ FREE INTERNET POINTS™!!! ✨

Sparkles is a Slack App that allows users to gift each other Internet Points™. 

The number of points accumulated by a user is stored and will be proudly displayed every time the user is sparkled again.

To start, add `@Sparkles` to the intended channel. Then, type the name of the user followed by an empty space and `++`. As in:

```
@Sparkles ++
```

Sparkles will reply on the channel with the total tally for the user. For example:

```
✨ Huzzah! @Sparkles now has 42 Internet Points™ 🥳
```

___

## Installing & Running

A custom application needs to be created on your Slack instance. Once created you will need the app's `SLACK_SIGNING_SECRET` and `SLACK_BOT_TOKEN` (for the `.env` file). You will also need to set the permissions and subscribe to events (details below).

1. Run: `cp .env.example .env`
1. Fill out the `.env` file with the required information.
1. Run: `npm i`
1. Run: `npm start`

___

## Slack Permissions

Sparkle needs the following `Bot Token Scopes`:

```
channels:history
chat:write
groups:history
users.profile:read
users:read
```

Sparkle also needs to be subscribed to the following `Bot Events`:

```
message.channels
message.groups
```

### What will Sparkles be able to view?

* Content and info about channels & conversations
  * View messages and other content in public and private channels that Sparkles has been added to
* Content and info about your workspace
  * View profile details about people in your workspace
  * View people in your workspace

### What will Sparkles be able to do?

* Perform actions in channels & conversations
  * Send messages as @sparkles

