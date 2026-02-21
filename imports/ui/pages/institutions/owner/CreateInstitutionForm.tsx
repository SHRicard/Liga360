import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { useForm, useWatch } from 'react-hook-form';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import MapIcon from '@mui/icons-material/Map';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SignpostIcon from '@mui/icons-material/Signpost';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  Card,
  FieldText,
  FieldArea,
  FieldLogo,
  StepperHorizontal,
  StepperHorizontalButtons,
  CardInstitucion360,
  CardSede360,
} from '../../../components';
import type { HorizontalStepItem } from '../../../components';

interface ICreateInstitutionForm {
  institutionName: string;
  description: string;
  phone: string;
  logo: File | null;
  branchName: string;
  address: string;
  betweenStreets: string;
  zipCode: string;
  district: string;
  city: string;
}

interface CreateInstitutionFormProps {
  onFinish: (data: ICreateInstitutionForm) => void;
  onCancel: () => void;
}

export const CreateInstitutionForm: React.FC<CreateInstitutionFormProps> = ({
  onFinish,
  onCancel,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const { control, handleSubmit, trigger } = useForm<ICreateInstitutionForm>({
    defaultValues: {
      institutionName: 'Alummni',
      description:
        'Alummni es un club de fútbol para chicos y grandes, con canchas de 5 vs 5 y 11 vs 11. Un espacio para entrenar, competir y disfrutar del deporte en comunidad.',
      phone: '1132716458',
      logo: null,
      branchName: 'zona 0',
      address: 'riglos 3879',
      betweenStreets: 'juan b. justo',
      zipCode: '1759',
      district: 'la Matanza',
      city: 'Gonzales catan',
    },
    mode: 'onChange',
  });

  const formValues = useWatch({ control });

  const handleNext = async () => {
    let isValid = false;
    if (activeStep === 0) {
      isValid = await trigger(['institutionName']);
    } else if (activeStep === 1) {
      isValid = await trigger([
        'branchName',
        'address',
        'zipCode',
        'district',
        'city',
      ]);
    } else {
      isValid = true;
    }
    if (isValid) {
      setActiveStep(prev => Math.min(prev + 1, 2));
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      onCancel();
    } else {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleFinishStep = () => {
    handleSubmit(onFinish)();
  };

  const steps: HorizontalStepItem[] = [
    {
      label: 'Tu Institución',
      icon: <BusinessIcon />,
      content: (
        <Stack spacing={1.5} alignItems="center">
          <FieldLogo
            name="logo"
            control={control}
            label=""
            size="medium"
            previewSize={64}
          />
          <FieldText
            name="institutionName"
            control={control}
            label="Nombre"
            placeholder="Ej: Club Deportivo Norte"
            fullWidth
            size="small"
            icon={<BusinessIcon />}
            required
            minLength={3}
            maxLength={60}
          />
          <FieldArea
            name="description"
            control={control}
            label="Descripción (opcional)"
            placeholder="Contanos sobre tu institución..."
            size="small"
            rows={2}
            maxLength={200}
          />
          <FieldText
            name="phone"
            control={control}
            label="Teléfono (opcional)"
            placeholder="Ej: 11 1234-5678"
            fullWidth
            size="small"
            icon={<PhoneIcon />}
            maxLength={20}
          />
        </Stack>
      ),
    },
    {
      label: 'Primera Sede',
      icon: <LocationOnIcon />,
      content: (
        <Stack spacing={1.5}>
          <FieldText
            name="branchName"
            control={control}
            label="Nombre de la sede"
            placeholder="Ej: Sede Central"
            fullWidth
            size="small"
            icon={<BusinessIcon />}
            required
            minLength={3}
            maxLength={60}
          />
          <FieldText
            name="address"
            control={control}
            label="Dirección"
            placeholder="Calle y número"
            fullWidth
            size="small"
            icon={<LocationOnIcon />}
            required
          />
          <FieldText
            name="betweenStreets"
            control={control}
            label="Entre calles (opcional)"
            placeholder="Ej: Juan B. Justo y Av. Cristianía"
            fullWidth
            size="small"
            icon={<SignpostIcon />}
          />
          <FieldText
            name="city"
            control={control}
            label="Ciudad / Localidad"
            placeholder="Ej: González Catán"
            fullWidth
            size="small"
            icon={<LocationCityIcon />}
            required
          />
          <FieldText
            name="district"
            control={control}
            label="Partido"
            placeholder="Ej: La Matanza"
            fullWidth
            size="small"
            icon={<MapIcon />}
            required
          />
          <FieldText
            name="zipCode"
            control={control}
            label="Código Postal"
            placeholder="Ej: 1759"
            fullWidth
            size="small"
            icon={<MarkunreadMailboxIcon />}
            required
          />
        </Stack>
      ),
    },
    {
      label: '',
      icon: <CheckCircleOutlineIcon />,
      content: (
        <Stack spacing={1.5}>
          <CardInstitucion360
            institutionName={formValues?.institutionName}
            description={formValues?.description}
            phone={formValues?.phone}
            logo={formValues?.logo}
            skeleton
          />
          <CardSede360
            branchName={formValues?.branchName}
            address={formValues?.address}
            betweenStreets={formValues?.betweenStreets}
            zipCode={formValues?.zipCode}
            district={formValues?.district}
            city={formValues?.city}
            phone={formValues?.phone}
            logo={formValues?.logo}
            skeleton
          />
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit(onFinish)}>
        <Stack spacing={1.5}>
          {/* Stepper header */}
          <Card>
            <StepperHorizontal steps={steps} activeStep={activeStep} />
          </Card>

          {/* Todas las secciones lado a lado */}
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            {steps.map((step, index) => (
              <Card
                key={step.label}
                sx={{
                  flex: 1,
                  opacity: index <= activeStep ? 1 : 0.4,
                  pointerEvents: index <= activeStep ? 'auto' : 'none',
                  transition: 'opacity 0.3s ease',
                }}
                padding={2}
              >
                <Typography
                  variant="caption"
                  fontWeight={700}
                  color={
                    index === activeStep ? 'primary.main' : 'text.secondary'
                  }
                  sx={{
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    mb: 1.5,
                    display: 'block',
                  }}
                >
                  {step.label}
                </Typography>
                {step.content}
              </Card>
            ))}
          </Stack>

          {/* Botones */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <StepperHorizontalButtons
              activeStep={activeStep}
              totalSteps={steps.length}
              onNext={handleNext}
              onBack={handleBack}
              onFinish={handleFinishStep}
              nextButtonText="Siguiente"
              backButtonText={activeStep === 0 ? 'Cancelar' : 'Atrás'}
              finishButtonText="Crear Institución"
            />
          </Box>
        </Stack>
      </form>
    </Box>
  );
};
