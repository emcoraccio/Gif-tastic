let topics = ["donuts", "bread", "cookies", "snacks", "pizza"]
let queryURL;
let gifData;
let q;
let divWidth;


$(document).ready(function () {

  // function to set the buttons from the topics array to the page
  let setButtons = function () {

    $("div.buttons").empty()

    topics.forEach(element => {

      let btn = $("<button>")
        .text(element)
        .addClass("hoverable")
        .css({
          "cursor": "pointer",
          "font-family": "'Red Hat Display', sans-serif"
        })
        .on("click", function () {

          q = $(this).text();
          getData();

          $("div.gifs").css({
            "border": "1px solid #cccccc",
            "border-radius": "5px",
          });

        });

      $("div.buttons").append(btn)

    });
  }

  setButtons();

  //function which takes input from form and adds button to page
  let addButton = function () {

    let addedTopic = $("input#topic").val().trim();

    if (!topics.includes(addedTopic)) {
      topics.push(addedTopic);
    }

    setButtons();

  }

  //function to display the gifs on the page
  let displayGifs = (data) => {

    // loop through array of data and display images and ratings for each of the gifs
    data.forEach(element => {

      let $div = $("<div>");

      // create initial image and set it to the still image
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

      divWidth = parseInt(element.images.fixed_height.width) + 2

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