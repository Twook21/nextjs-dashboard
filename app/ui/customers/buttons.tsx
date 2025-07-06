import Link from "next/link";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

export function CreateCustomer() {
  return (
    <Link
      href="/dashboard/customers/create"
      className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      <PlusIcon className="w-5" />
      Add Customer
    </Link>
  );
}

export function EditCustomer({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/customers/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCustomer({ id }: { id: string }) {
  // Implementasi aksi delete sesuai kebutuhan (misal pakai form atau fetch)
  return (
    <button
      className="rounded-md border p-2 hover:bg-red-100 text-red-600"
      // onClick={() => handleDelete(id)}
      aria-label="Delete customer"
    >
      <TrashIcon className="w-5" />
    </button>
  );
}
