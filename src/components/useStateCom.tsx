import React , { useState } from "react"


import useTitle  from "../hooks/useTitle"
import useMouse  from "../hooks/useMouse"
import useGetInfo  from "../hooks/useGetInfo"


const useStateCom = ()=> {
    useTitle('测试啊!')
   const { x, y }  = useMouse()
   const { loading, info }  = useGetInfo()

    const [count , setCount] = useState(0)
    const [obj , setObj] = useState({name:'张三',age:12})

    const handAdd = () =>{

        setCount(count +1)

        // ** 不可变数据  -- 不去改变state的值,而是传入一个新的值 -- 重要!
        setObj({ 
          name:'李四',
          age: count + 1
        })
        console.log(count,'count')

        console.log(obj,'obj')
    }

  return (
    <>
    <button onClick={handAdd}>点击加1  {count} </button>
    <p>{x}, { y}</p>
 
    <p>{ loading ? '加载中...' : info }</p>
    </>
  )
}
export default useStateCom