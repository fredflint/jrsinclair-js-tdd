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
  }
};

module.exports = PhotoLister;

