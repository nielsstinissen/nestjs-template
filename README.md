# Nest JS template

## Overview

Basic NestJS template with a basic User entity and authentication using JWT Bearer tokens.

Includes npm libraries:

  - "@nestjs/common": "^8.0.0",
  - "@nestjs/config": "^2.0.0",
  - "@nestjs/core": "^8.0.0",
  - "@nestjs/jwt": "^8.0.0",
  - "@nestjs/mapped-types": "*",
  - "@nestjs/passport": "^8.2.1",
  - "@nestjs/platform-express": "^8.0.0",
  - "@nestjs/typeorm": "^8.0.3",
  - "bcrypt": "^5.0.1",
  - "class-transformer": "^0.5.1",
  - "class-validator": "^0.13.2",
  - "mysql2": "^2.3.3",
  - "passport": "^0.5.2",
  - "passport-jwt": "^4.0.0",
  - "passport-local": "^1.0.0",
  - "reflect-metadata": "^0.1.13",
  - "rimraf": "^3.0.2",
  - "rxjs": "^7.2.0",
  - "typeorm": "^0.2.45"

## Folder layout

- resource-folder
    - dto
      - template.dto.ts
    - entity
      - template.entity.ts
    - enum
      - template.enum.ts
    - tests
      - template.controller.spec.ts
      - template.service.spec.ts
    - template.controller.ts
    - template.module.ts
    - template.service.ts

## ENV files

Env files are required for storing JWT secrets and connection to the database.

To specify an env file to use, you will have to change the NODE_ENV parameter in the npm script in package.json