import Link from 'next/link'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    return (
        <div>
            <Link href="/login">login</Link>
        </div>
    )
}

export default Page
