import {createContext, Component} from "react"
import Firebase from "@/lib/firebase"


const BasketContext = createContext({})

export default class BasketProvider extends Component {
    constructor(props) {
        super(props);

        this.db = new Firebase()
    }

    render() {
        return (
            <BasketContext.Provider value={{}}>
                {this.props.children}
            </BasketContext.Provider>
        )
    }
}