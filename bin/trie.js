var PTrie = function() {
	this.root = new PTrieNode(false) ;
} ;

PTrie.prototype.insert = function(key, value) {
	var node = new PTrieNode(value) ;
	this._insert(key.split(""), node, this.root) ;
} ;

PTrie.prototype._insert = function(chars, node, root) {
	var char = chars.shift() ;
	if (root.children[char]) {
		if(chars.length == 0) {
			root.children[char].setValue(node.value) ;
		} else {
			this._insert(chars, node, root.children[char]) ;
		}
	} else {
		if(chars.length > 0) {
			root.children[char] = new PTrieNode(false) ;
			this._insert(chars, node, root.children[char]) ;
		} else {
			root.children[char] = new PTrieNode(node.value) ;
		}
	}
} ;

PTrie.prototype.get = function(key, limit) {
	return this._get(key.split(""), this.root, limit, key) ;
} ;

PTrie.prototype._get = function(chars, root, limit, key) {
	var char = chars.shift() ;
	while (char) {
		if(chars.length > 0) {
			if(root.children[char]) {
				root = root.children[char] ;
			} else {
				return null ;
			}
		} else {
			if(root.children[char]) {
				return this._getAllChildren(root.children[char], key, limit, 0)
			} else {
				return null ;
			}
		}
		char = chars.shift() ;
	}
} ;

PTrie.prototype._getAllChildren = function(root, key, limit, found) {
	var acc = [] ;
	
	if(root.isReal) {
		if(limit == found) {
			return acc ;
		}
		found++ ;
		acc.push({key:key, value:root.value}) ;
	}
	
	for (var c in root.children) {
		newAdded = this._getAllChildren(root.children[c], key+c, limit, found) ;
		found += newAdded.length ;
		acc = acc.concat(newAdded) ;
	}
	
	return acc ;
} ;




var PTrieNode = function(value) {
	this.value = value ;
	this.isReal = false !== value ;
	this.children = {} ;
} ;

PTrieNode.prototype.setValue = function(value) {
	if(value === false) {
		return ;
	}
	this.value = value ;
	this.isReal = true ;
} ;



module.exports = PTrie ;
