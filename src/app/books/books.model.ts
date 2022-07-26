export interface Books {
  id: number;
  title: string;
  authorId: number;
}
export interface Author {
  id: number;
  name: string;
}

export interface BooksWithAuthor {
  titleBook: string;
  authorName: string;
}
