
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
    // cohortSizes.value = calculateCohort("a", cohortLimit.value,classA.value);
    document.getElementById("cohortSizes").innerHTML = calculateCohort("a", cohortLimit.value,classA.value);
    // console.log(this.cohortSizes.value);
    return false;
  };
// }

// calculateCohort("a", 12, 28);
// calculateCohort("b", 11, 20);
// console.log(classAssignments);