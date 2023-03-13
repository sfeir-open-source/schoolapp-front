import { useQuery } from 'react-query';
import { School } from '../../../shared/interfaces/schools.interface';

export default function Schools() {
  const { isLoading, error, data } = useQuery<boolean, Error, School[]>('repoData', () => fetch('/fake-api/Schools.json').then((res) => res.json()));

  const getStatusBackgroundColor = (status: string) => {
    if (status === 'active') {
      return 'bg-green-200';
    }
    if (status === 'abandonned') {
      return 'bg-slate-200';
    }
    if (status === 'rejected') {
      return 'bg-red-200';
    }
    if (status === 'proposal') {
      return 'bg-blue-200';
    }
    if (status === 'wish') {
      return 'bg-orange-200';
    }
  };

  if (isLoading) return <div>Loading ..</div>;

  if (error) return <div>'An error has occurred: {error.message};</div>;

  if (data)
    return (
      <div>
        <div className='h-20'></div>
        <div className='grid items-center gap-4 px-14 sm:grid-cols-2 md:grid-cols-3 md:px-0 lg:grid-cols-4 xl:grid-cols-5'>
          {data.map((school) => (
            <div className='grid max-h-sm-card w-full grid-rows-2 gap-4  rounded-lg border border-gray-200  bg-white lg:max-h-lg-card  lg:max-w-xs'>
              <img className='h-full w-full rounded-t-lg' src={school.picture} />
              <div className='flex flex-col gap-1 p-4'>
                <div className='flex h-full flex-col gap-1'>
                  <span className='text-xl font-bold text-gray-900 dark:text-white'>{school.name}</span>
                  <span className='font-normal text-gray-700 dark:text-gray-400'>{school.summary}</span>
                </div>
                <div className='flex justify-end'>
                  <span className={'rounded-lg py-1 px-3 text-sm ' + getStatusBackgroundColor(school.status)}>{school.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
