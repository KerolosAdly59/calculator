
const ButtonNumber = ({x ,onClick}:{x:string ; onClick:()=>void}) => {
  return (
    <>
        <button onClick={onClick} className="btnNumber dark:text-white dark:shadow-[1px_2px_5px_#0a0a0a,-1px_-3px_5px_#2a2a2a]  shadow-[5px_5px_10px_#bababa,-5px_-5px_10px_#ffffff] active:shadow-[inset_5px_5px_10px_#bababa,inset_-5px_-5px_10px_#ffffff] select-none">
            {x}
          </button>
    </>
  )
}

export default ButtonNumber
