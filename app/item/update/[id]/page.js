import Form from "./form"
import { getSingleItem } from "../../readsingle/[id]/page"

const UpdateItem = async(context) => {
  const params = await context.params
  const singleItem = await getSingleItem(params.id)
  return (
    <div>
      <h1 className="page-title">アイテム編集</h1>
      <Form params={params} singleItem={singleItem}/>
    </div>
  )
}

export default UpdateItem
