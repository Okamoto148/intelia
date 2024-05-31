import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from './Input';
import axios from 'axios';

const steps = ['Dados Pessoais', 'Endereço', 'Contato'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [name, setName] = React.useState('');
  const [birthday, setBirthday] = React.useState('');
  const [CEP, setCEP] = React.useState('');
  const [endereco, setEndereco] = React.useState('');
  const [error, setError] = React.useState('');
  const [rua, setRua] = React.useState('');

  React.useEffect(() => {
    if (CEP.length === 8) {
      axios.get(`https://viacep.com.br/ws/${CEP}/json/`)
        .then((response) => {
          console.log(response.data);
          setEndereco(response.data);
		  setRua(response.data.logradouro);
        });
    }
  }, [CEP]);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Função Capitalize
  function capitalizeWords(sentence) {
    return sentence.toLowerCase().replace(/\b\w+/g, (match) => {
      if (match.toLowerCase() === 'de' || match.toLowerCase() === 'e' || match.toLowerCase() === 'da') {
        return match.toLowerCase();
      } else {
        return match.charAt(0).toUpperCase() + match.slice(1);
      }
    });
  }

  // Máscara da data de nascimento
const handleBirthdayChange = (rawValue) => {
  const cleanedValue = rawValue.replace(/\D/g, ''); 
  let maskedValue = '';
  console.log('handleBirthdayChange funcionando');

  if (cleanedValue.length <= 6) {
    maskedValue = cleanedValue.replace(/(\d{2})(\d{1,2})/, '$1/$2');
  } else {
    maskedValue = cleanedValue.replace(/(\d{2})(\d{2})(\d{1,2})/, '$1/$2/$3');
  }
  console.log('maskedValue', maskedValue);

  if (cleanedValue.length <= 8){
	setBirthday(maskedValue);
  }
};



  /* Validador de data
  const validateDate = (date) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(date)) {
      return false;
    }

    const [day, month, year] = date.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  };

  const handleBirthdayBlur = () => {
    if (!validateDate(birthday)) {
      setError('Data inválida. Use o formato DD/MM/AAAA.');
    } else {
      setError('');
    }
  };*/

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption"></Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Cadastro Completo
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>{steps[activeStep]}</Typography>
          {activeStep === 0 &&
            <>
              <div>
                <Input activeStep={activeStep} value={name} icon1={true} onChangeInput={(e) => setName(capitalizeWords(e))} label='Nome' />
                <Input activeStep={activeStep} value2={birthday} icon2={true} onChangeInput2={handleBirthdayChange} label='Data de nascimento' />
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
            </>}
          {activeStep === 1 &&
            <>
              <div>
                <Input activeStep={activeStep} value={CEP} icon1={true} onChangeInput={(e) => setCEP(e)} label='CEP' />
				<Input activeStep={activeStep} value={rua} icon2={true} onChangeInput2={(e) => setRua(e)} label='Endereço' />
              </div>
            </>}
          {activeStep === 2 &&
            <>
              <div>
                <Input activeStep={activeStep} value={name} icon1={true} onChangeInput={(e) => setName(capitalizeWords(e))} label='Nome' />
                <Input activeStep={activeStep} value={birthday} icon2={true} onChangeInput2={(e) => setBirthday(handleBirthdayChange(e))} label='Data de nascimento' />
              </div>
            </>}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Voltar
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
