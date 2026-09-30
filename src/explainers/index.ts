import type { Explainer } from './kit';
import { replication } from './replication';

/** „Anschaulich erklärt“ – Bildgeschichten je Unterthema */
export const EXPLAINERS: Explainer[] = [replication];
const MAP = new Map(EXPLAINERS.map((e) => [e.sub, e]));
export const getExplainer = (sub: string) => MAP.get(sub);
export const hasExplainer = (sub: string) => MAP.has(sub);
export type { Explainer, Scene } from './kit';
