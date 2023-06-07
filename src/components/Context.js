import {createContext, Component} from "react"
import Firebase from "@/lib/firebase"


const BasketContext = createContext({})

export default class BasketProvider extends Component {
    constructor(props) {
        super(props);

        this.db = new Firebase()
        
        this.state = {
            baskets: []
        }
    }


    async componentDidMount(){
        const baskets = await this.db.getBaskets()
        

        this.setState({baskets:baskets})
        console.log("Here")
    }

    render() {
        return (
            <BasketContext.Provider value={{
                baskets: this.state.baskets
            }}>
                {this.props.children}
            </BasketContext.Provider>
        )
    }
}

export {BasketContext}