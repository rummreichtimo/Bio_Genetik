/**
 * Minimale Typen für die claude.ai-Laufzeit (nur vorhanden, wenn die App als
 * veröffentlichtes claude.ai-Artifact läuft). Ausserhalb von claude.ai ist
 * window.claude nicht definiert – die App nutzt dann nur den Local Storage.
 */
export {};

declare global {
  interface ClaudeDbSnapshot {
    exists: boolean;
    data(): Record<string, unknown> | undefined;
  }

  interface ClaudeDbDocRef {
    get(): Promise<ClaudeDbSnapshot>;
    set(data: Record<string, unknown>): Promise<void>;
  }

  interface ClaudeDb {
    doc(path: string): ClaudeDbDocRef;
  }

  interface ClaudeUser {
    id(): Promise<string | null>;
  }

  interface ClaudeSampleError {
    code: string;
    message: string;
    text?: string;
  }

  interface ClaudeSampleOptions {
    signal?: AbortSignal;
    modelTier?: 'default' | 'complex' | 'quick';
    cache?: boolean | { gcTime?: number; refresh?: boolean };
    onText?: (u: { text: string; delta: string }) => void;
  }

  interface ClaudeSample {
    (input: string, options?: ClaudeSampleOptions): Promise<{ text: string; truncated: boolean }>;
    json<T = unknown>(input: string, options?: ClaudeSampleOptions): Promise<T>;
  }

  interface ClaudeRuntime {
    use(name: 'db'): Promise<ClaudeDb | null>;
    use(name: 'user'): Promise<ClaudeUser | null>;
    use(name: 'sample'): Promise<ClaudeSample | null>;
    use(name: string): Promise<unknown>;
  }

  interface Window {
    claude?: ClaudeRuntime;
  }
}
