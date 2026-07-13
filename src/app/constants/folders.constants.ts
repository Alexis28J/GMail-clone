export const MOVABLE_FOLDERS = [
  'inbox',
  'work',
  'personal',
  'spam',
  'archived',
  'snoozed'
] as const;  

export type MovableFolder = typeof MOVABLE_FOLDERS[number]; 
