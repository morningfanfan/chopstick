export interface Note {
    getTextRepr(): String
}

export class TextNote implements Note {
    constructor(public content: String) {}
    getTextRepr(): String {
        return this.content
    }
}