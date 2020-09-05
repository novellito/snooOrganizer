import snoowrap from 'snoowrap';
import { JSONStringify, extractRelevantProps } from '../utils/utils';
import HttpResponse from '../utils/http_response';

const HttpRes = new HttpResponse();

export const clientCredsAndUserAgent = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  userAgent: 'SnooOrganizer v1.0 (by /u/Dbossez)'
};

export default {
  getAccessToken: async (code: string) => {
    try {
      const { accessToken } = await snoowrap.fromAuthCode({
        code,
        ...clientCredsAndUserAgent,
        redirectUri: process.env.REDIRECT_URI
      });
      return accessToken;
    } catch (err) {
      return err;
    }
  },
  getSavedContent: async (accessToken: string) => {
    const snoowrapObj = new snoowrap({
      ...clientCredsAndUserAgent,
      accessToken
    });
    try {
      // supress typescript message from snoowrap
      // @ts-ignore
      const user = await snoowrapObj.getMe();
      const username = user.name;
      const savedContent = await user.getSavedContent();

      return HttpRes.successResponse(
        JSONStringify({
          savedContent, // used for debugging
          accessToken,
          username,
          postCardData: extractRelevantProps(savedContent)
        })
      );
    } catch (err) {
      return HttpRes.serverError('Access forbidden', err.statusCode || 500);
    }
  },
  unsaveContent: (contentId: string, accessToken: string) => {
    console.log(contentId, accessToken);
    const snoowrapObj = new snoowrap({
      ...clientCredsAndUserAgent,
      accessToken
    });

    // return HttpRes.serverError('YEET', 500);
    // snoowrapObj.revokeAccessToken();

    return snoowrapObj
      .getSubmission(contentId)
      .unsave()
      .then((res) =>
        HttpRes.successResponse(
          JSONStringify({ msg: 'unsave successful!', res })
        )
      )
      .catch((err) => {
        return HttpRes.serverError(err.message, err.statusCode);
      });
  }
};
