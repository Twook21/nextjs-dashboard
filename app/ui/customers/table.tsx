import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import { fetchFilteredCustomers } from "@/app/lib/customer-data";
import CustomersPagination from "./pagination";
import { CreateCustomer, EditCustomer, DeleteCustomer } from "./buttons";

export default async function CustomersTable({
  query,
  currentPage,
  totalPages,
}: {
  query: string;
  currentPage: number;
  totalPages: number;
}) {
  const customers = await fetchFilteredCustomers(query, currentPage);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mb-8">
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>
          Customers
        </h1>
        <CreateCustomer />
      </div>
      <div className="flex items-center justify-between gap-2 mb-4">
        <Search placeholder="Search customers..." />
      </div>
      <div className="flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <table className="min-w-full rounded-md text-gray-900">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th className="px-4 py-5 font-medium sm:pl-6">Name</th>
                    <th className="px-3 py-5 font-medium">Email</th>
                    <th className="px-3 py-5 font-medium">Total Invoices</th>
                    <th className="px-3 py-5 font-medium">Total Pending</th>
                    <th className="px-4 py-5 font-medium">Total Paid</th>
                    <th className="px-4 py-5 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={customer.image_url}
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{customer.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.total_invoices}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.total_pending}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.total_paid}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <div className="flex gap-2">
                          <EditCustomer id={customer.id} />
                          <DeleteCustomer id={customer.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
