# Database Setup Guide

This project uses PostgreSQL with Prisma ORM for data management.

## Quick Setup

### 1. Database Options

Choose one of these PostgreSQL hosting options:

#### Option A: Vercel Postgres (Recommended for production)
1. Go to your Vercel dashboard
2. Navigate to Storage → Create Database → Postgres
3. Copy the connection string to `.env.local`

#### Option B: Supabase (Free tier available)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy connection string to `.env.local`

#### Option C: Local PostgreSQL
1. Install PostgreSQL locally
2. Create a database named `acsa_db`
3. Update `.env.local` with local connection string

### 2. Environment Setup

1. Copy `.env.local` and update `DATABASE_URL`:
```bash
# Example for Vercel Postgres
DATABASE_URL="postgresql://username:password@your-postgres-host.vercel-storage.vercel.app:5432/verceldb?sslmode=require"

# Example for Supabase
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Example for local development
DATABASE_URL="postgresql://username:password@localhost:5432/acsa_db?schema=public"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Generate Prisma Client

```bash
npm run db:generate
```

### 5. Push Database Schema

```bash
npm run db:push
```

### 6. Seed Database (Optional)

```bash
npm run db:seed
```

### 7. Start Development Server

```bash
npm run dev
```

## Available Commands

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio (database GUI)

## Database Schema

### Events Table
- `id` - Auto-incrementing primary key
- `title` - Event title
- `date` - Event date (YYYY-MM-DD)
- `time` - Event time (text)
- `location` - Event location
- `description` - Event description
- `attendees` - Current attendee count
- `maxAttendees` - Maximum attendees allowed
- `category` - Event category
- `featured` - Boolean for featured events
- `image` - Event image URL
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Registrations Table
- `id` - Auto-incrementing primary key
- `eventId` - Foreign key to events table
- `firstName` - Registrant's first name
- `lastName` - Registrant's last name
- `email` - Registrant's email
- `phone` - Registrant's phone (optional)
- `university` - Registrant's university
- `year` - Academic year
- `major` - Field of study
- `experience` - Previous experience (optional)
- `expectations` - Learning expectations (optional)
- `dietaryRestrictions` - Dietary restrictions (optional)
- `registeredAt` - Registration timestamp

## Features

- ✅ **ACID Transactions** - Consistent data operations
- ✅ **Foreign Key Constraints** - Data integrity
- ✅ **Auto-incrementing IDs** - Reliable primary keys
- ✅ **Timestamps** - Automatic created/updated tracking
- ✅ **Cascade Deletes** - Clean up related data
- ✅ **Type Safety** - Full TypeScript support

## Production Notes

1. **Connection Pooling**: Prisma handles connection pooling automatically
2. **Migrations**: Use `prisma migrate deploy` in production
3. **Backup**: Set up automated backups with your hosting provider
4. **Monitoring**: Monitor database performance and query times
5. **Indexing**: Consider adding indexes for frequently queried fields

## Troubleshooting

### Common Issues

1. **Connection Error**: Check DATABASE_URL format and credentials
2. **Schema Sync**: Run `npm run db:push` after schema changes
3. **Client Generation**: Run `npm run db:generate` after installing
4. **SSL Issues**: Add `?sslmode=require` to connection string for hosted databases