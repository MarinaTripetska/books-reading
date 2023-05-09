enum breakpoints {
  'DESKTOP' = 1280,
  'TABLET' = 768,
  'MOBILE' = 320,
  'LargeMobile' = 480,
}

export const media = {
  onlyMobile: `(max-width: ${breakpoints.MOBILE}px)`,
  onlyLargeMobile: `(max-width: ${breakpoints.LargeMobile}px)`,
  maxMobile: `(max-width: ${breakpoints.TABLET - 1}px)`,
  minTablet: `(min-width: ${breakpoints.TABLET}px)`,
  onlyTablet: `(min-width: ${breakpoints.TABLET}px) and (max-width: ${
    breakpoints.DESKTOP - 1
  }px)`,
  maxTablet: `(max-width: ${breakpoints.DESKTOP - 1}px)`,
  desktop: `(min-width: ${breakpoints.DESKTOP}px)`,
};

export default breakpoints;
