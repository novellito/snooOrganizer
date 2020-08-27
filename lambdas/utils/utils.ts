export const JSONStringify = <T>(content: T) =>
  JSON.stringify(
    {
      content
    },
    null,
    2
  );

export const extractRelevantProps = (savedContents: any) => {
  return savedContents.map((savedContent) => {
    return {
      author: savedContent.author.name,
      postId: savedContent.id,
      postTitle: savedContent.title,
      url: savedContent.url || savedContent.link_url,
      thumbnailUrl:
        savedContent.preview &&
        savedContent.preview.images[0].resolutions[3] &&
        savedContent.preview.images[0].resolutions[3].url,
      subreddit: savedContent.subreddit_name_prefixed,
      createdTime: new Date(savedContent.created * 1000),
      markDown: savedContent.body,
      commentBody: savedContent.body_html
    };
  });
};
