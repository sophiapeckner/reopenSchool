// CREDIT:
// https://www.sitepoint.com/community/t/math-formula-input-form/6956/3
// https://www.quirksmode.org/dom/domform.html
// http://jsfiddle.net/t656N/1/

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
  for(i = 0; i < howManyClasses; i++){
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
  for(i = 0; i < howManyClasses; i++){
    var x = document.getElementById((i + 1) + "_" + "grade1");
    cohortSizes.value = calculateCohort((i + 1), cohortLimit.value, x.value, "grade1");  
  };
  console.log(classAssignments);

  return false;
};

function sortArray(rawData){
  for(i = 0; i < rawData.length; i++){
    if(i == rawData.length - 1){
      break;
    }
       
    var a = rawData[i].split("_", 1);
    var b = rawData[i+1].split("_", 1);
    
    if (a[0] === b[0]){
      var tmp = rawData[i+1];
      rawData.splice(i+1, 1);
      rawData.splice(rawData.length, 0, tmp);
    }
  };
  return rawData; 
};

function gradeCapacity(sortedData, percentNum){
  var sum = 0;
  var convertToDecimal = percentNum / 100;
  for(i = 0; i < sortedData.length; i++){
    var a = sortedData[i].split("_", 2);
    var b = parseInt(a[1]);
    sum = sum + b;
  }
  var gradeCapacityPerDay = Math.ceil(sum * convertToDecimal);
  return gradeCapacityPerDay;
}

function distributeDays(sortedData, max){
  var sum = 0;
  var marker = [];
  for(i = 0; i < sortedData.length; i++){
    var a = sortedData[i].split("_", 2);
    var b = parseInt(a[1]);
    sum = sum + b;
    if(i == 0 && sum < max){
      marker.push(i);
    }
    if(sum >= max){
      marker.push(i);
      sum = b;
    }
    if (i == sortedData.length - 1){
      marker.push(i + 1);
    }
  }
  console.log(marker)
  for (i = 0; i < marker.length; i++){
    if (i == marker.length - 1){
      // console.log(sortedData[i]);
      break;
    }0
    var a = sortedData.slice(marker[i], marker[i + 1]);
    console.log(a);
  }
}

testArray = [
  "1_10_grade1",
  "2_11_grade1",
  "1_13_grade1",
  "2_12_grade1"
];

var gradeCapacityPerDay = gradeCapacity(testArray, 50);
console.log(gradeCapacityPerDay);
distributeDays(testArray, gradeCapacityPerDay);