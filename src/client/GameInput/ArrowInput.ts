import KeyBoard from './KeyBoard'
import Key from './KeyMaps'


class ArrowInput extends KeyBoard {
    dx = 0;
    dy = 0;
    onKeyDown(e: KeyboardEvent) {
        super.onKeyDown(e)
        switch (e.keyCode) {
            case Key.UP_ARROW:
                this.dx = 0;
                this.dy = -1;
                break;
            case Key.DOWN_ARROW:
                this.dx = 0;
                this.dy = 1;
                break;
            case Key.LEFT_ARROW:
                this.dx = -1;
                this.dy = 0;
                break;
            case Key.RIGHT_ARROW:
                this.dx = 1;
                this.dy = 0;
                break;
        }
    }
    onKeyUp(e: KeyboardEvent) {
        const {keyCode} = e
        switch (keyCode) {
            case Key.UP_ARROW:
            case Key.DOWN_ARROW:
            case Key.LEFT_ARROW:
            case Key.RIGHT_ARROW:
                this.dx = 0;
                this.dy = 0;
                break;
        }

        switch (keyCode) {
            case Key.UP_ARROW:
            case Key.DOWN_ARROW:
                if(this.keyState[Key.LEFT_ARROW] || this.keyState[Key.RIGHT_ARROW])
                    this.dx = this.keyState[Key.LEFT_ARROW] ? -1 : 1;
                else if(this.keyState[Key.UP_ARROW] && this.keyState[Key.DOWN_ARROW])
                    this.dy = keyCode == Key.UP_ARROW ? 1 : -1;
                break;
            case Key.LEFT_ARROW:
            case Key.RIGHT_ARROW:
                if(this.keyState[Key.UP_ARROW] || this.keyState[Key.DOWN_ARROW])
                    this.dy = this.keyState[Key.UP_ARROW] ? -1 : 1;
            else if(this.keyState[Key.LEFT_ARROW] && this.keyState[Key.RIGHT_ARROW])
                    this.dx = keyCode == Key.LEFT_ARROW ? 1 : -1;
                break;
        }

        super.onKeyUp(e);
    }
}

export default ArrowInput