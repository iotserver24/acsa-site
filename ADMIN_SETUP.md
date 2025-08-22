# Admin Panel Setup Guide

## Overview
The ACSA website now includes a secure admin panel with authentication and comprehensive event management features.

## Features

### 🔐 Authentication
- Secure login with environment variables
- Session persistence using localStorage
- Protected admin routes

### 📊 Dashboard
- Real-time statistics (Total Events, Active Events, Registrations, Upcoming Events)
- Quick overview of system status

### 🎯 Event Management
- **Create Events**: Add new events with detailed information
- **Edit Events**: Modify existing event details
- **Delete Events**: Remove events (also deletes associated registrations)
- **Toggle Status**: Activate/deactivate events
- **Registration Limits**: Set custom registration limits per event
- **Featured Events**: Mark important events as featured

### 👥 Registration Management
- View all registrations across all events
- See registration details (name, email, university, year)
- Track attendance for each event

### ⚙️ Settings
- System information overview
- Quick action buttons
- Admin session management

## Setup Instructions

### 1. Environment Configuration
Create a `.env.local` file in your project root:

```bash
# Copy the example file
cp .env.local.example .env.local
```

Edit `.env.local` and set your admin credentials:

```env
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
```

### 2. Access the Admin Panel
1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/admin`

3. Login with your configured credentials

## Security Features

- ✅ Environment variable-based authentication
- ✅ No hardcoded credentials
- ✅ Session management
- ✅ Protected API endpoints
- ✅ Input validation

## API Endpoints

### Admin Authentication
- `POST /api/admin/login` - Admin login endpoint

### Event Management
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `PUT /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event

### Registration Management
- `GET /api/registrations` - Get all registrations
- `POST /api/registrations` - Create registration

## Event Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Event title |
| date | string | Yes | Event date (YYYY-MM-DD) |
| time | string | Yes | Event time |
| location | string | Yes | Event location |
| description | string | Yes | Event description |
| maxAttendees | number | Yes | Maximum attendees allowed |
| category | string | Yes | Event category |
| image | string | No | Event banner image URL |
| registrationLimit | number | No | Custom registration limit |
| featured | boolean | No | Mark as featured event |
| isActive | boolean | No | Event status (active/inactive) |

## Best Practices

1. **Strong Passwords**: Use strong, unique passwords for admin accounts
2. **Environment Variables**: Never commit `.env.local` to version control
3. **Regular Backups**: Backup your event and registration data regularly
4. **Access Control**: Limit admin access to trusted personnel only
5. **Monitoring**: Regularly check registration statistics and event status

## Troubleshooting

### Login Issues
- Verify environment variables are set correctly
- Check that `.env.local` file exists in project root
- Restart development server after changing environment variables

### Data Issues
- Check Redis connection if using Redis database
- Verify API endpoints are working correctly
- Check browser console for error messages

## Support

For technical support or feature requests, please contact the development team.
