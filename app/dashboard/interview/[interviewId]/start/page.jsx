"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const StartInterview = ({params}) => {
    const {interviewId}= use(params)
     const [interviewData, setinterviewData] = useState()
     const [mockInterviewQuestion, setmockInterviewQuestion] = useState()
      const [activeQuestionIndex, setactiveQuestionIndex] = useState(0)
    useEffect(()=>{
        console.log(interviewId);
        GetInterviewDetails()
     },[])
     const GetInterviewDetails=async()=>{
        const result= await  db.select().from(MockInterview).where(eq(MockInterview.mockId,interviewId))
        const jsonMockresp= JSON.parse(result[0].jsonMockResp)
   
        setmockInterviewQuestion(jsonMockresp)
        setinterviewData(result[0])
        // console.log(jsonMockresp)
        
     }
  return (
    <div>
         <div className=' grid grid-cols-1 md: grid-cols-2 '>
            <QuestionSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}/>
            <RecordAnswerSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} interviewData={interviewData} />


         </div>
      <div className=' flex justify-end gap-6'>
       { activeQuestionIndex>0&&  <Button
        onClick={()=>setactiveQuestionIndex(activeQuestionIndex-1)}
       >Previous Question</Button>}
        {  activeQuestionIndex!=mockInterviewQuestion?.length-1&& <Button
         onClick={()=>setactiveQuestionIndex(activeQuestionIndex+1)}
        >Next Question</Button>}
        {  activeQuestionIndex==mockInterviewQuestion?.length-1 &&
        <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}> 
         <Button>End Interview</Button></Link>}
      </div>

    </div>
  )
}

export default StartInterview