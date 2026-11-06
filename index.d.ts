export interface Persona {
  id: string;
  category: string;
  name: string;
  tags: string[];
}
export interface PersonaPrompt extends Persona { prompt: string }
export function listPersonas(category?: string): Persona[];
export function getPersona(id: string): PersonaPrompt;
