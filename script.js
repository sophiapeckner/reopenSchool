// CREDIT:
// https://www.sitepoint.com/community/t/math-formula-input-form/6956/3
// https://www.quirksmode.org/dom/domform.html
// http://jsfiddle.net/t656N/1/
// https://stackoverflow.com/questions/4825295/javascript-onclick-to-get-the-id-of-the-clicked-button/4825325

var gradeName = "";
var unsortedData = [];
var checkedCapacity;
m = new Map();
var reopenForm = document.getElementById("reopenForm");

function findGradeName(clicked_id){
  gradeName = clicked_id;
  document.getElementById("changeGrade").innerHTML = gradeName + ":";
}

function displayRadioValue() { 
  var element = document.getElementsByName("capacityPercent"); 
  for(i = 0; i < element.length; i++) { 
    if(element[i].checked){
      checkedCapacity = element[i].value; 
    }
  } 
  return checkedCapacity;
}

function gradeCapacity(){
  checkedCapacity = displayRadioValue();
  var percent = parseInt(checkedCapacity);
  var convertToDecimal = percent / 100;
  var totalStudentsPerGrade = document.getElementById("totalStudentsPerGrade").value;
  var gradeCapacityPerDay = Math.ceil(totalStudentsPerGrade * convertToDecimal);
  return gradeCapacityPerDay;
}

function calculateCohort(maxCohortSize, studentsPerDay, grade){
  var howManyCohort = studentsPerDay / maxCohortSize;
  if (Number.isInteger(howManyCohort) === true){
    var cohortSize = maxCohortSize;
  } else {
    var unevenHowManyCohort = Math.ceil(howManyCohort);
    var intCohortSize = studentsPerDay / unevenHowManyCohort;
    if (Number.isInteger(intCohortSize) === true){
      var cohortSize = intCohortSize;
    } else {
      var remainder = studentsPerDay % unevenHowManyCohort;
      var lastCohortSize = Math.floor(intCohortSize) + remainder;
      // lastCohortSize printing out!
      unsortedData.push(lastCohortSize + "_" + grade);
      var remainingCohortSize = Math.floor(intCohortSize);
      var howManyCohort = howManyCohort - 1;
      var cohortSize = remainingCohortSize;
    };
  };
  for(var i = 0; i < howManyCohort; i++){
      unsortedData.push(cohortSize + "_" + grade);
  };
  return unsortedData;
};

function distribute(data, capacity, grade){
  createArray();
  m[grade + "_mon"] = [];
  m[grade + "_tues"] = [];
  m[grade + "_thur"] = [];
  m[grade + "_fri"] = [];
  var schedule = [];
  var addId = [];
  var rotate = 0;
  switch (capacity){
    case "20":
      rotate = 5;
      break;
    case "25":
      rotate = 4;
      break;
    case "50":
      rotate = 2;
      break;
  }
  var raw = [];
  for (i = 0; i < rotate; i++){
    for (j = 0; j < data.length; j++){
      var a = data[j];
      raw.push(a);
    }
  }
  for (i = 0; i < raw.length; i++){
    addId.push((i + 1) + "_" + raw[i]);
  }
  for (i = 0; i < addId.length; i = i + data.length){
    if (i == addId.length){
      break;
    }
    var b = addId.slice(i, (i + data.length))
    schedule.push(b)
  }
  if (capacity === "25"){
    m[grade + "_mon"] = schedule[0];
    m[grade + "_tues"] = schedule[1];
    m[grade + "_wed"] = [];
    m[grade + "_thur"] = schedule[2];
    m[grade + "_fri"] = schedule[3];
  } else if (capacity === "50"){
    m[grade + "_mon"] = schedule[0];
    m[grade + "_tues"] = schedule[1];
    m[grade + "_wed"] = [];
    m[grade + "_thur"] = schedule[0];
    m[grade + "_fri"] = schedule[1];
  }
  // console.log(m[grade + "_mon"])
  // console.log(m[grade + "_tues"])
  // console.log(m[grade + "_thur"])
  // console.log(m[grade + "_fri"])
}

function beautifyData(tableCellData){
  var finalTableCellData = "";
  // console.log(tableCellData)
  for (i = 0; i < tableCellData.length; i++) {
    var splitData = tableCellData[i].split("_", 2);
    var id = splitData[0];
    var cohortSize = splitData[1];
    finalTableCellData = finalTableCellData + ("cohort" + id + ": " + cohortSize + " students" + "<br>");
  }
  return finalTableCellData;
}

function createTable(){
  var table = document.getElementById("tableSchedule");
  var b = ["kindergarden", "firstGrade", "secondGrade", "thirdGrade", "fourthGrade", "fifthGrade"];
  for (i of b){
    if (m[i+"_mon"].length == 0 ) {
      continue;
    }
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = i + "<br>" + "cohort limit: " + cohortLimit + "<br>" + "capacity: " + checkedCapacity + "%";
    cell2.innerHTML = beautifyData(m[gradeName+"_mon"]);
    cell3.innerHTML = beautifyData(m[gradeName+"_tues"]);
    cell4.innerHTML = "Off Day";
    cell5.innerHTML = beautifyData(m[gradeName+"_thur"]);
    cell6.innerHTML = beautifyData(m[gradeName+"_fri"]);
  }
}

function createArray(){
  var a = ["mon", "tues", "wed", "thur", "fri"];
  var b = ["kindergarden", "firstGrade", "secondGrade", "thirdGrade", "fourthGrade", "fifthGrade"];
  for (i of a){
    for (j of b){
      var x = j + "_" + i;
      m[x] = [];
    }
  }
}

reopenForm.onsubmit = function () {
  if (gradeName === ""){
    // document.getElementById("container").innerHTML = "Uhoh! Please click on a button labeled K - Grade 6"
    document.getElementById("container").innerHTML = '<span style="background-color: rgb(255, 173, 173)"> Uh oh! Please click on a button labeled Kindergarden - Grade 5</span>'
    return false;
  }
  document.getElementById("container").innerHTML = ""
  window.cohortLimit = document.getElementById("cohortLimit").value;
  var studentsPerDay = gradeCapacity();
  calculateCohort(cohortLimit, studentsPerDay, gradeName);
  distribute(unsortedData, checkedCapacity, gradeName);
  unsortedData = [];
  createTable();
  changeColor(gradeName);
  reopenForm.reset();
  return false;
}

// Minor Details (css related!)

function questionMarkPopup1() {
  var popup1 = document.getElementById("myPopup1");
  popup1.classList.toggle("show");
}

function questionMarkPopup2() {
  var popup2 = document.getElementById("myPopup2");
  popup2.classList.toggle("show");
}

function questionMarkPopup3() {
  var popup3 = document.getElementById("myPopup3");
  popup3.classList.toggle("show");
}

function changeColor(id){
    document.getElementById(gradeName).style.background = 'rgb(193, 255, 145)';
}