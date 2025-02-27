import React , { useRef,FC } from "react"





const useStateCom:FC = ()=> {


const inputRef = useRef<HTMLInputElement>(null)
 
const handBtn = () =>{
    const inputElem = inputRef.current
   if (inputElem) inputElem.select()
}
  return (
    <div>
        <input ref={inputRef} defaultValue={'hello world'}></input>
     
        <button onClick={handBtn}>use  ref</button>
    </div>
  )
}
export default useStateCom