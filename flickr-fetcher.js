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
  }
};

module.exports = FlickrFetcher;
