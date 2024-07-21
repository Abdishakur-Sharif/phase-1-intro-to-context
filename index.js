// Your code here
function createEmployeeRecord(employeeArray){   
    return {
    firstName : employeeArray[0],
    familyName : employeeArray[1],
    title : employeeArray[2],
    payPerHour : employeeArray[3],
    timeInEvents : [],
    timeOutEvents : []
};
}
let testEmployee = ["Gray", "Worm", "Security", 1];
console.log(createEmployeeRecord(testEmployee));

function createEmployeeRecords(employeeArray){
return employeeArray.map(createEmployeeRecord)
}

let twoRows = [
  ["moe", "sizlak", "barkeep", 2],
  ["bartholomew", "simpson", "scamp", 3],
];
let employeeRecords = createEmployeeRecords(twoRows);
console.log(employeeRecords)

function createTimeInEvent(employeeRecord, dateTime){
    let [date, hour] = dateTime.split(' ');
    let timeInEvent = {
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

let bpRecord = ["Byron", "Poodle", "Mascot", 3];
let updatedBpRecord = createTimeInEvent(bpRecord, "2014-02-28 1400");
let newEvent = updatedBpRecord.timeInEvents[0]
console.log(newEvent);

function createTimeOutEvent(employeeRecord, dateTime){
  let [date, hour] = dateTime.split(' ')
  let timeOutEvent = {
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10)
  }
  employeeRecord.timeOutEvents.push(timeOutEvent);
  return employeeRecord;
}
let bpRecord2 = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
let updatedBpRecord2 = createTimeOutEvent(bpRecord, "2015-02-28 1700");
let newEvent2 = updatedBpRecord.timeOutEvents[0];

console.log(newEvent2);

function hoursWorkedOnDate(employeeRecord, date){
  let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
  let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

  let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked
 
};

let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);
cRecord = createTimeInEvent(cRecord, "0044-03-15 0900");
cRecord = createTimeOutEvent(cRecord, "0044-03-15 1100");

let hoursWorked = hoursWorkedOnDate(cRecord, "0044-03-15");
console.log(hoursWorked);

function wagesEarnedOnDate(employeeRecord, date){
  let hoursWorked = hoursWorkedOnDate(employeeRecord, date)
  let wagesEarned = hoursWorked * employeeRecord.payPerHour;
  return wagesEarned;

}

let wages = wagesEarnedOnDate(cRecord, "0044-03-15");
console.log(wages);


function allWagesFor(employeeRecord){
  let datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  let totalWages = datesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employeeRecord, date)
  }, 0);
  return totalWages
}

updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900");
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100");

let totalWages = allWagesFor(cRecord);
console.log(totalWages);

function calculatePayroll(employeeRecords){
  return employeeRecords.reduce((total, employee) => {
    return total + allWagesFor(employee)
  }, 0);
}

 let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10]);
 let sRecord = createEmployeeRecord(["Simba", "", "King", 100]);

 let sTimeData = [
          ["2019-01-01 0900", "2019-01-01 1300"], 
          ["2019-01-02 1000", "2019-01-02 1300"]
 ]

 let rTimeData = [
          ["2019-01-11 0900", "2019-01-11 1300"], 
          ["2019-01-12 1000", "2019-01-12 1300"]  
        ]

        sTimeData.forEach(function (d) {
          let [dIn, dOut] = d;
          sRecord = createTimeInEvent(sRecord, dIn);
          sRecord = createTimeOutEvent(sRecord, dOut);
        });

        rTimeData.forEach(function (d, i) {
          let [dIn, dOut] = d;
          rRecord = createTimeInEvent(rRecord, dIn);
          rRecord = createTimeOutEvent(rRecord, dOut);
        });

        let employees = [sRecord, rRecord];
        let grandTotalOwed = employees.reduce((m, e) => m + allWagesFor(e), 0);
console.log(grandTotalOwed)