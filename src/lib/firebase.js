import {initializeApp} from "firebase/app"
import {getFirestore, collection, getDocs, getDoc, doc} from "firebase/firestore"
import Basket from "@/classes/Basket"
import Assets from "@/classes/Assets"

export default class Firebase {
    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyCYsotrhkkUUd0nEZhjCL_HMxHsHb_WRFU",
            authDomain: "basket-f63d5.firebaseapp.com",
            projectId: "basket-f63d5",
            storageBucket: "basket-f63d5.appspot.com",
            messagingSenderId: "600361874593",
            appId: "1:600361874593:web:31f3e803bcdc8d4472ece0",
            measurementId: "G-71J6JZKCY0"
        }

        this._app = initializeApp(firebaseConfig)
        this._db = getFirestore(this._app)
    }

    async getBaskets() {
        const colRef = collection(this._db, "baskets")
        const basketDocs = await getDocs(colRef)
        return basketDocs.docs.map(basketDoc => new Basket(basketDoc));
    }

    async getBasket(basketId){
        const docRef = doc(this._db, "baskets", basketId)
        const basketDoc = await getDoc(docRef)

        if (basketDoc.exists()) {
            return new Basket(basketDoc)
        } else {
            return null
        }
    }

    async getAssets() {
        const colRef = collection(this._db, "supported_assets")
        const assetDocs = await getDocs(colRef)
        return assetDocs.docs.map(assetDocs => new Assets(assetDocs))
    }
}