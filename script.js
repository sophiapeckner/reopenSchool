// CREDIT:
// https://www.sitepoint.com/community/t/math-formula-input-form/6956/3
// https://www.quirksmode.org/dom/domform.html
// http://jsfiddle.net/t656N/1/
// https://stackoverflow.com/questions/4825295/javascript-onclick-to-get-the-id-of-the-clicked-button/4825325

var gradeName;
var grade0Total = [];
var grade1Total = [];
var totalData = [];
var unsortedData = [];

function findGradeName(clicked_id){
  gradeName = clicked_id;
  console.log(gradeName);
}

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
      // console.log(classRoom + "_" + lastCohortSize + "_" + grade);
      unsortedData.push(classRoom + "_" + lastCohortSize + "_" + grade);
      var remainingCohortSize = Math.floor(intCohortSize);
      var howManyCohort = howManyCohort - 1;
      var cohortSize = remainingCohortSize;
    };
  };
  for(var i = 0; i < howManyCohort; i++){
      // console.log(classRoom + "_" + cohortSize + "_" + grade);
      unsortedData.push(classRoom + "_" + cohortSize + "_" + grade);
  };
  return unsortedData;
};

function addField(){
  window.howManyClasses = document.getElementById("howManyClasses").value;
  var classFields = document.getElementById("classFields");
  while(classFields.hasChildNodes()){
    classFields.removeChild(classFields.lastChild);
  };
  for(i = 0; i < howManyClasses; i++){
    classFields.appendChild(document.createTextNode("Class " + (i + 1 )));
    window.input = document.createElement("input");
    input.id = (i + 1) + "_" + gradeName;
    input.type = "number";
    classFields.appendChild(input);
    classFields.appendChild(document.createElement("br"));
  };
};

var reopenForm = document.getElementById("reopenForm");

reopenForm.onsubmit = function () {
  // var grade = findGradeName(this.id);
  for(i = 0; i < howManyClasses; i++){
    var x = document.getElementById((i + 1) + "_" + gradeName);
    cohortSizes.value = calculateCohort((i + 1), cohortLimit.value, x.value, gradeName);  
    unsortedData.push;
  };
  var sortedData = sortArray(unsortedData);
  var gradeCapacityPerDay = gradeCapacity(sortedData, 50);
  distributeDays(sortedData, gradeCapacityPerDay);
  // totalData.push(distributeDays);
  console.log(grade0Total);
  console.log(grade1Total);
  var form = document.getElementById("reopenForm");
  // var fieldset = document.getElementsByTagName("fieldset")
  // var classFields = document.getElementById("classFields");
  // fieldset.removeChild(classFields);
  document.getElementById("classFields").innerHTML = "";
  form.reset();

  unsortedData = [];
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
  grade1Total = [];
  grade0Total = [];
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
  for (i = 0; i < marker.length; i++){
    if (i == marker.length - 1){
      // console.log(sortedData[i]);
      break;
    }
    
    var a = sortedData.slice(marker[i], marker[i + 1]);
    switch (gradeName) {
      case "kindergarden":
        grade0Total.push(a);
        break;
      case "firstGrade":
        grade1Total.push(a);
        break;
    }
  }
  // console.log(grade0Total);
}

function assignDays(totalArray){
  for (i = 0; i < totalArray.length; i++){
    
  }
}