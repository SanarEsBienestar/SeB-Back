import 'dotenv/config'
import { epayco } from 'epayco-sdk-node'

export const ePayCO = epayco()(
    {
        apiKey: process.env.EPAYCO_PUBLIC_KEY,
        privateKey: process.env.EPAYCO_PRIVATE_KEY,
        lang: 'ES',
        test: true
    }
)