export const JSONStringify = <T>(content: T) =>
  JSON.stringify(
    {
      content
    },
    null,
    2
  );
