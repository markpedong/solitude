import { PageHeader } from '@/components/reusable'
import React from 'react'
import styles from './styles.module.scss';

const Page = () => {
    return (
        <div className={styles.mainWrapper}>
             <PageHeader title="SERVICES" />
        </div>
    )
}

export default Page
