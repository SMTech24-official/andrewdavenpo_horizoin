"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FormData = {
  title: string;
  ytVideoLink: string;
  file: FileList;
};

export default function AddVideo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    // Here you would typically send this data to your backend
    console.log(data);
    // You can access the file using data.file[0]
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
                <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="max-w-full h-auto" />
              </div>
            )}
          </div>

          <Button type="submit" className="w-full">
            Add Video
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
