import { useState } from 'react'

const Toggleable = ( props ) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
    
  const toggleVisibility = () => {
    setVisible(!visible)
  }
    
  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>Hide</button>
        {props.children}
      </div>
    </>
  )
}

export default Toggleable