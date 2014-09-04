// game loop

var loop = {
    step: function () {
        var stepRate = 1 / 120;
        world.Step(stepRate, 10, 10);
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

        console.log(v.x);

        if (gameControls.right && v.x <= 5) {

            var v = stickmanBody.GetLinearVelocity();
            v.x = 4;
            stickmanBody.SetLinearVelocity(v);

        }

        var jumpSpeed = 16;

        if (gameControls.jump == true) {

            gameControls.jump == false;

            var listener = new Box2D.Dynamics.b2ContactListener();


            listener.BeginContact = function (contactPtr) {
                var a = new Box2D.Collision.b2WorldManifold();
                var edge = stickmanBody.GetContactList();
                edge.contact.GetWorldManifold(a);
                var fixtureA = edge.contact.GetFixtureA();
                var fixtureB = edge.contact.GetFixtureB();

                console.log('A', fixtureA);
                console.log('B', fixtureB);
                var fixtures = stickmanBody.GetFixtureList();
                var normal = fixtures.m_normal;
                console.log('player', fixtures.a);
                if (fixtureA == fixtures.a || fixtureB == fixtures.a) {
                    if (edge.contact.IsTouching()) {

                        if (normal.y > 0) {
                            if (edge.contact.GetFixtureB().GetUserData().name == "stickmanBody")
                                gameControls.jump = false;

                            if (edge.contact.GetFixtureA().GetUserData().name == "") {
                                stickmanBody.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(groundBody.GetLinearVelocity().x, -jumpSpeed / 2));

                                groundBody.SetPosition(new Box2D.Common.Math.b2Vec2(Con2B2D(550), Con2B2D(100)));

                            }

                        }

                        if (normal.x != 0) {

                        }


                    }
                }

                // is one of the fixtures our player?

                // check if contact normal is somewhat upwards

                // enable jump
            }


            listener.EndContact = function () { };
            listener.PreSolve = function () { };
            listener.PostSolve = function () { };

            world.SetContactListener(listener);


            impulse.y = stickmanBody.GetMass() * 5;
            gameControls.jump = false;
        }


        if (gameControls.left == true) {
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