import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faChalkboardTeacher,
  faCreditCard,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons';
import { Messages } from '../../lib/messages';
import { TypographyCapitalize } from '../../components/Text/Typography';
import { FC } from 'react';
import { AppStepConnector } from '../../components/Step';

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <FontAwesomeIcon icon={faCartShopping} />,
    2: <FontAwesomeIcon icon={faListCheck} />,
    3: <FontAwesomeIcon icon={faCreditCard} />,
    4: <FontAwesomeIcon icon={faChalkboardTeacher} />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  Messages.cart.name,
  Messages.order.confirm,
  Messages.action.pay,
  'Vào học',
];

type OrderStepperProps = {
  step?: number;
};

export const OrderStepper: FC<OrderStepperProps> = ({ step = 0 }) => {
  return (
    <Stepper
      alternativeLabel
      activeStep={step}
      connector={<AppStepConnector />}
    >
      {steps.map(label => (
        <Step key={label}>
          <StepLabel StepIconComponent={ColorlibStepIcon}>
            <TypographyCapitalize>{label}</TypographyCapitalize>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
