import * as React from 'react';

import { cn } from '@/lib/utils';
import clsx from 'clsx';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, readOnly, ...props }, ref) => {
    const readOnlyClasses = clsx({
      'border border-input': !readOnly,
      'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2': !readOnly,
      'border-0 !cursor-default !text-slate-600 !opacity-100': readOnly,
    });
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          readOnlyClasses,
          className
        )}
        ref={ref}
        disabled={readOnly}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
