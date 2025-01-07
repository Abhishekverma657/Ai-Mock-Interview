import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'next/link';
import { useRouter } from 'next/navigation';
 

const InterviewItemCard = ({interview}) => {
     const router =useRouter()
     const onstart=()=>{
        router.push(`/dashboard/interview/${interview?.mockId}`)

     }
      const onfeedback=()=>{
        router.push(`/dashboard/interview/${interview?.mockId}/feedback`)
      }
  return (
    <div className=' border shadow-sm  rounded-lg p-3'>
         <h2 className=' font-bold text-primary'>{interview?.jobPosition}</h2>
         <h2 className=' text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
          <h2 className=' text-xs text-gray-400'>Created At:{interview?.createdAt}</h2>
          <div className=' flex justify-between gap-5'>
         
            
            
            <Button onClick={onfeedback}  size='sm' variant='outline' className={'w-full'}>Feedback</Button>
           
            <Button onClick={onstart} size='sm'  className ='w-full' >Start</Button>
          </div>


    </div>
  )
}

export default InterviewItemCard