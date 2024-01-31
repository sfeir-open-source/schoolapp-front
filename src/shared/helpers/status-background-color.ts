export const getStatusBackgroundColor = (status: string) => {
  const className =
    'leading-sm inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase';
  if (status === 'active') {
    return className + ' bg-green-200 text-green-700';
  }
  if (status === 'abandoned') {
    return className + ' bg-slate-200 text-slate-700';
  }
  if (status === 'rejected') {
    return className + ' bg-red-200 )text-red-700';
  }
  if (status === 'proposal') {
    return className + ' bg-blue-200 text-blue-700';
  }
  if (status === 'wish') {
    return className + ' bg-orange-200 text-orange-700';
  }
};
