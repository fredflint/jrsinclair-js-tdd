const PhotoLister = {
  photoToListItem(photo) {
    return [
      '<li><figure><img src="',
      photo.url,
      '" alt=""/>',
      '<figcaption>',
      photo.title,
      '</figcaption></figure></li>',
    ].join('');
  },
  photosToHtml(photos) {
    const listItems = photos.map(function (photo) {
      return PhotoLister.photoToListItem(photo);
    });

    return [
      '<ul>',
      listItems.join(''),
      '</ul>',
    ].join('');
  },
};

module.exports = PhotoLister;

