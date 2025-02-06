import React from 'react'
import Dashboard from "../../components/dashboard/Dashboard"
import Table from '../../components/table/Table'

const home = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold text-[#363740] '>
        Dashboard
      </h1>
        <Dashboard />
        <Table/>
        
    </div>
  )
}

export default home
