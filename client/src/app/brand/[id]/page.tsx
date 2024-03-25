'use client'

import { useParams } from 'next/navigation'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
	const { id } = useParams()
	return <div>{id}</div>
}

export default Page
