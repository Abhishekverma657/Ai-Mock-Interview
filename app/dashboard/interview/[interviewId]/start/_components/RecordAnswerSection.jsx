 
"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';


const RecordAnswerSection = ({mockInterviewQuestion, activeQuestionIndex ,interviewData}) => {
const [userAnswer, setuserAnswer] = useState('')
 const [loading, setloading] = useState(false)
 const {user}= useUser()
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

   useEffect(()=>{
    results.map((result)=>(
      setuserAnswer(prevAns=>prevAns+result?.transcript)
    ))


   },[results])
   const SaveUserAnswer= async()=>{
    if(isRecording){
      setloading(true)
      stopSpeechToText()
      if(userAnswer?.length< 5){
         setloading(false)
        toast("Error  while saving your answer please record again ")
         return ;
      }
      const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex].question+", User Answer:"+userAnswer+",Depends on question and  user answer for give for give interview question "+"Please give us rating for answer and feedback as area of improvement if any"+"  in just 3 to 5 lines to improve it in json formet with rating field and feedback field"
      const result= await  chatSession.sendMessage(feedbackPrompt);
      const mockjsonresp=result.response.text().replace("```json",'').replace("```",'')
       console.log(mockjsonresp)
      const jsonFeedBackResp=JSON.parse(mockjsonresp)
        const resp=await db.insert(UserAnswer).values({
          mockIdRef:interviewData.mockId,
          question:mockInterviewQuestion[activeQuestionIndex].question,
          correctAns:mockInterviewQuestion[activeQuestionIndex].answer,
          userAns:userAnswer,
          feedback:jsonFeedBackResp.feedback,
          rating:jsonFeedBackResp.rating,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-YYYY')

        })
         if(resp){
          toast("Answer Recorded successfully")
          setuserAnswer('')
          setResults([])
         }
          setloading(false)
          setResults([])


    }else{
      startSpeechToText()
    }
   }
  return (
    <div className='flex items-center justify-center flex-col'> 
    <div className=' flex flex-col justify-center items-center  gap-10  bg-black rounded-lg p-5' >
      <Image
       style={{ backgroundColor: 'transparent' }}
       className=' absolute' src={'/webcam.png'} width={200} height={200} alt='webcam'></Image>
      <Webcam 
      mirrored={true}
      style={
        {
          height:300,
          width:'100%',
          zIndex:10,

        }
      }/>
       


     
    </div>
    <Button
     disabled={loading}
     onClick={SaveUserAnswer}
     className=' mt-10 ' variant='outline'>
       {isRecording?
       <h2  className=' flex gap-2 text-red-600'><Mic/>'Recording...'</h2>:"Record Answer"
       }
     

    </Button>
    {/* <Button onClick={()=> console.log(userAnswer)}>show ans</Button> */}
    
    </div>
  )
}

export default RecordAnswerSection