import { useParams } from 'next/navigation'
import React from 'react'
import Content from '../components/content'

type Props = {
	params: any
}

const OrderedItem = (props: Props) => {
	console.log("id", props.params.id)
	
	return (
		<div className="max-w-6xl mx-auto my-10 px-5">
			<Content />
		</div>
	)
}

export default OrderedItem
