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
      '_b.jpg'
    ];

    return urlParts.join('');
  },
  transformMetaPhoto(metaPhoto) {
    return {
      title: 'Dog goes to desperate measure to avoid walking on a leash',
      url:   'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg'
    };
  }
};

module.exports = FlickrFetcher;
