'use strict';

const expect = require('chai').expect;
const FlickrFetcher = require('./flickr-fetcher.js');

describe('FlickrFetcher', function () {
  it('should exist', function () {
    expect(FlickrFetcher).to.not.be.undefined;
  });
});

describe('#metaPhotoToUrl()', function () {
  it('should take a photo object from Flickr and return a string', function () {
    const metaPhotos = [
      {
        id: '24770505034',
        owner: '97248275@N03',
        secret: '31a9986429',
        server: '1577',
        farm: 2,
        title: '20160229090898',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0,
      },
      {
        id:       '24770504484',
        owner:    '97248275@N03',
        secret:   '69dd90d5dd',
        server:   '1451',
        farm:     2,
        title:    '20160229090903',
        ispublic: 1,
        isfriend: 0,
        isfamily: 0
      },
    ];

    const expectedUrls = [
      'https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg',
      'https://farm2.staticflickr.com/1451/24770504484_69dd90d5dd_b.jpg',
    ];

    metaPhotos.forEach(function (metaPhoto, index) {
      let actual = FlickrFetcher.metaPhotoToUrl(metaPhoto);
      let expected = expectedUrls[index];
      expect(actual).to.eql(expected);
    });
  });
});

describe('#transformMetaPhoto()', () => {
  const metaPhotos = [
    {
      id:       '25373736106',
      owner:    '99117316@N03',
      secret:   '146731fcb7',
      server:   '1669',
      farm:     2,
      title:    'Dog goes to desperate measure to avoid walking on a leash',
      ispublic: 1,
      isfriend: 0,
      isfamily: 0
    },
    {
      id: '24765033584',
      owner: '27294864@N02',
      secret: '3c190c104e',
      server: '1514',
      farm: 2,
      title: 'the other cate',
      ispublic: 1,
      isfriend: 0,
      isfamily: 0
    },
  ];

  const expectedTransformedMetaPhotos = [
    {
      title: 'Dog goes to desperate measure to avoid walking on a leash',
      url:   'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg'
    },
    {
      title: 'the other cate',
      url:   'https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg'
    },
  ];

  metaPhotos.forEach((metaPhoto, index) => {
    let actual = FlickrFetcher.transformMetaPhoto(metaPhoto);
    let expected = expectedTransformedMetaPhotos[index];
    expect(actual).to.eql(expected);
  });
});

describe('#fetchFlickrData()', function () {
  it(
    'should take an API key and fetcher function argument and return a promise for JSON data.',
    function () {
      const apiKey = "doesn't matter right now";
      const fakeData = {
        'photos': {
          'page': 1,
          'pages': 2872,
          'perpage': 100,
          'total': '287170',
          'photo': [
            {
              'id': '24770505034',
              'owner': '97248275@N03',
              'secret': '31a9986429',
              'server': '1577',
              'farm': 2,
              'title': '20160229090898',
              'ispublic': 1,
              'isfriend': 0,
              'isfamily': 0
            },
            {
              'id': '24770504484',
              'owner': '97248275@N03',
              'secret': '69dd90d5dd',
              'server': '1451',
              'farm': 2,
              'title': '20160229090903',
              'ispublic': 1,
              'isfriend': 0,
              'isfamily': 0
            },
          ]
        }
      };

      const fakeFetcher = function (url) {
        const expectedUrlParts = [
          'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=',
          apiKey,
          '&text=pugs&format=json&nojsoncallback=1',
        ];

        const expectedUrl = expectedUrlParts.join('');

        expect(url).to.equal(expectedUrl);
        return Promise.resolve(fakeData);
      };

      return FlickrFetcher.fetchFlickrData(apiKey, fakeFetcher).then(function(actual) {
        expect(actual).to.eql(fakeData);
      });
    }
  );
});
















