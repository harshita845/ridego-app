export const colors = {
  brand: '#E8500A',
  brandLight: '#FFF0EB',
  brandDark: '#C43D00',
  background: '#F7F7F7',
  surface: '#FFFFFF',
  textPrimary: '#1A1A2E',
  textSecondary: '#777777',
  disabled: '#C4C4C4',
  disabledBg: '#EBEBEB',
  border: '#E8E8E8',
  success: '#22C55E',
  error: '#EF4444',
  shadow: 'rgba(0,0,0,0.08)',
};

export const spacing = {
  screenPadding: '16px',
  cardPadding: '16px',
  cardRadius: '16px',
  cardRadiusSm: '12px',
  pillRadius: '50px',
  cardShadow: '0 4px 16px rgba(0,0,0,0.08)',
  cardShadowMd: '0 8px 24px rgba(0,0,0,0.12)',
};

export const typography = {
  fontFamily: "'Nunito', sans-serif",
  screenTitle: { fontSize: '22px', fontWeight: 700 },
  sectionHeading: { fontSize: '18px', fontWeight: 600 },
  body: { fontSize: '14px', fontWeight: 400 },
  price: { fontSize: '20px', fontWeight: 700 },
  badge: { fontSize: '12px', fontWeight: 400 },
  button: { fontSize: '16px', fontWeight: 700 },
};

// CSS variables injected into :root
export const cssVars = `
  :root {
    --color-brand: ${colors.brand};
    --color-brand-light: ${colors.brandLight};
    --color-brand-dark: ${colors.brandDark};
    --color-bg: ${colors.background};
    --color-surface: ${colors.surface};
    --color-text-primary: ${colors.textPrimary};
    --color-text-secondary: ${colors.textSecondary};
    --color-disabled: ${colors.disabled};
    --color-disabled-bg: ${colors.disabledBg};
    --color-border: ${colors.border};
    --font-family: ${typography.fontFamily};
    --screen-padding: ${spacing.screenPadding};
    --card-padding: ${spacing.cardPadding};
    --card-radius: ${spacing.cardRadius};
    --card-shadow: ${spacing.cardShadow};
  }
`;
