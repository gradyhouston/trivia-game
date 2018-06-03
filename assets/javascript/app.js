
// Trivia API below //

// function displayTriviaInfo() {
//
//   var triviaApi = $(this).attr("data-name");
//   var queryURL = "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple" + triviaApi;
//
//   // Creating an AJAX call for the retrieval of the trivia
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {

  // Variables

triviaGameObj = {


    masterQuestions: [{
            question: "Where did Kayne West grow up?",
            answers: ["Atlanta, GA", "Cincinnati, OH", "Chicago, IL", "New York, NY"],
            correctAnswer: "Chicago, IL",
            visual: 'assets/images/kayne.gif',
            sound: 'assets/audio/kayne2.mp3',
            fact: "Kanye spent fifth grade in China while his mother taught at Nanjing University as part of an exchange program."
        }, {
            question: "What is best-selling single of all time?",
            answers: ["My Heart Will Go On by Celine Dion", "It's Now Or Never by Elvis Presley", "I Will Survive by Gloria Gaynor", "White Christmas by Bing Crosby"],
            correctAnswer: "White Christmas by Bing Crosby",
            visual: 'assets/images/bing.gif',
            sound: 'assets/audio/bing.mp3',
            fact: "This single has sold more than 100 million copies worldwide."
        }, {
            question: "What was The Beatles first hit single in America?",
            answers: ["Twist And Shout", "I Want To Hold Your Hand", "Love Me Do", "I Saw Her Standing There"],
            correctAnswer: "I Want To Hold Your Hand",
            visual: 'assets/images/beatles.gif',
            sound: 'assets/audio/beatles.mp3',
            fact: "This song was released in 1963 and charted at #1 on the US Billboards on January 13, 1964."
        }, {
            question: "What artist has acheived the highest sales in history of an album in its first week?",
            answers: ["Taylor Swift", "NSYNC", "Adele", "Britney Spears"],
            correctAnswer: "Adele",
            visual: 'assets/images/adele.gif',
            sound: 'assets/audio/hello.mp3',
            fact: "Adele sold 3.38 million copies of her album 25 in the first week of its release."
        },

        {
            question: "Who was most streamed artist of 2015?",
            answers: ["Ed Sheeran", "Drake", "Taylor Swift", "Katy Perry"],
            correctAnswer: "Drake",
            visual: 'assets/images/drake.gif',
            sound: "assets/audio/drake.mp3",
            fact: "Drake's music was streamed over 1.8 billion times in 2015.",

        }, {
            question: "What British Rock band from the 1970s had a one-armed drummer?",
            answers: ["The Who", "Def Leppard", "Led Zepplin", "Queen"],
            correctAnswer: "Def Leppard",
            visual: 'assets/images/def.gif',
            sound: "assets/audio/def.mp3",
            fact: 'The drummer, Rick Allen was involved in a driving accident in 1984 that led to the amputation of his right arm.',

        }, {
            question: "What is the first ever rap song to win the Academy Award for Best Original Song?",
            answers: ["Thrift Shop by Macklemore", "Gansta's Paradise by Coolio", "Lose Yourself by Eminem", "Holy Grail by Jay Z"],
            correctAnswer: "Lose Yourself by Eminem",
            visual: 'assets/images/eminem.gif',
            sound: "assets/audio/eminem.mp3",
            fact: "Lose Yourself was written in 2002 for the motion picture 8 Mile."

        }, {
            question: "What member of the Red Hot Chili Peppers grew up with Cher as his babysitter?",
            answers: ["Anthony Kiedis", "Flea", "Chad Smith", "Josh Klinghoffer"],
            correctAnswer: "Anthony Kiedis",
            visual: 'assets/images/redhotchilipeppers.gif',
            sound: "assets/audio/redhotchilipeppers.mp3",
            fact: "Seven out of the band’s 11 albums are certified platinum – Out of the seven, six are certified multi-platinum.",

        }, {
            question: "What was the band known as Linkin Park originally called?",
            answers: ["Reanimators", "Meteora", "Hybrid Theory", "Xero"],
            correctAnswer: "Xero",
            visual: 'assets/images/linkinpark.gif',
            sound: "assets/audio/linkinpark.mp3",
            fact: "Linkin Park auditioned and were rejected for record deals 44 times before finally being accepted by Warner Brothers. In fact, Warner Brothers had rejected Linkin Park three times before they finally signed them.",

        }, {
            question: "Who is the youngest artist to win a Grammy Award?",
            answers: ["Meghan Trainor", "Ed Sheeran", "Taylor Swift", "Bruno Mars"],
            correctAnswer: "Taylor Swift",
            visual: 'assets/images/taylor.gif',
            sound: "assets/audio/taylor.mp3",
            fact: "Taylor is the youngest artist to win a Grammy at the age of 20 for her album Fearless.",

        }
    ],

// Push the correct guess here and then get the length of the array and display that number at end
guessesCorrect: 0,

// Push the incorrect guesses here and then displayed
guessesIncorrect: 0,

// If the timer goes off before you guess it falls into this catagory
unansweredGuesses: 0,
// unansweredGuesses: triviaGameObj.masterQuestions.length - (guessesCorrect + guessesIncorrect),

// This will keep the current question selected at random and removed from the master question once the masterQuestions array is empty move onto the final answer page
currentQuestion: [],

currentGuess: "",

userGuess: "",

timerCount: 14,

masterIndex: "",

// This function loads the page and loads the timer
pageLoad: {
    run: function() {
        counter = setInterval(this.decrement, 1000);
    },
    // The decremeent function.
    decrement: function() {

        // Show the number in the #show-number tag.
        $('#timer').html('<h2>' + 'Time Remaining: ' + triviaGameObj.timerCount + '</h2>');
        // Decrease number by one.
        triviaGameObj.timerCount--;

        // // Once number hits zero...
        if (triviaGameObj.timerCount === -1) {
            triviaGameObj.emptyDivs();
            triviaGameObj.timesUp();
            triviaGameObj.unansweredGuesses++;
            console.log("Unanswered Guesses:" + triviaGameObj.unansweredGuesses);
            triviaGameObj.spliceArray();
            // is the timeout function to automatically switch the page
            triviaGameObj.pageTimeout.timeout();
        }

    },
    // This stops the timer
    stop: function() {
        // Clears our "counter" interval.
        // We just pass the name of the interval
        // to the clearInterval function.
        clearInterval(counter);
    }
},
// Timeout function
pageTimeout: {

    timeout: function() {
        setTimeout(this.fiveSeconds, 1000 * 7);
    },
    fiveSeconds: function() {
        triviaGameObj.emptyDivs();
        triviaGameObj.currentQuestion = [];
        console.log("This is the current question (should be blank): " + triviaGameObj.currentQuestion.length);

        // game over
        if (triviaGameObj.masterQuestions.length == 0) {
            // Game is over and display progress
            // triviaGameObj.emptyDivs();
            triviaGameObj.summaryPage();
            triviaGameObj.pageLoad.stop();

        } else {
            triviaGameObj.questionLoad();
        }
    }
},

timerReset: function() {
    var timerCount = 0;
    return timerCount;
    $('#timer').html('<h2>' + 'Time Remaining: ' + triviaGameObj.timerCount + '</h2>');
},

questionLoad: function() {
    this.timerCount = 14;
    // Show the number in the #show-number tag.
    $('#timer').html('<h2>' + 'Time Remaining: ' + 15 + '</h2>');
    this.pageLoad.run();
    // This pushes the random picked question object to the current question array
    this.currentQuestion.push(this.randomPick());

    console.log("Current Question: " + JSON.stringify(this.currentQuestion));
    $('#question').html('<h2>' + triviaGameObj.currentQuestion[0].question + '<h2>');

    // Setting the variable of current answers equal to the answers section with the current question array
    var currentAnswers = this.currentQuestion[0].answers

    // stores get element in variable parent
    var parent = document.getElementById('answers');

    //  a for each function that runs for every answer in the array
    currentAnswers.forEach(function(answer, index, array) {
        // creates a p element
        var div = document.createElement('div');
        // Add other classes to update the background
        div.setAttribute('class', 'col-sm-12 col-md-6 col-lg-6 guess center-block');

        // storing creating a text node of answer in text
        var text = document.createTextNode(answer);
        // appending text to the previously created p tag
        div.appendChild(text);
        // appending the child to the parent in this case the p tag to the parent variable
        parent.appendChild(div);

    });
},
// Randomly picks the next question
randomPick: function() {

    this.masterIndex = Math.floor(Math.random() * this.masterQuestions.length);
    var initialPick = this.masterQuestions[this.masterIndex];

    console.log("Initial Pick: " + JSON.stringify(initialPick));
    return initialPick;


},

// splice function to remove the current question object from the array so that it cannot be populated again
spliceArray: function() {
    triviaGameObj.masterQuestions.splice(this.masterIndex, 1);
    console.log("The remove index value is: " + JSON.stringify(this.masterIndex));
    console.log("masterQuestions should have been altered! It is now: " + JSON.stringify(triviaGameObj.masterQuestions));
    console.log("Master Questions length is: " + triviaGameObj.masterQuestions.length)
    console.log("Current Question Length: " + triviaGameObj.currentQuestion.length);

},

// Function to empty currently populated divs with questions and answers
emptyDivs: function() {
    $('#question').empty();
    $('#answers').empty();
    $('#fact').empty();
    $('#picture').empty();
    $('#correctAnswer').empty();
    $('#audioplayer').attr('src', '');
    $('#timer').empty();


},

// The time up function
timesUp: function() {
    $('#timer').attr('style', 'font-size: 40px;').html('Times UP!');
    $('#correctAnswer').html('The Correct Answer Is: ' + '<span>' + triviaGameObj.currentQuestion[0].correctAnswer + '</span>');
    console.log(triviaGameObj.currentQuestion[0].correctAnswer);

    triviaGameObj.displayAssets();
    triviaGameObj.pageLoad.stop();


},
// Correct Guess function
correctGuess: function() {
    $('#question').attr('style', 'font-size: 40px;').html('Correct!');
    triviaGameObj.displayAssets();

},

// Incorrect guess function
incorrectGuess: function() {
    $('#timer').attr('style', "font-size: 40px;").html('Wrong!');
    $('#correctAnswer').html('The Correct Answer Is: ' + '<span>' + triviaGameObj.currentQuestion[0].correctAnswer + '</span>');
    triviaGameObj.displayAssets();

},

// Create displayAssets function to display the selected audio and video assets for the questions guesses. This would be added to win, times up and loss display
displayAssets: function() {
    // Sets the image on the screen
    var img = $('<img>');
    img.attr('src', triviaGameObj.currentQuestion[0].visual);
    img.attr('class', 'img-rounded m-x-auto d-block pictureframe');
    img.attr('alt', 'Image');
    $('#picture').html(img);

    // Sets the fun fact
    $('#fact').html('<h3>' + 'Fun Fact: ' + triviaGameObj.currentQuestion[0].fact + '</h3>');


    // sets the audio on the page

    var audio = triviaGameObj.currentQuestion[0].sound;
    // audio.autoplay = true;
    audioplayer = $('#audioplayer');
    audioplayer.attr('src', audio);
    audioplayer.attr('autoplay', 'autoplay');

},

summaryPage: function() {

        $('#question').html('<h2>' + "Here's how you did: " + '</h2>');

        // display correct guesses
        $('#answers').html("<p>" + "Correct Guesses: " + triviaGameObj.guessesCorrect + "</p>");

        // display incorrect guesses
        $('#answers').append("<p>" + "Incorrect Guesses: " + triviaGameObj.guessesIncorrect + "</p>");

        // display unanswered guesses
        $('#answers').append("<p>" + "Unanswered Guesses: " + triviaGameObj.unansweredGuesses + "</p>");

    }

}

// GAME BEGINS with Initial setup of page and start click push

// Throw up a start button and when clicked it displays the first question page
$(document).ready(function() {
// Intial page load with the button created dynamically
var b = $('<button>');
b.addClass('waves-effect waves-light btn-lg text-center startButton');
b.html("Let's Play!");

$('#start').append(b);


// STAGE 1: Loads the page after a user click and displays first question and timer
$('#start').on('click', function(event) {
    $(this).hide();
    triviaGameObj.questionLoad();

});

// STAGE 2: User guesses

// This initiates the user click/guess after the buttons are created on the screen
$(document.body).on('click', '.guess', function(event) {
    var click = $(this).text();



    // triviaGameObj.splice();
    // console.log("you clicked: " + click);
    triviaGameObj.pageLoad.stop();

    // correct guess
    if (click == triviaGameObj.currentQuestion[0].correctAnswer) {

        triviaGameObj.emptyDivs();
        triviaGameObj.correctGuess();
        triviaGameObj.guessesCorrect++;
        console.log("This is the user pick: " + click);
        console.log("This is the correct answer: " + triviaGameObj.currentQuestion[0].correctAnswer);
        console.log("Guesses Correct: " + triviaGameObj.guessesCorrect);
        triviaGameObj.spliceArray();
        // is the timeout function to automatically switch the page
        triviaGameObj.pageTimeout.timeout();


    }
    // incorrect guess
    else if (click != triviaGameObj.currentQuestion[0].correctAnswer) {
        triviaGameObj.emptyDivs();
        triviaGameObj.incorrectGuess();
        triviaGameObj.guessesIncorrect++;
        console.log("This is the user pick: " + click);
        console.log("This is the correct answer: " + triviaGameObj.currentQuestion[0].correctAnswer);
        console.log("Guesses incorrect: " + triviaGameObj.guessedIncorrect);
        triviaGameObj.spliceArray();
        // is the timeout function to automatically switch the page
        triviaGameObj.pageTimeout.timeout();

    }
  });
});
