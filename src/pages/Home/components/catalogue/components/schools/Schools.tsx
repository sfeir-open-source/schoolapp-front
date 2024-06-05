import { Link } from 'react-router-dom';
import { getStatusBackgroundColor } from '../../../../../../shared/helpers/status-background-color';
import type { School } from '../../../../../../shared/interfaces/schools.interface';
import { useContext } from 'react';
import { EditModeContext } from '../../../../../../shared/context/edit-mode.context';
import IconDeleteButton from '../icon-delete-button/IconDeleteButton';
import { useDeleteSchool } from '../../../../hooks/schools.hook';

interface SchoolsProps {
  schools: School[] | undefined;
  error: Error | null;
  isLoading: boolean;
}
export default function Schools({ schools, error, isLoading }: SchoolsProps) {
  const { editMode } = useContext(EditModeContext);
  const mutation = useDeleteSchool();

  const handleDeleteSchool = (id: number) => mutation.mutate(id);
  if (isLoading) return <div>Loading ..</div>;

  if (error) return <div>An error has occurred: {error.message};</div>;

  if (schools)
    return (
      <div className='grid items-center gap-4 px-14 sm:grid-cols-2 md:grid-cols-3 md:px-0 lg:grid-cols-4 xl:grid-cols-5'>
        {schools.map(school => (
          <Link
            to={`/catalogue/${school.id}`}
            key={school.id}
            className='relative grid max-h-sm-card w-full grid-rows-2 gap-4  rounded-lg border bg-white shadow-lg  lg:max-h-lg-card lg:max-w-xs'
          >
            <IconDeleteButton
              isShown={editMode}
              onButtonClick={() => handleDeleteSchool(school.id)}
            />
            <div>
              <img
                className='h-44 w-full rounded-t object-cover'
                src={school.image}
                alt={`${school.title}_image`}
              />
            </div>
            <div className='flex flex-col gap-1 p-4'>
              <div className='flex h-full flex-col gap-1'>
                <span className='text-xl font-bold text-gray-900 dark:text-white'>
                  {school.title}
                </span>
                <p className='font-normal text-gray-700 line-clamp-3 dark:text-gray-400'>
                  {school.publicSummary}
                </p>
              </div>
              <div className='flex justify-end'>
                <span className={getStatusBackgroundColor(school.status)}>
                  {school.status}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );

  return <div></div>;
}
