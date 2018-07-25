export default (res) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(res.data, 'application/xml');
  return doc;
};
