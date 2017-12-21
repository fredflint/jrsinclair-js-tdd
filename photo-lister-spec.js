const expect = require('chai').expect;
const PhotoLister = require('./photo-lister');
const cheerio = require('cheerio');

describe('PhotoLister', function () {
  it('should exist', function () {
    expect(PhotoLister).not.to.be.undefined;
  })
});

describe('#photosToHtml()', function () {
  it('should take an array of photos and turn them into an HTML list', function () {
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

    const expectedHtmlList = [
      '<ul>',
      '<li><figure><img src="http://loremflickr.com/960/593" alt=""/>',
      '<figcaption>This is a test</figcaption></figure></li>',
      '<li><figure><img src="http://loremflickr.com/123/678" alt=""/>',
      '<figcaption>Aaand a second test</figcaption></figure></li>',
      '</ul>',
    ].join('');

    expect(
      PhotoLister.photosToHtml(photos)).to.equal(expectedHtmlList);
  });
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
      expect(PhotoLister.photoToListItem(photo)).to.equal(expectedListItems[index]);
    });
  });
});

describe('#addPhotosToElement()', function () {
  it(
    'should take an HTML string of list items and add them to an element with a given selector'
    , function () {
      const $ = cheerio.load('<html><head></head><body><div id="mydiv"></div></body></html>');
      const list = [
        '<ul><li><figure><img src="http://loremflickr.com/960/593" alt=""/>',
        '<figcaption>This is a test</figcaption></figure></li>',
        '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>',
        '<figcaption>This is another test</figcaption></figure></li></ul>',
      ].join('');
      const selector = '#mydiv';
      const $div = PhotoLister.addPhotosToElement($, selector, list);

      expect($div.find('ul').length).to.equal(1);
      expect($div.find('li').length).to.equal(2);
      expect($div.find('figure').length).to.equal(2);
      expect($div.find('img').length).to.equal(2);
      expect($div.find('figcaption').length).to.equal(2);


  });
});
