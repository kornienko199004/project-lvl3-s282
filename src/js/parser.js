const getRssHeader = (doc) => {
  const title = doc.querySelector('title').textContent;
  const caption = doc.querySelector('description').textContent;
  return { title, caption };
};

const getRssArticles = (doc) => {
  const items = Array.from(doc.querySelectorAll('item'));
  return items.map((element) => {
    const link = element.querySelector('link').textContent;
    const title = element.querySelector('title').textContent;
    const description = element.querySelector('description').textContent;
    return { link, title, description };
  });
};

export default (res) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(res.data, 'application/xml');
  return {
    headers: getRssHeader(doc),
    articles: getRssArticles(doc),
  };
};
