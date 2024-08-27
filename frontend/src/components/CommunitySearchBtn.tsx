import React from 'react'
import { BiSearch } from "react-icons/bi";

const CommunitySearchBtn = () => {
	return (
		<div className='w-12 h-12 bg-background-2 flex justify-center items-center rounded-xl'>
			<BiSearch className='text-4xl'/>
		</div>
	)
}

export default CommunitySearchBtn