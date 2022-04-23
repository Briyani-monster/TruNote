export default class NotesAPI {
  static getAllNotes() {
    const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
    // returning notes and sorting according to dates
    return notes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }
  static saveNote(noteToSave) {
    const notes = NotesAPI.getAllNotes();

    // when id is same means existing one
    const existing = notes.find((note) => note.id == noteToSave.id);
    // editing and update
    if (existing) {
      existing.title = noteToSave.title;
      existing.body = noteToSave.body;
      existing.updated = new Date().toISOString();
    }
    // creating new note
    else {
      noteToSave.id = Math.floor(Math.random() * 1000000);
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }
    localStorage.setItem("notesapp-notes", JSON.stringify(notes));
  }
  //   delete note functionality
  static deleteNote(id) {
    const notes = NotesAPI.getAllNotes();
    const newNote = notes.filter((note) => note.id != id);
    localStorage.setItem("notesapp-notes", JSON.stringify(newNote));
  }
}
