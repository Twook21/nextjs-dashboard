import CustomerForm from "@/app/ui/customers/customer-form";
import { getCustomerById } from "@/app/lib/get-customer-by-id";

export default async function EditCustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const customer = await getCustomerById(params.id);
  return <CustomerForm mode="edit" initialData={customer} />;
}
