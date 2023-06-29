// how does event arg work????
$("#target").on("submit", function(event) {
  event.preventDefault();

  
  
  let textLength = $('#tweet-text').val().length;
  console.log("tweetLength: ", textLength)
  
  if (textLength === 0) {
    $(".hidden-error .tweet-err").css("display", "inline-block").slideDown("slow")
  } else if (textLength >= 0) {
    $(".hidden-error .tweet-err").css("display", "none");
  }



  let serializeData = $(this).serialize();

  $.ajax("/tweets", { method: 'POST', data: serializeData })
    .then(function(data) {
      console.log('Success: ', data);
      loadTweets()
      $('#tweet-text').val('')

      //$button.replaceWith(morePostsHtml);
    });
});

const loadTweets = function() {
  $.ajax("/tweets", { method: 'GET' })
    .then(function(data) {
      console.log("data", data)
      renderTweets(data);
    });
};


loadTweets();

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

// escape function

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//const safeHTML = `<p>${escape(textFromUser)}</p>`;
const iconFlag = (`<i class="fa-solid fa-flag"></i>`);
const iconRetweet =(`<i class="fa-solid fa-retweet"></i>`);
const iconHeart = (`<i class="fa-solid fa-heart"></i>`);  

const createTweetElement = function(tweetObj) {
  const $tweet = (`<article class="tweet-article">
    <header class="tweet-header">
    <h4><img class="avatar"src = "${escape(tweetObj.user.avatars)}">${escape(tweetObj.user.name)}</h4>
      <h4>${tweetObj.user.handle}</h4>
      </header>
  <p class="tweet-body">${escape(tweetObj.content.text)}</p>
  <footer class="tweet-footer">${timeago.format(tweetObj["created_at"])} <div class="icons">${iconFlag}${iconRetweet}${iconHeart}</div></footer>
  </article>`);

  // const $tweet = $(`<article class="tweet-body">${tweetObj.content.text}</article>`);


  let tweetElement = $('.tweets-container').prepend($tweet);
  return tweetElement;

};

const renderTweets = function(data) {
  // let tweetInfo = data.content.text;
  for (let contentVal in data) {
    createTweetElement(data[contentVal]);
    console.log("contentVal:", data[contentVal]);
  }
};
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
// }

//renderTweets(tweetData);
