import {createContext, Component} from "react"
import Firebase from "@/lib/firebase"


const BasketContext = createContext({})

export default class BasketProvider extends Component {
    constructor(props) {
        super(props);

        this.db = new Firebase()

        this.state = {
            baskets: [], 
            assets: []
        }
    }

    async componentDidMount() {
        const baskets = await this.db.getBaskets()
        const assets = await this.db.getAssets()
        this.setState({baskets: baskets, assets: assets})
    }

    render() {
        return (
            <BasketContext.Provider value={{
                baskets: this.state.baskets,
                assets: this.state.assets
            }}>
                {this.props.children}
            </BasketContext.Provider>
        )
    }
}

export {BasketContext}