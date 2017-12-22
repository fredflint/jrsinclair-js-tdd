"use strict";

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
  addPhotosToElement($, selector, list) {
    return $(selector).append(list);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PhotoLister;
}
