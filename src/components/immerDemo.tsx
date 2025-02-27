import { useState } from 'react';


import { produce } from 'immer';


const ImmerDemo   = ()=> {

    const [count , setCount] = useState(0)
    const [obj , setObj] = useState({name:'张三',age:12})

    const handAdd = () =>{

        setCount(count +1)

        // ** 不可变数据  -- 不去改变state的值,而是传入一个新的值 -- 重要!
        setObj({ 
          name:'李四',
          age: count + 1
        })

        setObj ( 
            produce((draft) => {
                draft.name = "Berlin"; // 直接修改草稿
            })           
        )
        console.log(count,'count')

        console.log(obj,'obj')
    }

  return (
    <>
    <button onClick={handAdd}>点击加1   3.0{count}</button>
    </>
  )
}
export default ImmerDemo