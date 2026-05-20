import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { EXTERNAL_LINKS, SITE_URL } from "@/app/_config/site.constants";

interface ContactNotificationProps {
  name?: string;
  email: string;
  message: string;
  projectTypeLabel: string;
  budgetLabel: string;
  score: number;
  inScope: boolean;
  sourcePath?: string;
}

function scoreColor(score: number, inScope: boolean): string {
  if (!inScope) return "#ef4444";
  if (score >= 75) return "#10b981";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
}

function scoreLabel(score: number, inScope: boolean): string {
  if (!inScope) return "Hors scope";
  if (score >= 75) return "Hot lead";
  if (score >= 50) return "À qualifier";
  return "Faible";
}

export function ContactNotification({
  name,
  email,
  message,
  projectTypeLabel,
  budgetLabel,
  score,
  inScope,
  sourcePath,
}: ContactNotificationProps) {
  const displayName = name?.trim() || "Anonyme";
  const isHot = inScope && score >= 75;
  const color = scoreColor(score, inScope);
  const tag = scoreLabel(score, inScope);

  const previewText = `${tag} ${score}/100 · ${displayName} · ${projectTypeLabel} · ${budgetLabel}`;

  const replySubject = encodeURIComponent(
    "Re: ton projet via axelhamilcaro.com",
  );
  const replyBody = encodeURIComponent(
    `Salut ${displayName},\n\nMerci pour ton message.\n\n`,
  );
  const replyHref = `mailto:${email}?subject=${replySubject}&body=${replyBody}`;

  const calendlySubject = encodeURIComponent(
    "On en discute ? Bloque un créneau",
  );
  const calendlyBody = encodeURIComponent(
    `Salut ${displayName},\n\nMerci pour ton message. Le plus simple pour cadrer ton besoin est d'échanger 20 min de vive voix.\n\nBloque-toi un créneau ici quand ça t'arrange :\n${EXTERNAL_LINKS.calendly}\n\nÀ très vite,\nAxel`,
  );
  const calendlyHref = `mailto:${email}?subject=${calendlySubject}&body=${calendlyBody}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={{ ...summaryBar, backgroundColor: color }}>
            <Text style={summaryText}>
              {isHot ? "🔥 " : ""}
              {tag} · {score}/100 · {projectTypeLabel} · {budgetLabel}
            </Text>
          </Section>

          <Section style={headerSection}>
            <Heading style={heading}>
              {displayName}{" "}
              <span style={headerEmailMuted}>
                &lt;
                <Link href={`mailto:${email}`} style={emailLink}>
                  {email}
                </Link>
                &gt;
              </span>
            </Heading>
            <Text style={subheading}>
              Reçu depuis{" "}
              <span style={inlineCode}>{sourcePath || "(inconnue)"}</span>
            </Text>
          </Section>

          <Section style={messageBlock}>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Section style={ctaSection}>
            <Row>
              <Column style={ctaColLeft}>
                <Button href={replyHref} style={ctaButtonPrimary}>
                  Répondre
                </Button>
              </Column>
              <Column style={ctaColRight}>
                <Button href={calendlyHref} style={ctaButtonSecondary}>
                  Envoyer Calendly
                </Button>
              </Column>
            </Row>
          </Section>

          <Section style={metaBox}>
            <Row>
              <Column style={metaCol}>
                <Text style={metaLabel}>Type</Text>
                <Text style={metaValue}>{projectTypeLabel}</Text>
              </Column>
              <Column style={metaCol}>
                <Text style={metaLabel}>Budget</Text>
                <Text style={metaValue}>{budgetLabel}</Text>
              </Column>
            </Row>
            <Row>
              <Column style={metaColFull}>
                <Text style={metaLabel}>Source</Text>
                <Text style={inlineCode}>{sourcePath || "(inconnue)"}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={hr} />
          <Section style={footerSection}>
            <Text style={footer}>Notification automatique</Text>
            <Link href={SITE_URL} style={footerLink}>
              axelhamilcaro.com
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f6f6",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "32px 16px",
  maxWidth: "560px",
};

const summaryBar = {
  borderRadius: "8px",
  padding: "12px 16px",
  marginBottom: "20px",
};

const summaryText = {
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "700",
  margin: "0",
  letterSpacing: "0.02em",
};

const headerSection = {
  marginBottom: "20px",
};

const heading = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#0a0a0a",
  margin: "0 0 6px",
  letterSpacing: "-0.02em",
  lineHeight: "1.3",
};

const headerEmailMuted = {
  fontSize: "14px",
  fontWeight: "400",
  color: "#6b7280",
};

const subheading = {
  fontSize: "13px",
  color: "#6b7280",
  margin: "0",
};

const emailLink = {
  color: "#ff4d00",
  textDecoration: "none",
};

const messageBlock = {
  backgroundColor: "#ffffff",
  borderLeft: "3px solid #ff4d00",
  borderRadius: "6px",
  padding: "16px 20px",
  marginBottom: "20px",
  border: "1px solid #e5e7eb",
  borderLeftWidth: "3px",
  borderLeftColor: "#ff4d00",
};

const messageText = {
  fontSize: "15px",
  color: "#0a0a0a",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
  lineHeight: "1.6",
};

const ctaSection = {
  marginBottom: "24px",
};

const ctaColLeft = {
  width: "50%",
  paddingRight: "6px",
};

const ctaColRight = {
  width: "50%",
  paddingLeft: "6px",
};

const ctaButtonPrimary = {
  backgroundColor: "#ff4d00",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  padding: "12px 16px",
  textDecoration: "none",
  display: "block",
  textAlign: "center" as const,
  width: "100%",
  boxSizing: "border-box" as const,
};

const ctaButtonSecondary = {
  backgroundColor: "#ffffff",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  color: "#0a0a0a",
  fontSize: "14px",
  fontWeight: "600",
  padding: "11px 16px",
  textDecoration: "none",
  display: "block",
  textAlign: "center" as const,
  width: "100%",
  boxSizing: "border-box" as const,
};

const metaBox = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "16px 20px",
  border: "1px solid #e5e7eb",
};

const metaCol = {
  width: "50%",
  paddingRight: "8px",
  verticalAlign: "top" as const,
};

const metaColFull = {
  width: "100%",
  paddingTop: "12px",
};

const metaLabel = {
  fontSize: "11px",
  fontWeight: "600",
  color: "#6b7280",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "0 0 4px",
};

const metaValue = {
  fontSize: "14px",
  color: "#0a0a0a",
  margin: "0",
  fontWeight: "500",
};

const inlineCode = {
  fontSize: "13px",
  fontFamily: "monospace",
  backgroundColor: "#f3f4f6",
  padding: "2px 6px",
  borderRadius: "4px",
  color: "#374151",
  margin: "0",
  display: "inline-block" as const,
};

const hr = {
  borderColor: "#e5e7eb",
  borderWidth: "1px",
  borderStyle: "solid" as const,
  margin: "28px 0 16px",
};

const footerSection = {
  textAlign: "center" as const,
};

const footer = {
  color: "#9ca3af",
  fontSize: "12px",
  margin: "0 0 4px",
};

const footerLink = {
  fontSize: "12px",
  color: "#d1d5db",
  textDecoration: "none",
};
