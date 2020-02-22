import Handler from '../../handler';
import Reddit from '../reddit';
jest.mock('../reddit');

describe('getUserSavedContent()', () => {
  it('should return the users saved content', async () => {
    const accessToken = '123';
    jest
      .spyOn(Reddit, 'getAccessToken')
      .mockReturnValue(Promise.resolve(accessToken));

    jest.spyOn(Reddit, 'getSavedContent').mockReturnValue(
      Promise.resolve({
        statusCode: 200,
        body: 'nice'
      })
    );

    await Handler.getUserSavedContent(
      { body: '{"code":"code123"}' } as any,
      'foo' as any,
      () => {}
    );

    expect(Reddit.getAccessToken).toHaveBeenCalledWith('code123');
    expect(Reddit.getSavedContent).toHaveBeenCalledWith(accessToken);
  });
});

describe('unsaveContent()', () => {
  it('should unsave the content', async () => {
    jest.spyOn(Reddit, 'unsaveContent').mockReturnValue(
      Promise.resolve({
        statusCode: 200,
        body: 'nice'
      })
    );

    await Handler.unsaveContent(
      { body: '{"accessToken":"token123", "id":"id123"}' } as any,
      'foo' as any,
      () => {}
    );

    expect(Reddit.unsaveContent).toHaveBeenCalledWith('id123', 'token123');
  });
});
