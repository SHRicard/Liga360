import React, { useRef, useState } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Box, Typography, IconButton, useTheme, Avatar } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';

interface FieldLogoProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  helperText?: string;
  required?: boolean;
  /** Tamaño del preview en px */
  previewSize?: number;
  /** Tipos aceptados (default: image/*) */
  accept?: string;
  /** Tamaño máximo en MB (default: 2) */
  maxSizeMB?: number;
  size?: 'small' | 'medium';
}

export const FieldLogo = <T extends FieldValues>({
  name,
  control,
  label = 'Logo',
  helperText = 'JPG, PNG o WEBP. Máximo 2 MB.',
  required = false,
  previewSize = 72,
  accept = 'image/jpeg,image/png,image/webp',
  maxSizeMB = 2,
  size = 'medium',
}: FieldLogoProps<T>) => {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = (
    file: File | null,
    onChange: (value: any) => void
  ) => {
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onChange(file);
  };

  const handleRemove = (onChange: (value: any) => void) => {
    setPreview(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const fontSize = size === 'small' ? '0.75rem' : '0.875rem';
  const helperFontSize = size === 'small' ? '0.65rem' : '0.75rem';
  const iconSize = size === 'small' ? previewSize * 0.8 : previewSize;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? 'Este campo es requerido' : false,
      }}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Box>
          <Typography
            variant="caption"
            sx={{
              mb: 0.5,
              display: 'block',
              fontSize,
              color: error ? 'error.main' : 'text.secondary',
            }}
          >
            {label}
            {required && ' *'}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {/* Preview / Placeholder */}
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <Box
                onClick={handleClick}
                sx={{
                  width: preview ? iconSize * 1.4 : iconSize,
                  height: preview ? iconSize * 1.4 : iconSize,
                  borderRadius: 2,
                  border: preview ? 'none' : '2px dashed',
                  borderColor: error ? 'error.main' : 'divider',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  bgcolor: preview ? 'transparent' : 'action.hover',
                  '&:hover': {
                    ...(!preview && {
                      borderColor: 'primary.main',
                      bgcolor: 'action.selected',
                    }),
                  },
                }}
              >
                {preview ? (
                  <Avatar
                    src={preview}
                    variant="rounded"
                    sx={{
                      width: '100%',
                      height: '100%',
                      '& img': { objectFit: 'contain' },
                    }}
                  />
                ) : (
                  <AddPhotoAlternateIcon
                    sx={{
                      fontSize: iconSize * 0.45,
                      color: error
                        ? 'error.main'
                        : theme.custom?.input?.iconColor || 'text.secondary',
                    }}
                  />
                )}
              </Box>

              {/* Botón borrar flotante */}
              {preview && (
                <IconButton
                  size="small"
                  onClick={() => handleRemove(onChange)}
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    bgcolor: 'error.main',
                    color: '#fff',
                    p: 0.4,
                    '&:hover': {
                      bgcolor: 'error.dark',
                    },
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  }}
                >
                  <DeleteIcon sx={{ fontSize: '0.85rem' }} />
                </IconButton>
              )}
            </Box>

            {/* Helper text */}
            <Typography
              variant="caption"
              color={error ? 'error.main' : 'text.secondary'}
              sx={{ fontSize: helperFontSize, textAlign: 'center' }}
            >
              {error ? error.message : helperText}
            </Typography>
          </Box>

          {/* Input oculto */}
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            hidden
            onChange={e => {
              const file = e.target.files?.[0] || null;
              handleFileChange(file, onChange);
            }}
          />
        </Box>
      )}
    />
  );
};
