import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between py-3 bg-red-400">
        
        <div className="logo font-bold text-3xl px-50 cursor-pointer">TaskQuest</div>
        <ul className='flex gap-7 px-7 '>
            {/* <li className='cursor-pointer hover:font-bold transition-all'>Home</li> */}
            <li className=' p-1 cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
