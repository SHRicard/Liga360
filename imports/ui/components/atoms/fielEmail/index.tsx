import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextField, InputAdornment, useTheme } from '@mui/material';
import Email from '@mui/icons-material/Email';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
interface FieldEmailProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  fullWidth?: boolean;
  helperText?: string;
  size?: 'small' | 'medium';
}

export const FieldEmail = <T extends FieldValues>({
  name,
  control,
  label = 'Email',
  placeholder = 'ejemplo@correo.com',
  disabled = false,
  required = true,
  variant = 'outlined',
  fullWidth = true,
  helperText = 'Ingresa un email válido',
  size = 'medium',
}: FieldEmailProps<T>) => {
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? 'El email es requerido' : false,
        pattern: {
          value: EMAIL_REGEX,
          message: 'Por favor ingresa un email válido',
        },
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
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Email
                    sx={{
                      backgroundColor: 'transparent',
                      color: error
                        ? theme.custom.input.iconColorError
                        : theme.custom.input.iconColor,
                      transition: 'color 0.3s ease',
                      fontSize: size === 'small' ? '1.1rem' : '1.5rem',
                    }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
};
