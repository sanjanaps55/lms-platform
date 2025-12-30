import React from 'react'
import CompanionForm from '@/components/CompanionForm'
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

const NewCompanion = async ()  => {
  const { userId } = await auth();
  
    if(!userId) redirect('/sign-in');
  return (
    <main>
      <p>Comapnion form</p>
      <CompanionForm />
    </main>
  )
}

export default NewCompanion