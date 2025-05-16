import React from 'react'

const Showuser = ({showuser,setshowuser,userinfo}) => {
  return (
    <div className='flex h-[100%] justify-center items-center'>
      
<div className={`${showuser} top-0 left-0 h-screen w-full bg-slate-500 opacity-80 z-40`}>

</div>{" "}
<div className={`${showuser} h-screen top-0 left-0 flex items-center justify-center w-full z-50`}>
<div className='bg-white top-[50%] left-[50%]  rounded p-4 w-[80%] md:w-[50%] lg:w-[40%] text-black'>
    <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>user info</h1>
        <button onClick={()=>{setshowuser("hidden")}}>close</button>
    </div>
    <div className='mt-2'>
        <label> name:
            <span className='font-semibold'> {userinfo.name}</span>
        </label>
    </div>
    <div className='mt-4'>
        <label> email:
            <span className='font-semibold'> {userinfo.email}</span>
        </label>
    </div>
    <div className='mt-4'>
        <label> Address:
            <span className='font-semibold'> {userinfo.address}</span>
        </label>
    </div>
</div>
</div>
    </div>
  )
}

export default Showuser
