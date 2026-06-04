# Decommission Microsoft 365 / Entra ID - Graph email sending

We migrated the contact-form email sending from **Microsoft Graph `sendMail`** to **Resend**
(see `frontend/src/app/api/contact/route.ts`). The app no longer calls Microsoft Graph, so the
Entra ID / Exchange Online artifacts created solely for Graph sending can be removed.

The block below is a ready-to-paste prompt for an agent (or admin) with Microsoft 365 / Entra
access. It is deliberately cautious: **we still use M365 for the `contact@` mailbox**, so it
avoids breaking mail receiving.

---

```text
Context: We just migrated our contact-form email sending (Next.js app on Vercel) AWAY from
Microsoft Graph sendMail OVER TO Resend (a transactional email provider). We now want to
DECOMMISSION the Microsoft Entra ID / M365 / Exchange Online artifacts that were created
SOLELY to let the app send mail via Microsoft Graph. The app no longer calls Microsoft Graph.

What was set up for the Graph approach (to undo):
- An Entra ID (Azure AD) app registration used for app-only Graph access:
    Tenant ID: 18873722-feff-4dde-a98b-11f1a47c80b8
    Client ID: d8c62b28-5e54-494b-9127-34a6c3fe49e0
  with a CLIENT SECRET and the Microsoft Graph APPLICATION permission "Mail.Send"
  (admin-consented).
- Possibly an Exchange Online Application Access Policy (New-ApplicationAccessPolicy) scoping
  that app's Mail.Send to the noreply@alltunderkontroll.se mailbox.
- The sender identity noreply@alltunderkontroll.se (may be a licensed/shared mailbox).

Please do the following, INVENTORY FIRST and confirm with me before any destructive change:
1. List the app registration above: its client secrets, its Graph API permissions, and any
   admin consent grants. Show me what exists before deleting.
2. Remove the "Mail.Send" application permission / revoke its admin consent, delete the client
   secret, and then DELETE the app registration entirely if it is used for nothing else.
3. Check for any ApplicationAccessPolicy in Exchange Online tied to this app
   (Get-ApplicationAccessPolicy) and remove it if present (Remove-ApplicationAccessPolicy).
4. Treat the client secret as COMPROMISED regardless (it was stored in a repo .env file and
   shared in plaintext): ensure it is deleted/rotated.

DO NOT TOUCH / explicitly preserve (we still use M365 for receiving mail):
- The MX records and the contact@alltunderkontroll.se mailbox - we still read mail there.
- The domain's existing M365 SPF include (spf.protection.outlook.com) and M365 DKIM CNAMEs
  IF any mailbox still sends/receives via Exchange Online. Do NOT strip Microsoft auth records
  that real mailboxes depend on. (Resend adds its OWN separate SPF/DKIM/return-path records -
  additive; leave those alone.)
- Decision needed from me: whether to KEEP noreply@alltunderkontroll.se as a real M365 mailbox
  (with Resend it's only a "From" identity authenticated by Resend's DKIM and needs no M365
  mailbox), or remove it to free a license. Ask me before removing it.

Deliverable: an inventory of what exists, a proposed removal list, and what you recommend
keeping vs deleting - then wait for my go-ahead before making changes.
```

---

## App-side cleanup (this repo, after Resend is verified in production)

- Remove the deprecated `GRAPH_*` entries from `frontend/.env.local` and from the Vercel project
  env (Production + Preview).
- The Graph code itself is already gone from `frontend/src/app/api/contact/route.ts`.
