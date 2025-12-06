
import { useEffect, useState } from 'react';
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import ButtonNumber from './component/BottonNumber/ButtonNumber';
import ButtonOperation from './component/ButtonOperation/ButtonOperation';


function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("themeCalculator") || "light";
  })



  useEffect(() => {

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("themeCalculator", theme)
  }, [theme])


  let [currentNumber, setCurrentNumber] = useState("0")
  let [operation, setOperation] = useState<string | null>(null)
  let [previous, setPrevious] = useState("")

  function handleNumber(num: string) {
    if (currentNumber.length >= 10) return;
    if (currentNumber == "0" && operation == null) {
      setCurrentNumber(num)
    }
    else if (currentNumber != "0" && operation == null) {
      setCurrentNumber(currentNumber + num)
    }
    else if (previous == "" && operation != null) {
      setPrevious(currentNumber)
      setCurrentNumber(num)
    }
    else if (previous != "0" && operation != null) {
      setCurrentNumber(currentNumber + num)
    }

  }

  function handleOperation(ope: string) {
    if (currentNumber == "0") {
      return;
    }
    setOperation(ope)
    console.log(operation);

  }
  function handleEqual() {
    if (!currentNumber || !previous || !operation) {
      return
    }
    else {
      const number1 = Number(currentNumber)
      const number2 = Number(previous)
      let result;
      switch (operation) {
        case "+": result = number1 + number2; break;
        case "-": result = number1 - number2; break;
        case "*": result = number1 * number2; break;
        case "/": result = number1 === 0 ? "Error" : number1 / number2; break;
        default: return;
      }
      result = Number(result)
      result = result.toPrecision(8).replace(/\.?0+$/, "");
      setCurrentNumber(result.toString())
      setPrevious("")
      setOperation(null)

    }

  }

  function clear() {

    setCurrentNumber("0")
    setPrevious("")
    setOperation(null)

  }

  const numbers1 = ["7", "8", "9"]
  const numbers2 = ["4", "5", "6"]
  const numbers3 = ["1", "2", "3", "0"]
  const operations = ["/", "*", "-"]

  return (


    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-3xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] dark:shadow-[5px_5px_3px_#0a0a0a,-1px_-3px_5px_#2a2a2a]
 w-80">
        <div className='flex justify-end  mb-3'>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className='bg-white dark:bg-gray-800 px-4 py-0.5 rounded-xl dark:shadow-[1px_2px_5px_#0a0a0a,-1px_-3px_5px_#2a2a2a] shadow-[5px_5px_10px_#bababa,-5px_-5px_10px_#ffffff] active:shadow-[inset_5px_5px_10px_#bababa,inset_-5px_-5px_10px_#ffffff] cursor-pointer'><i className="fa-solid fa-circle-half-stroke"></i></button>
        </div>
        {/* Screen */}
        <div className=" w-full h-20 
  rounded-xl 
  flex items-center justify-end 
  px-4 text-4xl font-mono tracking-widest select-none

  bg-[#f5f6f7] 
  shadow-[inset_2px_2px_4px_#cfd1d4,inset_-2px_-2px_4px_#ffffff]

  dark:bg-[#1f1f24]
  dark:shadow-[inset_2px_2px_4px_#0d0d0f,inset_-2px_-2px_4px_#2a2a30]
  dark:text-white mb-3">
          {currentNumber}
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-4">

          <button onClick={clear}
            className="btnDelete dark:text-white dark:shadow-[1px_2px_5px_#0a0a0a,-1px_-3px_5px_#2a2a2a] shadow-[5px_5px_10px_#bababa,-5px_-5px_10px_#ffffff] active:shadow-[inset_5px_5px_10px_#bababa,inset_-5px_-5px_10px_#ffffff] select-none">
            c
          </button>

          {operations.map((operations) => (
            <ButtonOperation operation={operations} key={operations} onClick={() => handleOperation(operations)} />
          ))}

          {numbers1.map((numbers) => (
            <ButtonNumber x={numbers} key={numbers} onClick={() => handleNumber(numbers)} />
          ))}
          <ButtonOperation operation={"+"} onClick={() => handleOperation("+")} />


          {numbers2.map((numbers) => (
            <ButtonNumber x={numbers} key={numbers} onClick={() => handleNumber(numbers)} />
          ))}

          <ButtonOperation operation={"="} onClick={handleEqual} />

          {numbers3.map((numbers) => (
            <ButtonNumber x={numbers} key={numbers} onClick={() => handleNumber(numbers)} />
          ))}


        </div>
      </div>
    </div>
  )
}

export default App
