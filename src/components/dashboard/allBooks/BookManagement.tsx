"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteBookMutation, useGetAllBooksQuery } from "@/redux/api/bookApi";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import EditBookModal from "./EditBookModal";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "react-toastify";

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const { data: allbooksData, error: allBooksError, isLoading: allBooksLoading } = useGetAllBooksQuery(undefined);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [bookIdToDelete, setBookIdToDelete] = useState<string>("");
  const [deleteBookMutationFunction, { isLoading: deleteBookIsLoading }] = useDeleteBookMutation();

  const allBooks = allbooksData?.data;
  //   console.log(allBooks && allBooks[0]);

  const handleDelete = async () => {
    // setBooks(books.filter((book) => book.id !== id));
    // In a real application, you would also make an API call to delete the book

    try {
      const response = await deleteBookMutationFunction(bookIdToDelete).unwrap();
      if (response.success) {
        toast.success("Book deleted successfully");
        setConfirmationModalOpen(false);
        setBookIdToDelete("");
      }
    } catch (error) {
      console.error("Failed to delete book", error);
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsEditModalOpen(true);
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
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      handleEdit(book);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setBookIdToDelete(book.id);
                      setConfirmationModalOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <EditBookModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} book={editingBook} />

      {/* Confirmation Modal */}
      <Dialog open={confirmationModalOpen} onOpenChange={() => setConfirmationModalOpen(false)}>
        <DialogContent className="text-black">
          <DialogHeader>
            <DialogTitle>Confirmation</DialogTitle>
          </DialogHeader>
          <div className="">
            <p>Are you sure you want to delete this book?</p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setConfirmationModalOpen(false);
                setBookIdToDelete("");
              }}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDelete();
                // setConfirmationModalOpen(false);
              }}
              variant="destructive"
            >
              {deleteBookIsLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
