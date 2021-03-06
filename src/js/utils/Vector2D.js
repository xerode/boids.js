var Vector2D = function( nx, ny ) {
	
	// Constructor
	
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
	
	// Methods
	
	/**
	 * Adds a vector to this vector, creating a new Vector2D instance to hold the result.
	 * @param v2 A Vector2D instance.
	 * @return Vector2D A new vector containing the results of the addition.
	 */
	this.add = function( v ) {
		return new Vector2D( this.x + v.x, this.y + v.y );
	}
	
	/**
	 * Generates a copy of this vector.
	 * @return Vector2D A copy of this vector.
	 */
	this.clone = function() {
		return new Vector2D( this.x, this.y );
	}
	
	/**
	 * Copies all of vector data from the source Vector2D object into the calling Vector2D object.
	 * @param	nv
	 */
	this.copyFrom = function( v ) {
		this.x = v.x;
		this.y = v.y;
	}
	
	/**
	 * Calculates the cross product of this vector and another given vector.
	 * @param v2 Another Vector2D instance.
	 * @return Number The cross product of this vector and the one passed in as a parameter.
	 */
	this.crossProd = function( v ) {
		return this.x * v.y - this.y * v.x;
	}
		
	/**
	 * Decrements the value of the x and y elements of the current Vector2D object by the values of the x and y elements of specified Vector2D object.
	 * @param	nv
	 */
	this.decrementBy = function( v ) {
		this.x -= v.x;
		this.y -= v.y;
	}
	
	/**
	 * Divides this vector by a value, creating a new Vector2D instance to hold the result.
	 * @param v2 A Vector2D instance.
	 * @return Vector2D A new vector containing the results of the division.
	 */
	this.divide = function( value ) {
		return new Vector2D( this.x / value, this.y / value );
	}
	
	/**
	 * Indicates whether this vector and another Vector2D instance are equal in value.
	 * @param v2 A Vector2D instance.
	 * @return Boolean True if the other vector is equal to this one, false if not.
	 */
	this.equals = function( v ) {
		return this.x == v.x && this.y == v.y;
	}
	
	/**
	 * Increments the value of the x and y elements of the current Vector2D object by the values of the x and y elements of a specified Vector2D object.
	 * @param	v
	 */
	this.incrementBy = function( v ) {
		this.x += v.x;
		this.y += v.y;
	}
	
	/**
	 * Multiplies this vector by a value, creating a new Vector2D instance to hold the result.
	 * @param value A Vector2D instance.
	 * @return Vector2D A new vector containing the results of the multiplication.
	 */
	this.multiply = function( value ) {
		return new Vector2D( this.x * value, this.y * value );
	}
	
	/**
	 * Determines whether two Vector2D objects are equal by comparing the x and y elements of the current Vector2D object with a specified Vector2D object.
	 * @param	nv
	 * @return
	 */
	this.nearEquals = function( v, t ) {
		
		var dx = this.x - v.x;
		var dy = this.y - v.y;
		
		return ( dx * dx + dy * dy ) <= t * t;
		
	}
	
	/**
	 * Sets the current Vector2D object to its inverse.
	 */
	this.negate = function() {
		this.x *= -1;
		this.y *= -1;
	}
	
	/**
	 * Normalizes this vector. Equivalent to setting the length to one, but more efficient.
	 * @return Vector2D A reference to this vector. 
	 */
	this.normalize = function() {
		
		var l = this.getLength();
		
		this.x /= l;
		this.y /= l;
		
		return l;
		
	}
	
	/**
	 * Scales the current Vector2D object by a scalar, a magnitude.
	 * @param	s
	 */
	this.scaleBy = function( s ) {
		this.x *= s;
		this.y *= s;
	}
	
	/**
	 * Sets the members of Vector2D to the specified values.
	 * @param	nx
	 * @param	ny
	 */
	this.setTo = function( nx, ny ) {
		this.x = nx;
		this.y = ny;
	}
	
	/**
	 * Subtracts the value of the x and y elements of the current Vector2D object from the values of the x and y elements of another Vector2D object.
	 * @param	nv
	 * @return
	 */
	this.subtract = function( v ) {
		return new Vector2D( this.x - v.x, this.y - v.y );
	}
	
	/* --- */
	
	/**
	 * Sets this vector's x and y values, and thus length, to zero.
	 * @return Vector2D A reference to this vector.
	 */
	this.zero = function() {
		this.x = 0;
		this.y = 0;
		return this;
	}
	
	/**
	 * Whether or not this vector is equal to zero, i.e. its x, y, and length are zero.
	 * @return Boolean True if vector is zero, otherwise false.
	 */
	this.isZero = function() {
		return this.x == 0 && this.y == 0;
	}
	
	/**
	 * Ensures the length of the vector is no longer than the given value.
	 * @param max The maximum value this vector should be. If length is larger than max, it will be truncated to this value.
	 * @return Vector2D A reference to this vector.
	 */
	this.truncate = function( max ) {
		this.setLength( Math.min( max, this.getLength() ) );
		return this;
	}
	
	/**
	 * Whether or not this vector is normalized, i.e. its length is equal to one.
	 * @return Boolean True if length is one, otherwise false.
	 */
	this.isNormalized = function() {
		return this.getLengthSquared() == 1.0;
	}
	
	/**
	 * Calculates the dot product of this vector and another given vector.
	 * @param v2 Another Vector2D instance.
	 * @return Number The dot product of this vector and the one passed in as a parameter.
	 */
	this.dotProd = function( v ) {
		return this.x * v.x + this.y * v.y;
	}
	
	/**
	 * Determines if a given vector is to the right or left of this vector.
	 * @return int If to the left, returns -1. If to the right, +1.
	 */
	this.getSign = function( v2 ) {
		return this.getPerp().dotProd( v2 ) < 0 ? -1 : 1;
	}
	
	/**
	 * Finds a vector that is perpendicular to this vector.
	 * @return Vector2D A vector that is perpendicular to this vector.
	 */
	this.getPerp = function() {
		return new Vector2D( -y, x );
	}
	
	/**
	 * Calculates the distance from this vector to another given vector.
	 * @param v2 A Vector2D instance.
	 * @return Number The distance from this vector to the vector passed as a parameter.
	 */
	this.dist = function( v ) {
		return Math.sqrt( this.distSquared( v ) );
	}
	
	/**
	 * Calculates the distance squared from this vector to another given vector.
	 * @param v2 A Vector2D instance.
	 * @return Number The distance squared from this vector to the vector passed as a parameter.
	 */
	this.distSquared = function( v ) {
		var dx = v.x - this.x;
		var dy = v.y - this.y;
		return dx * dx + dy * dy;
	}
	
	/**
	 * Sets the length or magnitude of this vector. Changing the length will change the x and y but not the angle of this vector.
	 */
	this.setLength = function( value ) {
		var a = this.getAngle();
		this.x = Math.cos( a ) * value;
		this.y = Math.sin( a ) * value;
	}
	
	/**
	 * Gets the length or magnitude of this vector.
	 */
	this.getLength = function() {
		return Math.sqrt( this.getLengthSquared() );
	}
	
	/**
	 * Gets the length of this vector, squared.
	 */
	this.getLengthSquared = function() {
		return this.x * this.x + this.y * this.y;
	}
	
	/**
	 * Sets the angle of this vector. Changing the angle changes the x and y but retains the same length.
	 */
	this.setAngle = function( value ) {
		var len = this.getLength();
		this.x = Math.cos( value ) * len;
		this.y = Math.sin( value ) * len;
	}
	
	/**
	 * Gets the angle of this vector.
	 */
	this.getAngle = function() {
		return Math.atan2( this.y, this.x );
	}
	
}

/**
 * Calculates the angle between two vectors.
 * @param v1 The first Vector2D instance.
 * @param v2 The second Vector2D instance.
 * @return Number the angle between the two given vectors.
 */
Vector2D.prototype.angleBetween = function( v1, v2 ) {
	
	if( ! v1.isNormalized() )
		v1 = v1.clone().normalize();
	if( ! v2.isNormalized() )
		v2 = v2.clone().normalize();
	
	return Math.acos( v1.dotProd( v2 ) );
	
}