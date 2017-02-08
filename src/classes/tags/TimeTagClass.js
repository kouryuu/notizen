import Tag from './TagClass'
import { TIME_TAG } from './TypesOfTags'

class TimeTag extends Tag {
  constructor() {
    super(TIME_TAG);
    this.hours = new Date().getHours();
    this.minutes = new Date().getMinutes();
   }
   increaseHour() {
     if(this.hours == 23) {
       this.hours = 0;
     } else {
       this.hours = this.hours + 1;
     }
   }
   increaseMinute() {
     if(this.minutes == 59) {
       this.minutes = 0;
     } else {
       this.minutes = this.minutes + 1;
     }
   }
   decreaseHour() {
     if(this.hours == 0) {
       this.hours = 23;
     } else {
       this.hours = this.hours - 1;
     }
   }
   decreaseMinute() {
     if(this.minutes == 0) {
       this.minutes = 59;
     } else {
       this.minutes = this.minutes - 1;
     }
   }
   getHours() {
    return this.hours;
   }
   getMinutes() {
    return this.minutes;
   }
   setHours(hours) {
     this.hours = hours;
   }
   setMinutes(minutes) {
     this.minutes = minutes;
   }
}
export default TimeTag;
