(function() {
    function CollectionCtrl(Fixtures, $firebaseArray) {
        this.albums = Fixtures.getCollection(8);

        this.data = $firebaseArray(firebase.database().ref("allenmainApp"));

        window.foo = this.data;
    }

    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', '$firebaseArray', CollectionCtrl]);
})();
