import React, { useState } from 'react';
import { Box } from '@mui/material';
import { WelcomeCard } from './WelcomeCard';
import { CreateInstitutionForm } from './CreateInstitutionForm';
import { InstitutionDashboard } from './InstitutionDashboard';

type OwnerView = 'welcome' | 'creating' | 'dashboard';

interface InstitutionData {
  institutionName: string;
  branchName: string;
}

export const OwnerInstitutions = () => {
  const [view, setView] = useState<OwnerView>('welcome');
  const [institutionData, setInstitutionData] =
    useState<InstitutionData | null>(null);

  const handleStart = () => setView('creating');

  const handleCancel = () => setView('welcome');

  const handleFinish = (data: any) => {
    console.log('📦 Datos a enviar:', data);
    setInstitutionData({
      institutionName: data.institutionName,
      branchName: data.branchName,
    });
    setView('dashboard');
  };

  return (
    <Box>
      {view === 'welcome' && <WelcomeCard onStart={handleStart} />}

      {view === 'creating' && (
        <CreateInstitutionForm
          onFinish={handleFinish}
          onCancel={handleCancel}
        />
      )}

      {view === 'dashboard' && institutionData && (
        <InstitutionDashboard
          institutionName={institutionData.institutionName}
          branchName={institutionData.branchName}
        />
      )}
    </Box>
  );
};
