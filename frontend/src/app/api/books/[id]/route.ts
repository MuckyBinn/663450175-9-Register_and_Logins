import { NextResponse } from "next/server";

const books = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "A Handbook of Agile Software Craftsmanship.\nแนะนำการเขียนโค้ดที่สะอาดและอ่านง่าย",
    genre: "Programming",
    year: 2008,
    price: 1200,
    publisher: "Prentice Hall",
    pages: 464,
    language: "English",
    coverImageUrl: "https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg"
  },
  {
    id: "2",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    description: "Your Journey to Mastery.\nรวมแนวคิดการพัฒนาโปรแกรมแบบปฏิบัติได้จริง",
    genre: "Programming",
    year: 1999,
    price: 950,
    publisher: "Addison-Wesley",
    pages: 352,
    language: "English",
    coverImageUrl: "https://miro.medium.com/v2/resize:fit:1400/0*1Chs1iKrkmQc7esc.jpg"
  },
  {
    id: "3",
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    description: "A Modern Introduction to Programming.\nเน้น JavaScript และแนวคิดการเขียนโปรแกรมสมัยใหม่",
    genre: "Programming",
    year: 2018,
    price: 700,
    publisher: "No Starch Press",
    pages: 492,
    language: "English",
    coverImageUrl: "https://eloquentjavascript.net/img/cover.jpg"
  }
];

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const book = books.find(b => b.id === params.id);
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }
  return NextResponse.json({ book });
}
