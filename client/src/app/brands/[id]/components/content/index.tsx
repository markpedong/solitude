'use client'

import { RatingItem, SellerData, TProduct } from '@/api'
import React, { FC } from 'react'

type Props = { data: SellerData; products: TProduct[]; reviews: RatingItem[] }
const Content: FC<Props> = ({ data, products, reviews }) => {
	console.log(data, products, reviews)
    
	return <div>Content</div>
}

export default Content
