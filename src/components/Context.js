import {createContext, Component} from "react"
import Supabase from "@/lib/supabase"


const BasketContext = createContext({})

export default class BasketProvider extends Component {
    constructor(props) {
        super(props);

        this.db = new Supabase()
    }

    render() {
        return (
            <BasketContext.Provider value={{}}>
                {this.props.children}
            </BasketContext.Provider>
        )
    }
}