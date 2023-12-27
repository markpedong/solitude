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

const style = { color: 'black', textDecoration: 'none' }

const Product: FC<Props> = ({ id, image, product_name, description, price }: Props) => {
    return (
        <Link href={`/products/${id}`} style={style}>
            <div className={styles.itemContainer} key={id}>
                <Image src={image} alt={product_name} width={1000} height={1000} />
                <span className={`${styles.cardTitle} ${jost.className}`}>{product_name}</span>
                <span className={styles.cardDescription}>{description}</span>
                <span className={styles.cardFooter}>$ {price.toFixed(2)}</span>
            </div>
        </Link>
    )
}

export default Product
