import React from 'react';
import { Box } from '@mui/material';
import { UseFormHandleSubmit, FieldValues } from 'react-hook-form';

interface FieldFormProps<T extends FieldValues> {
  children: React.ReactNode;
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit: (data: T) => void;
  [key: string]: any;
}

export const FieldForm = <T extends FieldValues>({
  children,
  handleSubmit,
  onSubmit,
  ...props
}: FieldFormProps<T>) => {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      noValidate
      {...props}
    >
      {children}
    </Box>
  );
};
