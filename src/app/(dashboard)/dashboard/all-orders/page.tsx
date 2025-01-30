"use client";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import React, { useEffect } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

interface Book {
  bookId: string;
  quantity: number;
}

interface Order {
  id: string;
  name: string;
  email: string;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  books: Book[];
}

const AllOrders = () => {
  const { data: allOrders, isLoading, isError } = useGetAllOrdersQuery({});
  console.log(allOrders?.data);

  const [sortedOrders, setSortedOrders] = React.useState<Order[]>([]);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("desc");

  useEffect(() => {
    if (allOrders?.data) {
      setSortedOrders(allOrders.data);
    }
  }, [allOrders]);

  const sortOrders = () => {
    const sorted = [...sortedOrders].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });
    setSortedOrders(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching orders</div>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center my-10 underline">All Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Total</TableHead>
            {/* <TableHead>Status</TableHead> */}
            <TableHead className="cursor-pointer" onClick={sortOrders}>
              Date {sortDirection === "asc" ? "↑" : "↓"}
            </TableHead>
            <TableHead className="text-right">Books</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id.slice(-6)}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.email.replace("mailto:", "")}</TableCell>
              <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
              {/* <TableCell>
                <Badge variant={order.status === "PENDING" ? "secondary" : "default"}>{order.status}</Badge>
              </TableCell> */}
              <TableCell>{format(new Date(order.createdAt), "PPp")}</TableCell>
              <TableCell className="text-right">
                {order.books.reduce((total, book) => total + book.quantity, 0)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllOrders;
