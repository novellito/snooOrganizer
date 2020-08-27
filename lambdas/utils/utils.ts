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
      id: savedContent.id,
      title: savedContent.title,
      url: savedContent.url || savedContent.link_url,
      thumbnail:
        savedContent.preview &&
        savedContent.preview.images[0].resolutions[3] &&
        savedContent.preview.images[0].resolutions[3].url,
      subreddit: savedContent.subreddit_name_prefixed,
      createdTime: getRelativeTime(
        new Date(),
        new Date(savedContent.created_utc * 1000)
      ),
      markDown: savedContent.body,
      commentBody: savedContent.body_html
    };
  });
};

function getRelativeTime(current, postDateInMS) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;
  const elapsed = current - postDateInMS;
  if (elapsed < msPerMinute) {
    return `${Math.round(elapsed / 1000)} seconds ago`;
  } else if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)} minutes ago`;
  } else if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)} hours ago`;
  } else if (elapsed < msPerMonth) {
    return `approximately  ${Math.round(elapsed / msPerDay)} days ago`;
  } else if (elapsed < msPerYear) {
    return `approximately ${Math.round(elapsed / msPerMonth)} months ago`;
  } else {
    return `approximately ${Math.round(elapsed / msPerYear)} years ago`;
  }
}
