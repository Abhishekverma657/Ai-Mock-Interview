"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { use, useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
 
  

const Feedback = ({params}) => {

      const {interviewId}= use(params)
       const router=useRouter()
       const [feedbackList, setfeedbackList] = useState([])
        const [total, setTotal] = useState(0)

       useEffect(()=>{
     getfeddback()
    

       },[])
     const getfeddback= async()=>{
         const  result =await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef,interviewId )).orderBy(UserAnswer.id);
         console.log(result)
         setfeedbackList(result)
         calculateOverallRating(result)

     }
     const calculateOverallRating = (feedbackList) => {
       let totalRating =0;
      if (feedbackList.length === 0) {
          setTotal(0)
      } else {
      
        totalRating = feedbackList.reduce((acc, feedback) => acc + feedback.rating, 0);

        // Calculate the average rating
         console.log(totalRating)


         
      
        const digitSum = totalRating
            .toString()
            .split("") // Split into individual characters
            .filter(char => !isNaN(char)) // Ensure only numeric digits
            .reduce((acc, digit) => acc + parseInt(digit, 10), 0); // Sum digits

        console.log("Sum of Digits:", digitSum)
        setTotal(digitSum/feedbackList.length)
         
 
      
      }
  }
 

      
  return (
    <div className=' p-10'> 
        <h2 className=' text-3xl font-bold text-green-500'>Congratulation</h2>
        <h2 className=' font-bold text-2xl'>Here is Your interview feedback</h2>
        {feedbackList?.length==0?
        <h2 className=' font-bold text-xl text-gray-500' >No Interview Feedback Record Found</h2>:
        <>
      
         <h2 className=' text-primary my-3 text-lg'>Your overall interview rating:<strong className=' text-yellow-600'>{`${total}/10`}</strong></h2>
         <h2 className=' text-sm text-gray-500'>Find below interview question with  correct answer , Your answer and feedback for improovement</h2>
         {
            feedbackList&& feedbackList.map((item , index)=>(
                <Collapsible key={index}  >
  <CollapsibleTrigger className=' flex  justify-between w-full p-2 bg-secondary  rounded-lg my-2 text-left  gap-7'>{item.question}<ChevronsUpDownIcon className=' h-7 w-7' /> </CollapsibleTrigger>
  <CollapsibleContent>
    <div className=' flex flex-col gap-2'>
        <h2 className=' text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
        <h2 className=' p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
        <h2 className=' p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
        <h2 className=' p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback: </strong>{item.feedback}</h2>
    </div>
  </CollapsibleContent>
</Collapsible>


            ))
         }
            </>
        }
         
         <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback