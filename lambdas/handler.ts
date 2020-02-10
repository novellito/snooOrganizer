import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
const snoowrap = require('snoowrap');
// import snoowrap from 'snoowrap';

export const hello: APIGatewayProxyHandler = async (event: any, _context) => {
  //event.body --> has key
  const body = JSON.parse(event.body);

  // ! TODO: Implement error handling
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

  const savedContent = await r.getMe().getSavedContent();
  console.log(savedContent);
  // r.getSubmission('ejwnwg').unsave();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        savedPosts: savedContent
        // savedPosts: elem
      },
      null,
      2
    )
  };
};
