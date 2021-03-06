var Boid2DModel = function() {
	
	// Vector2D 
	this.position = new Vector2D();
	this.velocity = new Vector2D();
	this.acceleration = new Vector2D();
	this.steering = new Vector2D();
	
	// this.renderData:DisplayObject;
	this.minSpeed = 0;
	this.maxSpeed = 0;
	this.maxForce = 0;
	this.wanderTheta = 0;
	this.wanderPhi = 0;
	this.wanderRadius = 30;
	this.wanderDistance = 60;
	this.wanderStep = 0.25;
	
	this.reset = function() {
		this.position = new Vector2D();
		this.velocity = new Vector2D();
		this.steering = new Vector2D();
		this.acceleration = new Vector2D();
	}
	
	this.update = function( ms ) {
		
		this.velocity.incrementBy( this.acceleration );
		this.acceleration.zero();
		
		if( this.velocity.getLengthSquared() > this.maxSpeed * this.maxSpeed ) {
			this.velocity.normalize();
			this.velocity.scaleBy( this.maxSpeed );
		}
		
		this.position.x += this.velocity.x / 1000 * ms;
		this.position.y += this.velocity.y / 1000 * ms;
		
	}
	
	this.flock = function( boids, separationWeight, alignmentWeight, cohesionWeight, separationDistance, alignmentDistance, cohesionDistance ) {
		
		this.separate( boids, separationDistance, separationWeight );
		this.align( boids, alignmentDistance, alignmentWeight );
		this.cohesion( boids, cohesionDistance, cohesionWeight );
		
	}
	
	this.separate = function( boids, separationDistance, multiplier ) {
		
		this.steering = this.getSeparation( boids, separationDistance );
		
		if( multiplier != 1.0 ) {
			this.steering.scaleBy( multiplier );
		}
		
		this.acceleration.incrementBy( this.steering );
		
	}
	
	this.getSeparation = function( boids, separation ) {
		
		var force = new Vector2D();
		var difference = new Vector2D();
		var distance = 0;
		var count = 0;
		var boid = new Boid2DModel();

		var i = boids.length;

		while( i-- ) {
			
			boid = boids[ i ];
			
			distance = this.position.dist( boid.position );
			
			if( distance > 0 && distance < separation ) {
				
				difference = this.position.subtract( boid.position );
				difference.normalize();
				difference.scaleBy( 1 / distance );
				
				force.incrementBy( difference );
				count++;
				
			}
			
		}
		
		if( count > 0 ) {
			force.scaleBy( 1 / count );
		}
		
		return force;
		
	}
	
	this.align = function( boids, neighborDistance, multiplier ) {
		
		this.steering = this.getAlignment( boids, neighborDistance );
		
		if( multiplier != 1.0 ) {
			this.steering.scaleBy( multiplier );
		}
		
		this.acceleration.incrementBy( this.steering );
		
	}
	
	this.getAlignment = function( boids, neighborDistance ) {
		
		var force = new Vector2D();
		var distance = 0;
		var count = 0;
		var boid = new Boid2DModel();
		
		var i = boids.length;

		while( i-- ) {
			
			boid = boids[ i ];
			distance = this.position.dist( boid.position );
			
			if( distance > 0 && distance < neighborDistance ) {
				force.incrementBy( boid.velocity );
				count++;
			}
		}
		
		if( count > 0 ) {
			
			force.scaleBy( 1 / count );
			
			if( force.lengthSQ > this.maxForce * this.maxForce ) {
				force.normalize();
				force.scaleBy( this.maxForce );
			}
			
		}
		
		return force;
	}
	
	this.cohesion = function( boids, neighborDistance, multiplier ) {
		
		this.steering = this.getCohesion( boids, neighborDistance );
		
		if( multiplier != 1.0 ) {
			this.steering.scaleBy( multiplier );
		}
		
		this.acceleration.incrementBy( this.steering );
		
	}

	this.getCohesion = function( boids, neighborDistance ) {
		
		var force = new Vector2D();
		var distance = 0;
		var count = 0;
		var boid = new Boid2DModel();

		var i = boids.length;

		while( i-- ) {
			
			boid = boids[ i ];
			distance = this.position.dist( this.position );
			
			if( distance > 0 && distance < neighborDistance ) {
				force.incrementBy( boid.position );
				count++;
			}
			
		}
		
		if( count > 0 ) {
			
			force.scaleBy( 1 / count );
			force = steer( force, false, 0 );
			
			return force;
			
		}
		
		return force;
		
	}
	
	this.seek = function( target, multiplier ) {
		
		this.steering = this.steer( target, false, 0 );
		
		if( multiplier != 1.0 ) {
			this.steering.scaleBy( multiplier );
		}
		
		this.acceleration.incrementBy( this.steering );
	}

	this.steer = function( target, ease, easeDistance ) {
		
		this.steering = target.clone();
		this.steering.decrementBy( this.position );
		
		var distance = this.steering.getLength();
		
		if( distance > 0.00001 ) {
			
			if( distance < easeDistance && ease ) {
				this.steering.scaleBy( this.maxSpeed * ( distance / easeDistance ) );
			} else {
				this.steering.scaleBy( this.maxSpeed );
			}
			
			this.steering.decrementBy( this.velocity );
			
			if( this.steering.lengthSQ > this.maxForce * this.maxForce ) {
				this.steering.normalize();
				this.steering.scaleBy( this.maxForce );
			}
		}
		
		return this.steering;
		
	}
	
	this.wander = function( multiplier ) {
		
		this.wanderTheta += -this.wanderStep + Math.random() * this.wanderStep * 2;
		this.wanderPhi += -this.wanderStep + Math.random() * this.wanderStep * 2;
		
		if( Math.random() < 0.5 ) {
			this.wanderTheta = -this.wanderTheta;
		}
		
		var pos = this.velocity.clone();
		
		pos.normalize();
		pos.scaleBy( this.wanderDistance );
		pos.incrementBy( this.position );
		
		var offset = new Vector2D();
		
		offset.x = this.wanderRadius * Math.cos( this.wanderTheta );
		offset.y = this.wanderRadius * Math.sin( this.wanderPhi );
		
		this.steering = this.steer( pos.add( offset ), false, 0 );
		
		if( multiplier != 1.0 ) {
			this.steering.scaleBy( multiplier );
		}
		
		this.acceleration.incrementBy( this.steering );
		
	}
	
}