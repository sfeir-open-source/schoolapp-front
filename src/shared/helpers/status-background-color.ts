export const getStatusBackgroundColor = (status: string) => {
  if (status === 'active') {
    return 'bg-green-200';
  }
  if (status === 'abandoned') {
    return 'bg-slate-200';
  }
  if (status === 'rejected') {
    return 'bg-red-200';
  }
  if (status === 'proposal') {
    return 'bg-blue-200';
  }
  if (status === 'wish') {
    return 'bg-orange-200';
  }
};
