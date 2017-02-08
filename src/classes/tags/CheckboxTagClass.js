import Tag from './TagClass'
import { CHECKBOX_TAG } from './TypesOfTags'

class CheckboxTag extends Tag {
  constructor() {
    super(CHECKBOX_TAG);
    this.checked = false;
   }
   toggleCheck() {
     this.checked = !this.checked;
   }
   isChecked() {
     return this.checked;
   }
}
export default CheckboxTag;
