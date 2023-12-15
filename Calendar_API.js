'use strict';

import { countrySelector, tableBody, yearOfHolidays} from "./Constants.js";

export class CountryHolidays{

    #contryHolidaysResponse;

    constructor(API_KEY){
        this.API_KEY = API_KEY;
        this.isLoading = false;
    }

    async asyncFetchCounrtyData (url) {
        try{
            let response = await fetch(url);
            let jsonResponse = await response.json();
            this.updateCountrySelect(jsonResponse);
        } 
        catch (error) {
            alert(error);
        }
        finally{
            this.isLoading = false;
        }
    }

    fetchData = () => {

        const url = `https://calendarific.com/api/v2/countries?api_key=${this.API_KEY}`;
        this.isLoading = true;
        this.asyncFetchCounrtyData(url);
    }

    updateCountrySelect= (data) => {
        countrySelector.innerHTML = `<option disabled selected class ="defalt-option-country">Choose the country:</option>`
        
        const {response} = data;
        response.countries.forEach(element => {
            let opt = document.createElement("option");
            opt.innerHTML = element.country_name;
            opt.value = element['iso-3166'];
            countrySelector.add(opt);
        });

    }

    fetchHolidays = (country, year) =>{
        const url = `https://calendarific.com/api/v2/holidays?&api_key=${this.API_KEY}&country=${country}&year=${year}`;
        this.isLoading = true;
        this.fetchCountryHolidays(url);
    }

    async fetchCountryHolidays(url){
        try{
            let response = await fetch(url);
            this.#contryHolidaysResponse = await response.json();
            this.updateTableResults(this.#contryHolidaysResponse);
        } 
        catch (error) {
            alert(error);
        }
        finally{
            this.isLoading = false;
        }
    }

    updateTableResults = (data) =>{
        
        tableBody.innerHTML = ""
        const {response} = data;
        response.holidays.forEach(element => {

            const tr = document.createElement('tr');
            tr.className = 'tabel-row';
            const td =document.createElement('td');
            td.className = 'table-cell';
            const textElement = document.createElement('span');
            textElement.className = 'text-element';
            textElement.innerText = element.date.iso;
            td.appendChild(textElement);
            tr.appendChild(td);
            
            const td1 =document.createElement('td');
            td1.className = 'table-cell';
            const textElement1 = document.createElement('span');
            textElement1.className = 'text-element';
            textElement1.innerText = element.name;
            td1.appendChild(textElement1);
            tr.appendChild(td1);

            tableBody.appendChild(tr);
        });

    }

    setYearValues = () =>{
        yearOfHolidays.innerHTML = "";
        let currentDate = new Date();
        for (let i=2001; i<=2049; i++){
            let opt = document.createElement("option");
            opt.className = 'year-option';
            opt.innerHTML = i;
            opt.value = i;
            if (i === currentDate.getFullYear())
                opt.setAttribute("selected", "");
            yearOfHolidays.add(opt);
        }
    }

    sortTable = (filterIcon) => {

        let direction;

        if (filterIcon.dataset.direction === 'asc'){
            direction = 'asc';
            filterIcon.dataset.direction = 'desc';
        }
        else if (filterIcon.dataset.direction === 'desc'){
            direction = 'desc';
            filterIcon.dataset.direction = 'asc';
        }

        tableBody.innerHTML = "";
        this.#contryHolidaysResponse.response.holidays.sort(this.byProperty(direction));
        this.updateTableResults(this.#contryHolidaysResponse);

    }

    byProperty = (direction) => {
        if (direction === 'desc'){
         return (firstItem, secondItem) => (firstItem.date.iso > secondItem.date.iso) ? 1: -1;
        }
        else if (direction === 'asc'){
         return (firstItem, secondItem) => (firstItem.date.iso < secondItem.date.iso) ? 1:-1;
        }
      }
}

