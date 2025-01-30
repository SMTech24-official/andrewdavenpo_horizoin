"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllBooksQuery } from "@/redux/api/bookApi";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import EditBookModal from "./EditBookModal";

interface Book {
  id: string;
  name: string;
  price: number;
  discountPercent: number;
  discountPrice: number;
  thumbImage: string;
  description: string;
}

export default function BookManagement() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const { data: allbooksData, error: allBooksError, isLoading: allBooksLoading } = useGetAllBooksQuery(undefined);

  const allBooks = allbooksData?.data;
  console.log(allBooks);

  const handleDelete = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
    // In a real application, you would also make an API call to delete the book
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsEditModalOpen(true);
  };

  const handleEditSave = (editedBook: Book) => {
    setBooks(books.map((book) => (book.id === editedBook.id ? editedBook : book)));
    setIsEditModalOpen(false);
    // In a real application, you would also make an API call to update the book
  };

  if (allBooksLoading) return <div>Loading...</div>;
  if (allBooksError)
    return (
      <div className="text-red-500">
        <p>Error loading books</p>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Discounted Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allBooks.map(
            (book: {
              id: string;
              name: string;
              price: number;
              discountPercent: number;
              discountPrice: number;
              thumbImage: string;
              description: string;
            }) => (
              <TableRow key={book.id}>
                <TableCell>{book.name}</TableCell>
                <TableCell>${book.price.toFixed(2)}</TableCell>
                <TableCell>{book.discountPercent}%</TableCell>
                <TableCell>${book.discountPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(book)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(book.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <EditBookModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        book={editingBook}
        onSave={handleEditSave}
      />
    </div>
  );
}
