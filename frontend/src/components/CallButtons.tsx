import React from 'react'
import { IoVideocam } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";

const CallButtons = () => {
	return (
		<div className='flex justify-center items-center gap-4 text-2xl'>
			<IoVideocam />
			<FaPhone />
		</div>
	)
}

export default CallButtons