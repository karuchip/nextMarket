"use client"
import { useState, useEffect } from "react"
import {useRouter} from "next/navigation"
import Image from "next/image"
import useAuth from "@/app/utils/useAuth"

const DeleteItem = (props) => {

  const router = useRouter();
  const loginUserEmail = useAuth()



  const handleSubmit = async(e) => {
     e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${props.params.id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application.json",
          "COntent-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          email: loginUserEmail
        })
      })
      const jsonData = await response.json()
      alert(jsonData.message)
      router.push("/")
    } catch(err) {
      alert("アイテム削除失敗")
    }
  }
  if (loginUserEmail === props.singleItem.email) {
    return(
      <div>

      <form onSubmit={handleSubmit}>
        <h2>{props.singleItem.title}</h2>
        <Image src={props.singleItem.image} width={750} height={500} alt="Item-Image" priority />
        <h3>¥{props.singleItem.price}</h3>
        <p>{props.singleItem.description}</p>
        <button>削除</button>
      </form>

      </div>
    )
  } else{
    return<h1>権限がありません</h1>
  }
}

export default DeleteItem
