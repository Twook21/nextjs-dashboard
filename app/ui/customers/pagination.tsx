import Link from "next/link";

export default function CustomersPagination({
  totalPages,
  currentPage,
  query = "",
}: {
  totalPages: number;
  currentPage: number;
  query?: string;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav className="flex gap-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          key={i + 1}
          href={`?page=${i + 1}${
            query ? `&query=${encodeURIComponent(query)}` : ""
          }`}
          className={`px-3 py-1 rounded-md border ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {i + 1}
        </Link>
      ))}
    </nav>
  );
}
