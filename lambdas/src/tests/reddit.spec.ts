import Reddit from '../reddit';
import snoowrap from 'snoowrap';

describe('reddit test suite', () => {
  it('should return the access token', async () => {
    const mock = jest.spyOn(snoowrap, 'fromAuthCode');
    mock.mockImplementation((): any => {
      return {
        accessTsoken: '123'
      };
    });
    // expect(mock).toHaveBeenCalled();
    const foo = await Reddit.getAccessToken('123');
    console.log(foo);
  });
});
