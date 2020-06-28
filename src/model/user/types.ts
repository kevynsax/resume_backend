export interface User {
    ipAddress: string;
    geolocation: Geolocation;
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

//
// export interface Geolocation {
//     continent_code: "SA",
//     continent_name: "South America",
//     country_code: "BR",
//     country_name: "Brazil",
//     region_code: "DF",
//     region_name: "Federal District",
//     city: "Bras\u00edlia",
//     zip: "71010-001",
//     latitude: -15.819999694824219,
//     longitude: -47.98400115966797,
// }
