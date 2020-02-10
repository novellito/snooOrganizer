import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
const snoowrap = require('snoowrap');
// import snoowrap from 'snoowrap';

export const hello: APIGatewayProxyHandler = async (event: any, _context) => {
  //event.body --> has key
  const body = JSON.parse(event.body);

  const { accessToken } = await snoowrap.fromAuthCode({
    code: body.code,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    userAgent: 'user agent here!'
  });
  const r = new snoowrap({
    userAgent: 'user agent here!',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    accessToken
  });

  const elem = await r.getMe().getSavedContent();
  console.log(elem);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        savedPosts: elem
        // savedPosts: elem
      },
      null,
      2
    )
  };
};
