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
	this.wanderRadius = 0;
	this.wanderDistance = 0;
	this.wanderStep = 0;
	
	this.reset = function() {
		
		this.position = new Vector2D();
		this.velocity = new Vector2D();
		this.steering = new Vector2D();
		this.acceleration = new Vector2D();
		
	}
	
	this.update = function() {
		
		// console.log( "Velocity == " + this.velocity.x + ", " + this.velocity.y );
		
		// console.log( "Initial position == " + this.position.x + ", " + this.position.y );
		
		this.velocity = this.velocity.add( this.acceleration );
		
		this.acceleration.x = 0;
		this.acceleration.y = 0;
		
		this.velocity.truncate( this.maxSpeed );
		
		this.position = this.position.add( this.velocity );
		
		// console.log( "End position == " + this.position.x + ", " + this.position.y );
		
	}
	
	this.flock = function( boids, separationWeight, alignmentWeight, cohesionWeight, separationDistance, alignmentDistance, cohesionDistance ) {
		
		this.separate( boids, separationDistance, separationWeight );
		this.align( boids, alignmentDistance, alignmentWeight );
		this.cohesion( boids, cohesionDistance, cohesionWeight );
		
	}
	
	this.separate = function( boids, separationDistance, multiplier ) {
		
		this.steering = this.getSeparation( boids, separationDistance );
		
		if( multiplier != 1.0 ) {
			this.steering = this.steering.multiply( multiplier );
		}
		
		this.acceleration.incrementBy( this.steering );
		
	}
	
	this.getSeparation = function( boids, separation ) {
		
		var force = new Vector2D();
		var difference = new Vector2D();
		var distance = 0;
		var count = 0;
		var boid = new Boid2DModel();

		for( var i = 0; i < boids.length; i++ ) {
			
			boid = boids[ i ];
			
			distance = this.position.dist( boid.position );
			
			if( distance > 0 && distance < separation ) {
				
				difference = this.position.subtract( boid.position );
				difference.normalize();
				difference = difference.multiply( 1 / distance );
				
				force.incrementBy( difference );
				count++;
				
			}
			
		}
		
		if( count > 0 ) {
			force = force.multiply( 1 / count );
		}
		
		return force;
		
	}
	
	this.align = function( boids, neighborDistance, multiplier ) {
		
		this.steering = this.getAlignment( boids, neighborDistance );
		
		if( multiplier != 1.0 ) {
			this.steering = this.steering.multiply( multiplier );
		}
		
		this.acceleration.incrementBy( this.steering );
		
	}
	
	this.getAlignment = function( boids, neighborDistance ) {
		
		var force = new Vector2D();
		var distance = 0;
		var count = 0;
		var boid = new Boid2DModel();
		
		for( var i = 0; i < boids.length; i++ ) {
			
			boid = boids[ i ];
			distance = this.position.dist( boid.position );
			
			if( distance > 0 && distance < neighborDistance ) {
				force.incrementBy( boid.velocity );
				count++;
			}
		}
		
		if( count > 0 ) {
			
			force = force.multiply( 1 / count );
			
			if( force.lengthSQ > this.maxForce * this.maxForce ) {
				force.normalize();
				force = force.multiply( this.maxForce );
			}
			
		}
		
		return force;
	}
	
	this.cohesion = function( boids, neighborDistance, multiplier ) {
		
		this.steering = this.getCohesion( boids, neighborDistance );
		
		if( multiplier != 1.0 ) {
			this.steering = this.steering.multiply( multiplier );
		}
		
		this.acceleration.incrementBy( this.steering );
		
	}

	this.getCohesion = function( boids, neighborDistance ) {
		
		var force = new Vector2D();
		var distance = 0;
		var count = 0;
		var boid = new Boid2DModel();

		for( var i = 0; i < boids.length; i++ ) {
			
			boid = boids[ i ];
			distance = this.position.dist( this.position );
			
			if( distance > 0 && distance < neighborDistance ) {
				force.incrementBy( boid.position );
				count++;
			}
			
		}
		
		if( count > 0 ) {
			
			force = force.multiply( 1 / count );
			force = steer( force );
			
			return force;
			
		}
		
		return force;
		
	}
	
	this.seek = function( target, multiplier ) {
		
		this.steering = this.steer( target, false, 0 );
		
		if( multiplier != 1.0 ) {
			this.steering = this.steering.multiply( multiplier );
		}

		this.acceleration = this.acceleration.add( this.steering );
	}

	this.steer = function( target, ease, easeDistance ) {
		
		this.steering = target.clone();
		this.steering = this.steering.subtract( this.position );
		
		var distance = this.steering.getLength();
		
		if( distance > 0.00001 ) {
			
			if( distance < easeDistance && ease ) {
				this.steering = this.steering.multiply( this.maxSpeed * ( distance / easeDistance ) );
			} else {
				this.steering = this.steering.multiply( this.maxSpeed );
			}
			
			this.steering = this.steering.subtract( this.velocity );
			
			if( this.steering.lengthSQ > this.maxForce * this.maxForce ) {
				this.steering.normalize();
				this.steering = this.steering.multiply( this.maxForce );
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
		pos = pos.multiply( this.wanderDistance );
		pos = pos.add( this.position );
		
		var offset = new Vector2D();
		
		offset.x = this.wanderRadius * Math.cos( this.wanderTheta );
		offset.y = this.wanderRadius * Math.sin( this.wanderPhi );
		
		this.steering = this.steer( pos.add( offset ) );
		
		if( multiplier != 1.0 ) {
			this.steering = this.steering.multiply( multiplier );
		}
		
		this.acceleration = this.acceleration.add( this.steering );
		
	}
	
}