import React, { FC } from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { jost } from '@/app/page'
import Link from 'next/link'

type Props = {
    id
    image
    product_name
    description
    price
}

const Product: FC<Props> = ({ id, image, product_name, description, price }: Props) => {
    return (
        <div className={styles.itemContainer} key={id}>
            <Image src={image} alt={product_name} width={1000} height={1000} />
            <span className={`${styles.cardTitle} ${jost.className}`}>
                {<Link href={`/products/${id}`}>{product_name}</Link>}
            </span>
            <span className={styles.cardDescription}>{<Link href={`/products/${id}`}>{description}</Link>}</span>
            <span className={styles.cardFooter}>$ {price.toFixed(2)}</span>
        </div>
    )
}

export default Product
