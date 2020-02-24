export interface IUserInfo {
  savedContent: Array<ISavedContent>;
  accessToken: string;
}

interface ISavedContent {
  id: string;
  link_url: string;
  subreddit_name_prefixed: string;
}
