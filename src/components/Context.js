import {createContext, Component} from "react"


const BasketContext = createContext({})

export default class BasketProvider extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BasketContext.Provider value={{}}>
                {this.props.children}
            </BasketContext.Provider>
        )
    }
}