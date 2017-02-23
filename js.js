var funcs = [
  //Teho
  {
    name: 'P=U*I',
    numVar: 2,
    group: 'Teho',
    inputs: [{name: 'U', unit: 'V'}, {name: 'I', unit: 'A'}],
    retUnit: 'W',
    func: function (inputs) {
      return parseFloat(inputs[0]) * parseFloat(inputs[1]);
    }
  }, {
    name: 'U=P/I',
    numVar: 2,
    group: 'Teho',
    inputs: [{name: 'P', unit: 'W'}, {name: 'I', unit: 'A'}],
    retUnit: 'V',
    func: function (inputs) {
      return parseFloat(inputs[0]) / parseFloat(inputs[1]);
    }
  }, {
    name: 'I=P/U',
    numVar: 2,
    group: 'Teho',
    inputs: [{name: 'P', unit: 'W'}, {name: 'U', unit: 'V'}],
    retUnit: 'A',
    func: function (inputs) {
      return parseFloat(inputs[0]) / parseFloat(inputs[1]);
    }
  },
  //Ohmin laki
  {
    name: 'U=R*I',
    numVar: 2,
    group: 'Ohmin laki',
    inputs: [{name: 'R', unit: 'Ω'}, {name: 'I', unit: 'A'}],
    retUnit: 'V',
    func: function (inputs) {
      return parseFloat(inputs[0]) * parseFloat(inputs[1]);
    }
  }, {
    name: 'R=U/I',
    numVar: 2,
    group: 'Ohmin laki',
    inputs: [{name: 'U', unit: 'V'}, {name: 'I', unit: 'A'}],
    retUnit: 'V',
    func: function (inputs) {
      return parseFloat(inputs[0]) / parseFloat(inputs[1]);
    }
  }, {
    name: 'I=U/R',
    numVar: 2,
    group: 'Ohmin laki',
    inputs: [{name: 'U', unit: 'V'}, {name: 'R', unit: 'Ω'}],
    retUnit: 'A',
    func: function (inputs) {
      return parseFloat(inputs[0]) / parseFloat(inputs[1]);
    }
  },
  //Magneettivuon tiheys,
  {
    name: 'Suora virtajohdin B=(μ0/2*π*r)*I',
    numVar: 2,
    group: 'Magneettivuon tiheys',
    inputs: [{name: 'r', unit: 'M'}, {name: 'I', unit: 'A'}],
    retUnit: 'T',
    func: function (inputs) {
      var r = parseFloat(inputs[0]);
      var i = parseFloat(inputs[1]);
      var u = 1.2566371;
      return (u / (2 * Math.PI * r) * i);
    }
  }
];

var seleBox = document.getElementById('seleBox');
var inputs = document.getElementById('inputs');
var output = document.getElementById('output');
var groups = [];


//Loop through all of the functions and categorize them
for (var i = 0; i < funcs.length; i++) {
  var found = false;
  for (var d = 0; d < groups.length; d++) {
    if (groups[d].name == funcs[i].group) {
      found = true;
      break;
    }
  }
  if (!found) {
    var t = {
      name: funcs[i].group,
      funcs: [funcs[i]]
    };
    groups.push(t);
  } else {
    for (var x = 0; x < groups.length; x++) {
      if (groups[x].name == funcs[i].group) {
        groups[x].funcs.push(funcs[i]);
        break;
      }
    }
  }
}

//Create option groups and options
for (var i = 0; i < groups.length; i++) {
  var nGroup = document.createElement("optgroup");
  nGroup.label = groups[i].name;
  for (var d = 0; d < groups[i].funcs.length; d++) {
    var nOpt = document.createElement("option");
    nOpt.value = groups[i].funcs[d].name;
    nOpt.innerHTML = groups[i].funcs[d].name;
    nGroup.appendChild(nOpt);
  }
  seleBox.appendChild(nGroup);
}

function getSelectedFunction() {
  var f = {};
  var ele = seleBox;
  for (var i = 0; i < funcs.length; i++) {
    if (funcs[i].name == ele[ele.selectedIndex].text) {
      f = funcs[i];
      break;
    }
  }
  return f;
}

function selectChanged() {
  var f = getSelectedFunction();
  //Delete old input boxes
  inputs.innerHTML = "";

  //Generate new input boxes
  for (var i = 0; i < f.inputs.length; i++) {
    var nLabel = document.createElement('label');
    var nInput = document.createElement('input');
    var nLabelUnit = document.createElement('label');
    nLabel.setAttribute('for', 'in' + i);
    nLabelUnit.setAttribute('for', 'in' + i);
    nLabelUnit.innerHTML = f.inputs[i].unit || 'NA';
    nLabel.innerHTML = f.inputs[i].name;
    nInput.value = f.inputs[i].defVal || 0;
    nInput.id = 'n' + i;
    inputs.appendChild(nLabel);
    inputs.appendChild(nInput);
    inputs.appendChild(nLabelUnit);
    var br = document.createElement('br');
    inputs.appendChild(br);
  }
}

function eval() {
  var f = getSelectedFunction();

  var inputs = [];
  for (var i = 0; i < f.inputs.length; i++) {
    var v = document.getElementById('n' + i);
    inputs.push(v.value);
  }

  var res = f.func(inputs);

  output.value += '\n' + res.toString() + ' ' + f.retUnit;
}

//Load default selection
selectChanged(seleBox);