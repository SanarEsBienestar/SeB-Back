import { ePayCO } from "../config/epayco.config";

export function createToken(cardInfo){
    ePayCO.token.create(cartInfo, function(error, data){
        if(error){
            console.log(error)
        }else{
            console.log(data)
        }
    })
}