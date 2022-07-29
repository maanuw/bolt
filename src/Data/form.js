
const steps = Array.from(document.querySelectorAll("form .step"));
const nextBtn = document.querySelectorAll("form .next-btn");
const prevBtn = document.querySelectorAll("form .previous-btn");
const form = document.querySelector("form");
var stylist;

//Add services.
const mensService = new Service('Mens Hairstyle', 100);
const womensService = new Service('Womens Hairstyle', 150);
const unisexService = new Service('Unisex Hairstyle', 250);

//Add employees
const marionTime = [["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"]];
const marion = new Employee('Marion Alex', marionTime);
const izrikTime = [["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"]];
const izrik = new Employee('Izrik James', izrikTime);
const idrisTime = [["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"],["8am-9am", "9am-10am", "10am-11am", "11am-12pm", "12pm-1pm", "1pm-2pm", "3pm-4pm", "4pm-5pm"]];
const idris = new Employee('Idris Joe', idrisTime);


nextBtn.forEach((button) => {
  button.addEventListener("click", () => {
    changeStep("next");
  });
});
prevBtn.forEach((button) => {
  button.addEventListener("click", () => {
    changeStep("prev");
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = [];
  form.querySelectorAll("input").forEach((input) => {
    const { name, value } = input;
    inputs.push({ name, value });
  });
  console.log(inputs);
  form.reset();
  resetTimeField();
});

function changeStep(btn) {
  const inputs = [];
  let index = 0;
  const active = document.querySelector(".active");
  index = steps.indexOf(active);
  steps[index].classList.remove("active");
  if (btn === "next") {
    index++;
    if (index == 2){
      var select = document.getElementById('Stylist');
      var value = select.options[select.selectedIndex].value;
      stylist = value;
    }
  } else if (btn === "prev") {
    index--;
  }
  steps[index].classList.add("active");
}

function getTimeList() {
  var select = document.getElementById('day');
  var day = select.options[select.selectedIndex].value;
  var timeList;
  var index;
  switch (day) {
    case "Sunday":
      index = 0;
      break;
    case "Monday":
      index = 1;
      break;
    case "Tuesday":
      index = 2;
      break;
    case "Wednesday":
      index = 3;
      break;
    case "Thursday":
      index = 4;
      break;
    case "Friday":
      index = 5;
      break;
    case "Saturday":
      index = 6;
  }
  if (stylist == "Marion Alex"){
    timeList = marion.getAvailability();
  }else if(stylist == "Izrik James"){
    timeList = izrik.getAvailability();
  }else if(stylist == "Idris Joe"){
    timeList = idris.getAvailability();
  }
  var selectTime = document.getElementById('time');
  var length = selectTime.options.length;
  for (i = length - 1; i >= 0; i--) {
    selectTime.options[i] = null;
  }
  for (var i = 0; i < timeList[index].length; i++) {
    var opt = timeList[index][i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectTime.appendChild(el);
  }
}

function resetTimeField(){
  var selectTime = document.getElementById('time');
  var length = selectTime.options.length;
  for (i = length - 1; i >= 0; i--) {
    selectTime.options[i] = null;
  }
}

// Add selected hairdressers availability options in booking form
var selectDay = document.getElementById("day");
var dayOptions = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];

for (var i = 0; i < dayOptions.length; i++) {
  var opt = dayOptions[i];
  var el = document.createElement("option");
  el.textContent = opt;
  el.value = opt;
  selectDay.appendChild(el);
}


// Add service options in booking form
var selectService = document.getElementById("Service");
var serviceOptions = [mensService.getName(), womensService.getName(), unisexService.getName()];

for(var i = 0; i < serviceOptions.length; i++) {
    var opt = serviceOptions[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectService.appendChild(el);
}

// Add hairdresser options in booking form
var selectStylist = document.getElementById("Stylist");
var stylistOptions = [marion.getName(), izrik.getName(), idris.getName()];

for(var i = 0; i < stylistOptions.length; i++) {
    var opt = stylistOptions[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectStylist.appendChild(el);
}

