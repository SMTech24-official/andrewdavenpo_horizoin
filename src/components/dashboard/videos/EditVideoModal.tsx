/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa6";
import { useUpdateVideoMutation } from "@/redux/api/videoApi";
import { toast } from "react-toastify";

interface Video {
  id: string;
  title: string;
  ytVideoLink: string;
  thumbImage: File | string;
}

interface EditVideoModalProps {
  isOpen: boolean;
  onClose: () => void;

  video: Video;

  setIsEditModalOpen: any;
  setVideoToEdit: any;
}

export function EditVideoModal({
  isOpen,
  onClose,

  video,
  setIsEditModalOpen,
  setVideoToEdit,
}: EditVideoModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [updateVideoFn, { isLoading: isUpdateLoading }] = useUpdateVideoMutation();

  const { control, handleSubmit, setValue, reset } = useForm<Video>({
    defaultValues: video,
  });

  useEffect(() => {
    reset(video);
  }, [video, reset]);

  const onSubmit = async (data: Video) => {
    const formData = new FormData();
    //   {
    //     "title": "How to Build a Full-Stack App with Next.js and Prisma",
    //     "ytVideoLink": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    // }

    const reformdedData = {
      title: data.title,
      ytVideoLink: data.ytVideoLink,
    };

    formData.append("data", JSON.stringify(reformdedData));

    if (data.thumbImage) {
      formData.append("file", data.thumbImage);
    }

    try {
      const response = await updateVideoFn({ id: video.id, data: formData }).unwrap();
      console.log("Video updated", response);
      if (response.success) {
        toast.success("Video updated successfully");

        setIsEditModalOpen(false);
        setVideoToEdit(null);
      }
    } catch (error) {
      console.error("Failed to update video", error);
      toast.error("Failed to update video");
    }

    // setIsEditModalOpen(false);
    // setVideoToEdit(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="text-black">
        <DialogHeader>
          <DialogTitle>Edit Video</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Controller name="title" control={control} render={({ field }) => <Input id="title" {...field} />} />
          </div>
          <div>
            <Label htmlFor="ytVideoLink">YouTube Link</Label>
            <Controller
              name="ytVideoLink"
              control={control}
              render={({ field }) => <Input id="ytVideoLink" {...field} />}
            />
          </div>
          <div>
            <Label htmlFor="thumbImage">Thumbnail Image</Label>
            <Input
              id="thumbImage"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("thumbImage", file);
                  setPreviewImage(URL.createObjectURL(file));
                }
              }}
            />
            {previewImage && (
              <Image
                height={200}
                width={200}
                src={previewImage}
                alt="Thumbnail Preview"
                className="mt-2 w-full h-auto"
              />
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isUpdateLoading ? <FaSpinner className="h-5 w-5 mr-3" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
