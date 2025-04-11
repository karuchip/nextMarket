import Link from "next/link"
import Image from "next/image"
import connectDB from "./utils/database"
import { ItemModel } from "../app/utils/schemaModels"

export const dynamic = "force-dynamic"

const getAllItems = async() => {
  await connectDB()
  const allItems = await ItemModel.find();
  return allItems;
}

const ReadAllItems = async() => {
  const allItems = await getAllItems();

  return (
    <div className="grid-container-in">
      {allItems.map(item =>
        <Link href={`/item/readsingle/${item._id}`} key={item._id}>
          <div className="imgContainer">
            <Image src={item.image} width={750} height={500} alt="item-image" priority/>
          </div>
          <h2>¥{item.price}</h2>
          <h3>{item.title}</h3>
          <p>{item.description.substring(0, 80)}...</p>
        </Link>
      )}
    </div>
  )
}
export default ReadAllItems
