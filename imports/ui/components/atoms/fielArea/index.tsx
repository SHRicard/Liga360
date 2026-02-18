import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextField, useTheme } from '@mui/material';

interface FieldAreaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  variant?: 'standard' | 'outlined' | 'filled';
  fullWidth?: boolean;
  helperText?: string;
  size?: 'small' | 'medium';
}

export const FieldArea = <T extends FieldValues>({
  name,
  control,
  label = 'Descripción',
  placeholder = 'Ingresa un texto',
  disabled = false,
  required = false,
  minLength = 3,
  maxLength,
  rows = 4,
  variant = 'outlined',
  fullWidth = true,
  helperText,
  size = 'medium',
}: FieldAreaProps<T>) => {
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? 'Este campo es requerido' : false,
        minLength: {
          value: minLength,
          message: `Debe tener al menos ${minLength} caracteres`,
        },
        ...(maxLength && {
          maxLength: {
            value: maxLength,
            message: `Debe tener máximo ${maxLength} caracteres`,
          },
        }),
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          placeholder={placeholder}
          multiline
          rows={rows}
          autoComplete="off"
          disabled={disabled}
          variant={variant}
          fullWidth={fullWidth}
          size={size}
          error={!!error}
          helperText={error ? error.message : helperText}
          sx={{
            '& .MuiInputBase-input': {
              padding: size === 'small' ? '6px 8px' : undefined,
              fontSize: size === 'small' ? '0.875rem' : undefined,
            },
            '& .MuiInputLabel-root': {
              fontSize: size === 'small' ? '0.875rem' : undefined,
            },
            '& .MuiFormHelperText-root': {
              fontSize: size === 'small' ? '0.7rem' : undefined,
              marginTop: size === 'small' ? '4px' : undefined,
            },
          }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            htmlInput: {
              autoComplete: 'off',
              'data-form-type': 'other',
            },
          }}
        />
      )}
    />
  );
};
