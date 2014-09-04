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
var stickmanObject = $('#stickmanObject');
var stickmanSpritePosition = 0;
setInterval(function () {
    stickmanSpritePosition--;
    stickmanSpritePosition += 11;
    stickmanSpritePosition %= 11;

    stickmanObject.css('background-position-x', stickmanSpritePosition * 27.5);
}, 100);


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