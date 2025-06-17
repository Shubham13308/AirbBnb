import React from 'react'
import Link from 'next/link'
import { LuTent } from 'react-icons/lu'
import { Button } from '../ui/button'
import '../../app/css/logo.css'

const Logo =()=>{
    return(
        <Button>
            <Link href ='/' >
            
            <LuTent className='logo' />

            
            </Link>
        </Button>
    )
}
export default Logo