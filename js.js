var funcs = [
  //Teho
  {
    name: 'P=U*I',
    group: 'Teho',
    inputs: [{name: 'U', unit: 'V'}, {name: 'I', unit: 'A'}],
    retUnit: 'W',
    func: function (inputs) {
      return parseFloat(inputs[0]) * parseFloat(inputs[1]);
    }
  }, {
    name: 'U=P/I',
    group: 'Teho',
    inputs: [{name: 'P', unit: 'W'}, {name: 'I', unit: 'A'}],
    retUnit: 'V',
    func: function (inputs) {
      return parseFloat(inputs[0]) / parseFloat(inputs[1]);
    }
  }, {
    name: 'I=P/U',
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
    group: 'Ohmin laki',
    inputs: [{name: 'R', unit: 'Ω'}, {name: 'I', unit: 'A'}],
    retUnit: 'V',
    func: function (inputs) {
      return parseFloat(inputs[0]) * parseFloat(inputs[1]);
    }
  }, {
    name: 'R=U/I',
    group: 'Ohmin laki',
    inputs: [{name: 'U', unit: 'V'}, {name: 'I', unit: 'A'}],
    retUnit: 'V',
    func: function (inputs) {
      return parseFloat(inputs[0]) / parseFloat(inputs[1]);
    }
  }, {
    name: 'I=U/R',
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
    group: 'Magneettivuon tiheys (B)',
    inputs: [{name: 'r', unit: 'm'}, {name: 'I', unit: 'A'}],
    retUnit: 'T',
    func: function (inputs) {
      var r = parseFloat(inputs[0]);
      var i = parseFloat(inputs[1]);
      var u = 1.2566371 * Math.pow(10, -6);
      return (u / (2 * Math.PI * r) * i);
    }
  }, {
    name: 'Ympyräjohdin, keskipisteessä B=(μ0/2*r)*I',
    group: 'Magneettivuon tiheys (B)',
    inputs: [{name: 'r', unit: 'm'}, {name: 'I', unit: 'A'}],
    retUnit: 'T',
    func: function (inputs) {
      var r = parseFloat(inputs[0]);
      var i = parseFloat(inputs[1]);
      var u = 1.2566371 * Math.pow(10, -6);
      return (u / (2 * r) * i);
    }
  }, {
    name: 'Pitkä käämi, sisällä B=N*(μ0/l)*I',
    group: 'Magneettivuon tiheys (B)',
    inputs: [{name: 'N', unit: 'kierr'}, {name: 'l', unit: 'm'}, {name: 'I', unit: 'A'}],
    retUnit: 'T',
    func: function (inputs) {
      var N = parseFloat(inputs[0]);
      var l = parseFloat(inputs[1]);
      var I = parseFloat(inputs[2]);
      var u = 1.2566371 * Math.pow(10, -6);
      return (N * (u / l) * I);
    }
  }, {
    name: 'Magneettikentän voimakkuus H=B/μ0',
    group: 'Magneettikentän voimakkuus (H)',
    inputs: [{name: 'B', unit: 'T'}],
    retUnit: 'A/m',
    func: function (inputs) {
      var B = parseFloat(inputs[0]);
      var u = 1.2566371 * Math.pow(10, -6);
      return (B / u);
    }
  }
];

//The selction box
var seleBox = document.getElementById('seleBox');
//Input div
var inputs = document.getElementById('inputs');
//Output textarea
var output = document.getElementById('output');

//Group array used for creation of inputs
var groups = [];

//Loop through all of the functions and categorize them
for (var i = 0; i < funcs.length; i++) {
  var found = false;
  //Look for exisiting group
  for (var d = 0; d < groups.length; d++) {
    if (groups[d].name == funcs[i].group) {
      found = true;
      break;
    }
  }
  if (!found) {
    //Group not found create a new group
    var t = {
      name: funcs[i].group,
      funcs: [funcs[i]]
    };
    groups.push(t);
  } else {
    //Group found add function to the groups functions
    for (var x = 0; x < groups.length; x++) {
      if (groups[x].name == funcs[i].group) {
        groups[x].funcs.push(funcs[i]);
        break;
      }
    }
  }
}

//Create option groups and options for the selection box
for (var i = 0; i < groups.length; i++) {
  //Create a new group
  var nGroup = document.createElement('optgroup');
  nGroup.label = groups[i].name;
  //Create options inside the group
  for (var d = 0; d < groups[i].funcs.length; d++) {
    var nOpt = document.createElement('option');
    nOpt.value = groups[i].funcs[d].name;
    nOpt.innerHTML = groups[i].funcs[d].name;
    nGroup.appendChild(nOpt);
  }
  //Add 
  seleBox.appendChild(nGroup);
}

//Get the function object associated with the selected function
function getSelectedFunction () {
  var f = {};
  var ele = seleBox;
  //Go trough the available functions and 
  for (var i = 0; i < funcs.length; i++) {
    if (funcs[i].name == ele[ele.selectedIndex].text) {
      f = funcs[i];
      break;
    }
  }
  return f;
}

function selectChanged () {
  var f = getSelectedFunction();
  //Delete old input boxes
  inputs.innerHTML = '';
  //Generate new input boxes
  for (var i = 0; i < f.inputs.length; i++) {
    //The elements we need to show the inputs
    var nLabel = document.createElement('label');
    var nInput = document.createElement('input');
    var nLabelUnit = document.createElement('label');
    var nDiv = document.createElement('div');
    var nDiv2 = document.createElement('div');

    nDiv.className += 'form-group';

    nDiv2.className += 'col-sm-8';

    nLabel.innerHTML = f.inputs[i].name + ':';
    nLabel.className += 'col-sm-2 control-label color1';

    nLabelUnit.innerHTML = f.inputs[i].unit || 'NA';
    nLabelUnit.className += 'col-sm-2 control-label color1';

    nInput.value = f.inputs[i].defVal || 0;
    nInput.className += 'form-control';
    nInput.id = 'n' + i;

    //Key filter for input box
    nInput.addEventListener('keydown', function (e) {
      switch (e.keyCode) {
        case 8:  // Backspace
        case 13: // Enter
        case 46: // Delete
        case 37: // Left arrow
        case 39: // Right arrow
        case 9:  // Tab
        case 188:  // ,
        case 190:  // .
        case e.ctrlKey && 67: // ctrl + c
        case e.ctrlKey && 86: // ctrl + v
          return true;
      }

      // Numbers only
      if (e.keyCode >= 48 && e.keyCode <= 57) {
        return true;
      } else {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
    });

    // Handle copy paste
    // Leave only numbers
    nInput.addEventListener('change', function (e) {
      e.target.value = e.target.value.toString().replace(/([^\d.,]+)/g, '');
    });

    //Add the elements in correct order
    nDiv.appendChild(nLabel);
    nDiv2.appendChild(nInput);
    nDiv.appendChild(nDiv2);
    nDiv.appendChild(nDiv2);
    nDiv.appendChild(nLabelUnit);

    //Add the div into the view
    inputs.appendChild(nDiv);

    var br = document.createElement('br');
    inputs.appendChild(br);
  }
}

function eval () {
  var f = getSelectedFunction();

  var inputs = [];
  //Loop trough the inputs we have and place the value to array
  for (var i = 0; i < f.inputs.length; i++) {
    var v = document.getElementById('n' + i);
    var val = v.value.replace(',', '.');
    inputs.push(val);
  }

  //Call the function that actually calculates our value
  var res = f.func(inputs);

  //Display value
  output.value += '\n' + res.toString() + ' ' + f.retUnit;
  output.scrollTop = output.scrollHeight;
}

//Clear the output box
function sclear () {
  document.getElementById('output').value = '';
}

//Add event listener to do the calculation
document.addEventListener('keyup', function (e) {
  if (e.key == 'Enter') {
    eval();
  }
});

//Load default selection
selectChanged(seleBox);