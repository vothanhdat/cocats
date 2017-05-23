import UIElement from '../ui-lib/UIElement'
import Button from '../ui-lib/Button'
import BubbleButton from '../ui-lib/BubbleButton'
import TextElement from '../ui-lib/TextElement'
import ProgressBar from '../ui-lib/ProgressBar'
import Popup from '../ui-lib/Popup'
import ScrollView from '../ui-lib/ScrollView'
import ListView from '../ui-lib/ListView'

import { assets } from '../../assets'




function getView(i: number) {
    var c = new BubbleButton(assets.WHITE, [0.5, 0.5, 0.8, 0.8, 0.5, 0.5],{
        t : new TextElement('' + i,{fill : 0xffffff,fontSize : 5,align : 'center'},[0,0,1,1,0,0])
    })
    c.sprite.tint = ((Math.random() * 255 | 0) << 16) | ((Math.random() * 255 | 0) << 8) | ((Math.random() * 255 | 0))
    c.onClick = e => console.log(c)
    return c
}

function getListView(i: number) {
    return new ListView([.1, .1, 0.8, 0.8, 0, 0], {
        col: 5,
        row: 1,
        length: 200,
        type: ListView.SCROLLTYPE.HORIZONTAL,
        getChild: getView,
    })
}

class UI extends UIElement {
    constructor(option: Option) {
        super(assets.BLACK, option, {
            // bomb: new UIElement(assets.BOMB, [0.5, 0.5, '50%', 'auto', 0.5, 0.5], {
            //     text: new TextElement(
            //         'Hello the world Hello the world Hello the world ',
            //         { fill: 0xffffff, fontSize: 1.1 }
            //     ),
            // }, ''),
            main: new UIElement(null, [0,0, 1, 1, 0, 0], {
                but1: new BubbleButton(assets.TREE, [0.1, 0.9, '25%', 'auto', 0.5, 0.5]),
                but2: new BubbleButton(assets.BOY, [0.9, 0.9, '25%', 'auto', 0.5, 0.5]),
                progress: new ProgressBar([0.5, 0.9, '50%', '2px', 0.5, 0.5]),
                list: new ListView([0.0, 0, 1, 0.5, 0.0, 0], {
                    getChild: getListView,
                    col: 1,
                    row: 3,
                    length: 10000
                }, 'scroll')
            }),
            but: new BubbleButton(assets.BOMB, [0.5, 1.2, '35%', 'auto', 0.5, 1]),
        })

        this.sprite.alpha = 0.5;

        var main = this.childElement.main
        var button1 = main.childElement.but1 as BubbleButton
        var button2 = main.childElement.but2 as BubbleButton
        var progressbar = main.childElement.progress as ProgressBar

        button1.onClick = () => progressbar.progress = Math.max(progressbar.progress - 0.1, 0)
        button2.onClick = () => progressbar.progress = Math.min(progressbar.progress + 0.1, 1)

    }
}

export default UI