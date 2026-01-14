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

interface LeadEmailProps {
  firstName: string;
  subject: string;
  body: string;
}

export function LeadEmail({ firstName, subject, body }: LeadEmailProps) {
  const parsedBody = body.replace(/\{\{firstName\}\}/g, firstName);

  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Heading style={heading}>Salut {firstName} 👋</Heading>
          </Section>

          <Text style={paragraph}>{parsedBody}</Text>

          <Hr style={hr} />

          <Section style={footerSection}>
            <Text style={footerName}>Axel Hamilcaro</Text>
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

const paragraph = {
  fontSize: "15px",
  lineHeight: "1.7",
  color: "#374151",
  whiteSpace: "pre-wrap" as const,
  margin: "0 0 16px",
};

const hr = {
  borderColor: "#e5e7eb",
  borderWidth: "1px",
  borderStyle: "solid" as const,
  margin: "32px 0",
};

const footerSection = {
  textAlign: "left" as const,
};

const footerName = {
  fontSize: "13px",
  color: "#9ca3af",
  margin: "0",
};

const footerLink = {
  fontSize: "12px",
  color: "#d1d5db",
  textDecoration: "none",
};
