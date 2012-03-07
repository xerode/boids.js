var BoidSystemModel = function() {
	
	this.boids = [];
	this.bounds = new Rectangle();
	
	this.separationWeight = 20;
	this.separationDistance = 25;
	this.alignmentWeight = 10;
	this.alignmentDistance = 5;
	this.cohesionWeight = 5;
	this.cohesionDistance = 10;
	this.updateProps = null;
	
	this.update = function() {
		
		var i = this.boids.length;

		var point = new Vector2D( 200, 200 );

		while( i-- ) {

			var b = this.getBoid( i );
			
			// b.wander( 10 );
			b.flock( this.boids, this.separationWeight, this.alignmentWeight, this.cohesionWeight, this.separationDistance, this.alignmentDistance, this.cohesionDistance );
			b.seek( point, 0.005 );
			b.update();
			
			if( ! this.bounds.contains( b.position.x, b.position.y ) ) {
				
				if( b.position.x < this.bounds.x ) {
					// b.position.x += this.bounds.width;
					b.position.x = this.bounds.x;
					b.velocity.x *= -1;
				} else if( b.position.x > this.bounds.x + this.bounds.width ) {
					// b.position.x -= this.bounds.width;
					b.position.x = this.bounds.width;
					b.velocity.x *= -1;
				}
				
				if( b.position.y < this.bounds.y ) {
					// b.position.y += this.bounds.height;
					b.position.y = this.bounds.y;
					b.velocity.y *= -1;
				} else if( b.position.y > this.bounds.y + this.bounds.height ) {
					// b.position.y -= this.bounds.height;
					b.position.y = this.bounds.height;
					b.velocity.y *= -1;
				}
				
			}

		}
		
		if( this.updateProps ) {

			this.separationDistance = this.updateProps.separationDistance;
			this.separationWeight = this.updateProps.separationWeight;
			this.alignmentDistance = this.updateProps.alignmentDistance;
			this.alignmentWeight = this.updateProps.alignmentWeight;
			this.cohesionDistance = this.updateProps.cohesionDistance;
			this.cohesionWeight = this.updateProps.cohesionWeight;

			this.updateProps = null;

		}

	}
	
	this.setUpdate = function( u ) {

		this.updateProps = u;

	}

	this.addBoid = function( b ) {
		
		this.boids[ this.boids.length ] = b;
		
	}
	
	this.getBoid = function( i ) {
		
		return this.boids[ i ];
		
	}
	
	this.setBounds = function( r ) {
		
		this.bounds = r;
		
	}
	
	this.getBounds = function() {
		
		return this.bounds;
		
	}
	
}