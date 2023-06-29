$('#tweet-text').on('input', function() {
  let maxLength = 140;
  let tweetLength = $(this).val().length;
  $('.counter').text(maxLength - tweetLength);
  if (tweetLength > 140) {
    $(".hidden-error .char-err").css("display", "inline-block").slideDown("slow");
    $("div").find(".counter").css("background-color", "red");
  }
  if (tweetLength < 141) {
    $(".hidden-error .char-err").css("display", "none");
    $("div").find(".counter").css("background-color", "#f4f1ec");
  }
});