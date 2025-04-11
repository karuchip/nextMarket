"use client"

import {useRouter} from "next/navigation"
import useAuth from "@/app/utils/useAuth"

const UpdateItem = (props) => {

  const router = useRouter();
  const loginUserEmail = useAuth()


  const handleSubmit = async(formData) => {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${props.params.id}`, {
        method: "PUT",
        headers: {
          "Accept": "application.json",
          "COntent-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title: formData.get("title"),
          price: formData.get("price"),
          image: formData.get("image"),
          description: formData.get("description"),
          email: loginUserEmail
        })
      })
      const jsonData = await response.json()
      alert(jsonData.message)
      router.push("/")
    } catch(err) {
      alert("アイテム編集失敗")
    }
  }

  if (loginUserEmail === props.singleItem.email) {
    return(
      <div>

        <form action={handleSubmit}>
        <input defaultValue={props.singleItem.title} type="text" name="title" placeholder="アイテム名" required></input>
        <input defaultValue={props.singleItem.price} type="text" name="price" placeholder="価格" required></input>
        <input defaultValue={props.singleItem.image} type="text" name="image" placeholder="画像" required></input>
        <input defaultValue={props.singleItem.description} type="text" name="description" placeholder="商品説明" required></input>
        <button>編集</button>
      </form>

      </div>
    )
  } else {
    return<h1>権限がありません</h1>
  }
}

export default UpdateItem
