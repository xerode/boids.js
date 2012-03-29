var Rectangle = Class.extend( {
	
	/*
		CONSTRUCTOR
	*/
	
	init: function( nx, ny, nw, nh ) {
		
		if( typeof nx == "number" ) {
			this.x = nx;
		} else {
			this.x = 0;
		}
		
		if( typeof ny == "number" ) {
			this.y = ny;
		} else {
			this.y = 0;
		}
		
		if( typeof nw == "number" && nw > 0 ) {
			this.width = nw;
		} else {
			this.width = 0;
		}
		
		if( typeof nh == "number" && nh > 0 ) {
			this.height = nh;
		} else {
			this.height = 0;
		}
		
	},
	
	/*
		METHODS
	*/
	
	clone: function() {
		
		return new Rectangle( this.x, this.y, this.width, this.height );
		
	},
	
	equals: function( r ) {
		
		return( this.x == r.x && this.y == r.y && this.width == r.width && this.height == r.height );
		
	},
	
	contains: function( px, py ) {
		
		return ( px >= this.x && px <= this.x + this.width && py >= this.y && py <= this.y + this.height );
		
	},
	
	containsRect: function( r ) {
		
		return( r.x > this.x && r.width < this.width && r.y > this.y && r.height < this.height );
		
	},

	inflate: function( nx, ny ) {

		this.x += nx;
		this.y += ny;

	},
	
	intersection: function( r ) {

		var ins = new Rectangle();
		
		if( this.intersects( r ) ) {

			ins.x = Math.max( this.x, r.x );
			ins.y = Math.max( this.y, r.y );

			var nx = Math.min( this.x + this.width, r.x + r.width );
			var ny = Math.min( this.y + this.height, r.y + r.height );

			ins.width = nx;
			ins.height = ny;

		}

		return ins;
		
	},
	
	intersects: function( r ) {
		
		return !( r.x > this.x + this.width || r.x + r.width < this.x || r.y > this.y + this.height || r.y + r.height < this.y );
		
	},
	
	offset: function( nx, ny ) {
		
		this.x += nx;
		this.y += ny;
		
	},
	
	union: function( r ) {
		
		var rect = new Rectangle();
		
	},
	
	/*
		ACCESSORS/MUTATORS
	*/
	
	getTop: function() {
		
		return this.y;
		
	},
	
	getRight: function() {
		
		return this.x + this.width;
		
	},
	
	getBottom: function() {
		
		return this.y + this.height;
		
	},
	
	getLeft: function() {
		
		return this.x;
		
	}
	
} );