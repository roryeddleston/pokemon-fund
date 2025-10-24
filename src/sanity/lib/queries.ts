export const NAV_QUERY = /* groq */ `
*[_type == "navigation"][0]{
  brandName,
  nav[]{label, href}
}
`;
