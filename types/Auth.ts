import { TResponse } from "./Response"

export type LoginRequest = {
    email: string,
    password: string,
    shouldRemember: boolean
}

export type LoginResponse = TResponse<{
    token: string,
}>;