'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Timestamp } from 'firebase/firestore';
import { SelectSingleEventHandler } from 'react-day-picker';

interface Props {
  selectedDate: Timestamp | null;
  onDateSelect: (date: Timestamp) => void;
}

export function DatePicker({ selectedDate, onDateSelect }: Props) {
  if (!selectedDate) return null;
  const date = selectedDate.toDate();

  const handleDateChange: SelectSingleEventHandler = (date: Date | undefined) => {
    if (!date) return;
    onDateSelect(Timestamp.fromDate(date));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon />
          {date ? format(date, 'dd/MM/yyyy') : <span>Selectionne une date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar mode='single' selected={date} onSelect={handleDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
