export interface IUserInfo {
  postCardData: Array<ISavedContent>;
  accessToken: string;
  username: string;
}

export interface ISavedContent extends IPostCardProps {}

export interface IPostCardProps {
  url: string;
  postTitle: string;
  subreddit: string;
  postId: string;
  author: string;
  createdTime: string;
  thumbnailUrl?: string;
  commentBody?: string | null | undefined;
  unsaveElem: any;
  isDisplayed: boolean;
}
