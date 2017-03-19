var quoteBoxColors = ["rgba(162, 166, 104, 0.7)", "rgba(193, 187, 155, 0.7)", "rgba(209, 200, 150, 0.7)", "rgba(193, 180, 135, 0.7)"]

var quoteData = {}

$(document).ready(function () {
  
  $("#getMessage").on("click", function () {
    $("#getMessage").attr("disabled", "disabled");
    getData();
    var quoteColor = quoteBoxColors[Math.floor(Math.random()*quoteBoxColors.length)];
    $("#quote-box").css("background-color", quoteColor);
  });
  
  $(".twitter-share-button").on("click", function (e) {
    e.preventDefault();
    var twitterUrl = 'https://twitter.com/intent/tweet?text="' + encodeURIComponent(quoteData.quoteText) + '" - ' + encodeURIComponent(quoteData.quoteAuthor) + '&hashtags=quotes';
    if (('"' + quoteData.quoteText + '" - ' + quoteData.quoteAuthor + ' #quotes').length > 140) {
      var confirm = window.confirm("This quote is over 140 characters! Would you still like to tweet this quote?");
      if (confirm) {
        window.open(twitterUrl);
      }
    } else {
      window.open(twitterUrl);
    }

  });
  
  getData();
});

function getData () {
      $.getJSON("http://api.forismatic.com/api/1.0/","method=getQuote&lang=en&format=jsonp&jsonp=?", function(data) {
      $(".message").html('"' + data.quoteText + '"');
      
      if (data.quoteAuthor === "") {
        data.quoteAuthor = "Unknown";
      }
      quoteData = data; 
      $(".author").html("- " + data.quoteAuthor); 
      
      $("#getMessage").attr("disabled", false);
        
    });
}