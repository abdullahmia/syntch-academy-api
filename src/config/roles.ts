const allRoles = {
  user: ['updateSelf', 'manageMedia', 'accessCourse'],
  admin: ['getUsers', 'manageUsers', 'manageMedia', 'accessCourse'],
  instructor: ['manageMedia', 'manageCourses', 'accessCourse']
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
