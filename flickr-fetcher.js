const FlickrFetcher = {
  metaPhotoToUrl(metaPhoto) {
    const urlParts = ['https://farm',
      metaPhoto.farm,
      '.staticflickr.com/',
      metaPhoto.server,
      '/',
      metaPhoto.id,
      '_',
      metaPhoto.secret,
      '_b.jpg',
    ];

    return urlParts.join('');
  },
  transformMetaPhoto(metaPhoto) {
    return {
      title: metaPhoto.title,
      url: this.metaPhotoToUrl(metaPhoto),
    };
  },
  fetchFlickrData(apiKey, fetch) {
    const urlParts = [
      'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=',
      apiKey,
      '&text=pugs&format=json&nojsoncallback=1',
    ];

    const url = urlParts.join('');

    return fetch(url);
  },
};

module.exports = FlickrFetcher;
