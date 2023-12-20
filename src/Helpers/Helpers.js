// return top 10 most popular tags =====================================
const getPopularTags = (tagCountMap) => {
  // Convert the tagCountMap object into an array of key-value pairs
  const tagEntries = Object.entries(tagCountMap);

  // Sort the array in descending order based on frequency
  const sortedTagEntries = tagEntries.sort((a, b) => b[1] - a[1]);

  // Take the first 10 entries (or fewer if there are fewer than 10)
  const top10Tags = sortedTagEntries.slice(0, 10);

  // Convert the array back to an object
  const resultTagCountMap = Object.fromEntries(top10Tags);

  return resultTagCountMap;
};

// EXPORT
export { getPopularTags };
