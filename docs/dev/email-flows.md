# Contact Email Flows

How email moves through the system for the contact form and the two shared
mailboxes (`noreply@alltunderkontroll.se`, `contact@alltunderkontroll.se`).

- **Form sends** are handled in code via **Resend** -
  `frontend/src/app/api/contact/route.ts`.
- **Direct emails** to the mailboxes are handled by M365 auto-reply rules
  (configured Exchange-side, not in code).

### Legend

| Style    | Meaning                          |
| -------- | -------------------------------- |
| Blue     | User action                      |
| Purple   | Our backend (Next.js + Resend)   |
| Slate    | An email message                 |
| Green    | Desired end state                |
| Amber    | M365 auto-reply (Exchange rule)  |

---

## Flow 1: Website contact form (via Resend)

The backend sends **two** emails via Resend, both **FROM `noreply@`** (`EMAIL_FROM`):
the submission to the team and a confirmation to the user.

```mermaid
flowchart TD
    A["User submits contact form"]:::user --> B["Next.js route<br/>/api/contact"]:::system
    B --> C["resend.emails.send ×2<br/>FROM noreply@ (EMAIL_FROM)"]:::system
    C --> E["Email 1 → contact@<br/>(submission, replyTo: user)"]:::email
    C --> F["Email 2 → user<br/>(confirmation)"]:::email
    E --> G["Team reads the message<br/>in contact@ inbox"]:::done
    F --> H["User receives confirmation"]:::done

    classDef user fill:#e0f2fe,stroke:#0284c7,color:#0c4a6e
    classDef system fill:#ede9fe,stroke:#7c3aed,color:#4c1d95
    classDef email fill:#f1f5f9,stroke:#475569,color:#1e293b
    classDef done fill:#dcfce7,stroke:#16a34a,color:#14532d
```

> The team can reply to a submission directly from `contact@` - the message sets
> `replyTo` to the user's address, so replies go to the user, not to `noreply@`.

---

## Flow 2: User emails `contact@` directly

```mermaid
flowchart TD
    A["User emails contact@ directly"]:::user --> B["contact@ inbox"]:::email
    B --> C["Team reads the message"]:::done
    B --> D["M365 auto-reply fires"]:::auto
    D --> E["User receives auto-reply:<br/>''Tack för ditt meddelande, vi återkommer inom 24 timmar.''"]:::email

    classDef user fill:#e0f2fe,stroke:#0284c7,color:#0c4a6e
    classDef email fill:#f1f5f9,stroke:#475569,color:#1e293b
    classDef done fill:#dcfce7,stroke:#16a34a,color:#14532d
    classDef auto fill:#fef9c3,stroke:#ca8a04,color:#713f12
```

> Excludes sender `noreply@alltunderkontroll.se`, so it only replies to direct
> emails - never to the form's own submission (Flow 1).

---

## Flow 3: User emails `noreply@` directly

```mermaid
flowchart TD
    A["User emails noreply@ directly"]:::user --> B["noreply@ inbox"]:::email
    B --> C["M365 auto-reply fires"]:::auto
    C --> D["User receives auto-reply:<br/>''Denna e-postadress övervakas inte.<br/>Vänligen kontakta info@alltunderkontroll.se istället.''"]:::email

    classDef user fill:#e0f2fe,stroke:#0284c7,color:#0c4a6e
    classDef email fill:#f1f5f9,stroke:#475569,color:#1e293b
    classDef auto fill:#fef9c3,stroke:#ca8a04,color:#713f12
```
