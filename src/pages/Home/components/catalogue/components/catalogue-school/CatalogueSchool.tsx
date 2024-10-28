import { useState } from 'react';
import { Link } from 'react-router-dom';
import IconDeleteButton from '@schoolApp/pages/Home/components/catalogue/components/icon-delete-button/IconDeleteButton';
import { School } from '@schoolApp/shared/interfaces/schools.interface';
import { getStatusBackgroundColor } from '@schoolApp/shared/helpers/status-background-color';
import ConfirmationModal from '@schoolApp/shared/components/ConfirmationModal';
import ImageSchool from '@schoolApp/pages/Home/components/catalogue/components/image-school/ImageSchool';

interface CatalogueSchoolProps {
  school: School;
  editMode: boolean;
  onDelete: (schoolId: string) => void;
}

export default function CatalogueSchool({ school, editMode, onDelete }: CatalogueSchoolProps) {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Link
        to={`/catalogue/${school.id}`}
        key={school.id}
        className='relative grid max-h-sm-card w-full grid-rows-2 gap-4  rounded-lg border bg-white shadow-lg  lg:max-h-lg-card lg:max-w-xs'>
        <IconDeleteButton isShown={editMode} onButtonClick={() => setVisible(true)} />
        <div>
          <ImageSchool src={school.image} alt={`${school.title}_image`} />
        </div>
        <div className='flex flex-col gap-1 p-4'>
          <div className='flex h-full flex-col gap-1'>
            <span className='text-xl font-bold text-gray-900 dark:text-white'>{school.title}</span>
            <p className='line-clamp-3 font-normal text-gray-700 dark:text-gray-400'>{school.publicSummary}</p>
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
