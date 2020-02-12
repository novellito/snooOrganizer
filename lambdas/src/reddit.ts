import snoowrap from 'snoowrap';
import { JSONStringify } from '../utils/utils';

const clientCredsAndUserAgent = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  userAgent: 'SnooOrganizer v1.0 (by /u/Dbossez)'
};

export const getAccessToken = async (code: string) => {
  const { accessToken } = await snoowrap.fromAuthCode({
    code,
    ...clientCredsAndUserAgent,
    redirectUri: process.env.REDIRECT_URI
  });
  return accessToken;
};

export const getSavedContent = async (accessToken: string) => {
  const snoowrapObj = new snoowrap({
    ...clientCredsAndUserAgent,
    accessToken
  });

  const savedContent = await snoowrapObj.getMe().getSavedContent();

  return {
    statusCode: 200,
    body: JSONStringify(savedContent)
  };
};
