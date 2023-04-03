import { useState } from 'react'
import Header from './components/header/Header'
import Schools from './components/schools-list/Schools'
import Filter from './components/filter/Filter'
import type { Status } from '../../shared/interfaces/filter-status.interface'
import { useGetSchools } from './hooks/schools.hook'

export default function Home() {
  const [selectedStatus, setSelectedStatus] = useState(['active'])
  const { data, error, isLoading } = useGetSchools(selectedStatus)

  const handleStatusChange = (status: Status[]) => {
    const selectedStatus = status.filter(s => s.isChecked).map(s => s.text)
    setSelectedStatus(selectedStatus)
  }
  return (
    <div className='flex flex-col gap-4 p-4'>
      <Header />
      <div className='flex flex-col gap-4'>
        <Filter onStatusChange={handleStatusChange} />
        <Schools schools={data} error={error} isLoading={isLoading} />
      </div>
    </div>
  )
}
