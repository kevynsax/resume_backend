export interface User {
    ipAddress: string;
    geolocation?: Geolocation;
}

export interface Geolocation {
    continent_code: string,
    continent_name: string,
    country_code: string,
    country_name: string,
    region_code: string,
    region_name: string,
    city: string,
    zip: string,
    latitude: number,
    longitude: number,
}


