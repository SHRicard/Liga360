import React from 'react';
import {
  Box,
  Stepper as MuiStepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import type { StepIconProps } from '@mui/material/StepIcon';
import { BtnGeneral } from '../../atoms';

/* ───────── Tipos ───────── */

export interface HorizontalStepItem {
  label: string;
  icon: React.ReactElement;
  content: React.ReactNode;
}

interface StepperHorizontalProps {
  steps: HorizontalStepItem[];
  activeStep: number;
  onNext?: () => void;
  onBack?: () => void;
  onFinish?: () => void;
  nextButtonText?: string;
  backButtonText?: string;
  finishButtonText?: string;
}

/* ───────── Connector estilizado ───────── */

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 11,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.success.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.12)'
        : 'rgba(0,0,0,0.12)',
    borderRadius: 1,
  },
}));

/* ───────── Step Icon estilizado ───────── */

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.08)'
      : 'rgba(0,0,0,0.08)',
  zIndex: 1,
  color:
    theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.4)'
      : 'rgba(0,0,0,0.35)',
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  variants: [
    {
      props: ({ ownerState }: { ownerState: { active?: boolean } }) =>
        ownerState.active,
      style: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: `0 0 0 3px ${theme.palette.mode === 'dark' ? 'rgba(144,202,249,0.25)' : 'rgba(25,118,210,0.20)'}`,
      },
    },
    {
      props: ({ ownerState }: { ownerState: { completed?: boolean } }) =>
        ownerState.completed,
      style: {
        backgroundColor: theme.palette.success.main,
        color: '#fff',
      },
    },
  ],
}));

/* ───────── Componente ───────── */

export const StepperHorizontal: React.FC<StepperHorizontalProps> = ({
  steps,
  activeStep,
}) => {
  const createStepIcon =
    (icons: Record<string, React.ReactElement>) => (props: StepIconProps) => {
      const { active, completed, className } = props;
      return (
        <ColorlibStepIconRoot
          ownerState={{ completed, active }}
          className={className}
        >
          {completed ? (
            <Check sx={{ fontSize: 13 }} />
          ) : (
            React.cloneElement(icons[String(props.icon)] || <></>, {
              sx: { fontSize: 13 },
            })
          )}
        </ColorlibStepIconRoot>
      );
    };

  /* Mapa de íconos por índice (1-based) */
  const iconMap: Record<string, React.ReactElement> = {};
  steps.forEach((step, i) => {
    iconMap[String(i + 1)] = step.icon;
  });

  const StepIconComponent = createStepIcon(iconMap);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header horizontal */}
      <MuiStepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        sx={{
          '& .MuiStepLabel-label': { mt: '4px !important', fontSize: '0.7rem' },
          '& .MuiStep-root': { px: 0.5 },
        }}
      >
        {steps.map(step => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={StepIconComponent}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </MuiStepper>
    </Box>
  );
};

/* ───────── Sub-componentes utilitarios ───────── */

export const StepperHorizontalContent: React.FC<{
  steps: HorizontalStepItem[];
  activeStep: number;
}> = ({ steps, activeStep }) => <Box>{steps[activeStep]?.content}</Box>;

export const StepperHorizontalButtons: React.FC<{
  activeStep: number;
  totalSteps: number;
  onNext?: () => void;
  onBack?: () => void;
  onFinish?: () => void;
  nextButtonText?: string;
  backButtonText?: string;
  finishButtonText?: string;
}> = ({
  activeStep,
  totalSteps,
  onNext,
  onBack,
  onFinish,
  nextButtonText = 'Siguiente',
  backButtonText = 'Atrás',
  finishButtonText = 'Finalizar',
}) => {
  const isLastStep = activeStep === totalSteps - 1;

  const handleNext = () => {
    if (isLastStep && onFinish) {
      onFinish();
    } else if (onNext) {
      onNext();
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {activeStep >= 0 && (
        <BtnGeneral
          type="cancel"
          variant="outlined"
          onClick={onBack}
          size="small"
        >
          {backButtonText}
        </BtnGeneral>
      )}
      <BtnGeneral
        type="primary"
        onClick={handleNext}
        size="small"
        sx={{ ml: 'auto' }}
      >
        {isLastStep ? finishButtonText : nextButtonText}
      </BtnGeneral>
    </Box>
  );
};
