var BoidSystemModel = Class.extend( {
	
	/*
		CONSTRUCTOR
	*/
	
	init: function() {
		
		this.boids = [];
		this.bounds = new Rectangle();
		
		this.separationWeight = 20;
		this.separationDistance = 25;
		this.alignmentWeight = 0.2;
		this.alignmentDistance = 5;
		this.cohesionWeight = 0.2;
		this.cohesionDistance = 10;
		this.updateProps = null;
		
	},
	
	/*
		METHODS
	*/
	
	update: function( ms ) {
		
		var i = this.boids.length;

		var point = new Vector2D( 200, 200 );

		while( i-- ) {

			var b = this.getBoid( i );
			
			b.wander( 0.0005 );
			b.flock( this.boids, this.separationWeight, this.alignmentWeight, this.cohesionWeight, this.separationDistance, this.alignmentDistance, this.cohesionDistance );
			// b.seek( point, 0.0005 );
			b.update( ms );
			
			if( ! this.bounds.contains( b.position.x, b.position.y ) ) {
				
				if( b.position.x < this.bounds.x ) {
					b.position.x = this.bounds.x;
					b.velocity.x *= -1;
				} else if( b.position.x > this.bounds.x + this.bounds.width ) {
					b.position.x = this.bounds.width;
					b.velocity.x *= -1;
				}
				
				if( b.position.y < this.bounds.y ) {
					b.position.y = this.bounds.y;
					b.velocity.y *= -1;
				} else if( b.position.y > this.bounds.y + this.bounds.height ) {
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

	},
	
	/*
		ACCESSORS/MUTATORS
	*/
	
	setUpdate: function( u ) {

		this.updateProps = u;

	},

	addBoid: function( b ) {
		
		this.boids[ this.boids.length ] = b;
		
	},
	
	getBoid: function( i ) {
		
		return this.boids[ i ];
		
	},

	setBoids: function( b ) {
		
		this.boids = b;
		
	},
	
	getBoids: function() {
		
		return this.boids;
		
	},
	
	setBounds: function( r ) {
		
		this.bounds = r;
		
	},
	
	getBounds: function() {
		
		return this.bounds;
		
	}
	
} );