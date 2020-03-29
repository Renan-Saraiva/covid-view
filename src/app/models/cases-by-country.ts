export interface CasesByCountry {
    country_name: string;
    cases: string;
    deaths: string;
    region: string;
    total_recovered: string;
    new_deaths: string;
    new_cases: string;
    serious_critical: string;
    active_cases: string;
    total_cases_per_1m_population: string;
}

export interface CasesByCountryContainer {
    countries_stat: CasesByCountry[];
}