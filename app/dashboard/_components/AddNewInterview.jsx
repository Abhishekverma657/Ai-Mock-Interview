"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModel'
import { Loader2 } from 'lucide-react'
 
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema'
import { useRouter } from 'next/navigation'
  

const AddNewInterview = () => {
     const [openDailog, setopenDailog] = useState(false)
     const [jobPosition, setjobPosition] = useState('')
     const [jobDescription, setjobDescription] = useState('')
     const [jobExperience, setjobExperience] = useState('')
     const [loading, setLoading] = useState(false)
      const [jsonResp, setJsonResp] = useState([])
       const {user}= useUser()
       const router=useRouter()
      const onSubmit= async(e)=>{
         try{
        setLoading(true)
        e.preventDefault()
        console.log(jobPosition, jobDescription, jobExperience)
        const inputPrompt="Job position:"+jobPosition+", job description:"+jobDescription+", years of experience :"+jobExperience+" ,depend on job position job description and years of experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview question along with answer in json formet , give us question and answer field on json";

   const result=await chatSession.sendMessage(inputPrompt);
    const mockJsonResp=result.response.text().replace("```json",'').replace("```",'')

   console.log(JSON.parse(mockJsonResp))
   setJsonResp(mockJsonResp)
    if(mockJsonResp){
      
    const resp=await db.insert(MockInterview).values({
        mockId:uuidv4(),
        jsonMockResp:mockJsonResp,
        jobPosition:jobPosition,
        jobDesc:jobDescription,
        jobExperience:jobExperience,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-YYYY')

        

    }).returning({mockId:MockInterview.mockId});
    console.log("Inserted Id:",resp)
    if(resp){
      setopenDailog(false)
      router.push('/dashboard/interview/'+resp[0]?.mockId)

    }
  }
  else{
    console.log("No Mock JSON Response Received");
  }
         }catch(e){
           console.log(e)
            setLoading(false)

         } finally{
            setLoading(false)
         }
  
      }

  return (
    <div> 
        <div
         onClick={()=>setopenDailog(true)}
         className=' p-10 border rounded-lg bg-secondary hover:scale-105  hover:shadow-md cursor-pointer transition-all '>
            <h2 className=' text-lg text-center'> + Add New  </h2>
        </div>
        <Dialog open={openDailog}>
 
  <DialogContent className='max-w-2xl'>
    <DialogHeader>
      <DialogTitle className='text-2xl'>Tell us more about your job interviwing</DialogTitle>
      <DialogDescription>
        <form onSubmit={onSubmit}> 
         <div>
           
            <h2>Add Details about your position/role , job description and years of experience</h2>
         </div>
          <div className=' my-3 mt-7'>
            <label>Job Role/Job Position</label>
            <Input placeholder="EX. Full Stack developer" required
            onChange={(e)=>setjobPosition(e.target.value)}
            />
          </div>
          <div className=' my-3 mt-7'>
            <label>Job Description/Tech Stack(in Short)</label>
            <Textarea placeholder="Ex. React , angular , nodejs etc" required
             onChange={(e)=>setjobDescription(e.target.value)}
            />
          </div>
          <div className=' my-3 mt-7'>
            <label>Years of experience</label>
            <Input placeholder="Ex.5" type="Number" max='100' required
             onChange={(e)=>setjobExperience(e.target.value)}
            />
          </div>
         <div className=' flex gap-5 justify-end'>
            <Button type='button' onClick={()=>setopenDailog(false)}  variant ='ghost'>Cancel</Button>
            <Button type='submit' disabled={loading}> 
                {loading?
                <> 
                <Loader2  className=' animate-spin'/>'Generating from AI'</>:"Start Interview"
                }
                </Button>
         </div>
         </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


    </div>
  )
}

export default AddNewInterview