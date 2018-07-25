export default (res) => {
  const acc = { chanel: { title: '', caption: '' }, links: [] };
  const parser = new DOMParser();
  const doc = parser.parseFromString(res.data, 'application/xml');

  acc.chanel.title = doc.querySelector('title').innerHTML;
  acc.chanel.caption = doc.querySelector('description').innerHTML;

  doc.querySelectorAll('item').forEach((element) => {
    const link = element.querySelector('link').innerHTML;
    const title = element.querySelector('title').innerHTML;
    acc.links.push({ link, title });
  });
  return acc;
};
