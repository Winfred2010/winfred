interface Book {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre?: string;
}

class Library {
  private books: Book[] = [];

  public addBook = (book: Book): void => { this.books.push(book); };

  public getBookDetails = (isbn: string): Book | undefined => 
    this.books.find(b => b.isbn === isbn);

  protected getBooks = (): Book[] => this.books;
}

class DigitalLibrary extends Library {
  constructor(public readonly website: string) { super(); }

  public listBooks = (): string[] => this.getBooks().map(b => b.title);
}

//
const myLib = new DigitalLibrary("https://lib.com");
myLib.addBook({ title: "TS Guide", author: "Dev", isbn: "101", publishedYear: 2024 });
console.log(myLib.listBooks());
