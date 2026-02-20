import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Box,
  InputBase,
  useTheme,
  useMediaQuery,
  Fade,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface SpotlightSearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export const SpotlightSearch: React.FC<SpotlightSearchProps> = React.memo(
  ({ onSearch, placeholder = 'Buscar en Liga360...' }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [expanded, setExpanded] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const l = theme.custom.layout;
    const s = l.spotlight;

    // Cmd+K / Ctrl+K para abrir
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          setExpanded(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }
        if (e.key === 'Escape' && expanded) {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [expanded]);

    const handleClick = useCallback(() => {
      setExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, []);

    const handleClose = useCallback(() => {
      setExpanded(false);
      setQuery('');
      onSearch?.('');
    }, [onSearch]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        onSearch?.(e.target.value);
      },
      [onSearch]
    );

    // En mobile mostramos solo el ícono
    if (isMobile) {
      return (
        <>
          <Box
            onClick={handleClick}
            sx={{
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px',
              cursor: 'pointer',
              backgroundColor: s.pillBg,
              '&:hover': {
                backgroundColor: s.pillHoverBg,
              },
              transition: 'background-color 0.2s ease',
            }}
          >
            <SearchIcon
              sx={{ fontSize: '1.1rem', color: theme.palette.text.secondary }}
            />
          </Box>

          {/* Overlay fullscreen en mobile — Portal para escapar del backdropFilter del TopBar */}
          {expanded &&
            createPortal(
              <Box
                onClick={handleClose}
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: theme.zIndex.modal + 10,
                  backgroundColor: l.overlay.background,
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  pt: '15vh',
                  px: 2.5,
                }}
              >
                <Box
                  onClick={e => e.stopPropagation()}
                  sx={{
                    width: '100%',
                    maxWidth: 440,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 2,
                    py: 1.5,
                    borderRadius: '16px',
                    backgroundColor: s.barBg,
                    border: `1.5px solid ${s.barBorder}`,
                    boxShadow: s.barShadow,
                  }}
                >
                  <SearchIcon
                    sx={{
                      fontSize: '1.2rem',
                      color: theme.palette.primary.main,
                      flexShrink: 0,
                    }}
                  />
                  <InputBase
                    inputRef={inputRef}
                    value={query}
                    onChange={handleChange}
                    placeholder={placeholder}
                    autoFocus
                    fullWidth
                    sx={{
                      fontSize: '1rem',
                      color: theme.palette.text.primary,
                    }}
                  />
                  <Box
                    onClick={handleClose}
                    sx={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      flexShrink: 0,
                      p: 0.5,
                      borderRadius: '8px',
                      backgroundColor: s.pillBg,
                      '&:active': {
                        backgroundColor: l.activeBg,
                      },
                    }}
                  >
                    <CloseIcon
                      sx={{
                        fontSize: '1.1rem',
                        color: theme.palette.text.secondary,
                      }}
                    />
                  </Box>
                </Box>
              </Box>,
              document.body
            )}
        </>
      );
    }

    // Desktop: Pill search bar
    return (
      <Box
        onClick={!expanded ? handleClick : undefined}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: expanded ? 2 : 1.5,
          py: 0.6,
          borderRadius: '12px',
          cursor: expanded ? 'text' : 'pointer',
          minWidth: expanded ? 320 : 200,
          maxWidth: expanded ? 420 : 240,
          backgroundColor: s.pillBg,
          border: `1.5px solid ${
            expanded ? theme.palette.primary.main + '60' : s.pillBorder
          }`,
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          '&:hover': {
            backgroundColor: s.pillHoverBg,
            borderColor: s.pillHoverBorder,
          },
        }}
      >
        <SearchIcon
          sx={{
            fontSize: '1.1rem',
            color: expanded
              ? theme.palette.primary.main
              : theme.palette.text.secondary,
            transition: 'color 0.2s ease',
          }}
        />

        {expanded ? (
          <InputBase
            inputRef={inputRef}
            value={query}
            onChange={handleChange}
            placeholder={placeholder}
            fullWidth
            sx={{
              fontSize: '0.85rem',
              color: theme.palette.text.primary,
              '& input::placeholder': {
                opacity: 0.5,
              },
            }}
            endAdornment={
              <Box
                onClick={handleClose}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  p: 0.3,
                  borderRadius: '6px',
                  '&:hover': {
                    backgroundColor: s.pillHoverBg,
                  },
                }}
              >
                <CloseIcon
                  sx={{
                    fontSize: '0.95rem',
                    color: theme.palette.text.secondary,
                  }}
                />
              </Box>
            }
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexGrow: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: '0.8rem',
                color: theme.palette.text.secondary,
                opacity: 0.6,
                userSelect: 'none',
              }}
            >
              {placeholder}
            </Typography>
            {/* Kbd shortcut */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.3,
                ml: 1,
              }}
            >
              <Typography
                component="kbd"
                sx={{
                  fontSize: '0.65rem',
                  fontFamily: 'inherit',
                  fontWeight: 600,
                  color: theme.palette.text.secondary,
                  opacity: 0.45,
                  backgroundColor: s.kbdBg,
                  borderRadius: '4px',
                  px: 0.6,
                  py: 0.15,
                  lineHeight: 1.4,
                  border: `1px solid ${s.kbdBorder}`,
                }}
              >
                ⌘K
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    );
  }
);
