var input = document.getElementById('autocomplete');
var uwindsorBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(42.3045, -83.0661));
var options = {
  bounds: uwindsorBounds
};
var autocomplete = new google.maps.places.Autocomplete(input, options);
google.maps.event.addListener(autocomplete, 'place_changed', function(){
   var place = autocomplete.getPlace();
})
$("form").on("keypress", function (e) {
  if (e.keyCode == 13) {
      return false;
  }
});
