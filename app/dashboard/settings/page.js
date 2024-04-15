import React from 'react'

export default async function SettingsPage() {
  const userType = "Requestor"
  return (
    <div className="flex items-center justify-center h-[90vh] ">
     {userType == "Requestor" ? (
      <div className="m-20">
       <p className="">
        You're a <span className="text-bold text-purple-400">Requestor</span>,
        please ask Admin to grant you access to settings.
       </p>
      </div>
     ) : (
      <p>You are a support user.</p>
     )}
    </div>
   );
  }
  
