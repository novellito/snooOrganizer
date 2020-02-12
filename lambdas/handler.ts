import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import reddit from './src/reddit';

export const getUserSavedContent: APIGatewayProxyHandler = async (
  event: any,
  _context
) => {
  const { code } = JSON.parse(event.body);
  const accessToken = await reddit.getAccessToken(code);
  return reddit.getSavedContent(accessToken);
};

export const unsaveContent: APIGatewayProxyHandler = async (
  event: any,
  _context
) => {
  const { code } = JSON.parse(event.body);
  const accessToken = await reddit.getAccessToken(code);
  return reddit.getSavedContent(accessToken);
};
