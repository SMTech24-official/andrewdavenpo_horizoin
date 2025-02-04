"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useCreateVideoMutation } from "@/redux/api/videoApi";
import { toast } from "react-toastify";

type FormData = {
  title: string;
  ytVideoLink: string;
  file: FileList;
  description: string;
};

export default function AddVideo() {
  const [createVideoMutationFn, { isLoading: createVideoLoading }] = useCreateVideoMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    // Here you would typically send this data to your backend
    console.log(data);
    // You can access the file using data.file[0]

    //   {
    //     "title": "How to Build a Full-Stack App with Next.js and Prisma",
    //     "ytVideoLink": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    // }

    const reformedData = {
      title: data.title,
      ytVideoLink: data.ytVideoLink,
      description: data.description,
    };

    formData.append("data", JSON.stringify(reformedData));

    if (data.file[0]) {
      formData.append("file", data.file[0]);
    }

    try {
      const response = await createVideoMutationFn(formData).unwrap();
      if (response) {
        console.log("Video added successfully");
        toast.success("Video added successfully");
        // clear the form
        setPreviewUrl(null);
        reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <Card className="w-full max-w-4xl md:mt-10 mx-auto">
      <CardHeader>
        <CardTitle>Add YouTube Video</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter video title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="ytVideoLink">YouTube Video Link</Label>
            <Input
              id="ytVideoLink"
              {...register("ytVideoLink", { required: "YouTube video link is required" })}
              placeholder="Enter YouTube video link"
            />
            {errors.ytVideoLink && <p className="text-red-500 text-sm mt-1">{errors.ytVideoLink.message}</p>}
          </div>

          {/* description section */}

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Enter video description"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <Label htmlFor="file">Thumbnail Image</Label>
            <Input
              id="file"
              type="file"
              {...register("file", { required: "Thumbnail image is required" })}
              onChange={handleFileChange}
              accept="image/*"
            />
            {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>}
            {previewUrl && (
              <div className="mt-2">
                <Image src={previewUrl} height={200} width={200} alt="Preview" className="max-w-full h-auto" />
              </div>
            )}
          </div>

          <Button type="submit" className="w-full">
            {createVideoLoading ? "Adding Video..." : "Add Video"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
