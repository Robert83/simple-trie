var Trie = function() {
	this.root = new TrieNode(false) ;
} ;

Trie.prototype.insert = function(key, value) {
	var node = new TrieNode(value) ;
	this._insert(key.split(""), node, this.root) ;
} ;

Trie.prototype._insert = function(chars, node, root) {
	var char = chars.shift() ;
	if (root.children[char]) {
		if(chars.length == 0) {
			root.children[char].setValue(node.value) ;
		} else {
			this._insert(chars, node, root.children[char]) ;
		}
	} else {
		if(chars.length > 0) {
			root.children[char] = new TrieNode(false) ;
			this._insert(chars, node, root.children[char]) ;
		} else {
			root.children[char] = new TrieNode(node.value) ;
		}
	}
} ;

Trie.prototype.get = function(key, limit) {
	return this._get(key.split(""), this.root, limit, key) ;
} ;

Trie.prototype._get = function(chars, root, limit, key) {
	var chr = chars.shift() ;
	while (chr) {
		if(chars.length > 0) {
			if(root.children[chr]) {
				root = root.children[chr] ;
			} else {
				return null ;
			}
		} else {
			if(root.children[chr]) {
				return this._getAllChildren(root.children[chr], key, limit, 0)
			} else {
				return null ;
			}
		}
		chr = chars.shift() ;
	}
} ;

Trie.prototype._getAllChildren = function(root, key, limit, found) {
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




var TrieNode = function(value) {
	this.value = value ;
	this.isReal = false !== value ;
	this.children = {} ;
} ;

TrieNode.prototype.setValue = function(value) {
	if(value === false) {
		return ;
	}
	this.value = value ;
	this.isReal = true ;
} ;



module.exports = Trie ;
