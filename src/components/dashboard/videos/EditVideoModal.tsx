/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface Video {
  id: string;
  title: string;
  ytVideoLink: string;
  thumbImage: string;
}

interface EditVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: any;
  video: Video;
}

export function EditVideoModal({ isOpen, onClose, onSave, video }: EditVideoModalProps) {
  const { control, handleSubmit, setValue, watch, reset } = useForm<Video>({
    defaultValues: video,
  });

  const thumbImage = watch("thumbImage");

  useEffect(() => {
    reset(video);
  }, [video, reset]);

  const onSubmit = (data: Video) => {
    onSave(data);
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
                  setValue("thumbImage", URL.createObjectURL(file));
                }
              }}
            />
            {thumbImage && (
              <Image height={200} width={200} src={thumbImage} alt="Thumbnail Preview" className="mt-2 w-full h-auto" />
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
