import type { ContentPack } from '../index';
import { grundlagen } from './grundlagen';
import { methoden } from './methoden';
import { genproduktA } from './genprodukt-a';
import { genproduktB } from './genprodukt-b';
import { regulation } from './regulation';
import { gentechnik } from './gentechnik';
import { humangenetik } from './humangenetik';

/** Inhalte je Kapitel – Reihenfolge wie im Buch. */
export const PACKS: ContentPack[] = [grundlagen, methoden, genproduktA, genproduktB, regulation, gentechnik, humangenetik];
