import React, { useState } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextField, InputAdornment, IconButton, useTheme } from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';

interface FieldPasswordProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  variant?: 'standard' | 'outlined' | 'filled';
  fullWidth?: boolean;
  helperText?: string;
  size?: 'small' | 'medium';
}

export const FieldPassword = <T extends FieldValues>({
  name,
  control,
  label = 'Contraseña',
  placeholder = 'Ingresa tu contraseña',
  disabled = false,
  required = true,
  minLength = 6,
  variant = 'outlined',
  fullWidth = true,
  helperText = 'Mínimo 6 caracteres',
  size = 'medium',
}: FieldPasswordProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? 'La contraseña es requerida' : false,
        minLength: {
          value: minLength,
          message: `Debe tener al menos ${minLength} caracteres`,
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
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
              autoComplete: 'new-password',
              'data-form-type': 'other',
            },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock
                    sx={{
                      color: error
                        ? theme.custom.input.iconColorError
                        : theme.custom.input.iconColor,
                      transition: 'color 0.3s ease',
                      fontSize: size === 'small' ? '1.1rem' : '1.5rem',
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    onMouseDown={e => e.preventDefault()}
                    edge="end"
                    disabled={disabled}
                    size={size === 'small' ? 'small' : 'medium'}
                    sx={{
                      color: error
                        ? theme.custom.input.iconColorError
                        : theme.custom.input.iconColor,
                      transition: 'color 0.3s ease',
                      '& .MuiSvgIcon-root': {
                        fontSize: size === 'small' ? '1.1rem' : '1.5rem',
                      },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
};
