import { School } from '../interfaces/schools.interface';

export const getFilteredSchools = (schools: School[] | undefined, searchTerm: string) => {
  if (!schools) return [];
  return schools.filter(school => school.title.toLowerCase().includes(searchTerm.toLowerCase()));
};
