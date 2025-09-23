'use client';

import { Input } from '@/components/ui/input';
import { useSearchTicketLogic } from '@/logic/useSearchTicketLogic';
import { Search } from 'lucide-react';

export const SearchBar = () => {
  const { searchForm } = useSearchTicketLogic();

  return (
    <div className='flex items-center gap-x-4 flex-1 max-w-[300px]'>
      <searchForm.Field name='searchQuery'>
        {(field) => (
          <div className='relative flex-1'>
            <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'>
              <Search className='h-4 w-4' size={15} />
            </span>
            <Input
              type='text'
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className='pl-10 h-9 text-sm bg-background'
            />
          </div>
        )}
      </searchForm.Field>
    </div>
  );
};
