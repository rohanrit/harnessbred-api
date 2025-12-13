# harnessbred-api
Api for race horse pedigree

## Setup codes
npm install
mkdir src
npm init -y
npm install express
npm install nodemaon --save-dev
npx prisma init
npm install prisma --save-dev
npm i @prisma/client
npm install dotenv
npx prisma generate

## Prisma configuration steps
Choose how you want to set up your database:
Connect to existing database:
1. configure your DATABASE_URL in prisma.config.ts
2. Run 'npx prisma db pull' to introspect your database

Create new Database:
Local: npx prisma dev (run postgres locally in your terminal)
Cloud: npx create-db (creates a free prisma postgres database)

Then, define your models in prisma/schma.prisma and run npx prisma migrate dev to apply your schema.

### migrate/update tables to database
npx prisma migrate dev --name add_users_table
npx prisma generate

### youtube tutorial: https://www.youtube.com/watch?v=g09PoiCob4Y&t=1053s

