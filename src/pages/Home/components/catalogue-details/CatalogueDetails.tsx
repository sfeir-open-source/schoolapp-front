import { useParams } from 'react-router-dom';
import { useGetSchool } from '../../hooks/schools.hook';
import { AiFillClockCircle, AiOutlineBook } from 'react-icons/ai';
import { useAuth } from '../../../../core/authentification/auth.hook';

export const CatalogueDetails: React.FC = () => {
  const { id } = useParams();

  const { data: school, error, isLoading } = useGetSchool(Number(id));

  const user = useAuth().user;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message};</div>;
  if (school)
    return (
      <div className='g-4 flex flex-col px-[27rem]'>
        <div className='flex items-center justify-between'>
          <h1 className='text-4xl font-bold'>{school.title}</h1>
          <label
            className={`w-fit rounded-lg bg-slate-200 py-1 px-3 text-sm font-medium`}
          >
            {school.status}
          </label>
        </div>
        <div className='mb-4 flex items-center  justify-between'></div>
        <div className='flex items-center justify-between'>
          <div className='mb-4 flex gap-4'>
            <div
              className=' w-fit rounded-lg bg-white px-4 py-2 shadow-sm'
              style={{ display: 'grid', gridTemplateColumns: '6rem 1fr' }}
            >
              <div className='g-4 flex items-center'>
                <span className='text-sm font-bold'> Teachers</span>
              </div>
              <img src={user?.picture} className='w-8 rounded-full' />
            </div>
            <div
              className=' w-fit rounded-lg bg-white px-3 py-2 shadow-sm'
              style={{ display: 'grid', gridTemplateColumns: '6rem 1fr' }}
            >
              <div className='g-4 flex items-center'>
                <span className='text-sm font-bold'> Professors</span>
              </div>
              <img src={user?.picture} className='w-8 rounded-full' />
            </div>
          </div>
          <div className='g-4 font-small flex w-fit items-center rounded-lg bg-white px-4 py-2 shadow-sm'>
            <AiFillClockCircle className='mr-4' />
            <span>1 days</span>
          </div>
        </div>
        <div>
          <img
            className='mb-4 rounded-lg'
            src={school.image}
            alt={`${school.title}_image`}
          ></img>
        </div>
        <div className='rounded-lg p-1'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab,
          asperiores nam quisquam dolore corporis earum officia incidunt,
          dolorum sed alias minima aut rerum soluta provident qui? Nisi aut
          voluptate ipsum?
          <br />
          <br />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab,
          asperiores nam quisquam dolore corporis earum officia incidunt,
          dolorum sed alias minima aut rerum soluta provident qui? Nisi aut
          voluptate ipsum?
          <br />
          <br />
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab,
          asperiores nam quisquam dolore corporis earum officia incidunt,
          dolorum sed alias minima aut rerum soluta provident qui? Nisi aut
          voluptate ipsum?
          <br />
          <br />
        </div>
      </div>
    );

  return <div>Catalogue</div>;
};
