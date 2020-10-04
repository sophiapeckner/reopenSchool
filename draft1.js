// CREDIT:
// https://www.sitepoint.com/community/t/math-formula-input-form/6956/3

var classAssignments = [];
  
function calculateCohort(classRoom, maxCohortSize, totalStudents){
  var howManyCohort = totalStudents / maxCohortSize;
  if (Number.isInteger(howManyCohort) === true){
    var cohortSize = maxCohortSize;
  } else {
    var unevenHowManyCohort = Math.ceil(howManyCohort);
    var intCohortSize = totalStudents / unevenHowManyCohort;
    if (Number.isInteger(intCohortSize) === true){
      var cohortSize = intCohortSize;
    } else {
      var remainder = totalStudents % unevenHowManyCohort;
      var lastCohortSize = Math.floor(intCohortSize) + remainder;
      // lastCohortSize printing out!
      console.log(classRoom + "_" + lastCohortSize);
      classAssignments.push(classRoom + "_" + lastCohortSize);
      var remainingCohortSize = Math.floor(intCohortSize);
      var howManyCohort = howManyCohort - 1;
      var cohortSize = remainingCohortSize;
    };
  };
  for(var i = 0; i < howManyCohort; i++){
      console.log(classRoom + "_" + cohortSize);
      classAssignments.push(classRoom + "_" + cohortSize);
  };
  return classAssignments;
};

var reopenForm = document.getElementById("reopenForm");
// if (reopenForm) {
reopenForm.onsubmit = function () {
  cohortSizes.value = calculateCohort("a", cohortLimit.value,classA.value);
  // document.getElementById("cohortSizes").innerHTML = calculateCohort("a", cohortLimit.value,classA.value);
  // console.log(this.cohortSizes.value);
  return false;
};
// }

function addField(){
  var howManyClasses = document.getElementById("howManyClasses").value;
  var classFields = document.getElementById("classFields");
  while(classFields.hasChildNodes()){
    classFields.removeChild(classFields.lastChild);
  };
  for (i = 0; i < howManyClasses; i++){
    classFields.appendChild(document.createTextNode("Class " + (i + 1 )));
    classFields.id = i + 1;
    // console.log(classFields.id);
    var input = document.createElement("input");
    input.type = "number";
    classFields.appendChild(input);

    classFields.appendChild(document.createElement("br"));
    classFields.appendChild(document.createElement("br"));
  };
};


// function addField(){
//   var classFields = document.getElementById("classFields");
//   var currentFields = classFields.childElementCount;
//   var newFields = document.createElement("INPUT");
//   newFields.setAttribute("type", "number");
//   newFields.setAttribute("value", (currentFields + 1));
//   newFields.setAttribute("id", (currentFields + 1));
//   classFields.appendChild(newFields);
// }

// calculateCohort("a", 12, 28);
// calculateCohort("b", 11, 20);
// console.log(classAssignments);