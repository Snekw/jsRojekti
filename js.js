var boxes = document.getElementById("boxes");

var funcs = [{
	name:'testi',
	numVar: 2,
	func: function(){console.log('wurks');}
},{
	name:'t2',
	numVar: 3,
	func: function(){console.log('nuuh');}
}];

var seleBox = document.getElementById('seleBox');



function selectChanged(ele){
	console.log(ele[ele.selectedIndex])
}