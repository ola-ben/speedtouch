// Customer list shown in the admin. Cleared for launch — populate from real
// data later (currently the admin Customers page reads from this array).
export const customers = []

export function findCustomer(id) {
  return customers.find((c) => c.id === id) ?? null
}
