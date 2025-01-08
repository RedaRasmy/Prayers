import { RefObject, useEffect, useState } from "react";


export default function useClickOutside(ref:RefObject<HTMLDivElement | null>) {
    const [isClicked,setIsClicked] = useState(false)
    const [editMode,setEditMode] = useState(false)
    

    
    const handleClick = (event:MouseEvent) => {
        if (ref?.current && !ref.current.contains(event.target as Node)) {
            setIsClicked(true)
            setEditMode(false)
        } else {
            setIsClicked(false)
            setEditMode(true)
        }
    }
    useEffect(()=>{
        document.addEventListener('click',handleClick)
        return () => {
            document.removeEventListener('click',handleClick)
        }
    },[isClicked])

    return {
        isClicked,
        editMode,
        setEditMode
    }
}
