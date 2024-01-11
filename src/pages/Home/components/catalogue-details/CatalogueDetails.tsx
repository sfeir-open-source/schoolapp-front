import { useParams } from 'react-router-dom';
import { useGetSchool } from '../../hooks/schools.hook';
import { AiFillClockCircle } from 'react-icons/ai';
import { useAuth } from '../../../../core/authentification/auth.hook';

export const CatalogueDetails: React.FC = () => {
  const { id } = useParams();

  const { data: school, error, isLoading } = useGetSchool(id);

  const user = useAuth().user;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message};</div>;
  if (school)
    return (
      <div className='g-4 mt-20 flex flex-col p-4 sm:px-12 md:px-28 lg:px-40 xl:px-80'>
        <div className='flex items-center justify-between'>
          <h1 className='text-4xl font-bold'>{school.title}</h1>
          <label
            className={`leading-sm inline-flex items-center rounded-full bg-green-200 px-3 py-1 text-xs font-bold uppercase text-green-700`}
          >
            {school.status}
          </label>
        </div>
        <div className='mb-4 flex items-center justify-between'></div>
        <div className='mb-4'>
          <div className='relative'>
            <img
              className='mb-4 h-60 w-full rounded-lg object-cover sm:h-72 lg:h-96'
              style={{ objectPosition: '0 10%' }}
              src={school.image}
              alt={`${school.title}_image`}
            ></img>
            <div className='bottom-0 flex w-full flex-col gap-4 sm:flex-row'>
              <div className='flex w-full justify-between gap-4 sm:w-auto sm:justify-start'>
                <div className='flex w-fit gap-4 rounded-lg bg-white px-2 py-2 drop-shadow-md'>
                  <div className='g-4 flex items-center'>
                    <span className='text-sm font-bold'> Teachers</span>
                  </div>
                  <img src={user?.picture} className='w-8 rounded-full' />
                </div>
                <div
                  className=' w-fit rounded-lg bg-white px-3 py-2 pr-6 drop-shadow-md'
                  style={{ display: 'grid', gridTemplateColumns: '6rem 1fr' }}
                >
                  <div className='g-4 flex items-center'>
                    <span className='text-sm font-bold'> Professors</span>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-4'>
                      <img
                        src={user?.picture}
                        className='min-w-[1.7rem] rounded-full'
                      />
                    </div>
                    <div className='w-4'>
                      <img
                        src={user?.picture}
                        className='min-w-[2rem] rounded-full border-2 border-white'
                      />
                    </div>
                    <div className='w-4'>
                      <img
                        src={user?.picture}
                        className='min-w-[2rem] rounded-full border-2 border-white'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='g-4 font-small flex w-fit items-center rounded-lg bg-white px-4 py-2 drop-shadow-md sm:ml-auto sm:justify-end'>
                <AiFillClockCircle className='mr-4' />
                <span>1 days</span>
              </div>
            </div>
          </div>
        </div>
        <div className='rounded-lg p-1 sm:bg-blue-300 md:bg-red-300 lg:bg-green-200 xl:bg-yellow-200'>
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
