"use client";

import * as React from "react";
import { X, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import productImge from "@/assets/pngimg.com - book_PNG2111 1.png";

interface CartItem {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
}

interface CartProps {
  items?: CartItem[];
}

export function CartSidebar({ items: initialItems }: CartProps) {
  const [items, setItems] = React.useState<CartItem[]>(
    initialItems || [
      {
        id: "1",
        title: "English Textbook for Class 12",
        price: 170.0,
        originalPrice: 190.0,
        quantity: 1,
        image: productImge.src,
      },
      {
        id: "2",
        title: "English Textbook for Class 12",
        price: 170.0,
        originalPrice: 190.0,
        quantity: 1,
        image: productImge.src,
      },
    ]
  );

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            {items.length}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          <span className="sr-only">Shopping Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg bg-zinc-900 text-white border-zinc-800">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white">My Cart</SheetTitle>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:text-white/70">
                <X className="h-4 w-4" />
                <span className="sr-only">Close cart</span>
              </Button>
            </SheetTrigger>
          </div>
          <p className="text-sm text-zinc-400">
            You have {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </SheetHeader>
        <div className="mt-8 flex-1 overflow-y-auto">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-start gap-4 rounded-lg bg-zinc-800/50 p-4">
                <div className="h-16 w-16 rounded-md bg-zinc-800 p-2">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                    <span className="text-sm text-zinc-400 line-through">${item.originalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-zinc-400">QTY: {item.quantity}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-zinc-400 hover:text-white"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
            <span className="text-base font-medium">Subtotal</span>
            <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <Button className="w-full bg-white text-black hover:bg-white/90">Checkout</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
