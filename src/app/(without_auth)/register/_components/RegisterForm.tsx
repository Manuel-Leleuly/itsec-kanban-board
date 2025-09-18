'use client';

import { CreateUserFormSchema } from '@/api/users/models/users';
import { AuthInput } from '@/components/Input/AuthInput';
import { FieldError } from '@/components/Input/FieldError';
import { Button } from '@/components/ui/button';
import { useRegisterFormLogic } from '@/logic/useRegisterFormLogic';
import { FetchUtil } from '@/utils/fetchUtils';
import Link from 'next/link';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

export const RegisterForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { registerForm, isLoading, error } = useRegisterFormLogic();

  const getErrorMessage = () => {
    if (error) {
      const errorData = FetchUtil.parseServerActionError(error);
      return errorData.error_message;
    }
    return '';
  };

  return (
    <form
      className='space-y-4'
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        registerForm.handleSubmit();
      }}
    >
      <registerForm.Field
        name='first_name'
        validators={{ onChange: CreateUserFormSchema.shape.first_name }}
      >
        {(field) => (
          <div className='space-y-2'>
            <AuthInput
              type='text'
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => {
                e.preventDefault();
                field.handleChange(e.target.value);
              }}
              placeholder='First Name'
              className='w-full'
              disabled={isLoading}
            />
            <FieldError
              errorMessages={field.state.meta.errors.map(
                (error) => error?.message,
              )}
            />
          </div>
        )}
      </registerForm.Field>

      <registerForm.Field
        name='last_name'
        validators={{ onChange: CreateUserFormSchema.shape.last_name }}
      >
        {(field) => (
          <div className='space-y-2'>
            <AuthInput
              type='text'
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => {
                e.preventDefault();
                field.handleChange(e.target.value);
              }}
              placeholder='Last Name'
              className='w-full'
              disabled={isLoading}
            />
            <FieldError
              errorMessages={field.state.meta.errors.map(
                (error) => error?.message,
              )}
            />
          </div>
        )}
      </registerForm.Field>

      <registerForm.Field
        name='email'
        validators={{ onChange: CreateUserFormSchema.shape.email }}
      >
        {(field) => (
          <div className='space-y-2'>
            <AuthInput
              type='text'
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => {
                e.preventDefault();
                field.handleChange(e.target.value);
              }}
              placeholder='Email'
              className='w-full'
              disabled={isLoading}
            />
            <FieldError
              errorMessages={field.state.meta.errors.map(
                (error) => error?.message,
              )}
            />
          </div>
        )}
      </registerForm.Field>

      <registerForm.Field
        name='password'
        validators={{ onChange: CreateUserFormSchema.shape.password }}
      >
        {(field) => (
          <div className='space-y-2'>
            <div className='relative'>
              <AuthInput
                type={isPasswordVisible ? 'text' : 'password'}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => {
                  e.preventDefault();
                  field.handleChange(e.target.value);
                }}
                placeholder='Password'
                className='w-full'
                disabled={isLoading}
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 flex items-center pr-1'
                onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                disabled={isLoading}
              >
                {isPasswordVisible ? (
                  <FaEye className='h-4 w-4 text-muted-foreground' />
                ) : (
                  <FaEyeSlash className='h-4 w-4 text-muted-foreground' />
                )}
              </button>
            </div>
            <FieldError
              errorMessages={field.state.meta.errors.map(
                (error) => error?.message,
              )}
            />
          </div>
        )}
      </registerForm.Field>

      <registerForm.Field
        name='retype_password'
        validators={{ onChange: CreateUserFormSchema.shape.retype_password }}
      >
        {(field) => (
          <div className='space-y-2'>
            <div className='relative'>
              <AuthInput
                type={isPasswordVisible ? 'text' : 'password'}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => {
                  e.preventDefault();
                  field.handleChange(e.target.value);
                }}
                placeholder='Re-type Password'
                className='w-full'
                disabled={isLoading}
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 flex items-center pr-1'
                onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                disabled={isLoading}
              >
                {isPasswordVisible ? (
                  <FaEye className='h-4 w-4 text-muted-foreground' />
                ) : (
                  <FaEyeSlash className='h-4 w-4 text-muted-foreground' />
                )}
              </button>
            </div>
            <FieldError
              errorMessages={field.state.meta.errors.map(
                (error) => error?.message,
              )}
            />
          </div>
        )}
      </registerForm.Field>

      <div className='flex flex-col space-y-2 items-center'>
        <div className='flex items-center space-x-2 text-sm'>
          <p>Already have an account?</p>
          <Link href={'/login'}>
            <Button
              type='button'
              variant={'link'}
              className='text-blue-500 font-normal px-0'
            >
              Sign in
            </Button>
          </Link>
        </div>
        <Button
          type='submit'
          className='w-full text-xl py-2 h-fit bg-blue-500 hover:bg-blue-600 hover:cursor-pointer disabled:cursor-not-allowed'
          disabled={!registerForm.state.isFieldsValid || isLoading}
        >
          {isLoading ? 'Please wait...' : 'Register'}
        </Button>
        <em className='text-red-500 text-sm'>{getErrorMessage()}</em>
      </div>
    </form>
  );
};
