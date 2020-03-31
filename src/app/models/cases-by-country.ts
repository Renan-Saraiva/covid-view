export class CasesByCountry {
    country_name: string;
    cases: string;
    deaths: number;
    region: string;
    total_recovered: number;
    new_deaths: number;
    new_cases: number;
    serious_critical: number;
    active_cases: number;
    total_cases_per_1m_population: number;
}

export interface CasesByCountryContainer {
    countries_stat: CasesByCountry[];
}