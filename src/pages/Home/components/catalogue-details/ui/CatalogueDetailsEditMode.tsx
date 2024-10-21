import { GoogleUser } from '../../../../../shared/interfaces/google-user';
import { ChangeEvent, useState } from 'react';
import { StatusType } from '../../../../../shared/interfaces/filter-status.interface';
import SchoolPublicSummaryTextArea from './edit-mode/SchoolPublicSummaryTextArea';
import SchoolEditableStatus from './edit-mode/SchoolEditableStatus';
import SaveButton from './edit-mode/SaveButton';
import { useAddSchool, useUpdateSchool } from '../../../hooks/schools.hook';
import CustomInput from '../../../../../shared/components/Input';
import CatalogueDetailsImage from './edit-mode/CatlogueDetailsImage';
import { useGetUsers } from '@schoolApp/pages/Login/hooks/users.hook';
import { User } from '@schoolApp/shared/interfaces/users.interface';
import UserCircleManager from './edit-mode/UserCircleManager';
import { School } from '@schoolApp/shared/interfaces/schools.interface';
import { AiFillClockCircle } from 'react-icons/ai';
import { set } from 'lodash';

interface CatalogueDetailsEditModeProps {
  school: School;
  user: GoogleUser | null;
}

export default function CatalogueDetailsEditMode({ school, user }: CatalogueDetailsEditModeProps) {
  const [editedSchool, setSchool] = useState(school);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const mutation = useUpdateSchool();

  const userQueryResult = useGetUsers();

  const handleInputChange = (value: string, property: keyof School) => {
    setShowSaveButton(true);
    setSchool({ ...editedSchool, [property]: value });
  };

  const handleStatusChange = (statusType: StatusType) => {
    setShowSaveButton(true);
    setSchool({ ...editedSchool, status: statusType });
  };

  const handleUserClick = (user: User, key: 'teachers' | 'referents') => {
    setShowSaveButton(true);
    const isInclude = (school: School, user: User) => school[key].some(property => property.uid === user.uid);

    setSchool(school => ({
      ...school,
      [key]: isInclude(school, user)
        ? school[key].filter(property => property.uid !== user.uid)
        : [...school[key], user],
    }));
  };

  const handleSaveButtonClick = () => {
    mutation.mutate(editedSchool);
    setShowSaveButton(false);
  };

  const updateSchoolDuration = (event: ChangeEvent<HTMLInputElement>) => {
    setSchool(school => ({ ...school, duration: Number(event.target.value) }));
    setShowSaveButton(true);
  };

  return (
    <div className='g-4 relative mt-20 flex h-[100vh] flex-col p-4 text-slate-600 sm:px-12 md:px-28 lg:px-40 xl:px-[30rem]'>
      <div className='fixed right-0 top-[4.25rem] z-50 mr-4'>
        <SaveButton isShown={showSaveButton} onButtonClick={handleSaveButtonClick} />
      </div>
      <div className='relative flex items-center justify-between gap-4'>
        <CustomInput
          size='lg'
          value={editedSchool.title}
          onInputChange={value => handleInputChange(value, 'title')}
          placeholder='Entrer un titre'
        />
        <SchoolEditableStatus selectedStatus={editedSchool.status} onStatusChange={handleStatusChange} />
      </div>
      <div className='mb-4 flex items-center justify-between'></div>
      <div className='mb-4'>
        <div className='relative'>
          <CatalogueDetailsImage src={editedSchool.image} alt={`${editedSchool.title}_image`} />
          <div className='bottom-0 flex w-full flex-col justify-between gap-4 sm:flex-row'>
            <div className='flex w-full justify-between gap-4 sm:w-auto sm:justify-start'>
              <div className='flex flex-col gap-1'>
                <h2 className='font-medium'>Proffesseur</h2>
                <UserCircleManager
                  users={editedSchool.teachers}
                  userQueryResult={userQueryResult}
                  onUserClick={user => handleUserClick(user, 'teachers')}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <h2 className='font-medium'>Réferents</h2>
                <UserCircleManager
                  users={editedSchool.referents}
                  userQueryResult={userQueryResult}
                  onUserClick={user => handleUserClick(user, 'referents')}
                />
              </div>
            </div>
            <div className='relative flex flex-col items-end'>
              <h2 className='font-medium'>Durée en jours</h2>
              <div className='relative'>
                <input
                  value={editedSchool.duration}
                  onChange={updateSchoolDuration}
                  placeholder='0'
                  type='number'
                  step='0.5'
                  className='py- flex w-16 rounded-lg border border-slate-400 bg-transparent pr-2 text-right text-sm  text-slate-600 outline-none'
                />
                <AiFillClockCircle className='absolute left-1 top-[2px]' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SchoolPublicSummaryTextArea
        publicSummary={editedSchool.publicSummary}
        onTextAreaChange={value => handleInputChange(value, 'publicSummary')}
      />
    </div>
  );
}
