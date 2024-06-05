import { useState } from 'react';
import { Link } from 'react-router-dom';
import IconDeleteButton from '../icon-delete-button/IconDeleteButton';
import { School } from '../../../../../../shared/interfaces/schools.interface';
import { getStatusBackgroundColor } from '../../../../../../shared/helpers/status-background-color';
import ConfirmationModal from '../../../../../../shared/components/ConfirmationModal';

interface CatalogueSchoolProps {
  school: School;
  editMode: boolean;
  onDelete: (schoolId: number) => void;
}
export default function CatalogueSchool({ school, editMode, onDelete }: CatalogueSchoolProps) {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Link
        to={`/catalogue/${school.id}`}
        key={school.id}
        className='relative grid max-h-sm-card w-full grid-rows-2 gap-4  rounded-lg border bg-white shadow-lg  lg:max-h-lg-card lg:max-w-xs'
      >
        <IconDeleteButton isShown={editMode} onButtonClick={() => setVisible(true)} />
        <div>
          <img className='h-44 w-full rounded-t object-cover' src={school.image} alt={`${school.title}_image`} />
        </div>
        <div className='flex flex-col gap-1 p-4'>
          <div className='flex h-full flex-col gap-1'>
            <span className='text-xl font-bold text-gray-900 dark:text-white'>{school.title}</span>
            <p className='font-normal text-gray-700 line-clamp-3 dark:text-gray-400'>{school.publicSummary}</p>
          </div>
          <div className='flex justify-end'>
            <span className={getStatusBackgroundColor(school.status)}>{school.status}</span>
          </div>
        </div>
      </Link>
      <ConfirmationModal
        visible={visible}
        setVisible={setVisible}
        school={school}
        onConfirm={() => onDelete(school.id)}
      />
    </>
  );
}