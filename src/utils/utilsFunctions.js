export default function getCurrentPath() {
    return window.location.pathname;
}

export const ENUM_ROLE = {
    CAUSE_CREATOR: "Cause Creator",
    ADMIN: "Admin",
    SPONSOR: "Sponsor"
}


export const ENUM_CATEGORY = [
    {
        label: "Environment",
        value: "ENVIRONMENT"
    },
    {
        label: "Health",
        value: "HEALTH"
    },
    {
        label: "Education",
        value: "EDUCATION"
    },
    {
        label: "Women Empowerment",
        value: "WOMEN_EMPOWERMENT"
    },
    {
        label: "Animal Welfare",
        value: "ANIMAL_WELFARE"
    },
    {
        label: "Child Welfare",
        value: "CHILD_WELFARE"
    },
    {
        label: "Disaster Relief",
        value: "DISASTER_RELIEF"
    },
    {
        label: "Cleanliness Sanitation",
        value: "CLEANLINESS_SANITATION"
    },
    {
        label: "Hunger Food Security",
        value: "HUNGER_FOOD_SECURITY"
    }
]