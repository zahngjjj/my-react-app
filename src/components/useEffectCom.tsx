import React , { useState,useEffect, FC } from "react"





const UseEffectCom:FC = ()=> {




    const [count , setCount] = useState(0)
    const [obj , setObj] = useState({name:'张三',age:12})



    useEffect(()=>{
        console.log('请求ajax')
        
        return ()=>{
            console.log('组件销毁!')
        }
    },[])  // 无依赖,组件初次渲染时执行

    // useEffect(()=>{
    //   console.log('请求ajax')
    // },[count]) // count 更新时候执行

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
    <button onClick={handAdd}>点击加1  4.0 {count}</button>
    </>
  )
}
export default UseEffectCom