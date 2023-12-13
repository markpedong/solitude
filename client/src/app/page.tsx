'use client'

import Login from '@/components/login/loginPage'
import { Button } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'

const Page = () => {
    const [showLogin, setShowLogin] = useState(false)
    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setShowLogin(!showLogin)
                }}>
                login
            </Button>
            {showLogin && <Login />}
        </div>
    )
}

export default Page
