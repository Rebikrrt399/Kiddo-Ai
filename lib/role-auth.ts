export type UserRole = "parent" | "doctor" | "child";

export const roleDashboardHref: Record<UserRole, string> = {
  parent: "/dashboard",
  doctor: "/doctor",
  child: "/child",
};

export const roleLabels: Record<UserRole, string> = {
  parent: "Parent",
  doctor: "Doctor",
  child: "Child",
};

export const roleStorageKey = "kiddoai_active_role";
export const registeredRoleStorageKey = "kiddoai_registered_role";

export function isUserRole(value: string | null): value is UserRole {
  return value === "parent" || value === "doctor" || value === "child";
}

export function saveRole(role: UserRole) {
  localStorage.setItem(roleStorageKey, role);
  localStorage.setItem(registeredRoleStorageKey, role);
}

export function getRegisteredRole() {
  const role = localStorage.getItem(registeredRoleStorageKey);
  return isUserRole(role) ? role : null;
}
