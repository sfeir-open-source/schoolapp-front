import { getStatusBackgroundColor } from '@schoolApp/shared/helpers/status-background-color';
import { AiFillClockCircle } from 'react-icons/ai';
import { School } from '@schoolApp/shared/interfaces/schools.interface';
import UserCircleManager from './edit-mode/UserCircleManager';
import { useGetUsers } from '@schoolApp/pages/Login/hooks/users.hook';

interface CatalogueDetailsReadOnlyProps {
  school: School;
}

export default function CatalogueDetailsReadOnly({ school }: CatalogueDetailsReadOnlyProps) {
  const userQueryResult = useGetUsers();

  return (
    <div className='g-4 mt-20 flex h-[100vh] flex-col p-4 sm:px-12 md:px-28 lg:px-40 xl:px-[30rem]'>
      <div className='flex items-center justify-between'>
        <h1 className='p-2.5 text-4xl font-bold'>{school.title}</h1>
        <label className={getStatusBackgroundColor(school.status)}>{school.status}</label>
      </div>
      <div className='mb-4 flex items-center justify-between'></div>
      <div className='mb-4'>
        <div className='relative'>
          <img
            className='mb-4 h-60 w-full rounded-lg object-cover sm:h-72 lg:h-96'
            style={{ objectPosition: '0 10%' }}
            src={school.image}
            alt={`${school.title}_image`}></img>
          <div className='bottom-0 flex w-full flex-col gap-4 sm:flex-row'>
            <div className='flex w-full justify-between gap-4 sm:w-auto sm:justify-start'>
              <div className='flex flex-col gap-1'>
                <h2 className='font-medium'>Professeur</h2>
                <UserCircleManager users={school.teachers} userQueryResult={userQueryResult} readonly={true} />
              </div>
              <div className='flex flex-col gap-1'>
                <h2 className='font-medium'>Réferents</h2>
                <UserCircleManager users={school.referents} userQueryResult={userQueryResult} readonly={true} />
              </div>
            </div>
            <div className='g-4 font-small flex w-fit items-center rounded-lg bg-white px-4 py-2 drop-shadow-md sm:ml-auto sm:justify-end'>
              <AiFillClockCircle className='mr-4' />
              <span>{school.duration} days</span>
            </div>
          </div>
        </div>
      </div>
      <div className='rounded-lg p-1 sm:bg-blue-300 md:bg-red-300 lg:bg-green-200 xl:bg-yellow-200'>
        {school.publicSummary}
      </div>
    </div>
  );
}
