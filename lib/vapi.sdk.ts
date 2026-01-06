'use client';

import Vapi from "@vapi-ai/web";

const getVapiToken = () => {
  const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
  if (!token) {
    console.warn('NEXT_PUBLIC_VAPI_WEB_TOKEN is not set. Vapi SDK may not work correctly.');
    return '';
  }
  return token;
};

export const vapi = new Vapi(getVapiToken());