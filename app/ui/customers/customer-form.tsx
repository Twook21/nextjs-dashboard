"use client";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { useState } from "react";

export default function CustomerForm({
  mode,
  initialData,
  onSubmit,
}: {
  mode: "create" | "edit";
  initialData?: {
    name?: string;
    email?: string;
    image_url?: string;
  };
  onSubmit?: (data: { name: string; email: string; image_url: string }) => void;
}) {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");

  return (
    <form
      className="max-w-xl mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.({ name, email, image_url: imageUrl });
      }}
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter customer name"
          />
        </div>
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter customer email"
          />
        </div>
        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
            Image URL
          </label>
          <input
            id="image_url"
            name="image_url"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">
          {mode === "create" ? "Create Customer" : "Update Customer"}
        </Button>
      </div>
    </form>
  );
}
