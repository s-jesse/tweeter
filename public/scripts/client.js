  $(document).ready(()=>{  
  $("#target").on("submit", function(event) {

  event.preventDefault();
  
// desktop split


  let textLength = $('#tweet-text').val().trim().length;

  if (textLength > 140) {
    $(".hidden-error").slideDown("slow").delay(3500).slideUp('slow');
    $(".hidden-error").css("display", "block")
    $(".tweet-err").text("ERROR: too many characters, must be 140 maximum!")
    return; 
     } else if (textLength === 0) {
    $(".hidden-error").slideDown("slow").delay(3500).slideUp('slow');
    $(".hidden-error").css("display", "block")
    $(".tweet-err").text("ERROR: must type message first!")
    return; 
     }
   

// create ajax get/ post  and load tweets

  let serializeData = $(this).serialize();

  $.ajax("/tweets", { method: 'POST', data: serializeData })
    .then(function(data) {
      $(".hidden-error").slideUp();
      loadTweets();
      $('#tweet-text').val('');
    });
});


const loadTweets = function() {
  $.ajax("/tweets", { method: 'GET' })
    .then(function(data) {
      renderTweets(data);
    });
};


loadTweets();

// escape function

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


// function to create html page dynamically

const renderTweets = function(data) {
  $('.tweets-container').empty();
  for (let contentVal in data) {
    const tweetElement = createTweetElement(data[contentVal]);
    $('.tweets-container').prepend(tweetElement);
  }
};

const createTweetElement = function(tweetObj) {
  const $tweet = (`<article class="tweet-article">
    <header class="tweet-header">
      <h4><img class="avatar"src = "${(tweetObj.user.avatars)}">${(tweetObj.user.name)}</h4>
        <h4>${tweetObj.user.handle}</h4>
          </header>
            <p class="tweet-body">${escape(tweetObj.content.text)}</p>
              <footer class="tweet-footer">${timeago.format(tweetObj["created_at"])} 
                <div class="icons">
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
                </div>
              </footer>
            </article>`);

  return $tweet;
}
})