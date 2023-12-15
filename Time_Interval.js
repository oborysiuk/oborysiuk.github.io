'use strict';

import {resultTable} from './Constants.js'


export class TimeInterval{
    constructor(startDate, endDate, unit, calculationResult){
        this.startDate = startDate;
        this.endDate = endDate;
        this.unit = unit;
        this.calculationResult = calculationResult;
    }

    createCalculationElement(){

        const arrayParameters = [this.startDate, this.endDate, this.unit, this.calculationResult];
        const tr = document.createElement('tr');
        tr.className = 'tabel-row';

        arrayParameters.forEach(element => {
            let td = document.createElement('td');
            td.className = 'table-cell';
            let textElement = document.createElement('span');
            textElement.className = 'text-element';
            textElement.innerText = element;
            td.appendChild(textElement);
            tr.appendChild(td);
        });

        resultTable.insertBefore(tr, resultTable.children[0]);        
    }

     storeCalculationInLocalStorage(){

        let reducedJSON;

         const tableEntry = {
            startDate : this.startDate, 
            endDate: this.endDate, 
            unit: this.unit,
            calculationResult: this.calculationResult
        };

        let jsonProto = localStorage.getItem('tableEntry') !== null
            ? JSON.parse(localStorage.getItem('tableEntry'))
            : [];
        

        console.log(jsonProto.length);
       
        if(jsonProto.length > 9){
            jsonProto = jsonProto.slice(1, 10);
        }

        jsonProto.push(tableEntry);
        localStorage.setItem(['tableEntry'], JSON.stringify(jsonProto));
    }
    
}