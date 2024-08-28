import React from 'react'
import { BiPlus } from "react-icons/bi";

const CommunitySearchBtn = () => {
	return (
		<div className='w-12 h-12 bg-background-2 hover:bg-secondary transition-colors duration-300 ease-in-out flex justify-center items-center rounded-xl cursor-pointer'>
			<BiPlus className='text-8xl'/>
		</div>
	)
}

export default CommunitySearchBtn
