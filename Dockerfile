FROM node:18-alpine

LABEL "com.github.actions.name"="Post Slack messages"
LABEL "com.github.actions.description"="Post Slack messages from your own bot"
LABEL "com.github.actions.icon"="hash"
LABEL "com.github.actions.color"="gray-dark"

LABEL version="1.0.0"
LABEL repository="http://github.com/avian-aero/slack-action"

ADD node-pr-to-slack.js /

ENTRYPOINT ["node", "node-pr-to-slack.js"]

