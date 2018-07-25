export default ({ chanel, links }) => {
  const rssContainer = document.querySelector('.rss-chanels');

  const rssTitle = document.createTextNode(chanel.title);
  const rssCaption = document.createTextNode(chanel.caption);
  const hElement = document.createElement('h5');
  const pElement = document.createElement('p');

  const articlesList = document.querySelector('.list-group');

  hElement.append(rssTitle);
  pElement.append(rssCaption);
  rssContainer.append(hElement);
  rssContainer.append(pElement);

  links.forEach(({ link, title }) => {
    const aElement = document.createElement('a');
    const liElement = document.createElement('li');
    const linkText = document.createTextNode(title);

    liElement.className = 'list-group-item';
    aElement.href = link;
    aElement.append(linkText);
    liElement.append(aElement);
    articlesList.append(liElement);
  });
};
