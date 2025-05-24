import jwt, { SignOptions, Secret } from 'jsonwebtoken'

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'supersecret'

type JWTPayload = { id: string }

export const signToken = (
    payload: JWTPayload,
    expiresIn: `${number}${'s' | 'm' | 'h' | 'd'}` = '1d'
): string => {
    const options: SignOptions = { expiresIn }
    return jwt.sign(payload, JWT_SECRET, options)
}

export const verifyToken = (token: string): JWTPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        return null
    }
}
