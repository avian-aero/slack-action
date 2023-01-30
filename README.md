# Post Slack messages

Post slack messages on PR merge.

Inspired by abinoda/slack-action, but replaced the shell script with a JS script wwhich is more resilient to special characters, such as quotes, in the description.

```yaml
- name: Notify slack
  env:
    SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
    SLACK_CHANNEL_ID: ${{ secrets.SLACK_CHANNEL_ID }}
  uses: avian-aero/slack-action@master
```

## Setup

To use this GitHub Action you'll first need to create a Slack App and install it to your Slack workspace.

### Creating a Slack App

1. **Create a Slack App**. Go to [Slack's developer site](https://api.slack.com/apps) then click "Create an app". Name the app "GitHub Action" (you can change this later) and make sure your team's Slack workspace is selected under "Development Slack Workspace" ([see screenshot](docs/images/slack-app.png)).
2. **Add a Bot user**. Browse to the "Bot users" page listed in the sidebar. Name your bot "GitHub Action" (you can change this later) and leave the other default settings as-is ([see screenshot](docs/images/bot-user.png)).
3. **Set an icon for your bot.** Browse to the "Basic information" page listed in the sidebar. Scroll down to the section titled "Display information" to set an icon. Feel free to use one of the [icons in this repository](docs/app-icons).
4. **Install your app to your workspace.** At the top of the "Basic information" page you can find a section titled "Install your app to your workspace". Click on it, then use the button to complete the installation ([see screenshot](docs/images/install-slack-app.png)).

## Using the action

To use this GitHub Action, you'll need to set a `SLACK_BOT_TOKEN` secret on GitHub. To get your Slack bot token, browse to the "OAuth & Permissions" page listed in Slack and copy the "Bot User OAuth Access Token" beginning in `xoxb-`.

### Posting messages

Slack's [chat.postMessage](https://api.slack.com/methods/chat.postMessage) method accepts a JSON payload containing options — this JSON payload should be supplied as the argument in your GitHub Action. At a bare minimum, your payload must include a channel ID and the message. Here's what a basic message might look like:

```yaml
- name: Notify slack
  env:
    SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
  uses: pullreminders/slack-action@master
  with:
    args: '{\"channel\":\"C1234567890\",\"text\":\"Hello world\"}'
```

Please note that if you are using the visual editor you should not escape quotes because GitHub will automatically escape them for you.

#### Channel IDs

A "channel ID" can be the ID of a channel, private group, or user you would like to post a message to. Your bot can message any user in your Slack workspace but needs to be invited into channels and private groups before it can post to them.

If you open Slack in your web browser, you can find channel IDs at the end of the URL when viewing channels and private groups. Note that this doesn't work for direct messages.

```
https://myworkspace.slack.com/messages/CHANNEL_ID/
```

You can also find channel IDs using the Slack API. Get a list of channels that your bot is a member of via Slack's [users.conversations](https://api.slack.com/methods/users.conversations) endpoint. Get user IDs for direct messages using Slack's [users.lookupByEmail](https://api.slack.com/methods/users.lookupByEmail) endpoint

If the channel is private, you'll need to install the App in that channel.

#### Formatting messages

Please refer to [Slack's documentation](https://api.slack.com/docs/messages) on message formatting. They also have a [message builder](https://api.slack.com/docs/messages/builder) that's great for playing around and previewing messages. Your messages can contain attachments, markdown, buttons, and more.

## License

The Dockerfile and associated scripts and documentation in this project are released under the [MIT License](LICENSE).
