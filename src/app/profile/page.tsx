use 'client'
import React, {useState} from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("")

    const getUserData = async () => {
        const res = await axios.post('/api/users/profile')
        console.log(res.data)
        setData(res.data._id)

    }

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("Logout SuccessFully")
            router.push('/login')
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }

    }
  return (
    <div className='flex flex-col items-center
        justify-center min-h-screen bg-gray-100 py-2'>
        <h1 className='text-4xl font-bold mb-4'>Profile Page</h1>
        <h2>{data === "" ? "No data to display" : <Link href={`/profile/${data}`}>
            {data} </Link>}
        </h2>
        <hr />
        <button onClick={logout} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
            Logout
        </button>
    </div>
  )
}
