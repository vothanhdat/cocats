import 'pixi.js'
import UIElement from './UIElement'
import ScrollView, { ScrollViewConfig } from './ScrollView'

const noop = () => { }

enum PAGETYPE {
    SCROLL = 1,
    PAGINATION = 2,
}


declare type ListViewConfig = {
    col?: number,
    row?: number,
    length?: number,
    getChild: (i: number) => UIElement,
    pagetype?: PAGETYPE,
} & ScrollViewConfig


const SCROLLTYPE = ScrollView.SCROLLTYPE

class ListView extends ScrollView {

    static PAGETYPE = PAGETYPE

    static DEFAULT_OPTION = {
        col: 1,
        row: 1,
        length: 0,
        pagetype: PAGETYPE.SCROLL,
    }

    listOption: ListViewConfig
    column: number
    row: number
    childCount: number
    pagetype: PAGETYPE
    _getChildFunc: (i: number) => UIElement

    visibleChildren: ChildElement<UIElement>
    startIndex: number
    endIndex: number


    constructor(option: Option, config: ListViewConfig, tagname?: string) {
        super(option, {}, tagname, config)

        this.listOption = {
            ...ListView.DEFAULT_OPTION,
            ...config,
        }

        this.getChildFunc = config.getChild
        this.column = config.col || 1
        this.row = config.row || 1
        this.childCount = config.length || 0
        this.pagetype = config.pagetype || PAGETYPE.PAGINATION
        this.roundValue = 1;//option.type == SCROLLTYPE.VERTICAL ? (1 / this.row) : (1 / this.height)

        this.visibleChildren = {}

    }


    updateChildren() {
        var childCount = this.childCount

        var visibleChildren: { [k: string]: boolean } = {},
            addChildren: { [k: string]: boolean } = {},
            removeChildren: { [k: string]: boolean } = {};

        var startIndex: number,
            endIndex: number,
            position: number;

        if (this.type == SCROLLTYPE.VERTICAL) {
            position = this.scrollPosition * this.row
            startIndex = Math.floor(position) * this.column
            endIndex = Math.ceil(position + this.row) * this.column
        } else {
            position = this.scrollPosition * this.column
            startIndex = Math.floor(position) * this.row
            endIndex = Math.ceil(position + this.column) * this.row
        }

        startIndex = Math.max(0, startIndex)
        endIndex = Math.min(this.childCount, endIndex)

        if (this.startIndex == startIndex && this.endIndex == endIndex)
            return
        else {
            this.startIndex = startIndex
            this.endIndex = endIndex
        }

        for (let i = startIndex; i < endIndex; i++)
            visibleChildren[i] = true

        for (let i in this.visibleChildren)
            if (!visibleChildren[i] && this.visibleChildren[i])
                removeChildren[i] = true

        for (let i in visibleChildren)
            if (!this.visibleChildren[i] && visibleChildren[i])
                addChildren[i] = true

        for (let i in addChildren)
            this.createNewChild(parseInt(i))

        for (let i in removeChildren)
            this.removeOldChild(parseInt(i))

    }

    removeOldChild(index: number) {
        var oldElement = this.visibleChildren[index]
        oldElement && this.container.removeElement(oldElement)
        this.visibleChildren[index] = null
    }

    createNewChild(index: number) {

        const newElement = this.getChildFunc(index)

        const [colNumber, rowNumber] = this.type == SCROLLTYPE.VERTICAL
            ? [ index % this.column,   (index / this.column) | 0 ] 
            : [ index / this.row | 0, index % this.row ];

        const option = [
            (colNumber + 0.5) / this.column,
            (rowNumber + 0.5) / this.row,
            1 / this.column,
            1 / this.row,
            0.5, 0.5
        ]

        if (this.type == SCROLLTYPE.VERTICAL) {
            option[1] += 0.5 - this.__anchor.y
        } else {
            option[0] += 0.5 - this.__anchor.x
        }

        newElement.option = option as Option

        this.container.addElement(newElement)
        newElement.resize(this.width, this.height)
        this.visibleChildren[index] = newElement
    }

    onScrollUpdate() {
        this.updateChildren()
    }

    get scrollLength() {
        return this.type == SCROLLTYPE.VERTICAL
            ? Math.ceil(this.childCount / this.column) / this.row
            : Math.ceil(this.childCount / this.row) / this.column
    }

    set getChildFunc(value) {

        if (this._getChildFunc != value) {
            for (var i in this.visibleChildren)
                if (this.visibleChildren[parseInt(i)])
                    this.removeOldChild(parseInt(i))
            this._getChildFunc = value
        }
    }

    /**
     * @type {function(Number):UIElement}
     */
    get getChildFunc() {
        return this._getChildFunc
    }
}

export default ListView
