let topics = ["donuts", "bread", "cookies", "snacks", "pizza"]
let queryURL;
let gifData;
let q;


// params = {
//   "key": "VLqldkemP275IXS3xDTcJ0dsKqDaP2zN",
//   "q": ""
// }

// $.param(object)



$(document).ready(function () {

  let setButtons = function () {

    $("div.buttons").empty()
    
    topics.forEach(element => {

      let btn = $("<button>")
        .text(element)
        .addClass("hoverable")
        .css("cursor", "pointer")
        .on("click", function () {

          q = $(this).text();
          getData();

          $("div.gifs").css({
            "border": "1px solid #cccccc",
            "border-radius": "5px"
          });

        });

      $("div.buttons").append(btn)

    });
  }

  setButtons();

  let addButton = function() {

    let addedTopic = $("input#topic").val().trim();
    
    if(!topics.includes(addedTopic)) {
      topics.push(addedTopic);
    }

    setButtons();

  }


  let displayGifs = (data) => {
    console.log(data);


    data.forEach(element => {

      let $div = $("<div>");

      let $img = $("<img>")
        .attr({
          "src": element.images.fixed_height_still.url,
          "data-state": "still"
        })
        .css("cursor", "pointer")

        //swapping between still and animated images on img click
        .on("click", function () {

          const $this = $(this);

          if ($this.attr("data-state") === "still") {

            $this.attr({
              "src": element.images.fixed_height.url,
              "data-state": "moving"
            })
          } else {

            $this.attr({
              "src": element.images.fixed_height_still.url,
              "data-state": "still"
            })

          }
        });

        //adding rating to a new p
      let $p = $("<p>")
        .text(`Rated: ${element.rating}`)
        .css("margin", "10px")

      let divWidth = element.images.fixed_height.width
      divWidth = parseInt(divWidth) + 2;


      $div.append($img)
        .append($p)
        .css({
          "width": `${divWidth}px`,
          "margin": "5px",
          "border": "1px solid #cccccc",
          "float": "left",
          "background": "#263238",
          "color": "#ffffff"

        })


      $("div.gifs").prepend($div);

    });

  }


  let getData = function () {

    let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=VLqldkemP275IXS3xDTcJ0dsKqDaP2zN&q=${q}&limit=10`

    $.get(queryURL).then(function (response) {
      gifData = response.data

      displayGifs(gifData);
    });

  }


  $("button.add-topic").on("click", function (event) {
    event.preventDefault();

    addButton();

  });


});