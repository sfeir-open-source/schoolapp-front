import { getStatusBackgroundColor } from '../../../../shared/helpers/status-background-color';
import { School } from '../../../../shared/interfaces/schools.interface';

type SchoolsProps = {
  schools: School[] | undefined,
  error: Error | null,
  isLoading: boolean
}
export default function Schools({schools, error, isLoading}: SchoolsProps) {

  if (isLoading) return <div>Loading ..</div>;

  if (error) return <div>'An error has occurred: {error.message};</div>;

  if (schools)
    return (
      <div className='grid items-center gap-4 px-14 sm:grid-cols-2 md:grid-cols-3 md:px-0 lg:grid-cols-4 xl:grid-cols-5'>
        {schools.map((school) => (
          <div key={school.id} className='grid max-h-sm-card w-full grid-rows-2 gap-4  rounded-lg border border-gray-200  bg-white lg:max-h-lg-card  lg:max-w-xs'>
            <img className='h-full w-full rounded-t-lg' src={school.image} />
            <div className='flex flex-col gap-1 p-4'>
              <div className='flex h-full flex-col gap-1'>
                <span className='text-xl font-bold text-gray-900 dark:text-white'>{school.title}</span>
                <span className='font-normal text-gray-700 dark:text-gray-400'>{school.publicSummary}</span>
              </div>
              <div className='flex justify-end'>
                <span className={'rounded-lg py-1 px-3 text-sm ' + getStatusBackgroundColor(school.status)}>{school.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  return <div></div>;
}
