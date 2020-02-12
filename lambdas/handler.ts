import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { getAccessToken, getSavedContent } from './src/reddit';

export const getUserSavedContent: APIGatewayProxyHandler = async (
  event: any,
  _context
) => {
  const { code } = JSON.parse(event.body);
  const accessToken = await getAccessToken(code);
  return getSavedContent(accessToken);
};
