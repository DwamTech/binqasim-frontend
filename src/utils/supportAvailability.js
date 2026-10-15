export function getSupportAvailability(settings) {
  const open = settings?.site_status !== "closed";
  const individual = open && settings?.individual_support_enabled === true;
  const institutional = open && settings?.institutional_support_enabled === true;
  return { individual, institutional, visible: individual || institutional };
}
