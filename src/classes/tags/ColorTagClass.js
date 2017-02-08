import Tag from './TagClass'
import { COLOR_TAG } from './TypesOfTags'

class ColorTag extends Tag {
  constructor() {
    super(COLOR_TAG);
    this.color = '#FF69B4'; // default color.
   }
   changeColor(color) {
     this.color = color;
   }
   getColor() {
     return this.color;
   }
}
export default ColorTag;
