import React from 'react'
import Cards from '../components/Home/Cards'
import InputData from '../components/Home/InputData'
import { useState } from 'react'

const Alltask = () => {

  // const [InputDiv, setInputDiv] = React.useState("hidden")
  const [InputDiv, setInputDiv] = useState("hidden")

  return (
    <>
    <div>
      <Cards home={"true"} setInputDiv={setInputDiv} />
    </div>

    <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} /> 
    </>
  )
}

export default Alltask