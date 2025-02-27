import React , { FC } from "react"



// ts 定义类型

type PropsType = {
    id ?: string,
    title: string,
    isPublished: boolean
}

// FC  functional component
const testComponents: FC<PropsType> = (props)=> {

const { id, title, isPublished } = props


function edit (id:string) {
  console.log(id,'id2')
}

  return (
    <>
      <p className="read-the-docs" onClick={
        ()=>{
         edit(id)
        }
      }>
        { id + title + isPublished }
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
export default testComponents