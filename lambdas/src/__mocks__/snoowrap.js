const Snoowrap = jest.genMockFromModule('snoowrap');
Snoowrap.getMe = () => ({
  getSavedContent: jest.fn()
});

export default Snoowrap;
