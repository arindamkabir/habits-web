export const routes = {
    dashboard: '/dashboard',
    habits: {
        index: '/habits',
        details: (slug: string) => `/habits/${slug}`,
    },
    health: {
        index: '/health',
    },
    settings: '/settings'
};