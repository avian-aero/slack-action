const fs = require("fs");

const eventPath = process.env.GITHUB_EVENT_PATH;
const botToken = process.env.SLACK_BOT_TOKEN;
const channel = process.env.SLACK_CHANNEL_ID;

if (!eventPath || !fs.existsSync(eventPath)) {
  console.error("Bad event path", eventPath);
  process.exit(1);
}
if (!botToken) {
  console.error("Missing bot token in SLACK_BOT_TOKEN");
  process.exit(1);
}
if (!channel) {
  console.error(console.error("Missing channel ID in SLACK_CHANNEL_ID"));
  process.exit(1);
}
console.log("Channel:", channel);

if (!eventPath || !fs.existsSync(eventPath)) {
  console.error("Bad event path", eventPath);
  process.exit(1);
}

const event = JSON.parse(fs.readFileSync(eventPath));

console.log("=========>\n", JSON.stringify(event), "\n<=========");

const slackBody = {
  channel,
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*⛳ Feature Released:* ${event.pull_request.title.trim()}`,
      },
    },
    ...(event.pull_request.body?.trim() ? [{
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*📑 Feature Description:* \n\n ${event.pull_request.body.trim()}`,
      },
    }] : []),
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `<${event.pull_request.html_url}|View Pull Request>`,
      },
    },
  ],
};


const response = fetch('https://slack.com/api/chat.postMessage', {
  method: "POST",
  headers: {
    Authorization: `Bearer ${botToken}`,
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(slackBody),
}).then(response => console.log(JSON.stringify(response.json(), null, 2)));
