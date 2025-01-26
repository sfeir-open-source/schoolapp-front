import { GoogleUser } from '../../../../../shared/interfaces/google-user';
import { ChangeEvent, useEffect, useState } from 'react';
import { StatusType } from '../../../../../shared/interfaces/filter-status.interface';
import SchoolPublicSummaryTextArea from './edit-mode/SchoolPublicSummaryTextArea';
import SchoolEditableStatus from './edit-mode/SchoolEditableStatus';
import SaveButton from './edit-mode/SaveButton';
import { useUpdateSchool } from '../../../hooks/schools.hook';
import CustomInput from '../../../../../shared/components/Input';
import CatalogueDetailsImage from './edit-mode/CatlogueDetailsImage';
import { useGetUser, useGetUsers } from '@schoolApp/pages/Login/hooks/users.hook';
import { User } from '@schoolApp/shared/interfaces/users.interface';
import UserCircleManager from './edit-mode/UserCircleManager';
import { School } from '@schoolApp/shared/interfaces/schools.interface';
import {
  AiFillClockCircle,
  AiOutlineCalendar,
  AiOutlineCode,
  AiOutlineLink,
  AiOutlineTag,
  AiOutlineUser,
  AiFillPushpin,
} from 'react-icons/ai';
import { Properties, Property, PropertyLabel, PropertyValue } from './edit-mode/Properties';
import { useGetRealTimeEdits } from '@schoolApp/pages/Home/hooks/real-time-edits.hook';
import LevelDropdown from './edit-mode/LevelSelector';
import { DatePicker } from './edit-mode/DatePicker';

interface CatalogueDetailsEditModeProps {
  school: School;
}

export default function CatalogueDetailsEditMode({ school }: CatalogueDetailsEditModeProps) {
  const [editedSchool, setSchool] = useState(school);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const mutation = useUpdateSchool();
  const { data: realTimeEdits } = useGetRealTimeEdits();

  const userQueryResult = useGetUsers();

  const handleInputChange = <K extends keyof School>(property: K, value: School[K]) => {
    console.log(editedSchool, value, property);
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

  return (
    <div className='mt-[4.4rem]'>
      <CatalogueDetailsImage src={editedSchool.image} alt={`${editedSchool.title}_image`} />

      <div className='relative flex h-[100vh] flex-col gap-4 text-slate-600 sm:px-12 md:px-28 lg:px-40 xl:px-[22rem]'>
        <div className='fixed right-0 top-[5.25rem] z-50 mr-4'>
          <SaveButton isShown={showSaveButton} onButtonClick={handleSaveButtonClick} />
        </div>
        <CustomInput
          realTimeEdits={realTimeEdits}
          size='lg'
          title='school-title'
          schoolId={editedSchool.id}
          value={editedSchool.title}
          onInputChange={value => handleInputChange('title', value)}
          placeholder='Entrer un titre'
        />
        <Properties>
          <Property>
            <PropertyLabel>
              <AiOutlineTag />
              <span>Status</span>
            </PropertyLabel>
            <PropertyValue>
              <SchoolEditableStatus selectedStatus={editedSchool.status} onStatusChange={handleStatusChange} />
            </PropertyValue>
          </Property>
          <Property>
            <PropertyLabel>
              <AiOutlineCode />
              <span>Technologies</span>
            </PropertyLabel>
            <PropertyValue>
              <CustomInput
                size='sm'
                value={editedSchool.technology}
                onInputChange={value => handleInputChange('technology', value)}
                placeholder='Entrer une technologie'
                title='school-technology'
                schoolId={school.id}
                realTimeEdits={realTimeEdits}
              />
            </PropertyValue>
          </Property>
          <Property>
            <PropertyLabel>
              <AiOutlineTag />
              <span>Niveau</span>
            </PropertyLabel>
            <LevelDropdown
              selectedLevel={editedSchool.level}
              onSelectChange={value => handleInputChange('level', value)}
            />
          </Property>
          <Property>
            <PropertyLabel>
              <AiOutlineLink />
              <span>Github</span>
            </PropertyLabel>
            <PropertyValue>
              <CustomInput
                size='sm'
                value={editedSchool.githubLink}
                onInputChange={value => handleInputChange('githubLink', value)}
                placeholder='Entrer un lien Github'
                title='school-github-link'
                schoolId={school.id}
                realTimeEdits={realTimeEdits}
              />
            </PropertyValue>
          </Property>
          <Property>
            <PropertyLabel>
              <AiOutlineLink />
              <span>Drive</span>
            </PropertyLabel>
            <PropertyValue>
              <CustomInput
                size='sm'
                value={editedSchool.driveLink}
                onInputChange={value => handleInputChange('driveLink', value)}
                placeholder='Entrer un lien Drive'
                title='school-drive-link'
                schoolId={school.id}
                realTimeEdits={realTimeEdits}
              />
            </PropertyValue>
          </Property>
          <Property>
            <PropertyLabel>
              <AiFillClockCircle />
              <span>Durée</span>
            </PropertyLabel>
            <PropertyValue>
              <CustomInput
                size='sm'
                type='number'
                min={0}
                step={0.5}
                value={editedSchool.duration}
                onInputChange={value => handleInputChange('duration', Number(value))}
                title='school-duration'
                schoolId={school.id}
                realTimeEdits={realTimeEdits}
              />
            </PropertyValue>
          </Property>
          <Property>
            <PropertyLabel>
              <AiOutlineCalendar />
              <span>Dernière mise à jour</span>
            </PropertyLabel>
            <DatePicker
              selectedDate={editedSchool.lastUpdate}
              onDateSelect={value => handleInputChange('lastUpdate', value)}
            />{' '}
          </Property>
          <Property>
            <PropertyLabel>
              <AiOutlineCalendar />
              <span>Date de La dernière session</span>
            </PropertyLabel>
            <DatePicker
              selectedDate={editedSchool.lastSession}
              onDateSelect={value => handleInputChange('lastSession', value)}
            />
          </Property>
          <Property>
            <PropertyLabel>
              <AiFillPushpin />
              <span>Lieu de La dernière session</span>
            </PropertyLabel>
            <CustomInput
              size='sm'
              value={editedSchool.lastSessionLocation}
              onInputChange={value => handleInputChange('lastSessionLocation', value)}
              placeholder='Entrer un lieu'
              title='school-drive-last-session-location'
              schoolId={school.id}
              realTimeEdits={realTimeEdits}
            />
          </Property>
          <Property>
            <PropertyLabel>
              <AiOutlineUser />
              <span>Réferents</span>
            </PropertyLabel>
            <PropertyValue>
              <UserCircleManager
                users={editedSchool.referents}
                userQueryResult={userQueryResult}
                onUserClick={user => handleUserClick(user, 'referents')}
              />
            </PropertyValue>
          </Property>
          <Property>
            <PropertyLabel>
              <AiOutlineUser />
              <span>Professeurs</span>
            </PropertyLabel>
            <PropertyValue>
              <UserCircleManager
                users={editedSchool.teachers}
                userQueryResult={userQueryResult}
                onUserClick={user => handleUserClick(user, 'teachers')}
              />
            </PropertyValue>
          </Property>
        </Properties>
        <textarea
          className='w-full resize-none border-b border-t border-slate-300 p-1 p-2 text-slate-600 outline-none'
          placeholder='Écrire un commentaire ...'
        ></textarea>

        <SchoolPublicSummaryTextArea
          publicSummary={editedSchool.publicSummary}
          onTextAreaChange={value => handleInputChange('publicSummary', value)}
        />
      </div>
    </div>
  );
}
