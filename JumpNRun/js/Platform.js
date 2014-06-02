var Platform = function (ax, ay, bx, by) {

    var x = Math.min(ax, bx);
    ax -= x;
    bx -= x;

    var y = Math.min(ay, by);
    ay -= y;
    by -= y;

    

    var platformBodyDef = new Box2D.b2BodyDef();
    platformBodyDef.set_position(new Box2D.b2Vec2(x, y));
    platformBodyDef.set_type(Box2D.b2_kinematicBody);
    
    var groundBody = world.CreateBody(platformBodyDef);

    var edgeShape = new Box2D.b2EdgeShape();
    edgeShape.Set(new Box2D.b2Vec2(ax, ay), new Box2D.b2Vec2(bx, by));

    var fixtureDef = new Box2D.b2FixtureDef();
    fixtureDef.set_friction(1);
    fixtureDef.set_shape(edgeShape);

    groundBody.CreateFixture(fixtureDef);

    var rotation = -1*(Math.atan((by - ay) / (bx - ax))*100);
   
    var width = Math.sqrt((bx - ax)*(bx - ax) + (by - ay)*(by - ay)) * 100;
    
    var bottom = (ay + y)*100;
    var left = (ax + x)*100;

    this.draw(width, rotation, bottom, left);

};

Platform.prototype.draw = function (width, rotation, bottom, left) {
   /**$('body').append("<div class='platform' style='width:" + width + "px; -webkit-transform: rotate(" + rotation +
        "deg); -moz-transform: rotate(" + rotation + "deg); -o-transform: rotate(" + rotation +
        "deg); -ms-transform: rotate(" + rotation + "deg); transform: rotate(" + rotation +
        "deg); bottom:" + bottom + "px; left:" + left + "px;'></div>");**/
    console.log(rotation)
    var el = $("<div/>");
    el.addClass("platform");
    var styles = {
        'width': width + "px",
        '-webkit-transform': "rotate(" + rotation + "deg)",
        '-moz-transform': "rotate(" + rotation + "deg)",
        '-o-transform': "rotate(" + rotation + "deg)",
        '-ms-transform': "rotate(" + rotation + "deg)",
        'transform': "rotate(" + rotation + "deg)",
        'bottom': bottom + "px",
        'left': left + "px"
    };
    el.css(styles);

    $('body').append(el);

};


