const FlickrFetcher = {

  getDEFAULT_PAGE_SIZE() {
     return 20; //DEFAULT_PAGE_SIZE = 20,
  },
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
      url: FlickrFetcher.metaPhotoToUrl(metaPhoto),
    };
  },
  fetchFlickrData(apiKey, fetch) {
    if (!fetch && $) {
      const fetch = $.getJSON.bind(jQuery);
    }

    const url = this.buildFlickrURL(apiKey);
    return fetch(url);
  },
  fetchPhotos(apiKey, fetch) {
    return this.fetchFlickrData(apiKey, fetch).then(function(data) {
      return data.photos.photo.map(FlickrFetcher.transformMetaPhoto);
    })
  },

  buildFlickrURL(apiKey, pageSize) {
    if ( !pageSize )
      pageSize = this.getDEFAULT_PAGE_SIZE();
    return expectedURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
      + apiKey + '&text=pugs&format=json&nojsoncallback=1&per_page=' + pageSize;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FlickrFetcher;
}
