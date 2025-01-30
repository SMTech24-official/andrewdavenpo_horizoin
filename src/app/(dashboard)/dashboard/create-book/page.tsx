"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCrateBooksMutation } from "@/redux/api/bookApi";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface BookFormInputs {
  name: string;
  price: number;
  discountPercent: number;
  description: string;
  file: FileList;
}

export default function CreateBook() {
  const [createBookMutationFunction, { isLoading: createBookIsLoading }] = useCrateBooksMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<BookFormInputs>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit: SubmitHandler<BookFormInputs> = async (data) => {
    const formData = new FormData();

    // Here you would typically send this data to your API
    console.log(data);
    // {
    //     "name": "Clean Code: A Handbook of Agile Software Craftsmanship",
    //     "price": 29.99,
    //     "discountPercent": 10,
    //     "description": "A comprehensive guide to writing clean, maintainable, and efficient code."
    // }

    const reformedData = {
      name: data.name,
      price: data.price,
      discountPercent: data.discountPercent,
      description: data.description,
    };

    formData.append("data", JSON.stringify(reformedData));

    if (data.file[0]) {
      formData.append("file", data.file[0]);
    }

    try {
      const response = await createBookMutationFunction(formData).unwrap();
      if (response.success) {
        toast.success("Book created successfully");
      }
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

  return (
    <Card className="w-full max-w-2xl md:mt-10 mx-auto">
      <CardHeader>
        <CardTitle>Create New Book</CardTitle>
        <CardDescription>Enter the details for the new book.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name", { required: "Name is required" })} />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required", min: 0 })}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <Label htmlFor="discountPercent">Discount Percent</Label>
            <Input id="discountPercent" type="number" {...register("discountPercent", { min: 0, max: 100 })} />
            {errors.discountPercent && <p className="text-red-500 text-sm mt-1">{errors.discountPercent.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", {
                required: "Description is required",
                minLength: { value: 10, message: "Description must be at least 10 characters long" },
              })}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <Label htmlFor="file">Book Image</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              {...register("file", { required: "Image is required" })}
              onChange={handleImageChange}
            />
            {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>}
            {imagePreview && (
              <div className="mt-2">
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

          <Button type="submit" className="w-full">
            {createBookIsLoading ? "Creating Book..." : "Create Book"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
