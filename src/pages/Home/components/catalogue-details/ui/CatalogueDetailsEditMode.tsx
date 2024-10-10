import { AiFillClockCircle, AiFillSave } from 'react-icons/ai';
import { School } from '../../../../../shared/interfaces/schools.interface';
import { GoogleUser } from '../../../../../shared/interfaces/google-user';
import { useState } from 'react';
import { StatusType } from '../../../../../shared/interfaces/filter-status.interface';
import SchoolTitleInput from './edit-mode/SchoolTitleInput';
import SchoolPublicSummaryTextArea from './edit-mode/SchoolPublicSummaryTextArea';
import SchoolEditableStatus from './edit-mode/SchoolEditableStatus';
import SaveButton from './edit-mode/SaveButton';
import { useAddSchool } from '../../../hooks/schools.hook';
import TeacherEdition from './edit-mode/TeacherEdition';
import CustomInput from '../../../../../shared/components/Input';

interface CatalogueDetailsEditModeProps {
  school: School;
  user: GoogleUser | null;
}

export default function CatalogueDetailsEditMode({ school, user }: CatalogueDetailsEditModeProps) {
  const [editedSchool, setSchool] = useState(school);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const mutation = useAddSchool();

  const handleInputChange = (value: string, property: keyof School) => {
    setShowSaveButton(true);
    setSchool({ ...editedSchool, [property]: value });
  };

  const handleStatusChange = (statusType: StatusType) => {
    setShowSaveButton(true);
    setSchool({ ...editedSchool, status: statusType });
  };

  const handleSaveButtonClick = () => {
    setShowSaveButton(false);
    mutation.mutate(editedSchool);
  };

  return (
    <div className='g-4 relative mt-20 flex h-[100vh] flex-col p-4 sm:px-12 md:px-28 lg:px-40 xl:px-[30rem]'>
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
          <img
            className='mb-4 h-60 w-full rounded-lg object-cover sm:h-72 lg:h-96'
            style={{ objectPosition: '0 10%' }}
            src={editedSchool.image}
            alt={`${editedSchool.title}_image`}
          ></img>
          <div className='bottom-0 flex w-full flex-col gap-4 sm:flex-row'>
            <div className='flex w-full justify-between gap-4 sm:w-auto sm:justify-start'>
              <TeacherEdition teacher={school.teacher} />
              {/* <div
                className=' w-fit rounded-lg bg-white px-3 py-2 pr-6 drop-shadow-md'
                style={{ display: 'grid', gridTemplateColumns: '6rem 1fr' }}>
                <div className='g-4 flex items-center'>
                  <span className='text-sm font-bold'> Professors</span>
                </div>
                <div className='flex items-center'>
                  <div className='w-4'>
                    <img src={user?.picture} className='min-w-[1.7rem] rounded-full' />
                  </div>
                  <div className='w-4'>
                    <img src={user?.picture} className='min-w-[2rem] rounded-full border-2 border-white' />
                  </div>
                  <div className='w-4'>
                    <img src={user?.picture} className='min-w-[2rem] rounded-full border-2 border-white' />
                  </div>
                </div>
              </div> */}
            </div>
            {/* <div className='g-4 font-small flex w-fit items-center rounded-lg bg-white px-4 py-2 drop-shadow-md sm:ml-auto sm:justify-end'>
              <AiFillClockCircle className='mr-4' />
              <input
                className='fit-content w-7 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                type='number'
                min='0.5'
                step='0.5'
                value={editedSchool.duration}
                onChange={event => handleInputChange(event.target.value, 'duration')}
              />
              <span>days</span>
            </div> */}
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
