export const mapStream = async (
  asyncIterator: AsyncIterable<string>,
  callback
) => {
  const toArray = async (asyncIterator: AsyncIterable<string>) => {
    const arr = [];
    for await (const str of asyncIterator) arr.push(str);
    return arr;
  };
  const stringArray = (await toArray(asyncIterator)).map(callback);
  const newStream = stringArray.join(""); // special thanks seno who find typo
  return newStream;
};
