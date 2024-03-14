import React from 'react'
import Content from './components/content'
import { getOrderByID } from '@/api'

type Props = {
	params: any
}

const OrderedItem = async (props: Props) => {
	const data = await getOrderByID({ order_id: props.params.id })
	console.log("PPPPP", data)

	return (
		<div className="max-w-6xl mx-auto my-10 px-5">
			<Content data={data} />
		</div>
	)
}

export default OrderedItem
