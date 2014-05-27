var Platform = function (ax, ay, bx, by) {

    var platformBodyDef = new Box2D.b2BodyDef();
    platformBodyDef.set_position(new Box2D.b2Vec2(0.2, 3.5));

    var groundBody = world.CreateBody(platformBodyDef);

    var edgeShape = new Box2D.b2EdgeShape();
    edgeShape.Set(new Box2D.b2Vec2(ax, ay), new Box2D.b2Vec2(bx, by));
    var fixtureDef = new Box2D.b2FixtureDef();
    fixtureDef.set_friction(1);
    fixtureDef.set_shape(edgeShape);
    groundBody.CreateFixture(fixtureDef);

    var rotation = Math.atan((by - ay) / (bx - ax));

    if (rotation == 0) {
        var width = Math.sqrt((bx - ax) ^ 2 + (by - ay) ^ 2);
    };

    var width = bx - ax;

    var top = ay;
    var left = ax;




    this.draw(width, rotation, top, left);

};

Platform.prototype.draw = function (width, rotation, top, left) {

};