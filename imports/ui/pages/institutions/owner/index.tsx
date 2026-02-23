import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Box } from '@mui/material';
import { CreateInstitutionForm } from './CreateInstitutionForm';
import { InstitutionDashboard } from './InstitutionDashboard';
import { useInstitutionStore } from '../../../contexts';
import { Loading } from '../../../components';
import { fileToBase64 } from '../../../helpers';

export const OwnerInstitutions = () => {
  const institutions = useInstitutionStore(s => s.institutions);
  const isLoading = useInstitutionStore(s => s.isLoading);
  const [isCreating, setIsCreating] = useState(false);

  const hasInstitution = institutions.length > 0;
  const institution = hasInstitution ? institutions[0] : null;

  if (isLoading || isCreating) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Loading
          size="lg"
          message={isCreating ? 'Creando institución...' : 'Cargando...'}
        />
      </Box>
    );
  }

  const handleFinish = async (data: {
    institutionName: string;
    description: string;
    logo: File | null;
  }) => {
    try {
      setIsCreating(true);

      const logoBase64 = data.logo ? await fileToBase64(data.logo) : undefined;

      await Meteor.callAsync('institutions.create', {
        name: data.institutionName,
        description: data.description || undefined,
        logoBase64,
      });

      // El store se actualiza solo vía pub/sub tras la inserción
    } catch (error: any) {
      console.error('Error al crear institución:', error);
      alert(error?.reason ?? 'Error al crear la institución');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Box>
      {!hasInstitution && <CreateInstitutionForm onFinish={handleFinish} />}

      {hasInstitution && institution && (
        <InstitutionDashboard
          institutionName={institution.name}
          branchName="Sede principal"
        />
      )}
    </Box>
  );
};
