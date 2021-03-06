var Boid2DFactory = Class.extend( {
	
	/*
		METHODS
	*/
	
	spawnBoids: function( n, radius, bounds, minSpeed, maxSpeed, maxForce, wanderDistance, wanderRadius, wanderStep ) {

		var boids = [];

		while( n-- ) {
					
			var boid = new Boid2DModel();
			
			boid.position.x = bounds.x + Math.floor( Math.random() * bounds.width );
			boid.position.y = bounds.y + Math.floor( Math.random() * bounds.height );
			
			var speed = ( Math.random() * ( maxSpeed - minSpeed ) ) + minSpeed;
			var e = Math.round( Math.random() * 360 ) * Math.PI / 180;
			
			boid.velocity.setLength( speed );
			boid.velocity.setAngle( e );
			
			boid.minSpeed = minSpeed;
			boid.maxSpeed = maxSpeed;
			
			boid.maxForce = maxForce;

			boid.wanderDistance = wanderDistance;
			boid.wanderRadius = wanderRadius;
			boid.wanderStep = wanderStep;
			
			boids[ n ] = boid;
			
		}

		return boids;

	}
	
} );