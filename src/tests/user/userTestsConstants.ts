import {User} from "src/user/types";

const ipAddress = "192.404.303.022";
export const fakeGeolocation = {
    continent_code: "SA",
    continent_name: "South America",
    country_code: "BR",
    country_name: "Brazil",
    region_code: "DF",
    region_name: "Federal District",
    city: "Bras\u00edlia",
    zip: "71010-001",
    latitude: -15.819999694824219,
    longitude: -47.98400115966797,
};

export const fakeUser: User = {
    ipAddress,
    geolocation: fakeGeolocation
};

