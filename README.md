# snooOrganizer

Manage your saved posts on Reddit 🤩

## Tech Stack

- Next.js using my [boilerplate](https://github.com/novellito/the-nextjs-starter)
- Serverless (JS Lambdas)


## Motive 

I mainly created this project to keep my React skills sharp as much of my work revolves around using Angular. This project also gave me more experience in working with serverless technologies which is all the rage right now. Along the way, I learned about Reddits API & about other libraries such as [react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component), [styled-components](https://styled-components.com/) and of course [react-redux](https://react-redux.js.org/).

## Features

- Reddit login without entering your password
- View/Unsave saved posts & saved comments
- Filter through saved content
- Light/Dark Theme
- Infinite Scroll

## Running the App

1. Create a `.env` file in the lambdas directory with the followinhg content

you'll need to register a new app with Reddit to get a Client_ID & Client_Secret - https://ssl.reddit.com/prefs/apps/

``` 
CLIENT_ID='your_id'
CLIENT_SECRET='your_seccret'ii
REDIRECT_URI='http://localhost:3000/'
```

2. `npm install` at the root directory & the lambdas directory
3. install [serverless](https://www.serverless.com/framework/docs/getting-started/) & in the lambdas directory run `sls offline`
4. at the root directory run `npm start`

