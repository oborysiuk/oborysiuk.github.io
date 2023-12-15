'use strict';

import {startDate, endDate, unit, calculatorTab, holidayTab,
     API_KEY, stateHolidaysButton, countrySelector, yearOfHolidays,
    filterIcon, weekPreselection, monthPreselection, calculateButton, tab} from './Constants.js';

import { CountryHolidays } from './Calendar_API.js';
import { TimeInterval } from './Time_Interval.js';
import { Calculations } from './Calculations.js';

const countryHolidays = new CountryHolidays(API_KEY);

document.addEventListener('DOMContentLoaded', renderCalculations);

stateHolidaysButton.addEventListener('click', (event) =>{
    countryHolidays.setYearValues();
    yearOfHolidays.setAttribute('disabled', '');
    countryHolidays.fetchData();
    
})

countrySelector.addEventListener('change', (event) => {

    countryHolidays.fetchHolidays(countrySelector.value, yearOfHolidays.value);
    yearOfHolidays.removeAttribute('disabled');
    
})

yearOfHolidays.addEventListener('change', (event) => {

    countryHolidays.fetchHolidays(countrySelector.value, yearOfHolidays.value);
    
})

filterIcon.addEventListener('click', (event)=>{
    countryHolidays.sortTable(filterIcon);
})

calculateButton.addEventListener('click', (event)=>{

    if (startDate.value === '' || endDate.value === ''){
        alert ('Both dates should be entered!');
    }
    else{
        const calculations = new Calculations (startDate.value, endDate.value);
        const timeInterval = new TimeInterval(startDate.value, endDate.value, 
        unit.value, calculations.countUnitsValue());
        timeInterval.createCalculationElement();
        timeInterval.storeCalculationInLocalStorage();
    } 
})

tab.addEventListener('click', (event)=>{

    let tabClass = event.target.className;
    openTab(tabClass);
    
})

startDate.addEventListener('change', (event)=>{

    endDate.setAttribute('min', startDate.value);

})

endDate.addEventListener('change', (event)=>{

    startDate.setAttribute('max', endDate.value);
   
})

function openTab(tabClass) {

    if (tabClass.includes('state-holiday-link')){
        calculatorTab.style.display = "none";
        holidayTab.style.display = "block";
    } else if (tabClass.includes('calculator-link')){
        holidayTab.style.display = "none";
        calculatorTab.style.display = "block";
    }
  }
weekPreselection.addEventListener('click', (event) =>{
    setPreselectionDates(7);
})

monthPreselection.addEventListener('click', (event) =>{
    setPreselectionDates(30);
    
})

function renderCalculations() {

    let dictionary = localStorage.getItem('tableEntry') !== null
    ? JSON.parse(localStorage.getItem('tableEntry'))
    : [];

    dictionary.forEach ( element => {
        let timeInterval = new TimeInterval(element['startDate'], element['endDate'],
        element['unit'], element['calculationResult']);
        timeInterval.createCalculationElement();
    });
    
}


function setPreselectionDates (weekOrMonthValue) {
    if (startDate.value !== ''){
        
        endDate.value = setDateValue(startDate.value, weekOrMonthValue, '1');
    }
    else if (startDate.value === '' && endDate.value === ''){
        startDate.value = dateFormatter(new Date());
        endDate.value = setDateValue(startDate.value, weekOrMonthValue, '1');

    }
    else if(endDate.value !== ''){
        startDate.value = setDateValue(endDate.value, weekOrMonthValue, '2');

    }
}

function setDateValue (date, value, sequence){
  
    let dateValue = new Date(date);
    let preselectedDate;
    if (sequence === '1')
    { 
        preselectedDate = new Date(dateValue.setDate(dateValue.getDate() + value));
    }
    else if (sequence === '2'){
        preselectedDate = new Date(dateValue.setDate(dateValue.getDate() - value));

    }
    return dateFormatter(preselectedDate);

}

function dateFormatter (date) {

    let year = date.getFullYear();
    let mnth = String(date.getMonth() + 1).padStart(2, '0');
    let dt = String(date.getDate()).padStart(2, '0');

    return year+'-'+mnth+'-'+dt;
}




