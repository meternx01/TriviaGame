var intervalId;

var game = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  time: 12,
  timeRunning: false,

  questions: [],

  startGame: function() {
    this.correct = 0;
    this.incorrect = 0;
    this.unanswered = 0;
    this.questions = [];
    this.fillQuestions();
	debugOut("Push Question");
	game.writeQuestion(0);
  },

  fillQuestions: function() {
    this.questions.push({
      text: "Who was the First American to orbit the Earth?",
      answers: ["Neil Armstrong", "John Glenn", "Sally Ride", "Alan Shepard"],
      correct: 1
    });
    this.questions.push({
      text: "When did Neil Armstrong set foot on the Lunar Surface?",
      answers: [
        "Feburary 20, 1962",
        "June 3, 1965",
        "July 20, 1969",
        "April 12, 1981"
      ],
      correct: 2
    });
    this.questions.push({
      text:
        "What was the name of the rocket that took astronauts from the Earth to the Moon?",
      answers: ["Saturn V", "Aries IV", "Titan II", "Falcon 9"],
      correct: 0
    });
    this.questions.push({
      text: "This was the first reusable spacecraft to be launched. Is it the:",
      answers: ["Soyuz", "Apollo", "Orion", "Space Shuttle"],
      correct: 3
    });
    this.questions.push({
      text: "Which city houses NASA's Mission Control Center?",
      answers: ["Cape Canaveral", "Houston", "Las Vegas", "Washington DC"],
      correct: 1
    });
    this.questions.push({
      text:
        "How many crew members typically are on the International Space Station at the present time?",
      answers: ["4", "3", "6", "10"],
      correct: 3
    });
    this.questions.push({
      text: "Before the Space Shuttle, where did American space capsules land?",
      answers: [
        "In the Desert",
        "Splashdown in the Ocean",
        "Back to the Launch Pad",
        "Astronauts parachuted out"
      ],
      correct: 1
    });
    this.questions.push({
      text:
        "This was the U.S. President who set the goal to land a man on the moon before 1970. He was?",
      answers: [
        "Richard Nixon",
        "Lyndon B. Johnson",
        "Dwight D. Eisenhower",
        "John F. Kennedy"
      ],
      correct: 3
    });
  },

  writeQuestion: function(index) {
    $("#question").html(this.questions[index].text);
    // this.questions[index].answers[0]);
    // var ansList = $("ul.answers");
    // for(i=0;i<4;i++)
    // {
    // 	if(i==game.questions[index].correct){
    // 		var li = $("<li/>")
    // 			.addClass("correctAnswer")
    // 			.appendTo(ansList);
    // 	}
    // 	else{
    // 		var li = $("<li/>")
    // 			.addClass("inCorrectAnswer")
    // 			.appendTo(ansList);
    // 	}
    // 	li.text = this.questions[index].answers[i];
    // 	li.appendTo(ansList);

    // }
    $("li").each(function(i) {
      $(this).text(game.questions[index].answers[i]);
      if (i == game.questions[index].correct) {
        $(this).addClass("correctAnswer");
      } else {
        $(this).addClass("inCorrectAnswer");
      }
    });
    this.resetTimer();
    this.timerStart();
  },

  resetTimer: function() {
    this.time = 12;
  },
  timerStart: function() {
    intervalId = setInterval(this.timerUpdate, 1000);
    this.timeRunning = true;
  },
  timerUpdate: function() {
    console.log("Entered timerUpdate " + game.time);
    game.time--;
    $("#timer").html("<small> " + game.time + " </small>");
    if (game.time <= 0) {
      game.answer(-1);
    }
  },
  answer: function(response) {
    clearInterval(intervalId);
    this.timeRunning = false;
    switch (response) {
      case -1:
        this.unanswered++;
        break;
      case 0:
        this.incorrect++;
        break;
      case 1:
        this.correct++;
        break;
    }

    this.clearAnswers();
    if (this.correct + this.incorrect + this.unanswered < 8) {
      this.writeQuestion(this.correct + this.incorrect + this.unanswered);
    } else {
      this.endGame();
    }
  },
  clearAnswers: function() {
    $("li").each(function(i) {
      $(this).removeClass();
    });
  },
  endGame: function() {
    $("#question").html("Game Over");
    $("li").each(function(i) {
		if(i==0)
		{
				$(this).text("Correct: "+ game.correct);
		}
		if(i==1)
			{
				$(this).text("Incorrect: "+ game.incorrect);
			}
		if(i==2)
			{
				$(this).text("Unanswered: "+ game.unanswered);
			}
		if(i==3)
			{
				$(this).text("THANKS FOR PLAYING");
			}
	});
	setTimeout(startGame, 6000);
  }

};

function debugOut(place) {
	console.log("-----" + place + "------");
	console.log("correct " + game.correct);
	console.log("incorrect " + game.incorrect);
	console.log("unanswered " + game.unanswered);
	console.log("questions " + game.questions);
}


$(document).ready(function () {
	game.startGame();
	
	$("li").click(function(){
		if ($(this).hasClass("correctAnswer"))
			game.answer(1);
		else if ($(this).hasClass("inCorrectAnswer"))
			game.answer(0);
	});
});