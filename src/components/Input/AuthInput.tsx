import { ComponentProps } from 'react';
import { Input } from '../ui/input';

export const AuthInput = (props: ComponentProps<'input'>) => {
  return (
    <Input
      {...props}
      className='rounded-none border-0 border-b px-0 border-b-gray-400 transition duration-300 ease-in-out focus-visible:border-b-blue-500 focus-visible:ring-0 placeholder:text-[#AAAAAA]'
    />
  );
};
