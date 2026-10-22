/**
 * Boat / van operator cards. PLACEHOLDERS — fill with real operators then set OPERATORS_READY = true in flags.ts.
 * Never add licence numbers or fleet sizes that are not verified.
 */
export interface Operator {
  name: string;
  service: string;
  licence: string;
  fleet: string;
  logo?: string;
  placeholder: boolean;
}

export const operators: Operator[] = [
  { name: '[Sahkan: nama operator bot]', service: 'Bot laju Kuala Besut ⇄ Perhentian', licence: '[Sahkan: no. lesen]', fleet: '[Sahkan: bilangan bot]', placeholder: true },
  { name: '[Sahkan: nama operator van]', service: 'Van KBR / TGG / ECRL Jerteh', licence: '[Sahkan: no. lesen / permit]', fleet: '[Sahkan: bilangan van]', placeholder: true },
  { name: '[Sahkan: nama pengendali parking]', service: 'Parking terbuka & berbumbung', licence: '[Sahkan: permit]', fleet: '[Sahkan: kapasiti]', placeholder: true },
];
