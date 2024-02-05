import React from 'react'
import Account from './components'
import styles from './styles.module.scss';

const Page = () => {
    return (
        <div className={styles.mainWrapper}>
            <Account />
        </div>
    )
}

export default Page
