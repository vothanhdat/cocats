
interface point2D{

}


declare namespace store{

    interface userid {}
    interface matchid {}

    interface user {
        id : userid
    }

    interface gamematch {
        id : matchid
        users : userid[]
    }

    let userdatas : user[]

    let matchdatas : gamematch[]


    namespace gameplaying {


        interface base {
            id : string
            pos : point2D
            createTime : number
        }

        interface unit extends base{
            health : number
            health_r : number
            health_total : number

            power : number
            power_r : number
            power_total : number
        }

        interface moveunit extends unit{
            vel : point2D
            speed : number
        }

        interface staticunit extends unit{

        }

        interface player extends moveunit{

        }

        interface humanplayer extends player {
            userid : userid
            userinfo : user
        }


        interface computerplayer extends player {
            
        }

        interface playerstatus {
            health : number
            vel : point2D
            speed : number
        }


        interface gamedata {
            players : player[]
        }


    }



}