// File: flickr-fetcher.js

class FlickrFetcher {
   constructor() {}

   static getDEFAULT_PAGE_SIZE() {
      return 20; //DEFAULT_PAGE_SIZE = 20,
   }

   setPageSize(pageSize) {
      this.pageSize = pageSize;
   }

   getPageSize() {
      if (!this.pageSize) return FlickrFetcher.getDEFAULT_PAGE_SIZE();
      else return this.pageSize;
   }

   static metaPhotoToUrl(metaPhoto) {
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
   }

   static transformMetaPhoto(metaPhoto) {
     const u = FlickrFetcher.metaPhotoToUrl(metaPhoto);
     const v = {
       title: metaPhoto.title,
       url: u
     };

     return v;
   }

   fetchFlickrData(apiKey, fetch) {
     if (!fetch && $) {
       const fetch = $.getJSON.bind(jQuery);
     }

     const url = this.buildFlickrURL(apiKey);
     return fetch(url);
   }

   fetchPhotos(apiKey, fetch) {
      //this.transformMetaPhoto(null);
      var that = this;
      return this.fetchFlickrData(apiKey, fetch).then(function(data) {
         return data.photos.photo.map(FlickrFetcher.transformMetaPhoto, this);

         // return data.photos.photo.map((item) => {
         //    that.transformMetaPhoto(item)
         // }, this);

         // return data.photos.photo.map(function(item) {
         //    transformMetaPhoto(item)
         // }, this);
      });
   }

   buildFlickrURL(apiKey, pageSize) {
      if ( !pageSize )
         pageSize = FlickrFetcher.getDEFAULT_PAGE_SIZE();
      return 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
                  + apiKey + '&text=pugs&format=json&nojsoncallback=1&per_page=' + pageSize;
   }
}

module.exports = FlickrFetcher;
//export let person = new Person();
