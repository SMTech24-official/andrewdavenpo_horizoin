"use client";
import { useGetAllBooksQuery } from "@/redux/api/bookApi";
import React from "react";

export default function AllBooks() {
  const { data: allbooksData, error: allBooksError, isLoading: allBooksLoading } = useGetAllBooksQuery();

  const allBooks = allbooksData?.data;
  console.log(allBooks);

  return <div>AllBooks</div>;
}
