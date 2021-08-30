function popForm() {

 

  var ss = SpreadsheetApp.getActive();

  // var sheet = ss.getActiveSheet();

  var sheet = ss.getSheetByName('Sheet1');

  var numberRows = sheet.getDataRange().getNumRows();

 

  // Read the sheet data into 3 arrays.  Would be better practice (faster performance) to read all into 1 array and divide as needed).  

  var myQuestions = sheet.getRange(1,1,numberRows,1).getValues();

  var myAnswers = sheet.getRange(1,2,numberRows,1).getValues();

  var myGuesses = sheet.getRange(1,2,numberRows,5).getValues();

 

  // Shuffle the 5 choices horizontally.  This script only works with Questions in col A, correct Answer in col B, and false choices in col C thru F.

  var myShuffled = myGuesses.map(shuffleEachRow);

  Logger.log(myShuffled);

  Logger.log(myAnswers);

 

  // Create the form as a quiz.  The resulting form's "Quiz options" are different from a manually created quiz.  Be aware (and change manually if needed!

  var form = FormApp.create('States and Capitals Quiz');

  form.setIsQuiz(true);

 

  // Write out each multiple choice question to the form.

  for(var i=0;i<numberRows;i++){

    if (myShuffled[i][0] == myAnswers[i][0]) {

      var addItem = form.addMultipleChoiceItem();

      addItem.setTitle(myQuestions[i][0])

      .setPoints(1)

      .setChoices([

        addItem.createChoice(myShuffled[i][0],true),

        addItem.createChoice(myShuffled[i][1]),

        addItem.createChoice(myShuffled[i][2]),

        addItem.createChoice(myShuffled[i][3]),

        addItem.createChoice(myShuffled[i][4])

      ]);

    }

    else if (myShuffled[i][1] == myAnswers[i][0]) {

      var addItem = form.addMultipleChoiceItem();

      addItem.setTitle(myQuestions[i][0])

      .setPoints(1)

      .setChoices([

        addItem.createChoice(myShuffled[i][0]),

        addItem.createChoice(myShuffled[i][1],true),

        addItem.createChoice(myShuffled[i][2]),

        addItem.createChoice(myShuffled[i][3]),

        addItem.createChoice(myShuffled[i][4])

      ]);

    }

    else if (myShuffled[i][2] == myAnswers[i][0]) {

      var addItem = form.addMultipleChoiceItem();

      addItem.setTitle(myQuestions[i][0])

      .setPoints(1)

      .setChoices([

        addItem.createChoice(myShuffled[i][0]),

        addItem.createChoice(myShuffled[i][1]),

        addItem.createChoice(myShuffled[i][2],true),

        addItem.createChoice(myShuffled[i][3]),

        addItem.createChoice(myShuffled[i][4])

      ]);

    }

    else if (myShuffled[i][3] == myAnswers[i][0]) {

      var addItem = form.addMultipleChoiceItem();

      addItem.setTitle(myQuestions[i][0])

      .setPoints(1)

      .setChoices([

        addItem.createChoice(myShuffled[i][0]),

        addItem.createChoice(myShuffled[i][1]),

        addItem.createChoice(myShuffled[i][2]),

        addItem.createChoice(myShuffled[i][3],true),

        addItem.createChoice(myShuffled[i][4])

      ]);

    }

    else {

      var addItem = form.addMultipleChoiceItem();

      addItem.setTitle(myQuestions[i][0])

      .setPoints(1)

      .setChoices([

        addItem.createChoice(myShuffled[i][0]),

        addItem.createChoice(myShuffled[i][1]),

        addItem.createChoice(myShuffled[i][2]),

        addItem.createChoice(myShuffled[i][3]),

        addItem.createChoice(myShuffled[i][4],true)

      ]);

    }

  }

}


// This function, called by popForm, shuffles the 5 choices.

function shuffleEachRow(array) {

  var i, j, temp;

  for (i = array.length - 1; i > 0; i--) {

    j = Math.floor(Math.random() * (i + 1));

    temp = array[i];

    array[i] = array[j];

    array[j] = temp;

  }

  return array;

}
