"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { toast } from "react-toastify";
import { useUpdateBookMutation } from "@/redux/api/bookApi";

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
}

interface BookFormInputs {
  name: string;
  price: number;
  discountPercent: number;
  description: string;
  file: FileList;
}

export default function EditBookModal({ isOpen, onClose, book }: EditBookModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [updateBookMutationFunction, { isLoading: updateBookIsLoading }] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
  } = useForm<BookFormInputs>();

  useEffect(() => {
    if (book) {
      reset(
        {
          name: book.name,
          price: book.price,
          discountPercent: book.discountPercent,
          description: book.description,
        },
        { keepValues: false }
      );
      //   set preview image
      setImagePreview(book.thumbImage);
    }
  }, [book, setValue, reset]);

  const onSubmit: SubmitHandler<BookFormInputs> = async (data) => {
    console.log(data);
    const formdata = new FormData();

    const reformedData = {
      name: data.name,
      price: Number(data.price).toFixed(2),
      discountPercent: data.discountPercent,
      description: data.description,
    };

    formdata.append("data", JSON.stringify(reformedData));

    if (data.file[0]) {
      formdata.append("file", data.file[0]);
    }

    try {
      const response = await updateBookMutationFunction({ id: book?.id as string, formdata }).unwrap();
      if (response.success) {
        toast.success("Book updated successfully");
        // close the modal
        onClose();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      clearErrors("file");
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="text-black">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" {...register("name", { required: "Name is required" })} className="col-span-3" />
            {errors.name && <p className="text-red-500 text-sm mt-1 col-span-4">{errors.name.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required", min: 0 })}
              className="col-span-3"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1 col-span-4">{errors.price.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="discountPercent" className="text-right">
              Discount %
            </Label>
            <Input
              id="discountPercent"
              type="number"
              {...register("discountPercent", { min: 0, max: 100 })}
              className="col-span-3"
            />
            {errors.discountPercent && (
              <p className="text-red-500 text-sm mt-1 col-span-4">{errors.discountPercent.message}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              {...register("description", {
                required: "Description is required",
                minLength: { value: 10, message: "Description must be at least 10 characters long" },
              })}
              className="col-span-3"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1 col-span-4">{errors.description.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">
              Book Image
            </Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              {...register("file")}
              onChange={handleImageChange}
              className="col-span-3"
            />
            {errors.file && <p className="text-red-500 text-sm mt-1 col-span-4">{errors.file.message}</p>}
            {imagePreview && (
              <div className="mt-2 col-span-4">
                <Image
                  height={200}
                  width={200}
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full h-auto max-h-48 object-contain"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              {updateBookIsLoading ? "Updating Book..." : "Update Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
