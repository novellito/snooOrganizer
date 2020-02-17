import snoowrap from 'snoowrap';
import { JSONStringify } from '../utils/utils';

const clientCredsAndUserAgent = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  userAgent: 'SnooOrganizer v1.0 (by /u/Dbossez)'
};

export default {
  getAccessToken: async (code: string) => {
    const { accessToken } = await snoowrap.fromAuthCode({
      code,
      ...clientCredsAndUserAgent,
      redirectUri: process.env.REDIRECT_URI
    });
    return accessToken;
  },
  getSavedContent: async (accessToken: string) => {
    const snoowrapObj = new snoowrap({
      ...clientCredsAndUserAgent,
      accessToken
    });

    const savedContent = await snoowrapObj.getMe().getSavedContent();

    return {
      statusCode: 200,
      body: JSONStringify({ savedContent, accessToken })
    };
  },
  unsaveContent: async (contentId: string, accessToken: string) => {
    const snoowrapObj = new snoowrap({
      ...clientCredsAndUserAgent,
      accessToken
    });

    return snoowrapObj
      .getSubmission(contentId)
      .unsave()
      .then(res => {
        return {
          statusCode: 200,
          body: JSONStringify({ msg: 'unsave successful!', res })
        };
      })
      .catch(err => {
        return {
          statusCode: 500,
          body: JSONStringify({ msg: 'something went wrong!', err })
        };
      });
  }
};
