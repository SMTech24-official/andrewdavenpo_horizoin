/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Book {
  id: string;
  name: string;
  price: number;
  discountPercent: number;
  discountPrice: number;
  thumbImage: string;
  description: string;
}

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  onSave: (editedBook: Book) => void;
}

export default function EditBookModal({ isOpen, onClose, book, onSave }: EditBookModalProps) {
  const [editedBook, setEditedBook] = useState<Book | null>(null);

  useEffect(() => {
    setEditedBook(book);
  }, [book]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedBook) {
      setEditedBook({
        ...editedBook,
        [e.target.name]: e.target.value as any, // Type assertion added here
      });
    }
  };

  const handleSave = () => {
    if (editedBook) {
      onSave(editedBook);
    }
  };

  if (!editedBook) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="text-black">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" value={editedBook.name} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={editedBook.price}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="discountPercent" className="text-right">
              Discount %
            </Label>
            <Input
              id="discountPercent"
              name="discountPercent"
              type="number"
              value={editedBook.discountPercent}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
