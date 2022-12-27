// Logic behind the functionalities
var serverTime = "America/New_York";  // America/New_York /

// current datetime string in America/New_York timezone
let local_datetime_str = new Date().toLocaleString("en-US", { timeZone: serverTime });

// create new Date object
let d = new Date(local_datetime_str);

// Months
let allMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let monthTxt = allMonths[d.getMonth()];  // May

// year as (YYYY) format
let year = d.getFullYear();

// month as (MM) format
let month = ("0" + (d.getMonth() + 1)).slice(-2);

// date as (DD) format
let date = ("0" + d.getDate()).slice(-2);

// date time in YYYY-MM-DD format
//let date_time = year + "-" + month + "-" + date;
let today = month + "/" + date + "/" + year; // "11/13/2022"
//console.log(today);

// Time 
let hh = d.getHours();
hh = hh <= 9 ? '0' + hh : hh;
//let ampm = hh >= 12 ? 'pm' : 'am';
let mm = d.getMinutes();
mm = mm <= 9 ? '0' + mm : mm;
let ss = d.getSeconds();
ss = ss <= 9 ? '0' + ss : ss;
//let time = hh + ":" + mm + ampm;
//document.getElementById("clock").innerText = time; 


//const data = require("./data");
const data = require("./data_prayers");
const dataFull = require("./data_all_prayers");



class Controller {
  // getting all data
  async getAllData() {
    // return all data
    return new Promise((resolve, _) => resolve(data));
  }
//

 // getting prayers data
 async getPrayersData() {
  return new Promise((resolve, reject) => {
    // get Morning data
  let morningData = data.filter(function(morningIn) {
  return morningIn.time == "morning"; });
  //console.log(morningData);
 
       // get Afternoon data
  let afternoonData = data.filter(function(afternoonIn) {
  return afternoonIn.time == "afternoon"; });
  //console.log(afternoonData);
 
 // get Evening data
  let eveningData = data.filter(function(eveningIn) {
  return eveningIn.time == "evening"; });
  //console.log(eveningData);
    
  if (hh < 12) {
      // return the data
      resolve(morningData);
    } else if (hh >= 12 && hh <= 17) {
      resolve(afternoonData);
    }else if (hh >= 17 && hh <= 24) {
      resolve(eveningData);
    }else {
      // return an error
      reject(`Today object not found `);
    }
  });
} 
//
 // getting random prayers data
 async getRandomPrayersData() {
  return new Promise((resolve, reject) => {
    // get Morning data
  let morningDataR = dataFull.filter(function(morningInR) {
  return morningInR.time == "morning"; });
  //console.log(morningData);
  let randomIndexMorning = Math.floor(Math.random() * morningDataR.length); 
    let randomDataMorning = morningDataR[randomIndexMorning];

 
       // get Afternoon data
  let afternoonDataR = dataFull.filter(function(afternoonInR) {
  return afternoonInR.time == "afternoon"; });
  //console.log(afternoonData);
  let randomIndexAfternoon = Math.floor(Math.random() * afternoonDataR.length); 
    let randomDataAfternoon = afternoonDataR[randomIndexAfternoon];	

 
 // get Evening data
  let eveningDataR = dataFull.filter(function(eveningInR) {
  return eveningInR.time == "evening"; });
  //console.log(eveningData);
  let randomIndexEvening = Math.floor(Math.random() * eveningDataR.length); 
    let randomDataEvening = eveningDataR[randomIndexEvening];
    
  
  if (hh < 12) {
      // return the data
      resolve(randomDataMorning);
    } else if (hh >= 12 && hh <= 17) {
      resolve(randomDataAfternoon);
    }else if (hh >= 17 && hh <= 24) {
      resolve(randomDataEvening);
    }else {
      // return an error
      reject(`Today object not found `);
    }
  });
}

  // add above
}
module.exports = Controller;