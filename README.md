# Professional Portfolio (HTML • CSS • JavaScript)

This is a simple, responsive professional portfolio template built with plain HTML, CSS and JavaScript. It is ready to be customized with your name, projects and contact details.

Files added:

- `index.html` — main site markup.
- `css/styles.css` — responsive styles and layout.
- `js/script.js` — small interactions: mobile nav, smooth scroll, demo form.

How to use

1. Open the project folder in your editor.
2. Edit `index.html` to replace `Your Name`, project descriptions, links and email.
3. Preview the site by opening `index.html` in a browser (double-click or use your editor live-preview).

Quick commands (PowerShell)

```powershell
# open in default browser from project folder
Start-Process .\index.html
```

Next steps (suggested)

- Replace placeholder project items with real screenshots and links.
Add more pages (blog, resume) or connect a form backend (Formspree, Netlify Forms, FormSubmit, or your own API).

Contact form notes

- Email delivery (configured): The contact form is set to use FormSubmit (https://formsubmit.co). The form action currently posts to `jamesimbarashejulius@gmail.com` and will send messages to that address. The first time you receive a submission you'll need to confirm the forwarding email using the message FormSubmit sends to your inbox.

- WhatsApp delivery: There's a "Send via WhatsApp" button that builds a prefilled WhatsApp message from the form fields and opens WhatsApp (or WhatsApp Web) to send it to your phone number. For WhatsApp links to work reliably the phone number should be in international format without a leading + or 0 (for example, Zimbabwe +263 78 196 8103 -> `263781968103`). If you want me to format this automatically, tell me your country code and I will update the `ownerWhatsAppNumber` in `js/script.js`.

Security note

- FormSubmit is a simple no-backend option and is suitable for basic portfolio contact forms. For higher reliability or more features (attachments, spam control, CRM integration), consider a server-side endpoint or a paid form provider.
- Deploy to Netlify, Vercel or GitHub Pages.

If you want, I can now:

- Customize the design (colors, fonts, animations).
- Add project detail pages or a modal viewer for projects.
- Add a deploy pipeline (GitHub Pages / Netlify) and instructions.

Tell me which of the above you'd like next and I will continue.
