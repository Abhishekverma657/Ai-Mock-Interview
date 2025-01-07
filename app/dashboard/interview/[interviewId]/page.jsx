"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react'
import Webcam from 'react-webcam';

const Interview = ({params}) => {
   const {interviewId}= use(params)
     const [interviewData, setinterviewData] = useState()
      const [webCamEnabled, setwebCamEnabled] = useState(false)
     useEffect(()=>{
        
        GetInterviewDetails()
     },[])
     const GetInterviewDetails=async()=>{
        const result= await  db.select().from(MockInterview).where(eq(MockInterview.mockId,interviewId))
        // console.log(result);
        setinterviewData(result[0])
     }
  return (
    <div className=' my-10 flex   flex-col'>
        <h2 className=' font-bold text-2xl text-center'>Let's get Started</h2>
         <div className=' grid grid-cols-1 md:grid-cols-2 gap-10 '>
         <div className=' flex flex-col my-5 gap-5  '>
             <div className=' flex flex-col p-5 rounded-lg border'>

            
            <h2  className=' text-lg'> <strong>Job Role/Job Position: </strong>{interviewData?.jobPosition}</h2>
            <h2  className=' text-lg'> <strong>Job Description/ Tech Stack: </strong>{interviewData?.jobDesc}</h2>
            <h2  className=' text-lg'> <strong>Years of Experience: </strong>{interviewData?.jobExperience}</h2>
         </div>
         <div className=' p-5 border border-yellow-300 bg-yellow-100'>
          <h2 className=' flex gap-2 items-center text-yellow-600'>  <Lightbulb/><strong>Information</strong></h2> 

            <h2 className=' mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
         </div>
          

         
        <div>
            {webCamEnabled?<Webcam
             onUserMedia={()=>{
                setwebCamEnabled(true)
             }}
             onUserMediaError={()=>setwebCamEnabled(false)}
             mirrored={true}
             style={{
                height:300,
                width:300
             }} 
            />:
            <> 
            <WebcamIcon className=' h-48 my-7 w-full  p-2 bg-secondary rounded-lg border  '/>
            
             <Button className=' w-full' variant='ghost' onClick={()=>setwebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
             </>
            }
        </div>
        
         </div>
          <div className=' flex justify-end items-center'>
            <Link href={'/dashboard/interview/'+interviewId+'/start'}>
            <Button>Start Interview</Button>
            </Link>

         
       
          </div>
    </div>
  )
}

export default Interview