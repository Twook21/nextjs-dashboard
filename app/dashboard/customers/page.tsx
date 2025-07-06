import CustomersTable from "@/app/ui/customers/table";
import CustomersPagination from "@/app/ui/customers/pagination";
import {
  fetchFilteredCustomers,
  fetchCustomersPages,
} from "@/app/lib/customer-data";
import { Metadata } from "next";
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function CustomersPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCustomersPages(query);
  return (
    <div className="w-full">
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <CustomersTable
          query={query}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <CustomersPagination
          totalPages={totalPages}
          currentPage={currentPage}
          query={query}
        />
      </div>
    </div>
  );
}
