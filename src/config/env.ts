interface EnvConfig {
  appName: string;
  appEnv: 'development' | 'production' | 'test';
  appMode: 'full' | 'ui-only';
  apiBaseUrl: string;
  mockApiBaseUrl: string;
  googleClientId: string;
  facebookAppId: string;
}

const envConfig: EnvConfig = {
  appName: import.meta.env.VITE_APP_NAME || 'WebBanHangAus',
  appEnv: (import.meta.env.VITE_APP_ENV || 'development') as EnvConfig['appEnv'],
  appMode: (import.meta.env.VITE_APP_MODE || 'full') as EnvConfig['appMode'],
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  mockApiBaseUrl: import.meta.env.VITE_MOCK_API_BASE_URL || 'http://localhost:3001/api',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  facebookAppId: import.meta.env.VITE_FACEBOOK_APP_ID || '',
};

export const isDevelopment = envConfig.appEnv === 'development';
export const isProduction = envConfig.appEnv === 'production';
export const isUIMode = envConfig.appMode === 'ui-only';

export default envConfig; 