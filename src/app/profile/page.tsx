'use client'
import React, {useState} from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("")

    const getUserData = async () => {
        const res = await axios.post('/api/users/profile') 
        console.log(res.data.data._id)   
        setData(res.data.data._id)
    }

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("Logout SuccessFully")
            console.log("Redirecting to profile...")
            router.push('/login')
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }

    }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2'>
        <h1 className='text-4xl font-bold mb-4'>Profile Page</h1>
        <h2>{data === "" ? "No data to display" : <Link href={`/profile/${data}`}>
            {data} </Link>}
        </h2>
        <hr />
        <button onClick={logout} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
            Logout
        </button>

        <button onClick={getUserData} className='mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-red-700'>
            Get User Details
        </button>
    </div>
  )
}
