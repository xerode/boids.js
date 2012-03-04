var BoidSystemModel = function() {
	
	this.boids = [];
	this.bounds = new Rectangle();
	
	this.separationWeight = 80;
	this.separationDistance = 80;
	this.alignmentWeight = 1;
	this.alignmentDistance = 10;
	this.cohesionWeight = 0;
	this.cohesionDistance = 20;
	
	this.update = function() {
		
		for( var i = 0, m = this.boids.length; i < m; i++ ) {
			
			var b = this.getBoid( i );
			
			b.flock( this.boids, this.separationWeight, this.alignmentWeight, this.cohesionWeight, this.separationDistance, this.alignmentDistance, this.cohesionDistance );
			b.seek( new Vector2D( 200, 200 ), 0.005 );
			// b.wander( 10 );
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