// CREDIT:
//https://www.sitepoint.com/community/t/math-formula-input-form/6956/3
//http://jsfiddle.net/t656N/1/

var classAssignments = [];
  
function calculateCohort(classRoom, maxCohortSize, totalStudents, grade){
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
      console.log(classRoom + "_" + lastCohortSize + "_" + grade);
      classAssignments.push(classRoom + "_" + lastCohortSize + "_" + grade);
      var remainingCohortSize = Math.floor(intCohortSize);
      var howManyCohort = howManyCohort - 1;
      var cohortSize = remainingCohortSize;
    };
  };
  for(var i = 0; i < howManyCohort; i++){
      console.log(classRoom + "_" + cohortSize + "_" + grade);
      classAssignments.push(classRoom + "_" + cohortSize + "_" + grade);
  };
  return classAssignments;
};

function addField(grade){
  grade = "grade1";
  window.howManyClasses = document.getElementById("howManyClasses").value;
  var classFields = document.getElementById("classFields");
  while(classFields.hasChildNodes()){
    classFields.removeChild(classFields.lastChild);
  };
  for (i = 0; i < howManyClasses; i++){
    classFields.appendChild(document.createTextNode("Class " + (i + 1 )));
    window.input = document.createElement("input");
    input.id = (i + 1) + "_" + grade;
    input.type = "number";
    classFields.appendChild(input);
  
    classFields.appendChild(document.createElement("br"));

  };
};

var reopenForm = document.getElementById("reopenForm");
reopenForm.onsubmit = function () {
  for (i = 0; i < howManyClasses; i++){
    var x = document.getElementById((i + 1) + "_" + "grade1");
    cohortSizes.value = calculateCohort((i + 1), cohortLimit.value, x.value, "grade1");
  };
  return false;
};