import { UnsaveState } from '../constants/enums';

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

export interface IUserState {
  savedContent: IPostCardProps[];
  userSubreddits: Array<{ isDisplayed: boolean; subreddit: string }>;
  postToUnsave: { id: null | string; unsaveState: UnsaveState };
}
