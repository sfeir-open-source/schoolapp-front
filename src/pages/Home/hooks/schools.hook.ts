import { useQuery } from 'react-query';
import { School } from '../../../shared/interfaces/schools.interface';

export const useSchools = () => 
useQuery<boolean, Error, School[]>('repoData', () => fetch('/fake-api/Schools.json').then((res) => res.json()));
