import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface AdminNotificationProps {
  formTitle: string;
  formSlug: string;
  firstName: string;
  email: string;
  source?: string | null;
}

export function AdminNotification({
  formTitle,
  formSlug,
  firstName,
  email,
  source,
}: AdminNotificationProps) {
  const previewText = `Nouveau lead: ${firstName} via ${formTitle}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Heading style={heading}>🎯 Nouveau lead capturé</Heading>
          </Section>

          <Section style={infoBox}>
            <Text style={labelFirst}>Formulaire</Text>
            <Text style={value}>{formTitle}</Text>

            <Text style={label}>Prénom</Text>
            <Text style={value}>{firstName}</Text>

            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>

            {source && (
              <>
                <Text style={label}>Source</Text>
                <Text style={value}>{source}</Text>
              </>
            )}

            <Text style={label}>Slug</Text>
            <Text style={valueCode}>/{formSlug}</Text>
          </Section>

          <Hr style={hr} />
          <Section style={footerSection}>
            <Text style={footer}>Notification automatique</Text>
            <Link href="https://axelhamilcaro.com" style={footerLink}>
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
  padding: "40px 20px",
  maxWidth: "520px",
};

const headerSection = {
  borderBottom: "3px solid #ff4d00",
  paddingBottom: "16px",
  marginBottom: "24px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#0a0a0a",
  margin: "0",
  letterSpacing: "-0.025em",
};

const infoBox = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "24px",
  border: "1px solid #e5e7eb",
};

const labelFirst = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#6b7280",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  marginBottom: "4px",
  marginTop: "0",
};

const label = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#6b7280",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  marginBottom: "4px",
  marginTop: "16px",
};

const value = {
  fontSize: "16px",
  color: "#0a0a0a",
  marginTop: "0",
  marginBottom: "0",
};

const valueCode = {
  fontSize: "14px",
  fontFamily: "monospace",
  backgroundColor: "#f3f4f6",
  padding: "4px 8px",
  borderRadius: "4px",
  color: "#374151",
  marginTop: "0",
  marginBottom: "0",
  display: "inline-block" as const,
};

const hr = {
  borderColor: "#e5e7eb",
  borderWidth: "1px",
  borderStyle: "solid" as const,
  margin: "32px 0",
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
