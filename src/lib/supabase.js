import { createClient } from '@supabase/supabase-js'

export default class Supabase {
    constructor() {
        const supabaseUrl = 'https://jpbghrjljgkdokthnabe.supabase.co'
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
        this._client = createClient(supabaseUrl, supabaseKey)
    }


}