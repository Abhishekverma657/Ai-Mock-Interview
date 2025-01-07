import { Lightbulb, Volume2 } from 'lucide-react'
import React, { useEffect } from 'react'

const QuestionSection = ({mockInterviewQuestion, activeQuestionIndex}) => {
    useEffect(()=>{
         console.log( "ques"+mockInterviewQuestion)

    },[mockInterviewQuestion])
    const textToSpeech=(text)=>{
      if('speechSynthesis' in window){
        const speech= new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech)
      }
       else{
        alert("Your browser does not support text-to-speech functionality")
       }
    }
   
  return (
    <div className=' p-5 border rounded-lg'>
        <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {mockInterviewQuestion&&mockInterviewQuestion.map((question,index)=>(
            
                <h2 className={` text-xs  md:text-sm  text-center cursor-pointer p-2 bg-secondary rounded-full
                    ${activeQuestionIndex === index ? 'bg-primary text-white' : ''}`} key={index}
                    >Question #{index+1}</h2>
            ))}
             
        </div>
        <h2 className=' my-5 text-xs md:text-sm' >
  {mockInterviewQuestion && mockInterviewQuestion[activeQuestionIndex] && mockInterviewQuestion[activeQuestionIndex].question}
</h2>
<Volume2  className=' cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex].question)}/>
        <div className='  border rounded-lg p-5 bg-blue-100 mt-10  '>
             <h2 className='flex gap-2 items-center text-primary'>
             <Lightbulb/>
             <strong>Note:</strong>

             </h2>
             <h1 className=' text-sm my-2 text-primary' >{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h1>
            
        </div>


    </div>
  )
}

export default QuestionSection