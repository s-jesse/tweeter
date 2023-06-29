console.log("loaded")


// $("p").click(function() {
//   alert("The paragraph was clicked.");
// });
// let count = 10;

// $("#tweet-text").on('keydown', function() {
//   console.log("this:", this); //The this keyword is a reference to the button
//   // alert("was pressed.");
//   $("#tweet-text").on('keypress', function() {
//     console.log("this:", this); //The this keyword is a reference to the button
//     if ("keypress" < count) {
//         alert("was pressed.");

//     }
// });
// });

$('#tweet-text').on('input', function() {
let textLength = $('#tweet-text').val().length;
let maxLength = 140;
let tweetLength = $( this ).val().length;
$('.counter').text(maxLength - tweetLength)


});



// $( "#tweet-text" ).on( "keydown", function() {
//   $( "counter" ).trigger( "keypress" );
//   console.log("counter triggered:", trigger)
// } );