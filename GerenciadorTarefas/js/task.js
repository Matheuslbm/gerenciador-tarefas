export class Task {
    constructor(title, completed = false) {
        this.title = title;
        this.completed = false;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }


    editTitle(newTitle) {
        this.title = newTitle;
    }

}

