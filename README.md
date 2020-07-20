# Platform

A US policy simulator. Create and share your political platform!

## Mockup

![Mockup](https://pbs.twimg.com/media/EcMljRmWkAYQH4V?format=jpg&name=large)

https://xd.adobe.com/view/3b7667fb-b2a4-41e0-bda8-7ccc3b8f4b64-6e25/

## Setup and developing

First, install dependencies. You will need Yarn (or NPM).

```
yarn
cd client && yarn && cd ..
cd server && yarn && cd ..
```

### Starting the app

```
yarn dev
```

### Starting Storybook

For viewing individual components.

```
cd client
yarn storybook
```

## Building and serving

Deploying to AWS is handled by AWS CodeBuild. Check out `buildspec.yaml` for the steps.