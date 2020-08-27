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

export interface IPostCardProps {
  url: string;
  thumbnailUrl?: string;
  title: string;
  subreddit: string;
  markDown?: string;
  postId: string;
  author: string;
  createdTime: string;
  commentBody: string;
}
