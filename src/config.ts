interface GoogleConfig {
  API_KEY: string;
  CLIENT_ID: string;
  SECRET: string;
}

interface FacebookConfig {
  APP_ID: string;
}

interface ApiConfig {
  API_URL: string;
}
interface VtcMobileConfig {  
  CLIENT_ID: string;
  CLIENT_SECRET: string;
}

interface StorageConfig {  
  PREFIX: string;
  PATCH: string;
  SECRET_KEY: string;
  MAX_AGE: string;
}

interface Config {
  google: GoogleConfig;
  facebook: FacebookConfig;
  vtcMobile: VtcMobileConfig;
  api: ApiConfig;
  
  PUBLIC_URL: string;
  PUBLIC_PORT: number;

  APP_DEFAULTAUTH: string;

  APP_API_URL: string;  
  APP_CLIENT_ID: string;
  APP_CLIENT_SECRET: string;

  SERVER_DEBUG: boolean;  
  API_TIMEOUT: number;

  CDN_MODE_ENABLED: boolean;
  CDN_URL: string;

  BUILD_MODE: string;

  META_PAGE_TITLE: string;
  META_DESCRIPTION: string;
  META_KEYWORDS: string;

  storage: StorageConfig;
  tenant: TenantConfig;
}

interface TenantConfig {  
  TENANT_ID: string;
  APP_ID: string;  
}

const config: Config = {
  google: {
    API_KEY: "",
    CLIENT_ID: "",
    SECRET: "",
  },
  facebook: {
    APP_ID: "",
  },
  vtcMobile: {
    CLIENT_ID: import.meta.env.VITE_APP_CLIENT_ID,
    CLIENT_SECRET: import.meta.env.VITE_APP_CLIENT_SECRET,
  },
  api: {
    API_URL: import.meta.env.VITE_APP_API_URL,
  },

  PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL,
  PUBLIC_PORT: import.meta.env.VITE_PUBLIC_PORT,
  APP_DEFAULTAUTH: import.meta.env.VITE_APP_DEFAULTAUTH,

  APP_API_URL: import.meta.env.VITE_APP_API_URL,
  APP_CLIENT_ID: import.meta.env.VITE_APP_CLIENT_ID,
  APP_CLIENT_SECRET: import.meta.env.VITE_APP_CLIENT_SECRET,

  SERVER_DEBUG: import.meta.env.VITE_PSERVER_DEBUG === 'true',
  API_TIMEOUT: import.meta.env.VITE_API_TIMEOUT,

  CDN_MODE_ENABLED: import.meta.env.VITE_CDN_MODE_ENABLED === 'true',
  CDN_URL: import.meta.env.VITE_CDN_URL,

  BUILD_MODE: import.meta.env.VITE_BUILD_MODE,

  META_PAGE_TITLE: import.meta.env.VITE_META_PAGE_TITLE,
  META_DESCRIPTION: import.meta.env.VITE_META_DESCRIPTION,
  META_KEYWORDS: import.meta.env.VITE_META_KEYWORDS,

  storage: {
    PATCH: import.meta.env.VITE_STORAGE_PATH,
    PREFIX: import.meta.env.VITE_STORAGE_PREFIX,
    SECRET_KEY: import.meta.env.VITE_STORAGE_SECRET_KEY,
    MAX_AGE: import.meta.env.VITE_STORAGE_MAX_AGE
  },

  tenant: {
    TENANT_ID: import.meta.env.VITE_TENANT_ID,
    APP_ID: import.meta.env.VITE_TENANT_APP_ID,
  }
};

export default config;