import {createContext, Component} from "react"
import Firebase from "@/lib/firebase"


const BasketContext = createContext({})

export default class BasketProvider extends Component {
    constructor(props) {
        super(props);

        this.db = new Firebase()

        this.state = {
            baskets: [], 
            assets: [],
            isLoading: true
        }
    }

    async componentDidMount() {
        const baskets = await this.db.getBaskets()
        const assets = await this.db.getAssets()
        this.setState({baskets: baskets, assets: assets, isLoading: false, address: null})
    }

    render() {
        return (
            <BasketContext.Provider value={{
                baskets: this.state.baskets,
                assets: this.state.assets,
                isLoading: this.state.isLoading,
                address: this.state.address
            }}>
                {this.props.children}
            </BasketContext.Provider>
        )
    }
}

export {BasketContext}