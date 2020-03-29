export interface StateByCountry {
    id: string;
    country_name: string;
    total_cases: string;
    new_cases: string;
    active_cases: string;
    total_deaths: string;
    new_deaths: string;
    total_recovered: string;
    serious_critical: string;
    region?: any;
    total_cases_per1m: string;
    record_date: string;
}

export interface StateByCountryCollection {
    country: string;
    latest_stat_by_country: StateByCountry[];
}
