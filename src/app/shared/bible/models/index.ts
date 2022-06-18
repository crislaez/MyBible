export interface Bible {

}

export interface Book {
  passage: string;
  spanishPassage?: string;
  chapters: string[];
}

export interface Chapter {

}

export interface ResponseBooks {
  books: Book[]
}


export interface Verse {
  title?: string,
  verse?: string
}

export interface Menu{
  [key:string]:string
}
