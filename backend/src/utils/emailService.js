const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send contact form email
const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Contact Form Message from ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Message
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${contactData.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              This message was sent from your portfolio website contact form.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send auto-reply to sender
const sendAutoReply = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contactData.email,
      subject: 'Thank you for your message - Kalpick Sharma',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Thank you for reaching out!
          </h2>
          
          <p style="line-height: 1.6; color: #555;">
            Hi ${contactData.name},
          </p>
          
          <p style="line-height: 1.6; color: #555;">
            Thank you for your message! I've received your email and will get back to you as soon as possible.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Your Message:</h3>
            <p style="line-height: 1.6; color: #555; font-style: italic;">
              "${contactData.message.substring(0, 200)}${contactData.message.length > 200 ? '...' : ''}"
            </p>
          </div>
          
          <p style="line-height: 1.6; color: #555;">
            In the meantime, feel free to check out my portfolio and projects. I'm always open to new opportunities and collaborations!
          </p>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #e9ecef; border-radius: 8px;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              Best regards,<br>
              <strong>Kalpick Sharma</strong><br>
              Creative Designer & Frontend Developer<br>
              <a href="mailto:kalpicksharma@gmail.com">kalpicksharma@gmail.com</a>
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Auto-reply sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('Error sending auto-reply:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendContactEmail,
  sendAutoReply
};
