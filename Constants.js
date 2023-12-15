const startDate = document.querySelector('.start');
const endDate = document.querySelector('.end');
const unit = document.querySelector('.measurement');
const dayType =document.querySelector('.day-type');
const calculatorTab = document.querySelector('.tab-calculator');
const holidayTab = document.querySelector('.tab-state-holidays');
const resultTable = document.querySelector('.table-body');
const API_KEY = 'fLZqODj92mMgp5diHrnEo4a2KgFAad0q';
const stateHolidaysButton = document.querySelector('.state-holiday-link');
const countrySelector = document.querySelector('.country');
const yearOfHolidays = document.querySelector('.year');
const tableBody = document.querySelector('.table-body-tab-2');
const tableHolidays = document.querySelector('.table-holidays');
const filterIcon = document.querySelector('.filter-icon');
const defaultOptionForCountrySelect = document.querySelector('defalt-option-country');
const weekPreselection = document.querySelector('.week');
const monthPreselection = document.querySelector('.month');
const calculateButton = document.querySelector('.calc-button');
const tab = document.querySelector('.tab');

export{startDate, endDate, unit, dayType,calculatorTab, holidayTab, 
    resultTable, API_KEY, stateHolidaysButton, countrySelector, yearOfHolidays,
     tableBody, tableHolidays, filterIcon, defaultOptionForCountrySelect, weekPreselection, 
    monthPreselection, calculateButton, tab};