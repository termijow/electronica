# backend/core/settings.py (o el nombre de tu proyecto)

import os
from pathlib import Path
import dj_database_url # Añadir esta importación
from dotenv import load_dotenv # Si usas python-dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Cargar variables de .env si existe (para desarrollo local fuera de Docker o para secrets no en docker-compose)
# load_dotenv(BASE_DIR / '.env') # Descomenta si usas un archivo .env

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'una_clave_secreta_por_defecto_para_desarrollo_local_solo_si_no_esta_en_env')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'

ALLOWED_HOSTS = ['*'] # Para desarrollo. En producción, sé más restrictivo.
                      # Si usas django-cors-headers, también configúralo.

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 'rest_framework',        # Si usas Django REST framework
    # 'corsheaders',           # Si usas django-cors-headers
    # Tus aplicaciones aquí
]

MIDDLEWARE = [
    # 'corsheaders.middleware.CorsMiddleware', # Debe ir antes de CommonMiddleware si se usa
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Si usas django-cors-headers:
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3001", # Tu frontend
    "http://127.0.0.1:3001",
]
CORS_ALLOW_CREDENTIALS = True # Si necesitas enviar cookies/auth headers

ROOT_URLCONF = 'core.urls' # Reemplaza 'core' con el nombre de tu proyecto

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application' # Reemplaza 'core' con el nombre de tu proyecto


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'nombre_db',
        'USER': 'usuario',
        'PASSWORD': 'clave',
        'HOST': 'db',
        'PORT': '5433',
    }
}

# Si DATABASE_URL no está seteada (ej. test local sin Docker), puedes tener un fallback:
# if not DATABASES['default']:
#     DATABASES['default'] = {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    # ... (puedes dejar los por defecto)
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
# STATIC_ROOT = BASE_DIR / 'staticfiles_collected' # Para collectstatic en producción

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'