
export interface IUserApp {
    createUser: (ipAddress: string) => Promise<string>
}