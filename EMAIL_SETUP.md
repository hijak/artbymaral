# Email Setup Guide

This guide will help you set up email functionality for your contact and commission forms using EmailJS.

## 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

## 2. Set up Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Add a new service (Gmail, Outlook, etc.)
3. Configure your email provider settings
4. Note down your **Service ID**

## 3. Create Email Templates

### Contact Form Template
1. Go to "Email Templates" in your dashboard
2. Create a new template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message
   - `{{to_email}}` - Your email (info@artbymaral.com)

**Template Example:**
```
Subject: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}
```

### Commission Form Template
1. Create another template for commission requests
2. Use these variables:
   - `{{pet_name}}` - Pet's name
   - `{{special_requests}}` - Special requests
   - `{{contact_name}}` - Customer name
   - `{{contact_email}}` - Customer email
   - `{{attachments}}` - JSON string of attachments

**Template Example:**
```
Subject: New Commission Request - {{pet_name}}

Customer: {{contact_name}} ({{contact_email}})

Pet Name: {{pet_name}}
Special Requests: {{special_requests}}

Attachments: {{attachments}}
```

## 4. Get Your Keys

1. Go to "Account" → "General"
2. Note down your **Public Key**
3. Note down your **Template IDs** from the templates you created

## 5. Configure Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id_here
VITE_EMAILJS_COMMISSION_TEMPLATE_ID=your_commission_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## 6. Test the Forms

1. Start your development server: `npm run dev`
2. Test both contact and commission forms
3. Check your email for the submissions

## Important Notes

- **Free Plan Limits**: EmailJS free plan allows 200 emails/month
- **Attachments**: Commission form attachments are sent as base64 encoded data
- **Security**: The anti-bot measures are still active to prevent spam
- **Error Handling**: Forms will show error messages if email sending fails

## Troubleshooting

- Make sure all environment variables are set correctly
- Check your email service configuration in EmailJS
- Verify your email templates use the correct variable names
- Check browser console for any JavaScript errors