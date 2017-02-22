var funcs = [{
	name:'testi',
	numVar: 2,
	group: 'test group',
  inputs: ['t', 't2'],
	func: function(inputs){return 1;}
},{
	name:'t2',
	numVar: 3,
  group: 'test group2',
  inputs: ['t', 't2', 't3', 't4'],
	func: function(inputs){return 2;}
}];

var seleBox = document.getElementById('seleBox');
var inputs = document.getElementById('inputs');
var output = document.getElementById('output');
var groups = [];


//Loop through all of the functions and categorize them
for(var i = 0; i < funcs.length; i++){
  var found = false;
  for(var d = 0; d < groups.length; d++){
    if(groups[d].name == funcs[i].group){
      found = true;
      break;
    }
  }
  if(!found){
    var t = {
      name: funcs[i].group,
      funcs: [funcs[i]]
    };
    groups.push(t);
  }else{
    for(var x = 0; x < groups.length; x++){
      if(groups[x].name == funcs[i].group){
        groups[x].funcs.push(funcs[i]);
        break;
      }
    }
  }
}

//Create option groups and options
for(var i = 0; i < groups.length; i++){
  var nGroup = document.createElement("optgroup");
  nGroup.label = groups[i].name;
  for(var d = 0; d < groups[i].funcs.length; d++){
    var nOpt = document.createElement("option");
    nOpt.value = groups[i].funcs[d].name;
    nOpt.innerHTML = groups[i].funcs[d].name;
    nGroup.appendChild(nOpt);
  }
  seleBox.appendChild(nGroup);
}

function getSelectedFunction() {
  var f ={};
  var ele = seleBox;
  for(var i = 0; i < funcs.length; i++){
    if(funcs[i].name == ele[ele.selectedIndex].text){
      f = funcs[i];
      break;
    }
  }
  return f;
}

function selectChanged(){
  var f = getSelectedFunction();
  //Delete old input boxes
  inputs.innerHTML = "";

  //Generate new input boxes
  for(var i = 0; i < f.inputs.length; i++){
    var nLabel = document.createElement('label');
    var nInput = document.createElement('input');
    nLabel.setAttribute('for', 'in'+i);
    nLabel.innerHTML = f.inputs[i];
    nInput.value = 0;
    nInput.id = 'n'+i;
    inputs.appendChild(nLabel);
    inputs.appendChild(nInput);
    var br = document.createElement('br');
    inputs.appendChild(br);
  }
}

function eval() {
  var f = getSelectedFunction();

  var inputs = [];
  for(var i = 0; i < f.inputs.length; i++){
    var v = document.getElementById('n'+i);
    inputs.push(v.value);
  }

  var res = f.func(inputs);

  output.value += '\n' + res.toString();
}

//Load default selection
selectChanged(seleBox);