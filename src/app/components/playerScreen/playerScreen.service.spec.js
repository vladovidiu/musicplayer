(function() {
  'use strict';

  var mockObject = {
    "id": 1,
    "songName": "If I die young",
    "genre": "Rock",
    "artist": "The Band Perry",
    "duration": "3:40",
    "rating": "Not yet rated."
  };

  var rates = ['0', '1'];

  describe('musicPlayer api service', function() {

    var PlayerScreenService;

    beforeEach(module('musicPlayer'));

    beforeEach(inject(function(_PlayerScreenService_) {
      PlayerScreenService = _PlayerScreenService_;
    }));

    it('should send HTTP request to get the list of songs', inject(function ($httpBackend) {
      $httpBackend.whenGET('http://localhost:3002/songs').respond(200, mockObject);

      var getSongsSuccess = jasmine.createSpy('getSongsSuccess');
      var getSongsError = jasmine.createSpy('getSongsError');
      PlayerScreenService.getSongs()
        .then(getSongsSuccess, getSongsError);

      $httpBackend.flush();
      expect(getSongsSuccess).toHaveBeenCalledWith(mockObject);
      expect(getSongsError).not.toHaveBeenCalled();
    }));

    it('should send HTTP request to get the playlist', inject(function ($httpBackend) {
      $httpBackend.whenGET('http://localhost:3002/playlist').respond(200, mockObject);

      var getPlaylistSuccess = jasmine.createSpy('getPlaylistSuccess');
      var getPlaylistError = jasmine.createSpy('getPlaylistError');
      PlayerScreenService.getPlaylist()
        .then(getPlaylistSuccess, getPlaylistError);

      $httpBackend.flush();
      expect(getPlaylistSuccess).toHaveBeenCalledWith(mockObject);
      expect(getPlaylistError).not.toHaveBeenCalled();
    }));

    it('should sent HTTP request to get the rates', inject(function ($httpBackend) {
      $httpBackend.whenGET('http://localhost:3002/rates').respond(200, rates);

      var getRatesSuccess = jasmine.createSpy('getRatesSuccess');
      PlayerScreenService.getRates()
        .then(getRatesSuccess);

      $httpBackend.flush();
      expect(getRatesSuccess).toHaveBeenCalledWith(rates);
    }));
  });
}());
