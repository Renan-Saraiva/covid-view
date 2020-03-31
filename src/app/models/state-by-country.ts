export interface StateByCountry {
    id: string;
    country_name: string;
    total_cases: number;
    new_cases: number;
    active_cases: number;
    total_deaths: number;
    new_deaths: number;
    total_recovered: number;
    serious_critical: number;
    region?: any;
    total_cases_per1m: number;
    record_date: Date;
}

export interface StateByCountryCollection {
    country: string;
    latest_stat_by_country: StateByCountry[];
}
