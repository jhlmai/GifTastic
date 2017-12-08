
    // Example queryURL for Giphy API
    var apiKey = 'HmC6jYxAxwhp61bde8FJ2MDSN2VdTQ0h';
    var searches = [];

    // finds giphy results based on text
    // from the user input 
    function getGiphies(userInput) {

      // if I do not have data-giphy use userInput
      var input = $(this).attr("data-giphy") || userInput;

      // clear out any previous images on the page when there is a new search happening
      $("#content").empty();

      // we retrieve gifs matching the value they inputed
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + input + "&limit=10&offset=0&rating=G&lang=en";
      $.ajax({
        url: queryURL,
        method: 'GET'
      }).done(function (response) {
        var animalDiv = $("<div class='animal'>");
        var data = response.data;
        var rating = response.Rated;
        console.log(response);

        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        animalDiv.append(pOne);



        for (var i = 0; i < data.length; i++) {
          // display a list of gifs
          var p = $("<p>").text("Rating: " + data[i].rating);

          var newImg = $("<img>");
          newImg.attr("src", data[i].images.downsized.url);
          newImg.addClass("data-still");
          newImg.addClass("data-animate");
          newImg.addClass("data-animate");

          $("#content").append(newImg);
        }
      });
      $("#user-input").val("");
    }

    // when the user finishes searching
    // make a new button for them to click on later
    function makeUserSearchButtons(input) {
      var newBtn = $("<button>");
      newBtn.addClass("giphy-btn");
      newBtn.text(input);
      newBtn.attr("data-giphy", input);
      $('.button-container').append(newBtn);
    }

    // when the user clicks the submit button
    $("#submit").on("click", function (e) {
      e.preventDefault();
      // take the value from the user-input field
      var userInput = $("#user-input").val();
      makeUserSearchButtons(userInput);
      getGiphies(userInput);
    });

    // when the user dynamically generated giphy button
    $(document).on("click", ".giphy-btn", getGiphies);

    $(".giphy-btn").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });