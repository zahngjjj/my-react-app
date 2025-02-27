import  { useState, useEffect ,useCallback} from "react"


function useMouse () {
    const [x , setX] = useState(0)
    const [y, setY] = useState(0)

    const  mousemoveHandle = useCallback(
              (event:MouseEvent) => {
            setX(event.clientX)
            setY(event.clientY)
        }
    ,[]) 

    useEffect(()=>{
        window.addEventListener('mousemove',mousemoveHandle)
        return (()=>{
         // 组件销毁时一定要解绑dom事件,不然会导致内存泄漏
          window.removeEventListener('mousemove',mousemoveHandle)
        })

    }, [])

    return {x , y}
}

export default useMouse