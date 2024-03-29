import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import reddit from './src/reddit';

export const loginAndGetSavedContent: APIGatewayProxyHandler = async (
  event: any,
  _context
) => {
  const { code } = JSON.parse(event.body);
  const accessToken = await reddit.getAccessToken(code);
  return reddit.getSavedContent(accessToken);
};
export const getUserSavedContent: APIGatewayProxyHandler = async (
  event: any,
  _context
) => {
  const { accessToken } = JSON.parse(event.body);
  return reddit.getSavedContent(accessToken);
};

export const unsaveContent: APIGatewayProxyHandler = async (
  event: any,
  _context
) => {
  const { id, accessToken } = JSON.parse(event.body);
  return reddit.unsaveContent(id, accessToken);
};

export default { unsaveContent, loginAndGetSavedContent, getUserSavedContent };
