requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
       window.webkitRequestAnimationFrame ||
       window.mozRequestAnimationFrame ||
       window.oRequestAnimationFrame ||
       window.msRequestAnimationFrame ||
       function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
           window.setTimeout(callback, 1000 / 60);
       };
})();


// stickman's sprite animation
//if (press)
var stickmanObject = $('#stickmanObject');
var stickmanSpritePosition = 0;
setInterval(function () {
    stickmanSpritePosition--;
    stickmanSpritePosition += 11;
    stickmanSpritePosition %= 11;

    stickmanObject.css('background-position-x', stickmanSpritePosition * 27.5);
}, 100);

/*var x = 0;
setInterval(function () {
    x -= 1;
    $('.level').css('background-position', x + 'px 0');
}, 10);


/***********************************PHYSICS*************************************/

// 1 unit = 100 pixels

var world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0.0, -9.81));


// stickman
var bodyDef = new Box2D.Dynamics.b2BodyDef();
bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
bodyDef.position = new Box2D.Common.Math.b2Vec2(0.2, 4.0);
var stickmanBody = world.CreateBody(bodyDef);
stickmanBody.SetFixedRotation(true);

var circleShape = new Box2D.Collision.Shapes.b2CircleShape();

var stickmanFixtureDef = new Box2D.Dynamics.b2FixtureDef();
circleShape.m_radius = 0.05;
stickmanFixtureDef.density = 2.5;
stickmanFixtureDef.friction = 0.5;
stickmanFixtureDef.shape = circleShape;
stickmanBody.CreateFixture(stickmanFixtureDef);


// a platform

var platform1 = new Platform(0, 3.5, 2, 3.5);
var platform2 = new Platform(3, 4, 5, 4);
var platform3 = new Platform(6, 4.5, 8, 4.5);
var platform4 = new Platform(9, 5, 11, 5);
var platform5 = new Platform(12, 5.5, 14, 5.5);
var platform6 = new Platform(15, 6, 17, 6);
var platform7 = new Platform(18, 6.5, 20, 6.5);
var platform8 = new Platform(21, 7, 23, 7);
var platform9 = new Platform(24, 6.5, 26, 6.5);
var platform5 = new Platform(27, 5.5, 29, 5.5);
var platform6 = new Platform(30, 6, 32, 6);
var platform7 = new Platform(33, 6.5, 35, 6.5);
var platform8 = new Platform(36, 7, 38, 7);
var platform9 = new Platform(39, 6.5, 41, 6.5);


// game loop

var loop = {
    step: function () {
        var stepRate = 1 / 120;
        world.Step(stepRate, 10, 10);
        //world.ClearForces();
        platform1._update();
        platform2._update();
        platform3._update();
        platform4._update();
        platform5._update();
        platform6._update();
        platform7._update();
        platform8._update();
        platform9._update();


    },

    update: function () {
        var impulse = new Box2D.Common.Math.b2Vec2(0, 0);
        var v = stickmanBody.GetLinearVelocity();

        /*var v = stickmanBody.GetLinearVelocity();
        v.set_x(4);
        stickmanBody.SetLinearVelocity(v);*/

        //v.set_x(5);
        console.log(v.x);

        if (gameControls.right && v.x <= 5) {

            /*var force = stickmanBody.GetMass() * 1 / (1 / 60);
            force /= 7.0;
            stickmanBody.ApplyForce(new Box2D.b2Vec2(force, 0), stickmanBody.GetWorldCenter());*/
            var v = stickmanBody.GetLinearVelocity();
            v.x = 4;
            stickmanBody.SetLinearVelocity(v);

            /*$('.level').css({ 'right': '0px', 'left': '' }).animate({
                'right' : '30px'    
            });

            var x = 0;
            setInterval(function () {
                x -= 1;
                $('.level').css('background-position', x + 'px 0');
            }, 1);*/
        
        }



        


        /**
        var stickman_normal = new Box2D.b2Vec2(0, 0);
        var jump_speed = 16;
        stickman_normal.x = 0;
        stickman_normal.y = 0;
        gameControls.jump = false;
        var edge = stickmanBody.GetContactList();
        while (edge) {
            var a = new b2WorldManifold();
            edge.get_contact.GetWorldManifold(a);
            var normal1 = a.m_normal;	
            if (edge.get_contact.IsTouching())
            {	
                //trace(normal1.y);
                if (normal1.y >0) 
                {
                   
                    if ( edge.contact.GetFixtureA().GetUserData().name == "stickman")
                        gameControls.jump = true;
                   
 
                }
            }
               					
        }	
        edge = edge.next;**/
        
        


        if (gameControls.jump == true) {

            var listener = new Box2D.b2ContactListener();

            Box2D.customizeVTable(listener, [{
                original: Box2D.b2ContactListener.prototype.BeginContact,
                replacement:
                    function (thsPtr, contactPtr) {
                        var contact = Box2D.wrapPointer(contactPtr, Box2D.b2Contact);
                        cly = contact.GetManifold();
                        debugger;
                        var fixtureA = contact.GetFixtureA();
                        var fixtureB = contact.GetFixtureB();

                        console.log('A', fixtureA)
                        console.log('B', fixtureB)
                        var fixtures = stickmanBody.GetFixtureList();
                        var normal = fixtures.m_normal;
                        console.log('player', fixtures.a)
                        //console.log('normal', normal.y);
                        if (fixtureA == fixtures.a || fixtureB == fixtures.a) {
                            
                            if (normal.y > 0) { }
                        }

                        // is one of the fixtures our player?

                        // check if contact normal is somewhat upwards

                        // enable jump
                    }
            },
            {
                original: Box2D.b2ContactListener.prototype.PreSolve,
                replacement:
                    function (contact, oldManifold) {
                        console.log(contact, oldManifold);
                    }
            }])

            world.SetContactListener(listener);

            //stickmanBody.ApplyImpulse(new b2Vec2(0, -jump_speed), stickmanBody.GetWorldCenter());
            impulse.set_y(stickmanBody.GetMass() * 5);
            gameControls.jump = false;
        }
        

        if (gameControls.left) {
            var v = stickmanBody.GetLinearVelocity();
            v.x = -1;
            stickmanBody.SetLinearVelocity(v);
        }

 
        stickmanBody.ApplyImpulse(impulse, stickmanBody.GetWorldCenter());

    },

    draw: function () {
        var stickmanX = stickmanBody.GetPosition().x * 100 - 7; // -7 because we want him centered
        stickmanObject.css({
            'bottom': stickmanBody.GetPosition().y * 100,
            'left': stickmanX
        });

        //$('.level:nth-child(0)')
        $($('.level')[0]).css({
            'left': Math.min(-stickmanX + 40, 0)
        });

    }
};


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


// START

(function run() {
    loop.step();
    loop.update();
    loop.draw();
    requestAnimFrame(run);
})();