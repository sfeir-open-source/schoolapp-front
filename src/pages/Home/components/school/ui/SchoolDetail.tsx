import Input from '@/components/ui/input';
import { useGetUsers } from '@schoolApp/pages/Login/hooks/users.hook';
import { School } from '@schoolApp/shared/interfaces/schools.interface';
import { User } from '@schoolApp/shared/interfaces/users.interface';
import { useState } from 'react';
import {
  AiFillClockCircle,
  AiFillPushpin,
  AiOutlineCalendar,
  AiOutlineCode,
  AiOutlineLink,
  AiOutlineTag,
  AiOutlineUser,
} from 'react-icons/ai';
import { StatusType } from '../../../../../shared/interfaces/filter-status.interface';
import { useUpdateSchool } from '../../../hooks/schools.hook';
import CatalogueDetailsImage from './edit-mode/CatlogueDetailsImage';
import { DatePicker } from './edit-mode/DatePicker';
import LevelDropdown from './edit-mode/LevelSelector';
import { Properties, Property, PropertyLabel, PropertyValue } from './edit-mode/Properties';
import SaveButton from './edit-mode/SaveButton';
import SchoolEditableStatus from './edit-mode/SchoolEditableStatus';
import SchoolPublicSummaryTextArea from './edit-mode/SchoolPublicSummaryTextArea';
import UserCircleManager from './edit-mode/UserCircleManager';

interface SchoolProps {
  school: School;
  editMode: boolean;
}

export default function SchoolDetail({ school, editMode }: SchoolProps) {
  const [editedSchool, setSchool] = useState(school);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const mutation = useUpdateSchool();

  const userQueryResult = useGetUsers();

  const handleInputChange = <K extends keyof School>(property: K, value: School[K]) => {
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

      <div className='relative flex h-[100vh] flex-col gap-4 pt-4 text-slate-600 sm:px-12 md:px-28 lg:px-40 xl:px-[22rem]'>
        <div className='fixed right-0 top-[5.25rem] z-50 mr-4'>
          <SaveButton isShown={showSaveButton} onButtonClick={handleSaveButtonClick} />
        </div>
        <Input
          readOnly={editMode}
          size='lg'
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
              <Input
                readOnly={editMode}
                size='sm'
                value={editedSchool.technology}
                onInputChange={value => handleInputChange('technology', value)}
                placeholder='Entrer une technologie'
              />
            </PropertyValue>
          </Property>
          <Property>
            <PropertyLabel>
              <AiOutlineTag />
              <span>Niveau</span>
            </PropertyLabel>
            <LevelDropdown
              editMode={editMode}
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
              <Input
                readOnly={editMode}
                size='sm'
                value={editedSchool.githubLink}
                onInputChange={value => handleInputChange('githubLink', value)}
                placeholder='Entrer un lien Github'
              />
            </PropertyValue>
          </Property>
          <Property>
            <PropertyLabel>
              <AiOutlineLink />
              <span>Drive</span>
            </PropertyLabel>
            <PropertyValue>
              <Input
                readOnly={editMode}
                size='sm'
                value={editedSchool.driveLink}
                onInputChange={value => handleInputChange('driveLink', value)}
                placeholder='Entrer un lien Drive'
              />
            </PropertyValue>
          </Property>
          <Property>
            <PropertyLabel>
              <AiFillClockCircle />
              <span>Durée</span>
            </PropertyLabel>
            <PropertyValue>
              <Input
                readOnly={editMode}
                size='sm'
                type='number'
                min={0}
                step={0.5}
                value={editedSchool.duration}
                onInputChange={value => handleInputChange('duration', Number(value))}
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
              readOnly={editMode}
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
              readOnly={editMode}
            />
          </Property>
          <Property>
            <PropertyLabel>
              <AiFillPushpin />
              <span>Lieu de La dernière session</span>
            </PropertyLabel>
            <Input
              readOnly={editMode}
              size='sm'
              value={editedSchool.lastSessionLocation}
              onInputChange={value => handleInputChange('lastSessionLocation', value)}
              placeholder='Entrer un lieu'
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
                readonly={editMode}
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
                readonly={editMode}
              />
            </PropertyValue>
          </Property>
        </Properties>
        <SchoolPublicSummaryTextArea
          publicSummary={editedSchool.publicSummary}
          onTextAreaChange={value => handleInputChange('publicSummary', value)}
          editMode={editMode}
        />
      </div>
    </div>
  );
}
