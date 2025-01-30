/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { useDeleteVideoMutation, useGetAllVideoQuery } from "@/redux/api/videoApi";
import { DeleteConfirmationModal } from "@/components/dashboard/videos/DeleteConfirmationModal";
import { EditVideoModal } from "@/components/dashboard/videos/EditVideoModal";
import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

interface Video {
  id: string;
  title: string;
  ytVideoLink: string;
  thumbImage: string;
  createdAt: string;
  updatedAt: string;
}

export default function VideoListPage() {
  const { videos, isVideoError, isVideoLoading } = useGetAllVideoQuery(
    {},
    {
      selectFromResult(state) {
        const { data, isLoading, isError } = state;
        return { videos: data?.data, isVideoLoading: isLoading, isVideoError: isError };
      },
    }
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
  const [videoToEdit, setVideoToEdit] = useState<Video | null>(null);
  const [deleteVideoFn, { isLoading: isDeleteLoading }] = useDeleteVideoMutation();

  const handleDeleteClick = (id: string) => {
    setVideoToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteVideoFn(videoToDelete).unwrap();
      console.log("Video deleted", response);
      if (response.success) {
        toast.success("Video deleted successfully");
        setIsDeleteModalOpen(false);
        setVideoToDelete(null);
      }
    } catch (error) {
      console.error("Failed to delete video", error);
      toast.error("Failed to delete video");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEditSave = (updatedVideo: Video) => {
    setIsEditModalOpen(false);
    setVideoToEdit(null);
  };

  if (isVideoLoading) {
    return <div>Loading...</div>;
  }

  if (isVideoError) {
    return <div>Error fetching videos</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Video List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>YouTube Link</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos?.map((video: any) => (
            <TableRow key={video.id}>
              <TableCell>{video.title}</TableCell>
              <TableCell>{video.ytVideoLink}</TableCell>
              <TableCell>
                <Image src={video.thumbImage} height={50} width={50} alt={video.title} className="w-20 h-auto" />
              </TableCell>
              <TableCell>{new Date(video.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="text-black"
                    onClick={() => {
                      setVideoToEdit(video);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" className="" onClick={() => handleDeleteClick(video.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleteLoading}
      />
      {videoToEdit && (
        <EditVideoModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditSave}
          video={videoToEdit}
        />
      )}
    </div>
  );
}
