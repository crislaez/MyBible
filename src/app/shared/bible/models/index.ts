export interface Bible {

}

export interface Book {
  passage: string,
  chapters: string[]
}

export interface Chapter {

}


export interface Verse {
  title?: string,
  verse?: string
}

export interface Menu{
  [key:string]:string
}
