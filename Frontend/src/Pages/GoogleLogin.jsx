import React from 'react';
import { GoogleLogin as GoogleLoginButton } from '@react-oauth/google';
import {jwt_decode} from 'jwt-decode'

const GoogleLoginComponent = () => {
  return (
    <GoogleLoginButton
      onSuccess={(credentialResponse) => {
        try {
          if (credentialResponse.credential) {
            const decodedToken = jwt_decode(credentialResponse.credential);
            console.log(decodedToken);
          } else {
            console.error('No credential received');
          }
        } catch (error) {
          console.error('Error decoding JWT:', error);
        }
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};

export default GoogleLoginComponent;
