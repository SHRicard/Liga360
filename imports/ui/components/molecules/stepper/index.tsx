import React from 'react';
import {
  Box,
  Stepper as MuiStepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from '@mui/material';
import { BtnGeneral } from '../../atoms';

export interface StepItem {
  label: string;
  description?: string;
  content: React.ReactNode;
  optional?: boolean;
}

interface StepperProps {
  steps: StepItem[];
  activeStep: number;
  onNext?: () => void;
  onBack?: () => void;
  nextButtonText?: string;
  backButtonText?: string;
  finishButtonText?: string;
  showBackButton?: boolean;
  showNextButton?: boolean;
  onFinish?: () => void;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  onNext,
  onBack,
  nextButtonText = 'Siguiente',
  backButtonText = 'Atrás',
  finishButtonText = 'Finalizar',
  showBackButton = true,
  showNextButton = true,
  onFinish,
}) => {
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep && onFinish) {
      onFinish();
    } else if (onNext) {
      onNext();
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <MuiStepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                step.optional ? (
                  <Typography variant="caption">Opcional</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {step.description}
                </Typography>
              )}
              {step.content}
            </StepContent>
          </Step>
        ))}
      </MuiStepper>

      {/* Botones fuera del stepper */}
      <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
        {showBackButton && activeStep > 0 && (
          <BtnGeneral
            type="cancel"
            variant="outlined"
            onClick={handleBack}
            size="small"
          >
            {backButtonText}
          </BtnGeneral>
        )}
        {showNextButton && (
          <BtnGeneral
            type="primary"
            onClick={handleNext}
            size="small"
            sx={{ ml: 'auto' }}
          >
            {isLastStep ? finishButtonText : nextButtonText}
          </BtnGeneral>
        )}
      </Box>
    </Box>
  );
};

export default Stepper;
