import postgres from "postgres";
import { CustomerField } from "./definitions";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getCustomerById(id: string) {
  const data = await sql<CustomerField[]>`
    SELECT id, name, email, image_url FROM customers WHERE id = ${id}
  `;
  return data[0];
}
