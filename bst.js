'use strict';
const util = require('util');

class BinarySearchTree{
  constructor(key=null, value=null, parent=null){
    this.key = key;
    this.parent = parent;
    this.value = value;
    this.left = null;
    this.right = null;
  }
  insert(key, value){
    if(this.key === null){
      this.key = key;
      this.value = value;
    }
    else if (this.key > key) {
      if(this.left === null){
        this.left = new BinarySearchTree(key, value, this);
      }
      else{
        this.left.insert(key, value);
      }

    }
    else{
      if(this.right===null){
        this.right = new BinarySearchTree(key, value, this);
      }
      else{
        this.right.insert(key, value);
      }
    }
  }
  remove(key){
    //we found it
    if(this.key === key){
      if(this.left && this.right){
        const newReplacement = this.right._findMin();
        this.key = newReplacement.key;
        this.value = newReplacement.value;
        newReplacement.remove(newReplacement.key);
      }
      else if(this.left){
        this._replaceWith(this.left);
      }
      else if(this.right){
        this._replaceWith(this.right);
      }
      else{
        this._replaceWith(null);
      }
    }
    else if(this.key > key){
      this.left.remove(key);
    }
    else if(this.key < key){
      this.right.remove(key);
    }
    else{
      throw new Error('Key Error');
    }
  }

  find(key){
    if(this.key === key){
      return this.value;
    }
    else if(key < this.key && this.left){
      return this.left.find(key);
    }
    else if(key > this.key && this.right){
      return this.right.find(key);
    }
    else{
      throw new Error('Key Error');
    }
  }
  //class helpers
  _replaceWith(node){
    if(this.parent){
      if(this === this.parent.left){
        this.parent.left = node;
      }
      else if(this === this.parent.right){
        this.parent.right = node;
      }
      if(node){
        node.parent = this.parent;
      }
    }
    else{
      if(node){
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else{
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }
  _findMin(){
    if(!this.left){
      return this;
    }
    return this.left._findMin();
  }

}

function findHeight(tree, height = 1){

  if(tree.left === null && !tree.right === null){
    return height;
  }
  else if(tree.left !== null && tree.right !==null){
    let leftHeight = findHeight(tree.left, height+1);
    let rightHeight = findHeight(tree.right, height+1);
    return Math.max(leftHeight,rightHeight);
  }
  else if(tree.left !== null && tree.right === null){
    return findHeight(tree.left, height+1);
  }
  else if(tree.left == null && tree.right !== null){
    return findHeight(tree.right, height+1);
  }
  return height;

}

//  3,1,4,6,9,2,5,7
function main(){
  let bst = new BinarySearchTree();
  // bst.insert(3,'three');
  // bst.insert(1,'one');
  // bst.insert(4,'four');
  // bst.insert(6,'six');
  // bst.insert(9,'nine');
  // bst.insert(2,'two');
  // bst.insert(5,'five');
  // bst.insert(7,'seven');
  // putting alot on the right
  // bst.insert(100,'seven');
  // bst.insert(101,'seven');
  // bst.insert(102,'seven');
  // bst.insert(103,'seven');
  // bst.insert(104,'seven');
  // bst.insert(105,'seven');

  //skewed tree
  bst.insert(5,'seven');
  bst.insert(106,'seven');
  bst.insert(99,'seven');
  bst.insert(98,'seven');
  bst.insert(97,'seven');
  bst.insert(95,'seven');
  bst.insert(109,'seven');
  bst.insert(110,'seven');


  // console.log(util.inspect(bst, false, null));
  // bst.remove(3);
  // console.log(util.inspect(bst, false, null));
  // console.log(bst.find(5));

  console.log(findHeight(bst));
}
main();
