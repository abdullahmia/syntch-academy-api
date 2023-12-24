const allRoles = {
  user: ['updateSelf', 'manageMedia'],
  admin: ['getUsers', 'manageUsers', 'manageMedia']
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
