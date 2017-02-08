class Note {
  constructor(id, tag) {
    this.id = id;
    this.tag = tag;
    this.body = '';
    this.deleted = false;
   }
   delete() {
     this.deleted = true
   }
   recover() {
     this.deleted = false;
   }
   changeTag(new_tag) {
     this.tag = new_tag;
   }
   changeBody(new_body) {
     this.body = new_body;
   }
   getID() {
     return this.id;
   }
   getBody() {
     return this.body;
   }
   getTag() {
     return this.tag;
   }
   isDeleted() {
     return this.deleted;
   }
}
export default Note;
