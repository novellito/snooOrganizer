export interface IUserInfo {
  postCardData: Array<ISavedContent>;
  accessToken: string;
  username: string;
}

interface ISavedContent {
  id: string;
  link_url: string;
  subreddit_name_prefixed: string;
}
