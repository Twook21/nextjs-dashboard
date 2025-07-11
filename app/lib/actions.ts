"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log('Starting authentication...');
    console.log('Form data:', Object.fromEntries(formData));
    
    await signIn('credentials', formData);
    
    console.log('Authentication successful');
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error instanceof AuthError) {
      console.log('AuthError type:', error.type);
      console.log('AuthError message:', error.message);
      
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    
    // Log non-AuthError errors
    console.error('Non-AuthError:', error);
    throw error;
  }
}

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoices.",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amount}, status = ${status} 
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: "Database Error : Failed to Update Invoices.",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboar/invoices");
    return { message: "Deleted Data Invoices." };
  } catch (error) {
    return {
      message: "Database Error : Failed to Delete Invoices.",
    };
  }
}
