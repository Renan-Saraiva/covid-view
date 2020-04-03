import { Country } from './country';

export class CasesByCountry extends Country {
    country_name: string;
    cases: string;
    deaths: string;
    region: string;
    total_recovered: number;
    new_deaths: number;
    new_cases: number;
    serious_critical: string;
    active_cases: string;
    total_cases_per_1m_population: number;
}

export interface CasesByCountryContainer {
    countries_stat: CasesByCountry[];
}