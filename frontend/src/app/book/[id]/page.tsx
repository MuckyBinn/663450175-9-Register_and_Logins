"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const { id } = useParams();
  const [book, setBook] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const response = await fetch(`/api/books/${id}`);
        if (!response.ok) throw new Error("ไม่สามารถดึงข้อมูลหนังสือได้");
        const data = await response.json();
        setBook(data.book || data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="card">
      {isLoading && <div className="small-muted">กำลังโหลดรายละเอียดหนังสือ...</div>}
      {error && <div style={{color:'salmon'}}>เกิดข้อผิดพลาด: {error}</div>}
      {book && (
        <div>
          <h2 style={{margin:0}}>{book.title}</h2>
          <div className="small-muted">ผู้แต่ง: {book.author}</div>
          <div className="detail-chips">
            {book.genre && <div className="small-muted">#{book.genre}</div>}
            {book.year && <div className="small-muted">ปี: {book.year}</div>}
            {book.price !== undefined && <div className="small-muted">ราคา: {book.price}</div>}
          </div>
          <p style={{whiteSpace:'pre-line', marginTop:12}}>{book.description}</p>
          <div style={{marginTop:16}}>
            <div className="small-muted">ไอดี: {book.id}</div>
            {book.publisher && <div className="small-muted">สำนักพิมพ์: {book.publisher}</div>}
            {book.pages && <div className="small-muted">จำนวนหน้า: {book.pages}</div>}
            {book.language && <div className="small-muted">ภาษา: {book.language}</div>}
          </div>
        </div>
      )}
    </div>
  );
}