import React, { FC } from 'react'
import styles from './styles.module.scss'

type Props = {
    title: string
}

const PageHeader: FC<Props> = ({title}) => {
  return <div className={styles.header}>{title}</div>
}

export default PageHeader