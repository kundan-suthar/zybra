import { User, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
   const res = await fetch("https://jsonplaceholder.typicode.com/users");
   //console.log(res.json());
   
   return res.json();
   
  // return [
  //   {
  //     id: "728ed52f",
  //     amount: 100,
  //     status: "pending",
  //     email: "m@example.com",
  //     username: "Kundan"
  //   },
  //   // ...
  // ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
