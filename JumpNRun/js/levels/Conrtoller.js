var gameControls = {
    right: false,
    jump: false,
    left: false
};



$(document).keydown(function (event) {
    console.log('What is the key id of the key we are pressing? ', event.which);

    switch (event.which) {
        case 39:

            //pressing the key to the right!
            gameControls.right = true;

            break;
        case 32:
            gameControls.jump = true;
            gameControls.right = true;
            //debugger;
            break;
        case 37:
            gameControls.left = true;
            break;
        case 27:        //break game --> Menü, Continue
            gameControls.right = false;
            gameControls.jump = false;
            break;
    }

});

$(document).keyup(function (event) {
    switch (event.which) {
        case 39:

            //stop pressing the key to the right!
            //gameControls.right = false;

            break;
        case 32:
            gameControls.jump = false;
            break;
        case 37:
            gameControls.left = false;
            break;
    }
});
