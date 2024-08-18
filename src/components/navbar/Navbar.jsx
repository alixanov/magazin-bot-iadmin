import React, { useState } from 'react'
import "./navbar.css"
import Add from '../add/Add'

const Navbar = () => {

     const [isAddOpen, setIsAddOpen] = useState(false)
     
     const handleAddClick = () => {
          setIsAddOpen(true)
     }
     const handleCloseAdd = () => {
          setIsAddOpen(false)
     }


     return (
          <nav className='nav'>
               <button className='btn__add' onClick={handleAddClick}>
                    Добавить продукт
               </button>
               {isAddOpen && <Add onClose={ handleCloseAdd} />}
          </nav>
     )
}

export default Navbar
