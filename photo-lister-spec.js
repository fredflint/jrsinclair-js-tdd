const expect = require('chai').expect;
const PhotoLister = require('./photo-lister');

describe('PhotoLister', function () {
  it('should exist', function () {
    expect(PhotoLister).not.to.be.undefined;
  })
});

describe('#photoToListItem()', function () {
  it('should take a photo object and return a list item string', function () {
    const photos = [
      {
        title: 'This is a test',
        url: 'http://loremflickr.com/960/593'
      },
      {
        title: 'Aaand a second test',
        url: 'http://loremflickr.com/123/678'
      }
    ];

    const expectedListItems = [
      [
        '<li><figure><img src="http://loremflickr.com/960/593" alt=""/>',
        '<figcaption>This is a test</figcaption></figure></li>',
      ].join(''),
      [
        '<li><figure><img src="http://loremflickr.com/123/678" alt=""/>',
        '<figcaption>Aaand a second test</figcaption></figure></li>',
      ].join(''),
    ];

    photos.forEach(function (photo, index) {
      expect(
        PhotoLister.photoToListItem(photo)).to.equal(expectedListItems[index]
      );
    });
  });
});
