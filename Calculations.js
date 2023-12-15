'use strict';

import{unit, dayType} from './Constants.js';

export class Calculations{

    constructor (startDate, endDate){
        this.startDate = new Date (startDate);
        this.endDate = new Date (endDate);
    }
    
    
    countWorkDays = () => {
        let stDate = this.startDate;
        return Array.from({ length: this.countAllDays() })
        .reduce(count => {
                    if (stDate.getDay() % 6 !== 0) count++;
                    stDate = new Date(stDate.setDate(stDate.getDate() + 1));
                    return count;
            
        }, 0);
    
    }

    countWeekEnds = () =>{
        let stDate = this.startDate;
        return Array.from({ length: this.countAllDays() })
        .reduce(count => {
                    if (stDate.getDay() % 6 === 0) count++;
                    stDate = new Date(stDate.setDate(stDate.getDate() + 1));
                    return count;}, 0);

    }
    
    countAllDays = () => {
        return ((this.endDate - this.startDate) / (1000 * 3600 * 24));
    } 

    countUnitsValue = () =>{

        let mult = unit.selectedOptions[0].dataset.multiplier;

        switch (dayType.value){
            case 'all': {
                return this.countAllDays()*mult;
            }
            case 'weekdays': {
                return this.countWorkDays()*mult;
            }
            case 'weekend':{
                return this.countWeekEnds()*mult;
            }
        }
    }
}