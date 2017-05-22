import UIElement from '../ui-lib/UIElement'
import Button from '../ui-lib/Button'
import BubbleButton from '../ui-lib/BubbleButton'
import TextElement from '../ui-lib/TextElement'
import ProgressBar from '../ui-lib/ProgressBar'
import Popup from '../ui-lib/Popup'
import ScrollView from '../ui-lib/ScrollView'
import ListView from '../ui-lib/ListView'

import {assets} from '../../assets'


class UI extends UIElement {
    constructor(option : Option) {
        super(assets.STONE as string,option,{
            bomb : new UIElement(assets.BOMB,[0.5,0.5,'50%','auto',0.5,0.5],{
                text : new TextElement(
                    'Hello the world Hello the world Hello the world ',
                    {fill : 0xffffff,fontSize : 1.1}
                ),
            },''),
            but : new BubbleButton(assets.BOMB,[0.3,0.5,'35%','auto',0.5,1]),
        })

        setTimeout(e => {
            this.addElement(new Popup(assets.BOY,[0.5,0,'65%','auto',0.5,0.5],{
                but1 : new BubbleButton(assets.TREE,[-0.15,1.0,'25%','auto',0.5,0.5]),
                but2 : new BubbleButton(assets.BOY,[1.15,1.0,'25%','auto',0.5,0.5]),
                progress : new ProgressBar([0.5,2.2,'80%','2px',0.5,0.5]),
                // list : new ListView([0.5,1.5,1,1,0.5,0.5],{
                //     getChild : (i) => {
                //         var c = new BubbleButton(assets.WHITE,[0.5,0.5,0.9,0.9,0.5,0.5])
                //         c.sprite.tint = ((Math.random() * 255|0) << 16) | ((Math.random() * 255|0) << 8) | ((Math.random() * 255|0))
                //         c.onClick = e => console.log('CCCC')
                //         return c
                //     },
                //     col : 1,
                //     row : 5,
                //     length : 10000
                // },'scroll')
                list : new ListView([0.5,1.5,1,1,0.5,0.5],{
                    getChild : (i) => new ListView([0.5,0.5,1,1,0.5,0.5],{
                            col : 4,
                            row : 1,
                            length : 200 ,
                            type : ListView.SCROLLTYPE.HORIZONTAL,
                            getChild : (i) => {
                                var c = new BubbleButton(assets.WHITE,[0.5,0.5,0.9,0.9,0.5,0.5])
                                c.sprite.tint = ((Math.random() * 255|0) << 16) | ((Math.random() * 255|0) << 8) | ((Math.random() * 255|0))
                                c.onClick = e => console.log('CCCC')
                                return c
                            },
                    }),
                    col : 1,
                    row : 5,
                    length : 10000
                },'scroll')              
            }),undefined,"popup")

            var popup = this.childElement.popup as Popup
            var button1 = popup.childElement.main.childElement.but1 as BubbleButton
            var button2 = popup.childElement.main.childElement.but2 as BubbleButton
            var progressbar = popup.childElement.main.childElement.progress as ProgressBar

            button1.onClick = () => progressbar.progress = Math.max(progressbar.progress - 0.1,0)
            button2.onClick = () => progressbar.progress = Math.min(progressbar.progress + 0.1,1)

        },1000)

        
        // setTimeout(e => {
        //     var a = this.childElement.popup.childElement.main.childElement.progress as ProgressBar
        //     a.progress = 0.3
        // },2000)

        // setTimeout(e => {
        //     var a = this.childElement.popup.childElement.main.childElement.progress as ProgressBar
        //     a.progress = 0.5
        // },3000)


        // setTimeout(e => {
        //     var a = this.childElement.popup.childElement.main.childElement.progress as ProgressBar
        //     a.progress = 1
        // },5000)

        console.log(this)
        
    }
}

export default UI