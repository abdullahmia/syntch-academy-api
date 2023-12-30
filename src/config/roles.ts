const allRoles = {
  user: ['updateSelf', 'manageMedia', 'accessCourse'],
  admin: ['getUsers', 'manageUsers', 'manageMedia', 'accessCourse', 'updateSelf'],
  instructor: ['manageMedia', 'manageCourses', 'accessCourse', 'updateSelf']
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
