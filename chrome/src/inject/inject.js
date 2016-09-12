// Credit to http://stackoverflow.com/questions/6643410/pick-random-value-from-associated-array-using-javascript
function randomKey(obj) {
    var ret;
    var c = 0;
    for (var key in obj)
        if (Math.random() < 1/++c)
           ret = key;
    return ret;
}

proxyXHR.get('https://rawgit.com/joshisa/pleonasm/master/chrome/data/quotes.json' ).onSuccess(function (data) {
  var quotes=JSON.parse(data);
  var selection=quotes[randomKey(quotes)];
  var bq = document.createElement('blockquote');
  bq.style="text-align:center;margin:0px;";

  var para = document.createElement('p');
  para.style="color: #4863a0 ; font-size: 24px ; font-weight: bold";
  para.innerHTML=selection.quote;

  var tilda = document.createElement('span');
  tilda.id="tilda";
  tilda.innerHTML="~";

  var author = document.createElement('span');
  author.id="author";
  author.innerHTML=selection.author;

  para.appendChild(tilda);
  para.appendChild(author);
  bq.appendChild(para);

  chrome.extension.sendMessage({}, function(response) {
      var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
          clearInterval(readyStateCheckInterval);
          var prefix = "[Past History]] ";
          var kernel = localStorage.kernel;
          var re = /https:\/\/.*\.(pandora.com)\/.*/;
          if (re.test(location.href)) { 
            playerBar = document.getElementById("playerBar");
            playerBar.style="height:100%";
            playerBar.insertBefore(bq, playerBar.firstChild);
            //"I'm Still Listening" button in Pandora web app needs to be clicked!.
            console.warn("There's a saying among prospectors: 'Go out looking for one thing, and that's all you'll ever find.'~ Robert J. Flaherty");
            console.warn("Initiating Pandora 'be more enjoyable' click sequence ...");
            window.setInterval(function() {
              document.getElementById('still_listening_ignore').click();
            }, 2000);
          }
        }
      }, 15);
  });
});
