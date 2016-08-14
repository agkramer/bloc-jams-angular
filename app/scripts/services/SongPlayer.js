(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

        /*
        * @function currentAlbum
        * @desc gets ablum from Fixtures
        */
        var currentAlbum = Fixtures.getAlbum();

        /*
        * @desc creating Buzz object variable for audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        /*
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = false;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };

        /*
        * @function playSong
        * @desc Plays current buzz object and sets song playing to true
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        /*
        * @function getSongIndex
        * @desc Returns index of song from current album
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        /*
        * @desc Current audio file
        * @type {Object}
        */
        SongPlayer.CurrentSong = null;

        /*
        * @function SongPlayer.play
        * @desc Plays song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else {
                playSong(song);
            }
        };

        /*
        * @function SongPlayer.pause
        * @desc Pauses song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /*
        * @function SongPlayer.previous
        * @desc Sets current song index to previous song on ablum
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /*
        * @function SongPlayer.next
        * @desc Sets current song index to previous song on ablum
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
        };

        return SongPlayer;
    };

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
