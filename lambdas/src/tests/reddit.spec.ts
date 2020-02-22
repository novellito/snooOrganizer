import Reddit, { clientCredsAndUserAgent } from '../reddit';
import Snoowrap from 'snoowrap';

let mock;
beforeEach(() => {
  mock = jest.spyOn(Snoowrap, 'fromAuthCode');
});
describe('getAccessToken()', () => {
  it('should return the access token', async () => {
    mock.mockImplementation((): any => ({
      accessToken: 'theAccessToken123'
    }));
    const token = await Reddit.getAccessToken('123');
    expect(token).toEqual('theAccessToken123');
    expect(Snoowrap.fromAuthCode).toHaveBeenCalledWith({
      code: '123',
      ...clientCredsAndUserAgent,
      redirectUri: process.env.REDIRECT_URI
    });
  });
  it('should return undefined when there is no access token', async () => {
    mock.mockImplementation((): any => ({}));
    const token = await Reddit.getAccessToken('123');
    expect(token).toBeUndefined();
  });
});

describe('getSavedContent()', () => {
  it('should return the saved content', async () => {
    jest.spyOn(Snoowrap.prototype as any, 'getMe').mockReturnValue({
      getSavedContent: () => ({
        username: 'dbossez'
      })
    });
    const response = await Reddit.getSavedContent('abc123');
    const { content } = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(content.savedContent.username).toBe('dbossez');
    expect(content.accessToken).toBe('abc123');
  });

  it('should return a 500 status code on an error', async () => {
    jest.spyOn(Snoowrap.prototype as any, 'getMe').mockReturnValue({
      getSavedContent: () => {
        throw new Error('error');
      }
    });

    const response = await Reddit.getSavedContent('abc123');

    expect(response.statusCode).toBe(500);
  });
});

describe('unsaveContent()', () => {
  it('should unsave the provided content', async () => {
    jest.spyOn(Snoowrap.prototype as any, 'getSubmission').mockReturnValue({
      unsave: () =>
        Promise.resolve({
          id: 'unsave123'
        })
    });

    const response = await Reddit.unsaveContent('unsave123', 'accessToken');
    const { content } = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(content.res.id).toBe('unsave123');
  });

  it('should return a 500 status code on an error', async () => {
    jest.spyOn(Snoowrap.prototype as any, 'getSubmission').mockReturnValue({
      unsave: () => Promise.reject('err')
    });

    const response = await Reddit.getSavedContent('abc123');

    expect(response.statusCode).toBe(500);
  });
});
