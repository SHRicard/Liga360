import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextField, InputAdornment, useTheme } from '@mui/material';

interface FieldTextProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  variant?: 'standard' | 'outlined' | 'filled';
  fullWidth?: boolean;
  helperText?: string;
  icon?: React.ReactNode;
  size?: 'small' | 'medium';
}

export const FieldText = <T extends FieldValues>({
  name,
  control,
  label = 'Texto',
  placeholder = 'Ingresa un texto',
  disabled = false,
  required = true,
  minLength = 3,
  maxLength,
  variant = 'outlined',
  fullWidth = true,
  helperText = 'Mínimo 3 caracteres',
  icon,
  size = 'medium',
}: FieldTextProps<T>) => {
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
          type="text"
          autoComplete="off"
          disabled={disabled}
          variant={variant}
          fullWidth={fullWidth}
          size={size}
          error={!!error}
          helperText={error ? error.message : helperText}
          sx={{
            '& .MuiInputBase-root': {
              height: size === 'small' ? '36px' : 'auto',
            },
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
            htmlInput: {
              autoComplete: 'off',
              'data-form-type': 'other',
            },
            input: icon
              ? {
                  startAdornment: (
                    <InputAdornment position="start">
                      {React.isValidElement(icon)
                        ? React.cloneElement(icon as React.ReactElement, {
                            sx: {
                              color: error
                                ? theme.custom.input.iconColorError
                                : theme.custom.input.iconColor,
                              transition: 'color 0.3s ease',
                              fontSize: size === 'small' ? '1.1rem' : '1.5rem',
                              ...(icon.props as any)?.sx,
                            },
                          })
                        : icon}
                    </InputAdornment>
                  ),
                }
              : undefined,
          }}
        />
      )}
    />
  );
};
