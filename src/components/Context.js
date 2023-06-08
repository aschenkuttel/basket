import {createContext, Component} from "react"
import Firebase from "@/lib/firebase"
import {ethers} from "ethers"


const BasketContext = createContext({})

export default class BasketProvider extends Component {
    constructor(props) {
        super(props);

        this.db = new Firebase()

        this.state = {
            baskets: [], 
            assets: [],
            isLoading: true,
            address: null
        }
    }

    async componentDidMount() {
        const baskets = await this.db.getBaskets()
        const assets = await this.db.getAssets()
        this.setState({baskets: baskets, assets: assets, isLoading: false})
    }

    render() {
        return (
            <BasketContext.Provider value={{
                baskets: this.state.baskets,
                assets: this.state.assets,
                isLoading: this.state.isLoading
            }}>
                {this.props.children}
            </BasketContext.Provider>
        )
    }
}

export {BasketContext}