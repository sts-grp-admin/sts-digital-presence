// Build email at runtime to prevent bot harvesting from static HTML
const u = "contact";
const d = "sabiustechsolutions.com";

export const email = () => `${u}@${d}`;
export const mailto = (params?: string) => `mailto:${email()}${params ? `?${params}` : ""}`;
