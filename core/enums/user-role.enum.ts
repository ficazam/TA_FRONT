export enum UserRole {
  Empty = "",
  Admin = "admin",
  Principal = "principal",
  Coordinator = "coordinator",
  Teacher = "teacher",
  Inventory = "inventory",
}

export const staffRoles = [
  { label: "Coordinator", value: UserRole.Coordinator },
  { label: "Teacher", value: UserRole.Teacher },
  { label: "Inventory Manager", value: UserRole.Inventory },
];