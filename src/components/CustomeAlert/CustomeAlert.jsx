import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import {colors} from '../../styles/style';

let alertRef;

export const ALERT_TYPES = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  INFO: 'INFO',
  DEFAULT: 'DEFAULT',
};

export const AlertService = {
  show: ({title, message, onConfirm, onCancel, type, showCancel}) => {
    if (alertRef) {
      alertRef.showAlert(title, message, onConfirm, onCancel, type, showCancel);
    }
  },
  hide: () => {
    if (alertRef) {
      alertRef.hideAlert();
    }
  },
};

export const AlertProvider = ({children}) => {
  const [show, setShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({
    title: '',
    message: '',
    showCancel: false,
    type: ALERT_TYPES.DEFAULT,
    onConfirm: () => {},
    onCancel: () => {},
  });

  alertRef = {
    showAlert: (title, message, onConfirm, onCancel, type, showCancel) => {
      setAlertData({title, message, onConfirm, onCancel, type, showCancel});
      setShow(true);
    },
    hideAlert: () => {
      setShow(false);
    },
  };

  return (
    <>
      {children}
      <AwesomeAlert
        show={show}
        showProgress={false}
        title={alertData.title}
        message={alertData.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={alertData.showCancel}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes"
        confirmButtonColor={
          alertData.type === ALERT_TYPES.ERROR
            ? 'red'
            : alertData.type === ALERT_TYPES.SUCCESS ||
              alertData.type === ALERT_TYPES.DEFAULT
            ? 'green'
            : alertData.type === ALERT_TYPES.WARNING
            ? colors.textOrange
            : alertData.type === ALERT_TYPES.INFO && colors.textOrange
        }
        onCancelPressed={() => {
          alertData.onCancel && alertData.onCancel();
          setShow(false);
        }}
        onConfirmPressed={() => {
          alertData.onConfirm && alertData.onConfirm();
          setShow(false);
        }}
      />
    </>
  );
};
