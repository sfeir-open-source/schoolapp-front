export const getStatusBackgroundColor = (status: string) => {
  if (status === 'active') {
    return 'bg-green-200 text-green-700';
  }
  if (status === 'abandoned') {
    return 'bg-slate-200 text-slate-700';
  }
  if (status === 'rejected') {
    return 'bg-red-200 )text-red-700';
  }
  if (status === 'proposal') {
    return 'bg-blue-200 text-blue-700';
  }
  if (status === 'wish') {
    return 'bg-orange-200 text-orange-700';
  }
};
