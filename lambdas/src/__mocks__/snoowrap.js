const Snoowrap = jest.genMockFromModule('snoowrap');
Snoowrap.getMe = () => ({
  getSavedContent: jest.fn()
});

Snoowrap.getSubmission = () => ({
  unsave: jest.fn()
});
export default Snoowrap;
