export const getAllTags = (posts: any[]) => {
  const taggedPosts = posts.filter((post) => post?.tags);
  const tags = [...taggedPosts.map((p) => p.tags).flat()];
  const tagObj = {};
  tags.forEach((tag) => {
    if (tag in tagObj) {
      tagObj[tag]++;
    } else {
      tagObj[tag] = 1;
    }
  });
  return tagObj;
};
