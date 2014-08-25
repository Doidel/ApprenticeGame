var Platform = function (ax, ay, bx, by) {

    this.options = {
        element: undefined,
        width: 0,
        rotation: 0,
        bottom: 0,
        left: 0,
        ax: 0,
        ay: 0
    }

    var x = Math.min(ax, bx);
    ax -= x;
    bx -= x;

    var y = Math.min(ay, by);
    ay -= y;
    by -= y;

    var platformBodyDef = new Box2D.Dynamics.b2BodyDef();
    platformBodyDef.position = new Box2D.Common.Math.b2Vec2(x, y);
    //platformBodyDef.set_type(Box2D.b2_dynamicBody);
    
    platformBodyDef.type = Box2D.b2_kinematicBody;
    //platformBodyDef.set_linearVelocity(new Box2D.b2Vec2(-1, 0.0));
    
    this.groundBody = world.CreateBody(platformBodyDef);

    var edgeShape = new Box2D.Collision.Shapes.b2EdgeShape(new Box2D.Common.Math.b2Vec2(ax, ay), new Box2D.Common.Math.b2Vec2(bx, by));

    var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
    fixtureDef.friction = 1;
    fixtureDef.shape = edgeShape;

    this.groundBody.CreateFixture(fixtureDef);

    


    this.options.rotation = -1*(Math.atan((by - ay) / (bx - ax))*100);
   
    this.options.width = Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay)) * 100;
    
    this.options.bottom = (ay + y) * 100;
    this.options.left = (ax + x) * 100;

    this.draw();
};

Platform.prototype.calculateForDraw = function (ax, ay, bx, by) {

    /*for(var i = 0; i < platforms.size; i++) {
        this.platform = platforms.get(i);
        platform.update(Math.max(1/30.0, Gdx.graphics.getDeltaTime()));
    }*/

    /*var w = this.groundBody.GetLinearVelocity();
    w.set_x(-1);
    this.groundBody.SetLinearVelocity(w);*/

    var rotation = -1 * (Math.atan((by - ay) / (bx - ax)) * 100);

    var width = Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay)) * 100;

    var bottom = (ay + y) * 100;
    var left = (ax + x) * 100;

    this.options.width = width;
    this.options.rotation = rotation;
    this.options.left = left;
    this.options.bottom = bottom;
};
//move
//1. move the platform
//2. draw it

Platform.prototype.draw = function () {

    if (this.options.element == undefined) {
        this.options.element = $("<div/>");
        this.options.element.addClass("platform");
        $('.level').append(this.options.element);
    }
    var styles = {
        'width': this.options.width + "px",
        '-webkit-transform': "rotate(" + this.options.rotation + "deg)",
        '-moz-transform': "rotate(" + this.options.rotation + "deg)",
        '-o-transform': "rotate(" + this.options.rotation + "deg)",
        '-ms-transform': "rotate(" + this.options.rotation + "deg)",
        'transform': "rotate(" + this.options.rotation + "deg)",
        'bottom': this.options.bottom + "px",
        'left': this.options.left + "px"
    };
    this.options.element.css(styles);

};



/**
 * Updates the platform with the box2d positions
 */
Platform.prototype._update = function () {
    //get Position
    var x = this.groundBody.GetPosition().x;
    var y = this.groundBody.GetPosition().y;

    var bottom = (this.options.ay + y) * 100;
    var left = (this.options.ax + x) * 100;

    this.options.left = left;
    this.options.bottom = bottom;
    
    this.draw()
};